<!-- components/CropModal.vue -->
<template>
  <div v-if="visible" class="crop-modal">
    <div class="crop-content">
      <img ref="image" :src="src" class="crop-image" />
      <div class="crop-actions">
        <button @click="crop">Crop & Save</button>
        <button @click="close">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const props = defineProps(['src', 'visible'])
const emits = defineEmits(['close', 'cropped'])

const cropper = ref(null)
const image = ref(null)

watch(() => props.visible, async (val) => {
  if (val) {
    await nextTick()
    cropper.value = new Cropper(image.value, {
      aspectRatio: 1,
      viewMode: 1,
      autoCropArea: 1,
    })
  } else {
    cropper.value?.destroy()
    cropper.value = null
  }
})

function crop() {
  const canvas = cropper.value.getCroppedCanvas({
    width: 300,
    height: 300,
  })
  emits('cropped', canvas.toDataURL('image/png'))
  close()
}

function close() {
  emits('close')
}
</script>

<style scoped>
.crop-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.crop-content {
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  max-width: 90vw;
  max-height: 90vh;
}

.crop-image {
  max-width: 100%;
  max-height: 70vh;
}

.crop-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>
