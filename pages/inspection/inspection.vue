<template>
	<view>
		<view class="block__title flex justify-between">
			<view class="title">
			巡检任务
			</view>
			<view >
				<button class="cu-btn line-green round" @tap="_torReexamineInspection()">巡检补检</button>
			</view>
		</view>

		<view v-if="noData==false">
		<view v-for="(item,index) in tasks" :key="index" class="bg-white margin-bottom margin-right-xs radius margin-left-xs padding-top padding-left padding-right">
			<view class="flex padding-bottom-xs solid-bottom justify-between">
				<view>{{item.taskId}}</view>
				<view class="text-gray">{{item.stateName}}</view>
			</view>
			<view class="flex margin-top justify-between">
				<view class="text-gray">巡检计划</view>
				<view class="text-gray">{{item.inspectionPlanName}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">计划编码</view>
				<view class="text-gray">{{item.inspectionPlanId}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">巡检人</view>
				<view class="text-gray">{{item.planUserName}}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">巡检时间</view>
				<view class="text-gray">{{item.planInsTime }}</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="text-gray">巡检方式</view>
				<view class="text-gray">{{item.signTypeName}}</view>
			</view>
			<view class="solid-top flex justify-end margin-top padding-top-sm padding-bottom-sm">
				<button class="cu-btn sm line-blue margin-left" @click="_transferInspection(item)">流转</button>
				<button class="cu-btn sm bg-green margin-left" @click="_startInspection(item)">我要巡检</button>
			</view>
		</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	import dateUtil from '../../lib/java110/utils/date.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	import url from '../../constant/url.js'
	export default {
		data() {
			return {
				tasks: [],
				communityId: '',
				userId: '',
				userName: '',
				noData:false
			}
		},
		components: {
			noDataPage
		},
		onLoad: function() {
			this.java110Context.onLoad();
			this.communityId = getCurrentCommunity().communityId;
			let _userInfo = this.java110Context.getUserInfo();
			this.userName = _userInfo.userName;
			this.userId = _userInfo.userId;
			this._queryInstpectionTasks();
		},
		
		onShow: function(){
			if(this.userId && this.communityId){
				this._queryInstpectionTasks();
			}
		},
		methods: {
			_startInspection:function(_item){
				if(dateUtil.compareDate(_item.planInsTime.replace(/-/g, '/'), dateUtil.getCurrentDateTime().replace(/-/g, '/'))){
					uni.showToast({
						title: "尚未开始",
						icon: "none"
					});
					return;
				}
				console.log('开始巡检',_item);
				uni.navigateTo({
					url:'/pages/excuteInspection/excuteInspection?taskId='+_item.taskId+'&inspectionPlanName='+_item.inspectionPlanName
				});
			},
			_queryInstpectionTasks: function() {
				let _that = this;

				_that.java110Context.request({
					header: _that.java110Context.getHeaders(),
					url: url.listInspectionTasks,
					method: "GET",
					data: {
						communityId: _that.communityId,
						page: 1,
						row: 10,
						planUserId: _that.userId,
						moreState:'20200405,20200406',
						isToday: 1
					},
					success: function(res) {
						// TODO 判断
						console.log(res);
						res.data.inspectionTasks.forEach(function(item, index) {
							item.timeStr = item.planInsTime.replace(/:\d{1,2}$/, ' ');
						});
						_that.tasks = res.data.inspectionTasks;
						if(_that.tasks.length < 1){
							_that.noData = true;
						}
					}
				});
			},

			_transferInspection: function(_taskInfo){
				uni.navigateTo({
					url: '/pages/inspectionTransfer/inspectionTransfer?task=' + JSON.stringify(_taskInfo)
				})
			},
			
			/**
			 * 跳转巡检补检
			 */
			_torReexamineInspection: function(){
				uni.navigateTo({
					url: '/pages/inspectionReexamine/inspectionReexamine'
				});
			},
		}
	}
</script>

<style lang="scss">
	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}


	.solid-top::after {
		border-top: 2upx solid rgba(0, 0, 0, 0.1);
	}
	.block__title {
	  margin: 0;
	  font-weight: 400;
	  font-size: 32upx;
	  color: rgba(69,90,100,.6);
	  padding: 40rpx 30rpx 20rpx;
	  .title{
		  line-height: 60upx;
	  }
	}
</style>
