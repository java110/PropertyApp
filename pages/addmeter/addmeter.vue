<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">费用类型</view>
				<picker @change="feeTypesChange" :value="feeType_index" :range-key="'name'" :range="feeTypes">
					<view class="picker">
						{{feeType_index>-1?feeTypes[feeType_index].name:'请选择'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">收费项目</view>
				<picker @change="feeConfigsChange" :value="feeConfig_index" :range-key="'feeName'" :range="feeConfigs">
					<view class="picker">
						{{feeConfig_index>-1?feeConfigs[feeConfig_index].feeName:'请选择'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">抄表类型</view>
				<picker @change="meterTypeChange" :value="meterTypeIndex" :range-key="'typeName'" :range="meterTypes">
					<view class="picker">
						{{meterTypeIndex>-1?meterTypes[meterTypeIndex].typeName:'请选择'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group arrow" @tap="chooseFloor">
				<view class="title">楼栋</view>
				<input required readonly label="楼栋" v-model="floorNum" placeholder="请选择楼栋" name="floorNum" icon="arrow"></input>
				<text class='cuIcon-right'></text>
			</view>
			<view class="cu-form-group arrow" @tap="chooseUnit">
				<view class="title">单元</view>
				<input v-model="unitNum" placeholder="请选择单元"></input>
				<text class='cuIcon-right'></text>
			</view>
			<view class="cu-form-group arrow" @tap="chooseRoom">
				<view class="title">房屋</view>
				<input v-model="roomNum" placeholder="请选择房屋"></input>
				<text class='cuIcon-right'></text>
			</view>
			
			
			
			<view class="cu-form-group">
				<view class="title">上期度数</view>
				<input placeholder="上期度数"　v-model="preDegrees" disabled="disabled"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">本期度数</view>
				<input placeholder="本期度数"　v-model="curDegrees"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">上期读表时间</view>
				<uni-datetime-picker v-model="preReadingTime" :disabled="true"></uni-datetime-picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">本期读表时间</view>
				<uni-datetime-picker v-model="curReadingTime"></uni-datetime-picker>
			</view>
			
			<view class="cu-form-group align-start">
				<view class="title">备注</view>
				<textarea maxlength="-1" v-model="remark" placeholder="备注信息"></textarea>
			</view>
			
			<view class=" flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg" @tap="$preventClick(submitMeter)">提交</button>
			</view>
			
		</form>
	</view>
</template>

<script>
	import {queryFeeTypesItems,queryPreMeterWater,saveMeterWater,listMeterType} from '../../api/meter/meter.js'
	import dateObj from '../../lib/java110/utils/date.js'
	import uniDatetimePicker from '../../components/uni-datetime-picker/uni-datetime-picker.vue'
	import {getCurrentCommunity} from '../../api/community/community.js'
	// 防止多次点击
	import {preventClick} from '../../lib/java110/utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;
	export default {
		data() {
			return {
				onoff: true,
				floorNum: '',
				floorId: '',
				unitNum: '',
				unitId: '',
				roomNum: '',
				roomId: '',
				communityId: '',
				feeType_index: -1,
				feeTypes:[{
						id: '888800010015',
						name: '水费'
					},{
						id: '888800010016',
						name: '电费'
					},{
						id: '888800010009',
						name: '燃气费'
					}
				],
				feeConfig_index: -1,
				feeConfigs: [],
				objType: '3333',
				preDegrees: 0,
				preReadingTime:　null,
				curDegrees: '',
				curReadingTime:　null,
				remark: '',
				meterTypes:[],
				meterType:'',
				meterTypeIndex:-1,
			};
		},
		components:{
			uniDatetimePicker
		},
		
		onLoad(){
			this.java110Context.onLoad();
			this.preReadingTime = dateObj.getCurrentDateTime();
			this.communityId = getCurrentCommunity().communityId;
			this._listMeterTypes();
		},
		
		onShow(){
			// 房屋信息
			let _floor = uni.getStorageSync("_selectFloor");
			console.log(_floor)
			if (this.util.isNotNull(_floor)) {
				this.floorNum = _floor.floorNum + "栋";
				this.floorId = _floor.floorId;
			}
			let _unit = uni.getStorageSync("_selectUnit");
			if (this.util.isNotNull(_unit)) {
				this.unitNum = _unit.unitNum + "单元";
				this.unitId = _unit.unitId;
			}
			let _room = uni.getStorageSync("_selectRoom");
			if (this.util.isNotNull(_room)) {
				this.roomNum = _room.roomNum + "室";
				this.roomId = _room.roomId;
				// 查询上期读数
				this._queryPreMeterWater();
			}
		},
		
		onUnload() {
			uni.removeStorageSync("_selectFloor");
			uni.removeStorageSync("_selectUnit");
			uni.removeStorageSync("_selectRoom");
		},
		
		methods: {
			
			// 费用类型change
			feeTypesChange(e) {
				let index = e.detail.value;
				this.feeType_index = index;
				
				let selected = this.feeTypes[index];
				let _objData = {
					page: 1,
					row: 20,
					communityId: this.communityId,
					feeTypeCd: selected.id,
					isDefault: 'F',
					valid: 1,
				};
				queryFeeTypesItems(this,_objData)
				.then((res) => {
					this.feeConfig_index = -1;
					this.feeConfigs = res;
				})
				// 查询上期读数
				this._queryPreMeterWater();
			},
			meterTypeChange:function(e){
				let index = e.detail.value;
				this.meterTypeIndex = index;
				let selected = this.meterTypes[index];
				this.meterType = selected.typeId;
			},
			// 收费项change
			feeConfigsChange(e){
				let index = e.detail.value;
				this.feeConfig_index = index;
			},
			
			_listMeterTypes:function(){
				let _that =this;
				listMeterType(this,{
					page:1,
					row:50,
					communityId:this.communityId
				}).then(_data =>{
					_that.meterTypes = _data.data;
				})
			},
			
			// 查询上期缴费信息
			_queryPreMeterWater(){
				if(this.feeType_index < 0 || this.roomId == ''){
					return;
				}

				let _meterType = this.meterType;
				// if (_feeTypeCd == '888800010015') {
				// 	_meterType = '2020';
				// }else if(_feeTypeCd == '888800010009'){
    //                 _meterType = '3030';
    //             }
				let _objData = {
					communityId: this.communityId,
					objId: this.roomId,
					objType: this.objType,
					meterType: _meterType,
				};
				queryPreMeterWater(this,_objData)
				.then((res) => {
					console.log(res);
					if(res.total < 1){
						this.preDegrees = 0;
						return;
					}
					this.preDegrees = res.data[0].curDegrees;
					this.preReadingTime = res.data[0].curReadingTime;
				})
			},
			
			submitMeter(){
				let msg = '';
				if(this.feeConfig_index < 0){
					msg = "费用必填";
				}else if(this.roomId == ''){
					msg = "请选择房屋";
				}else if(this.preDegrees === '' || this.preDegrees < 0){
					msg = "上期度数必填";
				}else if(this.preReadingTime == '' || this.preReadingTime == null){
					msg = "上期读表时间必填";
				}else if(this.curDegrees === '' || this.curDegrees < 0){
					msg = "本期度数必填";
				}else if(this.curReadingTime == '' || this.curReadingTime == null){
					msg = "本期读表时间必填";
				}else if(parseFloat(this.curDegrees) < parseFloat(this.preDegrees)){
					msg = "本期度数不能小于上期度数";
				}else{
					let start = Date.parse(new Date(this.preReadingTime.replace(/-/g, '/')))
					let end = Date.parse(new Date(this.curReadingTime.replace(/-/g, '/')))
					if (end == 0 || start - end >= 0) {
						msg = "本期读表时间有误";
					}
				}
				
				if(msg != ''){
					uni.showToast({
						title:msg,
						icon:'none'
					})
					this.onoff = true;
					return;
				}
				let _objData = {
					communityId: this.communityId,
					configId: this.feeConfigs[this.feeConfig_index].configId,
					curDegrees: this.curDegrees,
					curReadingTime: this.curReadingTime,
					preDegrees: this.preDegrees,
					preReadingTime: this.preReadingTime,
					feeTypeCd: this.feeTypes[this.feeType_index].id,
					objId: this.roomId,
					roomId: this.roomId,
					objName: this.floorNum + this.unitNum + this.roomNum,
					objType: this.objType,
					remark: this.remark,
					meterType: this.meterType
				};
				saveMeterWater(this,_objData)
				.then((res) => {
					uni.showToast({
						title: res.msg,
						duration: 1500
					})
					if(res.code == 0){
						setTimeout(() => {
							this.onoff = true;
							this.clearAddMeterWaterInfo();
						}, 1500)
					}else{
						this.onoff = true;
					}
				})
			},
			
			// 清空页面数据
			clearAddMeterWaterInfo(){
				uni.removeStorageSync("_selectFloor");
				uni.removeStorageSync("_selectUnit");
				uni.removeStorageSync("_selectRoom");
				uni.redirectTo({
					url: "/pages/addmeter/addmeter"
				})
				// this.floorNum='';
				// this.floorId='';
				// this.unitNum='';
				// this.unitId='';
				// this.roomNum='';
				// this.roomId='';
				// this.feeType_index=-1;
				// this.feeConfig_index=-1;
				// this.feeConfigs=[];
				// this.objType='3333';
				// this.preDegrees=0;
				// this.preReadingTime=dateObj.getCurrentDateTime();
				// this.curDegrees='';
				// this.curReadingTime=null;
				// this.remark='';
			},
			
			chooseFloor: function(e) {
				uni.removeStorageSync("_selectFloor");
				this.floorNum = '';
				this.floorId = '';
				uni.removeStorageSync("_selectUnit");
				this.unitNum = '';
				this.unitId = '';
				uni.removeStorageSync("_selectRoom");
				this.roomNum = '';
				this.roomId = '';
				this.context.navigateTo({
					url: '/pages/selectFloor/selectFloor'
				});
			},
			chooseUnit: function(e) {
				if (this.floorId == null || this.floorId == '') {
					uni.showToast({
						title: "请先选择楼栋"
					});
					return;
				}
				uni.removeStorageSync("_selectUnit");
				this.unitNum = '';
				this.unitId = '';
				uni.removeStorageSync("_selectRoom");
				this.roomNum = '';
				this.roomId = '';
				this.context.navigateTo({
					url: '/pages/selectUnit/selectUnit?floorId=' + this.floorId
				});
			},
			chooseRoom: function(e) {
				if (this.unitId == null || this.unitId == '') {
					uni.showToast({
						title: "请先选择单元"
					});
					return;
				}
				uni.removeStorageSync("_selectRoom");
				this.roomNum = '';
				this.roomId = '';
				this.context.navigateTo({
					url: '/pages/selectRoom/selectRoom?floorId=' + this.floorId + "&unitId=" + this.unitId
				});
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(6em + 15px);
	}
</style>
