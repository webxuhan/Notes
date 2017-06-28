/**
 * Created by Administrator on 2016/10/31.
 */


var userName = document.getElementById("username");
var pwd = document.getElementById("pwd");
var repwd = document.getElementById("repwd");
var register = document.getElementById("register");
var header_back = document.getElementById("header_back");

header_back.onclick = function(){
    history.back();
}

userName.onblur = checkuserName;
function checkuserName(){
    var mobileReg = /^[1-3]\d{10}$/;
    if(userName.value == ""){
        userName.parentNode.style.border = "1px solid red";
        userName.parentNode.nextElementSibling.innerHTML = "用户名不能为空";
        return false;
    }else if(mobileReg.test(userName.value)){
        userName.parentNode.style.border = "none";
        userName.parentNode.nextElementSibling.innerHTML = "";
        return true;
    }else{
        userName.parentNode.style.border = "1px solid red";
        userName.parentNode.nextElementSibling.innerHTML = "请输入正确的手机号";
        return false;
    }
}
pwd.onblur = checkPwd;
function checkPwd(){
    var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    // console.log(pwdReg.test(pwd.value));
    if(pwd.value == ""){
        pwd.parentNode.style.border = "1px solid red";
        pwd.parentNode.nextElementSibling.innerHTML = "密码不能为空";
        return false;
    }else if(!pwdReg.test(pwd.value)){
        pwd.parentNode.style.border = "1px solid red";
        pwd.parentNode.nextElementSibling.innerHTML = "请至少输入两种字符长度大于6";
        return false;
    }else{
        pwd.parentNode.style.border = "none";
        pwd.parentNode.nextElementSibling.innerHTML = "";
        return true;
    }
}
repwd.onblur = checkRepwd;
function checkRepwd(){
    if(repwd.value != pwd.value){
        repwd.parentNode.style.border = "1px solid red";
        repwd.parentNode.nextElementSibling.innerHTML = "确认密码与密码不一致";
        return false;
    }else{
        repwd.parentNode.style.border = "none";
        repwd.parentNode.nextElementSibling.innerHTML = "";
        return true;
    }
}

register.onclick = function(){
    if(checkuserName() && checkPwd() && checkRepwd()){
        // alert("ok");
        var userName = document.getElementById("username");
        var pwd = document.getElementById("pwd");
        ajax({
            method:"POST",
            isAsyc:true,
            url:"http://datainfo.duapp.com/shopdata/userinfo.php",
            params:{status:"register",userID:userName.value,password:pwd.value},
            success:function(data){
                // alert(data);
                if(data == "0"){
                    alert("用户名已存在");
                }else if(data == "1"){
                    alert("注册成功");
                    location.href = "login.html";
                }else if(data == "2"){
                    alert("注册失败");
                }
            },
            eroor:function(mes){
                console.log(mes)
            }
        })
    }
}




