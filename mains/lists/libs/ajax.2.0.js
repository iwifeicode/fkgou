
function ajaxPost(url,data){
	data = data == undefined ? {} : data;
	var str = "";
	for(var i in data){
		str = str + i + "=" + data[i] + "&";
	}
	str = str.slice(0,str.length-1);
	var p = new Promise(function(success,error){
		var ajax = new XMLHttpRequest();
		ajax.open("POST",url);
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				success(ajax.responseText)
			}else if(ajax.readyState == 4 && ajax.status != 200){
				error(ajax.status)
			}
		}
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(str);
	})
	return p;
}

//ajaxPost(url,{}).then(function(){
////	成功
//},function(){
////	失败
//})



function ajaxGet(url,data){
	data = data==undefined ? {} : data;
	var str = "";
	for(var i in data){
		str = str + i+ "=" +data[i] + "&"
	}
	var d = new Date();
	url = url + "?" + str + "_lyt="+d.getTime();
	var p = new Promise(function(success,error){
		var ajax = new XMLHttpRequest();
		ajax.open("GET",url,true);
		ajax.onreadystatechange = function(){
			if(ajax.readyState == 4 && ajax.status == 200){
				success(ajax.responseText)
			}else if(ajax.readyState == 4 && ajax.status != 200){
				error(ajax.status)
			}
		}
		ajax.send(null)
	})
	return p;
}

function jsonp(url,data){
	data.timeout = data.timeout==undefined ? 10000 : data.timeout;
	
	var str= "";
	for(var i in data){
		str = str + i + "=" + data[i] + "&";
	}
	str = str.slice(0,str.length-1);
	url = url + "?" + str;
	
	var p = new Promise(function(success,error){
		//通过顶层对象window,在局部环境中绑定一个全局函数
		window[data[data._name]] = function(res){
			success(res)
		}
		
		setTimeout(function(){
			error("timeout")
		},data.timeout)

		var script = document.createElement("script");
		script.src = url;
		document.body.appendChild(script)
	})
	return p;
}