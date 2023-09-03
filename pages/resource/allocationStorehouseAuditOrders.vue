<template>
	<view>
		<view class="cu-bar bg-white  solid-bottom" style="justify-content: space-around;">
			<view class="action" @click="changeListType(0)">
				<text class="text-blue" :class="{'cuIcon-roundcheckfill' : currentPage == 0, 'cuIcon-roundcheck' : currentPage == 1}"></text>待办
			</view>
			<view class="action" @click="changeListType(1)">
				<text class="text-blue" :class="{'cuIcon-roundcheckfill' : currentPage == 1, 'cuIcon-roundcheck' : currentPage == 0}"></text>已办
			</view>
		</view>
		<view class="margin-top" v-show="currentPage == 0">
			<allocation-audit-undo ref="allocationAuditUndoRef"></allocation-audit-undo>
		</view>
		<view class="margin-top" v-show="currentPage == 1">
			<allocation-audit-his ref="allocationAuditHisRef"></allocation-audit-his>
		</view>
		
	</view>
</template>

<script>
	import allocationAuditHis from '../../components/resource/allocation-audit-his.vue'
	import allocationAuditUndo from '../../components/resource/allocation-audit-undo.vue'
	export default {
		data() {
			return {
				onoff: true,
				currentPage: 0,
				communityId: '',
				applyList: [],
				page: 1,
				userId: this.java110Context.getUserInfo().userId,
				orderInfo: '',
				procure: false,
				loadingStatus : 'loading',
				loadingContentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			}
		},
		components: {
			allocationAuditHis,
			allocationAuditUndo
		},
		onLoad: function(options) {
			let _that =this;
			this.java110Context.onLoad();
			setTimeout(function(){
				_that.changeListType(0);
			},1000)
					
		},
		methods: {
			
			changeListType: function(e){
				this.currentPage = e;
				this.page = 1;
				this.applyList = [];
				this.loadingStatus = 'more';
				if(e == 0){
					this.$refs.allocationAuditUndoRef.loadApply();
				}else{
					this.$refs.allocationAuditHisRef.loadApplyDone();
				}
			},
		}
	}
</script>

<style>
	.item-content{
		width: 100%;
		margin-left: 20rpx;
		line-height: 1.6em;
	}
	.ellipsis{
		display: inline-block;
		max-width: 50%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		vertical-align: middle
	}
	.bg-white{
		position: relative;
	}
	.cu-btn{
		position: absolute;
		right: 10rpx;
		top: 25rpx;
	}
</style>
