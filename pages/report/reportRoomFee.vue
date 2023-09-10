<template>
	<view>
		<view class="q-query flex justify-start flex-wrap">
			<view class="q-item">
				<input type="text" class="q-input" placeholder="输入房屋号" v-model="objName"></input>
			</view>
			<view class="q-item">
				<view class=" arrow q-input">
					<picker mode="date" :value="startDate" class="" start="2020-09-01" end="2050-09-01"
						@change="startDateChange">
						<view class="picker">
							{{startDate||'请选择'}}
						</view>
					</picker>
				</view>
			</view>
			<view class="q-item">
				<view class=" arrow q-input">
					<picker mode="date" :value="endDate" start="2020-09-01" end="2050-09-01" @change="endDateChange">
						<view class="picker">
							{{endDate||'请选择'}}
						</view>
					</picker>
				</view>
			</view>
			<view class="q-item-btn">
				<button class="cu-btn  line-blue round q-input" @click="_loadRoomFees">搜索</button>
			</view>
		</view>

		<view class="margin-top" v-if="fees.length > 0">
			<view class="bg-white margin-bottom padding-sm margin-sm radius-sm" v-for="(item,index) in fees"
				:key="index">
				<view class="apply-title flex justify-between">
					<view>
						<text class="text-bold">{{item.roomName}}</text>
					</view>
					<view class="flex justify-start">
						{{item.ownerName}}({{item.link}})
					</view>
				</view>
				<view class="apply-content flex justify-start flex-wrap">
					<view class="item">
						<text>总欠费:</text>
						<text>{{item.oweFee || '0'}}</text>
					</view>
					<view class="item">
						<text>总实收:</text>
						<text>{{item.receivedFee || '0'}}</text>
					</view>
					<view class="item" v-for="(feeType,fIndex) in feeTypeCds" :key="fIndex">
						<text>{{feeType.name}}欠费/实收:</text>
						<text>{{item['oweFee'+feeType.statusCd] || 0}}/{{item['receivedFee'+feeType.statusCd] || 0}}</text>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryReportFeeDetailRoom
	} from '@/api/report/feeReport.js';
	import {queryDictInfo} from '@/api/apply/apply.js';
	
	export default {
		data() {
			return {
				startDate: '',
				endDate: '',
				objName: '',
				fees: [],
				feeTypeCds:[],
			}
		},
		onLoad() {
			let _data = new Date();
			let _month = _data.getMonth() + 1;
			let _newDate = "";
			if (_month < 10) {
				_newDate = _data.getFullYear() + "-0" + _month + "-01";
			} else {
				_newDate = _data.getFullYear() + "-" + _month + "-01";
			}
			this.startDate = _newDate;
			_data.setMonth(_data.getMonth() + 1);
			_month = _data.getMonth() + 1;
			if (_month < 10) {
				_newDate = _data.getFullYear() + "-0" + _month + "-01";
			} else {
				_newDate = _data.getFullYear() + "-" + _month + "-01";
			}
			this.endDate = _newDate;
			let _that = this;
			queryDictInfo(this,{
				'name': "pay_fee_config",
				'type': "fee_type_cd",
			}).then(_data=>{
				_that.feeTypeCds = _data;
			}).then(_data=>{
				_that._loadRoomFees();
			});
		},
		methods: {

			startDateChange: function(e) {
				this.startDate = e.detail.value;
			},
			endDateChange: function(e) {
				this.endDate = e.detail.value;
			},

			_loadRoomFees: function() {
				let _that = this;
				queryReportFeeDetailRoom(this, {
					objName: this.objName,
					startDate: this.startDate,
					endDate: this.endDate,
					communityId: this.getCommunityId(),
					page: 1,
					row: 30
				}).then(_data => {
					_that.fees = _data.data;
				})
			}

		}
	}
</script>

<style lang="scss">
	.q-query {
		background-color: #FFF;
		padding: 15upx;

		.q-item {
			width: 45%;
			margin-left: 15upx;
			padding: 10upx 15upx;
			border-radius: 15upx;
			background-color: #f1f1f1;

			.q-input {
				height: 40upx;
			}

			margin-bottom: 15upx;
		}

		.q-item-btn {
			width: 30%;
			margin-left: 15upx;

			.q-input {
				height: 60upx;
			}
		}
	}

	.apply-title {
		height: 60upx;
		line-height: 50upx;
		border-bottom: 1upx solid #F1F1F1;
	}

	.apply-content {
		.item {
			width: 50%;
			margin-top: 20upx;
		}
	}

	.radius-sm {
		border-radius: 16upx;
	}
</style>
