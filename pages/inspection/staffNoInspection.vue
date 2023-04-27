<template>
	<view>
		<view class="block__title">{{staffName}}巡检情况</view>
		<!-- <view class="cu-form-group arrow">
			<view class="title">查询日期</view>
			<picker mode="date" :value="bindDate" start="2020-09-01" end="2050-09-01" @change="dateChange">
				<view class="picker">
					{{bindDate}}
				</view>
			</picker>
		</view> -->
		<view class="cu-list menu margin-top" v-if="inpections && inpections.length > 0" v-for="(inspection, idx) in inpections" :key="idx" 
		:data-item="inspection"
		 >
			<view class="cu-item ">
				<view class="content padding-tb-sm">
					<view>
						<view class="text-cut" style="width:85%;">{{inspection.inspectionName}}({{inspection.stateName}})</view>
					</view>
					<view class="text-gray text-sm">
						<text class="margin-right-xs">巡检时间:</text> {{inspection.planInsTime}} - {{inspection.pointEndTime}}</view>
				</view>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import {formatDate} from '@/lib/java110/utils/DateUtil.js';
	import {listInspectionTaskDetails} from '@/api/inspection/inspection.js';
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	
	
	import {getCurrentCommunity} from '../../api/community/community.js'
	export default {
		data() {
			return {
				inpections:[],
				bindDate: '请选择',
				staffId:'',
				staffName:''
			}
		},
		components:{
			noDataPage
		},
		onLoad(options) {
			this.staffId = options.staffId;
			this.staffName = options.staffName;
			this.bindDate = options.queryTime;
			this._loadTodayInspectionReportDetail();
			
		},
		methods: {
			
			_loadTodayInspectionReportDetail:function(){
				let _that = this;
				listInspectionTaskDetails(this,{
					communityId: getCurrentCommunity().communityId,
					planUserId:this.staffId,
					//state:'20200405',
					queryTime:this.bindDate,
					page:1,
					row:100
				}).then(_data=>{
					console.log(_data)
					_that.inpections = _data.inspectionTaskDetails;
				})
			},
			dateChange: function(e) {
				this.bindDate = e.detail.value;
			},
			
		}
	}
</script>

<style>
.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}
</style>
