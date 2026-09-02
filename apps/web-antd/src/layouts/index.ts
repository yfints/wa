const BasicLayout = () => import('./basic.vue');
const AuthPageLayout = () => import('./auth.vue');
const LearningLayout = () => import('./learning.vue');

const IFrameView = () => import('@vben/layouts').then((m) => m.IFrameView);

export { AuthPageLayout, BasicLayout, IFrameView, LearningLayout };
