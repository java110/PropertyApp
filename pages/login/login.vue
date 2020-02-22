<template>
	<view>
		<view class="cu-avatar xl round margin-left lage-avatar" style="background-image:url('logo.png');"></view>
		<view class="margin-top">
			<text>{{staffInfo.name}}</text>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			uni.hideTabBar({
				animation:false
			});
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
