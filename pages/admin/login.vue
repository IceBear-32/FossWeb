<template>
    <div class="admin-container">
        <Credentials :show-sign-up="false" redir="/" />
    </div>
</template>

<script setup>
import Credentials from '@/components/credentials.vue';
</script>

<style scoped>
.admin-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 23.5vh 200px;
}
</style>