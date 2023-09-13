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

			<view class="block__title" v-if="fees.length > 0">欠费信息</view>
			<checkbox-group class="block" @change="checkboxChange($event)">
				<view class="cu-list menu" v-for="(item,index) in fees" :key="index" :data-item="item">
					<view class="cu-item">
						<view class="content padding-tb-sm flex justify-start">
							<view>
								<checkbox :class="item.selected == '1'?'checked':''"
									:checked="item.selected == '1'?true:false" :value="item.feeId">
								</checkbox>
							</view>
							<view class="margin-left-sm" @click="_showDetailFee(item)">
								<view>
									<view class="text-cut" style="width:220px">{{item.feeName}}</view>
								</view>
								<view class="text-gray text-sm">
									<text class="margin-right-xs">{{item.endTime}}至{{_getDeadlineTime(item)}}</text>
								</view>
							</view>
						</view>
						<view class="action">
							<text class="text-grey text-sm">应缴:￥{{item.feeTotalPrice}}</text>
						</view>
					</view>
					<view class="sub-info flex justify-start flex-wrap" v-if="item.showDetail">
						<view class="sub-info-item text-gray text-sm" v-if="item.preDegrees">
							<text class="margin-right-xs">上期读数:{{item.preDegrees}}</text>
						</view>
						<view class="sub-info-item text-gray text-sm" v-if="item.preDegrees">
							<text class="margin-right-xs">上期读表时间:{{_getReadTime(item.preReadingTime)}}</text>
						</view>
						<view class="sub-info-item text-gray text-sm" v-if="item.curDegrees">
							<text class="margin-right-xs">本期读数:{{item.curDegrees}}</text>
						</view>
						<view class="sub-info-item text-gray text-sm" v-if="item.preDegrees">
							<text class="margin-right-xs">本期读表时间:{{_getReadTime(item.curReadingTime)}}</text>
						</view>
						<view class="sub-info-item text-gray text-sm" v-if="item.curDegrees">
							<text class="margin-right-xs">使用量:{{item.curDegrees-item.preDegrees}}</text>
						</view>
						<view class="sub-info-item text-gray text-sm">
							<text class="margin-right-xs">单价:{{item.squarePrice}}</text>
						</view>
					</view>
				</view>
			</checkbox-group>
		</view>
		<view v-if="fees.length > 0" class="bg-white  border flex justify-end"
			style="position: fixed;width: 100%;bottom: 0;">

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

	import {
		dateSubOneDay,
		formatDate 
	} from '../../lib/java110/utils/DateUtil.js';

	import {
		getCurrentCommunity
	} from '../../api/community/community.js'
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
				roomInfo: {
					ownerName: '',
					link: ""
				},
				feeIds: []
			}
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
						_fees.forEach(function(_item) {
							_item.selected = "1";
							_that.feeIds.push(_item.feeId);
						})
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
							_that.receivableAmount += _item.feeTotalPrice;

						})
						_that.receivableAmount = _that.receivableAmount.toFixed(2);
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

			_payOweFee: function() {
				this.context.navigateTo({
					url: "/pages/fee/payFeeByQrCode?communityId=" +
						getCurrentCommunity().communityId +
						"&roomId=" + this.roomInfo.roomId+"&feeIds="+this.feeIds.join(',')
				})
			},
			_getDeadlineTime: function(_fee) {
				//todo 处理周期性费用和间接费用的结束时间
				return dateSubOneDay(_fee.startTime, _fee.deadlineTime, _fee.feeFlag);
			},
			_getReadTime: function(_value) {
				let _date = getDate(_value);
				return formatDate(_date);
			},
			_showDetailFee: function(_fee) {
				let _fees = this.fees;
				_fees.forEach(item => {
					//item.showDetail = false;
					if (_fee.feeId == item.feeId) {
						item.showDetail = !item.showDetail;
					}
				});
				this.$forceUpdate();
			},
			checkboxChange: function(e) {
				console.log(e)
				let _that = this;
				this.feeIds = e.detail.value;
				_that.fees.forEach(function(_item) {
					_item.selected = "0";
					_that.feeIds.forEach(_feeId => {
						if (_item.feeId == _feeId) {
							_item.selected = "1";
						}
					});
				})
				this.computeAmount();
			},
			
			computeAmount:function(){
				let _that =this;
				let _fees = this.fees;
				let _feeIds = this.feeIds;
				let _receivableAmount = 0.0;
				_fees.forEach(_item=>{
					_feeIds.forEach(_feeId =>{
						if(_item.feeId == _feeId){
							_receivableAmount += parseFloat(_item.feeTotalPrice);
						}
					})
				});
				_that.receivableAmount = _receivableAmount.toFixed(2);
			},
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
