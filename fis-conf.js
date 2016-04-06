// 设置图片合并的最小间隔
//fis.config.set('settings.spriter.csssprites.margin', 20);

//开启autoCombine可以将零散资源进行自动打包
//fis.config.set('settings.postpackager.simple.autoCombine', true);

var now = new Date();
fis.config.set('timestamp', [now.getFullYear(), now.getMonth()+1, now.getDate(), now.getHours()].join(''));

//设置输出的domain路径  
fis.config.set("roadmap.domain", "http://bxswechat.xqsight.cn/banxiaoshi"); //配置domain

// 取消下面的注释开启simple插件，注意需要先进行插件安装 npm install -g fis-postpackager-simple
fis.config.set('modules.postpackager', 'simple');

//设置文件打包为时间戳
fis.config.set('roadmap.path', [
    {
        reg: /.*\.(js)$/,
        query: '?t=${timestamp}',
        //useSprite: true
        useHash: false
    },{
        reg: /.*\.(css)$/,
        query: '?t=${timestamp}',
        //useSprite: true
        useHash: false
    },{
        reg: /.*\.(png|jpg|gif)$/,
        query: '?t=${timestamp}',
        //useSprite: true
        useHash: false
    },{
        reg: /.*\.(json)$/,
        //useSprite: true
        useHash: false
    },{
        reg: '**.html',
        useCache: false
    }
]);

fis.config.merge({
    roadmap : {
        path : [{
                //所有的js文件
                reg : 'page/**.js',
                //发布到/static/js/xxx目录下
                release : '/static/js$&'
                //访问url是/mm/static/js/xxx
                // url : '/mm/static/js$&'
            },{
                //所有的js文件
                reg : '**.js'
                //发布到/static/js/xxx目录下
                //release : '/static/js$&'
                //访问url是/mm/static/js/xxx
               // url : '/mm/static/js$&'
            }, {
                //所有的css文件
                reg : '**.css'
                //发布到/static/css/xxx目录下
                //release : '/static/css$&'
                //访问url是/pp/static/css/xxx
               // url : '/pp/static/css$&'
            }, {
                //所有image目录下的.png，.gif文件
                reg : /^\/images\/(.*\.(?:png|gif))/i
                //发布到/static/pic/xxx目录下
                //release : '/static/pic/$1'
                //访问url是/oo/static/baidu/xxx
               // url : '/oo/static/baidu$&'
            }
        ]
    }
});

// 取消下面的注释设置打包规则
fis.config.set('pack', {
    'static/js/pkg/pgk.jquery.pub.js': [
        'static/js/jquery-2.1.4.js',
        'static/js/pub.js'
    ],
    'static/js/pkg/pgk.light7.js': [
        'static/light7/js/light7.js',
        'static/light7/js/light7-swiper.js',
        'static/light7/js/i18n/cn.js'
    ],
    /*'static/js/pkg/pgk.layer.js': [
        'static/layer/layer.js',
        'static/layer/extend/layer.ext.js'
    ],*/
    // 取消下面的注释设置CSS打包规则，CSS打包的同时会进行图片合并
    'static/css/pkg/pkg.light7.css': [
        'static/light7/css/light7.css',
        'static/light7/css/light7-swiper.css'
    ]/*,
    'static/css/pkg/pkg.layer.css': [
        'static/layer/skin/layer.css',
        'static/layer/skin/layer.ext.css',
    ]*/
});
