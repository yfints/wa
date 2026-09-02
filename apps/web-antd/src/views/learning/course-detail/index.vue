<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { IconifyIcon } from '@vben/icons';
import { cn } from '@vben/utils';

import { message } from 'ant-design-vue';

import CourseCover from '../course-square/course-cover.vue';
import { getCourseById } from '../course-square/data';
import { createLessons } from './lessons';
import PracticeModeModal from './practice-mode-modal.vue';

defineOptions({ name: 'CourseDetail' });

const route = useRoute();
const router = useRouter();
const favorited = ref(true);
const lessons = ref(createLessons());
const modeOpen = ref(false);

const course = computed(() => getCourseById(String(route.params.id)));

watch(
  () => route.params.id,
  (id) => {
    if (!getCourseById(String(id))) {
      router.replace('/learning/course-square');
      return;
    }
    lessons.value = createLessons();
    favorited.value = true;
  },
  { immediate: true },
);

const finishedCount = computed(
  () => lessons.value.filter((item) => item.finished > 0).length,
);
const progress = computed(() =>
  Math.round((finishedCount.value / lessons.value.length) * 100),
);

function continueLearn() {
  modeOpen.value = true;
}

function toggleFavorite() {
  favorited.value = !favorited.value;
  message.success(favorited.value ? '已收藏' : '已取消收藏');
}

function resetProgress() {
  lessons.value = createLessons();
  message.success('进度已重置');
}
</script>

<template>
  <div v-if="course" class="flex flex-col gap-[18px]">
    <section class="rounded-xl border border-white/5 bg-[#16161c] px-[18px] pt-4 pb-3.5">
      <div class="flex flex-wrap items-center gap-4">
        <div class="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-lg">
          <CourseCover
            class="thumb-cover"
            :art="course.art"
            :badge="course.badge"
            :subtitle="course.subtitle"
            :tone="course.tone"
          />
        </div>
        <div class="min-w-0 flex-1">
          <h1 class="mb-1.5 text-xl font-bold text-white">{{ course.title }}</h1>
          <p class="m-0 text-[13px] text-[#9a9aa8]">
            {{ finishedCount }} / {{ lessons.length }} 课时
          </p>
        </div>
        <div class="flex shrink-0 gap-2.5">
          <button
            class="h-9 cursor-pointer rounded-lg border-0 bg-blue-500 px-[18px] text-sm text-white"
            type="button"
            @click="continueLearn"
          >
            继续学习
          </button>
          <button
            class="h-9 cursor-pointer rounded-lg px-[18px] text-sm"
            :class="
              cn(
                favorited
                  ? 'border-0 bg-amber-500 text-[#1a1204]'
                  : 'border border-amber-500 bg-transparent text-amber-400',
              )
            "
            type="button"
            @click="toggleFavorite"
          >
            {{ favorited ? '已收藏' : '收藏' }}
          </button>
        </div>
      </div>
      <div
        class="mt-3.5 flex min-h-11 flex-col items-start justify-between gap-2.5 rounded-lg bg-[#101014] px-3.5 py-3 min-[901px]:flex-row min-[901px]:items-center min-[901px]:py-0"
      >
        <div class="flex gap-[18px] text-[13px] text-[#b7b7c2]">
          <span>学习: 39分45秒</span>
          <span>最近: 大约18小时前</span>
        </div>
        <div class="flex items-center gap-2.5">
          <div class="h-1.5 w-[180px] overflow-hidden rounded-full bg-[#2a2a32]">
            <i class="block h-full bg-blue-500" :style="{ width: `${progress}%` }"></i>
          </div>
          <b class="w-9 text-[13px] text-[#d5d5de]">{{ progress }}%</b>
          <button
            class="h-7 cursor-pointer rounded-md border border-[#3a3a44] bg-transparent px-2.5 text-xs text-[#c5c5cf]"
            type="button"
            @click="resetProgress"
          >
            重置进度
          </button>
        </div>
      </div>
    </section>

    <section
      class="grid grid-cols-1 gap-3.5 min-[601px]:grid-cols-2 min-[901px]:grid-cols-3 min-[1201px]:grid-cols-4"
    >
      <article
        v-for="lesson in lessons"
        :key="lesson.id"
        class="relative min-h-[132px] cursor-pointer rounded-[10px] border p-4 pb-3.5"
        :class="
          cn(
            lesson.recent
              ? 'border-transparent bg-gradient-to-br from-blue-600 to-blue-700'
              : 'border-white/5 bg-[#1a1b21]',
          )
        "
        @click="continueLearn"
      >
        <span
          class="absolute top-3.5 right-3.5 rounded-full px-2 py-0.5 text-xs"
          :class="
            cn(
              lesson.recent
                ? 'bg-white/15 text-blue-100'
                : 'bg-white/[0.06] text-[#9a9aa8]',
            )
          "
        >
          {{ lesson.recent ? '最近学习' : '暂未练习' }}
        </span>
        <h3
          class="mb-[18px] max-w-[86%] text-[15px] leading-[22px] font-semibold text-[#f3f3f7]"
        >
          {{ lesson.title }} · {{ lesson.en }}
        </h3>
        <div
          class="flex items-center gap-3 text-xs"
          :class="lesson.recent ? 'text-blue-100' : 'text-[#8b8b98]'"
        >
          <span class="inline-flex items-center gap-1">
            <IconifyIcon icon="lucide:clock-3" />
            {{ lesson.duration }}
          </span>
          <span class="inline-flex items-center gap-1">
            <IconifyIcon icon="lucide:circle-check" />
            已完成{{ lesson.finished }}次
          </span>
          <em class="ml-auto text-lg font-bold not-italic text-white/20">
            #{{ lesson.id }}
          </em>
        </div>
      </article>
    </section>

    <PracticeModeModal v-model:open="modeOpen" />
  </div>
</template>

<style scoped>
.thumb-cover :deep(.cover) {
  height: 72px;
  padding-top: 8px;
}

.thumb-cover :deep(.cover p) {
  font-size: 12px;
}

.thumb-cover :deep(.cover strong) {
  font-size: 11px;
}

.thumb-cover :deep(.cover small),
.thumb-cover :deep(.characters),
.thumb-cover :deep(.cover em) {
  display: none;
}
</style>
