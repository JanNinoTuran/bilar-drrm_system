import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Home,
  AlertTriangle,
  TrendingUp,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

interface PopulationStatisticsProps {
  location?: string;
  totalPopulation?: number;
  affectedPopulation?: number;
  evacuees?: number;
  shelterCapacity?: number;
  shelterOccupancy?: number;
  riskCategories?: Array<{ name: string; count: number; percentage: number }>;
}

interface BarangayData {
  name: string;
  population: number;
  households: number;
  maleCount: number;
  femaleCount: number;
  seniorCount: number;
  childrenCount: number;
  residents: ResidentData[];
}

interface ResidentData {
  lastName: string;
  firstName: string;
  middleName: string;
  extension: string;
  relationToHousehold: string;
  birthday: string;
  sex: "Male" | "Female";
  civilStatus: string;
  age: number;
  street: string;
}

const barangays: BarangayData[] = [
  {
    name: "Bonifacio",
    population: 2450,
    households: 612,
    maleCount: 1230,
    femaleCount: 1220,
    seniorCount: 320,
    childrenCount: 580,
    residents: [
      {
        lastName: "Santos",
        firstName: "Juan",
        middleName: "Reyes",
        extension: "",
        relationToHousehold: "Head",
        birthday: "15/06/1975",
        sex: "Male",
        civilStatus: "Married",
        age: 48,
        street: "Rizal Street",
      },
      {
        lastName: "Santos",
        firstName: "Maria",
        middleName: "Cruz",
        extension: "",
        relationToHousehold: "Spouse",
        birthday: "23/09/1978",
        sex: "Female",
        civilStatus: "Married",
        age: 45,
        street: "Rizal Street",
      },
    ],
  },
  {
    name: "Bugang Norte",
    population: 1850,
    households: 463,
    maleCount: 920,
    femaleCount: 930,
    seniorCount: 240,
    childrenCount: 410,
    residents: [
      {
        lastName: "Reyes",
        firstName: "Pedro",
        middleName: "Garcia",
        extension: "",
        relationToHousehold: "Head",
        birthday: "12/03/1980",
        sex: "Male",
        civilStatus: "Married",
        age: 43,
        street: "Mabini Street",
      },
      {
        lastName: "Reyes",
        firstName: "Ana",
        middleName: "Lim",
        extension: "",
        relationToHousehold: "Spouse",
        birthday: "05/11/1982",
        sex: "Female",
        civilStatus: "Married",
        age: 41,
        street: "Mabini Street",
      },
    ],
  },
  {
    name: "Bugang Sur",
    population: 1720,
    households: 430,
    maleCount: 850,
    femaleCount: 870,
    seniorCount: 220,
    childrenCount: 380,
    residents: [
      {
        lastName: "Garcia",
        firstName: "Jose",
        middleName: "Tan",
        extension: "",
        relationToHousehold: "Head",
        birthday: "18/07/1972",
        sex: "Male",
        civilStatus: "Married",
        age: 51,
        street: "Bonifacio Street",
      },
    ],
  },
  {
    name: "Cabacnitan",
    population: 1950,
    households: 488,
    maleCount: 970,
    femaleCount: 980,
    seniorCount: 250,
    childrenCount: 430,
    residents: [],
  },
  {
    name: "Cambigsi",
    population: 2100,
    households: 525,
    maleCount: 1040,
    femaleCount: 1060,
    seniorCount: 270,
    childrenCount: 460,
    residents: [],
  },
  {
    name: "Campagao",
    population: 1830,
    households: 458,
    maleCount: 910,
    femaleCount: 920,
    seniorCount: 230,
    childrenCount: 400,
    residents: [],
  },
  {
    name: "Cansumbol",
    population: 1680,
    households: 420,
    maleCount: 830,
    femaleCount: 850,
    seniorCount: 210,
    childrenCount: 370,
    residents: [],
  },
  {
    name: "Dagohoy",
    population: 2200,
    households: 550,
    maleCount: 1090,
    femaleCount: 1110,
    seniorCount: 280,
    childrenCount: 480,
    residents: [],
  },
  {
    name: "Owac",
    population: 1750,
    households: 438,
    maleCount: 870,
    femaleCount: 880,
    seniorCount: 220,
    childrenCount: 390,
    residents: [],
  },
  {
    name: "Poblacion",
    population: 3200,
    households: 800,
    maleCount: 1580,
    femaleCount: 1620,
    seniorCount: 410,
    childrenCount: 700,
    residents: [],
  },
  {
    name: "Quezon",
    population: 1920,
    households: 480,
    maleCount: 950,
    femaleCount: 970,
    seniorCount: 240,
    childrenCount: 420,
    residents: [],
  },
  {
    name: "Riverside",
    population: 2050,
    households: 513,
    maleCount: 1020,
    femaleCount: 1030,
    seniorCount: 260,
    childrenCount: 450,
    residents: [],
  },
  {
    name: "Rizal",
    population: 1880,
    households: 470,
    maleCount: 930,
    femaleCount: 950,
    seniorCount: 240,
    childrenCount: 410,
    residents: [],
  },
  {
    name: "Roxas",
    population: 1970,
    households: 493,
    maleCount: 980,
    femaleCount: 990,
    seniorCount: 250,
    childrenCount: 430,
    residents: [],
  },
  {
    name: "Subayon",
    population: 1800,
    households: 450,
    maleCount: 890,
    femaleCount: 910,
    seniorCount: 230,
    childrenCount: 400,
    residents: [],
  },
  {
    name: "Villa Aurora",
    population: 2150,
    households: 538,
    maleCount: 1070,
    femaleCount: 1080,
    seniorCount: 270,
    childrenCount: 470,
    residents: [],
  },
  {
    name: "Villa Suerte",
    population: 1780,
    households: 445,
    maleCount: 880,
    femaleCount: 900,
    seniorCount: 230,
    childrenCount: 390,
    residents: [],
  },
  {
    name: "Yanaya",
    population: 1650,
    households: 413,
    maleCount: 820,
    femaleCount: 830,
    seniorCount: 210,
    childrenCount: 360,
    residents: [],
  },
  {
    name: "Zamora",
    population: 2020,
    households: 505,
    maleCount: 1000,
    femaleCount: 1020,
    seniorCount: 260,
    childrenCount: 440,
    residents: [],
  },
];

const PopulationStatistics: React.FC<PopulationStatisticsProps> = ({
  location = "Bilar, Bohol",
  totalPopulation = 38000,
  affectedPopulation = 5200,
  evacuees = 1250,
  shelterCapacity = 3000,
  shelterOccupancy = 1250,
  riskCategories = [
    { name: "High Risk", count: 4500, percentage: 11.8 },
    { name: "Medium Risk", count: 8500, percentage: 22.4 },
    { name: "Low Risk", count: 12000, percentage: 31.6 },
  ],
}) => {
  const [selectedBarangay, setSelectedBarangay] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("overview");

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const getPercentage = (part: number, total: number) => {
    return ((part / total) * 100).toFixed(1);
  };

  const calculateTotalPopulation = () => {
    return barangays.reduce(
      (total, barangay) => total + barangay.population,
      0,
    );
  };

  const getSelectedBarangayData = () => {
    if (selectedBarangay === "all") {
      return null;
    }
    return barangays.find((b) => b.name === selectedBarangay);
  };

  const selectedData = getSelectedBarangayData();

  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Population Statistics
          </CardTitle>
          <Select value={selectedBarangay} onValueChange={setSelectedBarangay}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Barangay" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Barangays</SelectItem>
              {barangays.map((barangay) => (
                <SelectItem key={barangay.name} value={barangay.name}>
                  {barangay.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          {selectedData ? `${selectedData.name}, ${location}` : location}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="residents">Residents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Population Overview - Horizontal Layout */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">
                  Total Population
                </div>
                <div className="text-2xl font-bold">
                  {formatNumber(
                    selectedData ? selectedData.population : totalPopulation,
                  )}
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Households</div>
                <div className="text-2xl font-bold">
                  {formatNumber(
                    selectedData
                      ? selectedData.households
                      : barangays.reduce((sum, b) => sum + b.households, 0),
                  )}
                </div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Affected</div>
                <div className="text-2xl font-bold">
                  {formatNumber(
                    selectedData
                      ? Math.round(selectedData.population * 0.15)
                      : affectedPopulation,
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {getPercentage(
                    selectedData
                      ? Math.round(selectedData.population * 0.15)
                      : affectedPopulation,
                    selectedData ? selectedData.population : totalPopulation,
                  )}
                  % of total
                </div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Evacuees</div>
                <div className="text-2xl font-bold">
                  {formatNumber(
                    selectedData
                      ? Math.round(selectedData.population * 0.05)
                      : evacuees,
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {getPercentage(
                    selectedData
                      ? Math.round(selectedData.population * 0.05)
                      : evacuees,
                    selectedData ? selectedData.population : totalPopulation,
                  )}
                  % of total
                </div>
              </div>
            </div>

            {/* Shelter Capacity */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">
                    Evacuation Shelter Capacity
                  </span>
                </div>
                <Badge variant="outline" className="bg-blue-50">
                  {getPercentage(shelterOccupancy, shelterCapacity)}% Occupied
                </Badge>
              </div>
              <Progress
                value={(shelterOccupancy / shelterCapacity) * 100}
                className="h-2"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Current: {formatNumber(shelterOccupancy)}</span>
                <span>Capacity: {formatNumber(shelterCapacity)}</span>
              </div>
            </div>

            {/* Risk Categories */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Population by Risk Level</span>
              </div>
              <div className="space-y-3">
                {riskCategories.map((category, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">{category.name}</span>
                      <span className="text-sm text-gray-500">
                        {formatNumber(
                          selectedData
                            ? Math.round(
                                (selectedData.population *
                                  category.percentage) /
                                  100,
                              )
                            : category.count,
                        )}
                        ({category.percentage}%)
                      </span>
                    </div>
                    <Progress
                      value={category.percentage}
                      className={`h-2 ${index === 0 ? "bg-red-100" : index === 1 ? "bg-yellow-100" : "bg-blue-100"}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Trend */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-medium">Population Trend</span>
              </div>
              <div className="text-sm text-gray-600">
                <p>Evacuation rate has decreased by 5% in the last 24 hours.</p>
                <p className="mt-1">
                  Expected return rate: 15% within 48 hours.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Gender Distribution */}
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-3">
                  Gender Distribution
                </h3>
                <div className="flex items-center justify-center h-48">
                  <div className="w-full max-w-xs">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Male</span>
                      <span className="text-sm text-gray-500">
                        {selectedData
                          ? formatNumber(selectedData.maleCount)
                          : formatNumber(
                              barangays.reduce(
                                (sum, b) => sum + b.maleCount,
                                0,
                              ),
                            )}
                      </span>
                    </div>
                    <Progress
                      value={
                        selectedData
                          ? (selectedData.maleCount / selectedData.population) *
                            100
                          : 49.5
                      }
                      className="h-8 bg-blue-100"
                    />

                    <div className="flex justify-between mb-2 mt-4">
                      <span className="text-sm font-medium">Female</span>
                      <span className="text-sm text-gray-500">
                        {selectedData
                          ? formatNumber(selectedData.femaleCount)
                          : formatNumber(
                              barangays.reduce(
                                (sum, b) => sum + b.femaleCount,
                                0,
                              ),
                            )}
                      </span>
                    </div>
                    <Progress
                      value={
                        selectedData
                          ? (selectedData.femaleCount /
                              selectedData.population) *
                            100
                          : 50.5
                      }
                      className="h-8 bg-pink-100"
                    />
                  </div>
                </div>
              </div>

              {/* Age Distribution */}
              <div className="bg-white p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-3">Age Distribution</h3>
                <div className="flex items-center justify-center h-48">
                  <div className="w-full max-w-xs">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">
                        Children (0-14)
                      </span>
                      <span className="text-sm text-gray-500">
                        {selectedData
                          ? formatNumber(selectedData.childrenCount)
                          : formatNumber(
                              barangays.reduce(
                                (sum, b) => sum + b.childrenCount,
                                0,
                              ),
                            )}
                      </span>
                    </div>
                    <Progress
                      value={
                        selectedData
                          ? (selectedData.childrenCount /
                              selectedData.population) *
                            100
                          : 22
                      }
                      className="h-5 bg-green-100"
                    />

                    <div className="flex justify-between mb-2 mt-3">
                      <span className="text-sm font-medium">
                        Adults (15-59)
                      </span>
                      <span className="text-sm text-gray-500">
                        {selectedData
                          ? formatNumber(
                              selectedData.population -
                                selectedData.childrenCount -
                                selectedData.seniorCount,
                            )
                          : formatNumber(
                              barangays.reduce(
                                (sum, b) =>
                                  sum +
                                  (b.population -
                                    b.childrenCount -
                                    b.seniorCount),
                                0,
                              ),
                            )}
                      </span>
                    </div>
                    <Progress
                      value={
                        selectedData
                          ? ((selectedData.population -
                              selectedData.childrenCount -
                              selectedData.seniorCount) /
                              selectedData.population) *
                            100
                          : 65
                      }
                      className="h-5 bg-blue-100"
                    />

                    <div className="flex justify-between mb-2 mt-3">
                      <span className="text-sm font-medium">Seniors (60+)</span>
                      <span className="text-sm text-gray-500">
                        {selectedData
                          ? formatNumber(selectedData.seniorCount)
                          : formatNumber(
                              barangays.reduce(
                                (sum, b) => sum + b.seniorCount,
                                0,
                              ),
                            )}
                      </span>
                    </div>
                    <Progress
                      value={
                        selectedData
                          ? (selectedData.seniorCount /
                              selectedData.population) *
                            100
                          : 13
                      }
                      className="h-5 bg-orange-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Barangay Population Comparison */}
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-lg font-medium mb-3">
                Barangay Population Comparison
              </h3>
              <div className="overflow-x-auto">
                <div className="min-w-full" style={{ height: "300px" }}>
                  <div className="flex h-full items-end">
                    {barangays.map((barangay) => (
                      <div
                        key={barangay.name}
                        className="flex flex-col items-center mx-1"
                        style={{ width: `${100 / barangays.length}%` }}
                      >
                        <div
                          className={`w-full ${selectedBarangay === barangay.name ? "bg-blue-600" : "bg-blue-400"} rounded-t`}
                          style={{
                            height: `${(barangay.population / 3200) * 100}%`,
                          }}
                        ></div>
                        <div className="text-xs mt-1 transform -rotate-45 origin-top-left whitespace-nowrap">
                          {barangay.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="residents" className="space-y-4">
            {selectedBarangay === "all" ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-700">
                  Please select a specific barangay
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Resident data is available at the barangay level
                </p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    {selectedData?.name} Residents
                  </h3>
                  <Badge variant="outline">
                    {selectedData?.residents.length || 0} Records
                  </Badge>
                </div>

                {selectedData?.residents &&
                selectedData.residents.length > 0 ? (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Street</TableHead>
                          <TableHead>Last Name</TableHead>
                          <TableHead>First Name</TableHead>
                          <TableHead>Middle Name</TableHead>
                          <TableHead>Ext</TableHead>
                          <TableHead>Rel HH</TableHead>
                          <TableHead>Birthday</TableHead>
                          <TableHead>Sex</TableHead>
                          <TableHead>Civil Status</TableHead>
                          <TableHead>Age</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedData.residents.map((resident, index) => (
                          <TableRow key={index}>
                            <TableCell>{resident.street}</TableCell>
                            <TableCell className="font-medium">
                              {resident.lastName}
                            </TableCell>
                            <TableCell>{resident.firstName}</TableCell>
                            <TableCell>{resident.middleName}</TableCell>
                            <TableCell>{resident.extension}</TableCell>
                            <TableCell>
                              {resident.relationToHousehold}
                            </TableCell>
                            <TableCell>{resident.birthday}</TableCell>
                            <TableCell>{resident.sex}</TableCell>
                            <TableCell>{resident.civilStatus}</TableCell>
                            <TableCell>{resident.age}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">
                      No resident records available for this barangay
                    </p>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PopulationStatistics;
