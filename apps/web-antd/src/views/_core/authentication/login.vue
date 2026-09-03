<script lang="ts" setup>
import { ref } from 'vue';

import { IconifyIcon } from '@vben/icons';

import { message } from 'ant-design-vue';

import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();
const username = ref('vben');
const password = ref('123456');
const showPassword = ref(false);

function comingSoon(title: string) {
  message.info(`${title} 功能即将上线`);
}

async function handleLogin() {
  if (!username.value.trim() || !password.value) {
    message.warning('请输入账号和密码');
    return;
  }
  await authStore.authLogin({
    password: password.value,
    username: username.value.trim(),
  });
}
</script>

<template>
  <section
    class="relative overflow-hidden rounded-[20px] border border-white/70 bg-white/78 px-7 pt-9 pb-8 shadow-[0_24px_70px_rgb(70_130_200_/_28%)] backdrop-blur-xl dark:border-white/10 dark:bg-[#1b2230]/82 dark:shadow-[0_24px_70px_rgb(0_0_0_/_45%)]"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgb(214_232_255_/_90%),transparent)] dark:bg-[linear-gradient(180deg,rgb(70_100_160_/_35%),transparent)]"
    ></div>

    <button
      class="absolute top-4 right-4 z-[1] flex size-8 cursor-pointer items-center justify-center rounded-full border-0 bg-[#5d8eff] text-white shadow-[0_6px_14px_rgb(93_142_255_/_45%)]"
      type="button"
      @click="comingSoon('客服咨询')"
    >
      <IconifyIcon class="text-base" icon="lucide:headphones" />
    </button>

    <div class="relative flex flex-col items-center">
      <div
        class="flex size-14 items-center justify-center rounded-full border border-[#c9dcff] bg-white text-[#4d7cff] shadow-[0_8px_18px_rgb(120_160_220_/_25%)]"
      >
        <IconifyIcon class="text-2xl" icon="lucide:log-in" />
      </div>
      <h1 class="mt-4 mb-0 text-[22px] font-bold text-[#2a2e36] dark:text-white">登录您的账号</h1>
    </div>

    <form class="relative mt-7" @submit.prevent="handleLogin">
      <label
        class="mb-3 flex h-12 items-center gap-2.5 rounded-xl bg-[#f2f4f7] px-3.5 dark:bg-white/8"
      >
        <IconifyIcon class="text-lg text-[#9aa1ad]" icon="lucide:user" />
        <input
          v-model="username"
          class="h-full min-w-0 flex-1 border-0 bg-transparent text-[15px] text-[#2a2e36] outline-none placeholder:text-[#b0b6c0] dark:text-white dark:placeholder:text-[#8b93a3]"
          placeholder="请输入手机号或账号"
          type="text"
        />
        <button
          v-if="username"
          class="flex size-5 cursor-pointer items-center justify-center rounded-full border-0 bg-[#d5d8de] p-0 text-[#fff]"
          type="button"
          @click="username = ''"
        >
          <IconifyIcon class="text-[11px]" icon="lucide:x" />
        </button>
      </label>

      <label class="flex h-12 items-center gap-2.5 rounded-xl bg-[#f2f4f7] px-3.5 dark:bg-white/8">
        <IconifyIcon class="text-lg text-[#9aa1ad]" icon="lucide:lock" />
        <input
          v-model="password"
          class="h-full min-w-0 flex-1 border-0 bg-transparent text-[15px] text-[#2a2e36] outline-none placeholder:text-[#b0b6c0] dark:text-white dark:placeholder:text-[#8b93a3]"
          placeholder="请输入密码"
          :type="showPassword ? 'text' : 'password'"
        />
        <button
          class="cursor-pointer border-0 bg-transparent p-0 text-[#9aa1ad]"
          type="button"
          @click="showPassword = !showPassword"
        >
          <IconifyIcon
            class="text-lg"
            :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
          />
        </button>
      </label>

      <div class="mt-3 mb-5 flex items-center justify-between text-[13px]">
        <button
          class="cursor-pointer border-0 bg-transparent p-0 text-[#4d7cff]"
          type="button"
          @click="comingSoon('验证码登录')"
        >
          用验证码登录
        </button>
        <button
          class="cursor-pointer border-0 bg-transparent p-0 text-[#8b909a]"
          type="button"
          @click="comingSoon('忘记密码')"
        >
          忘记密码?
        </button>
      </div>

      <button
        class="h-12 w-full cursor-pointer rounded-xl border-0 bg-[linear-gradient(90deg,#4c74ff_0%,#7eafff_100%)] text-base font-semibold text-white shadow-[0_10px_22px_rgb(77_124_255_/_42%)] disabled:cursor-wait disabled:opacity-70"
        :disabled="authStore.loginLoading"
        type="submit"
      >
        {{ authStore.loginLoading ? '登录中...' : '登录' }}
      </button>
    </form>

    <p class="mt-4 mb-0 text-center text-[13px] text-[#8b909a] dark:text-[#9aa3b2]">
      还没有账号？
      <button
        class="cursor-pointer border-0 bg-transparent p-0 text-[#4d7cff]"
        type="button"
        @click="comingSoon('注册')"
      >
        立即注册
      </button>
    </p>

    <div class="mt-6 mb-4 flex items-center gap-3 text-[12px] text-[#b0b6c0] dark:text-[#7d8594]">
      <span class="h-px flex-1 bg-[#e6e8ee] dark:bg-white/10"></span>
      或使用以下方式继续
      <span class="h-px flex-1 bg-[#e6e8ee] dark:bg-white/10"></span>
    </div>

    <div class="flex gap-3">
      <button
        class="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#e6e8ee] bg-white text-[14px] text-[#2a2e36] dark:border-white/10 dark:bg-white/6 dark:text-[#e8eef8]"
        type="button"
        @click="comingSoon('微信登录')"
      >
        <svg class="size-[18px]" viewBox="0 0 24 24">
          <path
            d="M9.5 4C5.36 4 2 6.8 2 10.24c0 1.9 1.04 3.62 2.66 4.78L4 17.5l2.7-1.46c.86.24 1.78.38 2.8.38.24 0 .48 0 .72-.02A5.7 5.7 0 0 1 9.6 14.2c0-3.2 3.08-5.8 6.9-5.8.16 0 .32 0 .48.02C16.16 5.7 13.1 4 9.5 4Zm-2.1 3.1c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Zm4.2 0c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9ZM16.5 9.2c-3.3 0-6 2.2-6 4.96 0 2.76 2.7 4.96 6 4.96.78 0 1.52-.12 2.2-.32L21 20l-.5-1.86C21.8 17.2 22.5 16 22.5 14.16c0-2.76-2.7-4.96-6-4.96Zm-1.86 2.7c.38 0 .7.32.7.7 0 .4-.32.72-.7.72s-.7-.32-.7-.72.32-.7.7-.7Zm3.72 0c.38 0 .7.32.7.7 0 .4-.32.72-.7.72s-.7-.32-.7-.72.32-.7.7-.7Z"
            fill="#22c064"
          />
        </svg>
        微信
      </button>
      <button
        class="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#e6e8ee] bg-white text-[14px] text-[#2a2e36] dark:border-white/10 dark:bg-white/6 dark:text-[#e8eef8]"
        type="button"
        @click="comingSoon('国外邮箱登录')"
      >
        <IconifyIcon class="text-lg text-[#4d7cff]" icon="lucide:mail" />
        国外邮箱
      </button>
    </div>
  </section>
</template>
