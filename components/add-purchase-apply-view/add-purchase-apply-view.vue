<template>
	<view class="select-single-resource">
		<view>
			<view class="cu-form-group margin-top">
				<view class="title">使用人</view>
				<input v-model="endUserName" placeholder="请输入使用人"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">联系电话</view>
				<input v-model="endUserTel" placeholder="请输入联系电话"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">使用说明</view>
				<input v-model="description" placeholder="请输入使用说明"></input>
			</view>
		</view>
	</view>
</template>

<script>
	import stringUtil from '../../lib/java110/utils/StringUtil.js';

	export default {
		components: {
		},
		data() {
			return {
				endUserName: '',
				endUserTel: '',
				description: '',
			}
		},
		props: {
			
		},
		
		watch: {
			endUserName: 'dataOnChange',
			endUserTel: 'dataOnChange',
			description: 'dataOnChange',
		},
		
		created() {
		},
		
		computed: {
		},

		mounted() {
			
		},

		methods: {
			dataOnChange: function(){
				let applyUserInfo = {
					endUserName: '',
					endUserTel: '',
					description: ''
				};
				// 验证数据
				if(this.endUserName == ''){
					this._showToast('使用人必填');
					this.$emit('getApplyUserInfo', applyUserInfo);
					return;
				}
				if(!stringUtil.checkPhoneNumber(this.endUserTel)){
					this._showToast('手机号格式有误');
					this.$emit('getApplyUserInfo', applyUserInfo);
					return;
				}
				if(this.description == ''){
					this._showToast('使用说明必填');
					this.$emit('getApplyUserInfo', applyUserInfo);
					return;
				}
				applyUserInfo.endUserName = this.endUserName;
				applyUserInfo.endUserTel = this.endUserTel;
				applyUserInfo.description = this.description;
				this.$emit('getApplyUserInfo', applyUserInfo);
			},
			
			_showToast: function(title, icon = 'none'){
				uni.showToast({
					title:title,
					icon:icon
				})
			}
		}
	}
</script>

<style>
	
</style>
