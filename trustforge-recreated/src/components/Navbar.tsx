import { Github, Sparkles } from "lucide-react";

type Props = {
  onAnalyze: () => void;
};

export default function Navbar({ onAnalyze }: Props) {
  return (
    <nav className="nav">
      <div className="brand">
        <div className="brand-mark"><Sparkles size={18} /></div>
        <span>Trust<span>Forge</span></span>
      </div>

      <div className="nav-links">
        <a href="#how">How It Works</a>
        <a href="#features">Features</a>
        <a href="https://github.com" target="_blank" rel="noreferrer">
          <Github size={14} /> GitHub
        </a>
      </div>

      <button className="nav-cta" onClick={onAnalyze}>
        Analyze Repository
      </button>
    </nav>
  );
}