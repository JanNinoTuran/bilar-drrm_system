import React, { useState } from "react";
import Footer from "./layout/Footer";
import HeroSection from "./home/HeroSection";
import FeatureGrid from "./home/FeatureGrid";
import AlertsWidget from "./alerts/AlertsWidget";
import MapPreview from "./map/MapPreview";
import EmergencyContactsWidget from "./resources/EmergencyContactsWidget";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, LogIn, UserPlus, MapPin, Bell } from "lucide-react";

const Home: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation Bar */}
      <div className="bg-white shadow-sm py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-4 rounded-md mr-4">
              <img
                src="src/components/images/Ligtas.png"
                alt="L.I.G.T.A.S. Logo"
                className="h-10 w-10"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-blue-800">
                L.I.G.T.A.S.
              </h1>
              <p className="text-sm md:text-base text-gray-800 -mt-1">
                (Localized Information and Governance for Tracking and Alerting
                Settlers)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div
              className={`transition-all duration-300 overflow-hidden ${isSearchOpen ? "w-64" : "w-0"}`}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 text-sm"
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center"
              asChild
            >
              <a href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        {/* Feature Grid */}
        <section className="py-12">
          <FeatureGrid />
        </section>
        {/* Community Preparedness Section */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Community Preparedness
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                  Disaster Awareness Map
                </h3>
                <p className="text-gray-600 mb-4">
                  Access our interactive map to view evacuation routes, safe
                  zones, and emergency facilities in your area.
                </p>
                <MapPreview />
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Bell className="h-5 w-5 text-red-600 mr-2" />
                  Stay Informed
                </h3>
                <p className="text-gray-600 mb-4">
                  Get timely alerts and updates about potential hazards and
                  emergency situations.
                </p>
                <AlertsWidget />
              </div>
            </div>
          </div>
        </section>
        {/* Emergency Contacts Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Emergency Resources
            </h2>
            <EmergencyContactsWidget />
          </div>
        </section>
        {/* Call to Action Section */}
        <section className="py-2 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Be Prepared, Stay Safe</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join our community and get access to personalized alerts,
              emergency guides, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center"></div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
