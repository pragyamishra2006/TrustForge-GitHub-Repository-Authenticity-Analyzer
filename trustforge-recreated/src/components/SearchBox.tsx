import { ArrowRight, Github } from "lucide-react";
import type { FormEvent } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  disabled?: boolean;
};

export default function SearchBox({ value, onChange, onSubmit, disabled }: Props) {
  return (
    <form className="search-wrap" onSubmit={onSubmit}>
      <Github size={18} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://github.com/username"
        aria-label="GitHub repository or profile"
      />
      <button type="submit" disabled={disabled}>
        {disabled ? "Analyzing..." : <>Analyze <ArrowRight size={15} /></>}
      </button>
    </form>
  );
}