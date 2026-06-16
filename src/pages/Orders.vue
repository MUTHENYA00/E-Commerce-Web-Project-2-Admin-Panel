<script setup>
import { computed, onMounted, ref } from 'vue'
import { getOrders, updateOrderStatus } from '../services/orderService'
import { formatCurrency } from '../utils/currency'
import { getOrderTotal } from '../utils/helpers'

const orders = ref([])
const loading = ref(true)
const savingId = ref(null)
const error = ref('')
const message = ref('')
const statusFilter = ref('all')

const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

const filteredOrders = computed(() =>
  statusFilter.value === 'all'
    ? orders.value
    : orders.value.filter((order) => String(order.status || 'pending') === statusFilter.value)
)

onMounted(loadOrders)

async function loadOrders() {
  loading.value = true
  error.value = ''

  try {
    const data = await getOrders()
    orders.value = Array.isArray(data) ? data : []
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

function customerName(order) {
  return order.customer_name || order.customer?.name || order.name || 'Walk-in customer'
}

function orderDate(order) {
  const value = order.created_at || order.createdAt || order.date
  if (!value) return 'Not set'

  return new Intl.DateTimeFormat('en-KE', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value))
}

async function changeStatus(order, status) {
  savingId.value = order.id
  message.value = ''
  error.value = ''

  try {
    await updateOrderStatus(order.id, status)
    order.status = status
    message.value = 'Order status updated.'
  } catch (err) {
    error.value = err.message
  } finally {
    savingId.value = null
  }
}
</script>

<template>
  <section class="page">
    <header class="page-header">
      <div>
        <p class="eyebrow">Fulfillment</p>
        <h1>Orders</h1>
        <p class="muted">Review customer orders and update fulfillment status.</p>
      </div>

      <div class="toolbar">
        <select v-model="statusFilter" class="search-input">
          <option value="all">All statuses</option>
          <option v-for="status in statuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
        <button class="button secondary" @click="loadOrders">Refresh</button>
      </div>
    </header>

    <div v-if="message" class="notice success">{{ message }}</div>
    <div v-if="error" class="notice error">{{ error }}</div>

    <section class="panel">
      <div class="panel-header">
        <div>
          <h2>Order Queue</h2>
          <p class="muted">{{ filteredOrders.length }} orders visible</p>
        </div>
      </div>

      <div v-if="loading" class="empty-state">Loading orders...</div>
      <div v-else-if="!filteredOrders.length" class="empty-state">No orders found.</div>
      <div v-else class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in filteredOrders" :key="order.id">
              <td>#{{ order.id }}</td>
              <td>{{ customerName(order) }}</td>
              <td>{{ formatCurrency(getOrderTotal(order)) }}</td>
              <td>{{ orderDate(order) }}</td>
              <td>
                <span class="badge" :class="order.status === 'cancelled' ? 'red' : 'green'">
                  {{ order.status || 'pending' }}
                </span>
              </td>
              <td>
                <select
                  class="search-input"
                  :value="order.status || 'pending'"
                  :disabled="savingId === order.id"
                  @change="changeStatus(order, $event.target.value)"
                >
                  <option v-for="status in statuses" :key="status" :value="status">
                    {{ status }}
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </section>
</template>
