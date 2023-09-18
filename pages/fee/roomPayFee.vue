<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入房屋编号 楼栋-单元-房屋" v-model="roomName" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn line-blue round" @tap="_queryRoom()">搜索</button>
				<button v-if="roomInfo.roomId" class="cu-btn line-blue round margin-left" @tap="_createFee()">创建费用</button>
				
			</view>
		</view>
		<view>
			<view class="block__title">房屋信息</view>
			<view class="cu-form-group">
				<view class="title">房屋编号</view>
				{{roomInfo.floorNum !=undefined ?roomInfo.floorNum +'-'+roomInfo.unitNum+'-'+roomInfo.roomNum:''}}
			</view>
			<view class="cu-form-group">
				<view class="title">建筑面积</view>
				{{roomInfo.builtUpArea != undefined ?roomInfo.builtUpArea+'平方米':''}}
			</view>
			<view class="cu-form-group" >
				<view class="title">业主</view>
				<view>{{roomInfo.ownerName}}<text v-if="roomInfo.link">({{roomInfo.link}})</text></view>
			</view>
			
			<scroll-view scroll-x class="bg-white nav margin-top">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="active==0?'text-green cur':''" @tap="tabSelect(0)">
						欠费缴费
					</view>
					<view class="cu-item flex-sub" :class="active==1?'text-green cur':''" @tap="tabSelect(1)">
						缴费记录
					</view>
				</view>
			</scroll-view>
			
			<view v-show="active == 0" class="margin-top-xs">
				<owe-fee ref="oweFeeRef" ></owe-fee>
			</view>
			<view v-show="active == 1" class="margin-top-xs">
				<fee-detail ref="feeDetailRef" ></fee-detail>
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
		getCurrentCommunity
	} from '../../api/community/community.js';
	
	import oweFee from '../../components/fee/owe-fee.vue';
	import feeDetail from '../../components/fee/fee-detail.vue';
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
				roomInfo: {
					ownerName: '',
					link: ""
				},
				active:0,
			}
		},
		components:{
			oweFee,
			feeDetail
		},
		onLoad() {
			this.java110Context.onLoad();
		},
		onShow() {
			this._queryRoom();
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
									_that.roomInfo.roomId = '';
									_that.tabSelect(0);
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
						_that.tabSelect(0);
					}, function() {

					})

			},
			_queryRoom: function() {
				if (!this.roomName) {
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
			tabSelect:function(_active){
				this.active = _active;
				if(this.active == 0){
					this.$refs.oweFeeRef._loadRoomOweFee({
						roomId:this.roomInfo.roomId,
					});
					return;
				}
				if(this.active == 1){
					this.$refs.feeDetailRef._loadFeeDetails({
						roomId:this.roomInfo.roomId,
					});
					return;
				}
			},
			_createFee:function(){
				uni.navigateTo({
					url:'/pages/fee/createFee?payerObjId='+this.roomInfo.roomId+"&payerObjName="+this.roomInfo.roomName
				})
			}
		}
	}
</script>

<style lang="scss">
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

	.sub-info {
		background-color: #fff;
		//margin-top: 0.5upx;
		padding: 15upx;

		.sub-info-item {
			width: 45%;
			margin: 10upx 15upx 0upx 15upx;
		}
	}
</style>
