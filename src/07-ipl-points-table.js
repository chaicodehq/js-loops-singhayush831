/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  if (!Array.isArray(matches) || matches.length === 0) {
    return [];
  }

  const teams = {};

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];

    // Create team records if they don't exist
    if (!teams[match.team1]) {
      teams[match.team1] = {
        team: match.team1,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0
      };
    }

    if (!teams[match.team2]) {
      teams[match.team2] = {
        team: match.team2,
        played: 0,
        won: 0,
        lost: 0,
        tied: 0,
        noResult: 0,
        points: 0
      };
    }

    const t1 = teams[match.team1];
    const t2 = teams[match.team2];

    t1.played++;
    t2.played++;

    if (match.result === "win") {
      const winner = teams[match.winner];

      winner.won++;
      winner.points += 2;

      if (match.winner === match.team1) {
        t2.lost++;
      } else {
        t1.lost++;
      }
    }

    else if (match.result === "tie") {
      t1.tied++;
      t2.tied++;

      t1.points++;
      t2.points++;
    }

    else if (match.result === "no_result") {
      t1.noResult++;
      t2.noResult++;

      t1.points++;
      t2.points++;
    }
  }

  const table = Object.values(teams);

  table.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points; // descending points
    }

    return a.team.localeCompare(b.team); // alphabetical
  });

  return table;
}
