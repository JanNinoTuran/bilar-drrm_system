import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Printer,
  Share2,
  BookOpen,
  AlertTriangle,
  Shield,
  Home,
  Wind,
  Waves,
  Flame,
} from "lucide-react";

const EmergencyGuides: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Emergency Guides | L.I.G.T.A.S.</title>
        <meta
          name="description"
          content="Step-by-step emergency preparedness guides and checklists for various disaster scenarios"
        />
      </Helmet>

      {/* Header */}
      <Header isLoggedIn={true} onProfileClick={() => setShowSidebar(true)} />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">
              Emergency Preparedness Guides
            </h1>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>

          <Tabs defaultValue="typhoon" className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="typhoon" className="flex items-center gap-2">
                <Wind className="h-4 w-4" />
                Typhoon
              </TabsTrigger>
              <TabsTrigger value="flood" className="flex items-center gap-2">
                <Waves className="h-4 w-4" />
                Flood
              </TabsTrigger>
              <TabsTrigger
                value="earthquake"
                className="flex items-center gap-2"
              >
                <AlertTriangle className="h-4 w-4" />
                Earthquake
              </TabsTrigger>
              <TabsTrigger value="fire" className="flex items-center gap-2">
                <Flame className="h-4 w-4" />
                Fire
              </TabsTrigger>
            </TabsList>

            {/* Typhoon Guide */}
            <TabsContent value="typhoon" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-blue-600" />
                    Typhoon Preparedness Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Before a Typhoon
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Monitor weather updates and typhoon warnings from
                          PAGASA
                        </li>
                        <li>
                          Secure your home by reinforcing windows and doors
                        </li>
                        <li>
                          Trim trees and branches that could fall on your house
                        </li>
                        <li>
                          Prepare an emergency kit with food, water, medicine,
                          and important documents
                        </li>
                        <li>Know your evacuation plan and routes</li>
                        <li>Charge your phones and power banks</li>
                        <li>Store enough food and water for at least 3 days</li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        During a Typhoon
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Stay indoors and away from windows</li>
                        <li>
                          Turn off main power if there is flooding or risk of
                          electrical damage
                        </li>
                        <li>Keep monitoring emergency broadcasts</li>
                        <li>
                          If evacuation is ordered, follow instructions
                          immediately
                        </li>
                        <li>
                          Move to the strongest part of your house if unable to
                          evacuate
                        </li>
                        <li>Keep your emergency kit with you at all times</li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        After a Typhoon
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Check for injuries and provide first aid if needed
                        </li>
                        <li>
                          Be cautious of damaged structures, fallen power lines,
                          and flooding
                        </li>
                        <li>
                          Do not wade through floodwaters as they may be
                          contaminated
                        </li>
                        <li>
                          Check your water and food supplies for contamination
                        </li>
                        <li>Report damaged utility lines to authorities</li>
                        <li>
                          Help neighbors, especially the elderly and those with
                          disabilities
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Checklist
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-blue-600" />
                    Evacuation Guidelines for Typhoon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      When evacuation is necessary during a typhoon, follow
                      these guidelines:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        Evacuate immediately when advised by local authorities
                      </li>
                      <li>Follow designated evacuation routes</li>
                      <li>Bring your emergency kit and important documents</li>
                      <li>Wear appropriate clothing and sturdy shoes</li>
                      <li>If possible, turn off utilities before leaving</li>
                      <li>Lock your home when leaving</li>
                      <li>Register at evacuation centers upon arrival</li>
                    </ul>
                    <div className="bg-blue-50 p-4 rounded-md mt-4">
                      <h4 className="font-semibold text-blue-700 mb-2">
                        Evacuation Centers in Bilar
                      </h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Bilar Central Elementary School</li>
                        <li>Bilar National High School</li>
                        <li>Bilar Municipal Gymnasium</li>
                        <li>Zamora Barangay Hall</li>
                        <li>Riverside Barangay Hall</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Flood Guide */}
            <TabsContent value="flood" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Waves className="h-5 w-5 text-blue-600" />
                    Flood Preparedness Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Before a Flood
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Know if your area is prone to flooding</li>
                        <li>
                          Prepare an emergency kit with food, water, medicine,
                          and important documents
                        </li>
                        <li>
                          Keep important documents in waterproof containers
                        </li>
                        <li>
                          Learn the safest route to high ground from your home
                          and workplace
                        </li>
                        <li>Clear drains and gutters around your property</li>
                        <li>Move valuable items to higher levels</li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        During a Flood
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Move to higher ground immediately if flooding occurs
                        </li>
                        <li>Do not walk, swim, or drive through floodwaters</li>
                        <li>Stay off bridges over fast-moving water</li>
                        <li>
                          Disconnect electrical appliances if safe to do so
                        </li>
                        <li>Follow evacuation orders promptly</li>
                        <li>
                          If trapped, call for help and move to the highest
                          level of the building
                        </li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        After a Flood
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Return home only when authorities say it is safe
                        </li>
                        <li>Avoid floodwaters as they may be contaminated</li>
                        <li>
                          Do not use water that may be contaminated for
                          drinking, cooking, or cleaning
                        </li>
                        <li>
                          Discard food that has come into contact with
                          floodwater
                        </li>
                        <li>Clean and disinfect everything that got wet</li>
                        <li>
                          Be aware of areas where floodwaters have receded as
                          roads may be weakened
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Checklist
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Earthquake Guide */}
            <TabsContent value="earthquake" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Earthquake Preparedness Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Before an Earthquake
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Secure heavy furniture and appliances to walls</li>
                        <li>
                          Know the safe spots in each room: under sturdy tables,
                          against interior walls
                        </li>
                        <li>
                          Prepare an emergency kit with food, water, medicine,
                          and important documents
                        </li>
                        <li>
                          Identify safe evacuation routes and meeting places
                        </li>
                        <li>
                          Learn how to turn off gas, water, and electricity
                        </li>
                        <li>Practice earthquake drills with your family</li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        During an Earthquake
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          DROP to the ground, COVER your head and neck, and HOLD
                          ON to your shelter
                        </li>
                        <li>
                          If indoors, stay away from glass, windows, outside
                          doors, and walls
                        </li>
                        <li>
                          If outdoors, move to an open area away from buildings,
                          trees, and power lines
                        </li>
                        <li>
                          If in a vehicle, pull over to a clear location and
                          stop
                        </li>
                        <li>Stay where you are until the shaking stops</li>
                        <li>Be prepared for aftershocks</li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        After an Earthquake
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Check yourself and others for injuries</li>
                        <li>Look for and extinguish small fires</li>
                        <li>
                          Inspect your home for damage, especially gas leaks and
                          electrical system damage
                        </li>
                        <li>
                          Stay away from damaged areas and fallen power lines
                        </li>
                        <li>Be prepared for aftershocks</li>
                        <li>
                          Listen to a battery-operated radio for emergency
                          information
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Checklist
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fire Guide */}
            <TabsContent value="fire" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-red-600" />
                    Fire Safety Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Fire Prevention
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Install smoke alarms on every level of your home
                        </li>
                        <li>
                          Test smoke alarms monthly and replace batteries
                          annually
                        </li>
                        <li>Keep flammable items away from heat sources</li>
                        <li>Never leave cooking unattended</li>
                        <li>
                          Keep matches and lighters out of reach of children
                        </li>
                        <li>
                          Inspect electrical cords and replace any that are
                          damaged
                        </li>
                        <li>Have a fire extinguisher and know how to use it</li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        During a Fire
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Alert everyone in the house and get out immediately
                        </li>
                        <li>If you see smoke, stay low to the ground</li>
                        <li>
                          Feel doors before opening them - if hot, use another
                          exit
                        </li>
                        <li>If clothes catch fire: Stop, Drop, and Roll</li>
                        <li>
                          Once out, stay out - never go back into a burning
                          building
                        </li>
                        <li>Call emergency services from outside</li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        Fire Escape Plan
                      </h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>
                          Create a home fire escape plan with two ways out of
                          each room
                        </li>
                        <li>Designate a meeting place outside</li>
                        <li>Practice your escape plan at least twice a year</li>
                        <li>Teach children how to escape on their own</li>
                        <li>
                          Make sure everyone knows how to call emergency
                          services
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-between mt-6">
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Checklist
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EmergencyGuides;
