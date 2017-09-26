/**
 * 
 * @authors yutent (yutent@doui.cc)
 * @date    2016-03-15 16:01:38
 *
 */
"use strict";


class Session {

    constructor(clientID = ''){
        this.data = {}
    }

    init(clientID = ''){
        this.uuid = Util.sec.md5(clientID);
        return this
    }

    createSsid(ssid){
        if(!ssid || ssid.slice(-32) !== this.uuid){
            this.data = {}
            ssid = Math.random().toString(16).slice(5) + this.uuid
        }
        this.ssid = ssid
        
        if(!this.data.hasOwnProperty(ssid) || this.data[ssid].expire < Date.now())
            this.data[ssid] = {}
        //设置session有效期
        this.data[ssid].expire = Date.now() + Five.session.ttl * 1000
    }

    start(ssid){
        this.createSsid(ssid)
        return this.ssid
    }


    //获取session字段值, 需要用yield命令,这是为了兼容redis写法
    get(key){
        key ? (this.data[this.ssid][key] || null) : this.data[this.ssid]
    }


    //设置session字段值
    set(key, val){
        if(typeof key === 'object'){
            for(let i in key){
                this.data[this.ssid][i] = key[i]
            }
        }else{
            this.data[this.ssid][key] = val
        }
    }


    //删除单个字段
    unset(key){
        if(this.data[this.ssid].hasOwnProperty(key))
            delete this.data[this.ssid][key]
    }

    //清除个人session
    clear(){
        delete this.data[this.ssid]
    }


}


module.exports = Session