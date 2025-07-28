<template>
  <div class="admin-panel">
    <h2 class="title highlight">Admin Panel</h2>
    <div class="admin-grid">
      <RouterLink
        v-for="item in adminLinks"
        :key="item.path"
        :to="item.path"
        class="admin-card"
      >
        <div class="icon-wrapper">
          <i :class="item.icon" />
        </div>
        <span class="label">{{ item.label }}</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
const adminLinks = [
  { label: 'Edit Events', path: '/admin/events/edit', icon: 'bi bi-pencil-square' },
  { label: 'Add Event', path: '/admin/events/addevent', icon: 'bi bi-plus-circle' },
  { label: 'Event Gallery', path: '/eventgallery', icon: 'bi bi-images' },
  { label: 'Verify Registrations', path: '/admin/verify-registration', icon: 'bi bi-shield-check' },
  { label: 'Verified Registrations', path: '/admin/verified-registrations', icon: 'bi bi-patch-check-fill' },
];
</script>

<style scoped>
.admin-panel {
  padding: 2rem;
  min-height: 77.5vh;
  color: var(--color-text-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.admin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 900px;
}

.admin-card {
  backdrop-filter: blur(12px);
  background: var(--color-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  color: var(--color-text-primary);
  text-decoration: none;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 8px rgba(0, 255, 255, 0.05);
}

.admin-card::before {
  content: "";
  position: absolute;
  top: -30%;
  left: -30%;
  width: 160%;
  height: 160%;
  background: radial-gradient(circle, rgba(0, 180, 255, 0.08), transparent 70%);
  transform: rotate(25deg);
  pointer-events: none;
}

.admin-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 10px 24px rgba(16, 185, 129, 0.2);
  border-color: var(--color-divider);
}

.icon-wrapper {
  font-size: 2.4rem;
  margin-bottom: 1rem;
  color: var(--color-text-secondary);
  transition: all 0.3s ease;
}

.admin-card:hover .icon-wrapper {
    color: var(--color-highlight);
    filter: drop-shadow(0 0 8px var(--color-counter-secondary));
}

.label {
  font-weight: 500;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
}

@media (max-width: 600px) {
  .admin-card {
    padding: 1.5rem;
  }

  .icon-wrapper {
    font-size: 2rem;
  }

  .label {
    font-size: 1rem;
  }
}
</style>
