<template>
    <div class="error-container">
        <h1 class="highlight">{{ error.statusCode }} {{ error.cause ? '- ' + error.cause : error.statusCode == 404 ? '- Page not found' : '' }}</h1>
        <p v-if="error.statusCode == 404" class="message">{{ page }}</p>
        <p v-else class="message">{{ error.message }}</p>
        <a href="/" class="home-btn">Home Page</a>
    </div>
</template>

<script setup>
const page = ref('')

onMounted(() => {
    page.value = window.location.pathname
})

const error = useError();

</script>


<style scoped>
.error-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
}

h1 {
    font-size: 4rem;
    margin: 0;
    margin: 0 20px;
}

.message {
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