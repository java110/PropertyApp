<template>
	<view class="select-single-resource">
		<view class="cu-bar bg-white search ">
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_openChooseResourceModel()">选择物品</button>
			</view>
		</view>
		<view class="margin-top">
			<view class="cu-list menu-avatar " v-for="(item,index) in resourceList" :key="index">
				<view class="cu-item" style="height: 240rpx;">
					<view class="content content-left" style="width: 100%;">
						<view class="text-grey flex-around">
							<text class="ellip">{{item.resName}}-{{item.rstName}}</text>
							<text class="item-remove bg-red text-df" @click="_removeItem(index, item.resId)">移除</text>
						</view>
						<view class="text-gray flex-around text-df" style="margin: 10rpx 0;">
								<text>当前仓库:</text>
								<text>{{item.shName}}</text>
						</view>
						<view class="text-gray flex-around text-df" style="margin: 10rpx 0;">
								<text>当前库存:</text>
								<text>{{item.stock}}</text>
						</view>
						<view class="text-gray flex-around">
							<view class="flex-item w50">
								<label>调拨数量:</label>
								<input class="use-number bg-gray" type="number" v-model="item.curStock" value="" />
							</view>
							<view class="flex-item w50">
								<label>目标仓库:</label>
								<picker :value="selectedStoreHousesList[index]" :range="storeHouses" :range-key="'shName'" @change="_storeHousesChange(index,$event)">
									<view class="picker">
										{{storeHouses[selectedStoreHousesList[index]].shName}}
									</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<select-resource @getResourceInfo="_getResourceInfo" ref="selectresource" :resOrderType="resOrderType"></select-resource>
	</view>
</template>

<script>
	import {
		listStoreHouses
	} from '../../api/resource/resource.js'
	import selectResource from '../select-resource/select-resource.vue'
	import {getCurrentCommunity} from '../../api/community/community.js'
	
	export default {
		components: {
			selectResource
		},
		data() {
			return {
				resourceList: [],
				supplierIndex: 0,
				storeHouses: [
					{
						shId: '',
						shName: '请选择'
					}
				],
				selectedStoreHousesList: []
			}
		},
		props: {
			resOrderType: {
				type: String
			}
		},
		
		watch: {
		},
		
		created() {
		},
		
		computed: {
		},

		mounted() {
			this._loadResourceStoreHouses();
		},

		methods: {
			
			_openChooseResourceModel: function(){
				this.$refs.selectresource.switchShow();
			},
			
			_loadResourceStoreHouses: function(){
				let _that = this;
				let _data = {
					page: 1,
					row: 100,
					communityId: getCurrentCommunity().communityId
				};
				listStoreHouses(this, _data)
					.then(function(res) {
						_that.storeHouses = _that.storeHouses.concat(res.data);
					});
			},
			
			_storeHousesChange: function(i, e) {
				this.$set(this.selectedStoreHousesList, i, e.target.value)
				this.resourceList[i].shzId=this.storeHouses[this.selectedStoreHousesList[i]].shId
			},
			
			_getResourceInfo: function(list){
				this.resourceList = list;
				this.resourceList.forEach((item)=>{
					this.selectedStoreHousesList.push(0);
				})
			},
			
			getResourceStores: function(){
				this.$emit('getResourceStores', this.resourceList);
			},
			
			_removeItem: function(index, resId){
				this.resourceList.splice(index, 1);
				// 通知子组件 取消选中checkbox
				this.$refs.selectresource.removeSelectedItem(resId);
			}
		}
	}
</script>

<style>
	.cu-list.menu-avatar>.cu-item .content-left {
		left: 0;
	}

	.cu-list+.cu-list {
		margin-top: 20upx;
	}
	
	.flex-item{
		display: flex;
		flex-direction: row;
	}
	.w50{
		width: 50%;
	}
	.flex label, .flex-item label{
		width: 140rpx;
	}
	.use-number{
		width: 200rpx;
		border-radius: 15rpx;
	}
	.remark{
		width: 80%;
		border-radius: 15rpx;
	}
	.item-remove{
		border-radius: 15rpx;
		padding: 2rpx 10rpx;
	}
	.flex-around{
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
	}
</style>
