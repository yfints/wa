export interface CourseItem {
  art: string;
  badge: string;
  category: string;
  heat: number;
  id: string;
  subtitle: string;
  title: string;
  tone: string;
}

export const courseCategories = [
  '全部',
  '零基础',
  '日常实用',
  '综合提升',
  '商务英语',
  '认证备考',
  '娱乐影音',
  '分级阅读',
  '词汇学习',
  '行业英语',
  '文学读物',
  '英文演讲',
  '其他',
];

const rawCourses: Array<[string, string, string, string]> = [
  ['零基础日常口语表达900句', '900', '#b9e8d6', '零基础'],
  ['精选720组核心英文句型 少儿六上段', '720', '#e4c7a1', '综合提升'],
  ['精选720组核心英文句型 少儿六下段', '720', '#f3ba8b', '综合提升'],
  ['精选600组核心英文句型 少儿五上段', '600', '#b9d8f4', '综合提升'],
  ['精选600组核心英文句型 少儿五下段', '600', '#d7b37b', '综合提升'],
  ['精选450组核心英文句型 少儿四上段', '450', '#93d2e4', '综合提升'],
  ['精选450组核心英文句型 少儿四下段', '450', '#ecd19c', '综合提升'],
  ['精选300组核心英文句型 少儿三上段', '300', '#bee3c1', '综合提升'],
  ['精选300组核心英文句型 少儿三下段', '300', '#d6b587', '综合提升'],
  ['零基础学英语（认识动物、星期、水果...）', 'ABC', '#f0ca5c', '零基础'],
  ['26个英文字母', 'A B C', '#f3dfa0', '零基础'],
  ['语法渐进式突破', 'GRAMMAR', '#e4e6dd', '词汇学习'],
  ['零基础英语生活常用表达', 'SPEAK', '#b6dbbd', '日常实用'],
  ['Reading for Vocabulary-Level A', 'READ', '#abd9e9', '分级阅读'],
  ['生活场景常用简单表达', '生活场景', '#e6b9bc', '日常实用'],
  ['万用亲子英文（第一册）', '8000句', '#dc8cb6', '其他'],
  ['万用亲子英文（第二册）', '8000句', '#da8aaf', '其他'],
  ['万用亲子英文（第三册）', '8000句', '#e3ad90', '其他'],
  ['母女英语口语', '母女英语', '#bbd4e8', '日常实用'],
  ['亲子英语口语2000句', '2000句', '#ebd1ac', '日常实用'],
  ['实用口语：生活场景90个', '90个', '#c08c70', '日常实用'],
  ['简单有趣的地道美语表达', 'AMERICAN', '#9cbaba', '日常实用'],
  ['美剧口语句子', 'MOVIE', '#d5bd94', '娱乐影音'],
  ['机场英语口语', 'AIRPORT', '#b7d1e5', '行业英语'],
];

export const courseList: CourseItem[] = rawCourses.map(
  ([title, art, tone, category], index) => ({
    id: String(index + 1),
    title,
    art,
    tone,
    category,
    badge: '用户共享',
    subtitle: index % 3 === 0 ? '少儿上段英语语调' : '日常英语轻松学习',
    heat: 8220 - index * 128,
  }),
);

export function getCourseById(id: string) {
  return courseList.find((item) => item.id === id);
}
