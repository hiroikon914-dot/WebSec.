import { DashboardClient } from "@/components/DashboardClient";

const formatTodayLabel = (date: Date): string =>
  new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    timeZone: "Asia/Tokyo"
  }).format(date);

export default function DashboardPage() {
  const todayLabel = formatTodayLabel(new Date());
  return <DashboardClient todayLabel={todayLabel} />;
}
