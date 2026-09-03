export interface TextbookBook {
  art: 'desk' | 'school';
  cover: string;
  grade: string;
  headline: string;
  id: string;
  stage: string;
  title: string;
  version: string;
}

export const stages = [
  '小学',
  '初中',
  '小学(五-四学制)',
  '初中(五-四学制)',
  '高中',
  '大学',
  '特殊教育',
  '其他',
];

export const versionsByStage: Record<string, string[]> = {
  小学: [
    '人教版PEP (三年级起点)',
    '人教精通版',
    '人教版 (一起点)',
    '外研版 (三年级起点)',
    '外研版 (一起点)',
    '北师大版',
    '苏教译林版',
    '湘少版',
    '冀教版',
    '粤人版',
    '鲁科版',
    '教科版',
    '沪教牛津版',
    '北京版',
    '重大版',
    '接力版',
    '陕旅版',
    '科普版',
    '清华版',
    '辽师大版',
    '闽教版',
    '牛津上海版',
    '新概念英语',
    '剑桥国际少儿英语',
  ],
  初中: [
    '人教版',
    '外研版',
    '北师大版',
    '译林版',
    '冀教版',
    '鲁教版',
    '沪教牛津版',
    '仁爱版',
    '牛津深圳版',
    '教科版',
  ],
  '小学(五-四学制)': [
    '人教版PEP (三年级起点)',
    '北师大版',
    '冀教版',
    '鲁科版',
  ],
  '初中(五-四学制)': ['人教版', '外研版', '北师大版', '鲁教版'],
  高中: ['人教版', '外研版', '北师大版', '译林版', '冀教版', '重大版', '沪教版'],
  大学: ['新视野大学英语', '全新版大学英语', '新世纪大学英语', '综合英语教程'],
  特殊教育: ['人教版', '培智学校教材'],
  其他: ['自定义教材', '校本教材'],
};

export const gradesByStage: Record<string, string[]> = {
  小学: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
  初中: ['七年级', '八年级', '九年级'],
  '小学(五-四学制)': ['一年级', '二年级', '三年级', '四年级', '五年级'],
  '初中(五-四学制)': ['六年级', '七年级', '八年级', '九年级'],
  高中: ['高一', '高二', '高三'],
  大学: ['大一', '大二', '大三', '大四'],
  特殊教育: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
  其他: ['全部'],
};

const pepGrades = ['三年级', '四年级', '五年级', '六年级'];
const covers = ['cream', 'mint', 'sand', 'sky', 'lilac', 'peach'] as const;

export function gradesFor(stage: string, version: string) {
  if (version.includes('三年级起点')) return pepGrades;
  return gradesByStage[stage] ?? ['全部'];
}

function shortVersion(version: string) {
  return version
    .replace(/\s*\(.*\)/, '')
    .replace('人教版PEP', '人教PEP');
}

function makeBook(options: {
  art?: TextbookBook['art'];
  cover?: string;
  extra?: string;
  grade: string;
  id: string;
  stage: string;
  term: string;
  version: string;
}): TextbookBook {
  const short = shortVersion(options.version);
  const n = Number(options.id.replace(/\D/g, '') || 1);
  return {
    id: options.id,
    stage: options.stage,
    version: options.version,
    grade: options.grade,
    title: options.extra || `${options.grade}${options.term}${short}`,
    headline: `${options.grade}${options.term}英语`,
    art: options.art ?? (n % 2 === 0 ? 'desk' : 'school'),
    cover: options.cover ?? covers[(n - 1) % covers.length],
  };
}

const featured: TextbookBook[] = [
  makeBook({
    id: 'tb-1',
    stage: '小学',
    version: '人教版PEP (三年级起点)',
    grade: '三年级',
    term: '上册',
    extra: '(新课标) 三年级上册人教PEP',
    art: 'school',
    cover: 'cream',
  }),
  makeBook({
    id: 'tb-2',
    stage: '小学',
    version: '人教版PEP (三年级起点)',
    grade: '三年级',
    term: '下册',
    extra: '三年级下册人教PEP',
    art: 'school',
    cover: 'mint',
  }),
  makeBook({
    id: 'tb-3',
    stage: '小学',
    version: '人教版PEP (三年级起点)',
    grade: '三年级',
    term: '上册',
    extra: '三年级上册同步听力',
    art: 'desk',
    cover: 'sand',
  }),
  makeBook({
    id: 'tb-4',
    stage: '小学',
    version: '人教版PEP (三年级起点)',
    grade: '三年级',
    term: '下册',
    extra: '三年级下册同步练习',
    art: 'desk',
    cover: 'sky',
  }),
  makeBook({
    id: 'tb-5',
    stage: '小学',
    version: '人教版PEP (三年级起点)',
    grade: '三年级',
    term: '上册',
    extra: '三年级上册单词手册',
    art: 'desk',
    cover: 'lilac',
  }),
];

function buildCatalog() {
  const books = [...featured];
  const featuredKeys = new Set(
    featured.map((item) => `${item.stage}|${item.version}|${item.grade}`),
  );
  let index = 100;

  for (const stage of stages) {
    for (const version of versionsByStage[stage] ?? []) {
      for (const grade of gradesFor(stage, version)) {
        if (featuredKeys.has(`${stage}|${version}|${grade}`)) continue;
        for (const term of ['上册', '下册']) {
          books.push(
            makeBook({
              id: `tb-${index++}`,
              stage,
              version,
              grade,
              term,
              extra: `${grade}${term}${shortVersion(version)}`,
            }),
          );
        }
      }
    }
  }

  return books;
}

export const textbookList = buildCatalog();

export function getBookById(id: string) {
  return textbookList.find((item) => item.id === id);
}
