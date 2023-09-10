<template>
	<view>
		<view class="q-query flex justify-start flex-wrap">
			<view class="q-item">
				<picker bindchange="PickerChange" :value="feeTypeIndex" :range-key="'name'" :range="feeTypeCds"
					@change="feeTypeChange">
					<view class="picker">
						{{feeTypeIndex==-1 ? "请选择" : feeTypeCds[feeTypeIndex].name}}
					</view>
				</picker>
			</view>
			<view class="q-item">
				<picker bindchange="PickerChange" :value="floorIndex" :range-key="'floorName'" :range="floors"
					@change="floorChange">
					<view class="picker">
						{{floorIndex==-1 ? "请选择" : floors[floorIndex].floorName}}
					</view>
				</picker>
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
				<button class="cu-btn  line-blue round q-input" @click="_queryReportFeeSummary">搜索</button>
			</view>
		</view>
		
		<view class="margin-top">
			<view class="bg-white margin-bottom padding-sm margin-sm radius-sm" >
				<view class="apply-title flex justify-between">
					<view>
						<text class="text-bold">{{fee.roomCount}}</text>
						<text class="margin-left-sm"></text>
					</view>
					<view class="flex justify-start">
						{{fee.feeRoomCount}}/{{fee.oweRoomCount}}
					</view>
				</view>
				<view class="apply-content flex justify-start flex-wrap">
					<view class="item">
						<text>欠费:</text>
						<text>{{(fee.curOweFee+fee.hisOweFee).toFixed(2)}}</text>
					</view>
					<view class="item">
						<text>实缴:</text>
						<text>{{fee.receivedFee}}</text>
					</view>
					<view class="item">
						<text>当期应收:</text>
						<text>{{fee.curReceivableFee}}</text>
					</view>
					<view class="item">
						<text>当期实收:</text>
						<text> {{(fee.curReceivableFee-fee.curOweFee).toFixed(2)}}</text>
					</view>
					<view class="item">
						<text>户收费率:</text>
						<text v-if="fee.feeRoomCount>0">{{((fee.feeRoomCount-fee.oweRoomCount)/fee.feeRoomCount*100).toFixed(2)}}%</text>
						<text v-else>0</text>
					</view>
					<view class="item">
						<text>收费率:</text>
						<text v-if="(fee.curReceivableFee)>0">{{((fee.curReceivableFee-fee.curOweFee)/(fee.curReceivableFee)*100).toFixed(2)}}%</text>
						<text v-else>0</text>
					</view>
					<view class="item">
						<text>清缴率:</text>
						<text v-if="(fee.hisReceivedFee+fee.hisOweFee)>0">{{((fee.hisReceivedFee)/(fee.hisReceivedFee+fee.hisOweFee)*100).toFixed(2)}}%</text>
						<text v-else>0</text>
					</view>
					
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryDictInfo
	} from '@/api/apply/apply.js';
	import {loadFloors} from "../../api/floor/floor.js";
	import {queryReportFeeSummary} from '@/api/report/feeReport.js';
	
	export default {
		data() {
			return {
				fee: {},
				roomName: '',
				startDate: '',
				endDate: '',
				feeTypeCds: [],
				feeTypeCd: '',
				feeTypeIndex: '-1',
				floors: [],
				floorId: '',
				floorIndex: '-1',
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
			queryDictInfo(this, {
				'name': "pay_fee_config",
				'type': "fee_type_cd",
			}).then(_data => {
				_that.feeTypeCds = _data;
			});
			this._loadFloor();
			this._queryReportFeeSummary();
		},
		methods: {
			startDateChange: function(e) {
				this.startDate = e.detail.value;
			},
			endDateChange: function(e) {
				this.endDate = e.detail.value;
			},
			feeTypeChange: function(e) {
				this.feeTypeIndex = e.target.value //取其下标
				let selected = this.feeTypeCds[this.feeTypeIndex] //获取选中的数组
				if(!selected){
					return;
				}
				this.feeTypeCd = selected.statusCd; //选中的id
			},
			floorChange: function(e) {
				this.floorIndex = e.target.value //取其下标
				let selected = this.floors[this.floorIndex] //获取选中的数组
				if(!selected){
					return;
				}
				this.floorId = selected.floorId; //选中的id
			},
			_loadFloor: function() {
				let _that = this;
				let dataObj = {
					page: 1,
					row: 50,
					communityId: this.getCommunityId(),
				};
				loadFloors(this,dataObj)
				.then(function(res){
						let _floors = res.data.apiFloorDataVoList;
						_that.floors = _floors;
				})
			},
			_queryReportFeeSummary:function(){
				let _that = this;
				queryReportFeeSummary(this,{
					startDate:this.startDate,
					endDate:this.endDate,
					feeTypeCd:this.feeTypeCd,
					floorId:this.floorId,
					page:1,
					row:1,
					communityId:this.getCommunityId()
				}).then(_data =>{
					_that.fee = _data.data[0]
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
