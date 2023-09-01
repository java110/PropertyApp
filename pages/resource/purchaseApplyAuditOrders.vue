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
			<purchase-apply-audit-undo ref="purchaseApplyAuditUndoRef"></purchase-apply-audit-undo>
		</view>
		
		<view class="margin-top" v-show="currentPage == 1">
			<purchase-apply-audit-his ref="purchaseApplyAuditHisRef"></purchase-apply-audit-his>
		</view>
		
	</view>
</template>

<script>
	import purchaseApplyAuditHis from '../../components/resource/purchase-apply-audit-his.vue'
	import purchaseApplyAuditUndo from '../../components/resource/purchase-apply-audit-undo.vue'
	export default {
		data() {
			return {
				currentPage: 0,
				communityId: '',
			
			}
		},
		components: {
			purchaseApplyAuditHis,
			purchaseApplyAuditUndo
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
				this.loadingStatus = 'more';
				if(e == 0){
					this.$refs.purchaseApplyAuditUndoRef.loadApply();
				}else{
					this.$refs.purchaseApplyAuditHisRef.loadApplyDone();
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
