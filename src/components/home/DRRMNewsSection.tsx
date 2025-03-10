import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Info } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  imageUrl: string;
}

interface DRRMNewsSectionProps {
  news?: NewsItem[];
}

const defaultNews: NewsItem[] = [
  {
    id: "1",
    title: "NDRRMC Conducts Nationwide Earthquake Drill",
    date: "2023-06-15",
    category: "Training",
    description:
      "The National Disaster Risk Reduction and Management Council (NDRRMC) successfully conducted a nationwide earthquake drill to enhance preparedness and response capabilities across the country. Over 500,000 participants from various sectors joined the simulation exercise.",
    imageUrl:
      "https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?w=800&q=80",
  },
  {
    id: "2",
    title: "New Early Warning System Deployed in Flood-Prone Areas",
    date: "2023-07-22",
    category: "Technology",
    description:
      "State-of-the-art early warning systems have been installed in 15 flood-prone municipalities across the region. These systems can detect rising water levels and automatically send alerts to residents and local authorities, providing crucial time for evacuation.",
    imageUrl:
      "https://images.unsplash.com/photo-1574103188526-4fabd2623804?w=800&q=80",
  },
  {
    id: "3",
    title: "Community-Based Disaster Preparedness Program Launched",
    date: "2023-08-10",
    category: "Community",
    description:
      "A new community-based disaster preparedness program has been launched to empower local communities in disaster risk reduction. The program includes training on first aid, evacuation procedures, and basic search and rescue techniques.",
    imageUrl:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
  },
  {
    id: "4",
    title: "Climate Change Adaptation Strategies for Coastal Communities",
    date: "2023-09-05",
    category: "Climate",
    description:
      "Experts have developed new adaptation strategies for coastal communities facing increased risks due to climate change. These strategies include mangrove restoration, elevated housing designs, and sustainable livelihood alternatives.",
    imageUrl:
      "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80",
  },
];

const DRRMNewsSection: React.FC<DRRMNewsSectionProps> = ({
  news = defaultNews,
}) => {
  const [visibleItems, setVisibleItems] = useState<string[]>([]);
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [
              ...prev,
              entry.target.getAttribute("data-id") || "",
            ]);
          }
        });
      },
      { threshold: 0.3 },
    );

    Object.values(itemRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(itemRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "training":
        return "bg-blue-100 text-blue-800";
      case "technology":
        return "bg-purple-100 text-purple-800";
      case "community":
        return "bg-green-100 text-green-800";
      case "climate":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            DRRM News & Updates
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed about the latest developments, initiatives, and events
            in disaster risk reduction and management.
          </p>
        </div>

        <div className="space-y-16">
          {news.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (itemRefs.current[item.id] = el)}
              data-id={item.id}
              className={`flex flex-col md:flex-row gap-8 items-center transition-all duration-1000 ${
                visibleItems.includes(item.id)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
            >
              <div
                className={`w-full md:w-1/2 ${index % 2 === 1 ? "md:order-2" : ""}`}
              >
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <Card className="border-0 shadow-md h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(item.date)}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <Button variant="outline" className="mt-2">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
            <a href="/news">
              View All News & Updates <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DRRMNewsSection;
