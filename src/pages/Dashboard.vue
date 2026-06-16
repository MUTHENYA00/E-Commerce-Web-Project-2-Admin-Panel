<script setup>
import { computed, onMounted, ref } from 'vue'
import StatsCard from '../components/StatsCard.vue'
import { getOrders } from '../services/orderService'
import { getProducts } from '../services/productService'
import { formatCurrency } from '../utils/currency'
import { getCategoryList, getOrderTotal, getProductName } from '../utils/helpers'

const products = ref([])
const orders = ref([])
const loading = ref(true)
const error = ref('')

const totalRevenue = computed(() =>
  orders.value.reduce((sum, order) => sum + getOrderTotal(order), 0)
)

const dealCount = computed(() => products.value.filter((product) => product.is_deal).length)
const categories = computed(() => getCategoryList(products.value))
const lowStock = computed(() =>
  products.value.filter((product) => Number(product.stock ?? product.quantity ?? 10) <= 5)
)

const recentProducts = computed(() => products.value.slice(0, 5))
const recentOrders = computed(() => orders.value.slice(0, 5))

onMounted(loadDashboard)

async function loadDashboard() {
  loading.value = true
  error.value = ''

  const [productResult, orderResult] = await Promise.allSettled([getProducts(), getOrders()])

  if (productResult.status === 'fulfilled') {
    products.value = Array.isArray(productResult.value) ? productResult.value : []
  } else {
    error.value = productResult.reason.message
  }

  if (orderResult.status === 'fulfilled') {
    orders.value = Array.isArray(orderResult.value) ? orderResult.value : []
  }

  loading.value = false
}
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Store overview</p>
        <h1>Dashboard</h1>
        <p class="muted">Track products, orders, categories, and deals from one place.</p>
      </div>

      <router-link to="/add" class="button">+ Add Product</router-link>
    </header>

    <div v-if="error" class="notice error">{{ error }}</div>

    <div class="grid stats-grid">
      <StatsCard icon="P" label="Products" :value="loading ? '...' : products.length" />
      <StatsCard
        icon="S"
        label="Revenue"
        :value="loading ? '...' : formatCurrency(totalRevenue)"
        trend="Orders"
        tone="green"
      />
      <StatsCard
        icon="D"
        label="Deal Products"
        :value="loading ? '...' : dealCount"
        trend="Promos"
        tone="amber"
      />
      <StatsCard
        icon="C"
        label="Categories"
        :value="loading ? '...' : categories.length"
        trend="Catalog"
      />
    </div>

    <div class="grid two-col">
      <section class="panel">
        <div class="panel-header">
          <div>
            <h2>Recent Products</h2>
            <p class="muted">Latest items .</p>
          </div>
          <router-link to="/products" class="button secondary">View all</router-link>
        </div>

        <div v-if="loading" class="empty-state">Loading dashboard...</div>
        <div v-else-if="!recentProducts.length" class="empty-state">No products found.</div>
        <div v-else class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in recentProducts" :key="product.id">
                <td>{{ getProductName(product) }}</td>
                <td>
                  <span class="badge">{{ product.category || 'Uncategorized' }}</span>
                </td>
                <td>{{ formatCurrency(product.price) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <div>
            <h2>Operations</h2>
            <p class="muted">Fast signals for daily admin work.</p>
          </div>
        </div>
        <div class="panel-body list">
          <div class="list-row">
            <span>Pending orders</span>
            <strong>{{ recentOrders.length }}</strong>
          </div>
          <div class="list-row">
            <span>Low stock alerts</span>
            <strong>{{ lowStock.length }}</strong>
          </div>
          <div class="list-row">
            <span>Catalog coverage</span>
            <strong>{{ categories.length }} categories</strong>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
