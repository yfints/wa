<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

defineOptions({ name: 'PracticeLoading' });

const percent = ref(0);
const isLoading = computed(() => percent.value < 100);
let timer = 0;

onMounted(() => {
  timer = window.setInterval(() => {
    if (percent.value >= 100) {
      window.clearInterval(timer);
      return;
    }
    percent.value = Math.min(100, percent.value + 2);
  }, 40);
});

onBeforeUnmount(() => {
  window.clearInterval(timer);
});
</script>

<template>
  <div
    class="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-black text-white"
  >
    <div class="w-[180px]">
      <img
        src="https://www.waxueshe.com/v0.0.137/assets/ico-B8-iFjhn.png"
        class="h-auto w-full"
        :class="{ 'animate-logo-rock': isLoading }"
      >
    </div>

    <div
      class="absolute bottom-[72px] left-1/2 flex w-[min(420px,70vw)] -translate-x-1/2 flex-col items-center gap-3.5"
    >
      <div class="h-2.5 w-full overflow-hidden rounded-full bg-[#2a2a2e]">
        <i
          class="block h-full rounded-full bg-gradient-to-r from-[#c4b5fd] to-[#a78bfa] transition-[width] duration-75"
          :style="{ width: `${percent}%` }"
        ></i>
      </div>
      <div class="flex items-center gap-2 text-sm text-white">
        <span
          class="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/25 border-t-white"
        ></span>
        <span>课程加载中 ({{ percent }}%) ...</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-logo-rock {
  animation: logo-rock 1.2s ease-in-out infinite;
  transform-origin: center;
}

@keyframes logo-rock {
  0%,
  100% {
    transform: rotate(-45deg);
  }

  50% {
    transform: rotate(45deg);
  }
}
</style>
