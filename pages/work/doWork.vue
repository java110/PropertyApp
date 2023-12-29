<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="active==0?'text-blue cur':''" @tap="tabSelect(0)">
					待处理
				</view>
				<view class="cu-item flex-sub" :class="active==1?'text-blue cur':''" @tap="tabSelect(1)">
					已处理
				</view>
			</view>
		</scroll-view>

		<view class="q-query flex justify-start flex-wrap margin-top-sm">
			<view class="q-item">
				<input type="text" class="q-input" placeholder="题目" v-model="workNameLike"></input>
			</view>
			<view class="q-item">
				<input type="text" class="q-input" placeholder="处理人" v-model="staffNameLike"></input>
			</view>
			<view class="q-item-btn">
				<button class="cu-btn  line-blue round q-input" @click="_loadStartWork">搜索</button>
			</view>
		</view>
		<view class="margin-top" v-if="works.length > 0">
			<view class="bg-white margin-bottom padding-sm margin-sm radius-sm" v-for="(work,index) in works"
				:key="index">
				<view class="apply-title flex justify-between">
					<view>
						<text class="text-bold">{{work.workId}}({{work.stateName}})</text>
					</view>
					<view class="flex justify-start">
						<button class="cu-btn round sm line-black margin-left-sm" v-if="active == 0" @tap="_todoWorkTask(work)">办理</button>
						<button class="cu-btn round sm line-black margin-left-sm" @tap="_toWorkDetail(work)">详情</button>
					</view>
				</view>
				<view class="apply-content flex justify-start flex-wrap">
					<view class="item">
						<text>题目:</text>
						<text class="margin-left-sm">{{work.workName}}</text>
					</view>
					<view class="item-half">
						<text>标识:</text>
						<text class="margin-left-sm">{{work.workCycle == '1001'?'一次性工单':'周期性工单'}}</text>
					</view>
					<view class="item-half">
						<text>处理人:</text>
						<text class="margin-left-sm">{{work.staffName || '-'}}</text>
					</view>
					<view class="item">
						<text>创建时间:</text>
						<text class="margin-left-sm">{{work.createTime}}</text>
					</view>
					<view class="item">
						<text>有效期:</text>
						<text class="margin-left-sm">{{work.startTime}}~{{work.endTime}}</text>
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
	import noDataPage from '@/components/no-data-page/no-data-page.vue';
	import {
		getTaskWork
	} from '../../api/oa/workApi.js';
	import {
		getStaffId
	} from '../../api/staff/staff.js';
	export default {
		data() {
			return {
				workNameLike: '',
				staffNameLike: '',
				works: [],
				staffId: '',
				active:0
			}
		},
		onLoad() {
			this.staffId = getStaffId();
			this._loadWork();
		},
		methods: {
			_loadWork: function() {
				let _that = this;
				let _state = 'W';
				if(this.active == 1){
					_state = 'C';
				}
				getTaskWork(this, {
					page: 1,
					row: 100,
					state:_state,
					workNameLike: this.workNameLike,
					staffNameLike: this.staffNameLike
				}).then(_data => {
					_that.works = _data.data;
				});
			},
			_toWorkDetail: function(_work) {
				uni.navigateTo({
					url: '/pages/work/workDetail?workId=' + _work.workId + "&taskId=" + _work.taskId
				})

			},
			tabSelect:function(_active){
				this.active = _active;
				let _that = this;
				this._loadWork();
			},
			_loadStartWork:function(){
				this._loadWork();
			}
		}
	}
</script>

<style lang="scss">
	.q-query {
		background-color: #FFF;
		padding: 15upx;

		.q-item {
			width: 30%;
			margin-right: 15upx;
			padding: 10upx 15upx;
			border-radius: 15upx;
			background-color: #f1f1f1;

			.q-input {
				height: 40upx;
			}

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
		.item-half {
			width: 50%;
			margin-top: 20upx;
		}

		.item {
			width: 100%;
			margin-top: 20upx;
		}

	}

	.radius-sm {
		border-radius: 16upx;
	}
</style>