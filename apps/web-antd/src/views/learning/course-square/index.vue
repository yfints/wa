<script lang="ts" setup>
import type { Ref } from 'vue';

import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

import { IconifyIcon } from '@vben/icons';
import { cn } from '@vben/utils';

import CourseCover from './course-cover.vue';
import { courseCategories, courseList } from './data';

defineOptions({ name: 'CourseSquare' });

const router = useRouter();
const activeCategory = ref('全部');
const fallbackKeyword = ref('');
const keyword = inject<Ref<string>>('learningKeyword', fallbackKeyword);

const filteredCourses = computed(() => {
  const query = keyword.value.trim().toLowerCase();
  return courseList.filter((item) => {
    const matchCategory =
      activeCategory.value === '全部' || item.category === activeCategory.value;
    const matchKeyword = !query || item.title.toLowerCase().includes(query);
    return matchCategory && matchKeyword;
  });
});
</script>

<template>
  <div class="min-h-full">
    <div class="mb-3 flex min-h-12 items-center justify-between gap-4">
      <div class="flex flex-wrap items-center gap-x-[18px] gap-y-2">
        <button
          v-for="item in courseCategories"
          :key="item"
          class="cursor-pointer rounded-xl border-0 px-3 py-1.5 text-[13px] transition-all duration-200"
          :class="
            cn(
              activeCategory === item
                ? 'bg-gradient-to-br from-[#5e60cd] to-[#2f2b94] text-white'
                : 'bg-transparent text-[#c5c5cf] hover:text-white',
            )
          "
          type="button"
          @click="activeCategory = item"
        >
          {{ item }}
        </button>
      </div>
      <button
        class="hidden shrink-0 cursor-pointer items-center gap-1.5 border-0 bg-transparent text-[13px] text-[#8b8b98] hover:text-[#d0d0d8] md:inline-flex"
        type="button"
      >
        <IconifyIcon icon="lucide:layout-grid" />
        想要更多课程？
      </button>
    </div>

    <div
      class="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(172px,1fr))] sm:gap-x-[22px] sm:gap-y-7"
    >
      <article
        v-for="course in filteredCourses"
        :key="course.id"
        class="min-w-0 cursor-pointer rounded-md border border-white/5 bg-[#16161c] p-1.5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_9px_24px_rgb(58_45_126_/_28%)] sm:p-2.5 sm:pb-2"
        @click="router.push(`/learning/course/${course.id}`)"
      >
        <CourseCover
          :art="course.art"
          :badge="course.badge"
          :subtitle="course.subtitle"
          :tone="course.tone"
        />
        <h3
          class="mt-2.5 mb-1.5 line-clamp-2 h-[39px] text-[13px] leading-[19px] font-medium text-[#e6e6ee]"
        >
          {{ course.title }}
        </h3>
        <div class="flex items-center text-[#8b8b98]">
          <span
            class="mr-1.5 size-[15px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#b15ae6,#5d008c_60%,#450078)]"
          ></span>
          <span class="text-[#6f6f7c]">.</span>
          <span class="ml-auto inline-flex items-center gap-0.5 text-xs text-orange-500">
            <IconifyIcon class="text-[13px]" icon="lucide:flame" />
            {{ course.heat }}
          </span>
        </div>
      </article>
    </div>

    <div v-if="filteredCourses.length === 0" class="py-20 text-center text-sm text-[#8b8b98]">
      没有找到相关课程
    </div>
  </div>
</template>
