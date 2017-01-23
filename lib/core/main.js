/**
 * 框架核心
 * @authors yutent (yutent@doui.cc)
 * @date    2015-11-25 18:06:14
 *
 */
"use strict";

require('dojs-extend') //加载拓展方法
require('./register-dojs') //注册doJS

const http = require('http'),
    Request = require('dojs-request'),
    Response = require('dojs-response'),
    Router = new (require('./router'));
global.Cookie = require('dojs-cookie');

class Mvc {

    constructor(basedir){

        if(!basedir)
            return console.error('`basedir` is undefined')

        process.setMaxListeners(0)

        global.BASE = basedir //站点根目录
        global.LIB = BASE + 'lib/' //框架核心目录
        global.APPS = BASE + 'apps/' //应用目录
        global.DATA = BASE + 'data/' //数据/缓存目录
        global.VIEWS = BASE + 'views/' //模板目录
        global.PUB = BASE + 'public/' //静态文件目录
        global.UPLOAD = PUB + 'upload/' //上传目录

        global.libs = {
            SEC: require('dojs-crypto'), //加解密工具
            LOG: require('../util/log'), //基础日志记录工具
        }
        global.Fs = require('dojs-fs') //注册fs文件操作类
        global.Log = new libs.LOG() //注册log操作类
    }

    //初始化框架全局方法
    static init(){
        global.Mongo = require('dojs-mongo') //加载mongo操作类
        global.Mysql = require('dojs-mysql') //加载mysql操作类
        global.Controller = require('./controller') //加载基控制器
        global.Email = require('../util/sendmail') //加载email发送类
    }


/*------------------------------------------------------------------------*/

    //配置框架
    use(key, val){
        if(!key)
            return

        try{
            if(key.indexOf('.') !== -1)
                eval(`dojs.${key} = ${JSON.stringify(val)}`)
            else
                dojs[key] = val
        }catch(e){
            Log.error(e.stack)
        }
    }

    loadDB(db = {}){
        for(let i in db){
            dojs.db[i] = db[i]
        }
    }


    //启动http服务
    start(){
        Mvc.init()

        dojs.domain = dojs.domain || dojs.website
        dojs.session.domain = dojs.session.domain || dojs.domain

        global.Session = require(`../util/${dojs.session.type}-session`)

        http.createServer((req, res) => {

            let response = new Response(req, res)
            let request = new Request(req, res)


            response.set('X-Powered-By', 'doJS');

            Router.init(request, response);

        }).listen(dojs.port)
    }
}


module.exports = Mvc