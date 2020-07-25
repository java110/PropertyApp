<template>
	<view>
		
		<view class="margin-top" >
			<view class="cu-list menu-avatar">
				<view class="cu-item arrow" v-for="(item,index) in myOrders" :key="index" @tap="_toModifyMyOrder(item,communityId)">
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
				orderImg:this.java110Constant.url.baseUrl + 'img/order.png',
				myOrders:[],
				orders:[],
				storeId:''
			}
		},
		onLoad(){
			
			let _userInfo = this.java110Context.getUserInfo();
			let _storeId = _userInfo.storeId;
			this.storeId = _storeId;
			
			this._tabSelect('10001');
			
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
					userId:_userInfo.userId,
					communityId:_that.java110Context.getCurrentCommunity().communityId
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
						
						_that.myOrders.forEach(function(item) {
							let dateStr = item.appointmentTime;
							console.log(dateStr);
							let _date = new Date(dateStr);
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
			_toModifyMyOrder:function(_item){
				console.log('_item',_item);
				//wx.setStorageSync("_toModifyComplaint_"+_item.complaintId, _item);
				uni.navigateTo({
					url:"/pages/repairDetail/repairDetail?repairId=" + _item.repairId+'&storeId='+this.storeId
					
				});	
			},
			_toModifyHistoryOrder:function(_item){
				console.log('_item',_item);
				uni.setStorageSync("_complaintOrderDetail_"+_item.complaintId, _item);
				uni.navigateTo({
					url:"/pages/repairDetail/repairDetail?repairId=" + _item.repairId+'&storeId='+this.storeId
				});	
			}
		}
	}
</script>

<style>

</style>
