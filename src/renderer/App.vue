<template>
  <div id="app">
  	<a href="javascript:;" class="close" @click="close()">X</a>
  	<div class="border"  style="-webkit-app-region: drag;">淘宝秒杀下单系统</div>
  	<div class="nav">
  		<ul>
  			<li><a href="/">下单列表</a></li>
  			<li><a href="/#order">订单列表</a></li>
  			<li><a href="/#cookie">账号列表</a></li>
  		</ul>
  	</div>
    <router-view></router-view>
  </div>
</template>

<script>
	const ipc = require("electron").ipcRenderer;
	export default {
		name: 'taobao',
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
			background: #ffffff;
			color: #FF6537;
			font-family: sans-serif;
			box-shadow: 2px 0px 8px #e4e4e4;
		}
		.close:hover{
			background:#FF6537;
			color: #ffffff;
		}
		.nav{
			position: fixed;
			top: 30px;
			height: 52px;
			width: 100%;
			background: #ffffff;
			box-shadow: 0px 0px 8px #e4e4e4;
			ul{
				li{
					list-style: none;
					float: left;
					width: 80px;
					height: 52px;
					margin: 0px 10px;
					a{
						height: 52px;
						display: block;
						text-decoration: none;
						color: #f40;
						font-weight: 700;
						padding: 0 5px;
						line-height: 52px;
					}
				}
				li:hover{
					background:#FF6537;
					a{
						color: #ffffff;
					}
					
				}
			}
		}
	}
  /* CSS */
</style>
