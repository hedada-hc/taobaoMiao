/**
 * 淘宝登录模块
 * 2017年10月1日12:42:01
*/
var su = require("superagent");
var request = require("request");
import rsa from './rsa' //淘宝rsa密码算法
export default{
	passwordRSA(password,J_Exponent,J_Module){
		//登录密码rsa算法
        return rsa.passwordRSAs(password,J_Module,J_Exponent);
    },
    handleCookie(objCookie,){
    	var tmp = ""
    	for(var index in objCookie){
    		var sp = objCookie[index].split(";")[0];
    		var name = sp.split("=")[0];
    		if(index == objCookie.length - 1){
    			tmp += new RegExp(`${name}=.*?;`,'g').test(tmp) ? tmp.replace(new RegExp(`${name}=[\w_?\.-?]+`,"g"),sp) : sp
    		}else{
    			tmp += new RegExp(`${name}=.*?;`,'g').test(tmp) ? tmp.replace(new RegExp(`${name}=[\w_?\.-?]+`,"g"),sp + "; ") : sp + "; "
    		}
    	}
    	return tmp
    },
    getFormInput(cb){
    	var url = "https://login.m.taobao.com/login.htm?_input_charset=utf-8";
    	request.get({
    		url:url
    	},(error, response, body)=>{
    		var json = {};
    		json._tb_token_ = /name='_tb_token_'\stype='hidden'\svalue='([\w]+)'>/.exec(body)[1];
    		json.action = /id="J_Mparam"\sname="action"\svalue="([a-zA-z]+)"\/>/.exec(body)[1];
    		json.event_submit_do_login = /name="event_submit_do_login"\svalue="([\d]+)"\/>/.exec(body)[1];
    		json.otherLoginUrl = /name="otherLoginUrl"\svalue="(.*?)"\/>/.exec(body)[1];
    		json.ncoToken = /name="ncoToken"\svalue="([\w]+)"\/>/.exec(body)[1];
    		json.J_Module = /id="J_Module"\svalue="([\w]+)"\/>/.exec(body)[1];
    		json.J_Exponent = /id="J_Exponent"\svalue="([\d]+)"\/>/.exec(body)[1];
    		cb(null,{input:json,cookie:this.handleCookie(response.headers['set-cookie'])})
    	})
    },
	loginPost(username,password){
		this.getFormInput((error, response)=>{
			var pwd = this.passwordRSA(password,response.input.J_Module,response.input.J_Exponent);
			//登录账号
			var url = "https://login.m.taobao.com/login.htm?_input_charset=utf-8";
			var send = {
				_tb_token_:response.input._tb_token_,
				action:response.input.action,
				event_submit_do_login:response.input.event_submit_do_login,
				TPL_redirect_url:"",
				loginFrom:"WAP_TAOBAO",
				style:"",
				bind_token:"",
				assets_css:"",
				assets_js:"",
				ssottid:"",
				nv:"false",
				otherLoginUrl:response.input.otherLoginUrl,
				TPL_timestamp:"",
				TPL_password2:pwd,
				page:"loginV3",
				ncoSig:"",
				ncoSessionid:"",
				ncoToken:response.input.ncoToken,
				TPL_username:username,
			};
			request.post({
				url:url,
				headers:{
					"Cookie":response.cookie
				},
				form:send
			},(error, response, body)=>{
				if(/login_check\.htm/.test(response.headers.location)){
					console.log(response)
					this.oginCheck({"url":response.headers.location,"cookie":this.handleCookie(response.headers['set-cookie'])});
				}else{
					console.log(response,body)
				}
			})
		})
	},
	oginCheck(location){
		console.log(location)
		request.get({
			url:location.url,
			headers:{
				"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1",
				"Cookie":location.cookie,
				"Referer":"https://login.m.taobao.com/login.htm"
			}
		},(error, response, body)=>{
			console.log(response,body)
		})
	}
}