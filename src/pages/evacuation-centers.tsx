import React from "react";
import Header from "@/components/layout/Header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Users } from "lucide-react";

interface EvacuationCenter {
  id: number;
  name: string;
  location: string;
  capacity: number;
  currentOccupancy: number;
  facilities: string[];
  contactPerson: string;
  contactNumber: string;
  qrCodeUrl: string;
}

const evacuationCenters: EvacuationCenter[] = [
  {
    id: 1,
    name: "Bilar Municipal Gymnasium",
    location: "Poblacion, Bilar, Bohol",
    capacity: 500,
    currentOccupancy: 0,
    facilities: ["Restrooms", "Kitchen", "Medical Area", "Sleeping Area"],
    contactPerson: "Juan Dela Cruz",
    contactNumber: "09123456789",
    qrCodeUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=gym-qr",
  },
  {
    id: 2,
    name: "Bilar Central Elementary School",
    location: "Poblacion, Bilar, Bohol",
    capacity: 300,
    currentOccupancy: 0,
    facilities: ["Restrooms", "Classrooms", "Open Field"],
    contactPerson: "Maria Santos",
    contactNumber: "09187654321",
    qrCodeUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=school-qr",
  },
  {
    id: 3,
    name: "Zamora Barangay Hall",
    location: "Zamora, Bilar, Bohol",
    capacity: 150,
    currentOccupancy: 0,
    facilities: ["Restrooms", "Meeting Hall"],
    contactPerson: "Pedro Reyes",
    contactNumber: "09198765432",
    qrCodeUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=zamora-qr",
  },
  {
    id: 4,
    name: "Villa Aurora Barangay Hall",
    location: "Villa Aurora, Bilar, Bohol",
    capacity: 120,
    currentOccupancy: 0,
    facilities: ["Restrooms", "Meeting Hall", "Kitchen"],
    contactPerson: "Ana Lim",
    contactNumber: "09156789012",
    qrCodeUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=aurora-qr",
  },
  {
    id: 5,
    name: "Riverside Covered Court",
    location: "Riverside, Bilar, Bohol",
    capacity: 200,
    currentOccupancy: 0,
    facilities: ["Restrooms", "Open Area", "Covered Court"],
    contactPerson: "Roberto Garcia",
    contactNumber: "09167890123",
    qrCodeUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=riverside-qr",
  },
  {
    id: 6,
    name: "Bilar National High School",
    location: "Poblacion, Bilar, Bohol",
    capacity: 400,
    currentOccupancy: 0,
    facilities: ["Restrooms", "Classrooms", "Gymnasium", "Open Field"],
    contactPerson: "Elena Reyes",
    contactNumber: "09178901234",
    qrCodeUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=highschool-qr",
  },
];

const EvacuationCentersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto pt-24 pb-12 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Evacuation Centers
          </h1>
          <p className="text-gray-600">
            List of designated evacuation centers in Bilar, Bohol. Each center
            has a unique QR code that can be scanned using the L.I.G.T.A.S.
            mobile app to register evacuees during emergencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {evacuationCenters.map((center) => (
            <Card
              key={center.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="bg-blue-50 pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl text-blue-700">
                    {center.name}
                  </CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-blue-100 text-blue-800"
                  >
                    <Users className="h-3 w-3 mr-1" />
                    Capacity: {center.capacity}
                  </Badge>
                </div>
                <CardDescription>{center.location}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm text-gray-500 mb-1">
                      Facilities
                    </h4>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {center.facilities.map((facility, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {facility}
                        </Badge>
                      ))}
                    </div>

                    <h4 className="font-medium text-sm text-gray-500 mb-1">
                      Contact Information
                    </h4>
                    <p className="text-sm mb-1">{center.contactPerson}</p>
                    <p className="text-sm text-blue-600">
                      {center.contactNumber}
                    </p>

                    <div className="mt-3">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        <Users className="h-3 w-3 mr-1" />
                        Current Occupancy: {center.currentOccupancy}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="border border-gray-200 rounded-md p-1 bg-white">
                      <img
                        src={center.qrCodeUrl}
                        alt={`QR Code for ${center.name}`}
                        className="w-24 h-24"
                      />
                    </div>
                    <span className="text-xs text-gray-500 mt-1 flex items-center">
                      <QrCode className="h-3 w-3 mr-1" /> Scan with L.I.G.T.A.S.
                      app
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-lg font-medium text-blue-700 mb-2">
            About QR Code System
          </h3>
          <p className="text-gray-600 mb-3">
            The L.I.G.T.A.S. mobile application uses QR codes to track evacuees
            during emergency situations. Each evacuation center has a unique QR
            code that can be scanned by authorized personnel.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Scan the QR code using the L.I.G.T.A.S. mobile app</li>
            <li>Register evacuees by entering their information</li>
            <li>Track occupancy levels in real-time</li>
            <li>Generate reports on evacuation center usage</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EvacuationCentersPage;
