"use client";

import { useState } from "react";
import type { ParsedIntent } from "@/types/domain";

type Props = {
  onAddText: (text: string, parsed?: ParsedIntent) => void;
};

type SpeechRecognitionCtor = new () => {
  lang: string;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  start: () => void;
  stop: () => void;
};

declare global {
  interface Window {
    webkitSpeechRecognition?: SpeechRecognitionCtor;
    SpeechRecognition?: SpeechRecognitionCtor;
  }
  interface SpeechRecognitionEvent extends Event {
    results: { 0: { transcript: string } }[];
  }
}

export function VoiceCaptureInput({ onAddText }: Props) {
  const [draft, setDraft] = useState("");
  const [listening, setListening] = useState(false);
  const [parsed, setParsed] = useState<ParsedIntent | null>(null);
  const [loading, setLoading] = useState(false);

  const startSpeech = () => {
    const Recognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!Recognition) {
      alert("このブラウザでは音声入力が使えません。");
      return;
    }
    const rec = new Recognition();
    rec.lang = "ja-JP";
    rec.interimResults = false;
    rec.onresult = (event) => {
      setDraft(event.results[0][0].transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.start();
    setListening(true);
  };

  const parseByAI = async () => {
    if (!draft.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/parse-input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: draft })
      });
      if (res.ok) {
        const data = (await res.json()) as ParsedIntent;
        setParsed(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    if (!draft.trim()) return;
    onAddText(draft, parsed ?? undefined);
    setDraft("");
    setParsed(null);
  };

  return (
    <div className="voice-bar">
      <button
        className={`voice-mic-btn${listening ? " listening" : ""}`}
        onClick={startSpeech}
        title={listening ? "録音中..." : "音声入力"}
      >
        🎤
      </button>
      <div className="voice-body">
        <textarea
          className="voice-textarea"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="例：保険の手続き、返信待ちにして"
          rows={1}
        />
        {parsed && (
          <pre className="parsed-preview">{JSON.stringify(parsed, null, 2)}</pre>
        )}
        <div className="voice-footer">
          <button className="btn" onClick={parseByAI} disabled={loading || !draft.trim()}>
            {loading ? "解析中..." : "AIで整理"}
          </button>
          <button className="btn btn-primary" onClick={handleAdd} disabled={!draft.trim()}>
            追加
          </button>
        </div>
      </div>
    </div>
  );
}
