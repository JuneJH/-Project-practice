import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/studentsList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/studentList',
    name:'student',
    component:home
  },
  {
    path:'/addform',
    name:'addform',
    component:()=>import('../views/form.vue')
  },
  {
    path:'*',
    name:'home',
    component:home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
