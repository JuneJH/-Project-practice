import Vue from 'vue'
import VueRouter from 'vue-router'
import defaultPage from '@/layout/default'
import blank from '@/layout/blank'
import index from '@/views/index'
import login from "@/views/login"
import register from "@/views/register"

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'defaultPage',
    component: defaultPage,
    // redirect:'/index',
    children:[{
      path:'/',
      name:'index',
      component:index
    },{
      path:'/changeCity',
      name:'changeCity',
      component:()=>import('@/views/changeCity')
    },{
      path:'goods/:name',
      name:'goods',
      component:()=>import('@/views/goods')
    }]
  },{
    path:'/blank',
    name:'blank',
    component:blank,
    children:[{
      path:'/login',
      name:'login',
      component:login,
    },{
      path:'/register',
      name:'register',
      component:register
    }]
  }
]

const router = new VueRouter({
  routes,
  // mode:'history'
})

export default router
