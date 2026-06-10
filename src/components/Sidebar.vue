<template>
  <div class="sidebar">

    <h2 class="logo">Admin Panel</h2>

    <router-link to="/products" class="link">
      Products
    </router-link>

    <router-link to="/add" class="link">
       Add Product
    </router-link>

  </div>
</template>

<style>
.sidebar {
  width: 220px;
  background: #0d47a1;
  color: white;
  padding: 20px;
}

.logo {
  margin-bottom: 20px;
  font-size: 18px;
}

.link {
  display: block;
  color: white;
  text-decoration: none;
  padding: 10px;
  margin: 5px 0;
  border-radius: 6px;
  transition: 0.2s;
}

.link:hover {
  background: rgba(255, 255, 255, 0.15);
}
</style>