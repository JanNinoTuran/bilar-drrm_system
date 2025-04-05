import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, BookOpen, ArrowRight, Home, Warehouse } from "lucide-react";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
}

interface FeatureGridProps {
  features?: FeatureItem[];
}

const defaultFeatures: FeatureItem[] = [
  {
    id: "map",
    title: "Disaster Map",
    description:
      "Interactive map showing disaster-prone areas and evacuation centers",
    icon: <MapPin className="h-6 w-6" />,
    color: "bg-blue-100 text-blue-700",
    link: "/map",
  },
  {
    id: "guides",
    title: "Emergency Guides",
    description: "Step-by-step guides for disaster preparedness and response",
    icon: <BookOpen className="h-6 w-6" />,
    color: "bg-amber-100 text-amber-700",
    link: "/guides",
  },
  {
    id: "evacuation",
    title: "Evacuation Centers",
    description: "Find the nearest evacuation centers in your area",
    icon: <Warehouse className="h-6 w-6" />,
    color: "bg-green-100 text-green-700",
    link: "/evacuation-centers",
  },
];

const FeatureGrid: React.FC<FeatureGridProps> = ({
  features = defaultFeatures,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <a
            key={feature.id}
            href={feature.link}
            className="block group hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden border border-gray-100"
          >
            <div className="p-6 flex flex-col h-full">
              <div
                className={`${feature.color} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4`}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm flex-grow">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-blue-600 font-medium text-sm">
                <span>Learn more</span>
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
