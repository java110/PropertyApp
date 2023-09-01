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
			let _that = this;
			setTimeout(function(){
				_that.$refs.workFunctionRef._loadMenu();
			},1000)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
