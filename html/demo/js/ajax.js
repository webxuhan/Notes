/*AJAX*/
/*
	数据对象
	method:方式,
	isAsyc:是否异步,
	url:路径,
	params:{key:value,key:value....},
	success:function(data){},
	error:function(mes){}
*/
function ajax(o){
	var xhr;
	if(window.XMLHttpRequest){
		xhr = new XMLHttpRequest();
	}else{
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(o.method=="get"){//GET
		if(o.params){//有条件请求
			xhr.open("GET",o.url+"?random="+new Date().getTime()+"&"+getStr(o.params),o.isAsyc);
		}else{//无条件请求
			xhr.open("GET",o.url+"?random="+new Date().getTime(),o.isAsyc);
		}
		xhr.send();
	}else{//POST
		xhr.open("POST",o.url,o.isAsyc);
		var params = getStr(o.params);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(params);
	}
	
	if(o.isAsyc){//异步  true
		xhr.onreadystatechange = function(){
			handler();
		}
	}else{//同步 false
		handler();
	}
	/*处理会话结果*/
	function handler(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				o.success(xhr.responseText);
			}else{
				o.error(xhr.status);
			}
		}
	}
}

function getStr(params){
	var arr = [];
	for(var item in params){
		arr.push(item+"="+params[item]);
	}
	var str = arr.join("&");
	return str;
}