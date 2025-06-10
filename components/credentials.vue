<template>
  <div class="auth-container">
    <!-- Close button, shown only if showCloseBtn is true -->
    <button
      v-if="showCloseBtn"
      class="close-btn"
      @click="$emit('close')"
      aria-label="Close"
    >
    &times;
    </button>

    <h2>{{ isSignUp ? 'Sign Up' : 'Sign In' }}</h2>

    <form @submit.prevent="handleSubmit">
      <input v-if="isSignUp" v-model="form.name" type="text" placeholder="Name" />
      <input v-model="form.email" type="email" placeholder="Email" />
      <input v-if="isSignUp" v-model="form.phone" type="tel" placeholder="Phone" />
      <input v-model="form.password" type="password" placeholder="Password" />

      <div class="remember-me" v-if="!isSignUp">
        <input v-model="form.remember" type="checkbox" id="remember" />
        <label for="remember" class="remember-label">Remember me</label>
      </div>

      <button type="submit" class="submit-btn">{{ isSignUp ? 'Register' : 'Login' }}</button>
    </form>

    <div class="toggle-link" @click="toggleForm">
      {{ isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up" }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  redir: {
    type: String,
    required: false,
  },
  showCloseBtn: {
    type: Boolean,
    default: false,
  },
})

const isSignUp = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  remember: false,
})

const toggleForm = () => {
  isSignUp.value = !isSignUp.value
}

const handleSubmit = () => {
  if (isSignUp.value) {
    alert('Signing Up...')
  } else {
    alert('Signing In...')
  }

  if (props.redir) window.location.href = props.redir
}
</script>

<style scoped>
.auth-container {
    position: relative;
  background: var(--color-primary);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  width: 300px;
  margin: auto;
}

.auth-container h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.auth-container form {
  display: flex;
  flex-direction: column;
}

.auth-container input::placeholder {
  color: var(--color-text-primary);
  opacity: 0.5;
}

.auth-container input:focus, .auth-container input:hover {
    outline: solid 1px var(--color-highlight);
    transition: outline 0.3s ease, border 0.3s ease;
}

.auth-container input[type="text"],
.auth-container input[type="email"],
.auth-container input[type="password"],
.auth-container input[type="tel"] {
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

.auth-container .submit-btn {
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

.auth-container .submit-btn:hover {
  background: var(--color-highlight);
  color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-button-primary);
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.auth-container .toggle-link {
  margin-top: 1rem;
  text-align: center;
  color: var(--color-text-secondary);
  cursor: pointer;
  font-size: 0.9rem;
}

.remember-me {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  font-size: 0.9rem;
}

.remember-me input {
  margin-right: 6px;
}

.remember-label {
  color: var(--color-text-primary);
  cursor: pointer;
}

.auth-container input[type="checkbox"] {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-border-primary);
  border-radius: 4px;
  background-color: var(--color-counter-primary);
  cursor: pointer;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
  outline: none;
}

.auth-container input[type="checkbox"]:checked {
  background-color: var(--color-button-primary);
  border-color: var(--color-counter-primary);
  outline: none;
}

.auth-container input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 10px;
  left: 3px;
  top: 0px;
  font-weight: bold;
}

.close-btn {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  color: var(--color-counter-primary);
  background-color: var(--color-button-primary);
  cursor: pointer;
  font-weight: bold;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.close-btn:hover {
  background-color: var(--color-highlight);
  color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-button-primary);
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

</style>
