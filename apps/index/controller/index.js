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
        var _this = this
        // this.model = require('../model/index')

        this.async(this.index)
            .catch(function(e){
                Response.error(e + '--')
            })
    }


    * index(){
        this.assign('docHd', 'example')
        this.assign('docCont', 'This is test words!')
        this.assign('seoTitle', 'This is the title for seo')
        this.assign('arr', {aa: 123, bb: 456, cc: 789})
        this.rander('index/index')
    }

}



module.exports = Index