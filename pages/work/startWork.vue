<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="active==0?'text-blue cur':''" @tap="tabSelect(0)">
					全部
				</view>
				<view class="cu-item flex-sub" :class="active==1?'text-blue cur':''" @tap="tabSelect(1)">
					发工作单
				</view>
			</view>
		</scroll-view>
		
		<view v-if="active == 0">
			<my-work ref="myWorkRef"></my-work>
		</view>
		<view v-if="active == 1">
			<add-work ref="addWorkRef" @tabSelect="tabSelect"></add-work>
		</view>
	</view>
</template>

<script>
	import myWork from '@/components/work/my-work.vue';
	import addWork from '@/components/work/add-work.vue';
	export default {
		data() {
			return {
				active:0,
			}
		},
		components:{
			myWork,
			addWork
		},
		onLoad() {
			
		},
		onShow() {
			
		},
		methods: {
			tabSelect:function(_active){
				this.active = _active;
				let _that = this;
				if(this.active == 0){
					setTimeout(function(){
						_that.$refs.myWorkRef._loadStartWork();
					},500)
					
					return;
				}
				
				if(this.active == 1){
					setTimeout(function(){
						_that.$refs.addWorkRef._initAddWork();
					},500)
				}
			}
		}
	}
</script>

<style>

</style>
