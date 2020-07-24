
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/addressList/addressList","pages/my/my","pages/login/login","pages/activityes/activityes","pages/activityDetail/activityDetail","pages/notice/notice","pages/changeCommunity/changeCommunity","pages/userInfo/userInfo","pages/changePwd/changePwd","pages/notice/detail/noticeDetail","pages/complaintList/complaintList","pages/auditComplaintOrder/auditComplaintOrder","pages/complaintOrderDetail/complaintOrderDetail","pages/complaintOrder/complaintOrder","pages/floorList/floorList","pages/unitList/unitList","pages/roomList/roomList","pages/repairOrder/repairOrder","pages/myModify/myModify","pages/repairDetail/repairDetail","pages/inspection/inspection","pages/purchase/purchase","pages/excuteInspection/excuteInspection","pages/excuteOneInspection/excuteOneInspection","pages/purchaseRequest/purchaseRequest","pages/pOutOfStorageRequest/pOutOfStorageRequest","pages/purchasingSchedule/purchasingSchedule","pages/purchaseReview/purchaseReview","pages/purchaseList/purchaseList"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"HC掌上物业","navigationBarBackgroundColor":"#00AA00","backgroundColor":"#00AA00"},"tabBar":{"color":"#272636","selectedColor":"#00AA00","borderStyle":"black","backgroundColor":"#ffffff","height":"50px","fontSize":"10px","iconWidth":"24px","spacing":"3px","list":[{"pagePath":"pages/index/index","iconPath":"static/image/home.png","selectedIconPath":"static/image/home-selected.png","text":"首页"},{"pagePath":"pages/addressList/addressList","iconPath":"static/image/addressList.png","selectedIconPath":"static/image/addressList-selected.png","text":"通讯录"},{"pagePath":"pages/my/my","iconPath":"static/image/my.png","selectedIconPath":"static/image/my-selected.png","text":"我的"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"HC掌上物业","compilerVersion":"2.6.16","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"HC掌上物业"}},{"path":"/pages/addressList/addressList","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"通讯录"}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/login/login","meta":{},"window":{"navigationStyle":"custom","titleNView":false,"bounce":"none","scrollIndicator":"none"}},{"path":"/pages/activityes/activityes","meta":{},"window":{"navigationBarTitleText":"小区文化"}},{"path":"/pages/activityDetail/activityDetail","meta":{},"window":{"navigationBarTitleText":"文化详情"}},{"path":"/pages/notice/notice","meta":{},"window":{"navigationBarTitleText":"公告"}},{"path":"/pages/changeCommunity/changeCommunity","meta":{},"window":{"navigationBarTitleText":"切换小区"}},{"path":"/pages/userInfo/userInfo","meta":{},"window":{"navigationBarTitleText":"个人信息"}},{"path":"/pages/changePwd/changePwd","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/notice/detail/noticeDetail","meta":{},"window":{"navigationBarTitleText":"通知页面详情"}},{"path":"/pages/complaintList/complaintList","meta":{},"window":{"navigationBarTitleText":"投诉受理单"}},{"path":"/pages/auditComplaintOrder/auditComplaintOrder","meta":{},"window":{"navigationBarTitleText":"处理投诉单"}},{"path":"/pages/complaintOrderDetail/complaintOrderDetail","meta":{},"window":{"navigationBarTitleText":"投诉单详情"}},{"path":"/pages/complaintOrder/complaintOrder","meta":{},"window":{"navigationBarTitleText":"投诉录单"}},{"path":"/pages/floorList/floorList","meta":{},"window":{"navigationBarTitleText":"选择楼栋"}},{"path":"/pages/unitList/unitList","meta":{},"window":{"navigationBarTitleText":"选择单元"}},{"path":"/pages/roomList/roomList","meta":{},"window":{"navigationBarTitleText":"选择房屋"}},{"path":"/pages/repairOrder/repairOrder","meta":{},"window":{"navigationBarTitleText":"维修录单"}},{"path":"/pages/myModify/myModify","meta":{},"window":{"navigationBarTitleText":"维修受理单"}},{"path":"/pages/repairDetail/repairDetail","meta":{},"window":{"navigationBarTitleText":"维修详情"}},{"path":"/pages/inspection/inspection","meta":{},"window":{"navigationBarTitleText":"巡检打卡"}},{"path":"/pages/purchase/purchase","meta":{},"window":{"navigationBarTitleText":"采购管理","navigationBarBackgroundColor":"#57fef6"}},{"path":"/pages/excuteInspection/excuteInspection","meta":{},"window":{"navigationBarTitleText":"巡检过程"}},{"path":"/pages/excuteOneInspection/excuteOneInspection","meta":{},"window":{"navigationBarTitleText":"执行巡检"}},{"path":"/pages/purchaseRequest/purchaseRequest","meta":{},"window":{"navigationBarTitleText":"采购申请"}},{"path":"/pages/pOutOfStorageRequest/pOutOfStorageRequest","meta":{},"window":{"navigationBarTitleText":"出库申请"}},{"path":"/pages/purchasingSchedule/purchasingSchedule","meta":{},"window":{"navigationBarTitleText":"申请进度"}},{"path":"/pages/purchaseReview/purchaseReview","meta":{},"window":{"navigationBarTitleText":"采购审核"}},{"path":"/pages/purchaseList/purchaseList","meta":{},"window":{"navigationBarTitleText":"选择类型"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
