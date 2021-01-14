// 随机6位验证码  没有重复的字符
function setVc() {
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var vc = '';

    for (var i = 1; i <= 6; i++) {
        // 从 0 - str.length-1 的所有索引下标的随机数
        var num = parseInt(Math.random() * str.length);

        if (vc.indexOf(str[num]) === -1) {
            vc += str[num];
        } else {
            i--;
        }
    }

    return vc;
}



// 随机颜色
// 返回值是 颜色效果的字符串
function setColor() {
    // 方法1  rgb(颜色数值1,颜色数值2,颜色数值3);
    // 生成随机 0-255 的颜色数值
    return `rgb(${parseInt(Math.random() * 256)},${parseInt(Math.random() * 256)},${parseInt(Math.random() * 256)})`;

    // 方法2  #十六进制
    // #号之后拼接6个随机的十六进制数值
    // 十六进制的所有字符
    // var str = '0123456789abcdef';
    // // 返回的结果,起始是一个#号
    // var res = '#';
    // 循环6次,在 #号 之后 拼接6个字符
    // for(var i = 1 ; i <= 6 ; i++){
    //     // 随机生成 str 字符串的所有索引下标 0 - str.length-1
    //     var num = parseInt( Math.random()*str.length );
    //     // 利用随机索引下标,从 str 字符串中,随机提取一个字符,拼接在res 中
    //     res += str[num];
    // }
    // // 返回拼接结果字符串
    // return res;

    // 方法3 英文单词
    // 写一个数组,定义所有支持的英文单词
    // 通过随机的索引下标,随机获取一个单词
    // var colorArr = ['black','silver','gray','white','maroon','red','purple','fuchsia','green','lime','olive','yellow','navy','blue','teal','aqua','orange','aliceblue','antiquewhite','aquamarine','azure','beige','bisque','blanchedalmond','blueviolet','brown','burlywood','cadetblue','chartreuse','chocolate','coral','cornflowerblue','cornsilk','crimson','darkblue','darkcyan','darkgoldenrod','darkgray','darkgreen','darkgrey','darkkhaki','darkmagenta','darkolivegreen','darkorange','darkorchid','darkred','darksalmon','darkseagreen','darkslateblue','darkslategray','darkslategrey','darkturquoise','darkviolet','deeppink','deepskyblue','dimgray','dimgrey','dodgerblue','firebrick','floralwhite','forestgreen','gainsboro','ghostwhite','gold','goldenrod','greenyellow','grey','honeydew','hotpink','indianred','indigo','ivory','khaki','lavender','lavenderblush','lawngreen','lemonchiffon','lightblue','lightcoral','lightcyan','lightgoldenrodyellow','lightgray','lightgreen','lightgrey','lightpink','lightsalmon','lightseagreen','lightskyblue','lightslategray','lightslategrey','lightsteelblue','lightyellow','limegreen','linen','mediumaquamarine','mediumblue','mediumorchid','mediumpurple','mediumseagreen','mediumslateblue','mediumspringgreen','mediumturquoise','mediumvioletred','midnightblue','mintcream','mistyrose','moccasin','navajowhite','oldlace','olivedrab','orangered','orchid','palegoldenrod','palegreen','paleturquoise','palevioletred','papayawhip','peachpuff','peru','pink','plum','powderblue','rosybrown','royalblue','saddlebrown','salmon','sandybrown','seagreen','seashell','sienna','skyblue','slateblue','slategray','slategrey','snow','springgreen','steelblue','tan','thistle','tomato','turquoise','violet','wheat','whitesmoke','yellowgreen','rebeccapurple'];
    // var num = parseInt( Math.random()*colorArr.length );
    // return colorArr[num];

}

// 关键词替换
// 你给我一个字符串,给我一个关键词,我给你换成**星号
// 参数1 需要替换的字符串 参数2 需要替换的关键词
function setKeyWord() {
    // 按照 关键词 将字符串,转化为数组
    var arr = string.split(word);

    // 关键词 word 有几个字符,拼接几个*星号
    // 根据 关键词 word length 也就是 字符串长度,执行循环
    var key = '';
    for (var i = 1; i <= word.length; i++) {
        key += '*';
    }
    // 将 星号 作为间隔符号,将数组拼接为字符串
    var newStr = arr.join(key);
    // 返回替换之后的新的字符串
    return newStr;
}

// 判断是否是回文函数
// 你给我一个字符串,我告诉你,这个字符串,是不是回文字符串
// 参数: 需要判断的字符串
function isPalString(string) {
    // 1,按照空字符串,将形参字符串,转化为数组
    var arr = string.split('');
    // 2,反转数组
    arr.reverse();
    // 3,反转数组,按照空字符串为间隔,拼接为新的字符串
    var newStr = arr.join('');
    // 4,判断,如果新的字符串,与,形参字符串,相同,就是回文字符串
    if (newStr === string) {
        return true;
    } else {
        return false;
    }
}


// 获取文件名中的扩展名
// 你给我一个文件名,我给你这个文件的扩展名
// 参数: 需要获取扩展名的文件名
function getExt(string) {
    return string.substr(string.lastIndexOf('.') + 1);
}


// 求最小公倍数
function getLCM(num1, num2) {
    // 1,容错处理,确定两个数值大小顺序
    var min = Math.min(num1, num2);
    var max = Math.max(num1, num2);

    // 2,求最小公倍数
    // 循环从 较大值 开始 至 两个数值的 乘积
    // 可以优化循环 , 累加的步长是 较大值
    for (var i = max; i <= min * max; i += max) {
        // 如果 i 可以同时整除两个数值 , i 就是 最小公倍数
        if (i % min === 0 && i % max === 0) {
            // 如果发生整除,就返回i 
            // return 可以同时 终止循环的执行
            return i;
        }
    }
}

// 求最大公约数
function getGCD(num1, num2) {
    // 1,容错处理,确定两个数值大小顺序
    var min = Math.min(num1, num2);
    var max = Math.max(num1, num2);

    // 2,定义一个死循环,发生整除时,才会终止循环
    while (true) {
        if (max % min === 0) {
            return min;
        } else {
            // 给 max 和 min  赋值新的数值
            // max 应该是  上一次的 min 
            // min 应该是  上一次的 max%min 的余数 
            // 定义临时变量 存储数值

            // num 中 存储原始max
            var tmp = max;
            // 下一次max 赋值 上一次的min
            max = min;
            // min 是 上一次max,就是当前num中的数值 % min本身
            min = tmp % min;
        }
    }
}

// 获取当前时间字符串
function getNowTimeStr() {
    // 获取当期时间dx
    var time = new Date();
    // 获取4位年份
    var year = time.getFullYear();
    // 获取月份 结果是 0-11 表示 1-12月 
    // 获取结果,与实际结果差1
    var month = time.getMonth() + 1;
    var date = time.getDate();
    // 获取星期 : 0-6 表示 星期日-星期六
    var weekArr = ['日', '一', '二', '三', '四', '五', '六'];
    var week = `星期${weekArr[time.getDay()]}`;

    // 时分秒,做 前导补零 处理
    // 当数值小于 10 , 在数值前 拼接 '0'
    // 当获取的时间数值 小于 10  赋值的 是 字符串0 拼接上 当前时间    
    // 当获取的时间数值 大于等于 10  直接赋值当前时间
    var hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    var minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    var seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();

    return `当前时间是${year}年,${month}月,${date}日,${week},${hours}时,${minutes}分,${seconds}秒`;
}



/*
    定义一个函数,输入一个终止时间/结束时间
    返回给你,距离倒计时结束,还有几天,几小时,几分钟,几秒钟
*/

function getCountDown(end) {
    // 1, 获取 时间差 单位 秒
    // 终止时间戳(秒) - 当前时间戳(秒)

    // 当前时间对象
    var nowTime = new Date();

    // 终止时间对象
    var endTime = new Date(end);

    // 获取时间差
    var time = parseInt((endTime.getTime() - nowTime.getTime()) / 1000);

    // 2, 将时间差总秒数,转化为 天 小时 分钟 秒
    var d = parseInt(time / (24 * 60 * 60));
    var h = parseInt((time % (24 * 60 * 60)) / (60 * 60));
    var m = parseInt((time % (60 * 60)) / 60);
    var s = time % 60;

    // 前导补零处理
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    // 3, 创建一个对象,对象的属性是 天 时 分 秒 , 属性值是我们计算的数值
    // 如果对象的属性和属性值,名称都相同,可以就写一个
    // 自定创建对象的属性,属性名称就是变量的名称,属性的数值就是变量中存储的数值
    return { d, h, m, s };
}


// 删除class属性值中,指定的某个选择器
// 参数1 : 执行删除操作的标签对象
// 参数2 : 执行删除操作,需要删除的class选择器名称

function myRemoveClass(element, Attr) {
    // 1,获取标签对象,class属性值字符串
    var classStr = element.className;

    // 2,将class属性值字符串,按照空格作为间隔符号,转化为数组
    var classArr = classStr.split(' ');

    // 3,循环遍历数组中的每一个单元
    // 如果这个单元存储的数据,也就是 选择器名称 和 要删除的选择器名称相同
    // 就删除这个单元   从 这个单元的索引开始,删除1个单元
    for (var i = 0; i <= classArr.length - 1; i++) {
        // classArr 是 选择器名称数组 
        // i 是 索引下标
        // classArr[i] 是 对应的 每一个 选择器名称
        // classArr[i] 选择器名称 如果与 要删除的 选择器名称相同
        // 就 从 这个单元对应的索引 i 开始 删除 删除1个单元
        if (classArr[i] === Attr) {
            classArr.splice(i, 1);
            // 为了防止数组坍塌,执行i--,删除的单元位置,再次循环操作
            i--;
        }
    }

    // 4, 将新数组 再次拼接为字符串,设定回标签 class 样式属性
    element.className = classArr.join(' ');
}


// 获取标签css样式的兼容语法函数
// 参数1: 需要获取样式的标签对象
// 参数2: 需要获取样式的属性名称
function myGetStyle(element, style) {
    // 如果 浏览器 支持 window.getComputedStyle    执行结果有内容,自动转化为 true
    // 如果 浏览器 不支持 window.getComputedStyle  执行结果,为undefined,自动转化为 false
    if (window.getComputedStyle) {
        // window.getComputedStyle 转化为 true 的情况
        // 也就是 浏览器 支持 window.getComputedStyle 可以使用
        return window.getComputedStyle(element)[style];
    } else {
        // window.getComputedStyle 转化为 false 的情况
        // 浏览器不支持 window.getComputedStyle 方法  不能使用
        return element.currentStyle[style];
    }
}



// 获取地址栏数据信息
// 地址栏中,?问号之后的get方式的传出数据
// 以对象的形式返回

function getUrlVal() {
    // 创建空对象,准备存储键值对数据信息
    var obj = {};


    // 1, 获取 字符串结果,第一位是 ? 问号 需要删除
    // 使用 substr 截取 ,从 字符串的第二个字符串,也就是索引是1的字符开始截取
    var str = window.decodeURI(window.location.search).substr(1);

    // 2, 每一个键值对,以 & 符号作为间隔,将字符串转化为数组
    // 数组中的每一个单元,就是传参的键值对
    // username=张三   userpwd=123456   age=18   sex=男
    var arr = str.split('&');

    // 3, 数组中的每一个单元存储的数据,都是 键值对字符串
    // 语法形式都是 键名=数值
    // 按照 等号 做间隔 可以将 键值对字符串,转化为 两个单元的数组
    // 第一个单元存储键名        第二个单元 存储键值

    // forEach 中 第一次参数val  存储 的是 单元的数据
    // 也就是 键值对字符串
    // 将 val 键值的字符串 按照 = 等号 为间隔,转化为数组
    arr.forEach(function (val) {
        // arr2中的数据
        // 索引是0 的 单元 存储的是 键值对的 键名 --- 对象的属性
        // 索引是1 的 单元 存储的是 键值对的 数据 --- 对象的属性值
        var arr2 = val.split('=');
        // 将 arr2[0] 作为对象的键名  arr2[1] 作为对象的键值
        obj[arr2[0]] = arr2[1];
    })

    return obj;
}


// 运动函数的封装
// 参数1 : 运动的标签对象
// 参数2 : 运动标签对象的属性和最终值 ( 必须是 对象类型 )
// 参数3 : 运动停止时,执行的回调函数, 可以是匿名函数,或者定义好的函数名称

function move(element, typeObj, fun) {
    // 1, 创建一个对象,存储定时器
    const IntervalObj = {};

    // 2, 使用for..in 循环遍历参数2
    // 自定义变量,必须使用let声明
    for (let type in typeObj) {
        // 每次循环都创建一个定时器,存储在定时器对象中
        IntervalObj[type] = setInterval(() => {
            // 1, 获取初始值 , 如果是 透明度 , 初始值 和 最终值 都要乘以 100
            var startVal = type === 'opacity' ? myGetStyle(element, type) * 100 : parseInt(myGetStyle(element, type));

            // 获取最终数值,如果是透明度就乘以100
            var endVal = type === 'opacity' ? typeObj[type] * 100 : typeObj[type];

            // 2, 计算步长: (最终值 - 初始值 ) / 设定的次数
            // 设定次数,不是定时器执行的次数
            var speed = (endVal - startVal) / 5;

            // 3, 对步长取整,大于0,向上取整,小于0,向下取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            // 4, 初始值,累加步长
            startVal += speed;

            // 5, 将新的数值,设定给 标签
            // 是 透明度 除以100 设定, 不是透明度拼接px设定
            element.style[type] = type === 'opacity' ? startVal / 100 : startVal + 'px';

            // 6, 判断,如果 初始值累加至最终值,清除 当前运动属性,对应的定时器,停止运动
            if (startVal === endVal) {
                // 清除 当前运动属性 对应的 定时器
                clearInterval(IntervalObj[type]);
                // 清除 对象中 当前属性 对应的单元
                delete (IntervalObj[type]);
                // 使用 Object.keys()  获取 对象中的所有属性,组成数组
                const typeArr = Object.keys(IntervalObj);
                // 如果数组的长度是0,对象,就是空对象,所有定时器都清除了,所有运动属性都停止了
                if (typeArr.length === 0) {
                    // 调用运动停止时,执行的函数,参数3
                    // 如果第三个参数,类型是函数类型,执行对象的函数程序
                    // 如果第三个参数,不是函数类型,执行空字符串
                    typeof (fun) === 'function' ? fun() : '';

                }
            }

        }, 30);

    }
}



