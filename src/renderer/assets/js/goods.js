/**
 * 全局网络请求函数
*/
var char = require("superagent-charset");
var request = require("request");
var su = char(require("superagent"));
var iconv = require('iconv-lite');
import md5 from 'js-md5'
import fun from './fun.js'
export default{
	getItemID(url){
		if(!/[a-zA-z]/.test(url)){
			return url;
		}
		return /[\?&]{1,1}id=([\d]+)/.exec(url)[1];
	},
	queryCoupon(cookie,itemid, cb){
		//查询店铺优惠券
		var sign = fun.deSign(cookie, `{"itemId":"${itemid}"}`);
		var url = `https://acs.m.taobao.com/h5/mtop.taobao.baichuan.smb.detail.get/1.0/?appKey=12574478&t=${sign.time}&sign=${sign.sign}&api=mtop.taobao.baichuan.smb.detail.get&v=1.0&type=originaljson&dataType=json&timeout=20000&&data=%7B%22itemId%22%3A%22${itemid}%22%7D`
		su.get(url)
			.set("cookie",cookie)
			.set("user-agent","Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1")
			.end((error, result)=>{
				if(result.headers['set-cookie']){
					cookie = fun.hdndleCookie(cookie,result.headers['set-cookie']);
					console.log(result.headers)
				}
				cb(null,JSON.parse(result.text).data)
			})
	},
	getGoodsInfo(itemId, cb){
		var url = `https://hws.m.taobao.com/cache/wdetail/5.0/?id=${this.getItemID(itemId)}`;
		var goodInfo = {};
		su.get(url)
			.end((error, result)=>{
				if(!error){
					if(/调用成功/.test(result.text)){
						var goods = JSON.parse(result.text)
						//console.log(goods)
						try{
							var apiStack = JSON.parse(goods.data.apiStack[0].value);
							goodInfo.quantity = apiStack.data.itemInfoModel.quantity
							goodInfo.total = apiStack.data.itemInfoModel.totalSoldQuantity
							goodInfo.price = /-/.test(apiStack.data.itemInfoModel.priceUnits[0].price) ? apiStack.data.itemInfoModel.priceUnits[0].price.split("-")[0] : apiStack.data.itemInfoModel.priceUnits[0].price
							goodInfo.title = goods.data.itemInfoModel.title
							goodInfo.picsPath = goods.data.itemInfoModel.picsPath
							goodInfo.userId = goods.data.layoutData.replaceDataMap.SELLER_ID
							goodInfo.nick = goods.data.seller.nick
							goodInfo.itemid = this.getItemID(itemId)
							if(goods.data.skuModel.skuProps){
								goodInfo.skuModel = goods.data.skuModel
								goodInfo.sku = fun.handleSKU(goodInfo.skuModel);
							}else{
								goodInfo.sku = 0
							}
							cb(null, goodInfo);
							return
						}catch(e){
							alert("请重新获取一次")
						}
					}else{
						alert("请重新获取一次")
					}
				}
				cb(error,null);
			})
	},
	getGoodsInfo2(itemId){
		var goodInfo = {};
		var itemid = this.getItemID(itemId);
		var time = new Date().getTime().toString().substr(0,10);
		var url = `https://mdskip.taobao.com/core/initItemDetail.htm?showShopProm=false&sellerPreview=false&itemId=${itemid}&isApparel=false&queryMemberRight=true&isPurchaseMallPage=false&isRegionLevel=false&service3C=false&tmallBuySupport=true&addressLevel=2&cartEnable=true&tryBeforeBuy=false&isUseInventoryCenter=false&isAreaSell=false&isSecKill=false&cachedTimestamp=${time}&offlineShop=false&isForbidBuyItem=false&household=false&timestamp=${time}`
		url = `https://detail.tmall.com/item.htm?id=${itemid}`;
		su.get(url)
			.set("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.86 Safari/537.36")
			.end((error, response)=>{
				
				var data = /TShop\.Setup\([\s]+\{(.*?)[\s]+\);/.exec(response.text);
				console.log(error,response)
			})
		// request.get({url:url,headers:{"Referer":}},(error,response,body)=>{
		// 	body = iconv.decode(body, 'GBK');
		// 	body = body.replace(/setMdskip\(/,"")
		// 	body = body.replace(/\}\)/,"}")
		// 	console.log(JSON.parse(body))
			
		// 	//if(//)
		// })
	},
	subOrder(cookie, itemid, userId, sku = null,cb){

		//获取x-uid
		var url = sku == null ? `https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%E2%84%A2&buyNow=true&_input_charset=utf-8&itemId=${itemid}&quantity=1&divisionCode=420100&x-itemid=${itemid}` : `https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%3F&itemId=${itemid}&exParams=%7B%7D&skuId=${sku}&quantity=1&userId=${userId}&buyNow=true&_input_charset=utf-8&x-itemid=${itemid}`
		su.get(url)
			.set({
				"user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
				"cookie":cookie
			})
			.end((error, result)=>{
				if(!/短信验证码登录/.test(result.text)){
					var uid = /"x-uid":"([\d]+)"\}/.exec(result.text)[1];
					var goods = {
						"cookie":cookie,
						"itemid":itemid,
						"userId":userId,
						"sku":sku,
						"x-uid":uid
					}
					this.Buildorder(goods,cb);
				}else{
					alert("需要重新登录");
					cb("需要重新登录",null)
					return
				}
			})
	},
	Buildorder(info,cb){
		//获取订单编号
		fun.getSign(info.cookie,info.itemid,info.sku,(error, res)=>{
			var url = `https://h5acs.m.tmall.com/h5/mtop.trade.buildorder.h5/3.0/?appKey=12574478&t=${res.time}&sign=${res.sign}&api=mtop.trade.buildOrder.h5&v=3.0&type=originaljson&timeout=20000&isSec=1&dataType=json&ecode=1&ttid=%23b%23ip%23%23_h5&AntiFlood=true&LoginRequest=true&H5Request=true&x-itemid=${info.itemid}&x-uid=${info['x-uid']}`
			su.post(url)
				.set("content-type","application/x-www-form-urlencoded")
				.set("User-Agent","Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1")
				.set("referer",`https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%E2%84%A2&itemId=${info.itemid}&exParams=%7B%7D&skuId=${info.sku}&quantity=1&divisionCode=420111&userId=${info.userId}&buyNow=true&_input_charset=utf-8&x-itemid=${info.itemid}`)
				.set("cookie",info.cookie)
				.send(`data=%7B%22itemId%22%3A${info.itemid}%2C%22quantity%22%3A1%2C%22buyNow%22%3Atrue%2C%22skuId%22%3A${info.sku}%2C%22serviceId%22%3Anull%2C%22exParams%22%3A%22%7B%5C%22buyFrom%5C%22%3A%5C%22tmall_h5_detail%5C%22%7D%22%7D`)
				.end((error, result)=>{
					if(result.headers['set-cookie']){
						
						info.cookie = info.cookie.replace(/_m_h5_tk=[\w_?]+;/,"")
						info.cookie = info.cookie.replace(/_m_h5_tk_enc=[\w]+;/,"")
						info.cookie += "; "+result.headers['set-cookie'][0].split(";")[0] + ";"
						info.cookie += result.headers['set-cookie'][1].split(";")[0] + ";"
						info.cookie = info.cookie.replace(/; ;/,";")
						this.Buildorder(info,cb);
					}else{
						this.createOrder(info,JSON.parse(result.text),cb)
					}
					cb(error,null)
					return
				})
		})
	},
	createOrder(info,realPay,cb){
		//创建订单下单
		console.log(realPay)
		var data = fun.testCreateOrder(realPay);
		var sign = fun.deSign(info.cookie, data)
		var url = `https://h5acs.m.tmall.com/h5/mtop.trade.createorder.h5/3.0/?jsv=2.4.2&appKey=12574478&t=${sign.time}&sign=${sign.sign}&api=mtop.trade.createOrder.h5&v=3.0&type=originaljson&timeout=20000&dataType=json&isSec=1&ecode=1&ttid=%23b%23ip%23%23_h5&AntiFlood=true&LoginRequest=true&H5Request=true&submitref=0a67f6&x-itemid=${info.itemid}&x-uid=${info['x-uid']}`
		request.post({
			url:url,
			headers:{
				"Cookie": info.cookie
			},
			form:{data:data}
		},(error, response, body)=>{
			var order = JSON.parse(body);
			if(order.ret == "SUCCESS::调用成功"){
				var trade_pay = "https:" + order.data.nextUrl
				cb(null,order)
				return
			}
			console.log(body,info.cookie,url, data)
			cb(body,null)
		})
	},
	getPayInfo(order,info){
		//获取付款信息
		console.log(JSON.stringify(order))
		request.get({
			url:"https:"+order.data.alipayWapCashierUrl,
			headers:{
				"Cookie":info.cookie
			}
		}, (error, response, body) => {
			if(/server_param&quot;:&quot;([\w]+)&quot;,&quot/.test(body)){
				var server_param = /server_param&quot;:&quot;([\w]+)&quot;,&quot/.exec(body)[1];
				var awid = /awid=([\w]+)"\smethod="post">/.exec(body)[1];
				var session = / name="session" value="([\w]+)"\s\/>/.exec(body)[1];
				var token = /name="_form_token" value="([\w]+)"\/>/.exec(body)[1];
				info.cookie = fun.hdndleCookie(info.cookie, response.headers['set-cookie']);
				this.pay({"server_param":server_param, "awid":awid, "token":token,"goods":info,"order":order,"session":session});
			}else{
				console.log(response)
			}
		})
	},
	pay(info){
		//验证支付密码
		var url = `https://mclient.alipay.com/h5/cashierPay.htm?awid=${info.awid}`;
		var spwd = fun.handlePwd(info.goods.pwd);
		var data = `isFromPwdValidate=true&_form_token=${info.token}&params=%7B%22server_param%22%3A%22${info.server_param}%22%2C%22shared_tair%22%3A%22false%22%7D&session=${info.session}&${spwd}`
		su.post(url)
			.set("Content-Type","application/x-www-form-urlencoded")
			.set("Cookie",info.goods.cookie)
			.set("Referer","https:"+info.order.data.alipayWapCashierUrl)
			.set("Content-Length",data.length)
			.set("User-Agent","Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1")
			.send(data)
			.end((error, response)=>{
				console.log(info.goods.cookie,url,data,response.text)
				info.goods.cookie = fun.hdndleCookie(info.goods.cookie, response.headers['set-cookie']);
				this.startPay(info);
			})
	},
	startPay(info){
		var url = `https://mclient.alipay.com/h5/cashierPayResultQuery.json?awid=${info.awid}&r=${Math.floor(Math.random()*1e13)}`;
		var data = `_input_charset=utf-8&params=%7B%22server_param%22%3A%22${info.server_param}%22%2C%22shared_tair%22%3A%22false%22%7D&session=${info.session}`
		console.log(url,data)
		su.post(url)
			.set("Cookie",info.goods.cookie)
			.set("Content-Length",data.length)
			.set("Referer",`https://mclient.alipay.com/h5/cashierPay.htm?awid=${info.awid}`)
			.set("User-Agent","Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1")
			.send(data)
			.end((error, response)=>{
				console.log(error, response.text)
				alert("下单成功并且已付款");
			})

	},
	createaddress(cookie,info){
		//添加收货地址
		var sign = fun.deSign(cookie, `{"divisionCode":420111,"townDivisionCode":"420111002","addressDetail":"锦绣龙城4栋2702","mobile":"13080671541","fullName":"何冲","post":"430070"}`);
		var url = `https://api.m.taobao.com/h5/com.taobao.mtop.deliver.createaddress/2.0/?appKey=12574478&t=${sign.time}&sign=${sign.sign}&api=com.taobao.mtop.deliver.createAddress&v=2.0&ecode=1&type=jsonp&dataType=jsonp&data=%7B%22divisionCode%22%3A420111%2C%22townDivisionCode%22%3A%22420111002%22%2C%22addressDetail%22%3A%22%E9%94%A6%E7%BB%A3%E9%BE%99%E5%9F%8E4%E6%A0%8B2702%22%2C%22mobile%22%3A%2213080671541%22%2C%22fullName%22%3A%22%E4%BD%95%E5%86%B2%22%2C%22post%22%3A%22430070%22%7D`
		su.get(url)
			.end((error, result)=>{
				console.log(result)
			})
	},
	isLogin(objCookie, cb){
		var cookie = objCookie.cookie
		var sign = fun.deSign(cookie, `{"isSec":"0"}`);
		var url = `https://acs.m.taobao.com/h5/mtop.user.getusersimple/1.0/?appKey=12574478&t=${sign.time}&sign=${sign.sign}&api=mtop.user.getUserSimple&v=1.0&H5Request=true&type=jsonp&dataType=jsonp&data=%7B%22isSec%22%3A%220%22%7D`
		request.get({
			url:url,
			headers:{
				"Cookie":cookie
			}
		},(error, response, body)=>{
			if(/FAIL_SYS_SESSION_EXPIRED::SESSION失效/.test(body)){
				return cb(null,false);
			}
			return cb(null,true);;
		})
	},
	getLogisticByOrderId(info, cb){
		//获取订单物流信息
		var sign = fun.deSign(info.cookie, `{"orderId":"${info.mainOrderId}"}`);
		var url = `https://api.m.taobao.com/h5/mtop.logistic.getlogisticbyorderid/1.0/?v=1.0&api=mtop.logistic.getLogisticByOrderId&appKey=12574478&t=${sign.time}&type=jsonp&sign=${sign.sign}&data=%7B%22orderId%22%3A%22${info.mainOrderId}%22%7D`
		request.get({url:url,headers:{"Cookie":info.cookie,"referer":`https://h5.m.taobao.com/awp/mtb/oper.htm?operId=0&orderId=${info.mainOrderId}&spm=a2141.7631731.0.i1`}},(error, response, body)=>{
			if(/SUCCESS::调用成功/.test(body)){
				body = body.replace(/callback\(/,"");
				body = body.replace(/\}\)/,"}");
				cb(null,JSON.parse(body))
				return
			}
			cb(response,null)
			return 
		})
	}
}
