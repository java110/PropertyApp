<template>
	<view>
		<view class="user-container bg-white flex flex-direction align-center">
			<view class="cu-avatar xl round margin-left lage-avatar" :style="'background-image:url('+staffInfo.img+');'"></view>
			<view class="margin-top">
				<text>{{staffInfo.name}}</text>
			</view>
		</view>

		<view class="margin-top">
			<view class="cu-list menu">
				<view class="cu-item arrow">
					<view class="content">
						<text class="cuIcon-circlefill text-grey"></text>
						<text class="text-grey">图标 + 标题</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<view class="content">
						<image src="/static/logo.png" class="png" mode="aspectFit"></image>
						<text class="text-grey">图片 + 标题</text>
					</view>
				</view>
				<view class="cu-item arrow">
					<button class="cu-btn content" open-type="contact">
						<text class="cuIcon-btn text-olive"></text>
						<text class="text-grey">Open-type 按钮</text>
					</button>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" hover-class="none" url="../list/list" open-type="redirect">
						<text class="cuIcon-discoverfill text-orange"></text>
						<text class="text-grey">Navigator 跳转</text>
					</navigator>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				staffInfo: {
					img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg',
					name: '一纸荒年'
				}

			}
		},
		methods: {

		}
	}
</script>

<style>
	.user-container {
		padding: 60upx 0 40upx 0;
	}

	.lage-avatar {
		width: 200upx;
		height: 200upx;
	}
</style>
