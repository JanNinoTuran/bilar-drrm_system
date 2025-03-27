import React, { useState } from "react";
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
import { Input } from "../ui/input";
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
  Edit,
  Save,
  X,
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
  isAdmin?: boolean;
  onSave?: (alert: any) => void;
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

const AlertDetailPanel = ({
  alert = defaultAlert,
  isAdmin = true,
  onSave,
}: AlertDetailProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAlert, setEditedAlert] = useState(alert);
  const formattedDate = new Date(alert.timestamp).toLocaleString();

  const handleSave = () => {
    if (onSave) {
      onSave(editedAlert);
    }
    setIsEditing(false);
  };

  const updateField = (field: string, value: any) => {
    setEditedAlert((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateSafetyInstruction = (index: number, value: string) => {
    const newInstructions = [...editedAlert.safetyInstructions];
    newInstructions[index] = value;
    updateField("safetyInstructions", newInstructions);
  };

  const addSafetyInstruction = () => {
    updateField("safetyInstructions", [...editedAlert.safetyInstructions, ""]);
  };

  const removeSafetyInstruction = (index: number) => {
    const newInstructions = [...editedAlert.safetyInstructions];
    newInstructions.splice(index, 1);
    updateField("safetyInstructions", newInstructions);
  };

  const updateEvacuationRoute = (
    index: number,
    field: string,
    value: string,
  ) => {
    const newRoutes = [...editedAlert.evacuationRoutes];
    newRoutes[index] = {
      ...newRoutes[index],
      [field]: value,
    };
    updateField("evacuationRoutes", newRoutes);
  };

  const addEvacuationRoute = () => {
    updateField("evacuationRoutes", [
      ...editedAlert.evacuationRoutes,
      { name: "", description: "" },
    ]);
  };

  const removeEvacuationRoute = (index: number) => {
    const newRoutes = [...editedAlert.evacuationRoutes];
    newRoutes.splice(index, 1);
    updateField("evacuationRoutes", newRoutes);
  };

  const updateUpdate = (index: number, field: string, value: string) => {
    const newUpdates = [...editedAlert.updates];
    newUpdates[index] = {
      ...newUpdates[index],
      [field]: value,
    };
    updateField("updates", newUpdates);
  };

  const addUpdate = () => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
    updateField("updates", [
      ...editedAlert.updates,
      { time: timeStr, message: "" },
    ]);
  };

  const removeUpdate = (index: number) => {
    const newUpdates = [...editedAlert.updates];
    newUpdates.splice(index, 1);
    updateField("updates", newUpdates);
  };

  return (
    <Card className="w-full max-w-md bg-white border-gray-200 overflow-auto h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">
                {alertTypeIcons[isEditing ? editedAlert.type : alert.type]}
              </span>
              {isEditing ? (
                <select
                  value={editedAlert.severity}
                  onChange={(e) => updateField("severity", e.target.value)}
                  className="rounded-md border border-gray-300 p-1 text-sm"
                >
                  <option value="low">LOW</option>
                  <option value="medium">MEDIUM</option>
                  <option value="high">HIGH</option>
                  <option value="critical">CRITICAL</option>
                </select>
              ) : (
                <Badge
                  variant="outline"
                  className={severityColors[alert.severity]}
                >
                  {alert.severity.toUpperCase()} SEVERITY
                </Badge>
              )}
            </div>
            {isEditing ? (
              <Input
                value={editedAlert.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="font-bold text-xl mb-2"
              />
            ) : (
              <CardTitle className="text-xl font-bold">{alert.title}</CardTitle>
            )}
            {isEditing ? (
              <textarea
                value={editedAlert.description}
                onChange={(e) => updateField("description", e.target.value)}
                className="w-full mt-1 rounded-md border border-gray-300 p-2 text-sm"
                rows={3}
              />
            ) : (
              <CardDescription className="mt-1">
                {alert.description}
              </CardDescription>
            )}
          </div>
          {isAdmin &&
            (isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSave}
                className="mt-0"
              >
                <Save className="h-4 w-4 mr-1" />
                Save
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="mt-0"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="h-5 w-5 text-gray-500" />
              </Button>
            ))}
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            {isEditing ? (
              <Input
                value={editedAlert.location}
                onChange={(e) => updateField("location", e.target.value)}
                className="text-sm"
              />
            ) : (
              <span className="text-sm text-gray-700">{alert.location}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-500" />
            {isEditing ? (
              <Input
                type="datetime-local"
                value={new Date(editedAlert.timestamp)
                  .toISOString()
                  .slice(0, 16)}
                onChange={(e) =>
                  updateField(
                    "timestamp",
                    new Date(e.target.value).toISOString(),
                  )
                }
                className="text-sm"
              />
            ) : (
              <span className="text-sm text-gray-700">{formattedDate}</span>
            )}
          </div>
          {isEditing && (
            <div className="flex items-center gap-2 mt-2">
              <label className="text-sm font-medium">Alert Type:</label>
              <select
                value={editedAlert.type}
                onChange={(e) => updateField("type", e.target.value)}
                className="rounded-md border border-gray-300 p-1 text-sm flex-1"
              >
                <option value="earthquake">Earthquake</option>
                <option value="flood">Flood</option>
                <option value="typhoon">Typhoon</option>
                <option value="fire">Fire</option>
                <option value="landslide">Landslide</option>
              </select>
            </div>
          )}
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
              {(isEditing ? editedAlert : alert).safetyInstructions.map(
                (instruction, index) => (
                  <li key={index} className="flex gap-2 items-start">
                    <Info className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                    {isEditing ? (
                      <div className="flex-1 flex gap-2">
                        <Input
                          value={instruction}
                          onChange={(e) =>
                            updateSafetyInstruction(index, e.target.value)
                          }
                          className="text-sm flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSafetyInstruction(index)}
                          className="h-8 w-8 flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm">{instruction}</span>
                    )}
                  </li>
                ),
              )}
            </ul>

            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={addSafetyInstruction}
                className="mt-2 w-full"
              >
                Add Instruction
              </Button>
            )}

            <h4 className="font-medium text-sm mt-4 mb-2">Affected Areas</h4>
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={(editedAlert.affectedAreas || []).join(", ")}
                  onChange={(e) =>
                    updateField(
                      "affectedAreas",
                      e.target.value
                        .split(",")
                        .map((area) => area.trim())
                        .filter((area) => area),
                    )
                  }
                  className="text-sm"
                  placeholder="Enter areas separated by commas"
                />
                <p className="text-xs text-gray-500">
                  Separate areas with commas
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {alert.affectedAreas.map((area, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {area}
                  </Badge>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="evacuation" className="px-6 py-4">
            <h4 className="font-medium text-sm mb-3">Evacuation Routes</h4>
            <div className="space-y-3">
              {(isEditing ? editedAlert : alert).evacuationRoutes.map(
                (route, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    {isEditing ? (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Input
                            value={route.name}
                            onChange={(e) =>
                              updateEvacuationRoute(
                                index,
                                "name",
                                e.target.value,
                              )
                            }
                            className="text-sm font-medium"
                            placeholder="Route Name"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeEvacuationRoute(index)}
                            className="h-8 w-8 ml-2 flex-shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <textarea
                          value={route.description}
                          onChange={(e) =>
                            updateEvacuationRoute(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                          className="w-full mt-1 rounded-md border border-gray-300 p-2 text-sm"
                          placeholder="Route Description"
                          rows={2}
                        />
                      </div>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                ),
              )}
            </div>

            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={addEvacuationRoute}
                className="mt-3 w-full"
              >
                Add Evacuation Route
              </Button>
            )}
          </TabsContent>

          <TabsContent value="updates" className="px-6 py-4">
            <h4 className="font-medium text-sm mb-3">Latest Updates</h4>
            <div className="space-y-3">
              {(isEditing ? editedAlert : alert).updates.map(
                (update, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-blue-400 pl-3 py-1"
                  >
                    {isEditing ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Input
                            value={update.time}
                            onChange={(e) =>
                              updateUpdate(index, "time", e.target.value)
                            }
                            className="text-xs font-medium w-24"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeUpdate(index)}
                            className="h-6 w-6 flex-shrink-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <textarea
                          value={update.message}
                          onChange={(e) =>
                            updateUpdate(index, "message", e.target.value)
                          }
                          className="w-full rounded-md border border-gray-300 p-2 text-sm"
                          rows={2}
                        />
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-medium text-gray-500">
                          {update.time}
                        </p>
                        <p className="text-sm">{update.message}</p>
                      </>
                    )}
                  </div>
                ),
              )}
            </div>

            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={addUpdate}
                className="mt-3 w-full"
              >
                Add Update
              </Button>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4">
        {isEditing ? (
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="w-1/2"
              onClick={() => {
                setIsEditing(false);
                setEditedAlert(alert); // Reset to original
              }}
            >
              Cancel
            </Button>
            <Button className="w-1/2" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default AlertDetailPanel;
