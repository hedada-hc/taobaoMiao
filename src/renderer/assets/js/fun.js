var superagent = require('superagent');
var request = require("request");
import md5 from 'js-md5'
import _ from 'lodash'
/**
 * 全局处理函数	
*/
export default {
	handleSKU(skuModel){
		console.log(skuModel)
		//处理sku方法
		switch(skuModel.skuProps.length){
			case 2:
				return this.handleSKU2(skuModel);
				break;
			case 3:
				return this.handleSKU3(skuModel);
				break;
			case 4:
				return this.handleSKU4(skuModel);
				break;
			default:
				return this.handleSKU1(skuModel);
		}
		
	},
	handleSKU1(skuModel){

	},
	handleSKU2(skuModel){
		//处理2位sku
		var data = skuModel.skuProps;
		var key = [];
		for(var i=0;i<data[0].values.length;i++){
			for(var v=0;v<data[1].values.length;v++){
				var sku_key = `${data[0].propId}:${data[0].values[i].valueId};${data[1].propId}:${data[1].values[v].valueId}`;
				var sku = skuModel.ppathIdmap[sku_key];
				key.push({
					"i_propName":data[0].propName,"i_name":data[0].values[i].name,
					"v_propName":data[1].propName,"v_name":data[1].values[v].name,
					"sku_key":sku_key,
					"sku":sku
				})
			}
		}
		return key;
	},
	handleSKU3(skuModel){
		//处理3位sku
		var data = skuModel.skuProps;
		var key = [];
		for(var i=0;i<data[0].values.length;i++){
			for(var v=0;v<data[1].values.length;v++){
				for(var k=0;k<data[2].values.length;k++){
					var sku_key = `${data[0].propId}:${data[0].values[i].valueId};${data[1].propId}:${data[1].values[v].valueId};${data[2].propId}:${data[2].values[k].valueId}`;
					var sku = skuModel.ppathIdmap[sku_key];
					key.push({
						"i_propName":data[0].propName,"i_name":data[0].values[i].name,
						"v_propName":data[1].propName,"v_name":data[1].values[v].name,
						"k_propName":data[2].propName,"k_name":data[2].values[k].name,
						"sku_key":sku_key,
						"sku":sku
					})
				}
			}
		}
		return key;
	},
	handleSKU4(skuModel){
		//处理4位sku
		var data = skuModel.skuProps;
		var key = [];
		for(var i=0;i<data[0].values.length;i++){
			for(var v=0;v<data[1].values.length;v++){
				for(var k=0;k<data[2].values.length;k++){
					for(var o=0;o<data[3].values.length;o++){
						var sku_key = `${data[0].propId}:${data[0].values[i].valueId};${data[1].propId}:${data[1].values[v].valueId};${data[2].propId}:${data[2].values[k].valueId};${data[3].propId}:${data[3].values[o].valueId}`;
						var sku = skuModel.ppathIdmap[sku_key];
						key.push({
							"i_propName":data[0].propName,"i_name":data[0].values[i].name,
							"v_propName":data[1].propName,"v_name":data[1].values[v].name,
							"k_propName":data[2].propName,"k_name":data[2].values[k].name,
							"o_propName":data[3].propName,"o_name":data[3].values[o].name,
							"sku_key":sku_key,
							"sku":sku
						})
					}
				}
			}
		}
		return key;
	},
	getSign(cookies,itemId,sku,cb){
		//网络取md5
		if(/_m_h5_tk=([\w]+)_[\d]+;/.test(cookies)){
			var token = /_m_h5_tk=([\w]+)_[\d]+;/.exec(cookies)[1];
			var time = new Date().getTime()
			superagent.post("http://tool.chinaz.com/tools/md5.aspx")
				.send(`q=${token}%26${time}%2612574478%26%7B%22itemId%22%3A${itemId}%2C%22quantity%22%3A1%2C%22buyNow%22%3Atrue%2C%22skuId%22%3A${sku}%2C%22serviceId%22%3Anull%2C%22exParams%22%3A%22%7B%5C%22buyFrom%5C%22%3A%5C%22tmall_h5_detail%5C%22%7D%22%7D&ende=0&md5type=1`)
				.end((error, result)=>{
					var sign = /WrapHid"\sid="MD5Result">([\w]+)<\/tex/.exec(result.text)[1];
					console.log(sign)
					cb(null,{sign:sign,time:time})
				})
		}else{
			cb("错误cookie",null)
		}
		//q=sd115s4d41fwewe%26156231254789%2612574478%26%7B%22itemId%22%3A5311592491%2C%22quantity%22%3A1%2C%22buyNow%22%3Atrue%2C%22skuId%22%3A321461781%2C%22serviceId%22%3Anull%2C%22exParams%22%3A%22%7B%5C%22buyFrom%5C%22%3A%5C%22tmall_h5_detail%5C%22%7D%22%7D&ende=0&md5type=1
	},
	deSign(cookies,data){
		//本地算法md5
		if(/_m_h5_tk=([\w]+)_[\d]+;/.test(cookies)){
			var token = /_m_h5_tk=([\w]+)_[\d]+;/.exec(cookies)[1];
			var time = new Date().getTime()
			var sign = md5(token + "&" + time + "&" + "12574478" + "&" + data);
			return {sign:sign, time:time}
		}
		return null;
	},
	hdndleCookie(tmp_cookie,cookie){
		//处理cookie
		var tmp = ''
		for(var i=0;i<cookie.length;i++){
			//处理已经存在的旧cookie
			var isTmp = cookie[i].split("=")[0]
			if(tmp == ''){
				tmp += cookie[i].split(";")[0]
				tmp_cookie = tmp_cookie.replace(`/${isTmp}=([\w;?]+)/`, cookie[i].split(";")[0])
			}else{
				tmp += `; ${cookie[i].split(";")[0]}`
				tmp_cookie = tmp_cookie.replace(`/${isTmp}=([\w;?]+)/`, `; ${cookie[i].split(";")[0]}`)
			}
		}
		tmp_cookie += tmp;
		console.log(tmp_cookie);
		return tmp_cookie;
	},
	forSku(skuObj){
		var name = [];
		var i = [];
		var v = [];
		var k = [];
		var o = [];
		var value = []
		var arr = Object.keys(skuObj[0]);
		switch(arr.length){
			case 6:
				name.push(skuObj[0].i_propName)
				name.push(skuObj[0].v_propName)
				break;
			case 8:
				name.push(skuObj[0].i_propName)
				name.push(skuObj[0].v_propName)
				name.push(skuObj[0].k_propName)
				break;
			case 10:
				name.push(skuObj[0].i_propName)
				name.push(skuObj[0].v_propName)
				name.push(skuObj[0].k_propName)
				name.push(skuObj[0].o_propName)
				break;
			default:
				name.push(skuObj[0].i_propName)
		}
		for(var item in skuObj){	
			switch(arr.length){
				case 6:
					i.push(skuObj[item].i_name)
					v.push(skuObj[item].v_name)
					break;
				case 8:
					i.push(skuObj[item].i_name)
					v.push(skuObj[item].v_name)
					k.push(skuObj[item].k_name)
					break;
				case 10:
					i.push(skuObj[item].i_name)
					v.push(skuObj[item].v_name)
					k.push(skuObj[item].k_name)
					o.push(skuObj[item].o_name)
					break;
				default:
					i.push(skuObj[0].i_name)
			}
		}
		i = _.uniq(i);
		v = _.uniq(v);
		k = _.uniq(k);
		o = _.uniq(o);

		return {"type":name,"i":i,"v":v,"k":k,"o":o};
	},
	goodSkuName(obj){
		var sku = []
		var arr = Object.keys(obj[0]);
		for(var item in obj){	
			switch(arr.length){
				case 6:
					sku.push({"skuName":obj[item].i_name+" "+obj[item].v_name,"sku_key":obj[item].sku_key,"skuId":obj[item].sku})
					break;
				case 8:
					sku.push({"skuName":obj[item].i_name+" "+obj[item].v_name+" "+obj[item].k_name,"sku_key":obj[item].sku_key,"skuId":obj[item].sku})
					break;
				case 10:
					sku.push({"skuName":obj[item].i_name+" "+obj[item].v_name+" "+obj[item].k_name+" "+obj[item].o_name,"sku_key":obj[item].sku_key,"skuId":obj[item].sku})
					break;
				default:
					i.push(obj[0].i_name)
					sku.push({"skuName":obj[item].i_name,"sku_key":obj[item].sku_key,"skuId":obj[item].sku})
			}
		}
		return sku;
	},
	replaceCookie(tmp_cookie,cookie){
		for(var i=0;i<cookie.length;i++){
			var isTmp = cookie[i].split("=")[0]
			console.log(cookie[i].split(";")[0])
			if(/_m_h5_tk=/.test(cookie[i].split(";")[0])){
				tmp_cookie = tmp_cookie.replace(/_m_h5_tk=([\w-?;?]+)/, cookie[i].split(";")[0]+";")
			}else{
				tmp_cookie = tmp_cookie.replace(/_m_h5_tk_enc=([\w-?;?]+)/, cookie[i].split(";")[0]+";")
			}
		}
		console.log(tmp_cookie);
		return tmp_cookie;
	},
	LoginCookie(cookie){
		var tmpCookie = '';
		var nick = "";
		for(var i=0;i<cookie.length;i++){
			tmpCookie += `${cookie[i].name}=${cookie[i].value}; `
			if(cookie[i].name == "tracknick"){
				nick = unescape(decodeURIComponent(cookie[i].value).replace(/\\?\u/g, "%u"));
			}
		}
		return {"nick":nick, "cookie":tmpCookie, "time":new Date().getTime(), "isSelect": false};
	},
	testCreateOrder(orderData){
		var params = JSON.stringify({
				"hierarchy":JSON.stringify(orderData.data.hierarchy),
				"data":JSON.stringify(orderData.data.data),
				"linkage":JSON.stringify(orderData.data.linkage),
			});
		var data = {
			"params":JSON.stringify(params)
		}
		return data
	},
	createOrder(orderData){
		//拼接付款数据 
		var params = {
			"hierarchy":{},
			"data":{},
			"linkage":{}
		}
		//params.hierarchy.structure = orderData.data.hierarchy.structure
		params.hierarchy = JSON.stringify({"structure":orderData.data.hierarchy.structure})
		var unData = this.un(orderData.data.linkage.request, orderData.data.linkage.input)
		params.data.anonymous_1 = orderData.data.data.anonymous_1
		params.data.ncCheckCode_ncCheckCode1 = orderData.data.data.ncCheckCode_ncCheckCode1
		
		for(var i=0;i<unData.length;i++){
			if(unData[i] == "installmentPicker_1"){
				params.data.installmentPicker_1 = orderData.data.data.installmentPicker_1
				params.data.installmentToggle_1 = orderData.data.data.installmentToggle_1
			}else{
				params.data[`${unData[i]}`] = orderData.data.data[`${unData[i]}`]	
			}
		}
		params.data.submitOrder_1 = orderData.data.data.submitOrder_1
		params.data.submitOrder_1._address = orderData.data.data.address_1
		params.data.submitOrder_1._realPay = orderData.data.data.realPay_1
		params.linkage = JSON.stringify({
			"common":{
				"compress":orderData.data.linkage.common.compress,
				"submitParams":orderData.data.linkage.common.submitParams,
				"validateParams":orderData.data.linkage.common.validateParams,
			},
			"signature":orderData.data.linkage.signature
		})
		
		//获取其他数据
		params.data = JSON.stringify(params.data)
		var data = {}
		data.params = params
		data.params = JSON.stringify(data.params)
		return JSON.stringify(data)
	},
	jiami(requestP){
		var data = {
			"params":{
				"data":null,
				"hierarchy":null,
				"linkage":null
			}
		}
		data.params.data = JSON.stringify(requestP.params.data)
		data.params.hierarchy = JSON.stringify(requestP.params.hierarchy)
		data.params.linkage = JSON.stringify(requestP.params.linkage)
		data.params = JSON.stringify(data.params)
		data = JSON.stringify(data)
		return data
	},
	testCreateOrder(orderData, type = false){
		//拼接付款数据 
		var params = {
			"hierarchy":{},
			"data":{},
			"linkage":{}
		}
		//params.hierarchy.structure = orderData.data.hierarchy.structure
		params.hierarchy = {"structure":orderData.data.hierarchy.structure}
		var unData = this.un(orderData.data.linkage.request, orderData.data.linkage.input)
		params.data.anonymous_1 = orderData.data.data.anonymous_1
		params.data.ncCheckCode_ncCheckCode1 = orderData.data.data.ncCheckCode_ncCheckCode1
		
		for(var i=0;i<unData.length;i++){
			if(unData[i] == "installmentPicker_1"){
				params.data.installmentPicker_1 = orderData.data.data.installmentPicker_1
				params.data.installmentToggle_1 = orderData.data.data.installmentToggle_1
			}else{
				params.data[`${unData[i]}`] = orderData.data.data[`${unData[i]}`]	
			}
		}
		params.data.submitOrder_1 = orderData.data.data.submitOrder_1
		params.data.submitOrder_1._address = orderData.data.data.address_1
		params.data.submitOrder_1._realPay = orderData.data.data.realPay_1
		params.linkage = {
			"common":{
				"compress":orderData.data.linkage.common.compress,
				"submitParams":orderData.data.linkage.common.submitParams,
				"validateParams":orderData.data.linkage.common.validateParams,
			},
			"signature":orderData.data.linkage.signature
		}
		
		//获取其他数据
		var data = {}
		data.params = params
		data.params = data.params
		if(type) return data;
		return this.jiami(data);
	},
	un(arr1,arr2){
		var arr = arr1.concat(arr2);
		var lastArr = [];
		for(var i = 0;i<arr.length;i++){
			if(!this.unique(arr[i],lastArr) && !/quantity/.test(arr[i]) && !/address_1/.test(arr[i])){
				lastArr.push(arr[i]);
			}
		}
		return lastArr;
	},
	unique(n,arr){
		for(var i=0;i<arr.length;i++){
			if(n==arr[i]){
				return true;
			}
		}
		return false;
	},
	encrypt(data){
		var setRSA = new RSAKey();
        setRSA.setPublic(rsa_n, rsa_e);
        var res = setRSA.encrypt(data);
        return linebrk(hex2b64(res), 64);
	},
	localAdd(name,value){
		var local = window.localStorage;
		if(typeof value == "object"){
			local[name] = JSON.stringify(value)
		}else{
			local[name] = value
		}
	},
	localQuery(name = null){
		var local = window.localStorage;
		if(name == null) return local
		else return local.getItem(name)
	},
	localDel(name){
		var local = window.localStorage;
		return local.removeItem(name)
	},
	queryBoughtList(order){
		var tmp = [];
		for(var i=0;i<order.length;i++){
			for(var item in order[i]){
				item = order[i][item]
				tmp.push({
					"mainOrderId":item[0].cellData[0].fields.mainOrderId,
					"sellerNick":item[0].cellData[0].fields.sellerNick,
					"order_status":item[1].cellData[1].fields.text,
					"order_status":item[1].cellData[1].fields.text,
					"title":item[2].cellData[0].fields.title,
					"skuText":item[2].cellData[0].fields.skuText,
					"price":item[2].cellData[0].fields.priceInfo.promotion,
					"pic": "http:"+item[2].cellData[0].fields.pic,
				});
			}
		}
		return tmp;
	},

	getUserInfo(cookie,cb){
		var sign = this.deSign(cookie, '{"pageName":"index"}');
		var url = `http://api.m.taobao.com/h5/mtop.taobao.mclaren.getmytaobaopage/1.0/?v=1.0&api=mtop.taobao.mclaren.getMyTaobaoPage&appKey=12574478&t=${sign.time}&sign=${sign.sign}&type=jsonp&callback=mtopjsonp1&data=%7B%22pageName%22%3A%22index%22%7D`;
		request.get({
			url:url,
			headers:{
				"Cookie":cookie
			}
		}, (error, response, body)=>{
			body = body.replace(/mtopjsonp1\(/,"");
			body = body.replace(/\}\)/,"}");
			
			if(JSON.parse(body).data.simpleInfo){
				cb(null,JSON.parse(body).data.simpleInfo)
			}else{
				cb("遇到错误了",null)
			}
		})
	},
	localCookie(logCookie){
		var allCookies = this.localQuery("all_cookie") != null ? JSON.parse(this.localQuery("all_cookie")) : [];
		var cookie = this.LoginCookie(logCookie);
		//获取该账号信息
		this.getUserInfo(cookie.cookie, (error, result)=>{
			if(result){
				//账号信息赋值到传入cookie
				cookie.user = result
				//判断是否是首次登录一个账号
				if(allCookies.length == 0){
				 	allCookies.push(cookie)
				}else{
					//循环对比是否重复登录的账号 
					for(var index in allCookies){
						if(allCookies[index].nick == cookie.nick){
							allCookies[index].cookie = cookie.cookie;
							allCookies[index].user = cookie.user;
							allCookies[index].time = new Date().getTime();
						}else{
							allCookies.push(cookie)
						}
					}
				}
				//保存到local
				this.localAdd("all_cookie", allCookies);
			}
		});

	},
	getSelectCookie(){
		var allCookies = this.localQuery("all_cookie") != null ? JSON.parse(this.localQuery("all_cookie")) : [];
		var cookie = null;
		if(allCookies.length != 0){
			for(var index in allCookies){
				if(allCookies[index].isSelect){
					cookie = allCookies[index];
				}
			}
		}
		if(cookie == null && allCookies.length > 0){
			cookie = allCookies[0];
		}
		return cookie;
	}

}
