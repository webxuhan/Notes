/**
 * Created by Administrator on 2016/11/1.
 */


var boxs = document.getElementsByClassName("box");
var btn = document.getElementById("btn");
var fonts = document.getElementsByClassName("font");
var main = document.getElementById("main");
var backs = document.getElementsByClassName("back");
var data = [{level:"一等奖",id:1},{level:"二等奖",id:2},{level:"三等奖",id:3},{level:"四等奖",id:4},{level:"五等奖",id:5},{level:"六等奖",id:6},{level:"七等奖",id:7},{level:"八等奖",id:8},{level:"谢谢",id:0}];
var loginOut = document.getElementById("login-out");
var loginIn = document.getElementById("login-in");
var header_back = document.getElementById("header_back");
var user_info = document.getElementById("user_info");

//获取本地存储的用户名
var username = localStorage.getItem("username");
hasUser();
function hasUser(){
    var username = localStorage.getItem("username");
    if(username){
        loginIn.style.display = "none";
        loginOut.style.display = "block";
    }else{
        loginIn.style.display = "block";
        loginOut.style.display = "none";
    }
}

loginOut.onclick = function(){
    localStorage.removeItem("username");
    hasUser();
}
loginIn.onclick = function(){
    location.href = "login.html";
}

//jsonp的回调函数
function jsoncallback(data){
    console.log(data);
    for(var i = 0;i<data.length;i++){
        var dv = document.createElement("tr");
        var good = getGoods(data[i].fruit);
        dv.innerHTML = "<td>"+data[i].userID+"</td><td>"+good+"</td><td>"+data[i].timer+"</td>";
        user_info.appendChild(dv);
    }
}

/*根据id找奖品*/
function getGoods(pid){
    for(var i = 0;i<data.length;i++){
        if(data[i].id == pid){
            return  data[i].level;
        }
    }
}

/*获取抽奖结果数据*/
(function(){
    var h = parseFloat(window.getComputedStyle(user_info,null).height);
    // console.log(h);
    var JSONP = document.createElement("script");
    JSONP.src = "http://datainfo.duapp.com/lottery/getsuerfr.php?callback=jsoncallback";
    document.body.appendChild(JSONP);
})();

//返回
header_back.onclick = function(){
    history.back();
}

/*打乱数组的顺序 reversal()*/
function reversal(){
    for(var i = 0;i<data.length;i++){
        var j = Math.floor(data.length*Math.random());
        var temp =  data[i];
        data[i] = data[j];
        data[j] = temp;
    }
}
reversal();

/*获取数组中的数据渲染到页面中 getInnerHtml() */
function getInnerHtml(){
    // console.log(data);
    for(var k = 0;k<data.length;k++){
        fonts[k].innerHTML = data[k].level;
        boxs[k].setAttribute("pid",data[k].id);
    }
}
getInnerHtml();

/*抽奖内容一开始显示*/
for(var i = 0;i<boxs.length;i++){
    backs[i].style.transform ="rotateY(180deg)";
    fonts[i].style.transform ="rotateY(0deg)";
}

/*抽奖开始的点击事件*/
btn.onclick = function(){
    if(username){//当前是登录状态可以开始
        ajax({
            method:"POST",
            isAsyc:true,
            url:"http://datainfo.duapp.com/lottery/fruitsubmit.php",
            params:{userID:username},
            success:function(data){
                console.log(data);
                if(data == 0){
                    alert("用户已参与此次活动");
                }else if(data == 2){
                    btn.style.display = "none";//按钮隐藏
                    main.style.display = "block";//抽奖页面显示
                    /*定时器：显示600毫秒后翻牌*/
                    setTimeout(function(){
                        for(var i = 0;i<boxs.length;i++){
                            backs[i].style.transform ="rotateY(0deg)";
                            fonts[i].style.transform ="rotateY(180deg)";
                        }
                    },600);
                    /*定时器：1600毫秒后重新排列数组 并且为每张牌添加点击事件*/
                    setTimeout(function(){
                        reversal();
                        /*每张牌的点击事件*/
                        (function(){
                            for(var i = 0;i<boxs.length;i++){
                                boxs[i].index = i;
                                boxs[i].onclick = function(){
                                    getInnerHtml();
                                    backs[this.index].style.transform ="rotateY(180deg)";
                                    fonts[this.index].style.transform ="rotateY(0deg)";
                                    var pid = this.getAttribute("pid");//获取当前用户抽中的id
                                    // console.log(pid);
                                    ajax({
                                        method:"POST",
                                        isAsyc:true,
                                        url:"http://datainfo.duapp.com/lottery/fruitsubmit.php",
                                        params:{userID:username,fruit:pid},
                                        success:function(data){
                                            // console.log(data);
                                            if(data == 1){
                                                console.log("提交数据成功");
                                            }else if(data == 3){
                                                console.log("提交数据失败");
                                            }
                                        },
                                        eroor:function(mes){
                                            console.log(mes)
                                        }
                                    });
                                    /*定时器：2秒后全部牌显示*/
                                    setTimeout(function(){
                                        for(var i = 0;i<boxs.length;i++){
                                            backs[i].style.transform ="rotateY(180deg)";
                                            fonts[i].style.transform ="rotateY(0deg)";
                                        }
                                    },2000)
                                }
                            }
                        })();
                    },1600);

                }
            },
            eroor:function(mes){
                console.log(mes)
            }
        });

    }else{//先登录
        alert("请先登录");
        location.href = "login.html";
    }
}
