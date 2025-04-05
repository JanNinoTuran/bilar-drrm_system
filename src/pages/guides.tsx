import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { jsPDF } from "jspdf";
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
  CheckSquare,
} from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

const EmergencyGuides: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("typhoon");

  // Checklist items for each disaster type
  const [typhoonItems, setTyphoonItems] = useState<ChecklistItem[]>([
    {
      id: "typhoon-1",
      text: "Emergency food and water (3-day supply)",
      checked: false,
    },
    { id: "typhoon-2", text: "Flashlight and extra batteries", checked: false },
    { id: "typhoon-3", text: "First aid kit", checked: false },
    {
      id: "typhoon-4",
      text: "Battery-powered or hand-crank radio",
      checked: false,
    },
    { id: "typhoon-5", text: "Medications and medical items", checked: false },
    {
      id: "typhoon-6",
      text: "Important documents in waterproof container",
      checked: false,
    },
    { id: "typhoon-7", text: "Cash and coins", checked: false },
    { id: "typhoon-8", text: "Emergency contact information", checked: false },
    { id: "typhoon-9", text: "Whistle to signal for help", checked: false },
    {
      id: "typhoon-10",
      text: "Plastic sheeting and duct tape",
      checked: false,
    },
  ]);

  const [floodItems, setFloodItems] = useState<ChecklistItem[]>([
    {
      id: "flood-1",
      text: "Emergency food and water (3-day supply)",
      checked: false,
    },
    { id: "flood-2", text: "Waterproof clothing and boots", checked: false },
    { id: "flood-3", text: "First aid kit", checked: false },
    {
      id: "flood-4",
      text: "Battery-powered or hand-crank radio",
      checked: false,
    },
    { id: "flood-5", text: "Medications and medical items", checked: false },
    {
      id: "flood-6",
      text: "Important documents in waterproof container",
      checked: false,
    },
    { id: "flood-7", text: "Cash and coins", checked: false },
    { id: "flood-8", text: "Emergency contact information", checked: false },
    { id: "flood-9", text: "Whistle to signal for help", checked: false },
    { id: "flood-10", text: "Water purification tablets", checked: false },
  ]);

  const [earthquakeItems, setEarthquakeItems] = useState<ChecklistItem[]>([
    {
      id: "earthquake-1",
      text: "Emergency food and water (3-day supply)",
      checked: false,
    },
    {
      id: "earthquake-2",
      text: "Flashlight and extra batteries",
      checked: false,
    },
    { id: "earthquake-3", text: "First aid kit", checked: false },
    {
      id: "earthquake-4",
      text: "Battery-powered or hand-crank radio",
      checked: false,
    },
    {
      id: "earthquake-5",
      text: "Medications and medical items",
      checked: false,
    },
    {
      id: "earthquake-6",
      text: "Important documents in waterproof container",
      checked: false,
    },
    { id: "earthquake-7", text: "Cash and coins", checked: false },
    {
      id: "earthquake-8",
      text: "Emergency contact information",
      checked: false,
    },
    { id: "earthquake-9", text: "Whistle to signal for help", checked: false },
    { id: "earthquake-10", text: "Dust mask and work gloves", checked: false },
  ]);

  const [fireItems, setFireItems] = useState<ChecklistItem[]>([
    {
      id: "fire-1",
      text: "Emergency food and water (3-day supply)",
      checked: false,
    },
    { id: "fire-2", text: "Flashlight and extra batteries", checked: false },
    { id: "fire-3", text: "First aid kit", checked: false },
    {
      id: "fire-4",
      text: "Battery-powered or hand-crank radio",
      checked: false,
    },
    { id: "fire-5", text: "Medications and medical items", checked: false },
    {
      id: "fire-6",
      text: "Important documents in fireproof container",
      checked: false,
    },
    { id: "fire-7", text: "Cash and coins", checked: false },
    { id: "fire-8", text: "Emergency contact information", checked: false },
    { id: "fire-9", text: "Whistle to signal for help", checked: false },
    { id: "fire-10", text: "Fire extinguisher", checked: false },
  ]);

  // Function to generate a PDF with checklist items
  const generateChecklistPDF = (
    disasterType: string,
    items: ChecklistItem[],
  ) => {
    try {
      const doc = new jsPDF();

      // Add title
      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0);
      doc.text(`${disasterType} Preparedness Checklist`, 20, 20);

      // Add date
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);

      // Add checklist items
      doc.setFontSize(12);
      let yPosition = 40;

      items.forEach((item, index) => {
        // Draw checkbox
        doc.rect(20, yPosition - 4, 4, 4);
        if (item.checked) {
          doc.setFillColor(0, 0, 0);
          doc.rect(20, yPosition - 4, 4, 4, "F");
        }

        // Draw text
        doc.text(`${item.text}`, 30, yPosition);
        yPosition += 10;
      });

      // Add footer
      doc.setFontSize(10);
      doc.text("SALIG - Smart Assistant for Local Info and Guidance", 20, 280);

      // Save the PDF
      doc.save(`${disasterType.toLowerCase()}-preparedness-checklist.pdf`);
    } catch (error) {
      console.error(`Error generating ${disasterType} checklist PDF:`, error);
      alert(
        `Error generating ${disasterType} checklist PDF. Please try again later.`,
      );
    }
  };

  // Function to handle downloading a checklist
  const handleDownloadChecklist = (disasterType: string) => {
    try {
      // Create a link to the PDF file in the assets/checklists directory
      const pdfFileName = `${disasterType.toLowerCase()}-checklist.pdf`;
      const pdfPath = `/src/assets/checklists/${pdfFileName}`;

      // Create a link element
      const link = document.createElement("a");
      link.href = pdfPath;
      link.download = `${disasterType} Preparedness Checklist.pdf`;

      // Append to the document, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error downloading ${disasterType} checklist:`, error);
      alert(
        `Error downloading ${disasterType} checklist. Please try again later.`,
      );
    }
  };

  // Function to handle downloading a specific guide
  const handleDownloadGuide = (guideName: string) => {
    try {
      // Create a link to the PDF file in the assets directory
      const pdfFileName = `${guideName.toLowerCase()}-preparedness-guide.pdf`;
      const pdfPath = `/src/assets/${pdfFileName}`;

      // Create a link element
      const link = document.createElement("a");
      link.href = pdfPath;
      link.download = `${guideName} Preparedness Guide.pdf`;

      // Append to the document, click it, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error(`Error downloading ${guideName} guide:`, error);
      alert(`Error downloading ${guideName} guide. Please try again later.`);
    }
  };

  // Function to handle downloading all guides
  const handleDownloadAllGuides = () => {
    try {
      // Create an array of guide names
      const guideNames = ["Typhoon", "Flood", "Earthquake", "Fire"];

      // Download each guide individually
      guideNames.forEach((guideName) => {
        setTimeout(
          () => {
            handleDownloadGuide(guideName);
          },
          500 * guideNames.indexOf(guideName),
        ); // Stagger downloads to prevent browser blocking
      });

      // Download all checklists
      setTimeout(() => {
        guideNames.forEach((guideName, index) => {
          setTimeout(() => {
            handleDownloadChecklist(guideName);
          }, 500 * index);
        });
      }, 2000); // Wait 2 seconds after guides start downloading
    } catch (error) {
      console.error("Error downloading all guides:", error);
      alert("Error downloading all guides. Please try again later.");
    }
  };

  // Function to handle checklist item toggle
  const handleChecklistItemToggle = (id: string, disasterType: string) => {
    switch (disasterType) {
      case "Typhoon":
        setTyphoonItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item,
          ),
        );
        break;
      case "Flood":
        setFloodItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item,
          ),
        );
        break;
      case "Earthquake":
        setEarthquakeItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item,
          ),
        );
        break;
      case "Fire":
        setFireItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item,
          ),
        );
        break;
      default:
        console.error(`Unknown disaster type: ${disasterType}`);
    }
  };

  // Function to handle printing the current guide using iframe approach
  const handlePrintGuide = () => {
    try {
      // Get the current active tab to determine which PDF to print
      const disasterType =
        activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

      // Create a link to the PDF file in the assets directory
      const pdfFileName = `${activeTab.toLowerCase()}-preparedness-guide.pdf`;
      const pdfPath = `/src/assets/${pdfFileName}`;

      // Remove any existing print frames
      const existingFrame = document.getElementById("print-frame");
      if (existingFrame) {
        document.body.removeChild(existingFrame);
      }

      // Create a hidden iframe
      const printFrame = document.createElement("iframe");
      printFrame.id = "print-frame";
      printFrame.style.position = "fixed";
      printFrame.style.right = "-9999px";
      printFrame.style.bottom = "-9999px";
      printFrame.style.width = "800px";
      printFrame.style.height = "600px";
      printFrame.style.border = "0";
      printFrame.style.opacity = "0.01";
      document.body.appendChild(printFrame);

      // Add load event listener to the iframe
      printFrame.onload = () => {
        try {
          // Create a reference to the iframe's contentWindow
          const frameWindow = printFrame.contentWindow;

          if (!frameWindow) {
            throw new Error("Could not access iframe content window");
          }

          // Set a timeout to ensure the PDF is fully loaded
          setTimeout(() => {
            try {
              // Focus the iframe and print
              frameWindow.focus();
              frameWindow.print();

              // Keep the iframe in the DOM to prevent the print dialog from closing
              // Only remove it after a longer timeout (user has likely completed printing)
              setTimeout(() => {
                // Check if the iframe still exists before removing
                const frameToRemove = document.getElementById("print-frame");
                if (frameToRemove) {
                  document.body.removeChild(frameToRemove);
                }
              }, 60000); // Keep the iframe for 1 minute to ensure print completes
            } catch (printError) {
              console.error(`Error during print operation:`, printError);
              alert(`Error printing guide. Please try downloading instead.`);
              // Clean up the iframe on error
              document.body.removeChild(printFrame);
            }
          }, 2000); // Wait 2 seconds for PDF to load properly
        } catch (frameError) {
          console.error(`Error accessing iframe:`, frameError);
          alert(
            `Error preparing document for print. Please try downloading instead.`,
          );
          // Clean up the iframe on error
          document.body.removeChild(printFrame);
        }
      };

      // Set the iframe source to the PDF
      printFrame.src = pdfPath;
    } catch (error) {
      console.error(`Error printing guide:`, error);
      alert(`Error printing guide. Please try downloading instead.`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>Emergency Guides | SALIG</title>
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
              <Button variant="outline" size="sm" onClick={handlePrintGuide}>
                <Printer className="h-4 w-4 mr-2" />
                Print Current Guide
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleDownloadAllGuides}
              >
                <Download className="h-4 w-4 mr-2" />
                Download All Guides
              </Button>
            </div>
          </div>

          <Tabs
            defaultValue="typhoon"
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
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
            <TabsContent value="typhoon" className="space-y-6" ref={contentRef}>
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

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <CheckSquare className="h-5 w-5 text-blue-600 mr-2" />
                        Typhoon Preparedness Checklist
                      </h3>
                      <div className="space-y-2 mb-4">
                        {typhoonItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={item.id}
                              checked={item.checked}
                              onCheckedChange={() =>
                                handleChecklistItemToggle(item.id, "Typhoon")
                              }
                            />
                            <label
                              htmlFor={item.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {item.text}
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between mt-6">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleDownloadChecklist("Typhoon")}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Checklist
                          </Button>
                          <Button
                            variant="default"
                            onClick={() => handleDownloadGuide("Typhoon")}
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Download Full Guide
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handlePrintGuide}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
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
            <TabsContent value="flood" className="space-y-6" ref={contentRef}>
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

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <CheckSquare className="h-5 w-5 text-blue-600 mr-2" />
                        Flood Preparedness Checklist
                      </h3>
                      <div className="space-y-2 mb-4">
                        {floodItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={item.id}
                              checked={item.checked}
                              onCheckedChange={() =>
                                handleChecklistItemToggle(item.id, "Flood")
                              }
                            />
                            <label
                              htmlFor={item.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {item.text}
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between mt-6">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleDownloadChecklist("Flood")}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Checklist
                          </Button>
                          <Button
                            variant="default"
                            onClick={() => handleDownloadGuide("Flood")}
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Download Full Guide
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handlePrintGuide}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Earthquake Guide */}
            <TabsContent
              value="earthquake"
              className="space-y-6"
              ref={contentRef}
            >
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

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <CheckSquare className="h-5 w-5 text-orange-600 mr-2" />
                        Earthquake Preparedness Checklist
                      </h3>
                      <div className="space-y-2 mb-4">
                        {earthquakeItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={item.id}
                              checked={item.checked}
                              onCheckedChange={() =>
                                handleChecklistItemToggle(item.id, "Earthquake")
                              }
                            />
                            <label
                              htmlFor={item.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {item.text}
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between mt-6">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() =>
                              handleDownloadChecklist("Earthquake")
                            }
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Checklist
                          </Button>
                          <Button
                            variant="default"
                            onClick={() => handleDownloadGuide("Earthquake")}
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Download Full Guide
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handlePrintGuide}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fire Guide */}
            <TabsContent value="fire" className="space-y-6" ref={contentRef}>
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

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <CheckSquare className="h-5 w-5 text-red-600 mr-2" />
                        Fire Preparedness Checklist
                      </h3>
                      <div className="space-y-2 mb-4">
                        {fireItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={item.id}
                              checked={item.checked}
                              onCheckedChange={() =>
                                handleChecklistItemToggle(item.id, "Fire")
                              }
                            />
                            <label
                              htmlFor={item.id}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {item.text}
                            </label>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between mt-6">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            onClick={() => handleDownloadChecklist("Fire")}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Checklist
                          </Button>
                          <Button
                            variant="default"
                            onClick={() => handleDownloadGuide("Fire")}
                          >
                            <BookOpen className="h-4 w-4 mr-2" />
                            Download Full Guide
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={handlePrintGuide}
                          >
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
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
