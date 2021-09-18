<template>
	<view class="user-container margin-top">
		<view class="cu-list menu" v-if="undos.length > 0" v-for="(undo, idx) in undos" :key="idx"
			:data-item="undo" @click="gotoDetail(undo)">
			<view class="cu-item arrow">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-notification text-cut text-green margin-right-xs"></text>
						<view class="text-cut" style="width:220px">{{undo.create_user_name}}申请的{{flowName}}单</view>
					</view>
					<view class="text-gray text-sm">
						<text class="margin-right-xs">申请时间：</text> {{undo.create_time}}
					</view>
				</view>
				<view class="action" >{{_getNewOaWorkflowUndoState(undo)}}</view>
			</view>
		</view>
		<view class="cu-list menu" v-else>
			<view class="cu-item">
				<view class="content">
					<text class="cuIcon-notification text-grey"></text>
					<text class="text-grey">暂无数据</text>
				</view>
				<view class="action">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryOaWorkflowUserTaskFormData
	} from '../../api/oa/oa.js'
	export default {
		data() {
			return {
				communityId: "",
				undos: [],
				currPageIndex: 0,
				pageSize: 10,
				flowId: '',
				flowName:''
			};
		},
		onLoad: function(options) {
			let that = this;
			this.java110Context.onLoad();
			this.flowId = options.flowId;
			this.flowName = options.flowName;
		},
		onShow() {
			this._loadUndoOaWorkflow();
		},

		methods: {
			_loadUndoOaWorkflow: function() {
				let _that = this;
				queryOaWorkflowUserTaskFormData(this, {
					page: 1,
					row: 100,
					flowId: this.flowId
				}).then(_data => {
					_that.undos = _data.data;
				})
			},
			gotoDetail:function(_undo){
				this.context.navigateTo({
					url:'/pages/newOaWorkflowDetail/newOaWorkflowDetail?flowId='+this.flowId+"&id="+_undo.id+"&action=Audit&taskId="+_undo.taskId
				})
			},
			_getNewOaWorkflowUndoState: function(_undo) {
				/**
				 * 1001 申请 1002 待审核 1003 退回 1004 委托 1005 办结
				 */
				if (!_undo.hasOwnProperty('state')) {
					return "未知";
				}
				switch (_undo.state) {
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
	};
</script>
<style>
	.cu-list+.cu-list {
		margin-top: 10px;
	}
</style>
