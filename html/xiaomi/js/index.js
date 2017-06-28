/*-----------topbar--------------*/
var iCart = document.getElementById("icart");
var topbar_cart = icart.parentNode;
var aCart = topbar_cart.firstElementChild;
topbar_cart.onmouseenter = function(){
	aCart.className = "active";
	iCart.className = "icart active";
	animate(icart,
		{height:100},
		10);
}
topbar_cart.onmouseleave = function(){
	animate(iCart,
		{height:0}
		,10,function(){
			aCart.className = "";
			iCart.className = "icart";
		});
}


/*----------------header---------------------*/
var headerNavList = document.getElementById("header_nav_list");
var NavLis = headerNavList.children;
var NavLisIndex = 0;
for(var i = 0;i<NavLis.length;i++){
	NavLis[i].index = i;
	NavLis[i].onmouseenter = function(){
		NavLisIndex = this.index;
		this.lastElementChild.className = "nav-item-box active";
		animate(this.lastElementChild,{height:200},10,function(){
			for(var j = 0;j<NavLis.length;j++){
				NavLis[j].lastElementChild.className = "nav-item-box";
				NavLis[NavLisIndex].lastElementChild.className = "nav-item-box active";
			}
		});
	}
}
headerNavList.onmouseleave = function(){
	setTimeout(function(){
		animate(NavLis[NavLisIndex].lastElementChild,{height:0},10,function(){
			NavLis[NavLisIndex].lastElementChild.className = "nav-item-box";
		});
	},200);
}
/*----------------------ajax获取header的数据-------------------------*/
//获取商品信息
ajax({
	method:"get",
	isAsyc:true,
	url:"json/header.json",
	success:function(data){
		var arr = JSON.parse(data);
		for(var j = 0;j<arr.length;j++){
			createHeaderLi(arr,j);
		}
	},
	error:function(mes){
		console.log(mes);
	}
});

//创建li
function createHeaderLi(arr,NavLisIndex){
	for(var i = 0;i<arr[NavLisIndex].list.length;i++){
		var imgURL = arr[NavLisIndex].list[i].img;
		var imgName = arr[NavLisIndex].list[i].imgName;
		var pirce = arr[NavLisIndex].list[i].pirce;
		var li = document.createElement("li");
		if(i==0){
			li.innerHTML = '<div class="first"><a href="#"><img src="'+imgURL+'" alt="" /></a></div><p><a href="#">'+imgName+'</a></p><p>'+pirce+'</p>';
		}else{
			li.innerHTML = '<div><a href="#"><img src="'+imgURL+'" alt="" /></a></div><p><a href="#">'+imgName+'</a></p><p>'+pirce+'</p>';
		}
		var ul = NavLis[NavLisIndex].lastElementChild.firstElementChild.firstElementChild;
		ul.appendChild(li);
	}
}


/*------------------------search_input-------------------------*/
var searchInput = document.getElementById("search_input");
var headerSearchBox = searchInput.parentNode.parentNode;
var searchP = searchInput.nextElementSibling;
var searchBtn = headerSearchBox.lastElementChild;
var searchBoxList = headerSearchBox.nextElementSibling;
searchInput.onfocus = function(){
	headerSearchBox.className = "header_search_box active";
	searchBtn.className = "search_btn active";
	searchP.className = "hide";
	searchBoxList.className = "search_box_list active";
}
searchInput.onblur = function(){
	headerSearchBox.className = "header_search_box";
	searchBtn.className = "search_btn";
	searchP.className = "";
	searchBoxList.className = "search_box_list";
}
/*--------获取search推荐商品-------------*/
ajax({
	method:"get",
	isAsyc:true,
	url:"json/header_search.json",
	success:function(data){
		var arr = JSON.parse(data);
		createSearchLi(arr);
	},
	error:function(mes){
		console.log(mes);
	}
});
function createSearchLi(arr){
	var ul = searchBoxList.firstElementChild;
	for(var i = 0;i<arr.length;i++){
		var li = document.createElement("li");
		li.innerHTML = '<a href="#">'+arr[i].goodName+'<span>'+arr[i].count+'</span></a>';
		ul.appendChild(li);
	}
}
/*-------------------------pic------------------------------*/
var picPictures = document.getElementsByClassName("pic_picture");
var pic = picPictures[0].parentNode.parentNode;
var picIndex = document.getElementById("pic_index");
var picIndexLis = picIndex.children;
var picBtnLeft = document.getElementById("pic_btn_left");
var picBtnRight = document.getElementById("pic_btn_right");
var picZiDo;//自动轮播的定时器
var thisIndex = 0;//当前索引
/*---------------pic自动轮播效果------------------*/
function picLunBo(){
	for(var j = 0;j<picIndexLis.length;j++){
		picIndexLis[j].className = "";
		picPictures[j].style.opacity = 0;
	}
	picIndexLis[thisIndex].className = "active";
	picPictures[thisIndex].style.opacity = 0.4;
	animate(picPictures[thisIndex],{
		opacity:100
	},50);
}
for(var i = 0;i<picIndexLis.length;i++){
	picIndexLis[i].index = i;
	picIndexLis[i].onclick = function(){
		thisIndex = this.index;
		picLunBo();
	}
}
ziDoLunBo();
function ziDoLunBo(){
	picZiDo = setInterval(function(){
		thisIndex++;
		thisIndex%=picIndexLis.length;
		picLunBo();
	},3000);
}
picBtnLeft.onclick = function(){
	thisIndex--;
	if(thisIndex<0){
		thisIndex = picIndexLis.length-1;
	}
	picLunBo();
}
picBtnRight.onclick = function(){
	thisIndex++;
	thisIndex%=picIndexLis.length;
	picLunBo();
}
pic.onmouseenter = function(){
	clearInterval(picZiDo);
}
pic.onmouseleave = function(){
	ziDoLunBo();
}
/*--------------pic_subnav的浮动事件------------------*/
var picNav = document.getElementById("pic_nav");
var picSubnavs = document.getElementsByClassName("pic_subnav");
for(var i = 0;i<picSubnavs.length;i++){
	picSubnavs[i].index = i;
	picSubnavs[i].onmouseenter = function(){
		var picSubnavHidebox = this.lastElementChild;
		var picSubnavHideList = picSubnavHidebox.children;
		picSubnavHidebox.style.width = picSubnavHideList.length*260 + "px";
		picSubnavHidebox.className = "pic_subnav_hidebox active";
	}
	picSubnavs[i].onmouseleave = function(){
		var picSubnavHidebox = this.lastElementChild;
		picSubnavHidebox.className = "pic_subnav_hidebox";
	}
}

/*------------------获取picNavHideBox的值--------------------------*/

ajax({
	method:"get",
	isAsyc:true,
	url:"json/pic_subnav.json",
	success:function(data){
		var arr = JSON.parse(data);
		getPicNavName(arr);
	},
	error:function(mes){
		console.log(mes);
	}
});

function  getPicNavName(arr){
	for(var i = 0;i<arr.length;i++){
		var subName = picSubnavs[i].firstElementChild.firstElementChild;
		subName.innerHTML = arr[i].subnavName;
		for(var j = 0;j<arr[i].hideBox.length;j++){
			var oUl = document.createElement("ul");
			oUl.className = "pic_hidebox_list";
			for(k = 0;k<arr[i].hideBox[j].list.length;k++){
				var li = document.createElement("li");
				li.innerHTML = '<div><a href="#"><img src="'+arr[i].hideBox[j].list[k].img+'" alt="" /><span>'+arr[i].hideBox[j].list[k].imgName+'</span></a></div>';
				if(arr[i].hideBox[j].list[k].isXuGou){
					var a = document.createElement("a");
					a.className = "xuangou"; 
					a.innerHTML = "选购";
					a.href = "#";
					li.appendChild(a);
				}
				oUl.appendChild(li);
			}
			picSubnavs[i].lastElementChild.appendChild(oUl);
		}
	}
}


/*-------------------------home-star-goods--------------------------*/
var starList = document.getElementById("star_list");
var starBtnLeft = document.getElementById("star_btn_left");
var starBtnRight = document.getElementById("star_btn_right");
ajax({
	method:"get",
	isAsyc:true,
	url:"json/star_goods.json",
	success:function(data){
		var arr = JSON.parse(data);
		starGoods(arr);
	},
	error:function(mes){
		console.log(mes);
	}
});

function starGoods(arr){
	for(var i = 0;i<arr.length;i++){
		var li = document.createElement("li");
		li.className = "border"+i%5;
		li.innerHTML = '<a class="a-img" href="#"><img src="'+arr[i].imgSrc+'"/></a><h3><a href="#">'+arr[i].imgName+'</a></h3><p class="desc">'+arr[i].imgDesc+'</p><p class="price">'+arr[i].price+'</p>';
		starList.appendChild(li);
	}
}

function doStarGoods(){
	//alert(parseInt(starList.style.marginLeft));
	if(parseInt(starList.style.marginLeft) == 0){
		animate(starList,{
			marginLeft:-1240
		},10);
	}else{
		animate(starList,{
			marginLeft:0
		},10);
	}
	
}
ziDoStarGoods();
var ziDoStar;
function ziDoStarGoods(){
	ziDoStar = setInterval(function(){
		doStarGoods();
	},4000);
}
starBtnLeft.onmouseenter = function(){
	if(parseInt(starList.style.marginLeft) != 0){
		this.className = "active";
	}
}
starBtnLeft.onmouseleave = function(){
	this.className = "";
}
starBtnRight.onmouseenter = function(){
	if(parseInt(starList.style.marginLeft) == 0){
		this.className = "active";
	}
}
starBtnRight.onmouseleave = function(){
	this.className = "";
}
starBtnLeft.onclick = function(){
	if(parseInt(starList.style.marginLeft) != 0){
		clearInterval(ziDoStar);
		animate(starList,{
			marginLeft:0
		},10);
		setTimeout(function(){
			ziDoStarGoods();
		},1000);
	}
}
starBtnRight.onclick = function(){
	if(parseInt(starList.style.marginLeft) == 0){
		clearInterval(ziDoStar);
		animate(starList,{
			marginLeft:-1240
		},10);
		setTimeout(function(){
			ziDoStarGoods();
		},1000);
	}
}
/*----------------------smart-goods-----------------------------*/
var smartList = document.getElementById("smart_list");
ajax({
	method:"get",
	isAsyc:true,
	url:"json/smart.json",
	success:function(data){
		var arr = JSON.parse(data);
		createSmartLi(arr);
	},
	error:function(mes){
		console.log(mes);
	}
});
function createSmartLi(arr){
	for(var i = 0;i<arr.length;i++){
		var li = document.createElement("li");
		li.innerHTML = '<div class="page-img"><a href="#"><img src="'+arr[i].imgSrc+'" alt="" /></a></div><h3 class="page-title"><a href="#">'+arr[i].imgTitle+'</a></h3><p class="desc">'+arr[i].imgDesc+'</p><p class="price"><span>'+arr[i].price+'</span>元</p>';
		if(arr[i].imgFlag){
			var color = flagColor(arr[i].imgFlag);
			var dv = document.createElement("div");
			dv.className = "flag";
			dv.style.background = color;
			dv.innerHTML = arr[i].imgFlag;
			li.appendChild(dv);
		}
		smartList.appendChild(li);
	}
}

function flagColor(imgFlag){
	var colors = ["#ffac13","#83c44e","#e53935"];
	//var flag = ["免邮费","新品"];
	if(imgFlag=="免邮费"){
		return colors[0];
	}else if(imgFlag=="新品"){
		return colors[1];
	}else{
		return colors[2];
	}
}


/*------------------------------------page-main-match-----------------------------------*/
var matchMoreList = document.getElementById("match_more_list");
var matchRightList = document.getElementById("match_right_list");
var matchMoreLis = matchMoreList.children;
var matchRightLis = matchRightList.children;
var matchRightListChild = document.getElementsByClassName("match_right_list_child");
var matchIndex = 0;
for(var i = 0;i<matchMoreLis.length;i++){
	matchMoreLis[i].index = i;
	matchMoreLis[i].onmouseenter = function(){
		for(var j = 0;j<matchMoreLis.length;j++){
			matchMoreLis[j].className = "";
			matchRightLis[j].style.display = "none";
		}
		this.className = "active";
		matchRightLis[this.index].style.display = "block";
		matchIndex = this.index;
	}
}

ajax({
	method:"get",
	isAsyc:true,
	url:"json/match.json",
	success:function(data){
		var arr = JSON.parse(data);
		getMatchGoods(arr);
	},
	error:function(mes){
		console.log(mes);
	}
});

function getMatchGoods(arr){
	for(var i = 0;i<arr.length;i++){
		for(var j = 0;j<arr[i].list.length;j++){
			var li = document.createElement("li");
			
			li.innerHTML = '<div class="page-img"><a href="#"><img src="'+arr[i].list[j].imgSrc+'" alt="" /></a></div><h3 class="page-title"><a href="#">  '+arr[i].list[j].imgTitle+'  </a></h3><p class="price"><span>'+arr[i].list[j].price+'</span>元</p><p class="rank">'+arr[i].list[j].rank+'</p>';
			if(arr[i].list[j].imgFlag){
				var color = flagColor(arr[i].list[j].imgFlag);
				var dv = document.createElement("div");
				dv.className = "flag";
				dv.style.background = color;
				dv.innerHTML = arr[i].list[j].imgFlag;
				li.appendChild(dv);
			}
			var dv = document.createElement("div");
			dv.className = "review-box";
			dv.innerHTML = '<a href="#"><span class="review-txt">'+arr[i].list[j].reviewTxt+'</span><span class="review-author">'+arr[i].list[j].reviewAuthor+' </span></a>';
			li.appendChild(dv);
			matchRightListChild[i].appendChild(li);
		}
		var li1 = document.createElement("li");
		li1.innerHTML = '<div><a href="#"><img src="images/T15hZ_BsDv1RXrhCrK.jpg" alt="" /></a></div><h3 class="page-title"><a href="#">  小米移动电源5000mAh  </a></h3><p class="price"><span>49</span>元</p>';
		li1.className = "last-list";
		matchRightListChild[i].appendChild(li1);
		var li2 = document.createElement("li");
		li2.innerHTML = '<div><a href="#"><i></i></a></div><h3 class="page-title"><a href="#" class="more-title">浏览更多</a></h3><p class="desc">热门</p>';
		li2.className = "last-list";
		matchRightListChild[i].appendChild(li2);
	}
	
	for(var k = 0;k<matchRightListChild.length;k++){
		var lis = matchRightListChild[k].children;
		for(var i = 0;i<lis.length-2;i++){
			lis[i].onmouseenter = function(){
				var reviewBox = this.lastElementChild;
				animate(reviewBox,{
					height:76,
					opacity:100
				},10,function(){
					this.className = "active";
				});
			}
			lis[i].onmouseleave = function(){
				
				var reviewBox = this.lastElementChild;
				animate(reviewBox,{
					height:0,
					opacity:0
				},10,function(){
					this.className = "";
				});
			}
		}
	}
	
}


/*------------------------recommend-----------------------------*/
var recommendList = document.getElementById("recommend_list");
var recommendBtnLeft = document.getElementById("recommend_btn_left");
var recommendBtnRight = document.getElementById("recommend_btn_right");
var recommendBtnCount = 0;
recommendBtnRight.onclick = function(){
	recommendBtnCount++;
	if(recommendBtnCount>=3){
		recommendBtnCount = 3;
	}
	animate(recommendList,{
		marginLeft:-1240*recommendBtnCount
	},10);
}
recommendBtnLeft.onclick = function(){
	recommendBtnCount--;
	if(recommendBtnCount<=0){
		recommendBtnCount = 0;
	}
	animate(recommendList,{
		marginLeft:-1240*recommendBtnCount
	},10);
}

recommendBtnLeft.onmouseenter = function(){
	if(parseInt(recommendList.style.marginLeft) < 0){
		this.className = "active";
	}
}
recommendBtnLeft.onmouseleave = function(){
	this.className = "";
}
recommendBtnRight.onmouseenter = function(){
	if(parseInt(recommendList.style.marginLeft) > -3720){
		this.className = "active";
	}
}
recommendBtnRight.onmouseleave = function(){
	this.className = "";
}

ajax({
	method:"get",
	isAsyc:true,
	url:"json/recommend.json",
	success:function(data){
		var arr = JSON.parse(data);
		getRecommendGoods(arr);
	},
	error:function(mes){
		console.log(mes);
	}
});

function getRecommendGoods(arr){
	for(var i = 0;i<arr.length;i++){
		var li = document.createElement("li");
		li.className = "item";
		li.innerHTML = '<dl><dt><a href="#"><img src="'+arr[i].imgSrc+'" alt="" /></a></dt><dd class="recommend-name"><a href="#"> '+arr[i].imgName+' </a></dd><dd class="recommend-price">'+arr[i].price+'</dd><dd class="recommend-tips">'+arr[i].tips+'</dd></dl>';
		recommendList.appendChild(li);
	}
}

/*----------------------------page-main-commend------------------------------*/
var boxCommentList = document.getElementById("box_comment_list");
ajax({
	method:"get",
	isAsyc:true,
	url:"json/commend.json",
	success:function(data){
		var arr = JSON.parse(data);
		getCommendGoods(arr);
	},
	error:function(mes){
		console.log(mes);
	}
});

function getCommendGoods(arr){
	for(var i = 0;i<arr.length;i++){
		var li = document.createElement("li");
		if(i==0){
			li.className = "first";
		}
		li.innerHTML = '<div class="figure"><a href="#"><img src="'+arr[i].imgSrc+'"/></a></div><p class="review"><a href="#">'+arr[i].review+'</a></p><p class="author">'+arr[i].author+' </p><div class="info"><h3 class="page-title"><a href="#">'+arr[i].imgTitle+'</a></h3><span class="sep">|</span><p class="price"><span class="num">'+arr[i].num+'</span>元</p></div>';
		boxCommentList.appendChild(li);
	}
}
/*---------------------------page-main-content----------------------------------*/
var contentCenter = document.getElementById("content_center");
function contentDOM(){
	var contentItem = contentCenter.children;
	var itemWrapperList = document.getElementsByClassName("item-wrapper-list");
	var pager = document.getElementsByClassName("pager");
	for(var i = 0;i<contentItem.length;i++){
		contentItem[i].index = i;
		contentItem[i].count = 0;
		contentItem[i].onmouseenter = function(){
			var controlWrapper = this.lastElementChild;
			var pagerLis = pager[this.index].children;
			animate(controlWrapper,{
				opacity:100
			},60);
			var btnLeft = controlWrapper.firstElementChild;
			var btnRight = controlWrapper.lastElementChild;
			btnLeft.onclick = function(){
				this.parentNode.parentNode.count--;
				var count = this.parentNode.parentNode.count;
				if(count<=0){
					count = 0;
					this.parentNode.parentNode.count = 0;
				}
				var index = this.parentNode.parentNode.index;
				contentCenterListGo(index,count);
			}
			btnRight.onclick = function(){
				this.parentNode.parentNode.count++;
				var count = this.parentNode.parentNode.count;
				if(count>=3){
					count = 3;
					this.parentNode.parentNode.count = 3;
				}
				var index = this.parentNode.parentNode.index;
				contentCenterListGo(index,count);
			}
			for(var k = 0;k<pagerLis.length;k++){
				pagerLis[k].index = k;
				pagerLis[k].firstElementChild.onclick = function(){
					this.parentNode.parentNode.parentNode.parentNode.count = this.parentNode.index;
					var count = this.parentNode.index;
					var index = this.parentNode.parentNode.parentNode.parentNode.index;
					contentCenterListGo(index,count);
				}
			}
			
		}
		contentItem[i].onmouseleave = function(){
			var controlWrapper = this.lastElementChild;
			animate(controlWrapper,{
				opacity:0
			},10);
		}
	}
	
	function contentCenterListGo(index,count){
		itemWrapperList[index].style.marginLeft = -296*count + "px";
		var lis = pager[index].children;
		for(var i = 0;i<lis.length;i++){
			lis[i].className = "";
		}
		lis[count].className = "active";
	}

}

ajax({
	method:"get",
	isAsyc:true,
	url:"json/content.json",
	success:function(data){
		var arr = JSON.parse(data);
		getContentGoods(arr);
		contentDOM();
	},
	error:function(mes){
		console.log(mes);
	}
});

function getContentGoods(arr){
	for(var i = 0;i<arr.length;i++){
		var li = document.createElement("li");
		if(i==0){
			li.className = "content-item first content-item-book";
		}else if(i==1){
			li.className = "content-item content-item-theme";
		}else if(i==2){
			li.className = "content-item content-item-game";
		}else{
			li.className = "content-item content-item-app";
		}
		var h = document.createElement("h2");
		h.className = "title";
		h.innerHTML = arr[i].title;
		var dv = document.createElement("div");
		dv.className = "item-wrapper";
		var oUl = document.createElement("ul");
		oUl.className = "item-wrapper-list";
		for(var j = 0;j<arr[i].item.length;j++){
			var lis = document.createElement("li");
			lis.innerHTML = '<h4 class="name"><a href="#">'+arr[i].item[j].name+'</a></h4><p class="desc"><a href="#">'+arr[i].item[j].desc+'</a></p><p class="num">'+arr[i].item[j].num+'</p><div class="figuer"><a href="#"><img src="'+arr[i].item[j].imgSrc+'"/></a></div>';
			if(arr[i].item[j].btn){
				lis.className = "more";
				lis.innerHTML = '<p class="desc">'+arr[i].item[j].desc1+'<br/>'+arr[i].item[j].desc2+'</p><a href="#">'+arr[i].item[j].btn+'</a><img src="'+arr[i].item[j].imgSrc+'"/>';
			}
			oUl.appendChild(lis);
		}
		dv.appendChild(oUl)
		li.appendChild(h);
		li.appendChild(dv);
		var dv1 = document.createElement("div");
		dv1.className = "pager-wrapper";
		dv1.innerHTML = '<ul class="pager"><li class="active"><span class="dot"></span></li><li class=""><span class="dot"></span></li><li class=""><span class="dot"></span></li><li class=""><span class="dot"></span></li></ul>';
		li.appendChild(dv1);
		var dv2 = document.createElement("div");
		dv2.className = "control-wrapper";
		dv2.innerHTML = '<i class="control_wrapper_left"><</i><i class="control_wrapper_right right">></i>';
		li.appendChild(dv2);
		contentCenter.appendChild(li);
	}
}








