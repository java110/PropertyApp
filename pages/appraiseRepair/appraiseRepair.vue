<template>
	<view>
		<view class="content bg-white margin-top">
			<view class="flex solid-bottom padding justify-start">
				<view class=" padding-sm radius">服务评分</view>
				<view class=" padding-sm  radius">
					<sx-rate :value="4" :fontSize="fontSize" :value.sync="rateSync" @change="onChange" />
				</view>
			</view>
			<view class="cu-form-group padding align-start">
				<view class="title padding-left-sm">回访建议</view>
				<textarea maxlength="200" v-model="remark" placeholder="请填写本地回访建议"></textarea>
			</view>

			<view class="flex flex-direction margin">
				<button class="cu-btn bg-green margin-tb-sm lg" @click="submitAppraiseRepair()">提交</button>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		appraiseRepair
	} from '../../api/repair/repair.js'
	import SxRate from '@/components/sx-rate'
	import {getUserInfo} from '../../lib/java110/api/Java110SessionApi.js'
	export default {
		data() {
			return {
				fontSize: '60upx',
				rateSync: 2,
				animation: true,
				curAppraise: 4,
				remark: '',
				repairId: '',
				repairType: '',
				repairChannel: '',
				publicArea: '',
				communityId: '',
				userId: '',
				userName: ''
			}
		},
		components: {
			SxRate
		},
		onLoad(options) {
			this.java110Context.onLoad();
			let _that = this;
			let _repairId = options.repairId;
			this.repairId = _repairId;
			this.repairType = options.repairType;
			this.repairChannel = options.repairChannel;
			this.publicArea = options.publicArea;
			this.communityId = options.communityId;
			let _userInfo = getUserInfo();
			_that.userId = _userInfo.userId;
			_that.userName = _userInfo.userName;

		},
		methods: {
			onChange(e) {
				this.curAppraise = e;
			},
			submitAppraiseRepair: function() {
				wx.showLoading();
				appraiseRepair(this).then(function(res){
					let _data = res.data;
					//成功情况下跳转
					if (_data.code == 0) {
						wx.showToast({
							title: '处理成功',
							icon: 'none',
							duration: 2000
						});
						wx.hideLoading();
						//console.log(e);
						uni.navigateBack({
							delta: 1
						});
						return;
					}
					wx.hideLoading();
					wx.showToast({
						title: _data.msg,
						icon: 'none',
						duration: 2000
					});
				})
			}
		}
	}
</script>

<style>
	.content {
		height: 100%;
	}
</style>
