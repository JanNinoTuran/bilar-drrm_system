import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, FileDown, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  location: string;
  remarks: string;
  category: string;
  status: "available" | "low" | "critical" | "expired";
}

interface InventoryTableProps {
  initialItems?: InventoryItem[];
}

const defaultItems: InventoryItem[] = [
  {
    id: "1",
    name: "First Aid Kit",
    quantity: 50,
    unit: "kit",
    location: "Main Warehouse",
    remarks: "Complete with basic medical supplies",
    category: "Medical",
    status: "available",
  },
  {
    id: "2",
    name: "Bottled Water",
    quantity: 1000,
    unit: "bottle",
    location: "Distribution Center",
    remarks: "500ml bottles, expires Dec 2024",
    category: "Food & Water",
    status: "available",
  },
  {
    id: "3",
    name: "Emergency Blankets",
    quantity: 200,
    unit: "piece",
    location: "East Storage",
    remarks: "Thermal blankets",
    category: "Shelter",
    status: "available",
  },
  {
    id: "4",
    name: "Flashlights",
    quantity: 75,
    unit: "piece",
    location: "Equipment Room",
    remarks: "Batteries included",
    category: "Equipment",
    status: "available",
  },
  {
    id: "5",
    name: "N95 Masks",
    quantity: 15,
    unit: "box",
    location: "Medical Storage",
    remarks: "50 masks per box",
    category: "Medical",
    status: "low",
  },
  {
    id: "6",
    name: "Canned Goods",
    quantity: 350,
    unit: "can",
    location: "Food Storage",
    remarks: "Assorted canned goods",
    category: "Food & Water",
    status: "available",
  },
  {
    id: "7",
    name: "Portable Generators",
    quantity: 5,
    unit: "unit",
    location: "Equipment Room",
    remarks: "Fuel-powered, 2000W",
    category: "Equipment",
    status: "critical",
  },
  {
    id: "8",
    name: "Tents",
    quantity: 30,
    unit: "piece",
    location: "East Storage",
    remarks: "4-person capacity",
    category: "Shelter",
    status: "available",
  },
  {
    id: "9",
    name: "Emergency Food Rations",
    quantity: 200,
    unit: "pack",
    location: "Food Storage",
    remarks: "3-day supply per pack",
    category: "Food & Water",
    status: "available",
  },
  {
    id: "10",
    name: "Hand Sanitizers",
    quantity: 8,
    unit: "box",
    location: "Medical Storage",
    remarks: "24 bottles per box, 60ml each",
    category: "Medical",
    status: "low",
  },
];

const InventoryTable: React.FC<InventoryTableProps> = ({
  initialItems = defaultItems,
}) => {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<Partial<InventoryItem>>({
    name: "",
    quantity: 0,
    unit: "",
    location: "",
    remarks: "",
    category: "Medical",
    status: "available",
  });
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity && newItem.unit && newItem.location) {
      const itemToAdd = {
        ...newItem,
        id: Date.now().toString(),
      } as InventoryItem;

      setItems([...items, itemToAdd]);
      setNewItem({
        name: "",
        quantity: 0,
        unit: "",
        location: "",
        remarks: "",
        category: "Medical",
        status: "available",
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditItem = () => {
    if (editingItem) {
      setItems(
        items.map((item) => (item.id === editingItem.id ? editingItem : item)),
      );
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.remarks.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;
    const matchesStatus = selectedStatus
      ? item.status === selectedStatus
      : true;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">Available</Badge>;
      case "low":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>
        );
      case "critical":
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      case "expired":
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search inventory..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="Medical">Medical</SelectItem>
              <SelectItem value="Food & Water">Food & Water</SelectItem>
              <SelectItem value="Shelter">Shelter</SelectItem>
              <SelectItem value="Equipment">Equipment</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="low">Low Stock</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full md:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Item Name
                  </Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        quantity: parseInt(e.target.value),
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="text-right">
                    Unit
                  </Label>
                  <Input
                    id="unit"
                    value={newItem.unit}
                    onChange={(e) =>
                      setNewItem({ ...newItem, unit: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newItem.location}
                    onChange={(e) =>
                      setNewItem({ ...newItem, location: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Category
                  </Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) =>
                      setNewItem({ ...newItem, category: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Medical">Medical</SelectItem>
                      <SelectItem value="Food & Water">Food & Water</SelectItem>
                      <SelectItem value="Shelter">Shelter</SelectItem>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={newItem.status}
                    onValueChange={(value: any) =>
                      setNewItem({ ...newItem, status: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="low">Low Stock</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="remarks" className="text-right">
                    Remarks
                  </Label>
                  <Input
                    id="remarks"
                    value={newItem.remarks}
                    onChange={(e) =>
                      setNewItem({ ...newItem, remarks: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddItem}>
                  Add Item
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <FileDown className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Remarks</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {item.remarks}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Inventory Item</DialogTitle>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="edit-name" className="text-right">
                                Item Name
                              </Label>
                              <Input
                                id="edit-name"
                                value={editingItem?.name || ""}
                                onChange={(e) =>
                                  editingItem &&
                                  setEditingItem({
                                    ...editingItem,
                                    name: e.target.value,
                                  })
                                }
                                className="col-span-3"
                              />
                            </div>
                            {/* Add other fields similar to the add dialog */}
                          </div>
                          <DialogFooter>
                            <Button type="submit" onClick={handleEditItem}>
                              Save Changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 text-gray-500"
                >
                  No inventory items found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InventoryTable;
