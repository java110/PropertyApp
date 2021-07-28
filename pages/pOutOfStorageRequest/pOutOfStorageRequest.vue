<template>
	<view>
		<view class="">
			<view class="padding">
				<text>出库信息</text>
			</view>
			<form class="disabled">
				<view class="cu-list menu ">
					<view class="cu-item arrow" @tap="_selectPurchase()">
						<view class="content">
							<text class="text-grey">出库类型</text>
						</view>
						<view class="action">
							<text class="text-grey text-sm">{{aPurchase != ''?aPurchase:'请选择'}}</text>
						</view>
					</view>
				</view>
				<view class="cu-form-group">
					<view class="title">单价</view>
					<input disabled="disabled" v-model="price" name="input" type="number"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">库存</view>
					<input disabled="disabled" v-model="stock" name="input" type="number"></input>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">商品备注</view>
					<textarea maxlength="-1" disabled="disabled" @input="textareaBInput" v-model="description" placeholder="商品备注"></textarea>
				</view>
			</form>
			<view class="padding">
				<text>出库参数</text>
			</view>
			<form>
				<view class="cu-form-group">
					<view class="title">出库数量</view>
					<input v-model="numberPuchase" name="input" type="number"></input>
				</view>
				<view class="cu-form-group align-start">
					<view class="title">申请说明</view>
					<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" v-model="explainPuchase" placeholder="申请出库说明"></textarea>
				</view>
			</form>
			<view class="cu-bar bg-white tabbar border search fixed">
				<view class="cu-form-group">总计: {{totalPrice}} ￥</view>
				<view>
					<button class="cu-btn bg-color round shadow-blur margin-right-xs" @tap="_submitPurchase()">提交申请</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getCurrentCommunity} from '../../api/community/community.js'
	export default {
		data() {
			return {
				puchaseAll: [],
				typePuchase: [],
				price: '0',
				numberPuchase: '1',
				explainPuchase: '',
				totalPrice: '0',
				typeName: '请选择',
				typeCdIndex: -1,

				description: '',
				resCode: -1,
				resId: -1,
				stock: 0,

				floorId: '',
				aPurchase: '',
				unitId: '',
				unitNum: '',
				roomId: '',
				roomNum: '',
				repairIdAttr: ['10001', '10002', '10003'],
				context: '',
				repairName: '',
				storeId: '',
				userName: '',
				userId: '',
			}
		},
		watch: {
			price(newVal, oldVal) {
				this.totalPrice = this.numberPuchase * newVal
			},
			numberPuchase(newVal, oldVal) {
				this.totalPrice = this.price * newVal
			}
		},
		onLoad() {
			this.java110Context.onLoad();
			
			let _userInfo = this.java110Context.getUserInfo();
			let _storeId = _userInfo.storeId;
			this.storeId = _storeId;
			this.userId = _userInfo.userId;
			this.userName = _userInfo.userName;
		},
		onShow() {
			//this._loadMyOrders();
			let _floorInfo = this.java110Context.getParam("floorInfo");
			if (_floorInfo) {
				this.floorId = this.resId = _floorInfo.resId;
				this.aPurchase = this.typeName = _floorInfo.resName;
				this.price = _floorInfo.price;
				this.stock = _floorInfo.stock;
				this.description = _floorInfo.description;
				this.resCode = _floorInfo.resCode;
			}

		},
		methods: {
			_selectPurchase: function() {
				uni.navigateTo({
					url: '/pages/purchaseList/purchaseList?communityId=' + getCurrentCommunity().communityId
				});
			},
			puchaseChange: function(e) {
				this.typeName = this.puchaseAll[e.detail.value].resName;
				this.price = this.puchaseAll[e.detail.value].price;
				this.resId = this.puchaseAll[e.detail.value].resId;
				this.resCode = this.puchaseAll[e.detail.value].resCode;
				this.description = this.puchaseAll[e.detail.value].description;
			},
			_submitPurchase: function(e) {
				let _that = this;
				let _objData = {
					"resourceStores": [{
						"resId": _that.resId,
						"resName": _that.typeName,
						"resCode": _that.resCode,
						"price": _that.price,
						"stock": _that.stork,
						"description": _that.explainPuchase,
						"quantity": _that.numberPuchase
					}],
					"description": _that.description,
					"file": "",
					"resOrderType": "10000",
					'storeId': _that.storeId,
					'userId': _that.userId,
					'userName': _that.userName
				};
				console.log(_objData);
				return;
				this.java110Context.request({
					url: "...",
					header: _that.java110Context.getHeaders(),
					method: "POST",
					data: _objData,
					success: function(res) {
						console.log(res)
						if (res.statusCode == 200) {
							wx.showToast({
								title: "提交成功,待处理...",
								duration: 2000
							})
							uin.switchTap({
								url: "/pages/index/index"
							})
							return;
						}
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});
			}
		}
	}
</script>

<style>
	.bg-color {
		background-color: #00AA00;
		color: #ffffff;
	}

	.border {
		border-top: 1px solid #eeeeee;
	}

	.navbar {
		position: fixed;
		bottom: 0;
		left: 0;
	}

	.fixed {
		top: unset;
		bottom: 0;
	}

	.disabled,
	.disabled input,
	.disabled textarea {
		color: #C0C0C0;
	}
</style>
