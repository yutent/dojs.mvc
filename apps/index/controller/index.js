/**
 * 
 * @authors yutent (yutent@doui.cc)
 * @date    2015-11-09 18:17:20
 *
 */
"use strict";


class Index extends Controller {

    constructor(c){
        super(c)
        
        // this.model = require('../model/index')
    }


    async index(){
        // let arr = yield this.model.get1()
        let arr = [{aa: 123, bb: 456, cc: 789}]
        this.assign('docHd', 'example')
        this.assign('docCont', 'This is test words!')
        this.assign('seoTitle', 'This is the title for seo')
        this.assign('arr', arr)
        this.render(`${this.name}/index`)
    }

}



module.exports = Index