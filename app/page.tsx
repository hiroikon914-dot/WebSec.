"use client";

import { useMemo, useState } from "react";
import { NewsPanel } from "@/components/NewsPanel";
import { RoutinePanel } from "@/components/RoutinePanel";
import { TaskBoard } from "@/components/TaskBoard";
import { TimelineDayView } from "@/components/TimelineDayView";
import { VoiceCaptureInput } from "@/components/VoiceCaptureInput";
import { CATEGORIES, type ParsedIntent, type Task } from "@/types/domain";
import { sampleNews, sampleRoutines, sampleTasks, sampleTimeline } from "@/sample-data";

const todayLabel = new Intl.DateTimeFormat("ja-JP", {
  dateStyle: "full"
}).format(new Date());

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  const updateStatus = (id: string, status: Task["status"]) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status, updatedAt: new Date().toISOString() } : t)));
  };

  const addFromInput = (text: string, parsed?: ParsedIntent) => {
    if (!text.trim()) return;
    const id = `task-${crypto.randomUUID()}`;
    const item: Task = {
      id,
      title: parsed?.title || text,
      category: parsed?.category ?? "プライベート",
      status: parsed?.status ?? "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      estimatedMinutes: parsed?.estimatedMinutes,
      notes: parsed?.notes
    };
    setTasks((prev) => [item, ...prev]);
  };

  const undoneCount = useMemo(() => tasks.filter((t) => t.status !== "done").length, [tasks]);

  return (
    <main className="dashboard">
      <header className="hero panel">
        <p className="muted">朝ブリーフ</p>
        <h1>{todayLabel}</h1>
        <p>未完了タスク {undoneCount} 件</p>
      </header>

      <div className="grid-main">
        <TimelineDayView events={sampleTimeline} />
        <VoiceCaptureInput onAddText={addFromInput} />
        <TaskBoard tasks={tasks.filter((t) => t.status !== "done")} categories={CATEGORIES} onStatusChange={updateStatus} />
        <RoutinePanel routines={sampleRoutines} />
        <NewsPanel items={sampleNews} />
      </div>
    </main>
  );
}
