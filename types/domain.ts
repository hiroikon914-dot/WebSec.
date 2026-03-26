export const CATEGORIES = ["日本語教師", "家の芽", "プライベート"] as const;
export type Category = (typeof CATEGORIES)[number];

export type TaskStatus = "todo" | "waiting" | "done";
export type RoutineFrequency = "daily" | "weekly" | "custom";

export type Task = {
  id: string;
  title: string;
  category: Category;
  status: TaskStatus;
  priority?: "low" | "medium" | "high";
  dueDate?: string;
  notes?: string;
  parentTaskId?: string;
  estimatedMinutes?: number;
  createdAt: string;
  updatedAt: string;
};

export type Routine = {
  id: string;
  title: string;
  category: Category;
  frequency: RoutineFrequency;
  preferredTime?: string;
  durationMinutes?: number;
  active: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type TimelineEvent = {
  id: string;
  title: string;
  category: Category;
  start: string;
  end: string;
};

export type NewsItem = {
  id: string;
  region: "日本" | "アメリカ" | "世界";
  title: string;
  summary: string;
  calm: boolean;
};

export type ParsedIntent = {
  kind: "task" | "routine";
  title: string;
  category: Category;
  status?: TaskStatus;
  parentTaskTitle?: string;
  estimatedMinutes?: number;
  notes?: string;
};
