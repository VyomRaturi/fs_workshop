import { useState, useEffect, useMemo } from "react";
import { Search, Grid, List, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import ItemCard from "@/components/ItemCard";

// Placeholder data - this will be replaced with API calls during the workshop
const PLACEHOLDER_ITEMS = [
  {
    id: "itm001",
    name: "Cordless Drill",
    description:
      "18V cordless drill, lightly used. Perfect for home projects and DIY tasks.",
    category: "Tools",
    owner: "Alice Johnson",
    condition: "Good",
    available: true,
    image:
      "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.4595,
      lng: 77.0266,
      address: "Block A, Sector 45",
    },
  },
  {
    id: "itm002",
    name: "Camping Tent",
    description:
      "4-person waterproof tent, easy setup. Great for weekend getaways.",
    category: "Outdoors",
    owner: "Brian Lee",
    condition: "Excellent",
    available: true,
    image:
      "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.4652,
      lng: 77.0565,
      address: "Block B, Sector 50",
    },
  },
  {
    id: "itm003",
    name: "Crock Pot",
    description:
      "Large 6-quart slow cooker, works great. Perfect for family meals.",
    category: "Kitchen",
    owner: "Samantha Green",
    condition: "Very Good",
    available: false,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    borrowedBy: "Prachi Patel",
    location: {
      lat: 28.47,
      lng: 77.03,
      address: "Block C, Sector 47",
    },
  },
  {
    id: "itm004",
    name: "Yoga Mat",
    description:
      "Non-slip yoga mat, 6mm thick, blue color. Perfect for home workouts.",
    category: "Fitness",
    owner: "Ravi Mehra",
    condition: "Good",
    available: true,
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.475,
      lng: 77.04,
      address: "Block D, Sector 48",
    },
  },
  {
    id: "itm005",
    name: "Ladder",
    description: "6-foot aluminum step ladder, sturdy and lightweight.",
    category: "Tools",
    owner: "Dana Wang",
    condition: "Good",
    available: true,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.48,
      lng: 77.05,
      address: "Block E, Sector 49",
    },
  },
  {
    id: "itm006",
    name: "Board Game: Settlers of Catan",
    description:
      "Complete set, all pieces included. Great for family game nights.",
    category: "Games",
    owner: "Luis García",
    condition: "Like New",
    available: true,
    image:
      "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.485,
      lng: 77.06,
      address: "Block F, Sector 51",
    },
  },
  {
    id: "itm007",
    name: "Blender",
    description: "High-speed blender for smoothies and food processing.",
    category: "Kitchen",
    owner: "Emma Wilson",
    condition: "Very Good",
    available: true,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&h=300&fit=crop",
    borrowedBy: null,
    location: {
      lat: 28.49,
      lng: 77.07,
      address: "Block G, Sector 52",
    },
  },
  {
    id: "itm008",
    name: "Bicycle",
    description: "Mountain bike, perfect for weekend rides and commuting.",
    category: "Outdoors",
    owner: "Mike Chen",
    condition: "Good",
    available: false,
    image:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400&h=300&fit=crop",
    borrowedBy: "Sarah Kim",
    location: {
      lat: 28.495,
      lng: 77.08,
      address: "Block H, Sector 53",
    },
  },
];

const Home = () => {
  const [items, setItems] = useState(PLACEHOLDER_ITEMS);
  const [loading, setLoading] = useState(false); // No loading needed for placeholder data
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const categories = ["Tools", "Kitchen", "Outdoors", "Fitness", "Games"];

  // Filtering/searching/sorting logic in frontend
  const filteredItems = useMemo(() => {
    let filtered = [...items];
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter && categoryFilter !== "all") {
      filtered = filtered.filter((item) => item.category === categoryFilter);
    }
    if (availabilityFilter && availabilityFilter !== "all") {
      filtered = filtered.filter(
        (item) => String(item.available) === availabilityFilter
      );
    }
    // Optionally, sort by name
    filtered.sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [items, searchTerm, categoryFilter, availabilityFilter]);

  // TODO: Implement API integration
  const handleRequestBorrow = async (itemId) => {
  };

    // TODO: Implement API integration during workshop
  const fetchItems = async () => {
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div>
          <h1 className="text-3xl font-bold">Neighborhood Items</h1>
          <p className="text-muted-foreground">
            Discover and borrow items from your neighbors
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={availabilityFilter}
            onValueChange={setAvailabilityFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Items" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="true">Available</SelectItem>
              <SelectItem value="false">Borrowed</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Items Grid/List */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No items found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters
          </p>
          <Button
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
              setAvailabilityFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              viewMode={viewMode}
              onRequest={handleRequestBorrow}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
