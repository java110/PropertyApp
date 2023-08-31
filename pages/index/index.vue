<template>
	<view class="vc-index">
		<index-header></index-header>
		<!-- 工作待办-->
		<view class="margin-top">
			<index-undo></index-undo>
		</view>
		<!-- oa待办 -->
		<view class="margin-top">
			<index-undo-oa></index-undo-oa>
		</view>
			
	</view>
</template>

<script>
	import indexHeader from '@/components/vc-index/index-header.vue';
	import indexUndo from '@/components/vc-index/index-undo.vue';
	import indexUndoOa from '@/components/vc-index/index-undo-oa.vue';
	
	export default {
		data() {
			return {
				
			}
		},
		components: {
			indexHeader,
			indexUndo,
			indexUndoOa
		},
		onLoad() {
			this.java110Context.onLoad();
		},
		
		methods: {
			
		}
	}
</script>

<style lang="scss">
	

</style>
