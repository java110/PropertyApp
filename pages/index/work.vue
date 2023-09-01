<template>
	<view>
		<work-function ref="workFunctionRef"></work-function>
	</view>
</template>

<script>
	import workFunction from '@/components/vc-index/work-function.vue'
	export default {
		data() {
			return {
				
			}
		},
		components:{
			workFunction
		},
		onLoad() {
			this.$refs.workFunctionRef._loadMenu();
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
