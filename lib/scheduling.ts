import type { TimelineEvent } from "@/types/domain";

export const BLOCKED_WINDOWS = [
  { start: "07:00", end: "13:00" },
  { start: "18:00", end: "21:00" }
] as const;

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const isBlockedTime = (time: string): boolean => {
  const minute = toMinutes(time);
  return BLOCKED_WINDOWS.some((window) => minute >= toMinutes(window.start) && minute < toMinutes(window.end));
};

export const isEventValidForToday = (event: TimelineEvent): boolean => !isBlockedTime(event.start);

export const timelineTop = (time: string, dayStart = 300, unit = 10) => {
  const minutes = toMinutes(time);
  return Math.max(0, (minutes - dayStart) / unit) * 12;
};

export const timelineHeight = (start: string, end: string, unit = 10) => {
  const diff = toMinutes(end) - toMinutes(start);
  return Math.max(1, diff / unit) * 12;
};
