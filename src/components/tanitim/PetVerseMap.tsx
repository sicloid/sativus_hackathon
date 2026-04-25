'use client'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'

// Custom hook to handle map centering and zooming
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap()
  useEffect(() => {
    map.setView(center, zoom, {
      animate: true,
      duration: 1
    })
  }, [center, zoom, map])
  return null
}

export default function PetVerseMap({ 
  selectedId, 
  locations 
}: { 
  selectedId: number | null,
  locations: any[]
}) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Leaflet default icon fix
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })
  }, [])

  if (!isMounted) return null

  // Find the selected location to determine center/zoom
  const selectedLoc = locations.find(l => l.id === selectedId)
  const mapCenter: [number, number] = selectedLoc ? [selectedLoc.lat, selectedLoc.lng] : [39.0, 35.0]
  const mapZoom = selectedLoc ? 14 : 6

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        key={locations.length + (selectedId || 0)} // Force re-render on data/selection change
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', borderRadius: '16px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Helper component to animate movement */}
        <ChangeView center={mapCenter} zoom={mapZoom} />

        {locations.map((loc) => (
          <Marker 
            key={loc.id} 
            position={[loc.lat, loc.lng]}
          >
            <Popup>
              <div className="font-black uppercase text-sm mb-1">{loc.isim}</div>
              <div className="text-xs font-bold text-gray-600 mb-1">{loc.adres}</div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                 <span className="text-[10px] font-black uppercase text-blue-600">{loc.tip}</span>
                 <span className="text-[10px] font-bold">{loc.saat}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
