/**
 * url 常量类
 * 
 * add by wuxw 2019-12-28
 */
// 服务器域名
const baseUrl = 'https://app.demo.winqi.cn/'; 
//const baseUrl = '/';
const hcBaseUrl = 'https://hc.demo.winqi.cn'; // 登录接口

const loginUrl = baseUrl + 'app/loginProperty';
const areaUrl = baseUrl + "app/area.listAreas";
const GetNoticeListUrl = baseUrl + 'app/api.queryNotices'; //报修接口

const listMyEnteredCommunitys = baseUrl + 'app/community.listMyEnteredCommunitys'; //查看员工小区

const listOwnerRepairs = baseUrl + 'app/ownerRepair.listOwnerRepairs'; //家庭成员

const queryStaffInfos = baseUrl + 'app/query.staff.infos'; //查询员工信息

const changeStaffPwd = baseUrl + 'app/user.changeStaffPwd'; //修改密码

const listComplaints = baseUrl + 'app/complaint.listComplaints'; //添加投诉建议

const saveComplaint = baseUrl + 'app/complaint'; //查询业主房间

const userLogout = baseUrl + 'app/user.service.logout'; //绑定业主

const listAuditComplaints = baseUrl + 'app/auditUser.listAuditComplaints'; //查询绑定业主

const listAuditHistoryComplaints = baseUrl + 'app/auditUser.listAuditHistoryComplaints'; //解绑业主

const appUserUnBindingOwner = baseUrl + 'app/owner.deleteAppUserBindingOwner'; //查询业主门禁

const listOwnerMachines = baseUrl + 'app/owner.listOwnerMachines'; // 申请钥匙

const applyApplicationKey = baseUrl + "app/applicationKey.applyApplicationKey"; //查询钥匙

const listApplicationKeys = baseUrl + "app/applicationKey.listApplicationKeys"; //申请访客钥匙

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
  listAuditHistoryComplaints: listAuditHistoryComplaints,
  changeStaffPwd: changeStaffPwd,
  listComplaints: listComplaints,
  saveComplaint: saveComplaint,
  appUserUnBindingOwner: appUserUnBindingOwner,
  listOwnerMachines: listOwnerMachines,
  applyApplicationKey: applyApplicationKey,
  listApplicationKeys: listApplicationKeys,
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
  listAdvertPhoto: listAdvertPhoto
};