'use client'

import { Card } from '@/components/ui/card'
import { useDashboardStore } from '@/store/useDashboardStore'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

const TeamComparison = () => {
  const { selectedTeams } = useDashboardStore()

  if (selectedTeams.length === 0) {
    return (
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Team Comparison</h2>
        <div className="text-sm text-gray-500 text-center py-8">
          Select teams to compare their statistics
        </div>
      </Card>
    )
  }

  const winLossData = selectedTeams.map(team => ({
    name: team.name,
    wins: team.total_wins,
    losses: team.total_losses
  }))

  const runsWicketsData = selectedTeams.map(team => ({
    name: team.name,
    runs: team.total_runs,
    wickets: team.total_wickets
  }))

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Win/Loss Comparison</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={winLossData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="wins" name="Wins" fill="#22c55e" />
              <Bar dataKey="losses" name="Losses" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Runs & Wickets</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={runsWicketsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="runs" name="Total Runs" fill="#3b82f6" />
              <Bar dataKey="wickets" name="Total Wickets" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

export default TeamComparison
