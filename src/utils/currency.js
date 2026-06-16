const formatter = new Intl.NumberFormat('en-KE', {
  style: 'currency',
  currency: 'KES',
  maximumFractionDigits: 0
})

export function formatCurrency(value) {
  return formatter.format(Number(value || 0))
}
