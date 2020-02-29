<template>
	<view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="state=='10001'?'text-green cur':''" @tap="_tabSelect('10001')">
					我的投诉
				</view>
				<view class="cu-item flex-sub" :class="state=='10002'?'text-green cur':''" @tap="_tabSelect('10002')">
					发起投诉
				</view>
			</view>
		</scroll-view>

		<view class="margin-top" v-if="state=='10001'">
			<view class="cu-list menu-avatar">
				<view class="cu-item arrow" v-for="(item,index) in myOrders" :key="index" @tap="_toComplaintOrderDetail(item)">
					<view class="cu-avatar round lg" :style="'background-image:url('+orderImg+');'">
					</view>
					<view class="content">
						<view class="text-grey">{{item.complaintId}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								{{item.complaintName}}
							</view>
						</view>
					</view>
					<view class="action">
						<view class="text-grey text-xs">{{item.createTime}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="margin-top" v-if="state=='10002'">
			<view class="padding ">
				<text>房屋信息</text>
			</view>
			<form>
				<view class="cu-form-group">
					<view class="title">楼栋</view>
					<picker @change="_changeResult" :value="stateIndex" :range="states">
						<view class="picker">
							{{stateIndex>-1?states[stateIndex]:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">单元</view>
					<picker @change="_changeResult" :value="stateIndex" :range="states">
						<view class="picker">
							{{stateIndex>-1?states[stateIndex]:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">房屋</view>
					<picker @change="_changeResult" :value="stateIndex" :range="states">
						<view class="picker">
							{{stateIndex>-1?states[stateIndex]:'请选择'}}
						</view>
					</picker>
				</view>
			</form>
			
			<view class="padding margin-top">
				<text>投诉信息</text>
			</view>
			
			<form>
				<view class="cu-form-group">
					<view class="title">投诉类型</view>
					<picker @change="_changeResult" :value="stateIndex" :range="states">
						<view class="picker">
							{{stateIndex>-1?states[stateIndex]:'请选择'}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">投诉人</view>
					<input placeholder="请输入投诉人" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">手机号码</view>
					<input placeholder="输入框带标签" name="input"></input>
					<view class="cu-capsule radius">
						<view class='cu-tag bg-blue '>
							+86
						</view>
						<view class="cu-tag line-blue">
							中国大陆
						</view>
					</view>
				</view>
				<view class="cu-form-group">
					<textarea maxlength="-1" v-model="context" placeholder="请输入投诉内容"></textarea>
				</view>
				<view class="cu-bar bg-white margin-top">
					<view class="action">
						图片上传
					</view>
					<view class="action">
						{{imgList.length}}/4
					</view>
				</view>
				<view class="cu-form-group">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						 <image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="_chooseImage" v-if="imgList.length<4">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
			</form>

			<view class="padding flex flex-direction">
				<button class="cu-btn bg-green margin-tb-sm lg" @tap="_submitOrder()">提交</button>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: '10001',
				orderImg: this.java110Constant.url.baseUrl + 'img/order.png',
				myOrders: [],
				imgList:[]
			}
		},
		onLoad() {

		},
		onShow() {
			this._loadMyOrders();
		},
		methods: {
			_tabSelect: function(_state) {
				this.state = _state;
				if (_state == '10002') {
					//this._loadOrder();
				} else {
					this._loadMyOrders();
				}
			},

			_loadMyOrders: function() {
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 15,
					storeId: storeId,
					userId: _userInfo.userId,
					process: 'START',
					communityId: _that.java110Context.getCurrentCommunity().communityId

				};
				this.java110Context.request({
					url: _that.java110Constant.url.listAuditHistoryComplaints,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						if (res.statusCode != 200) {
							uni.showToast({
								icon: 'none',
								title: res.data
							});
							return;
						}
						let _data = res.data;
						_that.myOrders = _data.complaints;

						_data.complaints.forEach(function(item) {
							let dateStr = item.createTime;
							console.log(dateStr);
							let _date = new Date(dateStr);
							item.createTime = (_date.getMonth() + 1) + '-' + _date.getDate();
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
			_toComplaintOrderDetail: function(_item) {
				console.log('_item', _item);
				uni.setStorageSync("_complaintOrderDetail_" + _item.complaintId, _item);
				uni.navigateTo({
					url: "/pages/complaintOrderDetail/complaintOrderDetail?complaintId=" + _item.complaintId
				});
			},
			_submitOrder:function(){
				
			},
			_chooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},

		}
	}
</script>

<style>

</style>
