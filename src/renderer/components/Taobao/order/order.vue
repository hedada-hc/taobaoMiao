<template>
	<div class="order">
		<div class="add_order">
			<div class="orderInfo">
				<span>商品链接：</span>
				<input type="text" v-model="url" v-on:blur="getGoodsInfo" placeholder="请输入商品链接" name="">
				<span class="xiadan">定时下单：</span>
				<input type="date" class="date" v-model="date" placeholder="请输入时间" name="">
				<input type="time" class="dingshi" v-model="time" placeholder="请输入时间" name="">
				<button @click="addOrder">添加任务</button>
				<button @click="order">直接下单</button>
				<i></i>
				<nav >
					<a v-for="item in skuLen" v-if="item.skuId" @click="selectSku($event,item.skuId,item.skuName)" :class="selectClass ? 'selectSku' : ''"  href="javascript:;">{{item.skuName}}</a>
				</nav>
			</div>
		</div>
		<ul>
			<li v-for="item in task">
				<i></i>
				<img :src="item.img">
				<a href="javascript:;" @click="open(item.url)">{{item.title}}</a>
				<dd @click="deleteDule(item)">X</dd>
				<span class="time">倒计时: <span>{{item.time}}</span></span>
				<span class="price">价格: <span>{{item.price}}</span></span>
				<span class="user">账号: <span>{{item.user}}</span></span>
				<span class="miaos">秒杀型号: <span>{{item.skuName}}</span></span>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	import jquery from 'jquery'
	var shell = require("electron").shell;
	var moment = require("moment");
	var schedule = require("node-schedule");
	export default{
		data(){
			return {
				url:"",
				date:"",
				time:"",
				task:null,
				cookie:{},
				goodInfo:{},
				skuLen:0,
				selectClass:false,
				skuId:0,
				realPay:{},
				type:""
			}
		},
		created(){
			this.cookie = this.hezone.getSelectCookie();
			this.task = this.hezone.localQuery("dulesList") != null ? JSON.parse(this.hezone.localQuery("dulesList")) : [];
			this.createDuleTask();
		},
		methods:{
			open(itemID){
				/[a-z]/.test(itemID) ? shell.openExternal(itemID) : shell.openExternal('https://item.taobao.com/item.htm?id=' + itemID);
			},
			addOrder(){
				if(this.time == "" || this.date == "") return alert("请输入时间");
				var duleTime = this.hezone.scheduleTime(this.date+"-"+this.time);
				var time = this.getTime(this.time);
				this.good.getGoodsInfo(this.url,(error, response)=>{
					console.log(response)
					if(response != null && this.type != ""){
						this.goodInfo = response
						this.saveDule({"url":this.url,"img":response.picsPath[0],"title":response.title,"user":this.cookie.nick,"price":response.price,"time":time,"duleTime":duleTime,"skuName":this.type});
					}else{
						alert("该商品有误")
					}
					
				});

			},
			getTime(time){
				var timeObj = time.split(":");
				var s = parseInt(timeObj[0]) * (1000 * 60 * 60) //小时转时间戳
				var f = parseInt(timeObj[1]) * (1000 * 60) //分钟转时间戳
				var now_time = new Date().getTime();
				var ol_time = now_time + s + f;
				return ol_time - now_time;
			},
			order(){
				console.log(this.skuId)
				if(this.skuId.length<=0) return alert("请选择sku");
				this.good.subOrder(this.cookie.cookie,this.goodInfo.itemid,this.goodInfo.userId,this.skuId, (error, response)=>{
					this.realPay = response
					console.log(error,response)
					if(this.realPay){
						this.pay();
					}else{
						console.log(response,44111111)
					}
					
				});
			},
			pay(){
				this.good.getPayInfo(this.realPay,this.cookie);
			},
			getGoodsInfo(){
				if(this.url != ""){
					this.good.getGoodsInfo(this.url,(error, response)=>{
						this.goodInfo = response
						
						if(response.sku){
							this.skuLen = this.hezone.goodSkuName(response.sku)
						}else{
							this.skuLen = [{"skuId":"0","skuName":"无选项默认选项","sku_key":0}];
						}
						//selectSku
						//this.skuLen = this.hezone.goodSkuName(response.sku);
						console.log(this.skuLen)
						//this.queryCoupon();
					})
				}
			},
			selectSku(e,skuId,skuName){
				console.log(skuName)
				this.skuId = skuId;
				e.target.className = e.target.className == "selectSku" ? "" : "selectSku"
				this.type = skuName;
			},
			queryCoupon(){
				this.good.queryCoupon(this.cookie.cookie,this.goodInfo.itemid, (error, response)=>{
					console.log(response)
				});
			},
			saveDule(dule){
				this.task.push(dule);
				//保存定时任务
				this.hezone.localAdd("dulesList",JSON.stringify(this.task));
				this.createDuleTask();
			},
			createDuleTask(){
				for(var index in this.task){
					var j = schedule.scheduleJob(this.task[index].duleTime,()=>{
						this.order();
					})
					this.task[index].node_schedule = j
				}

			},
			deleteDule(index){
				try{
					index.node_schedule.cancel(); //关闭定时任务
				}catch(e){
					
				}
				this.task.splice(index,1);
				this.hezone.localAdd("dulesList",JSON.stringify(this.task));
			}
		}
	}
</script>
<style type="text/css" lang="scss">
	input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{
		-webkit-appearance: none !important;
	}
	.order{
		width: 1000px;
		margin:100px auto;
		.add_order{
			width: 960px;
			margin: 0 auto;
			background: #ffffff;
			margin-bottom: 16px;
			box-shadow: 0px 0px 14px #d2d2d2;
			padding:20px;
			.orderInfo{
				margin-top: 10px;
				input{
					outline: none;
					border:none;
					width: 310px;
					height: 30px;
					border-radius:35px;
					box-shadow: 0px 0px 14px #eaeaea;
					padding:0 10px;
					font-size: 12px;
					text-align: center;
				}
				.date{
					width: 105px;
				}
				.dingshi{
					width: 80px;
				}
				span:nth-child(1){
					margin-left: 0px;
	    			margin-top: 36px;
				}
				span{
					color: #505050;
				}
				.xiadan{
					display: inline-block;
					margin-left: 20px;
				}
				button{
					outline: none;
					border:none;
					width: 80px;
					height: 30px;
					color: #ffffff;
					background:#ff4f3d;
					border-radius:35px;
					cursor: pointer;
					margin-left: 20px;
				}
				i{
					display: block;
					width: 100%;
					border-bottom: 1px solid #eaeaea;
					height: 1px;
					margin: 14px;
				}
				nav{
					a{
						margin: 2px;
						text-decoration: none;
						display: inline-block;
						padding: 6px 6px;
						text-align: center;
						background: #868686;
						color: #ffffff;
						font-size: 12px;
					}
					.selectSku{
						background:#ff4f3d;
					}
				}
			}
		}
		ul{
			width: 1020px;
			li:hover{
				box-shadow: 0px 0px 14px #fbd0bf;
			}
			li{
				margin-bottom: 20px;
				float: left;
				margin-right: 20px;
				list-style-type: none;
				background: #ffffff;
				width: 490px;
				height: 75px;
				box-shadow: 0px 0px 14px #d2d2d2;
				dd{
					display: block;
					float: right;
					width: 20px;
					height: 20px;
					font-family: sans-serif;
					color: #ff4f3d;
					text-align: center;
					line-height: 20px;
					font-size: 11px;
					cursor: pointer;
				}
				dd:hover{
					background:#ff4f3d;
					color: #ffffff;
				}
				i{
					float: left;
					display: inline-block;
					width: 6px;
					height: 75px;
					background:#fd6226;
					margin: 0px;
				}
				img{
					float: left;
					width: 75px;
					height: 75px;
				}
				a{
					width: 300px;
					display: inline-block;
					font-size: 14px;
					float: left;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
					padding: 6px 0px 5px 10px;
					color: #4c4c4c;
					text-decoration: none;
				}
				a:hover{
					color: #ff4f3d;
				}
				.time{
					display: inline-block;
					padding-left: 10px;
					width: 145px;
					font-size: 14px;
					color: #4c4c4c;
					span{
						font-weight: 500;
						color: #ff5a1e;
					}
				}
				.price{
					span{
						font-family: fantasy;
						color: #ff5a1e;
					}
				}
				.user{
					font-size: 12px;
					color: #a5a5a5;
					float: right;
    				margin-right: 10px;
    				margin-top: 3px;
				}
				.miaos{
					font-size: 13px;
					margin-left: 10px;
					color: #adadad;
					width: 386px;
    				float: left;
    				margin-top: 6px;
				}
			}
		}
	}
</style>

