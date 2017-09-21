<template>
	<div class="login">
		<a href="/#test">测试post</a>
		<textarea v-model="cookies"></textarea>
		<input type="text" v-model="itemId" name="" placeholder="输入商品id">
		<input type="text" v-model="username" name="">
		<input type="password" v-model="password" name="">
		<!-- <a href="javascript:;" @click="getLoginToken()">登录账号</a>
		<a href="javascript:;" @click="queryOrders()">获取订单</a> -->
		<a href="javascript:;" @click="getGoodsInfo(itemId)">获取商品数据</a>
		<a href="javascript:;" @click="subOrder">绑定商品</a>
		<a href="javascript:;" @click="createOrder">创建订单</a>
		<a href="javascript:;" @click="queryCoupon">获取优惠券</a>
		<a v-if="goodsCoupon.uuid != undefined" href="javascript:;" @click="receiveCoupon">领取优惠券</a>
		<a href="javascript:;" @click="testFun">计算MD5</a>
		<h1>{{test_md5}}</h1>
		<div class="goods">
			<h2>当前选择sku: {{this.sku}}</h2>
			<ul>
				<li v-for="item in goods.sku">
					<a href="javascript:;" @click="selectSku(item.sku)">{{item.i_propName}}-{{item.i_name}} {{item.k_propName}}-{{item.k_name}}</a>
				</li>
			</ul>
		</div>
	</div>
	
</template>

<script type="text/javascript">
	var superagent = require("superagent");
	var async = require("async");
	var path = require("path");
	var db = require("../../store/database");
	import md5 from 'js-md5'
	export default{
		data(){
			return {
				username:"hdd工作室",
				password:"HEdada0313",
				enPWD:"",
  				cookies:"",
  				LoginToken:{},
  				goods:{
  					"sku":null
  				},
  				itemId:"554918477081",
  				sku:"3614573019782",
  				realPay:{},
  				goodsCoupon:{},
  				test_md5:""
			}
		},
		methods:{
			testFun(){
				//this.hezone.handleSKU({"name":"sdsdsd","sku":13345614})
				
				this.test_md5 = md5(this.cookies);
			},
			selectSku(sku){
				this.sku = sku
			},
			queryOrders(){
				var sign = this.hezone.deSign(this.cookies,'{"spm":"a2141.7756461.2.6","page":1,"tabCode":"all","appVersion":"1.0","appName":"tborder"}');
				console.log(sign)
				var url = "http://api.m.taobao.com/h5/mtop.order.queryboughtlist/3.0/?appKey=12574478&t=" + sign.time + "&sign="+ sign.sign +"&api=mtop.order.queryBoughtList&v=3.0&ttid=%23%23h5&ecode=1&AntiFlood=true&AntiCreep=true&LoginRequest=true&type=jsonp&dataType=jsonp&callback=mtopjsonp1&data=%7B%22spm%22%3A%22a2141.7756461.2.6%22%2C%22page%22%3A1%2C%22tabCode%22%3A%22all%22%2C%22appVersion%22%3A%221.0%22%2C%22appName%22%3A%22tborder%22%7D"
				superagent.get(url)
					.set({
						"cookie":this.cookies,
						"referer":"https://h5.m.taobao.com/mlapp/mytaobao.html",
						"user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
					})		
					.end((error, result)=>{
						console.log(result)
					})		
			},
			getLoginToken(){
				//获取登录页面的各种token值
				var url = "https://login.m.taobao.com/login.htm";
				superagent.get(url)
					.set({
						"referer":"https://h5.m.taobao.com/mlapp/mytaobao.html",
						"user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
					})
					.end((error, result)=>{
						if(result){
							//记录访问的cookie
							this.cookies = this.hezone.hdndleCookie(this.cookies,result.headers['set-cookie'])
							//正则获取登录所需token
							this.getLoginTokenReg(result.text);
							return;
						}
						alert("获取登录token失败");
					})
			},
			getLoginTokenReg(RegText){
				//正则获取需要的token值
				this.LoginToken._tb_token_ = /name='_tb_token_'\stype='hidden'\svalue='([\w]+)'>/.exec(RegText)[1];
				this.LoginToken.otherLoginUrl = /name="otherLoginUrl" value="(.*?)"\/>/.exec(RegText)[1];
				this.LoginToken.ncoToken = /id="J_NcoToken"\sname="ncoToken"\svalue="([\w]+)"\/>/.exec(RegText)[1];
				this.LoginToken.J_Module = /id="J_Module"\svalue="([\w]+)"\/>/.exec(RegText)[1];
				this.LoginToken.J_Exponent = /id="J_Exponent"\svalue="([\d]+)"\/>/.exec(RegText)[1];
				if(this.password != "" && this.LoginToken.J_Module.length > 4 && this.LoginToken.J_Exponent.length > 4){
					this.login()
				}else{
					alert("登录失败啊token值获取失败");
				}
			},
			login(){
				var RAS = new RSAKey();
			    RAS.setPublic(this.LoginToken.J_Module ,this.LoginToken.J_Exponent);
			    this.enPWD = RAS.encrypt(this.password);
				this.startLogin(this.enPWD);
			},
			startLogin(pwd){
				var url = "https://login.m.taobao.com/login.htm?_input_charset=utf-8";
				superagent.post(url)

					.set("Content-Type","application/x-www-form-urlencoded")
					.set("Referer","https://login.m.taobao.com/login.htm?_input_charset=utf-8")
					.set("User-Agent","Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36")
					.send(`_tb_token_=${this.LoginToken._tb_token_}&action=LoginAction&event_submit_do_login=1&TPL_redirect_url=&nv=false&otherLoginUrl=${this.LoginToken.otherLoginUrl}&TPL_timestamp=&TPL_password2=${pwd}&ncoSig=&ncoSessionid=&ncoToken=${this.LoginToken.ncoToken}&TPL_username=${encodeURI(this.username)}&loginFrom=wap_alimama`)
					.end((error, result)=>{
						if(!error){
							console.log(result)
							//this.cookies = this.hezone.hdndleCookie(this.cookies,result.headers['set-cookie'])
							//result.redirects.length >= 1 ? this.redirects(result.redirects) : console.log("无需跳转"+result.redirects)
						}else{
							console.log(error,result)
							alert("获取失败")
						}
						
					})
			},
			redirects(redUrl){
				//安全监测跳转
				var self = this;
				async.waterfall([
					function(){
						superagent.get(redUrl[0])
							.set({
								"user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
								"referer":"https://login.m.taobao.com/login.htm?_input_charset=utf-8",
								"cookie":self.cookies
							})
							.end((error, result) => {
								console.log(result.text)
							})
							
					}
				])
			},
			test(){
				console.log(db)
				var url ="http://h5.m.taobao.com/mlapp/olist.html?spm=a2141.7756461.2.6";
				superagent.get(url)
					.set({
						"user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
						"referer":"https://login.m.taobao.com/login.htm?_input_charset=utf-8",
						"cookie":this.cookies
					})
					.end((error, result)=>{
						console.log(error,result)
					})
			},
			subOrder(){
				//https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=™&itemId=543106620083&exParams=%7B%7D&quantity=1&divisionCode=420111&userId=2848433382&buyNow=true 无sku
				var url = `https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%3F&itemId=${this.itemId}&exParams=%7B%7D&skuId=${this.sku}&quantity=1&userId=${this.goods.userId}&buyNow=true&_input_charset=utf-8&x-itemid=${this.itemId}`
				//url = `https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%E2%84%A2&buyNow=true&_input_charset=utf-8&itemId=${this.itemId}&quantity=1&divisionCode=420100&x-itemid=${this.itemId}`
				superagent.get(url)
					.set({
						"user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
						"cookie":this.cookies
					})
					.end((error, result)=>{
						console.log(this.goods)
						if(!/短信验证码登录/.test(result.text)){
							this.goods['x-uid'] = /"x-uid":"([\d]+)"\}/.exec(result.text)[1];
							this.Buildorder();
						}else{
							console.log(result.text)
						}
					})

			},
			getGoodsInfo(itemId){
				var url = `https://hws.m.taobao.com/cache/wdetail/5.0/?id=${itemId}`;
				superagent.get(url)
					.end((error, result)=>{
						var goods = JSON.parse(result.text)
						this.goods.title = goods.data.itemInfoModel.title
						this.goods.picsPath = goods.data.itemInfoModel.picsPath
						this.goods.userId = goods.data.layoutData.replaceDataMap.SELLER_ID
						this.goods.nick = goods.data.seller.nick
						if(goods.data.skuModel.skuProps){
							this.goods.skuModel = goods.data.skuModel
							this.goods.sku = this.hezone.handleSKU(this.goods.skuModel);
							console.log(this.goods.sku)
						}else{
							this.goods.sku = 0
							console.log(goods.data)
						}
					})
			},
			getGoodsSku(skuModel){
				console.log(this.goods)
			},
			Buildorder(){
				this.hezone.getSign(this.cookies,this.itemId,this.sku,(error, res)=>{
					var url = `https://h5acs.m.tmall.com/h5/mtop.trade.buildorder.h5/3.0/?appKey=12574478&t=${res.time}&sign=${res.sign}&api=mtop.trade.buildOrder.h5&v=3.0&type=originaljson&timeout=20000&isSec=1&dataType=json&ecode=1&ttid=%23b%23ip%23%23_h5&AntiFlood=true&LoginRequest=true&H5Request=true&x-itemid=${this.itemId}&x-uid=${this.goods['x-uid']}`
					superagent.post(url)
						.set("content-type","application/x-www-form-urlencoded")
						.set("user-agent","Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1")
						.set("referer",`https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%E2%84%A2&itemId=${this.itemId}&exParams=%7B%7D&skuId=${this.sku}&quantity=1&divisionCode=420111&userId=${this.goods.userId}&buyNow=true&_input_charset=utf-8&x-itemid=${this.itemId}`)
						.set("cookie",this.cookies)
						.send(`data=%7B%22itemId%22%3A${this.itemId}%2C%22quantity%22%3A1%2C%22buyNow%22%3Atrue%2C%22skuId%22%3A${this.sku}%2C%22serviceId%22%3Anull%2C%22exParams%22%3A%22%7B%5C%22buyFrom%5C%22%3A%5C%22tmall_h5_detail%5C%22%7D%22%7D`)
						.end((error, result)=>{
							console.log(result)
							if(result.headers['set-cookie']){
								this.cookies = this.cookies.replace(/_m_h5_tk=[\w_?]+;/,"")
								this.cookies = this.cookies.replace(/_m_h5_tk_enc=[\w]+;/,"")
								this.cookies += "; "+result.headers['set-cookie'][0].split(";")[0] + ";"
								this.cookies += result.headers['set-cookie'][1].split(";")[0] + ";"
								console.log(result.text)
								this.Buildorder();
							}else{
								this.realPay = JSON.parse(result.text)
								console.log(JSON.parse(result.text))
							}
						})
				})
			},
			createOrder(){
				var data = this.hezone.createOrder(this.realPay);
				var sign = this.hezone.deSign(this.cookies, data)
				var url = `https://h5acs.m.tmall.com/h5/mtop.trade.createorder.h5/3.0/?appKey=12574478&t=${sign.time}&sign=${sign.sign}&api=mtop.trade.createOrder.h5&v=3.0&type=originaljson&timeout=20000&dataType=json&isSec=1&ecode=1&ttid=%23b%23ip%23%23_h5&AntiFlood=true&LoginRequest=true&H5Request=true&x-itemid=${this.itemId}&x-uid=${this.goods['x-uid']}`
				console.log(url)
				superagent.post(url)
					.type("from")
					.set("Content-type","application/x-www-form-urlencoded")
					.set("cookie",this.cookies)
					.set("User-Agent","Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1")
					.set("referer",`https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%3F&itemId=${this.itemId}&exParams=%7B%7D&skuId=${this.sku}&quantity=1&userId=${this.goods.userId}&buyNow=true&_input_charset=utf-8&x-itemid=${this.itemId}`)
					.send(`data=${data}&ua=098#E1hvtpvWvKgvjQCkvvvvvjiPP259gjECPsFwQj1VPmP91jE2Rs5v6jrPRFSwQjT5vpvhvvmv99GCvvLLQc4HKphv8vvvvvCvpvvvvvmvL6CvmUWvvUCPphvU9Qvv9hYvpvk2vvmvL6CvmUREvpvHnvmv9jeivpvUvvmvbY6k0363vpUokPo4bRmZMOzTQW5ETiMQzKL829Ni3JcbTIZjAJJxqOFqlP6EtI29yKod2Pqr5YTM/awm2Kc4qUbulqMWSNkq5dKR6+Tr5qsYKt622K0vQ8o69wMR+Om13fTEAr8t5/AZ0f9W//77rEVqFrjwdX/GFdS4C9Pd3RoqMIIR/JK8/g/+5+MWKi/qFddqSGAYFqK8dEqPsbuNKgTq/bMWSO/q0K7WMp5DKST8M4U8/MuftWVqF+sWdX/GFGFrsW/Tkb5eKJf8/fF5KJ4ttrPLdX/Gkbev6q/TFq0n+UeMsb0PKtTqFrjJdrzkDGmylG0GFdkRKUSp6fKnSU7Sz9Mqtib9DP2nAG2+3N/7/iWEmWKyqOk69Ws8KOkg5S0EvMTlQRJ2qUI2mR0EdYdT5QsFqnVq9q0Hs+0qkbV2dG6PhG4iM+PYFQMMdSj9FSeW2S5d9/k4/iGRlM0EqG81D1bjgXc+9JmhlG/YkfmC+OcB6fkvKEq1zvG2qnVq9q0Hs+0qkbV2gXZRmSSCiI5rkvqqgO05AuNLCMSyk8NhtISEvMAXtWd3DpNXgO769fAU6GKQ3bTEKOjbQPAfldz+DawhgERS0fohQvqGDJzpMEb/M/TjtgbrAQ68taFI0dkW6wkMkbevKUsPARuHMO5ekMsq/rLd5S272pcYrRzpKIqWAqTPKIA/Fa2P+XNrkRu22pP5kfL7MUZEvpCWvHBBvvw6afFEDLKAWyVxI8oQ+ul68NoxfwoKHAiHife9kCVZfvDrsjc6hfINPfmBYE7reB6ksWFy6C0XwyLp+neYr2E9ZRAn3w0AhvhCvvOvCvvvphvtvpvhvvvvvU6CvChvC2+C9UvvvvvvvvCvpv2B4FyCvvpvvvvv3QhvCvvUvvv=`)
					.end((error, result)=>{
						console.log(result.text)
					})
			},
			queryCoupon(){
				var sign = this.hezone.deSign(this.cookies, `{"itemId":"${this.itemId}"}`);
				var url = `https://acs.m.taobao.com/h5/mtop.taobao.baichuan.smb.detail.get/1.0/?appKey=12574478&t=${sign.time}&sign=${sign.sign}&api=mtop.taobao.baichuan.smb.detail.get&v=1.0&type=originaljson&dataType=json&timeout=20000&&data=%7B%22itemId%22%3A%22${this.itemId}%22%7D`
				superagent.get(url)
					.set("cookie",this.cookies)
					.set("user-agent","Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1")
					.end((error, result)=>{
						if(result.headers['set-cookie']){
							this.cookies = this.hezone.hdndleCookie(this.cookies,result.headers['set-cookie']);
							console.log(result.headers)
						}
						console.log(JSON.parse(result.text).data)
						this.goodsCoupon = JSON.parse(result.text).data
							
					})
			},
			receiveCoupon(){
				var sign = this.hezone.deSign(this.cookies, `{"uuid":"${this.goodsCoupon.uuid}","shortName":"","supplierId":"${this.goodsCoupon.userId}"}`);
				var url = `https://acs.m.taobao.com/h5/mtop.taobao.buyerresourcemtopwriteservice.applycoupon/3.0/?jsv=2.3.22&appKey=12574478&t=${sign.time}&sign=${sign.sign}&api=mtop.taobao.buyerResourceMtopWriteService.applyCoupon&v=3.0&AntiFlood=true&ecode=1&H5Request=true&type=jsonp&dataType=jsonp&callback=mtopjsonp4&data=%7B%22uuid%22%3A%22${this.goodsCoupon.uuid}%22%2C%22shortName%22%3A%22%22%2C%22supplierId%22%3A%22${this.goodsCoupon.userId}%22%7D`
				console.log(url)
				superagent.get(url)
					.set("Referer",`https://market.m.taobao.com/apps/aliyx/coupon/detail.html?wh_weex=true&activity_id=${this.goodsCoupon.uuid}&seller_id=${this.goodsCoupon.userId}`)
					.set("user-agent","Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1")
					.set("cookie",this.cookies)
					.end((error, result)=>{
						console.log(error,result)
						// if(result.headers['set-cookie']){
						// 	console.log(result.headers)
						// 	this.cookies = this.hezone.hdndleCookie(this.cookies,result.headers['set-cookie']);
						// }else{
						// 	console.log(result.text)
						// }
					})
			}
		}
	}
</script>

<style type="text/css">

	.login{
		width: 500px;
		margin: 0 auto;
	}

	.login textarea{
		width: 300px;
		height: 200px;
	}

	.login input{
		outline: none;
		display: block;
		border: none;
		width: 150px;
		height: 25px;
		background: #f7f7f7;
		text-align: center;
		margin-top: 5px;
	}
	.login a{
		display: block;
		width: 70px;
		height: 25px;
		background: #ff7f32;
		text-align: center;
		color: #ffffff;
		line-height: 25px;
		text-decoration: none;
		margin-top:5px;
		float: left;

	}
	.login a:nth-child(1){
		margin-left: 5px;
	}
	.login .goods h2{
		display: block;
		color: #777777;
		float: left;
	}
	.login .goods ul li{
		list-style: none;
		float: left;
	}
	.login .goods ul li a{
		width: 100%;
	}
</style>

