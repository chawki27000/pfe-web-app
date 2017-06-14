import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dash from '@/components/home/Dash'
import Home from '@/components/Home'

import Information from '@/components/home/Information'
import Clinical from '@/components/home/Clinical'
import Case from '@/components/home/Case'
import Child from '@/components/home/Child'
import List from '@/components/home/List'
import Archive from '@/components/home/Archive'
import ArchiveLst from '@/components/home/ArchiveLst'

import User from '@/components/admin/User'
import Hospital from '@/components/admin/Hospital'
import Drug from '@/components/admin/Drug'

import Stable from '@/components/doctor/Stable'
import Instable from '@/components/doctor/Instable'
import Candidat from '@/components/doctor/Candidat'

import Paracetamol from '@/components/doctor/expert/Paracetamol'


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
              path: '/dash',
              name: 'Dash',
              component: Dash
          },
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
              path: '/child',
              name: 'Child',
              component: Child
          },
          {
              path: '/list',
              name: 'List',
              component: List
          },
          {
              path: '/archive',
              name: 'Archive',
              component: Archive
          },
          {
              path: '/archiveLst',
              name: 'ArchiveLst',
              component: ArchiveLst
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
          {
              path: '/stable',
              name: 'Stable',
              component: Stable
          },
          {
              path: '/instable',
              name: 'Instable',
              component: Instable,
          },
          {
              path: '/candidat',
              name: 'Candidat',
              component: Candidat,
          },
          {
              path: '/paracetamol',
              name: 'Paracetamol',
              component: Paracetamol,
          },
      ]
  },

  ]
})
