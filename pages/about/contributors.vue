<template>
    <div class="container">
        <h2 class="message highlight">We're not open for contributions yet. Stay tuned!</h2>
    </div>
</template>

<style scoped>
.container {
    max-width: 400px;
    margin: 95px auto;
    background: var(--color-primary);
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
}

.message {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.5rem;
}


@media (max-width: 600px) {
    .container {
        max-width: 100%;
        margin: 95px 50px;
    }
}
</style>