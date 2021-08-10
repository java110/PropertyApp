<template>
	<view class="h5-html">
		 <web-view ref="webview"  :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			let _url = options.url;
			this.url = decodeURIComponent(_url);
		},
		methods: {
		}
	}
</script>

<style>
	.h5-html {
		width: 100%;
		height: 100%;
	}
</style>
