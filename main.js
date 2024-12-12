import Vue from 'vue'
import App from './App'
import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import queue from './common/queue'

import uView from "uview-ui";
import empty from './components/empty'

 // import amap from '@/common/amap-wx';


Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$Request = HttpRequest;
Vue.prototype.$queue = queue;

Vue.prototype.$Sysconf = HttpRequest.config;
Vue.prototype.$SysCache = HttpCache;
App.mpType = 'app'
Vue.component('empty', empty);



const app = new Vue({
	...App
})
app.$mount()
