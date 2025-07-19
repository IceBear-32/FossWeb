<template>
    <div class="container-404">
    <h1 class="highlight">404 - Page Not Found</h1>
    <p class="sub-dir">{{ page }}</p>
    <a href="/" class="home-btn">Home Page</a>
    </div>
</template>

<script setup>
const props = defineProps({
    page: {
        type: String,
        required: true
    }
});
</script>

<style scoped>
.container-404 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

h1 {
    font-size: 4rem;
    margin: 0;
}

.sub-dir {
    color: var(--color-text-secondary);
    font-size: 2rem;
    font-weight: 500;
    margin: 0.5rem 0 1rem;
}

.home-btn {
    border-radius: 0.5rem;
    padding: 16px;
    font-size: 20px;
    text-decoration: none;
    color: var(--color-highlight);
    background-color: var(--color-primary);
    border: none;
    cursor: pointer;
    font-weight: 600;
    text-align: center;
    box-shadow: 0 0 0 1px var(--color-button-primary);
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.home-btn:hover {
    background-color: var(--color-highlight);
    color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-button-primary);
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}
</style>