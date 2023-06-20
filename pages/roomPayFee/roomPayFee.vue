<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入房屋编号 楼栋-单元-房屋" v-model="roomName" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_queryRoom()">搜索</button>
			</view>
		</view>
		<view>
			<view class="block__title">房屋信息</view>
			<view class="cu-form-group">
				<view class="title">房屋编号</view>
				{{roomInfo.floorNum !=undefined ?roomInfo.floorNum +'栋'+roomInfo.unitNum+'单元'+roomInfo.roomNum+'室':''}}
			</view>
			<view class="cu-form-group">
				<view class="title">建筑面积</view>
				{{roomInfo.builtUpArea != undefined ?roomInfo.builtUpArea+'平方米':''}}
			</view>
			<view class="cu-form-group">
				<view class="title">业主名称</view>
				{{roomInfo.ownerName}}
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				{{roomInfo.link}}
			</view>

			<view class="block__title" v-if="fees.length > 0">欠费信息</view>
			<view class="cu-list menu" v-for="(item,index) in fees" :key="index" :data-item="item">
				<view class="cu-item">
					<view class="content padding-tb-sm">
						<view>
							<view class="text-cut" style="width:220px">{{item.feeName}}</view>
						</view>
						<view class="text-gray text-sm">
							<text class="margin-right-xs">{{item.endTime}}至{{item.deadlineTime}}</text></view>
					</view>
					<view class="action">
						<text class="text-grey text-sm">应缴:￥{{item.feeTotalPrice}}</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="fees.length > 0" class="bg-white  border flex justify-end" style="position: fixed;width: 100%;bottom: 0;">

			<view class="action text-orange margin-right line-height">
				合计：{{receivableAmount}}元
			</view>
			<view class="btn-group">

				<button class="cu-btn bg-red shadow-blur lgplus sharp" @click="_payOweFee()">提交订单</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		loadRooms,
		loadRoomAndOwner
	} from '../../api/room/room.js';
	import {
		getRoomOweFees,
		toPayOweFee
	} from '../../api/fee/fee.js';
	
	import {getCurrentCommunity} from '../../api/community/community.js'
	export default {
		data() {
			return {
				floorNum: '',
				floorId: '',
				unitNum: '',
				unitId: '',
				roomNum: '',
				roomId: '',
				roomName: '',
				roomInfo: {},
				fees: [],
				receivableAmount: 0.0,
				payModal: false,
				payQrImg: '',
				roomInfo:{
					ownerName:'',
					link:""
				}
			}
		},
		onLoad() {
			this.java110Context.onLoad();
		},
		onShow() {
			this._queryRoom();
			// if(this.context.isPageBack()){
			// 	this.roomInfo = {
			// 		ownerName:'',
			// 		link:""
			// 	};
			// 	this.fees = [];
			// 	this.roomInfo.roomId = '';
			// 	this.roomNum = '';
			// }
		},
		methods: {
			/**
			 * 查询房屋信息
			 */
			_loadRoomInfo: function() {

				let _that = this;
				let _data = {
					page: 1,
					row: 1,
					communityId: getCurrentCommunity().communityId,
					floorNum: this.floorNum,
					unitNum: this.unitNum,
					roomNum: this.roomNum
				}
				loadRoomAndOwner(this, _data)
					.then(function(res) {
						return new Promise((resolve, reject) => {
							if (res.statusCode == 200) {
								let _rooms = res.data.rooms;
								if (res.data.total < 1) {
									uni.showToast({
										icon: 'none',
										title: '未查询到房屋'
									})
									_that.roomInfo = {};
									_that.fees = [];
									_that.roomInfo.roomId = '';
									reject();
									return;
								}
								_that.roomInfo = _rooms[0];
								resolve(_that.roomInfo);
							}
						})
					})
					.then(function(_roomInfo) {
						console.log('第二个then');
						_that._loadRoomOweFee();
					}, function() {

					})

			},
			_loadRoomOweFee: function() {

				if (this.roomInfo.roomId == '') {
					return;
				}
				let _that = this;
				let _objData = {
					payObjId: this.roomInfo.roomId,
					payObjType: '3333',
					page: 1,
					row: 50,
					communityId: getCurrentCommunity().communityId
				}

				getRoomOweFees(_that, _objData)
					.then(function(_fees) {
						_that.fees = _fees;
						return _fees;
					}, function(error) {
						uni.showToast({
							icon: 'none',
							title: '没有欠费信息'
						})
						_that.fees = [];
					})
					.then(function(_fees) {
						_that.receivableAmount = 0.0;
						_fees.forEach(function(_item) {
							_that.receivableAmount += _item.feePrice;

						})
						_that.receivableAmount = _that.receivableAmount.toFixed(2);
					})
			},
			_queryRoom: function() {
				if(!this.roomName){
					return;
				}
				let _allNum = this.roomName.split("-");

				if (_allNum.length != 3) {
					uni.showToast({
						icon: 'none',
						title: '输入房屋格式错误，如1-1-1'
					})
					return;
				}

				this.floorNum = _allNum[0];
				this.unitNum = _allNum[1];
				this.roomNum = _allNum[2];
				this._loadRoomInfo();
			},
			
			_payOweFee:function(){
				this.context.navigateTo({
					url:"/pages/payFeeByQrCode/payFeeByQrCode?communityId="
					+getCurrentCommunity().communityId
					+"&roomId="+this.roomInfo.roomId
				})
			}
		}
	}
</script>

<style>
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}

	.cu-list.menu-avatar>.cu-item .content-left {
		left: 30upx;
	}

	.cu-list+.cu-list {
		margin-top: 20upx;
	}

	.cu-btn.lgplus {
		padding: 0 20px;
		font-size: 18px;
		height: 100upx;

	}

	.cu-btn.sharp {
		border-radius: 0upx;
	}

	.line-height {
		line-height: 100upx;
	}
</style>
