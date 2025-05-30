export interface IPLMatch {
  id: string
  season: number
  city: string
  date: string
  team1: string
  team2: string
  toss_winner: string
  toss_decision: 'bat' | 'field'
  result: 'normal' | 'tie' | 'no result'
  winner: string | null
  win_by_runs: number
  win_by_wickets: number
  player_of_match: string | null
  venue: string
  umpire1: string
  umpire2: string
  umpire3: string | null
}

export interface TeamStats {
  id: string
  name: string
  color: string
  home_ground: string
  coordinates: {
    lat: number
    lng: number
  }
  total_matches: number
  total_wins: number
  total_losses: number
  total_runs: number
  total_wickets: number
  win_percentage: number
} 