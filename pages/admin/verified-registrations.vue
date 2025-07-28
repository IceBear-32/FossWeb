<template>
  <div class="page-container">
    <h2 class="highlight">Verified Registrations</h2>

    <div class="regs-list">
      <div
        v-for="(reg, index) in data?.registrations || []"
        :key="index"
        class="reg-card"
      >
        <p><span class="label">Event:</span> {{ reg.title }}</p>
        <p><span class="label">Registration No:</span> {{ reg['p-reg-no'] }}</p>
        <p><span class="label">Name:</span> {{ reg['p-name'] }}</p>
        <p><span class="label">Class:</span> {{ reg['p-class'] }}</p>
      </div>
    </div>

    <p v-if="!data?.registrations?.length" class="empty-msg">
      No registrations found.
    </p>
  </div>
</template>

<script setup>
const { data, error } = await useFetch('/api/events/getverifiedregs');

if (error.value) {
  console.error('Failed to fetch verified registrations:', error.value)
}
</script>

<style scoped>
.page-container {
  max-width: 600px;
  margin: 60px auto;
  padding: 2rem;
  background-color: var(--color-primary);
  border-radius: 1.5rem;
  border: 1px solid var(--color-border-primary);
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
}

h2 {
    text-align: center;
    margin: 0 0 1.5rem;
}

.regs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reg-card {
  background-color: var(--color-counter-primary);
  border: 1px solid var(--color-border-primary);
  padding: 1rem 1.25rem;
  border-radius: 1rem;
  transition: background-color 0.2s ease;
}

p {
  margin: 0.3rem 0;
  color: var(--color-text-primary);
  font-size: 0.95rem;
  font-weight: 500;
}

.label {
  font-weight: 500;
  color: var(--color-text-secondary);
  margin-right: 0.3rem;
}

.empty-msg {
  text-align: center;
  color: var(--color-text-secondary);
  margin-top: 2rem;
}
</style>
