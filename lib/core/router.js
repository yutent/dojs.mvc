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

        if(!dojs.modules[request.app]){
            if(!dojs.modules.Error)
                response.error(`App[${request.app}] not found`, 404)
            else
                response.error(dojs.debug ? dojs.modules.Error.stack : dojs.modules.Error, 500)

            return 
        }

        try{
            if(request.path.length < 1){
                request.path.push('index');
            }

            let act = request.path.shift();

            if(dojs.modules[request.app].prototype[act + 'Action']){
                let app = new dojs.modules[request.app]({req: request, res: response});
                return app[act + 'Action']
                        .apply(app, request.path)
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