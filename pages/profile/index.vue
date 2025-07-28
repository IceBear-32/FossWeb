<template>
  <div v-if="showConfirmDialog" class="confirm-acc-removal-modal" @click.self="showConfirmDialog = false">
    <div class="confirm-dialog">
      <p style="margin-bottom: 0.5rem;">Are you sure to delete your account?</p>

      <div style="display: flex; gap: 1rem;">
        <p class="danger-btn" @click="deleteAcc">Confirm</p>
        <p class="primary-btn" @click="showConfirmDialog = false">Cancel</p>
      </div>
    </div>
  </div>

  <div class="profile-container">
    <div class="section-card-wrapper">
      <section class="section-card">
        <h2 class="highlight">Account info</h2>
        <p class="section-info">*changes may take some time*</p>
        <div class="avatar-wrapper">
          <Profilepic alt="Avatar" class="avatar" />
          <div class="avatar-loading-frame" v-if="avatarLoading">
            <LoadingIndicator />
          </div>
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
              <input v-model="editable.phone" type="tel" />
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
    </div>

    <div class="section-card-wrapper">
      <section class="section-card">
        <h2 class="highlight">Misc</h2>
        <div class="field-box">
          <div class="field-row">
            <label><i class="bi bi-list-check"> </i> Registered Events</label>
            <button>
              <a href="/myevents">
                <i class="bi bi-box-arrow-up-right"></i>
                <span> Registered Events</span>
              </a>
            </button>
          </div>
        </div>
      </section>
    </div>

    <div class="section-card-wrapper">
      <section class="section-card danger-zone">
        <h2 class="highlight">Danger Zone</h2>
        <div class="btn-group-vertical">
          <button class="danger-btn" @click="logout">Sign Out</button>
          <button class="danger-btn" @click="showConfirmDialog = true">Delete Account</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import LoadingIndicator from '~/components/loading_indicator.vue'
import Profilepic from '~/components/profilepic.vue'

const { userProfile } = useAuth()

const router = useRouter()
const showConfirmDialog = ref(false)

const auth = useAuth()
const { userLoggedIn, authReady } = auth

const avatarLoading = ref(false)

watch(
  [userLoggedIn, authReady],
  ([isLoggedIn, authReady]) => {
    if (!isLoggedIn && authReady) {
      router.replace('/join')
    }
  },
  { immediate: true }
)


const editingField = ref(null)
const editable = ref({
  username: userProfile.value?.username || '',
  phone: userProfile.value?.phone || ''
})

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

async function onAvatarChange(event) {
  const file = event.target.files[0]
  if (!file) return
  avatarLoading.value = true

  userProfile.value.avatar = URL.createObjectURL(file)

  await $fetch('/api/auth/user/updatepfp', {
    method: 'POST',
    body: {
      image: await toBase64(file),
      type: file.type
    },
    onResponse() { avatarLoading.value = false }
  })

}

function startEditing(field) {
  editingField.value = field
  editable.value[field] = userProfile.value?.[field] || ''
}

function cancelEdit() {
  editingField.value = null
}

async function saveField(field) {
  const updatedValue = editable.value[field]
  console.log(JSON.parse(`{ "${field}": "${updatedValue}" }`))
  await $fetch('/api/auth/user/updateprofile', {
    method: 'POST',
    body: {
      updated_profile: await JSON.parse(`{ "${field}": "${updatedValue}" }`)
    }
  })
  userProfile.value[field] = updatedValue
  editingField.value = null
}

async function logout() {
  await $fetch('/api/auth/logout', {
    method: 'POST'
  })
  window.location.href = '/'
}

async function deleteAcc() {
  await $fetch('/api/auth/user/delete-account', {
    method: 'POST'
  })
  window.location.href = '/'
}
</script>

<style scoped>
.confirm-acc-removal-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99;
}

.confirm-dialog {
  background-color: var(--color-primary);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
  max-width: 100%;
  margin: 3rem auto;
  gap: 2rem;
}

.section-card-wrapper {
  background: linear-gradient(var(--color-highlight), var(--color-primary));
  border-radius: 1rem;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  width: 100%;
  min-width: 0;
}

.section-card {
  background-color: var(--color-primary);
  margin-top: 0.5rem;
  padding: 2rem;
  border-radius: 1rem;
}

.section-info {
  color: var(--color-text-secondary);
  text-align: center;
  font-size: 14px;
}

.section-card h2 {
  margin: 1rem 0;
}

.avatar-wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 1.5rem;
}

.avatar {
  max-width: 100%;
  max-height: 100%;
  border-radius: 1.5rem;
  object-fit: cover;
  box-shadow: 0 0 0 2px var(--color-highlight);
}

.avatar-loading-frame {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.edit-icon {
  position: absolute;
  bottom: -8px;
  right: -8px;
  background-color: var(--color-highlight);
  color: var(--color-primary);
  border-radius: 50%;
  padding: 6px 7px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-icon:hover {
  background-color: var(--color-primary);
  color: var(--color-highlight);
  box-shadow: 0 0 0 2px var(--color-highlight);
}

input {
  padding: 8px;
  border-radius: 0.25rem;
  border: 1px solid var(--color-border-secondary, #ccc);
  background-color: var(--color-counter-secondary);
  color: var(--color-text-primary);
  font-family: var(--font-stack);
  font-size: 14px;
  font-weight: 500;
  border: solid 1px var(--color-border-primary);
  width: 100%;
}

input::placeholder {
  color: var(--color-text-primary);
  opacity: 0.5;
}

input:focus,
input:hover {
  outline: solid 1px var(--color-highlight);
}

.field-box {
  background-color: var(--color-counter-primary);
  border-radius: 10px;
  padding: 0.5rem;
  margin: 0 auto 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.field-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  min-height: 2rem;
  box-sizing: border-box;
}

.field-row-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.field-row .edit-btn {
  white-space: nowrap;
  align-self: center;
}

.section-card-wrapper .field-row+.field-row {
  margin-top: 1rem;
}

.field-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 14px;
}

.field-row label {
  font-weight: bold;
}

.field-row span {
  flex-grow: 1;
  word-break: break-word;
}

.field-row input {
  width: 100%;
  min-width: 0;
  flex: 1 1 250px;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--color-border-primary);
  background-color: var(--color-counter-secondary);
  color: var(--color-text-primary);
  font-size: 14px;
  font-weight: 500;
  box-sizing: border-box;
}

.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-highlight);
  font-size: 1rem;
}

button a {
  color: var(--color-highlight);
  transition: all 0.3s ease;
}

button:hover a {
  color: var(--color-counter-primary);
}

button {
  background-color: var(--color-primary);
  color: var(--color-highlight);
  border: none;
  padding: 0.5rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

button:hover {
  background-color: var(--color-button-primary);
  color: var(--color-counter-primary);
}

a {
  text-decoration: none;
}

.danger-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.danger-zone h2 {
  align-self: flex-start;
  width: 100%;
  text-align: left;
  margin-bottom: 0.5rem;
}

.primary-btn, .danger-btn {
  text-align: center;
  padding: 1rem;
  width: 100%;
  max-width: 300px;
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  cursor: pointer;
}

.danger-btn {
  background-color: rgb(45, 0, 0);
  color: rgb(255, 140, 140);
  box-shadow: 0 0 0 1px rgb(255, 90, 90);
}

.danger-btn:hover {
  background-color: rgb(145, 0, 0);
  color: rgb(255, 140, 140);
  box-shadow: 0 0 0 2px rgb(255, 70, 70);
}

.primary-btn {
  background: var(--color-counter-primary);
  box-shadow: 0 0 0 1px var(--color-text-secondary);
  color: var(--color-text-secondary);
}

.primary-btn:hover {
  background: var(--color-counter-secondary);
  box-shadow: 0 0 0 2px var(--color-border-primary);
  color: var(--color-text-secondary);
}

.btn-group {
  width: 100%;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.btn-group button {
  margin-right: 0.5rem;
}

.btn-group-vertical {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
}

@media (max-width: 700px) {
  .profile-container {
    margin: 3rem 20px;
  }

  .avatar-wrapper {
    width: 75px;
    height: 75px;
  }
}

@media (max-width: 400px) {
  .profile-container {
    padding: 2rem 1rem;
  }

  .btn-group {
    justify-content: center;
  }

  .danger-btn {
    max-width: 100%;
  }
}
</style>
