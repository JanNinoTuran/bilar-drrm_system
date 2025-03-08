import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import InteractiveMap from "@/components/map/InteractiveMap";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Share2, Printer, MapPin, AlertTriangle } from "lucide-react";
import Sidebar from "@/components/dashboard/Sidebar";

interface MapPageProps {
  // Add any props if needed
}

const MapPage: React.FC<MapPageProps> = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Using Google Maps embed URLs for Bilar, Bohol (6317)
  const backgroundImages = [
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251553.7856972473!2d123.92864389453123!3d9.72770000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aa3c10dc0f13f5%3A0x94a06a6eb2e5408c!2sBilar%2C%20Bohol!5e0!3m2!1sen!2sph!4v1709686800367!5m2!1sen!2sph&z=10",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251553.7856972473!2d123.92864389453123!3d9.72770000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aa3c10dc0f13f5%3A0x94a06a6eb2e5408c!2sBilar%2C%20Bohol!5e1!3m2!1sen!2sph!4v1709686800367!5m2!1sen!2sph&z=10",
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251553.7856972473!2d123.92864389453123!3d9.72770000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aa3c10dc0f13f5%3A0x94a06a6eb2e5408c!2sBilar%2C%20Bohol!5e2!3m2!1sen!2sph!4v1709686800367!5m2!1sen!2sph&z=10",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Helmet>
        <title>Disaster Map | L.I.G.T.A.S.</title>
        <meta
          name="description"
          content="Interactive disaster risk map showing real-time alerts, evacuation centers, and risk zones"
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

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] bg-gray-900 overflow-hidden">
        {/* Background Maps with Overlay */}
        {backgroundImages.map((embedUrl, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
            }}
          >
            <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map view ${index + 1} of Bilar, Bohol (6317)`}
            ></iframe>
          </div>
        ))}

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Alert Badge */}
          <div className="mb-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-600/80 text-white text-sm font-medium">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span>Active Alerts in Your Area</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            Interactive Disaster Map
          </h1>

          {/* Description */}
          <p className="text-md md:text-lg text-gray-200 mb-4 max-w-3xl">
            View real-time disaster alerts, evacuation centers, and risk zones
            to stay informed and prepared
          </p>
        </div>
      </div>

      <main className="flex-1 flex flex-col">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Current Situation
            </h2>
            <p className="text-gray-600">
              Explore the map to view active alerts and emergency resources
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <Share2 className="mr-2 h-4 w-4" />
              Share Map
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Printer className="mr-2 h-4 w-4" />
              Print Map
            </Button>
          </div>
        </div>

        <div className="flex-1 w-full">
          <InteractiveMap />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MapPage;
