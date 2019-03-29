/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2018-08-24 15:24:56
 */

'use strict'

const sha256 = (str, secret) => {
  return Util.sec
    .hmac('sha256', str, secret, 'base64')
    .replace(/[+\/]/g, m => {
      return m === '+' ? '-' : '_'
    })
    .replace(/=/g, '')
}

const sign = function(token) {
  // "{"typ":"JWT","alg":"HS256"}"
  // 这里固定使用sha256
  let header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  let opt = this.ctx.get('session')
  let secret = this.ctx.get('jwt')
  // 加入过期时间, 同session.ttl
  let payload = { token, expires: Date.now() + opt.ttl * 1000 }
  payload = JSON.stringify(payload)

  payload = Util.sec.base64encode(payload, true)
  let auth = sha256(`${header}.${payload}`, secret)
  this.ctx.ins('session').start(auth)
  return `${header}.${payload}.${auth}`
}

const verify = function() {
  let jwt = this.request.header('authorization') || ''
  let secret = this.ctx.get('jwt')
  let auth, token, payload

  jwt = jwt.split('.')

  if (!secret || jwt.length !== 3) {
    return false
  }

  auth = jwt.pop()
  token = JSON.parse(Util.sec.base64decode(jwt[1], true))

  // 如果已经过期, 则不再校验hash
  if (Date.now() > token.expires) {
    return 'expired'
  }
  payload = jwt.join('.')

  if (sha256(payload, secret) === auth) {
    return token.token
  }
  return false
}

module.exports = {
  verify,
  sign
}
