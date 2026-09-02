<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { IconifyIcon } from '@vben/icons';

const route = useRoute();

const title = computed(() => String(route.meta.title || '功能建设中'));
</script>

<template>
  <div class="flex min-h-[calc(100vh-132px)] items-center justify-center">
    <div
      class="flex flex-col items-center gap-2.5 rounded-2xl border border-white/5 bg-[#16161c] px-9 py-12 text-[#d6d6de]"
    >
      <IconifyIcon class="text-[42px] text-[#8b7cff]" icon="lucide:construction" />
      <h2 class="mt-2 text-xl font-semibold text-white">{{ title }}</h2>
      <p class="m-0 text-[13px] text-[#8b8b98]">
        功能正在建设中，后续会在这里继续完善。
      </p>
    </div>
  </div>
</template>
