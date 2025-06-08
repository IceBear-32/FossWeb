<template>
    <div class="card">
        <p class="card-tag">{{ tag }}</p>
        <ul v-if="bulletlist" class="card-description card-item-list">
            <li v-for="(item, i) in description.split('\n')" :key="i" class="card-description">{{ item }}</li>
        </ul>
        <p v-else class="card-description">{{ description }}</p>
    </div>
</template>

<script setup>

import { computed } from 'vue';

const props = defineProps({
    tag: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bulletlist: {
        type: Boolean,
        required: false,
        default: false
    }
});

const processedDescription = computed(() => {
    if (props.bulletlist) {
        return '<ul class="card-item-list">' +
            props.description.split('\\n').map(item => `<li class="card-description">${item}</li>`).join('') +
            '</ul>';
    }
    return '<p class="card-description">' + props.description + '</p>';
});

</script>

<style scoped>
.card {
    background-color: var(--color-primary);
    border-radius: 0.5rem;
    border: 1px solid var(--color-border-primary);
    display: flex;
    padding: 1rem;
    flex-direction: column;
    gap: 0.75rem;
    font-size: 16px;
    width: auto;
}

.card-tag {
    color: var(--color-highlight);
    margin: 0;
    font-weight: 600;
    font-size: 12px;
}

.card-description {
    line-height: 1.3;
    margin: 0;
    font-weight: 600;
    letter-spacing: -0.04rem;
}

.card-item-list {
    padding-left: 1rem;
}
</style>