/*
 	功能：AJAX
 	参数多：  怎么来组织？    对象
 		key:value
 		method:"post",   //请求的方式  值：get或post
 		url:"路径",
 		//请求或提交的条件
 		params:{key1:value,key2:value,key3:value.....}   //key1=value1&key2=value2&key3=value3
 		isAsyc:true,    //表示是否是异步  true 或 false
 		success:function(data){   //data表示会话成功后返回后的结果
 			
 		},
 		error:function(mes){   //mes表示的会话失败后返回后的结果
 			
 		}
 		
 */
function ajax(o){
	//第一步 ：先创建AJAX对象
	//XMLHttpRequest 标准模式
	//ActiveXObject("Microsoft.XMLHTTP")			
	var xhr;  //声明AJAX对象变量
	if(window.XMLHttpRequest){  //标准模式下创建的AJAX对象
		xhr = new XMLHttpRequest();
	}else{  //非标准模式下创建的AJAX对象
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	/*根据请求方式执行不同逻辑*/
	if(o.method=="get"){  //get請求
		if(o.params){//有请求条件的时候
			xhr.open("GET",o.url+"?random="+new Date().getTime()+"&"+getStr(o.params),o.isAsyc)
		}else{//没有请求条件的时候
			xhr.open("GET",o.url+"?random="+new Date().getTime(),o.isAsyc)
		}
		xhr.send();
	}else{  			  //post請求
		xhr.open("POST",o.url,o.isAsyc);
		var params = getStr(o.params);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.send(params);
	}
	
	if(o.isAsyc){  //异步
		xhr.onreadystatechange = function(){
			handler();
		}
	}else{  //同步
			handler();
	}
	
	/*处理响应的程序*/
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

/*解析请求条件为指定的字符串格式*/
function getStr(params){
	var arr = []
	for(var item in params){
		//item+"="+params[item]     uName=zhangsan
		arr.push(item+"="+params[item])
	}
	var str = arr.join("&");
	//key1=value1&key2=value2&key3=value3
	return str;
}
