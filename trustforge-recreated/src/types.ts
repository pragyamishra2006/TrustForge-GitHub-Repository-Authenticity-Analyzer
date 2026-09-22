export type AppState = "home" | "loading" | "report" | "not-found";

export type RepoScore = {
  label: string;
  value: number;
  icon: string;
};

export type RepoReport = {
  username: string;
  repoCount: number;
  score: number;
  verdict: string;
  summary: string;
  scores: RepoScore[];
};