<template>
	<view class="select-resource" v-if="showModel">
		<view class="">
			<checkbox-group @change="checkboxChange">
				<view class="cu-list menu-avatar " v-for="(item,index) in resourceList" :key="index">
					<view class="cu-item">
						<view>
							<checkbox :value="item.resId" :checked="item.checked" />
						</view>
						<view class="content">
							<view class="text-grey">
								<text class="ellip">{{item.resName}}({{item.parentRstName}}>{{item.rstName}})</text>
							</view>
							<view class="text-gray text-sm flex">
								<view class="text-cut">
									编码：{{item.resCode}}
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
			</checkbox-group>
			<view class="btn-box">
				<button type="default" @click="cancel()">取消</button>
				<button type="primary" @click="saveSelected()">保存</button>
			</view>
			<view class="load-more" @click="_loadResourceList()">加载更多</view>
		</view>
	</view>
</template>

<script>
	import {
		queryMyResourceStoreInfo
	} from '../../api/resource/resource.js'
	import {getCurrentCommunity} from '../../api/community/community.js'

	export default {
		components: {
		},
		data() {
			return {
				showModel: false,
				resourceList: [],
				page: 1,
				selectedResId: [],
			}
		},
		props: {
		},
		
		watch: {
		},
		
		created() {
		},
		
		computed: {
		},

		mounted() {
			console.log('111');
			this._loadResourceList();
		},

		methods: {
			
			switchShow: function(){
				this.showModel = !this.showModel;
			},
			
			_loadResourceList: function(){
				let _that = this;
				let _data = {
					page: this.page,
					row: 10,
					communityId: getCurrentCommunity().communityId,
					giveType: 1
				};
				queryMyResourceStoreInfo(this, _data)
					.then(function(res) {
						if(res.data.length <= 0){
							uni.showToast({
								title: '已全部加载'
							})
							return;
						}
						_that.resourceList = _that.resourceList.concat(res.data);
						_that.page ++;
					});
			},
			
			checkboxChange: function (e) {
				var values = e.detail.value;
				this.selectedResId = values;
				this.resourceList.forEach((item, index) => {
					if(values.includes(item.resId)){
						item.checked = true;
					}
				});
			},
			
			removeSelectedItem: function(resId){
				this.resourceList.forEach((item, index) => {
					if(item.resId == resId){
						item.checked = false;
					}
				})
			},
			
			saveSelected: function(){
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
			
			cancel: function(){
				this.showModel = false;
			}
		}
	}
</script>

<style>
	.select-resource{
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
	.btn-box{
		padding: 40rpx 0;
		display: flex;
		flex-direction: row;
	}
	.btn-box button{
		width: 40%;
	}
	.cu-list.menu-avatar>.cu-item .content{
		left: 40rpx;
		width: 80%;
	}
	.cu-list{
		margin: 0;
	}
</style>
