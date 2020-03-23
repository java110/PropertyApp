<template>
	<view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="state=='10001'?'text-green cur':''" @tap="_tabSelect('10001')">
					待处理维修单
				</view>
				<view class="cu-item flex-sub" :class="state=='10002'?'text-green cur':''" @tap="_tabSelect('10002')">
					维修单历史
				</view>
			</view>
		</scroll-view>
		
		<view class="margin-top" v-if="state=='10001'">
			<view class="cu-list menu-avatar">
				<view class="cu-item arrow" v-for="(item,index) in myOrders" :key="index" @tap="_toModifyMyOrder(item)">
					<view class="cu-avatar round lg" :style="'background-image:url('+orderImg+');'">
					</view>
					<view class="content">
						<view class="text-grey">{{item.repairId}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.repairTypeName}}
							</view> </view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.createTime}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="margin-top" v-if="state=='10002'">
			<view class="cu-list menu-avatar">
				<view class="cu-item arrow" v-for="(item,index) in orders" :key="index" @tap="_toModifyHistoryOrder(item)">
					<view class="cu-avatar round lg" :style="'background-image:url('+orderImg+');'">
					</view>
					<view class="content">
						<view class="text-grey">{{item.repairId}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.repairTypeName}}
							</view> </view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.createTime}}</view>
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
				state:'10001',
				orderImg:this.java110Constant.url.baseUrl + 'img/order.png',
				myOrders:[],
				orders:[]
			}
		},
		methods: {
			_tabSelect: function(_state) {
				this.state = _state;
				if(_state == '10002'){
					this._loadHisModify();
				}else{
					this._loadMyModify();
				}
			},
			_loadMyModify:function(){
				//
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 15,
					// storeId: storeId,
					// userId: _userInfo.userId,
					// process:'AUDIT',
					communityId:_that.java110Context.getCurrentCommunity().communityId
				};
				
				this.java110Context.request({
					url: _that.java110Constant.url.listOwnerRepairs,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						if (res.statusCode != 200) {
							uni.showToast({
								icon:'none',
								title:res.data
							});
							return;
						}
						console.debug("res.data=",res.data);
						let _data = res.data;
						_that.myOrders = [];
						_data.ownerRepairs.forEach(function(item){
							let dateStr = item.appointmentTime;
							let _startTime = dateStr.replace(/\-/g, "/")
							let _date=new Date(_startTime);
							item.createTime = (_date.getMonth()+1) +'-'+_date.getDate();
							if (item.state == "1100"){
								_that.myOrders.push(item);
							}
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
			_loadHisModify:function(){
				//
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 15,
					// storeId: storeId,
					// userId: _userInfo.userId,
					// process:'AUDIT',
					communityId:_that.java110Context.getCurrentCommunity().communityId
				};
				
				this.java110Context.request({
					url: _that.java110Constant.url.listOwnerRepairs,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						if (res.statusCode != 200) {
							uni.showToast({
								icon:'none',
								title:res.data
							});
							return;
						}
						console.debug("res.data=",res.data);
						let _data = res.data;
						_that.orders = [];
						_data.ownerRepairs.forEach(function(item){
							let dateStr = item.appointmentTime;
							let _startTime = dateStr.replace(/\-/g, "/")
							let _date=new Date(_startTime);
							item.createTime = (_date.getMonth()+1) +'-'+_date.getDate();
							if (item.state == "1200"){
								_that.orders.push(item);
							}
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
			_toModifyMyOrder:function(_item){
				console.log('_item',_item);
				wx.setStorageSync("_auditComplaint_"+_item.complaintId, _item);
				uni.navigateTo({
					url:"/pages/auditComplaintOrder/auditComplaintOrder?complaintId="+_item.complaintId
				});	
			},
			_toModifyHistoryOrder:function(_item){
				console.log('_item',_item);
				uni.setStorageSync("_complaintOrderDetail_"+_item.complaintId, _item);
				uni.navigateTo({
					url:"/pages/complaintOrderDetail/complaintOrderDetail?complaintId="+_item.complaintId
				});	
			}
		}
	}
</script>

<style>

</style>
