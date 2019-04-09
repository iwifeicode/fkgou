// "use strict"

//回到顶部
window.onload = function() {
	var oA = document.getElementsByTagName("a")[0];
	var oul = document.getElementsByTagName("ul")[0];
	var timer;
	var speed = 0;
	var flag = true;
	window.onscroll = function() {
		var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		if (scrolltop >= 1500) {
			oA.style.display = "block";
			oul.style.display = "block";
		} else {
			oA.style.display = "none";
			oul.style.display = "none";
		}
		if (!flag) {
			clearInterval(timer);
		}
		flag = false;
	}
	oA.onclick = function() {
		console.log(1)
		timer = setInterval(function() {
			var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
			speed = scrolltop / 5;
			document.documentElement.scrollTop = document.body.scrollTop = scrolltop - speed;
			if (scrolltop == 0) {
				clearInterval(timer);
			}
			flag = true;
		}, 50)
	}
	// 楼层
	$(".loucen").children("li").click(function() {
		var index = $(this).index() + 1
		var t = $(".div" + index).offset().top
		// console.log(index)
		// console.log(t)
		$("html").animate({
			scrollTop: t
		})
	})
}

//json数据
ajaxGet("json/data.json", function(res) {
	// console.log(1)
	json = JSON.parse(res);
	// console.log(json)
	var str = "";
	for (var i = 0; i < json.length; i++) {
		// console.log(i)
		str +=
			`<li class="list">
							<div class="specialty-detials valign" index=${json[i].goodsId}>
										<img src="${json[i].src}">
										<p>${json[i].name}</p>
										<div class="add-cart">
											<span>${json[i].price}</span>
											<s>${json[i].youhui}</s>
											<a class="cart">
												 ${json[i].img}  							
											</a>
										</div>
							</div>
					    </li>`
	}
	var productDesc = document.querySelector(".product-desc")
	// console.log(productDesc)
	productDesc.innerHTML = str;
})

//百度搜搜
function Search() {
	//			1.选元素,设置url
	this.txt = document.getElementById("txt");
	this.ul = document.getElementById("list");
	this.url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";

	//			2.绑定事件
	this.addEvent();
}
Search.prototype.addEvent = function() {
	var that = this;
	this.txt.onkeyup = function() {
		//				3.保存输入框的内容
		that.val = this.value;
		//				4.准备请求数据
		that.load()
	}
}
Search.prototype.load = function() {
	var that = this;
	jsonp(this.url, function(res) {
		//				5.将数据保存到将来的实例对象
		that.res = res;
		//				6.请求成功之后,才能够去渲染页面
		that.display();
	}, {
		_name: "cb",
		cb: "asdasgtdsa",
		wd: this.val
	})
}

Search.prototype.display = function() {
	var that = this;
	//			7.渲染页面
	var str = "";
	this.res.s.forEach(function(v) {
		str += `<li>${v}</li>`;
	})
	this.ul.innerHTML = str

	this.ulli()
}

Search.prototype.ulli = function() {
	var that = this
	this.ul.onclick = function(eve) {
		var e = eve || window.event
		var target = e.target || e.srcElement
		if (target.nodeName == "LI") {
			that.txt.value = target.innerHTML
			that.ul.style.display = "none"
		}
	}
}

new Search()

function Ran() {
	this.ul = $(".xr")
	this.display()
}
Ran.prototype.display = function() {
	var that = this;
	$(".xr").on("click", ".list", function() {
		// console.log(1)
		that.load()
	})
}

Ran.prototype.load = function() {
	var that = this;
	$.ajax({
		url: "json/data.json",
		success: function(res) {
			// console.log(res)
			that.res = res;
			that.cookies();
		}

	})
}

Ran.prototype.cookies = function() {
	var that = this;
	$('.xr').on('click', 'img', function(evt) {
		that.id = $(this).parent().attr('index');
		// console.log(that.id)
		that.goods = getCookie("Id")
		// console.log(that.goods)
		setCookie("Id",JSON.stringify([{"goods":that.id}])),
		location.href="page.html"
	})
}





new Ran()
