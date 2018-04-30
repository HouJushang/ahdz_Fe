import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/Main'
import Login from '@/pages/Login'
import Welcome from "@/pages/Welcome"
import Menu from '@/pages/Menu'
import Role from '@/pages/Role'
import Admin from '@/pages/Admin'
import AdminRole from '@/pages/AdminRole'
import News from '@/pages/News'
import Category from '@/pages/Category'
import CategoryList from '@/pages/CategoryList'
import ContentList from '@/pages/ContentList'
import Slide from '@/pages/Slide'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
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
          path: 'adminRole',
          name: 'adminRole',
          component: AdminRole
        },
        {
          path: 'category',
          name: 'category',
          component: Category
        },
        {
          path: 'categoryList',
          name: 'categoryList',
          component: CategoryList
        },
        //model
        {
          path: 'news/:categoryId',
          name: 'news',
          component: News
        },
        {
          path: 'news/:categoryId/:id',
          name: 'newsEdit',
          component: News
        },
        {
          path: 'slide/:categoryId',
          name: 'slide',
          component: Slide
        },
        {
          path: 'slide/:categoryId/:id',
          name: 'slideEdit',
          component: Slide
        },
        //end model
        {
          path: 'contentlist/:categoryId',
          name: 'contentList',
          component: ContentList
        },
      ]
    }
  ]
})
