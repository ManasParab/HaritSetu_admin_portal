import React, { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Layers } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Project {
  id: string;
  name: string;
  status: "Active" | "Pending" | "Completed";
  coordinates: [number, number][];
  creditsIssued: number;
  creditsRetired: number;
  areaCovered: number;
  verificationStatus: "Verified" | "Under Review" | "Approved";
  description: string;
  images: string[];
  recentActivity: Array<{
    date: string;
    event: string;
    type: string;
  }>;
}

interface SatelliteMapProps {
  onProjectClick?: (project: Project) => void;
}

export function SatelliteMap({ onProjectClick }: SatelliteMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);

  // Project data with geographically accurate coordinates
  const projects: Project[] = [
    {
      id: "BC-2024-0078",
      name: "Sundarbans Delta Restoration",
      status: "Active",
      coordinates: [
        [89.0207, 21.9497],
        [88.7909, 21.5794],
        [88.2721, 21.6961],
        [88.5413, 22.2536],
        [89.1769, 22.1283],
        [89.0207, 21.9497]
      ],
      creditsIssued: 12500,
      creditsRetired: 8300,
      areaCovered: 2800,
      verificationStatus: "Verified",
      description: "Large-scale mangrove restoration project in the Sundarbans delta region focusing on biodiversity conservation and carbon sequestration.",
      images: [
        "https://images.unsplash.com/photo-1643276714790-9e30f89a5a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5ncm92ZSUyMGZvcmVzdCUyMHJlc3RvcmF0aW9ufGVufDF8fHx8MTc1OTA1NjkyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ],
      recentActivity: [
        { date: "2024-09-25", event: "MRV data submitted for Q3", type: "verification" },
        { date: "2024-09-20", event: "1,200 credits issued", type: "credit" },
        { date: "2024-09-15", event: "Field monitoring completed", type: "monitoring" }
      ]
    },
    {
      id: "BC-2024-0092",
      name: "Bhitarkanika Mangroves Project",
      status: "Active",
      coordinates: [
        [86.9150, 20.7681],
        [86.8404, 20.6750],
        [86.9749, 20.5898],
        [87.0583, 20.7222],
        [86.9150, 20.7681]
      ],
      creditsIssued: 8900,
      creditsRetired: 5600,
      areaCovered: 1950,
      verificationStatus: "Under Review",
      description: "Critical mangrove ecosystem restoration in Bhitarkanika National Park, Odisha.",
      images: [
        "https://images.unsplash.com/photo-1629215833375-edd0fb49a690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhzZWFncmFzcyUyMG1lYWRvd3MlMjB1bmRlcndhdGVyfGVufDF8fHx8MTc1OTA1NjkzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ],
      recentActivity: [
        { date: "2024-09-28", event: "Community workshop conducted", type: "engagement" },
        { date: "2024-09-22", event: "Verification review initiated", type: "verification" },
        { date: "2024-09-18", event: "800 credits issued", type: "credit" }
      ]
    },
    {
      id: "BC-2024-0065",
      name: "Pichavaram Mangrove Forest Project",
      status: "Active",
      coordinates: [
        [79.7758, 11.4939],
        [79.7616, 11.4111],
        [79.8093, 11.4332],
        [79.7995, 11.4912],
        [79.7758, 11.4939]
      ],
      creditsIssued: 15200,
      creditsRetired: 11800,
      areaCovered: 3400,
      verificationStatus: "Verified",
      description: "One of the largest mangrove forests in India, located in Tamil Nadu with comprehensive restoration efforts.",
      images: [
        "https://images.unsplash.com/photo-1753874150294-11c4a91349b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwcmVzdG9yYXRpb24lMjBwcm9qZWN0fGVufDF8fHx8MTc1OTA1NjkyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ],
      recentActivity: [
        { date: "2024-09-26", event: "Coral restoration milestone reached", type: "project" },
        { date: "2024-09-21", event: "1,500 credits retired", type: "credit" },
        { date: "2024-09-16", event: "Annual audit completed", type: "verification" }
      ]
    }
  ];

  useEffect(() => {
    // Set your Mapbox access token here
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFuYXNwcmIiLCJhIjoiY21nNHFscno0MWE1MjJqczJvb2wzZjJlZiJ9.xY_RZfVEqF17iDoa3RS8BA'; // Replace with actual token
    
    if (!map.current && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12', // Satellite Streets style
        center: [78.9629, 20.5937], // India center coordinates
        zoom: 5,
        projection: 'globe' // Enable 3D globe view
      });

      map.current.on('load', () => {
        setMapLoaded(true);
        
        // Ensure map fits container properly with a small delay
        setTimeout(() => {
          if (map.current) {
            map.current.resize();
          }
        }, 100);
        
        // Add polygon layers for each project
        projects.forEach((project) => {
          // Add source for the polygon
          map.current!.addSource(`project-${project.id}`, {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {
                id: project.id,
                name: project.name,
                status: project.status,
                creditsIssued: project.creditsIssued,
                areaCovered: project.areaCovered
              },
              geometry: {
                type: 'Polygon',
                coordinates: [project.coordinates]
              }
            }
          });

          // Add fill layer
          map.current!.addLayer({
            id: `project-fill-${project.id}`,
            type: 'fill',
            source: `project-${project.id}`,
            paint: {
              'fill-color': '#3B82F6',
              'fill-opacity': 0.4
            }
          });

          // Add border layer
          map.current!.addLayer({
            id: `project-border-${project.id}`,
            type: 'line',
            source: `project-${project.id}`,
            paint: {
              'line-color': '#2563EB',
              'line-width': 1.5
            }
          });

          // Add hover interactions
          map.current!.on('mouseenter', `project-fill-${project.id}`, (e) => {
            map.current!.getCanvas().style.cursor = 'pointer';
            setHoveredProject(project.id);
            
            // Increase opacity on hover
            map.current!.setPaintProperty(`project-fill-${project.id}`, 'fill-opacity', 0.65);
            map.current!.setPaintProperty(`project-border-${project.id}`, 'line-width', 2);

            // Create popup tooltip
            const coordinates = e.lngLat;
            const popup = new mapboxgl.Popup({
              closeButton: false,
              closeOnClick: false,
              className: 'mapbox-tooltip'
            })
              .setLngLat(coordinates)
              .setHTML(`
                <div class="p-3 bg-white rounded-lg shadow-lg border border-gray-200">
                  <div class="flex items-center space-x-2 mb-2">
                    <div class="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <h3 class="font-semibold text-sm text-gray-900">${project.name}</h3>
                  </div>
                  <div class="text-xs text-gray-600 space-y-1">
                    <p><span class="font-medium">Status:</span> ${project.status}</p>
                    <p><span class="font-medium">Credits Issued:</span> ${project.creditsIssued.toLocaleString()}</p>
                    <p><span class="font-medium">Area:</span> ${project.areaCovered} hectares</p>
                  </div>
                  <div class="flex items-center space-x-2 text-xs text-blue-600 font-medium pt-2 border-t border-gray-200 mt-2">
                    <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Click for detailed information</span>
                  </div>
                </div>
              `)
              .addTo(map.current!);
            
            // Store popup reference to remove later
            (map.current as any).currentPopup = popup;
          });

          map.current!.on('mouseleave', `project-fill-${project.id}`, () => {
            map.current!.getCanvas().style.cursor = '';
            setHoveredProject(null);
            
            // Reset opacity
            map.current!.setPaintProperty(`project-fill-${project.id}`, 'fill-opacity', 0.4);
            map.current!.setPaintProperty(`project-border-${project.id}`, 'line-width', 1.5);

            // Remove popup
            if ((map.current as any).currentPopup) {
              (map.current as any).currentPopup.remove();
              (map.current as any).currentPopup = null;
            }
          });

          // Add click interaction
          map.current!.on('click', `project-fill-${project.id}`, () => {
            onProjectClick?.(project);
          });
        });

        // Add navigation controls
        map.current!.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        
        // Add scale control
        map.current!.addControl(new mapboxgl.ScaleControl(), 'bottom-left');
      });
    }

    // Add resize listener
    const handleResize = () => {
      if (map.current) {
        map.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  const handleZoomIn = () => {
    if (map.current) {
      map.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (map.current) {
      map.current.zoomOut();
    }
  };

  const handleReset = () => {
    if (map.current) {
      map.current.flyTo({
        center: [78.9629, 20.5937],
        zoom: 5
      });
    }
  };

  const toggleLabels = () => {
    setShowLabels(!showLabels);
    if (map.current) {
      // Toggle label visibility by switching between satellite and satellite-streets
      const currentStyle = map.current.getStyle();
      if (currentStyle.name === 'satellite-streets-v12') {
        map.current.setStyle('mapbox://styles/mapbox/satellite-v9');
      } else {
        map.current.setStyle('mapbox://styles/mapbox/satellite-streets-v12');
      }
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Mapbox container */}
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg overflow-hidden"
                style={{
          minHeight: '400px',
          maxHeight: '100%',
          width: '100%',
          position: 'relative'
        }}
      />
      
      {/* Mapbox token notice - remove this in production */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <Card className="p-6 max-w-md mx-auto text-center">
            <h3 className="font-semibold mb-2">Mapbox Integration Ready</h3>
            <p className="text-sm text-muted-foreground mb-4">
              To display the satellite map, add your Mapbox access token to the component.
            </p>
            <div className="bg-blue-50 p-3 rounded text-xs text-blue-800">
              <strong>Replace:</strong> 'pk.your_mapbox_token_here' with your actual Mapbox token
            </div>
          </Card>
        </div>
      )}

      {/* Map controls */}
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg"
          onClick={handleZoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg"
          onClick={handleReset}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 bg-white/95 backdrop-blur-sm hover:bg-white shadow-lg"
          onClick={toggleLabels}
        >
          <Layers className="h-4 w-4" />
        </Button>
      </div>

      {/* Enhanced legend */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-gray-200">
        <h4 className="font-semibold text-sm mb-3 text-gray-900 flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
          Blue Carbon Projects
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-blue-500 opacity-40 rounded border border-blue-600"></div>
            <span>Project Areas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-green-600 rounded"></div>
            <span>Coastal Ecosystems</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-yellow-600 rounded"></div>
            <span>Desert Regions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-3 bg-gray-600 rounded"></div>
            <span>Mountain Ranges</span>
          </div>
        </div>
      </div>

      {/* Project summary */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl border border-gray-200">
        <div className="text-xs text-gray-600">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold text-gray-900 block">{projects.length}</span>
              <span>Active Projects</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 block">
                {projects.reduce((sum, p) => sum + p.areaCovered, 0).toLocaleString()}
              </span>
              <span>hectares</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 block">
                {projects.reduce((sum, p) => sum + p.creditsIssued, 0).toLocaleString()}
              </span>
              <span>Credits Issued</span>
            </div>
            <div>
              <span className="font-semibold text-gray-900 block">
                {projects.reduce((sum, p) => sum + p.creditsRetired, 0).toLocaleString()}
              </span>
              <span>Credits Retired</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}