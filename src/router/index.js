import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const asyncRoutes = [
  {
    path: '/company',
    component: Layout,
    name: 'company',
    meta: {
      title: 'm.route.routetitle4',
      icon: 'nested'
    },
    children: [
      {
        path: 'index',
        name: 'companyindex',
        component: () => import('@/views/company/index'),
        meta: { title: 'm.route.routetitle5', roles: ['admin'], icon: 'el-icon-s-help' }
      },
      {
        path: '/company/register/index',
        name: 'companyregister',
        component: () => import('@/views/company/register/index'),
        meta: { title: 'm.route.routetitle6', roles: ['comp_admin'], icon: 'el-icon-s-help' }
      }
    ]
  },
  {
    path: '/usermanager',
    component: Layout,
    redirect:"/usermanager/index",
    children: [{
      path: '/usermanager/index',
      name: 'usermanager',
      component: () => import('@/views/usermanager/index'),
      meta: { title: 'm.route.routetitle7',roles: ['admin'], icon: 'dashboard' } 
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]


/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true,
  },
  {
    path: '/table',
    component: () => import('@/views/table/index'),
    hidden: true,
  },


  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'm.route.routeidex', icon: 'dashboard' }
    }]
  },
  

 
  {
    path: '/employee',
    component: Layout,
    redirect:"/company/employee/index",
    name:'employee',
    meta: { title: 'm.route.routetitle1', icon: 'form' },
    children: [
      {
        path: '/company/employee/index',
        name: 'employeelist',
        component: () => import('@/views/company/employee/index'),
        meta: { title: 'm.route.routetitle2', icon: 'form' }
      },
      {
        path: '/company/employee/add',
        name: 'employeeAdd',
        hidden: true,
        component: () => import('@/views/company/employee/add'),
        meta: { title: 'm.route.routetitle3', icon: 'form' }
      }
    ]
  },
  {
    path: '/project',
    component: Layout,
    redirect:"/project/index",
    meta: {
      title: 'm.route.routetitle8',
      icon: 'nested'
    },
    children: [
      {
        path: '/project/index',
        name: 'project',
        component: () => import('@/views/project/index'),
        meta: { title: 'm.route.routetitle8', icon: 'form' }
      }
    ]
  },
  {
    path: '/contract',
    component: Layout,
    redirect:"/contract/index",
    children: [
      {
        path: '/contract/index',
        name: 'contract',
        component: () => import('@/views/contract/index'),
        meta: { title: 'm.route.routetitle9', icon: 'form' }
      },
    ]
  },
  {
    path: '/exam',
    component: Layout,
    redirect:"/exam/index",
    meta: { title: 'm.route.routetitle10', icon: 'form' },
    children: [
      {
        path: '/exam/index',
        name: 'exam',
        component: () => import('@/views/exam/index'),
        meta: { title: 'm.route.routetitle10', icon: 'form' }
      },
      {
        path: '/exam/score',
        name: 'examscore',
        component: () => import('@/views/exam/score'),
        meta: { title: 'm.route.routetitle11', icon: 'form' }
      }
    ]
  },
  {
    path: '/live',
    component: Layout,
    redirect:"/live/index",
    name:'live',
    hidden:true,
    meta: { title: 'm.route.routetitle12', icon: 'form' },
    children: [
      {
        path: '/live/index',
        name: 'liveroom',
        hidden: true,
        component: () => import('@/views/live/index'),
        meta: { title: 'm.route.routetitle13', icon: 'form' }
      }
    ]
  },
 
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  
]



const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
