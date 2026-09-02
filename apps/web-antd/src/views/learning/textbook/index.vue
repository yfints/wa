<script lang="ts" setup>
import type { Ref } from 'vue';

import { computed, inject, ref, watch } from 'vue';

import { cn } from '@vben/utils';

import BookCover from './book-cover.vue';
import {
  gradesFor,
  stages,
  textbookList,
  versionsByStage,
} from './data';

defineOptions({ name: 'LearningTextbook' });

const fallbackKeyword = ref('');
const keyword = inject<Ref<string>>('learningKeyword', fallbackKeyword);

const stage = ref('小学');
const version = ref('人教版PEP (三年级起点)');
const grade = ref('三年级');

const versions = computed(() => versionsByStage[stage.value] ?? []);
const grades = computed(() => gradesFor(stage.value, version.value));

watch(stage, (value) => {
  version.value = versionsByStage[value]?.[0] ?? '';
});

watch([stage, version], () => {
  const nextGrades = gradesFor(stage.value, version.value);
  if (!nextGrades.includes(grade.value)) {
    grade.value = nextGrades[0] ?? '';
  }
});

const books = computed(() => {
  const query = keyword.value.trim().toLowerCase();
  return textbookList.filter((item) => {
    const matchStage = item.stage === stage.value;
    const matchVersion = item.version === version.value;
    const matchGrade = grade.value === '全部' || item.grade === grade.value;
    const matchKeyword =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.headline.toLowerCase().includes(query) ||
      item.version.toLowerCase().includes(query);
    return matchStage && matchVersion && matchGrade && matchKeyword;
  });
});
</script>

<template>
  <div class="min-h-full pb-6">
    <section class="px-1 py-2">
      <div class="flex flex-wrap gap-x-5 gap-y-2">
        <button
          v-for="item in stages"
          :key="item"
          class="cursor-pointer border-0 bg-transparent p-0 text-[14px]"
          :class="
            cn(
              stage === item
                ? 'font-semibold text-[#6eb4ff]'
                : 'text-[#c5c5cf] hover:text-white',
            )
          "
          type="button"
          @click="stage = item"
        >
          {{ item }}
        </button>
      </div>

      <div class="mt-3.5 flex items-start gap-3">
        <span class="mt-0.5 w-10 shrink-0 text-[13px] text-[#8f8f9a]">版本</span>
        <div class="flex flex-wrap gap-x-4 gap-y-2.5">
          <button
            v-for="item in versions"
            :key="item"
            class="cursor-pointer border-0 bg-transparent p-0 text-[13px]"
            :class="
              cn(
                version === item
                  ? 'font-semibold text-[#6eb4ff]'
                  : 'text-[#b8b8c2] hover:text-white',
              )
            "
            type="button"
            @click="version = item"
          >
            {{ item }}
          </button>
        </div>
      </div>

      <div class="mt-3.5 flex items-center gap-3">
        <span class="w-10 shrink-0 text-[13px] text-[#8f8f9a]">年级</span>
        <div class="flex flex-wrap gap-x-4 gap-y-2">
          <button
            v-for="item in grades"
            :key="item"
            class="cursor-pointer border-0 bg-transparent p-0 text-[13px]"
            :class="
              cn(
                grade === item
                  ? 'font-semibold text-[#6eb4ff]'
                  : 'text-[#b8b8c2] hover:text-white',
              )
            "
            type="button"
            @click="grade = item"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </section>

    <div
      class="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(196px,1fr))] sm:gap-x-5 sm:gap-y-6"
    >
      <article
        v-for="book in books"
        :key="book.id"
        class="min-w-0 rounded-md border border-white/5 bg-[#16161c] p-2"
      >
        <BookCover
          :art="book.art"
          :cover="book.cover"
          :headline="book.headline"
          :version="book.version"
        />
        <h3
          class="mt-2.5 mb-0 line-clamp-2 h-[40px] text-[13px] leading-5 font-medium text-[#e6e6ee]"
        >
          {{ book.title }}
        </h3>
      </article>
    </div>

    <div
      v-if="books.length === 0"
      class="py-20 text-center text-sm text-[#8b8b98]"
    >
      没有找到相关教材
    </div>

    <p class="mt-10 mb-0 text-center text-[11px] text-[#5c5c66]">
      教材封面仅作同步学习展示，版权归各出版社所有
    </p>
  </div>
</template>
