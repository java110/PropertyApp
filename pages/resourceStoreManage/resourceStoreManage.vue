<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入物品名称" v-model="resName" confirm-type="search"></input>
			</view>
			<view class="search-form round" v-if="hasPrivilege">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入用户名称" v-model="searchUserName" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_searchResource()">搜索</button>
			</view>
		</view>
		<view class="cu-bar bg-white">
			<view class="action">
				<button class="cu-btn bg-blue" @tap="_returnResource()">退还</button>
			</view>
			<view class="action">
				<button class="cu-btn bg-blue" @tap="_transferResource()">转赠</button>
			</view>
		</view>
		<view class="margin-top" v-if="noData==false">
			<view class="cu-list menu-avatar " v-for="(item,index) in resourceList" :key="index">
				<view class="cu-item">
					<view class="content content-left">
						<view class="text-grey">
							<text class="text-green margin-right-xs" v-if="hasPrivilege">{{item.userName}}</text>
							<text class="ellip">{{item.resName}}-{{item.rstName}}</text>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								库存：{{item.stock}}{{item.unitCodeName}}
							</view>
						</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								最小计量总数：{{item.miniStock}}{{item.miniUnitCodeName}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="load-more" @click="_loadResourceList()">加载更多</view>
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	
	import {queryMyResourceStoreInfo} from '../../api/resource/resource.js'
	import noDataPage from '@/components/no-data-page/no-data-page.vue'
	import url from '../../constant/url.js'
	import {getCurrentCommunity} from '../../api/community/community.js'
	export default {
		data() {
			return {
				orderImg: url.baseUrl + 'img/order.png',
				resourceList: [],
				resName: '',
				searchUserName: '',
				noData:false,
				page: 1,
				hasPrivilege: this.java110Context.hasPrivilege('502021071018550002')
			}
		},
		components: {
			noDataPage
		},
		onLoad() {
			this.java110Context.onLoad();
		},
		onShow() {
			this.resourceList = [];
			this.page = 1;
			this._loadResourceList();
		},
		methods: {
			
			checkAuth: function(pid){
				return this.java110Context.hasPrivilege(pid);
			},
			
			_loadResourceList: function() {
				let _that = this;
				let _objData = {
					resName: _that.resName,
					searchUserName: _that.searchUserName,
					page: _that.page,
					row: 10,
					communityId: getCurrentCommunity().communityId
				};
				queryMyResourceStoreInfo(this, _objData)
					.then(function(res) {
						if (res.code != 0) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							});
							return;
						}
						if(res.data.length <= 0){
							uni.showToast({
								title: '已全部加载'
							})
						}else{
							let _data = res.data;
							_that.resourceList = _that.resourceList.concat(_data);
							_that.page ++;
						}
						if(_that.resourceList.length < 1){
							_that.noData = true;
							return ;
						}
					});
			},
			_searchResource: function() {
				this.resourceList = [];
				this.page = 1;
				this._loadResourceList();
			},
			
			_returnResource: function(){
				uni.navigateTo({
					url: '/pages/resourceStoreReturn/resourceStoreReturn'
				})
			},
			
			_transferResource: function(){
				uni.navigateTo({
					url: '/pages/resourceStoreTransfer/resourceStoreTransfer'
				})
			},
		}
	}
</script>

<style>
	.cu-list.menu-avatar>.cu-item .content-left {
		left: 30upx;
	}

	.cu-list+.cu-list {
		margin-top: 20upx;
	}
</style>
