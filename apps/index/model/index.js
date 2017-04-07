/**
 * 
 * @authors yutent (yutent@doui.cc)
 * @date    2015-12-08 11:24:32
 *
 */
"use strict";


class Index {

    constructor(){
        this.db = new Mysql(Five.db.mysql)
    }

    get1(){
        return this.db.findOne({
            table: 'test',
            where: {},
            slave: true,
        })
    }




}


module.exports = new Index