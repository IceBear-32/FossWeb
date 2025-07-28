<template>
    <input type="file" ref="galleryInputRef" multiple accept="image/*,video/*" style="display: none"
        @change="handleGalleryChange" />


    <input type="file" ref="fileInputRef" accept="image/*" style="display: none" @change="handleFileChange" />

    <div v-if="showConfirmDialog" class="image-preview-modal" @click.self="cancelUpload">
        <div class="confirm-dialog">
            <p style="margin-bottom: 0.5rem;">Confirm thumbnail upload?</p>

            <img v-if="previewUrl" :src="previewUrl" alt="Preview"
                style="max-width: 200px; max-height: 200px; border-radius: 0.5rem; margin-bottom: 1rem;" />

            <div style="display: flex; gap: 1rem;">
                <p class="admin-tool primary-btn" @click="confirmUpload">Confirm</p>
                <p class="admin-tool danger-btn" @click="cancelUpload">Cancel</p>
            </div>
        </div>
    </div>


    <div class="gallery-container">
        <div class="gallery-content">
            <template v-if="selected_event">
                <h1 class="highlight">Thumbnail</h1>
                <p v-if="userIsAdmin" class="admin-info">*changes may take some time*</p>
                <div class="thumbnail-content"
                    :style="!selected_event.images.thumbnail ? { backgroundColor: 'var(--color-counter-secondary)', minHeight: '20vh' } : { minHeight: '20vh' }"
                    @click="selected_event.images.thumbnail ? openImage(selected_event.images.thumbnail) : null">
                    <p v-if="!selected_event.images.thumbnail" class="no-thumbnail-placeholder">No
                        thumbnail found</p>
                    <img v-else class="image-item" :src="'/api/storage/fetch?path=' + selected_event.images.thumbnail"
                        :alt="selected_event.images.thumbnail.split('/').pop()">
                    <div v-if="userIsAdmin" class="admin-toolbar">
                        <i v-if="!selected_event.images.thumbnail" class="bi bi-plus admin-tool primary-btn"
                            @click.stop="triggerFilePicker"></i>
                        <template v-else>
                            <i class="bi bi-pencil-square admin-tool primary-btn" @click.stop="triggerFilePicker"></i>
                            <i class="bi bi-trash admin-tool danger-btn" @click.stop="deleteThumbnail"></i>
                        </template>
                    </div>
                </div>
                <h1 class="highlight">Gallery</h1>
                <p v-if="userIsAdmin" class="admin-info">*changes may take some time*</p>
                <p v-if="selected_event.images.gallery.length == 0" class="empty-gallery-placeholder">
                    Event gallery is empty</p>

                <div v-else class="gallery-items-container">
                    <div class="gallery-item" v-for="(gallery_path, index) in selected_event.images.gallery"
                        :key="index" @click="openImage(gallery_path)">
                        <img class="image-item" :src="'/api/storage/fetch?path=' + gallery_path">
                        <div v-if="userIsAdmin" class="admin-toolbar">
                            <i class="bi bi-trash admin-tool danger-btn"
                                @click.stop="deleteGalleryItem(gallery_path)"></i>
                        </div>
                    </div>
                </div>
                <p v-if="userIsAdmin" class="admin-tool primary-btn" @click.stop="triggerGalleryPicker"><i class="bi bi-plus"></i> Add item
                </p>
            </template>
            <template v-else>
                <h1 class="highlight">Event Not Found</h1>
            </template>
        </div>
    </div>
    <div v-if="image_preview_modal" class="image-preview-modal" @click.self="image_preview_modal = false">
        <img class="preview-image" :src="'/api/storage/fetch?path=' + img_path" :alt="img_path.split('/').pop()">
    </div>
</template>

<script setup>
const selected_event = ref(null)
const image_preview_modal = ref(false)
const img_path = ref('')

const userIsAdmin = computed(() => useAuth().userIsAdmin.value)

onMounted(() => {
    const id = window.location.href.split('/').pop()

    $fetch('/api/events/getevent', {
        method: 'GET',
        headers: { id },
        onResponse(data) {
            const { event } = data.response._data

            if (event) {
                selected_event.value = event
            }

        }
    })
})

function openImage(path) {
    image_preview_modal.value = true
    img_path.value = path
}

async function deleteThumbnail() {
    $fetch('/api/storage/delete', {
        method: 'POST',
        body: { path: selected_event.value.images.thumbnail },
        async onResponse(res) {
            if (res.response._data.message) {
                selected_event.value.images.thumbnail = ''
                const fres = await $fetch('/api/events/editevent', {
                    method: 'POST',
                    body: {
                        id: selected_event.value.id,
                        updated_event: selected_event.value
                    }
                })

                if (fres.error) console.log('Failed to edit event')
            }
        }
    })
}

async function deleteGalleryItem(path) {
    $fetch('/api/storage/delete', {
        method: 'POST',
        body: { path },
        async onResponse(res) {
            if (res.response._data.message) {
                selected_event.value.images.gallery = selected_event.value.images.gallery.filter(item => item != path)
                const fres = $fetch('/api/events/editevent', {
                    method: 'POST',
                    body: {
                        id: selected_event.value.id,
                        updated_event: selected_event.value
                    }
                })

                if (fres.error) console.log('Failed to edit event')
            }
        }
    })
}


const fileInputRef = ref(null)
const showConfirmDialog = ref(false)
const selectedFile = ref(null)
const previewUrl = ref('')

function triggerFilePicker() {
    fileInputRef.value?.click()
}

function handleFileChange(event) {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
        selectedFile.value = file

        const reader = new FileReader()
        reader.onload = () => {
            previewUrl.value = reader.result
            showConfirmDialog.value = true
        }
        reader.readAsDataURL(file)
    } else {
        selectedFile.value = null
        previewUrl.value = ''
    }
}

function cancelUpload() {
    selectedFile.value = null
    previewUrl.value = ''
    showConfirmDialog.value = false
    fileInputRef.value.value = null
}

async function confirmUpload() {
    if (!selectedFile.value) return

    const type = selectedFile.value.type
    const path = `events/thumbnail/${selected_event.value.title}`

    const res = await $fetch(`/api/storage/${selected_event.value.images.thumbnail ? 'update' : 'upload'}`, {
        method: 'POST',
        body: { file: previewUrl.value, type, path }
    })

    if (res.data) {
        selected_event.value.images.thumbnail = path
        await $fetch('/api/events/editevent', {
            method: 'POST',
            body: {
                id: selected_event.value.id,
                updated_event: selected_event.value
            }
        })
        window.location.reload()
    }

    cancelUpload()
}

const galleryInputRef = ref(null)

function triggerGalleryPicker() {
    galleryInputRef.value?.click()
}

async function handleGalleryChange(event) {
    const files = event.target.files
    if (!files || !files.length) return

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()

        await new Promise((resolve) => {
            reader.onload = async () => {
                const type = file.type
                const path = `events/gallery${selected_event.value.title}_${selected_event.value.id}/item-${selected_event.value.images.gallery.length}`

                const res = await $fetch('/api/storage/upload', {
                    method: 'POST',
                    body: { file: reader.result, type, path }
                })

                if (res?.data) {
                    selected_event.value.images.gallery.push(path)
                }

                resolve()
            }
            reader.readAsDataURL(file)
        })
    }

    await $fetch('/api/events/editevent', {
        method: 'POST',
        body: {
            id: selected_event.value.id,
            updated_event: selected_event.value
        }
    })

    galleryInputRef.value.value = null
}

</script>


<style scoped>
.gallery-container {
    padding: 60px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h1 {
    margin-top: 1rem;
    font-size: 24px;
    text-align: center;
}

p {
    margin: 0;
}

.admin-info {
    color: var(--color-text-secondary);
    font-weight: bold;
}

.gallery-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    background-color: var(--color-primary);
    border-radius: 0.5rem;
    min-width: 60%;
    max-width: 80%;
    margin: 0 50px;
}

.thumbnail-content,
.gallery-item {
    border-radius: 0.5rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex-direction: column;
    max-width: 90%;
    margin: 0 auto;
}

.thumbnail-content {
    max-width: 400px;
    width: 100%;
}

.image-item {
    width: 100%;
    height: auto;
    max-width: 400px;
    border: 2px solid var(--color-border-primary);
    border-radius: 0.25rem;
}

.no-thumbnail-placeholder {
    padding: 2rem;
    color: var(--color-text-secondary);
    font-size: 14px;
}

.admin-toolbar {
    position: absolute;
    bottom: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    padding: 0.5rem;
    background-color: var(--color-primary);
    border: 1px solid var(--color-border-primary);
    border-radius: 0.5rem;
}

.admin-tool {
    font-size: 1rem;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.primary-btn {
    background: var(--color-counter-primary);
    box-shadow: 0 0 0 1px var(--color-text-secondary);
    color: var(--color-text-secondary);
}

.primary-btn:hover {
    background: var(--color-counter-secondary);
    box-shadow: 0 0 0 2px var(--color-border-primary);
}

.danger-btn {
    background-color: rgb(45, 0, 0);
    color: rgb(255, 140, 140);
    box-shadow: 0 0 0 1px rgb(255, 90, 90);
}

.danger-btn:hover {
    background-color: rgb(145, 0, 0);
    box-shadow: 0 0 0 2px rgb(255, 70, 70);
}

.empty-gallery-placeholder {
    color: var(--color-text-secondary);
    font-weight: 600;
}

.image-preview-modal {
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

.preview-image {
    max-height: 80%;
    max-width: 80%;
}

.gallery-items-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    width: 100%;
    justify-items: center;
}

.gallery-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    max-width: 100%;
    width: 100%;
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


@media (max-width: 700px) {
    .gallery-items-container {
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    }
}

@media (max-width: 500px) {
    .no-thumbnail-placeholder {
        padding: 0.5rem;
        font-size: 12px;
    }

    .admin-tool {
        font-size: 14px;
        padding: 0.3rem;
    }

    .admin-toolbar {
        padding: 0.3rem;
    }
}

@media (max-width: 450px) {
    .gallery-items-container {
        grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
    }

    .admin-toolbar {
        bottom: 0.2rem;
    }
}
</style>