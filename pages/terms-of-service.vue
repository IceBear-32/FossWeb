<template>
    <div></div>
    <div class="container">
        <div class="hero-section">
            <div class="hero-animation"></div>
            <div class="hero-title-container">
                <p class="hero-title">Foss <span class="highlight">Terms of Service</span></p>
            </div>
        </div>
        <div class="tos-card">
            <div class="tos-card-content">
                <div class="tos-card-about">
                    <p class="tos-card-title highlight">TERMS OF SERVICE</p>
                    <p class="tos-card-desc">By accessing this website, users agree to use its content responsibly and in accordance with
                        applicable intellectual property rights. All materials, unless otherwise stated, are owned by the FOSS
                        Club and must not be reused or distributed without proper attribution. Participation in club events
                        implies agreement with our code of conduct and permission to share related materials publicly.
                        External links are provided for convenience, and the club holds no responsibility for third-party
                        content. Continued use of the site implies acceptance of any updates to these terms.</p>
                    </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: auto;
    justify-items: center;
    background: radial-gradient(circle, var(--color-counter-primary) 70%, var(--color-counter-secondary) 100%);
}

.tos-card {
    background-color: var(--color-primary);
}

.tos-card-content {
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

.tos-card-about {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.tos-card-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.tos-card-desc {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

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
    text-align: center;
}

.hero-title {
    text-shadow: 2px 2px black;
}

@media (max-width: 1200px) {
    .tos-card-content {
        margin: 0 80px;
        padding: 32px;
    }
}


@media (max-width: 768px) {
    .tos-card-content {
        margin: 0 40px;
        padding: 24px;
    }

    .hero-title-container {
        font-size: 28px;
        margin-top: -200px;
    }
}


@media (max-width: 500px) {
    .tos-card-content {
        margin: 0 20px;
        padding: 16px;
    }

    .hero-title-container {
        font-size: 22px;
        margin-top: -180px;
    }
}
</style>
