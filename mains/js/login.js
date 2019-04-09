"use strict"

class Login{
			constructor() {
			    this.url = "http://www.icodeilife.cn/ctrl/login.php";
				
				this.init();
			}
			init(){
				var that = this;
				$("#btn").click(function(){
					that.load();
					console.log(1)
				})
			}
			load(){
				var that = this;
				$.ajax({
					url:this.url,
					data:{
						user:$("#user").val(),
						pass:$("#pass").val()
					},
					success:function(res){
						switch(res){
							case "0":
								$("span").html("用户名或密码不符");break;
							case "1":
								$("span").html("重新登陆");break;
							default:
								$("span").html("登陆成功,3秒进入首页");
								that.res = JSON.parse(res)
								setTimeout(()=>{
									location.href = "index.html"
								},3000)
						}
					}
				})
			}
		}
		
		new Login;



















