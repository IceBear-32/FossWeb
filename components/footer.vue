<template>
    <footer class="footer">
        <div class="footer-wrapper">
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
                    <a href="" class="footer-text-secondary footer-link">X (Twitter)</a>
                    <a href="" class="footer-text-secondary footer-link">LinkedIn</a>
                    <a :href="github_org_link" class="footer-text-secondary footer-link">GitHub</a>
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
            <div class="footer-info-wrapper">
                <div class="footer-info-container">
                    <p class="footer-info-title">FOSS Chapter (IEEE)</p>
                <p class="footer-info-org-grp">SRM Institute of Science & Technology</p>
                <p class="footer-info-org-grp">Tiruchirappalli</p>
                </div>
                <div class="footer-info-socials">
                    <a href="#" class="footer-social-icon"><i class="bi bi-instagram"></i></a>
                    <a href="#" class="footer-social-icon"><i class="bi bi-facebook"></i></a>
                    <a href="#" class="footer-social-icon"><i class="bi bi-twitter-x"></i></a>
                    <a href="#" class="footer-social-icon"><i class="bi bi-linkedin"></i></a>
                    <a :href="github_org_link" class="footer-social-icon"><i class="bi bi-github"></i></a>
                </div>
            </div>
        </div>
        </div>
    </footer>
</template>

<style scoped>

.footer {
    background-color: var(--color-primary-footer);
}

.footer-wrapper {
    padding: 0 80px;
    margin: 0 50px;
}

.footer-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
    padding: 70px 0;
    align-items: center;
    width: 100%;
}

.footer-text-primary {
    color: var(--color-text-primary-footer);
    font-size: 20px;
    font-weight: bold;
}
.footer-info-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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

.footer-info-container p {
    margin: 0;
    font-weight: 500;
    font-size: 14px;
}

.footer-info-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    text-align: right;
}

.footer-info-title {
    color: var(--color-highlight);
}

.footer-info-socials {
    display: flex;
    flex-direction: row;
    justify-content: right;
    font-size: 1.2rem;
    gap: 0.5rem;
}

.footer-social-icon {
    text-decoration: none;
    color: var(--color-text-secondary-footer);
    padding: 1rem;
    transition: color 0.3 ease;
}

.footer-social-icon:hover {
    color: var(--color-text-primary-footer);
    transition: color 0.3 ease;
}


@media screen and (max-width: 1150px) {
    .footer-wrapper {
        padding: 0 50px;
        margin: 0 30px;
    }
    .footer-text-primary {
        font-size: 1rem;
    }
    .footer-text-secondary {
        font-size: 12px;
    }
    .footer-info-container p {
        font-size: 12px;
    }
    .footer-info-socials {
        font-size: 1.1rem;
    }
    .footer-info-wrapper {
        gap: 0.7rem;
    }
    .footer-social-icon {
        padding: 0.7rem;
    }
}

@media screen and (max-width: 880px) {
    .footer-wrapper {
        padding: 0 2rem;
        margin: 0 100px;
    }
    .footer-content {
        display: flex;
        flex-direction: column;
    }
    .footer-link-container {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: space-between;
        gap: 2rem;
        width: 100%;
    }
    .footer-text-primary {
        font-size: 20px;
    }
    .footer-text-secondary {
        font-size: 14px;
    }
    .footer-info-container {
        align-items: start;
        justify-content: left;
        text-align: left;
        width: 100%;
    }
    .footer-info-container p {
        font-size: 14px;
    }
    .footer-info-socials {
        align-self: end;
        gap: 0.25rem;
    }
    .footer-info-wrapper {
        margin-top: 2rem;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
}

@media (max-width: 550px) {
    .footer-wrapper {
        margin: 0 60px;
    }
  .footer-content {
    flex-direction: column;
    align-items: flex-start;   /* make whole footer content align left */
    width: 100%;
  }

  .footer-link-container {
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    width: 100%;
  }

  .footer-info-wrapper {
    width: 100%;
    margin-top: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .footer-info-container {
    text-align: left;
    width: 100%;
  }

  .footer-info-socials {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 0.4rem;
    width: 100%;
  }

  .footer-social-icon {
    padding: 0.3rem;
    font-size: 1rem;
  }
}

</style>

<script setup>
import { github_org_link } from '@/assets/js/global';
</script>