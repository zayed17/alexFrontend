"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Loader2,
  Navigation,
  Home,
  ZoomIn,
  ZoomOut,
  Map,
  Share2,
} from "lucide-react";
import { toast } from "react-toastify";


export default function MapViewer({
  initialCenter ,
  zoom = 14,
  markers = [],
  interactive = true,
  mapStyle = "default",
  className = "",
}: any) {

  const [loading, setLoading] = useState(false);
  const [currentCenter, setCurrentCenter] = useState(initialCenter);
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [activeMapStyle, setActiveMapStyle] = useState(mapStyle);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  // Define map tile layers
  const mapTileLayers = {
    default: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution:
        "&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    },
    dark: {
      url: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>',
    },
    light: {
      url: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a>',
    },
  };

  // Generate a custom HTML page with embedded map
  const getCustomMapHtml = (
    center = currentCenter,
    zoomLevel = currentZoom,
    style = activeMapStyle,
  ) => {
    // Create markers string if any
    const markersString =
      markers.length > 0
        ? markers
            .map((m:any) => {
              const markerOptions = m.color
                ? `{icon: L.divIcon({className: 'custom-marker', html: '<div style="background-color: ${m.color}; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>'})}`
                : "";
              return `L.marker([${m.lat}, ${m.lng}]${markerOptions ? ", " + markerOptions : ""})${m.title ? `.bindPopup("${m.title}")` : ""}.addTo(map);`;
            })
            .join("\n")
        : "";

    const selectedTileLayer =
      mapTileLayers[style as keyof typeof mapTileLayers] ||
      mapTileLayers.default;

    // Create a custom HTML page with Leaflet map
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"></script>
        <style>
          html, body, #map {
            height: 100%;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          .leaflet-control-attribution {
            font-size: 10px;
            background: rgba(255, 255, 255, 0.7);
            padding: 2px 5px;
            border-radius: 3px;
          }
          .custom-marker {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .map-pulse {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 16px;
            height: 16px;
            background-color: rgba(66, 133, 244, 0.8);
            border-radius: 50%;
            z-index: 999;
          }
          .map-pulse:before {
            content: '';
            position: absolute;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(66, 133, 244, 0.3);
            animation: pulse 2s infinite;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          @keyframes pulse {
            0% {
              transform: translate(-50%, -50%) scale(0.5);
              opacity: 1;
            }
            100% {
              transform: translate(-50%, -50%) scale(1.5);
              opacity: 0;
            }
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          // Initialize map
          const map = L.map('map', {
            center: [${center?.lat}, ${center?.lng}],
            zoom: ${zoomLevel},
            scrollWheelZoom: false,
            doubleClickZoom: ${interactive},
            touchZoom: ${interactive},
            boxZoom: ${interactive},
            keyboard: ${interactive},
            zoomControl: false,
            dragging: ${interactive},
            tap: ${interactive},
            fadeAnimation: true,
            zoomAnimation: true
          });
          
          // Add tile layer
          const tileLayer = L.tileLayer('${selectedTileLayer.url}', {
            attribution: '${selectedTileLayer.attribution}',
            maxZoom: 19
          }).addTo(map);
          
          // Add markers if any
          ${markersString}
          
          // Listen for commands from parent
          window.addEventListener('message', function(e) {
            const data = e.data;
            
            if (data.command === 'zoomIn') {
              map.setZoom(map.getZoom() + 1);
            } else if (data.command === 'zoomOut') {
              map.setZoom(map.getZoom() - 1);
            } else if (data.command === 'setCenter') {
              map.setView([data.lat, data.lng], data.zoom || map.getZoom());
              
              // Add pulse effect for user location
              if (data.isUserLocation) {
                const existingPulse = document.querySelector('.map-pulse');
                if (existingPulse) existingPulse.remove();
                
                const pulse = document.createElement('div');
                pulse.className = 'map-pulse';
                document.body.appendChild(pulse);
                
                setTimeout(() => {
                  if (pulse) pulse.remove();
                }, 5000);
              }
            } else if (data.command === 'reset') {
              map.setView([${initialCenter?.lat}, ${initialCenter?.lng}], ${zoom});
            } else if (data.command === 'changeMapStyle') {
              tileLayer.setUrl(data.url);
            } else if (data.command === 'search') {
              // Simple geocoding through Nominatim (for demo purposes)
              fetch(\`https://nominatim.openstreetmap.org/search?format=json&q=\${encodeURIComponent(data.query)}\`)
                .then(response => response.json())
                .then(data => {
                  if (data && data.length > 0) {
                    const result = data[0];
                    map.setView([result.lat, result.lon], 15);
                    L.marker([result.lat, result.lon])
                      .addTo(map)
                      .bindPopup(result.display_name)
                      .openPopup();
                  }
                })
                .catch(err => console.error('Search error:', err));
            }
          });
        </script>
      </body>
      </html>
    `;
  };

  // Create data URL for the custom HTML
  const getMapDataUrl = () => {
    const html = getCustomMapHtml();
    return `data:text/html;charset=utf-8,${encodeURIComponent(html)}`;
  };

  // Get user location
  const getUserLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCurrentCenter(userPos);
        setCurrentZoom(15);

        // Send message to iframe to update map
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage(
            {
              command: "setCenter",
              lat: userPos.lat,
              lng: userPos.lng,
              zoom: 15,
              isUserLocation: true,
            },
            "*",
          );
        }

        toast.success("Location found!");
        setLoading(false);
      },
      (error) => {
        console.error("Geolocation error:", error);
        toast.error("Unable to retrieve your location");
        setLoading(false);
      },
    );
  };

  // Reset view to initial center and zoom
  const resetView = () => {
    setCurrentCenter(initialCenter);
    setCurrentZoom(zoom);

    // Send message to iframe to reset map
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          command: "reset",
        },
        "*",
      );
    }
  };

  // Zoom controls
  const zoomIn = () => {
    if (currentZoom < 19) {
      setCurrentZoom(currentZoom + 1);

      // Send message to iframe to zoom in
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            command: "zoomIn",
          },
          "*",
        );
      }
    }
  };

  const zoomOut = () => {
    if (currentZoom > 1) {
      setCurrentZoom(currentZoom - 1);

      // Send message to iframe to zoom out
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            command: "zoomOut",
          },
          "*",
        );
      }
    }
  };

  // Change map style
  const changeMapStyle = (
    style: "default" | "satellite" | "dark" | "light",
  ) => {
    setActiveMapStyle(style);

    // Send message to iframe to change map style
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          command: "changeMapStyle",
          url: mapTileLayers[style].url,
        },
        "*",
      );
    }
  };

  useEffect(() => {
    const mapContainer = mapContainerRef.current;
    if (!mapContainer) return;

    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    mapContainer.addEventListener("touchstart", preventZoom, {
      passive: false,
    });

    return () => {
      mapContainer.removeEventListener("touchstart", preventZoom);
    };
  }, []);

  // Share map location
  const shareLocation = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Map Location",
          text: `Check out this location at ${currentCenter?.lat}, ${currentCenter?.lng}`,
          url: `https://www.openstreetmap.org/#map=${currentZoom}/${currentCenter?.lat}/${currentCenter?.lng}`,
        });
      } else {
        // Fallback for browsers that don't support share API
        const shareUrl = `https://www.openstreetmap.org/#map=${currentZoom}/${currentCenter?.lat}/${currentCenter?.lng}`;
        navigator.clipboard.writeText(shareUrl);
        toast.success("Map link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Unable to share location");
    }
  };

  return (
    <div className={`w-full py-6 sm:py-6 md:py-8 lg:py-10 ${className}`}>
      <Card className="relative w-full overflow-hidden !rounded-none border border-gray-200 shadow-lg">
        <div ref={mapContainerRef} className="relative h-full w-full">
          <iframe
            ref={iframeRef}
            src={getMapDataUrl()}
            className="h-[500px] w-full sm:h-[450px] md:h-[500px] lg:h-[600px]"
            style={{ border: 0 }}
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
            aria-hidden="false"
            tabIndex={0}
            title="Interactive Map"
          />

          {/* Map Style Indicator */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium shadow-md">
            <Map className="h-3 w-3" />
            <span className="capitalize">{activeMapStyle} Map</span>
          </div>

          {/* Zoom Level Indicator */}
          <div className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium shadow-md">
            Zoom: {currentZoom}
          </div>
        </div>

        {/* Top Control Bar */}
        <div className="absolute left-4 right-4 top-4 flex justify-between">
          {/* Left Controls */}
          <div className="flex gap-2">
            {/* Map Style Controls */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 transform mt-5">
              <div className="overflow-hidden rounded-lg bg-white shadow-md">
                <Button
                  variant={activeMapStyle === "default" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => changeMapStyle("default")}
                  className={`w-full justify-start px-3 py-1 ${activeMapStyle === "default" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
                >
                  <span className="text-xs">Default</span>
                </Button>
                <Button
                  variant={activeMapStyle === "satellite" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => changeMapStyle("satellite")}
                  className={`w-full justify-start px-3 py-1 ${activeMapStyle === "satellite" ? "bg-blue-500 text-white" : "bg-white text-gray-700"}`}
                >
                  <span className="text-xs">Satellite</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={getUserLocation}
              disabled={loading}
              className="rounded-full bg-white shadow-md hover:bg-gray-100"
              title="Get your location"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Navigation className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="secondary"
              size="icon"
              onClick={resetView}
              className="rounded-full bg-white shadow-md hover:bg-gray-100"
              title="Reset view"
            >
              <Home className="h-4 w-4" />
            </Button>

            <Button
              variant="secondary"
              size="icon"
              onClick={shareLocation}
              className="rounded-full bg-white shadow-md hover:bg-gray-100"
              title="Share location"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute right-4 top-1/2 flex -translate-y-1/2 transform flex-col gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={zoomIn}
            className="rounded-full bg-white shadow-md hover:bg-gray-100"
            title="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={zoomOut}
            className="rounded-full bg-white shadow-md hover:bg-gray-100"
            title="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
