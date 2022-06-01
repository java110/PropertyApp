<template>
	<view>
		<view class="cu-bar bg-white search ">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" v-model="name" confirm-type="search"></input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round" @tap="_searchStaff()">搜索</button>
			</view>
		</view>

		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<block v-for="(item,index) in list" :key="index">
				<view :class="'indexItem-' + item.initials" :id="'indexes-' + item.initials" :data-index="item.initials">
					<view class="padding">{{item.initials}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item" v-for="(items,sub) in item.staffs" :key="sub">
							<view class="cu-avatar round lg">{{items.name[0]}}</view>
							<view class="content">
								<view class="text-grey"><text class="text-abc">{{items.name}}</text></view>
								<view class="text-gray text-sm">
									{{items.orgName}}-{{items.tel}}
								</view>
							</view>
							<view class="action">
								<text class="lg text-gray cuIcon-dianhua photo_icon" @tap="_callPhoto(items.tel)"></text>
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<view class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur">
					{{item.initials}}</view>
			</view>
		</view>
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>

	</view>
</template>

<script>
	import url from '../../constant/url.js'
	export default {
		data() {
			return {
				list: [],
				name: '',
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				listCur: '',
			}
		},
		onLoad() {
			this.java110Context.onLoad();
			this._loadStaffInfo();

		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
		},
		methods: {
			_loadStaffInfo: function() {
				//获取商户ID
				let _that = this;
				let _userInfo = this.java110Context.getUserInfo();
				let storeId = _userInfo.storeId;
				let _objData = {
					page: 1,
					row: 1000,
					storeId: storeId,
					name: this.name
				};
				this.java110Context.request({
					url: url.queryStaffInfos,
					header: _that.java110Context.getHeaders(),
					method: "GET",
					data: _objData, //动态数据
					success: function(res) {
						console.log("请求返回信息：", res);
						if (res.statusCode == 200) {
							let _data = res.data;
							let _staffs = [];
							console.log('list', _that.list);
							_data.staffs.sort(function(a, b) {
								return (a.initials + '').localeCompare(b.initials + '')
							})
							_that.list = _that._formatList(_data.staffs, 'initials')
							_that.listCur = _that.list[0];
							return;
						}
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					},
					fail: function(e) {
						wx.showToast({
							title: "服务器异常了",
							icon: 'none',
							duration: 2000
						})
					}
				});

			},
			_callPhoto: function(_photo) {
				uni.makePhoneCall({
					// 手机号
					phoneNumber: _photo,

					// 成功回调
					success: (res) => {
						console.log('调用成功!')
					},

					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}

				});
			},
			_searchStaff: function() {
				this._loadStaffInfo();
			},
			_formatList: function(arr, keyword) {
				let newArr1 = [];
				let tempArr = [];
				let reg = /\b(\w)|\s(\w)/g;
				let k = 0;
				let firstWord = arr[0][keyword]; //获取第一个分类字母
				arr.map((v) => {
					if (firstWord == v[keyword]) {
						tempArr.push(v);
						newArr1[k] = {
							initials: firstWord,
							staffs: tempArr
						}
					} else {
						//这里循环到这表示已经第二个字母了
						firstWord = v[keyword]; //设置第二字母
						tempArr = []; //把之前的清除掉
						tempArr.push(v); //添加第一个
						newArr1[++k] = { //自增
							initials: firstWord,
							staffs: tempArr
						}
					}
				});
				return newArr1;
			},
			//获取文字信息
			getCur:function(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].initials;
				console.log(this.listCur);
			},
			setCur:function(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove:function(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].initials
				};
			},

			//触发全部开始选择
			tStart:function() {
				this.hidden = false
			},

			//触发结束选择
			tEnd:function() {
				this.hidden = true;
				this.listCurID = this.listCur;
			},
			indexSelect:function(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].initials;
						that.movableY = i * 20
						return false
					}
				}
			}

		}
	}
</script>

<style>
	.photo_icon {
		font-size: 40upx;
		color: #0081FF;
		margin-right:60upx;
	}


	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 300upx;
		padding: 20upx 10upx 20upx 0upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}
	
	.text-abc{
		color:#555555
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		bottom: 0upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
</style>
