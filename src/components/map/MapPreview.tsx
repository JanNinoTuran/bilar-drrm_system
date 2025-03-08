import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertCircle,
  AlertTriangle,
  Filter,
  Home,
  MapPin,
  Search,
  Shield,
  ZoomIn,
} from "lucide-react";

interface DisasterAlert {
  id: string;
  type: "flood" | "earthquake" | "typhoon" | "fire" | "landslide";
  severity: "low" | "medium" | "high" | "critical";
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  timestamp: string;
  description: string;
}

interface EvacuationCenter {
  id: string;
  name: string;
  type: string;
  coordinates: [number, number];
  capacity: number;
  currentOccupancy: number;
}

interface MapPreviewProps {
  alerts?: DisasterAlert[];
  evacuationCenters?: EvacuationCenter[];
  onViewFullMap?: () => void;
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
      "Severe flooding in Riverside area due to continuous heavy rainfall.",
  },
  {
    id: "2",
    type: "typhoon",
    severity: "critical",
    location: "Bilar Municipality",
    coordinates: [9.7177, 124.1146],
    timestamp: "2023-07-15T07:00:00Z",
    description:
      "Typhoon approaching with sustained winds of 150 kph and gusts up to 185 kph.",
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
  },
  {
    id: "2",
    name: "Bilar Municipal Gymnasium",
    type: "gym",
    coordinates: [9.7177, 124.1146],
    capacity: 1000,
    currentOccupancy: 350,
  },
];

const MapPreview: React.FC<MapPreviewProps> = ({
  alerts = defaultAlerts,
  evacuationCenters = defaultEvacuationCenters,
  onViewFullMap = () => (window.location.href = "/map"),
}) => {
  const [activeLayer, setActiveLayer] = useState<"alerts" | "evacuation">(
    "alerts",
  );

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

  return (
    <Card className="w-full overflow-hidden bg-white shadow-md">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-gray-500" />
          <h3 className="font-semibold text-lg">Disaster Map</h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className={activeLayer === "alerts" ? "bg-blue-50" : ""}
            onClick={() => setActiveLayer("alerts")}
          >
            <AlertTriangle className="h-4 w-4 mr-1" />
            Alerts
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={activeLayer === "evacuation" ? "bg-blue-50" : ""}
            onClick={() => setActiveLayer("evacuation")}
          >
            <Home className="h-4 w-4 mr-1" />
            Evacuation
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[350px] w-full bg-gray-100">
        {/* Bilar, Bohol Map Background */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251553.7856972473!2d123.92864389453123!3d9.72770000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aa3c10dc0f13f5%3A0x94a06a6eb2e5408c!2sBilar%2C%20Bohol!5e0!3m2!1sen!2sph!4v1709686800367!5m2!1sen!2sph&z=10"
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map of Bilar, Bohol (6317)"
        ></iframe>

        {/* Map Content */}
        <div className="absolute inset-0 p-4">
          {/* Alert Markers */}
          {activeLayer === "alerts" &&
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${30 + Math.random() * 40}%`,
                }}
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

          {/* Evacuation Center Markers */}
          {activeLayer === "evacuation" &&
            evacuationCenters.map((center) => (
              <div
                key={center.id}
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
                style={{
                  left: `${40 + Math.random() * 30}%`,
                  top: `${40 + Math.random() * 30}%`,
                }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="rounded-full p-2 bg-green-500 text-white shadow-lg">
                        <Home className="h-4 w-4" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-semibold">{center.name}</p>
                      <p>
                        Capacity: {center.currentOccupancy}/{center.capacity}
                      </p>
                      <p className="text-xs capitalize">
                        {center.type.replace("-", " ")}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md"
            onClick={() => {
              const mapFrame = document.querySelector(
                "iframe",
              ) as HTMLIFrameElement;
              if (mapFrame && mapFrame.src) {
                const currentSrc = mapFrame.src;
                const currentZoom = currentSrc.match(/&z=(\d+)/);
                const newZoom = currentZoom
                  ? Math.min(parseInt(currentZoom[1]) + 1, 18)
                  : 13;
                const newSrc = currentSrc.includes("&z=")
                  ? currentSrc.replace(/&z=\d+/, `&z=${newZoom}`)
                  : `${currentSrc}&z=${newZoom}`;
                mapFrame.src = newSrc;
              }
            }}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-md"
            onClick={() => {
              const mapFrame = document.querySelector(
                "iframe",
              ) as HTMLIFrameElement;
              if (mapFrame && mapFrame.src) {
                const currentSrc = mapFrame.src;
                const currentZoom = currentSrc.match(/&z=(\d+)/);
                const newZoom = currentZoom
                  ? Math.max(parseInt(currentZoom[1]) - 1, 5)
                  : 11;
                const newSrc = currentSrc.includes("&z=")
                  ? currentSrc.replace(/&z=\d+/, `&z=${newZoom}`)
                  : `${currentSrc}&z=${newZoom}`;
                mapFrame.src = newSrc;
              }
            }}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded-lg shadow-md text-xs">
          <h4 className="font-semibold mb-1">Legend</h4>
          {activeLayer === "alerts" ? (
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span>Critical</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Low</span>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Evacuation Center</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3 text-blue-500" />
                <span>Safe Zone</span>
              </div>
            </div>
          )}
        </div>

        {/* View Full Map Button */}
        <div className="absolute top-4 right-4">
          <Button size="sm" onClick={onViewFullMap}>
            View Full Map
          </Button>
        </div>

        {/* Search Bar */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search location..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      {/* Alert Summary */}
      <div className="p-4 border-t">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium">Current Alerts</h4>
          <Badge variant="outline" className="text-xs">
            {alerts.length} Active
          </Badge>
        </div>
        <div className="space-y-2 max-h-[100px] overflow-y-auto">
          {alerts.slice(0, 3).map((alert) => (
            <div key={alert.id} className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${getSeverityColor(alert.severity)}`}
              ></div>
              <div className="text-sm">
                <span className="font-medium">
                  {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                </span>
                <span className="text-gray-500"> - {alert.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MapPreview;
