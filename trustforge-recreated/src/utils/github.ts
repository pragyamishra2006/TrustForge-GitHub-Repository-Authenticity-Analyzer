export function extractGitHubTarget(value: string) {
  const raw = value.trim().replace(/\/+$/, "");

  if (!raw) return null;

  const urlMatch = raw.match(
    /^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/]+)(?:\/([^/]+))?/i
  );

  if (urlMatch) {
    return {
      username: urlMatch[1],
      repo: urlMatch[2] || null,
    };
  }

  if (/^[A-Za-z0-9-]+$/.test(raw)) {
    return { username: raw, repo: null };
  }

  return null;
}

export async function checkGitHubUser(username: string) {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}`
  );

  if (response.status === 404) return false;

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }

  return true;
}

export async function getPublicRepoCount(username: string) {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}?per_page=1`
  );

  if (!response.ok) return 0;

  const data = await response.json();
  return Number(data.public_repos || 0);
}