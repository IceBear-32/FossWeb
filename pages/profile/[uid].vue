<template>

  <div class="profile-container">
    <div class="section-card-wrapper">
      <section class="section-card" v-if="userProfile?.uid">
        <h2 class="highlight">Account info</h2>
        <div class="avatar-wrapper">
          <Profilepic :uid="userProfile?.uid" alt="Avatar" class="avatar" />
        </div>

        <div class="field-box">
          <div class="field-row">
            <label><i class="bi bi-person"></i></label>
            <span>{{ userProfile?.username || 'User' }}</span>
          </div>
        </div>

        <div class="field-box">
          <div class="field-row">
            <label><i class="bi bi-telephone"></i></label>
            <span>{{ userProfile?.phone || 'Not added' }}</span>
          </div>
        </div>

        <div class="field-box">
          <div class="field-row">
            <label><i class="bi bi-envelope"></i></label>
            <span>{{ userProfile?.email || 'Not provided' }}</span>
          </div>
        </div>
      </section>
      <section class="section-card" v-else>
        <h2 class="highlight">User not found</h2>
      </section>
    </div>
    </div>
</template>

<script setup>
import Profilepic from '~/components/profilepic.vue'
const userProfile = ref(null)

onMounted(async () => {
  userProfile.value = await $fetch('/api/public/getprofile', {
    method: 'GET',
    headers: {uid: window.location.href.split('/').pop()}
  })
})
</script>

<style scoped>
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
}
</style>
