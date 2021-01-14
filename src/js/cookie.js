// 获取cookie键值对转化为的对象

function myGetCookie(){
    const obj = {};
    // 先按照 逗号空格 为间隔,转化为数组
    const arr1 = document.cookie.split('; ');
    // 循环遍历数组,将键值对,按照 等号 为间隔,转化为数组
    arr1.forEach(v=>{
      const arr2 = v.split('=');
      // 新数组,索引0,存储键名
      // 新数组,索引1,存储键值
      // 分别作为对象的键名和键名存储
      obj[ arr2[0] ] = arr2[1]; 
      
    })
    return obj;
}


// 设定cookie键值对
// 需要三个参数
// 1, cookie 的 键名
// 2, cookie 的 键值
// 3, cookie 的 时效 --- 单位是秒

function mySetCookie(key,value,endTime){
    // 1,需要创建,设定,时间对象
    // 创建事件对象
    const timeObj = new Date();
    // 获取当前时间戳 --- 转化为 标准时间 -8小时的毫秒 --- 加上时效的毫秒
    let time = timeObj.getTime() - 8*60*60*1000 + endTime*1000;

    // 设定给时间对象 , 设定之后 , time中的时间戳,就是世界标准时,时效时间戳 
    timeObj.setTime( time );

    // 设定cookie
    // 如果 endTime 参数 有数据输入 就设定时效为 参数的时效
    // 如果 endTime 参数 没有有数据输入 就是设定时效为 空字符串也就是 session 会话时效
    document.cookie = `${key}=${value};expires=${ endTime ? timeObj : '' };path=/`;

}