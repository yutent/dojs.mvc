/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2018-09-03 22:26:51
 */

'use strict'

module.exports = function(req, res, next) {
  let supportCredentials = this.get('supportCredentials')
  let credentialsRule = this.get('credentialsRule')
  let credentialsMaxAge = this.get('credentialsMaxAge')

  if (supportCredentials) {
    let origin = req.header('origin') || req.header('referer') || ''
    let headers = req.header('access-control-request-headers')
    origin = Util.url.parse(origin)

    if (credentialsRule && origin.hostname) {
      if (!credentialsRule.test(origin.hostname)) {
        return res.end('')
      }
    }
    res.set('Access-Control-Allow-Credentials', 'true')
    res.set('Access-Control-Allow-Origin', `${origin.protocol}//${origin.host}`)
    if (headers) {
      res.set('Access-Control-Allow-Headers', headers)
    }
    if (credentialsMaxAge) {
      res.set('Access-Control-Max-Age', credentialsMaxAge)
    }
    if (req.method === 'OPTIONS') {
      return res.end('')
    }
  }
  next()
}
