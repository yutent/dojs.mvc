# Five.js

![give me five](http://attach.cdn.doui.cc/apps/five.jpg)

一个轻量级的，易学的，拓展性灵活的 nodejs MVC 框架, 5 分钟即可上手。取自"Give me five"之意, 一切就是这么简单

该分支要求 nodejs 版本在 7.0 或以上，默认使用 mongoDB/MySQL，其他的数据库可以自行拓展

## 启用方法(步骤)

**注**
`本框架和用法 都是在 Linux 或者 Mac 下面测试通过。至于使用 Windows 并坚持玩新技术的同学，我坚信他们一定有着过人的、`
`甚至是不可告人的兼容性 bug 处理能力，所以这部分同学麻烦在安装过程无法继续时，自行兼容一下`

1.  下载安装 Five.js 框架。

  * 为了方便下载安装及管理, 推荐使用 five-cli(这是一款专门为框架开发的脚本工具) 进行操作。

```bash
# 全局安装 five-cli
sudo npm i five-cli -g

# 进入项目目录
cd /project/demo
# 初始化一个项目,初始化完成会自动安装所需要的依赖
five-cli init
# 初始化完成之后, 执行以下命令即可启动了,如果需要修改配置,可以先修改好再启动
five-cli start
```

  * 也可以自行通过 npm 安装, 自己构建启动配置

```bash
# 进入项目目录
cd /project/demo

npm i five --save
mkdir apps public data views

touch app.js
# 自行编辑app.js, 然后通过node, pm2启动项目即可

```


2.  配置框架

建立启动文件, 如 app.js

```javascript
'use strict'

const Five = require('five')
var app = new Five()

app.set({ website: 'www.your_domain.com' })
app.set({ domain: 'your_domain.com' }) // 设置域，cookie用到，不设置则同步website

app.set({ VIEWS: './views/' }) // [可选], 但是要用到模板渲染页面时, 必须指定
app.preload('./apps/') // [必须], 预加载应用目录

app.listen(3001) // 默认是3000
```

其他的配置, 请参考 `文档(全局配置)` 一节


3.  启动应用。在项目根目录打开终端, 输入以下命令 `five-cli start`, 然后根据提示操作, 即可

```bash
# 初始化完成之后, 执行以下命令即可启动了,如果需要修改配置,可以先修改好再启动
five-cli start

不是使用five-cli创建的项目, 可使用node/pm2等启动项目
node app.js
# or
pm2 start app.js
```


4.  添加 nginx 配置(使用其他 web 服务,如 apache 的童鞋,请自行根据所使用的 web 服务器语法改写**强烈推荐 nginx**), 路径啥的自行根据自己的机器修改

```nginx
upstream five_upstream {
  server 127.0.0.1:3000;
  #server 127.0.0.1:3005;
  keepalive 64;
}

server {

  listen 80;
  server_name doui.cc;
  index index.html index.htm;
  root  /www/doui.cc/public;

  location ~ ^/(images/|js/|css/|cache/|favicon.ico|robots.txt) {
    expires      1d;
    access_log off;
  }

  location / {
      try_files $uri
        @proxy;
  }

  location @proxy {
    proxy_set_header          X-Real-IP               $remote_addr;
    proxy_set_header          X-Forwarded-For         $proxy_add_x_forwarded_for;
    proxy_set_header          Host                    $http_host;
    proxy_set_header          X-NginX-Proxy           true;
    proxy_set_header          Upgrade                 $http_upgrade;
    proxy_set_header          Connection              "upgrade";
    proxy_http_version        1.1;
    proxy_max_temp_file_size  0;
    proxy_pass                http://five_upstream;
    proxy_redirect            off;
    proxy_read_timeout        240s;
  }
}
```




5.  Enjoy you web

## 版权说明

> 本框架使用 MIT 开源协议, 一切的使用,请遵循 MIT 协议。
