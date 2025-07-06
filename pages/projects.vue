<template>
    <div class="projects-container">
        <div class="hero-section">
            <div class="hero-animation"></div>
            <div class="hero-title-container">
                <p class="hero-title">Our <span class="highlight">Open Source Projects</span></p>
            </div>
        </div>
        <div class="projects-section">
            <div class="projects-content">
                <p class="projects-heading highlight">PROJECTS</p>
                <div class="project-cards-container">
                    <div class="project-card" v-for="(project, index) in projects" :key="project.title + index"
                        :class="{ 'centered-card': projects.length % 2 === 1 && index === projects.length - 1 }"
                        @click="openProject(project)" @mousemove="e => handleMouseMove(e, project.title)"
                        @mouseleave="() => handleMouseLeave(project.title)" :style="boxShadowStyles[project.title]">
                        <h2>{{ project.title }}</h2>
                        <p class="truncate">{{ project.description }}</p>
                        <div class="tech-stack">
                            <span v-for="tech in project.tech" :key="tech" class="tech-tag">{{ tech }}</span>
                        </div>
                        <a :href="project.github" class="github-icon" @click.stop target="_blank">
                            <i class="bi bi-github"></i>
                        </a>
                    </div>
                </div>
            </div>

            <div class="project-modal" v-if="selectedProject" @click.self="closeProject">
                <div class="modal-content">
                    <h2>{{ selectedProject.title }}</h2>
                    <div class="modal-description">
                        <p>{{ selectedProject.description }}</p>
                    </div>
                    <div class="tech-stack">
                        <span v-for="tech in selectedProject.tech" :key="tech" class="tech-tag">{{ tech }}</span>
                    </div>
                    <a :href="selectedProject.github" target="_blank" class="view-source">
                        <i class="bi bi-github"></i>
                        <span>View source</span>
                    </a>
                </div>
            </div>

            <div class="github-org-container">
            <p class="github-org-title">Visit Our <span class="highlight">Github Organization</span></p>
            <a :href="github_org_link" class="github-link-btn" target="_blank">
                <div class="link-btn-text">
                    <i class="bi bi-github link-btn-text"></i>
                    <p>Github</p>
                    </div>
            </a>
        </div>
        </div>
    </div>
</template>

<script>
import { github_org_link } from '@/assets/js/global';
export default {
    data() {
        return {
            selectedProject: null,
            projects: [
                {
                    title: 'Attendance Scanner',
                    description:
                        'The FOSS Attendance System is a basic Python-based desktop prototype application designed to streamline attendance management for events. Built using PyQt5 for the GUI and integrated with Google Sheets for data storage. Volunteers can scan QR codes during the event, and attendance is automatically recorded in a linked Google Sheet.',
                    github: 'https://github.com/fosschapter/foss-attendance-scanner',
                    tech: ['Python', 'PyQt5', 'Google Sheets API'],
                },
                {
                    title: 'Plant Doctor',
                    description:
                        'PlantDoctor is an AI-powered web app for rapid plant disease diagnosis and intelligent agricultural help. Upload leaf images to detect disease, receive treatment advice, and chat with an AI bot for support using llama-3.3-70b via Groq API.',
                    github: 'https://github.com/fosschapter/PlantDoctor',
                    tech: ['Python', 'TensorFlow', 'Gradio', 'Groq LLM API'],
                },
            ],
            boxShadowStyles: {}
        };
    },
    methods: {
        openProject(project) {
            this.selectedProject = project;
        },
        closeProject() {
            this.selectedProject = null;
        },
        handleMouseMove(event, key) {
            const el = event.currentTarget;
            const rect = el.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const offsetX = (x - centerX) / 20;
            const offsetY = (y - centerY) / 10;

            this.boxShadowStyles[key] = `box-shadow: ${offsetX}px ${offsetY}px 16px var(--color-counter-primary); transition: box-shadow 0.1s ease;`;
        },
        handleMouseLeave(key) {
            this.boxShadowStyles[key] = 'box-shadow: none; transition: box-shadow 0.3s ease;';
        },
    },
    created() {
        this.projects.forEach((project) => {
            this.boxShadowStyles[project.title] = 'box-shadow: none;';
        });
    },
};
</script>

<style scoped>
.projects-container {
    width: auto;
    justify-items: center;
    background: radial-gradient(circle, var(--color-counter-primary) 70%, var(--color-counter-secondary) 100%);
}

.projects-heading {
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
}

.hero-title {
    text-shadow: 2px 2px black;
}

.projects-section {
    background-color: var(--color-primary);
}

.projects-content {
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

.project-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(calc(50% - 20px), 1fr));
    grid-template-rows: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    align-items: center;
    scroll-behavior: smooth;
}

.project-card {
    background-color: var(--color-primary);
    padding: 16px;
    border-radius: 0.5rem;
    border: 1px solid var(--color-border-primary);
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.3);
    flex-shrink: 0;
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.3s ease;
    justify-content: space-between;
}

.centered-card {
    grid-column: 1 / -1;
    justify-self: center;
    width: 50%;
}

.project-card h2 {
    margin: 0;
    font-size: 20px;
    color: var(--color-text-primary);
}

.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    line-clamp: 4;
    -webkit-box-orient: vertical;
    color: var(--color-text-secondary);
    position: relative;
}

.truncate::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    height: 1.1em;
    width: 100%;
    background: linear-gradient(to right, transparent, var(--color-primary) 90%);
}

.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
}

.tech-tag {
    background-color: var(--color-highlight);
    color: var(--color-counter-primary);
    padding: 4px 8px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    transition: background-color 0.3s ease;
    cursor: default;
}

.tech-tag:hover {
    background-color: var(--color-text-primary);
    transition: background-color 0.3s ease;
}

.github-icon {
    position: absolute;
    bottom: 0.95rem;
    right: 0.95rem;
    color: var(--color-highlight);
    font-size: 20px;
    transition: color 0.3s ease;
}

.github-icon:hover {
    transition: color 0.3s ease;
    color: var(--color-text-primary);
}

.project-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(105, 105, 105, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal-content {
    background: var(--color-primary);
    padding: 30px;
    border-radius: 12px;
    width: 90%;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
}

.modal-content h2 {
    color: var(--color-highlight);
}

.modal-description {
    margin: 20px 0;
    color: var(--color-text-primary);
}

.view-source {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    color: var(--color-text-secondary-dark);
    font-weight: bold;
    margin-top: 20px;
}

.view-source i {
    font-size: 20px;
}

.view-source:hover {
    color: var(--color-text-secondary);
}

.github-org-container {
    display: flex;
    flex-direction: column;
    background: radial-gradient(var(--color-counter-primary), var(--color-primary) 70%);
    align-items: center;
    margin-top: 5px;
    padding: 40px 200px;
}

.github-org-title {
    font-size: 30px;
    font-weight: bold;
}

.github-link-btn {
    border-radius: 0.5rem;
    padding: 1rem 6rem;
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

.github-link-btn:hover {
    background-color: var(--color-highlight);
    color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-button-primary);
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.link-btn-text {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 0.5rem;
}

.link-btn-text p {
    margin: 0;
}

.link-btn-text i {
    margin-right: 0;
    transform: translateY(1.5px);
}

@media (max-width: 1200px) {
  .projects-content {
    margin: 0 100px;
    padding: 32px;
  }
  .github-org-container {
    padding: 40px 100px;
  }
}

@media (max-width: 1024px) {
  .projects-content {
    margin: 0 50px;
    padding: 24px;
  }

  .github-org-container {
    padding: 40px 50px;
  }

  .hero-title-container {
    font-size: 30px;
    margin-top: -200px;
  }
}

@media (max-width: 768px) {
  .project-cards-container {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }

  .centered-card {
    width: 100%;
  }

  .github-org-title {
    font-size: 24px;
    text-align: center;
  }

  .github-link-btn {
    width: 100%;
    padding: 1rem;
    font-size: 16px;
  }
}

@media (max-width: 500px) {
  .projects-content {
    margin: 0 20px;
    padding: 16px;
  }

  .hero-title-container {
    font-size: 24px;
    margin-top: -160px;
    text-align: center;
  }

  .project-card {
    padding: 12px;
  }

  .project-card h2 {
    font-size: 16px;
  }

  .github-org-title {
    font-size: 20px;
  }

  .github-link-btn {
    font-size: 14px;
    padding: 0.75rem;
  }

  .link-btn-text {
    flex-direction: row;
    justify-content: center;
    gap: 0.25rem;
  }

  .link-btn-text p {
    font-size: 14px;
  }

  .tech-tag {
    font-size: 10px;
    padding: 3px 6px;
  }

  .modal-content {
    padding: 20px;
  }
}

</style>
