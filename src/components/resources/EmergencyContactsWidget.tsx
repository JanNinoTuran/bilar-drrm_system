import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Phone, ExternalLink, AlertCircle, Info } from "lucide-react";

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  category: "emergency" | "medical" | "rescue" | "government" | "utility";
  description?: string;
  available24Hours?: boolean;
}

interface EmergencyContactsWidgetProps {
  contacts?: EmergencyContact[];
  title?: string;
  showCategories?: boolean;
}

const defaultContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "National Emergency Hotline",
    number: "911",
    category: "emergency",
    description: "For all emergency situations requiring immediate response",
    available24Hours: true,
  },
  {
    id: "2",
    name: "Disaster Response Operations Center",
    number: "(02) 8911-1406",
    category: "emergency",
    description: "For disaster-related emergencies and coordination",
    available24Hours: true,
  },
  {
    id: "3",
    name: "Red Cross Emergency Response Unit",
    number: "143",
    category: "rescue",
    description: "For medical emergencies, rescue operations, and blood needs",
    available24Hours: true,
  },
  {
    id: "4",
    name: "National Disaster Risk Reduction and Management Council",
    number: "(02) 8911-5061",
    category: "government",
    description: "For disaster coordination and information",
    available24Hours: true,
  },
  {
    id: "5",
    name: "Bureau of Fire Protection",
    number: "(02) 8426-0219",
    category: "emergency",
    description: "For fire emergencies and rescue operations",
    available24Hours: true,
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "emergency":
      return "bg-red-100 text-red-800 border-red-200";
    case "medical":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "rescue":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "government":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "utility":
      return "bg-green-100 text-green-800 border-green-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "emergency":
      return <AlertCircle className="h-4 w-4 text-red-600" />;
    case "medical":
      return <AlertCircle className="h-4 w-4 text-blue-600" />;
    case "rescue":
      return <AlertCircle className="h-4 w-4 text-orange-600" />;
    case "government":
      return <AlertCircle className="h-4 w-4 text-purple-600" />;
    case "utility":
      return <AlertCircle className="h-4 w-4 text-green-600" />;
    default:
      return <AlertCircle className="h-4 w-4 text-gray-600" />;
  }
};

const EmergencyContactsWidget: React.FC<EmergencyContactsWidgetProps> = ({
  contacts = defaultContacts,
  title = "Emergency Contacts",
  showCategories = true,
}) => {
  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Phone className="h-5 w-5 text-red-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {showCategories && (
            <div className="flex flex-wrap gap-2 mb-4">
              {Array.from(
                new Set(contacts.map((contact) => contact.category)),
              ).map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className={`${getCategoryColor(category)} capitalize`}
                >
                  {category.replace("-", " ")}
                </Badge>
              ))}
            </div>
          )}

          <div className="grid gap-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-full ${getCategoryColor(
                      contact.category,
                    )} flex-shrink-0`}
                  >
                    {getCategoryIcon(contact.category)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {contact.name}
                    </h3>
                    <p className="text-sm font-mono text-gray-700">
                      {contact.number}
                    </p>
                    {contact.description && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="inline-flex items-center mt-1 text-xs text-gray-500 cursor-help">
                              <Info className="h-3 w-3 mr-1" />
                              More info
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{contact.description}</p>
                            {contact.available24Hours && (
                              <p className="mt-1 font-semibold">
                                Available 24/7
                              </p>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  className="flex-shrink-0 bg-green-500 hover:bg-green-600"
                  onClick={() => window.open(`tel:${contact.number}`)}
                >
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button variant="outline" className="text-sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View All Emergency Contacts
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmergencyContactsWidget;
