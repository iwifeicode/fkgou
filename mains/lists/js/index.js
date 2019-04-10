// 首页渲染数据
ajaxGet("data/data.json", function(res) {
	// console.log(1)
	// console.log(res)
	json = JSON.parse(res)
	// console.log(json)
	var str = "";
	for(var i=0;i<json.length;i++){
		// console.log(json[i])
		str += `<li index="${json[i].goodsId}">
                <div class="specialty-detials valign" >
                    <a href="#">
                        <img abc="${json[i].src}" alt="">
                        <p>${json[i].name}</p>
                        <div class="add-cart">
                            <span>￥${json[i].price}</span>
                            <s>￥${json[i].youhui}</s>
                        </div>
                    </a>
                </div>
            </li>`
	}
	var productDesc = document.querySelector(".product-desc")
	productDesc.innerHTML = str;
	
		
	$(".Id").children("li").on("click",function(){
		// console.log(1)
		$.cookie("goods",$(this).attr("index"))
		// console.log($(this).attr("index"))
		$(location).attr("href","xiangqingye.html")
		console.log($.cookie("goods"))
	})
		
	//懒加载：
		var img = document.querySelectorAll(".Id img");
		var clientH = document.documentElement.clientHeight;
		
		for(var j=0;j<img.length;j++){
			if(clientH > img[j].offsetTop){
				img[j].src = img[j].getAttribute("abc");
			}
		}
		
		document.onscroll = function(){
			var t = document.documentElement.scrollTop;
			for(var i=0;i<img.length;i++){
				if(clientH + t > img[i].offsetTop + 200){
					img[i].src = img[i].getAttribute("abc");
				}
			}
		}	
		
		

	
})













