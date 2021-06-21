<template>
	<view class="audit" v-if="showModel">
		<view>
			<view class="cu-form-group margin-top">
				<view class="title">审核状态</view>
				<picker :value="auditIndex" :range="auditCloums" :range-key="'name'" @change="auditChange">
					<view class="picker">
						{{auditCloums[auditIndex].name}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">原因</view>
				<input v-model="remark" placeholder="请输入原因"></input>
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
		queryRepairInfo
	} from '../../api/repair/repair.js'

	export default {
		components: {
		},
		data() {
			return {
				showModel: false,
				auditCloums: [
				{
					value: '',
					name: '请审核'
				},
				{
					value: 1100,
					name: '同意'
				},
				{
					value: 1200,
					name: '拒绝'
				}],
				auditIndex: 0,
				state: '',
				remark:　'',
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
		},

		methods: {
			
			switchShow: function(){
				this.showModel = !this.showModel;
			},
			
			auditChange: function(e){
				this.auditIndex = e.target.value //取其下标
				if (this.auditIndex == 0) {
					this.state = ''
					return;
				}
				let selected = this.auditCloums[this.auditIndex] //获取选中的数组
				this.state = selected.value //选中的id
				if(this.state == 1100){
					this.remark = '同意';
				}else{
					this.remark = '';
				}
			},
			
			_save: function(){
				// 验证必填项
				let msg = '';
				if(this.state == ''){
					msg = "请选择审核状态";
				}else if (this.remark == ''){
					msg = "请填写原因";
				}
				if(msg != ''){
					wx.showToast({
						title:msg,
						icon: 'none'
					})
					return;
				}
				let auditData = {
					state: this.state,
					remark: this.remark
				};
				if (auditData.state == '1200') {
					auditData.remark = '拒绝:' + auditData.remark;
				}
				this.$emit('getInfo', auditData)
				this.showModel = false;
			},
			
			_canel: function(){
				this.showModel = false;
			}
		}
	}
</script>

<style>
	.audit{
		position: fixed;
		top: 100rpx;
		left: 0;
		background-color: #fff;
		width: 100%;
		height: 100%;
	}
</style>
