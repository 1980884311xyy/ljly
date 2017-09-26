/*分享到*/
	window.onload=function(){
	var shareF={
		share:document.getElementsByClassName("share")[0],
		share_btn:document.getElementById("share_btn"),
		init:function(){
			var _this=this;
			var share_cont=this.share.getElementsByClassName("share_cont")[0]
			this.share.onmouseover=function(){
				move(_this.share,{"width":250})
				move(_this.share_btn,{"left":250})
				move(share_cont,{"width":250})
				share_cont.style.display="block"
			}
			this.share.onmouseout=function(){
				move(_this.share,{"width":0})
				move(_this.share_btn,{"left":0})
				move(share_cont,{"width":0})
				share_cont.style.display="none"
			}
		}
	}
	shareF.init();
	
	//联系
	var contactN=document.getElementsByClassName("contactN")[0];
	var cont_oul=contactN.getElementsByTagName("ul")[0]
	cont_oul.onmouseover=function(e){
		var e=e||event;
		var target=e.target||e.srcElement;
		if(target.tagName=="A" && target.className=="active"){
			target.parentElement.children[1].style.display="block"
			move(target.parentElement.children[1],
				{"left":-target.parentElement.children[1].offsetWidth+2})
		}
	}
	cont_oul.onmouseout=function(e){
		var e=e||event;
		var target=e.target||e.srcElement;
		if(target.tagName=="A" && target.className=="active"){
			target.parentElement.children[1].style.display="none"
				move(target.parentElement.children[1],
				{"left":0})
		}
	}
	
	contactN.onclick=function(e){
		var e=e||event;
		var target=e.target||e.srcElement;
		if(target.tagName=="A" && target.className=="up"){
			//scrollT-=200;
			var timer1=setInterval(function(){
				var scrollT=document.documentElement.scrollTop||document.body.scrollTop
				scroolFn(scrollT);
				if(scrollT<=0){
					clearInterval(timer1)
				}
			},30)
		}
	}
	function scroolFn(scrollT){
		var speed=0;
		speed=(-scrollT)/8;
		speed=Math.floor(speed);
		document.documentElement.scrollTop=document.body.scrollTop=scrollT=scrollT+speed;
	}
	//显示隐藏联系
	var toggleF={
		toggle:document.getElementsByClassName("toggle")[0],
		contactN:document.getElementsByClassName("contactN")[0],
		flag:0,
		init:function(){
			var _this=this;
			this.toggle.onclick=function(){
				_this.flag++;
				if(_this.flag%2!=0){
					move(_this.contactN,{"right":-(_this.contactN.offsetWidth)})
					_this.toggle.style.background="#858585 url(../images/show.png) no-repeat 6px 7px";
				
				}else{
					move(_this.contactN,{"right":0})
					_this.toggle.style.background="#858585 url(../images/hide.png) no-repeat 10px center";
				}
			}
		}
	}
	toggleF.init();
	//导航点击
	var guideF={
		guide:document.getElementsByClassName("guide")[0],
		init:function(){
			var oul=this.guide.getElementsByTagName("ul")[0];
			var li=oul.getElementsByTagName("li");
			for(let i=0;i<li.length;i++){
				li[i].onclick=function(){
					for(var j=0;j<li.length;j++){
						li[j].className="";
					}
					this.className="active";
				}
			}
		}
	}	
	guideF.init();
	//轮播图
	wrapF();
	function wrapF(){
		var wrap=document.getElementById("wrap");
		var obtn=wrap.querySelector(".btn");
		var btn=wrap.querySelector(".btn").querySelectorAll("a");
		var oul=wrap.getElementsByTagName("ul")[0];
		//动态设置ul的宽度；克隆第一个li
		var li=oul.children[0].cloneNode(true);
		var now=0;
		var timer=null;
		oul.appendChild(li);
		ali=oul.querySelectorAll("li");
		oul.style.width=ali[0].offsetWidth*ali.length+"px";
		
		//点击左按钮；
		btn[0].onclick=function(){
			now++;
			if(now==ali.length){
				now=1;
				oul.style.left=0;
			}
			move(oul,{"left":-ali[0].offsetWidth*now})
		}
		//点击右侧按钮；
		btn[1].onclick=function(){
			if(now==0){
				now=ali.length-1;
				oul.style.left=-ali[0].offsetWidth*now+"px";
			}
			now--;
			move(oul,{"left":-ali[0].offsetWidth*now})
		}
		//自动播放
		autoplay();
		function autoplay(){
			clearInterval(timer);
			timer=setInterval(function(){
				now++;
			if(now==ali.length){
				now=1;
				oul.style.left=0;
			}
			move(oul,{"left":-ali[0].offsetWidth*now});
			},7000)
		}
		wrap.onmouseover=function(){
			clearInterval(timer);
			obtn.style.display="block";
		}
		wrap.onmouseout=function(){
			autoplay();
			obtn.style.display="none"
		}
	}
	
	
}	