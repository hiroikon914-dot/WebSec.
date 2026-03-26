# AI秘書ダッシュボード MVP

個人用の「AI秘書Webアプリ」MVPです。Next.js + TypeScript + App Routerで構成し、
音声入力→AI整理→タスク化の土台と、朝ブリーフ用ダッシュボードUIを実装しています。

## セットアップ

```bash
npm install
cp .env.example .env.local
npm run dev
```

http://localhost:3000 を開いてください。

## MVPでできること

- 固定3カテゴリ（日本語教師 / 家の芽 / プライベート）のタスク管理
- `todo` / `waiting` / `done` の状態管理
- 親子タスクの表示
- waiting 分離表示
- 縦タイムライン表示（10分単位ロジック）
- 音声入力（Web Speech API） + テキスト確認 + 追加
- AIパース API (`/api/ai/parse-input`) の土台
- routineデータの内部管理

## 今後の拡張

- Supabase 永続化
- Google Calendar / Notion 連携
- 朝5時自動ブリーフ生成
- 実ニュース取得 + 要約
