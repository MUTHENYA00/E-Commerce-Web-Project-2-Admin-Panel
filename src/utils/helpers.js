export function getProductName(product) {
  return product?.product_name || product?.name || 'Untitled product'
}

export function getProductImage(product) {
  return product?.image_path || product?.image_url || product?.image || product?.photo || ''
}

export function getOrderTotal(order) {
  if (typeof order?.total === 'number') return order.total
  if (typeof order?.amount === 'number') return order.amount
  if (!Array.isArray(order?.items)) return 0

  return order.items.reduce((sum, item) => {
    const price = Number(item.price || item.product?.price || 0)
    const quantity = Number(item.quantity || 1)
    return sum + price * quantity
  }, 0)
}

export function getCategoryList(products) {
  return [...new Set(products.map((product) => product.category).filter(Boolean))].sort()
}
