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
				if (this.IId == this.res[i].goods) {
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
		}
	}

	new Cookie();
