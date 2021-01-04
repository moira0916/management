import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login','/register',"/404", "/401"] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRole = store.getters.roles && store.getters.roles.length > 0

     // const menuRoles = store.getters.permission_routes 

      if (hasRole) {
        
        next()
      } else {
        try {
          // get user info
         
          //const roles = store.getters.roles
          
         // console.dir(roles)
         const { code } = await store.dispatch('user/getInfo')
         console.log("code:"+code);
         let roles = []
          switch (code){
            case -1:
              roles = ['admin']
              break;
            case 1:
              roles = ['comp_admin']
              break;
            case 2:
              roles = ['personal']
              break;
            default:
              break;
        
          }
          console.log("roles:"+roles);
         // generate accessible routes map based on roles
         const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          router.push({ path: '*', redirect: '/404', hidden: true })
         // dynamically add accessible routes
         router.addRoutes(accessRoutes)
         

         next({ ...to, replace: true })
         
        // next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
