"use client";

import { useState } from "react";
import { CATEGORIES } from "@/types/domain";
import type { ParsedIntent, Routine, Task, TimelineEvent, NewsItem } from "@/types/domain";
import { sampleNews, sampleRoutines, sampleTasks, sampleTimeline } from "@/sample-data";
import { VoiceCaptureInput } from "./VoiceCaptureInput";
import { TaskBoard } from "./TaskBoard";
import { TimelineDayView } from "./TimelineDayView";
import { RoutinePanel } from "./RoutinePanel";
import { NewsPanel } from "./NewsPanel";

type Props = { todayLabel: string };

export function DashboardClient({ todayLabel }: Props) {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [routines] = useState<Routine[]>(sampleRoutines);
  const [events] = useState<TimelineEvent[]>(sampleTimeline);
  const [news] = useState<NewsItem[]>(sampleNews);

  const handleStatusChange = (id: string, next: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: next, updatedAt: new Date().toISOString() } : task))
    );
  };

  const handleAddText = (text: string, parsed?: ParsedIntent) => {
    if (!text.trim()) return;
    const now = new Date().toISOString();
    if (parsed?.kind === "task" || !parsed) {
      const newTask: Task = {
        id: `t${Date.now()}`,
        title: parsed?.title ?? text.trim(),
        category: parsed?.category ?? "プライベート",
        status: parsed?.status ?? "todo",
        notes: parsed?.notes,
        estimatedMinutes: parsed?.estimatedMinutes,
        createdAt: now,
        updatedAt: now
      };
      setTasks((prev) => [...prev, newTask]);
    }
  };

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <h1>AIパーソナル秘書</h1>
        <span className="today-label">{todayLabel}</span>
      </header>
      <div className="dashboard-grid">
        <VoiceCaptureInput onAddText={handleAddText} />
        <TaskBoard tasks={tasks} categories={CATEGORIES} onStatusChange={handleStatusChange} />
        <TimelineDayView events={events} />
        <RoutinePanel routines={routines} />
        <NewsPanel items={news} />
      </div>
    </main>
  );
}
