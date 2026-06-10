<script setup>
import { ref, onMounted, watch } from 'vue'


const products = ref([])
const loading = ref(true)

const editMode = ref(false)
const editId = ref(null)

const editName = ref('')
const editPrice = ref('')
const editImage = ref('')
const editDescription = ref('')
const editCategory = ref('')
const editBeforePrice = ref('')
const editDiscountedPrice = ref('')
const editIsDeal = ref(false)

function startEdit(p) {
  editMode.value = true
  editId.value = p.id

  editName.value = p.product_name
  editPrice.value = p.price
  editImage.value = p.image_path
  editDescription.value = p.description
  editCategory.value = p.category
  editBeforePrice.value = p.before_price
  editDiscountedPrice.value = p.discounted_price
  editIsDeal.value = p.is_deal
}


async function fetchProducts() {
  const res = await fetch('http://localhost:3000/api/products')
  products.value = await res.json()
}

onMounted(async () => {
  await fetchProducts()
  loading.value = false
})
async function deleteProduct(id) {
  try {
    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: 'DELETE'
    })

    // ONLY THIS (single source of truth)
    await fetchProducts()

  } catch (err) {
    console.error("Delete error:", err)
  }
}
// save products 
async function saveUpdate() {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${editId.value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        product_name: editName.value,
        description: editDescription.value,
        price: Number(editPrice.value),
        image_path: editImage.value.replace(/\\/g, '/'),
        category: editCategory.value,
        before_price: Number(editBeforePrice.value),
        discounted_price: Number(editDiscountedPrice.value),
        is_deal: editIsDeal.value
      })
    })

    if (!res.ok) throw new Error("Update failed")

    await fetchProducts() // refresh UI

    editMode.value = false

  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="page">

    <h1 class="title">Products</h1>

    <p v-if="loading">Loading...</p>

    <table v-else class="table">

      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>ID</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in products" :key="p.id">

        <td>
  <img :src="`http://localhost:3000${p.image_path}`" />
    </td>

<td>{{ p.product_name }}</td>

<td>Ksh {{ p.price }}</td>
          <td>{{ p.id }}</td>

          <td>
           <button class="delete" @click="deleteProduct(p.id)">
  Delete
</button>
            <button class="edit" @click="startEdit(p)">
  Edit
</button>
          </td>

        </tr>
      </tbody>

    </table>
  </div>
<div v-if="editMode" class="edit-overlay">
  <div class="edit-sidebar">
    
    <h2>Edit Product</h2>

    <input v-model="editName" placeholder="Name" />
    <textarea v-model="editDescription" placeholder="Description"></textarea>

    <input v-model="editPrice" type="number" placeholder="Price" />
    <input v-model="editBeforePrice" type="number" placeholder="Before Price" />
    <input v-model="editDiscountedPrice" type="number" placeholder="Discounted Price" />

    <input v-model="editCategory" placeholder="Category" />
    <input v-model="editImage" placeholder="Image Path" />

    <label>
      <input type="checkbox" v-model="editIsDeal" />
      Is Deal Product
    </label>

    <div class="actions">
  <button class="save" @click="saveUpdate">Save</button>
  <button class="cancel" @click="editMode = false">Cancel</button>
</div>


  </div>
 
</div>


</template>
<style>
.card {
  background: white;
  padding: 15px;
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  display: flex;
  align-items: center;
  gap: 15px;
}

.card img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.page {
  padding: 10px;
}

.title {
  color: #0d47a1;
  margin-bottom: 15px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0,0,0,0.08);
}

.table th {
  background: #0d47a1;
  color: white;
  padding: 12px;
  text-align: left;
}

.table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.table img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 6px;
}

button {
  margin-right: 5px;
  padding: 6px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete {
  background: #e53935;
  color: white;
}

.edit {
  background: #fbc02d;
  color: black;
}

.delete:hover {
  background: #c62828;
}

.edit:hover {
  background: #f9a825;
}

/* dark overlay */
.edit-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: flex-end;
  z-index: 999;
}

/* sidebar */
.edit-sidebar {
  width: 420px;
  height: 100%;
  background: white;
  padding: 20px;
  box-shadow: -5px 0 20px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: slideIn 0.25s ease;
  backdrop-filter: blur(5px);
}

/* animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* inputs */
.edit-sidebar input,
.edit-sidebar textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  outline: none;
}

.edit-sidebar input:focus,
.edit-sidebar textarea:focus {
  border-color: #0d47a1;
}

/* buttons */
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.save {
  background: #0d47a1;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.cancel {
  background: #e53935;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.save:hover {
  background: #1565c0;
}

.cancel:hover {
  background: #c62828;
}

</style>
