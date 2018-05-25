/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2015-11-27 10:50:16
 *
 */
'use strict'

const mailx = require('mailx')
class Sendmail {
  constructor() {
    this.smtp = mailx.transport(
      Five.smtp.host,
      Five.smtp.port,
      Five.smtp.mail,
      Five.smtp.passwd
    )
  }

  to(info) {
    this.msg = mailx.message()

    this.msg.setFrom(Five.smtp.name, Five.smtp.mail)

    this.msg.addTo(info.name, info.mail)
    this.msg.setSubject(info.subject)
    this.msg.setHtml(info.body)

    return this
  }

  send(callback) {
    this.smtp.send(this.msg, function(e, res) {
      callback(e, res)
    })
  }
}

module.exports = new Sendmail()
