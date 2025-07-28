<template>
    <div></div>
    <div class="container">
        <div class="hero-section">
            <div class="hero-animation"></div>
            <div class="hero-title-container">
                <p class="hero-title">Foss Website <span class="highlight">Policy</span></p>
            </div>
        </div>
        <div class="policy-card">
            <div class="policy-card-content">
                <div class="policy-card-about">
                    <p class="policy-card-title highlight">WEBSITE POLICY</p>
                    <p class="policy-card-desc">The FOSS Club website is a platform dedicated to promoting open-source learning, collaboration,
                        and student engagement. All content shared is intended for educational and non-commercial use.
                        We respect user privacy by collecting minimal data solely for site functionality and analytics, and we
                        handle all personal information with confidentiality. Users are expected to maintain respectful and
                        inclusive behavior while interacting with the website and its associated platforms.</p>
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

.policy-card {
    background-color: var(--color-primary);
}

.policy-card-content {
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

.policy-card-about {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.policy-card-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.policy-card-desc {
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
    .policy-card-content {
        margin: 0 80px;
        padding: 32px;
    }
}


@media (max-width: 768px) {
    .policy-card-content {
        margin: 0 40px;
        padding: 24px;
    }

    .hero-title-container {
        font-size: 28px;
        margin-top: -200px;
    }
}


@media (max-width: 500px) {
    .policy-card-content {
        margin: 0 20px;
        padding: 16px;
    }

    .hero-title-container {
        font-size: 22px;
        margin-top: -180px;
    }
}
</style>
