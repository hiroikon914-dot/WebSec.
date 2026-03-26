"use client";

import { useState } from "react";
import type { NewsItem } from "@/types/domain";

const REGIONS = ["日本", "アメリカ", "世界"] as const;
type Region = (typeof REGIONS)[number];

export function NewsPanel({ items }: { items: NewsItem[] }) {
  const [active, setActive] = useState<Region>("日本");
  const filtered = items.filter((item) => item.region === active);

  return (
    <section className="panel">
      <div className="panel-header">
        <span className="panel-title">ニュース</span>
      </div>
      <div className="news-tabs">
        {REGIONS.map((region) => (
          <button
            key={region}
            className={`news-tab${active === region ? " active" : ""}`}
            onClick={() => setActive(region)}
          >
            {region}
          </button>
        ))}
      </div>
      <ul className="news-list">
        {filtered.map((item) => (
          <li key={item.id} className="news-row">
            {item.calm && <span className="calm-tag">おだやか</span>}
            <strong>{item.title}</strong>
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
