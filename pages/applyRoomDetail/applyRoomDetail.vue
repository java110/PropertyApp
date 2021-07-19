<template>
	<view>
		<view class="cu-list menu margin-top">
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
				<picker mode="date" :value="applyRoomInfo.startTime" start="2020-09-01" end="2050-09-01" @change="dateStartChange">
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
				<picker mode="date" :value="applyRoomInfo.endTime" start="2020-09-01" end="2050-09-01" @change="dateEndChange">
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
			<view class="cu-item">
				<button class="btn-check" v-if="applyRoomInfo.state == 1 && this.java110Context.hasPrivilege('502021010723590006')" @click="switchShowModel()">验房</button>
				<button class="btn-check" v-if="applyRoomInfo.state == 2 && this.java110Context.hasPrivilege('502021010761730007')" @click="switchShowModel()">审核</button>
			</view>
		</view>
		<!-- 编辑模态框 -->
		<view class="pop-bg" @click="switchShowModel()" v-show="errorSwitch">
			<view class="pop-box" @click.stop="empty">
				<view class="pop-title">{{applyRoomInfo.state == 1 ? "验房" : "审核"}}</view>
				<view class="cu-list menu margin-top" v-if="applyRoomInfo.state == 1">
					<!-- 验房状态 -->
					<view class="cu-item arrow">
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
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-time text-green"></text>
							<text class="text-grey">验房备注</text>
						</view>
						<input type="text" v-model="checkRemark" @blur="onBlur()">
					</view>
				</view>
				<view class="cu-list menu margin-top" v-if="applyRoomInfo.state == 2">
					<view class="cu-item arrow">
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
					<view class="cu-item arrow">
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
					<view class="cu-item arrow">
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
					<view class="cu-item">
						<view class="content">
							<text class="cuIcon-time text-green"></text>
							<text class="text-grey">审批备注</text>
						</view>
						<input type="text" v-model="reviewRemark" @blur="onBlur()">
					</view>
				</view>
				<view class="pop-bottom">
					<view class="btn-box">
						<view class="cancel" @click="switchShowModel()">取消</view>
						<view class="confirm" @click="submit()">保存</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// const factory = context.factory;
	import dateUtil from '../../lib/java110/utils/date.js'
	import {loadFeeDiscount,uploadCheckUpdate,uploadReviewUpdate} from '../../api/apply/apply.js'
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
				discountTypeRange: [{'id':3003,'name':'优惠(需要申请)'}],
				discountType: {}, // 折扣类型
				discountIdRange: [],
				discountId: {}, // 折扣名称
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.java110Context.onLoad();
			let _that = this;
			_that.applyRoomInfo = JSON.parse(options.apply);
			_that.applyRoomInfo.startTime = _that.applyRoomInfo.startTime.split(' ')[0];
			// 由于数据库中存储的结束日期为第二天的0点，因此在此将结束日期减一天
			let secondsOfEnd = new Date(_that.applyRoomInfo.endTime.split(' ')[0].replace(/-/g, "/")).getTime()-1000*60*60*24;
			let yesterDay = dateUtil.date2String(secondsOfEnd).split(' ')[0];
			_that.applyRoomInfo.endTime = yesterDay;
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
			 * 修改验房状态
			 */
			checkStateRangeChange: function(e){
				let index = e.detail.value;
				this.checkState = this.checkStateRange[index];
			},
			
			/**
			 * 修改审批状态
			 */
			reviewStateRangeChange: function(e){
				let index = e.detail.value;
				this.reviewState = this.reviewStateRange[index];
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
				let endTime = dateUtil.date2String(dateUtil.addDay(new Date(this.applyRoomInfo.endTime.replace(/-/g, "/")), 1));
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
					// 审核提交
					let state = this.reviewState.state;
					if(state == null || !state){
						uni.hideLoading();
						uni.showToast({
							title: '请选择审批状态'
						});
						return;
					}
					let discountId = '';
					if(state == 4){
						// 只有当审核通过时，优惠名称必填
						params.checkRemark = this.applyRoomInfo.checkRemark;
						discountId = this.discountId.discountId;
						if(discountId == null || !discountId){
							uni.hideLoading();
							uni.showToast({
								title: '请选择优惠名称'
							});
							return;
						}
					}
					let reviewRemark = this.reviewRemark;
					if(reviewRemark == '' || !reviewRemark){
						uni.hideLoading();
						uni.showToast({
							title: '请填写审批备注'
						});
						return;
					}
					params.state = state;
					params.reviewRemark = reviewRemark;
					params.discountType = this.discountType.id;
					params.discountId = discountId;
					uploadReviewUpdate(this,params).then(function(res){
						uni.hideLoading();
						uni.showToast({
							title:"保存成功"
						})
						setTimeout(()=>{
							_that.goBack();
							// uni.navigateBack({})
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
		height: 700rpx;
		background-color: #fff;
		border-radius: 15rpx;
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
</style>
