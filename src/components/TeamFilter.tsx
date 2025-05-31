'use client'

import { Card } from '@/components/ui/card'
import { useTeams } from '@/hooks/useTeams'
import { useDashboardStore } from '@/store/useDashboardStore'
import { Loading } from '@/components/ui/loading'
import { Skeleton } from './ui/skeleton'

export default function TeamFilter() {
  const { teams, loading, error } = useTeams()
  const { selectedTeams, toggleTeam } = useDashboardStore()

  if (loading) {
    return (
      <Card className=" w-full max-h-[442px] space-y-6 p-4">
        <Skeleton className='w-full h-4' />
        <Skeleton className='w-full h-4' />
        <Skeleton className='w-full h-4' />
        <Skeleton className='w-full h-4' />
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-4">
        <div className="text-red-500">Error loading teams</div>
      </Card>
    )
  }

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Select Teams</h2>
      <div className="space-y-2">
        {teams.map(team => (
          <label
            key={team.name}
            className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedTeams.some(t => t.name === team.name)}
              onChange={() => toggleTeam(team)}
              className="rounded border-gray-300"
            />
            <span
              className="text-sm"
              style={{ color: team.color }}
            >
              {team.name}
            </span>
          </label>
        ))}
      </div>
    </Card>
  )
} 