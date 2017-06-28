//定义构造函数
var MyPlane = function(){
	this.x = 0;
	this.y = 0;
	this.width = 66;
	this.height = 80;
	this.bullheight = 14;
	this.imgURL = "images/my.gif";
	this.bullImgURL = "images/bullet1.png";
	this.container=null;
	this.bullSendSpeed = 20;
	this.arrBull = [];
	this.createBullSpeed = 30;
};
//重写原型方法
MyPlane.prototype = {
	//原型里面的初始化方法
	init:function(){
		this.addRemove();
		this.create();
		this.events();
		var that = this;
		var count = 0;
		setInterval(function(){
			count++;
			if(count==15){
			    that.createBull();
			    count = 0;
			}			
		},this.createBullSpeed)
	},
	//创建我方飞机
	create:function(){
		this.plane = document.createElement("img");
		this.plane.style.cssText = "position:absolute;left"+this.x+"px;top:"+this.y+"px;";
		this.plane.src = this.imgURL;
		this.container.appendChild(this.plane);
	},
	//让飞机移动
	events:function(){
		var that = this;
		this.container.onmousemove = function(e){
			var e = e||event;
			var x = e.clientX - this.offsetLeft - that.width/2;			
			var y = e.clientY - this.offsetTop - that.height/2;
			//console.log(x,y);
			that.plane.style.left = Math.max(0,Math.min(x,this.offsetWidth - that.width)) + "px";
			that.plane.style.top = Math.max(0,Math.min(y,this.offsetHeight - that.height)) + "px";
		};
	},
	//创建子弹
	createBull:function(){
		this.bull = document.createElement("img");
		this.bull.style.cssText = "position:absolute;left:"+(this.plane.offsetLeft + this.plane.offsetWidth/2 - 2)+"px;top:"+(this.plane.offsetTop - this.bullheight/2 -3)+"px;";
		this.bull.src = this.bullImgURL;
		this.container.appendChild(this.bull);
        var bull = this.bull;
        var that = this;
        this.arrBull.push(bull);
        this.bull.timer = setInterval(function(){
			bull.style.top = bull.offsetTop - 3 + "px";
			if(bull.offsetTop<=0-that.bullheight){
				clearInterval(bull.timer);
				that.arrBull.removeDOM(bull);
				bull.parentNode.removeChild(bull);
			}
		},this.bullSendSpeed);	
		//console.log(that.arrBull);
	},
	//移除元素
	addRemove:function(){
		Array.prototype.removeDOM = function(element){
			for(var i=0;i<this.length;i++){
				if(this[i]==element){
					this.splice(i,1);
				}
			}
		}
	}
};
