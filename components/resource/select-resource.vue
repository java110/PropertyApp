<template>
	<view>
		<view class="cu-modal bottom-modal" :class="showModel?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white search ">
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input type="text" placeholder="请输入物品名" v-model="resName" confirm-type="search"></input>
					</view>
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input type="text" placeholder="请输入物品编码" v-model="resCode" confirm-type="search"></input>
					</view>
					<view class="action">
						<button class="cu-btn bg-gradual-green shadow-blur round"
							@tap="$preventClick(_searchStoreHouses)">搜索</button>
					</view>
				</view>
				<scroll-view scroll-y style="height: 800upx;">
					<view class="">
						<checkbox-group @change="checkboxChange">
							<view class="cu-list menu-avatar " v-for="(item,index) in resourceList" :key="index">
								<view class="cu-item">
									<view>
										<checkbox :value="item.resId" :checked="item.checked" />
									</view>
									<view class="content">
										<view class="text-grey">
											<text
												class="ellip">{{item.resName}}({{item.parentRstName}}>{{item.rstName}})</text>
										</view>
										<view class="text-gray text-sm flex">
											<view class="text-cut">
												仓库：{{item.shName}} > 规格：{{item.rssName}}
											</view>
										</view>
										<view class="text-gray text-sm flex">
											<view class="text-cut">
												价格：{{item.price}} > 库存：{{item.stock}}
											</view>
										</view>

									</view>
								</view>
							</view>
						</checkbox-group>
					</view>
					<view class="load-more" @click="_loadResourceList()">加载更多</view>

				</scroll-view>
				<view class="btn-box">
					<button type="default" @click="cancel()">取消</button>
					<button type="primary" @click="saveSelected()">保存</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryResourceStoreList,
		listStoreHouses,
		listResourceStoreTypes
	} from '../../api/resource/resource.js'
	import {
		getCurrentCommunity
	} from '../../api/community/community.js'
	// 防止多次点击
	import {
		preventClick
	} from '../../lib/java110/utils/common.js';
	import Vue from 'vue'
	Vue.prototype.$preventClick = preventClick;

	export default {
		components: {},
		data() {
			return {
				onoff: true,
				showModel: false,
				resourceList: [],
				page: 1,
				selectedResId: [],
				rstId: '',
				resName: '',
				resCode: '',
				storeHouses: [{
					shName: '请选择仓库'
				}],
				resourceStoreTypes: [{
					rstId: '',
					name: '请选择类型'
				}],
				rssIndex: 0,
				storeHousesIndex: 0,
				shId: '',
			}
		},
		props: {
			resOrderType: {
				type: String
			},
			shType: {
				type: String
			}
		},

		watch: {},

		created() {},

		computed: {},

		mounted() {
			//this._loadResourceList();
		},

		methods: {

			switchShow: function(_shId) {
				this.showModel = !this.showModel;
				this.shId = _shId;
				this._loadResourceList();
			},
			storeHousesChange: function(e) {
				this.storeHousesIndex = e.target.value;
				if (this.storeHousesIndex == 0) {
					this.shId = '';
					return;
				}
				let selected = this.storeHouses[this.storeHousesIndex];
				this.shId = selected.shId;
			},

			rssChange: function(e) {
				this.rssIndex = e.target.value;
				if (this.rssIndex == 0) {
					this.rstId = '';
					return;
				}
				let selected = this.resourceStoreTypes[this.rssIndex];
				this.rstId = selected.rstId;
			},
			_searchStoreHouses: function() {
				this.resourceList = [];
				this.page = 1;
				this._loadResourceList();
			},

			_loadResourceList: function() {
				let _that = this;
				let _data = {
					page: this.page,
					row: 50,
					communityId: getCurrentCommunity().communityId,
					resOrderType: this.resOrderType,
					shType: this.shType,
					shId: this.shId,
					resName: this.resName,
					resCode: this.resCode,
					isShow: true
				};
				if (_data.shId) {
					_data.communityId = '';
				}
				queryResourceStoreList(this, _data)
					.then(function(res) {
						_that.onoff = true;
						if (res.resourceStores.length <= 0) {
							uni.showToast({
								title: '已全部加载'
							})
							return;
						}
						_that.resourceList = _that.resourceList.concat(res.resourceStores);
						_that.page++;
					});
			},

			checkboxChange: function(e) {
				var values = e.detail.value;
				this.selectedResId = values;
				this.resourceList.forEach((item, index) => {
					if (values.includes(item.resId)) {
						item.checked = true;
					}
				});
			},

			removeSelectedItem: function(resId) {
				this.resourceList.forEach((item, index) => {
					if (item.resId == resId) {
						item.checked = false;
					}
				})
			},

			saveSelected: function() {
				var selectResourceStores = this.selectedResId;
				var resourceStores = this.resourceList;
				if (selectResourceStores.length < 1) {
					uni.showToast({
						title: '请选择物品',
						icon: 'none'
					})
					return;
				}
				var _resourceStores = [];
				for (var i = 0; i < selectResourceStores.length; i++) {
					for (var j = 0; j < resourceStores.length; j++) {
						if (selectResourceStores[i] == resourceStores[j].resId) {
							resourceStores[j].remark = '';
							_resourceStores.push(resourceStores[j])
						}
					}
				}
				this.$emit('getResourceInfo', _resourceStores);
				this.showModel = false;
			},

			cancel: function() {
				this.showModel = false;
			}
		}
	}
</script>

<style>
	.select-resource {
		position: fixed;
		top: 100rpx;
		left: 0;
		background-color: #fff;
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		z-index: 1;
		padding-bottom: 100rpx;
	}

	.btn-box {
		padding: 40rpx 0;
		display: flex;
		flex-direction: row;
	}

	.btn-box button {
		width: 40%;
	}

	.cu-list.menu-avatar>.cu-item .content {
		left: 40rpx;
		width: 80%;
	}

	.cu-list {
		margin: 0;
	}
</style>
