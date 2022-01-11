import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  {
    path: '/game',
    name: 'Game',
    redirect: '/game/start',
    component: () => import(/* webpackChunkName: "game" */ '@/views/Game/Index.vue'),
    children:[
      {
        path: 'start',
        name: 'Start',
        component: () => import(/* webpackChunkName: "game" */ '@/views/Game/PreStart.vue'),
      },
      {
        path: 'fight',
        name: 'Game Room',
        component: () => import(/* webpackChunkName: "game" */ '@/views/Game/Game.vue'),
      },
      {
        path: 'end-game',
        name: 'End Game',
        params: true,
        component: () => import(/* webpackChunkName: "game" */ '@/views/Game/EndGame.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
