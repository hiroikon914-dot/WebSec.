export const BLOCKED_WINDOWS = [
  { start: "07:00", end: "13:00" },
  { start: "18:00", end: "21:00" }
] as const;

const toMinutes = (time: string): number => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export const isBlockedTime = (time: string): boolean => {
  const minute = toMinutes(time);
  return BLOCKED_WINDOWS.some(
    (w) => minute >= toMinutes(w.start) && minute < toMinutes(w.end)
  );
};

/** Returns px offset from DAY_START_HOUR. Each hour = PX_PER_HOUR px. */
export const DAY_START_HOUR = 5;
export const PX_PER_HOUR = 48;

export const timelineTop = (time: string): number => {
  const minutes = toMinutes(time);
  const offsetMinutes = minutes - DAY_START_HOUR * 60;
  return Math.max(0, (offsetMinutes / 60) * PX_PER_HOUR);
};

export const timelineHeight = (start: string, end: string): number => {
  const diff = toMinutes(end) - toMinutes(start);
  return Math.max(20, (diff / 60) * PX_PER_HOUR);
};
