<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入核销码" v-model="reserveQrcode" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @click="navigateToScan()">扫码</button>
				<button style="margin-left: 10px;" class="cu-btn bg-gradual-red shadow-blur round"
					@click="comfirmTimeId(reserveQrcode)">核销</button>
			</view>
		</view>
		<view v-if="reserveOrders && reserveOrders.length>0">
			<view v-for="(item,index) in reserveOrders" :key="index"
				class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view style="font-size: 14px;">单号<span style="margin-left: 10px;"
							class="text-gray">{{item.orderId}}</span></view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">商品/服务</view>
					<view class="text-gray">{{item.goodsName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">核销数量</view>
					<view class="text-gray">{{item.quantity}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约日期</view>
					<view class="text-gray">{{item.appointmentTime}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约小时</view>
					<view class="text-gray">{{item.hours}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约人</view>
					<view class="text-gray">{{item.personName}}({{item.personTel}})</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">核销时间</view>
					<view class="text-gray">{{item.createTime}}</view>
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
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import url from '../../constant/url.js'
	import {
		getCurrentCommunity
	} from '../../api/community/community.js'
	import {
		getReserveGoodsConfirmOrder,
		saveReserveGoodsConfirmOrder
	} from '@/api/coupon/coupon.js'
	// 防止多次点击
	import {
		preventClick
	} from '@/lib/java110/utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	export default {
		data() {
			return {
				onoff: true,
				orderImg: url.baseUrl + 'img/order.png',
				reserveOrders: [],
				page: 1,
				loadingStatus: 'loading',
				loadingContentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				reserveQrcode: '',
				modal: {
					showModal: false,
					title: '暂停原因',
					text: '请填写暂停原因'
				}
			}
		},
		components: {
			noDataPage,
			uniLoadMore
		},
		onLoad() {
			this.java110Context.onLoad();
			this._loadReserveUserDetail();
		},
		onShow() {
			let _userInfo = this.java110Context.getUserInfo();
			let _storeId = _userInfo.storeId;
			this.storeId = _storeId;
		},
		methods: {

			// 获取核销订单
			_loadReserveUserDetail: function() {
				let _that = this;
				getReserveGoodsConfirmOrder(this, {
					page: 1,
					row: 100,
					communityId: getCurrentCommunity().communityId
				}).then(_data => {
					_that.reserveOrders = _data.data;
				})
			},
			navigateToScan() {
				setTimeout(() => {
					uni.navigateTo({
						url: `/pages/appointment/hou_one`
					})
				}, 300)
			},
			comfirmTimeId(timeId) {
				// debugger
				let _that = this;
				if (!timeId) {
					return;
				}
				_that.reserveQrcode = timeId;
				setTimeout(function() {
					uni.showModal({
						cancelText: "取消", // 取消按钮的文字  
						confirmText: "核销",
						content: "核销码:" + timeId,
						success: (res) => {
							if (res.confirm) {
								wx.showToast({
									title: "请稍后",
									icon: 'none'
								});
								saveReserveGoodsConfirmOrder(_that, {
									timeId: timeId,
									communityId: getCurrentCommunity().communityId
								}).then(function(_res) {
									uni.showToast({
										title: '操作成功'
									});
									_that.reserveQrcode = "";
									wx.hideLoading();
									_that._loadReserveUserDetail();
								});
							}
						}
					});
				}, 1000);

			},
		}
	}
</script>

<style>

</style>
