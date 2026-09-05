import { createRouter, createWebHistory } from 'vue-router'
import StoreLayout from '../layouts/StoreLayout.vue'
import Home from '../pages/Home.vue'
import Category from '../pages/Category.vue'
import Search from '../pages/Search.vue'
import Product from '../pages/Product.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'
import Confirmation from '../pages/Confirmation.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Account from '../pages/Account.vue'
import Orders from '../pages/Orders.vue'
import OrderDetail from '../pages/OrderDetail.vue'
import NotFound from '../pages/NotFound.vue'
const router=createRouter({history:createWebHistory(),routes:[
 {path:'/',component:StoreLayout,children:[
  {path:'',component:Home},{path:'shop/:category',component:Category},{path:'search',component:Search},{path:'product/:id',component:Product},
  {path:'cart',component:Cart},{path:'checkout/:step?',component:Checkout},{path:'order-confirmed/:id',component:Confirmation},
  {path:'login',component:Login},{path:'register',component:Register},{path:'account',component:Account},{path:'account/orders',component:Orders},{path:'account/orders/:id',component:OrderDetail}
 ]},
 {path:'/:pathMatch(.*)*',component:NotFound}
]})
export default router
