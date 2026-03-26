"use client";

import { useState } from "react";
import type { ParsedIntent } from "@/types/domain";

type Props = {
  onAddText: (text: string, parsed?: ParsedIntent) => void;
};

type SpeechRecognitionCtor = new () => {
  lang: string;
  interimResults: boolean;
  onresult: ((event: { results: Array<Array<{ transcript: string }>> }) => void) | null;
  onerror: ((event: Event) => void) | null;
  start: () => void;
};

declare global {
  interface Window {
    webkitSpeechRecognition?: SpeechRecognitionCtor;
    SpeechRecognition?: SpeechRecognitionCtor;
  }
}

export function VoiceCaptureInput({ onAddText }: Props) {
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [parsed, setParsed] = useState<ParsedIntent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startSpeech = () => {
    setError(null);
    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) {
      setError("このブラウザでは音声入力が使えません。");
      return;
    }

    const recognizer = new Recognition();
    recognizer.lang = "ja-JP";
    recognizer.interimResults = false;
    recognizer.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setDraft(transcript);
      setListening(false);
    };
    recognizer.onerror = () => {
      setError("音声入力でエラーが発生しました。もう一度試してください。");
      setListening(false);
    };
    recognizer.start();
    setListening(true);
  };

  const parseByAI = async () => {
    if (!draft.trim()) return;
    setError(null);
    const res = await fetch("/api/ai/parse-input", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: draft })
    });

    if (!res.ok) {
      setError("AI整理に失敗しました。テキスト追加は可能です。");
      return;
    }

    const data = (await res.json()) as ParsedIntent;
    setParsed(data);
  };

  return (
    <section className="panel">
      <h2>入力（音声メイン）</h2>
      <div className="voice-input">
        <button onClick={startSpeech}>{listening ? "録音中..." : "🎤 音声入力"}</button>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="例: 保険の手続き、返信待ちにして"
        />
        <div className="voice-actions">
          <button onClick={parseByAI}>AIで整理案を作成</button>
          <button onClick={() => onAddText(draft, parsed ?? undefined)}>追加</button>
        </div>
        {error && <p className="error-text">{error}</p>}
        {parsed && <pre className="parsed-preview">{JSON.stringify(parsed, null, 2)}</pre>}
      </div>
    </section>
  );
}
