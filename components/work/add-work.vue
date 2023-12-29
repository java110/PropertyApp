<template>
	<view>
		<view class="cu-form-group margin-top">
			<view class="title">标题</view>
			<input v-model="workName" class="text-right" placeholder="必填,请输入标题"></input>
		</view>
		<view class="cu-form-group">
			<view class="title">工作单类型</view>
			<picker :value="workTypeIndex" :range="workTypes" range-key="typeName" @change="workTypeChange">
				<view class="picker">
					{{workTypeIndex == -1? '请选择':workTypes[workTypeIndex].typeName}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">处理人</view>
			<view class="text-right" v-if="staffs && staffs.length >0" @click="selectStaffs">
				<text v-for="(staff,index) in staffs" :key="index">{{staff.staffName}}</text>
			</view>
			<view class="text-right" v-else @click="selectStaffs">
				<text>请选择</text>
			</view>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">抄送人</view>
			<view class="text-right" v-if="copyStaffs && copyStaffs.length >0" @click="selectCopyStaffs">
				<text v-for="(staff,index) in copyStaffs" :key="index">{{staff.staffName}}</text>
			</view>
			<view class="text-right" v-else @click="selectCopyStaffs">
				<text>请选择</text>
			</view>
		</view>
		<view class="cu-form-group arrow  margin-top">
			<view class="title">完成日期</view>
			<picker mode="date" :value="endTime" start="2020-09-01" end="2050-09-01" @change="dateChange">
				<view class="picker">
					{{endTime || '请选择'}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title">工单标识</view>
			<picker :value="workCycleIndex" :range="workCycles" range-key="name" @change="workCycleChange">
				<view class="picker">
					{{workCycles[workCycleIndex].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group " v-if="workCycle == '2002'">
			<view class="title">完成小时</view>
			<input v-model="hours" class="text-right"></input>小时内完成
		</view>

		<view class="cu-form-group " v-if="workCycle == '2002'">
			<view class="title">周期</view>
			<picker :value="periodIndex" :range="periods" range-key="name" @change="periodChange">
				<view class="picker">
					{{periods[periodIndex].name}}
				</view>
			</picker>
		</view>
		<view class="bg-white padding-lr" v-if="workCycle == '2002' && period=='2020022'">
			<view class="title">月</view>
			<checkbox-group class="flex justify-start flex-wrap" @change="_changeMonths">
				<view class="margin-xs" v-for="index in 12">
					<checkbox class="" :value="index+''"></checkbox> {{index}}
				</view>
			</checkbox-group>
		</view>
		<view class="bg-white padding-lr" v-if="workCycle == '2002' && period=='2020022'">
			<view class="title">日</view>
			<checkbox-group class="flex justify-start flex-wrap " @change="_changeDays">
				<view class="margin-xs" v-for="index in 31">
					<checkbox class="" :value="index+''"></checkbox> {{index}}
				</view>
			</checkbox-group>
		</view>
		<view class="bg-white padding-lr" v-if="workCycle == '2002' && period=='2020023'">
			<view class="title">周</view>
			<checkbox-group class="flex justify-start flex-wrap " @change="_changeWorkDays">
				<view class="margin-xs" v-for="index in 7">
					<checkbox class="" :value="index+''"></checkbox> 周{{index == 7 ?'日':index}}
				</view>
			</checkbox-group>
		</view>

		<view class="cu-form-group margin-top">
			<textarea v-model="content" placeholder="必填,请输入内容"></textarea>
		</view>
		
		<view class="margin-top">
			<vc-upload-file ref="vcUploadFileRel" @uploadFile="uploadFile"></vc-upload-file>
		</view>
		
		<view class="flex flex-direction margin-top-lg">
			<button class="cu-btn bg-blue margin-tb-sm lg" @click="submitWorkOrder">提交</button>
		</view>
		
		<select-muti-staffs ref="selectMutiStaffsRel" @getStaffs="getStaffs"></select-muti-staffs>
	</view>
</template>

<script>
	
	import selectMutiStaffs from '../select-staff/select-muti-staffs.vue';
	import {queryWorkType,saveWorkPool}from '@/api/oa/workApi.js';
	import {getCommunityId} from '../../api/community/community.js';
	import {formatTime} from '../../lib/java110/utils/DateUtil.js';
	import vcUploadFile from '../vc-upload/vc-upload-file.vue'
	export default {
		name: "addWork",
		data() {
			return {
				workName: '',
				workTypes: [],
				workTypeIndex: -1,
				wtId: '',
				workCycles: [{
					name: '一次性工单',
					value: '1001'
				}, {
					name: '周期性工单',
					value: '2002'
				}],
				workCycleIndex: 0,
				workCycle: '1001',
				startTime: '',
				endTime: '',
				staffs: [],
				copyStaffs: [],
				pathUrl: '',
				content: '',
				period: '2020022',
				periodIndex: 0,
				periods: [{
					name: '月/天',
					value: '2020022'
				}, {
					name: '按周',
					value: '2020023'
				}],
				months: [],
				days: [],
				workdays: [],
				hours: '24',
				communityId: '',
				staffFlag:''
			};
		},
		components:{
			selectMutiStaffs,
			vcUploadFile
		},
		mounted() {
			this._loadWorkTypes();
		},
		methods: {
			workTypeChange: function(e) {
				this.workTypeIndex = e.detail.value;
				this.wtId = this.workTypes[this.workTypeIndex].wtId;
			},
			workCycleChange: function(e) {
				this.workCycleIndex = e.detail.value;
				this.workCycle = this.workCycles[this.workCycleIndex].value;
			},
			dateChange: function(e) {
				this.endTime = e.detail.value;
			},
			periodChange: function(e) {
				this.periodIndex = e.detail.value;
				this.period = this.periods[this.periodIndex].value;
			},
			_changeMonths:function(e){
				this.months = e.detail.value;
			},
			_changeDays:function(e){
				this.days = e.detail.value;
			},
			_changeWorkDays:function(e){
				this.workdays = e.detail.value;
			},
			submitWorkOrder:function(){
				let _that = this;
				saveWorkPool(this,{
					workName: this.workName,
					wtId: this.wtId,
					workCycle: this.workCycle,
					startTime: formatTime(new Date()),
					endTime: this.endTime,
					staffs: this.staffs,
					copyStaffs: this.copyStaffs,
					pathUrl: this.pathUrl,
					content: this.content,
					period: this.period,
					months: this.months,
					days: this.days,
					workdays: this.workdays,
					hours: this.hours,
					communityId: getCommunityId(),
				}).then(_data =>{
					this._initAddWork();
					_that.$emit('tabSelect',0);
				})
			},
			selectStaffs:function(){
				let _selectStaffIds = [];
				this.staffs.forEach(_staff=>{
					_selectStaffIds.push(_staff.staffId);
				});
				this.staffFlag = 'staff';
				this.$refs.selectMutiStaffsRel.switchShow(_selectStaffIds);
				
			},
			selectCopyStaffs:function(){
				let _selectStaffIds = [];
				this.copyStaffs.forEach(_staff=>{
					_selectStaffIds.push(_staff.staffId);
				});
				this.staffFlag = 'copyStaff';
				this.$refs.selectMutiStaffsRel.switchShow(_selectStaffIds);
				
			},
			getStaffs:function(staffs){
				
				if(this.staffFlag == 'staff'){
					this.staffs = staffs;
					return;
				}
				this.copyStaffs = staffs;
				
			},
			uploadFile:function(_obj){
				console.log(_obj);
				this.pathUrl = _obj.realFileName;
			},
			_loadWorkTypes:function(){
				let _that = this;
				queryWorkType(this,{
					page:1,
					row:100
				}).then(_data=>{
					_that.workTypes = _data.data;
				})
			},
			_initAddWork:function(){
				this.workName = '';
				this.wtId = '';
				this.workCycle ='1001';
				this.startTime = '';
				this.endTime = '';
				this.staffs = [];
				this.copyStaffs = [];
				this.pathUrl = '';
				this.content = '';
				this.period = '2020022';
				this.months = [];
				this.days = [];
				this.workdays = [];
				this.hours = '24';
				this.staffFlag='';
			}
		}
	}
</script>

<style>

</style>