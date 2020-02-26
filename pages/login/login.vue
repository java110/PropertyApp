<template>
	<view>
		<view class="login-nav flex justify-center align-center">
			<text>
				请登录
			</text>
		</view>
		<scroll-view :scroll-y="true">
			<view class="flex justify-center logo">
				<view class="cu-avatar xl round  lage-avatar logo-lage" :style="'background-image:url('+logoUrl+');'">
				</view>
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
		</scroll-view>



	</view>
</template>

<script>
	export default {
		data() {
			return {
				logoUrl: '',
				username: '',
				password: ''
			}
		},
		onLoad() {
			uni.hideTabBar({
				animation: false
			});

			this.logoUrl = this.java110Constant.url.baseUrl + 'logo.png';
			


		},
		methods: {

			doLogin: function() {
				let _that = this;
				if (this.username == '') {
					uni.showToast({
						icon: 'none',
						title: "用户名不能为空"
					});
					return;
				}

				if (this.password == '') {
					uni.showToast({
						icon: 'none',
						title: "密码不能为空"
					});
					return;
				}

				let userInfo = {
					username: this.username,
					password: this.password
				}

				uni.request({
					url: this.java110Constant.url.loginUrl,
					header: this.java110Context.getHeaders(),
					method: "POST",
					data: userInfo,
					success: function(res) {
						console.log('login success', res);
						if (res.statusCode != 200) {
							uni.showToast({
								title: res.data
							});
							return;
						}
						let data = res.data;

						let _tmpUserInfo = data.userInfo;
						_tmpUserInfo['password'] = _that.password;
						let _userInfo = _that.java110Util.des.desEncrypt(JSON.stringify(_tmpUserInfo));
						uni.setStorageSync(_that.java110Constant.mapping.USER_INFO, _userInfo);
						uni.setStorageSync(_that.java110Constant.mapping.TOKEN, data.token);
						let afterOneHourDate = _that.java110Util.date.addHour(new Date(), 1);
						wx.setStorageSync(_that.java110Constant.mapping.LOGIN_FLAG, {
							sessionKey: _tmpUserInfo.userName,
							expireTime: afterOneHourDate.getTime(),
							createTime: new Date().getTime()
						});
						
						uni.reLaunch({
							url: "/pages/index/index"
						});
						
					
					},
					fail: function(error) {
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
	.logo {
		margin-top: 160upx;
		margin-bottom: 140upx;
	}

	.logo .logo-lage {
		height: 180upx;
		width: 180upx;
	}

	.login-nav {
		background-color: #00AA00;
		height: 120upx;
	}

	.login-nav text {
		color: #FFFFFF;
		font-size: 30upx;
	}
</style>
