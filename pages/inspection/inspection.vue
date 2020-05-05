<template>
	<view>
		<view class="block__title">巡检任务</view>
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
				<button class="cu-btn sm bg-green margin-left" @click="_startInspection(item)">我要巡检</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tasks: [],
				communityId: '',
				userId: '',
				userName: ''
			}
		},
		onLoad: function() {
			this.communityId = this.java110Context.getCurrentCommunity().communityId;
			let _userInfo = this.java110Context.getUserInfo();
			console.log("_userInfo", _userInfo);
			this.userName = _userInfo.userName;
			this.userId = _userInfo.userId;
			this._queryInstpectionTasks();
		},
		methods: {
			_startInspection:function(_item){
				console.log('开始巡检',_item);
				uni.navigateTo({
					url:'/pages/excuteInspection/excuteInspection?taskId='+_item.taskId+'&inspectionPlanName='+_item.inspectionPlanName
				});
			},
			_queryInstpectionTasks: function() {
				let _that = this;

				_that.java110Context.request({
					header: _that.java110Context.getHeaders(),
					url: _that.java110Constant.url.listInspectionTasks,
					method: "GET",
					data: {
						communityId: _that.communityId,
						page: 1,
						row: 10,
						planUserId: _that.userId,
						
					},
					success: function(res) {
						// TODO 判断
						console.log(res);
						res.data.inspectionTasks.forEach(function(item, index) {
							item.timeStr = item.planInsTime.replace(/:\d{1,2}$/, ' ');
						});
						_that.tasks = res.data.inspectionTasks;
					}
				});
			}

		}
	}
</script>

<style>
	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}


	.solid-top::after {
		border-top: 2upx solid rgba(0, 0, 0, 0.1);
	}
	.block__title {
	  margin: 0;
	  font-weight: 400;
	  font-size: 14px;
	  color: rgba(69,90,100,.6);
	  padding: 40rpx 30rpx 20rpx;
	}
</style>
