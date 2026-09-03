export interface TextbookUnit {
  duration: string;
  finished: number;
  id: number;
  title: string;
}

export function createTextbookUnits(): TextbookUnit[] {
  const titles: string[] = [];
  for (let unit = 1; unit <= 6; unit += 1) {
    const parts =
      unit === 6 ? ['Part A', 'Part B'] : ['Part A', 'Part B', 'Part C'];
    for (const part of parts) {
      titles.push(`Unit ${unit} ${part}`);
    }
  }

  return titles.map((title, index) => ({
    id: index + 1,
    title,
    duration: '0分钟',
    finished: 0,
  }));
}
