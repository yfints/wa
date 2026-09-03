<script lang="ts" setup>
import type { Ref } from 'vue';

import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

import { IconifyIcon } from '@vben/icons';
import { cn } from '@vben/utils';

import { message } from 'ant-design-vue';

import CourseCover from '../course-square/course-cover.vue';
import {
  type FavoriteItem,
  type FavoriteSentenceItem,
  type FavoriteTab,
  type FavoriteWordItem,
  favoriteList,
} from './data';

defineOptions({ name: 'LearningFavorites' });

const router = useRouter();
const activeTab = ref<FavoriteTab>('sentence');
const items = ref<FavoriteItem[]>([...favoriteList]);
const fallbackKeyword = ref('');
const keyword = inject<Ref<string>>('learningKeyword', fallbackKeyword);

const tabs: Array<{ key: FavoriteTab; label: string }> = [
  { key: 'sentence', label: '句子' },
  { key: 'word', label: '单词' },
];

const filteredItems = computed(() => {
  const query = keyword.value.trim().toLowerCase();
  return items.value.filter((item) => {
    const matchTab = item.tab === activeTab.value;
    const matchKeyword = !query || item.title.toLowerCase().includes(query);
    return matchTab && matchKeyword;
  });
});

const sentenceItems = computed(
  () => filteredItems.value.filter((item) => item.tab === 'sentence') as FavoriteSentenceItem[],
);
const wordItems = computed(
  () => filteredItems.value.filter((item) => item.tab === 'word') as FavoriteWordItem[],
);

function removeFavorite(id: string, event?: MouseEvent) {
  event?.stopPropagation();
  items.value = items.value.filter((item) => item.id !== id);
  message.success('已取消收藏');
}

function openCourse(id: string) {
  void router.push(`/learning/course/${id}`);
}

function openWord(id: string) {
  void router.push(`/learning/textbook/${id.replace('w-', '') || '1'}`);
}
</script>

<template>
  <div class="min-h-full">
    <div class="mb-4 flex items-center gap-6 border-b border-[var(--learn-border)]">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="relative cursor-pointer border-0 bg-transparent px-1 pb-2.5 text-[14px] transition-colors"
        :class="
          cn(
            activeTab === tab.key
              ? 'font-semibold text-[#5b8def]'
              : 'text-[var(--learn-muted)] hover:text-[var(--learn-fg)]',
          )
        "
        type="button"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
        <span
          v-if="activeTab === tab.key"
          class="absolute right-0 bottom-0 left-0 h-[2px] rounded-full bg-[#5b8def]"
        ></span>
      </button>
    </div>

    <div
      v-if="activeTab === 'sentence'"
      class="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(172px,1fr))] sm:gap-x-[22px] sm:gap-y-7"
    >
      <article
        v-for="course in sentenceItems"
        :key="course.id"
        class="group relative min-w-0 cursor-pointer rounded-md border border-white/5 bg-[#16161c] p-1.5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_9px_24px_rgb(58_45_126_/_28%)] sm:p-2.5 sm:pb-2"
        @click="openCourse(course.id)"
      >
        <div class="relative">
          <CourseCover
            :art="course.art"
            :badge="course.badge"
            :subtitle="course.subtitle"
            :tone="course.tone"
          />
          <button
            aria-label="取消收藏"
            class="absolute top-1.5 right-1.5 z-10 hidden size-6 cursor-pointer items-center justify-center rounded-full border-0 bg-white/90 text-[#5a5a68] shadow-sm group-hover:inline-flex hover:bg-white hover:text-[#2f2f3a]"
            type="button"
            @click="removeFavorite(course.id, $event)"
          >
            <IconifyIcon class="text-[13px]" icon="lucide:x" />
          </button>
        </div>
        <h3
          class="mt-2.5 mb-1.5 line-clamp-2 h-[39px] text-[13px] leading-[19px] font-medium text-[#e6e6ee]"
        >
          {{ course.title }}
        </h3>
        <div class="flex items-center text-[#8b8b98]">
          <span
            class="mr-1.5 size-[15px] rounded-full bg-[radial-gradient(circle_at_35%_30%,#b15ae6,#5d008c_60%,#450078)]"
          ></span>
          <span class="ml-auto inline-flex items-center gap-0.5 text-xs text-[var(--learn-muted)]">
            <IconifyIcon class="text-[13px]" icon="lucide:eye" />
            {{ course.heat }}
          </span>
        </div>
      </article>
    </div>

    <div
      v-else
      class="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3"
    >
      <article
        v-for="word in wordItems"
        :key="word.id"
        class="group flex min-h-[108px] cursor-pointer items-start gap-3.5 rounded-xl border border-[var(--learn-border)] bg-[var(--learn-card)] px-4 py-4 transition duration-200 hover:border-[#c9c4f0] hover:shadow-[0_8px_24px_rgb(58_45_126_/_12%)]"
        @click="openWord(word.id)"
      >
        <div
          class="flex size-[64px] shrink-0 items-center justify-center rounded-lg bg-[var(--learn-input)]"
          aria-hidden="true"
        >
          <div class="books-icon">
            <span class="book book-orange"></span>
            <span class="book book-blue"></span>
            <span class="book book-red"></span>
          </div>
        </div>
        <div class="flex min-h-[64px] min-w-0 flex-1 flex-col">
          <div class="flex items-start justify-between gap-2">
            <h3 class="text-[14px] leading-5 font-semibold text-[var(--learn-fg)]">
              {{ word.title }}
            </h3>
            <button
              aria-label="取消收藏"
              class="hidden size-6 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-[var(--learn-input)] text-[var(--learn-muted)] group-hover:inline-flex hover:text-[var(--learn-fg)]"
              type="button"
              @click="removeFavorite(word.id, $event)"
            >
              <IconifyIcon class="text-[13px]" icon="lucide:x" />
            </button>
          </div>
          <p class="mt-1 text-[13px] text-[var(--learn-muted)]">
            {{ word.desc }}
          </p>
          <p class="mt-auto pt-3 text-right text-[12px] text-[var(--learn-muted)]">
            单词: {{ word.wordCount }}个
          </p>
        </div>
      </article>
    </div>

    <div
      v-if="filteredItems.length === 0"
      class="py-20 text-center text-sm text-[var(--learn-muted)]"
    >
      暂无收藏内容
    </div>
  </div>
</template>

<style scoped>
.books-icon {
  position: relative;
  width: 56px;
  height: 52px;
}

.book {
  position: absolute;
  bottom: 4px;
  width: 18px;
  height: 34px;
  border-radius: 3px 4px 3px 3px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 12%);
}

.book::before {
  position: absolute;
  top: 7px;
  right: 3px;
  left: 3px;
  height: 2px;
  content: '';
  background: rgb(255 255 255 / 55%);
  border-radius: 1px;
  box-shadow:
    0 5px 0 rgb(255 255 255 / 45%),
    0 10px 0 rgb(255 255 255 / 35%);
}

.book-orange {
  left: 6px;
  z-index: 1;
  background: linear-gradient(180deg, #ffb36b, #f08a3a);
  transform: rotate(-18deg);
}

.book-blue {
  left: 20px;
  z-index: 2;
  height: 38px;
  background: linear-gradient(180deg, #7eb6ff, #4d86e8);
  transform: rotate(2deg);
}

.book-red {
  left: 34px;
  z-index: 1;
  background: linear-gradient(180deg, #ff8b8b, #e45a5a);
  transform: rotate(16deg);
}
</style>
