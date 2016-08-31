/**
 * 
 * @authors yutent (yutent@doui.cc)
 * @date    2015-09-30 15:31:32
 *
 */

"use strict";

let app = new (require('dojs'))(__dirname + '/')
let db = require(BASE + 'config/db.json')

app.use('website', 'dojs.cc') //设置网址
app.use('session.type', 'redis') //设置session的存储类型，redis/native
app.use('session.domain', 'dojs.cc') //设置session域，cookie用到，默认等于website
app.use('port', 3000) //设置端口,默认3000

for(let i in db){
    app.use('dbs.' + i, db[i])
}

app.start()