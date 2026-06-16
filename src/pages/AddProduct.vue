<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ProductForm from '../components/ProductForm.vue'
import { createProduct, normalizeProductPayload } from '../services/productService'

const message = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

const form = ref({
  product_name: '',
  description: '',
  price: '',
  image_path: '',
  category: '',
  before_price: '',
  discounted_price: '',
  is_deal: false,
  image_file: null
})

function resetForm() {
  form.value = {
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

async function addProduct() {
  loading.value = true
  message.value = ''
  error.value = ''

  try {
    await createProduct(normalizeProductPayload(form.value))
    message.value = 'Product added successfully.'
    resetForm()

    setTimeout(() => router.push('/products'), 450)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Catalog</p>
        <h1>Add Product</h1>
        <p class="muted">Create a new item </p>
      </div>
      <router-link to="/products" class="button secondary">Back to Products</router-link>
    </header>

    <div v-if="message" class="notice success">{{ message }}</div>
    <div v-if="error" class="notice error">{{ error }}</div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>Product Details</h2>
          <p class="muted">Name, category, pricing, media, and deal settings.</p>
        </div>
      </div>

      <div class="panel-body">
        <ProductForm
          v-model="form"
          :loading="loading"
          loading-label="Adding..."
          submit-label="Add Product"
          @reset="resetForm"
          @submit="addProduct"
        />
      </div>
    </section>
  </section>
</template>
