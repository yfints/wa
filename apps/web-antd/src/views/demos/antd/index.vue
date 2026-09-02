<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import { Button, Card, message, notification, Space } from 'ant-design-vue';

type NotificationType = 'error' | 'info' | 'success' | 'warning';

function info() {
  message.info('How many roads must a man walk down');
}

function error() {
  message.error({
    content: 'Once upon a time you dressed so fine',
    // ant-design-vue 的 message.duration 单位是「秒」, 不是毫秒
    duration: 2.5,
  });
}

function warning() {
  message.warning('How many roads must a man walk down');
}
function success() {
  message.success('Cause you walked hand in hand With another man in my place');
}

function notify(type: NotificationType) {
  notification[type]({
    // ant-design-vue 的 notification.duration 单位是「秒」, 不是毫秒
    duration: 2.5,
    message: '说点啥呢',
    type,
  });
}
</script>

<template>
  <Page >

  </Page>
</template>
