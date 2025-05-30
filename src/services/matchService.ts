// import { IPLMatch, TeamStats } from '@/types'
// import { teams } from '@/constants/teams'

// export async function fetchMatches(): Promise<IPLMatch[]> {
//   try {
//     const response = await fetch('/ipl-matches-sheet.csv')
//     const csvText = await response.text()
//     return parseCSV(csvText)
//   } catch (error) {
//     console.error('Error fetching matches:', error)
//     return []
//   }
// }

// function parseCSV(csvText: string): IPLMatch[] {
//   const lines = csvText.split('\n')
//   const headers = lines[0].split(',')
  
//   return lines.slice(1).map(line => {
//     const values = line.split(',')
//     const match: any = {}
    
//     headers.forEach((header, index) => {
//       const value = values[index]?.trim()
//       match[header] = value === 'NA' ? null : value
//     })
    
//     return {
//       id: match.id,
//       season: parseInt(match.season),
//       city: match.city,
//       date: match.date,
//       team1: match.team1,
//       team2: match.team2,
//       toss_winner: match.toss_winner,
//       toss_decision: match.toss_decision,
//       result: match.result,
//       winner: match.winner,
//       win_by_runs: parseInt(match.win_by_runs) || 0,
//       win_by_wickets: parseInt(match.win_by_wickets) || 0,
//       player_of_match: match.player_of_match,
//       venue: match.venue,
//       umpire1: match.umpire1,
//       umpire2: match.umpire2,
//       umpire3: match.umpire3
//     } as IPLMatch
//   })
// }

// export function calculateTeamStats(matches: IPLMatch[]): TeamStats[] {
//   const teamStats = new Map<string, TeamStats>()
  
//   // Initialize team stats
//   teams.forEach(team => {
//     teamStats.set(team.name, { ...team })
//   })
  
//   // Process matches
//   matches.forEach(match => {
//     // Update team1 stats
//     const team1Stats = teamStats.get(match.team1)!
//     team1Stats.matches++
//     if (match.winner === match.team1) {
//       team1Stats.wins++
//     } else if (match.winner) {
//       team1Stats.losses++
//     }
    
//     // Update team2 stats
//     const team2Stats = teamStats.get(match.team2)!
//     team2Stats.matches++
//     if (match.winner === match.team2) {
//       team2Stats.wins++
//     } else if (match.winner) {
//       team2Stats.losses++
//     }
//   })
  
//   // Calculate win percentages
//   teamStats.forEach(stats => {
//     stats.winPercentage = stats.matches > 0 
//       ? (stats.wins / stats.matches) * 100 
//       : 0
//   })
  
//   return Array.from(teamStats.values())
// } 