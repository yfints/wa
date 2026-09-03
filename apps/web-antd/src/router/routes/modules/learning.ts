import type { RouteRecordRaw } from 'vue-router';

import { learningMenus } from '#/views/learning/menus';

const comingSoon = () => import('#/views/learning/coming-soon/index.vue');

const children: RouteRecordRaw[] = learningMenus.map((item) => {
  const pageMap: Record<string, RouteRecordRaw['component']> = {
    home: () => import('#/views/learning/home/index.vue'),
    'course-square': () => import('#/views/learning/course-square/index.vue'),
    textbook: () => import('#/views/learning/textbook/index.vue'),
    favorites: () => import('#/views/learning/favorites/index.vue'),
  };

  return {
    name: `Learning${item.key
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')}`,
    path: item.path.replace('/learning/', ''),
    component: pageMap[item.key] ?? comingSoon,
    meta: {
      hideInMenu: true,
      hideInTab: true,
      title: item.title,
    },
  };
});

const routes: RouteRecordRaw[] = [
  {
    meta: {
      hideInMenu: true,
      hideInTab: true,
      noBasicLayout: true,
      title: '课程广场',
    },
    name: 'Learning',
    path: '/learning',
    redirect: '/learning/course-square',
    component: () => import('#/layouts/learning.vue'),
    children: [
      ...children,
      {
        name: 'LearningCourseDetail',
        path: 'course/:id',
        component: () => import('#/views/learning/course-detail/index.vue'),
        meta: {
          hideInMenu: true,
          hideInTab: true,
          title: '课程详情',
        },
      },
      {
        name: 'LearningTextbookDetail',
        path: 'textbook/:id',
        component: () => import('#/views/learning/textbook/detail.vue'),
        meta: {
          hideInMenu: true,
          hideInTab: true,
          title: '课程详情',
        },
      },
      {
        name: 'LearningPracticeLoading',
        path: 'practice/:id',
        component: () => import('#/views/learning/practice/loading.vue'),
        meta: {
          hideInMenu: true,
          hideInTab: true,
          title: '课程加载中',
        },
      },
    ],
  },
];

export default routes;
