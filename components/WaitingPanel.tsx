"use client";

import type { Task } from "@/types/domain";

type Props = {
  tasks: Task[];
  onStatusChange: (id: string, next: Task["status"]) => void;
};

export function WaitingPanel({ tasks, onStatusChange }: Props) {
  const waiting = tasks.filter((t) => t.status === "waiting");

  return (
    <section className="panel">
      <div className="panel-header">
        <span className="panel-title">返信待ち</span>
        {waiting.length > 0 && (
          <span className="count-badge">{waiting.length}</span>
        )}
      </div>
      {waiting.length === 0 ? (
        <p className="empty-msg">返信待ちはありません</p>
      ) : (
        <ul className="waiting-list">
          {waiting.map((task) => (
            <li key={task.id} className="waiting-row">
              <span className="waiting-dot" />
              <span className="waiting-title">{task.title}</span>
              <span className="waiting-actions">
                <button className="btn btn-ghost" onClick={() => onStatusChange(task.id, "todo")}>todo</button>
                <button className="btn btn-ghost" onClick={() => onStatusChange(task.id, "done")}>done</button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
