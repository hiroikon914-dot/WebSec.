import { buildTaskTree, type TaskNode } from "@/lib/task-tree";
import type { Category, Task } from "@/types/domain";

type Props = {
  tasks: Task[];
  categories: readonly Category[];
  onStatusChange: (id: string, next: Task["status"]) => void;
};

function TreeRow({ node, onStatusChange, depth = 0 }: { node: TaskNode; onStatusChange: Props["onStatusChange"]; depth?: number }) {
  return (
    <li>
      <div className="task-row" style={{ paddingLeft: `${depth * 16}px` }}>
        <span>{node.title}</span>
        <div className="task-actions">
          <button onClick={() => onStatusChange(node.id, "todo")}>todo</button>
          <button onClick={() => onStatusChange(node.id, "waiting")}>waiting</button>
          <button onClick={() => onStatusChange(node.id, "done")}>done</button>
        </div>
      </div>
      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <TreeRow key={child.id} node={child} onStatusChange={onStatusChange} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function TaskBoard({ tasks, categories, onStatusChange }: Props) {
  const waiting = tasks.filter((task) => task.status === "waiting");
  const todos = tasks.filter((task) => task.status === "todo");

  return (
    <div className="task-columns">
      <section className="panel">
        <h2>返信待ち</h2>
        <ul>
          {waiting.length === 0 && <li>返信待ちはありません。</li>}
          {waiting.map((task) => (
            <li key={task.id} className="simple-row">
              {task.title}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel">
        <h2>未完了タスク（カテゴリ別）</h2>
        {categories.map((category) => {
          const grouped = todos.filter((task) => task.category === category);
          const tree = buildTaskTree(grouped);
          return (
            <div key={category} className="category-block">
              <h3>{category}</h3>
              {tree.length === 0 ? (
                <p className="muted">未完了タスクなし</p>
              ) : (
                <ul>
                  {tree.map((node) => (
                    <TreeRow key={node.id} node={node} onStatusChange={onStatusChange} />
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
