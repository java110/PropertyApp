<template>
	<view>
		<view class="bg-white margin-top margin-right-xs radius margin-left-xs padding">
			<view class="flex padding-bottom-xs solid-bottom justify-between">
				<view>{{oaWorkflowData.create_user_name}}</view>
				<view class="text-gray">{{oaWorkflowData.create_time}}</view>
			</view>
			<view class="flex margin-top justify-between">
				<view class="text-gray">工单状态</view>
				<view class="text-gray">{{_getNewOaWorkflowDetailState(oaWorkflowData)}}</view>
			</view>
			<view class="flex margin-top-xs justify-between" v-for="(item,index) in components"
				v-if="item.type != 'text' && item.type != 'button' ">
				<view class="text-gray">{{item.label}}</view>
				<view class="text-gray">{{oaWorkflowData[item.key]}}</view>
			</view>
			<view class="solid-top flex justify-end margin-top padding-top-sm " v-if="action=='Audit'">
				<button class="cu-btn sm bg-green margin-left" @click="doDealOaWorkflow()">处理</button>
			</view>
		</view>

		<view class="cu-timeline bg-white margin-top margin-right-xs radius margin-left-xs padding">
			<view class="cu-time">工单</view>
			<view class="cu-item " v-for="(item,index) in comments" :key="key">
				<view class="bg-cyan content">
					<text>{{item.startTime}} </text> 到达 {{item.staffName}} 工位
				</view>
				<view class="bg-cyan content" v-if="item.endTime != undefined">
					<text>{{item.endTime}} </text> 处理完成
				</view>
				<view class="bg-cyan content" v-if="item.endTime != undefined">
					<text>处理意见：</text> {{item.context}}
				</view>
			</view>
		</view>
		
		<view class="cu-timeline bg-white margin-top margin-right-xs radius margin-left-xs padding">
			<view class="cu-time">流程图</view>
			<view class="">
				<image :src="flowImage" :data-url="flowImage" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryOaWorkflowForm,
		queryOaWorkflowFormData,
		queryOaWorkflowUser,
		listRunWorkflowImage
	} from '../../api/oa/oa.js'
	export default {
		data() {
			return {
				oaWorkflowData: {},
				id: '',
				flowId: '',
				components: [],
				comments:[],
				flowImage:'',
				action:'',
				taskId:''
			}
		},
		onLoad(option) {
			this.java110Context.onLoad();
			this.id = option.id;
			this.flowId = option.flowId;
			this.action = option.action;
			this.taskId = option.taskId;
			this._loadOaWorkflowForm();
			this._loadOaWorkflowDetail();
			this._queryOaWorkflowUser();
			this._listRunWorkflowImage();
		},
		methods: {
			_loadOaWorkflowForm: function() {
				let _that = this;
				queryOaWorkflowForm(this, {
						page: 1,
						row: 10,
						flowId: this.flowId
					})
					.then(_data => {
						_that.formJson = JSON.parse(_data.data[0].formJson);
						_that.components = _that.formJson.components;
					})
			},
			_loadOaWorkflowDetail: function() {
				let _that = this;
				queryOaWorkflowFormData(this, {
					page: 1,
					row: 1,
					flowId: this.flowId,
					id: this.id
				}).then(_data => {
					_that.oaWorkflowData = _data.data[0];
				})
			},
			_queryOaWorkflowUser: function() {
				let _that = this;
				queryOaWorkflowUser(this, {
					page: 1,
					row: 100,
					flowId: this.flowId,
					id: this.id
				}).then(_data => {
					_that.comments = _data.data;
				})
			},
			_listRunWorkflowImage:function(){
				let _that = this;
				listRunWorkflowImage(this,{
					communityId:'',
					businessKey:this.id
				}).then(_data=>{
					_that.flowImage ='data:image/png;base64,' + _data.data;
				})
			},
			doDealOaWorkflow:function(){				
				this.context.navigateTo({
					url:'/pages/newOaWorkflowUndoAudit/newOaWorkflowUndoAudit?flowId='+this.flowId+"&id="+this.id+"&taskId="+this.taskId
				})
			},
			
			_getNewOaWorkflowDetailState: function(_finish) {
				/**
				 * 1001 申请 1002 待审核 1003 退回 1004 委托 1005 办结
				 */
				if (!_finish.hasOwnProperty('state')) {
					return "未知";
				}

				switch (_finish.state) {
					case '1001':
						return "申请";
					case '1002':
						return "待审核";
					case '1003':
						return "退回";
					case '1004':
						return "委托";
					case '1005':
						return "办结";
				}

				return "未知"
			}
		}
	}
</script>

<style>
	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}
</style>
