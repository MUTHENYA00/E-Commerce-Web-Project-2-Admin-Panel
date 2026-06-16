<template>
  <article class="stat-card">
    <div class="stat-top">
      <span class="badge" :class="tone">{{ trend }}</span>
      <span class="stat-icon">{{ icon }}</span>
    </div>
    <div class="stat-value">{{ value }}</div>
    <div class="stat-label">{{ label }}</div>
  </article>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: '#'
  },
  label: {
    type: String,
    required: true
  },
  trend: {
    type: String,
    default: 'Live'
  },
  tone: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number],
    required: true
  }
})
</script>
