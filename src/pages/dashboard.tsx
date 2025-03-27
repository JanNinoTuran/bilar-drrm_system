import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AlertsWidget from "@/components/alerts/AlertsWidget";
import MapPreview from "@/components/map/MapPreview";
import PopulationStatistics from "@/components/dashboard/PopulationStatistics";
import Sidebar from "@/components/dashboard/Sidebar";
import MiniWeatherWidget from "@/components/weather/MiniWeatherWidget";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user, isLoggedIn } = useAuth();

  // Redirect to login if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Get user's full name or default to email
  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.email.split("@")[0] || "User";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Dashboard | L.I.G.T.A.S.</title>
        <meta
          name="description"
          content="Your personal dashboard for disaster alerts, maps, and emergency resources"
        />
      </Helmet>

      {/* Header */}
      <Header isLoggedIn={true} onProfileClick={() => setShowSidebar(true)} />

      {/* Sidebar Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setShowSidebar(false)}
        >
          <div
            className="absolute top-0 right-0 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar onClose={() => setShowSidebar(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Location and Weather Banner */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="flex items-start gap-4 mb-4 md:mb-0">
                <div className="p-3 bg-blue-100 rounded-full">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">
                    {user?.location || "Bilar, Bohol, Philippines"}
                  </h2>
                  <p className="text-gray-600">
                    Current risk level:{" "}
                    <span className="text-yellow-600 font-medium">
                      Moderate
                    </span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Typhoon Season
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Flood Prone Area
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-end">
                <div className="text-right">
                  <div>
                    <MiniWeatherWidget
                      city={user?.location?.split(",")?.[0] || "Bilar"}
                      lat={9.7177}
                      lon={124.1146}
                      showDate={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">
                  Current Situation
                </h2>
                <div className="h-[400px] w-full rounded-md overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31544.037661609236!2d124.09460931953123!3d9.717699900000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aa26d7b3446c8d%3A0x8586d5613e8d9f0e!2sBilar%2C%20Bohol!5e0!3m2!1sen!2sph!4v1652345678901!5m2!1sen!2sph"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">Active Alerts</h2>
                <AlertsWidget maxAlerts={3} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold mb-4">
                  Population Statistics
                </h2>
                <PopulationStatistics
                  location={user?.location || "Bilar, Bohol"}
                />
              </div>
            </div>
          </div>

          <div className="mt-8" id="news-management">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">News Management</h2>
              {isLoggedIn && (
                <div className="mt-2">
                  {/* Import and use the NewsEditor component */}
                  {React.createElement(() => {
                    const NewsEditor = React.lazy(
                      () => import("@/components/home/NewsEditor"),
                    );
                    return (
                      <React.Suspense
                        fallback={<div>Loading News Editor...</div>}
                      >
                        <NewsEditor />
                      </React.Suspense>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
