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
    padding: 21.5vh 200px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>