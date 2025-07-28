<template>
    <div class="loading-animation" :style="{height: size+'px', width: size+'px'}">
        <div class="animation-center" :style="{height: size/2.5+'px', width: size/2.5+'px'}"></div>
    </div>
</template>

<script setup>
const props = defineProps({
    size: {
        default: 20,
        type: Number
    }
})
</script>

<style scoped>
.loading-animation {
  height: 20px;
  width: 20px;
  border: 0.5rem solid var(--color-highlight);
  animation: loading 1s infinite;
  border-radius: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.animation-center {
    background-color: var(--color-highlight);
    border-radius: 25%;
    animation: loading 2s infinite;
}

@keyframes loading {
  0% {
    rotate: 0deg;
    border-radius: 25%;
    scale: 1;
  }
  50% {
    border-radius: 47.5%;
    scale: 1.2;
  }
  
  75% {
    rotate: 90deg;
    scale: 1.25;
  }

  100% {
    rotate: 90deg;
    border-radius: 25%;
    scale: 1;
  }
}
</style>