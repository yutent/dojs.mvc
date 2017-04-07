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

        if(!Five.modules[request.app]){
            if(!Five.modules.Error)
                response.error(`The app [${request.app}] not found`, 404)
            else
                response.error(Five.debug ? Five.modules.Error.stack : Five.modules.Error, 500)

            return 
        }

        try{
            if(request.path.length < 1){
                request.path.push('index');
            }

            let app = new Five.modules[request.app]({req: request, res: response});

            if(Five.routeMode === 1){
                let act = request.path.shift();
                
                if(app[act + 'Action']){
                    app[act + 'Action']
                        .apply(app, request.path)
                        .catch(err => {
                            response.error(Five.debug ? (err.stack || err) : err, 500)
                        })
                }else{
                    response.error(`Action[${act}] not found`, 404)
                }
            } else {
                if(app.indexAction){
                    app.indexAction
                        .apply(app, request.path)
                        .catch(err => {
                            response.error(Five.debug ? (err.stack || err) : err, 500)
                        })
                }else{
                    response.error(`Default Action not found`, 404)
                }
                
            }

            
        }catch(err){
            response.error(Five.debug ? (err.stack || err) : err, 500)
        }
        
    }


}


module.exports = Router