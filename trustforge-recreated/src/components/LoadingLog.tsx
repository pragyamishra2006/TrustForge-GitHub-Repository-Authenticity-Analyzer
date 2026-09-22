import { CheckCircle2, LoaderCircle } from "lucide-react";

const steps = [
  "Resolving GitHub identity",
  "Inspecting repository activity",
  "Reading code quality signals",
  "Checking dependency patterns",
  "Calculating trust score",
];

export default function LoadingLog({ current }: { current: number }) {
  return (
    <div className="loading-log">
      <div className="loading-title">
        <LoaderCircle className="spin" size={17} />
        Running authenticity assay
      </div>
      {steps.map((step, index) => (
        <div className={`log-row ${index < current ? "done" : ""}`} key={step}>
          {index < current ? <CheckCircle2 size={15} /> : <span className="dot" />}
          <span>{step}</span>
        </div>
      ))}
    </div>
  );
}