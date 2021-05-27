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
			<view class="cu-form-group margin-top" v-if="repairObjType!='004'">
				<view class="title">是否用料</view>
				<picker :value="feeIndex" :range="feeCloums" :range-key="'name'" @change="feeChange">
					<view class="picker">
						{{feeCloums[feeIndex].name}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top" v-if="repairObjType=='004'">
				<view class="title">维修类型</view>
				<picker :value="feeIndex" :range="feeCloums" :range-key="'name'" @change="feeChange">
					<view class="picker">
						{{feeCloums[feeIndex].name}}
					</view>
				</picker>
			</view>
			<view v-if="feeFlag=='1001' || feeFlag=='1003'" class="flex flex-direction margin-top">
				<button class="cu-btn bg-blue margin-tb-sm lg" @click="_openSelectResourceModel()">选择商品</button>
			</view>
			<view v-if="resourceStoreInfo.length > 0">
				<view class="resource-item" v-for="(item, index) in resourceStoreInfo">
					<text class="item-t" v-if="!item.isCustom">{{item.resName}}</text>
					<text class="item-t" v-else>{{item.customGoodsName}}</text>
					<text class="item-t" v-show="feeFlag=='1001'">({{item.price}})</text>
					<text class="item-t">* {{item.useNumber}}</text>
					<text class="t-remove" @click="_removeResourceItem(index)">移除</text>
				</view>
			</view>
			<view class="cu-form-group margin-top" v-if="feeFlag=='1001'">
				<view class="title">总计</view>
				<input v-model="amount" disabled="disabled"></input>
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
		<select-single-resource @getResourceInfo="_getResourceInfo" ref="selectsingleresource" :feeFlag="feeFlag"></select-single-resource>
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
	import selectSingleResource from '../../components/select-single-resource/select-single-resource.vue'
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
				feeFlag: '',
				amount: 0,
				feeCloums: [
					{
						id: "",
						name: '请选择'
					}
				],
				feeIndex: 0,
				repairObjType: '',
				storeId:'',
				resourceStoreInfo: [],
			}
		},
		components:{
			selectSingleResource
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
			if(this.repairObjType == '004'){
				this.feeCloums.push({
						id: "1001",
						name: '有偿服务'
					},
					{
						id: "1002",
						name: '无偿服务'
					});
			}else{
				this.feeCloums.push({
						id: "1003",
						name: '需要用料'
					},
					{
						id: "1004",
						name: '无需用料'
					});
			}
			this._loadRepairStaff();
		},
		methods: {
			// 接收所选择物品信息
			_getResourceInfo: function(data){
				data = JSON.parse(data);
				this.resourceStoreInfo.push(data);
				this._updateTotalPrice();
			},
			_updateTotalPrice: function(){
				this.amount = 0;
				this.resourceStoreInfo.forEach((item) => {
					this.amount += parseFloat(item.useNumber) * parseFloat(item.price);
				})
			},
			_removeResourceItem: function(index){
				this.resourceStoreInfo.splice(index, 1);
			},
			_openSelectResourceModel: function(){
				this.$refs.selectsingleresource.switchShow();
			},
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
					this.feeFlag = '' //未选择
					return;
				}
				let selected = this.feeCloums[this.feeIndex] //获取选中的数组
				this.feeFlag = selected.id //选中的id
			},
			
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
	.resource-item{
		width: 90%;
		margin: 0 auto;
		height: 60rpx;
		line-height: 60rpx;
	}
	.item-t{
		
	}
	.t-remove{
		float: right;
		color: #0081FF;
		text-decoration: underline;
	}
</style>
