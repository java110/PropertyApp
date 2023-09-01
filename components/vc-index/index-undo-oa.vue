<template>
	<view class="index-undo" v-if="oaWorkflowFlows && oaWorkflowFlows.length>0">
		<view class="undo-title">
			<text class="text-bold">OA待办</text>
		</view>
		<view class="cu-list grid margin-top" :class="'col-3'">
			<view class="cu-item" @click="todoOaWorkflow(item);" v-for="(item,index) in oaWorkflowFlows" :key="index">
				<view :class="['cuIcon-form','text-red']">
					<view class="cu-tag badge" v-if="item.undoCount>0">
						<block>{{item.undoCount>99?'99+':item.undoCount}}</block>
					</view>
				</view>
				<text>{{item.flowName}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		queryOaWorkflow
	} from '@/api/oa/oa.js'
	export default {
		name: "indexUndoOa",
		data() {
			return {
				oaWorkflowFlows:[],
			};
		},
		methods:{
			_queryOaWorkFlow: function() {
				let _that = this;
				queryOaWorkflow(this, {
					page: 1,
					row: 100,
					state: 'C',
					flowType:'1001'
				}).then(_data => {
					console.log(_data.data)
					_that.oaWorkflowFlows = _data.data;
				})
			},
			todoOaWorkflow:function(_flow){
				uni.navigateTo({
					url:'/pages/newOaWorkflowUndo/newOaWorkflowUndo?flowId='+_flow.flowId+"&flowName="+_flow.flowName
				})
			}
		}
	}
</script>

<style lang="scss">
	.index-undo {
		background-color: #ffffff;

		.undo-title {
			padding: 20upx;
			border-bottom: 1upx solid #F1F1F1;
		}

		.undo-menu {
			padding: 20upx;

			.menu-item {
				width: 33.33%;
				padding: 30upx;
				text-align: center;

				image {
					width: 80upx;
					height: 80upx;
				}

				border-bottom: 1upx solid #F1F1F1;
				border-right: 1upx solid #F1F1F1;
			}

			.menu-item:nth-child(3n+3) {
				border-right: none;
			}

			.menu-item:nth-child(n+4) {
				border-bottom: none;
			}
		}
	}
</style>
