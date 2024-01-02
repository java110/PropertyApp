<template>
	<view class="vc-index">
		<index-header ref="indexHeaderRef"></index-header>
		<!-- 工作待办-->
		<view class="margin-top">
			<index-undo ref="indexUndoRef"></index-undo>
		</view>
		<!-- 工作单-->
		<view class="margin-top">
			<index-undo-work ref="indexUndoWorkRef"></index-undo-work>
		</view>
		<!-- oa待办 -->
		<view class="margin-top">
			<index-undo-oa ref="indexUndoOaRef"></index-undo-oa>
		</view>

	</view>
</template>

<script>
	import indexHeader from '@/components/vc-index/index-header.vue';
	import indexUndo from '@/components/vc-index/index-undo.vue';
	import indexUndoWork from '@/components/vc-index/index-undo-work.vue'
	import indexUndoOa from '@/components/vc-index/index-undo-oa.vue';

	import {
		queryUndoCount
	} from '@/api/index/index.js';
	import {
		getCurrentCommunity
	} from '../../api/community/community.js'
	export default {
		data() {
			return {
				undo: {
					allocation: "0",
					collection: "0",
					complaint: "0",
					contractApply: "0",
					contractChange: "0",
					inspectionTaskCount: 0,
					itemReleaseCount: 0,
					maintainanceTaskCount: 0,
					ownerSettledApplyCount: 0,
					purchase: "0",
					repair: "0",
					visitUndoCount: 0,
					workSendCount:0,
					workUndDoCount:0,
					workUndoCopyCount:0,
				}
			}
		},
		components: {
			indexHeader,
			indexUndo,
			indexUndoOa,
			indexUndoWork
		},
		onLoad() {
			this.java110Context.onLoad();
			let _that = this;
			setTimeout(function(){
				_that.$refs.indexHeaderRef._initData(_that.undo);
				_that.$refs.indexUndoRef._initData(_that.undo);
				_that.$refs.indexUndoWorkRef._initData(_that.undo);
				
			},1000)
			
		},
		onShow() {
				let _that = this;
			setTimeout(function(){
				_that.$refs.indexUndoOaRef._queryOaWorkFlow();
			},1000)
			this._loadUndoData();
		},

		methods: {
			_loadUndoData: function() {
				let _that = this;
				queryUndoCount(this, {
					communityId: getCurrentCommunity().communityId,
					page: 1,
					row: 10
				}).then(_data => {
					_that.undo = _data.data;
					_that.$refs.indexHeaderRef._initData(_that.undo);
					_that.$refs.indexUndoRef._initData(_that.undo);
					_that.$refs.indexUndoWorkRef._initData(_that.undo);
				})
			}
		}
	}
</script>

<style lang="scss">


</style>
