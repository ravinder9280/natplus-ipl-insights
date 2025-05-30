import { supabase } from '@/lib/supabase'
import { TeamStats } from '@/types'

export const teamService = {
  async getTeams(): Promise<TeamStats[]> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('name')

    if (error) {
      console.error('Error fetching teams:', error)
      throw error
    }

    return data || []
  },

  async getTeamStats(teamName: string): Promise<TeamStats | null> {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('name', teamName)
      .single()

    if (error) {
      console.error('Error fetching team stats:', error)
      throw error
    }

    return data
  },

  async getTeamMatches(teamName: string) {
    const { data, error } = await supabase
      .from('matches')
      .select('*')
      .or(`team1.eq.${teamName},team2.eq.${teamName}`)
      .order('date', { ascending: false })

    if (error) {
      console.error('Error fetching team matches:', error)
      throw error
    }

    return data || []
  }
} 