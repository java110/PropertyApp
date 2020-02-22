import Vue from 'vue'
import App from './App'
import Java110Context from './context/Java110Context.js'

Vue.config.productionTip = false

Vue.prototype.java110Context = Java110Context;  
Vue.prototype.java110Context = Java110Context; 

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
