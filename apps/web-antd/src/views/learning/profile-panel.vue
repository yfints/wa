<script lang="ts" setup>
import {computed, nextTick, onBeforeUnmount, reactive, ref, watch} from 'vue';

import {IconifyIcon} from '@vben/icons';
import {cn} from '@vben/utils';

import {message} from 'ant-design-vue';

import {useAuthStore} from '#/store';

defineOptions({name: 'LearningProfilePanel'});

const DEFAULT_SIGNATURE = '这个学员很神秘~还没有留下签名...';

const open = defineModel<boolean>('open', {default: false});
const authStore = useAuthStore();

const avatarSrc = 'https://www.waxueshe.com/v0.0.137/assets/ico-B8-iFjhn.png';

const profile = reactive({
  nickname: '哇小王',
  expireAt: '2026-10-01 15:11:30',
  card: '学习月卡',
  id: '303333',
  signature: DEFAULT_SIGNATURE,
  phone: '136****9884',
  email: '--',
  location: '海南省 海口市 龙华区',
});

const editType = ref<'nickname' | 'signature' | null>(null);
const editValue = ref('');
const editInputRef = ref<HTMLInputElement>();
const passwordOpen = ref(false);
const destroyOpen = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const codeCountdown = ref(0);
let codeTimer = 0;

const passwordForm = reactive({
  code: '',
  confirm: '',
  password: '',
});

const destroyForm = reactive({
  acknowledged: false,
  code: '',
});

const editConfig = computed(() =>
  editType.value === 'signature'
    ? {placeholder: '请输入个性签名', title: '修改个性签名'}
    : {placeholder: '请输入新昵称', title: '修改昵称'},
);

interface ProfileRow {
  action?: 'copy' | 'edit' | 'link' | 'qr';
  icon: string;
  key: string;
  label: string;
  placeholder?: boolean;
  value: string;
}

const rows = computed<ProfileRow[]>(() => [
  {key: 'id', icon: 'lucide:file-text', label: 'ID', value: profile.id, action: 'copy'},
  {
    key: 'signature',
    icon: 'lucide:user',
    label: '签名',
    value: profile.signature,
    action: 'edit',
    placeholder: profile.signature === DEFAULT_SIGNATURE,
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
]);

function onKeydown(event: KeyboardEvent) {
  if (event.key !== 'Escape') return;
  if (passwordOpen.value) {
    closePassword();
    return;
  }
  if (destroyOpen.value) {
    closeDestroy();
    return;
  }
  if (editType.value) {
    closeEdit();
    return;
  }
  close();
}

watch(open, (visible) => {
  document.body.style.overflow = visible ? 'hidden' : '';
  if (visible) {
    window.addEventListener('keydown', onKeydown);
  } else {
    closeEdit();
    closePassword();
    closeDestroy();
    window.removeEventListener('keydown', onKeydown);
  }
});

onBeforeUnmount(() => {
  window.clearInterval(codeTimer);
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

function openEdit(type: 'nickname' | 'signature') {
  editType.value = type;
  editValue.value =
    type === 'nickname'
      ? profile.nickname
      : profile.signature === DEFAULT_SIGNATURE
        ? ''
        : profile.signature;
  void nextTick(() => editInputRef.value?.focus());
}

function closeEdit() {
  editType.value = null;
  editValue.value = '';
}

function confirmEdit() {
  const value = editValue.value.trim();
  if (editType.value === 'nickname') {
    if (!value) {
      message.warning('请输入新昵称');
      return;
    }
    profile.nickname = value;
    message.success('昵称已更新');
  } else {
    profile.signature = value || DEFAULT_SIGNATURE;
    message.success('个性签名已更新');
  }
  closeEdit();
}

function onEditMaskClick(event: MouseEvent) {
  if (event.target === event.currentTarget) closeEdit();
}

function isValidPassword(value: string) {
  return (
    value.length >= 8 &&
    value.length <= 32 &&
    /[a-zA-Z]/.test(value) &&
    /\d/.test(value)
  );
}

function sendCode() {
  if (codeCountdown.value > 0) return;
  message.success(`验证码已发送至 ${profile.phone}`);
  codeCountdown.value = 60;
  window.clearInterval(codeTimer);
  codeTimer = window.setInterval(() => {
    codeCountdown.value -= 1;
    if (codeCountdown.value <= 0) {
      window.clearInterval(codeTimer);
    }
  }, 1000);
}

function openPassword() {
  passwordOpen.value = true;
  showPassword.value = false;
  showConfirmPassword.value = false;
  passwordForm.code = '';
  passwordForm.password = '';
  passwordForm.confirm = '';
}

function closePassword() {
  passwordOpen.value = false;
}

function onPasswordMaskClick(event: MouseEvent) {
  if (event.target === event.currentTarget) closePassword();
}

async function confirmPassword() {
  if (!passwordForm.code.trim()) {
    message.warning('请输入验证码');
    return;
  }
  if (!isValidPassword(passwordForm.password)) {
    message.warning('密码需为8-32位且至少包含字母和数字');
    return;
  }
  if (passwordForm.password !== passwordForm.confirm) {
    message.warning('两次输入的密码不一致');
    return;
  }
  message.success('密码已修改，请重新登录');
  closePassword();
  close();
  await authStore.logout(false);
}

function openDestroy() {
  destroyOpen.value = true;
  destroyForm.code = '';
  destroyForm.acknowledged = false;
}

function closeDestroy() {
  destroyOpen.value = false;
}

function onDestroyMaskClick(event: MouseEvent) {
  if (event.target === event.currentTarget) closeDestroy();
}

async function confirmDestroy() {
  if (!destroyForm.code.trim()) {
    message.warning('请输入验证码');
    return;
  }
  if (!destroyForm.acknowledged) {
    message.warning('请先确认已知晓注销后果');
    return;
  }
  message.success('账号已注销');
  closeDestroy();
  close();
  await authStore.logout(false);
}

function handleRow(row: ProfileRow) {
  if (row.action === 'copy') {
    void copyId();
    return;
  }
  if (row.key === 'signature') {
    openEdit('signature');
    return;
  }
  if (row.key === 'password') {
    openPassword();
    return;
  }
  if (row.key === 'destroy') {
    openDestroy();
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
      class="fixed inset-0 z-[1200] flex items-center justify-center bg-[var(--learn-overlay)] p-4 backdrop-blur-[10px]"
      @click="onMaskClick"
    >
      <section
        class="relative flex max-h-[min(760px,90vh)] w-[min(380px,92vw)] flex-col overflow-hidden rounded-[24px] border border-[var(--learn-border)] bg-[var(--learn-glass)] shadow-[0_24px_80px_rgb(0_0_0_/_18%)] backdrop-blur-[28px]"
        data-profile-panel
        @keydown.esc="close"
      >
        <header class="flex shrink-0 items-center justify-between px-5 pt-[18px] pb-2">
          <h2 class="m-0 text-[17px] font-semibold text-[#f4f4f5]">个人信息</h2>
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
              <span class="truncate text-[15px] font-semibold text-[#f4f4f5]">
                {{ profile.nickname }}
              </span>
              <button
                class="inline-flex cursor-pointer border-0 bg-transparent p-0 text-[#b8b8c2] hover:text-white"
                type="button"
                @click="openEdit('nickname')"
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

    <div
      v-if="open && editType"
      class="fixed inset-0 z-[1210] flex items-center justify-center bg-black/25 p-4"
      @click="onEditMaskClick"
    >
      <div
        class="w-[min(420px,92vw)] rounded-2xl bg-white px-5 pt-4 pb-5 shadow-[0_16px_48px_rgb(40_30_90_/_18%)]"
        @click.stop
      >
        <div class="mb-4 flex items-center justify-between">
          <h3 class="m-0 text-[16px] font-semibold text-[#4d5bff]">
            {{ editConfig.title }}
          </h3>
          <button
            aria-label="关闭"
            class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-[18px] text-[#8b8b98] hover:bg-[#f3f4f8]"
            type="button"
            @click="closeEdit"
          >
            ×
          </button>
        </div>
        <input
          ref="editInputRef"
          v-model="editValue"
          class="mb-5 h-11 w-full rounded-xl border-0 bg-[#f3f4f8] px-3.5 text-[14px] text-[#1c1e26] outline-none placeholder:text-[#b0b4be]"
          :placeholder="editConfig.placeholder"
          type="text"
          @keydown.enter.prevent="confirmEdit"
        />
        <div class="flex justify-end gap-3">
          <button
            class="h-9 cursor-pointer rounded-lg border border-[#5d7cff] bg-white px-5 text-[14px] text-[#5d7cff]"
            type="button"
            @click="closeEdit"
          >
            取消
          </button>
          <button
            class="h-9 cursor-pointer rounded-lg border-0 bg-[#5d7cff] px-5 text-[14px] text-white"
            type="button"
            @click="confirmEdit"
          >
            确认
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="open && passwordOpen"
      class="fixed inset-0 z-[1210] flex items-center justify-center bg-black/25 p-4"
      @click="onPasswordMaskClick"
    >
      <div
        class="w-[min(440px,92vw)] rounded-2xl bg-white px-5 pt-4 pb-5 shadow-[0_16px_48px_rgb(40_30_90_/_18%)]"
        @click.stop
      >
        <div class="mb-3 flex items-center justify-between">
          <h3 class="m-0 text-[16px] font-semibold text-[#4d5bff]">修改登录密码</h3>
          <button
            aria-label="关闭"
            class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-[18px] text-[#8b8b98] hover:bg-[#f3f4f8]"
            type="button"
            @click="closePassword"
          >
            ×
          </button>
        </div>
        <p class="mb-4 text-[12px] leading-5 text-[#8b8b98]">
          修改登录密码后需重新登录，验证码将发送至：{{ profile.phone }}
        </p>
        <label class="mb-3 flex h-11 items-center gap-2 rounded-xl bg-[#f3f4f8] px-3">
          <IconifyIcon class="text-base text-[#9aa1ad]" icon="lucide:shield-check" />
          <input
            v-model="passwordForm.code"
            class="h-full min-w-0 flex-1 border-0 bg-transparent text-[14px] text-[#1c1e26] outline-none placeholder:text-[#b0b4be]"
            placeholder="请输入验证码"
            type="text"
          />
          <button
            class="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-[13px] text-[#5d7cff] disabled:cursor-not-allowed disabled:text-[#b0b4be]"
            :disabled="codeCountdown > 0"
            type="button"
            @click="sendCode"
          >
            {{ codeCountdown > 0 ? `${codeCountdown}s` : '发送验证码' }}
          </button>
        </label>
        <label class="flex h-11 items-center gap-2 rounded-xl bg-[#f3f4f8] px-3">
          <IconifyIcon class="text-base text-[#9aa1ad]" icon="lucide:lock" />
          <input
            v-model="passwordForm.password"
            class="h-full min-w-0 flex-1 border-0 bg-transparent text-[14px] text-[#1c1e26] outline-none placeholder:text-[#b0b4be]"
            placeholder="请输入新登录密码"
            :type="showPassword ? 'text' : 'password'"
          />
          <button
            class="cursor-pointer border-0 bg-transparent p-0 text-[#9aa1ad]"
            type="button"
            @click="showPassword = !showPassword"
          >
            <IconifyIcon :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'" />
          </button>
        </label>
        <p class="mt-1.5 mb-3 text-[12px] text-[#ff4d4f]">
          *密码需为8-32位且至少包含字母和数字
        </p>
        <label class="mb-5 flex h-11 items-center gap-2 rounded-xl bg-[#f3f4f8] px-3">
          <IconifyIcon class="text-base text-[#9aa1ad]" icon="lucide:lock" />
          <input
            v-model="passwordForm.confirm"
            class="h-full min-w-0 flex-1 border-0 bg-transparent text-[14px] text-[#1c1e26] outline-none placeholder:text-[#b0b4be]"
            placeholder="请再次输入登录密码"
            :type="showConfirmPassword ? 'text' : 'password'"
          />
          <button
            class="cursor-pointer border-0 bg-transparent p-0 text-[#9aa1ad]"
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
          >
            <IconifyIcon :icon="showConfirmPassword ? 'lucide:eye-off' : 'lucide:eye'" />
          </button>
        </label>
        <div class="flex justify-center gap-3">
          <button
            class="h-9 min-w-[88px] cursor-pointer rounded-lg border border-[#5d7cff] bg-white px-5 text-[14px] text-[#5d7cff]"
            type="button"
            @click="closePassword"
          >
            取消
          </button>
          <button
            class="h-9 min-w-[88px] cursor-pointer rounded-lg border-0 bg-[#5d7cff] px-5 text-[14px] text-white"
            type="button"
            @click="confirmPassword"
          >
            确认
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="open && destroyOpen"
      class="fixed inset-0 z-[1210] flex items-center justify-center bg-black/25 p-4"
      @click="onDestroyMaskClick"
    >
      <div
        class="w-[min(440px,92vw)] rounded-2xl bg-white px-5 pt-4 pb-5 shadow-[0_16px_48px_rgb(40_30_90_/_18%)]"
        @click.stop
      >
        <div class="mb-3 flex items-center justify-between">
          <h3 class="m-0 text-[16px] font-semibold text-[#ff4d4f]">注销账号</h3>
          <button
            aria-label="关闭"
            class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-[18px] text-[#8b8b98] hover:bg-[#f3f4f8]"
            type="button"
            @click="closeDestroy"
          >
            ×
          </button>
        </div>
        <p class="mb-4 text-[13px] leading-6 text-[#1c1e26]">
          注销后无法再次注册；此操作将删除账号下所有数据（含个人信息、学习记录、学习卡权限等）；验证码将发送至：{{ profile.phone }}
        </p>
        <label class="mb-3 flex h-11 items-center gap-2 rounded-xl bg-[#f3f4f8] px-3">
          <IconifyIcon class="text-base text-[#9aa1ad]" icon="lucide:shield-check" />
          <input
            v-model="destroyForm.code"
            class="h-full min-w-0 flex-1 border-0 bg-transparent text-[14px] text-[#1c1e26] outline-none placeholder:text-[#b0b4be]"
            placeholder="输入验证码"
            type="text"
          />
          <button
            class="shrink-0 cursor-pointer border-0 bg-transparent p-0 text-[13px] text-[#5d7cff] disabled:cursor-not-allowed disabled:text-[#b0b4be]"
            :disabled="codeCountdown > 0"
            type="button"
            @click="sendCode"
          >
            {{ codeCountdown > 0 ? `${codeCountdown}s` : '发送验证码' }}
          </button>
        </label>
        <label class="mb-5 flex cursor-pointer items-center gap-2 text-[13px] text-[#1c1e26]">
          <input
            v-model="destroyForm.acknowledged"
            class="size-4 accent-[#5d7cff]"
            type="checkbox"
          />
          我已知晓上述后果，仍然注销
        </label>
        <div class="flex justify-end gap-3">
          <button
            class="h-9 min-w-[88px] cursor-pointer rounded-lg border-0 bg-[#5d7cff] px-5 text-[14px] text-white"
            type="button"
            @click="closeDestroy"
          >
            取消
          </button>
          <button
            class="h-9 min-w-[88px] cursor-pointer rounded-lg border border-[#5d7cff] bg-white px-5 text-[14px] text-[#5d7cff]"
            type="button"
            @click="confirmDestroy"
          >
            确认注销
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<style scoped>
.relative {
  width: 35.71429rem;
  box-shadow: 0 1px 1.42857rem #e3deff33 inset, 0 .14286rem .64286rem #9a92d24d inset, 0 3.5rem 3.57143rem -1.71429rem #caacff4d inset, 0 -2.92857rem 2.42857rem -2.28571rem #6044904d inset, 0 .25rem .39286rem -.14286rem #fff inset, 0 1.39286rem 2rem -1.28571rem #ffffff80 inset;
}

</style>
