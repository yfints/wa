import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      hideInMenu: true,
      hideInTab: true,
      title: '工作台',
    },
    name: 'DashboardWorkspace',
    path: '/dashboard/workspace',
    redirect: '/learning/course-square',
  },
];

export default routes;
