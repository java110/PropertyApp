<template>
	<view>
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="state=='10001'?'text-green cur':''" @tap="_tabSelect('10001')">
					待处理单
				</view>
				<view class="cu-item flex-sub" :class="state=='10002'?'text-green cur':''" @tap="_tabSelect('10002')">
					历史单
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				state:'10001'

			}
		},
		methods: {
			
			_tabSelect:function(_state){
				this.state = _state;
			}

		}
	}
</script>

<style>

</style>
