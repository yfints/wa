<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { IconifyIcon } from '@vben/icons';

import CourseCover from './course-square/course-cover.vue';
import { courseList } from './course-square/data';

const router = useRouter();

const open = defineModel<boolean>('open', { default: false });

const query = ref('');
const inputRef = ref<HTMLInputElement>();

const results = computed(() => {
  const keyword = query.value.trim().toLowerCase();
  if (!keyword) return [];
  return courseList.filter((item) => item.title.toLowerCase().includes(keyword));
});

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    close();
  }
}

watch(open, async (visible) => {
  document.body.style.overflow = visible ? 'hidden' : '';
  if (visible) {
    query.value = '';
    window.addEventListener('keydown', onKeydown);
    await nextTick();
    inputRef.value?.focus();
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

function openCourse(id: string) {
  close();
  void router.push(`/learning/course/${id}`);
}

function onMaskClick(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    close();
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="search-mask" @click="onMaskClick">
      <section class="search-panel" @keydown.esc="close">
        <div class="search-bar">
          <IconifyIcon icon="lucide:search" class="search-icon" />
          <input
            ref="inputRef"
            v-model="query"
            placeholder="搜索你想要的课程"
            type="text"
          />
        </div>
        <button class="close" type="button" @click="close">
          <IconifyIcon icon="lucide:x" />
        </button>

        <div v-if="!query.trim()" class="empty">
          <svg
            class="frog"
            viewBox="0 0 220 180"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text x="28" y="38" fill="#fff" font-size="18" opacity="0.85">
              ✦
            </text>
            <text x="188" y="52" fill="#fff" font-size="14" opacity="0.7">
              ✦
            </text>
            <text x="168" y="28" fill="#fff" font-size="10" opacity="0.55">
              ✦
            </text>
            <path
              d="M38 86h144l12 78H26z"
              fill="#c9a06a"
              stroke="#8d6b3d"
              stroke-width="3"
            />
            <path d="M38 86h144l-10 18H48z" fill="#e8c48a" />
            <path d="M50 104h120v48H50z" fill="#b8894f" />
            <text
              x="62"
              y="136"
              fill="#ef4444"
              font-family="Comic Sans MS, cursive"
              font-size="28"
              font-weight="700"
            >
              a
            </text>
            <text
              x="88"
              y="136"
              fill="#22c55e"
              font-family="Comic Sans MS, cursive"
              font-size="28"
              font-weight="700"
            >
              b
            </text>
            <text
              x="116"
              y="136"
              fill="#3b82f6"
              font-family="Comic Sans MS, cursive"
              font-size="28"
              font-weight="700"
            >
              c
            </text>
            <text
              x="144"
              y="136"
              fill="#eab308"
              font-family="Comic Sans MS, cursive"
              font-size="28"
              font-weight="700"
            >
              d
            </text>
            <ellipse cx="110" cy="78" rx="36" ry="28" fill="#7dce4a" />
            <circle cx="96" cy="62" r="12" fill="#8fe05a" />
            <circle cx="124" cy="62" r="12" fill="#8fe05a" />
            <circle cx="96" cy="62" r="6" fill="#fff" />
            <circle cx="124" cy="62" r="6" fill="#fff" />
            <circle cx="97" cy="63" r="3" fill="#1f2937" />
            <circle cx="125" cy="63" r="3" fill="#1f2937" />
            <ellipse cx="110" cy="80" rx="8" ry="5" fill="#4d9a2a" />
            <path
              d="M102 88c6 6 12 6 18 0"
              fill="none"
              stroke="#2f6b18"
              stroke-linecap="round"
              stroke-width="2"
            />
            <path d="M86 52l-10-14 16 6z" fill="#3f7a22" />
            <path d="M134 52l10-14-16 6z" fill="#3f7a22" />
            <rect
              x="148"
              y="70"
              width="34"
              height="22"
              rx="3"
              fill="#f4efe4"
              stroke="#8b7355"
            />
            <path d="M165 70v22" stroke="#8b7355" />
            <circle
              cx="168"
              cy="48"
              r="16"
              fill="none"
              stroke="#8fe05a"
              stroke-width="5"
            />
            <path
              d="M179 59l10 10"
              stroke="#8fe05a"
              stroke-linecap="round"
              stroke-width="4"
            />
          </svg>
          <p>试试输入课程名称吧？</p>
        </div>

        <div v-else-if="results.length === 0" class="empty">
          <p>没有找到相关课程</p>
        </div>

        <div v-else class="result-grid">
          <article
            v-for="course in results"
            :key="course.id"
            class="card"
            @click="openCourse(course.id)"
          >
            <CourseCover
              :art="course.art"
              :badge="course.badge"
              :subtitle="course.subtitle"
              :tone="course.tone"
            />
            <h3>{{ course.title }}</h3>
          </article>
        </div>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.search-mask {
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  background: rgb(8 8 10 / 42%);
  backdrop-filter: blur(10px);
}

.search-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  width: min(860px, 92vw);
  height: min(620px, 82vh);
  padding: 22px 28px 28px;
  background: rgb(36 37 43 / 58%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 28px;
  box-shadow: 0 24px 80px rgb(0 0 0 / 35%);
  backdrop-filter: blur(22px);
}

.search-bar {
  display: flex;
  gap: 10px;
  align-items: center;
  height: 52px;
  padding: 0 18px;
  background: rgb(20 21 26 / 55%);
  border: 1px solid rgb(255 255 255 / 8%);
  border-radius: 999px;
}

.search-icon {
  font-size: 20px;
  color: #cfcfd6;
}

.search-bar input {
  width: 100%;
  font-size: 16px;
  color: #f4f4f5;
  background: transparent;
  border: 0;
  outline: none;
}

.search-bar input::placeholder {
  color: #8b8b96;
}

.close {
  position: absolute;
  top: 18px;
  right: -56px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #eee;
  cursor: pointer;
  background: rgb(36 37 43 / 70%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 50%;
}

.close:hover {
  background: rgb(55 56 64 / 80%);
}

.empty {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #d8d8df;
}

.frog {
  width: 220px;
  height: 180px;
  margin-bottom: 8px;
}

.empty p {
  margin: 8px 0 0;
  font-size: 16px;
}

.result-grid {
  display: grid;
  flex: 1;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  padding-top: 20px;
  overflow: auto;
}

.card {
  cursor: pointer;
}

.card :deep(.cover) {
  height: 180px;
}

.card h3 {
  display: -webkit-box;
  height: 38px;
  margin: 8px 0 0;
  overflow: hidden;
  -webkit-line-clamp: 2;
  font-size: 13px;
  font-weight: 500;
  line-height: 19px;
  color: #ececf1;
  -webkit-box-orient: vertical;
}

@media (max-width: 800px) {
  .close {
    top: 12px;
    right: 12px;
  }

  .search-panel {
    padding: 18px 16px 16px;
  }
}
</style>
