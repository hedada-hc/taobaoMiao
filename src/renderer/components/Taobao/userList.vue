<template>
	<div class="user">
		<h3 v-if="isLogin" class="info">当前共有 <span>{{allCookie.length}}</span> 个账号，过期 <span>1</span> 个</h3>
		<h3 v-else class="info" @click="login">请先登录啊，点我登录</h3>
		<ul>
			<li @click="selectUser(item.nick)" v-for="item in allCookie">
				<div class="userInfo">
					<i :class="item.isSelect ? 'select' : ''"></i>
					<img :src="'http:' + item.user.userLogo">
					<span class="name">{{item.nick}}</span>
					<span class="orderinfo">待付款:<p> {{item.user.order2Pay}}</p></span>
					<span class="orderinfo">待发货:<p> {{item.user.order2Deliver}}</p></span>
					<span class="orderinfo">待收货:<p> {{item.user.order2Receive}}</p></span>
					<button @click="test" class="login">登录账号</button>
					<span class="time">上次登录时间: {{formatDateTime(item.time)}}</span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	var request = require("request");
	var su = require("superagent");
	var ipc = require("electron").ipcRenderer;
	export default{
		data(){
			return {
				allCookie:{},
				isLogin:false
			}
		},
		created(){
			ipc.on("loginTB",(error, result)=>{
				if(result){
					this.hezone.localCookie(result)
				}
				this.isLoginUser();
			})
			this.isLoginUser();
			
		},
		methods:{
			isLoginUser(){
				if(this.hezone.localQuery("all_cookie") != null){
					this.allCookie = JSON.parse(this.hezone.localQuery("all_cookie"))
					for(var item in this.allCookie){
						this.good.isLogin(this.allCookie[item],(error, res)=>{
							console.log(res)
						});
					}
					this.isLogin = true;
				}else{
					this.isLogin = false;
				}
			},
			login(){
				ipc.send("loginTB");
			},
			formatDateTime(inputTime) {    
			    var date = new Date(inputTime);  
			    var y = date.getFullYear();    
			    var m = date.getMonth() + 1;    
			    m = m < 10 ? ('0' + m) : m;    
			    var d = date.getDate();    
			    d = d < 10 ? ('0' + d) : d;    
			    var h = date.getHours();  
			    h = h < 10 ? ('0' + h) : h;  
			    var minute = date.getMinutes();  
			    var second = date.getSeconds();  
			    minute = minute < 10 ? ('0' + minute) : minute;    
			    second = second < 10 ? ('0' + second) : second;   
			    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 
			},
			selectUser(nick){
				for(var item in this.allCookie){
					if(this.allCookie[item].nick == nick){
						this.allCookie[item].isSelect = true;
					}else{
						this.allCookie[item].isSelect = false;
					}
				}
				this.hezone.localAdd("all_cookie", this.allCookie);
			},
			test(){
				console.log(this.allCookie.cookie)
				var url = "https://mclient.alipay.com/h5/cashierPay.htm?awid=RZ13M8wmVsMQfLY9EYyb0a6kpCUL0lmobileclientgwRZ13"
				su.post(url)
					.set("Content-Type","application/x-www-form-urlencoded")
					.set("Cookie","_uab_collina=150614541707539156653777; cna=k+JMEkfAkgcCATuuBGOBq/dN; l=AqSkEXIG4UxF3HjlV7A5FfDFdKmWPcin; v=0; cookie2=11816641b707beeee9e0bc74a7a11a69; _tb_token_=0e77dad36b7b; _umdata=65F7F3A2F63DF020615CC79D3D8A5D88B07DE40D53C338666DD60583CAA845CF5961A06188F62AA3CD43AD3E795C914C07B456B19261489680491B44F1FF3CC0; ockeqeudmj=tvoDmqM%3D; munb=2848433382; WAPFDFDTGFG=%2B4cMKKP%2B8PI%2BNDdovdfQ1H8VC3hv8%2BE%3D; _w_app_lg=17; yryetgfhth=%2B4cXpeDzLTAIW6kFUQRUdi1xctarHojuQf4IqkzGHYZJOjnnYYO3ikf6VVPvo45EOPpwICyI%2FfbCpYJC2%2BXU%2FpBjZoqZ67j7mKMprlnSG%2BYWcji6454JTlrxBu5dnf11BfwFMVfPQRVvAKtlksbq8FUClGpl%2B76Su1dm4U6X69I2n45ol40C5isYUwUuRmFTV3eD; uc3=sg2=UINPJcxe9yDxB%2FjJLLtN3P3wNekyjowO0EVmqfaFEjw%3D&nk2=Cym25MsqJq1x&id2=UUBc8wzHiQZ8VA%3D%3D&vt3=F8dBzWk%2BRrA%2B8pm6ABU%3D&lg2=WqG3DMC9VAQiUQ%3D%3D; uc1=cookie14=UoTcCfQtP0cgeA%3D%3D&cookie21=URm48syIYB3rzvI4Dim4&cookie15=U%2BGCWk%2F75gdr5Q%3D%3D; lgc=hdd%5Cu5DE5%5Cu4F5C%5Cu5BA4; uss=AiGZPYGKNsRzmpr8JfRxfbSSZ6VJ3W%2F6%2FD3AdR1LmUd7t0L0mBto6wVuhg%3D%3D; tracknick=hdd%5Cu5DE5%5Cu4F5C%5Cu5BA4; sg=%E5%AE%A429; cookie1=BqPjx59lctUD%2BTMUuEzTSyuXNMUTwtwr3%2BnFiSxwgZo%3D; ntm=0; unb=2848433382; skt=6b09527fa99ffe70; t=e69ea78bcb77bce59ecf456d47a9c59c; _cc_=V32FPkk%2Fhw%3D%3D; _nk_=hdd%5Cu5DE5%5Cu4F5C%5Cu5BA4; _l_g_=Ug%3D%3D; cookie17=UUBc8wzHiQZ8VA%3D%3D; _m_h5_tk=9b44dc523b4e62bdfa436edd6d1cc2dd_1506505779097; _m_h5_tk_enc=556b7ccb10d03fcbc0c9f8388c8c33b9; isg=AvT0I0o1Eew4xYWuys-Tn8lpzrKmZRrcrk-V_o5VgH8C-ZRDtt3oR6o7Lw_f; ")
					.send("isFromPwdValidate=true&_form_token=bb3ea149d24ae3debf9ad4f35e39afbb69084e77806347caa1461feff3b77d2fRZ13&params=%7B%22server_param%22%3A%22c2hhcmVkX3RhaXI9ZmFsc2U7Yml6X3R5cGU9dHJhZGU7dHJhZGVfbm89MjAxNzA5MjcyMTAwMTAwMTc1MDIzMTM4NDkyMzt1c2VyX2lkPTIwODgyMjI1Mzc1OTc3NTg7%22%2C%22shared_tair%22%3A%22false%22%7D&session=RZ13q3nXVLXlABo4CfsjHHuQZ43UV1mobilecashierRZ13&spwd_unencrypt=******&spwd=lDy0c5I6ebyH5%2BHEyJFX4CHAbkRCPOGnu5EnX2gDX%2Fq2TqeX1XsF852seK2uOWeg%0D%0AUIn%2BAxN7mfZ4nLro7dgg0g%3D%3D%2CJy2xtfCldJ%2FLTsz0uUcVCyPWC0EPDlUBzJTSeX76h%2BMu%2B1z%2BUHZGlwlGfkCLFBcN%0D%0AOrOKhNwesLxUJvdz7MOj0w%3D%3D%2CeDBrqEO0PUJ8JMi8ahjF2xVGxWJxWwdm5dfPYrMgW6gH2D6dSUxfrz7Rsirdc%2FyV%0D%0AO%2Fn47Dqwt5VgUXSkkhuixw%3D%3D%2Co0BJN6w%2BjkU5SFiPfBX8u3%2FKRtdu3Ldk0%2FEzLcqKNiAcVKl7bl8py3Vd6XIN0vNN%0D%0AJQbyuOkKt9ksocKNx9D8sg%3D%3D%2CRCLxcXTlI8%2BBwB8vD6vS3RwdTkOYt5Ug5jnYyevqLdn2QlZJDkg6Qsay3jDjSRaF%0D%0A3nJJrusxyAiLkmIHmMO1%2Fg%3D%3D%2CEiCO%2FXdZnEibH4Lsww6j59wIhKFXsj6LkzxZa3xO7siJ1Bl%2BFdAqrIQxjjazNPnR%0D%0AM6SjZUXRXzsCcxaMPBTqgA%3D%3D")
					.end((error, response)=>{
						console.log(response.text)
					})

				//console.log(this.hezone.handlePwd("940313"));
			}
		}
	}
</script>

<style type="text/css" lang="scss">
	.user{
		margin: 90px auto;
		width: 900px;
		.info{
			color: #3c495a;
			font-size: 14px;
			text-align: center;
			line-height: 30px;
			font-weight: 100;
			height: 30px;
			width: 250px;
			margin: 0 auto;
		    background: #ff4f3d;
		    border-radius: 26px;
		    color: #ffffff;
		    cursor: pointer;
			span{
				color: #f9ff06;
			}
		}
		ul{
			margin-top: 10px;
			li:hover{
				box-shadow: 0px 0px 12px #ffd1d1;
			}
			li{
				cursor: pointer;
				list-style: none;
				width: 100%;
				height: 60px;
				background: #ffffff;
				box-shadow: 0px 0px 12px #e0e0e0;
				padding: 10px;
				margin: 15px 0;
				.userInfo{
					width: 100%;
					margin: 0 auto;
					i{
						display: block;
						width: 8px;
						height: 8px;
						background:#ff4f3d;
						border-radius: 20px;
						float: left;
						margin: 26px 10px 0 0;
					}
					.select{
						background:#52d202;
					}
					img{
						width: 30px;
						height: 30px;
						border-radius:30px;
						float: left;
						margin: 14px 10px 0 0px;
					}
					span{
						font-size: 14px;
						display: block;
						float: left;
						margin: 22px 0px 0 10px;
					}
					.orderinfo{
						p{
							width: 30px;
							height: 20px;
							background: #ff5000;
							color: #ffffff;
							text-align: center;
							line-height: 20px;
							display: inline-block;
							border-radius:20px;
						}
					}
					.name{
						color: #3c495a;
						font-weight: 900;
					}
					.time{
						float: right;
						color: #444444;
					}
					.login{
						display: block;
						float: right;
						border:none;
						width: 75px;
						height: 30px;
						border-radius:30px;
						color: #ffffff;
						background:#ff4f3d;
						cursor: pointer;
						outline: none;
						margin:14px 10px;

					}
				}
			}
		}
	}
</style>