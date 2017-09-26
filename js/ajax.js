//success和error是两个回调函数
function ajax(method,url,success,error){
	//创建ajax对象
	var xml=new XMLHttpRequest() || new ActiveXObject("Microsoft,XMLHTTP");
	//将method转换成大写
	method=method.toUpperCase();
	//打开方式；
	xml.open(method,url);
	//发送请求
	xml.send();
	xml.onreadystatechange=function(){
		if(xml.readyState==4){
			if(xml.status==200){
				success(xml.responseText);
			}else{
				error(xml.status);
			}
		}
	}
}


function ajaxPost(url,json,success,error){
	//创建ajax对象
	var xml=new XMLHttpRequest() || new ActiveXObject("Microsoft,XMLHTTP");
	//打开方式
	xml.open("POST",url);
	
	xml.setRequestHeader("content-type","application/x-www-form-urlencoded");
	var datastr="";
	for(var key in json){
		if(datastr){
			datastr+="&";
		}
		datastr+=key+"="+json[key];
	}
	xml.send(datastr);
	////设置回调函数,接收服务器端的信息以进行处理
	xml.onreadystatechange=function(){
		if(xml.readyState==4){
			if(xml.status==200){
				success(xml.responseText);
			}else{
				error(xml.status);
			}
		}
	}
}
