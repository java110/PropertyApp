<template>
	<view class="user-container margin-top">
		<view class="cu-list menu" v-if="finishs.length > 0" v-for="(finish, idx) in finishs" :key="idx"
			:data-item="finish" @click="gotoDetail(finish)">
			<view class="cu-item arrow">
				<view class="content padding-tb-sm">
					<view>
						<text class="cuIcon-notification text-cut text-green margin-right-xs"></text>
						<view class="text-cut" style="width:220px">{{finish.create_user_name}}申请的{{flowName}}单</view>
					</view>
					<view class="text-gray text-sm">
						<text class="margin-right-xs">申请时间：</text> {{finish.create_time}}
					</view>
				</view>
				<view class="action" >{{_getNewOaWorkflowFinishState(finish)}}</view>
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
		queryOaWorkflowUserHisTaskFormData
	} from '../../api/oa/oa.js'
	export default {
		data() {
			return {
				communityId: "",
				finishs: [],
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
			this._loadFinsihOaWorkflow();
		},

		methods: {
			_loadFinsihOaWorkflow: function() {
				let _that = this;
				queryOaWorkflowUserHisTaskFormData(this, {
					page: 1,
					row: 100,
					flowId: this.flowId
				}).then(_data => {
					_that.finishs = _data.data;
				})
			},
			gotoDetail:function(_finish){
				this.context.navigateTo({
					url:'/pages/newOaWorkflowDetail/newOaWorkflowDetail?flowId='+_finish.flowId+"&id="+_finish.id
				})
			},
			_getNewOaWorkflowFinishState: function(_finish) {
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
	};
</script>
<style>
	.cu-list+.cu-list {
		margin-top: 10px;
	}
</style>
