<template>
  <div class="product-table">
    <div class="table-wrap">
      <table class="data-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Deal</th>
            <th>ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>
              <div class="product-cell">
                <img
                  v-if="imageFor(product)"
                  class="product-thumb"
                  :src="imageFor(product)"
                  :alt="getProductName(product)"
                  @error="markImageFailed(product)"
                />
                <div v-else class="product-thumb thumb-fallback">IMG</div>
                <div>
                  <strong>{{ getProductName(product) }}</strong>
                  <p class="muted">{{ product.description || 'No description' }}</p>
                </div>
              </div>
            </td>
            <td><span class="badge">{{ product.category || 'Uncategorized' }}</span></td>
            <td>{{ formatCurrency(product.price) }}</td>
            <td>
              <span class="badge" :class="product.is_deal ? 'green' : ''">
                {{ product.is_deal ? 'Deal' : 'Standard' }}
              </span>
            </td>
            <td>#{{ product.id }}</td>
            <td>
              <div class="row-actions">
                <button class="button warning icon-button" @click="$emit('edit', product)">
                  Edit
                </button>
                <button class="button danger icon-button" @click="$emit('delete', product.id)">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { assetUrl } from '../services/api'
import { formatCurrency } from '../utils/currency'
import { getProductImage, getProductName } from '../utils/helpers'

defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

defineEmits(['delete', 'edit'])

const failedImages = reactive({})

function imageFor(product) {
  const image = getProductImage(product)
  if (!image || failedImages[product.id]) return ''
  return assetUrl(image)
}

function markImageFailed(product) {
  failedImages[product.id] = true
}

async function fetchProducts(page = 1) {
  const res = await fetch(
    `http://localhost:3000/api/products?page=${page}&limit=20`
  );
  return await res.json();
}
</script>

<style scoped>
.product-table {
  width: 100%;
}
</style>
