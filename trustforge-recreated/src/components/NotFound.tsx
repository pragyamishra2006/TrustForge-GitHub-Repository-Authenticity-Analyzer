import { FormEvent } from "react";
import { RotateCcw, Search } from "lucide-react";

const suggestions = [
  "@torvalds",
  "@sindresorhus",
  "@addyosmani",
  "@gaearon",
  "@jashkenas",
  "@yyx990803",
  "@rauchg",
  "@tj",
];

type Props = {
  username: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
  onRetry: () => void;
};

export default function NotFound({
  username,
  onChange,
  onSubmit,
  onRetry,
}: Props) {
  return (
    <section className="not-found-page">
      <form className="nf-search" onSubmit={onSubmit}>
        <div className="nf-input">
          <Search size={25} />
          <input value={username} onChange={(e) => onChange(e.target.value)} />
        </div>
        <button type="submit">Read my vibes <span>→</span></button>
      </form>

      <div className="suggestions">
        <span>OR TRY:</span>
        {suggestions.map((user) => (
          <button
            type="button"
            key={user}
            onClick={() => onChange(user.slice(1))}
          >
            {user}
          </button>
        ))}
      </div>

      <div className="not-found-card">
        <div className="detective">🕵️</div>
        <h2>That user doesn’t exist</h2>
        <p>
          GitHub searched high and low. Nobody by that name was found —
          <br className="desktop-only" />
          double-check the spelling, or it might be a private profile.
        </p>
        <button className="retry" onClick={onRetry}>
          <RotateCcw size={17} /> Try again
        </button>
      </div>
    </section>
  );
}