import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/views/login/Login.vue";
import Search from "@/views/search/Search.vue";
import SearchList from "@/views/search/SearchList.vue";
import ProductDetail from "@/views/product/ProductDetail.vue";
import Pay from "@/views/pay/Pay.vue";
import Order from "@/views/order/Order.vue";
import Index from "@/views/layout/Index.vue";
import Home from "@/views/layout/Home.vue";
import Category from "@/views/layout/Category.vue";
import Cart from "@/views/layout/Cart.vue";
import User from "@/views/layout/User.vue";
import store from "@/store";

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: '/login', component: Login
        },
        {
            path: '/', component: Index, redirect: '/home',
            children: [
                {
                    path: '/home', component: Home
                },
                {
                    path: '/category', component: Category
                },
                {
                    path: '/cart', component: Cart
                },
                {
                    path: '/user', component: User
                }
            ]
        },
        {
            path: '/search', component: Search
        },
        {
            path: '/searchList', component: SearchList
        },
        {
            path: '/productDetail/:id', component: ProductDetail
        },
        {
            path: '/pay', component: Pay
        },
        {
            path: '/order', component: Order
        }
    ]
})

const authUrl = ['/pay', '/order']
router.beforeEach((to, from, next) => {
    if (!authUrl.includes(to.path)) {
        next()
        return
    }

    // 是权限页面 是否有token
    const token = store.getters.token
    if (token) {
        next()
    } else {
        next('/login')
    }
})

export default router
