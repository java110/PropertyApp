import Vue from 'vue'
import App from './App'
import Java110Context from './context/Java110Context.js'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)
Vue.config.productionTip = false

Vue.prototype.java110Context = Java110Context;  
Vue.prototype.java110Constant = Java110Context.constant; 
Vue.prototype.java110Factory = Java110Context.factory; 
Vue.prototype.java110Util = Java110Context.util;

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
