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
	export default {
		data() {
			return {
				oldPwd:'',
				pwd:'',
				newPwd:''
			}
		},
		methods: {
			_doChangePwd:function(){
				let _string = this.java110Util.string;
				if(_string.isNull(this.oldPwd)){
					uni.showToast({
						icon:'none',
						title:'密码不能为空'
					});
					return;
				}
				
				if(_string.isNull(this.pwd)){
					uni.showToast({
						icon:'none',
						title:'新密码不能为空'
					});
					return;
				}
				
				if(_string.isNull(this.newPwd)){
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
				
				
			}
			
		}
	}
</script>

<style>

</style>
