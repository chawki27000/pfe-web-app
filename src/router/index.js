import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Information from '@/components/home/Information'
import Clinical from '@/components/home/Clinical'
import Case from '@/components/home/Case'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
  },
  {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
          {
              path: '/info',
              name: 'Information',
              component: Information
          },
          {
              path: '/clinical',
              name: 'Clinical',
              component: Clinical
          },
          {
              path: '/case',
              name: 'Case',
              component: Case
          },
      ]
  },


  ]
})
