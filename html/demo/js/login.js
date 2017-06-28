/**
 * Created by Administrator on 2016/10/31.
 */

var userName = document.getElementById("username");
var pwd = document.getElementById("pwd");
var showPwd = document.getElementById("showPwd");
var rememberPwd = document.getElementById("rememberPwd");
var login = document.getElementById("login");

userName.onblur = checkuserName;
function checkuserName(){
    var mobileReg = /^[1-3]\d{10}$/;
    if(userName.value == ""){
        userName.style.border = "1px solid red";
        return false;
    }else if(mobileReg.test(userName.value)){
        userName.style.border = "none";
        return true;
    }else{
        userName.style.border = "1px solid red";
        return false;
    }
}

pwd.onblur = checkPwd;
function checkPwd(){
    if(pwd.value == "" || pwd.value.length<6){
        pwd.style.border = "1px solid red";
        return false;
    }else{
        pwd.style.border = "none";
        return true;
    }
}
//显示密码的复选框
showPwd.onclick = function () {
    // console.log(this.checked);
    if(this.checked){
        pwd.setAttribute("type","text");
    }else{
        pwd.setAttribute("type","password");
    }

}
//记住密码的复选框
var isFlag = false;
var isuser = localStorage.getItem("isuser");
if(isuser){
    var isuserarr  = JSON.parse(isuser);
    userName.value = isuserarr.username;
    pwd.value = isuserarr.password;
    rememberPwd.checked = true;
    isFlag = true;
}
rememberPwd.onclick = function(){
    // console.log(this.checked);
    if(this.checked){
        isFlag = true;
    }else{
        isFlag = false;
    }
};

login.onclick = function(){
    if(checkuserName() && checkPwd()){
        // alert("ok");
        var userName = document.getElementById("username");
        var pwd = document.getElementById("pwd");

        ajax({
            method:"POST",
            isAsyc:true,
            url:"http://datainfo.duapp.com/shopdata/userinfo.php",
            params:{status:"login",userID:userName.value,password:pwd.value},
            success:function(data){
                console.log(data);
                if(data == 0){
                    alert("用户不存在");
                }else if(data == 2){
                    alert("密码错误");
                }else{
                    var json = JSON.parse(data);
                    // console.log(json.userID);
                    if(isFlag){
                        var userval = {"username":userName.value,"password":pwd.value};
                        localStorage.setItem("isuser",JSON.stringify(userval));
                    }else{
                        localStorage.removeItem("isuser");
                    }
                    localStorage.setItem("username",json.userID);
                    location.href = "demo.html";
                }

            },
            eroor:function(mes){
                console.log(mes)
            }
        })
    }
}

