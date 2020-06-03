import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CategoryCreate from '../views/CategoryCreate'
import CategoryList from '../views/CategoryList'
import ItemCreate from '../views/ItemCreate'
import ItemList from '../views/ItemList'
import HeroCreate from '../views/HeroCreate'
import HeroList from '../views/HeroList'
import ArticleCreate from '../views/ArticleCreate'
import ArticleList from '../views/ArticleList'
import AdCreate from '../views/AdCreate'
import AdList from '../views/AdList'
import AdminUserCreate from '../views/AdminUserCreate'
import AdminUserList from '../views/AdminUserList'
import Login from '../views/Login'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/login', name: 'login', component: Login, meta: { isPublic: true } }, // 给需要公开访问的路由加一个参数，在路由卫视中判断，从而确定登录授权
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        // 分类页子路由
        { path: '/categories/create', component: CategoryCreate },
        { path: '/categories/edit/:id', component: CategoryCreate, props: true }, // 将传过来的属性id注入到参数里边，使CategoryCreate页面能够使用id这个参数
        { path: '/categories/list', component: CategoryList },
        // 物品子路由
        { path: '/items/create', component: ItemCreate },
        { path: '/items/edit/:id', component: ItemCreate, props: true },
        { path: '/items/list', component: ItemList },
        // 英雄子路由
        { path: '/heroes/create', component: HeroCreate },
        { path: '/heroes/edit/:id', component: HeroCreate, props: true },
        { path: '/heroes/list', component: HeroList },
        // 文章子路由
        { path: '/articles/create', component: ArticleCreate },
        { path: '/articles/edit/:id', component: ArticleCreate, props: true },
        { path: '/articles/list', component: ArticleList },
        // 广告位子路由
        { path: '/ads/create', component: AdCreate },
        { path: '/ads/edit/:id', component: AdCreate, props: true },
        { path: '/ads/list', component: AdList },
        // 管理员子路由
        { path: '/admin_users/create', component: AdminUserCreate },
        { path: '/admin_users/edit/:id', component: AdminUserCreate, props: true },
        { path: '/admin_users/list', component: AdminUserList }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
