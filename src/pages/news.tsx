import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Search, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase-client";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  imageUrl: string;
}

const allNews: NewsItem[] = [
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
  {
    id: "5",
    title: "DRRM Council Approves New Disaster Response Framework",
    date: "2023-10-12",
    category: "Policy",
    description:
      "The Disaster Risk Reduction and Management Council has approved a new comprehensive framework that will guide disaster response efforts across all government levels. The framework emphasizes coordination, resource mobilization, and community involvement.",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80",
  },
  {
    id: "6",
    title: "Mobile App for Disaster Reporting Launched",
    date: "2023-11-05",
    category: "Technology",
    description:
      "A new mobile application has been launched to enable citizens to report disasters and emergencies in real-time. The app includes features for sending photos, location data, and situation reports directly to emergency response teams.",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  },
  {
    id: "7",
    title: "International Conference on Disaster Resilience Held in Manila",
    date: "2023-12-01",
    category: "Event",
    description:
      "Over 200 experts from 30 countries gathered in Manila for the International Conference on Disaster Resilience. The three-day event featured discussions on innovative approaches to disaster risk reduction, climate change adaptation, and sustainable development.",
    imageUrl:
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&q=80",
  },
  {
    id: "8",
    title: "School-Based Disaster Preparedness Program Expands to 500 Schools",
    date: "2024-01-15",
    category: "Education",
    description:
      "The Department of Education has expanded its school-based disaster preparedness program to 500 schools nationwide. The program includes curriculum integration, regular drills, and the establishment of school disaster management committees.",
    imageUrl:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  },
  {
    id: "9",
    title: "New Weather Monitoring Stations Installed in Remote Areas",
    date: "2024-02-20",
    category: "Technology",
    description:
      "Twenty new automated weather monitoring stations have been installed in remote and high-risk areas to improve weather forecasting and early warning capabilities. The stations transmit real-time data on rainfall, wind speed, and other meteorological parameters.",
    imageUrl:
      "https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=800&q=80",
  },
  {
    id: "10",
    title:
      "Disaster Resilient Housing Project Completed in Coastal Communities",
    date: "2024-03-10",
    category: "Infrastructure",
    description:
      "A project to build 500 disaster-resilient houses in coastal communities has been completed. The houses are designed to withstand strong typhoons, storm surges, and earthquakes, providing safer living conditions for vulnerable families.",
    imageUrl:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
  },
];

const NewsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>(["all"]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from("news")
          .select("*")
          .order("date", { ascending: false });

        if (error) throw error;

        // Map the data to our format
        const formattedNews = data.map((item) => ({
          id: item.id,
          title: item.title,
          date: item.date,
          category: item.category,
          description: item.description,
          imageUrl: item.image_url,
        }));

        setNewsItems(formattedNews);

        // Extract unique categories
        const uniqueCategories = [
          "all",
          ...Array.from(
            new Set(formattedNews.map((item) => item.category.toLowerCase())),
          ),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching news:", error);
        // Fallback to default news if there's an error
        setNewsItems(allNews);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
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
      case "policy":
        return "bg-red-100 text-red-800";
      case "event":
        return "bg-yellow-100 text-yellow-800";
      case "education":
        return "bg-indigo-100 text-indigo-800";
      case "infrastructure":
        return "bg-orange-100 text-orange-800";
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

  const filteredNews = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      item.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>DRRM News & Updates | L.I.G.T.A.S.</title>
        <meta
          name="description"
          content="Latest news and updates on disaster risk reduction and management initiatives"
        />
      </Helmet>

      {/* Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          className="bg-white"
          onClick={() => (window.location.href = "/")}
        >
          <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
          Back to Home
        </Button>
      </div>

      {/* Main Content */}
      <main className="flex-1 pt-12 pb-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h1 className="text-2xl font-bold">DRRM News & Updates</h1>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search news..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="flex flex-wrap h-auto py-1">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="capitalize"
                  >
                    {category === "all" ? "All Categories" : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600">Loading news items...</span>
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden h-full flex flex-col"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardContent className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(item.date)}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                      {item.description}
                    </p>
                    <Button variant="outline" className="mt-auto self-start">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-500">
                No news found matching your search criteria.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewsPage;
