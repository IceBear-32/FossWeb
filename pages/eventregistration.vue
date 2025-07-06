<template>
  <div class="registration-container">
    <!-- Registration Form -->
    <div v-if="!submitted">
      <h1>Event Registration</h1>
      <form @submit.prevent="register">
        <label>Select Event:</label>
        <select v-model="selectedEvent">
          <option v-for="event in events" :key="event.name" :value="event">
            {{ event.name }}
          </option>
        </select>

        <label>Name:</label>
        <input v-model="userName" type="text" required placeholder="Enter your name" />

        <label>Register Number:</label>
        <input v-model="regNo" type="text" required placeholder="Enter register number" />

        <label>Email:</label>
        <input v-model="email" type="email" required placeholder="Enter email" />

        <button type="submit">Register</button>
      </form>
    </div>

    <!-- Confirmation + QR Code -->
    <div v-else>
      <h2>Registration Successful!</h2>
      <p>Details have been sent to your email.</p>
      <p><strong>Name:</strong> {{ userName }}</p>
      <p><strong>Register Number:</strong> {{ regNo }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
      <p><strong>Event:</strong> {{ selectedEvent.name }}</p>

      <div class="event-details">
        <p><strong>Date:</strong> {{ selectedEvent.date }}</p>
        <p><strong>Description:</strong> {{ selectedEvent.description }}</p>
        <p v-if="selectedEvent.note"><strong>Note:</strong> {{ selectedEvent.note }}</p>
      </div>

      <div class="qr-code">
        <qrcode-vue :value="qrContent" :size="200" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import QrcodeVue from 'qrcode.vue'

const events = ref([
  {
    name: 'Git',
    date: '2025-07-01',
    description: 'Version control workshop',
    note: 'Bring your laptop'
  },
  {
    name: 'IOT Initiative',
    date: '2025-07-10',
    description: 'Intro to IoT and project ideas',
    note: ''
  }
])

const selectedEvent = ref(events.value[0])
const userName = ref('')
const regNo = ref('')
const email = ref('')
const submitted = ref(false)

function register() {
  submitted.value = true
}

const qrContent = computed(() => {
  const e = selectedEvent.value
  return `Event: ${e.name}\nDate: ${e.date}\nDescription: ${e.description}\n${e.note ? `Note: ${e.note}` : ''}`
})
</script>

<style scoped>
.registration-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  font-family: sans-serif;
}
form input, select, button {
  display: block;
  margin: 10px 0;
  padding: 8px;
  width: 100%;
}
button {
  cursor: pointer;
}
.event-details {
  text-align: left;
  margin: 20px auto;
}
.qr-code {
  margin-top: 20px;
}
</style>
