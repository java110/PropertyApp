<template>
	<view>
		<view class="block__title">{{inspectionPlanName}}</view>
		<view class="cu-timeline margin-left-xs margin-right-xs">
			<view class="cu-time">巡检点</view>
			<view class="cu-item cuIcon-noticefill" :class="(item.state == '20200407'?'text-green':'')" v-for="(item,index) in taskDetails" :key="index">
				<view class="content shadow-blur" :class="(item.state == '20200407'?'bg-green':'')">
					{{item.inspectionName}}
				</view>
				<view class="text-right" v-if="item.state != '20200407'">
					<button class="cu-btn  line-green block margin-tb-sm lg " @click="_excuteInspection(item)">
						<text class="cuIcon-upload"></text>巡检</button>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				taskId:'',
				inspectionPlanName:'',
				scroll: 0,
				communityId:'',
				userId:'',
				userName:'',
				taskDetails:[]
				
			}
		},
		onLoad(options) {
			this.taskId = options.taskId;
			this.inspectionPlanName = options.inspectionPlanName;
			this.communityId = this.java110Context.getCurrentCommunity().communityId;
			let _userInfo = this.java110Context.getUserInfo();
			this.userName = _userInfo.userName;
			this.userId = _userInfo.userId;
			this._queryTaskDetail();
		},
		methods: {
			_queryTaskDetail:function(){
				let _that = this;
				
				_that.java110Context.request({
					header: _that.java110Context.getHeaders(),
					url: _that.java110Constant.url.listInspectionTaskDetails,
					method: "GET",
					data: {
						communityId: _that.communityId,
						page: 1,
						row: 100,
						taskId: _that.taskId
					},
					success: function(res) {
						// TODO 判断
						console.log(res);
						// res.data.inspectionTaskDetails.forEach(function(item, index) {
						// 	item.timeStr = item.planInsTime.replace(/:\d{1,2}$/, ' ');
						// });
						_that.taskDetails = res.data.inspectionTaskDetails;
					}
				});
			},
			
			ScrollSteps() {
				this.scroll= this.scroll == 9 ? 0 : this.scroll + 1				
			},
			_excuteInspection:function(_item){
				console.log('巡检点',_item);
				uni.navigateTo({
					url:'/pages/excuteOneInspection/excuteOneInspection?taskDetailId='+_item.taskDetailId+"&taskId="+_item.taskId+"&inspectionId="+_item.inspectionId+"&inspectionName="+_item.inspectionName
				});
			}
		}
	}
</script>

<style>
	.block__title {
	  margin: 0;
	  font-weight: 400;
	  font-size: 14px;
	  color: rgba(69,90,100,.6);
	  padding: 40rpx 30rpx 20rpx;
	}

</style>
