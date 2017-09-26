//冒泡排序
function bubSort(arr){
		for(var i=0;i<arr.length-1;i++){
			for(var j=0;j<arr.length-1-i;j++){
				if(arr[j]>arr[j+1]){
					var temp;
					temp = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = temp;
				}
			}
		}
		return arr;
	}

//选择排序
function selSort(arr){
		for(var i=0;i<arr.length-1;i++){
			for(var j=i;j<arr.length-1;j++){
				if(arr[i]>arr[j+1]){
					var temp;
					temp=arr[i];
					arr[i]=arr[j+1];
					arr[j+1]=temp;
				}
			}
		}
		return arr;
	}

//随机数
function randomNum(num1,num2){
	return parseInt(num1+Math.random()*(num2-num1+1));
	
}
//返回最大值
function getMax(arr){
	var max = arr[0];
	for(var i=0;i<arr.length;i++){
			if(max<arr[i]){
				max = arr[i]
			}
	}
	return max;
}
//返回最小值
function getMin(arr){
	var min = arr[0];
	for(var i=0;i<arr.length;i++){
			if(min>arr[i]){
				min = arr[i]
			}
	}
	return min;
}

//去重
function norepaetFn(arr){
	var arr1=[];
	for(var i=0;i<arr.length;i++){
		if(arr1.indexOf(arr[i])==-1){
			arr1.push(arr[i]);
		}
	}
	return arr1;
}

//随机生成颜色
function randomColor(){
	var r=parseInt(randomNum(0,255)).toString(16);//随机产生0~255之间的数并将其转换成16进制
	var g=parseInt(randomNum(0,255)).toString(16);
	var b=parseInt(randomNum(0,255)).toString(16);
	var str=[r,g,b];
	for(var i=0;i<str.length;i++){
		if(str[i].length<2){//位数不足两位补0；
			str[i]+="0";
		}
	}
	var strColor=str.join("");//将str数组分割，去掉逗号；
	return "#"+strColor;
}
//将时间对象转换成字符串的时间
function date1String(date,sign){//date是时间对象
	sign=sign==undefined?'/':sign;
	return date.getFullYear()+sign+date.getMonth()+sign+
	date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
}
//判断位数是不是一个个位数
function isDblNum(item){
	return item = item<10?'0'+item:item;
}
//获得元素标签   传的是一个对象
function getEleMent(alist){
	var arr=[];
	for(var i=0;i<ali.length;i++){
		var liNodeAll=alist[i].childNodes;
		for(var j=0;j<liNodeAll.length;j++){
			if(liNodeAll[j].nodeType==1){
				arr.push(liNodeAll[j]);
			}
		}
	}
	return arr;
}
//算一个有父级元素且使用了position，距离最左边的距离
function offset(ele){
	var obj={};//创建一个对象
	obj.left=ele.offsetLeft;//给对象添加属性和属性值
	obj.top=ele.offsetTop;
	while(ele.offsetParent){//如果ele存在使用position的父级元素
		ele=ele.offsetParent;
		obj.left+=ele.offsetLeft;
		obj.top+=ele.offsetTop;
	}
	return obj;
}
//兼容class  从多个class中取得指定class
function getClassName(ele,_name){
	var aDiv = document.getElementsByTagName(ele);
	var arr = [];
	var str = new RegExp('\\b'+_name+'\\b','i');
	for(var i=0;i<aDiv.length;i++){
		if(aDiv[i].className.match(str)){
			arr.push(aDiv[i]);
		}
	}
	return arr;
}

function move(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var oStop=true;
		for(var attr in json){
			var icur=0;
			if(attr=='opacity'){
			 	icur=parseInt(parseFloat(getStyle(obj,attr))*100);
			}else{
				icur=parseInt(getStyle(obj,attr));
			}
			
			if(icur!=json[attr]){
				oStop=false;
			}

			//速度
			var speed=0;
			speed=(json[attr]-icur)/8;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(attr=='opacity'){
				obj.style.filter="alpha(opacity:"+(icur+speed)+")";
				obj.style.opacity=(icur+speed)/100;
			}else{
				obj.style[attr]=icur+speed+'px';
			}
		}
		if(oStop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
		
	},30)
}

function move1(obj,json,fn){
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		var oStop=true;
		for(var attr in json){
			var icur=0;
			if(attr=='opacity'){
			 	icur=parseInt(parseFloat(getStyle(obj,attr))*100);
			}else{
				icur=parseInt(getStyle(obj,attr));
			}
			
			if(icur!=json[attr]){
				oStop=false;
			}

			//速度
			var speed=0;
			speed=(json[attr]-icur)/3;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(attr=='opacity'){
				obj.style.filter="alpha(opacity:"+(icur+speed)+")";
				obj.style.opacity=(icur+speed)/100;
			}else{
				obj.style[attr]=icur+speed+'px';
			}
		}
		if(oStop){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
		
	},30)
}



//获得非行间样式
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}