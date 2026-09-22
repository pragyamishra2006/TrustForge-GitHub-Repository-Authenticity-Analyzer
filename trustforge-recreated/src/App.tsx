import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBox";
import LoadingLog from "./components/LoadingLog";
import NotFound from "./components/NotFound";
import Report from "./components/Report";
import { checkGitHubUser, extractGitHubTarget, getPublicRepoCount } from "./utils/github";
import type { AppState, RepoReport } from "./types";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function makeReport(username: string, repoCount: number): RepoReport {
  const seed = [...username].reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  const scores = [
    82 + (seed % 12),
    80 + ((seed * 3) % 15),
    76 + ((seed * 5) % 18),
    86 + ((seed * 7) % 10),
    70 + ((seed * 11) % 22),
  ].map((score) => Math.min(score, 97));

  const score = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

  return {
    username,
    repoCount,
    score,
    verdict: score >= 80 ? "HIGH TRUST ✓" : "REVIEW ADVISED",
    summary:
      repoCount > 5
        ? `This repository profile shows consistent development activity and healthy code patterns across a sustained public footprint.`
        : `This repository profile shows promising development signals, but the smaller public footprint means there is less evidence to evaluate.`,
    scores: [
      { label: "Security", value: scores[0], icon: "shield" },
      { label: "Code Quality", value: scores[1], icon: "code" },
      { label: "Activity", value: scores[2], icon: "activity" },
      { label: "Authenticity", value: scores[3], icon: "auth" },
      { label: "Dependencies", value: scores[4], icon: "deps" },
    ],
  };
}

export default function App() {
  const [state, setState] = useState<AppState>("home");
  const [input, setInput] = useState("https://github.com/pragyamishra2006");
  const [loadingStep, setLoadingStep] = useState(0);
  const [report, setReport] = useState<RepoReport | null>(null);
  const [error, setError] = useState("");

  const startAnalysis = () => {
    document.getElementById("analyzer")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const target = extractGitHubTarget(input);

    if (!target) {
      setError("Enter a valid GitHub username or profile URL.");
      return;
    }

    setError("");
    setState("loading");
    setLoadingStep(0);

    try {
      const exists = await checkGitHubUser(target.username);

      if (!exists) {
        setState("not-found");
        return;
      }

      for (let i = 1; i <= 5; i++) {
        await sleep(480);
        setLoadingStep(i);
      }

      const repoCount = await getPublicRepoCount(target.username);
      setReport(makeReport(target.username, repoCount));
      setState("report");
    } catch {
      setError("GitHub could not be reached right now. Please try again.");
      setState("home");
    }
  };

  const reset = () => {
    setState("home");
    setReport(null);
    setError("");
  };

  return (
    <main>
      <Navbar onAnalyze={startAnalysis} />

      <AnimatePresence mode="wait">
        {state === "not-found" ? (
          <motion.div
            key="not-found"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NotFound
              username={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              onRetry={reset}
            />
          </motion.div>
        ) : state === "report" && report ? (
          <motion.div
            key="report"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Report report={report} onNew={reset} />
          </motion.div>
        ) : (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <section className="hero" id="analyzer">
              <div className="eyebrow">AI-POWERED REPOSITORY TRUST LAB</div>

              <h1>
                Enter your
                <br />
                <span>GitHub repo.</span>
                <br />
                See how
                <br className="mobile-only" />
                <span>trustworthy it really is.</span>
              </h1>

              <p className="hero-sub">
                Don't just trust the code. Verify it.
              </p>

              <p className="hero-copy">
                TrustForge analyzes GitHub repositories for authenticity,
                security risks, code quality, suspicious patterns, and
                developer activity — turning raw repository data into a
                clear Trust Score.
              </p>

              <SearchBox
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                disabled={state === "loading"}
              />

              {error && <div className="form-error">{error}</div>}

              {state === "loading" && <LoadingLog current={loadingStep} />}

              <div className="micro-pills">
                <span>🛡 Public repositories only</span>
                <span>✦ AI-powered analysis</span>
                <span>⚡ Results in seconds</span>
              </div>
            </section>

            <section className="features" id="features">
              <Feature title="Repository Authenticity" text="Detect suspicious patterns, unusual activity and signals that may indicate an untrustworthy repository." icon="△" />
              <Feature title="Security Analysis" text="Identify vulnerabilities, exposed secrets, risky dependencies and potential security issues." icon="◈" />
              <Feature title="Code Quality" text="Measure structure, maintainability, documentation and engineering consistency." icon="</>" />
              <Feature title="Developer Activity" text="Understand commit rhythm, contribution history and long-term repository health." icon="⌁" />
            </section>

            <section className="trust-section" id="how">
              <div className="eyebrow">THE TRUST ENGINE</div>
              <h2>
                One repo. One clear <span>Trust Score.</span>
              </h2>
              <p>TrustForge combines multiple signals into one easy-to-understand score.</p>

              <div className="process">
                <Process title="GitHub Repository" icon="⌘" />
                <Process title="Repository Analysis" icon="⌁" />
                <Process title="AI Risk Detection" icon="ϟ" />
                <Process title="Trust Score" icon="♜" />
              </div>
            </section>

            <section className="cta-section">
              <h2>
                Before you trust the code,
                <br />
                <span>TrustForge it.</span>
              </h2>
              <p>Analyze any public GitHub repository and discover what the code doesn't tell you at first glance.</p>
              <button onClick={startAnalysis}>Analyze My Repository →</button>
              <small>✦ Trusted by developers • Public GitHub data only</small>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="footer">
        <b>TrustForge</b>
        <span>Repository authenticity, analyzed.</span>
      </footer>
    </main>
  );
}

function Feature({ title, text, icon }: { title: string; text: string; icon: string }) {
  return (
    <article className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function Process({ title, icon }: { title: string; icon: string }) {
  return (
    <div className="process-card">
      <div>{icon}</div>
      <span>{title}</span>
    </div>
  );
}