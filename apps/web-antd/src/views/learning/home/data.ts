export interface HonorUser {
  avatarHue: number;
  badge?: string;
  duration: string;
  name: string;
  rank: number;
}

export interface PeriodStat {
  masteredSentences: number;
  masteredWords: number;
  sentences: number;
  unfamiliarSentences: number;
  unfamiliarWords: number;
  words: number;
  wrongSentences: number;
  wrongWords: number;
}

export const periodTabs = ['总计', '今天', '昨天', '本周', '本月'] as const;
export type PeriodTab = (typeof periodTabs)[number];

export const periodStats: Record<PeriodTab, PeriodStat> = {
  总计: {
    sentences: 36,
    words: 0,
    wrongSentences: 2,
    unfamiliarSentences: 1,
    masteredSentences: 0,
    wrongWords: 0,
    unfamiliarWords: 0,
    masteredWords: 0,
  },
  今天: {
    sentences: 0,
    words: 0,
    wrongSentences: 0,
    unfamiliarSentences: 0,
    masteredSentences: 0,
    wrongWords: 0,
    unfamiliarWords: 0,
    masteredWords: 0,
  },
  昨天: {
    sentences: 35,
    words: 0,
    wrongSentences: 2,
    unfamiliarSentences: 1,
    masteredSentences: 0,
    wrongWords: 0,
    unfamiliarWords: 0,
    masteredWords: 0,
  },
  本周: {
    sentences: 35,
    words: 0,
    wrongSentences: 2,
    unfamiliarSentences: 1,
    masteredSentences: 0,
    wrongWords: 0,
    unfamiliarWords: 0,
    masteredWords: 0,
  },
  本月: {
    sentences: 35,
    words: 0,
    wrongSentences: 2,
    unfamiliarSentences: 1,
    masteredSentences: 0,
    wrongWords: 0,
    unfamiliarWords: 0,
    masteredWords: 0,
  },
};

export const studyDuration = {
  total: '12分钟55秒',
  today: '3分钟55秒',
  month: '7分钟40秒',
};

export const checkinStats = {
  current: 0,
  highest: 0,
  total: 0,
};

export const checkinMilestones = ['累计0天', '累计1天', '累计2天'];

export const honorList: HonorUser[] = [
  { rank: 1, name: '星河漫步', duration: '03小时05分钟', avatarHue: 0, badge: '学社主理人' },
  { rank: 2, name: '134****6610', duration: '02小时51分钟', avatarHue: 40, badge: '合伙人' },
  { rank: 3, name: '哇小王', duration: '02小时30分钟', avatarHue: 80 },
  { rank: 4, name: '夜读英文', duration: '02小时12分钟', avatarHue: 120, badge: '合伙人' },
  { rank: 5, name: '语法小能手', duration: '01小时58分钟', avatarHue: 160 },
  { rank: 6, name: '开口练习中', duration: '01小时41分钟', avatarHue: 200 },
  { rank: 7, name: '打卡不缺席', duration: '01小时26分钟', avatarHue: 240, badge: '学社主理人' },
  { rank: 8, name: '句子收集家', duration: '01小时09分钟', avatarHue: 280 },
  { rank: 9, name: '晨读计划', duration: '00小时54分钟', avatarHue: 320 },
  { rank: 10, name: '慢慢来也快', duration: '00小时41分钟', avatarHue: 20 },
  { rank: 11, name: '耳机里的课', duration: '00小时33分钟', avatarHue: 60 },
  { rank: 12, name: '今日也学习', duration: '00小时21分钟', avatarHue: 100 },
];

export function getMonthBars(year: number, month: number) {
  const days = new Date(year, month, 0).getDate();
  return Array.from({ length: days }, (_, index) => {
    const day = index + 1;
    let value = 0;
    if (year === 2026 && month === 9) {
      value = day === 1 ? 28 : day === 2 ? 42 : 0;
    } else if (new Date(year, month - 1, day) < new Date(2026, 8, 1)) {
      const seed = (year * 12 + month) * 31 + day;
      value = seed % 5 === 0 ? 0 : 12 + (seed % 36);
    }
    return { day, value };
  });
}
