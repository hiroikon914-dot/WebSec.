import type { Routine } from "@/types/domain";

export function RoutinePanel({ routines }: { routines: Routine[] }) {
  return (
    <section className="panel">
      <h2>ルーティーン管理（土台）</h2>
      <ul>
        {routines.map((routine) => (
          <li key={routine.id} className="simple-row">
            <div>
              <strong>{routine.title}</strong> ({routine.frequency})
            </div>
            <small>
              {routine.preferredTime ?? "時間未設定"} / {routine.durationMinutes ?? 0}分 / {routine.active ? "active" : "inactive"}
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
}
