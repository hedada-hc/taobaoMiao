<template>
	<div class="user">
		<button @click="test" class="login">登录账号</button>
		<h3 v-if="isLogin" class="info">当前共有 <span>{{allCookie.length}}</span> 个账号，过期 <span>{{isCount}}</span> 个</h3>
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
				isLogin:false,
				isCount:0
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
						//检测账号是否失效
						this.good.isLogin(this.allCookie[item],(error, res)=>{
							if(!res){
								this.isCount += 1
							}
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
			test(){
				ipc.send("cSession");
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