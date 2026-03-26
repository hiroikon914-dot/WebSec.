import type { ScheduleItem } from "@/types/domain";
import { DAY_START_HOUR, PX_PER_HOUR, timelineTop, timelineHeight } from "@/lib/schedule";

type Props = { schedule: ScheduleItem[] };

const HOURS = Array.from({ length: 18 }, (_, i) => i + DAY_START_HOUR); // 5〜22

export function TimelineDayView({ schedule }: Props) {
  const totalHeight = HOURS.length * PX_PER_HOUR;

  return (
    <section className="panel">
      <div className="panel-header">
        <span className="panel-title">今日の予定</span>
      </div>
      <div className="timeline-container">
        <div className="timeline-inner">
          {/* 時間ラベル */}
          <div>
            {HOURS.map((h) => (
              <div key={h} className="tl-hour-label">
                {String(h).padStart(2, "0")}
              </div>
            ))}
          </div>
          {/* イベントキャンバス */}
          <div className="timeline-canvas" style={{ height: totalHeight }}>
            {HOURS.map((h) => (
              <div key={h} className="tl-slot" />
            ))}
            {schedule.map((item) => (
              <div
                key={item.id}
                className="tl-event"
                style={{
                  top: timelineTop(item.startTime),
                  height: timelineHeight(item.startTime, item.endTime)
                }}
              >
                <strong>{item.title}</strong>
                <small>{item.startTime} – {item.endTime}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
