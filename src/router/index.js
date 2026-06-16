import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../pages/Dashboard.vue'
import Products from '../pages/Products.vue'
import AddProduct from '../pages/AddProduct.vue'
import Orders from '../pages/Orders.vue'
import Categories from '../pages/Categories.vue'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: Dashboard
  },
  {
    path: '/products',
    component: Products
  },
  {
    path: '/add',
    component: AddProduct
  },
  {
    path: '/orders',
    component: Orders
  },
  {
    path: '/categories',
    component: Categories
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
