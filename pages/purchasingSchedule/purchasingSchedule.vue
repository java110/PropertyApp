<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="active==0?'text-green cur':''" @tap="tabSelect(0)">
					待处理
				</view>
				<view class="cu-item flex-sub" :class="active==1?'text-green cur':''" @tap="tabSelect(1)">
					接单中
				</view>
				<view class="cu-item flex-sub" :class="active==2?'text-green cur':''" @tap="tabSelect(2)">
					完成
				</view>
			</view>
		</scroll-view>
		<!---->
		<view v-if="active == 0" class="ppfl_c" >
			
		</view>

		<view v-if="active == 1" class="ppfl_c" >
			
		</view>

		<view v-if="active == 2" class="ppfl_c" >
			
		</view>


	</view>
</template>

<script>
	import context from '../../lib/java110/Java110Context.js'
	const factory = context.factory;;
	const constant = context.constant;
	export default {
		data() {
			return {
				active: 0,
			}
		},
		/**
		 * 生命周期函数--监听页面加载
		 */
		onLoad: function(options) {
			this.java110Context.onLoad()
		},
		methods: {
			onChange: function(e) {
				console.log(e);

				this._loadRepair(e.detail.index);
			},
			tabSelect: function(_active) {
				this.active = _active;
				this._loadRepair(_active);
			}
		}
	}
</script>

<style>
	.solid-bottom::after {
		border-bottom: 2upx solid rgba(0, 0, 0, 0.1);
	}

</style>
