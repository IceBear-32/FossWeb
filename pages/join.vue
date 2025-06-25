<template>
    <div class="login-form-container">
        <Credentials redir="/"/>
    </div>
</template>

<script setup>
import Credentials from '@/components/credentials.vue'
</script>

<style scoped>
.login-form-container {
    height: 89vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>