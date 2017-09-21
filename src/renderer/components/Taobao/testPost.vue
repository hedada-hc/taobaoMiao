<template>
	<div>
		<span>url:</span><input type="text" v-model="url" name=""><br>
		<span>data:</span><input type="text" v-model="requestData" name=""><br>
		<span>cookies:</span><textarea v-model="cookies"></textarea><br>
		<button @click="submit">提交</button>

		<span>生成格式:</span><textarea v-model="requestP"></textarea>
		<input type="" placeholder="请输入时间戳" v-model="times" name="">
		<input type="" placeholder="请输入token" name="" v-model="token">
		<input type="" placeholder="请输入ua" name="" v-model="ua">
		<h1>{{sign}}</h1>
		<button @click="create">生成数据</button>
		<button @click="huanyuan">还原数据</button>
		<a href="/"></a>
	</div>
</template>

<script type="text/javascript">
	var request = require("superagent");
	import md5 from "js-md5"
	export default{
		data(){
			return {
				"requestData":"",
				"url":"",
				"cookies":"",
				"times":"",
				"token":"",
				"sign":"",
				"requestP":"",
				"ua":""
			}
		},
		methods:{
			submit(){
				request.post(this.url)
					.set("cookie",this.cookies)
					.send(this.requestData)
					.end((error, result)=>{
						console.log(result)
						console.log(result.text)
					})
			},
			create(){
				if(this.ua != ""){
					var orderData = JSON.parse(this.requestP).params
					console.log(orderData)
					var params = JSON.stringify({
							"hierarchy":JSON.stringify(orderData.hierarchy),
							"data":JSON.stringify(orderData.data),
							"linkage":JSON.stringify(orderData.linkage),
						});
					if(this.ua == "" && this.ua.length < 50){
						var data = {
							"params":JSON.stringify(params)
						}
					}else{
						var data = {
							"params":JSON.stringify(params),
							"ua":this.ua
						}
					}
					//this.requestP = JSON.stringify(params)
					this.requestP = JSON.stringify(data)
				}
				this.sign = md5(this.token+"&"+this.times+"&12574478&"+this.requestP)
			},
			huanyuan(){
				var tmp = JSON.parse(this.requestP)
				var data = {
					"params":{
						"data":null,
						"hierarchy":null,
						"linkage":null
					}
				}
				data.params.data = JSON.parse(tmp.params).data
				data.params.hierarchy = JSON.parse(tmp.params).hierarchy
				data.params.linkage = JSON.parse(tmp.params).linkage
				this.requestP = JSON.stringify(data)
				this.requestP = this.requestP.replace(/'/g,'"')
				this.requestP = this.requestP.replace(/"{/g,'{')
				this.requestP = this.requestP.replace(/}"/g,'}')
				this.requestP = this.requestP.replace(/\\/g,'')
			}
		}
	}
</script>