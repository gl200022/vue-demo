import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ViewUI from 'view-design';

Vue.use(ViewUI);
Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    //此处的name名称应与vue文件中的name名称一致
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {
            title: '登录',
            keepAlive: false
        }
    },
    {
        path: '/main',
        name: 'Main',
        component: () => import('../views/Main.vue'),
        children: [
            {
                path: '/components/Home',
                name: 'About',
                component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
                meta: {
                    title: '首页',
                    keepAlive: true
                }
            }
            , {
                path: '/components/Management',
                name: 'Nav',
                component: () => import('../views/Nav.vue'),
                meta: {
                    title: '权限管理',
                    keepAlive: true
                }
            },
            {
                path: '/components/User',
                name: 'Nav',
                component: () => import('../views/Nav.vue'),
                meta: {
                    title: '用户管理',
                    keepAlive: true
                }
            }, {
                path: '/components/Personnel',
                name: 'Home',
                component: Home,
                meta: {
                    title: '人员数据',
                    keepAlive: true
                }
            }, {
                path: '/components/Alarm',
                name: 'Alarm',
                component: () => import('../views/Alarm.vue'),
                meta: {
                    title: '报警中心',
                    keepAlive: true
                }
            }
        ]
    },
]

const router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    }
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    //to 将要访问的路径
    //from 代表从那个路径跳转而来
    //next 是一个函数，放行
    //next() 放行     next('/login) 强制跳转
    ViewUI.LoadingBar.start();
    //如果用户访问的是登录页面，则直接放行
    if (to.path === '/') {
        next()
    } else {
        //从sessionStorage 中获取 保存的 token
        const user = window.sessionStorage.getItem('user')
        //如果没有token，强制跳转到登录页面，如果有，则直接放行
        if (user !== 'test') {
            next('/')
        } else {
            //console.log('to', to);
            router.app.$options.store.commit('setCurPage', to.meta.title);
            //此处name为tag标签名，componentName为组件名
            router.app.$options.store.commit('addTag',{name: to.meta.title, path: to.path,
                keepAlive: to.meta.keepAlive,componentName: to.name});
            next()
        }
    }
});

router.afterEach(route => {
    ViewUI.LoadingBar.finish();
});

export default router
