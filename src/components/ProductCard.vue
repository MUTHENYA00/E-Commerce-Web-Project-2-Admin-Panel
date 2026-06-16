<template>
  <article class="product-card">
    <div class="card-media">
      <img
        v-if="imageSrc"
        :src="imageSrc"
        :alt="productName"
        @error="imageFailed = true"
      />
      <div v-else class="card-image-fallback">IMG</div>
      <span v-if="product.is_deal" class="badge green deal-badge">Deal</span>
    </div>

    <div class="card-body">
      <div>
        <h3>{{ productName }}</h3>
        <p class="muted">{{ product.category || 'Uncategorized' }}</p>
      </div>

      <p class="card-description">
        {{ product.description || 'No product description has been added yet.' }}
      </p>

      <div class="card-footer">
        <strong>{{ formatCurrency(product.price) }}</strong>
        <div class="row-actions">
          <button class="button warning icon-button" @click="$emit('edit', product)">Edit</button>
          <button class="button danger icon-button" @click="$emit('delete', product.id)">
            Delete
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { assetUrl } from '../services/api'
import { formatCurrency } from '../utils/currency'
import { getProductImage, getProductName } from '../utils/helpers'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['delete', 'edit'])

const imageFailed = ref(false)
const productName = computed(() => getProductName(props.product))
const imageSrc = computed(() => {
  const image = getProductImage(props.product)
  return image && !imageFailed.value ? assetUrl(image) : ''
})

watch(
  () => getProductImage(props.product),
  () => {
    imageFailed.value = false
  }
)
</script>

<style scoped>
.product-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: hidden;
}

.card-media {
  aspect-ratio: 16 / 10;
  background: #e9edf5;
  position: relative;
}

.card-media img,
.card-image-fallback {
  height: 100%;
  width: 100%;
}

.card-media img {
  object-fit: cover;
}

.card-image-fallback {
  align-items: center;
  color: #64748b;
  display: flex;
  font-weight: 900;
  justify-content: center;
}

.deal-badge {
  left: 12px;
  position: absolute;
  top: 12px;
}

.card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
}

.card-description {
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.45;
}

.card-footer {
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  margin-top: auto;
}

.card-footer strong {
  color: var(--ink);
  font-size: 18px;
}

@media (max-width: 520px) {
  .card-footer {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
