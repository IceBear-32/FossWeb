<template>
    <div class="events-gallery-container">
        <div class="hero-section">
            <div class="hero-animation"></div>
            <div class="hero-title-container">
                <p class="hero-title">Our <span class="highlight">Event Gallery</span></p>
            </div>
        </div>
        <div class="events-gallery-section">
            <div class="events-gallery-content">
                <div class="events-gallery-title-container">
                    <p class="events-gallery-content-title highlight">GALLERY</p>
                    <p class="events-gallery-content-description">Step into our world of innovation, collaboration, and
                        creativity. This gallery showcases the vibrant moments from our past FOSS events — from
                        interactive workshops and tech talks to hands-on hackathons and community-driven initiatives.
                    </p>
                </div>
                <div class="gallery-container">
                    <div v-for="(event, index) in pastEvents" :key="index" class="gallery-item-outer">
                        <i v-if="userIsAdmin" class="bi bi-pencil-square gallery-edit-icon"></i>
                        <div class="gallery-item-inner" :style="event.thumbnail
                            ? { backgroundImage: `url('${event.thumbnail}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
                            : { backgroundColor: 'var(--color-counter-secondary)' }" @click="redirectToGallery(index)">
                            <i v-if="event.images.length > 0" class="bi gallery-images-icon" :class="event.images.length > 1 ? `bi-images` : `bi-image`"></i>
                            <p v-if="event.images.length > 1" class="gallery-images-count">{{ event.images.length <= 9 ? event.images.length : "9+" }}</p>
                            <p class="gallery-placeholder-text highlight" v-if="!event.thumbnail">
                                {{event.images.length > 0 ? "No thumbnail available" : "Gallery unavailable"}}
                            </p>
                            <div class="gallery-item-details">
                                <h3 class="gallery-item-title highlight">{{ event.title }}</h3>
                                <p class="gallery-item-redirect">
                                    <i class="bi bi-link"></i> Click to view gallery
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { pastEvents } from '@/assets/js/events_details';
import { onMounted } from 'vue';

function redirectToGallery(index) {
    if (props.userIsAdmin) {
        window.location.href = `/event/${index}/edit`;
    } else {
        window.location.href = `/event/${index}`;
    }
}

const props = defineProps({
    userIsAdmin: {
        type: Boolean,
        default: false
    }
});

const { $supabase } = useNuxtApp();
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
}

.hero-title {
    text-shadow: 2px 2px black;
}

.events-gallery-section {
    background-color: var(--color-primary);
}

.events-gallery-content {
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

.events-gallery-content-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.events-gallery-content-description {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.events-gallery-title-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.gallery-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.2rem;
    padding-top: 1.5rem;
    border-radius: 0.5rem;
}

.gallery-item-details {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    padding: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    background-color: var(--color-primary);
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
}

.gallery-item-details h3,
.gallery-item-details p {
    margin: 0;
}

.gallery-item-inner:hover .gallery-item-details {
    opacity: 1;
    transition: opacity 0.3s ease;
}

.gallery-item-title {
    font-size: 1.2rem;
    letter-spacing: -0.05rem;
    font-weight: bold;
    text-transform: uppercase;
}

.gallery-item-redirect {
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

.gallery-item-outer {
    position: relative;
    border-radius: 0.5rem;
    min-height: 200px;
}

.gallery-edit-icon {
    position: absolute;
    top: 1px;
    left: 1px;
    font-size: 1rem;
    padding: 1rem;
    border-top-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    box-shadow: 0 0 0 1px var(--color-counter-secondary);
    color: var(--color-text-primary);
    background-color: var(--color-counter-primary);
    z-index: 2;
    transition: color 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.gallery-item-inner {
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
}

.gallery-item-inner:hover {
    box-shadow: 1px 1px 15px var(--color-counter-secondary) inset, 0px 0px 0px 1px var(--color-border-primary);
    transform: scale(1.02);
}

.gallery-edit-icon:hover {
    color: var(--color-highlight);
    box-shadow: 0 0 0 2px var(--color-button-primary);
    transition: color 0.3s ease, box-shadow 0.3s ease;
}

.gallery-placeholder-text {
    text-align: center;
    font-weight: 600;
}

@media (max-width: 1150px) {
  .events-gallery-content {
    margin: 0 150px;
  }
}

@media (max-width: 900px) {
  .events-gallery-content {
    margin: 0 100px;
  }
}

@media (max-width: 700px) {
  .events-gallery-content {
    margin: 0 50px;
    padding: 2rem;
  }
  .hero-title-container {
    font-size: 32px;
  }
  .gallery-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 500px) {
  .events-gallery-content {
    margin: 0 20px;
    padding: 1.5rem;
  }
  .hero-title-container {
    font-size: 28px;
  }
  .gallery-container {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  .gallery-item-title {
    font-size: 1rem;
  }
  .gallery-item-redirect {
    font-size: 0.6rem;
  }
  .events-gallery-content-description {
    font-size: 14px;
  }
}
</style>