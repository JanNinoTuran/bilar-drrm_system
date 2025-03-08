import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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

interface InteractiveMapProps {
  alerts?: DisasterAlert[];
  evacuationCenters?: EvacuationCenter[];
  riskZones?: RiskZone[];
  initialCenter?: [number, number];
  initialZoom?: number;
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

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  alerts = defaultAlerts,
  evacuationCenters = defaultEvacuationCenters,
  riskZones = defaultRiskZones,
  initialCenter = [9.7177, 124.1146], // Default to Bilar, Bohol
  initialZoom = 12,
}) => {
  const [selectedAlert, setSelectedAlert] = useState<DisasterAlert | null>(
    null,
  );
  const [selectedEvacCenter, setSelectedEvacCenter] =
    useState<EvacuationCenter | null>(null);
  const [selectedRiskZone, setSelectedRiskZone] = useState<RiskZone | null>(
    null,
  );
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState("alerts");
  const [zoom, setZoom] = useState(initialZoom);

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 1, 18);
    setZoom(newZoom);
    // Update iframe src with new zoom level
    const mapFrame = document.querySelector("iframe") as HTMLIFrameElement;
    if (mapFrame && mapFrame.src) {
      const currentSrc = mapFrame.src;
      const newSrc = currentSrc.includes("&z=")
        ? currentSrc.replace(/&z=\d+/, `&z=${newZoom}`)
        : `${currentSrc}&z=${newZoom}`;
      mapFrame.src = newSrc;
    }
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 1, 5);
    setZoom(newZoom);
    // Update iframe src with new zoom level
    const mapFrame = document.querySelector("iframe") as HTMLIFrameElement;
    if (mapFrame && mapFrame.src) {
      const currentSrc = mapFrame.src;
      const newSrc = currentSrc.includes("&z=")
        ? currentSrc.replace(/&z=\d+/, `&z=${newZoom}`)
        : `${currentSrc}&z=${newZoom}`;
      mapFrame.src = newSrc;
    }
  };

  const handleAlertClick = (alert: DisasterAlert) => {
    setSelectedAlert(alert);
    setSelectedEvacCenter(null);
    setSelectedRiskZone(null);
  };

  const handleEvacCenterClick = (center: EvacuationCenter) => {
    setSelectedEvacCenter(center);
    setSelectedAlert(null);
    setSelectedRiskZone(null);
  };

  const handleRiskZoneClick = (zone: RiskZone) => {
    setSelectedRiskZone(zone);
    setSelectedAlert(null);
    setSelectedEvacCenter(null);
  };

  const handleClosePanel = () => {
    setSelectedAlert(null);
    setSelectedEvacCenter(null);
    setSelectedRiskZone(null);
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
        {/* Map Placeholder - In a real implementation, this would be replaced with a mapping library like Leaflet or Google Maps */}
        <div className="w-full h-full bg-gray-200 relative overflow-hidden">
          {/* Bilar, Bohol Map Background */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251553.7856972473!2d123.92864389453123!3d9.72770000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aa3c10dc0f13f5%3A0x94a06a6eb2e5408c!2sBilar%2C%20Bohol!5e0!3m2!1sen!2sph!4v1709686800367!5m2!1sen!2sph&z=10"
            className="absolute inset-0 w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Map of Bilar, Bohol (6317)"
          ></iframe>

          {/* Map Content Overlay */}
          <div className="absolute inset-0 p-4">
            {/* Simulated Alert Markers */}
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${30 + Math.random() * 40}%`,
                }}
                onClick={() => handleAlertClick(alert)}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`rounded-full p-2 ${getSeverityColor(alert.severity)} text-white shadow-lg`}
                      >
                        {getAlertIcon(alert.type)}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-semibold">
                        {alert.type.charAt(0).toUpperCase() +
                          alert.type.slice(1)}
                      </p>
                      <p>{alert.location}</p>
                      <p className="text-xs">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}

            {/* Simulated Evacuation Center Markers */}
            {activeTab === "evacuation" &&
              evacuationCenters.map((center) => (
                <div
                  key={center.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                  style={{
                    left: `${40 + Math.random() * 30}%`,
                    top: `${40 + Math.random() * 30}%`,
                  }}
                  onClick={() => handleEvacCenterClick(center)}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="rounded-full p-2 bg-green-500 text-white shadow-lg">
                          {getEvacCenterIcon(center.type)}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-semibold">{center.name}</p>
                        <p>
                          Capacity: {center.currentOccupancy}/{center.capacity}
                        </p>
                        <p className="text-xs">
                          {center.type.replace("-", " ")}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}

            {/* Simulated Risk Zones */}
            {activeTab === "risk" &&
              riskZones.map((zone) => (
                <div
                  key={zone.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${30 + Math.random() * 40}%`,
                    top: `${40 + Math.random() * 30}%`,
                    width: "120px",
                    height: "80px",
                    borderRadius: "50%",
                    background:
                      zone.riskLevel === "high"
                        ? "rgba(239, 68, 68, 0.3)"
                        : zone.riskLevel === "medium"
                          ? "rgba(245, 158, 11, 0.3)"
                          : "rgba(59, 130, 246, 0.3)",
                    border:
                      zone.riskLevel === "high"
                        ? "2px solid rgba(239, 68, 68, 0.7)"
                        : zone.riskLevel === "medium"
                          ? "2px solid rgba(245, 158, 11, 0.7)"
                          : "2px solid rgba(59, 130, 246, 0.7)",
                  }}
                  onClick={() => handleRiskZoneClick(zone)}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="sr-only">{zone.type} risk zone</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-semibold">
                          {zone.type.charAt(0).toUpperCase() +
                            zone.type.slice(1)}{" "}
                          Risk Zone
                        </p>
                        <p>
                          Risk Level:{" "}
                          {zone.riskLevel.charAt(0).toUpperCase() +
                            zone.riskLevel.slice(1)}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
          </div>
        </div>

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
            defaultValue="alerts"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="bg-white/90 shadow-md">
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
          </div>
        </div>
      </div>

      {/* Alert Detail Panel */}
      {(selectedAlert || selectedEvacCenter || selectedRiskZone) && (
        <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-lg z-20 overflow-y-auto">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-2"
            onClick={handleClosePanel}
          >
            ×
          </Button>

          {selectedAlert && <AlertDetailPanel />}

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
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
