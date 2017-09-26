/**
 * 全局网络请求函数
*/
var request = require("request");
var su = require("superagent");
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
					}
				}
				cb(error,null);
			})
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
		console.log(order)

		request.get({
			url:"https:"+order.data.alipayWapCashierUrl,
			headers:{
				"Cookie":info.cookie
			}
		}, (error, response, body) => {
			if(/server_param&quot;:&quot;([\w]+)&quot;,&quot/.test(body)){
				var server_param = /server_param&quot;:&quot;([\w]+)&quot;,&quot/.exec(body)[1];
				var awid = / name="session" value="([\w]+)"\s\/>/.exec(body)[1];
				var token = /name="_form_token" value="([\w]+)"\/>/.exec(body)[1];

				info.cookie = fun.hdndleCookie(info.cookie, response.headers['set-cookie']);
				console.log(info)
				this.pay({"server_param":server_param, "awid":awid, "token":token,"goods":info,"order":order});
			}
		})
	},
	pay(info){
		//验证支付密码
		var url = `https://mclient.alipay.com/h5/cashierPay.htm?awid=${info.awid}`;
		var spwd = `${fun.encrypt("1")},${fun.encrypt("8")},${fun.encrypt("3")},${fun.encrypt("8")},${fun.encrypt("4")},${fun.encrypt("4")}`
		request.post({
			url:url,
			headers:{
				"Referer":"https:"+info.order.data.alipayWapCashierUrl,
				"Cookie": info.goods.cookie,
				"User-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
			},
			form:{
				isFromPwdValidate:true,
				_form_token:info.token,
				params:`{"server_param":"${info.server_param}","shared_tair":"false"}`,
				session:info.awid,
				spwd_unencrypt:"******",
				spwd:spwd
			}
		}, (error, response, body)=>{
			info.goods.cookie = fun.hdndleCookie(info.goods.cookie, response.headers['set-cookie']);
			console.log(response,body)
			this.startPay(info)
		})
	},
	startPay(info){
		var url = `https://mclient.alipay.com/h5/cashierPayResultQuery.json?awid=${info.awid}&r=${Math.floor(Math.random()*1e13)}`;
		request.post({
			url:url,
			headers:{
				"Cookie":info.goods.cookie,
				"Referer":`https://mclient.alipay.com/h5/cashierPay.htm?awid=${info.awid}`,
				"User-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
			},
			form:{
				_input_charset:"utf-8",
				params:`{"server_param":"${info.server_param}","shared_tair":"false"}`,
				session:info.awid
			}
		},(error, response, body)=>{
			console.log(response,body)
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
	}
}







// Referer: https://maliprod.alipay.com/w/trade_pay.do?app_name=tb&partner=PARTNER_TAOBAO_ORDER&biz_type=trade&sign=fkuz_k%252F_m5n_x_m4d2_r%252B_i7_x_o_m_cf_kg_p_ynz_dku_t_ap_e_sqcj_dv_ie_d_vu_z_l50d1_a%253D%253D&trade_no=2017092621001001750228843975&return_url=http%253A%252F%252Fhuodong.m.taobao.com%252Fbuy%252FpaySuccess.html%253FbizOrderId%253D62521651684438233%2526degrade%253D0%2526act%253Dfalse&sign_date=2017-09-26+17%3A38%3A33&extern_token=143af5a91d8eafe8664cd649d1efd4f5&sign_type=DSA


// https://buy.m.tmall.com/order/confirmOrderWap.htm?enc=%E2%84%A2&itemId=539323189975&exParams=%7B%22alicom_wtt_cart%22%3A%221%22%2C%22alicom_wtt_param%22%3A%2248359_0_0_0_0_0_1010%4099%4099%22%7D&skuId=3319273236843&service=528822569899%7C0&quantity=1&divisionCode=420111&userId=2848433382&buyNow=true&_input_charset=utf-8&x-itemid=539323189975&x-uid=2848433382

// https://maliprod.alipay.com/w/trade_pay.do?tcode=eyJiaXpPcmRlcklkcyI6IjYyNTgzMzYxNTcyNDM4MjMzIiwiYnV5ZXJJZCI6IjI4NDg0MzMzODIiLCJ0eXBlIjoiMyJ9&alipay_trade_no=2017092621001001750228952151&s_id=143af5a91d8eafe8664cd649d1efd4f5&return_url=https%3A%2F%2Fh5.m.taobao.com%2Fapp%2Ftrade%2Fpaysuc.html%3F_wx_tpl%3Dhttps%3A%2F%2Fowl.alicdn.com%2Fmupp-dy%2Fdevelop%2Ftaobao%2Ftrade%2FpaySuccess%2Fentry.js%26wx_navbar_transparent%3Dtrue%26orderIds%3D62583361572438233%26degrade%3D0%26act%3Dfalse&pay_order_id=62583361572438233

// https://mclient.alipay.com/h5/cashierPay.htm?awid=RZ13GzaCzoe7foCGwEK2tWEP1HQuOdmobileclientgwRZ13