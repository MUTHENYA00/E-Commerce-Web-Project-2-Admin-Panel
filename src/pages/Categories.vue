<script setup>
import { computed, onMounted, ref } from 'vue'
import { getProducts } from '../services/productService'
import { formatCurrency } from '../utils/currency'
import { getCategoryList } from '../utils/helpers'

const products = ref([])
const loading = ref(true)
const error = ref('')

const categories = computed(() =>
  getCategoryList(products.value).map((category) => {
    const categoryProducts = products.value.filter((product) => product.category === category)
    const dealCount = categoryProducts.filter((product) => product.is_deal).length
    const inventoryValue = categoryProducts.reduce(
      (sum, product) => sum + Number(product.price || 0),
      0
    )
    const maxValue = Math.max(products.value.length, 1)

    return {
      category,
      count: categoryProducts.length,
      dealCount,
      inventoryValue,
      share: Math.round((categoryProducts.length / maxValue) * 100)
    }
  })
)

onMounted(async () => {
  loading.value = true
  error.value = ''

  try {
    const data = await getProducts()
    products.value = Array.isArray(data) ? data : []
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Catalog structure</p>
        <h1>Categories</h1>
        <p class="muted">Category performance is calculated from your products API.</p>
      </div>
      <router-link to="/add" class="button">+ Add Product</router-link>
    </header>

    <div v-if="error" class="notice error">{{ error }}</div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>Category Summary</h2>
          <p class="muted">{{ categories.length }} active categories</p>
        </div>
      </div>

      <div v-if="loading" class="empty-state">Loading categories...</div>
      <div v-else-if="!categories.length" class="empty-state">No categories found.</div>
      <div v-else class="panel-body list">
        <article v-for="item in categories" :key="item.category" class="list-row">
          <div style="min-width: min(100%, 360px)">
            <h3>{{ item.category }}</h3>
            <p class="muted">
              {{ item.count }} products, {{ item.dealCount }} deal products,
              {{ formatCurrency(item.inventoryValue) }} catalog value
            </p>
            <div class="progress-track" style="margin-top: 10px">
              <div class="progress-bar" :style="{ width: `${item.share}%` }"></div>
            </div>
          </div>
          <span class="badge">{{ item.share }}%</span>
        </article>
      </div>
    </section>
  </section>
</template>
