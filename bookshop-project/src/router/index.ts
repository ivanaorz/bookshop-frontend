/**This file uses the Vue Router library to create and configure 
  the application's routing system. */

import { createRouter, createWebHistory } from 'vue-router' 
import AdminBooksView from '@/views/AdminBooksView.vue';
import AdminUsersView from '@/views/AdminUsersView.vue';
import GuestView from '@/views/GuestView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import UserView from '@/views/UserView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
       },
       
       {
      path: '/guest',
      name: 'guest',
      component: GuestView
       },
       {
      path: '/user',
      name: 'user',
      component: UserView
       },
       {
      path: '/admin/books',
      name: 'adminBooks',
      component: AdminBooksView
       },
        {
      path: '/admin/users',
      name: 'adminUsers',
      component: AdminUsersView
       },
  ]
})

export default router
