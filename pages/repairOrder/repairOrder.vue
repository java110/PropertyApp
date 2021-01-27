<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入报修人" v-model="repairName" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_searchRepair()">搜索</button>
			</view>
		</view>
		<view class="margin-top" v-if="noData==false">
			<view class="cu-list menu-avatar " v-for="(item,index) in repairOrders" :key="index" @tap="_toRepairDetail(item)">
				<view class="cu-item arrow">
					<view class="content content-left">
						<view class="text-grey">
							<text class="cuIcon-notification text-cut text-green margin-right-xs"></text>
						 {{item.repairObjName}}-{{item.repairTypeName}}
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								报修人：{{item.repairName}}-{{item.tel}}
							</view>
						</view>
					</view>
					<view v-if="item.repairWay == 100 && item.state == 1000" class="rob-order text-df text-white bg-green text-center" @tap.stop="_robOrder(item)">
						抢单
					</view>
					<view v-else class="action">
						<view class="text-grey text-xs">{{item.appointmentTime}}
							<text class="lg text-gray cuIcon-right margin-left-xs"></text>
						</view>
					</view>
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
				repairOrders: [],
				repairName: '',
				noData:false,
			}
		},
		components: {
			noDataPage
		},
		onLoad() {

			let _userInfo = this.java110Context.getUserInfo();

			let _storeId = _userInfo.storeId;

			this.storeId = _storeId;
			this._loadRepairOrders();
		},
		onShow() {

		},
		methods: {
			_loadRepairOrders: function() {
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 15,
					storeId: storeId,
					userId: _userInfo.userId,
					communityId: _that.java110Context.getCurrentCommunity().communityId,
					repairName: _that.repairName
				};
				this.java110Context.request({
					url: _that.java110Constant.url.listOwnerRepairs,
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
						_that.repairOrders = _data;
						if(_that.repairOrders.length < 1){
							_that.noData = true;
							return ;
						}

						_that.repairOrders.forEach(function(item) {
							let dateStr = item.appointmentTime;
							console.log(dateStr);
							let _date = new Date(dateStr.replace(/-/g, "/"));
							item.appointmentTime = (_date.getMonth() + 1) + '-' + _date.getDate();
						});
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
			_searchRepair: function() {
				this._loadRepairOrders();
			},
			_toRepairDetail: function(_item) {
				uni.navigateTo({
					url: "/pages/repairDetail/repairDetail?repairId=" + _item.repairId + '&storeId=' + this.storeId
				});
			},
			
			/**
			 * 抢单
			 * @param {Object} _item
			 */
			_robOrder: function(_item){
				let _that = this;
				let _objData = {
					communityId: _that.java110Context.getCurrentCommunity().communityId,
					repairId: _item.repairId
				};
				this.java110Context.request({
					url: _that.java110Constant.url.robRepairOrder,
					header: _that.java110Context.getHeaders(),
					method: "POST",
					data: _objData, //动态数据
					success: function(res) {
						wx.showToast({
							title: res.data.msg,
							duration: 2000
						});
						_that._loadRepairOrders();
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						});
					}
				});
			}

		}
	}
</script>

<style>
	.cu-list.menu-avatar>.cu-item .content-left {
		left: 30upx;
	}

	.cu-list+.cu-list {
		margin-top: 20upx;
	}
	/* 抢单按钮 */
	.rob-order{
		width: 80upx;
		height: 80upx;
		line-height: 80upx;
		border-radius: 50%;
	}
</style>
