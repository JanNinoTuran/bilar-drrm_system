import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertCircle,
  Layers,
  MapPin,
  Navigation,
  Plus,
  Minus,
  Search,
  Filter,
  AlertTriangle,
  Home,
  Hospital,
  Shield,
  Edit,
  Trash2,
  Save,
  X,
} from "lucide-react";
import MapFilters from "./MapFilters";
import AlertDetailPanel from "./AlertDetailPanel";

interface DisasterAlert {
  id: string;
  type: "flood" | "earthquake" | "typhoon" | "fire" | "landslide";
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  timestamp: string;
  description: string;
  affectedAreas: string[];
  safetyInstructions: string[];
}

interface EvacuationCenter {
  id: string;
  name: string;
  type: "school" | "gym" | "community-center" | "government-building";
  coordinates: [number, number];
  capacity: number;
  currentOccupancy: number;
  amenities: string[];
  contactNumber: string;
}

interface RiskZone {
  id: string;
  type: "flood" | "landslide" | "storm-surge" | "volcanic";
  riskLevel: "low" | "medium" | "high";
  coordinates: [number, number][];
  description: string;
}

interface CustomMarker {
  id: string;
  type:
    | "alert"
    | "evacuation"
    | "hospital"
    | "shelter"
    | "danger"
    | "info"
    | "custom";
  title: string;
  description: string;
  coordinates: [number, number]; // [latitude, longitude]
  icon?: string; // For custom icons
  color?: string; // For custom colors
  createdAt: string;
  updatedAt: string;
  additionalInfo?: Record<string, string>; // For any additional fields
}

interface InteractiveMapProps {
  alerts?: DisasterAlert[];
  evacuationCenters?: EvacuationCenter[];
  riskZones?: RiskZone[];
  customMarkers?: CustomMarker[];
  initialCenter?: [number, number];
  initialZoom?: number;
  isAdmin?: boolean;
}

const defaultAlerts: DisasterAlert[] = [
  {
    id: "1",
    type: "flood",
    severity: "high",
    location: "Riverside Area, Bilar",
    coordinates: [9.7177, 124.1146],
    timestamp: "2023-07-15T08:30:00Z",
    description:
      "Severe flooding in Riverside area due to continuous heavy rainfall. Water level has reached critical levels.",
    affectedAreas: ["Riverside", "Poblacion", "Zamora"],
    safetyInstructions: [
      "Evacuate to higher ground",
      "Avoid crossing flooded areas",
      "Follow evacuation routes",
    ],
  },
  {
    id: "2",
    type: "typhoon",
    severity: "critical",
    location: "Bilar Municipality",
    coordinates: [9.7177, 124.1146],
    timestamp: "2023-07-15T07:00:00Z",
    description:
      "Typhoon approaching with sustained winds of 150 kph and gusts up to 185 kph. Expected landfall in 6 hours.",
    affectedAreas: ["All Barangays", "Riverside", "Poblacion", "Zamora"],
    safetyInstructions: [
      "Stay indoors",
      "Prepare emergency kits",
      "Monitor official announcements",
    ],
  },
  {
    id: "3",
    type: "landslide",
    severity: "medium",
    location: "Cambigsi Area, Bilar",
    coordinates: [9.7177, 124.1146],
    timestamp: "2023-07-15T06:15:00Z",
    description:
      "Potential landslide risk in Cambigsi area due to soil saturation after heavy rainfall.",
    affectedAreas: ["Cambigsi", "Roxas"],
    safetyInstructions: [
      "Evacuate to designated centers",
      "Stay away from slopes and hillsides",
      "Monitor for unusual sounds or ground movement",
    ],
  },
];

const defaultEvacuationCenters: EvacuationCenter[] = [
  {
    id: "1",
    name: "Bilar Central Elementary School",
    type: "school",
    coordinates: [9.7177, 124.1146],
    capacity: 500,
    currentOccupancy: 120,
    amenities: ["Water supply", "Medical station", "Toilets", "Sleeping area"],
    contactNumber: "(038) 535-9111",
  },
  {
    id: "2",
    name: "Bilar National High School",
    type: "school",
    coordinates: [9.7177, 124.1146],
    capacity: 800,
    currentOccupancy: 210,
    amenities: ["Water supply", "Toilets", "Sleeping area"],
    contactNumber: "(038) 535-9222",
  },
  {
    id: "3",
    name: "Bilar Municipal Gymnasium",
    type: "gym",
    coordinates: [9.7177, 124.1146],
    capacity: 1000,
    currentOccupancy: 350,
    amenities: [
      "Water supply",
      "Medical station",
      "Toilets",
      "Sleeping area",
      "Food distribution",
    ],
    contactNumber: "(038) 535-9000",
  },
];

const defaultRiskZones: RiskZone[] = [
  {
    id: "1",
    type: "flood",
    riskLevel: "high",
    coordinates: [
      [14.6507, 121.1029],
      [14.643, 121.0967],
      [14.6337, 121.0421],
      [14.5764, 121.0851],
    ],
    description:
      "High flood risk area due to proximity to Marikina River and low elevation.",
  },
  {
    id: "2",
    type: "landslide",
    riskLevel: "medium",
    coordinates: [
      [14.5995, 120.9842],
      [14.5547, 121.0244],
      [14.5764, 121.0851],
      [14.6337, 121.0421],
    ],
    description: "Medium landslide risk due to steep slopes and soil erosion.",
  },
];

// Default custom markers for demonstration
const defaultCustomMarkers: CustomMarker[] = [
  {
    id: "custom-1",
    type: "alert",
    title: "Flash Flood Warning",
    description:
      "Recent heavy rainfall has caused flash flooding in this area.",
    coordinates: [9.7177, 124.1146],
    color: "#ff0000",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    additionalInfo: {
      severity: "high",
      expectedDuration: "24 hours",
    },
  },
  {
    id: "custom-2",
    type: "evacuation",
    title: "Temporary Evacuation Center",
    description:
      "School gymnasium converted to evacuation center. Capacity: 200 people.",
    coordinates: [9.72, 124.12],
    color: "#00ff00",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    additionalInfo: {
      capacity: "200",
      amenities: "Water, Food, Medical Aid",
    },
  },
];

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  alerts = defaultAlerts,
  evacuationCenters = defaultEvacuationCenters,
  riskZones = defaultRiskZones,
  customMarkers = defaultCustomMarkers,
  initialCenter = [9.7177, 124.1146], // Default to Bilar, Bohol
  initialZoom = 12,
  isAdmin = true, // Default to admin mode for this implementation
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<Map<string, google.maps.Marker>>(new Map());

  const [selectedAlert, setSelectedAlert] = useState<DisasterAlert | null>(
    null,
  );
  const [selectedEvacCenter, setSelectedEvacCenter] =
    useState<EvacuationCenter | null>(null);
  const [selectedRiskZone, setSelectedRiskZone] = useState<RiskZone | null>(
    null,
  );
  const [selectedCustomMarker, setSelectedCustomMarker] =
    useState<CustomMarker | null>(null);
  const [isEditingMarker, setIsEditingMarker] = useState(false);
  const [newMarker, setNewMarker] = useState<Partial<CustomMarker> | null>(
    null,
  );
  const [markers, setMarkers] = useState<CustomMarker[]>(customMarkers);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("markers"); // Default to markers tab
  const [zoom, setZoom] = useState(initialZoom);
  const [isAddingMarker, setIsAddingMarker] = useState(false);

  // Initialize Google Maps
  useEffect(() => {
    // Load Google Maps API script if it's not already loaded
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCGh2sxlc3VeclxLRtHCbcXmXQUXzhUQMQ&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
      return () => {
        document.head.removeChild(script);
      };
    } else {
      initMap();
    }
  }, []);

  // Initialize map
  const initMap = () => {
    if (mapRef.current && window.google) {
      const mapOptions = {
        center: { lat: initialCenter[0], lng: initialCenter[1] },
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      };

      const map = new google.maps.Map(mapRef.current, mapOptions);
      googleMapRef.current = map;

      // Add click listener for adding new markers (admin only)
      if (isAdmin) {
        map.addListener("click", (event: google.maps.MapMouseEvent) => {
          if (isAddingMarker && event.latLng) {
            const lat = event.latLng.lat();
            const lng = event.latLng.lng();

            // Create a new marker template
            const newMarkerTemplate: Partial<CustomMarker> = {
              id: `custom-${Date.now()}`,
              type: "info",
              title: "New Marker",
              description: "Description for new marker",
              coordinates: [lat, lng],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            };

            setNewMarker(newMarkerTemplate);
            setIsEditingMarker(true);
            setIsAddingMarker(false);
          }
        });
      }

      // Render all markers
      renderMarkers();
    }
  };

  // Render markers on the map
  const renderMarkers = () => {
    if (!googleMapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    markersRef.current.clear();

    // Add custom markers
    markers.forEach((marker) => {
      addMarkerToMap(marker);
    });
  };

  // Add a single marker to the map
  const addMarkerToMap = (marker: CustomMarker) => {
    if (!googleMapRef.current) return;

    const position = { lat: marker.coordinates[0], lng: marker.coordinates[1] };

    // Determine icon based on marker type
    let icon = {
      url: "",
      scaledSize: new google.maps.Size(30, 30),
    };

    switch (marker.type) {
      case "alert":
        icon.url = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
        break;
      case "evacuation":
        icon.url = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
        break;
      case "hospital":
        icon.url = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
        break;
      case "shelter":
        icon.url = "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
        break;
      case "danger":
        icon.url = "https://maps.google.com/mapfiles/ms/icons/purple-dot.png";
        break;
      case "info":
        icon.url = "https://maps.google.com/mapfiles/ms/icons/blue-pushpin.png";
        break;
      default:
        icon.url = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
    }

    const googleMarker = new google.maps.Marker({
      position,
      map: googleMapRef.current,
      title: marker.title,
      icon,
      animation: google.maps.Animation.DROP,
    });

    // Add click event to marker
    googleMarker.addListener("click", () => {
      setSelectedCustomMarker(marker);
      setSelectedAlert(null);
      setSelectedEvacCenter(null);
      setSelectedRiskZone(null);
    });

    // Store marker reference
    markersRef.current.set(marker.id, googleMarker);
  };

  // Save a new or edited marker
  const saveMarker = () => {
    if (!newMarker) return;

    const completeMarker = newMarker as CustomMarker;

    if (isEditingMarker && selectedCustomMarker) {
      // Update existing marker
      const updatedMarkers = markers.map((m) =>
        m.id === selectedCustomMarker.id
          ? { ...completeMarker, updatedAt: new Date().toISOString() }
          : m,
      );
      setMarkers(updatedMarkers);
    } else {
      // Add new marker
      setMarkers([...markers, completeMarker]);
    }

    // Reset states
    setNewMarker(null);
    setIsEditingMarker(false);
    setSelectedCustomMarker(null);

    // Re-render markers
    setTimeout(() => renderMarkers(), 100);
  };

  // Delete a marker
  const deleteMarker = (id: string) => {
    const updatedMarkers = markers.filter((marker) => marker.id !== id);
    setMarkers(updatedMarkers);
    setSelectedCustomMarker(null);

    // Remove marker from map
    const markerToRemove = markersRef.current.get(id);
    if (markerToRemove) {
      markerToRemove.setMap(null);
      markersRef.current.delete(id);
    }
  };

  // Edit an existing marker
  const editMarker = (marker: CustomMarker) => {
    setNewMarker(marker);
    setIsEditingMarker(true);
  };

  // Update marker fields while editing
  const updateMarkerField = (field: keyof CustomMarker, value: any) => {
    if (!newMarker) return;
    setNewMarker({ ...newMarker, [field]: value });
  };

  // Handle zoom in
  const handleZoomIn = () => {
    if (!googleMapRef.current) return;
    const newZoom = Math.min((googleMapRef.current.getZoom() || zoom) + 1, 20);
    googleMapRef.current.setZoom(newZoom);
    setZoom(newZoom);
  };

  // Handle zoom out
  const handleZoomOut = () => {
    if (!googleMapRef.current) return;
    const newZoom = Math.max((googleMapRef.current.getZoom() || zoom) - 1, 1);
    googleMapRef.current.setZoom(newZoom);
    setZoom(newZoom);
  };

  const handleAlertClick = (alert: DisasterAlert) => {
    setSelectedAlert(alert);
    setSelectedEvacCenter(null);
    setSelectedRiskZone(null);
    setSelectedCustomMarker(null);
  };

  const handleEvacCenterClick = (center: EvacuationCenter) => {
    setSelectedEvacCenter(center);
    setSelectedAlert(null);
    setSelectedRiskZone(null);
    setSelectedCustomMarker(null);
  };

  const handleRiskZoneClick = (zone: RiskZone) => {
    setSelectedRiskZone(zone);
    setSelectedAlert(null);
    setSelectedEvacCenter(null);
    setSelectedCustomMarker(null);
  };

  const handleClosePanel = () => {
    setSelectedAlert(null);
    setSelectedEvacCenter(null);
    setSelectedRiskZone(null);
    setSelectedCustomMarker(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-500";
      case "medium":
        return "bg-yellow-500";
      case "high":
        return "bg-orange-500";
      case "critical":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "flood":
        return <AlertCircle className="text-blue-500" />;
      case "earthquake":
        return <AlertCircle className="text-orange-500" />;
      case "typhoon":
        return <AlertCircle className="text-teal-500" />;
      case "fire":
        return <AlertCircle className="text-red-500" />;
      case "landslide":
        return <AlertCircle className="text-amber-500" />;
      default:
        return <AlertCircle className="text-gray-500" />;
    }
  };

  const getEvacCenterIcon = (type: string) => {
    switch (type) {
      case "school":
        return <Home className="text-green-500" />;
      case "gym":
        return <Home className="text-blue-500" />;
      case "community-center":
        return <Home className="text-purple-500" />;
      case "government-building":
        return <Home className="text-indigo-500" />;
      default:
        return <Home className="text-gray-500" />;
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-100 flex">
      {/* Map Filters Sidebar */}
      <div
        className={`${showFilters ? "w-80" : "w-0"} h-full transition-all duration-300 overflow-hidden bg-white shadow-lg z-10`}
      >
        <MapFilters />
      </div>

      {/* Main Map Container */}
      <div className="flex-1 relative">
        {/* Google Maps Container */}
        <div
          ref={mapRef}
          className="w-full h-full bg-gray-200 relative overflow-hidden"
        >
          {/* Map will be rendered here by Google Maps API */}
        </div>

        {/* Admin Controls - Only visible in admin mode */}
        {isAdmin && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-lg px-4 py-2 z-10 flex items-center gap-2">
            <Button
              variant={isAddingMarker ? "default" : "outline"}
              size="sm"
              onClick={() => setIsAddingMarker(!isAddingMarker)}
              className="flex items-center gap-1"
            >
              <MapPin className="h-4 w-4" />
              {isAddingMarker ? "Cancel" : "Add Marker"}
            </Button>

            {isAddingMarker && (
              <span className="text-xs text-gray-500">
                Click on the map to place a marker
              </span>
            )}
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button variant="secondary" size="icon" onClick={handleZoomIn}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon" onClick={handleZoomOut}>
            <Minus className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Map Layer Controls */}
        <div className="absolute top-4 left-4">
          <Tabs
            defaultValue="markers"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-white/90 shadow-md">
              <TabsTrigger value="markers" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Custom Markers</span>
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                <span>Alerts</span>
              </TabsTrigger>
              <TabsTrigger
                value="evacuation"
                className="flex items-center gap-1"
              >
                <Home className="h-4 w-4" />
                <span>Evacuation</span>
              </TabsTrigger>
              <TabsTrigger value="risk" className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span>Risk Zones</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Search Bar */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search for a location..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === "Enter" && googleMapRef.current) {
                  const geocoder = new google.maps.Geocoder();
                  geocoder.geocode(
                    { address: e.currentTarget.value },
                    (results, status) => {
                      if (
                        status === "OK" &&
                        results &&
                        results[0] &&
                        googleMapRef.current
                      ) {
                        googleMapRef.current.setCenter(
                          results[0].geometry.location,
                        );
                        googleMapRef.current.setZoom(15);
                      }
                    },
                  );
                }
              }}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg shadow-md">
          <h3 className="text-sm font-semibold mb-2">Legend</h3>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Critical Alert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>High Alert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Medium Alert</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Low Alert</span>
            </div>
            {activeTab === "evacuation" && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Evacuation Center</span>
              </div>
            )}
            {activeTab === "markers" && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Alert Marker</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Evacuation Marker</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Hospital Marker</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {(selectedAlert ||
        selectedEvacCenter ||
        selectedRiskZone ||
        selectedCustomMarker ||
        isEditingMarker) && (
        <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-lg z-20 overflow-y-auto">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2"
            onClick={() => {
              handleClosePanel();
              setIsEditingMarker(false);
              setNewMarker(null);
            }}
          >
            <X className="h-4 w-4" />
          </Button>

          {selectedAlert && (
            <AlertDetailPanel alert={selectedAlert} isAdmin={isAdmin} />
          )}

          {selectedEvacCenter && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {selectedEvacCenter.name}
              </h2>
              <Badge className="mb-4 capitalize">
                {selectedEvacCenter.type.replace("-", " ")}
              </Badge>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Capacity
                  </h3>
                  <div className="mt-1 flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{
                          width: `${(selectedEvacCenter.currentOccupancy / selectedEvacCenter.capacity) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm">
                      {selectedEvacCenter.currentOccupancy}/
                      {selectedEvacCenter.capacity}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Amenities
                  </h3>
                  <ul className="mt-1 list-disc list-inside">
                    {selectedEvacCenter.amenities.map((amenity, index) => (
                      <li key={index} className="text-sm">
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact</h3>
                  <p className="mt-1 text-sm">
                    {selectedEvacCenter.contactNumber}
                  </p>
                </div>

                <Button className="w-full">Get Directions</Button>
              </div>
            </div>
          )}

          {selectedRiskZone && (
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4 capitalize">
                {selectedRiskZone.type} Risk Zone
              </h2>
              <Badge
                className={`mb-4 ${
                  selectedRiskZone.riskLevel === "high"
                    ? "bg-red-500"
                    : selectedRiskZone.riskLevel === "medium"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                }`}
              >
                {selectedRiskZone.riskLevel.toUpperCase()} RISK
              </Badge>

              <div className="space-y-4">
                <p className="text-gray-700">{selectedRiskZone.description}</p>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Safety Recommendations
                  </h3>
                  <ul className="mt-1 list-disc list-inside">
                    <li className="text-sm">Avoid construction in this area</li>
                    <li className="text-sm">
                      Be prepared to evacuate during heavy rainfall
                    </li>
                    <li className="text-sm">Monitor official announcements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Nearby Evacuation Centers
                  </h3>
                  <ul className="mt-1 space-y-2">
                    {evacuationCenters.slice(0, 2).map((center) => (
                      <li
                        key={center.id}
                        className="text-sm flex justify-between"
                      >
                        <span>{center.name}</span>
                        <span
                          className="text-blue-500 cursor-pointer"
                          onClick={() => handleEvacCenterClick(center)}
                        >
                          View
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full">View Safe Routes</Button>
              </div>
            </div>
          )}

          {/* Custom Marker View/Edit Panel */}
          {selectedCustomMarker && !isEditingMarker && (
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">
                  {selectedCustomMarker.title}
                </h2>
                {isAdmin && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => editMarker(selectedCustomMarker)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteMarker(selectedCustomMarker.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <Badge className="mb-4 capitalize">
                {selectedCustomMarker.type.replace("-", " ")}
              </Badge>

              <div className="space-y-4">
                <p className="text-gray-700">
                  {selectedCustomMarker.description}
                </p>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Coordinates
                  </h3>
                  <p className="mt-1 text-sm">
                    Lat: {selectedCustomMarker.coordinates[0].toFixed(6)}, Lng:{" "}
                    {selectedCustomMarker.coordinates[1].toFixed(6)}
                  </p>
                </div>

                {selectedCustomMarker.additionalInfo &&
                  Object.keys(selectedCustomMarker.additionalInfo).length >
                    0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Additional Information
                      </h3>
                      <ul className="mt-1 space-y-1">
                        {Object.entries(
                          selectedCustomMarker.additionalInfo,
                        ).map(([key, value], index) => (
                          <li key={index} className="text-sm">
                            <span className="font-medium capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>{" "}
                            {value}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                <div className="text-xs text-gray-500">
                  <p>
                    Created:{" "}
                    {new Date(selectedCustomMarker.createdAt).toLocaleString()}
                  </p>
                  <p>
                    Last updated:{" "}
                    {new Date(selectedCustomMarker.updatedAt).toLocaleString()}
                  </p>
                </div>

                <Button className="w-full">Get Directions</Button>
              </div>
            </div>
          )}

          {/* Marker Edit Form */}
          {isEditingMarker && newMarker && (
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">
                {selectedCustomMarker ? "Edit Marker" : "Add New Marker"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Input
                    value={newMarker.title || ""}
                    onChange={(e) => updateMarkerField("title", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Type
                  </label>
                  <select
                    value={newMarker.type || "info"}
                    onChange={(e) => updateMarkerField("type", e.target.value)}
                    className="w-full mt-1 rounded-md border border-gray-300 p-2"
                  >
                    <option value="alert">Alert</option>
                    <option value="evacuation">Evacuation</option>
                    <option value="hospital">Hospital</option>
                    <option value="shelter">Shelter</option>
                    <option value="danger">Danger</option>
                    <option value="info">Information</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={newMarker.description || ""}
                    onChange={(e) =>
                      updateMarkerField("description", e.target.value)
                    }
                    className="w-full mt-1 rounded-md border border-gray-300 p-2 text-sm min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Latitude
                    </label>
                    <Input
                      type="number"
                      value={
                        newMarker.coordinates ? newMarker.coordinates[0] : 0
                      }
                      onChange={(e) => {
                        const coords = [...(newMarker.coordinates || [0, 0])];
                        coords[0] = parseFloat(e.target.value);
                        updateMarkerField("coordinates", coords);
                      }}
                      className="mt-1"
                      step="0.000001"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Longitude
                    </label>
                    <Input
                      type="number"
                      value={
                        newMarker.coordinates ? newMarker.coordinates[1] : 0
                      }
                      onChange={(e) => {
                        const coords = [...(newMarker.coordinates || [0, 0])];
                        coords[1] = parseFloat(e.target.value);
                        updateMarkerField("coordinates", coords);
                      }}
                      className="mt-1"
                      step="0.000001"
                    />
                  </div>
                </div>

                {/* Additional Fields Section */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </h3>

                  {/* Display existing additional info fields */}
                  {newMarker.additionalInfo &&
                    Object.entries(newMarker.additionalInfo).map(
                      ([key, value], index) => (
                        <div key={index} className="flex gap-2 mb-2">
                          <Input
                            value={key}
                            onChange={(e) => {
                              const updatedInfo = {
                                ...newMarker.additionalInfo,
                              };
                              const oldValue = updatedInfo[key];
                              delete updatedInfo[key];
                              updatedInfo[e.target.value] = oldValue;
                              updateMarkerField("additionalInfo", updatedInfo);
                            }}
                            className="w-1/3"
                            placeholder="Field name"
                          />
                          <Input
                            value={value}
                            onChange={(e) => {
                              const updatedInfo = {
                                ...newMarker.additionalInfo,
                              };
                              updatedInfo[key] = e.target.value;
                              updateMarkerField("additionalInfo", updatedInfo);
                            }}
                            className="w-2/3"
                            placeholder="Value"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              const updatedInfo = {
                                ...newMarker.additionalInfo,
                              };
                              delete updatedInfo[key];
                              updateMarkerField("additionalInfo", updatedInfo);
                            }}
                            className="flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ),
                    )}

                  {/* Add new field button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const updatedInfo = { ...newMarker.additionalInfo } || {};
                      updatedInfo[
                        `field${Object.keys(updatedInfo).length + 1}`
                      ] = "";
                      updateMarkerField("additionalInfo", updatedInfo);
                    }}
                    className="mt-2 w-full"
                  >
                    Add Field
                  </Button>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    className="w-1/2"
                    onClick={() => {
                      setIsEditingMarker(false);
                      setNewMarker(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="w-1/2" onClick={saveMarker}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Marker
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
