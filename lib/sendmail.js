/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2015-11-27 10:50:16
 *
 */
'use strict'

const mailx = require('mailx')
class Sendmail {
  constructor({ host, port, mail, passwd } = {}) {
    if (!host || !port || !mail || !passwd) {
      throw new Error('smtp options [host, port, mail, passwd] is required.')
    }
    this.smtp = mailx.transport(host, port, mail, passwd)
    this.mail = mailx.message()
  }

  // 发件人
  from(info) {
    this.mail.setFrom(info.name, info.mail)
    return this
  }

  // 收件人
  to(info) {
    this.mail.addTo(info.name, info.mail)

    return this
  }

  // 发送正文
  send(mail) {
    this.mail.setSubject(mail.subject)
    this.mail.setHtml(mail.content)
    let defer = Promise.defer()
    this.smtp.send(this.mail, function(err, res) {
      if (err) {
        defer.reject(err)
      } else {
        defer.resolve(res)
      }
    })
    return defer.promise
  }
}

module.exports = Sendmail
