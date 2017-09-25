<template>
	<table>
		<tr class="header">
			<th style="width:80px">账号名称</th>
			<th style="width:80px">商品图片</th>
			<th style="width:500px">商品标题</th>
			<th style="width:80px">商品价格</th>
			<th style="width:120px">店铺名称</th>
			<th style="width:120px">交易状态</th>
		</tr>
		<tr class="order" v-for="item in OrderList">
			<td>{{allCookies.nick}}</td>
			<td><img :src="item.pic" width="30" height="30"></td>
			<td>{{item.title}}</td>
			<td>{{item.price}}</td>
			<td>{{item.sellerNick}}</td>
			<td>{{item.order_status}}</td>
		</tr>
	</table>	
</template>

<script type="text/javascript">
	var request = require("request");
	export default{
		data(){
			return {
				allCookies:[],
				OrderList:null,
				todo:false,
				cookie:""
			}
		},
		created(){
			this.allCookies = this.hezone.getSelectCookie();
			if(this.allCookies == null){
				alert("请先登录啊");
			}else{
				this.cookie = this.allCookies.cookie;
				this.queryOrder();
			}
		},
		methods:{
			queryOrder(){
				var sign = this.hezone.deSign(this.allCookies.cookie, `{"spm":"a2141.7756461.2.1","tabCode":"waitConfirm","page":1,"appVersion":"1.0","appName":"tborder"}`);
				var url = `http://api.m.taobao.com/h5/mtop.order.queryboughtlist/3.0/?appKey=12574478&t=${sign.time}&sign=${sign.sign}&api=mtop.order.queryBoughtList&v=3.0&ttid=%23%23h5&ecode=1&AntiFlood=true&AntiCreep=true&LoginRequest=true&type=jsonp&dataType=jsonp&data=%7B%22spm%22%3A%22a2141.7756461.2.1%22%2C%22tabCode%22%3A%22waitConfirm%22%2C%22page%22%3A1%2C%22appVersion%22%3A%221.0%22%2C%22appName%22%3A%22tborder%22%7D`
				request.get({url:url,headers:{"Cookie":this.cookie}},(error, response, body)=>{
					body = body.replace(/callback\(/,"");
					body = body.replace(/\}\)/,"}");
					this.OrderList = JSON.parse(body);
					if(this.OrderList.ret[0] == "FAIL_SYS_TOKEN_EXOIRED::令牌过期" && !this.todo){
						this.allCookies.cookie = this.hezone.replaceCookie(this.allCookies.cookie,response.headers['set-cookie']);
						this.cookie = this.allCookies.cookie
						this.todo = true;
						var tmpAllCookie = this.hezone.localQuery("all_cookie");
						if(tmpAllCookie != null){
							for(var index in tmpAllCookie){
								if(tmpAllCookie[index].nick == this.allCookies.nick){
									tmpAllCookie[index].cookie = this.allCookies.cookie;
									this.hezone.localAdd("all_cookie",tmpAllCookie);
								}
							}
						}
						this.queryOrder();
					}else{
						if(this.OrderList.data.data){
							this.OrderList = this.hezone.queryBoughtList(this.OrderList.data.data.group)
							console.log(this.OrderList,JSON.parse(body))
						}else{
							alert("session失效")
						}
						
					}
					
				})
			}
		}
	}
</script>

<style type="text/css" lang="scss">
	table{
		margin-top:82px;
		padding: 0px;
		width: 100%;
		border-collapse:collapse;
		.header{
			border-top: 1px solid #eaeaea;
			background: #ffffff;
			height: 38px;
			line-height: 38px;
			font-size: 14px;
			th{
				color: #616c80;
			}
		}

		.order{
			text-align: center;
			height:30px;
			border-bottom: 1px solid #eaeaea;
			background: #ffffff;
			td{
				font-size: 13px;
				img{
					border-radius:20px;
				}
			}
			td:nth-child(1){
				color: #999999;
			}
			td:nth-child(3){
				color: #6d788c;
			}
			td:nth-child(4){
				color: #FF6537;
			}
			td:nth-child(6){
				color: #adb5f6;
			}
		}
	}
</style>

