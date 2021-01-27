<template>
	<view>
		<view v-if="noData==false">
			<view v-for="(item,index) in myOrders" :key="index" class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
				<view class="flex padding-bottom-xs solid-bottom justify-between">
					<view>{{item.repairId}}</view>
					<view class="text-gray">{{item.tel}}</view>
				</view>
				<view class="flex margin-top justify-between">
					<view class="text-gray">报修类型</view>
					<view class="text-gray">{{item.repairTypeName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">报修人</view>
					<view class="text-gray">{{item.repairName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">位置</view>
					<view class="text-gray">{{item.repairObjName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">预约时间</view>
					<view class="text-gray">{{item.appointmentTime }}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">状态</view>
					<view class="text-gray">{{item.stateName}}</view>
				</view>
				<view class="flex margin-top-xs justify-between">
					<view class="text-gray">报修内容</view>
					<view class="text-gray">{{item.context}}</view>
				</view>
				<view class="solid-top flex justify-end margin-top padding-top-sm ">
					<button class="cu-btn sm line-gray" @click="repairDetail(item)">详情</button>
					<button class="cu-btn sm bg-orange margin-left" v-if="item.state == '1100' || item.state == '1200' ||item.state == '1300'"
					 @click="dealRepair(item,'TRANSFER')">转单</button>
					<button class="cu-btn sm bg-red margin-left" v-if="item.preStaffId != '-1'" @click="dealRepair(item,'BACK')">退单</button>
					<button class="cu-btn sm bg-green margin-left" v-if="item.state == '1100' || item.state == '1200' ||item.state == '1300'"
					 @click="dealRepair(item,'FINISH')">办结</button>
					<button class="cu-btn sm bg-green margin-left" v-if="item.state == '1700'" @click="dealAppraise(item)">完成</button>

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
	export default {
		data() {
			return {
				orderImg: this.java110Constant.url.baseUrl + 'img/order.png',
				myOrders: [],
				orders: [],
				storeId: '',
				noData: false,
			}
		},
		components: {
			noDataPage
		},
		onLoad() {

			let _userInfo = this.java110Context.getUserInfo();
			let _storeId = _userInfo.storeId;
			this.storeId = _storeId;
			this._loadMyModify();
		},
		methods: {
			_loadMyModify: function() {
				//
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 15,
					userId: _userInfo.userId,
					communityId: _that.java110Context.getCurrentCommunity().communityId
				};

				this.java110Context.request({
					url: _that.java110Constant.url.listStaffRepairs,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						let _json = res.data;
						if (_json.code != 0) {
							uni.showToast({
								icon: 'none',
								title: _json.msg
							});
							return;
						}
						let _data = _json.data;
						_that.myOrders = _data;
						if(_that.myOrders.length < 1){
							_that.noData = true;
							return ;
						}

						_that.myOrders.forEach(function(item) {
							let dateStr = item.appointmentTime;
							console.log(dateStr);
							let _date = new Date(dateStr.replace(/-/g, "/"));
							item.appointmentTime = (_date.getMonth() + 1) + '-' + _date.getDate();
						});
						// _that.orders = _data.ownerRepairs;
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
			repairDetail: function(_item) {
				console.log('_item', _item);
				//wx.setStorageSync("_toModifyComplaint_"+_item.complaintId, _item);
				uni.navigateTo({
					url: "/pages/repairDetail/repairDetail?repairId=" +
						_item.repairId + '&storeId=' + this.storeId

				});
			},
			dealRepair: function(item, action) {
				uni.navigateTo({
					url: '/pages/repairHandle/repairHandle?action=' +
						action + "&repairId=" + item.repairId +
						"&repairType=" + item.repairType +
						"&preStaffId=" + item.preStaffId +
						"&preStaffName=" + item.preStaffName +
						"&repairObjType=" + item.repairObjType
				});
			},
			dealAppraise: function(item) {
				this.context.navigateTo({
					url: '/pages/appraiseRepair/appraiseRepair?' + "repairId=" + item.repairId +
						"&repairType=" + item.repairType +
						"&preStaffId=" + item.preStaffId +
						"&preStaffName=" + item.preStaffName +
						"&repairObjType=" + item.repairObjType
				})
			}
		}
	}
</script>

<style>

</style>
