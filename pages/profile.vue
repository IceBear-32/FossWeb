<template>
  <div class="profile-container">
    <section class="section-card">
      <div class="avatar-wrapper">
        <img :src="userProfile?.avatar" alt="Avatar" class="avatar" />
        <label class="edit-icon" for="avatarInput"><i class="bi bi-pencil"></i></label>
        <input id="avatarInput" type="file" accept="image/*" @change="onAvatarChange" hidden />
      </div>

      <div class="field-box">
        <div class="field-row">
          <label><i class="bi bi-person"></i></label>
          <template v-if="editingField === 'username'">
            <input v-model="editable.username" type="text" />
            <div class="btn-group">
              <button @click="saveField('username')">Save</button>
              <button @click="cancelEdit">Cancel</button>
            </div>
          </template>
          <template v-else>
            <span>{{ userProfile?.username || 'User' }}</span>
            <button class="edit-btn" @click="startEditing('username')"><i class="bi bi-pencil"></i></button>
          </template>
        </div>
      </div>

      <div class="field-box">
        <div class="field-row">
          <label><i class="bi bi-telephone"></i></label>
          <template v-if="editingField === 'phone'">
            <input v-model="editable.phone" type="text" />
            <div class="btn-group">
              <button @click="saveField('phone')">Save</button>
              <button @click="cancelEdit">Cancel</button>
            </div>
          </template>
          <template v-else>
            <span>{{ userProfile?.phone || 'Not added' }}</span>
            <button class="edit-btn" @click="startEditing('phone')"><i class="bi bi-pencil"></i></button>
          </template>
        </div>
      </div>

      <div class="field-box">
        <div class="field-row">
          <label><i class="bi bi-envelope"></i></label>
          <span>{{ userProfile?.email || 'Not provided' }}</span>
        </div>
      </div>
    </section>

    <section class="section-card">
      <h2>Misc</h2>
      <div class="field-box">
        <div class="field-row">
          <label><i class="bi bi-list-check"></i> Registered Events</label>
          <div class="dropdown-wrapper">
            <button @click="toggleDropdown">
              <span>View Events</span>
              <i :class="dropdownOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
            </button>
            <div v-if="dropdownOpen" class="dropdown-content">
              <ul>
                <li v-if="!registeredEvents.length">No registered events</li>
                <li v-for="(event, index) in registeredEvents" :key="index">{{ event }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-card danger-zone">
      <h2>Danger Zone</h2>
      <div class="btn-group-vertical">
        <button class="logout-btn" @click="logout">Sign Out</button>
        <button class="delete-btn">Delete Account</button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const { userProfile, logout: useLogout, updateProfile } = await useAuth()

const editingField = ref(null)
const editable = ref({
  username: userProfile?.username || '',
  phone: userProfile?.phone || ''
})

const dropdownOpen = ref(false)
const registeredEvents = ref([])

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}

async function onAvatarChange(event) {
  const file = event.target.files[0]
  if (!file) return
  const uploadedUrl = URL.createObjectURL(file)
  await updateProfile({ avatar: uploadedUrl })
  userProfile.avatar = uploadedUrl
}

function startEditing(field) {
  editingField.value = field
  editable.value[field] = userProfile?.[field] || ''
}

function cancelEdit() {
  editingField.value = null
}

async function saveField(field) {
  const updatedValue = editable.value[field]
  await updateProfile({ [field]: updatedValue })
  userProfile[field] = updatedValue
  editingField.value = null
}

async function logout() {
  await useLogout()
}
</script>

<style scoped>
.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #334155;
  padding: 3rem 1rem;
  color: white;
  font-family: 'Segoe UI', sans-serif;
  border-radius: 20px;
  max-width: 1000px;
  margin: 3rem auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  gap: 2rem;
}

.section-card {
  width: 100%;
  background-color:#1e293b;
  padding: 1rem;
  border-radius: 15px;
}

.avatar-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
  border: 2px solid white;
}

.edit-icon {
  position: absolute;
  bottom: -8px;
  right: -8px;
  background-color: white;
  color: #0033a0;
  border-radius: 50%;
  padding: 6px 7px;
  font-size: 14px;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  transition: background-color 0.2s;
}
.edit-icon:hover {
  background-color: #ddd;
}

.field-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 1rem;
  width: 100%;
}

.field-row label {
  width: 100px;
  font-weight: bold;
}

.field-row span {
  flex-grow: 1;
  word-break: break-word;
}

.field-row input {
  flex-grow: 1;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
}

.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: white;
  font-size: 1rem;
}

button {
  background-color: #ffffff;
  color: #0033a0;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}
button:hover {
  background-color: #e5e5e5;
}

.logout-btn {
  background-color: #ff4e4e;
  color: white;
}
.logout-btn:hover {
  background-color: #d73838;
}

.delete-btn {
  background-color: #8b0000;
  color: white;
}
.delete-btn:hover {
  background-color: #a80000;
}

.btn-group {
  display: flex;
  gap: 0.5rem;
}

.btn-group-vertical {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.field-box {
  background-color:#334155;
  border-radius: 10px;
  padding: 1rem;
  padding-bottom: 0.3rem;
  width: 90%;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 1rem;
  user-select: none;
}

.dropdown-content {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 1rem;
  border-radius: 10px;
  margin-top: 0.5rem;
}

.dropdown-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-content li {
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
