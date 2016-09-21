/**
 * 
 * @authors yutent (yutent@doui.cc)
 * @date    2015-12-08 11:24:32
 *
 */
"use strict";


class Index {

    constructor(){
        this.db = new Mysql(dojs.dbs.mysql)
        this.mo = new Mongo(dojs.dbs.mongo)
    }

    get1(){
        return fn => {
            this.db.findOne({
                table: 'test',
                where: {},
                slave: true,
            }, fn).catch(err => {
                Response.error(err)
            })
        }
    }

    get2(){
        return fn => {
            this.mo.find({
                collection: 'test',
                where: {}
            }, fn)
        }
    }



}


module.exports = new Index