<template>
	<view class="select-single-resource" v-if="showModel">
		<view>
			<view class="cu-form-group margin-top">
				<view class="title">公司</view>
				<picker :value="orgIndex" :range="orgCloums" :range-key="'orgName'" @change="orgChange">
					<view class="picker">
						{{orgCloums[orgIndex].orgName}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">部门</view>
				<picker :value="depIndex" :range="depCloums" :range-key="'orgName'" @change="depChange">
					<view class="picker">
						{{depCloums[depIndex].orgName}}
					</view>
				</picker>
			</view>
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
				orgCloums: [{
					orgName: '请选择公司'
				}],
				orgIndex: 0,
				selectedOrg: '',
				depCloums: [{
					orgName: '请选择部门'
				}],
				depIndex: 0,
				selectedDep: '',
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
			this._loadOrgList();
		},

		methods: {
			
			switchShow: function(){
				this.showModel = !this.showModel;
			},
			
			_loadOrgList: function(){
				let _that = this;
				let _data = {
					page: 1,
					row: 100,
					orgLevel: 2,
					communityId: this.communityId,
				};
				queryOrgInfo(this, _data)
					.then(function(res) {
						_that.orgCloums = _that.orgCloums.concat(res.data.orgs);
					});
			},
			
			_loadDepList: function(){
				let _that = this;
				let _data = {
					page: 1,
					row: 100,
					orgLevel: 3,
					parentOrgId: this.selectedOrg.orgId,
					communityId: this.communityId,
				};
				queryOrgInfo(this, _data)
					.then(function(res) {
						_that.depCloums = _that.depCloums.concat(res.data.orgs);
					});
			},
			
			_loadStaffList: function(){
				let _that = this;
				let _data = {
					page: 1,
					row: 50,
					parentOrgId: this.selectedOrg.orgId,
					departmentOrgId: this.selectedDep.orgId,
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
				if (this.orgIndex == 0) {
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
