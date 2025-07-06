<template>
    <h1 class="highlight">404 - Page Not Found</h1>
    <p>{{ page }}</p>
</template>

<script setup>
const props = defineProps({
    page: {
        type: String,
        required: true
    }
});
</script>