import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertTriangle, Bell, Droplet, Wind, AlertCircle } from "lucide-react";
import AlertsWidget from "@/components/alerts/AlertsWidget";
import { useAuth } from "@/context/AuthContext";

interface EarlyWarningSystem {
  barangay: string;
  hazardType: "flood" | "typhoon" | "landslide" | "earthquake";
  warningStation: string;
  warningDevice: string;
  alertLevel: string;
  warningSignal: string;
  communicationCapability: string;
}

interface HazardProneArea {
  barangay: string;
  purok: string;
  householdName: string;
  familyMembers: number;
  evacuationArea: string;
  elderly: number;
  pwd: number;
  women: number;
  pregnant: number;
  infant: number;
  children: number;
  evacuationAddress: string;
  contactPerson: string;
}

const barangays = [
  "Bonifacio",
  "Bugang Norte",
  "Bugang Sur",
  "Cabacnitan",
  "Cambigsi",
  "Campagao",
  "Cansumbol",
  "Dagohoy",
  "Owac",
  "Poblacion",
  "Quezon",
  "Riverside",
  "Rizal",
  "Roxas",
  "Subayon",
  "Villa Aurora",
  "Villa Suerte",
  "Yanaya",
  "Zamora",
];

const earlyWarningSystems: EarlyWarningSystem[] = [
  {
    barangay: "Poblacion",
    hazardType: "flood",
    warningStation: "Barangay Hall",
    warningDevice: "Siren, Megaphone",
    alertLevel: "Rising water level at Loboc River",
    warningSignal: "Continuous siren for 30 seconds",
    communicationCapability: "VHF Radio, Mobile phones",
  },
  {
    barangay: "Riverside",
    hazardType: "flood",
    warningStation: "Barangay Outpost",
    warningDevice: "Bell, Megaphone",
    alertLevel: "Rising water level at monitoring stations",
    warningSignal: "Continuous bell ringing",
    communicationCapability: "VHF Radio, Mobile phones",
  },
  {
    barangay: "Cambigsi",
    hazardType: "landslide",
    warningStation: "Barangay Hall",
    warningDevice: "Siren, Megaphone",
    alertLevel: "Continuous heavy rainfall for 24 hours",
    warningSignal: "Three short siren blasts",
    communicationCapability: "VHF Radio, Mobile phones",
  },
  {
    barangay: "Zamora",
    hazardType: "typhoon",
    warningStation: "Barangay Hall",
    warningDevice: "Siren, Radio",
    alertLevel: "PAGASA Typhoon Signal",
    warningSignal: "Long siren blast",
    communicationCapability: "VHF Radio, Mobile phones, Satellite phone",
  },
  {
    barangay: "Dagohoy",
    hazardType: "earthquake",
    warningStation: "Barangay Hall",
    warningDevice: "Siren, Bell",
    alertLevel: "PHIVOLCS Alert",
    warningSignal: "Alternating siren and bell",
    communicationCapability: "VHF Radio, Mobile phones",
  },
  {
    barangay: "Bugang Norte",
    hazardType: "flood",
    warningStation: "Barangay Outpost",
    warningDevice: "Megaphone, Whistle",
    alertLevel: "Rising water level at creek",
    warningSignal: "Continuous whistle blowing",
    communicationCapability: "Mobile phones",
  },
  {
    barangay: "Roxas",
    hazardType: "landslide",
    warningStation: "Barangay Hall",
    warningDevice: "Siren, Bell",
    alertLevel: "Soil saturation after heavy rainfall",
    warningSignal: "Alternating siren and bell",
    communicationCapability: "VHF Radio, Mobile phones",
  },
  {
    barangay: "Villa Aurora",
    hazardType: "typhoon",
    warningStation: "Barangay Hall",
    warningDevice: "Siren, Radio",
    alertLevel: "PAGASA Typhoon Signal",
    warningSignal: "Long siren blast",
    communicationCapability: "VHF Radio, Mobile phones",
  },
];

const hazardProneAreas: HazardProneArea[] = [
  {
    barangay: "Riverside",
    purok: "Purok 1",
    householdName: "Santos Family",
    familyMembers: 5,
    evacuationArea: "Riverside Elementary School",
    elderly: 1,
    pwd: 0,
    women: 2,
    pregnant: 0,
    infant: 1,
    children: 1,
    evacuationAddress: "Riverside Road, Bilar",
    contactPerson: "Juan Santos (0917-123-4567)",
  },
  {
    barangay: "Poblacion",
    purok: "Purok 3",
    householdName: "Reyes Family",
    familyMembers: 6,
    evacuationArea: "Bilar Municipal Gymnasium",
    elderly: 2,
    pwd: 1,
    women: 2,
    pregnant: 1,
    infant: 0,
    children: 1,
    evacuationAddress: "Town Center, Bilar",
    contactPerson: "Maria Reyes (0918-765-4321)",
  },
  {
    barangay: "Cambigsi",
    purok: "Purok 2",
    householdName: "Garcia Family",
    familyMembers: 4,
    evacuationArea: "Cambigsi Barangay Hall",
    elderly: 0,
    pwd: 0,
    women: 2,
    pregnant: 0,
    infant: 1,
    children: 1,
    evacuationAddress: "Cambigsi Main Road, Bilar",
    contactPerson: "Pedro Garcia (0919-876-5432)",
  },
  {
    barangay: "Zamora",
    purok: "Purok 4",
    householdName: "Cruz Family",
    familyMembers: 7,
    evacuationArea: "Zamora Elementary School",
    elderly: 2,
    pwd: 1,
    women: 3,
    pregnant: 0,
    infant: 0,
    children: 2,
    evacuationAddress: "Zamora Road, Bilar",
    contactPerson: "Ana Cruz (0920-987-6543)",
  },
  {
    barangay: "Bugang Norte",
    purok: "Purok 1",
    householdName: "Mendoza Family",
    familyMembers: 5,
    evacuationArea: "Bugang Norte Barangay Hall",
    elderly: 1,
    pwd: 0,
    women: 2,
    pregnant: 1,
    infant: 1,
    children: 1,
    evacuationAddress: "Bugang Norte Main Road, Bilar",
    contactPerson: "Jose Mendoza (0921-098-7654)",
  },
];

const AlertSystem = () => {
  const { isLoggedIn = false } = useAuth();
  const [selectedBarangay, setSelectedBarangay] = useState<string>("");
  const [selectedHazardType, setSelectedHazardType] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeAlerts, setActiveAlerts] = useState<boolean>(true);

  const filteredEWS = earlyWarningSystems.filter((ews) => {
    if (selectedBarangay && ews.barangay !== selectedBarangay) return false;
    if (selectedHazardType && ews.hazardType !== selectedHazardType)
      return false;
    if (
      searchTerm &&
      !(
        ews.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ews.hazardType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ews.warningStation.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
      return false;
    return true;
  });

  const filteredHazardAreas = hazardProneAreas.filter((area) => {
    if (selectedBarangay && area.barangay !== selectedBarangay) return false;
    if (
      searchTerm &&
      !(
        area.barangay.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.purok.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.householdName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        area.evacuationArea.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
      return false;
    return true;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleActiveAlerts = () => {
    setActiveAlerts(!activeAlerts);
  };

  const getHazardIcon = (type: string) => {
    switch (type) {
      case "flood":
        return <Droplet className="h-4 w-4 text-blue-500" />;
      case "typhoon":
        return <Wind className="h-4 w-4 text-teal-500" />;
      case "landslide":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "earthquake":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Alert System | L.I.G.T.A.S.</title>
        <meta
          name="description"
          content="Early warning systems and hazard-prone areas in Bilar"
        />
      </Helmet>

      {/* Header */}
      <Header isLoggedIn={isLoggedIn} />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Alert System</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className={activeAlerts ? "bg-green-50" : ""}
                onClick={toggleActiveAlerts}
              >
                <Bell className="mr-2 h-4 w-4" />
                {activeAlerts ? "Active Alerts" : "All Alerts"}
              </Button>
              <Button variant="default" className="bg-red-600 hover:bg-red-700">
                <Bell className="mr-2 h-4 w-4" />
                Subscribe to Alerts
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                  Early Warning Systems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  View the early warning systems deployed across different
                  barangays in Bilar for various hazard types.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Droplet className="h-5 w-5 text-blue-500 mr-2" />
                  Flood-Prone Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Identify flood-prone areas and the households at risk during
                  heavy rainfall and flooding events.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  Landslide-Prone Areas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  View areas susceptible to landslides and the households that
                  need to be evacuated during heavy rainfall.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Barangay
                </label>
                <Select
                  value={selectedBarangay}
                  onValueChange={setSelectedBarangay}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Barangays" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Barangays</SelectItem>
                    {barangays.map((barangay) => (
                      <SelectItem key={barangay} value={barangay}>
                        {barangay}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">
                  Hazard Type
                </label>
                <Select
                  value={selectedHazardType}
                  onValueChange={setSelectedHazardType}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Hazard Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Hazard Types</SelectItem>
                    <SelectItem value="flood">Flood</SelectItem>
                    <SelectItem value="typhoon">Typhoon</SelectItem>
                    <SelectItem value="landslide">Landslide</SelectItem>
                    <SelectItem value="earthquake">Earthquake</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Search</label>
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <Tabs defaultValue="ews">
              <TabsList className="mb-4">
                <TabsTrigger value="ews">Early Warning Systems</TabsTrigger>
                <TabsTrigger value="hazard-areas">
                  Hazard-Prone Areas
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ews">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Barangay</TableHead>
                        <TableHead>Hazard Type</TableHead>
                        <TableHead>Warning Station</TableHead>
                        <TableHead>Warning Device</TableHead>
                        <TableHead>Alert Level/Trigger</TableHead>
                        <TableHead>Warning Signal</TableHead>
                        <TableHead>Communication Capability</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEWS.length > 0 ? (
                        filteredEWS.map((ews, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {ews.barangay}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getHazardIcon(ews.hazardType)}
                                <span className="capitalize">
                                  {ews.hazardType}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{ews.warningStation}</TableCell>
                            <TableCell>{ews.warningDevice}</TableCell>
                            <TableCell>{ews.alertLevel}</TableCell>
                            <TableCell>{ews.warningSignal}</TableCell>
                            <TableCell>{ews.communicationCapability}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
                            No early warning systems found for the selected
                            filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="hazard-areas">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Barangay</TableHead>
                        <TableHead>Purok</TableHead>
                        <TableHead>Household</TableHead>
                        <TableHead>Family Members</TableHead>
                        <TableHead>Vulnerable</TableHead>
                        <TableHead>Evacuation Area</TableHead>
                        <TableHead>Contact Person</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHazardAreas.length > 0 ? (
                        filteredHazardAreas.map((area, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {area.barangay}
                            </TableCell>
                            <TableCell>{area.purok}</TableCell>
                            <TableCell>{area.householdName}</TableCell>
                            <TableCell>{area.familyMembers}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {area.elderly > 0 && (
                                  <Badge
                                    variant="outline"
                                    className="bg-gray-100"
                                  >
                                    Elderly: {area.elderly}
                                  </Badge>
                                )}
                                {area.pwd > 0 && (
                                  <Badge
                                    variant="outline"
                                    className="bg-purple-100"
                                  >
                                    PWD: {area.pwd}
                                  </Badge>
                                )}
                                {area.pregnant > 0 && (
                                  <Badge
                                    variant="outline"
                                    className="bg-pink-100"
                                  >
                                    Pregnant: {area.pregnant}
                                  </Badge>
                                )}
                                {area.infant > 0 && (
                                  <Badge
                                    variant="outline"
                                    className="bg-blue-100"
                                  >
                                    Infant: {area.infant}
                                  </Badge>
                                )}
                                {area.children > 0 && (
                                  <Badge
                                    variant="outline"
                                    className="bg-green-100"
                                  >
                                    Children: {area.children}
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{area.evacuationArea}</TableCell>
                            <TableCell>{area.contactPerson}</TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-4">
                            No hazard-prone areas found for the selected
                            filters.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mb-8">
            <AlertsWidget maxAlerts={5} showViewAll={true} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AlertSystem;
