<script lang="ts" setup>
import { IconifyIcon } from '@vben/icons';
import { updatePreferences, usePreferences } from '@vben/preferences';

defineOptions({ name: 'AuthLayout' });

const { isDark } = usePreferences();

function toggleTheme() {
  updatePreferences({
    theme: { mode: isDark.value ? 'light' : 'dark' },
  });
}
</script>

<template>
  <div
    class="background_url relative flex min-h-screen items-center justify-center overflow-hidden text-[#2b2f36] dark:text-[#e8eef8]"
  >
    <div
      class="pointer-events-none absolute inset-0 hidden bg-[#0b1220]/55 dark:block"
    ></div>

    <button
      class="absolute top-5 right-5 z-[2] inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-white/80 text-[#2b2f36] shadow-sm backdrop-blur dark:border-white/15 dark:bg-[#1c2433]/80 dark:text-[#e8eef8]"
      type="button"
      @click="toggleTheme"
    >
      <IconifyIcon :icon="isDark ? 'lucide:sun' : 'lucide:moon'" />
    </button>

    <div class="relative z-[1] w-full max-w-[400px] px-4 py-10">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.background_url {
  background:
    url('https://www.waxueshe.com/v0.0.138/assets/1-DhL37GjS.png') center / cover
      no-repeat,
    linear-gradient(180deg, #9fd3ff 0%, #cbe6ff 42%, #eef6ff 100%);
}
</style>
