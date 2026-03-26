import { DashboardClient } from "@/components/DashboardClient";
import { formatJSTDate } from "@/lib/date";

export default function DashboardPage() {
  const todayLabel = formatJSTDate(new Date());
  return <DashboardClient todayLabel={todayLabel} />;
}
