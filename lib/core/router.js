/**
 * 路由
 * @authors yutent (yutent@doui.cc)
 * @date    2015-10-01 19:11:19
 *
 */
"use strict";


class Router{

    constructor(){
        
    }

    /**
     * [init 启动路由]
     */
    init(request, response){

        let App = null;
   
        try{
            App = require(APPS + request.app)
        }catch(err){
            return response.error(`App[${request.app}] not found`, 404)
        }

        try{
            if(request.path.length < 1){
                request.path.push('index');
            }

            let act = request.path.shift();

            if(App.prototype[act + 'Action']){
                let _app = new App({req: request, res: response});
                return _app[act + 'Action']
                        .apply(_app, request.path)
                        .catch(err => {
                            response.error(dojs.debug ? (err.stack || err) : err, 500)
                        })
            }else{
                response.error(`Action[${act}] not found`, 404)
            }
        }catch(err){
            response.error(dojs.debug ? (err.stack || err) : err, 500)
        }
        
    }


}


module.exports = Router