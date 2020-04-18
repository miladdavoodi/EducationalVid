import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Show from '../views/Show.vue'
import Login from '../views/Login.vue'
import ContactUs from '../views/ContactUs.vue'
import PayCallback from '../views/PayCallback.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/panel',
    name: 'panel',
    component: Login
  },
  {
    path: '/ContactUs',
    name: 'ContactUs',
    component: ContactUs
  },
  {
    path: '/course/:courseId',
    name: 'Show',
    component: Show
  },
  {
    path: '/course/:courseId/:playId',
    name: 'Show',
    component: Show
  },
  {
    path: '/pay/callback',
    name: 'PayCallback',
    component: PayCallback
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
