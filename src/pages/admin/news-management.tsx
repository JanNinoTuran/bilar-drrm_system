import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Footer from "@/components/layout/Footer";
import NewsEditor from "@/components/home/NewsEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import { useToast } from "@/components/ui/use-toast";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  imageUrl: string;
  displayOnLanding: boolean;
}

const NewsManagement: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Load news from Supabase on component mount
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
          displayOnLanding: item.display_on_landing,
        }));

        setNews(formattedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
        toast({
          title: "Error loading news",
          description:
            "There was a problem loading the news items. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [toast]);

  const handleSaveNews = (updatedNews: NewsItem[]) => {
    setNews(updatedNews);
    // No need to save to localStorage as we're using Supabase now
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Helmet>
        <title>News Management | L.I.G.T.A.S.</title>
        <meta
          name="description"
          content="Manage news and updates for the DRRM system"
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
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>

      {/* Main Content */}
      <main className="flex-1 pt-12 pb-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">News & Updates Management</h1>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">
                  Loading news items...
                </span>
              </div>
            ) : (
              <NewsEditor initialNews={news} onSave={handleSaveNews} />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NewsManagement;
