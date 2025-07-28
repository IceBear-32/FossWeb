<template>
    <div class="events-container">
        <div class="hero-section">
            <div class="hero-animation"></div>
            <div class="hero-title-container">
                <p class="hero-title">Our <span class="highlight">Technical Events</span></p>
            </div>
        </div>
        <div class="events-section">
            <div class="events-content">
                <div class="events-title-container">
                    <p class="events-content-title highlight">EVENTS</p>
                    <p class="events-content-description">Our FOSS Chapter unites people through impactful and
                        captivating events,
                        driven by a passion for open knowledge and collaborative development. We think that learning is
                        most
                        effective when it is shared, and our events embody that spirit of growth. Our calendar is
                        jam-packed
                        with chances to learn, develop, and contribute, whether it's a tech talk, a hands-on workshop,
                        or a
                        group coding event. These events are more than just get-togethers, they are experiences that
                        mold
                        future open-source leaders and their ideas and abilities.</p>
                </div>
                <div class="events-timeline-container">
                    <div class="events-timeline-card">
                        <p class="timeline-title highlight">PAST EVENTS</p>
                        <p class="timeline-description">Explore our past events that have shaped our community.</p>
                        <div class="timeline-btn-split">
                            <button class="view-timeline-btn" @click="openPastEventsModal = true">View Events</button>
                            <a class="timeline-link-btn" href="/eventgallery">View Gallery</a>
                        </div>
                    </div>
                    <div class="events-timeline-card">
                        <p class="timeline-title highlight">UPCOMING EVENTS</p>
                        <p class="timeline-description">Stay tuned for our upcoming events that will inspire and
                            educate.</p>
                        <div class="timeline-btn-split">
                            <button class="view-timeline-btn" @click="openUpcomingEventsModal = true">View Events</button>
                            <a class="timeline-link-btn" href="/eventregistration">Event Registration</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="events-modal" v-if="openPastEventsModal" @click.self="openPastEventsModal = false">
            <div class="events-modal-content">
                <h2 class="events-modal-title highlight">Past Events</h2>
                <div class="events-modal-list">
                    <div v-for="event in pastEvents" :key="event.title" class="events-modal-item">
                        <h3 class="events-modal-item-title highlight">{{ event.title }}</h3>
                        <div class="events-modal-item-split">
                            <i class="bi bi-calendar"></i>
                            <p class="events-modal-item-date">{{ event.date }}</p>
                        </div>
                        <div class="events-modal-item-split">
                            <i class="bi bi-info-circle"></i>
                            <p class="events-modal-item-description">{{ event.description ?? '<no description>' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="events-modal" v-if="openUpcomingEventsModal" @click.self="openUpcomingEventsModal = false">
            <div class="events-modal-content">
                <h2 class="events-modal-title highlight">Upcoming Events</h2>
                <div class="events-modal-list">
                    <div v-for="event in upcomingEvents" :key="event.title" class="events-modal-item">
                        <h3 class="events-modal-item-title highlight">{{ event.title }}</h3>
                        <div class="events-modal-item-split">
                            <i class="bi bi-calendar"></i>
                            <p class="events-modal-item-date">{{ event.date }}</p>
                        </div>
                        <div class="events-modal-item-split">
                            <i class="bi bi-info-circle"></i>
                            <p class="events-modal-item-description">{{ event.description ?? '<no description>' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';

const pastEvents = ref([]);
const upcomingEvents = ref([]);

$fetch('/api/events/events', {
    method: 'GET',
    headers: { from: 'past' },
    onResponse(response) {
        if (response.response._data) {
            pastEvents.value = response.response._data.events;
        } else {
            console.error('Failed to fetch past events:', response.statusText);
        }
    }
})

$fetch('/api/events/events', {
    method: 'GET',
    headers: { from: 'upcoming' },
    onResponse(response) {
        if (response.response._data) {
            upcomingEvents.value = response.response._data.events;
        } else {
            console.error('Failed to fetch past events:', response.statusText);
        }
    }
})

const openPastEventsModal = ref(false);
const openUpcomingEventsModal = ref(false);
</script>

<style scoped>
.hero-section {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 80px;
}

.hero-animation {
    width: 100%;
    background: url('https://i.giphy.com/3o6Zt0EiSgr1cWE6WY.webp');
    height: 300px;
    overflow: hidden;
    background-size: cover;
}

.hero-title-container {
    display: flex;
    flex-direction: row;
    font-size: 40px;
    letter-spacing: -0.1rem;
    line-height: 1.3;
    font-weight: bold;
    margin-top: -240px;
    text-align: center;
}

.hero-title {
    text-shadow: 2px 2px black;
}

.events-section {
    background-color: var(--color-primary);
}

.events-content {
    padding: 3rem;
    border-radius: 0.5rem;
    background-color: var(--color-primary);
    border: 1px solid var(--color-border-primary);
    margin: 0 200px;
    transform: translateY(-40px);
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.events-content-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.events-content-description {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.events-title-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.events-timeline-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 0.75rem;
    gap: 1.2rem;
}

.events-timeline-card {
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--color-border-primary);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.timeline-title {
    font-weight: 600;
    font-size: 12px;
    line-height: 1.7;
    letter-spacing: -0.02rem;
}

.events-timeline-card p {
    margin: 0;
}

.timeline-description {
    line-height: 1.3;
    font-weight: 600;
    letter-spacing: -0.04rem;
}

.view-timeline-btn,
.timeline-link-btn {
    padding: 0.5rem 1rem;
    background-color: var(--color-button-primary);
    color: var(--color-counter-primary);
    border: none;
    border-radius: 0.25rem;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
}

.view-timeline-btn:hover,
.timeline-link-btn:hover {
    background: var(--color-highlight);
    color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-button-primary);
}

.timeline-link-btn {
    text-decoration: none;
    text-align: center;
}

.timeline-btn-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
}

.events-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(105, 105, 105, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.events-modal-title {
    margin: 2rem;
}

.events-modal-content {
    position: relative;
    background-color: var(--color-primary);
    border-radius: 0.5rem;
    width: 80%;
    max-width: 600px;
    max-height: 80%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.events-modal-content h3 {
    margin: 0;
}

.events-modal-content::after {
    content: '';
    position: sticky;
    bottom: 0;
    display: block;
    height: 3rem;
    background: linear-gradient(to bottom, transparent, var(--color-primary));
    pointer-events: none;
}

.events-modal-list {
    padding: 0 0.35rem;
    margin: 0 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-left: 0.25rem solid var(--color-border-primary);
}

.events-modal-item {
    position: relative;
    padding: 1rem;
    border: 1px solid var(--color-border-primary);
    border-radius: 0.5rem;
    background-color: var(--color-counter-primary);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.events-modal-item-title,
.events-modal-item-date,
.events-modal-item-description {
    font-weight: 600;
    font-size: 12px;
    line-height: 1.7;
    letter-spacing: -0.02rem;
    text-transform: uppercase;
    border-bottom: 1px solid var(--color-border-primary);
}

.events-modal-item-date,
.events-modal-item-description {
    margin: 0 0 0 1rem;
}

.events-modal-item-split i {
    font-size: 12px;
    color: var(--color-text-secondary);
    text-align: center;
    align-self: center;
}

.events-modal-item-split {
    display: grid;
    grid-template-columns: 12px 1fr;
}

.events-modal-item::before {
    content: '';
    position: absolute;
    top: 35%;
    left: calc(-0.35rem - 16px - 0.2rem);
    width: 1rem;
    height: 1rem;
    border: 0.5rem solid var(--color-divider);
    background-color: var(--color-highlight);
    border-radius: 2rem;
}

@media (max-width: 1200px) {
    .events-content {
        margin: 0 80px;
        padding: 2rem;
    }
}

/* Tablets & smaller (below 800px) */
@media (max-width: 768px) {
    .events-content {
        margin: 0 40px;
        padding: 1.5rem;
    }

    .events-timeline-container {
        grid-template-columns: 1fr;
    }

    .hero-title-container {
        font-size: 28px;
        margin-top: -200px;
    }

    .events-content-description {
        font-size: 14px;
    }
}

/* Small phones (below 500px) */
@media (max-width: 500px) {
    .events-content {
        margin: 0 16px;
        padding: 1rem;
    }

    .hero-title-container {
        font-size: 22px;
        margin-top: -180px;
    }

    .events-content-description {
        font-size: 13px;
    }

    .timeline-btn-split {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    padding: 0 0.5rem; /* add left/right padding so buttons don't touch edges */
}

.view-timeline-btn,
.timeline-link-btn {
    width: 100%;
    max-width: 100%;
    padding: 0.5rem;        /* controls inside padding */
    font-size: 12px;
    box-sizing: border-box; /* ensures padding doesn't cause overflow */
}
}

</style>