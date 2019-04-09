"use strict"
class Register{
			constructor() {
			    this.url = "http://www.icodeilife.cn/ctrl/register.php";
				this.init();
			}
			init(){
				var that = this;
				$("#btn").click(function(){
					that.load();
				})
			}
			load(){
				$.ajax({
					url:this.url,
					success:function(res){
						switch(res){
							case "0":
								$(".tes").html("手机号重复");break;
							case "1":
								$(".tes").html("注册成功，3秒后跳转到登陆");
								setTimeout(()=>{
									location.href = "login.html"
								},3000)
								break;
							case "2":i
								$(".tes").html("数据不全");break;
						}
					},
					data:{
						tel:$("#user").val(),
						pass:$("#pass").val()
					}
				})
			}
		}
		new Register;

// class Verification {
// 	constructor() {
// 		//选择元素
// 		this.ouser = document.getElementById("user");
// 		this.otxt = document.getElementById("txt");
// 		this.opass = document.getElementById("pass");
// 		this.obtn = document.getElementById("btn")
// 		this.ouserOff = otxtOff = opassOff = false;
// 		//绑定事件
// 		this.init();
// 	}
// 	init(){
// 		
// 	}
// 	
// }








