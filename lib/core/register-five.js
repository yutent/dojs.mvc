/**
 * 
 * @authors yutent (yutent@doui.cc)
 * @date    2016-05-15 14:37:47
 *
 */

'use strict';


global.Five = {
    db: {},
    session: {
        type: 'native',  //native OR redis
        ttl: 7200,
        domain: '', //NODESSID域, 默认等于domain
        conf: {
            host: '127.0.0.1',
            port: 6379,
            db: 0
        }
    },
    website: 'doui.cc', 
    domain: '', //cookie域, 默认等于website
    port: 3000,
    routeMode: 1,
    env: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    debug: process.env.NODE_ENV !== 'production', //debug模式
    smtp: { 
        host: 'smtp.doui.cc',
        port: 25,
        mail: 'no-reply@doui.cc',
        name: '系统邮件',
        passwd: '123456'
    },
    regexp: { //常用正则
        email: /^[\w\.\-]+@\w+([\.\-]\w+)*\.\w+$/,
        uname: /^[A-Za-z\d_]{4,16}$/,
        passwd: /^[A-Za-z0-9\!@#\$%\^&*\(_\+=\[\]\{\}\),\.\/;\\:\']{6,20}$/,
        phone: /^1[34578]\d{9}$/,
        idCard: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
        CN: /^[\u4e00-\u9fa5]+$/,
        qq: /^\d{5,12}$/
    }
}
