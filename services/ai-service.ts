import OpenAI from "openai";
import type { ParsedIntent } from "@/types/domain";

const schemaPrompt = `あなたは個人秘書アプリの入力整理AIです。ユーザー入力を task または routine に分類し、JSONのみ返答してください。\n許可カテゴリ: 日本語教師, 家の芽, プライベート\nstatusは todo or waiting。`;

const fallbackParse = (text: string): ParsedIntent => {
  const waiting = text.includes("返信待ち") || text.includes("待ち");
  const routine = text.includes("ルーティーン") || text.includes("毎日");
  const category = text.includes("家") ? "家の芽" : text.includes("授業") ? "日本語教師" : "プライベート";
  return {
    kind: routine ? "routine" : "task",
    title: text.replace(/追加して|入れて|にして/g, "").trim(),
    category,
    status: waiting ? "waiting" : "todo"
  };
};

export const parseInputWithAI = async (text: string): Promise<ParsedIntent> => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return fallbackParse(text);

  const client = new OpenAI({ apiKey });
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      { role: "system", content: schemaPrompt },
      { role: "user", content: text }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "intent",
        schema: {
          type: "object",
          properties: {
            kind: { enum: ["task", "routine"] },
            title: { type: "string" },
            category: { enum: ["日本語教師", "家の芽", "プライベート"] },
            status: { enum: ["todo", "waiting"] },
            parentTaskTitle: { type: "string" },
            estimatedMinutes: { type: "number" },
            notes: { type: "string" }
          },
          required: ["kind", "title", "category"],
          additionalProperties: false
        }
      }
    }
  });

  const payload = response.output_text;
  return JSON.parse(payload) as ParsedIntent;
};
