<script lang="ts" setup>
import { computed, ref } from 'vue';

import { IconifyIcon } from '@vben/icons';
import { cn } from '@vben/utils';

import { message } from 'ant-design-vue';

import CheckinArt from './checkin-art.vue';
import {
  checkinMilestones,
  checkinStats,
  getMonthBars,
  honorList,
  periodStats,
  periodTabs,
  studyDuration,
  type PeriodTab,
} from './data';

defineOptions({ name: 'LearningHome' });

const period = ref<PeriodTab>('总计');
const activeDetail = ref('句子错题本');
const stats = computed(() => periodStats[period.value]);
const now = new Date();
const chartCursor = ref({
  month: now.getMonth() + 1,
  year: now.getFullYear(),
});

const dateMeta = computed(() => {
  const months = [
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月',
  ];
  const weeks = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ];
  return {
    day: now.getDate(),
    month: months[now.getMonth()],
    weekday: weeks[now.getDay()],
  };
});

const bars = computed(() =>
  getMonthBars(chartCursor.value.year, chartCursor.value.month),
);
const maxBar = computed(() =>
  Math.max(...bars.value.map((item) => item.value), 1),
);
const chartLabel = computed(
  () =>
    `${chartCursor.value.year}-${String(chartCursor.value.month).padStart(2, '0')}`,
);
const canGoNext = computed(() => {
  const next = new Date(chartCursor.value.year, chartCursor.value.month, 1);
  const limit = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return next < limit;
});

function shiftMonth(step: number) {
  const date = new Date(chartCursor.value.year, chartCursor.value.month - 1 + step, 1);
  const limit = new Date(now.getFullYear(), now.getMonth(), 1);
  if (date > limit) return;
  chartCursor.value = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  };
}

function padDay(day: number) {
  return String(day).padStart(2, '0');
}

const detailCards = computed(() => [
  { label: '句子错题本', value: stats.value.wrongSentences },
  { label: '不熟悉句子', value: stats.value.unfamiliarSentences },
  { label: '已掌握句子', value: stats.value.masteredSentences },
  { label: '单词错题本', value: stats.value.wrongWords },
  { label: '不熟悉单词', value: stats.value.unfamiliarWords },
  { label: '已掌握单词', value: stats.value.masteredWords },
]);

const podium = computed(() => {
  const [first, second, third] = honorList;
  return [
    { user: second, place: 2 },
    { user: first, place: 1 },
    { user: third, place: 3 },
  ];
});
const honorRest = computed(() => honorList.filter((item) => item.rank > 3));

function badgeClass(badge?: string) {
  if (badge === '学社主理人') return 'border-[#9c91ff] text-[#c4bbff]';
  if (badge === '合伙人') return 'border-[#5aa2ff] text-[#8ec4ff]';
  return '';
}

function podiumSize(place: number) {
  return place === 1 ? 'h-16 w-16' : 'h-12 w-12';
}

function handleCheckin() {
  message.info('完成 20 分钟学习后即可打卡');
}

function handleRefresh() {
  message.success('数据已刷新');
}

function handleDetail(label: string) {
  activeDetail.value = label;
  message.info(`${label} 功能即将上线`);
}
</script>

<template>
  <div class="flex min-h-full flex-col gap-3">
    <div
      class="flex h-9 items-center gap-2 rounded-lg bg-[#1b2748] px-3 text-[13px] text-[#dce6ff]"
    >
      <IconifyIcon class="text-base text-[#6ea8ff]" icon="lucide:megaphone" />
      <span>哇学社暑假优惠倒计时，8月31日结束！</span>
    </div>

    <div class="flex flex-col items-stretch gap-3 xl:flex-row">
      <div class="flex min-w-0 flex-1 flex-col gap-3">
        <div class="flex flex-col items-stretch gap-3 lg:flex-row">
        <section class="min-w-0 flex-1 rounded-xl border border-white/5 bg-[#16161c] p-4">
          <div class="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
            <button
              v-for="item in periodTabs"
              :key="item"
              class="cursor-pointer border-0 bg-transparent p-0"
              :class="
                cn(
                  period === item
                    ? 'font-semibold text-[#7eb6ff]'
                    : 'text-[#8f8f9a] hover:text-white',
                )
              "
              type="button"
              @click="period = item"
            >
              {{ item }}
            </button>
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <div class="flex items-center justify-between rounded-xl bg-[#1c1d24] px-4 py-3">
              <div>
                <p class="m-0 text-[12px] text-[#8f8f9a]">完成句子数量</p>
                <p class="mt-1 mb-0 text-[28px] leading-none font-bold text-white">
                  {{ stats.sentences }}
                  <span class="text-[13px] font-medium text-[#8f8f9a]">个</span>
                </p>
              </div>
              <span
                class="flex h-11 w-11 items-center justify-center rounded-full bg-[#5b4dff]/30 text-[#9aa4ff]"
              >
                <IconifyIcon class="text-xl" icon="lucide:align-justify" />
              </span>
            </div>
            <div class="flex items-center justify-between rounded-xl bg-[#1c1d24] px-4 py-3">
              <div>
                <p class="m-0 text-[12px] text-[#8f8f9a]">完成单词数量</p>
                <p class="mt-1 mb-0 text-[28px] leading-none font-bold text-white">
                  {{ stats.words }}
                  <span class="text-[13px] font-medium text-[#8f8f9a]">个</span>
                </p>
              </div>
              <span
                class="flex h-11 w-11 items-center justify-center rounded-full bg-[#2f6bff]/30 text-[18px] font-bold text-[#8bb4ff]"
              >
                A
              </span>
            </div>
          </div>

          <div class="mt-3 grid grid-cols-6 gap-2">
            <button
              v-for="item in detailCards"
              :key="item.label"
              class="min-w-0 cursor-pointer rounded-lg border-0 px-2 py-2 text-center detailCards_css hover_css  bg-[#1b2748]"

              type="button"
              @click="handleDetail(item.label)"
            >
              <p
                class="m-0 truncate text-[11px] leading-[16px]"
              >
                {{ item.label }}
              </p>
              <p
                class="mt-1 mb-0 text-[16px] leading-none font-semibold"
                :class="activeDetail === item.label ? 'text-white' : 'text-white'"
              >
                {{ item.value }}
              </p>
            </button>
          </div>

          <div class="mt-4">
            <div class="mb-2.5 flex items-center gap-1.5 text-[13px] text-[#cfcfd6]">
              <IconifyIcon class="text-[#6ea8ff]" icon="lucide:clock-3" />
              学习时长
            </div>
            <div class="grid grid-cols-3 gap-2 text-center">
              <div class="rounded-lg bg-[#1c1d24] px-2 py-2.5 hover_css">
                <p class="m-0 text-[11px] text-[#7d7d88]">累计</p>
                <p class="mt-1 mb-0 text-[13px] font-semibold text-white">
                  {{ studyDuration.total }}
                </p>
              </div>
              <div class="rounded-lg bg-[#1c1d24] px-2 py-2.5 hover_css">
                <p class="m-0 text-[11px] text-[#7d7d88]">今日</p>
                <p class="mt-1 mb-0 text-[13px] font-semibold text-white">
                  {{ studyDuration.today }}
                </p>
              </div>
              <div class="rounded-lg bg-[#1c1d24] px-2 py-2.5 hover_css">
                <p class="m-0 text-[11px] text-[#7d7d88]">本月</p>
                <p class="mt-1 mb-0 text-[13px] font-semibold text-white">
                  {{ studyDuration.month }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <div class="mb-2.5 flex items-center gap-1.5 text-[13px] text-[#cfcfd6]">
              <IconifyIcon class="text-[#6ea8ff]" icon="lucide:calendar-days" />
              打卡统计
            </div>
            <div class="grid grid-cols-3 gap-2 text-center">
              <div class="rounded-lg bg-[#1c1d24] px-2 py-2.5 hover_css">
                <p class="m-0 text-[11px] text-[#7d7d88]">当前连续</p>
                <p class="mt-1 mb-0 text-[18px] font-bold text-white">
                  {{ checkinStats.current }}
                </p>
              </div>
              <div class="rounded-lg bg-[#1c1d24] px-2 py-2.5 hover_css">
                <p class="m-0 text-[11px] text-[#7d7d88]">最高连续</p>
                <p class="mt-1 mb-0 text-[18px] font-bold text-white">
                  {{ checkinStats.highest }}
                </p>
              </div>
              <div class="rounded-lg bg-[#1c1d24] px-2 py-2.5 hover_css">
                <p class="m-0 text-[11px] text-[#7d7d88]">累计打卡</p>
                <p class="mt-1 mb-0 text-[18px] font-bold text-white">
                  {{ checkinStats.total }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          class="relative flex min-h-[520px] w-full shrink-0 flex-col overflow-hidden rounded-xl border border-white/5 bg-[#121826] lg:w-[300px]"
          style="background-image: url(https://www.waxueshe.com/v0.0.138/assets/signBg-mm0BkAlA.jpg);background-size: 100% 100%"
          data-checkin-panel
        >

          <div
            class="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#101624] via-[#101624]/88 to-transparent"
          ></div>

          <button
            class="absolute top-3 right-3 z-[2] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 bg-black/25 text-white hover:bg-black/40"
            type="button"
            @click="handleRefresh"
          >
            <IconifyIcon icon="lucide:refresh-cw" />
          </button>

          <div class="relative z-[1] px-5 pt-4">
            <p class="m-0 text-[64px] leading-none font-bold text-white">
              {{ dateMeta.day }}
            </p>
            <p class="mt-1 mb-0 text-[14px] text-[#d5d9e4]">
              {{ dateMeta.month }} {{ dateMeta.weekday }}
            </p>
          </div>

          <div class="relative z-[1] mt-auto px-4 pt-6 pb-4">
            <div class="mb-2 flex justify-between px-1 text-[11px] text-[#c5cad6]">
              <span
                v-for="item in checkinMilestones"
                :key="item"
                class="min-w-[52px] text-center"
              >
                {{ item }}
              </span>
            </div>
            <div class="relative mb-4 h-3 px-7">
              <div class="absolute top-1/2 right-7 left-7 h-px -translate-y-1/2 bg-[#4b5568]"></div>
              <div
                class="absolute top-1/2 left-7 h-px w-[18%] -translate-y-1/2 bg-[#7ec8ff] shadow-[0_0_8px_#7ec8ff]"
              ></div>
              <div class="relative flex h-3 items-center justify-between">
                <i
                  v-for="(item, index) in checkinMilestones"
                  :key="item"
                  class="block h-2 w-2 rounded-full"
                  :class="index === 0 ? 'bg-[#7ec8ff] shadow-[0_0_8px_#7ec8ff]' : 'bg-[#6b7280]'"
                ></i>
              </div>
            </div>
            <button
              class="relative flex h-11 w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border-0 bg-white/10 text-[14px] font-semibold text-white"
              type="button"
              @click="handleCheckin"
            >
              <span
                class="absolute inset-y-0 left-0 w-[20%] bg-gradient-to-r from-[#6f7bff] to-[#7a4dff]"
              ></span>
              <span class="relative z-[1]">完成20分钟学习即可打卡</span>
            </button>
            <p class="mt-2 mb-0 text-center text-[12px] text-[#b7bcc8]">
              已有 189,376 人打卡
            </p>
          </div>
        </section>
        </div>

        <section class="rounded-xl border border-white/5 bg-[#16161c] px-4 py-3.5">
          <div class="mb-3 flex items-center justify-between">
            <h3 class="m-0 flex items-center gap-1.5 text-[13px] font-semibold text-white">
              <IconifyIcon class="text-[#8f8f9a]" icon="lucide:calendar-days" />
              {{ chartLabel }}
            </h3>
            <div class="flex overflow-hidden rounded-md border border-white/10">
              <button
                class="flex h-6 w-6 cursor-pointer items-center justify-center border-0 bg-transparent text-[#cfcfd6] hover:bg-white/8"
                type="button"
                @click="shiftMonth(-1)"
              >
                <IconifyIcon icon="lucide:chevron-left" />
              </button>
              <button
                class="flex h-6 w-6 cursor-pointer items-center justify-center border-0 border-l border-white/10 bg-transparent text-[#cfcfd6] hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-35"
                :disabled="!canGoNext"
                type="button"
                @click="shiftMonth(1)"
              >
                <IconifyIcon icon="lucide:chevron-right" />
              </button>
            </div>
          </div>
          <div class="flex items-end gap-[3px]">
            <div
              v-for="item in bars"
              :key="`${chartLabel}-${item.day}`"
              class="flex min-w-0 flex-1 flex-col items-center gap-1"
            >
              <div
                class="flex h-[108px] w-full max-w-[14px] items-end overflow-hidden rounded-[3px] border border-[#3a3b44] bg-[#14151a]"
              >
                <div
                  v-if="item.value > 0"
                  class="w-full rounded-[2px] bg-gradient-to-b from-[#8fd0ff] to-[#6b4dff]"
                  :style="{ height: `${Math.max((item.value / maxBar) * 100, 22)}%` }"
                ></div>
              </div>
              <span class="text-[9px] leading-none text-[#6f6f7c]">{{ padDay(item.day) }}</span>
            </div>
          </div>
        </section>
      </div>

      <aside
        class="flex w-full shrink-0 flex-col rounded-xl border border-white/5 bg-[#16161c] px-3 py-3 xl:w-[280px]"
      >
        <div class="mb-1 flex items-center justify-between px-1">
          <h3 class="m-0 text-[14px] font-semibold text-white">今日荣耀榜</h3>
          <span class="text-[11px] text-[#8f8f9a]">按时长排名</span>
        </div>

        <div class="mt-2 mb-3 flex items-end justify-center gap-3 px-1 pt-2">
          <div
            v-for="item in podium"
            :key="item.place"
            class="flex flex-col items-center"
            :class="item.place === 1 ? '-translate-y-2' : ''"
          >
            <div class="relative mb-1">
              <IconifyIcon
                v-if="item.place === 1"
                class="absolute -top-3 left-1/2 -translate-x-1/2 text-[#f5c451]"
                icon="lucide:crown"
              />
              <img
                alt=""
                class="rounded-full border-2 object-cover"
                :class="[
                  podiumSize(item.place),
                  item.place === 1
                    ? 'border-[#f5c451]'
                    : item.place === 2
                      ? 'border-[#c5ccd6]'
                      : 'border-[#d08b5a]',
                ]"
                src="https://www.waxueshe.com/v0.0.137/assets/ico-B8-iFjhn.png"
                :style="{ filter: `hue-rotate(${item.user.avatarHue}deg)` }"
              />
            </div>
            <p class="m-0 max-w-[84px] truncate text-[12px] text-[#ececf1]">
              {{ item.user.name }}
            </p>
            <span
              v-if="item.user.badge"
              class="mt-0.5 rounded-full border px-1.5 text-[10px]"
              :class="badgeClass(item.user.badge)"
            >
              {{ item.user.badge }}
            </span>
            <p class="mt-0.5 mb-0 text-[11px] text-[#8f8f9a]">{{ item.user.duration }}</p>
          </div>
        </div>

        <div class="flex min-h-0 flex-1 flex-col gap-0.5 overflow-auto [scrollbar-width:thin]">
          <div
            v-for="user in honorRest"
            :key="user.rank"
            class="flex items-center gap-2 rounded-lg px-1 py-1.5"
          >
            <span class="w-5 text-center text-[12px] font-semibold text-[#9a9aa8]">
              {{ user.rank }}
            </span>
            <img
              alt=""
              class="h-7 w-7 rounded-full object-cover"
              src="https://www.waxueshe.com/v0.0.137/assets/ico-B8-iFjhn.png"
              :style="{ filter: `hue-rotate(${user.avatarHue}deg)` }"
            />
            <div class="min-w-0 flex-1">
              <p class="m-0 flex items-center gap-1 truncate text-[12px] text-[#ececf1]">
                <span class="truncate">{{ user.name }}</span>
                <span
                  v-if="user.badge"
                  class="shrink-0 rounded-full border px-1 text-[10px]"
                  :class="badgeClass(user.badge)"
                >
                  {{ user.badge }}
                </span>
              </p>
            </div>
            <span class="shrink-0 text-[11px] text-[#8f8f9a]">{{ user.duration }}</span>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
<style lang="scss">
.detailCards_css{
  background: rgb(27, 28, 33);

}
</style>
