<template>
	<view>
		<form>
			
			<view class="cu-form-group margin-top">
				<view class="title">密码</view>
				<input placeholder="请输入密码" type="password" name="input" v-model="oldPwd"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">新密码</view>
				<input placeholder="请输入新密码" type="password" name="input" v-model="pwd"></input>
			</view>
			<view class="cu-form-group ">
				<view class="title">确认密码</view>
				<input placeholder="请输入确认密码" type="password" name="input" v-model="newPwd"></input>
			</view>
		</form>
		
		<view class="padding flex flex-direction">
			<button class="cu-btn bg-green lg" @tap="_doChangePwd()">提交</button>
		</view>
		
	</view>
</template>

<script>
	import {isNull} from '../../lib/java110/utils/StringUtil.js'
	import url from '../../constant/url.js'
	export default {
		data() {
			return {
				oldPwd:'',
				pwd:'',
				newPwd:''
			}
		},
		onLoad() {
			this.java110Context.onLoad();
			
		},
		methods: {
			_doChangePwd:function(){
				if(isNull(this.oldPwd)){
					uni.showToast({
						icon:'none',
						title:'密码不能为空'
					});
					return;
				}
				
				if(isNull(this.pwd)){
					uni.showToast({
						icon:'none',
						title:'新密码不能为空'
					});
					return;
				}
				
				if(isNull(this.newPwd)){
					uni.showToast({
						icon:'none',
						title:'确认密码不能为空'
					});
					return;
				}
				
				if(this.newPwd != this.pwd){
					uni.showToast({
						icon:'none',
						title:'确认密码和新密码不一致'
					});
					return;
				}
				
				let _userInfo = {
					userId: this.java110Context.getUserInfo().userId,
					oldPwd: this.oldPwd,
					newPwd: this.newPwd
				};
				
				this.java110Context.request({
					url: url.changeStaffPwd,
					header: this.java110Context.getHeaders(),
					method: "POST",
					data: _userInfo,
					success: function(res) {
						if(res.statusCode != 200){
							// uni.showToast({
							// 	icon:"none",
							// 	title: res.data
							// });
							uni.navigateTo({
								url:'/pages/login/login'
							})
							return ;
						}
						
						uni.navigateBack({
							delta:1
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

</style>
