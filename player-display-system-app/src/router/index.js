import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home.vue'),
    beforeEnter(to,from,next){
      if(window.sessionStorage.getItem("userInfo")){
        next();
      }else{
        next("/")
      }
    },
    children:[
      {
        path: '/',
        name: 'showIndex',
        component: () => import('../components/show/index.vue'),
      },
      {
        path:"/skill",
        name:"skill",
        component:()=>import("../views/skill.vue")
      },
      {
        path:"/team",
        name:"team",
        component:()=>import("../views/team.vue")
      },
      {
        path:"/football",
        name:"football",
        component:()=>import("../views/football.vue")
      }
    ]
  },{
    path:'/register',
    name:'Register',
    component:()=>import('../views/register.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
