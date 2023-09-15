<template>
	<view>
		<view class="q-query flex justify-start flex-wrap">
			<view class="q-item">
				<input type="text" class="q-input" placeholder="输入用户名称" v-model="personName"></input>
			</view>
			<view class="q-item">
				<picker bindchange="PickerChange" :value="machineIndex" :range-key="'machineName'" :range="machines"
				 @change="machineChange">
					<view class="picker">
						{{machineIndex==-1 ? "请选择充电桩" : machines[machineIndex].machineName}}
					</view>
				</picker>
			</view>
			<view class="q-item-btn">
				<button class="cu-btn  line-blue round q-input" @click="_loadChargeMachineOrder">搜索</button>
			</view>
		</view>
		<view class="margin-top" v-if="orders.length > 0">
			<view class="bg-white margin-bottom padding-sm margin-sm radius-sm" v-for="(item,index) in orders"
				:key="index">
				<view class="apply-title flex justify-between">
					<view>
						<text class="text-bold">{{item.personName}}/{{item.personTel}}</text>
					</view>
					<view class="flex justify-start">
						<!-- <button class="cu-btn round sm line-black margin-left-sm"
							@tap="_toApplyDetail(item)">详情</button> -->
						{{item.orderId}}
					</view>
				</view>
				<view class="apply-content flex justify-start flex-wrap">
					<view class="item">
						<text>充电桩:</text>
						<text>{{item.machineName}}>{{item.machineCode}}</text>
					</view>
					<view class="item">
						<text>插座:</text>
						<text>{{item.portCode}}</text>
					</view>
					<view class="item">
						<text>充电小时:</text>
						<text>{{item.chargeHours}}</text>
					</view>
					<view class="item">
						<text>小时电价:</text>
						<text>{{item.durationPrice}}</text>
					</view>
					<view class="item">
						<text>充电量:</text>
						<text>{{item.energy}}</text>
					</view>
					<view class="item">
						<text>扣款金额:</text>
						<text>{{item.amount}}</text>
					</view>
					<view class="item">
						<text>开始时间:</text>
						<text>{{item.startTime}}</text>
					</view>
					<view class="item">
						<text>结束时间:</text>
						<text>{{item.endTime}}</text>
					</view>
					
					<view class="item">
						<text>状态:</text>
						<text>{{item.stateName}}</text>
					</view>
					<view class="item">
						<text>备注:</text>
						<text>{{item.remark}}</text>
					</view>
				
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import noDataPage from '../../components/no-data-page/no-data-page.vue'
	import {listChargeMachine,listChargeMachineOrder} from '../../api/machine/machineApi.js';
	export default {
		data() {
			return {
				personName:'',
				machines:[],
				machineIndex:-1,
				machineId:'',
				orders:[]
			}
		},
		onLoad() {
			this._loadChargeMachine();
			this._loadChargeMachineOrder();
		},
		components:{
			noDataPage
		},
		methods: {
			_loadChargeMachineOrder:function(){
				let _that =this;
				listChargeMachineOrder(this,{
					machineId:this.machineId,
					communityId:this.getCommunityId(),
					page:1,
					row:100,
					personName:this.personName
				}).then(_data=>{
					_that.orders = _data.data;
				})
			},
			_loadChargeMachine:function(){
				let _that =this;
				listChargeMachine(this,{
					communityId:this.getCommunityId(),
					page:1,
					row:100,
				}).then(_data=>{
					_that.machines = _data.machines;
				})
			},
			machineChange: function(e) {
				this.machineIndex = e.target.value //取其下标
				let selected = this.machines[this.machineIndex] //获取选中的数组
				if(!selected){
					return;
				}
				this.machineId = selected.machineId; //选中的id
			},
		}
	}
</script>

<style lang="scss">
	.q-query {
		background-color: #FFF;
		padding: 15upx;

		.q-item {
			width: 30%;
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
