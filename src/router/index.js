import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import Information from '@/components/home/Information'
import Clinical from '@/components/home/Clinical'
import Case from '@/components/home/Case'
import User from '@/components/admin/User'
import Hospital from '@/components/admin/Hospital'
import Drug from '@/components/admin/Drug'

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
          {
              path: '/user',
              name: 'User',
              component: User
          },
          {
              path: '/hospital',
              name: 'Hospital',
              component: Hospital
          },
          {
              path: '/drug',
              name: 'Drug',
              component: Drug
          },
      ]
  },


  ]
})
