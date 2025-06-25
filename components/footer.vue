<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-link-container">
                <div class="footer-link-list">
                    <span class="footer-text-primary">FOSS</span>
                    <a href="/" class="footer-text-secondary footer-link">Home</a>
                    <a href="/events" class="footer-text-secondary footer-link">Events</a>
                    <a href="/projects" class="footer-text-secondary footer-link">Projects</a>
                    <a href="/forum" class="footer-text-secondary footer-link">Forum</a>
                    <a href="/blog" class="footer-text-secondary footer-link">Blog</a>
                    <a href="/contribute" class="footer-text-secondary footer-link">Contribute</a>
                </div>
                <div class="footer-link-list">
                    <span class="footer-text-primary">About</span>
                    <a href="/about" class="footer-text-secondary footer-link">Team</a>
                    <a href="/about/contributors" class="footer-text-secondary footer-link">Contributors</a>
                </div>
                <div class="footer-link-list">
                    <span class="footer-text-primary">Policy</span>
                    <a href="/privacy-policy" class="footer-text-secondary footer-link">Privacy Policy</a>
                    <a href="/terms-of-service" class="footer-text-secondary footer-link">Terms of Service</a>
                </div>
                <div class="footer-link-list">
                    <span class="footer-text-primary">Socials</span>
                    <a href="" class="footer-text-secondary footer-link">Instagram</a>
                    <a href="" class="footer-text-secondary footer-link">Facebook</a>
                    <a href="" class="footer-text-secondary footer-link">Twitter</a>
                    <a href="" class="footer-text-secondary footer-link">LinkedIn</a>
                    <a href="" class="footer-text-secondary footer-link">GitHub</a>
                </div>
                <div class="footer-link-list">
                    <span class="footer-text-primary">Contact</span>
                    <a href="/contact" class="footer-text-secondary footer-link">Contact Us</a>
                    <a href="/report" class="footer-text-secondary footer-link">Report an Issue</a>
                </div>
                <div class="footer-link-list">
                    <span class="footer-text-primary">Events</span>
                    <a href="/eventgallery" class="footer-text-secondary footer-link">Gallery</a>
                    <a href="/eventregistration" class="footer-text-secondary footer-link">Registration</a>
                </div>
            </div>
            <div class="footer-info-container">
                
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