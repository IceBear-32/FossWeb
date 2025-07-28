<template>
  <div class="registration-form-container">
    <div class="form-container">
      <h2 v-if="!submitted" class="highlight">Event Registration</h2>
      <template v-if="events.length > 0">
      <div v-if="!submitted">
        <form @submit.prevent="register">
          <select v-model="selectedEvent">
            <option v-for="event in events" :key="event.title" :value="event">
              {{ event.title }}
            </option>
          </select>

          <input v-model="userName" type="text" placeholder="Name" required />
          <input v-model="regNo" type="text" placeholder="Register Number" required />
          <input v-model="Class" type="text" placeholder="Class (Dept-Sec, Year)" required />
          <input v-model="email" type="email" placeholder="Email" required />

          <button type="submit" class="submit-btn">Register</button>
        </form>
      </div>

      <div v-else class="registered-info-container">
        <h2 class="highlight">Registration Successful!</h2>
        <p><strong>Name:</strong> {{ userName }}</p>
        <p><strong>Reg No:</strong> {{ regNo }}</p>
        <p><strong>Class:</strong> {{ Class }}</p>
        <p><strong>Email:</strong> {{ email }}</p>
        <p><strong>Event:</strong> {{ selectedEvent.title }}</p>

        <div class="event-details">
          <p><i class="bi bi-calendar"></i> {{ selectedEvent.date }}</p>
        </div>

        <div class="qr-code">
          <qrcode-vue :value="qrContent" :size="160" :level="'H'" :margin="3" />
        </div>

        <!--<p class="event-footer">Details have been sent to your email.</p>-->
      </div>
    </template>
      <p v-else class="event-footer">There are no upcoming events right now, stay tuned!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import QrcodeVue from 'qrcode.vue'

const events = ref([])

$fetch('/api/events/events', {
  headers: { from: 'upcoming' },
  onResponse(res) {
    if (res.response._data.events) events.value = res.response._data.events
  }
}).catch();

const auth = useAuth()

const selectedEvent = computed(() => events.value[0])
const userName = computed(() => auth.userLoggedIn.value ? auth.userProfile.value.username : '')
const regNo = ref('')
const email = computed(() => auth.userLoggedIn.value ? auth.userProfile.value.email : '')
const Class = ref('')
const submitted = ref(false)

// JSON string as QR content
const qrContent = computed(() => {
  return JSON.stringify({
    name: userName.value,
    regNo: regNo.value,
    class: Class.value,
    email: email.value,
    event: selectedEvent.value.title,
  })
})

function register() {
  submitted.value = true
}
</script>

<style scoped>
.registration-form-container {
  padding: 19vh 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  background: var(--color-primary);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  width: 320px;
}

.form-container h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.form-container form {
  display: flex;
  flex-direction: column;
}

.form-container input,
.form-container select {
  padding: 8px;
  margin: 8px 0;
  border-radius: 4px;
  background-color: var(--color-counter-secondary);
  color: var(--color-text-primary);
  font-size: 15px;
  font-weight: 500;
  border: solid 1px var(--color-border-primary);
  transition: border 0.3s ease, outline 0.3s ease;
}

.form-container input:focus,
.form-container select:focus {
  outline: solid 1px var(--color-highlight);
}

.form-container input::placeholder,
.form-container select::placeholder {
  color: var(--color-text-primary);
  opacity: 0.5;
} 

.submit-btn {
  padding: 10px;
  margin-top: 1rem;
  background: var(--color-button-primary);
  color: var(--color-counter-primary);
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
}

.submit-btn:hover {
  background: var(--color-highlight);
  color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-button-primary);
  transition: background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
}

.event-details {
  margin-top: 1rem;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-text-primary);
}

.qr-code {
  display: flex;
  justify-content: center;
}


.registered-info-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.registered-info-container p {
  margin: 0;
}

.event-details {
  color: var(--color-text-secondary);
}

.event-footer {
  color: var(--color-text-secondary);
  font-size: 12px;
  text-align: center;
}

@media (max-width: 1150px) {
  .registration-form-container {
    padding: 15vh 150px;
  }
}

@media (max-width: 900px) {
  .registration-form-container {
    padding: 10vh 100px;
  }
}

@media (max-width: 700px) {
  .registration-form-container {
    padding: 10vh 50px;
  }
  .form-container {
    width: 280px;
  }
}

@media (max-width: 500px) {
  .registration-form-container {
    padding: 8vh 20px;
  }
  .form-container {
    width: 100%;
    padding: 1.5rem;
  }
  .submit-btn {
    font-size: 14px;
    padding: 8px;
  }
  .form-container input,
  .form-container select {
    font-size: 14px;
    padding: 6px;
  }
}

</style>
