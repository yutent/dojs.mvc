/**
 * 
 * @authors yutent (yutent@doui.cc)
 * @date    2015-12-08 11:24:32
 *
 */
"use strict";


class Index {

    constructor(){
        this.db = new Mysql(dojs.db.mysql)
        // this.mo = new Mongo(dojs.db.mongo)
    }

    get1(){
        return this.db.findOne({
            table: 'test',
            where: {},
            slave: true,
        })
    }

/*    get2(){
        return fn => {
            this.mo.find({
                collection: 'test',
                where: {}
            }, fn)
        }
    }*/



}


module.exports = new Index