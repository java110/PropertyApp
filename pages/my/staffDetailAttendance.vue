<template>
	<view>
		<view class="q-query flex justify-start flex-wrap">
			<view class="q-item">
				<picker :range="years" :value="echoVal" @change="yearChange" mode="multiSelector">
					<view class="picker">
						{{ years[0][yearsIndex1] }}-{{ years[1][yearsIndex2] }}
					</view>
				</picker>
			</view>
			<view class="q-item-btn">
				<button class="cu-btn  line-blue round q-input" @click="_queryReportFeeSummary">搜索</button>
			</view>
		</view>

		<view class="cu-list grid margin-top" :class="'col-3'">
			<view class="cu-item" v-for="index in maxDay" :key="index">
				<view class="margin-top">
					{{curYear}}-{{curMonth}}-{{index}}
				</view>
				<view class="margin-top-sm" v-for="(item,detailIndex) in _getAttendanceDetail(index)">
					<view v-if="item.rest">{{item.rest}}</view>
					<view v-else>
						{{item.specCd=='1001'?'上班':'下班'}}：
						<text v-if="item.state != '10000'">{{timeFormat(item.checkTime)}}</text>
						<text v-else> - </text>
						<text>({{item.stateName}})</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryAttendanceClassesTask
	} from '../../api/staff/staff.js';
	export default {
		data() {
			return {
				years: [],
				yearsIndex1: 0,
				yearsIndex2: 0,
				echoVal: [], //当前日期回显
				curYear: '',
				curMonth: '',
				maxDay: '',
				attendances: []
			}
		},
		onLoad() {
			this._initDate();
			this.curYear = this.years[0][this.yearsIndex1];
			this.curMonth = this.years[1][this.yearsIndex2];

			this.maxDay = new Date(this.curYear, this.curMonth, 0).getDate();
			this._loadStaffAttendances();
		},
		methods: {
			_initDate: function() {
				let _months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

				let date = new Date();
				let year = date.getFullYear(); //获取完整的年份(4位)
				let month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
				let nowDay = date.getDate(); //获取当前日(1-31)

				let _years = [];
				for (let i = 2020; i <= 2050; i++) {
					_years.push(i);
				}

				this.yearsIndex1 = year - 2020; //回显年
				this.yearsIndex2 = month - 1; //回显月

				this.years.push(_years); //下拉组合
				this.years.push(_months); //下拉组合

				this.echoVal.push(year - 2020); //回显年
				this.echoVal.push(month - 1); //回显月
			},
			yearChange: function(e) {
				//获得对象的 detail的 value
				//通过数组的下标改变显示在页面的值
				this.yearsIndex1 = e.detail.value[0];
				this.yearsIndex2 = e.detail.value[1];
				this.curYear = this.years[0][this.yearsIndex1];
				this.curMonth = this.years[1][this.yearsIndex2];
				this.maxDay = new Date(this.curYear, this.curMonth, 0).getDate();
				this._loadStaffAttendances();
			},
			_getAttendanceDetail: function(_day) {
				let _attendance = this._getDayAttendance(_day);
				if (!_attendance) {

					let _date = new Date();
					let _taskYear = this.curYear
					let _taskMonth = this.curMonth;
					if (_taskYear == _date.getFullYear() && parseInt(_taskMonth) == (_date.getMonth() + 1) &&
						_day > _date.getDate()) {
						return [{
							rest: '未到时间',
						}];;
					}

					return [{
						rest: '无需考勤',
					}];
				}
				return _attendance.attendanceClassesTaskDetails;
			},
			_getDayAttendance: function(_day) {
				let _attendance = null;
				if (!this.attendances) {
					return _attendance;
				}
				this.attendances.forEach(item => {
					if (item.taskDay == _day) {
						_attendance = item;
					}
				});
				return _attendance;
			},

			add0: function(m) {
				return m < 10 ? '0' + m : m
			},
			timeFormat: function(_time) {
				let _date = new Date(_time);
				let h = _date.getHours();
				let mm = _date.getMinutes();
				let s = _date.getSeconds();
				return this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
			},
			_loadStaffAttendances: function() {
				let staffId = this.getStaffId();
				let _that = this;
				queryAttendanceClassesTask(this, {
					page: 1,
					row: 1000,
					staffId: staffId,
					date: this.curYear + '-' + this.curMonth,
				}).then(_data => {
					_that.attendances = _data.data;
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
				height: 50upx;
			}
		}
	}
</style>