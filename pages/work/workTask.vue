<template>
	<view>
		<view class="block__title">选择处理人</view>
		<view v-if="tasks && tasks.length >0">
			<view class="cu-form-group arrow" v-for="(item,index) in tasks" :key="index"
				@click="_chooseStaff(item)">
				<view class="title">{{item.staffName}}</view>
				<text class='cuIcon-right'></text>
			</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	import noDataPage from '../../components/no-data-page/no-data-page.vue';
	import {getWorkTask} from '@/api/oa/workApi.js';
	export default {
		data() {
			return {
				tasks:[],
				workId:'',
			}
		},
		onLoad(options) {
			this.workId = options.workId;
			this._loadTask();
		},
		methods: {
			_chooseStaff:function(_task){
				uni.navigateTo({
					url:'/pages/work/workDetail?workId='+this.workId+'&taskId='+_task.taskId
				})
			},
			_loadTask(){
				let _that = this;
				getWorkTask(this,{
					page:1,
					row:100,
					workId:this.workId
				}).then(_data=>{
					_that.tasks = _data.data;
				})
			}
		}
	}
</script>

<style lang="scss">
	.block__title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40rpx 30rpx 20rpx;
	}

	.button_up_blank {
		height: 40rpx;
	}

	.cu-list.menu-avatar>.cu-item .content-left {
		left: 30upx;
	}

	.cu-list+.cu-list {
		margin-top: 20upx;
	}
</style>
