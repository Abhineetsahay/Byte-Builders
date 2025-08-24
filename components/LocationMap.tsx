"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Loader2, Crosshair, Globe } from "lucide-react"

interface Location {
  latitude: number
  longitude: number
  accuracy: number
}
export function LocationMap() {
  const [location, setLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [mapUrl, setMapUrl] = useState<string>("")
  const mapRef = useRef<HTMLDivElement>(null)

  const getCurrentLocation = () => {
    setLoading(true)
    setError("")

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser")
      setLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        }
        setLocation(newLocation)
        updateMap(newLocation)
        setLoading(false)
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Location access denied by user")
            break
          case error.POSITION_UNAVAILABLE:
            setError("Location information unavailable")
            break
          case error.TIMEOUT:
            setError("Location request timed out")
            break
          default:
            setError("Unknown error occurred")
        }
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

  const updateMap = (loc: Location) => {
    // Using OpenStreetMap with Leaflet-style coordinates
    const zoom = 15
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${loc.longitude - 0.01},${loc.latitude - 0.01},${loc.longitude + 0.01},${loc.latitude + 0.01}&layer=mapnik&marker=${loc.latitude},${loc.longitude}`
    setMapUrl(mapUrl)
  }

  const openInNewTab = () => {
    if (location) {
      const url = `https://www.openstreetmap.org/?mlat=${location.latitude}&mlon=${location.longitude}&zoom=15`
      window.open(url, '_blank')
    }
  }

  const copyCoordinates = () => {
    if (location) {
      const coords = `${location.latitude}, ${location.longitude}`
      navigator.clipboard.writeText(coords)
      // add a toast notification here if time permits
    }
  }
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Globe className="w-6 h-6 text-blue-500" />
            Location & Map
          </CardTitle>
          <p className="text-muted-foreground">
            Current location of the issue site  and view it on an interactive map
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Location Controls */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={getCurrentLocation}
              disabled={loading}
              className="flex items-center gap-2 hover:bg-slate-300"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Crosshair className="w-4 h-4" />
              )}
              {loading ? "Getting Location..." : "Get Current Location"}
            </Button>

            {location && (
              <>
                <Button 
                  onClick={openInNewTab}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  Open in Maps
                </Button>
                <Button 
                  onClick={copyCoordinates}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Copy Coordinates
                </Button>
              </>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Location Details */}
          {location && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location Info */}
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location Found!
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-green-700">Latitude:</span>
                      <span className="text-sm text-green-600 font-mono">
                        {location.latitude.toFixed(6)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-green-700">Longitude:</span>
                      <span className="text-sm text-green-600 font-mono">
                        {location.longitude.toFixed(6)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-green-700">Accuracy:</span>
                      <span className="text-sm text-green-600">
                        ±{Math.round(location.accuracy)} meters
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Location Details</h4>
                  <p className="text-sm text-blue-700">
                    Your location has been captured with high accuracy GPS coordinates.
                    Your issue with be addressed by the nearest NGO , thanks for your contribution.
                  </p>
                </div>
              </div>

              {/* Map Display */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-800">Interactive Map</h3>
                <div className="relative">
                  <div 
                    ref={mapRef}
                    className="w-full h-80 bg-gray-100 rounded-lg border overflow-hidden"
                  >
                    {mapUrl ? (
                      <iframe
                        src={mapUrl}
                        width="100%"
                        height="100%"
                        title="Location Map"
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg font-medium">Map Preview</p>
                          <p className="text-sm">Click "Get Current Location" to view your location on the map</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Map Overlay for Location Pin */}
                  {location && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <div className="w-7 h-7 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                      <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  Map powered by OpenStreetMap • Click "Open in Maps" for full-screen view
                </p>
              </div>
            </div>
          )}

          {/* Initial State */}
          {!location && !loading && !error && (
            <div className="text-center py-12">
              <Navigation className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Ready to Get Your Location</h3>
              <p className="text-gray-500">
                Click the button above to get your current GPS coordinates and view them on an interactive map.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
