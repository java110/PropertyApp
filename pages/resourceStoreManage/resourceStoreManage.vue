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
				<button class="cu-btn bg-blue" @tap="_scrapResource()">损耗</button>
			</view>
			<view class="action">
				<button class="cu-btn bg-blue" @tap="_transferResource()">转赠</button>
			</view>
		</view>
		<view class="margin-top" v-if="resourceList.length>0">
			<view class="cu-list menu-avatar " v-for="(item,index) in resourceList" :key="index">
				<view class="cu-item">
					<view class="content">
						<view class="text-grey">
							<text class="text-green margin-right-xs" v-if="hasPrivilege">{{item.userName}}</text>
							<text class="ellip">{{item.resName}}({{item.parentRstName}} > {{item.rstName}})</text>
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
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								固定资产：{{item.isFixedName}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingStatus" :content-text="loadingContentText" />
		</view>
		<view v-else>
			<no-data-page></no-data-page>
		</view>
	</view>
</template>

<script>
	
	import {queryMyResourceStoreInfo} from '../../api/resource/resource.js'
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
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
				// noData:false,
				page: 1,
				hasPrivilege: this.java110Context.hasPrivilege('502021071018550002'),
				loadingStatus : 'loading',
				loadingContentText: {
					contentdown: '上拉加载更多',
					contentrefresh: '加载中',
					contentnomore: '没有更多'
				}
			}
		},
		components: {
			noDataPage,
			uniLoadMore
		},
		onLoad() {
			this.java110Context.onLoad();
		},
		onShow() {
			this.resourceList = [];
			this.page = 1;
			this._loadResourceList();
		},
		onReachBottom : function(){
			if(this.loadingStatus == 'noMore'){
				return;
			}
			this._loadResourceList();
		},
		methods: {
			
			checkAuth: function(pid){
				return this.java110Context.hasPrivilege(pid);
			},
			
			_loadResourceList: function() {
				this.loadingStatus = 'more';
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

						let _data = res.data;
						_that.resourceList = _that.resourceList.concat(_data);
						_that.page ++;

						// if(_that.resourceList.length < 1){
						// 	_that.noData = true;
						// 	return ;
						// }
						if(_that.resourceList.length == res.total){
							_that.loadingStatus = 'noMore';
							return;
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
			
			_scrapResource: function(){
				uni.navigateTo({
					url: '/pages/resourceStoreScrap/resourceStoreScrap'
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
	.cu-list.menu-avatar>.cu-item{
		height: auto;
	}
	.cu-list+.cu-list {
		margin-top: 20upx;
	}

	.cu-list.menu-avatar>.cu-item .content{
		position: static;
		margin-left: 20upx;
		width: 100%;
	}
</style>
