<template>
	<div class="order">
		<div class="add_order">
			<div class="orderInfo">
				<span>商品链接：</span>
				<input type="text" v-model="url" placeholder="请输入商品链接" name="">
				<span class="xiadan">定时下单：</span>
				<input type="time" class="dingshi" v-model="time" placeholder="请输入商品链接" name="">
				<button @click="addOrder">添加任务</button>
			</div>
		</div>
		<ul>
			<li>
				<i></i>
				<img src="https://gd4.alicdn.com/imgextra/i4/374998801/TB2u6e9ebglyKJjSZFuXXaE6FXa_!!374998801.jpg_400x400.jpg">
				<a href="javascript:;" @click="open(556223312007)">韩国ulzzang原宿BF风夏季宽松情侣T恤男士韩版连帽短袖学生上衣潮</a>
				<span class="time">倒计时: <span>14小时20分钟</span></span>
				<span class="price">价格: <span>2,199</span></span>
				<span class="user">账号: <span>小小的太阳1161</span></span>
			</li>
		</ul>
	</div>
</template>

<script type="text/javascript">
	var shell = require("electron").shell;
	export default{
		data(){
			return {
				url:"https://item.taobao.com/item.htm?id=556223312007",
				time:null,
				task:[]

			}
		},
		created(){
			this.task.push({})
		},
		methods:{
			open(itemID){
				shell.openExternal('https://item.taobao.com/item.htm?id=' + itemID);
			},
			addOrder(){
				console.log(new Date(this.time))
			},
			getTime(time){
				var timeObj = time.split(":");
				var f = parseInt(timeObj[0]) == 0 ? 0 : parseInt(timeObj[0]) * 1000
				var m = parseInt(timeObj[1]) == 0 ? 0 : parseInt(timeObj[1]) * 1000

			}
		}
	}
</script>

<style type="text/css" lang="scss">
	.order{
		width: 1000px;
		margin:100px auto;
		.add_order{
			height: 100px;
			width: 1000px;
			margin: 0 auto;
			background: #ffffff;
			margin-bottom: 16px;
			box-shadow: 0px 0px 14px #d2d2d2;
			padding:20px;
			.orderInfo{
				margin-top: 30px;
				input{
					outline: none;
					border:none;
					width: 350px;
					height: 30px;
					border-radius:35px;
					box-shadow: 0px 0px 14px #eaeaea;
					padding:0 10px;
					font-size: 12px;
					text-align: center;
				}
				.dingshi{
					width: 150px;
				}
				span:nth-child(1){
					margin-left: 70px;
	    			margin-top: 36px;
				}
				span{
					color: #505050;
				}
				.xiadan{
					display: inline-block;
					margin-left: 20px;
				}
				button{
					outline: none;
					border:none;
					width: 100px;
					height: 35px;
					color: #ffffff;
					background:#ff4f3d;
					border-radius:35px;
					cursor: pointer;
					margin-left: 20px;
				}
			}
		}
		ul{
			li:hover{
				box-shadow: 0px 0px 14px #fbd0bf;
			}
			li{
				list-style-type: none;
				background: #ffffff;
				width: 490px;
				height: 75px;
				box-shadow: 0px 0px 14px #d2d2d2;
				i{
					float: left;
					display: inline-block;
					width: 6px;
					height: 75px;
					background:#fd6226;
					margin: 0px;
				}
				img{
					float: left;
					width: 75px;
					height: 75px;
				}
				a{
					width: 300px;
					display: inline-block;
					font-size: 14px;
					float: left;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
					padding: 14px 0px 10px 10px;
					color: #4c4c4c;
					text-decoration: none;
				}
				a:hover{
					color: #ff4f3d;
				}
				.time{
					display: inline-block;
					padding-left: 10px;
					width: 145px;
					font-size: 14px;
					color: #4c4c4c;
					span{
						font-weight: 500;
						color: #ff5a1e;
					}
				}
				.price{
					span{
						font-family: fantasy;
						color: #ff5a1e;
					}
				}
				.user{
					font-size: 12px;
					color: #a5a5a5;
					float: right;
    				margin-right: 10px;
    				margin-top: 3px;
				}
			}
		}
	}
</style>