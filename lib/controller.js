/**
 * 控制器基类
 * @authors yutent (yutent@doui.cc)
 * @date    2016-01-02 23:19:16
 *
 */

'use strict'

const smarty = new libs.Smarty({ cache: false })

class Controller {
  constructor({ ctx, req, res }) {
    this.ctx = ctx
    this.name = req.app
    this.request = req
    this.response = res

    smarty.config('path', this.ctx.get('VIEWS') || '')

    this.cookie = this.ctx.__INSTANCE__.cookie
    this.session = this.ctx.__INSTANCE__.session

    // 启用SESSION
    let ssid = this.cookie('NODESSID')
    if (!ssid) {
      ssid = this.session.start(ssid)
      this.cookie('NODESSID', ssid, {
        httpOnly: true,
        expires: ctx.get('session.ttl'),
        domain: ctx.get('session.domain')
      })
    } else {
      // ssid非法或过期时，需要重写
      if (ssid !== this.session.start(ssid)) {
        this.cookie('NODESSID', this.session.ssid, {
          httpOnly: true,
          expires: ctx.get('session.ttl'),
          domain: ctx.get('session.domain')
        })
      }
    }
  }

  //定义一个变量，类似于smarty，把该
  assign(key, val) {
    key += ''
    if (!key) {
      return
    }

    if (val === undefined || val === null) {
      val = ''
    }

    smarty.assign(key, val)
  }

  //模板渲染, 参数是模板名, 可不带后缀, 默认是 .tpl
  render(file) {
    smarty
      .render(file)
      .then(html => {
        this.response.render(html)
      })
      .catch(err => {
        this.response.error(err)
      })
  }

  // RESFULL-API规范的纯API返回
  send(status = 200, msg = 'success', data = {}) {
    if (typeof msg === 'object') {
      data = msg
      msg = 'success'
    }
    this.response.send(status, msg, data)
  }

  //针对框架定制的debug信息输出
  xdebug(err) {
    let msg = err
    if (this.ctx.get('debug')) {
      msg = err.stack || err
    }

    this.response.append('X-debug', msg + '')
  }
}

module.exports = Controller
