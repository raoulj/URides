import Vue from 'vue'
import Router from 'vue-router'

import Search       from '@/components/Search'
import Register     from '@/components/Register'
import Login        from '@/components/Login'
import UserProfile  from '@/components/UserProfile'
import Create       from '@/components/Create'
import About        from '@/components/About'
import Contact      from '@/components/Contact'

Vue.use(Router)

export default new Router({
  routes: [
    {
	    path: '/',
	    name: 'Search',
	    component: Search
    }, {
    	path: '/register',
    	name: 'Register',
    	component: Register
    }, {
    	path: '/login',
    	name: 'Login',
    	component: Login
    }, {
        path: '/profile',
        name: 'UserProfile',
        component: UserProfile
    }, {
        path: '/create',
        name: "Create",
        component: Create
    }, {
        path: '/about',
        name: 'About',
        component: About
    }, {
        path: '/contact',
        name: 'Contact',
        component: Contact
    }
  ]
})
