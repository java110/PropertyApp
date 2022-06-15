<template>
	<view class="cu-modal bottom-modal" :class="showModel?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white ">
				<view class="action">
					<text class="cuIcon-title text-orange "></text>{{productInfo.prodName}}
				</view>
				<view class="action">
				</view>
			</view>
			<scroll-view scroll-y style="height: 700upx;">
				<block>
					<view class="select-single-resource">
						<view>
							<view class="cu-form-group margin-top">
								<view class="title">商品类型</view>
								<picker :value="goodsTypeIndex" :range="goodsTypeCloums" :range-key="'name'"
									@change="goodsParentTypeChange">
									<view class="picker">
										{{goodsTypeCloums[goodsTypeIndex].name}}
									</view>
								</picker>
							</view>
							<view v-if="isCustom">
								<view class="cu-form-group margin-top">
									<view class="title">商品名</view>
									<input v-model="customGoodsName" placeholder="请输入商品名"></input>
								</view>
								<view class="cu-form-group margin-top" v-show="feeFlag == '1001'">
									<view class="title">自定义价格</view>
									<input type="number" v-model="singlePrice" placeholder="请输入自定义价格"></input>
								</view>
							</view>
							<view v-else>
								<view class="cu-form-group margin-top">
									<view class="title">二级分类</view>
									<picker :value="goodsSonTypeIndex" :range="goodsSonTypeCloums" :range-key="'name'"
										@change="goodsTypeChange">
										<view class="picker">
											{{goodsSonTypeCloums[goodsSonTypeIndex].name}}
										</view>
									</picker>
								</view>
								<view class="cu-form-group margin-top" v-if="rstId!=''">
									<view class="title">商品</view>
									<picker :value="goodsIndex" :range="goodsCloums" :range-key="'resName'"
										@change="goodsChange">
										<view class="picker">
											{{goodsCloums[goodsIndex].resName}}
										</view>
									</picker>
								</view>
								<view v-if="goodsIndex!=0">
									<view class="cu-form-group margin-top" v-show="feeFlag == '1001'">
										<view class="title">单价</view>
										<input type="number" v-model="singlePrice" :disabled="disabledPrice"
											placeholder="请输入单价"></input>
									</view>
									<view v-show="feeFlag == '1001'">
										<view class="text-right text-grey"
											v-if="goods.outHighPrice == goods.outLowPrice">价格:{{goods.outLowPrice}}
										</view>
										<view class="text-right text-grey" v-else>
											价格范围{{goods.outLowPrice}}-{{goods.outHighPrice}}</view>
									</view>
									<view class="cu-form-group margin-top">
										<view class="title">规格</view>
										<input type="text" v-model="goods.specName" disabled="disabled"></input>
									</view>
								</view>
							</view>
							<view class="cu-form-group margin-top">
								<view class="title">数量</view>
								<view class="use-num-container">
									<view class="dec" @tap="numDec">-</view>
									<input class="use-num-input" v-model="useNumber" disabled="disabled"
										@input="goodsNumChange"></input>
									<view class="inc" @tap="numInc">+</view>
								</view>
							</view>
							<view class="flex flex-direction margin-top">
								<button class="cu-btn bg-green margin-tb-sm lg" @click="_save()">确定</button>
							</view>
							<view class="flex flex-direction margin-top">
								<button class="cu-btn bg-red margin-tb-sm lg" @click="_canel()">取消</button>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import {
		loadRepairStaff,
		dispatchRepair,
		finishRepair,
		queryResourceStoreResName,
		queryRepairInfo
	} from '../../api/repair/repair.js'
	import {
		getCurrentCommunity
	} from '../../api/community/community.js'

	export default {
		components: {},
		data() {
			return {
				showModel: false,
				amount: '',
				singlePrice: '',
				useNumber: 1,
				disabledPrice: false,
				goodsTypeCloums: [{
					name: '请选择商品类型'
				}],
				goodsTypeIndex: 0,
				parentRstId: '',
				goodsSonTypeCloums: [{
					name: '请选择商品类型'
				}],
				goodsSonTypeIndex: 0,
				rstId: '',
				goodsCloums: [{
					resName: '请选择商品'
				}],
				goodsIndex: 0,
				goods: {
					"resId": "",
					"outLowPrice": "",
					"outHighPrice": "",
				},
				isCustom: false,
				customGoodsName: '',
				resourceStoreInfo: [],
			}
		},
		props: {
			feeFlag: {
				type: String
			}
		},

		watch: {},

		created() {},

		computed: {},

		mounted() {},

		methods: {

			switchShow: function() {
				this.resetData();
				this.showModel = !this.showModel;
			},

			resetData: function() {
				let _that = this;
				let initData = {
					showModel: false,
					amount: '',
					singlePrice: '',
					useNumber: 1,
					disabledPrice: false,
					goodsTypeCloums: [{
						name: '请选择商品类型'
					}],
					goodsTypeIndex: 0,
					parentRstId: '',
					goodsSonTypeCloums: [{
						name: '请选择商品类型'
					}],
					goodsSonTypeIndex: 0,
					rstId: '',
					goodsCloums: [{
						resName: '请选择商品'
					}],
					goodsIndex: 0,
					goods: {
						"resId": "",
						"outLowPrice": "",
						"outHighPrice": "",
					},
					isCustom: false,
					customGoodsName: '',
					resourceStoreInfo: [],
				};
				this.copyObject(initData, _that);
				this._loadRepairGoodsType();
			},

			copyObject: function(org, dst) {
				for (let key in dst) {
					if (org.hasOwnProperty(key)) {
						dst[key] = org[key]
					}
				}
			},

			_loadRepairGoodsType: function() {
				let _that = this;
				let _data = {
					page: 1,
					row: 100,
					communityId: getCurrentCommunity().communityId,
					giveType: 1
				};
				queryRepairInfo(this, _data)
					.then(function(res) {
						_that.goodsTypeCloums = _that.goodsTypeCloums.concat(res.data);
						_that._appendCustomResourceStoreType();
					});
			},

			// 追加自定义类
			_appendCustomResourceStoreType: function() {
				let customeType = {
					rstId: 'custom',
					name: '自定义'
				};
				this.goodsTypeCloums.push(customeType);
			},

			_loadRepairGoods: function() {
				let _that = this;
				let _data = {
					resId: "",
					rstId: this.rstId,
					page: 1,
					row: 100,
					communityId: getCurrentCommunity().communityId,
					giveType: 1,
					flag: 1
				};
				queryResourceStoreResName(this, _data)
					.then(function(res) {
						let _json = res.data;
						if (_json.total < 1) {
							uni.showToast({
								icon: 'none',
								title: '暂无商品'
							});
							return;
						}
						let _data = _json.data;
						_that.goodsCloums = [{
							resName: '请选择商品'
						}]
						_that.goodsIndex = 0;
						_that.goods = '';
						_that.amount = '';
						if (_data.length < 1) {
							return;
						}
						_that.goodsCloums = _that.goodsCloums.concat(_data);
					});
			},

			// 父分类change
			goodsParentTypeChange: function(e) {
				// 清空二级分类
				this.goodsSonTypeCloums = [{
					name: '请选择商品类型'
				}];
				this.goodsSonTypeIndex = 0;
				this.rstId = '';
				//取其下标
				this.goodsTypeIndex = e.target.value
				if (this.goodsTypeIndex == 0) {
					this.parentRstId = ''
					return;
				}
				let selected = this.goodsTypeCloums[this.goodsTypeIndex] //获取选中的数组
				if (selected.rstId == 'custom') {
					this.isCustom = true;
					return;
				} else {
					this.isCustom = false;
				}
				this.parentRstId = selected.rstId //选中的id
				this._loadSonGoodsTypes();
			},
			// 查询子分类
			_loadSonGoodsTypes: function() {
				let _that = this;
				let _data = {
					page: 1,
					row: 100,
					communityId: getCurrentCommunity().communityId,
					parentId: this.parentRstId
				};
				queryRepairInfo(this, _data)
					.then(function(res) {
						_that.goodsSonTypeCloums = [{
							name: '请选择商品类型'
						}];
						_that.goodsSonTypeCloums = _that.goodsSonTypeCloums.concat(res.data);
					});
			},
			// 子分类change
			goodsTypeChange: function(e) {
				this.goodsSonTypeIndex = e.target.value //取其下标
				if (this.goodsSonTypeIndex == 0) {
					this.rstId = ''
					return;
				}
				let selected = this.goodsSonTypeCloums[this.goodsSonTypeIndex] //获取选中的数组
				this.rstId = selected.rstId //选中的id
				this._loadRepairGoods();
			},

			goodsChange: function(e) {
				this.goodsIndex = e.target.value //取其下标
				if (this.goodsIndex == 0) {
					this.goods = ''
					return;
				}
				let selected = this.goodsCloums[this.goodsIndex] //获取选中的数组
				this.goods = selected
				if (selected.outLowPrice == selected.outHighPrice) {
					this.singlePrice = selected.outLowPrice;
					this.disabledPrice = true;
				} else {
					this.singlePrice = '';
					this.disabledPrice = false;
				}
			},

			numDec: function() {
				if (this.useNumber <= 1) {
					uni.showToast({
						title: '不能再减少了',
						icon: 'none'
					})
					return;
				}
				this.useNumber -= 1;
			},

			numInc: function() {
				this.useNumber += 1;
			},

			_save: function() {
				// 验证必填项
				let msg = '';
				if (this.isCustom) {
					if (!this.customGoodsName) {
						msg = '请输入商品名';
					} else if (this.feeFlag == '1001' && !this.singlePrice) {
						msg = '请输入有效金额';
					}
				} else {
					if (this.rstId == '') {
						msg = "请选择商品类型";
					} else if (this.useNumber < 1) {
						msg = "商品数量不能为零";
					} else if (!this.goods) {
						msg = "请选择商品";
					} else if (this.feeFlag == '1001' && !this.singlePrice) {
						msg = "请输入有效金额";
					}
				}
				if (msg != '') {
					wx.showToast({
						title: msg,
						icon: 'none'
					})
					return;
				}
				let chooseResource = this.goods;
				chooseResource.price = this.singlePrice;
				chooseResource.useNumber = this.useNumber;
				chooseResource.isCustom = this.isCustom;
				chooseResource.customGoodsName = this.customGoodsName;
				if (this.isCustom) {
					chooseResource.goodsTypeName = '自定义';
				}
				chooseResource = JSON.stringify(chooseResource);
				this.$emit('getResourceInfo', chooseResource)
				this.showModel = false;
			},

			_canel: function() {
				this.showModel = false;
			}
		}
	}
</script>

<style>
	.select-single-resource {
		position: fixed;
		top: 100rpx;
		left: 0;
		background-color: #fff;
		width: 100%;
		height: 100%;
	}

	.use-num-container {
		display: flex;
		flex-direction: row;
	}

	.use-num-input {
		width: 100rpx;
		text-align: center;
		padding: 0;
	}

	.inc,
	.dec {
		border: 1px solid #000;
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
	}
</style>
