<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="active==1?'text-green cur':''" @tap="tabSelect(1)">
					待办
				</view>
				<view class="cu-item flex-sub" :class="active==2?'text-green cur':''" @tap="tabSelect(2)">
					已办
				</view>
			</view>
		</scroll-view>
		<view v-if="active == 1">
			<view class="cu-list menu-avatar margin-top" >
				<view class="cu-item arrow" v-for="(item,index) in oaWorkflowFlows" :key="index" @click="_todoUndo(item)">
					<view class="content" style="left: 10upx;">
						<view class="text-grey">
							<text class="ellip">{{item.typeName}}-{{item.stateName}}</text>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								通行时间：{{item.passTime}}
							</view>
						</view>
					</view>
					<view  class="action">
						<view class="text-grey text-xs">{{item.amount}}个
							<text class="lg text-gray cuIcon-right margin-left-xs"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="active == 2">
			<view class="cu-list menu-avatar margin-top" >
				<view class="cu-item arrow" v-for="(item,index) in oaWorkflowFlows" :key="index" @click="_todoFinish(item)">
					<view class="content" style="left: 10upx;">
						<view class="text-grey">
							<text class="ellip">{{item.typeName}}-{{item.stateName}}</text>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								通行时间：{{item.passTime}}
							</view>
						</view>
					</view>
					<view  class="action">
						<view class="text-grey text-xs">{{item.amount}}个
							<text class="lg text-gray cuIcon-right margin-left-xs"></text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {queryUndoItemRelease,queryFinishItemRelease} from '../../api/itemRelease/itemReleaseApi.js'
	export default {
		data() {
			return {
				active: 1,
				oaWorkflowFlows: []
			}
		},
		onLoad() {
			this.java110Context.onLoad()
			this.tabSelect(1);
		},
		methods: {
			tabSelect: function(_active) {
				this.active = _active;
				this._queryOaWorkFlow(_active);
			},
			_queryOaWorkFlow: function(_active) {
				let _that = this;
				if(_active == 1){
					queryUndoItemRelease(this, {
						page: 1,
						row: 100,
					}).then(_data => {
						_that.oaWorkflowFlows = _data.data;
					})
				}else{
					queryFinishItemRelease(this, {
						page: 1,
						row: 100,
					}).then(_data => {
						_that.oaWorkflowFlows = _data.data;
					})
				}
				
			},
			_todoUndo:function(_undo){
				uni.navigateTo({
					url:'/pages/itemRelease/itemReleaseDetail?irId='+ _undo.irId +
                    "&flowId=" + _undo.flowId +
                    "&action=Audit" +
                    "&taskId=" + _undo.taskId
				})
			},
			_todoFinish:function(_undo){
				uni.navigateTo({
					url:'/pages/itemRelease/itemReleaseDetail?irId='+ _undo.irId +
				    "&flowId=" + _undo.flowId
				})
			}
		}
	}
</script>

<style>

</style>
