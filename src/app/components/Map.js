"use client";

import { useEffect, useRef } from 'react';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Map() {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Import Leaflet CSS dynamically
    import('leaflet/dist/leaflet.css');

    if (typeof window !== 'undefined' && !mapInstanceRef.current) {
      // Initialize the map
      mapInstanceRef.current = L.map(mapRef.current).setView([27.4716, 89.6386], 13);

      // Add the tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapInstanceRef.current);

      // Set the default icon
      L.Marker.prototype.options.icon = DefaultIcon;

      // Add a marker
      L.marker([27.4716, 89.6386])
        .addTo(mapInstanceRef.current)
        .bindPopup('Thimphu, Bhutan')
        .openPopup();
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} style={{ height: '100%', width: '100%' }} />;
} 