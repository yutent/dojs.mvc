/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2018-07-26 15:50:25
 * @version $Id$
 */
const redisStore = require('../module/redis-store')
const nativeStore = require('../module/native-store')

module.exports = function(req, res, next) {
  let opt = this.get('session')
  let jwt = this.get('jwt')
  let uuid = req.header('user-agent')
  let auth = req.header('authorization') || ''
  let cookie = this.ins('cookie')
  let session = null
  let ssid = ''

  if (req.method === 'OPTIONS') {
    return next()
  }

  if (jwt) {
    ssid = auth.split('.').pop()
    uuid = auth || Util.sec.uuid()
  } else {
    ssid = cookie('NODESSID')
    if (opt.strict) {
      uuid += req.ip()
    }
  }
  uuid = Util.sec.md5(uuid)

  if (opt.type === 'redis') {
    session = new redisStore(this.__SESSION_STORE__, opt, uuid)
  } else {
    session = new nativeStore(this.__SESSION_STORE__, opt, uuid)
  }

  // 启用SESSION
  // ssid非法或过期时，需要重写
  if (!ssid || ssid !== session.start(ssid)) {
    ssid = session.start(ssid)
    if (!jwt) {
      cookie('NODESSID', ssid, {
        httpOnly: true,
        expires: opt.ttl,
        domain: opt.domain
      })
    }
  }

  this.__INSTANCE__.session = session

  next()
}
