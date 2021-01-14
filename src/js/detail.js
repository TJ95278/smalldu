const urlObj = getUrlVal();


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
  window.location.href = `./login.html?url=${window.location.href}`;
})

function getTimeStamp() {
  return new Date().getTime();
}

let msg;

let res1;


let check=0;
$.ajax({
  // https://dumall.baidu.com/api/products/spu_skus/v3?timestamp=1605790353062&spuNo=SPU4302695687&channelId=0&platformId=0
  url: `/xddetail1?timestamp=${getTimeStamp()}&spuNo=${urlObj.spuNo}&channelId=0&platformId=0`,
  contentType: 'application/json;charset=UTF-8',
  type: 'get',
  dataType: 'json',
  success: res => {
    msg = res;
    // https://dumall.baidu.com/api/products/base/v2/236095139053764/1?timestamp=1605792124497&platform=1&channelId=0&platformId=0

    res1=res;
    // 

    // console.log(data);
    // let a = 37958870974469;

    // $.ajax({
    //     url:`/xddetail2/${urlObj.spuNo}/1?timestamp=${getTimeStamp()}&platform=1&channelId=0&platformId=0`,
    //     contentType: 'application/json;charset=UTF-8',
    //     type: 'get',
    //     dataType: 'json',
    //     success:res2=>{
    //         console.log(res2);
    //     }
    // })

    setHtml(res1.data[0][0]);

  }
})



function setHtml(data){

   let  str = `
          
      <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">商品详细信息</h3>
      </div>
      <div class="panel-body">
        <div class="media">
          <div class="media-left">
            <a href="#">
              <img class="media-object" src="https://product-online.cdn.bcebos.com/${data.picture.picId}" alt="...">
            </a>
          </div>
          <div class="media-body">
            <h4 class="media-heading myName">${data.skuName}</h4>
            <h5>${data.skuDesc}</h5>
            <p>
              <i class="glyphicon glyphicon-yen"></i>
              <span>${data.price/100}</span>
            </p>
            <div class="btn-group skuNames" role="group" aria-label="...">
            
            </div>
            <p>
              <a href="javascript:;" class="btn btn-warning btn-lg" role="button">立即购买</a>
              <a href="javascript:;" name="addCart" class="btn btn-danger btn-lg" role="button">加入购物车</a>
            </p>
          </div>
        </div>
        <ul class="nav nav-tabs">
          <li role="presentation" class="active"><a href="#">商品详细信息</a></li>
          <li role="presentation"><a href="#">商品参数信息</a></li>
          <li role="presentation"><a href="#">相关商品</a></li>
        </ul>
        <div>
          <h1>下面应该有大图<h1>
        </div>
      </div>
    </div>
          `;






  $('.container').html(str);
  let typeStr='';
 
  msg.data[0].forEach((v, k) => {
 
    typeStr += `
   <button type="button" name='typeBtn' class="btn btn-default myTypeBtn" index=${k}>${v.skuName}</button>
             
`;
  })
  $('.skuNames').html(typeStr);
}







$('.container').on('click', '[name="addCart"]', () => {

  if (loginInfoObj && loginInfoObj.login === 1) {

    let cartArr = window.localStorage.getItem('cart');

    if (cartArr == null) {

      msg.data[0][check].num = 1;
      msg.data[0][check].buy = true;
      const arr = [ msg.data[0][check]];
      window.localStorage.setItem('cart', JSON.stringify(arr))
      window.alert('新增购物车，并添加一件商品:' +  msg.data[0][check].skuName);
      if (window.confirm('是否需要跳转至购物车？')) {
        window.location.href = './cart.html';
      }
    } else {

      cartArr = JSON.parse(cartArr);

      let bool = true;
      cartArr.forEach((v, k) => {
        if (v.skuNo ===  msg.data[0][check].skuNo) {
          v.num++;
          bool = false;

          window.alert('购物车已有此件商品，数量+1    ' +  msg.data[0][check].skuName);
        }
      })
      if (bool) {
        msg.data[0][check].num = 1;
        msg.data[0][check].buy = true;
        cartArr.push( msg.data[0][check]);
        window.alert('购物车无此件商品，成功加入购物车：' +  msg.data[0][check].skuName);
      }
      if (window.confirm('是否需要跳转至购物车？')) {
        window.location.href = './cart.html';
      }
      window.localStorage.setItem('cart', JSON.stringify(cartArr));
   
    }


  } else {
    let bool = window.confirm('您还未登录，点击确定跳转至登录界面');
    if (bool) {
      window.location.href = `./login.html?url=${window.location.href}`;
    }
  }
})


$('.container').on('click','[name=typeBtn]',e=>{

      setHtml(res1.data[0][parseInt($(e.target).attr('index'))])
    check=parseInt($(e.target).attr('index'));
  })