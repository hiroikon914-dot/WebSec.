import type { Task } from "@/types/domain";

export type TaskNode = Task & { children: TaskNode[] };

export const buildTaskTree = (tasks: Task[]): TaskNode[] => {
  const map = new Map<string, TaskNode>();
  tasks.forEach((task) => map.set(task.id, { ...task, children: [] }));

  const roots: TaskNode[] = [];
  map.forEach((node) => {
    if (node.parentTaskId && map.has(node.parentTaskId)) {
      map.get(node.parentTaskId)?.children.push(node);
    } else {
      roots.push(node);
    }
  });
  return roots;
};
