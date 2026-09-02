export interface LearningMenuItem {
  group: 'extra' | 'main' | 'tool';
  icon: string;
  key: string;
  path: string;
  title: string;
}

export const learningMenus: LearningMenuItem[] = [
  { key: 'home', path: '/learning/home', title: '首页', icon: 'lucide:house', group: 'main' },
  {
    key: 'course-square',
    path: '/learning/course-square',
    title: '课程广场',
    icon: 'lucide:layout-grid',
    group: 'main',
  },
  {
    key: 'textbook',
    path: '/learning/textbook',
    title: '教材同步',
    icon: 'lucide:book-open',
    group: 'main',
  },
  {
    key: 'vocabulary',
    path: '/learning/vocabulary',
    title: '单词仓库',
    icon: 'lucide:library',
    group: 'main',
  },
  {
    key: 'phonics',
    path: '/learning/phonics',
    title: '音标课程',
    icon: 'lucide:audio-lines',
    group: 'main',
  },
  { key: 'ai-chat', path: '/learning/ai-chat', title: 'AI 对话', icon: 'lucide:bot', group: 'main' },
  {
    key: 'pk-arena',
    path: '/learning/pk-arena',
    title: 'PK竞技场',
    icon: 'lucide:swords',
    group: 'main',
  },
  {
    key: 'study-plan',
    path: '/learning/study-plan',
    title: '学习计划',
    icon: 'lucide:calendar-check',
    group: 'tool',
  },
  {
    key: 'journal',
    path: '/learning/journal',
    title: '学习手账',
    icon: 'lucide:notebook-pen',
    group: 'tool',
  },
  {
    key: 'favorites',
    path: '/learning/favorites',
    title: '我的收藏',
    icon: 'lucide:star',
    group: 'tool',
  },
  {
    key: 'leaderboard',
    path: '/learning/leaderboard',
    title: '排行榜',
    icon: 'lucide:trophy',
    group: 'tool',
  },
  {
    key: 'ai-studio',
    path: '/learning/ai-studio',
    title: 'AI创课坊',
    icon: 'lucide:sparkles',
    group: 'tool',
  },
  {
    key: 'partner',
    path: '/learning/partner',
    title: '合伙人计划',
    icon: 'lucide:handshake',
    group: 'extra',
  },
  {
    key: 'society',
    path: '/learning/society',
    title: '学社主理人',
    icon: 'lucide:users',
    group: 'extra',
  },
  {
    key: 'study-card',
    path: '/learning/study-card',
    title: '开通学习卡',
    icon: 'lucide:credit-card',
    group: 'extra',
  },
  {
    key: 'rewards',
    path: '/learning/rewards',
    title: '推广奖励',
    icon: 'lucide:gift',
    group: 'extra',
  },
];

export const learningHeaderActions = [
  { key: 'wechat', title: '微信群', icon: 'lucide:messages-square' },
  { key: 'desktop', title: '添加桌面', icon: 'lucide:monitor-up' },
  { key: 'service', title: '客服咨询', icon: 'lucide:headset' },
  { key: 'follow', title: '关注我们', icon: 'lucide:qr-code' },
  { key: 'feedback', title: '建议反馈', icon: 'lucide:message-square-plus' },
];
