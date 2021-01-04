import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import infiniteScroll from 'vue-infinite-scroll'
import ZegoExpressEngine from 'zego-express-engine-webrtc'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n) // 通过插件的形式挂载
// Vue.use(ElementUI, {
//   i18n: (key, value) => i18n.t(key, value)
//  }); //兼容i18n 7.x版本设置
const i18n = new VueI18n({
    locale: 'zh-CN',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': require('./lang/zh'),   // 中文语言包
      'en-US': require('./lang/en')    // 英文语言包
    }
})
Vue.prototype.$t = (key, value) => i18n.t(key, value);
// 引入echarts
//import echarts from 'echarts'
// 将echarts注册到Vue组件的原型对象中去
//Vue.prototype.$echarts = echarts
import imageViewer from 'image-viewer-vue'
Vue.use(imageViewer)
// 引入ECharts
import ECharts from 'vue-echarts/components/ECharts'
// 注册ECharts为标签
Vue.component('chart', ECharts)
// a配置：按需引入echart图表配置，同下b配置
//import '../node_modules/echarts/lib/chart/bar'
// import '../node_modules/echarts/lib/chart/line'
// import '../node_modules/echarts/lib/chart/pie'
// import '../node_modules/echarts/lib/chart/tooltip'
// b配置：直接引入所有echart配置,同上a配置
 require('echarts')
 import iView from 'iview'
 Vue.config.productionTip = false
 Vue.use(iView)
 import moment from 'moment'
Vue.prototype.$moment = moment
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.use(infiniteScroll)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
