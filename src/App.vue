<template>
  <div class="admin-shell">
    <Sidebar />

    <main class="main-content">
      <NavBar />
      <router-view />
    </main>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Sidebar from './components/Sidebar.vue'
</script>

<style>
* {
  box-sizing: border-box;
}

:root {
  --bg: #f6f7fb;
  --surface: #ffffff;
  --surface-muted: #f0f3f7;
  --text: #17202a;
  --text-muted: #64748b;
  --line: #dfe5ee;
  --brand: #2454d6;
  --brand-dark: #183b96;
  --green: #12805c;
  --amber: #b7791f;
  --red: #c2413a;
  --ink: #101828;
  --shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  color: var(--text);
  background: var(--bg);
}

body {
  margin: 0;
  min-width: 320px;
  background: var(--bg);
}

button,
input,
textarea,
select {
  font: inherit;
}

button {
  border: 0;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.62;
}

.admin-shell {
  display: flex;
  min-height: 100vh;
  background:
    linear-gradient(180deg, rgba(36, 84, 214, 0.07), rgba(36, 84, 214, 0) 260px),
    var(--bg);
}

.main-content {
  flex: 1;
  min-width: 0;
  padding: 28px;
}

.page {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.page-header {
  align-items: flex-start;
  display: flex;
  gap: 16px;
  justify-content: space-between;
}

.eyebrow {
  color: var(--brand);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.08em;
  margin: 0 0 6px;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin: 0;
}

h1 {
  color: var(--ink);
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  letter-spacing: 0;
  line-height: 1;
}

h2 {
  color: var(--ink);
  font-size: 21px;
  letter-spacing: 0;
}

h3 {
  color: var(--ink);
  font-size: 15px;
  letter-spacing: 0;
}

.muted {
  color: var(--text-muted);
}

.toolbar {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.button {
  align-items: center;
  background: var(--brand);
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-weight: 750;
  gap: 8px;
  justify-content: center;
  min-height: 40px;
  padding: 10px 14px;
  text-decoration: none;
  transition:
    background 0.18s ease,
    transform 0.18s ease;
}

.button:hover {
  background: var(--brand-dark);
  transform: translateY(-1px);
}

.button.secondary {
  background: var(--surface);
  border: 1px solid var(--line);
  color: var(--ink);
}

.button.secondary:hover {
  background: var(--surface-muted);
}

.button.danger {
  background: #fff0ee;
  border: 1px solid #ffd2cd;
  color: var(--red);
}

.button.danger:hover {
  background: #ffe2df;
}

.button.warning {
  background: #fff7e8;
  border: 1px solid #ffe1ad;
  color: #8a5a12;
}

.button.warning:hover {
  background: #ffedcc;
}

.icon-button {
  min-width: 40px;
  padding-inline: 12px;
}

.grid {
  display: grid;
  gap: 16px;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(160px, 1fr));
}

.two-col {
  grid-template-columns: minmax(0, 1.4fr) minmax(280px, 0.8fr);
}

.panel {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: var(--shadow);
  overflow: hidden;
}

.panel-header {
  align-items: center;
  border-bottom: 1px solid var(--line);
  display: flex;
  gap: 12px;
  justify-content: space-between;
  padding: 18px;
}

.panel-body {
  padding: 18px;
}

.stat-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  box-shadow: var(--shadow);
  min-height: 128px;
  padding: 18px;
}

.stat-top {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.stat-icon {
  align-items: center;
  background: #eef3ff;
  border-radius: 8px;
  color: var(--brand);
  display: inline-flex;
  font-size: 13px;
  font-weight: 900;
  height: 36px;
  justify-content: center;
  width: 36px;
}

.stat-value {
  color: var(--ink);
  font-size: 30px;
  font-weight: 850;
  line-height: 1.1;
  margin-top: 18px;
}

.stat-label {
  color: var(--text-muted);
  font-size: 13px;
  margin-top: 4px;
}

.table-wrap {
  overflow-x: auto;
}

.data-table {
  border-collapse: collapse;
  min-width: 760px;
  width: 100%;
}

.data-table th {
  background: #f8fafc;
  color: #475569;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 13px 16px;
  text-align: left;
  text-transform: uppercase;
}

.data-table td {
  border-top: 1px solid var(--line);
  padding: 14px 16px;
  vertical-align: middle;
}

.product-cell {
  align-items: center;
  display: flex;
  gap: 12px;
  min-width: 260px;
}

.product-thumb {
  background: #e9edf5;
  border: 1px solid var(--line);
  border-radius: 8px;
  flex: 0 0 auto;
  height: 54px;
  object-fit: cover;
  width: 54px;
}

.thumb-fallback {
  align-items: center;
  color: #718096;
  display: flex;
  font-weight: 800;
  justify-content: center;
}

.row-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.badge {
  align-items: center;
  background: #eef3ff;
  border-radius: 999px;
  color: var(--brand-dark);
  display: inline-flex;
  font-size: 12px;
  font-weight: 800;
  min-height: 26px;
  padding: 4px 10px;
}

.badge.green {
  background: #e8f6ef;
  color: var(--green);
}

.badge.amber {
  background: #fff6df;
  color: var(--amber);
}

.badge.red {
  background: #fff0ee;
  color: var(--red);
}

.field-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.field-grid.three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.field,
.check-field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.field label,
.check-field label {
  color: #334155;
  font-size: 13px;
  font-weight: 750;
}

.field input,
.field textarea,
.field select,
.search-input {
  background: #fff;
  border: 1px solid #cfd8e3;
  border-radius: 8px;
  color: var(--ink);
  min-height: 42px;
  outline: none;
  padding: 10px 12px;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;
}

.field textarea {
  min-height: 116px;
  resize: vertical;
}

.field input:focus,
.field textarea:focus,
.field select:focus,
.search-input:focus {
  border-color: var(--brand);
  box-shadow: 0 0 0 3px rgba(36, 84, 214, 0.14);
}

.check-field {
  align-items: center;
  background: #f8fafc;
  border: 1px solid var(--line);
  border-radius: 8px;
  flex-direction: row;
  padding: 12px;
}

.check-field input {
  height: 18px;
  width: 18px;
}

.form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 18px;
}

.notice {
  border-radius: 8px;
  font-weight: 700;
  padding: 12px 14px;
}

.notice.success {
  background: #e8f6ef;
  color: var(--green);
}

.notice.error {
  background: #fff0ee;
  color: var(--red);
}

.empty-state {
  align-items: center;
  color: var(--text-muted);
  display: flex;
  justify-content: center;
  min-height: 180px;
  padding: 24px;
  text-align: center;
}

.drawer-overlay {
  background: rgba(15, 23, 42, 0.42);
  display: flex;
  inset: 0;
  justify-content: flex-end;
  position: fixed;
  z-index: 30;
}

.drawer {
  background: var(--surface);
  box-shadow: -24px 0 50px rgba(15, 23, 42, 0.2);
  display: flex;
  flex-direction: column;
  gap: 18px;
  height: 100%;
  max-width: 520px;
  overflow-y: auto;
  padding: 24px;
  width: min(100%, 520px);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-row {
  align-items: center;
  border: 1px solid var(--line);
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  padding: 12px;
}

.progress-track {
  background: #e8edf5;
  border-radius: 999px;
  height: 8px;
  overflow: hidden;
}

.progress-bar {
  background: var(--brand);
  height: 100%;
}

@media (max-width: 980px) {
  .admin-shell {
    flex-direction: column;
  }

  .main-content {
    padding: 18px;
  }

  .stats-grid,
  .two-col,
  .field-grid,
  .field-grid.three {
    grid-template-columns: 1fr;
  }

  .page-header {
    flex-direction: column;
  }
}

@media (max-width: 640px) {
  .main-content {
    padding: 14px;
  }

  .toolbar,
  .form-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .button,
  .search-input {
    width: 100%;
  }
}
</style>
