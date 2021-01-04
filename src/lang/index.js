// 引入相关文件
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueCookies from "vue-cookies";
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import enLocale from './en'
import zhLocale from './zh'
Vue.use(VueI18n)
const messages = {
    en: {
      ...enLocale,
      ...elementEnLocale
    },
    zh: {
      ...zhLocale,
      ...elementZhLocale
    }
  }
  // 获取当前浏览器语言
  const lang = navigator.language || navigator.userLanguage;
  
  const i18n = new VueI18n({
    locale: VueCookies.get('language') || lang.substr(0, 2) || 'zh', // set locale
    messages // set locale messages
  })
  export default i18n