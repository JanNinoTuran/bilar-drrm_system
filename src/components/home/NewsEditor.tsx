import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase-client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Plus, Save, Trash2, Edit, Eye, EyeOff } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  imageUrl: string;
  displayOnLanding: boolean;
}

interface NewsEditorProps {
  initialNews?: NewsItem[];
  onSave?: (news: NewsItem[]) => void;
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
    displayOnLanding: true,
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
    displayOnLanding: true,
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
    displayOnLanding: true,
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
    displayOnLanding: true,
  },
];

const categories = [
  "Training",
  "Technology",
  "Community",
  "Climate",
  "Policy",
  "Event",
  "Education",
  "Infrastructure",
];

const NewsEditor: React.FC<NewsEditorProps> = ({
  initialNews = defaultNews,
  onSave = () => {},
}) => {
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddNew = () => {
    const newItem: NewsItem = {
      id: Date.now().toString(),
      title: "",
      date: new Date().toISOString().split("T")[0],
      category: "Training",
      description: "",
      imageUrl:
        "https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?w=800&q=80",
      displayOnLanding: true,
    };
    setEditingItem(newItem);
    setIsAdding(true);
  };

  const handleEdit = (item: NewsItem) => {
    setEditingItem({ ...item });
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from("news").delete().eq("id", id);

      if (error) throw error;

      const updatedNews = news.filter((item) => item.id !== id);
      setNews(updatedNews);
      onSave(updatedNews);

      toast({
        title: "News item deleted",
        description: "The news item has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting news item:", error);
      toast({
        title: "Error",
        description: "Failed to delete news item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingItem) return;
    setIsLoading(true);

    try {
      if (isAdding) {
        // Create new item in Supabase
        const { data, error } = await supabase
          .from("news")
          .insert([
            {
              title: editingItem.title,
              date: editingItem.date,
              category: editingItem.category,
              description: editingItem.description,
              image_url: editingItem.imageUrl,
              display_on_landing: editingItem.displayOnLanding,
            },
          ])
          .select();

        if (error) throw error;

        // Map the returned data to our format
        const newItem = {
          id: data[0].id,
          title: data[0].title,
          date: data[0].date,
          category: data[0].category,
          description: data[0].description,
          imageUrl: data[0].image_url,
          displayOnLanding: data[0].display_on_landing,
        };

        const updatedNews = [...news, newItem];
        setNews(updatedNews);
        onSave(updatedNews);

        toast({
          title: "News item created",
          description: "The news item has been successfully created.",
        });
      } else {
        // Update existing item
        const { error } = await supabase
          .from("news")
          .update({
            title: editingItem.title,
            date: editingItem.date,
            category: editingItem.category,
            description: editingItem.description,
            image_url: editingItem.imageUrl,
            display_on_landing: editingItem.displayOnLanding,
          })
          .eq("id", editingItem.id);

        if (error) throw error;

        const updatedNews = news.map((item) =>
          item.id === editingItem.id ? editingItem : item,
        );

        setNews(updatedNews);
        onSave(updatedNews);

        toast({
          title: "News item updated",
          description: "The news item has been successfully updated.",
        });
      }
    } catch (error) {
      console.error("Error saving news item:", error);
      toast({
        title: "Error",
        description: "Failed to save news item. Please try again.",
        variant: "destructive",
      });
    } finally {
      setEditingItem(null);
      setIsAdding(false);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditingItem(null);
    setIsAdding(false);
  };

  const handleToggleDisplay = async (id: string) => {
    setIsLoading(true);
    try {
      // Find the current item
      const currentItem = news.find((item) => item.id === id);
      if (!currentItem) return;

      // Toggle the display status
      const newDisplayStatus = !currentItem.displayOnLanding;

      // Update in Supabase
      const { error } = await supabase
        .from("news")
        .update({ display_on_landing: newDisplayStatus })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      const updatedNews = news.map((item) =>
        item.id === id ? { ...item, displayOnLanding: newDisplayStatus } : item,
      );

      setNews(updatedNews);
      onSave(updatedNews);

      toast({
        title: newDisplayStatus
          ? "Now visible on landing page"
          : "Hidden from landing page",
        description: `The news item will ${newDisplayStatus ? "now" : "no longer"} be displayed on the landing page.`,
      });
    } catch (error) {
      console.error("Error toggling display status:", error);
      toast({
        title: "Error",
        description: "Failed to update display status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    field: keyof NewsItem,
    value: string | boolean,
  ) => {
    if (!editingItem) return;
    setEditingItem({ ...editingItem, [field]: value });
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage News & Updates</CardTitle>
          <Button onClick={handleAddNew}>
            <Plus className="h-4 w-4 mr-2" /> Add News Item
          </Button>
        </CardHeader>
        <CardContent>
          {editingItem ? (
            <div className="space-y-4 border p-4 rounded-md">
              <h3 className="text-lg font-medium">
                {isAdding ? "Add New News Item" : "Edit News Item"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingItem.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="News title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <Input
                      id="date"
                      type="date"
                      value={editingItem.date}
                      onChange={(e) =>
                        handleInputChange("date", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={editingItem.category}
                    onValueChange={(value) =>
                      handleInputChange("category", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={editingItem.imageUrl}
                    onChange={(e) =>
                      handleInputChange("imageUrl", e.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingItem.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder="News description"
                    rows={4}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="displayOnLanding"
                    checked={editingItem.displayOnLanding}
                    onCheckedChange={(checked) =>
                      handleInputChange("displayOnLanding", checked)
                    }
                  />
                  <Label htmlFor="displayOnLanding">
                    Display on landing page
                  </Label>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={isLoading}>
                  {isLoading ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" /> Save
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {news.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No news items available.</p>
                  <Button variant="link" onClick={handleAddNew}>
                    Add your first news item
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {news.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col md:flex-row gap-4 border rounded-md p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="md:w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleDisplay(item.id)}
                              title={
                                item.displayOnLanding
                                  ? "Hide from landing page"
                                  : "Show on landing page"
                              }
                            >
                              {item.displayOnLanding ? (
                                <Eye className="h-4 w-4 text-green-600" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-gray-400" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                          <span>{item.category}</span>
                          <span>•</span>
                          <span>
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <span>
                            {item.displayOnLanding
                              ? "Shown on landing"
                              : "Hidden from landing"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsEditor;
