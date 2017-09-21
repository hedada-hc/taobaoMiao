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
			"data":{}
		}
		var unData = this.un(orderData.data.linkage.request, orderData.data.linkage.input)
		console.log(unData)
		params.data.anonymous_1 = orderData.data.data.anonymous_1
		params.data.ncCheckCode_ncCheckCode1 = orderData.data.data.ncCheckCode_ncCheckCode1
		params.data.submitOrder_1 = orderData.data.data.submitOrder_1
		//获取其他数据
		//for(var i=0;i<orderData.linkage.)
		var data = {
			"params":{

			}
		}

		return data
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
	}
}
