<template>
	<picker @change="bindPickerChange" @columnchange="columnchange" :range="array" range-key="name" :value="value" mode="multiSelector">
		<slot></slot>
	</picker>
</template>

<script>
	/**
	 *  
	 */
	let selectVal = [];
	import {queryStaffInfos} from '../../api/staff/staff.js'
	export default {
		data() {
			return{
				value: [0,0,0],
				array: [],
				index: 0,
				companys:[]
			}
		},
		created() {
			let _that = this;
			let _userInfo = this.java110Context.getUserInfo();
			let storeId = _userInfo.storeId;
			queryStaffInfos(this,{
				page:1,
				row:300,
				storeId:storeId
			}).then(_data=>{
				let _staffs = _data.data.staffs;
				_that.communitys =_that.freshStaff(_staffs);
				return _that.communitys;
			}).then(_communitys=>{
				console.log('_communitys',_communitys)
				this.initSelect()
			})
		},
		methods:{
			// 初始化地址选项
			initSelect() {
				//加载员工数据
				this.updateSourceDate() // 更新源数据
				.updateAddressDate() // 更新结果数据
				.$forceUpdate()  // 触发双向绑定
			},
			/**
			 * companys:{
				"id": "110000",
				"name": "北京",
				"departments": [{
					"id": "110000-1",
					"name": "北京市",
					"users": [{
						"countyCode": "110115",
						"countyName": "大兴区"
					}]
				}]
			}
			 * @param {Object} _staffs
			 */
			freshStaff:function(_staffs){
				let _that = this;
				let _companys = []; // 公司
				
				//这边获取公司
				_staffs.forEach(item=>{
					if(!_that._hasIn(_companys,item.parentOrgId)){
						_companys.push({
							id:item.parentOrgId,
							name:item.parentOrgName,
							departments:[]
						})
					}
				});
				
				//根据公司去下面的部门
				_companys.forEach(c =>{
					_staffs.forEach(item=>{
						if(_that._hasDepartMentIn(c,c.departments,item)){
							c.departments.push({
								id:item.orgId,
								name:item.orgName,
								users:[]
							})
						}
					});
				})
				
				//根据部门处理员工
				
				_companys.forEach(c =>{
					c.departments.forEach(d=>{
						_staffs.forEach(item=>{
							if(_that._hasUserIn(d,d.users,item)){
								d.users.push({
									id:item.userId,
									name:item.userName,
								})
							}
						});
					})
				})
				
				return _companys;
			},
			_hasIn:function(_s,_id){
				let flag = false;
			
				_s.forEach(s=>{
					if(s.id == _id){
						flag = true;
					}
				});
				return flag;
			},
			//这个部门是这个分公司下的
			_hasDepartMentIn:function(c,_d,item){
				let flag = false;
				if(_d.length == 0 && c.id ==item.parentOrgId){
					return true;
				}
				if(!this._hasIn(_d,item.orgId) && c.id ==item.parentOrgId){
					flag = true;
				}
				return flag;
			},
			_hasUserIn:function(d,_u,item){
				let flag = false;
				if(_u == 0 && d.id ==item.orgId){
					return true;
				}
				if(!this._hasIn(_u,item.userId) && d.id ==item.orgId){
					flag = true;
				}
				return flag;
			},
			// 地址控件改变控件
			columnchange(d) {
				this.updateSelectIndex(d.detail.column, d.detail.value) // 更新选择索引
				.updateSourceDate() // 更新源数据
				.updateAddressDate() // 更新结果数据
				.$forceUpdate()  // 触发双向绑定
			},
			
			/**
			 * 更新源数据
			 * */
			updateSourceDate() {
				this.array = []
				this.array[0] = this.communitys.map(obj => {
					return {
						name: obj.name,
						code: obj.id
					}
				})
				this.array[1] = this.communitys[this.value[0]].departments.map(obj => {
					return {
						name: obj.name,
						code: obj.id
					}
				})
				this.array[2] = this.communitys[this.value[0]].departments[this.value[1]].users.map(obj => { 
					return {
						name: obj.name,
						code:obj.id
					}
				})
				return this
			},
			
			/**
			 * 更新索引
			 * */
			updateSelectIndex(column, value){
				let arr = JSON.parse(JSON.stringify(this.value)) 
				arr[column] = value
				if(column === 0 ) {
					arr[1] = 0
					arr[2] = 0
				}
				if(column === 1 ) {
					arr[2] = 0
				}
				this.value = arr
				return this
			},
			
			/**
			 * 更新结果数据 
			 * */
			updateAddressDate() {
				selectVal = [];
				selectVal.push({name:this.array[0][this.value[0]].name,code:this.array[0][this.value[0]].code});
				selectVal.push({name:this.array[1][this.value[1]].name,code:this.array[1][this.value[1]].code}); 
				selectVal.push({name:this.array[2][this.value[2]].name,code:this.array[2][this.value[2]].code});
				
				//selectVal[2] = this.array[2][this.value[2]].name 
				return this
			},
			
			/**
			 * 点击确定
			 * */
			bindPickerChange(e) {
				this.$emit('change', {
					index: this.value,
					data: selectVal
				})
				return this
			}
			
		}
	}
</script>

<style>
</style>
