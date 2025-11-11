import { GitHubRepo } from "@/interfaces/githubRepo.interface";

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export async function getRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(`https://api.github.com/user/repos`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch repositories: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }
}

export async function getRepoById(repo: string | undefined): Promise<GitHubRepo> {
  try {
    const res = await fetch(`https://api.github.com/repos/yLucino/${repo}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch repository: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching repository:", error);
    throw error;
  }
}

export async function getRepoLanguages(repo: string | undefined): Promise<Record<string, number>> {
  try {
    const res = await fetch(`https://api.github.com/repos/yLucino/${repo}/languages`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch repository languages: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching repository languages:", error);
    throw error;
  }
}