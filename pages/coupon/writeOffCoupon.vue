<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入核销码" v-model="couponQrcode" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @click="navigateToScan()">扫码</button>
				<button style="margin-left: 10px;" class="cu-btn bg-gradual-red shadow-blur round"
					@click="comfirmTimeId(couponQrcode)">核销</button>
			</view>
		</view>
		<view v-if="couponOrders && couponOrders.length>0">
			<view v-for="(item,index) in couponOrders" :key="index"
				class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view style="font-size: 14px;">单号<span style="margin-left: 10px;"
							class="text-gray">{{item.uoId}}</span></view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">优惠券</view>
					<view class="text-gray">{{item.couponName}}({{item.value}})</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">用户</view>
					<view class="text-gray">{{item.userName}}({{item.tel}})</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">使用时间</view>
					<view class="text-gray">{{item.createTime}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">用途</view>
					<view class="text-gray">{{item.remark }}</view>
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
		listCouponPropertyUserDetail,
		writeOffCouponPropertyUser
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
				couponOrders: [],
				page: 1,
				loadingStatus: 'loading',
				loadingContentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				couponQrcode: '',
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
			this._loadCouponUserDetail();
		},
		onShow() {
			let _userInfo = this.java110Context.getUserInfo();
			let _storeId = _userInfo.storeId;
			this.storeId = _storeId;
		},
		methods: {

			// 获取核销订单
			_loadCouponUserDetail: function() {
				let _that = this;
				listCouponPropertyUserDetail(this, {
					page: 1,
					row: 100,
					communityId: getCurrentCommunity().communityId
				}).then(_data => {
					_that.couponOrders = _data.data;
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
				_that.couponQrcode = timeId;
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
								writeOffCouponPropertyUser(_that, {
									couponQrcode: timeId,
									communityId: getCurrentCommunity().communityId,
									giftCount: 1
								}).then(function(_res) {
									uni.showToast({
										title: '操作成功'
									});
									_that.couponQrcode = "";
									wx.hideLoading();
									_that._loadCouponUserDetail();
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
