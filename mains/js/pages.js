//json数据：
class Cookie {
	constructor() {
		this.ajx();
		// console.log(1)
	}
	ajx() {
		var that = this;
		$.ajax({
			url: "json/datas.json",
			success: function(res) {
				that.res = res;
				// console.log(that.res)
				that.huoqu();
			}
		})
	}
	huoqu() {
		this.IId = JSON.parse(getCookie("Id"))[0].goods
		// console.log(this.IId)
		this.display();
	}
	display() {
		var str = "";
		for (var i = 0; i < this.res.length; i++) {
			// console.log(this.res[i])
			// console.log(this.res[i].goodsId)		
			// console.log(this.IId == this.res[i].goodsId)
			if (this.IId == this.res[i].goodsId) {
				str +=
					`<div id="pp">
						<p><span>${this.res[i].span1}</span> > <span>${this.res[i].span2}</span> > <span>${this.res[i].span3}</span> > <span>${this.res[i].span4}</span></p>
					</div>
						<div class="page-l">
								<div class="sbox">
									<img src="${this.res[i].src[0]}" />
									<img src="${this.res[i].src[1]}" />
									<img src="${this.res[i].src[2]}" />
									<img src="${this.res[i].src[3]}" />
									<span class="tesp"></span>
									<p></p>
								</div>
								<div class="bbox">
									<img src="${this.res[i].src[0]}" />
									<img src="${this.res[i].src[1]}" />
									<img src="${this.res[i].src[2]}" />
									<img src="${this.res[i].src[3]}" />
								</div>
								<div class="cont">
									<div class="imgbox">
										<img src="${this.res[i].src[0]}" />
										<img src="${this.res[i].src[1]}" />
										<img src="${this.res[i].src[2]}" />
										<img src="${this.res[i].src[3]}" />
									</div>
								</div>
							</div>
							
							<div class="page-c">
								<h2>${this.res[i].name}</h2>
								<p class="teep"> 散装${this.res[i].number}/罐</p>
								<div class="boox">
									<p class="teeep"><span class="tespan">原价：<s>￥${this.res[i].yuanjia}</s></span><i>商品评价</i></p>
									<p><span>现价：<em>￥${this.res[i].xianjia}</em></span><i class="tei">${this.res[i].pingjia}条</i></p>
									<p>代金券:<img src="images/juan1.png" /><img src="images/juan2.png" /></p>
								</div>
								<div class="pingfen">
									<span>商品评分<img src="images/wjx.png"/><img src="images/wjx.png"/><img src="images/wjx.png"/><img src="images/wjx.png"/><img src="images/wjx.png"/></span>
									<span class="tsp">产品销量：${this.res[i].xiaoliang}件</span>
									<span>剩余库存：${this.res[i].kucun}件</span>
								</div>
								<div class="peison">
									<span>配送至：</span><i>安徽省 六安市 裕安区<span class="iconfont icon-xiajian"></span> </i> 有货
								</div>
								<div class="guige">
									<span>规格：</span><i>小包装${this.res[i].guige}g/罐</i>
								</div>
								<div class="number">
									<input type="text" class="txt" value="0" id="txtt"/>
									<input type="button" class="btn1" id="btn1" value="+"/><br />
									<input type="button" class="btn2" id="btn2" value="-"/>
								</div>
								<span class="tepp">(件)</span>
							</div>
					
							<div class="page-r">
								<p class="tp">猜你想看</p>
								<div class="imgs">
									<img src="${this.res[i].img[0]}" />
									<p>${this.res[i].youbian}</p>
								</div>
								<div class="imgs">
									<img src="${this.res[i].img[1]}" />
									<p>${this.res[i].youbian2}</p>
								</div>
							</div>`
			}
		}
		var paGe = document.querySelector("#page")
		// console.log(paGe)
		paGe.innerHTML = str;
		
		//数量：
		var otxtt = document.getElementById("txtt");
		var obtn1 = document.getElementById("btn1");
		var obtn2 = document.getElementById("btn2");
		obtn1.onclick = function() {
			otxtt.value = parseInt(otxtt.value) + 1;
			// console.log(otxtt.value)
		}
		obtn2.onclick = function() {
			if (otxtt.value <= 0) {
				otxtt.value = 0;
			} else {
				otxtt.value = parseInt(otxtt.value) - 1;
				// console.log(otxtt.value)
			}
		}

		//获取元素
		var oSbox = document.querySelector(".sbox");
		// console.log(oSbox)
		// var oPan = $(".sbox").children("img").eq(4)[0];
		// var oPan = oSbox.children[4]
		var oPan = document.querySelector(".tesp")
		// console.log(oPan)
		var oBbox = document.querySelector(".bbox");
		var aImg = document.querySelectorAll(".bbox img");

		//放大镜：
		var oSimg = document.querySelectorAll(".sbox img")
		var oBimg = document.querySelectorAll(".bbox img")
		var oCimg = document.querySelectorAll(".cont img")

		for (var i = 0; i < oCimg.length; i++) {
			oCimg[i].liyang = i;
			oCimg[i].onclick = function() {
				for (var j = 0; j < oCimg.length; j++) {
					// console.log(oCimg[j])
					oSimg[j].style.display = "none";
					oBimg[j].style.display = "none";
				}
				oSimg[this.liyang].style.display = "block";
				oBimg[this.liyang].style.display = "block";
			}
		}

		//绑定事件
		oSbox.addEventListener("mouseover", function() {
			oPan.style.display = "block";
			oBbox.style.display = "block";

			oSbox.addEventListener("mousemove", function(eve) {
				var e = eve || window.event;
				var l = e.offsetX - oPan.offsetWidth / 2;
				var t = e.offsetY - oPan.offsetHeight / 2;

				if (l < 0) l = 0;
				if (t < 0) t = 0;
				if (l > oSbox.offsetWidth - oPan.offsetWidth) {
					l = oSbox.offsetWidth - oPan.offsetWidth
				}
				if (t > oSbox.offsetHeight - oPan.offsetHeight) {
					t = oSbox.offsetHeight - oPan.offsetHeight
				}
				oPan.style.left = l + "px";
				oPan.style.top = t + "px";

				var x = l / (oSbox.offsetWidth - oPan.offsetWidth);
				var y = t / (oSbox.offsetHeight - oPan.offsetHeight);
				// console.log(x, y)

				for (var i = 0; i < aImg.length; i++) {
					aImg[i].style.left = (oBbox.offsetWidth - aImg[i].offsetWidth) * x + "px";
					aImg[i].style.top = (oBbox.offsetHeight - aImg[i].offsetHeight) * y + "px";
					// console.log(aImg[i])
				}
			})
		})

		oSbox.addEventListener("mouseout", function() {
			oPan.style.display = "none";
			oBbox.style.display = "none";
		})
	}
}

new Cookie();
