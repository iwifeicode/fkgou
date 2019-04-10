class Car{
	constructor(options) {
		//1.解析数据
		this.tbody = options.tbody;
		this.url = options.url;
		this.sum=options.sum;
		this.cont=options.cont;
		
		//2.请求数据
		this.load();
		
		//5.绑定事件
		this.addEvent()
	}
	load(){
		var that = this;
		ajax({
			url:this.url,
			success:function(res){
				that.res = JSON.parse(res);
				//3.获取cookie
				that.getCookie();
			}
		})
	}
	getCookie(){
		this.goods = JSON.parse(getCookie("goodsId"));
		console.log(this.goods)
		//4.渲染页面
		this.display();
	}
	display(){
		var str = "";
		// console.log(this.res.lenght)
		for(var i=0;i<this.res.length;i++){
			// console.log(1)
			for(var j=0;j<this.goods.length;j++){
				// console.log(2)
				if(this.res[i].goodsId == this.goods[j].goods){
					
					str +=`<tr>
							<td><input type="checkbox" name="" id="" value="" /></td>
							<td><img src="${this.res[i].src}"/></td>
							<td>${this.res[i].name}</td>
							<td>${this.res[i].price}</td>
							<td><input type="number" value="${this.goods[j].num}"></td>
							<td><em data-index="${this.res[i].goodsId}">删除</em></td>
						</tr>`
				}
			}
		}
		this.tbody.innerHTML = str;
		this.getsum();
	}
	getsum(){
		var sum=0;
		var cont=0;
		for(var i=0;i<this.goods.length;i++){
			sum += parseInt(this.goods[i].num)
			 cont += parseInt((this.goods[i].num)*(this.res[i].price))
		}
			this.sum.innerHTML=sum;
			this.cont.innerHTML=cont;
		
	}
	addEvent(){
		var that = this;
		this.tbody.addEventListener("click",function(eve){
		    var e = eve || window.event;
		    var target = e.target || e.srcElement;
		    if(eve.target.nodeName == "EM"){
				//找到点击商品的货号
		        that.id = eve.target.getAttribute("data-index");
				//删除DOM元素
		        eve.target.parentNode.parentNode.remove();
				//6.删除cookie中的数据
				that.removeCookie();
		    }
		})
		this.tbody.addEventListener("input",function(eve){
			if(eve.target.type == "number"){
				that.value = eve.target.value;
				that.id = eve.target.parentNode.nextElementSibling.children[0].getAttribute("data-index");
				
				that.setCookie();
			}
		})
	}
	removeCookie(){
		//7.找到cookie中的符合条件的数据
		for(var i=0;i<this.goods.length;i++){
			if(this.goods[i].goods == this.id){
				
				break;
			}
		}
		//8.删除并再次设置回去
		this.goods.splice(i,1);
		setCookie("goodsId",JSON.stringify(this.goods))
	}
	setCookie(){
		for(var i=0;i<this.goods.length;i++){
			if(this.goods[i].goods == this.goods){
				break;
			}
		}
		this.goods[i].num = this.value;
		setCookie("goodsId",JSON.stringify(this.goods));
	}
}


new Car({
	cont:document.getElementById("cont"),
	sum:document.getElementById("sum"),
	tbody:document.getElementById("tbody"),
	url:"json/data.json"
})
