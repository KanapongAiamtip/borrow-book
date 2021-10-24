import Vue from 'vue'
import Router from 'vue-router'

//Users
import UserIndex from '@/components/Users/Index'
import UserCreate from '@/components/Users/CreateUser'
import UserEdit from '@/components/Users/EditUser'
import UserShow from '@/components/Users/ShowUser'

// Authen
import Login from '@/components/Login'

// Comments
import CommentIndex from '@/components/Comments/Index'

// Blogs
import BlogIndex from '@/components/Blogs/Index'
import BlogCreate from '@/components/Blogs/CreateBlog'
import BlogEdit from '@/components/Blogs/EditBlog'
import BlogShow from '@/components/Blogs/ShowBlog'
import BackStatus from '@/components/Blogs/BackStatus'

// Upload Testing
import Upload from '@/components/Utils/Upload'

// Front
import FrontIndex from '@/components/Fronts/Index'
import FrontTreasury from '@/components/Fronts/Treasury'
import FrontShow from '@/components/Fronts/ShowBlog'

// Borrow
import BorrowCreate from '@/components/Fronts/Borrow'
import BorrowStatus from '@/components/Fronts/Status'
import ShowStatus from '@/components/Fronts/ShowStatus'
import EditBorrow from '@/components/Fronts/EditBorrow'
import BorrowProfile from '@/components/Fronts/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/create',
      name: 'users-create',
      component: UserCreate
    },
    {
      path: '/user/edit/:userId',
      name: 'user-edit',
      component: UserEdit
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    //authen
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    // blogs
    {
      path: '/blogs',
      name: 'blogs',
      component: BlogIndex
    },
    {
      path: '/blog/create',
      name: 'blogs-create',
      component: BlogCreate
    },
    {
      path: '/blog/edit/:blogId',
      name: 'blog-edit',
      component: BlogEdit
    },
    {
      path: '/blog/:blogId',
      name: 'blog',
      component: BlogShow
    },
    {
      path: '/back/status',
      name: 'back-status',
      component: BackStatus
    },
    // comments
    {
      path: '/comments',
      name: 'comments',
      component: CommentIndex
    },
    // upload testing
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    // front
    {
      path: '/front',
      name: 'front',
      component: FrontIndex
    },
    {
      path: '/front/read/:blogId',
      name: 'front-read',
      component: FrontShow
    },
    {
      path: '/treasury',
      name: 'treasury',
      component: FrontTreasury
    },
    {
      path: '/borrow/create',
      name: 'borrow-create',
      component: BorrowCreate
    },
    {
      path: '/borrow/status',
      name: 'borrow-status',
      component: BorrowStatus
    },
    {
      path: '/borrow/status/detail/:borrowId',
      name: 'show-status',
      component: ShowStatus
    },
    {
      path: '/borrow/edit/:borrowId',
      name: 'borrow-edit',
      component: EditBorrow
    },
    {
      path: '/borrow/profile/:userId',
      name: 'borrow-profile',
      component: BorrowProfile
    },
  ]
})
