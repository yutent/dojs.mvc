/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2018-05-26 00:01:00
 * @version $Id$
 */

const Cookie = require('http.cookie')

module.exports = function(req, res, next) {
  var cookie = new Cookie(req.origin.req, req.origin.res)
  var domain = this.get('domain')
  this.__INSTANCE__.cookie = function(key, val, opt) {
    if (typeof key !== 'string') {
      throw new Error(
        `argument key must be a string in cookie() ${typeof key} given`
      )
    }

    if (arguments.length === 1) {
      return cookie.get(key)
    }

    if (!opt) {
      opt = {}
    }
    opt.domain = opt.domain || domain

    val += ''

    if (!val) {
      opt.expires = opt.maxAge = -1
    }

    cookie.set(key, val, opt)
  }
  next()
}
