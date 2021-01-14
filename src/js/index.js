//加载nav下拉页




const cookieObj = myGetCookie();
let loginInfoObj;
console.log(cookieObj)
if (cookieObj.login) {
     loginInfoObj = JSON.parse(cookieObj.login);
    if (loginInfoObj.login === 1) {
        console.log('已登录');
        $('a[name=login]').html('欢迎您，' + loginInfoObj.name);
    } else {
        $('a[name=login]').html('登录');
    }
}




$('[name=login]').click(() => {
    window.location.href = `./pages/login.html?url=${window.location.href}`;
})










//轮播图
const imgArr = [{
    path: '../img/1.jpg',
    width: 3480,
    height: 1200,
},
{
    path: '../img/2.jpg',
    width: 3480,
    height: 1200,
},
{
    path: '../img/3.jpg',
    width: 3480,
    height: 1200,
},
{
    path: '../img/4.jpg',
    width: 3480,
    height: 1200,
},
];
const banner = new Banner(document.querySelector('#banner'), imgArr);
banner.init();


//鼠标滚动显示回到顶部
window.addEventListener('scroll', () => {

    let windowScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (windowScrollTop >= 100) {

        $('.last').css("display", "block")
    } else {
        $('.last').css("display", "none")
    }
});

//点击回到顶部回到顶部
$('.last').click(() => {
    document.documentElement.scrollTop = 0;
})




