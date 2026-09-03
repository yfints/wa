export type FavoriteTab = 'sentence' | 'word';

export interface FavoriteSentenceItem {
  art: string;
  badge: string;
  heat: number;
  id: string;
  subtitle: string;
  tab: 'sentence';
  title: string;
  tone: string;
}

export interface FavoriteWordItem {
  desc: string;
  id: string;
  tab: 'word';
  title: string;
  wordCount: number;
}

export type FavoriteItem = FavoriteSentenceItem | FavoriteWordItem;

const sentenceRaw: Array<[string, string, string, number]> = [
  ['精选300组核心英文句型 少儿三上段', '300', '#bee3c1', 7975],
  ['精选300组核心英文句型 少儿三下段', '300', '#d6b587', 8120],
  ['精选450组核心英文句型 少儿四上段', '450', '#93d2e4', 7640],
  ['精选450组核心英文句型 少儿四下段', '450', '#ecd19c', 7512],
  ['精选600组核心英文句型 少儿五上段', '600', '#b9d8f4', 6890],
  ['精选600组核心英文句型 少儿五下段', '600', '#d7b37b', 6724],
  ['精选720组核心英文句型 少儿六上段', '720', '#e4c7a1', 6408],
  ['零基础日常口语表达900句', '900', '#b9e8d6', 9201],
  ['小学英语·三年级·人教版PEP', '三年级', '#a8d4f0', 5530],
  ['小学英语·三年级·北师大版', '三年级', '#f0c9a0', 4812],
  ['Desperate Housewives Season 1', 'MOVIE', '#d5bd94', 3360],
  ['独家英文写作笔记本', 'WRITE', '#c8b8e8', 2188],
];

const wordRaw: Array<[string, string, number]> = [
  ['(新课标) 四年级下册人教版PEP', '暂无介绍', 139],
  ['(2013) 五年级上册人教版PEP', '暂无介绍', 130],
  ['(新课标) 三年级上册人教版PEP', '暂无介绍', 107],
  ['(2013) 四年级上册人教版PEP', '暂无介绍', 170],
  ['(2013) 三年级下册人教版PEP', '暂无介绍', 72],
];

export const favoriteSentenceList: FavoriteSentenceItem[] = sentenceRaw.map(
  ([title, art, tone, heat], index) => ({
    id: String(index + 1),
    title,
    art,
    tone,
    heat,
    tab: 'sentence',
    badge: '用户共享',
    subtitle: '日常英语轻松学习',
  }),
);

export const favoriteWordList: FavoriteWordItem[] = wordRaw.map(
  ([title, desc, wordCount], index) => ({
    id: `w-${index + 1}`,
    title,
    desc,
    wordCount,
    tab: 'word',
  }),
);

export const favoriteList: FavoriteItem[] = [
  ...favoriteSentenceList,
  ...favoriteWordList,
];
