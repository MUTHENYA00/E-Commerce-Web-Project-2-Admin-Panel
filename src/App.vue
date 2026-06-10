<template>
  <div class="layout">
    <Sidebar />

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
</script>

<style>
.layout {
  display: flex;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background: #f4f6f9;
}
button {
  background: #0d47a1;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #1565c0;
}
/* MAIN CONTENT AREA */
.content {
  flex: 1;
  padding: 25px;
  background: #f4f6f9;
}
</style>