<template>
	<view>
		<view class="cu-form-group">
			<view class="title">题目</view>
			<view>{{workName}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">提交人</view>
			<view>{{createUserName}}</view>
		</view>
		<view class="cu-form-group margin-top-sm">
			<textarea v-model="content" placeholder="必填,请输入内容"></textarea>
		</view>

		<view class="flex flex-direction margin-top-lg">
			<button class="cu-btn bg-blue margin-tb-sm lg" @click="submitWorkOrder">提交</button>
		</view>

	</view>
</template>

<script>
	import {
		finishWorkCopy,
		getTaskWork
	} from '../../api/oa/workApi.js';
	export default {
		data() {
			return {
				content: '',
				copyId: '',
				workId: '',
				workName:'',
				createUserName:''
			}
		},
		onLoad(options) {
			this.copyId = options.copyId;
			this.workId = options.workId;
			this._loadWorkTask();
		},
		methods: {
			_loadWorkTask:function(){
				let _that =this;
				getTaskWork(this, {
					page: 1,
					row: 1,
					workId:this.workId,
					taskId: this.taskId,
				}).then(_data => {
					_that.workName = _data.data[0].workName;
					_that.createUserName= _data.data[0].createUserName;
				});
			},
			submitWorkOrder: function() {
				finishWorkCopy(this, {
					copyId: this.copyId,
					auditMessage: this.content,
				}).then(_data => {
					uni.navigateBack();
				})
			}
		}
	}
</script>

<style>

</style>