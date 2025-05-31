'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useTeams } from '@/hooks/useTeams'
import { useDashboardStore } from '@/store/useDashboardStore'
import { Loading } from '@/components/ui/loading'
import { Skeleton } from './ui/skeleton'
import { Card } from './ui/card'

export default function Map() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<maplibregl.Map | null>(null)
  const markers = useRef<{ marker: maplibregl.Marker; teamName: string }[]>([])
  const { teams, loading, error } = useTeams()
  const { selectedTeams } = useDashboardStore()

  useEffect(() => {
    if (!mapContainer.current) return // container not ready
    if (map.current) return // map already initialized

    // Initialize map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json', // Free tile server
      center: [78.9629, 20.5937], // Center of India
      zoom: 4
    })

    // Add navigation controls
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right')

    // Add markers when map loads
    map.current.on('load', () => {
      teams.forEach(team => {
        const marker = new maplibregl.Marker({
          color: team.color
        })
          .setLngLat([team.coordinates.lng, team.coordinates.lat])
          .setPopup(new maplibregl.Popup().setHTML(`
            <div class="p-2">
              <h3 class="font-bold" style="color: ${team.color}">${team.name}</h3>
              <p class="text-sm">${team.home_ground}</p>
              <div class="mt-2 text-sm">
                <p>Matches: ${team.total_matches}</p>
                <p>Wins: ${team.total_wins}</p>
                <p>Win Rate: ${team.win_percentage?.toFixed(1) || 0}%</p>
              </div>
            </div>
          `))
          .addTo(map.current!)
        
        markers.current.push({ marker, teamName: team.name })
      })
    })

    // Cleanup on unmount
    return () => {
      markers.current.forEach(({ marker }) => marker.remove())
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [teams]) // Add teams as dependency

  // Update marker visibility based on selection
  useEffect(() => {
    markers.current.forEach(({ marker, teamName }) => {
      const isSelected = selectedTeams.some(t => t.name === teamName)
      
      // Show/hide marker based on selection
      if (isSelected) {
        marker.getElement().style.display = 'block'
        marker.getElement().style.opacity = '1'
      } else {
        marker.getElement().style.opacity = '0.5'
      }
    })
  }, [selectedTeams])

  if (loading) {
    return <Card className='w-full h-[300px] md:h-[600px] p-4 ' >
        <Skeleton className='w-full h-full' />
        





    </Card>
  }

  if (error) {
    return <div className="text-red-500">Error loading map data</div>
  }

  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  )
} 