<template name="modal">
	<view class="modalInputBg" v-show="modalData.showModal" @tap="modalData.showModal = false">
		<view class="modalInput">
			<view class="modalDiv" @tap.stop="Bubbling">
				<view class="title">{{modalData.title}}</view>
				<view class="body"><input type="text" v-model="inputVal" value="" :placeholder="modalData.text"/></view>
				<view class="bottom">
					<view class="bottomCancel" @tap.stop="modalData.showModal = false">取消</view>						
					<view class="bottomDefine" @tap.stop="onDefine">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: { //此处定义传入的参数
			modalData: {
				type: Object
			}
		},
		data() {
			return {
				inputVal: ''
			}
		},

		methods: {
			onDefine(){
				if(!this.inputVal){
					uni.showToast({
						title: '请填写' + this.modalData.title,
						icon: 'none',
					})
					return;
				}
				this.modalData.showModal = false
				this.$emit('dataInput', this.inputVal);
				this.inputVal = ''
			},
			Bubbling(){}
		}
	}
</script>

<style>
	.modalInputBg{
		position: fixed;
		z-index: 999;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .2);
	}
	.modalInput{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modalDiv{
		width: 86%;
		height: auto;
		background-color: #FFFFFF;
		border-radius: 10rpx;
	}
	.modalInput .modalDiv .title{
		text-align: center;
		padding: 48rpx 0 0 0;
		letter-spacing: 2rpx;
		font-size: 44rpx;
	}
	.modalInput .modalDiv .body{
		width: 86%;
		height: 80rpx;
		line-height: 80rpx;
		margin: 72rpx auto;
		border: 2rpx solid #DCDEE0;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
		padding: 0 3%;
		box-sizing: border-box;
		border-radius: 10rpx;
	}
	.modalInput .modalDiv .body input{
		height: 100%;
	}
	.modalInput .modalDiv .bottom{
		display: flex;
		align-items: center;
		height: 88rpx;
		border-top: 2rpx solid #DCDEE0;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.08);
	}
	.modalInput .modalDiv .bottom view{
		flex: 1;
		text-align: center;
		font-size: 30rpx;
		letter-spacing: 2rpx;
		height: 100%;
		line-height: 88rpx;
	}
	.modalInput .modalDiv .bottom .bottomCancel{
		border-right: 2rpx solid #DCDEE0;
	}
	.modalInput .modalDiv .bottom .bottomDefine{
		color: #3F83F7;
	}
</style>
