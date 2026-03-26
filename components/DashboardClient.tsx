"use client";

import { useState } from "react";
import { CATEGORIES } from "@/types/domain";
import type { ParsedIntent, Routine, ScheduleItem, Task, NewsItem } from "@/types/domain";
import { sampleNews, sampleRoutines, sampleSchedule, sampleTasks } from "@/sample-data";
import { VoiceCaptureInput } from "./VoiceCaptureInput";
import { WaitingPanel } from "./WaitingPanel";
import { TaskBoard } from "./TaskBoard";
import { TimelineDayView } from "./TimelineDayView";
import { RoutinePanel } from "./RoutinePanel";
import { NewsPanel } from "./NewsPanel";

type Props = { todayLabel: string };

export function DashboardClient({ todayLabel }: Props) {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [routines] = useState<Routine[]>(sampleRoutines);
  const [schedule] = useState<ScheduleItem[]>(sampleSchedule);
  const [news] = useState<NewsItem[]>(sampleNews);

  const handleStatusChange = (id: string, next: Task["status"]) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: next, updatedAt: new Date().toISOString() } : t))
    );
  };

  const handleAddText = (text: string, parsed?: ParsedIntent) => {
    if (!text.trim()) return;
    const now = new Date().toISOString();
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
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>AIパーソナル秘書</h1>
        <span className="date-label">{todayLabel}</span>
      </header>

      <VoiceCaptureInput onAddText={handleAddText} />

      <div className="dashboard-columns">
        <div className="col-left">
          <WaitingPanel tasks={tasks} onStatusChange={handleStatusChange} />
          <TaskBoard tasks={tasks} categories={CATEGORIES} onStatusChange={handleStatusChange} />
        </div>
        <div className="col-right">
          <TimelineDayView schedule={schedule} />
          <RoutinePanel routines={routines} />
          <NewsPanel items={news} />
        </div>
      </div>
    </div>
  );
}
