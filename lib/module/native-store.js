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
    if (ssid) {
      if (!this.opt.jwt && this.opt.level > 0 && ssid !== this.uuid) {
        ssid = this.uuid
      }
    } else {
      ssid = this.uuid
    }
    this.ssid = ssid

    if (
      !this.store.hasOwnProperty(ssid) ||
      this.store[ssid].__EXPIRES__ < Date.now()
    ) {
      this.store[ssid] = {}
    }
    //设置session有效期
    hideProperty(
      this.store[ssid],
      '__EXPIRES__',
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
    this.store[this.ssid] = {}
  }
}

module.exports = Session
