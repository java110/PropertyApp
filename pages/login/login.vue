<template>
	<view>
		<view class="login-nav flex justify-center align-center">
			<text>
				请登录
			</text>
		</view>
		<view class="flex justify-center logo">
			<view class="cu-avatar xl round  lage-avatar" style="background-image:url('/static/logo.png');"></view>
		</view>
		<view class="margin-top">
			<view class="cu-form-group margin-top">
				<view class="title">用户名</view>
				<input placeholder="请输入用户名" name="input" v-model="username"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">密码</view>
				<input placeholder="请输入密码" type="password" name="input" v-model="password"></input>
			</view>
		</view>

		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green margin-tb-sm lg" @tap="doLogin()">登录</button>
		</view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			}
		},
		onLoad() {
			uni.hideTabBar({
				animation: false
			});
			
			
		},
		methods: {
			
			doLogin:function(){
				if(this.username == ''){
					uni.showToast({
						icon:none,
						title:"用户名不能为空"
					});
					return ;
				}
				
				if(this.password == ''){
					uni.showToast({
						icon:none,
						title:"密码不能为空"
					});
					return ;
				}
				
				let userInfo = {
					username:this.username,
					password:this.password
				}
				
				uni.request({
				    url: this.java110Constant.url.loginUrl,
				    header: this.java110Context.getHeaders(),
				    data: userInfo,
				    success: function (res) {
				      console.log('login success');
				      res = res.data;
					  
					  if(res.statusCode != 200){
						  uni.showToast({
						    title: res.data
						  });
						 return;
					  }
					  let _userInfo = this.java110Util.dec.desEncrypt(JSON.stringify(userInfo));
					  uni.setStorageSync(constant.mapping.USER_INFO,_userInfo);
					  uni.redirectTo({
					  	url:"/page/index/index"
					  });
				    },
				    fail: function (error) {
				      // 调用服务端登录接口失败
				      uni.showToast({
				        title: '调用接口失败'
				      });
				      console.log(error);
				    }
				  });
				
			}

		}
	}
</script>

<style>
	.logo{
		margin-top: 200upx;
		margin-bottom: 100upx;
	}
	.logo view{
		height: 200upx;
		width: 200upx;
	}
	.login-nav{
		background-color: #00AA00;
		height: 90upx;
	}
	.login-nav text{
		color: #FFFFFF;
		font-size: 30upx;
	}

</style>
