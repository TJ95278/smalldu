"use strict";$("#reg").click(function(){console.log("mmp"),window.location.href="../pages/reg.html"}),$("[name=login]").click(function(){$.ajax({url:"../server/goods_login.php",data:{userName:$("[name=userName]").val(),userPwd:$("[name=pwd]").val()},type:"post",dataType:"json",success:function(e){1===e.result?(window.alert("登录成功！"),mySetCookie("login",JSON.stringify({login:1,name:$("[name=userName]").val()}),604800),window.location.href=window.location.search.substr(5)):window.alert("登录失败，账号或密码输入错误！")}})});