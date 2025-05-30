'use client'

import { Card } from '@/components/ui/card'
import { useDashboardStore } from '@/store/useDashboardStore'
import { useMemo } from 'react'

export default function TeamStats() {
  const { selectedTeams } = useDashboardStore()

  // Calculate aggregate stats for selected teams
  const aggregateStats = useMemo(() => {
    if (selectedTeams.length === 0) {
      return {
        totalMatches: 0,
        totalWins: 0,
        totalRuns: 0,
        totalWickets: 0,
        avgWinPercentage: 0
      }
    }

    const stats = selectedTeams.reduce((acc, team) => ({
      totalMatches: acc.totalMatches + team.total_matches,
      totalWins: acc.totalWins + team.total_wins,
      totalRuns: acc.totalRuns + team.total_runs,
      totalWickets: acc.totalWickets + team.total_wickets,
      avgWinPercentage: acc.avgWinPercentage + team.win_percentage
    }), {
      totalMatches: 0,
      totalWins: 0,
      totalRuns: 0,
      totalWickets: 0,
      avgWinPercentage: 0
    })

    return {
      ...stats,
      avgWinPercentage: stats.avgWinPercentage / selectedTeams.length
    }
  }, [selectedTeams])

  if (selectedTeams.length === 0) {
    return (
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Team Statistics</h2>
        <div className="text-sm text-gray-500 text-center py-8">
          Select teams to view their statistics
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Team Statistics</h2>
        
        {/* Selected Teams */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Selected Teams</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTeams.map(team => (
              <span
                key={team.name}
                className="px-2 py-1 rounded-full text-sm"
                style={{ 
                  backgroundColor: `${team.color}20`,
                  color: team.color,
                  border: `1px solid ${team.color}40`
                }}
              >
                {team.name}
              </span>
            ))}
          </div>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Total Matches</div>
            <div className="text-2xl font-semibold">{aggregateStats.totalMatches}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Total Wins</div>
            <div className="text-2xl font-semibold">{aggregateStats.totalWins}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Win Rate</div>
            <div className="text-2xl font-semibold">
              {aggregateStats.avgWinPercentage.toFixed(1)}%
            </div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Total Runs</div>
            <div className="text-2xl font-semibold">{aggregateStats.totalRuns}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Total Wickets</div>
            <div className="text-2xl font-semibold">{aggregateStats.totalWickets}</div>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Teams Selected</div>
            <div className="text-2xl font-semibold">{selectedTeams.length}</div>
          </div>
        </div>

        {/* Individual Team Stats */}
        <div className="mt-6">
          <h3 className="text-sm font-medium mb-4">Individual Team Stats</h3>
          <div className="space-y-4">
            {selectedTeams.map(team => (
              <div 
                key={team.name}
                className="p-4 rounded-lg border"
                style={{ borderColor: `${team.color}40` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 
                    className="font-semibold"
                    style={{ color: team.color }}
                  >
                    {team.name}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {team.home_ground}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Matches</div>
                    <div className="font-medium">{team.total_matches}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Wins</div>
                    <div className="font-medium">{team.total_wins}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Win Rate</div>
                    <div className="font-medium">{team.win_percentage?.toFixed(1) || 0}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Runs</div>
                    <div className="font-medium">{team.total_runs}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Wickets</div>
                    <div className="font-medium">{team.total_wickets}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Losses</div>
                    <div className="font-medium">{team.total_matches - team.total_wins}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
} 