<template>
	<div class="order">
		<div class="add_order">
			<div class="orderInfo">
				<span>商品链接：</span>
				<input type="text" v-model="url" v-on:blur="getGoodsInfo" placeholder="请输入商品链接" name="">
				<span class="xiadan">定时下单：</span>
				<input type="time" class="dingshi" v-model="time" placeholder="请输入商品链接" name="">
				<button @click="pay">添加任务</button>
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
				<a href="javascript:;" @click="open(556223312007)">{{item.title}}</a>
				<span class="time">倒计时: <span>{{item.time}}</span></span>
				<span class="price">价格: <span>{{item.price}}</span></span>
				<span class="user">账号: <span>{{item.user}}</span></span>
				<span class="miaos">秒杀型号: <span>{{item.skuName}}</span></span>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	var shell = require("electron").shell;
	var moment = require("moment");
	export default{
		data(){
			return {
				url:"https://item.taobao.com/item.htm?id=558550775113",
				time:"11:11",
				task:[],
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
		},
		methods:{
			open(itemID){
				shell.openExternal('https://item.taobao.com/item.htm?id=' + itemID);
			},
			addOrder(){
				if(this.time == null) return alert("请输入时间");
				var time = this.getTime(this.time);
				console.log(moment(time).fromNow("h:mm:ss"))
				this.good.getGoodsInfo(this.url,(error, response)=>{
					console.log(response)
					if(response != null){
						this.goodInfo = response
						this.task.push({"url":this.url,"img":response.picsPath[0],"title":response.title,"user":"小小的太阳1161","price":response.price,"time":time,"skuName":this.type})
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
				if(this.skuId == 0) return alert("请选择sku");
				this.good.subOrder(this.cookie.cookie,this.goodInfo.itemid,this.goodInfo.userId,this.skuId, (error, response)=>{
					this.realPay = response
					console.log(error,response)
				});
			},
			pay(){
				this.realPay = {"api":"mtop.trade.createorder.h5","data":{"alipayOrderId":"2017092621001001750229254475","alipayWapCashierUrl":"//maliprod.alipay.com/w/trade_pay.do?tcode=eyJiaXpPcmRlcklkcyI6IjYyNTkwNDE5MjM5NDM4MjMzIiwiYnV5ZXJJZCI6IjI4NDg0MzMzODIiLCJ0eXBlIjoiMyJ9&alipay_trade_no=2017092621001001750229254475&s_id=16a01edf8a46c12cf125eaada8cdfe34&return_url=https%3A%2F%2Fh5.m.taobao.com%2Fapp%2Ftrade%2Fpaysuc.html%3F_wx_tpl%3Dhttps%3A%2F%2Fowl.alicdn.com%2Fmupp-dy%2Fdevelop%2Ftaobao%2Ftrade%2FpaySuccess%2Fentry.js%26wx_navbar_transparent%3Dtrue%26orderIds%3D62590419239438233%26degrade%3D0%26act%3Dfalse&pay_order_id=62590419239438233","backUrl":"//h5.m.taobao.com/app/trade/paysuc.html?_wx_tpl=https://owl.alicdn.com/mupp-dy/develop/taobao/trade/paySuccess/entry.js&wx_navbar_transparent=true&orderIds=62590419239438233&degrade=0&act=false","bizOrderId":"62590419239438233","buyerNumId":2848433382,"nextUrl":"//maliprod.alipay.com/w/trade_pay.do?tcode=eyJiaXpPcmRlcklkcyI6IjYyNTkwNDE5MjM5NDM4MjMzIiwiYnV5ZXJJZCI6IjI4NDg0MzMzODIiLCJ0eXBlIjoiMyJ9&alipay_trade_no=2017092621001001750229254475&s_id=16a01edf8a46c12cf125eaada8cdfe34&return_url=https%3A%2F%2Fh5.m.taobao.com%2Fapp%2Ftrade%2Fpaysuc.html%3F_wx_tpl%3Dhttps%3A%2F%2Fowl.alicdn.com%2Fmupp-dy%2Fdevelop%2Ftaobao%2Ftrade%2FpaySuccess%2Fentry.js%26wx_navbar_transparent%3Dtrue%26orderIds%3D62590419239438233%26degrade%3D0%26act%3Dfalse&pay_order_id=62590419239438233","partSuccess":false,"resultType":0,"secrityPay":true,"signStr":"service=\"mobile.securitypay.pay\"&_input_charset=\"utf-8\"&app_name=\"tb\"&appenv=\"appid=taobao^system=^version=\"&partner=\"PARTNER_TAOBAO_ORDER\"&biz_type=\"trade\"&trade_no=\"2017092621001001750229254475\"&sign_date=\"2017-09-26 17:56:08\"&extern_token=\"16a01edf8a46c12cf125eaada8cdfe34\"&sign=\"_r%2Bf_fih_q_g0_m_h_z_j_euj7kpb_lp_o_h_i_f_s_k_mqu_ax_z9ng_j50_oax_v_c_g_i%2Fe_p5_a_k_q%3D%3D\"&sign_type=\"DSA\"","simplePay":true,"useSimplePayForH5":false},"ret":["SUCCESS::调用成功"],"v":"3.0"};
				console.log(this.realPay)
				this.good.getPayInfo(this.realPay,this.cookie);
			},
			getGoodsInfo(){
				if(this.url != ""){
					this.good.getGoodsInfo(this.url,(error, response)=>{
						this.goodInfo = response
						this.skuLen = this.hezone.goodSkuName(response.sku);
						console.log(this.skuLen)
						this.queryCoupon();
					})
				}
			},
			selectSku(e,skuId,skuName){
				console.log(skuName)
				//this.selectClass = true;
				this.skuId = skuId;
				e.target.className = e.target.className == "selectSku" ? "" : "selectSku"
				this.type = skuName;
			},
			queryCoupon(){
				this.good.queryCoupon(this.cookie.cookie,this.goodInfo.itemid, (error, response)=>{
					console.log(response)
				});
			}
		}
	}
</script>

<style type="text/css" lang="scss">
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
					width: 350px;
					height: 30px;
					border-radius:35px;
					box-shadow: 0px 0px 14px #eaeaea;
					padding:0 10px;
					font-size: 12px;
					text-align: center;
				}
				.dingshi{
					width: 150px;
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