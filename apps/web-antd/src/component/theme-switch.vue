<script lang="ts" setup>
import type { ThemeModeType } from '@vben/types';

import { IconifyIcon } from '@vben/icons';
import { preferences, updatePreferences } from '@vben/preferences';
import { cn } from '@vben/utils';

defineOptions({ name: 'ThemeSwitch' });

const modes: Array<{ icon: string; id: ThemeModeType; label: string }> = [
  { id: 'light', label: '白天模式', icon: 'lucide:sun' },
  { id: 'dark', label: '夜间模式', icon: 'lucide:moon' },
  { id: 'auto', label: '跟随系统', icon: 'lucide:sun-moon' },
];

function setMode(mode: ThemeModeType) {
  updatePreferences({ theme: { mode } });
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <button
      v-for="item in modes"
      :key="item.id"
      class="flex h-9 w-full cursor-pointer items-center gap-2.5 rounded-lg border-0 px-3 text-left text-sm"
      :class="
        cn(
          preferences.theme.mode === item.id
            ? 'bg-gradient-to-r from-[#799cfb] to-[#6245d1] text-white'
            : 'bg-transparent text-[var(--learn-fg)] hover:bg-[var(--learn-hover)]',
        )
      "
      type="button"
      @click="setMode(item.id)"
    >
      <IconifyIcon class="text-base" :icon="item.icon" />
      {{ item.label }}
    </button>
  </div>
</template>
