/*
gulp命令的说明
    gulp.src()  gulp模块中,定义的方法
                作用是 指定 要执行打包压缩规范的 文件,所在的位置

    *.css       * 称为 通配符 作用是 表示 可以是 任意内容
                *.css  文件名是任意名称  扩展名是 css 的文件
                *.*    文件名和扩展名是 任意内容 也就是等于是 所有的文件

    .pipe()     gulp模块中定义的方法
                作用是: 执行() 中 定义的 函数方法,打包规范等
                效果类似于链式编程,逐步执行

    gulp.dest() gulp模块中定义的方法
                作用是: 将打包好的文件,存储到指定的位置中
                        如果没有对应的文件,文件夹,会自动创建文件文件夹

    gulp.watch() gulp模块中定义的方法
                 作用是: 会监听设定的程序的执行
                 有两个参数:
                    参数1: 监听的文件
                    参数2: 文件改变时,需要执行的打包规范
                           赋值的打包规范,是 函数的名称 不能有 ()

    module.exports.default  模块化开发的形式 只能在 nodejs 中使用 
                            只能使用 cmd 使用 nodejs 语法运行 js文件才能使用
                            设定 gulp 默认 执行的程序
                            设定之后 不再使用 node gulpfile.js 来运行程序 
                            直接使用 gulp 来运行程序
                            会 输出 所有执行的 程序的步骤 和 时间

    gulp.series()  gulp模块中定义的方法
                   作用是: 按照顺序,逐一执行设定的程序内容

    gulp.parallel() gulp模块中定义的方法
                    作用是: 同时执行,所有设定的程序内容

*/






// 1,加载各种依赖包

// 加载gulp依赖包
const gulp = require('gulp');


// 加载 css 依赖包
// 打包压缩css文件依赖包
const cssmin = require('gulp-cssmin');
// 自动添加前缀的依赖包
const autoprefixer = require('gulp-autoprefixer');

// 加载 js依赖包
// 压缩ES5语法规范的js文件
const uglify = require('gulp-uglify');
// 将ES6语法转化为ES5
const babel = require('gulp-babel');

// 记载 html依赖包
const htmlmin = require('gulp-htmlmin');

// 加载 webserver依赖包
const webserver = require('gulp-webserver');


// 记载 del 删除依赖包
const del = require('del');



// 2,指定 打包压缩规范

// css打包规范
const cssHandler = function(){
    return gulp.src( './src/css/*.css' ).pipe( autoprefixer() ).pipe( cssmin() ).pipe( gulp.dest( './dist/css' ) );
}


// js打包规范
const jsHandler = function(){
    return gulp.src( './src/js/*.js' ).pipe( babel({presets:['@babel/env']}) ).pipe( uglify() ).pipe( gulp.dest( './dist/js' ) );   
}

// html打包规范

const htmlHandler = function(){
    return gulp.src( './src/pages/*.html' ).pipe( htmlmin({
        removeAttributeQuotes:true,          // 删除属性中的双引号
        removeComments:true,                 // 删除注释
        removeScriptTypeAttributes:true,     // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes:true,  //删除<style>和<link>的type="text/css" 
        collapseBooleanAttributes:true,      // 布尔属性,只写属性,不写属性值
        collapseWhitespace:true,             // 删除标签之间的空格
        minifyCSS:true,                      // 压缩内部css样式
        minifyJS:true,                       // 压缩内部js代码
    }) ).pipe( gulp.dest( './dist/pages' ) );   
}

const htmlHand = function(){
    return gulp.src( './src/*.html' ).pipe( htmlmin({
        removeAttributeQuotes:true,          // 删除属性中的双引号
        removeComments:true,                 // 删除注释
        removeScriptTypeAttributes:true,     // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes:true,  //删除<style>和<link>的type="text/css" 
        collapseBooleanAttributes:true,      // 布尔属性,只写属性,不写属性值
        collapseWhitespace:true,             // 删除标签之间的空格
        minifyCSS:true,                      // 压缩内部css样式
        minifyJS:true,                       // 压缩内部js代码
    }) ).pipe( gulp.dest( './dist' ) );   
}

// 不用压缩的内容,直接移动到指定的文件夹中

// 图片 没有打包压缩的过程,直接就是移动文件
const imgHandler = function(){
    return gulp.src( './src/images/*.*' ).pipe( gulp.dest( './dist/images' ) );
}


// 别人压缩好的js 没有打包压缩的过程,直接就是移动文件
const ditHandler = function(){
    return gulp.src( './src/dit/*.*' ).pipe( gulp.dest( './dist/dit' ) );
}

// 3,制定监听规范
const watchHandler = function(){
    gulp.watch( './src/css/*.css' , cssHandler );
    gulp.watch( './src/js/*.js' , jsHandler );
    gulp.watch( './src/pages/*.html' , htmlHandler );
    gulp.watch( './src/*.html' , htmlHand );
    gulp.watch( './src/images/*.*' , imgHandler );
    gulp.watch( './src/dit/*.*' , ditHandler );
}

// 4,制定删除规范
// 删除的是 之前 dist 文件夹中 存储的 压缩文件
const delHandler = function(){
    return del(['./dist']);
}

// 5,指定服务器规范
const webserverHandler = function(){
    // 在 webserver 规范中 gulp.src() 是 指定 服务器运行的打包文件,所在的文件夹
    return gulp.src('./dist').pipe( webserver({
        host:'127.0.0.1',           // 服务器地址
        port:'8080',                // 端口号
        open:'./pages/index.html',   // 默认执行显示的文件
        livereload:true,            // 热启动,代码有改变,自动刷新页面
    }) )
}

// 6,制定导出的默认程序
// 之前运行程序 是 通过 node gulpfile.js 来运行程序
// 现在导出了默认程序,可以直接使用 gulp 就可以自动运行

module.exports.default = gulp.series(
    // 在执行所有程序之前先执行删除规范
    // 先删除之前dist文件夹中存储的压缩文件
    delHandler,   
    // 同时执行所有的打包规范
    // 生成新的 dist 压缩文件
    gulp.parallel( cssHandler , jsHandler , htmlHandler ,htmlHand, imgHandler , ditHandler),
    // 执行服务器规范,启动一个建议的gulp服务器
    webserverHandler,
    // 执行监听程序,监听文件内容变化,执行对应的打包规范
    watchHandler,
);



/*
    总结 gulp程序的套路
        1, 加载 依赖包

        2, 设定各种文件的 打包规范


        3, 设定 监听规范
            监听不同的文件,文件内容改变时,执行对应的 打包规范

        4, 设定 删除规范

        5, 设定 服务器规范

        6, 设定 导出的默认程序
                                 按照顺序执行
        module.exports.default = gulp.series(
            先执行删除规范
            delHandler,   
            同时执行所有的打包规范
            gulp.parallel( cssHandler , jsHandler , htmlHandler , imgHandler , ditHandler ),
            执行服务器规范
            webserverHandler,
            最后执行监听规范
            watchHandler,
        );


        实际项目,gulp打包代码基本都是固定的套路
        只有 一些 参数 路径 需要根据实际项目设定

        关键是 记住套路的 步骤 将来 写入 实际项目的路径就可以了



*/ 