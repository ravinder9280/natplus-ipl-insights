import { create } from 'zustand'
import { TeamStats } from '@/types'

interface DashboardState {
  selectedTeams: TeamStats[]
  filters: {
    searchQuery: string
    sortBy: 'name' | 'matches' | 'wins' | 'winPercentage'
    sortOrder: 'asc' | 'desc'
  }
  setSelectedTeams: (teams: TeamStats[]) => void
  toggleTeam: (team: TeamStats) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sortBy: DashboardState['filters']['sortBy']) => void
  setSortOrder: (order: DashboardState['filters']['sortOrder']) => void
  clearFilters: () => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedTeams: [],
  filters: {
    searchQuery: '',
    sortBy: 'name',
    sortOrder: 'asc'
  },
  
  setSelectedTeams: (teams) => set({ selectedTeams: teams }),
  
  toggleTeam: (team) => set((state) => {
    const isSelected = state.selectedTeams.some(t => t.name === team.name)
    if (isSelected) {
      return {
        selectedTeams: state.selectedTeams.filter(t => t.name !== team.name)
      }
    } else {
      return {
        selectedTeams: [...state.selectedTeams, team]
      }
    }
  }),
  
  setSearchQuery: (query) => set((state) => ({
    filters: { ...state.filters, searchQuery: query }
  })),
  
  setSortBy: (sortBy) => set((state) => ({
    filters: { ...state.filters, sortBy }
  })),
  
  setSortOrder: (sortOrder) => set((state) => ({
    filters: { ...state.filters, sortOrder }
  })),
  
  clearFilters: () => set({
    filters: {
      searchQuery: '',
      sortBy: 'name',
      sortOrder: 'asc'
    }
  })
})) 