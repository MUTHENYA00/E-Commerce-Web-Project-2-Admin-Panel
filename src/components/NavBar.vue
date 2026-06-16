<template>
  <header class="topbar">
    <div class="topbar-title">
      <p class="eyebrow">Control Center</p>
      <h2>{{ title }}</h2>
    </div>

    <div class="topbar-actions">
      <label class="topbar-search" aria-label="Search">
        <span>Search</span>
        <input
          :value="search"
          type="search"
          placeholder="Products, orders, categories"
          @input="$emit('update:search', $event.target.value)"
        />
      </label>

      <router-link to="/add" class="button">+ Add Product</router-link>
    </div>
  </header>
</template>

<script setup>
defineProps({
  search: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: 'Admin Panel'
  }
})

defineEmits(['update:search'])
</script>

<style scoped>
.topbar {
  align-items: center;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: var(--shadow);
  display: flex;
  gap: 16px;
  justify-content: space-between;
  margin-bottom: 22px;
  padding: 16px 18px;
}

.topbar-title {
  min-width: 180px;
}

.topbar-title h2 {
  font-size: 20px;
}

.topbar-actions {
  align-items: center;
  display: flex;
  flex: 1;
  gap: 10px;
  justify-content: flex-end;
}

.topbar-search {
  align-items: center;
  background: #f8fafc;
  border: 1px solid var(--line);
  border-radius: 8px;
  display: flex;
  flex: 1;
  gap: 10px;
  max-width: 520px;
  min-height: 42px;
  padding: 0 12px;
}

.topbar-search span {
  color: var(--text-muted);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.topbar-search input {
  background: transparent;
  border: 0;
  color: var(--ink);
  flex: 1;
  min-width: 120px;
  outline: none;
}

@media (max-width: 760px) {
  .topbar,
  .topbar-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .topbar-search,
  .topbar-actions .button {
    max-width: none;
    width: 100%;
  }
}
</style>
