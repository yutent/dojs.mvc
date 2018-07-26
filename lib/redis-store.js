/**
 * Session类, 存入store
 * @authors yutent (yutent@doui.cc)
 * @date    2016-03-14 16:08:57
 *
 */
'use strict'

class Session {
  constructor(store, opt, uuid) {
    this.store = store
    this.opt = opt
    this.uuid = uuid
  }

  createSsid(ssid) {
    if (!ssid || ssid.slice(-32) !== this.uuid) {
      ssid =
        Math.random()
          .toString(16)
          .slice(-8) + this.uuid
    }
    this.ssid = ssid
    // 设置session有效期
    this.store.expire(ssid, this.opt.ttl)
  }

  start(ssid) {
    this.createSsid(ssid)
    return this.ssid
  }

  // 获取session字段值, 需要await指令
  get(key) {
    let defer = Promise.defer()

    this.store.hgetall(this.ssid, (err, obj) => {
      if (err) {
        return defer.reject(err)
      }

      for (let i in obj) {
        if (!obj[i]) {
          continue
        }

        obj[i] = Number.parse(obj[i])
      }
      //不传key时,直接返回全部字段
      if (!key) {
        defer.resolve(obj)
      } else {
        defer.resolve(obj.hasOwnProperty(key) ? obj[key] : null)
      }
    })
    return defer.promise
  }

  //设置session字段值
  set(key, val) {
    if (typeof key === 'object') {
      for (let i in key) {
        this.store.hset(this.ssid, i, key[i])
      }
    } else {
      this.store.hset(this.ssid, key, val)
    }
  }

  //删除单个字段
  unset(key) {
    this.store.hdel(this.ssid, key)
  }

  //清除个人session
  clear() {
    this.store.del(this.ssid)
  }
}

module.exports = Session
