import { ShieldCheck, Sparkles, Activity, Code2, LockKeyhole } from "lucide-react";
import type { RepoReport } from "../types";

const icons = [ShieldCheck, Code2, Activity, LockKeyhole, Sparkles];

export default function Report({ report, onNew }: { report: RepoReport; onNew: () => void }) {
  return (
    <section className="report-page">
      <div className="report-badge"><Sparkles size={13} /> AI-Generated Report</div>
      <h1>Repository Trust Report</h1>

      <div className="score-ring">
        <div>
          <strong>{report.score}</strong>
          <small>/100</small>
        </div>
      </div>

      <div className="verdict">{report.verdict}</div>

      <div className="score-grid">
        {report.scores.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div className="score-card" key={item.label}>
              <Icon size={14} />
              <span>{item.label}</span>
              <strong>{item.value}%</strong>
            </div>
          );
        })}
      </div>

      <div className="ai-insight">
        <Sparkles size={15} />
        <div>
          <b>AI Insight</b>
          <p>{report.summary}</p>
        </div>
      </div>

      <div className="report-actions">
        <button onClick={onNew}>Analyze another repository →</button>
      </div>
    </section>
  );
}