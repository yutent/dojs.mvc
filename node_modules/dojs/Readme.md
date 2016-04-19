# doJS 

一个轻量级的，易学的，拓展性灵活的 nodejs MVC框架。

要求nodejs版本在4.0或以上，默认使用mongoDB/MySQL/RethinkDB，其他的数据库可以自行拓展


## 启用方法(步骤)
**注** 
`本框架和用法 都是在 Linux 或者 Mac 下面测试通过。至于使用 Windows 并坚持玩新技术的同学，我坚信他们一定有着过人的、`
`甚至是不可告人的兼容性 bug 处理能力，所以这部分同学麻烦在安装过程无法继续时，自行兼容一下`


1. 下载doJS框架, 拷贝到 项目根目录下的 node_modules下, 然后用命令行进入到该目录
`$ npm install`
等待依赖安装完成即可。

2. 添加nginx配置(使用其他web服务,如apache的童鞋,请自行根据所使用的web服务器语法改写**强烈推荐nginx**), 路径啥的自行根据自己的机器修改

```shell
upstream demo_upstream {
        server 127.0.0.1:3004;
        #server 127.0.0.1:3005;
        keepalive 64;
}

server {

        listen 80;
        server_name www.your_domain.com;
        index index.html index.htm;
        root  /www/your_domain.com/public;

        location ~ ^/(images/|js/|css/|cache/|upload/|favicon.ico|robots.txt)
        {
                expires      1h;
                access_log off;
        }

        location /
        {
                proxy_set_header   X-Real-IP               $remote_addr;
                proxy_set_header   X-Forwarded-For         $proxy_add_x_forwarded_for;
                proxy_set_header   Host                    $http_host;
                proxy_set_header   X-NginX-Proxy           true;
                proxy_set_header   Connection              "";
                proxy_http_version 1.1;
                proxy_pass         http://demo_upstream;
                proxy_redirect     off;
        }
}
```


3. 配置框架

建立启动文件, 如app.js

```javascript
"use strict";

var app = new (require('dojs'))(__dirname + '/')

app.use('website', 'www.your_domain.com')
app.use('domain', 'your_domain.com') //设置域，cookie用到，默认等于website
app.use('dbs.mysql', {host: '', port: '', db: ''})
app.use('port', 3004) //设置端口,默认3000

app.start()

```


其他的配置, 请参考dojs模块下的lib目录里的 config.js文件


4. 启动 node, 推荐使用forever

```shell
$ cd /www/your_domain.com/
$ forever -w -e ./data/logs/error.log start app.js
$
```


5. Enjoy you web



##  Change Log

### v1.0.0
    + 框架使用到了以下第三方模块(在此感谢这些模块的作者): co, formidable, ioredis, mailx, mongodb, mysql, rethinkdb 。
    + 






## 版权说明


任何人、组织、机构均可免费使用(包括商业使用),可随意修改原代码二次发布。
使用过程中有任何问题、心得, 均可联系我(yutent@doui.cc)


尊重他人劳动成果, 商用、二次封装, 请注明原作者。