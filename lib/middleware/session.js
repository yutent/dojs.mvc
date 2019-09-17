/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2018-07-26 15:50:25
 * @version $Id$
 */
const redisStore = require('../module/redis-store')
const nativeStore = require('../module/native-store')

module.exports = function(req, res, next) {
  var opt = this.get('session')
  var jwt = this.get('jwt')
  var cookie = this.ins('cookie')
  var session = null
  var uuid = Util.sec.uuid()
  var ssid = ''

  opt.jwt = jwt

  if (req.method === 'OPTIONS') {
    return next()
  }

  if (jwt) {
    var auth = req.header('authorization')
    if (auth) {
      ssid = auth.split('.').pop()
      uuid = auth
    }
  } else {
    ssid = cookie('NODESSID')
    // 校验级别为1, 则混入ua
    if (opt.level > 0) {
      uuid += req.header('user-agent')
    }
    // 校验级别为2, 则混入ip
    if (opt.level > 1) {
      uuid += req.ip()
    }
  }
  uuid = Util.sec.sha1(uuid)

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
