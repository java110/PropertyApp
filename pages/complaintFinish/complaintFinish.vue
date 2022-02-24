<template>
	<view>
		<view v-if="noData==false">
			<view v-for="(item,index) in orders" :key="index" class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view>{{item.complaintId}}</view>
					<view class="text-gray">{{item.tel}}</view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">投诉类型</view>
					<view class="text-gray">{{item.typeCdName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">投诉人</view>
					<view class="text-gray">{{item.complaintName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">房间</view>
					<view class="text-gray">{{item.floorNum}}栋{{item.unitNum}}单元{{item.roomNum}}室</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">投诉时间</view>
					<view class="text-gray">{{item.createTime }}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">投诉内容</view>
					<view class="text-gray">{{item.context}}</view>
				</view>
				<view class="solid-top flex justify-end margin-top padding-top-sm ">
					<button class="cu-btn sm line-gray" @click="_complaintDetail(item)">详情</button>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import {
		loadCompaintFinish
	} from '../../api/complaint/complaint.js'
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	
	import {getCurrentCommunity} from '../../api/community/community.js'
	
	import conf from '../../conf/config.js'

	export default {
		data() {
			return {
				state: '10001',
				orderImg: conf.baseUrl + 'img/order.png',
				orders: [],
				noData: false
			}
		},
		components: {
			noDataPage
		},
		onLoad() {
			this.java110Context.onLoad();
			
			this._loadComplaintOrder();
		},
		methods: {
			_loadComplaintOrder: function() {
				//
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 15,
					storeId: storeId,
					userId: _userInfo.userId,
					communityId: getCurrentCommunity().communityId
				};

				loadCompaintFinish(this, _objData)
					.then(function(res) {
						if (res.statusCode != 200) {
							// uni.showToast({
							// 	icon: 'none',
							// 	title: res.data
							// });
							uni.navigateTo({
								url:'/pages/login/login'
							})
							return;
						}
						let _data = res.data;
						_that.orders = _data.complaints;
						if (_that.orders.length < 1) {
							_that.noData = true;
							return;
						}
						_that.orders.forEach(function(item) {
							let dateStr = item.createTime;
							let _startTime = dateStr.replace(/\-/g, "/")
							let _date = new Date(_startTime);
							item.createTime = (_date.getMonth() + 1) + '-' + _date.getDate();
						});
					})
			},
			_complaintDetail: function(_item) {
				console.log('_item', _item);
				uni.setStorageSync("_complaintOrderDetail_" + _item.complaintId, _item);
				uni.navigateTo({
					url: "/pages/complaintOrderDetail/complaintOrderDetail?complaintId=" + _item.complaintId
				});
			},
		}
	}
</script>

<style>

</style>
