import { apiRequest } from './api'

export function getOrders() {
  return apiRequest('/api/orders')
}

export async function updateOrderStatus(id, status) {
  try {
    return await apiRequest(`/api/orders/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    })
  } catch (error) {
    return apiRequest(`/api/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    })
  }
}
