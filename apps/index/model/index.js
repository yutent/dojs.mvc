/**
 * 
 * @authors yutent (yutent@doui.cc)
 * @date    2015-12-08 11:24:32
 *
 */
"use strict";


class Index {

    constructor(){
        // this.db = new Mysql(dojs.dbs.mysql)
        this.db = new Rethink(dojs.dbs.rethink)
        this.mo = new Mongo(dojs.dbs.mongo)
    }

    find(){
        return fn => {
            this.mo.find({
                collection: 'test',
                where: {}
            }, fn)
        }
    }

    addUser(data){
        return fn => {
            this.db.insert({
                table: 'test',
                data: data,
                opts: {
                    // noreply: true,
                    // durability: 'soft'
                }
            }, fn)
        }
    }

}


module.exports = new Index