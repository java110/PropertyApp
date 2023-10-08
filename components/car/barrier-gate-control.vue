<template>
	<view>
		<view class="cu-list grid" :class="'col-2'">
			<view class="cu-item" @click="_todoMachine(item)" v-for="(item,index) in machines" :key="index">
				<view>
					<image src="/static/image/barrier.png" style="width: 80upx;height: 80upx;"></image>
				</view>
				<text>{{item.machineName}}</text>
			</view>
		</view>

		<view class="cu-modal bottom-modal" :class="showModel?'show':''">
			<view class="cu-dialog">
				<scroll-view scroll-y style="height: 420upx; " class="padding">
					<view>
						<button class=" line-blue" @click="_openDoor()">开闸</button>
					</view>
					<view class="margin-top ">
						<button class="line-blue" @click="_closeDoor()">关闸</button>
					</view>
					<view class="margin-top" v-if="curMachine.direction == '3306'">
						<button class="line-blue" @click="_inParkArea()">进场</button>
					</view>
					<view class="margin-top" v-else>
						<button class="line-blue" @click="_outParkArea()">出场</button>
					</view>
				</scroll-view>
				<view class="btn-box padding">
					<button class="line-red" @click="cancel()">取消</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getParkingAreaMachines,
		openDoor,
		closeDoor
	} from '../../api/car/carApi.js';
	export default {
		name: "barrierGateControl",
		data() {
			return {
				paId: '',
				machines: [],
				showModel: false,
				curMachine:{}

			};
		},
		methods: {
			_loadMachines: function(_paId) {
				this.paId = _paId;
				let _that = this;
				getParkingAreaMachines(this, {
					page: 1,
					row: 50,
					paId: _paId,
					communityId: this.getCommunityId()
				}).then(_data => {
					_that.machines = _data.data;
				})
			},

			_todoMachine: function(_machine) {
				this.curMachine = _machine;
				this.showModel = true;
			},
			cancel: function() {
				this.curMachine = {};
				this.showModel = false;
			},
			_openDoor:function(){
				let _that = this;
				if(!this.curMachine.machineId){
					uni.showToast({
						icon:'none',
						title:'未选择摄像头'
					});
					return;
				}
				
				openDoor(this,{
					communityId:this.getCommunityId(),
					machineCode: this.curMachine.machineCode,
					state:"1500",
					stateName:"开门",
					url: "/machine/openDoor",
					userRole: "staff"
				}).then(_data=>{
					uni.showToast({
						icon:'none',
						title:_data.msg
					});
					if(_data.code == 0){
						_that.cancel()
					}
				})
				
			},
			_closeDoor:function(){
				let _that = this;
				if(!this.curMachine.machineId){
					uni.showToast({
						icon:'none',
						title:'未选择摄像头'
					});
					return;
				}
				
				closeDoor(this,{
					communityId:this.getCommunityId(),
					machineCode: this.curMachine.machineCode,
					state:"1500",
					stateName:"关门",
					url: "/machine/closeDoor",
					userRole: "staff"
				}).then(_data=>{
					uni.showToast({
						icon:'none',
						title:_data.msg
					});
					if(_data.code == 0){
						_that.cancel()
					}
				})
			},
			_inParkArea:function(){
				let _that = this;
				if(!_that.curMachine.machineId){
					uni.showToast({
						icon:'none',
						title:'未选择摄像头'
					});
					return;
				}
				let _curMachine = _that.curMachine;
				this.cancel();
				uni.navigateTo({
					url:'/pages/car/carInParkingArea?machineId='+_curMachine.machineId+'&machineCode='+_curMachine.machineCode+'&paId='+_that.paId+"&boxId="+_curMachine.locationObjId
				})
			},
			_outParkArea:function(){
				let _that = this;
				if(!this.curMachine.machineId){
					uni.showToast({
						icon:'none',
						title:'未选择摄像头'
					});
					return;
				}
					let _curMachine = _that.curMachine;
				this.cancel();
				uni.navigateTo({
					url:'/pages/car/carOutParkingArea?machineId='+_curMachine.machineId+"&machineCode="+_curMachine.machineCode+"&paId="+this.paId+"&boxId="+_curMachine.locationObjId
				})
			}
		}
	}
</script>

<style lang="scss">
	

</style>
