/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2016-05-15 14:37:47
 *
 */

'use strict'

const init = {
  db: {},
  session: {
    type: 'native', // native 或 redis
    ttl: 3600 * 24 * 7,
    domain: '', // NODESSID域, 默认等于domain
    strict: false, // 严格格式, 为true时,会校验IP是否已变动
    db: {
      host: '127.0.0.1',
      port: 6379,
      db: 0
    }
  },
  website: 'localhost',
  domain: '', // cookie域, 默认等于website
  port: 3000,
  routeMode: 1,
  env: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  debug: process.env.NODE_ENV !== 'production', // debug模式
  smtp: {
    host: 'smtp.example.com',
    port: 25,
    mail: 'service@example.com',
    name: '系统邮件',
    passwd: ''
  },
  jwt: null, // jwt secret
  regexp: {
    // 常用正则
    email: /^[\w\.\-]+@\w+([\.\-]\w+)*\.\w+$/,
    uname: /^[A-Za-z\d_]{4,16}$/,
    passwd: /^[A-Za-z0-9\!@#\$%\^&*\(_\+=\[\]\{\}\),\.\/;\\:\']{6,20}$/,
    phone: /^1[34578]\d{9}$/,
    idCard: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
    CN: /^[\u4e00-\u9fa5]+$/,
    qq: /^\d{5,12}$/
  }
}

module.exports = init
