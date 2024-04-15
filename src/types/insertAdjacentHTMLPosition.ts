export const insertAdjacentHTMLPosition = [
  'beforebegin',
  'afterbegin',
  'beforeend',
  'afterend',
] as const;

export type InsertAdjacentHTMLPosition = typeof insertAdjacentHTMLPosition[number];
