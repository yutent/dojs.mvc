/**
 * 
 * @authors yutent (yutent@doui.cc)
 * @date    2015-09-30 15:31:32
 *
 */

"use strict";

var app = new (require('dojs'))(__dirname + '/')

app.use('website', 'dojs.cc') //设置网址
app.use('domain', 'dojs.cc') //设置域，cookie用到，默认等于website
app.use('port', 3000) //设置端口,默认3000


app.start()