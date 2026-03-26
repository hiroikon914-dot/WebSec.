import type { NewsItem } from "@/types/domain";

export function NewsPanel({ items }: { items: NewsItem[] }) {
  const sections = ["日本", "アメリカ", "世界"] as const;

  return (
    <section className="panel">
      <h2>ニュース（ダミー）</h2>
      {sections.map((region) => (
        <div key={region} className="news-region">
          <h3>{region}</h3>
          <ul>
            {items
              .filter((item) => item.region === region)
              .map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong>
                  <p>{item.summary}</p>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
