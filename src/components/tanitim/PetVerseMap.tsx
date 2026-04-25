'use client'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useEffect } from 'react'


export default function PetVerseMap({ 
  selectedId, 
  locations 
}: { 
  selectedId: number | null,
  locations: any[]
}) {
  useEffect(() => {
    // Leaflet default icon fix
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })
  }, [])

  const center: [number, number] = [39.0, 35.0]
  const zoom = 6

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', borderRadius: '16px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]}>
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
