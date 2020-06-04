import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ViewUI from 'view-design';

Vue.use(ViewUI);
Vue.use(VueRouter)

  const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('../views/Main.vue'),
      children: [
          {
            path: '/components/ServiceHall',
            name: 'ServiceHall',
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
          }
          , {
            path: '/components/Management',
            name: 'Management',
            component: () => import('../views/Nav.vue')
          },
           {
            path: '/components/User',
            name: 'User',
            component: () => import('../views/Login.vue')
          },{
            path: '/components/Personnel',
            name: 'Personnel',
            component: Home
          },{
            path: '/components/Alarm',
            name: 'Alarm',
            component: Home
          }
      ]
    },
  ]

const router = new VueRouter({
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  //to 将要访问的路径
  //from 代表从那个路径跳转而来
  //next 是一个函数，放行
  //    next() 放行     next('/login) 强制跳转
  ViewUI.LoadingBar.start();
  //如果用户访问的是登录页面，则直接放行
  if(to.path === '/'){
    next()
  }else{
    //从 sessionStorage 中获取 保存的 token
    const user = window.sessionStorage.getItem('user')
    //如果没有token，强制跳转到登录页面，如果有，则直接放行
    if(user != 'test'){
      next('/')
    }else{
      next()
    }
  }
});

router.afterEach(route => {
    ViewUI.LoadingBar.finish();
});

export default router
