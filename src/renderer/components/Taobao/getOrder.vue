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
		<div class="goods">
			
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
  				goods:{},
  				itemId:"556598911988",
  				sku:"3614573019782",
  				realPay:{}
			}
		},
		methods:{
			getSign(){
				if(/_m_h5_tk=([\w]+)_[\d]+;/.test(this.cookies)){
					var token = /_m_h5_tk=([\w]+)_[\d]+;/.exec(this.cookies)[1];
					var time = new Date().getTime()
					var sign = md5(token + "&" + time + "&" + "12574478" + "&" + '{"spm":"a2141.7756461.2.6","page":1,"tabCode":"all","appVersion":"1.0","appName":"tborder"}');
					return {sign:sign, time:time}
				}
				return null;
			},
			testSign(cb){
				if(/_m_h5_tk=([\w]+)_[\d]+;/.test(this.cookies)){
					var token = /_m_h5_tk=([\w]+)_[\d]+;/.exec(this.cookies)[1];
					console.log(token)
					var time = new Date().getTime()
					// time = 1505720464361
					// this.itemId = 556598911988
					// this.sku = 3614573019782
					superagent.post("http://tool.chinaz.com/tools/md5.aspx")
						.send(`q=${token}%26${time}%2612574478%26%7B%22itemId%22%3A${this.itemId}%2C%22quantity%22%3A1%2C%22buyNow%22%3Atrue%2C%22skuId%22%3A${this.sku}%2C%22serviceId%22%3Anull%2C%22exParams%22%3A%22%7B%5C%22buyFrom%5C%22%3A%5C%22tmall_h5_detail%5C%22%7D%22%7D&ende=0&md5type=1`)
						.end((error, result)=>{
							var sign = /WrapHid"\sid="MD5Result">([\w]+)<\/tex/.exec(result.text)[1];
							cb(null,{sign:sign,time:time})
						})
				}
				
				//7c56a3c23f6907caef9627eb50f6d722&1505719448782&12574478&{"itemId":556598911988,"quantity":1,"buyNow":true,"skuId":3614573019782,"serviceId":null,"exParams":"{\"buyFrom\":\"tmall_h5_detail\"}"}
			},
			queryOrders(){

				var sign = this.getSign();
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
			hdndleCookie(cookie){
				//JSESSIONID=EF6Y14PUO2-MYBO0ZFIQ15FGCOH2BKT1-DC66TO7J-IOIN; Path=/; HttpOnly
				var tmp = ''
				for(var i=0;i<cookie.length;i++){
					//处理已经存在的旧cookie
					var isTmp = cookie[i].split("=")[0]
					if(tmp == ''){
						tmp += cookie[i].split(";")[0]
						this.cookies = this.cookies.replace(`/${isTmp}=(.*?);/`, cookie[i].split(";")[0])
					}else{
						tmp += `; ${cookie[i].split(";")[0]}`
						this.cookies = this.cookies.replace(`/${isTmp}=(.*?);/`, `; ${cookie[i].split(";")[0]}`)
					}
				}
				this.cookies += tmp;
				console.log(this.cookies);
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

							this.hdndleCookie(result.headers['set-cookie'])
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
							//this.hdndleCookie(result.headers['set-cookie'])
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
				var url = `https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%3F&itemId=${this.itemId}&exParams=%7B%7D&skuId=3446274317764&quantity=1&userId=${this.goods.userId}&buyNow=true&_input_charset=utf-8&x-itemid=${this.itemId}`
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
							for(var i in this.goods.skuModel.skuProps[0].values){
								console.log(this.goods.skuModel.skuProps[0].values[i])
							}
							console.log(this.goods.skuModel)
						}
					})
			},
			getGoodsSku(){

			},
			Buildorder(){
				this.testSign((error, res)=>{
					var url = `https://h5acs.m.tmall.com/h5/mtop.trade.buildorder.h5/3.0/?appKey=12574478&t=${res.time}&sign=${res.sign}&api=mtop.trade.buildOrder.h5&v=3.0&type=originaljson&timeout=20000&isSec=1&dataType=json&ecode=1&ttid=%23b%23ip%23%23_h5&AntiFlood=true&LoginRequest=true&H5Request=true&x-itemid=${this.itemId}&x-uid=${this.goods['x-uid']}`
					superagent.post(url)
						.set("content-type","application/x-www-form-urlencoded")
						.set("user-agent","Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1")
						.set("referer","https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%E2%84%A2&itemId=556598911988&exParams=%7B%7D&skuId=3614573019782&quantity=1&divisionCode=420111&userId=2848433382&buyNow=true&_input_charset=utf-8&x-itemid=556598911988")
						.set("cookie",this.cookies)
						.send(`data=%7B%22itemId%22%3A${this.itemId}%2C%22quantity%22%3A1%2C%22buyNow%22%3Atrue%2C%22skuId%22%3A3614573019782%2C%22serviceId%22%3Anull%2C%22exParams%22%3A%22%7B%5C%22buyFrom%5C%22%3A%5C%22tmall_h5_detail%5C%22%7D%22%7D`)
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
								console.log(this.realPay)
							}
						})
				})
			},
			fukuan(){
				var url = `https://h5acs.m.tmall.com/h5/mtop.trade.createorder.h5/3.0/?appKey=12574478&t=1505726256443&sign=f8bb65f2946b5d701e797d8627629181&api=mtop.trade.createOrder.h5&v=3.0&type=originaljson&timeout=20000&dataType=json&isSec=1&ecode=1&ttid=%23b%23ip%23%23_h5&AntiFlood=true&LoginRequest=true&H5Request=true&submitref=0a67f6&x-itemid=539758639266&x-uid=2848433382`
				//var data = `{"params":"{\"hierarchy\":\"{\\\"structure\\\":{\\\"item_3db4a98d538c5a1a94cfc128035ade15\\\":[\\\"itemInfo_3db4a98d538c5a1a94cfc128035ade15\\\",\\\"quantity_3db4a98d538c5a1a94cfc128035ade15\\\",\\\"promotion_3db4a98d538c5a1a94cfc128035ade15\\\",\\\"itemPay_3db4a98d538c5a1a94cfc128035ade15\\\"],\\\"order_99319677a9ff930e59bbdf1330c4e10d\\\":[\\\"orderInfo_99319677a9ff930e59bbdf1330c4e10d\\\",\\\"item_3db4a98d538c5a1a94cfc128035ade15\\\",\\\"deliveryMethod_99319677a9ff930e59bbdf1330c4e10d\\\",\\\"service_yfx_99319677a9ff930e59bbdf1330c4e10d@1\\\",\\\"service_yfx_99319677a9ff930e59bbdf1330c4e10d@2\\\",\\\"memo_99319677a9ff930e59bbdf1330c4e10d\\\",\\\"orderPay_99319677a9ff930e59bbdf1330c4e10d\\\"],\\\"confirmOrder_1\\\":[\\\"address_1\\\",\\\"order_99319677a9ff930e59bbdf1330c4e10d\\\",\\\"installmentToggle_1\\\",\\\"installmentPicker_1\\\",\\\"agencyPay_1\\\",\\\"anonymous_1\\\",\\\"realPay_1\\\",\\\"submitOrder_1\\\",\\\"ncCheckCode_ncCheckCode1\\\"]}}\",\"data\":\"{\\\"installmentToggle_1\\\":{\\\"submit\\\":true,\\\"id\\\":\\\"1\\\",\\\"tag\\\":\\\"installmentToggle\\\",\\\"type\\\":\\\"biz\\\",\\\"fields\\\":{\\\"checked\\\":\\\"false\\\",\\\"title\\\":\\\"花呗分期\\\",\\\"checkedLastStatus\\\":\\\"false\\\"},\\\"_request\\\":true},\\\"installmentPicker_1\\\":{\\\"ref\\\":\\\"${ref}\\\",\\\"submit\\\":true,\\\"id\\\":\\\"1\\\",\\\"tag\\\":\\\"installmentPicker\\\",\\\"type\\\":\\\"biz\\\",\\\"fields\\\":{\\\"poundageTitle\\\":\\\"手续费\\\",\\\"pageTitle\\\":\\\"花呗分期详情\\\",\\\"systemTimes\\\":\\\"${systemTimes}\\\",\\\"desc\\\":\\\"修改分期\\\"},\\\"status\\\":\\\"hidden\\\",\\\"_request\\\":true},\\\"deliveryMethod_99319677a9ff930e59bbdf1330c4e10d\\\":{\\\"ref\\\":\\\"4188366\\\",\\\"submit\\\":true,\\\"hidden\\\":{\\\"empty\\\":false,\\\"extensionMap\\\":{\\\"deliveryId\\\":\\\"99319677a9ff930e59bbdf1330c4e10d\\\"},\\\"notEmpty\\\":true},\\\"id\\\":\\\"99319677a9ff930e59bbdf1330c4e10d\\\",\\\"tag\\\":\\\"deliveryMethod\\\",\\\"type\\\":\\\"biz\\\",\\\"fields\\\":{\\\"secondOption\\\":false,\\\"selectedId\\\":\\\"2\\\",\\\"options\\\":[{\\\"extra\\\":\\\"\\\",\\\"fare\\\":\\\"0.00\\\",\\\"fareCent\\\":0,\\\"hasOption\\\":false,\\\"id\\\":\\\"2\\\",\\\"message\\\":\\\"快递 免邮\\\",\\\"serviceType\\\":\\\"-4\\\",\\\"signText\\\":\\\"\\\"}],\\\"checked\\\":true,\\\"title\\\":\\\"配送方式\\\"},\\\"_request\\\":true},\\\"service_yfx_99319677a9ff930e59bbdf1330c4e10d@1\\\":{\\\"ref\\\":\\\"0bc7312\\\",\\\"submit\\\":true,\\\"hidden\\\":{\\\"empty\\\":false,\\\"extensionMap\\\":{\\\"serviceType\\\":\\\"1\\\",\\\"outId\\\":\\\"99319677a9ff930e59bbdf1330c4e10d\\\",\\\"id\\\":\\\"yfx_99319677a9ff930e59bbdf1330c4e10d\\\"},\\\"notEmpty\\\":true},\\\"bizName\\\":\\\"ServiceMultiSelect\\\",\\\"id\\\":\\\"yfx_99319677a9ff930e59bbdf1330c4e10d@1\\\",\\\"tag\\\":\\\"service\\\",\\\"type\\\":\\\"multiSelect\\\",\\\"fields\\\":{\\\"selectedIds\\\":[],\\\"groups\\\":[{\\\"options\\\":[{\\\"name\\\":\\\"确认收货前退货可赔付10元 1.10元\\\",\\\"optionId\\\":\\\"{'bizType':1,'optionId':'checkBoxOptionId','serviceId':'1064','storeId':0}\\\",\\\"value\\\":\\\"1.10\\\"}],\\\"required\\\":false}],\\\"title\\\":\\\"运费险\\\"},\\\"btn\\\":\\\"multiSelect\\\",\\\"_request\\\":true},\\\"ncCheckCode_ncCheckCode1\\\":{\\\"ref\\\":\\\"cbf3cf8\\\",\\\"submit\\\":true,\\\"id\\\":\\\"ncCheckCode1\\\",\\\"tag\\\":\\\"ncCheckCode\\\",\\\"type\\\":\\\"biz\\\",\\\"fields\\\":{\\\"nc\\\":\\\"1\\\",\\\"token\\\":\\\"${token}\\\"}},\\\"submitOrder_1\\\":{\\\"submit\\\":true,\\\"id\\\":\\\"1\\\",\\\"tag\\\":\\\"submitOrder\\\",\\\"type\\\":\\\"biz\\\",\\\"fields\\\":{\\\"submitTitle\\\":\\\"提交订单\\\",\\\"tmallPointStatus\\\":\\\"0\\\",\\\"isTmallHKPresellSelf\\\":false,\\\"submitOrderType\\\":\\\"UNITY\\\",\\\"isTmallHKPresellOrder\\\":false},\\\"status\\\":\\\"normal\\\",\\\"_realPay\\\":{\\\"id\\\":\\\"1\\\",\\\"tag\\\":\\\"realPay\\\",\\\"type\\\":\\\"biz\\\",\\\"fields\\\":{\\\"quantity\\\":1,\\\"price\\\":\\\"${price}\\\",\\\"weight\\\":0,\\\"mallTotalPrice\\\":${mallTotalPrice},\\\"originPrice\\\":\\\"${originPrice}\\\",\\\"microPurchaseTotalPrice\\\":0,\\\"tmallHkTotalPrice\\\":0,\\\"currencySymbol\\\":\\\"￥\\\"}},\\\"_address\\\":{\\\"ref\\\":\\\"c67d863\\\",\\\"id\\\":\\\"1\\\",\\\"tag\\\":\\\"address\\\",\\\"type\\\":\\\"biz\\\",\\\"fields\\\":{\\\"tempAddress\\\":false,\\\"useMDZT\\\":false,\\\"h5SupportIframe\\\":true,\\\"useStation\\\":false,\\\"selectedId\\\":${selectedId},\\\"mdSellerId\\\":\\\"${mdSellerId}\\\",\\\"agencyReceive\\\":1,\\\"agencyReceiveH5Url\\\":\\\"${agencyReceiveH5Url}\\\",\\\"options\\\":[{\\\"addressDetail\\\":\\\"${addressDetail}\\\",\\\"agencyReceiveDesc\\\":\\\"收货不便时,可选择免费代收货服务\\\",\\\"areaName\\\":\\\"${areaName}\\\",\\\"cityName\\\":\\\"${cityName}\\\",\\\"countryName\\\":\\\"\\\",\\\"defaultAddress\\\":true,\\\"deliveryAddressId\\\":${selectedId},\\\"divisionCode\\\":\\\"420111\\\",\\\"enableMDZT\\\":false,\\\"enableStation\\\":false,\\\"enforceUpdate4Address\\\":true,\\\"fullName\\\":\\\"${fullName}\\\",\\\"lgShopId\\\":0,\\\"mobile\\\":\\\"${mobile}\\\",\\\"needUpdate4Address\\\":false,\\\"postCode\\\":\\\"${postCode}\\\",\\\"provinceName\\\":\\\"${provinceName}\\\",\\\"stationId\\\":0,\\\"storeAddress\\\":true,\\\"townDivisionId\\\":${townDivisionId},\\\"townName\\\":\\\"${townName}\\\",\\\"updateAddressTip\\\":\\\"\\\"}],\\\"linkAddressId\\\":0,\\\"supportFwd\\\":false,\\\"info\\\":{\\\"value\\\":\\\"${selectedId}\\\"},\\\"url\\\":\\\"//buy.m.tmall.com/order/addressList.htm?enableStation=true&requestStationUrl=%2F%2Fstationpicker-i56.m.taobao.com%2Finland%2FshowStationInPhone.htm&_input_charset=utf8&hidetoolbar=true&bridgeMessage=true\\\",\\\"title\\\":\\\"管理收货地址\\\"},\\\"_request\\\":true}},\\\"anonymous_1\\\":{\\\"submit\\\":true,\\\"id\\\":\\\"1\\\",\\\"tag\\\":\\\"anonymous\\\",\\\"type\\\":\\\"toggle\\\",\\\"fields\\\":{\\\"name\\\":\\\"匿名购买\\\",\\\"checked\\\":true},\\\"btn\\\":\\\"toggle\\\"},\\\"agencyPay_1\\\":{\\\"submit\\\":true,\\\"id\\\":\\\"1\\\",\\\"tag\\\":\\\"agencyPay\\\",\\\"type\\\":\\\"toggle\\\",\\\"fields\\\":{\\\"name\\\":\\\"朋友代付(不支持运费险)\\\",\\\"checked\\\":false},\\\"btn\\\":\\\"toggle\\\",\\\"_request\\\":true},\\\"promotion_3db4a98d538c5a1a94cfc128035ade15\\\":{\\\"submit\\\":true,\\\"hidden\\\":{\\\"empty\\\":false,\\\"extensionMap\\\":{\\\"promotionType\\\":\\\"item\\\",\\\"outId\\\":\\\"3db4a98d538c5a1a94cfc128035ade15\\\",\\\"orderOutId\\\":\\\"3db4a98d538c5a1a94cfc128035ade15\\\"},\\\"notEmpty\\\":true},\\\"id\\\":\\\"3db4a98d538c5a1a94cfc128035ade15\\\",\\\"tag\\\":\\\"promotion\\\",\\\"type\\\":\\\"select\\\",\\\"fields\\\":{\\\"selectedId\\\":\\\"${selectedId}\\\",\\\"options\\\":[{\\\"name\\\":\\\"已省469元:顺丰包邮\\\",\\\"optionId\\\":\\\"Tmall$tmallItemPromotion-1512164067_12920490348#8908296133\\\"},{\\\"name\\\":\\\"已省469元:热卖促销\\\",\\\"optionId\\\":\\\"Tmall$commonItemPromotion-3629570031_19954630232\\\"}],\\\"disabled\\\":false,\\\"title\\\":\\\"商品优惠\\\"},\\\"btn\\\":\\\"select\\\",\\\"status\\\":\\\"hidden\\\",\\\"_request\\\":true},\\\"memo_99319677a9ff930e59bbdf1330c4e10d\\\":{\\\"ref\\\":\\\"1f528f8\\\",\\\"submit\\\":true,\\\"bizName\\\":\\\"memo\\\",\\\"id\\\":\\\"99319677a9ff930e59bbdf1330c4e10d\\\",\\\"tag\\\":\\\"memo\\\",\\\"type\\\":\\\"input\\\",\\\"fields\\\":{\\\"name\\\":\\\"给卖家留言：\\\",\\\"placeholder\\\":\\\"选填:对本次交易的说明(建议填写已和卖家协商一致的内容)\\\",\\\"title\\\":\\\"买家留言：\\\",\\\"value\\\":\\\"\\\"},\\\"btn\\\":\\\"input\\\"}}\",\"linkage\":\"{\\\"common\\\":{\\\"compress\\\":true,\\\"submitParams\\\":\\\"${submitParams}\\\",\\\"validateParams\\\":\\\"${validateParams}\\\"},\\\"signature\\\":\\\"${signature}\\\"}\"}","ua":"098#E1hv9QvWvI6vUvCkvvvvvjiPP25wAjlWR2Fv0jthPmPy0j1nPsFy6jtWRFLpQjnHRphvCvvvphmnvpvBvUvAWCwvvvvvvhCvvvmv0S9PvpvhPBsumpyCvhAvdv+bjNoXeB97EcqhQ8TJ+ulz8dknnbvtIoYbDpZTHb8rwZCliC4AdX3z8SoxdX9Od5tvD70O58g7EcqhA8TJ+ul1pccQjd8rejpiuphvmvvvpBYoHZY+kphvCOOvpZ2yKphv8vvvphvvvvvvvvCCzQvvvcvvvhjNvvvCwvvvpaGvvvHQvvCCzQvvvcv3vpV1kj8ER9URMUsqQ44EMvM1z/cbMX2qCKL8TgLyAQyWqU5TlJuHmv23y/7u/tMM2n///nf3DpNXqOPdluAJsY/T5quP+O7MsbzGKis9DPGjQ47l9bu26w/Q3dKmKgzpQR0x0b5qe9wnrXmTFqqGSGAYk+su/ihPg/sBKguQkwdWSOuMFqe8sW2tFRejMXpRhq7hd+d9D9WngOqeiJ4mMYJGFdkEKU5v2MKJ/dPr6WsoSUoGFquE6+AKsP0h1T9BlMARMXkSGvWU/UzGI/um/Qsq5SsCMU9v1qm7Gnz9DPGjgO7l9bu26w/Q3dKmKgzpQP2aMXLr6WsoSUoGFquE6+s9DPAW/+2EAJAEMEz9FW9jirbD3R7EAPz5kuNRMX9jARmZtadTk9NcKE4gDdecA+233f7vKIPBsqmVKg8qFa2vTOSGeNuRlGA/ePuZrnfY/qSJKYMSzajbqU0TFqSJ6GzdkJdNTU5nMb0WKO5SAp62qnVgzJFXAYPKFbSO+OFpM/zOKUkT0PsPTaK1kJubMMzdz8qagiNFMd7VKOmQ9WsPSgkgkbuUQPqrFKVogUGUl/uNGphCvvOv9hCvvvvtvpvhvvCvp8wCvvpvvhHh3QhvCvvCphv="}`
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
</style>

