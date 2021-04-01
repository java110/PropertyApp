/**
 * url 常量类
 * 
 * add by wuxw 2019-12-28
 */
// 服务器域名
// const baseUrl = 'https://app.demo.winqi.cn/'; 
import conf from '../conf/config.js'
const baseUrl = conf.baseUrl;
const hcBaseUrl = conf.baseUrl;

const loginUrl = baseUrl + 'app/loginProperty';
const areaUrl = baseUrl + "app/area.listAreas";
const GetNoticeListUrl = baseUrl + 'app/notice.listNotices'; //公告接口

const listMyEnteredCommunitys = baseUrl + 'app/community.listMyEnteredCommunitys'; //查看员工小区

const listOwnerRepairs = baseUrl + 'app/ownerRepair.listOwnerRepairs'; //查看报修

const saveOwnerRepair = baseUrl + 'app/ownerRepair.saveOwnerRepair'; //维修

const queryStaffInfos = baseUrl + 'app/query.staff.infos'; //查询员工信息

const changeStaffPwd = baseUrl + 'app/user.changeStaffPwd'; //修改密码

const listAuditHistoryComplaints = baseUrl + 'app/auditUser.listAuditHistoryComplaints'; //查询历史单

const saveComplaint = baseUrl + 'app/complaint'; //查询业主房间

const userLogout = baseUrl + 'app/user.service.logout'; //绑定业主

const listAuditComplaints = baseUrl + 'app/auditUser.listAuditComplaints'; //查询绑定业主

const auditComplaint = baseUrl + 'app/complaint.auditComplaint'; //查询业主门禁

const queryFloors = baseUrl + 'app/floor.queryFloors'; // 申请钥匙

const queryUnits = baseUrl + "app/unit.queryUnits"; //查询钥匙

const queryRooms = baseUrl + "app/room.queryRooms"; //申请访客钥匙

const applyVisitorApplicationKey = baseUrl + "app/applicationKey.applyVisitorApplicationKey"; //上传业主照片

const uploadOwnerPhoto = baseUrl + "app/owner.uploadOwnerPhoto";
const getOwnerPhotoPath = hcBaseUrl + "/callComponent/download/getFile/fileByObjId";
const filePath = hcBaseUrl + "/callComponent/download/getFile/file"; //查询业主车位信息

const queryParkingSpacesByOwner = baseUrl + "app/parkingSpace.queryParkingSpacesByOwner"; //查询停车位费用

const queryFeeByParkingSpace = baseUrl + "app/fee.queryFeeByParkingSpace"; //查询物业费用

const queryFeeByOwner = baseUrl + "app/fee.queryFee"; //预下单

const preOrder = baseUrl + "app/payment/toPay"; //查询小区

const listCommunitys = baseUrl + "app/community.listCommunitys"; //查询小区文化

const listActivitiess = baseUrl + "app/activities.listActivitiess"; //查询小区广告

const listAdvertPhoto = baseUrl + "app/advert.listAdvertPhoto";

//查询巡检任务
const listInspectionTasks = baseUrl + "app/inspectionTask.listInspectionTasks";

//巡检任务详情
const listInspectionTaskDetails = baseUrl + 'app/inspectionTaskDetail.listInspectionTaskDetails';

//巡检
const updateInspectionTaskDetail = baseUrl + 'app/inspectionTaskDetail.updateInspectionTaskDetail';

// 查询报修单处理师傅
const listRepairStaffs = baseUrl + "app/ownerRepair.listRepairStaffs";

//查询员工报修单
const listStaffRepairs = baseUrl + "app/ownerRepair.listStaffRepairs";

//查询报修师傅查询
const listRepairTypeUsers = baseUrl + "app/repair.listRepairTypeUsers";



//查询完成报修单
const listStaffFinishRepairs = baseUrl +"app/ownerRepair.listStaffFinishRepairs";

const repairDispatch = baseUrl+"app/ownerRepair.repairDispatch";

//查询水电抄表记录
const listMeterWaters = baseUrl+"app/meterWater.listMeterWaters";
// 报修抢单
const robRepairOrder = baseUrl + "callComponent/ownerRepair.grabbingRepair";
// 获取空置房申请列表
const listApplyRoom = baseUrl + "app/applyRoomDiscount/queryApplyRoomDiscount";
const queryFeeDiscount = baseUrl + 'app/feeDiscount/queryFeeDiscount';
const listRepairSettings = baseUrl + 'app/repair.listRepairSettings';
const saveHelpOwnerRepair = baseUrl + "callComponent/addOwnerRepair/save";

	



module.exports = {
  baseUrl: baseUrl,
  hcBaseUrl: hcBaseUrl,
  loginUrl: loginUrl,
  areaUrl: areaUrl,
  GetNoticeListUrl: GetNoticeListUrl,
  listMyEnteredCommunitys: listMyEnteredCommunitys,
  listOwnerRepairs: listOwnerRepairs,
  queryStaffInfos: queryStaffInfos,
  listAuditComplaints: listAuditComplaints,
  changeStaffPwd: changeStaffPwd,
  listAuditHistoryComplaints: listAuditHistoryComplaints,
  saveComplaint: saveComplaint,
  auditComplaint: auditComplaint,
  queryFloors: queryFloors,
  queryUnits: queryUnits,
  queryRooms: queryRooms,
  applyVisitorApplicationKey: applyVisitorApplicationKey,
  uploadOwnerPhoto: uploadOwnerPhoto,
  getOwnerPhotoPath: getOwnerPhotoPath,
  userLogout: userLogout,
  queryParkingSpacesByOwner: queryParkingSpacesByOwner,
  queryFeeByParkingSpace: queryFeeByParkingSpace,
  queryFeeByOwner: queryFeeByOwner,
  preOrder: preOrder,
  listCommunitys: listCommunitys,
  listActivitiess: listActivitiess,
  filePath: filePath,
  listAdvertPhoto: listAdvertPhoto,
  saveOwnerRepair:saveOwnerRepair,
  listInspectionTasks:listInspectionTasks,
  listInspectionTaskDetails:listInspectionTaskDetails,
  updateInspectionTaskDetail:updateInspectionTaskDetail,
  listRepairStaffs:listRepairStaffs,
  listStaffRepairs:listStaffRepairs,
  listStaffFinishRepairs:listStaffFinishRepairs,
  listRepairTypeUsers:listRepairTypeUsers,
  repairDispatch:repairDispatch,
  listMeterWaters:listMeterWaters,
  robRepairOrder: robRepairOrder,
  listApplyRoom: listApplyRoom,
	queryFeeDiscount: queryFeeDiscount,
	listRepairSettings: listRepairSettings,
	saveHelpOwnerRepair:　saveHelpOwnerRepair
};