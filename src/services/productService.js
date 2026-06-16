import { apiRequest } from './api'

export function searchProducts(query) {
  return apiRequest(`/api/products/search?q=${encodeURIComponent(query)}`)
}

export function getProducts(page = 1, limit = 20) {
  return apiRequest(`/api/products?page=${page}&limit=${limit}`)
}

export function createProduct(product) {
  return apiRequest('/api/products', {
    method: 'POST',
    body: buildProductFormData(product)
  })
}

export function updateProduct(id, product) {
  return apiRequest(`/api/products/${id}`, {
    method: 'PUT',
    body: buildProductBody(product)
  })
}

export function deleteProduct(id) {
  return apiRequest(`/api/products/${id}`, {
    method: 'DELETE'
  })
}

export function normalizeProductPayload(form) {
  const cleanImagePath = String(form.image_path || '')
    .replace(/\\/g, '/')
    .replace(/C:\/fakepath\//i, '')

  return {
    product_name: form.product_name?.trim(),
    description: form.description?.trim(),
    price: Number(form.price || 0),
    image_path: cleanImagePath,
    category: form.category?.trim(),
    before_price: Number(form.before_price || 0),
    discounted_price: Number(form.discounted_price || 0),
    is_deal: Boolean(form.is_deal),
    image_file: form.image_file || null
  }
}

function buildProductBody(product) {
  if (!product.image_file) {
    const { image_file, ...jsonProduct } = product
    return JSON.stringify(jsonProduct)
  }

  return buildProductFormData(product)
}

function buildProductFormData(product) {
  const formData = new FormData()

  Object.entries(product).forEach(([key, value]) => {
    if (key === 'image_file' || key === 'image_path') return
    formData.append(key, value ?? '')
  })

  if (product.image_file) {
    formData.append('image', product.image_file)
  }

  return formData
}
