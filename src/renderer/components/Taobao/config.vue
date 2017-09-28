<template>
	<div class="config">
		<ul>
			<li>
				<span>淘宝账号：</span>
				<input type="text" name="" v-model="username"  placeholder="请输入淘宝账号">
				<span>支付密码：</span>
				<input type="password" name="" v-model="pwd" max="6" min="6" placeholder="请输入支付密码">
			</li>
			<li>
				<span>淘宝账号：</span>
				<input type="text" name="" v-model="username"  placeholder="请输入淘宝账号">
				<span>支付密码：</span>
				<input type="password" name="" v-model="pwd" max="6" min="6" placeholder="请输入支付密码">
			</li>
		</ul>
		<button @click="save">保存配置</button>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return {
				username:"",
				pwd:"",
				config:null
			}
		},
		created(){
			this.config = this.hezone.localQuery("config") != null ? JSON.parse(this.hezone.localQuery("config")) : [];
			console.log(this.config)
		},
		methods:{
			save(){
				this.config.push({"name":this.username,"pwd":this.pwd,"time":new Date().getTime()})
				this.hezone.localAdd("config",JSON.stringify(this.config));
			}
		}
	}
</script>

<style type="text/css" lang="scss">
	.config{
		width: 960px;
		padding: 10px;
		margin: 96px auto;
		background: #ffffff;
		ul{
			li{
				padding:15px 0;
				list-style: none;
				border-bottom: 1px solid #f5f5f5;
				span{
					font-size: 13px;
					color: #444444;
				}
				input{
					border: none;
					outline: none;
					border-radius: 20px;
					padding:5px;
					width: 100px;
					height: 20px;
					margin-right: 20px;
					box-shadow: 0px 1px 20px #ececec;
				}
			}
		}
		button:hover{
			background:#ff4f3d;
		}
		button{
			outline: none;
			border:none;
			width: 80px;
			height: 30px;
			color: #ffffff;
			background: #ef6557;
			border-radius:35px;
			cursor: pointer;
			margin: 20px;
		}
	}
</style>