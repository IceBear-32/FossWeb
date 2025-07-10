<style src="@/assets/css/global_defs.css"></style>
<template>
    <div class="main-container">
        <NavBar />
        <button @click="signInWithGoogle">Login</button>
        <div class="page-content">
            <NuxtPage :user-is-admin="userIsAdmin" :user-logged-in="userLoggedIn" />
        </div>
        <Footer />
    </div>
</template>


<style>
body {
    color: var(--color-text-primary);
    margin: 0;
    background-color: var(--color-counter-primary);
    font-family: var(--font-stack);
}

.main-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.page-content {
    flex: 1;
    background: radial-gradient(var(--color-counter-primary) 10%, var(--color-primary));
}

.highlight {
    color: var(--color-highlight);
}
</style>

<script setup>
import NavBar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'
const { $supabase } = useNuxtApp()
import { ref } from 'vue'

const signInWithGoogle = async () => {
  const { error } = await $supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin,
    }
  })

  if (error) console.error('OAuth error:', error.message)
}

const userIsAdmin = ref(false)
const userLoggedIn = ref(false)
</script>
