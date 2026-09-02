<script lang="ts" setup>
defineProps<{
  art: 'desk' | 'school';
  cover: string;
  headline: string;
  version: string;
}>();

const coverTheme: Record<string, string> = {
  cream: '#f6efe2',
  mint: '#dcefe4',
  sand: '#f3e4c8',
  sky: '#d7ebf7',
  lilac: '#e8e0f6',
  peach: '#f8dfd0',
};
</script>

<template>
  <div
    class="relative h-[210px] overflow-hidden rounded-md border border-black/5"
    :style="{ background: coverTheme[cover] ?? '#f6efe2' }"
  >
    <div class="absolute inset-1.5 rounded border-2 border-white/70"></div>
    <div class="relative z-[1] px-2 pt-5 text-center">
      <p class="m-0 text-[15px] font-extrabold leading-5 text-[#173a47]">
        {{ headline }}
      </p>
      <p class="mt-1 mb-0 text-[12px] font-semibold text-[#7a5a2b]">
        (新标准) {{ version }}
      </p>
    </div>

    <svg
      v-if="art === 'school'"
      class="absolute right-1 bottom-1 h-[108px] w-[158px]"
      viewBox="0 0 158 108"
    >
      <ellipse cx="118" cy="102" fill="#8fbf6a" opacity="0.55" rx="38" ry="8" />
      <rect fill="#7db7d8" height="58" rx="3" width="78" x="62" y="22" />
      <polygon fill="#c45c4a" points="58,26 101,6 144,26" />
      <rect fill="#f4efe4" height="14" width="12" x="74" y="36" />
      <rect fill="#f4efe4" height="14" width="12" x="94" y="36" />
      <rect fill="#f4efe4" height="14" width="12" x="114" y="36" />
      <rect fill="#f4efe4" height="18" width="16" x="92" y="62" />
      <circle cx="34" cy="78" fill="#f2c29b" r="9" />
      <circle cx="52" cy="80" fill="#e8b089" r="8" />
      <path d="M22 108c4-18 16-22 22-6 7-16 20-14 24 4" fill="#3d6dcc" />
    </svg>

    <svg
      v-else
      class="absolute right-0 bottom-0 h-[108px] w-[158px]"
      viewBox="0 0 158 108"
    >
      <rect fill="#d9c7a8" height="18" rx="2" width="46" x="18" y="78" />
      <rect fill="#d9c7a8" height="18" rx="2" width="46" x="72" y="78" />
      <circle cx="40" cy="58" fill="#f2c29b" r="9" />
      <circle cx="94" cy="56" fill="#e8b089" r="9" />
      <circle cx="128" cy="62" fill="#f0c8a4" r="8" />
      <path d="M28 88c3-16 14-18 20-4" fill="#3d6dcc" />
      <path d="M82 88c4-18 16-18 22-2" fill="#6b4dff" />
      <path d="M116 90c3-14 14-14 20 0" fill="#2f8f6a" />
      <rect fill="#8ec6e8" height="22" width="28" x="118" y="18" />
    </svg>
  </div>
</template>
