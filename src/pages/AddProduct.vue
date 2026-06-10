<script setup>
import { ref } from 'vue'


const name = ref('')
const description = ref('')
const price = ref('')
const image = ref('')
const category = ref('')
const beforePrice = ref('')
const discountedPrice = ref('')
const isDeal = ref(false)

const message = ref('')
const loading = ref(false)

async function addProduct(){
  loading.value = true
  message.value = ''

const cleanImagePath = image.value
  .replace(/\\/g, '/')   // convert \ → /
  .replace(/C:\\fakepath\\/i, '') // optional cleanup (browser fake path)
  
  try {
    const res = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_name: name.value,
        description: description.value,
        price: Number(price.value),
        image_path: cleanImagePath,
        category: category.value,
        before_price: Number(beforePrice.value),
        discounted_price: Number(discountedPrice.value),
        is_deal: isDeal.value
      })
    })

    if (!res.ok) {
      throw new Error('Failed to add product')
    }

    await res.json()

    message.value = " Product added successfully!"
   
 // clear form
    name.value = ''
    description.value = ''
    price.value = ''
    image.value = ''
    category.value = ''
    beforePrice.value = ''
    discountedPrice.value = ''
    isDeal.value = false

  } catch (err) {
  console.error("ADD PRODUCT ERROR:", err)

  message.value = ` ${err.message}`
}
   finally {
    loading.value = false
  }
}
</script>

<template>
<div class="page">

  <div class="header">
    <h1>Add Product</h1>
    <p>Fill in product details below</p>
  </div>

  <form class="form-card" @submit.prevent="addProduct">

    <!-- PRODUCT INFO -->
    <div class="section">
      <h3>Product Information</h3>

      <div class="row">
        <div class="field">
          <label>Product Name</label>
          <input v-model="name" placeholder="Enter product name" />
        </div>

        <div class="field">
          <label>Category</label>
          <input v-model="category" placeholder="Enter category" />
        </div>
      </div>

      <div class="field">
        <label>Description</label>
        <textarea v-model="description" placeholder="Product description"></textarea>
      </div>
    </div>

    <!-- PRICING -->
    <div class="section">
      <h3>Pricing</h3>

      <div class="row">
        <div class="field">
          <label>Price</label>
          <input v-model="price" type="number" />
        </div>

        <div class="field">
          <label>Before Price</label>
          <input v-model="beforePrice" type="number" />
        </div>

        <div class="field">
          <label>Discounted Price</label>
          <input v-model="discountedPrice" type="number" />
        </div>
      </div>
    </div>

    <!-- MEDIA -->
    <div class="section">
      <h3>Media</h3>

      <div class="field">
        <label>Image Path</label>
        <input v-model="image" placeholder="assets/..." />
      </div>
    </div>

    <!-- DEAL -->
    <div class="check">
      <input type="checkbox" v-model="isDeal" />
      <label>Mark as Deal Product </label>
    </div>

    <!-- BUTTON -->
    <button type="submit" :disabled="loading">
      {{ loading ? "Adding Product..." : "Add Product" }}
    </button>

    <p class="msg">{{ message }}</p>

  </form>

</div>
</template>

<style>
/* PAGE */
.page {
  padding: 30px;
  background: #f4f6f9;
  min-height: 100vh;
}

/* HEADER */
.header h1 {
  color: #0d47a1;
  margin: 0;
}

.header p {
  color: #666;
  margin-top: 5px;
}

/* FORM CARD */
.form-card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  max-width: 900px;
}

/* SECTION */
.section {
  margin-bottom: 20px;
}

.section h3 {
  margin-bottom: 10px;
  color: #0d47a1;
  font-size: 16px;
}

/* ROW GRID */
.row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

/* FIELD */
.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: 13px;
  color: #444;
}

/* INPUTS */
input, textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
  transition: 0.2s;
}

input:focus, textarea:focus {
  border-color: #0d47a1;
}

/* TEXTAREA */
textarea {
  height: 100px;
  resize: none;
}

/* CHECKBOX */
.check {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0;
}

/* BUTTON */
button {
  width: 100%;
  background: #0d47a1;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

button:hover {
  background: #1565c0;
}

/* MESSAGE */
.msg {
  margin-top: 10px;
  font-size: 14px;
  color: green;
}
</style>