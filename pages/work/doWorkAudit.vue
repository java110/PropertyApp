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
		
		<view class="cu-form-group margin-top-xs">
			<view class="title">动作</view>
			<picker :value="actionIndex" :range="actions" range-key="name" @change="actionChange">
				<view class="picker">
					{{actions[actionIndex].name}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group arrow margin-top-xs" v-if="action == 'T'">
			<view class="title">下一处理人</view>
			<view>
				<text @click="_selectStaff">{{staffName || '请选择'}}</text>
				<text class='cuIcon-right'></text>
			</view>

		</view>
		<view class="cu-form-group margin-top-sm">
			<textarea v-model="content" placeholder="必填,请输入内容"></textarea>
		</view>
		<view class="margin-top-sm">
			<vc-upload-file ref="vcUploadFileRel" @uploadFile="uploadFile"></vc-upload-file>
		</view>

		<view class="flex flex-direction margin-top-lg">
			<button class="cu-btn bg-blue margin-tb-sm lg" @click="submitWorkOrder">提交</button>
		</view>

		<select-one-staffs ref="selectOneStaffsRef" @getStaffs="getStaffs"></select-one-staffs>
	</view>
</template>

<script>
	import vcUploadFile from '@/components/vc-upload/vc-upload-file.vue';
	import selectOneStaffs from '../../components/select-staff/select-one-staffs.vue';
	import {
		finishWorkTask,
		getTaskWork
	} from '../../api/oa/workApi.js';
	export default {
		data() {
			return {
				actions: [{
					name: '办理',
					value: 'C'
				}, {
					name: '转单',
					value: 'T'
				}],
				actionIndex: 0,
				action: 'C',
				content: '',
				pathUrl: '',
				taskId: '',
				workId: '',
				staffId: '',
				staffName: '',
				workName:'',
				createUserName:''
			}
		},
		components: {
			vcUploadFile,
			selectOneStaffs
		},
		onLoad(options) {
			this.taskId = options.taskId;
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
			actionChange: function(e) {
				this.actionIndex = e.detail.value;
				this.action = this.actions[this.actionIndex].value;
			},
			uploadFile: function(_obj) {
				console.log(_obj);
				this.pathUrl = _obj.realFileName;
			},
			_selectStaff: function() {
				this.$refs.selectOneStaffsRef.switchShow();
			},
			getStaffs: function(data) {
				console.log(data);
				if (!data.staffId) {
					return;
				}
				this.staffId = data.staffId;
				this.staffName = data.staffName;
			},
			submitWorkOrder: function() {
				finishWorkTask(this, {
					taskId: this.taskId,
					auditCode: this.action,
					auditMessage: this.content,
					staffId: this.staffId,
					staffName: this.staffName,
					pathUrl: this.pathUrl,
				}).then(_data => {
					uni.navigateBack();
				})
			}
		}
	}
</script>

<style>

</style>