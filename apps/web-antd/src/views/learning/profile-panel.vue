<script lang="ts" setup>
import {onBeforeUnmount, watch} from 'vue';

import {IconifyIcon} from '@vben/icons';
import {cn} from '@vben/utils';

import {message} from 'ant-design-vue';

import {useAuthStore} from '#/store';

defineOptions({name: 'LearningProfilePanel'});

const open = defineModel<boolean>('open', {default: false});
const authStore = useAuthStore();

const avatarSrc = 'https://www.waxueshe.com/v0.0.137/assets/ico-B8-iFjhn.png';

const profile = {
  nickname: '哇小王',
  expireAt: '2026-10-01 15:11:30',
  card: '学习月卡',
  id: '303333',
  signature: '这个学员很神秘~还没有留下签名...',
  phone: '136****9884',
  email: '--',
  location: '海南省 海口市 龙华区',
};

interface ProfileRow {
  action?: 'copy' | 'edit' | 'link' | 'qr';
  icon: string;
  key: string;
  label: string;
  placeholder?: boolean;
  value: string;
}

const rows: ProfileRow[] = [
  {key: 'id', icon: 'lucide:file-text', label: 'ID', value: profile.id, action: 'copy'},
  {
    key: 'signature',
    icon: 'lucide:user',
    label: '签名',
    value: profile.signature,
    action: 'edit',
    placeholder: true,
  },
  {key: 'phone', icon: 'lucide:smartphone', label: '手机号', value: profile.phone},
  {key: 'email', icon: 'lucide:mail', label: '邮箱', value: profile.email, placeholder: true},
  {key: 'location', icon: 'lucide:map-pin', label: '注册归属地', value: profile.location},
  {
    key: 'bind-wechat',
    icon: 'lucide:message-circle',
    label: '绑定微信',
    value: '点击绑定',
    action: 'link',
  },
  {
    key: 'wechat-id',
    icon: 'lucide:messages-square',
    label: '我的微信号',
    value: '输入自己微信号',
    action: 'edit',
    placeholder: true,
  },
  {
    key: 'wechat-qr',
    icon: 'lucide:messages-square',
    label: '我的微信二维码',
    value: '',
    action: 'qr',
  },
  {
    key: 'mentor-wechat',
    icon: 'lucide:headphones',
    label: '推荐导师微信号',
    value: '无推荐导师',
    placeholder: true,
  },
  {
    key: 'mentor-qr',
    icon: 'lucide:headphones',
    label: '推荐导师二维码',
    value: '无推荐导师',
    placeholder: true,
  },
  {
    key: 'password',
    icon: 'lucide:file-pen',
    label: '修改登录密码',
    value: '',
    action: 'link',
  },
  {
    key: 'destroy',
    icon: 'lucide:folder',
    label: '注销账号',
    value: '',
    action: 'link',
  },
];

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close();
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

function onMaskClick(event: MouseEvent) {
  if (event.target === event.currentTarget) close();
}

async function copyId() {
  try {
    await navigator.clipboard.writeText(profile.id);
    message.success('已复制 ID');
  } catch {
    message.error('复制失败');
  }
}

function comingSoon(title: string) {
  message.info(`${title} 功能即将上线`);
}

function handleRow(row: ProfileRow) {
  if (row.action === 'copy') {
    void copyId();
    return;
  }
  if (row.action) {
    comingSoon(row.label);
  }
}

async function handleLogout() {
  close();
  await authStore.logout(false);
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-[1200] flex items-center justify-center bg-[rgb(8_8_10_/_42%)] p-4 backdrop-blur-[10px]"
      @click="onMaskClick"
    >
      <section
        class="relative flex max-h-[min(760px,90vh)] w-[min(380px,92vw)] flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#24252b]/58 shadow-[0_24px_80px_rgb(0_0_0_/_35%)] backdrop-blur-[28px]"
        data-profile-panel
        @keydown.esc="close"
      >
        <header class="flex shrink-0 items-center justify-between px-5 pt-[18px] pb-2">
          <h2 class="m-0 text-[17px] font-semibold text-white">个人信息</h2>
          <button
            aria-label="关闭"
            class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[22px] leading-none text-[#eee] hover:bg-white/10"
            type="button"
            @click="close"
          >
            ×
          </button>
        </header>

        <div class="flex items-center gap-3 px-5 pb-3.5">
          <img
            :src="avatarSrc"
            alt=""
            class="h-12 w-12 shrink-0 rounded-full object-cover"
          />
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1.5">
              <span class="truncate text-[15px] font-semibold text-white">
                {{ profile.nickname }}
              </span>
              <button
                class="inline-flex cursor-pointer border-0 bg-transparent p-0 text-[#b8b8c2] hover:text-white"
                type="button"
                @click="comingSoon('修改昵称')"
              >
                <IconifyIcon class="text-sm" icon="lucide:pencil"/>
              </button>
            </div>
            <p class="m-0 mt-0.5 text-[12px] text-[#8f8f9a]">
              学习卡到期时间：{{ profile.expireAt }}
            </p>
          </div>
          <span
            class="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#5aa2ff] px-2 py-0.5 text-[11px] text-[#7eb6ff]"
          >
            <IconifyIcon class="text-[10px]" icon="lucide:badge-check"/>
            {{ profile.card }}
          </span>
        </div>

        <div
          class="min-h-0 flex-1 overflow-auto px-2 pb-2 [scrollbar-width:thin] [scrollbar-color:rgb(255_255_255_/_12%)_transparent]">
          <button
            v-for="row in rows"
            :key="row.key"
            class="flex w-full items-center gap-2.5 rounded-lg border-0 bg-transparent px-3 py-2.5 text-left text-[13px] text-[#cfcfd6]"
            :class="row.action ? 'cursor-pointer hover:bg-white/[0.04]' : 'cursor-default'"
            type="button"
            @click="handleRow(row)"
          >
            <IconifyIcon
              class="h-4 w-4 shrink-0 text-base text-[#8d8d98]"
              :icon="row.icon"
            />
            <span class="shrink-0 text-[#b8b8c2]">{{ row.label }}</span>
            <span
              class="ml-auto flex min-w-0 items-center justify-end gap-1.5 text-right"
              :class="
                cn(
                  row.placeholder ? 'text-[#8a8a96]' : 'text-[#ececf1]',
                  row.action === 'link' && 'text-[#cfcfd6]',
                )
              "
            >
              <span v-if="row.value" class="truncate">{{ row.value }}</span>
              <IconifyIcon
                v-if="row.action === 'copy'"
                class="shrink-0 text-sm text-[#9a9aa8]"
                icon="lucide:copy"
              />
              <IconifyIcon
                v-else-if="row.action === 'edit'"
                class="shrink-0 text-sm text-[#9a9aa8]"
                icon="lucide:pencil"
              />
              <span
                v-else-if="row.action === 'qr'"
                class="flex h-7 w-7 items-center justify-center rounded-[5px] bg-white p-0.5"
              >
                <svg viewBox="0 0 24 24" class="h-full w-full">
                  <path
                    fill="#1a1a1a"
                    d="M2 2h8v8H2zm2 2v4h4V4zm10-2h8v8h-8zm2 2v4h4V4zM2 14h8v8H2zm2 2v4h4v-4zm10-2h2v2h-2zm4 0h4v2h-4zm-2 2h2v2h-2zm4 0h2v2h-2zm-4 2h2v2h-2zm2 2h2v2h-2zm2-2h2v2h-2zm2 2h2v2h-2z"
                  />
                </svg>
              </span>
              <IconifyIcon
                v-else-if="row.action === 'link'"
                class="shrink-0 text-sm text-[#9a9aa8]"
                icon="lucide:chevron-right"
              />
            </span>
          </button>
        </div>

        <div class="shrink-0 px-5 pt-1 pb-5">
          <button
            class="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-0 bg-gradient-to-r from-[#ff5c9a] to-[#e4457a] text-[15px] font-semibold text-white hover:from-[#ff6ba4] hover:to-[#ee5286]"
            type="button"
            @click="handleLogout"
          >
            <IconifyIcon class="text-lg" icon="lucide:power"/>
            退出登录
          </button>
        </div>
      </section>
    </div>
  </Teleport>
</template>
<style scoped>
.relative {
  width: 35.71429rem;
  box-shadow: 0 1px 1.42857rem #e3deff33 inset, 0 .14286rem .64286rem #9a92d24d inset, 0 3.5rem 3.57143rem -1.71429rem #caacff4d inset, 0 -2.92857rem 2.42857rem -2.28571rem #6044904d inset, 0 .25rem .39286rem -.14286rem #fff inset, 0 1.39286rem 2rem -1.28571rem #ffffff80 inset;
}

</style>
