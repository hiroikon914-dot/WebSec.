import { DashboardClient } from "@/components/DashboardClient";

const WEEKDAYS = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"] as const;

const formatTodayLabel = (date: Date): string => {
  const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
  const jst = new Date(date.getTime() + JST_OFFSET_MS);

  const year = jst.getUTCFullYear();
  const month = jst.getUTCMonth() + 1;
  const day = jst.getUTCDate();
  const weekday = WEEKDAYS[jst.getUTCDay()];

  return `${year}年${month}月${day}日${weekday}`;
};

export default function DashboardPage() {
  const todayLabel = formatTodayLabel(new Date());
  return <DashboardClient todayLabel={todayLabel} />;
}
