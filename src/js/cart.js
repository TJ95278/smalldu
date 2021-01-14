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


 setHTML();

    $('.container').click(function (e) {
        let cartArr = JSON.parse(window.localStorage.getItem('cart'));
  
        if ($(e.target).attr('name') === 'all') {
          cartArr.forEach((v, k) => {
            v.buy = $(e.target).prop('checked');
  
          })
        }
  
  
        if ($(e.target).attr('name') === 'other') {
          cartArr.forEach((v, k) => {
            if (v.skuName === $(e.target).attr('skuName')) {
              v.buy = $(e.target).prop('checked');
  
            }
  
          })
        }
  
        if ($(e.target).attr('name') === 'decrease') {
          cartArr.forEach((v, k) => {
            if (v.skuNo === $(e.target).attr('skuNo')) {
              if(v.num===1){
                $(e.target).attr('disabled','disabled');
                window.alert('此商品不能在减少了哟')
              }else{
                v.num--;
              }
            
              
            }
  
          })
        }
  
        if ($(e.target).attr('name') === 'increase') {
          cartArr.forEach((v, k) => {
            if (v.skuNo === $(e.target).attr('skuNo')) {
              v.num++;
            
  
            }
  
          })
        }
        if ($(e.target).attr('name') === 'del') {
          cartArr.forEach((v, k) => {
            if (v.skuNo === $(e.target).attr('skuNo')) {
               
              cartArr.splice(k,1);
            
            }
          
          })
        }
        window.localStorage.setItem('cart',JSON.stringify(cartArr));
        setHTML();
  
      })
  
  
      function setHTML() {
        let cartArr = window.localStorage.getItem('cart');
        console.log(cartArr);
        if (cartArr === 'null' || JSON.parse(cartArr).length === 0) {
          $('.container').html('<h1>购物车里空空的哟</h1>');
          return;
        }
  
          cartArr = JSON.parse(cartArr);
       
          let isAllChecked = true;
          let type = 0;
          let sumNum = 0;
          let pay = 0;
  
  
          let str = ` 
                      <div class="panel panel-info ">
                        <div class="panel-body bg-info">
                          <div class="checkbox">
                            <label>
                              <input type="checkbox" value="" name="all" >
                              全选
                            </label>
                          </div>
                        </div>
                        <div class="panel-footer">
                          <ul class="cart-list">`;
          cartArr.forEach((v, k) => {
            if (v.buy) {
              type++;
              sumNum += v.num;
              pay += v.num * (v.price/100);
            } else {
              isAllChecked = false;
            }
            str += `
                  <li class="cart-item">
                    <div class="left">  
                      <input name="other" type="checkbox" ${v.buy?'checked':''} skuName=${v.skuName}>
                    </div>
                    <div class="right">
                      <div class="media">
                        <div class="media-left">
                          <a href="#">
                            <img class="media-object" src="https://product-online.cdn.bcebos.com/${v.picture.picId}" alt="...">
                          </a>
                        </div>
                        <div class="media-body">
                          <h4 class="media-heading">${v.skuName}</h4>
                          <p>
                            <i class="glyphicon glyphicon-yen"></i>
                            <span>${v.price/100}</span>
                          </p>
                          <div class="btn-group pull-right" role="group" aria-label="...">
                            <button type="button" class="btn btn-default" name='decrease' skuNo=${v.skuNo} ${v.num===1?'disabled':''}>-</button>
                            <button type="button" class="btn btn-default" disabled>${v.num}</button>
                            <button type="button" class="btn btn-default" name='increase' skuNo=${v.skuNo} }>+</button>
                          </div>
                          <button class="del btn btn-danger" name="del" skuNo=${v.skuNo}>我不要了</button>
  
                        </div>
                      </div>
                    </div>
                  </li>
            
            
            `;
          })
  
  
          str += `      
                </ul>
              </div>
            </div>
        <div>
          <h1><span>共${type}种商品,已选择${sumNum}件</span><span>${pay.toFixed(2)}元</span></h1>
         
        </div>`;
          $('.container').html(str);
          $('[name="all"]').prop('checked', isAllChecked)
  
        
  
      }