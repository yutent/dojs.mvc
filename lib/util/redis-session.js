/**
 * Session类, 存入redis
 * @authors yutent (yutent@doui.cc)
 * @date    2016-03-14 16:08:57
 *
 */
"use strict";

const ioredis = require('ioredis')

class Session {

    constructor(clientID = ''){

        let conf = dojs.session.conf;
        this.uuid = Util.sec.md5(clientID);
        this.redis = new ioredis({
            host: conf.host || '127.0.0.1',
            port: conf.port || 6379,
            db: conf.db || 0
        })
    }

    createSsid(ssid){
        if(!ssid || ssid.slice(10) !== this.uuid){
            ssid = Math.random().toString(16).slice(5) + this.uuid
        }
        this.ssid = ssid
        //设置session有效期
        this.redis.expire(ssid, dojs.session.ttl)
    }


    start(ssid){
        this.createSsid(ssid)
        return this.ssid
    }


    //获取session字段值, 需要yeild指令
    get(key){
        return new Promise((yes, no) => {
            this.redis.hgetall(this.ssid, (err, obj) => {
                if(err)
                    return no(err)

                for(let i in obj){
                    if(obj[i].startsWith(0) && !obj[i].startsWith('0.'))
                        continue

                    if(isFinite(obj[i]))
                        obj[i] -= 0
                }
                //不传key时,直接返回全部字段
                if(!key)
                    yes(obj)
                else
                    yes(obj.hasOwnProperty(key) ? obj[key] : null)
            })
        })
    }


    //设置session字段值
    set(key, val){
        if(typeof key === 'object'){
            for(let i in key){
                this.redis.hset(this.ssid, i, key[i])
            }
        }else{
            this.redis.hset(this.ssid, key, val)
        }
    }


    //删除单个字段
    unset(key){
        this.redis.hdel(this.ssid, key)
    }

    //清除个人session
    clear(){
        this.redis.del(this.ssid)
    }

}


module.exports = Session