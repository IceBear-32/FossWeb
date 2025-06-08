<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-link-container">
                <div class="footer-link-list">
                    <span class="footer-text-primary">FOSS United</span>
                    <a href="/" class="footer-text-secondary footer-link">Home</a>
                    <a href="/events" class="footer-text-secondary footer-link">Events</a>
                    <a href="/forum" class="footer-text-secondary footer-link">Forum</a>
                    <a href="/eventgallery" class="footer-text-secondary footer-link">Gallery</a>
                    <a href="/join" class="footer-text-secondary footer-link">Join FOSS</a>
                </div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: var(--color-primary-footer);
    padding: 70px 200px;
    
}

.footer-content {
    display: flex;
    flex-direction: column;
}

.footer-text-primary {
    color: var(--color-text-primary-footer);
    font-size: 20px;
    font-weight: bold;
}

.footer-text-secondary {
    color: var(--color-text-secondary-footer);
    text-decoration: none;
    font-size: 15px;
    font-weight: 600;
}

.footer-link:hover {
    color: var(--color-highlight);
}

.footer-link-container {
    display: flex;
    flex-direction: row;
    gap: 20px;
}

.footer-link-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>