import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, BookOpen, Bell } from "lucide-react";

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
    title: "",
    description: "",
    icon: <MapPin className="h-6 w-6" />,
    color: "bg-blue-100 text-blue-700",
    link: "/map",
  },
  {
    id: "guides",
    title: "",
    description: "",
    icon: <BookOpen className="h-6 w-6" />,
    color: "bg-amber-100 text-amber-700",
    link: "/guides",
  },
  {
    id: "alerts",
    title: "",
    description: "",
    icon: <Bell className="h-6 w-6" />,
    color: "bg-red-100 text-red-700",
    link: "/alerts",
  },
];

const FeatureGrid: React.FC<FeatureGridProps> = ({
  features = defaultFeatures,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12 bg-white">
      {/* Removed the grid section entirely */}
    </div>
  );
};

export default FeatureGrid;
