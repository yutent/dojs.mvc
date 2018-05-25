/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2016-03-15 16:01:38
 *
 */
'use strict'

function hideProperty(host, name, value) {
  Object.defineProperty(host, name, {
    value: value,
    writable: true,
    enumerable: false,
    configurable: true
  })
}

class Session {
  constructor(store, opt, uuid) {
    this.opt = opt
    this.uuid = uuid
    this.store = store
  }

  createSsid(ssid) {
    if (!ssid || ssid.slice(-32) !== this.uuid) {
      this.store = {}
      ssid =
        Math.random()
          .toString(16)
          .slice(-8) + this.uuid
    }
    this.ssid = ssid

    if (
      !this.store.hasOwnProperty(ssid) ||
      this.store[ssid].__expires__ < Date.now()
    ) {
      this.store[ssid] = {}
    }
    //设置session有效期
    hideProperty(
      this.store[ssid],
      '__expires__',
      Date.now() + this.opt.ttl * 1000
    )
  }

  start(ssid) {
    this.createSsid(ssid)
    return this.ssid
  }

  // 获取session字段值
  get(key) {
    return key ? this.store[this.ssid][key] || null : this.store[this.ssid]
  }

  // 设置session字段值
  set(key, val) {
    if (typeof key === 'object') {
      for (let i in key) {
        this.store[this.ssid][i] = key[i]
      }
    } else {
      this.store[this.ssid][key] = val
    }
  }

  // 删除单个字段
  unset(key) {
    if (this.store[this.ssid].hasOwnProperty(key)) {
      delete this.store[this.ssid][key]
    }
  }

  // 清除个人session
  clear() {
    delete this.store[this.ssid]
  }
}

module.exports = function(req, res, next) {
  let opt = this.get('session')
  let uuid = req.header('user-agent')
  if (opt.strict) {
    uuid += req.ip()
  }
  uuid = Util.sec.md5(uuid)
  this.__session__ = new Session(this.SESSION_STORE, opt, uuid)
  next()
}
