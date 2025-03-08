import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertTriangle,
  AlertCircle,
  Clock,
  MapPin,
  ArrowRight,
  Bell,
} from "lucide-react";

interface Alert {
  id: string;
  type: "earthquake" | "flood" | "typhoon" | "fire" | "landslide";
  severity: "low" | "medium" | "high" | "critical";
  title: string;
  location: string;
  timestamp: string;
  description: string;
}

interface AlertsWidgetProps {
  alerts?: Alert[];
  maxAlerts?: number;
  showViewAll?: boolean;
  onViewAlert?: (alertId: string) => void;
  onViewAllAlerts?: () => void;
}

const defaultAlerts: Alert[] = [
  {
    id: "1",
    type: "typhoon",
    severity: "critical",
    title: "Typhoon Malakas",
    location: "Eastern Seaboard",
    timestamp: "2023-08-15T07:30:00Z",
    description:
      "Typhoon approaching with sustained winds of 150 kph and gusts up to 185 kph. Expected landfall in 6 hours.",
  },
  {
    id: "2",
    type: "flood",
    severity: "high",
    title: "Severe Flooding",
    location: "Marikina River Basin",
    timestamp: "2023-08-15T08:15:00Z",
    description:
      "Severe flooding in Marikina River Basin due to continuous heavy rainfall. Water level has reached 18 meters.",
  },
  {
    id: "3",
    type: "earthquake",
    severity: "medium",
    title: "Magnitude 5.4 Earthquake",
    location: "West Valley Fault",
    timestamp: "2023-08-15T06:45:00Z",
    description:
      "Magnitude 5.4 earthquake detected along West Valley Fault. Aftershocks expected.",
  },
  {
    id: "4",
    type: "fire",
    severity: "high",
    title: "Industrial Fire",
    location: "Port Area",
    timestamp: "2023-08-15T09:20:00Z",
    description:
      "Large fire reported at industrial complex in Port Area. Fire departments responding.",
  },
];

const AlertsWidget: React.FC<AlertsWidgetProps> = ({
  alerts = defaultAlerts,
  maxAlerts = 3,
  showViewAll = true,
  onViewAlert = () => {},
  onViewAllAlerts = () => {},
}) => {
  const [hoveredAlert, setHoveredAlert] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const displayedAlerts = alerts.slice(0, maxAlerts);

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Latest Alerts
          </CardTitle>
          {showViewAll && (
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-800"
              onClick={onViewAllAlerts}
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {displayedAlerts.length > 0 ? (
          <div className="space-y-3">
            {displayedAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border transition-all ${hoveredAlert === alert.id ? "shadow-md" : ""}`}
                onMouseEnter={() => setHoveredAlert(alert.id)}
                onMouseLeave={() => setHoveredAlert(null)}
                onClick={() => onViewAlert(alert.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getAlertIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{alert.title}</h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="outline"
                              className={`${getSeverityColor(alert.severity)} text-xs`}
                            >
                              {alert.severity.toUpperCase()}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{alert.severity.toUpperCase()} severity level</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No active alerts at this time</p>
            <p className="text-sm text-gray-400 mt-1">
              You'll be notified when new alerts are issued
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AlertsWidget;
