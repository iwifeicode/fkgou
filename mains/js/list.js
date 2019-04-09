class List {
	constructor() {
		this.addCar()
		
	}
		addCar(){
			var that = this;
			$('.product-desc').on('click','.cart',function(evt){
				// console.log($(this).parent().parent())
				that.id = $(this).parent().parent().attr('index');
				
				// setCookie("goodsId",[{"Id":that.id,"number":}])
				
				that.goods = getCookie("goodsId")
				if(that.goods == ""){
					setCookie("goodsId",JSON.stringify([{"goods":that.id,"num":1}]))
				}else{
					that.goods = eval(that.goods);
					var onoff = true;
					for(var i=0;i<that.goods.length;i++){
						console.log(that.goods[i])
						if(that.id == that.goods[i].goods){
							that.goods[i].num++;
							onoff = false;
							setCookie("goodsId",JSON.stringify(that.goods)) 
						}
					}
					if(onoff){
						that.goods.push({
							goods:that.id,
							num:1,
						})
							setCookie("goodsId",JSON.stringify(that.goods)) 
					}
				}
		})
		
		
	}
	
	
}


new List()
