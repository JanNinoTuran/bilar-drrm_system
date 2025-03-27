import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
}

const DisasterChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: "1",
      label:
        "Emergency water supply (1 gallon per person per day for at least 3 days)",
      checked: false,
    },
    {
      id: "2",
      label: "Non-perishable food (at least a 3-day supply)",
      checked: false,
    },
    { id: "3", label: "Battery-powered or hand-crank radio", checked: false },
    { id: "4", label: "Flashlight with extra batteries", checked: false },
    { id: "5", label: "First aid kit", checked: false },
    { id: "6", label: "Whistle to signal for help", checked: false },
    {
      id: "7",
      label: "Dust mask, plastic sheeting, and duct tape",
      checked: false,
    },
    {
      id: "8",
      label: "Moist towelettes, garbage bags, and plastic ties",
      checked: false,
    },
    {
      id: "9",
      label: "Wrench or pliers to turn off utilities",
      checked: false,
    },
    { id: "10", label: "Manual can opener", checked: false },
    { id: "11", label: "Local maps", checked: false },
    {
      id: "12",
      label: "Cell phone with chargers and backup battery",
      checked: false,
    },
    { id: "13", label: "Prescription medications and glasses", checked: false },
    {
      id: "14",
      label: "Important family documents in waterproof container",
      checked: false,
    },
    { id: "15", label: "Cash and change", checked: false },
  ]);

  const [progress, setProgress] = useState<number>(0);

  // Load saved checklist from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem("disasterChecklist");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  // Update progress whenever items change
  useEffect(() => {
    const checkedCount = items.filter((item) => item.checked).length;
    const newProgress = Math.round((checkedCount / items.length) * 100);
    setProgress(newProgress);

    // Save to localStorage
    localStorage.setItem("disasterChecklist", JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const resetChecklist = () => {
    setItems(items.map((item) => ({ ...item, checked: false })));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white shadow-lg">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="text-xl font-bold">
          Disaster Preparedness Checklist
        </CardTitle>
        <CardDescription className="text-blue-100">
          Essential items to have ready in case of emergency
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 mr-4">
            <Progress value={progress} className="h-2" />
          </div>
          <div className="text-sm font-medium">{progress}% Complete</div>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50"
            >
              <Checkbox
                id={`item-${item.id}`}
                checked={item.checked}
                onCheckedChange={() => toggleItem(item.id)}
                className="mt-1"
              />
              <label
                htmlFor={`item-${item.id}`}
                className={`text-sm ${item.checked ? "line-through text-gray-500" : "text-gray-900"}`}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" onClick={resetChecklist}>
          Reset Checklist
        </Button>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default DisasterChecklist;
