<template>
	<view>
		<view class="cu-form-group" v-if="audit.assignee == '-2'">
			<view class="title">审核人</view>
			<picker :value="staffIndex" :range="staffCloums" :range-key="'name'" @change="staffChange">
				<view class="picker">
					{{staffCloums[staffIndex].name}}
				</view>
			</picker>
		</view>

	</view>
</template>

<script>
	import {
		queryOrgInfo,
		queryStaffListInfo
	} from '../../api/common/common.js'
	import {
		getCurrentCommunity
	} from '../../api/community/community.js';
	import {
		queryFirstAuditStaff
	} from '../../api/resource/resource.js';
	export default {
		name: "selectAuditStaff",
		data() {
			return {
				communityId: '',
				orgIndex: 0,
				selectedOrg: '',
				staffCloums: [{
					name: '请选择员工'
				}],
				staffIndex: 0,
				selectedStaff: {},
				audit: {
					assignee: '',
					staffId: '',
					staffName: '',
					taskId: ''
				},
			};
		},
		mounted() {
			this.communityId = getCurrentCommunity().communityId;
		},
		methods: {
			_loadStaffOrg: function(_flowId) {
				let _that = this;
				queryFirstAuditStaff(this, {
					communityId: this.getCommunityId(),
					flowId: _flowId
				}).then(_data => {
					_that.audit.assignee = _data.data[0].assignee;
					if(_that.audit.assignee == '-2'){
						_that._loadStaffList();
					}else{
						_that.audit.staffId = _data.data[0].assignee;
						_that.$emit('getAuditInfo', _that.audit)
					}
				})
			},
			_loadStaffList: function() {
				let _that = this;
				let _data = {
					page: 1,
					row: 100,
					communityId: this.communityId,
				};
				queryStaffListInfo(this, _data)
					.then(function(res) {
						_that.staffCloums = _that.staffCloums.concat(res.data.staffs);
					});
			},
			staffChange: function(e) {
				this.staffIndex = e.target.value //取其下标
				this.selectedStaff = '';
				if (this.staffIndex == 0) {
					return;
				}
				let selected = this.staffCloums[this.staffIndex] //获取选中的数组
				this.selectedStaff = selected //选中的id
				this.audit.staffId = selected.userId;
				this.audit.staffName = selected.userName;
				this.$emit('getAuditInfo', this.audit)
			},
		}
	}
</script>

<style>

</style>
