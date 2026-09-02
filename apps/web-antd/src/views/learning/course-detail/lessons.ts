export interface LessonItem {
  duration: string;
  en: string;
  finished: number;
  id: number;
  recent: boolean;
  title: string;
}

const lessonSeeds = [
  { title: '问候与道别', en: 'Greetings and Farewells' },
  { title: '感谢与道歉', en: 'Thanks and Apologies' },
  { title: '请求与指示', en: 'Requests and Instructions' },
  { title: '同意与拒绝', en: 'Agreement and Rejection' },
  { title: '时间与日期', en: 'Time and Dates' },
  { title: '数字与价格', en: 'Numbers and Prices' },
  { title: '天气与季节', en: 'Weather and Seasons' },
  { title: '家庭与朋友', en: 'Family and Friends' },
  { title: '饮食与点餐', en: 'Food and Ordering' },
  { title: '购物与讨价', en: 'Shopping and Bargaining' },
  { title: '问路与交通', en: 'Asking Directions' },
  { title: '旅行与住宿', en: 'Travel and Hotels' },
  { title: '健康与就医', en: 'Health and Hospital' },
  { title: '工作与面试', en: 'Work and Interviews' },
  { title: '兴趣与爱好', en: 'Hobbies and Interests' },
];

const chineseNumbers = [
  '一',
  '二',
  '三',
  '四',
  '五',
  '六',
  '七',
  '八',
  '九',
  '十',
  '十一',
  '十二',
  '十三',
  '十四',
  '十五',
];

export function createLessons(): LessonItem[] {
  return lessonSeeds.map((item, index) => ({
    id: index + 1,
    title: `${chineseNumbers[index]}、${item.title}`,
    en: item.en,
    recent: index === 0,
    duration: '0分钟',
    finished: 0,
  }));
}
