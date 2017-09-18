<template>
	<div>
		<input type="text" v-model="username" name="">
		<input type="password" v-model="password" name="">
		<a href="javascript:;" @click="getLoginToken()">登录账号</a>
		<a href="javascript:;" @click="test()">测试加密</a>
	</div>
	
</template>

<script type="text/javascript">
	var superagent = require("superagent");
	var async = require("async");
	var path = require("path");
	import md5 from 'js-md5'
	export default{
		data(){
			return {
				username:"hdd工作室",
				password:"HEdada0313",
				enPWD:"",
  				cookies:"",
  				LoginToken:{}
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
			queryOrders(){
				// var sign = this.getSign();
				// var url = "http://api.m.taobao.com/h5/mtop.order.queryboughtlist/3.0/?appKey=12574478&t=" + sign.time + "&sign="+ sign.sign +"&api=mtop.order.queryBoughtList&v=3.0&ttid=%23%23h5&ecode=1&AntiFlood=true&AntiCreep=true&LoginRequest=true&type=jsonp&dataType=jsonp&callback=mtopjsonp1&data=%7B%22spm%22%3A%22a2141.7756461.2.6%22%2C%22page%22%3A1%2C%22tabCode%22%3A%22all%22%2C%22appVersion%22%3A%221.0%22%2C%22appName%22%3A%22tborder%22%7D"
				// var header = {headers:{
				// 		"cookie": this.cookies
				// 	}
				// }

				// this.$http.get(url,header).then( response => {
				// 	console.log(response)
				// }).catch(error => {
				// 	console.log(error)
				// })
				
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
					.set({
						"user-agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
						"referer":"https://login.m.taobao.com/login.htm?redirectURL=http%3A%2F%2Fbuyertrade.taobao.com%2Ftrade%2Fitemlist%2Flist_bought_items.htm%3Fspm%3Da21bo.50862.1997525045.2.28689e73DdN4AI",
						"Content-Type":"application/x-www-form-urlencoded"
					})
					.send("_tb_token_="+this.LoginToken._tb_token_+"&action=LoginAction&event_submit_do_login=1&TPL_redirect_url=&loginFrom=WAP_TAOBAO&style=&bind_token=&assets_css=&assets_js=&ssottid=&nv=false&otherLoginUrl=https%3A%2F%2Flogin.m.taobao.com%2Fmsg_login.htm&TPL_timestamp=&TPL_password2="+pwd+"&page=loginV3&ncoSig=&ncoSessionid=&ncoToken="+this.LoginToken.ncoToken+"&TPL_username="+encodeURI(this.username))
					.end((error, result)=>{
						if(!error){
							this.hdndleCookie(result.headers['set-cookie'])
							result.redirects.length >= 1 ? this.redirects(result.redirects) : console.log("无需跳转"+result.redirects)
						}else{
							console.log(error,result)
							alert("获取失败")
						}
						
					})
			},
			redirects(redUrl){
				//安全监测跳转
				async.waterfall([
					function(){
						superagent.get(redUrl[0])
							.end((error, result) => {
								console.log(result)
							})
							
					}
				])
			}
		}
	}
</script>

