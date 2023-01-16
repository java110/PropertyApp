<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="active==0?'text-green cur':''" @tap="tabSelect(0)">
					起草
				</view>
				<view class="cu-item flex-sub" :class="active==1?'text-green cur':''" @tap="tabSelect(1)">
					待办
				</view>
				<view class="cu-item flex-sub" :class="active==2?'text-green cur':''" @tap="tabSelect(2)">
					已办
				</view>
			</view>
		</scroll-view>
		<view v-if="active == 0">
			<view class="cu-list grid margin-top" :class="'col-2'">
				<view class="cu-item" @click="todoOaWorkflow(item);" v-for="(item,index) in oaWorkflowFlows" :key="index">
					<view :class="['cuIcon-form','text-blue']"></view>
					<text>{{item.flowName}}</text>
				</view>
			</view>
		</view>
		<view v-if="active == 1">
			<view class="cu-list grid margin-top" :class="'col-2'">
				<view class="cu-item" @click="todoOaWorkflow(item);" v-for="(item,index) in oaWorkflowFlows" :key="index">
					<view :class="['cuIcon-form','text-red']">
						<view class="cu-tag badge">
							<block>{{item.undoCount>99?'99+':item.undoCount}}</block>
						</view>
					</view>
					<text>{{item.flowName}}</text>
				</view>
			</view>
		</view>
		<view v-if="active == 2">
			<view class="cu-list grid margin-top" :class="'col-2'">
				<view class="cu-item" @click="todoOaWorkflow(item);" v-for="(item,index) in oaWorkflowFlows" :key="index">
					<view :class="['cuIcon-form','text-green']"></view>
					<text >{{item.flowName}}</text>
				</view>
			</view>
		</view>

	</view>
</template>
<script>
	import {
		queryOaWorkflow
	} from '../../api/oa/oa.js'
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				active: 0,
				ownerId: '',
				communityId: '',
				page: 1,
				totalPage: 0,
				loading: false,
				noData: false,
				userId: '',
				oaWorkflowFlows: []
			};
		},
		onLoad: function(options) {
			this.java110Context.onLoad()
			this.tabSelect(0);
			this._queryOaWorkFlow();
		},
		onShow: function() {

		},
		/**
		 * 页面相关事件处理函数--监听用户下拉动作
		 */
		onPullDownRefresh: function() {

		},

		methods: {
			tabSelect: function(_active) {
				this.active = _active;
				//this._loadCompaint(_active);
			},
			_queryOaWorkFlow: function() {
				let _that = this;
				queryOaWorkflow(this, {
					page: 1,
					row: 100,
					state: 'C',
					flowType:'1001'
				}).then(_data => {
					_that.oaWorkflowFlows = _data.data;
				})
			},
			todoOaWorkflow:function(_flow){
				if(this.active == 0){
					this.context.navigateTo({
						url:'/pages/newOaWorkflowForm/newOaWorkflowForm?flowId='+_flow.flowId+"&flowName="+_flow.flowName
					})
				}else if(this.active == 2){
					this.context.navigateTo({
						url:'/pages/newOaWorkflowFinish/newOaWorkflowFinish?flowId='+_flow.flowId+"&flowName="+_flow.flowName
					})
				}else{
					this.context.navigateTo({
						url:'/pages/newOaWorkflowUndo/newOaWorkflowUndo?flowId='+_flow.flowId+"&flowName="+_flow.flowName
					})
				}
				
			}

		}
	};
</script>
<style>
	@import "./oaWorkflow.css";
</style>
