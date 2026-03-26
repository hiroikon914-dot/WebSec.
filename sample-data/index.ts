import type { NewsItem, Routine, Task, TimelineEvent } from "@/types/domain";

const now = "2026-03-26T05:00:00.000Z";

export const sampleTasks: Task[] = [
  { id: "t1", title: "4/5の芝作業準備", category: "プライベート", status: "todo", createdAt: now, updatedAt: now },
  { id: "t1-1", title: "山砂か洗い砂か決める", category: "プライベート", status: "todo", parentTaskId: "t1", createdAt: now, updatedAt: now },
  { id: "t1-2", title: "東庄の土建屋で砂を手配", category: "プライベート", status: "todo", parentTaskId: "t1", createdAt: now, updatedAt: now },
  { id: "t1-3", title: "土壌改良プランを決める", category: "プライベート", status: "todo", parentTaskId: "t1", createdAt: now, updatedAt: now },
  { id: "t1-4", title: "芝を手配", category: "プライベート", status: "todo", parentTaskId: "t1", createdAt: now, updatedAt: now },

  { id: "t2", title: "保険手続き", category: "プライベート", status: "todo", createdAt: now, updatedAt: now },
  { id: "t2-1", title: "ヒロとひかりちゃんの収入証明書類を提出", category: "プライベート", status: "waiting", parentTaskId: "t2", createdAt: now, updatedAt: now },

  { id: "t3", title: "PC / iPad購入", category: "プライベート", status: "todo", createdAt: now, updatedAt: now },
  { id: "t3-1", title: "今のiPadを売る", category: "プライベート", status: "todo", parentTaskId: "t3", createdAt: now, updatedAt: now },
  { id: "t3-2", title: "PC候補を絞る", category: "プライベート", status: "todo", parentTaskId: "t3", createdAt: now, updatedAt: now },
  { id: "t3-3", title: "iPad候補を絞る", category: "プライベート", status: "todo", parentTaskId: "t3", createdAt: now, updatedAt: now },
  { id: "t3-4", title: "予算確認", category: "プライベート", status: "todo", parentTaskId: "t3", createdAt: now, updatedAt: now },

  { id: "t4", title: "4月中旬の仙台旅行前の車準備", category: "プライベート", status: "todo", notes: "芝タスク後に着手", createdAt: now, updatedAt: now },
  { id: "t4-1", title: "キャリアー設置", category: "プライベート", status: "todo", parentTaskId: "t4", createdAt: now, updatedAt: now },
  { id: "t4-2", title: "カーテン設置", category: "プライベート", status: "todo", parentTaskId: "t4", createdAt: now, updatedAt: now }
];

export const sampleRoutines: Routine[] = [
  {
    id: "r1",
    title: "授業準備",
    category: "日本語教師",
    frequency: "daily",
    preferredTime: "06:00",
    durationMinutes: 60,
    active: true,
    notes: "通常タスクとは分けて内部管理",
    createdAt: now,
    updatedAt: now
  }
];

export const sampleTimeline: TimelineEvent[] = [
  { id: "e1", title: "朝ブリーフ確認", category: "プライベート", start: "05:30", end: "06:00" },
  { id: "e2", title: "PC候補を調べる", category: "プライベート", start: "14:00", end: "15:00" },
  { id: "e3", title: "芝作業準備（砂手配）", category: "プライベート", start: "15:30", end: "16:30" },
  { id: "e4", title: "車準備の段取り", category: "プライベート", start: "21:10", end: "21:40" }
];

export const sampleNews: NewsItem[] = [
  { id: "n1", region: "日本", title: "国内経済の動向まとめ", summary: "主要指標の動きと家計への影響を整理。", calm: false },
  { id: "n2", region: "日本", title: "教育現場のICT活用が拡大", summary: "自治体の導入事例が増え、授業支援が進行。", calm: false },
  { id: "n3", region: "日本", title: "地域の花便り", summary: "春の見頃スポット紹介で気持ちが整う話題。", calm: true },
  { id: "n4", region: "アメリカ", title: "米国テック市場トレンド", summary: "AI関連投資と規制議論の要点。", calm: false },
  { id: "n5", region: "アメリカ", title: "米国金利見通し", summary: "金融政策の注目ポイントを簡潔に。", calm: false },
  { id: "n6", region: "アメリカ", title: "国立公園の保護活動", summary: "自然保護に関する前向きなニュース。", calm: true },
  { id: "n7", region: "世界", title: "国際情勢の朝サマリー", summary: "主要地域の注目トピックを3分で確認。", calm: false },
  { id: "n8", region: "世界", title: "物流とエネルギー動向", summary: "価格変動の背景を簡潔に整理。", calm: false },
  { id: "n9", region: "世界", title: "世界の小さな発明", summary: "暮らしを楽にする心温まる話題。", calm: true }
];
