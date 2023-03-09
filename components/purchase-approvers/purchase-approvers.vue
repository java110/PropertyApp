<template>
	<view class="select-single-resource">
		<view>
			<view class="cu-form-group margin-top">
				<view class="title">所属公司</view>
				<input v-model="companyName" placeholder="请输入所属公司" disabled="disabled"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">员工</view>
				<input v-model="staffName" placeholder="请输入员工" disabled="disabled"></input>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryFirstStaff
	} from '../../api/resource/resource.js'
	import {getCurrentCommunity} from '../../api/community/community.js'

	export default {
		components: {
		},
		data() {
			return {
				staffId: '',
				staffName: '',
				departmentName: '',
				companyName: ''
			}
		},
		props: {
			flowType: {
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
			this._loadFirstStaff();
		},

		methods: {
			
			_loadFirstStaff: function(){
				let _that = this;
				let _data = {
					flowType: this.flowType,
					communityId: getCurrentCommunity().communityId,
				};
				queryFirstStaff(this, _data)
				.then(function(res) {
					_that.staffId = res.data.storeId;
					_that.staffName = res.data.staffName;
					_that.departmentName = res.data.parentOrgName;
					_that.companyName = res.data.orgName;
					let approversInfo = {
						staffId: _that.staffId,
						staffName: _that.staffName
					}
					_that.$emit('getApproversInfo', approversInfo);
				});
			},
		}
	}
</script>

<style>
	.select-single-resource{
		position: fixed;
		top: 100rpx;
		left: 0;
		background-color: #fff;
		width: 100%;
		height: 100%;
	}
	.use-num-container{
		display: flex;
		flex-direction: row;
	}
	.use-num-input{
		width: 100rpx;
		text-align: center;
		padding: 0;
	}
	.inc,.dec{
		border: 1px solid #000;
		border-radius: 50%;
		width: 40rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
	}
</style>
