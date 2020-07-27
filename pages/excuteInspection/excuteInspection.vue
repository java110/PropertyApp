<template>
	<view>
		<view class="block__title">{{inspectionPlanName}}</view>
		<view class="cu-timeline margin-left-xs margin-right-xs">
			<view class="cu-time">巡检点</view>
			<view class="cu-item cuIcon-noticefill" :class="(item.state == '20200407'?'text-green':'')" v-for="(item,index) in taskDetails"
			 :key="index">
				<view class="content shadow-blur" :class="(item.state == '20200407'?'bg-green':'')">
					{{item.inspectionName}}
				</view>
				<view class="bg-green content" v-if="item.state == '20200407'">
					<text>处理意见：</text> {{item.description}}
				</view>
				<view class="margin-top grid text-center col-3 grid-square" v-if="item.state == '20200407' && item.photos.length > 0">
					<view class="" v-for="(_itemc,index) in item.photos" :key="index">
						<image mode="scaleToFill" :data-url="srcPath+_itemc.url" :src="srcPath+_itemc.url" @tap="preview(srcPath+_itemc.url)"></image>
					</view>
				</view>


				<view class="text-right" v-if="item.state != '20200407'">
					<button class="cu-btn  line-green block margin-tb-sm lg " @click="_excuteInspection(item)">
						<text class="cuIcon-upload"></text>巡检</button>
				</view>
				<view class="margin-top-sm margin-right grid text-center col-3 grid-square">
					<view class="" v-for="(_item,index) in item.photos" :key="index">
						<image mode="scaleToFill" :src="_item.url" @tap="preview(_item.url)"></image>
					</view>
				</view>
			</view>

		</view>

		<view class="cu-modal" :class="viewImage?'show':''">
			<view class="cu-dialog">
				<view class="bg-img" :style="'background-image: url('+ viewImageSrc +');height:800rpx;'">
					<view class="cu-bar justify-end text-white">
						<view class="action" @tap="closeViewImage()">
							<text class="cuIcon-close "></text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				srcPath: '',
				taskId: '',
				inspectionPlanName: '',
				scroll: 0,
				communityId: '',
				userId: '',
				userName: '',
				taskDetails: [],
				viewImage: false,
				viewImageSrc: ''

			}
		},
		onLoad(options) {
			this.taskId = options.taskId;
			this.inspectionPlanName = options.inspectionPlanName;
			this.srcPath = this.java110Constant.url.hcBaseUrl;
			this.communityId = this.java110Context.getCurrentCommunity().communityId;
			let _userInfo = this.java110Context.getUserInfo();
			this.userName = _userInfo.userName;
			this.userId = _userInfo.userId;

		},
		onShow() {
			this._queryTaskDetail();
		},
		methods: {
			_queryTaskDetail: function() {
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
						let _inspectionTaskDetails = res.data.inspectionTaskDetails;
						_inspectionTaskDetails.forEach(function(_item) {
							if (_item.state == '20200407') {
								_item.photos.forEach(function(_photoTmp) {
									_photoTmp.url = _that.java110Constant.url.hcBaseUrl + _photoTmp.url;
								});
							}

						})
						_that.taskDetails = _inspectionTaskDetails;
					}
				});
			},

			ScrollSteps() {
				this.scroll = this.scroll == 9 ? 0 : this.scroll + 1
			},
			_excuteInspection: function(_item) {
				console.log('巡检点', _item);
				uni.navigateTo({
					url: '/pages/excuteOneInspection/excuteOneInspection?taskDetailId=' + _item.taskDetailId + "&taskId=" + _item.taskId +
						"&inspectionId=" + _item.inspectionId + "&inspectionName=" + _item.inspectionName
				});
			},
			preview: function(_src) {
				this.viewImage = true;
				this.viewImageSrc = _src;
			},
			closeViewImage: function() {
				this.viewImage = false;
			}
		}
	}
</script>

<style>
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}
</style>
