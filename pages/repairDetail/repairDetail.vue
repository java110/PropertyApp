<template>
	<view>
		<view class="cu-list menu margin-top">
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-edit text-green"></text>
					<text class="text-grey">报修ID</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.repairId}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-ticket text-green"></text>
					<text class="text-grey">报修类型</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.repairTypeName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">报修人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.repairName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-phone text-green"></text>
					<text class="text-grey">联系方式</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.tel}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-footprint text-green"></text>
					<text class="text-grey">报修位置</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.repairObjName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">预约时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.appointmentTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">状态</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.stateName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">报修内容</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{repairDetailInfo.context}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="repairDetailInfo.repairPhotos.length > 0">
				<view class="content">
					<text class="cuIcon-pic text-green"></text>
					<text class="text-grey">业主报修图片</text>
				</view>
			</view>
			<view class="cu-item" v-if="repairDetailInfo.repairPhotos.length > 0">
				<!-- <view class="repair-img-title">业主报修图片</view> -->
				<view class="margin-top grid text-center col-4 grid-square" >
					<view class="" v-for="(_item,index) in repairDetailInfo.repairPhotos" :key="index">
						<image mode="widthFix" :data-url="_item.url" :src="_item.url" @tap="preview"></image>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="repairDetailInfo.beforePhotos.length > 0">
				<view class="content">
					<text class="cuIcon-pic text-green"></text>
					<text class="text-grey">维修前图片</text>
				</view>
			</view>
			<view class="cu-item" v-if="repairDetailInfo.beforePhotos.length > 0">
				<!-- <view class="repair-img-title">维修前图片</view> -->
				<view class="margin-top grid text-center col-4 grid-square" >
					<view class="" v-for="(_item,index) in repairDetailInfo.beforePhotos" :key="index">
						<image mode="widthFix" :data-url="_item.url" :src="_item.url" @tap="preview"></image>
					</view>
				</view>
			</view>
			<view class="cu-item" v-if="repairDetailInfo.afterPhotos.length > 0">
				<view class="content">
					<text class="cuIcon-pic text-green"></text>
					<text class="text-grey">维修后图片</text>
				</view>
			</view>
			<view class="cu-item" v-if="repairDetailInfo.afterPhotos.length > 0">
				<!-- <view class="repair-img-title">维修后图片</view> -->
				<view class="margin-top grid text-center col-4 grid-square" >
					<view class="" v-for="(_item,index) in repairDetailInfo.afterPhotos" :key="index">
						<image mode="widthFix" :data-url="_item.url" :src="_item.url" @tap="preview"></image>
					</view>
				</view>
			</view>
		</view>
		



		<view class="cu-timeline margin-top">
			<view class="cu-time">工单</view>
			<view class="cu-item " v-for="(item,index) in staffs" :key="index">
				<view class="bg-cyan content">
					<text>{{item.startTime}} </text> 到达 {{item.staffName}} 工位 - {{item.stateName}}
				</view>
				<!-- <view class="bg-cyan content" v-if="item.endTime != undefined">
					<text>{{item.endTime}} </text> 处理完成
				</view> -->
				<view class="bg-cyan content" v-if="item.endTime != undefined">
					<text>处理意见：</text> {{item.context}}
					<block v-if="item.state == '12000' && item.payTypeName != undefined">
						({{item.payTypeName}})
					</block>
				</view>
				<!-- 待支付状态 - 详情描述 -->
				<view class="bg-cyan content" v-if="item.state == '10009'">
					<text>处理意见：</text> {{item.context}}
					<block v-if="item.payTypeName != undefined">({{item.payTypeName}})</block>
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
	import url from '../../constant/url.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	export default {
		data() {
			return {
				viewImage: false,
				viewImageSrc: '',
				repairDetailInfo: {},
				storeId: '',
				repairId: '',
				staffs: [],
				srcPath: ''
			}
		},
		onLoad(options) {
			this.java110Context.onLoad();
			this.storeId = options.storeId;
			this.repairId = options.repairId;
			console.log('options', options);
			this.srcPath = url.hcBaseUrl;
			this._queryRepairDetail();
			//加载报修类型
			this._loadRepairStaffs();
		},
		methods: {
			_loadModfiyHistoryOrder: function() {
				//
				this.modifyComplaint = wx.getStorageSync("_toModifyComplaint_" + this.complaintId);

			},
			_loadRepairStaffs: function() {
				let _communityInfo = getCurrentCommunity();
				let _that = this;
				let dataObj = {
					page: 1,
					row: 50,
					communityId: _communityInfo.communityId,
					repairId: this.repairId
				};
				uni.request({
					url: url.listRepairStaffs,
					header: this.java110Context.getHeaders(),
					method: "GET",
					data: dataObj,
					//动态数据
					success: function(res) {
						let _json = res.data;
						if (_json.code == 0) {
							_that.staffs = _json.data;
						}
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			_queryRepairDetail: function() {
				let _that = this;
				let _objData = {
					page: 1,
					row: 1,
					storeId: _that.storeId,
					communityId: getCurrentCommunity().communityId,
					repairId: _that.repairId
				};
				this.java110Context.request({
					url: url.listOwnerRepairs,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						let _json = res.data;
						if (_json.code != 0) {
							uni.showToast({
								icon: 'none',
								title: _json.msg
							});
							return;
						}
						let _data = _json.data;
						_that.repairDetailInfo = _data[0];
						// let dateStr = _that.repairDetailInfo.appointmentTime;
						// let _date = new Date(dateStr.replace(/-/g, "/"));
						// _that.repairDetailInfo.appointmentTime = (_date.getMonth() + 1) + '-' + _date.getDate();

					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			preview: function(e) {
				console.log('图片地址', e);
				let _url = e.target.dataset.url;
				this.viewImageSrc = _url;
				this.viewImage = true;
			},
			closeViewImage: function() {
				this.viewImage = false;
			},
		}
	}
</script>

<style>
	
</style>
