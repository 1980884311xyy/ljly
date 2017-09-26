//插入hot
var contentF={
	content_f:document.getElementsByClassName("content_f")[0],
	init:function(){
		this.hotFn();
		this.shoopFn();
	},
	//加载hot
	hotFn:function(){
		var hot=this.content_f.getElementsByClassName("hot")[0];
		ajax("get","../json/flower_hot.json",function(data){
			var data=JSON.parse(data);
			var str='';
			for(var i=0;i<data.length;i++){
				str+='<dl data-id='+data[i].id+'>'+
						'<dt><img src='+data[i].src+'/></dt>'+
						'<dd>'+
							'<p>'+data[i].price+'</p>'+
							'<p><a href="##">'+data[i].title+'</a></p>'+
						'</dd>'+
					'</dl>'
			}
			hot.innerHTML=str;
		})
	},
	shoopFn:function(){
		var shoop=document.getElementsByClassName("shoop")[0];
		var first=document.getElementById("first");
		var pagebox=document.getElementsByClassName("page")[0];
		var next=document.getElementById("next");
		ajax("get","../json/flower_shoop.json",function(data){
			var data=JSON.parse(data);
			var len=data.length;
			var pageN=30;
			var page=Math.ceil(len/pageN);
			//创建a
			for(var i=0;i<page;i++){
				var a=document.createElement('a');
				a.className="change";
				a.setAttribute("href","##")
				a.innerHTML=(i+1);
				pagebox.insertBefore(a,next);
			}
			//加载数据
		dataparse(0)
		smallSrcFn(0)
		hoverAFn();
		function dataparse(n){ 
			var str='';
			for(var i=n*pageN;i<Math.min(len,(n+1)*pageN);i++){
				str+='<dl data-id='+data[i].id+'><dt><img src='+data[i].src+ '><div class="collection">收藏</div></dt>'+
						'<dd><ul class="smallPic"></ul>'+
							'<p><span class="price">'+data[i].price+'</span>'+ 
								'<span>销量：'+data[i].sales+'</span>'+
								'<a href="##" class="car"></a>'+
							'</p><p><a href="##">'+data[i].title+'</a></p>'+
							'<p>累计销量<span>'+data[i].sales+'</span></p></dd></dl>';
			}
			shoop.innerHTML=str; 
		}
			//换页
			//点击123切换；
			var aA=document.querySelectorAll(".change");
			var now=0;
			for(let i=0;i<aA.length;i++){
				aA[i].onclick=function(){
					dataparse(i);
					smallSrcFn(i);
					hoverAFn();
					now=i;
				}
			}
			//点击上一页
			first.onclick=function(){
				if(now==0){
					return;
				}else{
					now--;
				}
				dataparse(now);
				smallSrcFn(now);
				hoverAFn();
			}
			//点击下一页
			next.onclick=function(){
				if(now+1==page){
					return;
				}else{
					now++;
				}
				dataparse(now);
				smallSrcFn(now);
				hoverAFn();
			}
			function smallSrcFn(n){
				var smallPic=document.getElementsByClassName("smallPic");
				for(var i=n*pageN;i<Math.min(len,(n+1)*pageN);i++){
					//判断有几个li，就创建几个
						var str1='';
						for(var j=0;j<data[i].smallSrc.length;j++){
							str1+='<li><img src='+data[i].smallSrc[j]+ '></li>';
						}
						smallPic[i-n*pageN].innerHTML=str1;
					//给所有的第一个li添加active
					var ali=smallPic[i-n*pageN].getElementsByTagName("li");
					ali[0].className="active";
					
					for(let j=0;j<data[i].smallSrc.length;j++){
						ali[j].onclick=function(){
							var src1=this.children[0].getAttribute("src")
							this.parentElement.parentElement.previousElementSibling.children[0].setAttribute("src",src1);
						}
					}
				}
			}
			function hoverAFn(){
				var smallPic=document.getElementsByClassName("smallPic");
				var allli=shoop.getElementsByTagName("li");
				for(var i=0;i<allli.length;i++){
					allli[i].addEventListener("click",function(){
						for(var j=0;j<allli.length;j++){
							allli[j].className="";
						}
						this.className="active"
					})
				}
			}
		})
	},
}
	contentF.init();
