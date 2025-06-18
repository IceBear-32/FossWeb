<template>
    <div class="container">
        <div v-if="showCredsModal" class="creds-modal-overlay" @click.self="showCredsModal = false">
            <Credentials @close="showCredsModal = false" :redir="redirUrl" show-close-btn="true" />
        </div>
        <div class="hero-section">
            <div class="hero-animation"></div>
            <div class="hero-title-container">
                <p class="hero-title">Be Part of <span class="highlight">The FOSS Revolution</span></p>
            </div>
        </div>
        <div class="info-card">
            <div class="info-card-content">
                <div class="info-card-about">
                    <p class="info-card-title highlight">ABOUT</p>
                    <p class="info-card-desc">India stands at the forefront of innovation — home to dynamic startups,
                        strong developer ecosystems, and massive technological infrastructure. Yet, the essence of Free
                        and Open Source Software (FOSS) — creativity, open collaboration, and the hacker mindset — has
                        gradually lost visibility. Despite our vibrant tech scene, India contributes far fewer
                        high-impact FOSS projects than expected, especially when compared to the global wave of open
                        source breakthroughs in recent years.</p>
                    <br />
                    <p class="info-card-desc">Our FOSS Chapter is here to change that narrative. We’re building a strong
                        foundation to nurture open source contributions at the grassroots level. By empowering students
                        and developers through hands-on projects, events, and mentorship, we aim to spark a new wave of
                        innovation — one rooted in openness, community, and a shared drive to build for the world.</p>
                </div>
                <div class="info-sub-cards-section">
                    <SubCard class="sub-card" tag="MISSION" bulletlist=true description="Promote open source awareness and ethics.
                                Enable student contributions to global projects.
                                Host hands-on workshops, events, and hackathons.
                                Build skills through collaboration and mentorship." />
                    <SubCard class="sub-card" tag="VISION"
                        description="To cultivate a vibrant, inclusive, and innovative community where students empower each other through the principles of Free and Open Source Software (FOSS), driving collaborative technology for social good and global impact." />
                </div>
            </div>
            <div class="member-card">
                <div class="member-card-title-container">
                    <p class="member-card-title">Start <span class="highlight">Contributing now!</span></p>
                </div>
                <div class="member-card-btns">
                    <a href="/contribute" v-if="userLoggedIn" class="member-btn member-btn-fill">Become a
                        Contributor</a>
                    <button v-else class="member-btn member-btn-fill"
                        @click="showCredsModal = true; redirUrl = '/contribute'">Become a Contributor</button>
                    <a href="/join" v-if="userLoggedIn" class="member-btn">Become a Member</a>
                    <button v-else class="member-btn" @click="showCredsModal = true; redirUrl = '/join'">Become a
                        Member</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import SubCard from '@/components/sub_card.vue';
import Credentials from '@/components/credentials.vue';

import { ref } from 'vue';
const showCredsModal = ref(false);
const redirUrl = ref('');

const userLoggedIn = ref(false);

</script>

<style scoped>
.container {
    width: auto;
    justify-items: center;
    background: radial-gradient(circle, var(--color-counter-primary) 70%, var(--color-counter-secondary) 100%);
}

.info-card {
    background-color: var(--color-primary);
}

.info-card-content {
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

.info-card-about {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.info-card-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.info-card-desc {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
}

.info-sub-cards-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 0.75rem;
    gap: 1.2rem;
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
}

.hero-title {
    text-shadow: 2px 2px black;
}

.member-card {
    display: flex;
    flex-direction: column;
    background: radial-gradient(var(--color-counter-primary), var(--color-primary) 70%);
    margin-top: 5px;
    padding: 40px 200px;
}

.member-card-title-container {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
}

.member-card-btns {
    display: grid;
    padding: 0 20%;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
}

.member-btn {
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

.member-btn:hover {
    background-color: var(--color-highlight);
    color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-button-primary);
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.member-btn-fill {
    background-color: var(--color-button-primary);
    color: var(--color-counter-primary);
}

.creds-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(105, 105, 105, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}
</style>
