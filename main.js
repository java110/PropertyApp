import Vue from 'vue'
import App from './App'
import conf from './conf/config.js';
import Java110Context from './lib/java110/Java110Context.js'
import context from './lib/java110/context.js'
import url from './constant/url.js'
import factory from './lib/java110/factory/factory.js'
import util from './lib/java110/utils/util.js'
import date from './lib/java110/utils/date.js'
import {getCommunityId,getCommunityName} from './api/community/community.js';
import {getStaffId,getStaffName,getStaffTel} from './api/staff/staff.js';
//引入vuex
import store from './store'

import cuCustom from './lib/colorui/components/cu-custom.vue'
import {VueJsonp} from 'vue-jsonp'
Vue.use(VueJsonp)
Vue.component('cu-custom',cuCustom)
Vue.config.productionTip = false

Vue.prototype.java110Context = Java110Context;  
Vue.prototype.java110Constant = Java110Context.constant; 
Vue.prototype.java110Factory = Java110Context.factory; 
Vue.prototype.java110Util = Java110Context.util;
Vue.prototype.$store = store;
Vue.prototype.context = context;
Vue.prototype.url = url;
Vue.prototype.factory = factory;
Vue.prototype.util = util;
Vue.prototype.date = date;
Vue.prototype.imgUrl = conf.imgUrl;
// 绑定小区信息
Vue.prototype.getCommunityId = getCommunityId;
Vue.prototype.getCommunityName = getCommunityName;

// 绑定员工
Vue.prototype.getStaffId = getStaffId;
Vue.prototype.getStaffName = getStaffName;
Vue.prototype.getStaffTel = getStaffTel;

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
