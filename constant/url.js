import conf from '../conf/config.js'
const baseUrl = conf.baseUrl;
const hcBaseUrl = conf.commonBaseUrl;
export default {
	baseUrl: baseUrl,
	hcBaseUrl: hcBaseUrl, // 登录接口
	loginUrl: baseUrl + 'app/loginProperty',
	areaUrl: baseUrl + "app/area.listAreas",
	GetNoticeListUrl: baseUrl + 'app/notice.listNotices', //公告接口
	listMyEnteredCommunitys: baseUrl + 'app/community.listMyEnteredCommunitys', //查看员工小区
	listOwnerRepairs: baseUrl + 'app/ownerRepair.listOwnerRepairs', //查看报修
	saveOwnerRepair: baseUrl + 'app/ownerRepair.saveOwnerRepair', //维修
	queryStaffInfos: baseUrl + 'app/query.staff.infos', //查询员工信息
	changeStaffPwd: baseUrl + 'app/user.changeStaffPwd', //修改密码
	listAuditHistoryComplaints: baseUrl + 'app/auditUser.listAuditHistoryComplaints', //查询历史单
	saveComplaint: baseUrl + 'app/complaint', //查询业主房间
	userLogout: baseUrl + 'app/user.service.logout', //绑定业主
	listAuditComplaints: baseUrl + 'app/auditUser.listAuditComplaints', //查询绑定业主
	auditComplaint: baseUrl + 'app/complaint.auditComplaint', //查询业主门禁
	queryFloors: baseUrl + 'app/floor.queryFloors', // 查询楼栋
	queryUnits: baseUrl + "app/unit.queryUnits", //查询单元
	queryRooms: baseUrl + "app/room.queryRooms", //查询房屋
	applyVisitorApplicationKey: baseUrl + "app/applicationKey.applyVisitorApplicationKey", //上传业主照片
	uploadOwnerPhoto: baseUrl + "app/owner.uploadOwnerPhoto",
	getOwnerPhotoPath: hcBaseUrl + "callComponent/download/getFile/fileByObjId",
	filePath: hcBaseUrl + "callComponent/download/getFile/file", //查询业主车位信息
	queryParkingSpacesByOwner: baseUrl + "app/parkingSpace.queryParkingSpacesByOwner", //查询停车位费用
	queryFeeByParkingSpace: baseUrl + "app/fee.queryFeeByParkingSpace", //查询物业费用
	queryFeeByOwner: baseUrl + "app/fee.queryFee", //预下单
	preOrder: baseUrl + "app/payment/toPay", //查询小区
	listCommunitys: baseUrl + "app/community.listCommunitys", //查询小区文化
	listActivitiess: baseUrl + "app/activities.listActivitiess", //查询小区广告
	listAdvertPhoto: baseUrl + "app/advert.listAdvertPhoto",
	//查询巡检任务
	listInspectionTasks: baseUrl + "app/inspectionTask.listInspectionTasks",
	//巡检任务详情
	listInspectionTaskDetails: baseUrl + 'app/inspectionTaskDetail.listInspectionTaskDetails',
	//巡检
	updateInspectionTaskDetail: baseUrl + 'app/inspectionTaskDetail.updateInspectionTaskDetail',
	// 查询报修单处理师傅
	listRepairStaffs: baseUrl + "app/ownerRepair.listRepairStaffs",
	//查询员工报修单
	listStaffRepairs: baseUrl + "app/ownerRepair.listStaffRepairs",
	//查询报修师傅查询
	listRepairTypeUsers: baseUrl + "app/repair.listRepairTypeUsers",
	//查询完成报修单
	listStaffFinishRepairs: baseUrl + "app/ownerRepair.listStaffFinishRepairs",
	repairDispatch: baseUrl + "app/ownerRepair.repairDispatch",
	//报修办结
	repairFinish: baseUrl + "app/ownerRepair.repairFinish",
	//报修评价
	appraiseRepair: baseUrl + 'app/repair/appraiseRepair',
	appraiseRepairNew: baseUrl + 'callComponent/ownerRepair.appraiseRepair',
	//查询房屋和业主接口
	listRoomAndOwner: baseUrl + 'app/fee.listRoomsWhereFeeSet',
	//查询费用信息
	listFee: baseUrl + 'app/fee.listFee',
	//查询缴费历史
	queryFeeDetail: baseUrl + "app/fee.queryFeeDetail",
	// 投诉 处理意见
	listWorkflowAuditInfo: baseUrl + 'app/workflow.listWorkflowAuditInfo',
	listOweFees: baseUrl + 'app/feeApi/listOweFees',
	toQrOweFeePay: baseUrl + 'app/payment/toQrOweFeePay',
	// 报修抢单
	robRepairOrder: baseUrl + 'callComponent/ownerRepair.grabbingRepair',
	// 获取空置房申请列表
	listApplyRoom: baseUrl + 'app/applyRoomDiscount/queryApplyRoomDiscount',
	queryFeeDiscount: baseUrl + "app/feeDiscount/queryFeeDiscount",
	updateApplyRoomDiscount: baseUrl + "app/applyRoomDiscount/updateApplyRoomDiscount",
	updateReviewApplyRoomDiscount: baseUrl + "app/applyRoomDiscount/updateReviewApplyRoomDiscount",
	queryMenus: baseUrl + "app/query.menu.info",
	listStaffPrivileges: baseUrl + "callComponent/staffPrivilege/listStaffPrivileges",
	queryRoomRenovation: baseUrl + "app/roomRenovation/queryRoomRenovation",
	updateRoomToExamine: baseUrl + "app/roomRenovation/updateRoomToExamine",
	saveRoomRenovationDetail: baseUrl + "app/roomRenovation/saveRoomRenovationDetail",
	queryRoomRenovationRecord: baseUrl + "app/roomRenovation/queryRoomRenovationRecord",
	updateRoomDecorationRecord: baseUrl + "app/roomRenovation/updateRoomDecorationRecord",
	uploadVideo: baseUrl + "callComponent/upload/uploadVedio/upload",
	queryRoomRenovationRecordDetail: baseUrl + "app/roomRenovation/queryRoomRenovationRecordDetail",
	// 查询字典表
	queryDictInfo: baseUrl + "callComponent/core/list",
	// 报修相关信息（维修类型/状态/商品类型...）
	queryRepairInfo: baseUrl + "callComponent/resourceStoreTypeManage/list",
	// queryResourceStoreResName: baseUrl + "app/resourceStore/queryResourceStoreResName",
	queryResourceStoreResName: baseUrl + "callComponent/resourceStore.listUserStorehouses",
	// 查询费用项（水电部分）
	queryFeeTypesItems: baseUrl + "callComponent/roomCreateFeeAdd/list",
	queryPreMeterWater: baseUrl + "app/meterWater/queryPreMeterWater",
	saveMeterWater: baseUrl + "callComponent/meterWater.saveMeterWater",
	// 采购/出库申请部分
	queryPurchaseApplyList: baseUrl + "callComponent/purchaseApplyManage/list",
	queryResourceStoreList: baseUrl + "callComponent/chooseResourceStore/list",
	queryResourceSupplier: baseUrl + "callComponent/resourceSupplier.listResourceSuppliers",
	queryFirstStaff: baseUrl + "app/workflow/getFirstStaff",
	savePurchaseApply: baseUrl + "app/purchase/purchaseApply",
	saveItemOutApply: baseUrl + "app/collection/goodsCollection",
	listMyAuditOrders: baseUrl + "callComponent/myAuditOrders/list",
	listMyItemOutOrders: baseUrl + "app/collection/getCollectionAuditOrder",
	listMyAllocationStoreAuditOrders: baseUrl + "callComponent/resourceStore.listAllocationStoreAuditOrders",
	saveResourceOut: baseUrl + "app/collection/resourceOut",
	saveResourceEnter: baseUrl + "app/purchase/resourceEnter",
	listAuditHistoryOrders: baseUrl + "callComponent/auditUser.listAuditHistoryOrders",
	listItemOutAuditHistoryOrders: baseUrl + "callComponent/auditUser.listItemOutAuditHistoryOrders",
	listAllocationStoreHisAuditOrders: baseUrl + "callComponent/resourceStore.listAllocationStoreHisAuditOrders",
	// listWorkflowAuditInfo2: baseUrl + "callComponent/workflow.listWorkflowAuditInfo",
	// 调拨部分
	listAllocationStorehouseApplys: baseUrl + "callComponent/resourceStore.listAllocationStorehouseApplys",
	listStoreHouses: baseUrl + "callComponent/resourceStore.listStorehouses",
	saveAllocationStorehouse: baseUrl + "callComponent/resourceStore.saveAllocationStorehouse",
	listAllocationStorehouses: baseUrl + "callComponent/resourceStore.listAllocationStorehouses",
	saveAuditAllocationStoreOrder: baseUrl + "callComponent/resourceStore.auditAllocationStoreOrder",
	listWorkflowStepStaffs: baseUrl + "callComponent/workflow.listWorkflowStepStaffs",
	saveMyAuditOrders: baseUrl + "callComponent/myAuditOrders/audit",
	// 公司/员工信息
	queryOrgInfo: baseUrl + "callComponent/orgManage/list",
	queryStaffListInfo: baseUrl + "callComponent/searchStaff/listStaff",
	// 巡检流转
	UpdateInspectionTask: baseUrl + "callComponent/inspectionTask.updateInspectionTask",
	// 物品转赠
	saveResourceStoreTransfer: baseUrl + "callComponent/addAllocationUserStorehouse/save",
	// 紧急采购
	saveUrgentPurchaseApply: baseUrl + "app/purchase/urgentPurchaseApply",
	//取消调拨
	deleteAllocationStorehouse: baseUrl + "callComponent/resourceStore.deleteAllocationStorehouse",
	// 取消申请
	deletePurchaseApply: baseUrl + "callComponent/deletePurchaseApply/delete",
	//查询水电抄表记录
	listMeterWaters: baseUrl+"app/meterWater.listMeterWaters",
	listRepairSettings: baseUrl + 'app/repair.listRepairSettings',
	saveHelpOwnerRepair: baseUrl + "callComponent/addOwnerRepair/save",
	updateRoomRenovationState: baseUrl + "app/roomRenovation/updateRoomRenovationState",
	queryOaWorkflow: baseUrl + "app/oaWorkflow/queryOaWorkflow",
	queryOaWorkflowForm: baseUrl + "app/oaWorkflow/queryOaWorkflowForm",
	saveOaWorkflowFormData: baseUrl + "app/oaWorkflow/saveOaWorkflowFormData",
	queryOaWorkflowUserHisTaskFormData: baseUrl + "app/oaWorkflow/queryOaWorkflowUserHisTaskFormData",
	queryOaWorkflowUserTaskFormData: baseUrl + "app/oaWorkflow/queryOaWorkflowUserTaskFormData",
	queryOaWorkflowFormData: baseUrl + "app/oaWorkflow/queryOaWorkflowFormData",
	queryOaWorkflowUser: baseUrl + "app/oaWorkflow/queryOaWorkflowUser",
	listRunWorkflowImage: baseUrl + "app/workflow.listRunWorkflowImage",
	getNextTask: baseUrl + "app/oaWorkflow/getNextTask",
	auditOaWorkflow: baseUrl + "app/oaWorkflow/auditOaWorkflow",
	updateOaWorkflowFormData: baseUrl +"app/oaWorkflow.updateOaWorkflowFormData",
	listMeterType: baseUrl +"app/meterType.listMeterType",
	// 空置房跟踪记录列表
	listApplyRoomDiscountRecord: baseUrl + "app/applyRoomDiscountRecord/queryApplyRoomDiscountRecord",
	// 空置房跟踪记录详情
	listApplyRoomDiscountRecordDetail: baseUrl + "app/applyRoomDiscountRecord/queryApplyRoomDiscountRecordDetail",
	// 添加空置房跟踪记录
	saveApplyRoomDiscountRecord: baseUrl + "app/applyRoomDiscountRecord/addApplyRoomDiscountRecord",
	// 删除空置房跟踪记录
	cutApplyRoomDiscountRecord: baseUrl + "app/applyRoomDiscountRecord/cutApplyRoomDiscountRecord",
	// 删除装修跟踪记录
	deleteRoomRenovationRecord: baseUrl + "app/roomRenovation/deleteRoomRenovationRecord",
	// 查询缴费历史
	listFeeDetail: baseUrl + "callComponent/propertyFee/listFeeDetail",
	repairStop: baseUrl + "callComponent/ownerRepair.repairStop",
	repairStart: baseUrl + "callComponent/ownerRepair.repairStart",
	listInspectionItemTitle: baseUrl + "app/inspectionItemTitle.listInspectionItemTitle",
	listResourceStoreTypes: baseUrl + "app/resourceStoreType.listResourceStoreTypes",
	
}
