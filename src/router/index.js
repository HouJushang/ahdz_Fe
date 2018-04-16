import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Welcome from "@/pages/Welcome"
import Menu from '@/pages/Menu'
import Role from '@/pages/Role'
import Admin from '@/pages/Admin'
import AdminRole from '@/pages/AdminRole'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: Welcome
        },
        {
          path: 'menu',
          name: 'menu',
          component: Menu
        },
        {
          path: 'role',
          name: 'role',
          component: Role
        },
        {
          path: 'admin',
          name: 'admin',
          component: Admin
        },
        {
          path: 'adminrole',
          name: 'adminrole',
          component: AdminRole
        },
      ]
    }
  ]
})
