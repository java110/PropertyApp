<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入核销码" v-model="repairName" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @click="navigateToScan()">扫码</button>
				<button style="margin-left: 10px;" class="cu-btn bg-gradual-red shadow-blur round"
					@click="comfirmTimeId(repairName)">核销</button>
			</view>
		</view>
		<view v-if="noData==false">
			<view v-for="(item,index) in myOrders" :key="index"
				class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view style="font-size: 14px;">单号<span style="margin-left: 10px;"
							class="text-gray">{{item.orderId}}</span></view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">场地</view>
					<view class="text-gray">{{item.spaceName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约日期</view>
					<view class="text-gray">{{item.appointmentTime}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约时间</view>
					<view class="text-gray">{{item.hours}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约人</view>
					<view class="text-gray">{{item.personName }}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约电话</view>
					<view class="text-gray">{{item.personTel }}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">核销时间</view>
					<view class="text-gray">{{item.createTime}}</view>
				</view>

				<view class="solid-top flex justify-end margin-top padding-top-sm ">
					<!-- <button class="cu-btn sm bg-red margin-left" @click="dealRepair(item,'BACK')">退单</button> -->
				</view>
			</view>
			<uni-load-more :status="loadingStatus" :content-text="loadingContentText" />
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
		saveCommunitySpaceConfirmOrder
	} from '../../api/appointment/appointment.js'
	// 防止多次点击
	import {
		preventClick
	} from '../../lib/java110/utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	export default {
		data() {
			return {
				onoff: true,
				orderImg: url.baseUrl + 'img/order.png',
				myOrders: [],
				orders: [],
				storeId: '',
				noData: false,
				page: 1,
				loadingStatus: 'loading',
				loadingContentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				},
				repairStates: [{
					name: '请选择'
				}],
				repairStatesIndex: 0,
				repairState: '',
				repairName: '',
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
			this.java110Context.onLoad()
		},
		onShow() {
			let _userInfo = this.java110Context.getUserInfo();
			let _storeId = _userInfo.storeId;
			this.storeId = _storeId;
			this.myOrders = [];
			this.page = 1;
			this._loadMyModify();
			let that = this
			// uni.$on('updateData', function(data) {
			// 	uni.showModal({
			// 		title: '成功',
			// 		content: data,
			// 		success: () => {

			// 		}
			// 	})
			// })

		},
		onReachBottom: function() {
			if (this.loadingStatus == 'noMore') {
				return;
			}
			this._loadMyModify();
		},
		methods: {
			_searchRepair: function() {
				this.myOrders = [];
				this.page = 1;
				this._loadMyModify();
			},

			repairStatesChange: function(e) {
				this.repairStatesIndex = e.target.value;
				if (this.repairStatesIndex == 0) {
					this.repairState = '';
					return;
				}
				let selected = this.repairStates[this.repairStatesIndex];
				this.repairState = selected.statusCd;
			},

			checkAuth: function(pid) {
				return this.java110Context.hasPrivilege(pid);
			},

			//http://{ip}:{port}/app/communitySpace.listCommunitySpaceConfirmOrder?communityId=2022081539020475&page=1&row=10
			// 获取核销订单
			_loadMyModify: function() {
				this.loadingStatus = 'more';
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: _that.page,
					row: 15,
					userId: _userInfo.userId,
					communityId: getCurrentCommunity().communityId,
					repairName: _that.repairName,
					state: _that.repairState,
				};

				// debugger
				this.java110Context.request({
					url: url.listCommunitySpaceConfirmOrder,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						// debugger
						let _json = res.data;
						if (_json.code != 0) {
							uni.showToast({
								icon: 'none',
								title: _json.msg
							});
							_that.onoff = true;
							return;
						}

						_that.myOrders = [];
						let _data = _json.data;
						_that.myOrders = _that.myOrders.concat(_data);
						// _that.page++;
						if (_that.myOrders.length < 1) {
							_that.noData = true;
							_that.onoff = true;
							return;
						} else {
							_that.noData = false;
						}
						if (_that.myOrders.length == _json.total) {
							_that.loadingStatus = 'noMore';
							_that.onoff = true;
							return;
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
				if (timeId != "") {
					// debugger
					_that.repairName = timeId;
					// debugger
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
									let params = {
										timeId: _that.repairName,
										communityId: getCurrentCommunity().communityId
									};
									saveCommunitySpaceConfirmOrder(_that, params).then(function(_res) {
										uni.showToast({
											title: '操作成功'
										});
										_that.repairName = "";
										wx.hideLoading();
										_that._loadMyModify();
									});
								}								
							}
						});
					}, 1000);
				}
			},
		}
	}
</script>

<style>

</style>
