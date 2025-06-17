<template>
  <div class="projects-container">
    <h1>Projects</h1>

    <div class="scroll-container">
      <div
        class="project-card"
        v-for="project in projects"
        :key="project.title"
        @click="openProject(project)"
      >
        <h2>{{ project.title }}</h2>
        <p class="truncate">{{ project.description }}</p>
        <div class="tech-stack">
          <span v-for="tech in project.tech" :key="tech" class="tech-tag">{{ tech }}</span>
        </div>
        <a
          :href="project.github"
          class="github-icon"
          @click.stop
          target="_blank"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" width="20" height="20">

        </a>
      </div>
    </div>

    <div class="project-modal" v-if="selectedProject" @click.self="closeProject">
      <div class="modal-content">
        <h2>{{ selectedProject.title }}</h2>
        <div class="modal-description">
          <p>{{ selectedProject.description }}</p>
        </div>
        <div class="tech-stack">
          <span
            v-for="tech in selectedProject.tech"
            :key="tech"
            class="tech-tag"
          >{{ tech }}</span>
        </div>
        <a :href="selectedProject.github" target="_blank" class="view-source">
          <a :href="selectedProject.github" target="_blank" class="view-source">
  <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" width="20" height="20">
  <span>View source</span>
</a>

        </a>
      </div>
    </div>
  </div>
</template>

<script>
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
    };
  },
  methods: {
    openProject(project) {
      this.selectedProject = project;
    },
    closeProject() {
      this.selectedProject = null;
    },
  },
};
</script>

<style scoped>
.projects-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.scroll-container {
  display: flex;
  overflow-x: auto;
  gap: 20px;
  padding: 10px 0;
  scroll-behavior: smooth;
}

.project-card {
  width: 400px;
  height: 250px;
  background-color: #2e5f77;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.project-card h2 {
  margin: 0;
  font-size: 20px;
  color: #000000;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; 
  line-clamp: 2; 
  -webkit-box-orient: vertical;
  color: #d6cdcd;
  position: relative;
}

.truncate::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  height: 1.1em;
  width: 100%;
  background: linear-gradient(to right, transparent, #2e5f77 90%);
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
}

.tech-tag {
  background-color: #5aaecd;
  color: #333;
  padding: 4px 8px;
  border-radius: 20px;
  font-size: 12px;
}

.github-icon {
  position: absolute;
  bottom: 12px;
  right: 12px;
  color: #333;
  font-size: 20px;
}

.github-icon:hover {
  color: #000;
}

.project-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: rgba(8, 8, 8, 0.7); 
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.modal-content h2 {
  color: #ddd6d6; 
}

.modal-description {
  margin: 20px 0;
  color: #444;
}

.view-source {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #cfc2c2;
  font-weight: bold;
  margin-top: 10px;
}

.view-source i {
  font-size: 20px;
}
</style>
