<template>
  <div id="app">
  	<!-- <a href="javascript:;" class="close" @click="close()">X</a>
  	<div class="border"  style="-webkit-app-region: drag;">兄弟辅助</div> -->
  	<div class="nav">
  		<ul>
  			<li> <router-link to="/">下单任务列表</router-link></li>
  			<li>
  				<router-link to="/order">订单列表</router-link>
  				<router-link to="/order/waitpay">待付款</router-link>
  				<router-link to="/order/waitsend">待发货</router-link>
  				<router-link to="/order/waitconfirm">待收货</router-link>
  			</li>
  			<li><router-link to="/userlist">账号列表</router-link></li>
  			<li><router-link to="/login">登录账号</router-link></li>
  			<!-- <li><a href="/#hezone">软件配置</a></li> -->
  		</ul>
  	</div>
    <router-view></router-view>
  </div>
</template>

<script>
	const ipc = require("electron").ipcRenderer;
	export default {
		name: 'taobao',
		data(){
			return {
				isSelect:true
			}
		},
		methods:{
			close(){
				console.log("dssdsdsdsd")
				ipc.send("close");
			}
		}
  }
</script>

<style lang="scss">
	#app{
		background:#f1f1f1;
		.border{
			position: fixed;
			top: 0px;
			z-index: 2;
			width: 96%;
			height: 30px;
			float: left;
			background: #ffffff;
			box-shadow: 0px 0px 8px #e4e4e4;
			text-align: center;
			line-height: 30px;
			color: #696969;
			font-family: sans-serif;
		}
		.close{
			top: 0px;
			z-index: 3;
			position: fixed;
    		right: 0;
			display: block;
			width: 4%;
			height: 30px;
			text-align: center;
			line-height: 30px;
			color: #333333;
			cursor: pointer;
			text-decoration: none;
			background:#FF6537;
			color: #ffffff;
			font-family: sans-serif;
			box-shadow: 2px 0px 8px #e4e4e4;
		}
		.close:hover{
			background:#ff4812;
			color: #ffffff;
		}
		.nav{
			position: fixed;
			top: 0px;
			height: 38px;
			width: 100%;
			background: #ffffff;
			box-shadow: 0px 0px 8px #e4e4e4;
			ul{
				li{
					text-align: center;
					list-style: none;
					float: left;
					padding:0 10px;
					height: 38px;
					margin: 0px 10px;
					a{
						height: 38px;
						display: block;
						text-decoration: none;
						color: #f40;
						font-weight: 700;
						line-height: 38px;
					}

				}
				li:hover{
					background:#FF6537;
					a{
						color: #ffffff;
					}
					
				}
				li:nth-child(2) a{
					display: none;
				}
				li:nth-child(2) a:nth-child(1){
					display: block;
				}
				li:nth-child(2):hover{
					background:#ffffff;
					box-shadow: 2px 0px 8px #e4e4e4;
					height: 100%;
					a{
						display: block;
						color: #FF6537;
					}
					a:nth-child(2){
						color: #555555;
					}
					a:nth-child(3){
						color: #555555;
					}
					a:nth-child(4){
						color: #555555;
					}
				}
			}
		}
	}
  /* CSS */
</style>
