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


    async indexAction(){
        
        // let arr = await this.model.get1()
        let arr = [{aa: 123, bb: 456, cc: 789}]
        this.assign('docHd', 'example')
        this.assign('docCont', process.pid)
        this.assign('seoTitle', 'This is the title for seo')
        this.assign('arr', arr)
        this.assign('menu', [
            {
                name: '一级菜单1',
                sub: [
                    {name: '子菜单1'},
                    {name: '子菜单2'},
                    {name: '子菜单3'},
                    {name: '子菜单4'}
                ]
            },
            {
                name: '一级菜单2',
                sub: [
                    {name: '子菜单21'},
                    {name: '子菜单22'},
                    {name: '子菜单23'},
                    {name: '子菜单24'}
                ]
            }
        ])
        this.render(`${this.name}/index`)
    }

}



module.exports = Index