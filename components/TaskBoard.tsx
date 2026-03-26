import { buildTaskTree, type TaskNode } from "@/lib/task-utils";
import type { Category, Task } from "@/types/domain";

type Props = {
  tasks: Task[];
  categories: readonly Category[];
  onStatusChange: (id: string, next: Task["status"]) => void;
};

function TaskRow({ node, onStatusChange, depth = 0 }: { node: TaskNode; onStatusChange: Props["onStatusChange"]; depth?: number }) {
  return (
    <li className="task-node">
      <div className="task-item">
        <span className="task-dot" />
        <span className="task-title">{node.title}</span>
        <span className="task-actions">
          <button className="btn btn-ghost" onClick={() => onStatusChange(node.id, "waiting")}>待ち</button>
          <button className="btn btn-ghost" onClick={() => onStatusChange(node.id, "done")}>完了</button>
        </span>
      </div>
      {node.children.length > 0 && (
        <ul className="children-list task-list">
          {node.children.map((child) => (
            <TaskRow key={child.id} node={child} onStatusChange={onStatusChange} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function TaskBoard({ tasks, categories, onStatusChange }: Props) {
  const todos = tasks.filter((t) => t.status === "todo");

  return (
    <section className="panel">
      <div className="panel-header">
        <span className="panel-title">未完了タスク</span>
      </div>
      {categories.map((category) => {
        const grouped = todos.filter((t) => t.category === category);
        const tree = buildTaskTree(grouped);
        return (
          <div key={category} className="category-group">
            <div className="category-heading">{category}</div>
            {tree.length === 0 ? (
              <p className="no-tasks">タスクなし</p>
            ) : (
              <ul className="task-list">
                {tree.map((node) => (
                  <TaskRow key={node.id} node={node} onStatusChange={onStatusChange} />
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </section>
  );
}
