<template>
	<view>
		<view class="cu-bar bg-white search " >
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
			</view>
		</view>
		
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<block v-for="(item,index) in list" :key="index">
				<view :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
					<view class="padding">{{item.name}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item" v-for="(items,sub) in 2" :key="sub">
							<view class="cu-avatar round lg">{{item.name}}</view>
							<view class="content">
								<view class="text-grey">{{item.name}}<text class="text-abc">{{list[sub].name}}</text>君</view>
								<view class="text-gray text-sm">
									有{{sub+2}}个主子需要伺候
								</view>
							</view>
							<view class="action">
								<text class="lg text-gray cuIcon-dianhua photo_icon"></text>
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
				
			}
		},
		onLoad() {
			let list = [{}];
			for (let i = 0; i < 5; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
			}
			this.list = list;
		},
		methods: {
			
		}
	}
</script>

<style>
	
	.photo_icon{
		font-size: 48upx;
		color:#0081FF;
	}

</style>
