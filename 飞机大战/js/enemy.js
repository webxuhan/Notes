var Enemy = function(){
	this.x = 0;  
	this.y = 0;
	this.width = 34;    //敌人机的宽
	this.height = 24;   //敌人机的高
	this.speed = 50;    //敌人机的基础速度
	this.imgURL = "images/enemy1_fly_1.png";  //敌人机的图片路径
	this.boom = "images/enemy1_fly_3.gif";    //敌人机的爆炸图片
	this.container = null;          //初始化容器
	this.bullList = [];             //存储子弹的数组
	this.plane = null;              //初始化敌人机
	this.boomTime = 400;            //敌人机的爆炸时间
	this.createSpeed = 50;          //敌人机的创建速度(多久创建一个)
	this.createCount = 1;           //相对于小飞机的创建倍数(创建多少个小飞机才创建一个大中型飞机)
	this.createNum =1;              //创建计数器(每创建一个小飞机就加一次)
	this.counter = 0;               //子弹打击的次数
	this.endCounter = 1;            //打击次数(子弹打击多少次敌人机才消失)
};
//重写原型属性
Enemy.prototype = {
	init:function(){	
		var that = this;
		var count = 0;		
		setInterval(function(){
			count++;						
			if(count==15){
				if(that.createNum%that.createCount==0){
			    that.create();							
		       }
				that.createNum++;
				count = 0;
		  }
		},that.createSpeed)
	},
	//创建敌人机(重写原型方法)
	create:function(){
		var x = parseInt((this.container.offsetWidth-this.width)*Math.random());
		this.enemy = document.createElement("img");
		this.enemy.style.cssText = "position:absolute;left:"+x+"px;top:"+(-this.height)+"px;";
		this.enemy.src = this.imgURL;
		this.enemy.isImpact = true;
		
		this.container.appendChild(this.enemy);
		var enemy = this.enemy;
		var that = this;
		var speed = parseInt(Math.random()*5)+1;      
		this.enemy.timer = setInterval(function(){
			enemy.style.top = enemy.offsetTop + speed+"px";    //敌人机速度
			if(enemy.offsetTop>=enemy.parentNode.offsetHeight){ //清除敌人机的条件
				clearInterval(enemy.timer);
			    enemy.parentNode.removeChild(enemy);
			}
			//console.log(that.bullList);
			for(var i=0;i<that.bullList.length;i++){
				var bull = that.bullList[i];
				if(bull.offsetLeft+bull.offsetWidth>enemy.offsetLeft&&bull.offsetLeft<enemy.offsetLeft+enemy.offsetWidth){
					if(bull.offsetTop+bull.offsetHeight>enemy.offsetTop&&bull.offsetTop<enemy.offsetTop+enemy.offsetHeight&&enemy.isImpact){
					  //清除子弹计时器和碰撞的子弹					 
					  clearInterval(bull.timer);
					  that.bullList.removeDOM(bull);
					  bull.parentNode.removeChild(bull);
					  that.counter++;
					  if(enemy.isImpact&&that.counter>=that.endCounter){
					  	//利用动态属性存储一个常量值,来标识该物体是否参与图片切换
					  	  that.counter = 0;
					  	  enemy.src = that.boom;
					  	  setTimeout(function(){
					  	  	 enemy.parentNode.removeChild(enemy);
					  	  },that.boomTime)
					  	  //enemy.parentNode.removeChild(enemy);
					  	  clearInterval(enemy.timer);
					  	  enemy.isImpact = false;
					  	  //console.log(1);
					  }
					   
					}
				}
			}
		},this.speed);
	},
};
//创建中型敌人机(重写中型飞机的属性)
var MiddEnemy = function(){
	Enemy.call(this);                  
	this.width = 46;
	this.heigth = 60;
	this.imgURL = "images/enemy2_fly_1.png";
	this.boom = "images/enemy2_fly_3.gif";
	this.boomTime = 800;
	this.speed = 20;
	this.endCounter = 4;
	this.createCount =4;               
};
//继承小型飞机
MiddEnemy.prototype = Enemy.prototype;

var BigEnemy = function(){
	Enemy.call(this);
	this.width = 110;
	this.height = 170;
	this.imgURL = "images/enemy3_fly_1.png";
	this.boom = "images/enemy3_fly_3.gif";
	this.boomTime = 1000;
	this.endCounter = 6;
	this.speed = 20;
	this.createCount = 8;  
};
BigEnemy.prototype = Enemy.prototype;
