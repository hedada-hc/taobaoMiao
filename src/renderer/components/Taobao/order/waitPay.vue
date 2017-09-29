<template>
	<div class="allorder">
		<div :style="isWuliu ? 'display:block' : 'display:none'" class="mask">
			<dd @click="close">X</dd>
			<ul>
				<li v-for="item in bagList.transitList">
				    <span>{{item.time}}</span>
				    <p>{{item.message}}</p>
				</li>
			</ul>
		</div>
		<table>
			<tr class="header">
				<th style="width:80px">账号名称</th>
				<th style="width:80px">商品图片</th>
				<th style="width:300px">商品标题</th>
				<th style="width:80px">商品价格</th>
				<th style="width:120px">店铺名称</th>
				<th style="width:200px">交易状态</th>
			</tr>
			<tr class="order" v-for="item in OrderList">
				<td>{{allCookies.nick}}</td>
				<td><img :src="item.pic" width="30" height="30"></td>
				<td>{{item.title}}</td>
				<td>{{item.price}}</td>
				<td>{{item.sellerNick}}</td>
				<td>
					<a href="javascript:;" @click="queryLogistic(item)">查询物流</a>
					<span>{{item.order_status}}</span>
				</td>
			</tr>
		</table>	
	</div>
</template>

<script type="text/javascript">
	var request = require("request");
	export default{
		data(){
			return {
				allCookies:[],
				OrderList:null,
				todo:false,
				cookie:"",
				isWuliu:false,
				mailNo:0,
				bagList:[]
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
				var sign = this.hezone.deSign(this.allCookies.cookie, `{"spm":"a2141.7756461.2.6","page":1,"tabCode":"waitPay","appVersion":"1.0","appName":"tborder"}`);
				var url = `https://api.m.taobao.com/h5/mtop.order.queryboughtlist/3.0/?appKey=12574478&t=${sign.time}&sign=${sign.sign}&api=mtop.order.queryBoughtList&v=3.0&ttid=%23%23h5&ecode=1&AntiFlood=true&AntiCreep=true&LoginRequest=true&type=jsonp&dataType=jsonp&data=%7B%22spm%22%3A%22a2141.7756461.2.6%22%2C%22page%22%3A1%2C%22tabCode%22%3A%22waitPay%22%2C%22appVersion%22%3A%221.0%22%2C%22appName%22%3A%22tborder%22%7D`
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
			},
			queryLogistic(item){
				//获取物流信息
				item.cookie = this.cookie
				this.isWuliu = true
				this.good.getLogisticByOrderId(item, (error, response)=>{
					if(!error){
						this.mailNo = response.data.orderList[0].bagList[0].mailNo
						this.bagList = response.data.orderList[0].bagList[0]
						console.log(this.mailNo,this.bagList)
						/**
						action:"GOT"
						message:"顺丰速运 已收取快件"
						time:"2017-09-28 00:00"
						*/
					}else{
						console.log(error,response)
					}
				})
			},
			close(){
				this.isWuliu = false;
			}
		}
	}
</script>

<style type="text/css" lang="scss">
.allorder{
	width:100%;
	height:100%;
	.mask{
		// 弹窗物流信息遮罩
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.7);
		position: absolute;
		dd{
			display: block;
			width: 20px;
			height: 20px;
			font-family: sans-serif;
			color: #ffffff;
			text-align: center;
			line-height: 20px;
			font-size: 11px;
			cursor: pointer;
			position: absolute;
			background:#ff4f3d;
		    left: 830px;
		    top: 10px;
		}
		dd:hover{
			background:#ff4f3d;
			color: #ffffff;
		}
		ul{
			width: 500px;
			background: #eeeeee;
			margin: 10px auto;
			padding: 8px;
			li{
				list-style: none;
				
				width: 484px;
				margin: 0 auto;
				font-size: 13px;
				text-align: center;
				margin-bottom: 8px;
				box-shadow: 0px 3px 7px #e4e4e4;
				p{
					color: #ff6537;
					padding: 5px;
					background: #ffffff;
				}
				span{
					display: block;
					padding: 3px;
					color: #9a9999;
					font-size: 12px;
				}
			}
		}
	}
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
}
</style>

