import { DashboardClient } from "@/components/DashboardClient";

const WEEKDAYS = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"] as const;

const formatTodayLabel = (date: Date): string => {
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  const jst = new Date(utc + 9 * 60 * 60 * 1000);
  const year = jst.getFullYear();
  const month = jst.getMonth() + 1;
  const day = jst.getDate();
  const weekday = WEEKDAYS[jst.getDay()];
  return `${year}年${month}月${day}日 ${weekday}`;
};

export default function DashboardPage() {
  const todayLabel = formatTodayLabel(new Date());
  return <DashboardClient todayLabel={todayLabel} />;
}
