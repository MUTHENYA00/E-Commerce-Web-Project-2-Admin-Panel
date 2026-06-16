<script setup>
import logo from "../assets/Bmday_logo.png"
</script>


<template>
  <aside class="sidebar">
 <router-link to="/dashboard" class="brand">
   <img :src="logo" class="brand-logo" />

  <span>
    <strong>E-Commerce</strong>
    <small>Admin Panel</small>
  </span>
</router-link>

    <nav class="nav-links" aria-label="Admin navigation">
      <router-link to="/dashboard" class="nav-link">
        <span class="nav-icon">D</span>
        Dashboard
      </router-link>
      <router-link to="/products" class="nav-link">
        <span class="nav-icon">P</span>
        Products
      </router-link>
      <router-link to="/add" class="nav-link">
        <span class="nav-icon">+</span>
        Add Product
      </router-link>
      <router-link to="/orders" class="nav-link">
        <span class="nav-icon">O</span>
        Orders
      </router-link>
      <router-link to="/categories" class="nav-link">
        <span class="nav-icon">C</span>
        Categories
      </router-link>
    </nav>

  
  </aside>
</template>

<style>
.sidebar {
  background: #0a7b7b;
  color: #fff;
  display: flex;
  flex: 0 0 268px;
  flex-direction: column;
  gap: 28px;
  min-height: 100vh;
  padding: 22px 18px;
}

.brand {
  align-items: center;
  color: #fff;
  display: flex;
  gap: 12px;
  padding: 8px;
  text-decoration: none;
}

.brand-logo {
  align-items: center;
  background: none;
border-radius: none;
  color: #111827;
  display: inline-flex;
  font-size: 20px;
  font-weight: 900;
  height: 100px;
  justify-content: center;
  width: 100px;
}

.brand strong,
.brand small {
  display: block;
}

.brand strong {
  font-size: 16px;
}

.brand small {
  color: #aeb8c8;
  font-size: 12px;
  margin-top: 2px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.nav-link {
  align-items: center;
  border-radius: 8px;
  color: #d7deea;
  display: flex;
  font-weight: 750;
  gap: 10px;
  min-height: 44px;
  padding: 10px 12px;
  text-decoration: none;
  transition:
    background 0.18s ease,
    color 0.18s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  background: #253044;
  color: #fff;
}

.nav-icon {
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #fff;
  display: inline-flex;
  font-size: 12px;
  font-weight: 900;
  height: 28px;
  justify-content: center;
  width: 28px;
}

.sidebar-footer {
  border-top: 1px solid rgba(255, 255, 255, 0.11);
  color: #aeb8c8;
  font-size: 13px;
  margin-top: auto;
  padding: 18px 8px 4px;
}

.sidebar-footer p {
  margin-top: 10px;
}

@media (max-width: 980px) {
  .sidebar {
    flex: none;
    min-height: 0;
  }

  .nav-links {
    flex-direction: row;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  .nav-link {
    flex: 0 0 auto;
  }

  .sidebar-footer {
    display: none;
  }
}
</style>
