/**
 * 
 * @authors yutent (yutent@doui.cc)
 * @date    2016-05-03 14:59:03
 *
 */
"use strict";

let ch = require('child_process')
let os = require('os')


for(let i = 0, len = os.cpus().length; i < len; i++){
    let worker = ch.fork('./app.js')
    worker.send({port: 3000 + i})
}