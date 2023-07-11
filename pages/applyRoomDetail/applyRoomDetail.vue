<template>
	<view>
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow" @click="showApplyRoomRecord()">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">空置房跟踪记录</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">查看</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-edit text-green"></text>
					<text class="text-grey">申请ID</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyRoomInfo.ardId}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-ticket text-green"></text>
					<text class="text-grey">申请类型</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyRoomInfo.applyTypeName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">申请房间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyRoomInfo.roomName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">申请人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyRoomInfo.createUserName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-phone text-green"></text>
					<text class="text-grey">联系方式</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyRoomInfo.createUserTel}}</text>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">开始时间</text>
				</view>
				<picker mode="date" :value="applyRoomInfo.startTime" start="2020-09-01" end="2050-09-01" :disabled="pickerDisabled" @change="dateStartChange">
					<view class="picker">
						{{applyRoomInfo.startTime}}
					</view>
				</picker>
			</view>
			<view class="cu-item arrow">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">结束时间</text>
				</view>
				<picker mode="date" :value="applyRoomInfo.endTime" start="2020-09-01" end="2050-09-01" :disabled="pickerDisabled" @change="dateEndChange">
					<view class="picker">
						{{applyRoomInfo.endTime}}
					</view>
				</picker>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-footprint text-green"></text>
					<text class="text-grey">申请备注</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyRoomInfo.createRemark}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="applyRoomInfo.state>1">
				<view class="content">
					<text class="cuIcon-footprint text-green"></text>
					<text class="text-grey">验房备注</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyRoomInfo.checkRemark}}</text>
				</view>
			</view>
			<view class="cu-item" v-if="applyRoomInfo.state>3">
				<view class="content">
					<text class="cuIcon-footprint text-green"></text>
					<text class="text-grey">审核备注</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyRoomInfo.reviewRemark}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">当前状态</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{applyRoomInfo.stateName}}</text>
				</view>
			</view>
			<!-- 验房状态 -->
			<view class="cu-item" v-if="applyRoomInfo.state == 1">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">验房状态</text>
				</view>
				<picker mode="selector" :value="checkState.state" :range="checkStateRange" range-key="name" @change="checkStateRangeChange">
					<view class="picker">
						{{checkState.name?checkState.name:"请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-item" v-if="applyRoomInfo.state == 1">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">验房备注</text>
				</view>
				<input type="text" v-model="checkRemark" @blur="onBlur()">
			</view>
			<uploadImageAsync v-if="applyRoomInfo.state == 1" ref="vcUploadRef" :maxPhotoNum="maxPhotoNum" :sendImgList="sendImgList" @sendImagesData="getBase64List"></uploadImageAsync>
			
			
			<view class="cu-item" v-if="applyRoomInfo.state == 2">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">审批状态</text>
				</view>
				<picker mode="selector" :value="reviewState.state" :range="reviewStateRange" range-key="name" @change="reviewStateRangeChange">
					<view class="picker">
						{{reviewState.name?reviewState.name:"请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-item" v-show="applyRoomInfo.state == 2 && reviewState.state == 4">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">折扣类型</text>
				</view>
				<picker mode="selector" :value="discountType.id" :range="discountTypeRange" range-key="name" @change="discountTypeRangeChange">
					<view class="picker">
						{{discountType.name?discountType.name:"请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-item" v-show="applyRoomInfo.state == 2 && reviewState.state == 4 && discountIdRange.length > 0">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">折扣名称</text>
				</view>
				<picker mode="selector" :value="discountId.discountId" :range="discountIdRange" range-key="discountName" @change="discountIdRangeChange">
					<view class="picker">
						{{discountId.discountName?discountId.discountName:"必填,请选择"}}
					</view>
				</picker>
			</view>
			<view class="cu-item" v-show="applyRoomInfo.state == 2 && reviewState.state == 4">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">返还方式</text>
				</view>
				<picker mode="selector" :value="returnWayIndex" :range="returnWays" range-key="statName" @change="returnWaysChange">
					<view class="picker">
						{{returnWay ? returnWays[returnWayIndex].statName : '请选择返还方式'}}
					</view>
				</picker>
			</view>
			<view class="cu-item" v-show="applyRoomInfo.state == 2 && reviewState.state == 4 && returnWay == '1002'">
				<view class="checkbox-area">
					<checkbox-group @change="checkboxChange">
						<view class="checkbox text-df text-grey" v-for="(item,index) in fees" :key="index">
							<checkbox :value="item.detailId" :checked="item.checked" />【{{item.feeName}}】<text class="text-red">{{item.receivedAmount}}元</text> - {{item.createTime}}
						</view>
					</checkbox-group>
				</view>
			</view>
			<view class="cu-item" v-if="applyRoomInfo.state == 2">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">审批备注</text>
				</view>
				<input type="text" v-model="reviewRemark" @blur="onBlur()">
			</view>
			<uploadImageAsync v-if="applyRoomInfo.state == 2" ref="vcUploadRef" :maxPhotoNum="maxPhotoNum" :sendImgList="sendImgList" :canEdit="canEdit" :title="imgTitle"></uploadImageAsync>
			<view class="cu-item">
				<button class="btn-check" v-if="applyRoomInfo.state == 1 && this.java110Context.hasPrivilege('502021010723590006')" @click="submit()">验房</button>
				<button class="btn-check" v-if="applyRoomInfo.state == 2 && this.java110Context.hasPrivilege('502021010761730007')" @click="submit()">审核</button>
			</view>
		</view>
	</view>
</template>

<script>
	// const factory = context.factory;
	import dateUtil from '../../lib/java110/utils/date.js'
	import {loadApplyRooms,loadFeeDiscount,uploadCheckUpdate,uploadReviewUpdate} from '../../api/apply/apply.js'
	import {listFeeDetail} from '../../api/fee/fee.js'
	import uploadImageAsync from "../../components/vc-upload-async/vc-upload-async.vue";	
	export default {
		data() {
			return {
				applyRoomInfo: {},
				errorSwitch: false,
				checkStateRange: [{'state':2,'name':'验房通过'},{'state':3,'name':'验房不通过'}],
				reviewStateRange: [{'state':4,'name':'审批通过'},{'state':5,'name':'审批不通过'}],
				checkState:{}, // 选中的验房状态
				reviewState:{}, // 选中的审批状态
				checkRemark: '', // 验房备注
				reviewRemark: '' ,// 审批备注
				discountTypeRange: [{'id':'3003','name':'优惠(需要申请)'}],
				discountType: {}, // 折扣类型
				discountIdRange: [],
				discountId: {}, // 折扣名称
				returnWays: [{'statCd': 1001, 'statName': '享受缴纳折扣'},{'statCd': 1002, 'statName': '返还至余额账户'}],
				returnWayIndex: 0,
				returnWay: '',
				fees: [], // 所选费用项缴费历史
				selectedFees: [],
				maxPhotoNum: 4,
				sendImgList: [],
				photos: [],
				canEdit: false,
				imgTitle: '图片材料'
			};
		},

		components: {
			uploadImageAsync
		},
		props: {},
		computed:{
			pickerDisabled(){
				return !((this.applyRoomInfo.state == 1 && this.java110Context.hasPrivilege('502021010723590006')) || (this.applyRoomInfo.state == 2 && this.java110Context.hasPrivilege('502021010761730007')));
			}
		},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.java110Context.onLoad();
			let _that = this;
			let _objData = {
				page: 1,
				row: 1,
				communityId: options.communityId,
				ardId: options.ardId
			};
			loadApplyRooms(this,_objData)
			.then(function(res){
				_that.applyRoomInfo = res.data[0];
				_that.sendImgList = _that.applyRoomInfo.urls;
				console.log(_that.sendImgList);
				_that.applyRoomInfo.startTime = _that.applyRoomInfo.startTime.split(' ')[0];
				_that.applyRoomInfo.endTime = _that.applyRoomInfo.endTime.split(' ')[0];
				_that._listFeeDetail();
			})
			// 由于数据库中存储的结束日期为第二天的0点，因此在此将结束日期减一天
			// let secondsOfEnd = new Date(_that.applyRoomInfo.endTime.split(' ')[0].replace(/-/g, "/")).getTime()-1000*60*60*24;
			// let yesterDay = dateUtil.date2String(secondsOfEnd).split(' ')[0];
			// _that.applyRoomInfo.endTime = yesterDay;
		},

		/**
		 * 生命周期函数--监听页面初次渲染完成
		 */
		onReady: function() {},

		/**
		 * 生命周期函数--监听页面显示
		 */
		onShow: function() {},
		
		methods: {
			getBase64List: function(_data){
				this.photos = _data;
			},
			/**
			 * 查询费用项缴费历史
			 */
			_listFeeDetail: function(){
				let _that = this;
				let params = {
					page: 1,
					row: 50,
					communityId: this.applyRoomInfo.communityId,
					feeId: this.applyRoomInfo.feeId,
				};
				listFeeDetail(this, params).then(function(res){
					_that.fees = res.data.feeDetails;
				});
			},
			
			/**
			 * 缴费历史复选框选择
			 * @param {Object} e
			 */
			checkboxChange: function (e) {
				var values = e.detail.value;
				this.selectedFees = values;
				this.fees.forEach((item, index) => {
					if(values.includes(item.detailId)){
						item.checked = true;
					}
				});
			},
			
			empty: function(){},
			
			/**
			 * 失去焦点
			 */
			onBlur: function(){
				uni.pageScrollTo({
				    scrollTop: 0
				});
			},

			/**
			 * 类型修改
			 * @param {Object} e
			 */
			applyTypeChange: function(e){
				this.applyType = this.applyTypes[e.detail.value].applyType;
				this.applyTypeShow = this.applyTypes[e.detail.value].typeName;
			},
			
			/**
			 * 修改开始时间
			 * @param {Object} e
			 */
			dateStartChange: function(e) {
				this.applyRoomInfo.startTime = e.detail.value;
			},
			
			/**
			 * 修改结束时间
			 * @param {Object} e
			 */
			dateEndChange: function(e) {
				this.applyRoomInfo.endTime = e.detail.value;
			},
			
			/**
			 * 关闭弹窗
			 */
			switchShowModel: function(){
				this.errorSwitch = this.errorSwitch ? false : true;
			},
			
			/**
			 * 修改折扣类型
			 * @param {Object} e
			 */
			discountTypeRangeChange: function(e){
				let _that = this;
				let index = e.detail.value;
				this.discountType = this.discountTypeRange[index];
				let params = {
					page: 1,
					row: 100,
					discountType: this.discountType.id,
					communityId: this.applyRoomInfo.communityId,
				};
				loadFeeDiscount(this, params).then(function(res){
					_that.discountIdRange = res
				});				
			},
			
			/**
			 * 修改折扣名称
			 * @param {Object} e
			 */
			discountIdRangeChange: function(e){
				let index = e.detail.value;
				this.discountId = this.discountIdRange[index];
			},
			
			/**
			 * 修改返还方式
			 * @param {Object} e
			 */
			returnWaysChange: function(e){
				let index = e.detail.value;
				this.returnWayIndex = index;
				this.returnWay = this.returnWays[index].statCd;
			},
			
			/**
			 * 修改验房状态
			 */
			checkStateRangeChange: function(e){
				let index = e.detail.value;
				this.checkState = this.checkStateRange[index];
				this.checkRemark = this.checkState.name;
			},
			
			/**
			 * 修改审批状态
			 */
			reviewStateRangeChange: function(e){
				let index = e.detail.value;
				this.reviewState = this.reviewStateRange[index];
				this.reviewRemark = this.reviewState.name;
			},
			
			/**
			 * 保存修改
			 */
			submit: function(){
				uni.showLoading({
					title:"请稍候..."
				})
				let _that = this;
				// 公共参数
				let startTime = this.applyRoomInfo.startTime + ' 0:00:00';
				// let endTime = dateUtil.date2String(dateUtil.addDay(new Date(this.applyRoomInfo.endTime.replace(/-/g, "/")), 1));
				let endTime = this.applyRoomInfo.endTime + ' 23:59:59';
				let ardId = this.applyRoomInfo.ardId;
				let communityId = this.applyRoomInfo.communityId;
				let createRemark = this.applyRoomInfo.createRemark;
				let params = {
					startTime: startTime,
					endTime: endTime,
					ardId: ardId,
					communityId: communityId,
					createRemark: createRemark
				};
				if(!dateUtil.compareDate(this.applyRoomInfo.endTime, this.applyRoomInfo.startTime)){
					uni.hideLoading();
					uni.showToast({
						title: '时间范围有误'
					});
					return;
				}
				if(this.applyRoomInfo.state == 1){
					// 验房提交
					let state = this.checkState.state;
					if(state == null || !state){
						uni.hideLoading();
						uni.showToast({
							title: '请选择验房状态'
						});
						return;
					}
					let checkRemark = this.checkRemark;
					if(checkRemark == '' || !checkRemark){
						uni.hideLoading();
						uni.showToast({
							title: '请填写验房备注'
						});
						return;
					}
					params.state = state;
					params.checkRemark = checkRemark;
					let _photos = [];
					this.photos.forEach(item=>{
						_photos.push(item.fileId);
					})
					params.photos = _photos;
					uploadCheckUpdate(this,params).then(function(res){
						uni.hideLoading();
						uni.showToast({
							title:"保存成功"
						})
						setTimeout(()=>{
							uni.navigateBack({})
						},1000)
					});
				}else{
					let msg = '';
					if(this.reviewState.state == null || !this.reviewState.state){
						msg = '请选择审批状态';
					}else if(this.reviewState.state == 4 && (this.discountId.discountId == null || !this.discountId.discountId)){
						msg = '请选择优惠名称';
					}else if(this.reviewState.state == 4 && this.returnWay == ''){
						msg = '请选择退还方式';
					}else if(this.reviewState.state == 4 && this.returnWay == '1002' && this.selectedFees.length <= 0){
						msg = '请选择缴费记录';
					}else if(this.reviewRemark == ''){
						msg = '请填写审批备注';
					}
					if(msg != ''){
						uni.hideLoading();
						uni.showToast({
							title: msg,
							icon: 'none'
						});
						return;
					}
					params.state = this.reviewState.state;
					params.reviewRemark = this.reviewRemark;
					params.discountType = this.discountType.id;
					params.discountId = this.discountId.discountId;
					params.returnWay = this.returnWay;
					params.selectedFees = this.selectedFees;
					params.feeId = this.applyRoomInfo.feeId;
					params.roomId = this.applyRoomInfo.roomId;
					params.checkRemark = this.applyRoomInfo.checkRemark;
					params.createRemark = this.applyRoomInfo.createRemark;
					params.fees = this.fees;
					params.configId = '';
					params.discounts = this.discountIdRange;
					uploadReviewUpdate(this,params).then(function(res){
						uni.hideLoading();
						uni.showToast({
							title:"保存成功"
						})
						setTimeout(()=>{
							_that.goBack();
						},1000)
					});
				}
			},
			
			goBack: function() {   
				// #ifdef H5  
				let canBack = true  
				const pages = getCurrentPages()  
				// 有可返回的页面则直接返回，uni.navigateBack默认返回失败之后会自动刷新页面 ，无法继续返回  
				if (pages.length > 1) {  
					uni.navigateBack(1)  
					return;  
				}  
				// vue router 可以返回uni.navigateBack失败的页面 但是会重新加载  
				let a = this.$router.go(-1)  
				// router.go失败之后则重定向到首页  
				if (a == undefined) {  
					uni.reLaunch({  
						url: "/pages/applyRoom/applyRoom"  
					})  
				}  
				return;  
				// #endif  
				uni.navigateBack(1)  
			},
			
			/**
			 * 查看跟踪记录
			 */
			showApplyRoomRecord: function(){
				uni.navigateTo({
					url: '/pages/applyRoomRecord/applyRoomRecord?apply=' + JSON.stringify(this.applyRoomInfo)
				});
			},
		}
	};
</script>

<style>
	.btn-check{
		width: 50%;
		margin: 30rpx auto;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		background-color: #00AA00;
		border-radius: 15rpx;
		color: #fff;
		font-size: 32rpx;
	}
	/* 弹出框 */
	.pop-bg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.4);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pop-box{
		position: relative;
		width: 85%;
		max-height: 1000rpx;
		background-color: #fff;
		border-radius: 15rpx;
		padding-bottom: 85rpx;
	}
	.pop-title{
		padding: 30rpx 0;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
	}
	.pop-bottom{
		width: 100%;
		position: absolute;
		bottom: 0;
	}
	.btn-box{
		width: 90%;
		margin: 0 auto;
		border-top: 1px solid #F6F6F8;
		display: flex;
		
	}
	.cancel, .confirm{
		width: 50%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 40rpx;
		font-weight: 400;
	}
	.cancel{
		color: #999999;
	}
	.confirm{
		color: #3488FE;
	}
	.checkbox-area{
		max-height: 160rpx;
		overflow-y: scroll;
	}
</style>
