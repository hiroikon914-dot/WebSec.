import type { TimelineEvent } from "@/types/domain";
import { isEventValidForToday, timelineHeight, timelineTop } from "@/lib/scheduling";

type Props = { events: TimelineEvent[] };

const hourLabels = Array.from({ length: 19 }, (_, i) => `${String(i + 5).padStart(2, "0")}:00`);

export function TimelineDayView({ events }: Props) {
  const visible = events.filter(isEventValidForToday);

  return (
    <section className="panel">
      <h2>今日の予定（縦タイムライン）</h2>
      <div className="timeline">
        <div className="timeline-scale">
          {hourLabels.map((label) => (
            <div key={label} className="hour-row">
              <span>{label}</span>
            </div>
          ))}
        </div>
        <div className="timeline-canvas">
          {hourLabels.map((label) => (
            <div key={`${label}-grid`} className="grid-row" />
          ))}
          {visible.map((event) => (
            <article
              key={event.id}
              className="event-block"
              style={{ top: `${timelineTop(event.start)}px`, height: `${timelineHeight(event.start, event.end)}px` }}
            >
              <strong>{event.title}</strong>
              <small>
                {event.start} - {event.end}
              </small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
