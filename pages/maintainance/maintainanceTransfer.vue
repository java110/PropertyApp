<template>
	<view>
		<view style="padding-bottom: 100rpx;">
			<view class="cu-bar bg-white search ">
				<view class="action">
					<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_openChooseStaffModel()">选择员工</button>
				</view>
			</view>
			<view class="cu-form-group margin-top" v-if="staffId">
				<view class="title">员工</view>
				<input v-model="staffName" disabled="disabled"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">流转说明</view>
				<input v-model="transferDesc" placeholder="请输入流转说明"></input>
			</view>
		</view>
		<view class="footer-step-fixed">
			<view class="step-item" @click="$preventClick(save)">提交</view>
		</view>
		<select-staff @getStaffInfo="_getStaffInfo" ref="selectstaff"></select-staff>
	</view>
</template>

<script>
	import {
		UpdateMaintainanceTask
	} from '../../api/maintainance/maintainance.js'
	// 防止多次点击
	import {preventClick} from '../../lib/java110/utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	// 组件
	import selectStaff from '../../components/select-staff/select-staff.vue'
	
	export default {
		data() {
			return {
				onoff: true,
				transferDesc: '',
				staffId: '',
				staffName: '',
				communityId: '',
				planId: '',
				planName: '',
				originalPlanUserId: '',
				originalPlanUserName: '',
				planEndTime: '',
				planInsTime: '',
				planUserId: '',
				planUserName: '',
				signType: '',
				signTypeName: '',
				state: '',
				stateName: '',
				statusCd: '',
				taskId: '',
				timeStr: '',
				taskType: 2000,
			}
		},
		components:{
			selectStaff
		},
		onLoad(_taskInfo) {
			this.java110Context.onLoad();
			_taskInfo = JSON.parse(_taskInfo.task);
			this.communityId = _taskInfo.communityId;
			this.planId = _taskInfo.planId;
			this.planName = _taskInfo.planName;
			this.originalPlanUserId = _taskInfo.originalPlanUserId;
			this.originalPlanUserName = _taskInfo.originalPlanUserName;
			this.planEndTime = _taskInfo.planEndTime;
			this.planInsTime = _taskInfo.planInsTime;
			this.planUserId = _taskInfo.planUserId;
			this.planUserName = _taskInfo.planUserName;
			this.signType = _taskInfo.signType;
			this.signTypeName = _taskInfo.signTypeName;
			this.state = _taskInfo.state;
			this.stateName = _taskInfo.stateName;
			this.statusCd = _taskInfo.statusCd;
			this.taskId = _taskInfo.taskId;
			this.timeStr = _taskInfo.timeStr;
		},
		methods: {
			
			_openChooseStaffModel: function(){
				this.$refs.selectstaff.switchShow();
			},
			
			_getStaffInfo: function(_staffInfo){
				this.staffId = _staffInfo.userId;
				this.staffName = _staffInfo.userName;
			},
			
			save: function(){
				let _that = this;
				// 验证
				let msg = '';
				if(this.transferDesc == ''){
					msg = '请输入说明';
				}
				if(this.staffId == ''){
					msg = '请选择员工';
				}
				if(this.staffId == this.java110Context.getUserInfo().userId){
					msg = '不能流转给自己';
				}
				if(msg != ''){
					_that.onoff = true;
					this._showToast(msg);
					return;
				}
				// 提交
				let _data = {
					transferDesc: this.transferDesc,
					staffId: this.staffId,
					staffName: this.staffName,
					communityId: this.communityId,
					planId: this.planId,
					planName: this.planName,
					originalPlanUserId: this.originalPlanUserId,
					originalPlanUserName: this.originalPlanUserName,
					planEndTime: this.planEndTime,
					planInsTime: this.planInsTime,
					planUserId: this.planUserId,
					planUserName: this.planUserName,
					signType: this.signType,
					signTypeName: this.signTypeName,
					state: this.state,
					stateName: this.stateName,
					statusCd: this.statusCd,
					taskId: this.taskId,
					taskType: this.taskType,
				};
				UpdateMaintainanceTask(this, _data)
				.then(function(res) {
					if (res.code == 0) {
						uni.navigateBack({
							delta:1
						})
						return;
					}
				});
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
	.footer-step-fixed{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		-moz-box-shadow: 0px -5px 5px #ccc;
		box-shadow: 0px -5px 5px #ccc;
		background-color: #fff;
	}
	.step-item{
		width: 100%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
	}
	.cu-list.menu-avatar>.cu-item .content-left {
		left: 30upx;
	}

	.cu-list+.cu-list {
		margin-top: 20upx;
	}
	
	.flex-item{
		display: flex;
		flex-direction: row;
	}
	.w50{
		width: 50%;
	}
	.flex label, .flex-item label{
		width: 100rpx;
	}
	.use-number{
		width: 200rpx;
		border-radius: 15rpx;
	}
	.remark{
		width: 80%;
		border-radius: 15rpx;
	}
	.item-remove{
		border-radius: 15rpx;
		padding: 2rpx 10rpx;
	}
</style>
