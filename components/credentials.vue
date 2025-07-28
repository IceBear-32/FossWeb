<template>
  <div class="auth-container">
    <button v-if="showCloseBtn" class="close-btn" @click="$emit('close')" aria-label="Close">
      &times;
    </button>

    <h2 class="highlight">{{ isSignUp ? 'Sign Up' : 'Sign In' }}</h2>

    <p class="error-message" v-if="credsError"><i class="bi bi-exclamation-triangle"></i> {{ credsError }}</p>
    <p class="sign-up-success" v-if="signUpSuccess">Sign-up success</p>

    <form @submit.prevent="handleSubmit">
      <input v-if="isSignUp" v-model="form.name" type="text" placeholder="Name" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-if="isSignUp" v-model="form.phone" type="tel" placeholder="Phone (optional)" />
      <input v-model="form.password" type="password" placeholder="Password" required />

      <div class="remember-me" v-if="!isSignUp">
        <!--<input v-model="form.remember" type="checkbox" id="remember" />
        <label for="remember" class="remember-label">Remember me</label>-->
      </div>

      <button type="submit" class="auth-btn">{{ isSignUp ? 'Register' : 'Login' }}</button>
    </form>

    <div v-if="showSignUp" class="toggle-link" @click="toggleForm">
      {{ isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up" }}
    </div>

    <div class="provider-auth-divider">
      <p class="provider-auth-divider-dummy">'</p>
    </div>

    <div class="provider-auth">
      <button class="google-auth" @click="signInWithGoogle"><i class="bi bi-google google-icon"></i> Sign {{ isSignUp ?
        "Up" : "In" }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const { $supabase } = useNuxtApp()

const props = defineProps({
  redir: {
    type: String,
    required: false
  },
  showCloseBtn: {
    type: Boolean,
    default: false,
    required: false
  },
  showSignUp: {
    type: Boolean,
    default: true,
    required: false
  }
})

const isSignUp = ref(false)
const signUpSuccess = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: null,
  password: '',
  remember: false,
})

const credsError = ref('')

const toggleForm = () => {
  isSignUp.value = !isSignUp.value
  credsError.value = ''
}

const handleSubmit = async () => {
  credsError.value = ''
  signUpSuccess.value = false
  if (isSignUp.value) {
    await $fetch('/api/auth/signup', {
      method: 'POST',
      body: { email: form.value.email, password: form.value.password, name: form.value.name, phone: form.value.phone },
      onResponseError: (error => {
        error.response._data.error ? credsError.value = error.response._data.error : credsError.value = 'Sign up failed'
      }),
      onResponse: (data => {
        if (data.response._data.user) {
          credsError.value = ''
          signUpSuccess.value = true
          form.value.name = ''
          form.value.email = ''
          form.value.phone = null
          form.value.password = ''
          isSignUp.value = false

          if (props.redir) window.location.href = props.redir
        } else {
          credsError.value = 'Sign up failed'
        }
      })
    })

  } else {
      await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: form.value.email, password: form.value.password, remember: form.value.remember },
      onResponseError: (error => {
        error.response._data.error ? credsError.value = error.response._data.error : credsError.value = 'Login failed'
      }),
      onResponse: (data => {
        if (data.response._data.user) {
          credsError.value = ''
          if (props.redir) window.location.href = props.redir
        } else {
          credsError.value = 'Login failed'
        }
      })
      })
  }

}

const signInWithGoogle = async () => {
  credsError.value = ''
  await $fetch('/api/auth/oauth', {
    method: 'POST',
    body: { provider: 'google', redirect: window.location.origin + '/api/auth/callback?redirect='+ encodeURIComponent(window.location.origin + props.redir || '/') },
    onResponseError: (error => {
      error.response._data.error ? credsError.value = error.response._data.error : credsError.value = 'OAuth failed'
    }),
    onResponse: (data => {
      if (data.response._data.url) {
        window.location.href = data.response._data.url
      } else {
        credsError.value = 'OAuth failed'
      }
    }
    )
  })
}
</script>

<style scoped>
.auth-container {
  position: relative;
  background: var(--color-primary);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
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

.auth-container input:focus,
.auth-container input:hover {
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
  font-size: 14px;
  font-weight: 500;
  border: solid 1px var(--color-border-primary);
  transition: border 0.3s ease, outline 0.3s ease;
}

.auth-btn {
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

.auth-btn:hover {
  background: var(--color-highlight);
  color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-button-primary);
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.toggle-link {
  margin-top: 1rem;
  text-align: center;
  color: var(--color-text-secondary);
  text-decoration: underline;
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
  transition: all 0.3s ease;
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

.provider-auth-divider {
  text-align: center;
  font-size: 12px;
  color: var(--color-text-secondary);
  position: relative;
}

.provider-auth-divider::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  padding: 1px;
  background: var(--color-text-secondary);
  z-index: 0;
}

.provider-auth-divider::after {
  content: 'Or authenticate with';
  position: absolute;
  left: calc(50% - 4rem);
  top: 0;
  padding: 0 0.5rem;
  z-index: 1;
  background-color: var(--color-primary);
}

.provider-auth-divider-dummy {
  opacity: 0;
}

.provider-auth {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
}

.google-auth {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 14px;
  color: var(--color-text-secondary);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border-primary);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: box-shadow 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
}

.google-auth:hover {
  background-color: rgba(0, 191, 255, 0.1);
  border-color: var(--color-highlight);
  color: var(--color-highlight);
  box-shadow: 0 0 8px var(--color-highlight);
}

.google-icon {
  font-size: 16px;
  vertical-align: middle;
}

.error-message {
  background-color: rgba(255, 0, 0, 0.2);
  margin-top: 0.5rem;
  font-weight: 500;
  font-size: 14px;
  border: 2px solid rgb(255, 69, 69);
  color: rgb(255, 215, 215);
  padding: 3px 0.5rem;
  border-radius: 0.5rem;
  margin: 0;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  transition: all 0.3s ease;
}

.sign-up-success {
  background-color: rgba(0, 255, 0, 0.2);
  color: rgb(60, 255, 60);
  border: 2px solid rgb(0, 128, 0);
  font-weight: 500;
  font-size: 14px;
  padding: 3px 0.5rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
}

@media (max-width: 1150px) {
  .auth-container {
    margin: 2rem auto;
  }
}

@media (max-width: 900px) {
  .auth-container {
    margin: 2rem auto;
  }
}

@media (max-width: 700px) {
  .auth-container {
    width: 260px;
    padding: 1.5rem;
  }

  .auth-container h2 {
    font-size: 1.3rem;
  }
}

@media (max-width: 500px) {
  .auth-container {
    width: 240px;
    padding: 1.2rem;
  }

  .auth-container h2 {
    font-size: 1.2rem;
  }

  .auth-container input[type="text"],
  .auth-container input[type="email"],
  .auth-container input[type="password"],
  .auth-container input[type="tel"] {
    font-size: 14px;
    padding: 7px;
  }

  .auth-container .submit-btn {
    padding: 8px;
  }
}
</style>
