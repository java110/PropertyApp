<template>
	<view>
		<view class="cu-list menu margin-top">
			<view class="cu-item arrow" @click="showRenovationRecord()">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">装修跟踪记录</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">查看</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">申请房间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{renovationInfo.roomName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-profile text-green"></text>
					<text class="text-grey">申请人</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{renovationInfo.personName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-phone text-green"></text>
					<text class="text-grey">联系方式</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{renovationInfo.personTel}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">开始时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{renovationInfo.startTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">结束时间</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{renovationInfo.endTime}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-footprint text-green"></text>
					<text class="text-grey">申请备注</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{renovationInfo.remark}}</text>
				</view>
			</view>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-time text-green"></text>
					<text class="text-grey">当前状态</text>
				</view>
				<view class="action">
					<text class="text-grey text-sm">{{renovationInfo.stateName}}</text>
				</view>
			</view>
			<view class="cu-item">
				<button class="btn-check" v-if="renovationInfo.state == 1000 && this.java110Context.hasPrivilege('502021031698730003')" @click="switchShowModel()">审核</button>
				<button class="btn-check" v-if="renovationInfo.state == 4000 && this.java110Context.hasPrivilege('502021012701630060')" @click="switchShowModel()">验收</button>
			</view>
		</view>
		<!-- 编辑模态框 -->
		<view class="pop-bg" @click="switchShowModel()" v-show="errorSwitch">
			<view class="pop-box" @click.stop="empty">
				<view class="pop-title">{{renovationInfo.state == 1000 ? "审核" : "验收"}}</view>
				<view class="cu-list menu margin-top" v-if="renovationInfo.state == 1000">
					<!-- 审核状态 -->
					<view class="cu-item arrow">
						<view class="content">
							<text class="cuIcon-time text-green"></text>
							<text class="text-grey">审核状态</text>
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
							<text class="text-grey">审核备注</text>
						</view>
						<input type="text" v-model="checkRemark" @blur="onBlur()">
					</view>
				</view>
				<view class="cu-list menu margin-top" v-if="renovationInfo.state == 4000">
					<view class="cu-item arrow">
						<view class="content">
							<text class="cuIcon-time text-green"></text>
							<text class="text-grey">验收状态</text>
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
							<text class="text-grey">验收备注</text>
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
	import {updateRoomToExamine,saveRoomRenovationDetail} from '../../api/renovation/renovation.js'
	export default {
		data() {
			return {
				renovationInfo: {},
				errorSwitch: false,
				checkStateRange: [{'state':3000,'name':'审核通过'},{'state':2000,'name':'审核不通过'}],
				reviewStateRange: [{'state':5000,'name':'验收通过'},{'state':6000,'name':'验收不通过'}],
				checkState:{}, // 选中的审核状态
				reviewState:{}, // 选中的验收状态
				checkRemark: '', // 审核备注
				reviewRemark: '' ,// 验收备注
			};
		},

		components: {},
		props: {},

		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			let _that = this;
			_that.renovationInfo = JSON.parse(options.apply);
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
			 * 关闭弹窗
			 */
			switchShowModel: function(){
				this.errorSwitch = this.errorSwitch ? false : true;
			},
			
			/**
			 * 修改审核状态
			 */
			checkStateRangeChange: function(e){
				let index = e.detail.value;
				this.checkState = this.checkStateRange[index];
			},
			
			/**
			 * 修改验收状态
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
				let params = {
					communityId: this.renovationInfo.communityId,
					rId: this.renovationInfo.rId,
					roomId: this.renovationInfo.roomId,
					roomName: this.renovationInfo.roomName,
					userId: this.renovationInfo.userId,
					detailType: '1001'
				};
				if(this.renovationInfo.state == 1000){
					// 审核提交
					let state = this.checkState.state;
					if(state == null || !state){
						uni.hideLoading();
						uni.showToast({
							title: '请选择审核状态'
						});
						return;
					}
					let checkRemark = this.checkRemark;
					if(checkRemark == '' || !checkRemark){
						uni.hideLoading();
						uni.showToast({
							title: '请填写审核备注'
						});
						return;
					}
					params.state = state;
					params.remark = checkRemark;
					updateRoomToExamine(this,params).then(function(res){
						uni.hideLoading();
						uni.showToast({
							title:"保存成功"
						})
						setTimeout(()=>{
							uni.navigateBack({})
						},1000)
					});
				}else{
					// 验收提交
					let state = this.reviewState.state;
					if(state == null || !state){
						uni.hideLoading();
						uni.showToast({
							title: '请选择验收状态'
						});
						return;
					}
					let reviewRemark = this.reviewRemark;
					if(reviewRemark == '' || !reviewRemark){
						uni.hideLoading();
						uni.showToast({
							title: '请填写验收备注'
						});
						return;
					}
					params.state = state;
					params.remark = reviewRemark;
					saveRoomRenovationDetail(this,params).then(function(res){
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
			
			/**
			 * 查看跟踪记录
			 */
			showRenovationRecord: function(){
				uni.navigateTo({
					url: '/pages/roomRenovationRecord/roomRenovationRecord?apply=' + JSON.stringify(this.renovationInfo)
				});
			},
			
			empty: function(){}
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
