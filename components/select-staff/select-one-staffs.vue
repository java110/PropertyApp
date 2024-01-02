<template>
	<view class="cu-modal bottom-modal" :class="showModel?'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white ">
				<view class="action">
					选择员工
				</view>
				<view class="action">
				</view>
			</view>
			<scroll-view scroll-y style="height: 600upx;" class="bg-white">
				<radio-group @change="checkboxChange" style="width: 100%;">
					<view class="cu-form-group" v-for="(item,index) in staffs" :key="index">
						<view class="title">{{item.name}}({{item.orgName}})</view>
						<view>
							<radio :class="item.checked?'checked':''" :checked="item.checked?true:false"
								:value="item.staffId">
							</radio>
						</view>
					</view>
				</radio-group>

			</scroll-view>
			<view class="btn-box bg-white">
				<button type="default" @click="cancel()">取消</button>
				<button type="primary" @click="saveSelected()">确认</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		queryStaffListInfo
	} from '../../api/common/common.js';
	import {
		getCurrentCommunity
	} from '../../api/community/community.js'

	export default {
		name: 'selectOneStaffs',
		data() {
			return {
				showModel: false,
				staffs: [],
				page: 1,
				selectStaffIds: [],
			}
		},
		mounted() {
			this._loadStaffList();
		},

		methods: {
			switchShow: function(_staffs) {
				this.showModel = !this.showModel;
				if (!_staffs) {
					return;
				}
				this.checkboxChange({
					detail: {
						value: _staffs
					},
				})
			},

			_loadStaffList: function() {
				let _that = this;
				let _data = {
					page: 1,
					row: 50,
					communityId: this.communityId,
				};
				queryStaffListInfo(this, _data)
					.then(function(res) {
						let _tempStaffs = res.data.staffs;
						_tempStaffs.forEach(_t => {
							_t.staffId = _t.userId;
							_t.staffName = _t.name;
						})
						_that.staffs = _that.staffs.concat(_tempStaffs);
					});
			},


			checkboxChange: function(e) {
				console.log(e)
				var values = e.detail.value;
				this.selectStaffIds = values;
				this.staffs.forEach((item, index) => {
					if (values == item.staffId) {
						item.checked = true;
					} else {
						item.checked = false;
					}
				});
			},


			saveSelected: function() {
				let selectStaffIds = this.selectStaffIds;
				let staffs = this.staffs;
				if (!selectStaffIds) {
					uni.showToast({
						title: '请选择员工',
						icon: 'none'
					})
					return;
				}
				let _staffs = {};

				for (var j = 0; j < staffs.length; j++) {
					if (selectStaffIds == staffs[j].staffId) {
						_staffs = staffs[j];
					}
				}

				this.$emit('getStaffs', _staffs);
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