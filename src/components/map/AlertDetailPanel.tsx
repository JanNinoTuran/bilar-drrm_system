import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Separator } from "../ui/separator";
import {
  Phone,
  AlertTriangle,
  Info,
  MapPin,
  Clock,
  ArrowRight,
  Share2,
  Bookmark,
  Printer,
} from "lucide-react";

interface AlertDetailProps {
  alert?: {
    id: string;
    title: string;
    description: string;
    type: "earthquake" | "flood" | "typhoon" | "fire" | "landslide";
    severity: "low" | "medium" | "high" | "critical";
    location: string;
    coordinates: { lat: number; lng: number };
    timestamp: string;
    affectedAreas: string[];
    safetyInstructions: string[];
    evacuationRoutes: Array<{ name: string; description: string }>;
    updates: Array<{ time: string; message: string }>;
  };
}

const severityColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
};

const alertTypeIcons = {
  earthquake: "🌋",
  flood: "🌊",
  typhoon: "🌀",
  fire: "🔥",
  landslide: "⛰️",
};

const defaultAlert = {
  id: "alert-123",
  title: "Magnitude 6.2 Earthquake",
  description:
    "A strong earthquake has been detected in the region. Please follow safety protocols.",
  type: "earthquake" as const,
  severity: "high" as const,
  location: "Northern Metro Area",
  coordinates: { lat: 14.5995, lng: 120.9842 },
  timestamp: "2023-07-15T08:30:00Z",
  affectedAreas: ["Downtown", "Eastern District", "Coastal Areas"],
  safetyInstructions: [
    "Drop, cover, and hold on until the shaking stops",
    "Stay away from windows and exterior walls",
    "If outdoors, move to an open area away from buildings",
    "Be prepared for aftershocks",
  ],
  evacuationRoutes: [
    {
      name: "Northern Evacuation Route",
      description:
        "Follow Highway 101 North to reach the Northern Evacuation Center",
    },
    {
      name: "Eastern Evacuation Route",
      description:
        "Take Main Street East to the Community College Evacuation Center",
    },
  ],
  updates: [
    {
      time: "08:35 AM",
      message: "Initial earthquake detected. Assessment underway.",
    },
    {
      time: "08:42 AM",
      message: "Magnitude confirmed at 6.2. Expect aftershocks.",
    },
    {
      time: "09:15 AM",
      message: "Evacuation centers are now open and operational.",
    },
  ],
};

const AlertDetailPanel = ({ alert = defaultAlert }: AlertDetailProps) => {
  const formattedDate = new Date(alert.timestamp).toLocaleString();

  return (
    <Card className="w-full max-w-md bg-white border-gray-200 overflow-auto h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{alertTypeIcons[alert.type]}</span>
              <Badge
                variant="outline"
                className={severityColors[alert.severity]}
              >
                {alert.severity.toUpperCase()} SEVERITY
              </Badge>
            </div>
            <CardTitle className="text-xl font-bold">{alert.title}</CardTitle>
            <CardDescription className="mt-1">
              {alert.description}
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" className="mt-0">
            <AlertTriangle className="h-5 w-5 text-yellow-500" />
          </Button>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">{alert.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">{formattedDate}</span>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="p-0">
        <Tabs defaultValue="instructions" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-2 p-0 h-12">
            <TabsTrigger value="instructions">Safety</TabsTrigger>
            <TabsTrigger value="evacuation">Evacuation</TabsTrigger>
            <TabsTrigger value="updates">Updates</TabsTrigger>
          </TabsList>

          <TabsContent value="instructions" className="px-6 py-4">
            <h4 className="font-medium text-sm mb-3">Safety Instructions</h4>
            <ul className="space-y-2">
              {alert.safetyInstructions.map((instruction, index) => (
                <li key={index} className="flex gap-2 items-start">
                  <Info className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                  <span className="text-sm">{instruction}</span>
                </li>
              ))}
            </ul>

            <h4 className="font-medium text-sm mt-4 mb-2">Affected Areas</h4>
            <div className="flex flex-wrap gap-2">
              {alert.affectedAreas.map((area, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {area}
                </Badge>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="evacuation" className="px-6 py-4">
            <h4 className="font-medium text-sm mb-3">Evacuation Routes</h4>
            <div className="space-y-3">
              {alert.evacuationRoutes.map((route, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md">
                  <h5 className="font-medium text-sm">{route.name}</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    {route.description}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 h-8 text-xs"
                  >
                    <span>Get Directions</span>
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="updates" className="px-6 py-4">
            <h4 className="font-medium text-sm mb-3">Latest Updates</h4>
            <div className="space-y-3">
              {alert.updates.map((update, index) => (
                <div
                  key={index}
                  className="border-l-2 border-blue-400 pl-3 py-1"
                >
                  <p className="text-xs font-medium text-gray-500">
                    {update.time}
                  </p>
                  <p className="text-sm">{update.message}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4">
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="h-9">
            <Phone className="h-4 w-4 mr-1" />
            <span>Emergency</span>
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <Share2 className="h-4 w-4 mr-1" />
            <span>Share</span>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AlertDetailPanel;
