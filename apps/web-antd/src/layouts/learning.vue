<script lang="ts" setup>
import { computed, provide, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { IconifyIcon } from '@vben/icons';
import { updatePreferences, usePreferences } from '@vben/preferences';
import { cn } from '@vben/utils';

import { Badge, message } from 'ant-design-vue';

import ThemeSwitch from '#/component/theme-switch.vue';
import { learningHeaderActions, learningMenus } from '#/views/learning/menus';
import ProfilePanel from '#/views/learning/profile-panel.vue';
import SearchPanel from '#/views/learning/search-panel.vue';

defineOptions({ name: 'LearningLayout' });

const route = useRoute();
const router = useRouter();
const keyword = ref('');
const searchOpen = ref(false);
const profileOpen = ref(false);
const settingsOpen = ref(false);
const { isDark } = usePreferences();

provide('learningKeyword', keyword);

const mainMenus = computed(() =>
  learningMenus.filter((item) => item.group === 'main'),
);
const toolMenus = computed(() =>
  learningMenus.filter((item) => item.group === 'tool'),
);
const extraMenus = computed(() =>
  learningMenus.filter((item) => item.group === 'extra'),
);

const isCourseDetail = computed(
  () => route.name === 'LearningCourseDetail',
);
const isTextbookDetail = computed(
  () => route.name === 'LearningTextbookDetail',
);
const isPracticeLoading = computed(
  () => route.name === 'LearningPracticeLoading',
);
const isHome = computed(() => route.path === '/learning/home');
const pageTitle = computed(() =>
  isHome.value ? '个人中心' : String(route.meta.title || '课程广场'),
);

function isActive(path: string) {
  if (path === '/learning/course-square' && isCourseDetail.value) {
    return true;
  }
  if (path === '/learning/textbook' && isTextbookDetail.value) {
    return true;
  }
  return route.path === path;
}

function handleAction(title: string) {
  message.info(`${title} 功能即将上线`);
}

function toggleTheme() {
  updatePreferences({
    theme: { mode: isDark.value ? 'light' : 'dark' },
  });
}

function menuItemClass(path: string, extra = false) {
  const active = isActive(path);
  return cn(
    'flex h-8 w-full cursor-pointer items-center gap-2.5 rounded-md border-0 px-3 text-left text-sm font-semibold transition-all duration-200 max-[700px]:justify-center max-[700px]:px-0',
    extra && !active ? 'text-[#9c91ff]' : 'text-[var(--learn-fg)]',
    active
      ? 'bg-gradient-to-r from-[#799cfb] to-[#6245d1] text-white'
      : 'bg-transparent hover:bg-[var(--learn-hover)]',
  );
}
</script>

<template>
  <RouterView v-if="isPracticeLoading" />
  <div
    v-else
    class="learning-app flex h-screen overflow-hidden bg-[var(--learn-bg)] text-[var(--learn-fg)]"
  >
    <aside
      class="flex w-[168px] shrink-0 flex-col border-r border-[var(--learn-border)] bg-[var(--learn-sidebar)] px-[11px] py-3 pt-[0px] max-[700px]:w-[57px] max-[700px]:px-1.5 max-[700px]:py-2.5"
    >
      <div
        style="    height: 5.35714rem;"
        class="relative flex h-[52px] items-center gap-1 pl-1 max-[700px]:justify-center max-[700px]:p-0"
      >
        <button
          class="flex cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-left"
          data-profile-trigger
          type="button"
          @click="profileOpen = true"
        >
          <img src="https://www.waxueshe.com/v0.0.137/assets/ico-B8-iFjhn.png" alt="" style="width: 42px;height: 42px;">

          <div class="text-base font-bold max-[700px]:hidden">
            <span style="font-size: 0.71429rem;">哇小王</span>
            <img style="width: 60px;height: 26px;" src="https://www.waxueshe.com/v0.0.137/assets/tagStudyM-Wmp2sFUE.png">
          </div>
        </button>
      </div>

      <nav class="flex flex-1 flex-col gap-1 overflow-auto [scrollbar-width:none]">
        <button
          v-for="item in mainMenus"
          :key="item.key"
          :class="menuItemClass(item.path)"
          type="button"
          @click="router.push(item.path)"
        >
          <IconifyIcon class="text-base" :icon="item.icon" />
          <span class="max-[700px]:hidden">{{ item.title }}</span>
        </button>

        <div class="mx-2 my-1.5 h-px bg-[var(--learn-divider)]"></div>

        <button
          v-for="item in toolMenus"
          :key="item.key"
          :class="menuItemClass(item.path)"
          type="button"
          @click="router.push(item.path)"
        >
          <IconifyIcon class="text-base" :icon="item.icon" />
          <span class="max-[700px]:hidden">{{ item.title }}</span>
        </button>

        <div class="mx-2 my-1.5 h-px bg-[var(--learn-divider)]"></div>

        <button
          v-for="item in extraMenus"
          :key="item.key"
          :class="menuItemClass(item.path, true)"
          type="button"
          @click="router.push(item.path)"
        >
          <IconifyIcon class="text-base" :icon="item.icon" />
          <span class="max-[700px]:hidden">{{ item.title }}</span>
        </button>
      </nav>

      <div class="relative mt-2">
        <button
          :class="cn(menuItemClass('/settings'))"
          type="button"
          @click="settingsOpen = !settingsOpen"
        >
          <IconifyIcon class="text-base" icon="lucide:settings" />
          <span class="max-[700px]:hidden">设置</span>
        </button>
        <div
          v-if="settingsOpen"
          class="absolute bottom-10 left-0 z-20 w-[168px] rounded-xl border border-[var(--learn-border)] bg-[var(--learn-card)] p-2 shadow-[0_12px_32px_rgb(0_0_0_/_18%)] max-[700px]:left-full max-[700px]:bottom-0 max-[700px]:ml-2"
        >
          <p class="mb-1 px-2 text-[11px] text-[var(--learn-muted)]">主题</p>
          <ThemeSwitch />
        </div>
      </div>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <header
        class="flex h-[70px] items-center gap-[18px] border-b border-[var(--learn-border)] bg-[var(--learn-sidebar)] pr-[25px] pl-[17px]"
      >
        <div
          class="hidden shrink-0 items-center gap-2 text-[15px] font-semibold whitespace-nowrap text-[var(--learn-fg)] min-[701px]:flex"
        >
          <template v-if="isCourseDetail || isTextbookDetail">
            <button
              class="cursor-pointer border-0 bg-transparent p-0 text-[15px] text-[var(--learn-muted)] hover:text-[var(--learn-fg)]"
              type="button"
              @click="
                router.push(
                  isTextbookDetail
                    ? '/learning/textbook'
                    : '/learning/course-square',
                )
              "
            >
              {{ isTextbookDetail ? '教材同步' : '课程广场' }}
            </button>
            <span class="text-[var(--learn-muted)]">/</span>
            <span>课程详情</span>
          </template>
          <template v-else>
            <IconifyIcon
              :icon="
                isHome
                  ? 'lucide:house'
                  : route.path === '/learning/textbook'
                    ? 'lucide:book-open'
                    : 'lucide:layout-grid'
              "
            />
            {{ pageTitle }}
          </template>
        </div>
        <button
          class="flex h-[35px] w-full cursor-pointer items-center gap-2.5 rounded-[5px] border border-[var(--learn-border)] bg-[var(--learn-input)] px-3 text-left text-[13px] text-[var(--learn-muted)] min-[701px]:w-[min(35vw,493px)]"
          type="button"
          @click="searchOpen = true"
        >
          <IconifyIcon class="text-base text-[var(--learn-muted)]" icon="lucide:search" />
          <span>搜索你想要的课程</span>
        </button>
        <div class="ml-auto hidden shrink-0 items-center gap-2 min-[701px]:flex">
          <button
            v-for="item in learningHeaderActions"
            :key="item.key"
            class="inline-flex h-[31px] cursor-pointer items-center gap-1.5 rounded border border-[var(--learn-border)] bg-transparent px-2.5 text-[13px] text-[var(--learn-fg)] hover:bg-[var(--learn-hover)]"
            type="button"
            @click="handleAction(item.title)"
          >
            <IconifyIcon class="text-sm" :icon="item.icon" />
            <span class="hidden min-[1201px]:inline">{{ item.title }}</span>
          </button>
          <button
            class="inline-flex h-[31px] cursor-pointer items-center gap-1.5 rounded border border-[var(--learn-border)] bg-transparent px-2.5 text-[13px] text-[var(--learn-fg)] hover:bg-[var(--learn-hover)]"
            type="button"
            @click="handleAction('系统消息')"
          >
            <Badge dot>
              <IconifyIcon class="text-sm" icon="lucide:bell" />
            </Badge>
            <span class="hidden min-[1201px]:inline">系统消息</span>
          </button>
          <button
            class="inline-flex h-[31px] cursor-pointer items-center justify-center rounded border border-[var(--learn-border)] bg-transparent px-2 text-[var(--learn-fg)] hover:bg-[var(--learn-hover)]"
            data-theme-toggle
            type="button"
            @click="toggleTheme"
          >
            <IconifyIcon
              class="text-sm"
              :icon="isDark ? 'lucide:sun' : 'lucide:moon'"
            />
          </button>
          <button
            class="cursor-pointer border-0 bg-transparent p-0"
            data-header-profile-trigger
            type="button"
            @click="router.push('/learning/home')"
          >
            <img src="https://www.waxueshe.com/v0.0.137/assets/ico-B8-iFjhn.png" alt="" style="width: 42px;height: 42px;">
          </button>
        </div>
      </header>

      <section
        class="flex-1 overflow-auto px-[17px] pt-2 pb-10 [scrollbar-width:thin] [scrollbar-color:var(--learn-border)_transparent]"
      >
        <RouterView />
      </section>
    </div>

    <SearchPanel v-model:open="searchOpen" />
    <ProfilePanel v-model:open="profileOpen" />
  </div>
</template>
