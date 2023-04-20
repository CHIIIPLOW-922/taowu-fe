import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/login/login'
import Layout from "@/layout/layout"


Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: '',
    component: Layout,
    redirect:'/user',
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: '/user',
        name: 'user',
        meta: {
          requireAuth: true
        },
        component: () => import("@/views/user")
      },
      {
        path: '/category',
        name: 'category',
        meta: {
          requireAuth: true
        },
        component: () => import("@/views/category")
      },
      {
        path: '/myInfo',
        name: 'myInfo',
        meta: {
          requireAuth: true
        },
        component: () => import("@/views/myInfo")
      },
      {
        path: '/product',
        name: 'product',
        meta: {
          requireAuth: true
        },
        component: () => import("@/views/product")
      },
      {
        path: '/order',
        name: 'order',
        meta: {
          requireAuth: true
        },
        component: () => import("@/views/order")
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      requireAuth: false
    },
    component: Login
  }
]



const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.matched.length != 0) {
    if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
        if ((localStorage.getItem("admin"))!==null) { // 通过vuex state获取当前的user是否存在
            next();
        } else {
            next({
                path: '/login',
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        if ((localStorage.getItem("admin"))!==null) { // 判断是否登录
            if (to.path != "/" && to.path != "/login") { //判断是否要跳到登录界面
                next();
            } else {
                /**
                 * 防刷新，如果登录，修改路由跳转到登录页面，修改路由为登录后的首页 
                 */
                next({
                    path: '/user'
                })
            }
        } else {
            next();
        }
    }
} else {
    next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
    })
}
})



export default router