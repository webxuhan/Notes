	var EventUtil = {
			//添加事件
			addHandler : function(element,type,handler){
				if(element.addEventListener){
					element.addEventListener(type,handler,false);
				} else if(element.attachEvent){
					element.attachEvent("on"+type,handler);
				} else{
					element["on"+type] = handler;
				}
			},
			removeHandler: function(element,type,handler){
				if(element.removeEventListener){
					element.removeEventListener(type,handler,false);
				} else if(element.detachEvent){
					element.detachEvent("on"+type,handler);
				} else{
					element["on"+type] = null;
				}
			},
			getEvent: function(event){
				// undefined ,null,0,""
				// 表达式?true_return:false_false
				return event?event:window.event;
			},
			//获取目标对象 
			getTarget:function(event){
				//false,undefined,null 
				return event.target || event.srcElement;
			},
			//阻止事件冒泡
			stopPropagation:function(event){
				if(event.stopPropagation){
					event.stopPropagation();
				}else{
					event.cancelBubble = true;
				}
				//event.stopPropagation?event.stopPropagation():event.cancelBubble = true;
			},
			preventDefault : function(event){
				if(event.preventDefault){
					event.preventDefault();
				}else{
					event.returnValue = false;
				}
			}
			
		}