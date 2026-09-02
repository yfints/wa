<script lang="ts" setup>
import { computed, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { IconifyIcon } from '@vben/icons';

export interface PracticeMode {
  desc: string;
  id: string;
  scene: 'desk' | 'library' | 'studio';
  tag: string;
  title: string;
}

const open = defineModel<boolean>('open', { default: false });
const activeIndex = defineModel<number>('activeIndex', { default: 1 });

const route = useRoute();
const router = useRouter();

const modes: PracticeMode[] = [
  {
    id: 'speaking',
    tag: '口语练习',
    title: '口语练习',
    desc: '戴上耳机开口跟读，练习语音语调与日常表达。',
    scene: 'studio',
  },
  {
    id: 'zh-en',
    tag: '新手推荐',
    title: '中译英模式',
    desc: '看到中文提示，尝试用英文表达。练习运用所学词汇和语法。',
    scene: 'desk',
  },
  {
    id: 'dictation',
    tag: '听写模式',
    title: '听写模式',
    desc: '听音频写出英文，训练听力和拼写准确度。',
    scene: 'library',
  },
];

const activeMode = computed(() => modes[activeIndex.value] ?? modes[1]);

function positionOf(index: number) {
  const total = modes.length;
  const offset = (index - activeIndex.value + total) % total;
  if (offset === 0) return 'center';
  if (offset === 1) return 'right';
  return 'left';
}

function onKeydown(event: KeyboardEvent) {
  if (!open.value) return;
  if (event.key === 'Escape') close();
  if (event.key === 'ArrowLeft') select(activeIndex.value - 1);
  if (event.key === 'ArrowRight') select(activeIndex.value + 1);
}

watch(open, (visible) => {
  document.body.style.overflow = visible ? 'hidden' : '';
  if (visible) {
    window.addEventListener('keydown', onKeydown);
  } else {
    window.removeEventListener('keydown', onKeydown);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  document.body.style.overflow = '';
});

function close() {
  open.value = false;
}

function select(index: number) {
  const total = modes.length;
  activeIndex.value = (index + total) % total;
}

function startPractice() {
  const courseId = String(route.params.id || '');
  const mode = activeMode.value?.id || 'zh-en';
  close();
  void router.push({
    path: `/learning/practice/${courseId}`,
    query: { mode },
  });
}

function onMaskClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    close();
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="mode-mask" @click="onMaskClick">
      <section class="mode-dialog">
        <header class="dialog-head">
          <h2>选择练习模式</h2>
          <button class="close" type="button" @click="close">
            <IconifyIcon icon="lucide:x" />
          </button>
        </header>

        <div class="carousel">
          <article
            v-for="(mode, index) in modes"
            :key="mode.id"
            class="mode-card"
            :class="positionOf(index)"
            @click="select(index)"
          >
            <div class="scene" :class="mode.scene">
              <span class="tag">{{ mode.tag }}</span>
              <svg
                v-if="mode.scene === 'desk'"
                class="art"
                viewBox="0 0 220 150"
              >
                <rect fill="#2b2418" height="150" rx="16" width="220" />
                <rect fill="#3d3424" height="46" width="220" y="104" />
                <circle cx="168" cy="38" fill="#f5d76e" r="16" />
                <path
                  d="M168 54v28"
                  stroke="#d4b24a"
                  stroke-linecap="round"
                  stroke-width="4"
                />
                <ellipse cx="92" cy="92" fill="#7dce4a" rx="34" ry="26" />
                <circle cx="80" cy="78" fill="#8fe05a" r="11" />
                <circle cx="104" cy="78" fill="#8fe05a" r="11" />
                <circle cx="80" cy="78" fill="#fff" r="5" />
                <circle cx="104" cy="78" fill="#fff" r="5" />
                <circle cx="81" cy="79" fill="#1f2937" r="2.5" />
                <circle cx="105" cy="79" fill="#1f2937" r="2.5" />
                <rect fill="#e7d7b3" height="18" rx="2" width="36" x="70" y="108" />
                <path
                  d="M118 108l18-10 4 22-18 4z"
                  fill="#6b7280"
                />
              </svg>
              <svg
                v-else-if="mode.scene === 'studio'"
                class="art"
                viewBox="0 0 220 150"
              >
                <rect fill="#1d2430" height="150" rx="16" width="220" />
                <rect fill="#111827" height="28" width="220" y="122" />
                <ellipse cx="108" cy="94" fill="#7dce4a" rx="32" ry="24" />
                <circle cx="96" cy="80" fill="#8fe05a" r="11" />
                <circle cx="120" cy="80" fill="#8fe05a" r="11" />
                <circle cx="96" cy="80" fill="#fff" r="5" />
                <circle cx="120" cy="80" fill="#fff" r="5" />
                <circle cx="97" cy="81" fill="#1f2937" r="2.5" />
                <circle cx="121" cy="81" fill="#1f2937" r="2.5" />
                <path
                  d="M78 78c-16-2-22 12-18 22"
                  fill="none"
                  stroke="#94a3b8"
                  stroke-width="4"
                />
                <rect fill="#cbd5e1" height="22" rx="6" width="16" x="132" y="86" />
                <circle cx="140" cy="80" fill="#64748b" r="7" />
              </svg>
              <svg v-else class="art" viewBox="0 0 220 150">
                <rect fill="#2a221c" height="150" rx="16" width="220" />
                <rect fill="#6b4a2f" height="90" width="28" x="18" y="28" />
                <rect fill="#8b5e34" height="90" width="28" x="174" y="28" />
                <ellipse cx="110" cy="96" fill="#7dce4a" rx="32" ry="24" />
                <circle cx="98" cy="82" fill="#8fe05a" r="11" />
                <circle cx="122" cy="82" fill="#8fe05a" r="11" />
                <circle cx="98" cy="82" fill="#fff" r="5" />
                <circle cx="122" cy="82" fill="#fff" r="5" />
                <circle cx="99" cy="83" fill="#1f2937" r="2.5" />
                <circle cx="123" cy="83" fill="#1f2937" r="2.5" />
                <rect fill="#93c5fd" height="18" rx="2" width="42" x="88" y="108" />
              </svg>
            </div>
            <h3>{{ mode.title }}</h3>
            <p>{{ mode.desc }}</p>
          </article>
        </div>

        <footer class="actions">
          <button class="cancel" type="button" @click="close">取消</button>
          <button class="start" type="button" @click="startPractice">
            开始练习
          </button>
        </footer>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.mode-mask {
  position: fixed;
  inset: 0;
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgb(8 8 10 / 48%);
  backdrop-filter: blur(10px);
}

.mode-dialog {
  width: min(760px, 94vw);
  padding: 22px 28px 24px;
  background: rgb(38 39 46 / 88%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 22px;
  box-shadow: 0 24px 80px rgb(0 0 0 / 38%);
}

.dialog-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.dialog-head h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}

.close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: #eee;
  cursor: pointer;
  background: rgb(255 255 255 / 8%);
  border: 0;
  border-radius: 50%;
}

.carousel {
  position: relative;
  height: 360px;
  margin: 8px 0 18px;
}

.mode-card {
  position: absolute;
  top: 18px;
  width: 280px;
  padding: 0 0 16px;
  overflow: hidden;
  cursor: pointer;
  background: #1c1d24;
  border: 1px solid rgb(255 255 255 / 8%);
  border-radius: 16px;
  transition:
    transform 0.28s ease,
    opacity 0.28s ease;
}

.mode-card.center {
  left: 50%;
  z-index: 3;
  transform: translateX(-50%) scale(1);
}

.mode-card.left {
  left: 8%;
  z-index: 1;
  opacity: 0.55;
  transform: translateX(-18%) scale(0.82);
}

.mode-card.right {
  right: 8%;
  left: auto;
  z-index: 1;
  opacity: 0.55;
  transform: translateX(18%) scale(0.82);
}

.scene {
  position: relative;
  height: 168px;
  overflow: hidden;
}

.art {
  width: 100%;
  height: 168px;
}

.tag {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  padding: 3px 8px;
  font-size: 12px;
  color: #fff;
  background: #3b82f6;
  border-radius: 999px;
}

.mode-card h3 {
  margin: 14px 16px 6px;
  font-size: 18px;
  color: #fff;
}

.mode-card p {
  display: -webkit-box;
  height: 40px;
  margin: 0 16px;
  overflow: hidden;
  -webkit-line-clamp: 2;
  font-size: 13px;
  line-height: 20px;
  color: #9a9aa8;
  -webkit-box-orient: vertical;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.cancel,
.start {
  height: 44px;
  font-size: 15px;
  cursor: pointer;
  border-radius: 10px;
}

.cancel {
  color: #eee;
  background: transparent;
  border: 1px solid #6b6b76;
}

.start {
  color: #fff;
  background: linear-gradient(90deg, #4f7dff 0%, #7b5cff 100%);
  border: 0;
}

@media (max-width: 720px) {
  .carousel {
    height: 320px;
  }

  .mode-card {
    width: 78%;
  }

  .mode-card.left,
  .mode-card.right {
    display: none;
  }
}
</style>
