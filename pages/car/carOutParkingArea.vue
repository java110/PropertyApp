<template>
	<view>
		<view class="block__title">手工出场</view>
		<view class="cu-form-group margin-bottom-sm">
			<view class="title">车牌号</view>
			<input v-model="carNum" placeholder="请输入车牌号" @blur="_queryCustomCarMoney()" class="text-right"></input>
		</view>
		<view class="cu-form-group margin-bottom-sm">
			<view class="title">应收金额</view>
			<input v-model="payCharge" disabled="disabled" placeholder="请输入应收金额" class="text-right"></input>
		</view>
		<view class="cu-form-group margin-bottom-sm">
			<view class="title">实收金额</view>
			<input v-model="amount" placeholder="请输入实收金额" class="text-right"></input>
		</view>
		<view class="cu-form-group margin-bottom-sm">
			<view class="title">停车时间</view>
			<input v-model="costMin" disabled="disabled" placeholder="请输入停车时间" class="text-right"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">支付方式</view>
			<picker bindchange="PickerChange" :value="payTypeIndex" :range="payTypes" :range-key="'name'"
				@change="_computePayType">
				<view class="picker">
					{{payTypeIndex < 0? '请选择':payTypes[payTypeIndex].name}}
				</view>
			</picker>
		</view>

		<checkbox-group class="text-right" @change="_changeCoupons">
			<view class="cu-form-group" v-for="(item,index) in coupons" :key="index">
				<view class="title"> <text>{{item.couponName}}-</text>
					<text v-if="item.typeCd == '1001'">{{item.value}}分钟</text>
					<text v-if="item.typeCd == '2002'">{{item.value}}元</text>
					<text v-if="item.typeCd == '3003'">{{item.value}}折</text>
					<text v-if="item.typeCd == '4004'">全免</text>
				</view>
				<checkbox class=' ' :value="item.pccId"></checkbox>
			</view>
		</checkbox-group>

		<view class="cu-form-group margin-top-sm">
			<textarea v-model="remark" placeholder="请输入说明"></textarea>
		</view>

		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue margin-tb-sm lg" @tap="_carOut()">出场</button>
		</view>
	</view>
</template>

<script>
	import {
		customCarInOut,
		getCarInParkingArea,
		getParkingCouponCar,
		getTempCarFeeOrder
	} from '../../api/car/carApi.js';
	import {
		queryDictInfo
	} from '../../api/apply/apply.js'
	export default {
		data() {
			return {
				machineId: '',
				paId: '',
				boxId: '',
				machineCode: '',
				carNum: '',
				remark: '',
				payCharge: 0.0,
				costMin: 0,
				amount: '',
				payTypeIndex: -1,
				payTypes: [],
				payType: '',
				inoutId: '',
				coupons: [],
				pccIds:[]
			}
		},
		onLoad(options) {
			this.machineCode = options.machineCode;
			this.machineId = options.machineId;
			this.paId = options.paId;
			this.boxId = options.boxId;
			this._loadPayTypes();
		},
		methods: {
			_carOut: function() {
				customCarInOut(this, {
					machineId: this.machineId,
					paId: this.paId,
					boxId: this.boxId,
					carNum: this.carNum,
					remark:this.remark,
					payCharge: this.payCharge,
					costMin: this.costMin,
					amount: this.amount,
					payType:  this.payType,
					inoutId: this.inoutId,
					type:'1102',
					pccIds:this.pccIds
				}).then(_data => {
					uni.showToast({
						icon: 'none',
						title: _data.msg
					});
					if (_data.code == 0) {
						uni.navigateBack()
					}
				})
			},
			_computePayType: function(e) {
				this.payTypeIndex = e.target.value //取其下标
				let selected = this.payTypes[this.payTypeIndex] //获取选中的数组
				this.payType = selected.statusCd //选中的id
			},
			_loadPayTypes: function() {
				let _that = this;
				let _objData = {
					'name': "car_inout_payment",
					'type': "pay_type",
				};
				queryDictInfo(this, _objData)
					.then(function(res) {
						_that.payTypes = res;
					})
			},
			_queryCustomCarMoney: function() {

				let _that = this;
				getCarInParkingArea(this, {
					page: 1,
					row: 1,
					communityId: this.getCommunityId(),
					boxId: this.boxId,
					paId: this.paId,
					carNum: this.carNum,
				}).then(_json => {
					let _data = _json.data;
					if (!_data || _data.length < 1) {
						uni.showToast({
							icon: 'none',
							title: '未查询在场车辆,请检查！'
						});
						return;
					}
					_that.payCharge = _data[0].payCharge;
					_that.amount = _data[0].payCharge;
					_that.inoutId = _data[0].inoutId;
					_that.costMin = _data[0].hours + "时" + _data[0].min + "分";
				});

				getParkingCouponCar(this, {
					paId: this.paId,
					page: 1,
					row: 30,
					state: '1001',
					carNum: this.carNum,
				}).then(_json => {
					let _data = _json.data;
					if (!_data || _data.length < 1) {
						return;
					}
					_that.coupons = _data;
				})
			},
			_changeCoupons: function(e) {
				let _that =this;
				this.pccIds = e.detail.value;
				if(!_pccIds || _pccIds.length<1){
				    this._queryCustomCarMoney();
				    return;
				}
				getTempCarFeeOrder(this,{
					paId: this.paId,
					boxId: this.boxId,
					pccIds: this.pccIds.join(","),
					carNum: this.carNum
				}).then(_data=>{
					_that.payCharge = _data.data.amount;
					_that.amount = _data.data.amount;
				})
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
</style>
