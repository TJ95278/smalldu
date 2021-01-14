$('#vc').html(setVc()).click(()=>{$('#vc').html(setVc())});

$('[name="login"]').click(() => {
  window.location.href = `./login.html?url=${window.location.href}`;
})

$('button').click(()=>{
  const name = $('[name="name"]').val();
  const pwd = $('[name="pwd1"]').val();
  console.log(name);
  console.log(pwd);
  if (!name || !pwd) {return alert('请完整填写用户名或密码')}
  if (!/^[a-z0-9]\w{4,11}$/i.test(name) || !/^\w{6,12}$/i.test(pwd)) return alert('用户名密码不符合规则')
  if(!$('input[type="checkbox"]').prop('checked')){
    window.alert('请勾选阅读协议');
    return;
  }
  if($('[name="pwd1"]').val()===$('[name="pwd2"]').val()){
    $('[name="pwd2Span"]').html('');
  }else{
    $('[name="pwd2Span"]').html('两次密码不一致，请重新输入！');
    return;
  }

  if($('[name="vc"]').val().toUpperCase()=== $('#vc').text().toUpperCase()){
    $('[name="vcSpan"]').html('');
  }else{
    $('[name="vcSpan"]').html('验证码错误，请重新输入！');
    return;
  }

  $.ajax({
    url:'../server/goods_res.php',
    data:{userName:$('[name="name"]').val(),userPwd:$('[name="pwd1"]').val()},
    type: 'post',
    dataType:'json',
    success:res=>{
      console.log(res);
      if(res.result===1){
        $('.mask').css({display:'flex'});
        let time=5;
        setInterval(() => {
          time--;
          $('.mask div p').html(`恭喜您，注册成功，页面将在${time}后跳转`);
          if(time===0){
            window.location.href='../index.html';
          }
        }, 1000);
      }else{
        window.alert('注册失败，用户名重复')
      }
    }
  })

})

$('[name="name"]').change(()=>{
  $.ajax({
    url:'../server/goods_select.php',
    data:{userName:$('[name="name"]').val()},
    type:'post',
    dataType:'json',
    success:res=>{
      if(res.result===1){
        $('[name="nameSpan"]').html('<span style="color:green">账号可用</span>')
      }else{
        $('[name="nameSpan"]').html('<span style="color:red">账号重复</span>')
      }
    }
  })
})