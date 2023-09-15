<template>
	<view>
		<view class="q-query flex justify-start flex-wrap">
			<view class="q-item">
				<input type="text" class="q-input" placeholder="输入人员名称" v-model="name"></input>
			</view>
			<view class="q-item">
				<picker bindchange="PickerChange" :value="machineIndex" :range-key="'machineName'" :range="machines"
				 @change="machineChange">
					<view class="picker">
						{{machineIndex==-1 ? "请选择" : machines[machineIndex].machineName}}
					</view>
				</picker>
			</view>
			<view class="q-item-btn">
				<button class="cu-btn  line-blue round q-input" @click="_loadOpenDoorLog">搜索</button>
			</view>
		</view>
		<view class="margin-top" v-if="logs.length > 0">
			<view class="bg-white margin-bottom padding-sm margin-sm radius-sm" v-for="(item,index) in logs"
				:key="index">
				<view class="apply-title flex justify-between">
					<view>
						<text class="text-bold">{{item.name}}</text>
					</view>
					<view class="flex justify-start">
						<!-- <button class="cu-btn round sm line-black margin-left-sm"
							@tap="_toApplyDetail(item)">详情</button> -->
						{{item.createTime}}
					</view>
				</view>
				<view class="apply-content flex justify-start">
					<view class="item">
						<image :src="item.faceUrl" ></image>
					</view>
					<view class="margin-left">
						<view class="item">
							<text>门禁:</text>
							<text>{{item.machineName}}</text>
						</view>
						<view class="item">
							<text>门禁编码:</text>
							<text>{{item.machineCode}}</text>
						</view>
						<view class="item">
							<text>位置:</text>
							<text>{{item.locationObjName}}</text>
						</view>
						<view class="item">
							<text>开门方式:</text>
							<text>{{item.openTypeName || '-'}}</text>
						</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {listMachines,listMachineRecords} from '../../api/machine/machineApi.js';
	export default {
		data() {
			return {
				name:'',
				machines:[],
				machineIndex:-1,
				machineId:'',
				logs:[]
			}
		},
		onLoad() {
			this._loadAccessControl();
			//this._loadOpenDoorLog();
		},
		methods: {
			_loadOpenDoorLog:function(){
				let _that =this;
				listMachineRecords(this,{
					machineId:this.machineId,
					communityId:this.getCommunityId(),
					page:1,
					row:100,
					name:this.name
				}).then(_data=>{
					_that.logs = _data.machineRecords;
				})
			},
			_loadAccessControl:function(){
				let _that =this;
				listMachines(this,{
					communityId:this.getCommunityId(),
					page:1,
					row:100,
					machineTypeCd:'9999',
					domain:'ACCESS_CONTROL'
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
			//width: 50%;
			margin-top: 20upx;
			image{
				width: 180upx;
				height: 180upx;
				border-radius: 10upx;
			}
		}
	}
	
	.radius-sm {
		border-radius: 16upx;
	}
</style>
