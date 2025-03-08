import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, BookOpen, Bell, MessageSquare, Phone } from "lucide-react";

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
    title: "Interactive Map",
    description:
      "View real-time disaster alerts, evacuation centers, and risk zones",
    icon: <MapPin className="h-6 w-6" />,
    color: "bg-blue-100 text-blue-700",
    link: "/map",
  },
  {
    id: "guides",
    title: "Emergency Guides",
    description:
      "Access step-by-step preparedness guides and downloadable checklists",
    icon: <BookOpen className="h-6 w-6" />,
    color: "bg-amber-100 text-amber-700",
    link: "/guides",
  },
  {
    id: "alerts",
    title: "Alert System",
    description:
      "Subscribe to location-based emergency alerts and notifications",
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
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Disaster Risk Reduction & Management
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Access critical tools and information to help you prepare for, respond
          to, and recover from disasters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card
            key={feature.id}
            className="overflow-hidden border-gray-200 transition-all hover:shadow-md"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${feature.color}`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 mb-4">
                {feature.description}
              </CardDescription>
              <Button
                variant="outline"
                className={`w-full hover:bg-${feature.color.split(" ")[0]} hover:text-${feature.color.split(" ")[1]}`}
                asChild
              >
                <a href={feature.link}>Access {feature.title}</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
