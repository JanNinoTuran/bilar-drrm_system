import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Umbrella,
  Waves,
  Wind,
  Thermometer,
  Shield,
  Flame,
  Droplets,
  Info,
  X,
  ExternalLink,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface SafetyTip {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  detailedInfo: string;
  actionSteps: string[];
  learnMoreUrl?: string;
}

const safetyTips: SafetyTip[] = [
  {
    id: 1,
    title: "Typhoon Safety",
    description:
      "Secure loose objects outside your home and prepare an emergency kit with food, water, and medicine.",
    icon: <Wind className="h-10 w-10" />,
    bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
    iconColor: "text-blue-600",
    detailedInfo:
      "Typhoons can bring destructive winds, heavy rainfall, and storm surges that may cause flooding, landslides, and damage to infrastructure. Preparation is key to staying safe during these events.",
    actionSteps: [
      "Create an emergency kit with 3 days of supplies",
      "Secure windows and doors with storm shutters or plywood",
      "Move vehicles to higher ground if flooding is expected",
      "Charge phones and backup batteries before the storm",
      "Follow evacuation orders from local authorities",
    ],
    learnMoreUrl: "https://www.ready.gov/hurricanes",
  },
  {
    id: 2,
    title: "Flood Preparedness",
    description:
      "Move important items to higher ground and avoid walking through floodwaters which may be contaminated.",
    icon: <Waves className="h-10 w-10" />,
    bgColor: "bg-gradient-to-br from-cyan-50 to-cyan-100",
    iconColor: "text-cyan-600",
    detailedInfo:
      "Floods can occur rapidly with little warning. Floodwaters may contain sewage, chemicals, and dangerous debris. Just 6 inches of moving water can knock you down, and 1 foot of water can sweep your vehicle away.",
    actionSteps: [
      "Know your area's flood risk and evacuation routes",
      "Elevate electrical systems and appliances",
      "Install check valves in plumbing to prevent backflow",
      "Consider flood insurance even if not in a high-risk zone",
      "Never drive or walk through floodwaters",
    ],
    learnMoreUrl: "https://www.ready.gov/floods",
  },
  {
    id: 3,
    title: "Earthquake Response",
    description:
      "Drop, cover, and hold on. Stay away from windows and exterior walls during shaking.",
    icon: <AlertTriangle className="h-10 w-10" />,
    bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
    iconColor: "text-amber-600",
    detailedInfo:
      "Earthquakes strike without warning and can cause buildings to collapse, trigger landslides, and disrupt utilities. The greatest danger is from falling objects and collapsing structures.",
    actionSteps: [
      "Drop to the ground before the earthquake drops you",
      "Take cover under a sturdy desk or table",
      "Hold on until the shaking stops",
      "Stay away from glass, windows, and exterior walls",
      "If outdoors, move to a clear area away from buildings",
    ],
    learnMoreUrl: "https://www.ready.gov/earthquakes",
  },
  {
    id: 4,
    title: "Fire Safety",
    description:
      "Create a home fire escape plan and practice it regularly with your family. Install smoke alarms on every level.",
    icon: <Flame className="h-10 w-10" />,
    bgColor: "bg-gradient-to-br from-red-50 to-red-100",
    iconColor: "text-red-600",
    detailedInfo:
      "Home fires can spread rapidly, leaving as little as two minutes to escape safely. Smoke alarms provide early warning, and a practiced escape plan ensures everyone knows how to get out quickly.",
    actionSteps: [
      "Install smoke alarms on every level and in each bedroom",
      "Test smoke alarms monthly and replace batteries annually",
      "Create a fire escape plan with two exits from each room",
      "Practice your escape plan twice a year",
      "Keep a fire extinguisher accessible and know how to use it",
    ],
    learnMoreUrl: "https://www.ready.gov/home-fires",
  },
  {
    id: 5,
    title: "Drought Measures",
    description:
      "Conserve water by fixing leaks, taking shorter showers, and using water-efficient appliances.",
    icon: <Droplets className="h-10 w-10" />,
    bgColor: "bg-gradient-to-br from-orange-50 to-orange-100",
    iconColor: "text-orange-600",
    detailedInfo:
      "Droughts develop slowly but can have severe impacts on water supplies, agriculture, and ecosystems. Water conservation is essential during drought conditions to ensure adequate supplies for critical needs.",
    actionSteps: [
      "Fix leaky faucets and toilets immediately",
      "Install water-efficient fixtures and appliances",
      "Water plants during cooler parts of the day",
      "Use drought-resistant landscaping (xeriscaping)",
      "Collect rainwater for outdoor use where permitted",
    ],
    learnMoreUrl: "https://www.ready.gov/drought",
  },
  {
    id: 6,
    title: "Extreme Heat",
    description:
      "Stay hydrated, avoid strenuous activities during peak heat, and check on elderly neighbors.",
    icon: <Thermometer className="h-10 w-10" />,
    bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
    iconColor: "text-yellow-600",
    detailedInfo:
      "Extreme heat is one of the leading weather-related killers, causing hundreds of fatalities each year. Heat-related illnesses like heat exhaustion and heat stroke can be prevented with proper precautions.",
    actionSteps: [
      "Drink plenty of water, even if you don't feel thirsty",
      "Stay in air-conditioned spaces during the hottest hours",
      "Wear lightweight, light-colored, loose-fitting clothing",
      "Check on elderly neighbors and those without AC",
      "Never leave children or pets in parked vehicles",
    ],
    learnMoreUrl: "https://www.ready.gov/heat",
  },
];

interface DisasterSafetyTipsCarouselProps {
  autoRotateInterval?: number;
  showCount?: number;
}

const DisasterSafetyTipsCarousel: React.FC<DisasterSafetyTipsCarouselProps> = ({
  autoRotateInterval = 5000,
  showCount = 3,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedTip, setSelectedTip] = useState<SafetyTip | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate the number of tips to show based on screen size
  const [visibleCount, setVisibleCount] = useState(showCount);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(showCount);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [showCount]);

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        handleNext();
      }, autoRotateInterval);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, autoRotateInterval]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? safetyTips.length - visibleCount : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= safetyTips.length - visibleCount ? 0 : prevIndex + 1,
    );
  };

  const openTipDetails = (tip: SafetyTip) => {
    setSelectedTip(tip);
    setIsDialogOpen(true);
    setIsPaused(true);
  };

  const closeTipDetails = () => {
    setIsDialogOpen(false);
    setIsPaused(false);
  };

  const visibleTips = [];
  for (let i = 0; i < visibleCount; i++) {
    const tipIndex = (currentIndex + i) % safetyTips.length;
    visibleTips.push(safetyTips[tipIndex]);
  }

  return (
    <div
      ref={carouselRef}
      className="relative w-full py-8 bg-white rounded-xl shadow-md border border-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex justify-between items-center mb-6 px-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Shield className="mr-2 h-6 w-6 text-blue-600" />
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Disaster Safety Tips
          </span>
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="rounded-full hover:bg-blue-50 transition-colors duration-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="rounded-full hover:bg-blue-50 transition-colors duration-300"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex overflow-hidden px-4">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4 w-full"
          style={{
            transform: `translateX(0)`,
          }}
        >
          {visibleTips.map((tip) => (
            <Card
              key={tip.id}
              className={`flex-1 min-w-0 border border-gray-200 hover:shadow-lg transition-all duration-300 ${tip.bgColor} group cursor-pointer overflow-hidden`}
              onClick={() => openTipDetails(tip)}
            >
              <CardContent className="p-6 relative">
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-500"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Click for more details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`mb-4 p-4 rounded-full bg-white shadow-md transform group-hover:scale-110 transition-transform duration-300 ring-2 ring-opacity-50 ring-${tip.iconColor.split("-")[1]}-200`}
                  >
                    {React.cloneElement(tip.icon as React.ReactElement, {
                      className: `h-8 w-8 ${tip.iconColor}`,
                    })}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-700 transition-colors duration-300">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{tip.description}</p>
                  <div className="mt-4 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs bg-white bg-opacity-50 hover:bg-opacity-80 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        openTipDetails(tip);
                      }}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: safetyTips.length - visibleCount + 1 }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? "bg-blue-600 scale-125" : "bg-gray-300 hover:bg-gray-400"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ),
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedTip && (
          <DialogContent className="sm:max-w-md md:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className={`p-2 rounded-full ${selectedTip.bgColor}`}>
                  {React.cloneElement(selectedTip.icon as React.ReactElement, {
                    className: `h-5 w-5 ${selectedTip.iconColor}`,
                  })}
                </div>
                {selectedTip.title}
              </DialogTitle>
              <DialogDescription className="text-gray-700 mt-2">
                {selectedTip.detailedInfo}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">
                Action Steps:
              </h4>
              <ul className="space-y-2">
                {selectedTip.actionSteps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="min-w-4 mt-1">
                      <div
                        className={`h-4 w-4 rounded-full flex items-center justify-center ${selectedTip.bgColor} ${selectedTip.iconColor}`}
                      >
                        <span className="text-xs font-bold">{index + 1}</span>
                      </div>
                    </div>
                    <span className="text-sm">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <DialogFooter className="flex sm:justify-between items-center mt-6">
              <DialogClose asChild>
                <Button variant="outline" size="sm" onClick={closeTipDetails}>
                  Close
                </Button>
              </DialogClose>
              {selectedTip.learnMoreUrl && (
                <a
                  href={selectedTip.learnMoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Learn more <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              )}
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default DisasterSafetyTipsCarousel;
