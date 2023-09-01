<template>
	<view>
		<view class="text-center margin-top-100" v-if="!taskDetails || taskDetails.length == 0">
			<view class="">
				<text class=" cuIcon-warnfill light text-orange no-data-icon"></text>
			</view>
			<view class="">
				<text class="text-gray">当前没有巡检任务或者没到巡检时间</text>
			</view>
		</view>
	</view>
</template>

<script>
	import url from '../../constant/url.js'
	import {formatDate,formatTime,addDay} from '../../lib/java110/utils/DateUtil.js'
	import {
		getCurrentCommunity
	} from '../../api/community/community.js'
	export default {
		data() {
			return {
				inspectionId: '',
				inspectionName: '',
				taskId: '',
				taskDetailId: '',
				itemId: '',
				communityId: '',
				userName: '',
				userId: '',
				taskDetails:[]
			}
		},
		onLoad(options) {
			this.java110Context.onLoad();
			this.inspectionId = options.inspectionId;
			this.inspectionName = options.inspectionName;
			this.itemId = options.itemId;
			this.communityId = getCurrentCommunity().communityId;
			let _userInfo = this.java110Context.getUserInfo();
			this.userName = _userInfo.userName;
			this.userId = _userInfo.userId;
			this._queryTaskDetail();
		},
		methods: {
			_queryTaskDetail: function() {
				let _that = this;
				_that.java110Context.request({
					header: _that.java110Context.getHeaders(),
					url: url.listInspectionTaskDetails,
					method: "GET",
					data: {
						communityId: _that.communityId,
						page: 1,
						row: 100,
						planUserId: this.userId,
						inspectionId: this.inspectionId,
						state: '20200405',
						qrCodeTime:formatTime(new Date()),
					},
					success: function(res) {
						// TODO 判断
						let _inspectionTaskDetails = res.data.inspectionTaskDetails;
						_that.taskDetails = _inspectionTaskDetails;

						if (!_that.taskDetails || _that.taskDetails.length < 1) {
							return;
						}
						
						let _item = _that.taskDetails[0];
						uni.navigateTo({
							url: '/pages/excuteOneInspection/excuteOneInspection?taskDetailId=' +
								_item.taskDetailId + "&taskId=" + _item.taskId +
								"&inspectionId=" + _that.inspectionId + "&inspectionName=" + _that
								.inspectionName + "&itemId=" + _that.itemId+"&fromPage=QrCode"
						});

					}
				});
			},
		}
	}
</script>

<style>
	.no-data-icon{
		font-size: 200upx;
	}
	.margin-top-100{
		margin-top: 200upx;
		
	}
</style>
