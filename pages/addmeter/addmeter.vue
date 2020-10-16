<template>
	<view>
		<form>
			<view class="cu-form-group">
				<view class="title">费用类型</view>
				<picker @change="feeTypesChange" :value="feeType_index" :range="feeTypes">
					<view class="picker">
						{{feeType_index>-1?feeTypes[index]:'请选择'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">收费项目</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'请选择'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">楼栋</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'请选择'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">单元</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'请选择'}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">房屋</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'请选择'}}
					</view>
				</picker>
			</view>
			
			
			
			<view class="cu-form-group">
				<view class="title">上期读数</view>
				<input placeholder="上期读数"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">本期读数</view>
				<input placeholder="本期读数"></input>
			</view>
			
			<view class="cu-form-group">
				<view class="title">上期读表时间</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">本期读表时间</view>
				<picker mode="date" :value="date" start="2015-09-01" end="2020-09-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group align-start">
				<view class="title">备注</view>
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" placeholder="备注信息"></textarea>
			</view>
			
			<view class=" flex flex-direction">
				<button class="cu-btn bg-red margin-tb-sm lg">提交</button>
			</view>
			
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				feeType_index: -1,
				picker: ['111', '222', '333'],
				date: '2018-12-25',
				feeTypes:['水费','电费']
			};
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			feeTypesChange(e) {
				this.index = e.detail.value
			},
			
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
