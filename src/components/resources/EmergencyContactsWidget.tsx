import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Phone,
  ExternalLink,
  AlertCircle,
  Info,
  MapPin,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  category: "emergency" | "medical" | "rescue" | "government" | "utility";
  description?: string;
  available24Hours?: boolean;
}

interface Municipality {
  id: string;
  name: string;
  contacts: EmergencyContact[];
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

const boholMunicipalities: Municipality[] = [
  {
    id: "alburquerque",
    name: "Alburquerque",
    contacts: [
      {
        id: "alburquerque-1",
        name: "Alburquerque MDRRMO",
        number: "(038) 539-1000",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "alicia",
    name: "Alicia",
    contacts: [
      {
        id: "alicia-1",
        name: "Alicia MDRRMO",
        number: "(038) 539-1100",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "anda",
    name: "Anda",
    contacts: [
      {
        id: "anda-1",
        name: "Anda MDRRMO",
        number: "(038) 521-9000",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "antequera",
    name: "Antequera",
    contacts: [
      {
        id: "antequera-1",
        name: "Antequera MDRRMO",
        number: "(038) 539-1200",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "baclayon",
    name: "Baclayon",
    contacts: [
      {
        id: "baclayon-1",
        name: "Baclayon MDRRMO",
        number: "(038) 539-1300",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "balilihan",
    name: "Balilihan",
    contacts: [
      {
        id: "balilihan-1",
        name: "Balilihan MDRRMO",
        number: "(038) 539-1400",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "batuan",
    name: "Batuan",
    contacts: [
      {
        id: "batuan-1",
        name: "Batuan MDRRMO",
        number: "(038) 539-1500",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "bien-unido",
    name: "Bien Unido",
    contacts: [
      {
        id: "bien-unido-1",
        name: "Bien Unido MDRRMO",
        number: "(038) 539-4700",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "buenavista",
    name: "Buenavista",
    contacts: [
      {
        id: "buenavista-1",
        name: "Buenavista MDRRMO",
        number: "(038) 539-1600",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "calape",
    name: "Calape",
    contacts: [
      {
        id: "calape-1",
        name: "Calape MDRRMO",
        number: "(038) 539-1700",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "candijay",
    name: "Candijay",
    contacts: [
      {
        id: "candijay-1",
        name: "Candijay MDRRMO",
        number: "(038) 539-1800",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "carmen",
    name: "Carmen",
    contacts: [
      {
        id: "carmen-1",
        name: "Carmen MDRRMO",
        number: "(038) 533-9088",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
      {
        id: "carmen-2",
        name: "Carmen Municipal Health Office",
        number: "(038) 533-9100",
        category: "medical",
        description: "For medical emergencies and health concerns",
        available24Hours: false,
      },
    ],
  },
  {
    id: "catigbian",
    name: "Catigbian",
    contacts: [
      {
        id: "catigbian-1",
        name: "Catigbian MDRRMO",
        number: "(038) 539-1900",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "clarin",
    name: "Clarin",
    contacts: [
      {
        id: "clarin-1",
        name: "Clarin MDRRMO",
        number: "(038) 539-2000",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "corella",
    name: "Corella",
    contacts: [
      {
        id: "corella-1",
        name: "Corella MDRRMO",
        number: "(038) 539-2100",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "cortes",
    name: "Cortes",
    contacts: [
      {
        id: "cortes-1",
        name: "Cortes MDRRMO",
        number: "(038) 539-2200",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "dagohoy",
    name: "Dagohoy",
    contacts: [
      {
        id: "dagohoy-1",
        name: "Dagohoy MDRRMO",
        number: "(038) 539-2300",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "danao",
    name: "Danao",
    contacts: [
      {
        id: "danao-1",
        name: "Danao MDRRMO",
        number: "(038) 539-2400",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "dauis",
    name: "Dauis",
    contacts: [
      {
        id: "dauis-1",
        name: "Dauis MDRRMO",
        number: "(038) 539-2500",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "dimiao",
    name: "Dimiao",
    contacts: [
      {
        id: "dimiao-1",
        name: "Dimiao MDRRMO",
        number: "(038) 539-2600",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "duero",
    name: "Duero",
    contacts: [
      {
        id: "duero-1",
        name: "Duero MDRRMO",
        number: "(038) 539-2700",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "garcia-hernandez",
    name: "Garcia Hernandez",
    contacts: [
      {
        id: "garcia-hernandez-1",
        name: "Garcia Hernandez MDRRMO",
        number: "(038) 539-2800",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "getafe",
    name: "Getafe",
    contacts: [
      {
        id: "getafe-1",
        name: "Getafe MDRRMO",
        number: "(038) 539-2900",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "guindulman",
    name: "Guindulman",
    contacts: [
      {
        id: "guindulman-1",
        name: "Guindulman MDRRMO",
        number: "(038) 539-3000",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "inabanga",
    name: "Inabanga",
    contacts: [
      {
        id: "inabanga-1",
        name: "Inabanga MDRRMO",
        number: "(038) 539-3100",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "jagna",
    name: "Jagna",
    contacts: [
      {
        id: "jagna-1",
        name: "Jagna MDRRMO",
        number: "(038) 531-8005",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
      {
        id: "jagna-2",
        name: "Jagna District Hospital",
        number: "(038) 531-8067",
        category: "medical",
        description: "District hospital for medical emergencies",
        available24Hours: true,
      },
    ],
  },
  {
    id: "lila",
    name: "Lila",
    contacts: [
      {
        id: "lila-1",
        name: "Lila MDRRMO",
        number: "(038) 539-3200",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "loay",
    name: "Loay",
    contacts: [
      {
        id: "loay-1",
        name: "Loay MDRRMO",
        number: "(038) 539-3300",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "loboc",
    name: "Loboc",
    contacts: [
      {
        id: "loboc-1",
        name: "Loboc MDRRMO",
        number: "(038) 539-3400",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "loon",
    name: "Loon",
    contacts: [
      {
        id: "loon-1",
        name: "Loon MDRRMO",
        number: "(038) 539-9088",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "mabini",
    name: "Mabini",
    contacts: [
      {
        id: "mabini-1",
        name: "Mabini MDRRMO",
        number: "(038) 539-3500",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "maribojoc",
    name: "Maribojoc",
    contacts: [
      {
        id: "maribojoc-1",
        name: "Maribojoc MDRRMO",
        number: "(038) 539-3600",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "panglao",
    name: "Panglao",
    contacts: [
      {
        id: "panglao-1",
        name: "Panglao MDRRMO",
        number: "(038) 502-9144",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
      {
        id: "panglao-2",
        name: "Panglao Tourist Police",
        number: "(038) 502-8177",
        category: "emergency",
        description: "For tourist-related emergencies and security concerns",
        available24Hours: true,
      },
    ],
  },
  {
    id: "pilar",
    name: "Pilar",
    contacts: [
      {
        id: "pilar-1",
        name: "Pilar MDRRMO",
        number: "(038) 539-3700",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "pres-carlos-p-garcia",
    name: "Pres. Carlos P. Garcia",
    contacts: [
      {
        id: "pres-carlos-p-garcia-1",
        name: "Pres. Carlos P. Garcia MDRRMO",
        number: "(038) 539-3800",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "sagbayan",
    name: "Sagbayan",
    contacts: [
      {
        id: "sagbayan-1",
        name: "Sagbayan MDRRMO",
        number: "(038) 539-3900",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "san-isidro",
    name: "San Isidro",
    contacts: [
      {
        id: "san-isidro-1",
        name: "San Isidro MDRRMO",
        number: "(038) 539-4000",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "san-miguel",
    name: "San Miguel",
    contacts: [
      {
        id: "san-miguel-1",
        name: "San Miguel MDRRMO",
        number: "(038) 539-4100",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "sevilla",
    name: "Sevilla",
    contacts: [
      {
        id: "sevilla-1",
        name: "Sevilla MDRRMO",
        number: "(038) 539-4200",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "sierra-bullones",
    name: "Sierra Bullones",
    contacts: [
      {
        id: "sierra-bullones-1",
        name: "Sierra Bullones MDRRMO",
        number: "(038) 539-4300",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "sikatuna",
    name: "Sikatuna",
    contacts: [
      {
        id: "sikatuna-1",
        name: "Sikatuna MDRRMO",
        number: "(038) 539-4400",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "tagbilaran",
    name: "Tagbilaran City",
    contacts: [
      {
        id: "tagbilaran-1",
        name: "Tagbilaran CDRRMO",
        number: "(038) 501-8063",
        category: "emergency",
        description: "City Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
      {
        id: "tagbilaran-2",
        name: "Tagbilaran City Fire Station",
        number: "(038) 411-4444",
        category: "emergency",
        description: "For fire emergencies and rescue operations",
        available24Hours: true,
      },
      {
        id: "tagbilaran-3",
        name: "Governor Celestino Gallares Memorial Hospital",
        number: "(038) 411-4878",
        category: "medical",
        description: "Provincial hospital for medical emergencies",
        available24Hours: true,
      },
    ],
  },
  {
    id: "talibon",
    name: "Talibon",
    contacts: [
      {
        id: "talibon-1",
        name: "Talibon MDRRMO",
        number: "(038) 515-0000",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
      {
        id: "talibon-2",
        name: "Talibon District Hospital",
        number: "(038) 515-0033",
        category: "medical",
        description: "District hospital for medical emergencies",
        available24Hours: true,
      },
    ],
  },
  {
    id: "trinidad",
    name: "Trinidad",
    contacts: [
      {
        id: "trinidad-1",
        name: "Trinidad MDRRMO",
        number: "(038) 539-4500",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
  },
  {
    id: "tubigon",
    name: "Tubigon",
    contacts: [
      {
        id: "tubigon-1",
        name: "Tubigon MDRRMO",
        number: "(038) 508-8977",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
      {
        id: "tubigon-2",
        name: "Tubigon Municipal Fire Station",
        number: "(038) 508-8900",
        category: "emergency",
        description: "For fire emergencies and rescue operations",
        available24Hours: true,
      },
    ],
  },
  {
    id: "ubay",
    name: "Ubay",
    contacts: [
      {
        id: "ubay-1",
        name: "Ubay MDRRMO",
        number: "(038) 518-8100",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
      {
        id: "ubay-2",
        name: "Don Emilio del Valle Memorial Hospital",
        number: "(038) 518-8160",
        category: "medical",
        description: "District hospital for medical emergencies",
        available24Hours: true,
      },
    ],
  },
  {
    id: "valencia",
    name: "Valencia",
    contacts: [
      {
        id: "valencia-1",
        name: "Valencia MDRRMO",
        number: "(038) 539-4600",
        category: "emergency",
        description: "Municipal Disaster Risk Reduction and Management Office",
        available24Hours: true,
      },
    ],
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
  const [selectedMunicipality, setSelectedMunicipality] = useState<
    string | null
  >(null);
  const [activeTab, setActiveTab] = useState<"national" | "local">("national");

  const handleMunicipalitySelect = (municipalityId: string) => {
    setSelectedMunicipality(municipalityId);
  };

  const handleBackToList = () => {
    setSelectedMunicipality(null);
  };

  const selectedMunicipalityData = boholMunicipalities.find(
    (municipality) => municipality.id === selectedMunicipality,
  );

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Phone className="h-5 w-5 text-red-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "national" | "local")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="national">National Contacts</TabsTrigger>
            <TabsTrigger value="local">Bohol Municipalities</TabsTrigger>
          </TabsList>

          <TabsContent value="national" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="local" className="space-y-4">
            {!selectedMunicipality ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {boholMunicipalities.map((municipality) => (
                  <div
                    key={municipality.id}
                    className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleMunicipalitySelect(municipality.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-blue-100 text-blue-800 border-blue-200">
                          <MapPin className="h-4 w-4" />
                        </div>
                        <h3 className="font-medium text-gray-900">
                          {municipality.name}
                        </h3>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 ml-10">
                      {municipality.contacts.length} emergency contacts
                      available
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToList}
                  className="mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Municipalities
                </Button>

                <h3 className="font-medium text-lg flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  {selectedMunicipalityData?.name} Emergency Contacts
                </h3>

                <div className="grid gap-3">
                  {selectedMunicipalityData?.contacts.map((contact) => (
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
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmergencyContactsWidget;
