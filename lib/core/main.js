/**
 * 框架核心
 * @authors yutent (yutent@doui.cc)
 * @date    2015-11-25 18:06:14
 *
 */
"use strict";

require('es.shim') //加载拓展方法
require('./register-five') //注册doJS

const http = require('http'),
    Request = require('http.request'),
    Response = require('http.response'),
    Router = new (require('./router'));


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
            Smarty: require('smartyx'), //模板引擎
            Log: require('../util/log'), //基础日志记录工具
            Email: require('../util/sendmail'), //加载email发送类
            Mysql: require('mysqli'), //加载mysql操作类
            Mongoose: require('mongoose'),
            Cookie: require('http.cookie')
        }
        global.Util = {
            sec: require('crypto.js'),
            fs: require('iofs'),
            // curl: require('superagent'),
            child: require('child_process'),
        }
        global.Log = new libs.Log() //注册log操作类
    }

    //初始化框架全局方法
    static init(){
        Five.domain = Five.domain || Five.website
        Five.session.domain = Five.session.domain || Five.domain

        global.Controller = require('./controller') //加载基控制器
        global.Session = require(`../util/${Five.session.type}-session`)

        Five.modules = {
            Error: null
        };

        Util.fs.ls(APPS).forEach(it => {
            if(it.startsWith('.')){
                return 
            }
            
            try{
                Five.modules[it] = require(APPS + '/' + it)
            }catch(err){
                Five.modules.Error = err
            }
        })
    }


/*------------------------------------------------------------------------*/

    //配置框架
    use(key, val){
        if(!key)
            return

        try{
            if(key.indexOf('.') !== -1)
                eval(`Five.${key} = ${JSON.stringify(val)}`)
            else
                Five[key] = val
        }catch(e){
            Log.error(e.stack)
        }
    }

    loadDB(db = {}){
        for(let i in db){
            Five.db[i] = db[i]
        }
    }


    //启动http服务
    start(){
        Mvc.init()

        http.createServer((req, res) => {

            let response = new Response(req, res),
                request = new Request(req, res)

            if(response.res.rendered){
                return
            }
            response.set('X-Powered-By', 'Five.js');

            Router.init(request, response);

        }).listen(Five.port)
    }
}


module.exports = Mvc