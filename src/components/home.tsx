import React, { useState } from "react";
import Footer from "./layout/Footer";
import HeroSection from "./home/HeroSection";
import FeatureGrid from "./home/FeatureGrid";
import AlertsWidget from "./alerts/AlertsWidget";
import DRRMNewsSection from "./home/DRRMNewsSection";
import EmergencyContactsWidget from "./resources/EmergencyContactsWidget";
import OpenWeatherWidget from "./weather/OpenWeatherWidget";
import MiniWeatherWidget from "./weather/MiniWeatherWidget";
import DisasterSafetyTipsCarousel from "./home/DisasterSafetyTipsCarousel";
import { Button } from "./ui/button";
import {
  LogIn,
  MapPin,
  Bell,
  X,
  AlertTriangle,
  MessageSquare,
  Info,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Home: React.FC = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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
            <MiniWeatherWidget lat={9.7177} lon={124.1146} city="Bilar" />
            <Popover
              open={isNotificationOpen}
              onOpenChange={setIsNotificationOpen}
            >
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <Tabs defaultValue="alerts" className="w-full">
                  <div className="flex items-center justify-between border-b px-3 py-2">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="alerts" className="text-xs">
                        Alerts
                      </TabsTrigger>
                      <TabsTrigger value="messages" className="text-xs">
                        Messages
                      </TabsTrigger>
                      <TabsTrigger value="notifications" className="text-xs">
                        Notifications
                      </TabsTrigger>
                    </TabsList>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsNotificationOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <TabsContent
                    value="alerts"
                    className="max-h-[400px] overflow-y-auto"
                  >
                    <div className="p-2">
                      <h3 className="text-sm font-medium mb-2">
                        Recent Alerts
                      </h3>
                      <div className="space-y-2">
                        <div className="p-2 bg-red-50 rounded-md border border-red-100">
                          <div className="flex gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">
                                Typhoon Warning
                              </h4>
                              <p className="text-xs text-gray-600">
                                Typhoon approaching with sustained winds of 150
                                kph. Expected landfall in 6 hours.
                              </p>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">
                                  2 hours ago
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-red-100 text-red-800"
                                >
                                  Critical
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-2 bg-yellow-50 rounded-md border border-yellow-100">
                          <div className="flex gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">
                                Flood Alert
                              </h4>
                              <p className="text-xs text-gray-600">
                                Rising water levels detected in Marikina River
                                Basin. Prepare for possible evacuation.
                              </p>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-xs text-gray-500">
                                  5 hours ago
                                </span>
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-yellow-100 text-yellow-800"
                                >
                                  High
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="link" size="sm" className="w-full mt-2">
                        View All Alerts
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="messages"
                    className="max-h-[400px] overflow-y-auto"
                  >
                    <div className="p-2">
                      <h3 className="text-sm font-medium mb-2">
                        Recent Messages
                      </h3>
                      <div className="space-y-2">
                        <div className="p-2 bg-blue-50 rounded-md border border-blue-100">
                          <div className="flex gap-2">
                            <MessageSquare className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">
                                DRRM Office
                              </h4>
                              <p className="text-xs text-gray-600">
                                Please update your emergency contact information
                                in your profile.
                              </p>
                              <span className="text-xs text-gray-500">
                                1 day ago
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="link" size="sm" className="w-full mt-2">
                        View All Messages
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent
                    value="notifications"
                    className="max-h-[400px] overflow-y-auto"
                  >
                    <div className="p-2">
                      <h3 className="text-sm font-medium mb-2">
                        Recent Notifications
                      </h3>
                      <div className="space-y-2">
                        <div className="p-2 bg-gray-50 rounded-md border border-gray-100">
                          <div className="flex gap-2">
                            <Info className="h-5 w-5 text-gray-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-sm font-medium">
                                System Update
                              </h4>
                              <p className="text-xs text-gray-600">
                                The system will undergo maintenance on June 15,
                                2023 from 2:00 AM to 4:00 AM.
                              </p>
                              <span className="text-xs text-gray-500">
                                3 days ago
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="link" size="sm" className="w-full mt-2">
                        View All Notifications
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </PopoverContent>
            </Popover>

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

        {/* Disaster Safety Tips Carousel */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <DisasterSafetyTipsCarousel />
          </div>
        </section>

        {/* DRRM News Section */}
        <DRRMNewsSection isAdmin={true} />

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
