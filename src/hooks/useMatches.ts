import { useState, useEffect } from 'react'
import { IPLMatch, TeamStats } from '@/types'
import { fetchMatches, calculateTeamStats } from '@/services/matchService'

export function useMatches() {
  const [matches, setMatches] = useState<IPLMatch[]>([])
  const [teamStats, setTeamStats] = useState<TeamStats[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadMatches() {
      try {
        setLoading(true)
        const matchData = await fetchMatches()
        setMatches(matchData)
        setTeamStats(calculateTeamStats(matchData))
        setError(null)
      } catch (err) {
        setError('Failed to load match data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadMatches()
  }, [])

  return {
    matches,
    teamStats,
    loading,
    error
  }
} 