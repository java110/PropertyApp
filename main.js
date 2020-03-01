import Vue from 'vue'
import App from './App'
import Java110Context from './context/Java110Context.js'
//引入vuex
import store from './store'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
Vue.config.productionTip = false

Vue.prototype.java110Context = Java110Context;  
Vue.prototype.java110Constant = Java110Context.constant; 
Vue.prototype.java110Factory = Java110Context.factory; 
Vue.prototype.java110Util = Java110Context.util;
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
