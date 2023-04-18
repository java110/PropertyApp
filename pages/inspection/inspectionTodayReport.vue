<template>
	<view>
		<view class="block__title">今日巡检统计</view>
		<view class="cu-form-group arrow">
			<view class="title">查询日期</view>
			<picker mode="date" :value="bindDate" start="2020-09-01" end="2050-09-01" @change="dateChange">
				<view class="picker">
					{{bindDate}}
				</view>
			</picker>
		</view>
		<view class="cu-list menu margin-top" v-if="inpections && inpections.length > 0" v-for="(inspection, idx) in inpections" :key="idx" 
		:data-item="inspection"
		 @click="gotoDetail(inspection)">
			<view class="cu-item arrow">
				<view class="content padding-tb-sm">
					<view>
						<view class="text-cut" style="width:85%;">{{inspection.staffName}}</view>
					</view>
					<view class="text-gray text-sm">
						<text class="margin-right-xs">已巡检:</text> {{inspection.finishCount}} ; 未巡检:{{inspection.waitCount}}</view>
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
	import {queryReportStaffInspection} from '@/api/inspection/inspection.js';
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	
	
	import {getCurrentCommunity} from '../../api/community/community.js'
	export default {
		data() {
			return {
				inpections:[],
				bindDate: '请选择',
			}
		},
		components:{
			noDataPage
		},
		onLoad(options) {
			this.bindDate = formatDate(new Date());
			this._loadTodayInspectionReport();
			
		},
		methods: {
			
			_loadTodayInspectionReport:function(){
				let _that = this;
				queryReportStaffInspection(this,{
					communityId: getCurrentCommunity().communityId,
					queryTime:this.bindDate
				}).then(_data=>{
					_that.inpections = _data.data;
				})
			},
			dateChange: function(e) {
				this.bindDate = e.detail.value;
				this._loadTodayInspectionReport();
			},
			gotoDetail:function(_inpection){
				uni.navigateTo({
					url:'/pages/inspection/staffNoInspection?staffId='+_inpection.staffId+"&staffName="+_inpection.staffName+"&queryTime="+this.bindDate
				})
			}
			
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
