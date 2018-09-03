/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2018-09-03 22:26:51
 */

'use strict'

module.exports = function(req, res, next) {
  let supportCredentials = this.get('supportCredentials')
  let credentialsRule = this.get('credentialsRule')

  if (supportCredentials) {
    let origin = req.header('origin') || req.header('referer') || ''
    origin = Util.url.parse(origin)

    if (credentialsRule && origin.host) {
      if (!credentialsRule.test(origin.host)) {
        return res.end('')
      }
    }
    res.set('Access-Control-Allow-Credentials', 'true')
    res.set('Access-Control-Allow-Origin', `${origin.protocol}//${origin.host}`)
    res.set(
      'Access-Control-Allow-Headers',
      req.header('access-control-request-headers')
    )
    if (req.method === 'OPTIONS') {
      return res.end('')
    }
  }
  next()
}
