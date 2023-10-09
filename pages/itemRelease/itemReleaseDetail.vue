<template>
	<view>
		<view class="block__title">基础信息</view>
		<view class="cu-form-group">
			<view class="title">放行类型</view>
			<view>{{order.typeName}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">申请单位</view>
			<view>{{order.applyCompany}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">申请人</view>
			<view>{{order.applyPerson}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">手机号</view>
			<view>{{order.applyTel}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">身份证</view>
			<view>{{order.idCard}}</view>
		</view>
		<view class="cu-form-group">
			<view class="title">车牌号</view>
			<view>{{order.carNum}}</view>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">通行时间</view>
			<view>{{order.passTime}}</view>
		</view>
		<view class="cu-form-group arrow">
			<view class="title">备注</view>
			<view>{{order.remark}}</view>
		</view>

		<view class="block__title">物品信息</view>
		<view class="cu-form-group arrow" v-for="(item,index) in resNames">
			<view class="title">{{item.resName}}</view>
			<view class="">{{item.amount}}</view>
		</view>
		<view class="block__title">审批流程</view>
		<view class="cu-form-group arrow" v-for="(item,index) in comments">
			<view class="title">{{item.staffName}}</view>
			<view class="">
				<text v-if="item.endTime">处理完成</text>
				<text v-else>正在处理</text>
				<text v-if="item.context">({{item.context}})</text>
			</view>
		</view>
		<view v-if="action && action == 'Audit'">
			<audit-item-release ref="auditItemReleaseRef"></audit-item-release>
		</view>
	</view>
</template>

<script>
	import {
		getItemRelease,
		getItemReleaseRes,
		queryOaWorkflowUser
	} from '../../api/itemRelease/itemReleaseApi.js';
	import {
		getCurrentCommunity
	} from '../../api/community/community.js';
	import auditItemRelease from '../../components/audit/audit-item-release.vue';
	export default {
		data() {
			return {
				order: {

				},
				resNames: [],
				irId: '',
				comments: [],
				flowId: '',
				action: '',
				taskId: '',
				audit: {
					auditCode: '1100',
					auditMessage: '同意',
					staffId: '',
					staffName: '',
					taskId: ''
				},
				nextAudit: {},
			}
		},
		onLoad(options) {
			this.irId = options.irId;
			this.flowId = options.flowId;
			this.action = options.action;
			this.taskId = options.taskId;
			this._loadDetail();
			this._loadDetailResNames();
			let _that = this;


		},
		components: {
			auditItemRelease
		},
		methods: {
			_loadDetail: function() {
				let _that = this;
				getItemRelease(this, {
					page: 1,
					row: 1,
					irId: this.irId,
					communityId: getCurrentCommunity().communityId
				}).then(_data => {
					_that.order = _data[0];
					_that._loadComment();
				}).then(() => {
					if (_that.action && _that.action == 'Audit') {
						_that.$refs.auditItemReleaseRef.initAuditItemRelease({
							taskId: _that.taskId,
							flowId: _that.flowId,
							irId: _that.irId,
							startUserId: _that.order.createUserId
						});
					}

				})
			},
			_loadDetailResNames: function() {
				let _that = this;
				getItemReleaseRes(this, {
					page: 1,
					row: 100,
					irId: this.irId,
					communityId: getCurrentCommunity().communityId
				}).then(_data => {
					_that.resNames = _data;
				})
			},
			_loadComment: function() {
				let _that = this;
				queryOaWorkflowUser(this, {
					page: 1,
					row: 100,
					id: this.irId,
					communityId: getCurrentCommunity().communityId,
					flowId: this.order.flowId
				}).then(_data => {
					_that.comments = _data;
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
</style>
