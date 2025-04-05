import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  CheckCircle,
  Smartphone,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface MobileReport {
  id: string;
  reportType: string;
  location: string;
  description: string;
  imageUrl?: string;
  timestamp: string;
  status: "pending" | "reviewing" | "resolved";
  userId?: string;
  userName?: string;
}

const ReportsPage = () => {
  const [reports, setReports] = useState<MobileReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/reports" } });
    }
  }, [isLoggedIn, navigate]);

  // Fetch reports from mobile app
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    setError("");

    try {
      // In a real implementation, you would fetch data from your API
      // For now, we'll simulate fetching data
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock data for demonstration
      const mockReports: MobileReport[] = [
        {
          id: "rep-001",
          reportType: "flood",
          location: "Bilar Central, Near Municipal Hall",
          description:
            "Flash flooding after heavy rain. Water level rising quickly. Several houses affected.",
          imageUrl:
            "https://images.unsplash.com/photo-1547683905-f686c993aae5?w=800&q=80",
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          status: "reviewing",
          userId: "user123",
          userName: "Juan Dela Cruz",
        },
        {
          id: "rep-002",
          reportType: "landslide",
          location: "Zamora Road, 2km from town center",
          description:
            "Small landslide blocking half the road. Vehicles can still pass but with caution.",
          imageUrl:
            "https://images.unsplash.com/photo-1626248801379-51a0748e0dfa?w=800&q=80",
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          status: "pending",
          userId: "user456",
          userName: "Maria Santos",
        },
        {
          id: "rep-003",
          reportType: "power-outage",
          location: "Barangay Poblacion",
          description:
            "Power lines down after strong winds. Entire barangay affected.",
          timestamp: new Date(Date.now() - 10800000).toISOString(),
          status: "resolved",
          userId: "user789",
          userName: "Pedro Reyes",
        },
      ];

      setReports(mockReports);
      setIsSuccess(true);

      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError("Failed to fetch reports. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800">
            Pending
          </span>
        );
      case "reviewing":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            Reviewing
          </span>
        );
      case "resolved":
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Resolved
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="container mx-auto py-24 px-4 max-w-4xl bg-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Mobile App Reports
          </h1>
          <p className="text-gray-600">
            View and manage incident reports submitted from the mobile app.
          </p>
        </div>
        <Button
          onClick={fetchReports}
          variant="outline"
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {isSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-start">
          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-green-800">
              Reports Loaded Successfully
            </h3>
            <p className="text-green-700 text-sm">
              The latest reports from the mobile app have been loaded.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-red-800">Error Loading Reports</h3>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      <Card className="bg-white shadow-md mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Mobile App Reports
          </CardTitle>
          <CardDescription>
            Reports submitted by users through the L.I.G.T.A.S. mobile
            application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <RefreshCw className="h-8 w-8 text-blue-500 animate-spin" />
              <span className="ml-3 text-blue-500">Loading reports...</span>
            </div>
          ) : reports.length > 0 ? (
            <div className="space-y-6">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {report.reportType.charAt(0).toUpperCase() +
                          report.reportType.slice(1).replace("-", " ")}
                      </h3>
                      <p className="text-sm text-gray-500">{report.location}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(report.status)}
                      <span className="text-xs text-gray-500">
                        {formatDate(report.timestamp)}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex gap-4">
                    {report.imageUrl && (
                      <div className="flex-shrink-0">
                        <img
                          src={report.imageUrl}
                          alt="Report image"
                          className="w-32 h-32 object-cover rounded-md"
                        />
                      </div>
                    )}
                    <div className="flex-grow">
                      <p className="text-gray-700 mb-3">{report.description}</p>
                      <div className="text-sm text-gray-500">
                        Reported by: {report.userName || "Anonymous User"}
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 border-t flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="default" size="sm">
                      Update Status
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No reports have been submitted yet.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start text-xs text-gray-500 pt-0">
          <p>
            Reports are automatically received from the L.I.G.T.A.S. mobile
            application.
          </p>
          <p>
            For immediate life-threatening emergencies, please call emergency
            services directly.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReportsPage;
