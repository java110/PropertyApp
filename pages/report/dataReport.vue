<template>
	<view>
		<view class="cu-bar bg-white  solid-bottom" style="justify-content: space-around;">
			<view class="action" @click="changeListType(0)">
				<text class="text-blue"
					:class="{'cuIcon-roundcheckfill' : currentPage == 0, 'cuIcon-roundcheck' : currentPage != 0}"></text>今日
			</view>
			<view class="action" @click="changeListType(1)">
				<text class="text-blue"
					:class="{'cuIcon-roundcheckfill' : currentPage == 1, 'cuIcon-roundcheck' : currentPage != 1}"></text>昨日
			</view>
			<view class="action" @click="changeListType(2)">
				<text class="text-blue"
					:class="{'cuIcon-roundcheckfill' : currentPage == 2, 'cuIcon-roundcheck' : currentPage != 2}"></text>近30日
			</view>
		</view>
		<view class="padding-sm">
			<fee-data-report ref="feeDataReportRef"></fee-data-report>
		</view>
		<view class="padding-sm">
			<order-data-report ref="orderDataReportRef"></order-data-report>
		</view>
		<view class="padding-sm">
			<inout-data-report ref="inoutDataReportRef"></inout-data-report>
		</view>
		<view class="padding-sm">
			<others-data-report ref="otherDataReportRef"></others-data-report>
		</view>
	</view>
</template>

<script>
	import feeDataReport from '@/components/report/fee-data-report.vue';
	import orderDataReport from '../../components/report/order-data-report.vue';
	import inoutDataReport from '../../components/report/inout-data-report.vue';
	import othersDataReport from '../../components/report/others-data-report.vue';
	
	export default {
		data() {
			return {
				currentPage: 0,

			}
		},
		components: {
			feeDataReport,
			orderDataReport,
			inoutDataReport,
			othersDataReport
		},
		onLoad() {
			let _that =this;
			// #ifdef H5
				setTimeout(function(){
					_that.changeListType(0);
				},1000)
			// #endif
			// #ifndef H5
				this.changeListType(0);
			// #endif
		},
		methods: {
			changeListType: function(e) {
				this.currentPage = e;
				let _tmpStartDate = '';
				let _tmpEndDate = '';
				let _endDate = new Date();
				if (e == 1) {
					_endDate.setDate(_endDate.getDate() - 1);
					_tmpEndDate = _endDate.getFullYear() + "-" + (_endDate.getMonth() +
						1) + "-" + _endDate.getDate();
					_tmpStartDate = _endDate.getFullYear() + "-" + (_endDate.getMonth() +
						1) + "-" + _endDate.getDate();
				} else if (e == 2) {
					_tmpEndDate = _endDate.getFullYear() + "-" + (_endDate.getMonth() +
						1) + "-" + _endDate.getDate();
					_endDate.setDate(_endDate.getDate() - 30);
					_tmpStartDate = _endDate.getFullYear() + "-" + (_endDate.getMonth() +
						1) + "-" + _endDate.getDate();
				}else{
					_tmpEndDate = _endDate.getFullYear() + "-" + (_endDate.getMonth() +
						1) + "-" + _endDate.getDate();
					_tmpStartDate = _endDate.getFullYear() + "-" + (_endDate.getMonth() +
						1) + "-" + _endDate.getDate();
				}

				this.$refs.feeDataReportRef._loadFeeData(_tmpStartDate,_tmpEndDate);
				this.$refs.orderDataReportRef._loadOrderData(_tmpStartDate,_tmpEndDate);
				this.$refs.inoutDataReportRef._loadInoutData(_tmpStartDate,_tmpEndDate);
				this.$refs.otherDataReportRef._loadOtherData(_tmpStartDate,_tmpEndDate);
				
				
			},
		}
	}
</script>

<style>

</style>
