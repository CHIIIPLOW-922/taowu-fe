import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/login/login'
import Layout from "@/layout/layout"


Vue.use(VueRouter);
const routes = [
  {
    path:'/',
    name:'',
    component:Layout
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]


const router = new VueRouter({
  routes
})




export default router