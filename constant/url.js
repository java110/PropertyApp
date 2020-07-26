const baseUrl= '/';
const hcBaseUrl= 'https://hc.demo.winqi.cn'; // 登录接口
export default {
	baseUrl:baseUrl,
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
	queryFloors: baseUrl + 'app/floor.queryFloors', // 申请钥匙
	queryUnits: baseUrl + "app/unit.queryUnits", //查询钥匙
	queryRooms: baseUrl + "app/room.queryRooms", //申请访客钥匙
	applyVisitorApplicationKey: baseUrl + "app/applicationKey.applyVisitorApplicationKey", //上传业主照片
	uploadOwnerPhoto: baseUrl + "app/owner.uploadOwnerPhoto",
	getOwnerPhotoPath: hcBaseUrl + "/callComponent/download/getFile/fileByObjId",
	filePath: hcBaseUrl + "/callComponent/download/getFile/file", //查询业主车位信息
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
	repairDispatch: baseUrl + "app/ownerRepair.repairDispatch"
}