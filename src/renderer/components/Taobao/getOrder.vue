<template>
	<div class="login">
		<textarea v-model="cookies"></textarea>
		<input type="text" v-model="itemId" name="" placeholder="输入商品id">
		<input type="text" v-model="username" name="">
		<input type="password" v-model="password" name="">
		<a href="javascript:;" @click="getLoginToken()">登录账号</a>
		<a href="javascript:;" @click="queryOrders()">获取订单</a>
		<a href="javascript:;" @click="getGoodsInfo(itemId)">获取商品数据</a>
		<a href="javascript:;" @click="subOrder">绑定商品</a>
		<a href="javascript:;" @click="getGoodsSku">获取商品SKU</a>
		<a href="javascript:;" @click="testFun">测试啊</a>
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
  				realPay:{}
			}
		},
		methods:{
			testFun(){
				this.hezone.handleSKU({"name":"sdsdsd","sku":13345614})
			},
			selectSku(sku){
				this.sku = sku
			},
			queryOrders(){
				var sign = this.hezone.deSign(this.cookies);
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
				url = `https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%E2%84%A2&buyNow=true&_input_charset=utf-8&itemId=${this.itemId}&quantity=1&divisionCode=420100&x-itemid=${this.itemId}`
				superagent.get(url)
					.set({
						"user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
						"cookie":this.cookies
					})
					.end((error, result)=>{

						this.goods['x-uid'] = /"x-uid":"([\d]+)"\}/.exec(result.text)[1];
						this.Buildorder();
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
			fukuan(){
				var url = `https://h5acs.m.tmall.com/h5/mtop.trade.createorder.h5/3.0/?appKey=12574478&t=1505726256443&sign=f8bb65f2946b5d701e797d8627629181&api=mtop.trade.createOrder.h5&v=3.0&type=originaljson&timeout=20000&dataType=json&isSec=1&ecode=1&ttid=%23b%23ip%23%23_h5&AntiFlood=true&LoginRequest=true&H5Request=true&submitref=0a67f6&x-itemid=539758639266&x-uid=2848433382`
				var confirmOrder = this.realPay.data.hierarchy.root;
				var orderID = this.realPay.data.hierarchy.structure[confirmOrder][1].split("_")[1];
				var itemID = this.realPay.data.data[confirmOrder].fields.joinId;
				var selectedId = this.realPay.data.data["promotion_"+itemID].fields.options[0].optionId
				var selected_name = this.realPay.data.data["promotion_"+itemID].fields.options[0].name
				var title = this.realPay.data.data["promotion_"+itemID].fields.title
				var deliveryMethod = this.realPay.data.data["deliveryMethod_" + orderID]
				var ncCheckCode_ncCheckCode1 = this.realPay.data.data.ncCheckCode_ncCheckCode1
				var submitOrder_1 = this.realPay.data.data.submitOrder_1
				var realPay = this.realPay.data.data.realPay_1
				var address = this.realPay.data.data.address_1
				var anonymous = this.realPay.data.data.anonymous_1
				var agencyPay = this.realPay.data.data.agencyPay_1
				var service_bwy = this.realPay.data.data["service_bwy_" + itemID]
				var service_yfx = this.realPay.data.data["service_yfx_" + orderID]
				//0ca8806ed63ceb64e8e53883c8a697f1
				var order_ = "order_" + orderID;
				var orderInfo_ = this.realPay.data.hierarchy.structure[order_][0];
				var deliveryMethod_ =  "deliveryMethod_" + orderID;
				var service_yfx_ =  "service_yfx_" + orderID;
				var memo_ =  "memo_" + orderID;
				var memo_ =  "memo_" + orderID;

				//fcbc3d5fd49c3fdd0f5c0cf02741cab3
				var item_ = "item_" + itemID;
				var itemInfo_ = "itemInfo_" + itemID;
				var quantity_ = "quantity_" + itemID;
				var promotion_ = "promotion_" + itemID;
				var itemPay_ = "itemPay_" + itemID;
				var service_gybb_ = "service_gybb_" + itemID;
				var service_bwy_ = "service_bwy_" + itemID;

				//收货地址
				var addressDetail = address.fields.options[0].addressDetail // 珞喻路618号 东方怡景大厦B座1301
				var areaName = address.fields.options[0].areaName // 洪山区
				var cityName = address.fields.options[0].cityName //武汉市
				var deliveryAddressId = address.fields.options[0].deliveryAddressId
				var divisionCode = address.fields.options[0].divisionCode
				var fullName = address.fields.options[0].fullName
				var mobile = address.fields.options[0].mobile
				var postCode = address.fields.options[0].postCode
				var provinceName = address.fields.options[0].provinceName
				var townDivisionId = address.fields.options[0].townDivisionId
				var townName = address.fields.options[0].townName
				var tbGold_1 = this.realPay.data.data.tbGold_1

				var linkage = this.realPay.data.data.linkage.common
				var signature = this.realPay.data.data.linkage.signature

				//${this.realPay.data.hierarchy.structure[this.realPay.data.hierarchy.root][1]}
				var data = `{"params":"{\"hierarchy\":\"{\\\"structure\\\":{\\\"${confirmOrder}\\\":[\\\"address_1\\\",\\\"${order_}\\\",\\\"tbGold_1\\\",\\\"agencyPay_1\\\",\\\"anonymous_1\\\",\\\"realPay_1\\\",\\\"submitOrder_1\\\",\\\"ncCheckCode_ncCheckCode1\\\"],\\\"${order_}\\\":[\\\"${orderInfo_}\\\",\\\"${item_}\\\",\\\"${deliveryMethod_}\\\",\\\"${service_yfx_}@1\\\",\\\"${service_yfx_}@2\\\",\\\"${memo_}\\\",\\\"${order_}\\\"],\\\"${item_}\\\":[\\\"${itemInfo_}\\\",\\\"${quantity_}\\\",\\\"${promotion_}\\\",\\\"${itemPay_}\\\",\\\"${service_gybb_}@1\\\",\\\"${service_bwy_}@1\\\"]}}\",\"data\":\"{\\\"${promotion_}\\\":{\\\"submit\\\":${tbGold_1.hidden.empty},\\\"hidden\\\":{\\\"empty\\\":${tbGold_1.hidden.empty},\\\"extensionMap\\\":{\\\"promotionType\\\":\\\"item\\\",\\\"outId\\\":\\\"${itemID}\\\",\\\"orderOutId\\\":\\\"${itemID}\\\"},\\\"notEmpty\\\":${tbGold_1.hidden.notEmpty}},\\\"id\\\":\\\"${itemID}\\\",\\\"tag\\\":\\\"promotion\\\",\\\"type\\\":\\\"select\\\",\\\"fields\\\":{\\\"selectedId\\\":\\\"${selectedId}\\\",\\\"options\\\":[{\\\"name\\\":\\\"${selected_name}\\\",\\\"optionId\\\":\\\"${selectedId}\\\"}],\\\"disabled\\\":false,\\\"title\\\":\\\"${title}\\\"},\\\"btn\\\":\\\"select\\\",\\\"status\\\":\\\"hidden\\\",\\\"_request\\\":true},\\\"tbGold_1\\\":{\\\"submit\\\":${tbGold_1.hidden.empty},\\\"hidden\\\":{\\\"empty\\\":${tbGold_1.hidden.empty},\\\"extensionMap\\\":{\\\"sellerAvailablePoint\\\":\\\"${tbGold_1.hidden.extensionMap.sellerAvailablePoint}\\\",\\\"totalPoint\\\":\\\"${tbGold_1.hidden.extensionMap.totalPoint}\\\",\\\"usePoint\\\":\\\"${tbGold_1.hidden.extensionMap.usePoint}\\\",\\\"rate\\\":\\\"${tbGold_1.hidden.extensionMap.rate}\\\",\\\"availablePoint\\\":\\\"${tbGold_1.hidden.extensionMap.availablePoint}\\\"},\\\"notEmpty\\\":${tbGold_1.hidden.notEmpty}},\\\"id\\\":\\\"${tbGold_1.id}\\\",\\\"tag\\\":\\\"${tbGold_1.tag}\\\",\\\"type\\\":\\\"${tbGold_1.type}\\\",\\\"fields\\\":{\\\"name\\\":\\\"${tbGold_1.fields.name}\\\",\\\"checked\\\":${tbGold_1.fields.checked},\\\"value\\\":\\\"${tbGold_1.fields.value}\\\"},\\\"btn\\\":\\\"toggle\\\",\\\"_request\\\":true},\\\"${service_gybb_}@1\\\":{\\\"ref\\\":\\\"${this.realPay.data.data[service_bwy_+"@1"].ref}\\\",\\\"submit\\\":${tbGold_1.hidden.empty},\\\"hidden\\\":{\\\"empty\\\":${tbGold_1.hidden.empty},\\\"extensionMap\\\":{\\\"serviceType\\\":\\\"${this.realPay.data.data[service_bwy_+"@1"].hidden.extensionMap.serviceType}\\\",\\\"outId\\\":\\\"${itemID}\\\",\\\"id\\\":\\\"${service_bwy_}\\\"},\\\"notEmpty\\\":${tbGold_1.hidden.notEmpty}},\\\"bizName\\\":\\\"ServiceMultiSelect\\\",\\\"id\\\":\\\"${this.realPay.data.data[service_bwy_+"@1"].id}\\\",\\\"tag\\\":\\\"${this.realPay.data.data[service_bwy_+"@1"].tag}\\\",\\\"type\\\":\\\"${this.realPay.data.data[service_bwy_+"@1"].type}\\\",\\\"fields\\\":{\\\"selectedIds\\\":[\\\"${this.realPay.data.data[service_bwy_+"@1"].fields.groups[0].options[0].optionId}\\\"],\\\"groups\\\":[{\\\"options\\\":[{\\\"name\\\":\\\"${this.realPay.data.data[service_bwy_+"@1"].fields.groups[0].options[0].name}\\\",\\\"optionId\\\":\\\"${this.realPay.data.data[service_bwy_+"@1"].fields.groups[0].options[0].optionId}\\\",\\\"value\\\":\\\"${this.realPay.data.data[service_bwy_+"@1"].fields.groups[0].options[0].value}\\\"}],\\\"required\\\":${this.realPay.data.data[service_bwy_+"@1"].fields.groups[0].required}}],\\\"title\\\":\\\"${this.realPay.data.data[service_bwy_+"@1"].fields.title}\\\"},\\\"btn\\\":\\\"multiSelect\\\",\\\"_request\\\":true},\\\"${deliveryMethod_}\\\":{\\\"ref\\\":\\\"${deliveryMethod.ref}\\\",\\\"submit\\\":${deliveryMethod.submit},\\\"hidden\\\":{\\\"empty\\\":${deliveryMethod.hidden.empty},\\\"extensionMap\\\":{\\\"deliveryId\\\":\\\"${orderID}\\\"},\\\"notEmpty\\\":${deliveryMethod.hidden.notEmpty}},\\\"id\\\":\\\"${orderID}\\\",\\\"tag\\\":\\\"${deliveryMethod.tag}\\\",\\\"type\\\":\\\"${deliveryMethod.type}\\\",\\\"fields\\\":{\\\"secondOption\\\":${deliveryMethod.fields.secondOption},\\\"selectedId\\\":\\\"${deliveryMethod.fields.selectedId}\\\",\\\"options\\\":[{\\\"extra\\\":\\\"\\\",\\\"fare\\\":\\\"${deliveryMethod.fields.options[0].fare}\\\",\\\"fareCent\\\":${deliveryMethod.fields.options[0].fareCent},\\\"hasOption\\\":${deliveryMethod.fields.options[0].hasOption},\\\"id\\\":\\\"${deliveryMethod.fields.options[0].id}\\\",\\\"message\\\":\\\"${deliveryMethod.fields.options[0].message}\\\",\\\"serviceType\\\":\\\"${deliveryMethod.fields.options[0].serviceType}\\\",\\\"signText\\\":\\\"\\\"}],\\\"title\\\":\\\"${deliveryMethod.fields.title}\\\"},\\\"_request\\\":true},\\\"ncCheckCode_ncCheckCode1\\\":{\\\"ref\\\":\\\"${ncCheckCode_ncCheckCode1.ref}\\\",\\\"submit\\\":${ncCheckCode_ncCheckCode1.submit},\\\"id\\\":\\\"${ncCheckCode_ncCheckCode1.id}\\\",\\\"tag\\\":\\\"${ncCheckCode_ncCheckCode1.tag}\\\",\\\"type\\\":\\\"${ncCheckCode_ncCheckCode1.type}\\\",\\\"fields\\\":{\\\"nc\\\":\\\"${ncCheckCode_ncCheckCode1.fields.nc}\\\",\\\"token\\\":\\\"${ncCheckCode_ncCheckCode1.fields.token}\\\"}},\\\"submitOrder_1\\\":{\\\"submit\\\":${submitOrder_1.submit},\\\"id\\\":\\\"${submitOrder_1.id}\\\",\\\"tag\\\":\\\"${submitOrder_1.tag}\\\",\\\"type\\\":\\\"${submitOrder_1.type}\\\",\\\"fields\\\":{\\\"submitTitle\\\":\\\"${submitOrder_1.fields.submitTitle}\\\",\\\"isTmallHKPresellSelf\\\":${submitOrder_1.fields.isTmallHKPresellSelf},\\\"isTmallHKPresellOrder\\\":${submitOrder_1.fields.isTmallHKPresellOrder}},\\\"status\\\":\\\"${submitOrder_1.status}\\\",\\\"_realPay\\\":{\\\"id\\\":\\\"${realPay.id}\\\",\\\"tag\\\":\\\"${realPay.tag}\\\",\\\"type\\\":\\\"${realPay.type}\\\",\\\"fields\\\":{\\\"quantity\\\":${realPay.fields.quantity},\\\"price\\\":\\\"${realPay.fields.price}\\\",\\\"mallTotalPrice\\\":${realPay.fields.mallTotalPrice},\\\"originPrice\\\":\\\"${realPay.fields.originPrice}\\\",\\\"microPurchaseTotalPrice\\\":${realPay.fields.microPurchaseTotalPrice},\\\"tmallHkTotalPrice\\\":${realPay.fields.tmallHkTotalPrice},\\\"currencySymbol\\\":\\\"￥\\\"}},\\\"_address\\\":{\\\"ref\\\":\\\"${address.ref}\\\",\\\"id\\\":\\\"${address.id}\\\",\\\"tag\\\":\\\"${address.tag}\\\",\\\"type\\\":\\\"${address.type}\\\",\\\"fields\\\":{\\\"tempAddress\\\":${address.fields.tempAddress},\\\"useMDZT\\\":${address.fields.useMDZT},\\\"h5SupportIframe\\\":${address.fields.h5SupportIframe},\\\"useStation\\\":${address.fields.useStation},\\\"selectedId\\\":${address.fields.selectedId},\\\"mdSellerId\\\":\\\"${address.fields.mdSellerId}\\\",\\\"agencyReceive\\\":${address.fields.agencyReceive},\\\"agencyReceiveH5Url\\\":\\\"${address.fields.agencyReceiveH5Url}\\\",\\\"options\\\":[{\\\"addressDetail\\\":\\\"${addressDetail}\\\",\\\"agencyReceiveDesc\\\":\\\"${address.fields.options[0].agencyReceiveDesc}\\\",\\\"areaName\\\":\\\"${areaName}\\\",\\\"cityName\\\":\\\"${cityName}\\\",\\\"countryName\\\":\\\"\\\",\\\"defaultAddress\\\":true,\\\"deliveryAddressId\\\":${deliveryAddressId},\\\"divisionCode\\\":\\\"${divisionCode}\\\",\\\"enableMDZT\\\":false,\\\"enableStation\\\":false,\\\"enforceUpdate4Address\\\":true,\\\"fullName\\\":\\\"${fullName}\\\",\\\"lgShopId\\\":0,\\\"mobile\\\":\\\"${mobile}\\\",\\\"needUpdate4Address\\\":false,\\\"postCode\\\":\\\"${postCode}\\\",\\\"provinceName\\\":\\\"${provinceName}\\\",\\\"stationId\\\":0,\\\"storeAddress\\\":true,\\\"townDivisionId\\\":${townDivisionId},\\\"townName\\\":\\\"${townName}\\\",\\\"updateAddressTip\\\":\\\"\\\"}],\\\"linkAddressId\\\":${address.fields.linkAddressId},\\\"supportFwd\\\":${address.fields.supportFwd},\\\"info\\\":{\\\"value\\\":\\\"${deliveryAddressId}\\\"},\\\"url\\\":\\\"//buy.m.tmall.com/order/addressList.htm?enableStation=true&requestStationUrl=%2F%2Fstationpicker-i56.m.taobao.com%2Finland%2FshowStationInPhone.htm&_input_charset=utf8&hidetoolbar=true&bridgeMessage=true\\\",\\\"title\\\":\\\"管理收货地址\\\"},\\\"_request\\\":true}},\\\"${memo_}\\\":{\\\"ref\\\":\\\"1f528f8\\\",\\\"submit\\\":${tbGold_1.hidden.empty},\\\"bizName\\\":\\\"memo\\\",\\\"id\\\":\\\"${orderID}\\\",\\\"tag\\\":\\\"memo\\\",\\\"type\\\":\\\"input\\\",\\\"fields\\\":{\\\"name\\\":\\\"给卖家留言：\\\",\\\"placeholder\\\":\\\"选填:对本次交易的说明(建议填写已和卖家协商一致的内容)\\\",\\\"title\\\":\\\"买家留言：\\\",\\\"value\\\":\\\"\\\"},\\\"btn\\\":\\\"input\\\"},\\\"anonymous_1\\\":{\\\"submit\\\":${anonymous.submit},\\\"id\\\":\\\"${anonymous.id}\\\",\\\"tag\\\":\\\"${anonymous.tag}\\\",\\\"type\\\":\\\"${anonymous.type}\\\",\\\"fields\\\":{\\\"name\\\":\\\"匿名购买\\\",\\\"checked\\\":true},\\\"btn\\\":\\\"toggle\\\"},\\\"agencyPay_1\\\":{\\\"submit\\\":${agencyPay.submit},\\\"id\\\":\\\"${agencyPay.id}\\\",\\\"tag\\\":\\\"${agencyPay.tag}\\\",\\\"type\\\":\\\"${agencyPay.type}\\\",\\\"fields\\\":{\\\"name\\\":\\\"${agencyPay.fields.name}\\\",\\\"checked\\\":${agencyPay.fields.checked}},\\\"btn\\\":\\\"toggle\\\",\\\"_request\\\":true},\\\"${service_bwy_}@1\\\":{\\\"ref\\\":\\\"${service_bwy.ref}\\\",\\\"submit\\\":${service_bwy.submit},\\\"hidden\\\":{\\\"empty\\\":${service_bwy.hidden.empty},\\\"extensionMap\\\":{\\\"serviceType\\\":\\\"${service_bwy.hidden.extensionMap.serviceType}\\\",\\\"outId\\\":\\\"${service_bwy.hidden.extensionMap.outId}\\\",\\\"id\\\":\\\"${service_bwy.hidden.extensionMap.id}\\\"},\\\"notEmpty\\\":${service_bwy.hidden.notEmpty}},\\\"bizName\\\":\\\"ServiceMultiSelect\\\",\\\"id\\\":\\\"${service_bwy.id}\\\",\\\"tag\\\":\\\"${service_bwy.tag}\\\",\\\"type\\\":\\\"${service_bwy.type}\\\",\\\"fields\\\":{\\\"selectedIds\\\":[\\\"${service_bwy.fields.groups[0].optionId}\\\"],\\\"groups\\\":[{\\\"options\\\":[{\\\"name\\\":\\\"${service_bwy.fields.groups[0].name}\\\",\\\"optionId\\\":\\\"${service_bwy.fields.groups[0].optionId}\\\",\\\"value\\\":\\\"${service_bwy.fields.groups[0].value}\\\"}],\\\"required\\\":true}],\\\"title\\\":\\\"保无忧\\\"},\\\"btn\\\":\\\"multiSelect\\\",\\\"_request\\\":true},\\\"${service_yfx_}@1\\\":{\\\"ref\\\":\\\"${service_yfx.ref}\\\",\\\"submit\\\":${service_yfx.submit},\\\"hidden\\\":{\\\"empty\\\":${service_yfx.hidden.empty},\\\"extensionMap\\\":{\\\"serviceType\\\":\\\"${service_yfx.hidden.extensionMap.serviceType}\\\",\\\"outId\\\":\\\"${orderID}\\\",\\\"id\\\":\\\"${service_yfx.hidden.extensionMap.id}\\\"},\\\"notEmpty\\\":${service_yfx.hidden.notEmpty}},\\\"bizName\\\":\\\"ServiceMultiSelect\\\",\\\"id\\\":\\\"${service_yfx.id}\\\",\\\"tag\\\":\\\"${service_yfx.tag}\\\",\\\"type\\\":\\\"${service_yfx.type}\\\",\\\"fields\\\":{\\\"selectedIds\\\":[],\\\"groups\\\":[{\\\"options\\\":[{\\\"name\\\":\\\"${service_yfx.fields.groups[0].options[0].name}\\\",\\\"optionId\\\":\\\"${service_yfx.fields.groups[0].options[0].optionId}\\\",\\\"value\\\":\\\"${service_yfx.fields.groups[0].options[0].value}\\\"}],\\\"required\\\":false}],\\\"title\\\":\\\"运费险\\\"},\\\"btn\\\":\\\"multiSelect\\\",\\\"_request\\\":true}}\",\"linkage\":\"{\\\"common\\\":{\\\"compress\\\":${linkage.compress},\\\"submitParams\\\":\\\"${linkage.submitParams}\\\",\\\"validateParams\\\":\\\"${linkage.validateParams}\\\"},\\\"signature\\\":\\\"${signature}\\\"}\"}","ua":"098#E1hv8vvWvIUvUpCkvvvvvjiPP259QjnHRFSW6jrCPmPW0jrnPLdwsj3Un2qO6jnHPsyCvvBvpvvvFphvhZCCspFyvhCvphvvvvvvpCwaiQhvChCvCCptvpvhphvvvvGCvvLLQc4HKphv8hCvvvvvvhCvphvhJ9vvpuEvpvBTvvCmIyCvCjIvvh8kphvhJ9vvpu8ivpvUphvhJwQOyYkEvpvHLZ6hCEQ3vpVekfVEgQURMUsqQ44Ev+/eATfoTUNG//NETgLyAMzq/IT5APKNMQAesSABtaInCN06qnVTFYbRKgTQ3dV26Y8/ePeWTUORvMAHrOoS19qMt4s+6fAEsr8/3qTj+Uj864qWMOLjuCjcMUqYe8M8hKdie/eh/+JMsb08AK/qF+sW/gSDQbKRsWAr5q0RARzWsquUTaKTk9sUKXJtF4Jo6WkMkJuWSUqnGWPQS/k/eGsPKIkr5qARzf/TFquUgUoMsb0PKi/qF+zfdX/YFqKRsGTQ3dVj+U5bAd/4KI/qkfMWSOMbqdKRsWseD40NSUqWSquPKMu+5+MWKIKr5qARsb/TFqdtdEqPsbdfTIFG5QcMMneTFqKESGAYF+5+KgqWsb0OKI/qkfMWSOdWTSu8CYNi0PbCgWqBM447i+//zpURMUAA54fRsGFDAMAatILqm4fHtgue11h8iGL5DJs2MSMG5JVniGGRCqNh/E76lwsnKWueDTJ7s+kYkT4BSY6vsquEzi7TFNjBd+N+6fAEsr8/3qTj+Uj864qv/G4g5SSGTiMd9RAOlGGEvpCWp0Sxv8WfJHp0747BhC3qVmHoDOmfjLEcnhjEKBmAVA9aUExreut+mB+uaNoAdcpifvDrt8TJV6X+m7z9dit3CC+uafvA5kx/JmcG0vhCvvXvppvvvvmjvpvhphUvvv=="}`
			}
		}
	}
</script>

<style type="text/css">
	.login{
		width: 500px;
		margin: 0 auto;
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

