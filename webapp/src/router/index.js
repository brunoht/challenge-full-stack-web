import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/aluno',
  },
  {
    path: '/aluno',
    name: 'Student',
    component: () => import( '../views/Student.vue')
  },
  {
    path: '/aluno/criar',
    name: 'StudentCreate',
    component: () => import( '../views/StudentCreate.vue')
  },
  {
    path: '/aluno/editar/:id',
    name: 'StudentUpdate',
    component: () => import( '../views/StudentUpdate.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
