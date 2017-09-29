<template>
	<div>
		<h1>{{message}}</h1>
		<button @click="test">点击我啊</button>
	</div>
	
</template>

<script type="text/javascript">
	export default{
		data(){
			return{
				message:""
			}
		},
		created(){
			this.message = new Date()
		},
		methods:{
			test(){
				setInterval(()=>{
					this.message = new Date()
				},1000)
			}
			
		}
	}
</script>

<style type="text/css"></style>