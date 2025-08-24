'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then(mod => mod.Circle), { ssr: false });

// Types
interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  urgencyLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'PENDING' | 'ACCEPTED' | 'RESOLVED';
  location: string;
  photoURL?: string;
  createdAt: string;
  likes?: any[];
}

interface Filters {
  category?: string | null;
  urgencyLevel?: string | null;
  status?: string | null;
}

interface Position {
  lat: number;
  lng: number;
}

// Custom Hook for Issues Data
const useIssuesData = (city: string) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIssues = async () => {
    try {
      setLoading(true);
      // Mock data instead of API call
      const mockIssues: Issue[] = [
        {
          id: '1',
          title: 'Broken Street Light',
          description: 'Street light not working on Main Street near the park',
          category: 'electricity',
          urgencyLevel: 'HIGH',
          status: 'PENDING',
          location: '13.0827,80.2707',
          createdAt: '2024-01-15T10:00:00Z',
          likes: []
        },
        {
          id: '2',
          title: 'Garbage Pile',
          description: 'Large pile of garbage accumulating near the market',
          category: 'waste',
          urgencyLevel: 'MEDIUM',
          status: 'ACCEPTED',
          location: '13.0828,80.2708',
          createdAt: '2024-01-14T15:30:00Z',
          likes: []
        },
        {
          id: '3',
          title: 'Water Leak',
          description: 'Water leaking from underground pipe near bus stop',
          category: 'water',
          urgencyLevel: 'HIGH',
          status: 'PENDING',
          location: '13.0826,80.2706',
          createdAt: '2024-01-13T09:15:00Z',
          likes: []
        }
      ];
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIssues(mockIssues);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      fetchIssues();
    }
  }, [city]);

  return { issues, loading, error, refetch: fetchIssues };
};

// Utility Functions
const getUrgencyConfig = (urgencyLevel: string) => {
  switch (urgencyLevel) {
    case 'HIGH':
      return {
        radius: 200,
        fillColor: '#ef4444',
        strokeColor: '#dc2626',
        fillOpacity: 0.6,
        strokeOpacity: 0.8,
        strokeWeight: 2
      };
    case 'MEDIUM':
      return {
        radius: 150,
        fillColor: '#f59e0b',
        strokeColor: '#d97706',
        fillOpacity: 0.5,
        strokeOpacity: 0.7,
        strokeWeight: 2
      };
    case 'LOW':
      return {
        radius: 100,
        fillColor: '#10b981',
        strokeColor: '#059669',
        fillOpacity: 0.4,
        strokeOpacity: 0.6,
        strokeWeight: 1
      };
    default:
      return {
        radius: 125,
        fillColor: '#6b7280',
        strokeColor: '#4b5563',
        fillOpacity: 0.4,
        strokeOpacity: 0.6,
        strokeWeight: 1
      };
  }
};

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    waste: 'fas fa-trash',
    water: 'fas fa-tint',
    health: 'fas fa-heartbeat',
    roads: 'fas fa-road',
    electricity: 'fas fa-bolt',
    environment: 'fas fa-leaf',
    safety: 'fas fa-shield-alt'
  };
  return icons[category] || 'fas fa-exclamation-triangle';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'text-yellow-600 bg-yellow-100';
    case 'ACCEPTED':
      return 'text-blue-600 bg-blue-100';
    case 'RESOLVED':
      return 'text-green-600 bg-green-100';
    default:
      return 'text-gray-600 bg-gray-100';
  }
};

// Issue Bubble Component for Leaflet
const IssueBubble: React.FC<{ issue: Issue; onClick: (issue: Issue) => void }> = ({ issue, onClick }) => {
  // Parse location string to coordinates
  const parseLocation = (locationString: string): Position | null => {
    try {
      // Assuming location is stored as "lat,lng" or similar format
      const [lat, lng] = locationString.split(',').map(coord => parseFloat(coord.trim()));
      return { lat, lng };
    } catch (error) {
      console.error('Error parsing location:', error);
      return null;
    }
  };

  const position = parseLocation(issue.location);
  if (!position) return null;

  const urgencyConfig = getUrgencyConfig(issue.urgencyLevel);

  return (
    <Circle
      center={[position.lat, position.lng]}
      radius={urgencyConfig.radius}
      pathOptions={{
        fillColor: urgencyConfig.fillColor,
        fillOpacity: urgencyConfig.fillOpacity,
        color: urgencyConfig.strokeColor,
        weight: urgencyConfig.strokeWeight,
        opacity: urgencyConfig.strokeOpacity
      }}
      eventHandlers={{
        click: () => onClick(issue)
      }}
    />
  );
};

// Issue Info Window Component
const IssueInfoWindow: React.FC<{ issue: Issue; position: Position | null; onClose: () => void }> = ({ issue, position, onClose }) => {
  if (!issue || !position) return null;

  return (
    <div className="absolute bg-white rounded-lg shadow-xl p-4 max-w-sm z-50" style={{ left: position.lng, top: position.lat }}>
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-full ${
          getUrgencyConfig(issue.urgencyLevel).fillColor === '#ef4444' ? 'bg-red-100' : 
          getUrgencyConfig(issue.urgencyLevel).fillColor === '#f59e0b' ? 'bg-yellow-100' : 
          'bg-green-100'
        }`}>
          <i className={`${getCategoryIcon(issue.category)} text-lg`}></i>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-sm mb-1">{issue.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
              {issue.status}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              issue.urgencyLevel === 'HIGH' ? 'text-red-600 bg-red-100' :
              issue.urgencyLevel === 'MEDIUM' ? 'text-yellow-600 bg-yellow-100' :
              'text-green-600 bg-green-100'
            }`}>
              {issue.urgencyLevel}
            </span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{issue.description}</p>
      
      {issue.photoURL && (
        <img 
          src={issue.photoURL} 
          alt="Issue"
          className="w-full h-24 object-cover rounded-lg mb-3"
        />
      )}
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="capitalize">{issue.category}</span>
        <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
      </div>
      
      {issue.likes && (
        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
          <i className="fas fa-heart text-red-400"></i>
          <span>{issue.likes.length} likes</span>
        </div>
      )}
      
      <button 
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    </div>
  );
};

// Filters Component
const IssueFilters: React.FC<{ filters: Filters; onFiltersChange: (filters: Filters) => void }> = ({ filters, onFiltersChange }) => {
  const categories = ['waste', 'water', 'health', 'roads', 'electricity', 'environment', 'safety'];
  const urgencyLevels = ['HIGH', 'MEDIUM', 'LOW'];
  const statuses = ['PENDING', 'ACCEPTED', 'RESOLVED'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Issues</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select 
            value={filters.category || ''}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value || null })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category} className="capitalize">
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Urgency Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
          <select 
            value={filters.urgencyLevel || ''}
            onChange={(e) => onFiltersChange({ ...filters, urgencyLevel: e.target.value || null })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="">All Urgency Levels</option>
            {urgencyLevels.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select 
            value={filters.status || ''}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value || null })}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          >
            <option value="">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters */}
      {(filters.category || filters.urgencyLevel || filters.status) && (
        <button
          onClick={() => onFiltersChange({})}
          className="mt-4 text-sm text-gray-600 hover:text-gray-800 underline"
        >
          Clear all filters
        </button>
      )}
    </div>
  );
};

// Legend Component
const MapLegend = () => {
  return (
    <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg p-4 z-10">
      <h4 className="font-semibold text-gray-800 mb-3">Issue Urgency</h4>
      <div className="space-y-2">
        {[
          { level: 'HIGH', color: '#ef4444', size: '16px' },
          { level: 'MEDIUM', color: '#f59e0b', size: '12px' },
          { level: 'LOW', color: '#10b981', size: '8px' }
        ].map(({ level, color, size }) => (
          <div key={level} className="flex items-center gap-3">
            <div 
              className="rounded-full border-2"
              style={{ 
                backgroundColor: color + '60',
                borderColor: color,
                width: size,
                height: size
              }}
            ></div>
            <span className="text-sm text-gray-600">{level}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Statistics Component
const IssueStats: React.FC<{ issues: Issue[] }> = ({ issues }) => {
  const stats = {
    total: issues.length,
    high: issues.filter((i: Issue) => i.urgencyLevel === 'HIGH').length,
    medium: issues.filter((i: Issue) => i.urgencyLevel === 'MEDIUM').length,
    low: issues.filter((i: Issue) => i.urgencyLevel === 'LOW').length,
    resolved: issues.filter((i: Issue) => i.status === 'RESOLVED').length
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {[
        { label: 'Total Issues', value: stats.total, color: 'bg-blue-500' },
        { label: 'High Urgency', value: stats.high, color: 'bg-red-500' },
        { label: 'Medium Urgency', value: stats.medium, color: 'bg-yellow-500' },
        { label: 'Low Urgency', value: stats.low, color: 'bg-green-500' },
        { label: 'Resolved', value: stats.resolved, color: 'bg-purple-500' }
      ].map(({ label, value, color }) => (
        <div key={label} className="bg-white rounded-xl shadow-lg p-4 text-center">
          <div className={`w-8 h-8 ${color} rounded-full mx-auto mb-2 flex items-center justify-center`}>
            <span className="text-white font-bold text-sm">{value}</span>
          </div>
          <p className="text-xs text-gray-600 font-medium">{label}</p>
        </div>
      ))}
    </div>
  );
};

// Main Map Component with OpenStreetMap
const CityIssuesMap: React.FC<{ city: string }> = ({ city = 'Chennai' }) => {
  const { issues, loading, error } = useIssuesData(city);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [filters, setFilters] = useState<Filters>({});
  const [mapCenter] = useState({ lat: 13.0827, lng: 80.2707 }); // Chennai coordinates

  // Filter issues based on current filters
  const filteredIssues = issues.filter(issue => {
    if (filters.category && issue.category !== filters.category) return false;
    if (filters.urgencyLevel && issue.urgencyLevel !== filters.urgencyLevel) return false;
    if (filters.status && issue.status !== filters.status) return false;
    return true;
  });

  const handleBubbleClick = (issue: Issue) => {
    setSelectedIssue(issue);
  };

  const handleInfoWindowClose = () => {
    setSelectedIssue(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <i className="fas fa-exclamation-triangle text-red-500 text-2xl mb-2"></i>
        <p className="text-red-600">Error loading issues: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <IssueStats issues={filteredIssues} />
      <IssueFilters filters={filters} onFiltersChange={setFilters} />
      
      <div className="relative">
        {/* OpenStreetMap Container */}
        <div className="w-full h-96 rounded-xl overflow-hidden border-2 border-gray-200 shadow-lg">
          <MapContainer
            center={[mapCenter.lat, mapCenter.lng]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            className="rounded-xl"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Render issue bubbles */}
            {filteredIssues.map((issue) => (
              <IssueBubble
                key={issue.id}
                issue={issue}
                onClick={handleBubbleClick}
              />
            ))}

            {/* Render info window for selected issue */}
            {selectedIssue && (
              <Marker
                position={(() => {
                  try {
                    const [lat, lng] = selectedIssue.location.split(',').map(coord => parseFloat(coord.trim()));
                    return [lat, lng] as [number, number];
                  } catch {
                    return [0, 0] as [number, number];
                  }
                })()}
              >
                <Popup>
                  <div className="max-w-sm p-2">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`p-2 rounded-full ${
                        getUrgencyConfig(selectedIssue.urgencyLevel).fillColor === '#ef4444' ? 'bg-red-100' : 
                        getUrgencyConfig(selectedIssue.urgencyLevel).fillColor === '#f59e0b' ? 'bg-yellow-100' : 
                        'bg-green-100'
                      }`}>
                        <i className={`${getCategoryIcon(selectedIssue.category)} text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm mb-1">{selectedIssue.title}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIssue.status)}`}>
                            {selectedIssue.status}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            selectedIssue.urgencyLevel === 'HIGH' ? 'text-red-600 bg-red-100' :
                            selectedIssue.urgencyLevel === 'MEDIUM' ? 'text-yellow-600 bg-yellow-100' :
                            'text-green-600 bg-green-100'
                          }`}>
                            {selectedIssue.urgencyLevel}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">{selectedIssue.description}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="capitalize">{selectedIssue.category}</span>
                      <span>{new Date(selectedIssue.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>

        <MapLegend />
        
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-xl">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-2"></div>
              <p className="text-gray-600 text-sm">Loading issues...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Page Component
const HeatMap = () => {
  const [selectedCity, setSelectedCity] = useState('Chennai');

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">City Issues Heatmap</h1>
              <p className="text-gray-600">Visualizing community issues across the city with real-time data</p>
            </div>
            
            {/* City Selector */}
            <div className="flex items-center gap-3">
              <label htmlFor="city-select" className="text-sm font-medium text-gray-700">
                City:
              </label>
              <select
                id="city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-white"
              >
                <option value="Chennai">Chennai</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <CityIssuesMap city={selectedCity} />
      </div>

      <style jsx>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default HeatMap;
