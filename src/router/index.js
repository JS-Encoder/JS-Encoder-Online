import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@views/home'
import store from '@store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@views/login')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@views/signup')
  },
  {
    path: '/forgetPwd',
    name: 'ForgetPwd',
    component: () => import('@views/forgetPwd')
  },
  {
    path: '/resetPwd',
    name: 'ResetPwd',
    component: () => import('@views/resetPwd')
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import('@views/explore')
  },
  {
    path: '/features',
    name: 'Features',
    component: () => import('@views/features')
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('@views/feedback')
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@views/user'),
    redirect: '/user/:id/works',
    children: [
      {
        path: 'works',
        name: 'Works',
        component: () => import('@views/user/works')
      },
      {
        path: 'liked',
        name: 'Liked',
        component: () => import('@views/user/liked')
      },
      {
        path: 'following',
        name: 'Following',
        component: () => import('@views/user/following')
      },
      {
        path: 'followers',
        name: 'Followers',
        component: () => import('@views/user/followers')
      },
      {
        path: 'cycleBin',
        name: 'CycleBin',
        component: () => import('@views/user/cycle-bin')
      },
    ]
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@views/settings'),
    redirect: '/settings/profile',
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@views/settings/profile'),
      },
      {
        path: 'code',
        name: 'Code',
        component: () => import('@views/settings/code'),
      },
      {
        path: 'account',
        name: 'Account',
        component: () => import('@views/settings/account'),
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import('@views/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 每次跳转页面取消之前的请求
  try {
    store.state.cancelRequest.cancelTokenArr.forEach((cancelToken) => {
      cancelToken('over')
    })
    store.commit('cancelRequest/clearToken')
  } catch (error) {
    console.log(error)
  }
  next()
})
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

export default router
