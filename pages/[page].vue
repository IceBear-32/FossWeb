<template>
    <div class="404-container">
        <Page404 :page="$route.href"/>
    </div>
</template>

<script setup>
import Page404 from '@/components/404.vue';
</script>