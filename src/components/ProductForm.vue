<template>
  <form class="product-form" @submit.prevent="$emit('submit')">
    <div class="field-grid">
      <div class="field">
        <label>Product Name</label>
        <input
          :value="modelValue.product_name"
          placeholder=" "
          required
          @input="updateField('product_name', $event.target.value)"
        />
      </div>

      <div class="field">
        <label>Category</label>
        <input
          :value="modelValue.category"
          placeholder="Fashion,Devices...."
          required
          @input="updateField('category', $event.target.value)"
        />
      </div>
    </div>

    <div class="field">
      <label>Description</label>
      <textarea
        :value="modelValue.description"
        placeholder="Short product description"
        @input="updateField('description', $event.target.value)"
      ></textarea>
    </div>

    <div class="field-grid three">
      <div class="field">
        <label>Price</label>
        <input
          :value="modelValue.price"
          type="number"
          min="0"
          required
          @input="updateField('price', $event.target.value)"
        />
      </div>

      <div class="field">
        <label>Before Price</label>
        <input
          :value="modelValue.before_price"
          type="number"
          min="0"
          @input="updateField('before_price', $event.target.value)"
        />
      </div>

      <div class="field">
        <label>Discounted Price</label>
        <input
          :value="modelValue.discounted_price"
          type="number"
          min="0"
          @input="updateField('discounted_price', $event.target.value)"
        />
      </div>
    </div>

    <div class="media-field">
      <div class="image-preview">
        <img v-if="previewSrc" :src="previewSrc" alt="Product preview" />
        <span v-else>Image preview</span>
      </div>

      <div class="media-inputs">
        <div class="field">
          <label>Upload Image</label>
          <input type="file" accept="image/*" @change="handleFileChange" />
        </div>
      </div>
    </div>

    <label class="check-field">
      <input
        :checked="modelValue.is_deal"
        type="checkbox"
        @change="updateField('is_deal', $event.target.checked)"
      />
      Mark as deal product
    </label>

    <div class="form-actions">
      <button type="button" class="button secondary" @click="$emit('reset')">Clear</button>
      <button type="submit" class="button" :disabled="loading">
        {{ loading ? loadingLabel : submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { assetUrl } from '../services/api'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  loadingLabel: {
    type: String,
    default: 'Saving...'
  },
  modelValue: {
    type: Object,
    required: true
  },
  submitLabel: {
    type: String,
    default: 'Save Product'
  }
})

const emit = defineEmits(['reset', 'submit', 'update:modelValue'])
const localPreview = ref('')

const previewSrc = computed(() => {
  if (localPreview.value) return localPreview.value
  if (props.modelValue.image_path) return assetUrl(props.modelValue.image_path)
  return ''
})

function updateField(field, value) {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}

function handleFileChange(event) {
  const file = event.target.files?.[0] || null

  if (localPreview.value) {
    URL.revokeObjectURL(localPreview.value)
  }

  localPreview.value = file ? URL.createObjectURL(file) : ''

  emit('update:modelValue', {
    ...props.modelValue,
    image_file: file
  })
}

watch(
  () => props.modelValue.image_file,
  (file) => {
    if (!file && localPreview.value) {
      URL.revokeObjectURL(localPreview.value)
      localPreview.value = ''
    }
  }
)

onBeforeUnmount(() => {
  if (localPreview.value) {
    URL.revokeObjectURL(localPreview.value)
  }
})
</script>

<style scoped>
.product-form {
  display: grid;
  gap: 16px;
}

.media-field {
  align-items: stretch;
  display: grid;
  gap: 14px;
  grid-template-columns: 180px minmax(0, 1fr);
}

.image-preview {
  align-items: center;
  aspect-ratio: 1;
  background: #eef2f7;
  border: 1px dashed #b9c4d3;
  border-radius: 8px;
  color: var(--text-muted);
  display: flex;
  font-size: 13px;
  font-weight: 800;
  justify-content: center;
  overflow: hidden;
  text-align: center;
}

.image-preview img {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.media-inputs {
  display: grid;
  gap: 14px;
}

@media (max-width: 720px) {
  .media-field {
    grid-template-columns: 1fr;
  }

  .image-preview {
    max-width: 220px;
  }
}
</style>
