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
import Video from '@/pages/Video'
import Category from '@/pages/Category'
import CategoryList from '@/pages/CategoryList'
import ContentList from '@/pages/ContentList'
import Slide from '@/pages/Slide'
import Yuanqu from '@/pages/YuanQu'
import Qiye from '@/pages/Qiye'
import Expert from '@/pages/Expert'
import UserList from '@/pages/UserList'
import Person from '@/pages/Person'
import Company from '@/pages/Company'
import AddJob from '@/pages/AddJob'
import Job from '@/pages/Job'
import Resume from '@/pages/Resume'
import AddResume from '@/pages/AddResume'
import Service from '@/pages/Service'
import AddService from '@/pages/AddService'
import Product from '@/pages/Product'
import AddProduct from '@/pages/AddProduct'
import Position from '@/pages/Position'
import PersonList from '@/pages/PersonList'
import CompanyList from '@/pages/CompanyList'
import PositionContent from '@/pages/PositionContent'
import RoleMenu from '@/pages/RoleMenu'

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
          path: 'roleMenu',
          name: 'roleMenu',
          component: RoleMenu
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
          path: 'video/:categoryId',
          name: 'video',
          component: Video
        },
        {
          path: 'video/:categoryId/:id',
          name: 'videoEdit',
          component: Video
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
        {
          path: 'yuanqu/:categoryId',
          name: 'yuanqu',
          component: Yuanqu
        },
        {
          path: 'yuanqu/:categoryId/:id',
          name: 'yuanquEdit',
          component: Yuanqu
        },
        {
          path: 'qiye/:categoryId',
          name: 'qiye',
          component: Qiye
        },
        {
          path: 'qiye/:categoryId/:id',
          name: 'qiyeEdit',
          component: Qiye
        },
        {
          path: 'expert/:categoryId',
          name: 'expert',
          component: Expert
        },
        {
          path: 'expert/:categoryId/:id',
          name: 'expertEdit',
          component: Expert
        },
        //end model

        {
          path: 'userlist',
          name: 'userList',
          component: UserList
        },
        {
          path: 'personlist',
          name: 'personList',
          component: PersonList
        },
        {
          path: 'companylist',
          name: 'companyList',
          component: CompanyList
        },
        {
          path: 'person/:userId',
          name: 'person',
          component: Person
        },
        {
          path: 'company/:userId',
          name: 'company',
          component: Company
        },
        {
          path: 'contentlist/:categoryId',
          name: 'contentList',
          component: ContentList
        },
        {
          path: 'job',
          name: 'job',
          component: Job
        },
        {
          path: 'addJob',
          name: 'addJob',
          component: AddJob
        },
        {
          path: 'editJob/:id',
          name: 'editJob',
          component: AddJob
        },
        {
          path: 'resume',
          name: 'resume',
          component: Resume
        },
        {
          path: 'addResume',
          name: 'addResume',
          component: AddResume
        },
        {
          path: 'editResume/:id',
          name: 'editResume',
          component: AddResume
        },
        {
          path: 'service',
          name: 'service',
          component: Service
        },
        {
          path: 'addService',
          name: 'addService',
          component: AddService
        },
        {
          path: 'editService/:id',
          name: 'editService',
          component: AddService
        },
        {
          path: 'product',
          name: 'product',
          component: Product
        },
        {
          path: 'addProduct',
          name: 'addProduct',
          component: AddProduct
        },
        {
          path: 'editProduct/:id',
          name: 'editProduct',
          component: AddProduct
        },
        {
          path: 'position',
          name: 'position',
          component: Position
        },
        {
          path: 'position/:id',
          name: 'positionContent',
          component: PositionContent
        },
      ]
    }
  ]
})
