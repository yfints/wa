<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { IconifyIcon } from '@vben/icons';

import { message } from 'ant-design-vue';

import PracticeModeModal from '../course-detail/practice-mode-modal.vue';
import LearningProgress from '#/component/progress.vue';
import BookCover from './book-cover.vue';
import { getBookById } from './data';
import { createTextbookUnits } from './units';

defineOptions({ name: 'LearningTextbookDetail' });

const route = useRoute();
const router = useRouter();
const favorited = ref(false);
const units = ref(createTextbookUnits());
const modeOpen = ref(false);

const book = computed(() => getBookById(String(route.params.id)));

watch(
  () => route.params.id,
  (id) => {
    if (!getBookById(String(id))) {
      void router.replace('/learning/textbook');
      return;
    }
    units.value = createTextbookUnits();
    favorited.value = false;
  },
  { immediate: true },
);

const finishedCount = computed(
  () => units.value.filter((item) => item.finished > 0).length,
);

function continueLearn() {
  modeOpen.value = true;
}

function toggleFavorite() {
  favorited.value = !favorited.value;
  message.success(favorited.value ? '已收藏' : '已取消收藏');
}

function removeCourse() {
  message.success('已删除该课程');
  void router.push('/learning/textbook');
}
</script>

<template>
  <div v-if="book" class="flex flex-col gap-[18px] pb-6">
    <section class="rounded-xl border border-white/5 bg-[#16161c] px-[18px] pt-4 pb-3.5">
      <div class="flex flex-wrap items-center gap-4">
        <div class="h-[110px] w-[88px] shrink-0 overflow-hidden rounded-md">
          <BookCover
            compact
            :art="book.art"
            :cover="book.cover"
            :headline="book.headline"
            :version="book.version"
          />
        </div>
        <div class="min-w-0 flex-1">
          <h1 class="mb-1.5 text-xl font-bold text-[var(--learn-fg)]">{{ book.title }}</h1>
          <p class="m-0 text-[13px] text-[#9a9aa8]">
            {{ finishedCount }} / {{ units.length }} 课程
          </p>
        </div>
        <div class="flex shrink-0 gap-2.5">
          <button
            class="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border-0 bg-blue-500 px-[18px] text-sm text-white"
            type="button"
            @click="continueLearn"
          >
            <IconifyIcon icon="lucide:circle-play" />
            继续学习
          </button>
          <button
            class="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-amber-500 bg-transparent px-[14px] text-sm text-amber-400"
            type="button"
            @click="toggleFavorite"
          >
            <IconifyIcon
              :class="favorited ? 'fill-amber-400' : ''"
              icon="lucide:star"
            />
            {{ favorited ? '已收藏' : '收藏' }}
          </button>
        </div>
      </div>

      <LearningProgress
        :finished="finishedCount"
        :total="units.length"
        @remove="removeCourse"
      />
    </section>

    <section
      class="grid grid-cols-1 gap-3.5 min-[601px]:grid-cols-2 min-[901px]:grid-cols-3 min-[1201px]:grid-cols-4"
    >
      <article
        v-for="unit in units"
        :key="unit.id"
        class="hover_css relative cursor-pointer rounded-[10px] border border-white/5 bg-[#1a1b21] p-4 pb-3.5 transition duration-200 hover:-translate-y-0.5 hover:border-white/10"
        @click="continueLearn"
      >
        <span
          class="absolute top-3.5 right-3.5 rounded-full bg-white/[0.06] px-2 py-0.5 text-xs text-[#9a9aa8]"
        >
          暂未练习
        </span>
        <h3 class="mb-[18px] max-w-[78%] text-[15px] leading-[22px] font-semibold text-[var(--learn-fg)]">
          {{ unit.title }}
        </h3>
        <div class="flex items-center gap-3 text-xs text-[#8b8b98]">
          <span class="inline-flex items-center gap-1">
            <IconifyIcon icon="lucide:clock-3" />
            学习时长：{{ unit.duration }}
          </span>
          <span class="inline-flex items-center gap-1">
            <IconifyIcon icon="lucide:circle-check" />
            已完成{{ unit.finished }}次
          </span>
          <em class="ml-auto text-lg font-bold not-italic text-[var(--learn-fg)]/25">
            #{{ unit.id }}
          </em>
        </div>
      </article>
    </section>

    <PracticeModeModal v-model:open="modeOpen" />
  </div>
</template>
<style lang="scss" scoped>
.hover_css{
  &:hover{
    background: var(--learn-hover-grad);
  }
}
</style>
