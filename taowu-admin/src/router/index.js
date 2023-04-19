import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/login/login'


Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    //   redirect: '/home',
    //   children: [

    //   ]
  }
]


const router = new VueRouter({
  routes
})




export default router