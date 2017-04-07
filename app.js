/**
 * 
 * @authors yutent (yutent@doui.cc)
 * @date    2015-09-30 15:31:32
 *
 */

"use strict";

let app = new (require('./lib/core/main'))(__dirname + '/')
let db = require(`${LIB}config/db-${Five.env}.json`)

app.loadDB(db);

app.use('website', 'doui.cc') //设置网址
app.use('session.type', 'native') //设置session的存储类型，redis/native
app.use('session.domain', 'doui.cc') //设置session域，cookie用到，默认等于website
app.use('port', 3000) //设置端口,默认3000


app.start()