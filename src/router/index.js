import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Menu from '@/pages/Menu'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children: [
        {
          path: 'menu',
          name: 'menu',
          component: Menu
        }
      ]
    }
  ]
})
