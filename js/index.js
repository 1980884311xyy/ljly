	//轮播图
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
	
	/*鲜花展示*/
	var show=document.querySelector(".show");
	var str='';
	ajax("get","json/show.json",function(data){
		var data=JSON.parse(data);
		for(var i=0;i<data.length;i++){
			str+='<dl data-id='+data[i].id+'><dt><img src='+data[i].src+'></dt>'+
				'<dd>'+data[i].title+'</dd></dl>';	
		}
		show.innerHTML=str;
	},function(error){
		alert(error);
	})
	
	/*鲜花果篮*/
	var basket_show=document.querySelector(".basket_show");
	ajax("get","json/guolan.json",function(data){
		var str1='';
		var data=JSON.parse(data);
		var timer=null;
		for(var i=0;i<data.length;i++){
			str1+='<dl data-id='+data[i].id+'>'+
						'<dt><img src='+data[i].src+'></dt>'+
						'<dd>'+
							'<p class="price">'+data[i].price+'</p>'+
							'<p class="title"><a href="##">'+(data[i].title)+i+i+'</a></p>'+
						'</dd>'+
					'</dl>';
		}
		basket_show.innerHTML=str1;
		var adl=basket_show.querySelectorAll("dl");
		basket_show.style.width=(adl.length*adl[0].offsetWidth)+(9*adl.length-1)+"px";
		autoyidong();
		var now1=0;
		function autoyidong(){
			timer=setInterval(function(){
				now1++;
				if(now1==adl.length-4){
					now1=1;
					basket_show.style.left=0+"px";
				}
				move(basket_show,{"left":-((adl[0].offsetWidth+9)*now1)})
			},3000)
		}
		basket_show.onmouseover=function(){
			clearInterval(timer);
		}
		basket_show.onmouseout=function(){
			autoyidong();
		}
	},function(error){
		alert(error);
	})
	
	/*开业鲜花*/
	var opening_show=document.querySelector(".opening_show");
	ajax("get","json/opening.json",function(data){
		var data=JSON.parse(data);
		var str='';
		for(var i=0;i<data.length;i++){
			str+='<dl data-id='+data[i].id+'>'+
						'<dt><img src='+data[i].src+'></dt>'+
						'<dd>'+data[i].title+'</dd>'+
					'</dl>';
		}
		opening_show.innerHTML=str;
		
		var adl=opening_show.querySelectorAll("dl");
		opening_show.style.width=(adl.length*adl[0].offsetWidth)+(18*adl.length-1)+"px";
		autoyidong()
		var now1=0;
		function autoyidong(){
			timer=setInterval(function(){
				now1++;
				if(now1==adl.length-4){
					now1=1;
					opening_show.style.left=0+"px";
				}
				move(opening_show,{"left":-((adl[0].offsetWidth+18)*now1)})
			},3000)
		}
		opening_show.onmouseover=function(){
			clearInterval(timer);
		}
		opening_show.onmouseout=function(){
			autoyidong();
		}
	})

	//滚动到相对位值显示鲜花展示
	var showF={
		flowershow:document.getElementsByClassName("flowershow")[0],
		show:document.getElementsByClassName("show")[0],
		init:function(){
			var _this=this;
			window.onscroll=function(){
				var scrollT=document.documentElement.scrollTop || document.body.scrollTop;
				if(scrollT>=800 ){
					move(_this.show,{"top":0});
				}
			}
		}
	}
	showF.init();	
