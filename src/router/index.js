import { createRouter, createWebHistory } from 'vue-router'

import Products from '../pages/Products.vue'
import AddProduct from '../pages/AddProduct.vue'

const routes = [
  {
    path: '/',
    redirect: '/products'
  },
  {
    path: '/products',
    component: Products
  },
  {
    path: '/add',
    component: AddProduct
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router