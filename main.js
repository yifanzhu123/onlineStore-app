
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
//导入网络请求的包
import { $http } from '@escook/request-miniprogram'
//导入store的实例对象
import store from './store/store.js'
uni.$http=$http
$http.beforeRequest=function(options){
	uni.showLoading({
		title:'数据加载中...'
	})
}

//相应拦截器
$http.afterRequest=function(){
	uni.hideLoading()
}
//封装弹框的方法
uni.$showMsg=function(title='数据请求失败！',duration=1500){
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

$http.baseUrl='https://www.uinav.com'


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store/store'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif