'use client';

import { useState, useCallback } from 'react';

interface MapProps {
  tools: Array<{
    id: string;
    title: string;
    images: string[];
    pricePerDay: string;
    latitude: string;
    longitude: string;
    owner?: {
      name: string;
      rating: number;
    };
  }>;
  onBoundsChange?: (bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  }) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

export function MapView({ tools, onBoundsChange, center, zoom }: MapProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const defaultCenter = center || { lat: 40.7128, lng: -74.006 };
  const defaultZoom = zoom || 12;

  return (
    <div className="relative w-full h-full min-h-[400px] bg-[#f0ede8] rounded-lg overflow-hidden">
      {/* Map placeholder - in production, integrate Google Maps or Mapbox */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-8">
          <svg className="w-16 h-16 text-[#6b6b6b] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0121 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="text-[#6b6b6b] mb-4">
            Map integration requires Google Maps API key
          </p>
          <p className="text-sm text-[#9ca3af]">
            {tools.length} tools in this area
          </p>
        </div>
      </div>

      {/* Tool markers - would be actual map markers in production */}
      {tools.map((tool) => (
        tool.latitude && tool.longitude && (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${((parseFloat(tool.longitude) + 74.5) / 1) * 100}%`,
              top: `${((41 - parseFloat(tool.latitude)) / 1) * 100}%`,
            }}
          >
            <div className="bg-[#e85d04] text-white px-2 py-1 rounded-full text-sm font-medium shadow-lg hover:bg-[#d14f00] transition-colors">
              ${tool.pricePerDay}
            </div>
          </button>
        )
      ))}

      {/* Selected tool popup */}
      {selectedTool && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-xl p-4">
          {(() => {
            const tool = tools.find(t => t.id === selectedTool);
            if (!tool) return null;
            return (
              <div className="flex gap-4">
                <img
                  src={tool.images[0]}
                  alt={tool.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{tool.title}</h3>
                  <p className="text-[#e85d04] price">${tool.pricePerDay}/day</p>
                  {tool.owner && (
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm text-[#6b6b6b]">{tool.owner.name}</span>
                      <span className="text-[#ffbe0b]">★ {tool.owner.rating}</span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSelectedTool(null)}
                  className="text-[#6b6b6b] hover:text-[#222]"
                >
                  ×
                </button>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

interface MapFiltersProps {
  radius: number;
  onRadiusChange: (radius: number) => void;
}

export function MapFilters({ radius, onRadiusChange }: MapFiltersProps) {
  return (
    <div className="flex items-center gap-4">
      <label className="text-sm text-[#6b6b6b]">Radius:</label>
      <select
        value={radius}
        onChange={(e) => onRadiusChange(parseInt(e.target.value))}
        className="px-3 py-1 border-2 border-[#d4d0c8] rounded-md focus:outline-none focus:border-[#e85d04]"
      >
        <option value={5}>5 miles</option>
        <option value={10}>10 miles</option>
        <option value={25}>25 miles</option>
        <option value={50}>50 miles</option>
      </select>
    </div>
  );
}
