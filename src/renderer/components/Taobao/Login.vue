<template>
	<div class="login">
		<input v-model="username" type="text" name="">
		<input v-model="password" type="password" name="">
		<button @click="login">登录</button>
	</div>
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				username:"hdd工作室",
				password:"HEdada0313"
			}
		},
		created(){
			//获取inputToken各种值
			this.lg.getFormInput((err,res)=>{
				console.log(res)
			});
		},
		methods:{
			login(){
				this.lg.loginPost(this.username,this.password)
			}
		}
	}
</script>

<style type="text/css">
	.login{
		margin-top: 96px;

	}
</style>