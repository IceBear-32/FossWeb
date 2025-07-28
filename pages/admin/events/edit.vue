<template>
    <div class="edit-events-container">
        <div class="edit-events-section">
            <div class="edit-events-content">
                <div class="edit-events-title-container">
                    <p class="edit-events-content-title highlight">EDIT EVENTS</p>
                </div>
                <div class="event-items-container">
                    <div v-for="(event, index) in pastEvents" :key="index" class="event-item-outer">
                        <div class="event-item-inner" :style="event.images.thumbnail
                            ? { backgroundImage: `url('/api/storage/fetch?path=${event.images.thumbnail}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
                            : { backgroundColor: 'var(--color-counter-secondary)' }" @click="redirectToEdit(event.id)">
                            <i v-if="event.images.gallery.length > 0" class="bi gallery-images-icon"
                                :class="event.images.gallery.length > 1 ? `bi-images` : `bi-image`"></i>
                            <p v-if="event.images.gallery.length > 1" class="gallery-images-count">{{
                                event.images.gallery.length <= 9 ? event.images.gallery.length : "9+" }}</p>
                                    <p class="gallery-placeholder-text highlight" v-if="!event.images.thumbnail">
                                        {{ "No thumbnail available" }}
                                    </p>
                                    <div class="event-item-details">
                                        <h3 class="event-item-title highlight">{{ event.title }}</h3>
                                        <a class="primary-btn" :href="`/admin/events/edit-event/${event.id}`">Edit</a>
                                    </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const pastEvents = ref([]);

$fetch('/api/events/events', {
    method: 'GET',
    headers: { from: 'all' },
    onResponse(response) {
        if (response.response._data) {
            pastEvents.value = response.response._data.events;
        } else {
            console.error('Failed to fetch events:', response.statusText);
        }
    }
})

function redirectToEdit(id) {
    window.location.href = `/admin/events/edit-event/${id}`;
}
</script>

<style scoped>
.edit-events-container {
    padding: 60px;
}

.edit-events-content {
    padding: 3rem;
    border-radius: 0.5rem;
    background-color: var(--color-primary);
    border: 1px solid var(--color-border-primary);
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.edit-events-content-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.edit-events-content-description {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.edit-events-title-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.event-items-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.2rem;
    padding-top: 1.5rem;
    border-radius: 0.5rem;
}

.event-item-details {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 1rem;
    transition: opacity 0.3s ease;
    background-color: var(--color-primary);
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.primary-btn {
    font-size: 1rem;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: var(--color-counter-primary);
    box-shadow: 0 0 0 1px var(--color-text-secondary);
    color: var(--color-text-secondary);
    text-decoration: none;
}

.primary-btn:hover {
    background: var(--color-counter-secondary);
    box-shadow: 0 0 0 2px var(--color-border-primary);
}

.event-item-details h3,
.event-item-details p {
    margin: 0;
}

.event-item-title {
    font-size: 1.2rem;
    letter-spacing: -0.05rem;
    font-weight: bold;
    text-transform: uppercase;
}

.event-item-redirect {
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--color-text-secondary);
}

.bi-link {
    font-size: 0.85rem;
    color: var(--color-text-secondary);
}

.gallery-images-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1rem;
    color: var(--color-text-primary);
}

.gallery-images-count {
    position: absolute;
    top: 1rem;
    right: 0.7rem;
    font-size: 0.65rem;
    text-shadow: -2px -2px 2px var(--color-counter-secondary);
    border-radius: 0.3rem;
    min-width: 1rem;
    text-align: center;
    background-color: var(--color-counter-primary);
    font-weight: 500;
}

.event-item-outer {
    position: relative;
    border-radius: 0.5rem;
    min-height: 200px;
}

.event-item-inner {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    cursor: pointer;
    box-shadow: 1px 1px 10px var(--color-counter-primary) inset;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 1px 1px 15px var(--color-counter-secondary) inset, 0px 0px 0px 1px var(--color-border-primary);
}

.event-item-inner:hover {
    transform: scale(1.02);
}

.gallery-placeholder-text {
    text-align: center;
    font-weight: 600;
}

@media (max-width: 1150px) {
    .edit-events-content {
        margin: 0 150px;
    }
}

@media (max-width: 900px) {
    .edit-events-content {
        margin: 0 100px;
    }
}

@media (max-width: 700px) {
    .edit-events-content {
        margin: 0 50px;
        padding: 2rem;
    }

    .hero-title-container {
        font-size: 32px;
    }

    .event-items-container {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
}

@media (max-width: 500px) {
    .edit-events-content {
        margin: 0 20px;
        padding: 1.5rem;
    }

    .hero-title-container {
        font-size: 28px;
    }

    .event-items-container {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }

    .event-item-title {
        font-size: 1rem;
    }

    .event-item-redirect {
        font-size: 0.6rem;
    }

    .edit-events-content-description {
        font-size: 14px;
    }
}
</style>