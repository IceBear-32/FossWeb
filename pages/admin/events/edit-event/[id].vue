<template>
    <div class="edit-container">
        <h2 class="edit-title highlight" v-if="!selected_event">Event not found</h2>
        <template v-else>
        <h2 class="edit-title highlight">Edit Event Details</h2>

        <form @submit.prevent="submitEvent" class="edit-form">
            <div class="form-group">
                <input v-model="title" type="text" placeholder="Event Title" required class="input" />
            </div>

            <div class="form-group">
                <textarea v-model="description" placeholder="Event Description" rows="4" required class="textarea"></textarea>
            </div>

            <div class="form-group">
                <input v-model="date" type="date" required class="input" />
            </div>
            <button type="submit" class="submit-btn">Submit edit</button>
            <button @click.stop="deleteEvent" class="submit-btn danger-btn">Delete event</button>
            <a :href="`../../../gallery/${selected_event.id}`" class="gallery-link">Click here to edit event images</a>
        </form>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const selected_event = ref(null)

const userIsAdmin = computed(() => useAuth().userIsAdmin.value)

const title = ref('')
const description = ref('')
const date = ref('')

onMounted(() => {
    const id = window.location.href.split('/').pop()

    $fetch('/api/events/getevent', {
        method: 'GET',
        headers: { id },
        onResponse(data) {
            const { event } = data.response._data

            if (event) {
                selected_event.value = event
                title.value = selected_event.value.title
                description.value = selected_event.value.description
                date.value = selected_event.value.date
            }

        }
    })
})



const submitEvent = async () => {
    const res = await $fetch('/api/events/editevent', {
        method: 'POST',
        body: {
            id: selected_event.value.id,
            updated_event: {
                title: title.value,
                description: description.value,
                date: date.value,
                thumbnail: selected_event.value.thumbnail
            }
        },
        onResponse(response) {
            if (response.response._data.message) {
                title.value = ''
                description.value = ''
                date.value = ''
                thumbnail.value = null
                preview.value = null
            } else {
                console.error('Event edit failed:', response.statusText)
            }
        }
    })

    if (res.event) alert('Event editted successfully!')
}

const deleteEvent = async () => {
    const res = await $fetch('/api/events/deleteevent', {
        method: 'POST',
        body: { id: selected_event.value.id }
    })

    if (res.error) alert("Error: " + res.error)
    else {
        alert("Event deleted successfully")
        window.location.reload()
    }
}
</script>

<style scoped>
.edit-container {
    max-width: 400px;
    margin: 95px auto;
    background: var(--color-primary);
    border-radius: 8px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
}

.edit-title {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.edit-form {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.form-group {
    width: 100%;
}

.input,
.textarea {
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

.input:focus,
.textarea:focus {
    border-color: var(--color-highlight);
    outline: none;
}

.input::placeholder,
.textarea::placeholder {
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

.gallery-link {
    color: var(--color-text-secondary);
    text-align: center;
    font-size: 14px;
}

@media (max-width: 1150px) {
    .edit-container {
        margin: 80px auto;
    }
}

@media (max-width: 900px) {
    .edit-container {
        max-width: 350px;
        margin: 70px auto;
    }
}

@media (max-width: 700px) {
    .edit-container {
        max-width: 320px;
        margin: 60px auto;
        padding: 1.5rem;
    }

    .edit-title {
        font-size: 1.3rem;
    }
}

@media (max-width: 500px) {
    .edit-container {
        max-width: 100%;
        margin: 40px 20px;
        padding: 1.2rem;
    }

    .edit-title {
        font-size: 1.2rem;
    }
}
</style>