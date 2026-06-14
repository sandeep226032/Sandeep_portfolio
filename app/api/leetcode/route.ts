import { NextResponse } from "next/server";

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";

const USER_PROGRESS_QUERY = `
  query userProgress($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      profile {
        ranking
        reputation
      }
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
    recentSubmissionList(username: $username, limit: 5) {
      title
      titleSlug
      timestamp
      statusDisplay
      lang
    }
  }
`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || process.env.LEETCODE_USERNAME || "SandeepNandi";

  try {
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: USER_PROGRESS_QUERY,
        variables: { username },
      }),
      next: { revalidate: 60 * 60 * 6 },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Unable to load LeetCode stats" }, { status: response.status });
    }

    const payload = await response.json();
    const user = payload?.data?.matchedUser;

    if (!user) {
      return NextResponse.json({ error: "LeetCode user not found" }, { status: 404 });
    }

    const solved = user.submitStats.acSubmissionNum.reduce(
      (acc: Record<string, number>, item: { difficulty: string; count: number }) => {
        acc[item.difficulty.toLowerCase()] = item.count;
        return acc;
      },
      {}
    );
    const totals = payload.data.allQuestionsCount.reduce(
      (acc: Record<string, number>, item: { difficulty: string; count: number }) => {
        acc[item.difficulty.toLowerCase()] = item.count;
        return acc;
      },
      {}
    );

    return NextResponse.json({
      username: user.username,
      ranking: user.profile.ranking,
      reputation: user.profile.reputation,
      solved: {
        total: solved.all || 0,
        easy: solved.easy || 0,
        medium: solved.medium || 0,
        hard: solved.hard || 0,
      },
      totals: {
        total: totals.all || 0,
        easy: totals.easy || 0,
        medium: totals.medium || 0,
        hard: totals.hard || 0,
      },
      recentSubmissions: payload.data.recentSubmissionList || [],
    });
  } catch {
    return NextResponse.json({ error: "LeetCode request failed" }, { status: 500 });
  }
}
