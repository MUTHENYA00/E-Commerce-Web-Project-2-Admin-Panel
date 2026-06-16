<script setup>
import { ref, computed, watch, onMounted } from 'vue'

import ProductForm from '../components/ProductForm.vue'
import ProductTable from '../components/ProductTable.vue'

import {
  deleteProduct as deleteProductRequest,
  normalizeProductPayload,
  updateProduct
} from '../services/productService'

import { getCategoryList, getProductImage, getProductName } from '../utils/helpers'

/* ---------------- STATE ---------------- */
const products = ref([])
const page = ref(1)
const limit = 20

const totalProducts = ref(0)

const loading = ref(false)
const saving = ref(false)

const error = ref('')
const message = ref('')

const search = ref('')
const categoryFilter = ref('all')

const editMode = ref(false)
const editId = ref(null)
const editForm = ref(createBlankForm())

/* ---------------- COMPUTED ---------------- */
const categories = computed(() => getCategoryList(products.value))

const filteredProducts = computed(() => {
  const term = search.value.trim().toLowerCase()

  return products.value.filter((p) => {
    const matchesSearch =
      !term ||
      getProductName(p).toLowerCase().includes(term) ||
      String(p.category || '').toLowerCase().includes(term)

    const matchesCategory =
      categoryFilter.value === 'all' ||
      p.category === categoryFilter.value

    return matchesSearch && matchesCategory
  })
})

/* ---------------- FETCH ---------------- */
async function fetchProducts() {
  loading.value = true
  error.value = ''

  try {
    const params = new URLSearchParams({
      page: page.value,
      limit
    })

    const res = await fetch(`http://localhost:3000/api/products?=${params}`)
    const data = await res.json()

    products.value = Array.isArray(data) ? data : []

  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

/* ---------------- TOTAL ---------------- */
async function fetchTotal() {
  try {
    const res = await fetch('http://localhost:3000/api/products/count')
    const data = await res.json()
    totalProducts.value = data?.total || 0
  } catch {
    totalProducts.value = 0
  }
}

/* ---------------- SEARCH + FILTER RESET ---------------- */
watch([search, categoryFilter], () => {
  page.value = 1

})

/* ---------------- PAGINATION ---------------- */
function nextPage() {
  if (products.value.length === limit) {
    page.value++
    fetchProducts()
  }
}

function prevPage() {
  if (page.value > 1) {
    page.value--
    fetchProducts()
  }
}

/* ---------------- EDIT ---------------- */
function startEdit(p) {
  editMode.value = true
  editId.value = p.id
  message.value = ''

  editForm.value = {
    product_name: getProductName(p),
    description: p.description || '',
    price: p.price || '',
    image_path: getProductImage(p),
    category: p.category || '',
    before_price: p.before_price || '',
    discounted_price: p.discounted_price || '',
    is_deal: Boolean(p.is_deal),
    image_file: null
  }
}

/* ---------------- ACTIONS ---------------- */
async function deleteProduct(id) {
  if (!confirm('Delete this product?')) return

  try {
    await deleteProductRequest(id)
    message.value = 'Product deleted successfully.'
    await fetchProducts()
    await fetchTotal()
  } catch (err) {
    error.value = err.message
  }
}

async function saveUpdate() {
  saving.value = true
  error.value = ''

  try {
    await updateProduct(editId.value, normalizeProductPayload(editForm.value))

    message.value = 'Product updated successfully.'
    editMode.value = false

    await fetchProducts()
  } catch (err) {
    error.value = err.message
  } finally {
    saving.value = false
  }
}

/* ---------------- INIT ---------------- */
onMounted(() => {
  fetchProducts()
  fetchTotal()
})

function createBlankForm() {
  return {
    product_name: '',
    description: '',
    price: '',
    image_path: '',
    category: '',
    before_price: '',
    discounted_price: '',
    is_deal: false,
    image_file: null
  }
}
</script>
<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Catalog</p>
        <h1>Products</h1>
        <p class="muted">Manage inventory, deals, prices, and product media.</p>
      </div>
      <router-link to="/add" class="button">+ Add Product</router-link>
    </header>

    <div v-if="message" class="notice success">{{ message }}</div>
    <div v-if="error" class="notice error">{{ error }}</div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>Product List</h2>
          <p class="muted">{{ filteredProducts.length }} of {{ totalProducts }} products</p>
        </div>

        <div class="toolbar">
          <input v-model="search" class="search-input" placeholder="Search products" />
          <select v-model="categoryFilter" class="search-input">
            <option value="all">All categories</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="empty-state">Loading products...</div>
      <div v-else-if="!filteredProducts.length" class="empty-state">No products found.</div>
      <ProductTable
        v-else
        :products="filteredProducts"
        @delete="deleteProduct"
        @edit="startEdit"
      />
    </section>

    <div v-if="editMode" class="drawer-overlay" @click.self="editMode = false">
      <div class="drawer">
        <div>
          <p class="eyebrow">Product editor</p>
          <h2>Edit Product</h2>
        </div>

        <ProductForm
          v-model="editForm"
          :loading="saving"
          loading-label="Saving..."
          submit-label="Save Changes"
          @reset="editMode = false"
          @submit="saveUpdate"
        />
      </div>
    </div>
  </section>

  <button @click="prevPage">Prev</button>
<button @click="nextPage">Next</button>
<p>Page {{ page }}</p>
</template>
