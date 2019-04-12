class List {
	constructor() {
		this.addCar()
		
	}
		addCar(){
			console.log(1)
			var that = this;
			$('.product-desc').on('click','.cart',function(evt){
				console.log($(this))
				console.log($(".list").attr("index"))
				console.log(1)
				// console.log($(this).parent().parent())
				// that.id = $(this).parent().parent().attr('index');
				this.cookie = $.cookie("cook");
				console.log(this.cookie)

					if($.cookie("cook") == null){
						this.cookie = [{"id":this.pp,"num":this.id}];
						$.cookie("cook",JSON.stringify(this.cookie));
					}else{
						var off = true;
						this.cookie = JSON.parse($.cookie("cook"));
						for(var i=0;i<this.cookie.length;i++){
							if(this.cookie[i].id == $("#pp").attr("index")){
								parseInt((this.cookie[i].num)++);
								off = false;
							}
						}
						if(off){
							this.cookie.push({"id":this.pp,"num":this.id});					
						}
// 						this.cookie.map((v)=>{
// 							if(v.id == $("#pp").attr("index")){
// 								return v.num++;
// 								off = false;
// 							}
// 						})					
					}
						$.cookie("cook",JSON.stringify(this.cookie));
						// console.log(JSON.parse($.cookie("cook")))
				})
				
				// setCookie("goodsId",[{"Id":that.id,"number":}])
				
// 				that.goods = getCookie("goodsId")
// 				if(that.goods == ""){
// 					setCookie("goodsId",JSON.stringify([{"goods":that.id,"num":1}]))
// 				}else{
// 					that.goods = eval(that.goods);
// 					var onoff = true;
// 					for(var i=0;i<that.goods.length;i++){
// 						// console.log(that.goods[i])
// 						if(that.id == that.goods[i].goods){
// 							that.goods[i].num++;
// 							onoff = false;
// 							setCookie("goodsId",JSON.stringify(that.goods)) 
// 						}
// 					}
// 					if(onoff){
// 						that.goods.push({
// 							goods:that.id,
// 							num:1,
// 						})
// 							setCookie("goodsId",JSON.stringify(that.goods)) 
// 					}
				}
		// })
		
		
	}
	
	
// }


new List()
