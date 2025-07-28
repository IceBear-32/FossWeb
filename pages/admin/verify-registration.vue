<template>
  <div class="scanner-container">
    <h2 class="highlight">Scan QR Code</h2>
    <div id="qr-scanner" class="qr-box"></div>

    <p v-if="error" class="error">{{ error }}</p>

    <div v-if="parsedFields" class="fields">
      <h3 class="fields-title">Scanned Data:</h3>
      <ul>
        <li v-for="(value, key) in parsedFields" :key="key">
          <strong>{{ key }}:</strong> {{ value }}
        </li>
      </ul>
    </div>
    
    <button v-if="parsedFields" class="scanned-btn" @click="verify" :disabled="isVerified">{{isVerified ? "Verified" : "Verify entry"}}</button>
    <button v-if="parsedFields" class="scanned-btn" @click="startScan">Scan Again</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Html5Qrcode } from 'html5-qrcode'

const html5QrCode = ref<Html5Qrcode | null>(null)
const error = ref('')
const parsedFields = ref<Record<string, any> | null>(null)
const isScanning = ref(false)
const hasScanned = ref(false)
const isVerified = ref(false)

const startScan = async () => {
  if (isScanning.value) return
  parsedFields.value = null
  error.value = ''
  hasScanned.value = false
  isScanning.value = true
  isVerified.value = false

  try {
    if (!html5QrCode.value) {
      html5QrCode.value = new Html5Qrcode("qr-scanner", false)
    }

    await html5QrCode.value.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: { height: 250, width: 250 }, disableFlip: true },
      async (decodedText) => {
        if (hasScanned.value) return
        try {
          const json = JSON.parse(decodedText)
          parsedFields.value = json
          hasScanned.value = true
          error.value = ""
          await html5QrCode.value?.stop()
          isScanning.value = false
        } catch (e) {
          error.value = "Unknown QR format"
        }
      },
      () => {}
    )
  } catch (e) {
    error.value = 'Could not start camera'
    isScanning.value = false
  }
}

const verify = async () => {
    const {data, error} = await useFetch('/api/events/verifyreg', {
        method: 'POST',
        body: {
          title: parsedFields.value?.event,
          pRegNo: parsedFields.value?.regNo,
          pName: parsedFields.value?.name,
          pClass: parsedFields.value?.class
        }
    })

    if (error.value) {
        console.error('Verification failed:', error.value)
        return
    }

    else isVerified.value = true
}

onMounted(() => {
  startScan()
})

onBeforeUnmount(() => {
  html5QrCode.value?.stop().catch(console.error)
})
</script>

<style scoped>
.scanner-container {
  background: var(--color-primary);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--color-border-primary);
  max-width: 400px;
  margin: 2rem auto;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  color: var(--color-text-primary);
  text-align: center;
}

.qr-box {
  width: 100%;
  border: 2px dashed var(--color-border-primary);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1rem;
}

.error {
  color: rgb(255, 69, 69);
  margin-top: 0.5rem;
  font-weight: 500;
}

.fields {
  margin-top: 1rem;
  text-align: left;
}

.fields-title {
  color: var(--color-highlight);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.fields ul {
  list-style: none;
  padding-left: 0;
}

.fields li {
  padding: 4px 0;
  font-size: 0.95rem;
  border-bottom: 1px solid var(--color-border-primary);
}

.scanned-btn {
  margin-top: 1rem;
  padding: 10px;
  width: 100%;
  background: var(--color-button-primary);
  color: var(--color-counter-primary);
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.scanned-btn:hover {
  background: var(--color-highlight);
  color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-button-primary);
}
</style>
