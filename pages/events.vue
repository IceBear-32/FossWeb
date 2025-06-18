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
                    <div class="events-timeline-container">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

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
    z-index: 1;
    margin-top: -240px;
}

.hero-title {
    text-shadow: 2px 2px black;
}

.events-section {
    background-color: var(--color-primary);
}

.events-content {
    padding: 48px;
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
</style>