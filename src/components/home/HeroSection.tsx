import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, AlertTriangle, Shield, MapPin } from "lucide-react";

// Import local images
import SampleImage from "@/components/images/Sample.jpg";
import SampleImage2 from "@/components/images/Sample2.jpg";
import SampleImage3 from "@/components/images/Sample3.jpg";

interface HeroSectionProps {
  title?: string;
  description?: string;
  backgroundImages?: string[];
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Disaster Risk Reduction and Management - BILAR",
  description = "Get real-time disaster information, educational resources, and interactive tools to help your community prepare for, respond to, and recover from disasters.",
  backgroundImages = [SampleImage, SampleImage2, SampleImage3], // Added second image
  primaryButtonText = "View Disaster Map",
  secondaryButtonText = "Emergency Guides",
  onPrimaryButtonClick = () => {},
  onSecondaryButtonClick = () => {},
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <div className="relative w-full h-[600px] bg-gray-900 overflow-hidden">
      {/* Background Image */}

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Alert Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-600/80 text-white text-sm font-medium">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span>Active Alerts in Your Area</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-3xl">
          {description}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 h-12"
            onClick={onPrimaryButtonClick}
          >
            <MapPin className="mr-2 h-5 w-5" />
            {primaryButtonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-amber-400 bg-amber-500/80 text-white hover:bg-amber-600/90 h-12"
            onClick={onSecondaryButtonClick}
          >
            <Shield className="mr-2 h-5 w-5" />
            {secondaryButtonText}
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          <div className="text-center">
            <p className="text-3xl font-bold text-white">24/7</p>
            <p className="text-sm text-gray-300">Monitoring</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white">5 min</p>
            <p className="text-sm text-gray-300">Alert Response</p>
          </div>
          <div className="text-center hidden md:block">
            <p className="text-3xl font-bold text-white">200+</p>
            <p className="text-sm text-gray-300">Evacuation Centers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
