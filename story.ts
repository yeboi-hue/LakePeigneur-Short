export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION = 60 * FPS;

export type Beat = {start: number; end: number; name: string};
export const BEATS: Beat[] = [
  {start: 0, end: 240, name: 'The impossible drain'},
  {start: 240, end: 510, name: 'The drilling rig'},
  {start: 510, end: 780, name: 'The breakthrough'},
  {start: 780, end: 1170, name: 'The whirlpool'},
  {start: 1170, end: 1500, name: 'The mine below'},
  {start: 1500, end: 1800, name: 'The aftermath'},
];

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
export const smooth = (v: number) => {
  const x = clamp01(v);
  return x * x * (3 - 2 * x);
};
export const beatProgress = (frame: number, start: number, end: number) =>
  smooth((frame - start) / (end - start));
