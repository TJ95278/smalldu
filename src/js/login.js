$('#reg').click(()=>{
    console.log('mmp')
    window.location.href='../pages/reg.html';
})


    $('[name=login]').click(() => {
        //1.验证账号密码格式
        
 
        // 2.发送ajax请求
        $.ajax({
          url: '../server/goods_login.php',
          data: {
            userName: $('[name=userName]').val(),
            userPwd: $('[name=pwd]').val()
          },
          type: 'post',
          dataType: 'json',
          success: res => {
            
            if (res.result === 1) {
              window.alert('登录成功！');
              mySetCookie('login', JSON.stringify({login:1,name: $('[name=userName]').val()}), 60 * 60 * 24 * 7);
           
              window.location.href = window.location.search.substr(5);

          
            } else {
              window.alert('登录失败，账号或密码输入错误！')
            }
          }
        })
        
      })