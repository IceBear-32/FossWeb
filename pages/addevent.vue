<template>
  <div class="container">
    <h2 class="title">Upload Event Details</h2>

    <form @submit.prevent="submitEvent" class="form">
      <div
        class="drop-zone"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        :class="{ 'dragging': isDragging }"
        @click="triggerFileInput"
      >
        <p class="drop-text">
          Drag & drop an image here or <span class="highlight">click</span> to upload
        </p>
        <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" class="hidden-input" />
        <div v-if="preview" class="preview">
          <img :src="preview" alt="Thumbnail Preview" class="preview-img" />
        </div>
      </div>

  
      <div class="form-group">
        <label class="label">Event Title</label>
        <input v-model="title" type="text" class="input" required />
      </div>

  
      <div class="form-group">
        <label class="label">Event Description</label>
        <textarea v-model="description" class="textarea" rows="4" required></textarea>
      </div>

      <div class="form-group">
        <label class="label">Event Date</label>
        <input v-model="date" type="date" class="input" required />
      </div>

  
      <button type="submit" class="button">Submit Event</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
  const formData = new FormData()
  formData.append('thumbnail', thumbnail.value)
  formData.append('title', title.value)
  formData.append('description', description.value)
  formData.append('date', date.value)


  console.log('Event submitted:', {
    title: title.value,
    description: description.value,
    date: date.value,
    thumbnail: thumbnail.value?.name,
  })

  alert("Event submitted!")
}
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 40px auto;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 16px;
}

.label {
  font-weight: 500;
  margin-bottom: 6px;
  display: block;
  color: #444;
}

.input, .textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.input:focus, .textarea:focus {
  border-color: #007BFF;
  outline: none;
}

.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  color: #666;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
  margin-bottom: 16px;
  position: relative;
}

.drop-zone.dragging {
  background-color: #f0f8ff;
  border-color: #007BFF;
  color: #007BFF;
}

.drop-text {
  margin: 0;
  font-size: 14px;
}

.highlight {
  color: #007BFF;
  font-weight: 500;
}

.hidden-input {
  display: none;
}

.preview {
  margin-top: 10px;
}

.preview-img {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-top: 10px;
}

.button {
  padding: 12px;
  background-color: #007BFF;
  border: none;
  color: white;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button:hover {
  background-color: #0056b3;
}
</style>
