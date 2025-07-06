<template>
  <div v-if="userIsAdmin" class="upload-container">
    <h2 class="upload-title highlight">Upload Event Details</h2>

    <form @submit.prevent="submitEvent" class="upload-form">
      <div
        class="drop-zone"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        :class="{ dragging: isDragging }"
        @click="triggerFileInput"
      >
        <p class="drop-text">
          Drag & drop or <span class="highlight">click</span> to upload event thumbnail
        </p>
        <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" class="hidden-input" />
        <div v-if="preview" class="preview">
          <img :src="preview" alt="Thumbnail Preview" class="preview-img" />
        </div>
      </div>

      <div class="form-group">
        <input v-model="title" type="text" placeholder="Event Title" required class="input" />
      </div>

      <div class="form-group">
        <textarea v-model="description" placeholder="Event Description" rows="4" required class="textarea"></textarea>
      </div>

      <div class="form-group">
        <input v-model="date" type="date" required class="input" />
      </div>

      <button type="submit" class="submit-btn">Submit Event</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    userIsAdmin: {
        type: Boolean,
        default: false
    },
    userLoggedIn: {
        type: Boolean,
        default: false
    }
});

const thumbnail = ref(null)
const preview = ref(null)
const title = ref('')
const description = ref('')
const date = ref('')
const isDragging = ref(false)
const fileInput = ref(null)

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    thumbnail.value = file
    preview.value = URL.createObjectURL(file)
  }
}

const handleDrop = (e) => {
  isDragging.value = false
  const file = e.dataTransfer.files[0]
  if (file && file.type.startsWith('image/')) {
    thumbnail.value = file
    preview.value = URL.createObjectURL(file)
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const submitEvent = () => {
  console.log('Submitted:', { title: title.value, description: description.value, date: date.value })
  alert('Event submitted!')
}
</script>

<style scoped>
.upload-container {
  max-width: 400px;
  margin: 95px auto;
  background: var(--color-primary);
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  padding: 2rem;
}

.upload-title {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.drop-zone {
  width: 100%;
  border: 2px dashed var(--color-border-primary);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
  box-sizing: border-box;
}

.drop-zone.dragging {
  border-color: var(--color-highlight);
  background-color: var(--color-counter-secondary);
}

.drop-text {
  font-size: 0.9rem;
}

.hidden-input {
  display: none;
}

.preview-img {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  margin-top: 0.5rem;
  border-radius: 6px;
  border: 1px solid var(--color-border-primary);
}

.form-group {
  width: 100%;
}

.input, .textarea {
  width: 100%;
  background: var(--color-counter-secondary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
  font-family: var(--font-stack);
  box-sizing: border-box;
  resize: none;
  transition: border-color 0.3s, outline 0.3s ease;
}

.input:focus, .textarea:focus {
  border-color: var(--color-highlight);
  outline: none;
}

.input::placeholder, .textarea::placeholder {
  color: var(--color-text-primary);
  opacity: 0.5;
}

.submit-btn {
  width: 100%;
  background: var(--color-button-primary);
  color: var(--color-counter-primary);
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease, color 0.3s ease;
}

.submit-btn:hover {
  background: var(--color-highlight);
  color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-button-primary);
  transition: background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease, color 0.3s ease;
}

@media (max-width: 1150px) {
  .upload-container {
    margin: 80px auto;
  }
}

@media (max-width: 900px) {
  .upload-container {
    max-width: 350px;
    margin: 70px auto;
  }
}

@media (max-width: 700px) {
  .upload-container {
    max-width: 320px;
    margin: 60px auto;
    padding: 1.5rem;
  }
  .upload-title {
    font-size: 1.3rem;
  }
}

@media (max-width: 500px) {
  .upload-container {
    max-width: 100%;
    margin: 40px 20px;
    padding: 1.2rem;
  }
  .upload-title {
    font-size: 1.2rem;
  }
  .drop-zone {
    padding: 1rem;
  }
  .drop-text {
    font-size: 0.8rem;
  }
}

</style>
