<script lang="ts" setup>
import { computed } from 'vue';

import { IconifyIcon } from '@vben/icons';

defineOptions({ name: 'LearningProgress' });

interface Props {
  finished?: number;
  total?: number;
  lastLearned?: string;
  learnedTime?: string;
}

const props = withDefaults(defineProps<Props>(), {
  finished: 0,
  total: 0,
  lastLearned: '未开始',
  learnedTime: '0秒',
});

const emit = defineEmits<{
  remove: [];
}>();

const progress = computed(() => {
  if (props.total <= 0) {
    return 0;
  }
  return Math.round((props.finished / props.total) * 100);
});
</script>

<template>
  <div
    class="mt-3.5 flex w-full flex-wrap items-center gap-2 rounded-xl bg-[#1c1c21] px-3 py-2.5 min-[901px]:flex-nowrap"
  >
    <span
      class="shrink-0 rounded-full border border-[#52c41a]/35 bg-[#1d271a] px-3 py-1 text-xs text-[#52c41a]"
    >
      学习: {{ learnedTime }}
    </span>
    <span
      class="shrink-0 rounded-full border border-[#1890ff]/35 bg-[#162338] px-3 py-1 text-xs text-[#1890ff]"
    >
      最近: {{ lastLearned }}
    </span>
    <div class="mx-4 h-2 min-w-[80px] flex-1 overflow-hidden rounded-full bg-[#262626]">
      <i class="block h-full rounded-full bg-blue-500" :style="{ width: `${progress}%` }"></i>
    </div>
    <span class="shrink-0 text-xs text-[var(--learn-fg)]">{{ progress }}%</span>
    <button
      class="ml-auto inline-flex h-7 cursor-pointer items-center gap-1 rounded-full border border-[#ff4d4f] bg-transparent px-4 text-xs text-[#ff4d4f] transition-colors hover:bg-[#ff4d4f]/10"
      type="button"
      @click="emit('remove')"
    >
      <IconifyIcon class="text-sm" icon="lucide:trash-2" />
      删除课程
    </button>
  </div>
</template>
