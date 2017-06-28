/*获取所要操作的节点对象*/
var smallBox = document.getElementById("top");   
var smallImgs = document.querySelectorAll(".box-left .top img");
var bigBox = document.getElementById("bigBox");
var bigImgs = document.querySelectorAll(".box-right img");
var tool = document.getElementById("tool");
var tabs = document.querySelectorAll(".tabs li");
var btnLeft = document.getElementById("btnLeft");
var btnRight = document.getElementById("btnRight");
var list = document.getElementById("list");
var flag = true;

var currentIndex = 0; //控制索引
smallBox.onmouseenter = function() {
	hideSmallImgs();
	smallImgs[currentIndex].className = "active";
	tool.className = "tool active";
	bigBox.className = "box-right active";
	bigImgs[currentIndex].className = "active";
	tabs[currentIndex].className = "active"

}
smallBox.onmouseleave = function() {
	smallImgs[currentIndex].className = "active";
	tool.className = "tool";
	bigBox.className = "box-right";
	bigImgs[currentIndex].className = "";
}

function hideSmallImgs() {
	for (var i = 0; i < smallImgs.length; i++) {
		smallImgs[i].className = "";
		bigImgs[i].className = "";
		tabs[i].className = ""
	}
}

smallBox.onmousemove = function(e) {
	var _e = window.event || e;
	//tool.offsetWidth/2
	/*鼠标移动之后的tool的x坐标*/
	var x = _e.clientX - this.offsetLeft - tool.offsetWidth / 2;
	/*鼠标移动之后的tool的y坐标*/
	var y = _e.clientY - this.offsetTop - tool.offsetHeight / 2;
	/*
		范围限定
	*/
	if (x < 0) {
		x = 0;
	}
	if (x > this.offsetWidth - tool.offsetWidth) {
		x = this.offsetWidth - tool.offsetWidth
	}
	if (y < 0) {
		y = 0;
	}
	if (y > this.offsetHeight - tool.offsetHeight) {
		y = this.offsetHeight - tool.offsetHeight
	}
	/*更改小盒子的坐标*/
	tool.style.left = x + "px";
	tool.style.top = y + "px";

	/*大图片随着tool移动之后坐标*/
	var left = x * 3;
	var top = y* 3;

	bigImgs[currentIndex].style.left = -left + "px";
	bigImgs[currentIndex].style.top = -top + "px";

}

for(var i = 0;i<tabs.length;i++){
	tabs[i].index = i;
	tabs[i].onmouseenter = function(){
		hideSmallImgs();
		currentIndex = this.index;
		smallImgs[currentIndex].className = "active";
		bigImgs[currentIndex].className = "active";
		tabs[currentIndex].className = "active"
	}
}

var step = list.offsetWidth/tabs.length;
btnLeft.onclick = function(){
	var left = list.offsetLeft;
	left+=step;
	if(left<=0){
//		list.style.left = left + "px";
		if(flag){
			flag = false;
			animate(list,{left:left},10,function(){
				flag = true;
			})
		}
		
	}
	
}
btnRight.onclick = function(){
	var left = list.offsetLeft;
	left-=step;
	if(list.offsetWidth+list.offsetLeft>290){
//		list.style.left = left + "px";
		
		if(flag){
			flag = false;
			animate(list,{left:left},10,function(){
				flag = true;
			})
		}
		
	}
	
}

