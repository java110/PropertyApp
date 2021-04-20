<template>
	<view>
		<view v-if="action != 'FINISH'">
			<view class="cu-form-group margin-top" v-if="action == 'BACK'">
				<view class="title">维修师傅</view>
				<input v-model="staffName" disabled="disabled" placeholder="请输入报修人"></input>
			</view>
			<view class="cu-form-group margin-top" v-else>
				<view class="title">维修师傅</view>
				<picker :value="repairStaffIndex" :range="staffCloums" :range-key="'staffName'" @change="staffChange">
					<view class="picker">
						{{staffCloums[repairStaffIndex].staffName}}
					</view>
				</picker>
			</view>
		</view>
		<view v-else>
			<view v-if="repairObjType=='004'">
				<view class="cu-form-group margin-top">
					<view class="title">维修类型</view>
					<picker :value="feeIndex" :range="feeCloums" :range-key="'name'" @change="feeChange">
						<view class="picker">
							{{feeCloums[feeIndex].name}}
						</view>
					</picker>
				</view>
				<view v-if="feeFlag=='1001'">
					<view class="cu-form-group margin-top">
						<view class="title">商品类型</view>
						<picker :value="goodsTypeIndex" :range="goodsTypeCloums" :range-key="'name'" @change="goodsTypeChange">
							<view class="picker">
								{{goodsTypeCloums[goodsTypeIndex].name}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group margin-top" v-if="goodsType!=''">
						<view class="title">商品</view>
						<picker :value="goodsIndex" :range="goodsCloums" :range-key="'resName'" @change="goodsChange">
							<view class="picker">
								{{goodsCloums[goodsIndex].resName}}
							</view>
						</picker>
					</view>
					<view v-if="goodsIndex!=0">
						<view class="cu-form-group margin-top" v-if="isCustom">
							<view class="title">商品名</view>
							<input v-model="customGoodsName" placeholder="请输入商品名"></input>
						</view>
						<view class="cu-form-group margin-top">
							<view class="title">单价</view>
							<input v-model="singlePrice" @input="goodsSinglePriceChange" :disabled="disabledPrice" placeholder="请输入单价"></input>
						</view>
						<view v-if="!isCustom">
							<view class="text-right text-grey" v-if="goods.outHighPrice == goods.outLowPrice">价格:{{goods.outLowPrice}}</view>
							<view class="text-right text-grey" v-else>价格范围{{goods.outLowPrice}}-{{goods.outHighPrice}}</view>
						</view>
						<view class="cu-form-group margin-top">
							<view class="title">数量</view>
							<!-- <input v-model="useNumber" @input="goodsNumChange" placeholder="请输入数量"></input> -->
							<view class="use-num-container">
								<view class="dec" @tap="numDec">-</view>
								<input class="use-num-input" v-model="useNumber" disabled="disabled" @input="goodsNumChange"></input>
								<view class="inc" @tap="numInc">+</view>
							</view>
						</view>
						<view class="cu-form-group margin-top">
							<view class="title">总计</view>
							<input v-model="amount" disabled="disabled"></input>
						</view>
					</view>
				</view>
			</view>

		</view>

		<view class="cu-form-group margin-top">
			<textarea v-model="content" placeholder="请输入处理意见"></textarea>
		</view>

		<view v-if="action == 'FINISH'">
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					维修前图片上传
				</view>
				<view class="action">
					{{beforeRepairImgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group ">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(img,index) in beforeRepairImgList" bindtap="ViewImage" :key="index" :data-url="beforeRepairImgList[index]">
						<image :src='beforeRepairImgList[index]' mode='aspectFill'></image>
						<view class="cu-tag bg-red" @tap="_deleteBeforeRepairImage(index)" :data-index="index">
							<text class="cuIcon-close"></text>
						</view>
					</view>
					<view class="solids" @tap="_chooseBeforeRepairImage" v-if="beforeRepairImgList.length<4">
						<text class="cuIcon-cameraadd"></text>
					</view>
				</view>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					维修后图片上传
				</view>
				<view class="action">
					{{afterRepairImgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group ">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(img,index) in afterRepairImgList" bindtap="ViewImage" :key="index" :data-url="afterRepairImgList[index]">
						<image :src='afterRepairImgList[index]' mode='aspectFill'></image>
						<view class="cu-tag bg-red" @tap="_deleteAfterRepairImage(index)" :data-index="index">
							<text class="cuIcon-close"></text>
						</view>
					</view>
					<view class="solids" @tap="_chooseAfterRepairImage" v-if="afterRepairImgList.length<4">
						<text class="cuIcon-cameraadd"></text>
					</view>
				</view>
			</view>
		</view>
		<view v-else>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					图片上传
				</view>
				<view class="action">
					{{imgList.length}}/4
				</view>
			</view>
			<view class="cu-form-group ">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(img,index) in imgList" bindtap="ViewImage" :key="index" :data-url="imgList[index]">
						<image :src='imgList[index]' mode='aspectFill'></image>
						<view class="cu-tag bg-red" @tap="_deleteImage(index)" :data-index="index">
							<text class="cuIcon-close"></text>
						</view>
					</view>
					<view class="solids" @tap="_chooseImage" v-if="imgList.length<4">
						<text class="cuIcon-cameraadd"></text>
					</view>
				</view>
			</view>
		</view>

		<view v-if="action=='FINISH'" class="flex flex-direction margin-top">
			<button  class="cu-btn bg-green margin-tb-sm lg" @click="$preventClick(_finishRepair)">办结</button>
		</view>
		<view v-else class="flex flex-direction margin-top">
			<button  class="cu-btn bg-green margin-tb-sm lg" @click="_dispatchRepair()">提交</button>
		</view>

	</view>
</template>

<script>
	import {
		loadRepairStaff,
		dispatchRepair,
		finishRepair,
		queryResourceStoreResName,
		queryRepairInfo
	} from '../../api/repair/repair.js'
	import * as TanslateImage from '../../utils/translate-image.js';
	import {preventClick} from '../../utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	export default {
		data() {
			return {
				onoff: true,
				staffCloums: [{
					staffName: '请选择员工'
				}],
				action: '',
				repairId: '',
				publicArea: '',
				repairType: '',
				repairChannel: '',
				imgList: [],
				photos: [],
				beforeRepairImgList: [],
				afterRepairImgList: [],
				beforeRepairPhotos: [],
				afterRepairPhotos: [],
				repairStaffIndex: 0,
				staffId: '',
				staffName: '',
				content: '',
				userId: '',
				userName: '',
				feeFlag: '1002',
				amount: '',
				singlePrice: '',
				useNumber: 1,
				disabledPrice: false,
				feeCloums: [{
						id: "1002",
						name: '无偿'
					},
					{
						id: "1001",
						name: '有偿'
					}
				],
				feeIndex: 0,
				repairObjType: '',
				storeId:'',
				goodsTypeCloums: [{
					name: '请选择商品类型'
				}],
				goodsTypeIndex: 0,
				goodsType: '',
				goodsCloums: [{
					resName: '请选择商品'
				}],
				goodsIndex: 0,
				goods: {
					"resId": "",
					"outLowPrice": "",
					"outHighPrice": "",
				},
				isCustom: false,
				customGoodsName: '',
			}
		},
		onLoad(options) {
			this.publicArea = options.publicArea;
			this.action = options.action;
			this.repairId = options.repairId;
			this.repairType = options.repairType;
			this.repairObjType = options.repairObjType;
			this.repairChannel = options.repairChannel;
			let _userInfo = this.java110Context.getUserInfo();
			this.userId = _userInfo.userId;
			this.storeId = _userInfo.storeId
			this.userName = _userInfo.userName;
			if (this.action == 'BACK') {
				this.staffId = options.preStaffId
				this.staffName = options.preStaffName
			}
			this._loadRepairStaff();
			this._loadRepairGoodsType();
		},
		methods: {
			_loadRepairStaff: function() {
				let _that = this;
				let _data = {
					repairType: this.repairType,
					communtiyId: this.factory.getCurrentCommunity().communityId,
					page: 1,
					row: 50,
					state: '9999'
				};
				loadRepairStaff(this, _data)
					.then(function(res) {
						let _json = res.data;
						if (_json.code != 0) {
							uni.showToast({
								icon: 'none',
								title: _json.msg
							});
							return;
						}
						let _data = _json.data;
						_that.staffCloums = _that.staffCloums.concat(_data);
					});
			},
			
			_loadRepairGoodsType: function(){
				let _that = this;
				let _data = {
					name: "resource_store",
					type: "goods_type"
				};
				queryRepairInfo(this, _data)
					.then(function(res) {
						_that.goodsTypeCloums = _that.goodsTypeCloums.concat(res);
					});
			},
			
			_loadRepairGoods: function(){
				let _that = this;
				let _data = {
					resId: "",
					goodsType: this.goodsType
				};
				queryResourceStoreResName(this, _data)
					.then(function(res) {
						let _json = res.data;
						if (_json.code != 0) {
							uni.showToast({
								icon: 'none',
								title: _json.msg
							});
							return;
						}
						let _data = _json.data;
						_that.goodsCloums = [{resName: '请选择商品'}]
						_that.goodsIndex = 0;
						_that.goods = '';
						_that.amount = '';
						if(_data.length < 1){
							return;
						}
						_that.goodsCloums = _that.goodsCloums.concat(_data);
						// 如果是“其他类” 追加 “自定义” 选项
						if(_that.goodsTypeCloums[_that.goodsTypeIndex].statusCd == '1003'){
							_that.goodsCloums = _that.goodsCloums.concat([{resName: '自定义'}]);
						}
					});
			},
			
			staffChange: function(e) {
				this.repairStaffIndex = e.target.value //取其下标
				if (this.repairStaffIndex == 0) {
					this.staffId = '' //选中的id
					this.staffName = ''
					return;
				}
				let selected = this.staffCloums[this.repairStaffIndex] //获取选中的数组

				this.staffId = selected.staffId //选中的id
				this.staffName = selected.staffName
			},
			feeChange: function(e) {
				this.feeIndex = e.target.value //取其下标
				if (this.feeIndex == 0) {
					this.feeFlag = '1002' //选中的id
					return;
				}
				let selected = this.feeCloums[this.feeIndex] //获取选中的数组
				this.feeFlag = selected.id //选中的id
			},
			goodsTypeChange: function(e){
				this.goodsTypeIndex = e.target.value //取其下标
				if (this.goodsTypeIndex == 0) {
					this.goodsType = ''
					return;
				}
				let selected = this.goodsTypeCloums[this.goodsTypeIndex] //获取选中的数组
				this.goodsType = selected.statusCd //选中的id
				this._loadRepairGoods();
			},
			
			goodsChange: function(e){
				this.goodsIndex = e.target.value //取其下标
				if (this.goodsIndex == 0) {
					this.goods = ''
					return;
				}
				// 自定义商品
				if(this.goodsCloums[this.goodsIndex].resName == "自定义"){
					this.goods = ''
					this.isCustom = true;
					return;
				}else{
					this.isCustom = false;
				}
				let selected = this.goodsCloums[this.goodsIndex] //获取选中的数组
				this.goods = selected
				if(selected.outLowPrice == selected.outHighPrice){
					this.singlePrice = selected.outLowPrice;
					this.disabledPrice = true;
				}else{
					this.singlePrice = '';
					this.disabledPrice = false;
				}
				this._updateTotalAmount();
			},
			
			goodsSinglePriceChange: function(e){
				this._updateTotalAmount();
			},
			
			// goodsNumChange: function(e){
			// 	this._updateTotalAmount();
			// },
			numDec: function(){
				if(this.useNumber <= 1){
					uni.showToast({
						title: '不能再减少了',
						icon: 'none'
					})
					return;
				}
				this.useNumber -= 1;
				this._updateTotalAmount();
			},
			
			numInc: function(){
				if(this.useNumber >= this.goods.stock){
					uni.showToast({
						title: '库存不足',
						icon: 'none'
					})
					return;
				}
				this.useNumber += 1;
				this._updateTotalAmount();
			},
			
			_updateTotalAmount: function(){
				let total = this.useNumber * this.singlePrice;
				this.amount = total.toFixed(2);
			},
			
			// _priceChange: function(e){
			// 	let price = e.detail.value;
			// 	this.amount = price;
			// },
			
			_deleteImage: function(e) {
				let imageArr = this.imgList;
				imageArr.splice(e, 1);
				this.photos.splice(e, 1);
			},
			_deleteBeforeRepairImage: function(e){
				let imageArr = this.beforeRepairImgList;
				imageArr.splice(e, 1);
				this.beforeRepairPhotos.splice(e, 1);
			},
			_deleteAfterRepairImage: function(e){
				let imageArr = this.afterRepairImgList;
				imageArr.splice(e, 1);
				this.afterRepairPhotos.splice(e, 1);
			},
			_chooseImage: function(e) {
				let that = this;
				wx.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.imgList.push(res.tempFilePaths[0]);
						// let _base64Photo = '';
						// this.java110Factory.base64.urlTobase64(res.tempFilePaths[0]).then(function(_res) {
						// 	_base64Photo = _res;
						// 	that.photos.push(_base64Photo);
						// });
						var tempFilePaths = res.tempFilePaths[0]

						//#ifdef H5
						TanslateImage.translate(tempFilePaths, (url) => {
							that.photos.push(url);
						})
						//#endif
					}
				});
			},
			_chooseBeforeRepairImage: function(e){
				let that = this;
				wx.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.beforeRepairImgList.push(res.tempFilePaths[0]);
						var tempFilePaths = res.tempFilePaths[0]
						//#ifdef H5
						TanslateImage.translate(tempFilePaths, (url) => {
							that.beforeRepairPhotos.push(url);
						})
						//#endif
					}
				});
			},
			_chooseAfterRepairImage: function(e){
				let that = this;
				wx.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						that.afterRepairImgList.push(res.tempFilePaths[0]);
						var tempFilePaths = res.tempFilePaths[0]
						//#ifdef H5
						TanslateImage.translate(tempFilePaths, (url) => {
							that.afterRepairPhotos.push(url);
						})
						//#endif
					}
				});
			},

			_dispatchRepair: function(e) {

				dispatchRepair(this)
					.then(function(res) {
						let _json = res.data;
						if (_json.code == 0) {
							uni.navigateBack({
								delta: 1
							})
							return;
						}
						wx.showToast({
							title: _json.msg,
							icon: 'none',
							duration: 2000
						})
					});
			},
			_finishRepair: function() {
				uni.showLoading({
					title:"处理中..."
				})
				finishRepair(this)
					.then(function(res) {
						let _json = res.data;
						if (_json.code == 0) {
							uni.navigateBack({
								delta: 1
							})
							return;
						}
						wx.showToast({
							title: _json.msg,
							icon: 'none',
							duration: 2000
						})
					});
			}

		}
	}
</script>

<style>
	.use-num-container{
		display: flex;
		flex-direction: row;
	}
	.use-num-input{
		width: 100rpx;
		text-align: center;
		padding: 0;
	}
	.inc,.dec{
		border: 1px solid #000;
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
	}
	.dec{
		
	}
	.inc{
		
	}
</style>
