var superagent = require('superagent');
import md5 from 'js-md5'
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
				tmp_cookie = tmp_cookie.replace(`/${isTmp}=(.*?);/`, cookie[i].split(";")[0])
			}else{
				tmp += `; ${cookie[i].split(";")[0]}`
				tmp_cookie = tmp_cookie.replace(`/${isTmp}=(.*?);/`, `; ${cookie[i].split(";")[0]}`)
			}
		}
		tmp_cookie += tmp;
		console.log(tmp_cookie);
		return tmp_cookie;
	},
	createOrder(orderData){
		//拼接付款数据 confirmOrder,orderID,itemID,selectedId,selected_name,title,deliveryMethod,ncCheckCode_ncCheckCode1,submitOrder_1,realPay,address,anonymous,agencyPay,service_bwy
		var confirmOrder = orderData.data.hierarchy.root;
		var orderID = orderData.data.hierarchy.structure[confirmOrder][1].split("_")[1];
		var itemID = orderData.data.data[confirmOrder].fields.joinId;
		var selectedId = orderData.data.data["promotion_"+itemID].fields.options[0].optionId
		var selected_name = orderData.data.data["promotion_"+itemID].fields.options[0].name
		var title = orderData.data.data["promotion_"+itemID].fields.title
		var deliveryMethod = orderData.data.data["deliveryMethod_" + orderID]
		var ncCheckCode_ncCheckCode1 = orderData.data.data.ncCheckCode_ncCheckCode1
		var submitOrder_1 = orderData.data.data.submitOrder_1
		var realPay = orderData.data.data.realPay_1
		var address = orderData.data.data.address_1
		var anonymous = orderData.data.data.anonymous_1
		var agencyPay = orderData.data.data.agencyPay_1
		var service_bwy = orderData.data.data["service_bwy_" + itemID]
		var service_yfx = orderData.data.data["service_yfx_" + orderID] != undefined ? orderData.data.data["service_yfx_" + orderID] : orderData.data.data["service_yfx_" + orderID+"@1"]
		//0ca8806ed63ceb64e8e53883c8a697f1
		var order_ = "order_" + orderID;
		var orderInfo_ = orderData.data.hierarchy.structure[order_][0];
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
		var tbGold_1 = orderData.data.data.tbGold_1

		var linkage = orderData.data.linkage.common
		var signature = orderData.data.linkage.signature
		console.log(service_yfx,order_)

		/**
		var params = JSON.stringify({
			"hierarchy":{"structure":orderData.data.hierarchy.structure},
			"data":orderData.data.data,
			"linkage":{"common":orderData.data.linkage.common}})
		*/
		var params = {
			"hierarchy":{"structure":{}},
			"data":{},
			"linkage":{"common":{}}
		}
		
		
		params.data.agencyPay_1 = orderData.data.data.agencyPay_1;
		params.data.anonymous_1 = orderData.data.data.anonymous_1;
		params.data[`deliveryMethod_${orderID}`] = orderData.data.data[`deliveryMethod_${orderID}`];
		params.data[`memo_${orderID}`] = orderData.data.data[`memo_${orderID}`];
		params.data.ncCheckCode_ncCheckCode1 = orderData.data.data.ncCheckCode_ncCheckCode1;
		params.data[`promotion_${itemID}`] = orderData.data.data[`promotion_${itemID}`];
		if(orderData.data.data[`service_bwy_${itemID}@1`]) params.data[`service_bwy_${itemID}@1`] = orderData.data.data[`service_bwy_${itemID}@1`];
		if(orderData.data.data[`service_gybb_${itemID}@1`]) params.data[`service_gybb_${itemID}@1`] = orderData.data.data[`service_gybb_${itemID}@1`];
		if(orderData.data.data[`service_yfx_${orderID}@1`]) params.data[`service_yfx_${orderID}@1`] = orderData.data.data[`service_yfx_${orderID}@1`];
		params.data.submitOrder_1 = orderData.data.data.submitOrder_1;
		params.data.tbGold_1 = orderData.data.data.tbGold_1;

		params.hierarchy.structure = orderData.data.hierarchy.structure
		params.linkage.common.compress = orderData.data.linkage.common.compress
		params.linkage.common.submitParams = orderData.data.linkage.common.submitParams
		params.linkage.common.validateParams = orderData.data.linkage.common.validateParams
		params.linkage.signature = orderData.data.linkage.signature

		var data = {
			"params":params,
			"ua":"098#E1hvtpvWvKgvjQCkvvvvvjiPP259gjECPsFwQj1VPmP91jE2Rs5v6jrPRFSwQjT5vpvhvvmv99GCvvLLQc4HKphv8vvvvvCvpvvvvvmvL6CvmUWvvUCPphvU9Qvv9hYvpvk2vvmvL6CvmUREvpvHnvmv9jeivpvUvvmvbY6k0363vpUokPo4bRmZMOzTQW5ETiMQzKL829Ni3JcbTIZjAJJxqOFqlP6EtI29yKod2Pqr5YTM/awm2Kc4qUbulqMWSNkq5dKR6+Tr5qsYKt622K0vQ8o69wMR+Om13fTEAr8t5/AZ0f9W//77rEVqFrjwdX/GFdS4C9Pd3RoqMIIR/JK8/g/+5+MWKi/qFddqSGAYFqK8dEqPsbuNKgTq/bMWSO/q0K7WMp5DKST8M4U8/MuftWVqF+sWdX/GFGFrsW/Tkb5eKJf8/fF5KJ4ttrPLdX/Gkbev6q/TFq0n+UeMsb0PKtTqFrjJdrzkDGmylG0GFdkRKUSp6fKnSU7Sz9Mqtib9DP2nAG2+3N/7/iWEmWKyqOk69Ws8KOkg5S0EvMTlQRJ2qUI2mR0EdYdT5QsFqnVq9q0Hs+0qkbV2dG6PhG4iM+PYFQMMdSj9FSeW2S5d9/k4/iGRlM0EqG81D1bjgXc+9JmhlG/YkfmC+OcB6fkvKEq1zvG2qnVq9q0Hs+0qkbV2gXZRmSSCiI5rkvqqgO05AuNLCMSyk8NhtISEvMAXtWd3DpNXgO769fAU6GKQ3bTEKOjbQPAfldz+DawhgERS0fohQvqGDJzpMEb/M/TjtgbrAQ68taFI0dkW6wkMkbevKUsPARuHMO5ekMsq/rLd5S272pcYrRzpKIqWAqTPKIA/Fa2P+XNrkRu22pP5kfL7MUZEvpCWvHBBvvw6afFEDLKAWyVxI8oQ+ul68NoxfwoKHAiHife9kCVZfvDrsjc6hfINPfmBYE7reB6ksWFy6C0XwyLp+neYr2E9ZRAn3w0AhvhCvvOvCvvvphvtvpvhvvvvvU6CvChvC2+C9UvvvvvvvvCvpv2B4FyCvvpvvvvv3QhvCvvUvvv="
		}
		console.log(data.params)
		return data
		//42242819641126156x
		//var data = `{"params":"{\"hierarchy\":\"{\\\"structure\\\":{\\\"${confirmOrder}\\\":[\\\"address_1\\\",\\\"${order_}\\\",\\\"tbGold_1\\\",\\\"agencyPay_1\\\",\\\"anonymous_1\\\",\\\"realPay_1\\\",\\\"submitOrder_1\\\",\\\"ncCheckCode_ncCheckCode1\\\"],\\\"${order_}\\\":[\\\"${orderInfo_}\\\",\\\"${item_}\\\",\\\"${deliveryMethod_}\\\",\\\"${service_yfx_}@1\\\",\\\"${service_yfx_}@2\\\",\\\"${memo_}\\\",\\\"${order_}\\\"],\\\"${item_}\\\":[\\\"${itemInfo_}\\\",\\\"${quantity_}\\\",\\\"${promotion_}\\\",\\\"${itemPay_}\\\",\\\"${service_gybb_}@1\\\",\\\"${service_bwy_}@1\\\"]}}\",\"data\":\"{\\\"${promotion_}\\\":{\\\"submit\\\":${tbGold_1.hidden.empty},\\\"hidden\\\":{\\\"empty\\\":${tbGold_1.hidden.empty},\\\"extensionMap\\\":{\\\"promotionType\\\":\\\"item\\\",\\\"outId\\\":\\\"${itemID}\\\",\\\"orderOutId\\\":\\\"${itemID}\\\"},\\\"notEmpty\\\":${tbGold_1.hidden.notEmpty}},\\\"id\\\":\\\"${itemID}\\\",\\\"tag\\\":\\\"promotion\\\",\\\"type\\\":\\\"select\\\",\\\"fields\\\":{\\\"selectedId\\\":\\\"${selectedId}\\\",\\\"options\\\":[{\\\"name\\\":\\\"${selected_name}\\\",\\\"optionId\\\":\\\"${selectedId}\\\"}],\\\"disabled\\\":false,\\\"title\\\":\\\"${title}\\\"},\\\"btn\\\":\\\"select\\\",\\\"status\\\":\\\"hidden\\\",\\\"_request\\\":true},\\\"tbGold_1\\\":{\\\"submit\\\":${tbGold_1.hidden.empty},\\\"hidden\\\":{\\\"empty\\\":${tbGold_1.hidden.empty},\\\"extensionMap\\\":{\\\"sellerAvailablePoint\\\":\\\"${tbGold_1.hidden.extensionMap.sellerAvailablePoint}\\\",\\\"totalPoint\\\":\\\"${tbGold_1.hidden.extensionMap.totalPoint}\\\",\\\"usePoint\\\":\\\"${tbGold_1.hidden.extensionMap.usePoint}\\\",\\\"rate\\\":\\\"${tbGold_1.hidden.extensionMap.rate}\\\",\\\"availablePoint\\\":\\\"${tbGold_1.hidden.extensionMap.availablePoint}\\\"},\\\"notEmpty\\\":${tbGold_1.hidden.notEmpty}},\\\"id\\\":\\\"${tbGold_1.id}\\\",\\\"tag\\\":\\\"${tbGold_1.tag}\\\",\\\"type\\\":\\\"${tbGold_1.type}\\\",\\\"fields\\\":{\\\"name\\\":\\\"${tbGold_1.fields.name}\\\",\\\"checked\\\":${tbGold_1.fields.checked},\\\"value\\\":\\\"${tbGold_1.fields.value}\\\"},\\\"btn\\\":\\\"toggle\\\",\\\"_request\\\":true},\\\"${service_gybb_}@1\\\":{\\\"ref\\\":\\\"${orderData.data.data[service_bwy_+"@1"].ref}\\\",\\\"submit\\\":${tbGold_1.hidden.empty},\\\"hidden\\\":{\\\"empty\\\":${tbGold_1.hidden.empty},\\\"extensionMap\\\":{\\\"serviceType\\\":\\\"${orderData.data.data[service_bwy_+"@1"].hidden.extensionMap.serviceType}\\\",\\\"outId\\\":\\\"${itemID}\\\",\\\"id\\\":\\\"${service_bwy_}\\\"},\\\"notEmpty\\\":${tbGold_1.hidden.notEmpty}},\\\"bizName\\\":\\\"ServiceMultiSelect\\\",\\\"id\\\":\\\"${orderData.data.data[service_bwy_+"@1"].id}\\\",\\\"tag\\\":\\\"${orderData.data.data[service_bwy_+"@1"].tag}\\\",\\\"type\\\":\\\"${orderData.data.data[service_bwy_+"@1"].type}\\\",\\\"fields\\\":{\\\"selectedIds\\\":[\\\"${orderData.data.data[service_bwy_+"@1"].fields.groups[0].options[0].optionId}\\\"],\\\"groups\\\":[{\\\"options\\\":[{\\\"name\\\":\\\"${orderData.data.data[service_bwy_+"@1"].fields.groups[0].options[0].name}\\\",\\\"optionId\\\":\\\"${orderData.data.data[service_bwy_+"@1"].fields.groups[0].options[0].optionId}\\\",\\\"value\\\":\\\"${orderData.data.data[service_bwy_+"@1"].fields.groups[0].options[0].value}\\\"}],\\\"required\\\":${orderData.data.data[service_bwy_+"@1"].fields.groups[0].required}}],\\\"title\\\":\\\"${orderData.data.data[service_bwy_+"@1"].fields.title}\\\"},\\\"btn\\\":\\\"multiSelect\\\",\\\"_request\\\":true},\\\"${deliveryMethod_}\\\":{\\\"ref\\\":\\\"${deliveryMethod.ref}\\\",\\\"submit\\\":${deliveryMethod.submit},\\\"hidden\\\":{\\\"empty\\\":${deliveryMethod.hidden.empty},\\\"extensionMap\\\":{\\\"deliveryId\\\":\\\"${orderID}\\\"},\\\"notEmpty\\\":${deliveryMethod.hidden.notEmpty}},\\\"id\\\":\\\"${orderID}\\\",\\\"tag\\\":\\\"${deliveryMethod.tag}\\\",\\\"type\\\":\\\"${deliveryMethod.type}\\\",\\\"fields\\\":{\\\"secondOption\\\":${deliveryMethod.fields.secondOption},\\\"selectedId\\\":\\\"${deliveryMethod.fields.selectedId}\\\",\\\"options\\\":[{\\\"extra\\\":\\\"\\\",\\\"fare\\\":\\\"${deliveryMethod.fields.options[0].fare}\\\",\\\"fareCent\\\":${deliveryMethod.fields.options[0].fareCent},\\\"hasOption\\\":${deliveryMethod.fields.options[0].hasOption},\\\"id\\\":\\\"${deliveryMethod.fields.options[0].id}\\\",\\\"message\\\":\\\"${deliveryMethod.fields.options[0].message}\\\",\\\"serviceType\\\":\\\"${deliveryMethod.fields.options[0].serviceType}\\\",\\\"signText\\\":\\\"\\\"}],\\\"title\\\":\\\"${deliveryMethod.fields.title}\\\"},\\\"_request\\\":true},\\\"ncCheckCode_ncCheckCode1\\\":{\\\"ref\\\":\\\"${ncCheckCode_ncCheckCode1.ref}\\\",\\\"submit\\\":${ncCheckCode_ncCheckCode1.submit},\\\"id\\\":\\\"${ncCheckCode_ncCheckCode1.id}\\\",\\\"tag\\\":\\\"${ncCheckCode_ncCheckCode1.tag}\\\",\\\"type\\\":\\\"${ncCheckCode_ncCheckCode1.type}\\\",\\\"fields\\\":{\\\"nc\\\":\\\"${ncCheckCode_ncCheckCode1.fields.nc}\\\",\\\"token\\\":\\\"${ncCheckCode_ncCheckCode1.fields.token}\\\"}},\\\"submitOrder_1\\\":{\\\"submit\\\":${submitOrder_1.submit},\\\"id\\\":\\\"${submitOrder_1.id}\\\",\\\"tag\\\":\\\"${submitOrder_1.tag}\\\",\\\"type\\\":\\\"${submitOrder_1.type}\\\",\\\"fields\\\":{\\\"submitTitle\\\":\\\"${submitOrder_1.fields.submitTitle}\\\",\\\"isTmallHKPresellSelf\\\":${submitOrder_1.fields.isTmallHKPresellSelf},\\\"isTmallHKPresellOrder\\\":${submitOrder_1.fields.isTmallHKPresellOrder}},\\\"status\\\":\\\"${submitOrder_1.status}\\\",\\\"_realPay\\\":{\\\"id\\\":\\\"${realPay.id}\\\",\\\"tag\\\":\\\"${realPay.tag}\\\",\\\"type\\\":\\\"${realPay.type}\\\",\\\"fields\\\":{\\\"quantity\\\":${realPay.fields.quantity},\\\"price\\\":\\\"${realPay.fields.price}\\\",\\\"mallTotalPrice\\\":${realPay.fields.mallTotalPrice},\\\"originPrice\\\":\\\"${realPay.fields.originPrice}\\\",\\\"microPurchaseTotalPrice\\\":${realPay.fields.microPurchaseTotalPrice},\\\"tmallHkTotalPrice\\\":${realPay.fields.tmallHkTotalPrice},\\\"currencySymbol\\\":\\\"￥\\\"}},\\\"_address\\\":{\\\"ref\\\":\\\"${address.ref}\\\",\\\"id\\\":\\\"${address.id}\\\",\\\"tag\\\":\\\"${address.tag}\\\",\\\"type\\\":\\\"${address.type}\\\",\\\"fields\\\":{\\\"tempAddress\\\":${address.fields.tempAddress},\\\"useMDZT\\\":${address.fields.useMDZT},\\\"h5SupportIframe\\\":${address.fields.h5SupportIframe},\\\"useStation\\\":${address.fields.useStation},\\\"selectedId\\\":${address.fields.selectedId},\\\"mdSellerId\\\":\\\"${address.fields.mdSellerId}\\\",\\\"agencyReceive\\\":${address.fields.agencyReceive},\\\"agencyReceiveH5Url\\\":\\\"${address.fields.agencyReceiveH5Url}\\\",\\\"options\\\":[{\\\"addressDetail\\\":\\\"${addressDetail}\\\",\\\"agencyReceiveDesc\\\":\\\"${address.fields.options[0].agencyReceiveDesc}\\\",\\\"areaName\\\":\\\"${areaName}\\\",\\\"cityName\\\":\\\"${cityName}\\\",\\\"countryName\\\":\\\"\\\",\\\"defaultAddress\\\":true,\\\"deliveryAddressId\\\":${deliveryAddressId},\\\"divisionCode\\\":\\\"${divisionCode}\\\",\\\"enableMDZT\\\":false,\\\"enableStation\\\":false,\\\"enforceUpdate4Address\\\":true,\\\"fullName\\\":\\\"${fullName}\\\",\\\"lgShopId\\\":0,\\\"mobile\\\":\\\"${mobile}\\\",\\\"needUpdate4Address\\\":false,\\\"postCode\\\":\\\"${postCode}\\\",\\\"provinceName\\\":\\\"${provinceName}\\\",\\\"stationId\\\":0,\\\"storeAddress\\\":true,\\\"townDivisionId\\\":${townDivisionId},\\\"townName\\\":\\\"${townName}\\\",\\\"updateAddressTip\\\":\\\"\\\"}],\\\"linkAddressId\\\":${address.fields.linkAddressId},\\\"supportFwd\\\":${address.fields.supportFwd},\\\"info\\\":{\\\"value\\\":\\\"${deliveryAddressId}\\\"},\\\"url\\\":\\\"//buy.m.tmall.com/order/addressList.htm?enableStation=true&requestStationUrl=%2F%2Fstationpicker-i56.m.taobao.com%2Finland%2FshowStationInPhone.htm&_input_charset=utf8&hidetoolbar=true&bridgeMessage=true\\\",\\\"title\\\":\\\"管理收货地址\\\"},\\\"_request\\\":true}},\\\"${memo_}\\\":{\\\"ref\\\":\\\"1f528f8\\\",\\\"submit\\\":${tbGold_1.hidden.empty},\\\"bizName\\\":\\\"memo\\\",\\\"id\\\":\\\"${orderID}\\\",\\\"tag\\\":\\\"memo\\\",\\\"type\\\":\\\"input\\\",\\\"fields\\\":{\\\"name\\\":\\\"给卖家留言：\\\",\\\"placeholder\\\":\\\"选填:对本次交易的说明(建议填写已和卖家协商一致的内容)\\\",\\\"title\\\":\\\"买家留言：\\\",\\\"value\\\":\\\"\\\"},\\\"btn\\\":\\\"input\\\"},\\\"anonymous_1\\\":{\\\"submit\\\":${anonymous.submit},\\\"id\\\":\\\"${anonymous.id}\\\",\\\"tag\\\":\\\"${anonymous.tag}\\\",\\\"type\\\":\\\"${anonymous.type}\\\",\\\"fields\\\":{\\\"name\\\":\\\"匿名购买\\\",\\\"checked\\\":true},\\\"btn\\\":\\\"toggle\\\"},\\\"agencyPay_1\\\":{\\\"submit\\\":${agencyPay.submit},\\\"id\\\":\\\"${agencyPay.id}\\\",\\\"tag\\\":\\\"${agencyPay.tag}\\\",\\\"type\\\":\\\"${agencyPay.type}\\\",\\\"fields\\\":{\\\"name\\\":\\\"${agencyPay.fields.name}\\\",\\\"checked\\\":${agencyPay.fields.checked}},\\\"btn\\\":\\\"toggle\\\",\\\"_request\\\":true},\\\"${service_bwy_}@1\\\":{\\\"ref\\\":\\\"${service_bwy.ref}\\\",\\\"submit\\\":${service_bwy.submit},\\\"hidden\\\":{\\\"empty\\\":${service_bwy.hidden.empty},\\\"extensionMap\\\":{\\\"serviceType\\\":\\\"${service_bwy.hidden.extensionMap.serviceType}\\\",\\\"outId\\\":\\\"${service_bwy.hidden.extensionMap.outId}\\\",\\\"id\\\":\\\"${service_bwy.hidden.extensionMap.id}\\\"},\\\"notEmpty\\\":${service_bwy.hidden.notEmpty}},\\\"bizName\\\":\\\"ServiceMultiSelect\\\",\\\"id\\\":\\\"${service_bwy.id}\\\",\\\"tag\\\":\\\"${service_bwy.tag}\\\",\\\"type\\\":\\\"${service_bwy.type}\\\",\\\"fields\\\":{\\\"selectedIds\\\":[\\\"${service_bwy.fields.groups[0].optionId}\\\"],\\\"groups\\\":[{\\\"options\\\":[{\\\"name\\\":\\\"${service_bwy.fields.groups[0].name}\\\",\\\"optionId\\\":\\\"${service_bwy.fields.groups[0].optionId}\\\",\\\"value\\\":\\\"${service_bwy.fields.groups[0].value}\\\"}],\\\"required\\\":true}],\\\"title\\\":\\\"保无忧\\\"},\\\"btn\\\":\\\"multiSelect\\\",\\\"_request\\\":true},\\\"${service_yfx_}@1\\\":{\\\"ref\\\":\\\"${service_yfx.ref}\\\",\\\"submit\\\":${service_yfx.submit},\\\"hidden\\\":{\\\"empty\\\":${service_yfx.hidden.empty},\\\"extensionMap\\\":{\\\"serviceType\\\":\\\"${service_yfx.hidden.extensionMap.serviceType}\\\",\\\"outId\\\":\\\"${orderID}\\\",\\\"id\\\":\\\"${service_yfx.hidden.extensionMap.id}\\\"},\\\"notEmpty\\\":${service_yfx.hidden.notEmpty}},\\\"bizName\\\":\\\"ServiceMultiSelect\\\",\\\"id\\\":\\\"${service_yfx.id}\\\",\\\"tag\\\":\\\"${service_yfx.tag}\\\",\\\"type\\\":\\\"${service_yfx.type}\\\",\\\"fields\\\":{\\\"selectedIds\\\":[],\\\"groups\\\":[{\\\"options\\\":[{\\\"name\\\":\\\"${service_yfx.fields.groups[0].options[0].name}\\\",\\\"optionId\\\":\\\"${service_yfx.fields.groups[0].options[0].optionId}\\\",\\\"value\\\":\\\"${service_yfx.fields.groups[0].options[0].value}\\\"}],\\\"required\\\":false}],\\\"title\\\":\\\"运费险\\\"},\\\"btn\\\":\\\"multiSelect\\\",\\\"_request\\\":true}}\",\"linkage\":\"{\\\"common\\\":{\\\"compress\\\":${linkage.compress},\\\"submitParams\\\":\\\"${linkage.submitParams}\\\",\\\"validateParams\\\":\\\"${linkage.validateParams}\\\"},\\\"signature\\\":\\\"${signature}\\\"}\"}","ua":"098#E1hv8vvWvIUvUpCkvvvvvjiPP259QjnHRFSW6jrCPmPW0jrnPLdwsj3Un2qO6jnHPsyCvvBvpvvvFphvhZCCspFyvhCvphvvvvvvpCwaiQhvChCvCCptvpvhphvvvvGCvvLLQc4HKphv8hCvvvvvvhCvphvhJ9vvpuEvpvBTvvCmIyCvCjIvvh8kphvhJ9vvpu8ivpvUphvhJwQOyYkEvpvHLZ6hCEQ3vpVekfVEgQURMUsqQ44Ev+/eATfoTUNG//NETgLyAMzq/IT5APKNMQAesSABtaInCN06qnVTFYbRKgTQ3dV26Y8/ePeWTUORvMAHrOoS19qMt4s+6fAEsr8/3qTj+Uj864qWMOLjuCjcMUqYe8M8hKdie/eh/+JMsb08AK/qF+sW/gSDQbKRsWAr5q0RARzWsquUTaKTk9sUKXJtF4Jo6WkMkJuWSUqnGWPQS/k/eGsPKIkr5qARzf/TFquUgUoMsb0PKi/qF+zfdX/YFqKRsGTQ3dVj+U5bAd/4KI/qkfMWSOMbqdKRsWseD40NSUqWSquPKMu+5+MWKIKr5qARsb/TFqdtdEqPsbdfTIFG5QcMMneTFqKESGAYF+5+KgqWsb0OKI/qkfMWSOdWTSu8CYNi0PbCgWqBM447i+//zpURMUAA54fRsGFDAMAatILqm4fHtgue11h8iGL5DJs2MSMG5JVniGGRCqNh/E76lwsnKWueDTJ7s+kYkT4BSY6vsquEzi7TFNjBd+N+6fAEsr8/3qTj+Uj864qv/G4g5SSGTiMd9RAOlGGEvpCWp0Sxv8WfJHp0747BhC3qVmHoDOmfjLEcnhjEKBmAVA9aUExreut+mB+uaNoAdcpifvDrt8TJV6X+m7z9dit3CC+uafvA5kx/JmcG0vhCvvXvppvvvvmjvpvhphUvvv=="}`

	}
}