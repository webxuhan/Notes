var userName = document.getElementById("userName");  //获取用户名节点对象
userName.onfocus = userName.onblur = userName.onkeyup = checkUserName;
/*
 	验证用户名
 */
function checkUserName(e){
	var _e = window.event||e;
	var v = userName.value;  //用户名中的内容
	var box = userName.parentNode;  //获取box节点对象
	var tip = box.nextElementSibling;  //信息提示容器节点对象
	var span = tip.lastElementChild;  //获取显示提示信息内容的节点对象
	//_e.type
	if(_e.type=="focus"){  //获取焦点事件
		if(v.length==0){  //文本框中的内容为空时，显示默认提示信息
			tip.className = "tip default";
			box.className = "box";
			span.innerHTML = "支持汉字、字母、数字、“-”“_”的组合，4-20个字符";
			return false;
		}
	}
	
	if(_e.type=="blur"){
		if(v.length==0){
			tip.className = "tip hide";
			box.className = "box";
			return; false
		}
	}
	
	/*其他情况（用户输入的时候或点击注册按钮的时候）*/
	if(v.length==0){  //文本框为空的情况下
		box.className = "box error";
		tip.className = "tip error";
		span.innerHTML = "请输入用户名";
		return false;
	}else{  //文本框不为空的情况
		if(regExpManger.userNameReg.test(v)){  //格式正确
			if(v.length>=4&&v.length<=20){  //长度正确
				box.className = "box right";
				tip.className = "tip hide";
				return true;
			}else{ //长度不够
				box.className = "box error";
				tip.className = "tip error";
				span.innerHTML = "长度只能在4-20个字符之间";
				return false;
			}
		}else{
			box.className = "box error";
			tip.className = "tip error";
			span.innerHTML = "格式错误，仅支持汉字、字母、数字、“-”“_”的组合，4-20个字符";
			return false;
		}
	}
	
	
}


/*---------------------------------验证密码---------------------*/
var pwd = document.getElementById("pwd");  //获取设置密码节点对象
pwd.onfocus = pwd.onblur = pwd.onkeyup = checkPwd;
/*
 	验证设置密码
 */
function checkPwd(e){
	var _e = window.event||e;
	var v = pwd.value;  //设置密码框中的内容
	var box = pwd.parentNode;  //获取box节点对象
	var tip = box.nextElementSibling;  //信息提示容器节点对象
	var span = tip.lastElementChild;  //获取显示提示信息内容的节点对象
	//_e.type
	if(_e.type=="focus"){  //获取焦点事件
		if(v.length==0){  //文本框中的内容为空时，显示默认提示信息
			tip.className = "tip default";
			box.className = "box";
			span.innerHTML = "建议使用数字、字母和符号两种以上的组合，6-20个字符";
			return false;
		}
	}
	
	if(_e.type=="blur"){
		if(v.length==0){
			tip.className = "tip hide";
			box.className = "box";
			return; false
		}
	}
	
	/*其他情况（用户输入的时候或点击注册按钮的时候）*/
	if(v.length==0){  //文本框为空的情况下
		box.className = "box error";
		tip.className = "tip error";
		span.innerHTML = "请输入密码";
		return false;
	}else{  //文本框不为空的情况
		if(v.length>=6&&v.length<=20){ //长度符合
			box.className = "box right";
			var leval = getLevel(v);
			switch(leval){
				case 1:
					tip.className = "tip ruo";
					span.innerHTML = "有被盗风险,建议使用字母、数字和符号两种及以上组合;"
					break;
				case 2:
					tip.className = "tip zhong";
					span.innerHTML = "安全强度适中，可以使用三种以上的组合来提高安全强度"
					break;
				default:
					tip.className = "tip qiang";
					span.innerHTML = "你的密码很安全"
				
			}
			return true;
		}else{  //长度不符合
			box.className = "box error";
			tip.className = "tip error";
			span.innerHTML = "长度只能在6-20个字符之间";
			return false;
		}
	}
	
	
}


/*--------------------------------确定密码--------------------------*/
/*
 	验证确认密码
 */
var pwd2 = document.getElementById("pwd2");  //获取设置密码节点对象
pwd2.onfocus = pwd2.onblur = pwd2.onkeyup = checkPwd2;
/*
 	验证设置密码
 */
function checkPwd2(e){
	var _e = window.event||e;
	var v = pwd2.value;  //设置密码框中的内容
	var v1 = pwd.value;
	var box = pwd2.parentNode;  //获取box节点对象
	var tip = box.nextElementSibling;  //信息提示容器节点对象
	var span = tip.lastElementChild;  //获取显示提示信息内容的节点对象
	//_e.type
	if(_e.type=="focus"){  //获取焦点事件
		if(v.length==0){  //文本框中的内容为空时，显示默认提示信息
			tip.className = "tip default";
			box.className = "box";
			span.innerHTML = "请再次输入密码";
			return false;
		}
	}
	
	if(_e.type=="blur"){
		if(v.length==0){
			tip.className = "tip hide";
			box.className = "box";
			return; false
		}
	}
	
	/*其他情况（用户输入的时候或点击注册按钮的时候）*/
	if(v.length==0){  //文本框为空的情况下
		box.className = "box error";
		tip.className = "tip error";
		span.innerHTML = "请再次输入密码";
		return false;
	}else{  //文本框不为空的情况
		if(v1==v){
			box.className = "box right";
			tip.className = "tip hide";
			return true;
		}else{
			box.className = "box error";
			tip.className = "tip error";
			span.innerHTML = "两次密码输入不一致";
			return false;
		}
	}
	
	
}

/*--------------------邮箱验证-----------------------------------*/
var email = document.getElementById("email");  //获取用户名节点对象
email.onfocus = email.onblur = email.onkeyup = checkEmail;
/*
 	验证用户名
 */
function checkEmail(e){
	var _e = window.event||e;
	var v = email.value;  //用户名中的内容
	var box = email.parentNode;  //获取box节点对象
	var tip = box.nextElementSibling;  //信息提示容器节点对象
	var span = tip.lastElementChild;  //获取显示提示信息内容的节点对象
	//_e.type
	if(_e.type=="focus"){  //获取焦点事件
		if(v.length==0){  //文本框中的内容为空时，显示默认提示信息
			tip.className = "tip default";
			box.className = "box";
			span.innerHTML = "完成邮箱后，可以使用该邮箱登录或找回密码";
			return false;
		}
	}
	
	if(_e.type=="blur"){
		if(v.length==0){
			tip.className = "tip hide";
			box.className = "box";
			return; false
		}
	}
	
	/*其他情况（用户输入的时候或点击注册按钮的时候）*/
	if(v.length==0){  //文本框为空的情况下
		box.className = "box error";
		tip.className = "tip error";
		span.innerHTML = "请输入邮箱";
		return false;
	}else{  //文本框不为空的情况
		if(regExpManger.emaiReg.test(v)){  //格式正确
			box.className = "box right";
			tip.className = "tip hide";
			return true;
		}else{
			box.className = "box error";
			tip.className = "tip error";
			span.innerHTML = "邮箱格式错误";
			return false;
		}
	}
	
	
}

/*--------------------------验证手机号-------------------------------*/
var mobile = document.getElementById("mobile");  //获取用户名节点对象
mobile.onfocus = mobile.onblur = mobile.onkeyup = checkMobile;
/*
 	验证用户名
 */
function checkMobile(e){
	var _e = window.event||e;
	var v = mobile.value;  //用户名中的内容
	var box = mobile.parentNode;  //获取box节点对象
	var tip = box.nextElementSibling;  //信息提示容器节点对象
	var span = tip.lastElementChild;  //获取显示提示信息内容的节点对象
	//_e.type
	if(_e.type=="focus"){  //获取焦点事件
		if(v.length==0){  //文本框中的内容为空时，显示默认提示信息
			tip.className = "tip default";
			box.className = "box";
			span.innerHTML = "完成手机号码后，可以使用该手机号码登录或找回密码";
			return false;
		}
	}
	
	if(_e.type=="blur"){
		if(v.length==0){
			tip.className = "tip hide";
			box.className = "box";
			return; false
		}
	}
	
	/*其他情况（用户输入的时候或点击注册按钮的时候）*/
	if(v.length==0){  //文本框为空的情况下
		box.className = "box error";
		tip.className = "tip error";
		span.innerHTML = "请输入手机号";
		return false;
	}else{  //文本框不为空的情况
		if(regExpManger.mobileReg.test(v)){  //格式正确
			box.className = "box right";
			tip.className = "tip hide";
			return true;
		}else{
			box.className = "box error";
			tip.className = "tip error";
			span.innerHTML = "手机号码格式错误";
			return false;
		}
	}
	
	
}

/*--------------------------验证验证码-------------------------------*/
var code = document.getElementById("code");  //获取用户名节点对象
code.onfocus = code.onblur  = checkCode;
function checkCode(e){
	var _e = window.event||e;
	var v = code.value;  //用户名中的内容
	var box = code.parentNode;  //获取box节点对象
	var tip = box.nextElementSibling;  //信息提示容器节点对象
	var span = tip.lastElementChild;  //获取显示提示信息内容的节点对象
	//_e.type
	if(_e.type=="focus"){  //获取焦点事件
		if(v.length==0){  //文本框中的内容为空时，显示默认提示信息
			tip.className = "tip default";
			box.className = "box";
			span.innerHTML = "验证码验证";
			return false;
		}
	}
	
	if(_e.type=="blur"){
		if(v.length==0){
			tip.className = "tip hide";
			box.className = "box";
			return; false
		}
	}
	
	/*其他情况（用户输入的时候或点击注册按钮的时候）*/
	if(v.length==0){  //文本框为空的情况下
		box.className = "box error";
		tip.className = "tip error";
		span.innerHTML = "请输入验证码";
		return false;
	}else{  //文本框不为空的情况
		var code2 = document.getElementById("code2")
		if(code.value==code2.value){  //格式正确
			box.className = "box right";
			tip.className = "tip hide";
			return true;
		}else{
			box.className = "box error";
			tip.className = "tip error";
			span.innerHTML = "验证码不一致";
			return false;
		}
	}
	
	
}


/*获取注册按钮*/
var btn = document.getElementById("btn");
btn.onclick = function(){
	var ck = document.getElementById("ck"); //协议节点对象
	var box = ck.parentNode;  //获取box节点对象
	var tip = box.nextElementSibling;  //信息提示容器节点对象
	var span = tip.lastElementChild;  //获取显示提示信息内容的节点对象
	
	if(ck.checked){  //选中
		box.className = "box";
		tip.className = "tip hide";
		if(checkUserName()&&checkPwd()&&checkPwd2()&&checkEmail()&&checkMobile()&&checkCode()){  
			alert("可以注册")
		}
		
		
	}else{//没有选中
		box.className = "box error";
		tip.className = "tip error";
		span.innerHTML = "请同意协议";
	}
}

/*计算密码安全级别*/
function getLevel(pwd){
	var leval = 0;  //级别
	var isHasWord = false;  //没有记录过
	var isHasNumber = false;  //没有记录过
	var isHasOther = false;   //没有记录过
	for(var i = 0;i<pwd.length;i++){
		//abc123&
		if(regExpManger.wordReg.test(pwd[i])){
			if(isHasWord){  //true
				continue;
			}else{   //
				isHasWord = true;
				leval+=1;
			}
		}else if(regExpManger.numReg.test(pwd[i])){
			if(isHasNumber){  //true
				continue;
			}else{   //
				isHasNumber = true;
				leval+=1;
			}
		}else{
			if(isHasOther){  //true
				continue;
			}else{   //
				isHasOther = true;
				leval+=1;
			}
		}
	}

	return leval; //级别
}


















