/**
 * 框架核心
 * @authors yutent (yutent@doui.cc)
 * @date    2015-11-25 18:06:14
 *
 */
'use strict'

process.setMaxListeners(0)
require('es.shim') // 加载拓展方法
const init = require('./lib/reg-init')

const log = console.log
const http = require('http')
const path = require('path')
const Request = require('http.request')
const Response = require('http.response')
const router = require('./lib/router')
const cookies = require('./lib/cookies')
const redisSession = require('./lib/redis-session')
const nativeSession = require('./lib/native-session')

function hideProperty(host, name, value) {
  Object.defineProperty(host, name, {
    value: value,
    writable: true,
    enumerable: false,
    configurable: true
  })
}

class Five {
  constructor() {
    hideProperty(this, '__five__', Object.assign({}, init))
    hideProperty(this, 'modules', { __error__: null })
    hideProperty(this, 'middleware', [])

    global.libs = {
      Smarty: require('smartyx'), //模板引擎
      Log: require('./lib/log'), //基础日志记录工具
      // Email: require('./lib/sendmail'), //加载email发送类
      Mysql: require('mysqli'), //加载mysql操作类
      Mongoose: require('mongoose'),
      Cookie: require('http.cookie'),
      Ioredis: require('ioredis')
    }
    global.Util = {
      sec: require('crypto.js'),
      fs: require('iofs'),
      // curl: require('superagent'),
      child: require('child_process')
    }
    global.Controller = require('./lib/controller')
    // global.Log = new libs.Log() //注册log操作类
  }

  __init__() {
    let { domain, website, session } = this.__five__
    domain = domain || website
    session.domain = session.domain || domain
    this.set({ domain, session })

    if (session.type === 'redis') {
      hideProperty(
        this,
        'SESSION_STORE',
        new libs.Ioredis({
          host: session.db.host || '127.0.0.1',
          port: session.db.port || 6379,
          db: session.db.db || 0
        })
      )
      this.use(redisSession)
    } else {
      hideProperty(this, 'SESSION_STORE', {})
      this.use(nativeSession)
    }
    this.use(cookies)
    this.use(router)
  }

  /*------------------------------------------------------------------------*/

  // 注册属性到全局Five对象
  set(obj) {
    for (let i in obj) {
      if (typeof obj[i] === 'object' && !Array.isArray(obj[i])) {
        if (!this.__five__[i]) {
          this.__five__[i] = obj[i]
        } else {
          try {
            Object.assign(this.__five__[i], obj[i])
          } catch (err) {
            log(err)
          }
        }
      } else {
        this.__five__[i] = obj[i]
      }
    }
    return this
  }

  get(key) {
    try {
      return new Function('o', `return o.${key}`)(this.__five__)
    } catch (err) {
      log(err)
      return null
    }
  }

  // 配置框架
  use(fn) {
    if (typeof fn !== 'function') {
      throw TypeError('fn must be a function')
    }
    this.middleware.push(fn)
  }
  // 预加载应用
  preload(dir) {
    let list = Util.fs.ls(dir)

    if (list) {
      list.forEach(file => {
        let { name } = path.parse(file)
        if (name.startsWith('.')) {
          return
        }
        try {
          this.modules[name] = require(file)
        } catch (err) {
          this.modules.__error__ = err
        }
      })
    }

    return this
  }

  // 启动http服务
  listen(port) {
    let _this = this
    this.__init__()

    let server = http.createServer((req, res) => {
      let response = new Response(req, res)
      let request = new Request(req, res)

      if (response.res.rendered) {
        return
      }
      response.set('X-Powered-By', 'Five.js')

      let middleware = this.middleware.concat()
      let fn = middleware.shift()
      if (fn) {
        ;(async function next() {
          await fn.call(_this, request, response, function() {
            fn = middleware.shift()
            if (fn) {
              next()
            }
          })
        })()
      }
    })

    server.listen(port || this.get('port'))

    return server
  }
}

module.exports = Five
