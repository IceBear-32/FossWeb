<template>
  <div class="contact-container">
    <form class="contact-card" @submit.prevent="submitForm">
        <h2 class="contact-card-title">Contact Us</h2>
        <input type="text" v-model="form.name" placeholder="Your name" required />
        <input type="email" v-model="form.email" placeholder="Your email" required />
        <input type="text" v-model="form.subject" placeholder="Subject" required />
        <textarea v-model="form.description" placeholder="Describe your issue" rows="5"></textarea>
        <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  description: ''
})

function submitForm() {
  alert(`Submitted:\n${JSON.stringify(form, null, 2)}`)
}
</script>

<style scoped>
.contact-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5.75rem;
}

.contact-card {
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: var(--color-primary);
  border: 1px solid var(--color-border-primary);
}

.contact-card-title {
  font-size: 24px;
  font-weight: bold;
  align-self: center;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

input,
textarea {
  padding: 8px;
  border-radius: 0.25rem;
  border: 1px solid var(--color-border-secondary, #ccc);
  background-color: var(--color-counter-secondary);
  color: var(--color-text-primary);
  transition: outline 0.3s ease, border 0.3s ease;
  font-family: var(--font-stack);
  font-size: 15px;
  font-weight: 500;
  border: solid 1px var(--color-border-primary);
  resize: none;
}

input::placeholder, textarea::placeholder {
  color: var(--color-text-primary);
  opacity: 0.5;
}

input:focus, textarea:focus, input:hover, textarea:hover {
  outline: solid 1px var(--color-highlight);
    transition: outline 0.3s ease, border 0.3s ease;
}

button {
  padding: 10px;
  margin-top: 1rem;
  background: var(--color-button-primary);
  color: var(--color-counter-primary);
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

button:hover {
  background: var(--color-highlight);
  color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-button-primary);
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}
</style>
