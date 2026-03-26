import type { Routine } from "@/types/domain";

const FREQ_LABEL: Record<Routine["frequency"], string> = {
  daily: "毎日",
  weekly: "毎週",
  custom: "カスタム"
};

export function RoutinePanel({ routines }: { routines: Routine[] }) {
  const active = routines.filter((r) => r.active);

  return (
    <section className="panel">
      <div className="panel-header">
        <span className="panel-title">ルーティーン</span>
      </div>
      {active.length === 0 ? (
        <p className="empty-msg">登録なし</p>
      ) : (
        <ul className="routine-list">
          {active.map((r) => (
            <li key={r.id} className="routine-row">
              <span className="routine-name">{r.title}</span>
              {r.preferredTime && (
                <span className="routine-time">{r.preferredTime}</span>
              )}
              <span className="routine-tag">{FREQ_LABEL[r.frequency]}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
