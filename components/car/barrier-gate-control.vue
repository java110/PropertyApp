<template>
	<view>
		<view class="cu-list grid" :class="'col-2'">
			<view class="cu-item" @click="_todoMachine(item)" v-for="(item,index) in machines" :key="index">
				<view >
					<image src="/static/image/barrier.png" style="width: 80upx;height: 80upx;"></image>
				</view>
				<text>{{item.machineName}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {getParkingAreaMachines} from '../../api/car/carApi.js';
	export default {
		name:"barrierGateControl",
		data() {
			return {
				paId:'',
				machines:[]
				
			};
		},
		methods:{
			_loadMachines:function(_paId){
				this.paId = _paId;
				let _that =this;
				getParkingAreaMachines(this,{
					page:1,
					row:50,
					paId:_paId,
					communityId:this.getCommunityId()
				}).then(_data=>{
					_that.machines = _data.data;
				})
			},
			
			_todoMachine:function(_machine){
				
			}
		}
	}
</script>

<style>

</style>