/*
	功能：获取指定节点样式属性的值
	参数：obj 表示的指定的节点对象，porpertyName 表示的是样式属性名
*/
  
function getStylePropertyValue(dom,propertyName){
	if(dom.currentStyle){//undefined
		return dom.currentStyle[propertyName];//IE8及以下
	}else{
		return getComputedStyle(dom,null)[propertyName];//标准
	}
}



/*
   动画
   参数：dom:要操作的节点对象
   		dataObj:{} 要改变的属性
   		time：时间
   		fn:结束动画后的发生事件
 */

function animate(dom,dataObj,time,fn){
	clearInterval(dom.termId);

	dom.termId = setInterval(function(){
		var flag = true;
		
		//循环遍历要改变的属性值
		for(var attr in dataObj){
			//判断属性
			if(attr == "opacity"){//属性为透明度属性
				var currentValue = getStylePropertyValue(dom,"opacity")*100;
			}else{
				var currentValue = parseInt(getStylePropertyValue(dom,attr));
			}
			//指定属性值-原来属性值
			//正负判断方向
			var step = (dataObj[attr]-currentValue)/10;
			if(step>0){
				step = Math.ceil(step);//向上取整
			}else{
				step = Math.floor(step);//向下取整
			}
			//判断是否完成属性的改变
			if(currentValue==dataObj[attr]){
				continue;//结束本次循环，继续下面的循环
			}
			//只要有一个没有完成就会有flag = 0;
			if(currentValue!=dataObj[attr]){
				flag = 0;
			}
			//确定变化的过程
			if(attr=="opacity"){
				currentValue += step;
				dom.style["opacity"] =currentValue/100;
				dom.style["filter"] = "alpha(opacity=" + currentValue + ")";
			}else{
				currentValue += step;
				dom.style[attr] = currentValue +"px";
			}
		}
		if(flag){//所有属性都完成了变化
			clearInterval(dom.termId);
			if(fn){
				fn();
			}
		}
	},time);
}


  