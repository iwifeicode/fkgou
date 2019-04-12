class Car{
	constructor(options) {
		//1.解析数据
		this.tbody = options.tbody;
		this.url = options.url;
		this.sum=options.sum;
		this.cont=options.cont;
		this.index = null;

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
		// this.goods = JSON.parse(getCookie("goodsId"));
		// console.log(this.goods)
		this.cook = JSON.parse($.cookie("cook"))
		//4.渲染页面
		this.display();
	}
	display(){
// 		console.log(JSON.parse($.cookie("cook")))
// 				console.log(this.cook)
		var str = "";
		// console.log(this.res.lenght)
		for(var i=0;i<this.res.length;i++){
			// console.log(1)
				// for(var s=0;s<this.cook.length;s++){
			for(var j=0;j<this.cook.length;j++){
					
				// console.log(2)
					if(this.res[i].goodsId == this.cook[j].id){
						str +=`<tr>
								<td class="check"><input type="checkbox" /></td>
								<td><img src="${this.res[i].src}"/></td>
								<td>${this.res[i].name}</td>
								<td>${this.res[i].price}</td>
								<td>
									<div class="amount-t" data-index="${this.res[i].goodsId}">						
										<span class="jian">-</span>
										<b class="teb">${this.cook[j].num}</b>
										<span class="jia">+</span>
									</div>								
								</td>
								<td><em data-index="${this.res[i].goodsId}">删除</em></td>
							</tr>`
					}
				// }
			}
		}
		this.tbody.innerHTML = str;
		
		this.fuxuan();
		this.quanbudele();
		this.addEvent();
	}
	getsum(){
		var sum=0;
		var cont=0;
		// var ss= 0;
		for(var i=0;i<this.cook.length;i++){
			console.log(parseInt(this.cook[i].num))
			console.log(parseInt(this.res[i].price))
			console.log()
			// ree = (parseInt(this.cook[i].num))*(parseInt(this.res[i].price));
			cont +=(parseInt(this.cook[i].num))*(parseInt(this.res[i].price));
			// console.log(ss)
			sum += parseInt(this.cook[i].num)
			 // cont += parseInt((this.cook[i].num)*(this.res[i].price))
			 // console.log(this.res[i].price)
		}
			this.sum.innerHTML=sum;
			this.cont.innerHTML=cont;
			
			return sum;
			return cont;
		
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
		this.tbody.addEventListener("click",function(eve){
			var e = eve || window.event;
			var target = e.target || e.srcElement;
			var sum = 0;
			var cont = 0;
			if(eve.target.className == "jia"){
				that.value = eve.target.parentNode.children[1].innerHTML;
				that.id = eve.target.parentNode.getAttribute("data-index");
				// console.log(that.value)
				// console.log(that.id)
				that.setCookie();
			}
			if(eve.target.className == "jian"){
				that.value = eve.target.parentNode.children[1].innerHTML;
				that.id = eve.target.parentNode.getAttribute("data-index");
				// console.log(that.value)
				// console.log(that.id)
				that.setCookie();
			}
			if(eve.target.type == "checkbox"){
				for(var i=0;i<$(".check input").length;i++){
					// console.log($(".check input").length)
					if(eve.target.checked == true){
						sum = eve.target.parentNode.parentNode.children[4].children[0].children[1].innerHTML;
						cont = eve.target.parentNode.parentNode.children[4].children[0].children[1].innerHTML * eve.target.parentNode.parentNode.children[3].innerHTML
					}
					$("#sum").html(sum);
					$("#cont").html(cont);
					
				}
			}
		})
			// console.log($("#tbody").children("tr"))
			$("#tbody").children("tr").children("td").children(".amount-t").children(".jia").on("click",function(){
				$(this).parent().children("b").html(parseInt($(this).parent().children("b").html())+1); 
//						        $(".jia").removeAttr("disabled");
						        $('.jia').attr('readonly', false);
						       })
			$("#tbody").children("tr").children("td").children(".amount-t").children(".jian").on("click",function(){
						if($(this).parent().children("b").html() == 1){
								 $(this).parent().children("b").html(1)
							}else{
								$(this).parent().children("b").html(parseInt($(this).parent().children("b").html())-1)
							}
								})
	}
	removeCookie(){
		//7.找到cookie中的符合条件的数据
		for(var i=0;i<this.cook.length;i++){
			console.log(this.cook)
			if(this.cook[i].id == this.id){
				break;
			}
		}
		//8.删除并再次设置回去
		// console.log(this.cook)
		this.cook.splice(i,1);
		$.cookie("cook",JSON.stringify(this.cook));
	}
	setCookie(){
		this.cook = JSON.parse($.cookie("cook"));
		for(var i=0;i<this.cook.length;i++){
			if(this.cook[i].id == this.id){
				break;
			}
		}
		this.cook[i].num = this.value;
		$.cookie("cook",JSON.stringify(this.cook));
	}
	fuxuan(){
		var that = this;
		$("#checkAll input").click(function(){
			// console.log(this)
			var quanxuan = $(this).prop("checked");
			console.log(quanxuan)
			if(quanxuan){
				$(".check input").prop("checked",true);
				console.log($(".check input"))
				that.getsum();
			}else{
				$(".check input").prop("checked",false);
				$(that.sum).html(0);
				$(that.cont).html(0);
			}
		})
	}

	quanbudele(){
		var that = this;
		$("#dele em").click(function(){
			// console.log($("#dele em"))
			$("#dele em").parent().parent().parent().parent().children("#tbody").children("tr").remove()
			$.cookie("cook",null)
			that.sum.innerHTML="0";
			that.cont.innerHTML="总数量：0";
		})
	}
}

new Car({
	cont:document.getElementById("cont"),
	sum:document.getElementById("sum"),
	tbody:document.getElementById("tbody"),
	url:"json/data.json"
})
