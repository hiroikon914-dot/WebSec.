import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI秘書ダッシュボード",
  description: "個人用のAI秘書Webアプリ MVP"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
