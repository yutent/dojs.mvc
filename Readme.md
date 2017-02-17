# doJS 

一个轻量级的，易学的，拓展性灵活的 nodejs MVC框架, 5分钟即可上手。

该分支要求nodejs版本在7.0或以上，默认使用mongoDB/MySQL，其他的数据库可以自行拓展


## 启用方法(步骤)
**注** 
`本框架和用法 都是在 Linux 或者 Mac 下面测试通过。至于使用 Windows 并坚持玩新技术的同学，我坚信他们一定有着过人的、`
`甚至是不可告人的兼容性 bug 处理能力，所以这部分同学麻烦在安装过程无法继续时，自行兼容一下`


1. 下载安装doJS框架。
    - npm安装

    ```bash
    npm install dojs.mvc
    ```

    - 仓库拉取


2. 添加nginx配置(使用其他web服务,如apache的童鞋,请自行根据所使用的web服务器语法改写**强烈推荐nginx**), 路径啥的自行根据自己的机器修改

```nginx
upstream dojs_upstream {
    server 127.0.0.1:3000;
    #server 127.0.0.1:3005;
    keepalive 64;
}

server {

    listen 80;
    server_name dojs.cc;
    index index.html index.htm;
    root  /www/dojs.cc/public;


    location ~ ^/(images/|js/|css/|cache/|favicon.ico|robots.txt) {
            expires      1d;
            access_log off;
    }

    location / {
        try_files $uri
                @proxy;

    }

    location @proxy {       
        proxy_set_header        X-Real-IP               $remote_addr;
        proxy_set_header        X-Forwarded-For         $proxy_add_x_forwarded_for;
        proxy_set_header        Host                    $http_host;
        proxy_set_header        X-NginX-Proxy           true;
        proxy_set_header        Upgrade                 $http_upgrade;
        proxy_set_header        Connection              "upgrade";
        proxy_http_version      1.1;
        proxy_max_temp_file_size 0;
        proxy_pass              http://dojs_upstream;
        proxy_redirect          off;
        proxy_read_timeout      240s;
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
app.use('port', 3004) //设置端口,默认3000

app.start()

```


其他的配置, 请参考dojs模块下的lib目录里的 config.js文件


4. 启动应用。在项目根目录打开终端, 输入以下命令 `./bin/dojs start`, 然后根据提示操作, 即可

```bash
cd /www/your_domain.com/
./bin/dojs
使用以下指令: ./bin/dojs {start|stop|status|restart|delete}
./bin/dojs start
```


5. Enjoy you web



##  Change Log

### v2.0.0
    + 该分支从2.0.0开始编号;
    + 本次发布进行了大量的重构，对异常处理及路由，及性能方面都有明显的改进;
    + 为了纪念我原先的doPHP框架，本框架继承了php的很多理念，比如模板引擎，能看到smarty的影子在里面，命名规则也参照了php的一些习惯;
    + 路由方面，摒弃了原先用正则实现的低效方式，改用了yaf的默认路由方式; 
    + 框架使用到了以下第三方模块(在此感谢这些模块的作者): ioredis, mailx, mongodb, mysql 。





## 版权说明


任何人、组织、机构均可免费使用(包括商业使用),可随意修改原代码二次发布。
使用过程中有任何问题、心得, 均可联系我(yutent@doui.cc)


尊重他人劳动成果, 商用、二次封装, 请注明原作者。