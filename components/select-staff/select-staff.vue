<template>
	<view class="select-single-resource" v-if="showModel">
		<view>
			<view class="cu-form-group margin-top">
				<view class="title">员工</view>
				<picker :value="staffIndex" :range="staffCloums" :range-key="'name'" @change="staffChange">
					<view class="picker">
						{{staffCloums[staffIndex].name}}
					</view>
				</picker>
			</view>
			<view class="flex flex-direction margin-top">
				<button  class="cu-btn bg-green margin-tb-sm lg" @click="_save()">确定</button>
			</view>
			<view class="flex flex-direction margin-top">
				<button  class="cu-btn bg-red margin-tb-sm lg" @click="_canel()">取消</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		queryOrgInfo,
		queryStaffListInfo
	} from '../../api/common/common.js'
	import {getCurrentCommunity} from '../../api/community/community.js'

	export default {
		components: {
		},
		data() {
			return {
				showModel: false,
				communityId: '',
				orgIndex: 0,
				selectedOrg: '',
				staffCloums: [{
					name: '请选择员工'
				}],
				staffIndex: 0,
				selectedStaff: ''
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
			this.communityId = getCurrentCommunity().communityId;
			//this._loadOrgList();
			this._loadStaffList();
		},

		methods: {
			switchShow: function(){
				this.showModel = !this.showModel;
			},
			_loadStaffList: function(){
				let _that = this;
				let _data = {
					page: 1,
					row: 50,
					communityId: this.communityId,
				};
				queryStaffListInfo(this, _data)
					.then(function(res) {
						_that.staffCloums = _that.staffCloums.concat(res.data.staffs);
					});
			},
			
			orgChange: function(e){
				this.orgIndex = e.target.value //取其下标
				
				this.depCloums = [{orgName: '请选择部门'}];
				this.depIndex = 0;
				this.selectedDep = '';
				this.staffCloums = [{name: '请选择员工'}];
				this.staffIndex = 0;
				this.selectedStaff = '';
				
				if (this.orgIndex == 0) {
					return;
				}
				let selected = this.orgCloums[this.orgIndex]
				this.selectedOrg = selected
				this._loadDepList();
			},
			
			depChange: function(e){
				this.depIndex = e.target.value //取其下标
				
				this.staffCloums = [{name: '请选择员工'}];
				this.staffIndex = 0;
				this.selectedStaff = '';
				
				if (this.depIndex == 0) {
					return;
				}
				let selected = this.depCloums[this.depIndex]
				this.selectedDep = selected
				this._loadStaffList();
			},
			
			staffChange: function(e){
				this.staffIndex = e.target.value //取其下标
				this.selectedStaff = '';
				if (this.staffIndex == 0) {
					return;
				}
				let selected = this.staffCloums[this.staffIndex] //获取选中的数组
				this.selectedStaff = selected //选中的id
			},
			
			_save: function(){
				// 验证必填项
				if(this.selectedStaff == ''){
					uni.showToast({
						title: '请选择员工',
						icon: 'none'
					})
					return;
				}
				this.$emit('getStaffInfo', this.selectedStaff)
				this.showModel = false;
			},
			
			_canel: function(){
				this.showModel = false;
			}
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
