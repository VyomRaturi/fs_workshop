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
import { getAllItems, requestBorrowItem } from "@/api/items";
import ItemCard from "@/components/ItemCard";

const Home = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const categories = ["Tools", "Kitchen", "Outdoors", "Fitness", "Games"];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getAllItems();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

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

  const handleRequestBorrow = async (itemId) => {
    try {
      const data = await requestBorrowItem(itemId);
      toast.success(data.message);
      fetchItems(); // Refresh the list
    } catch (error) {
      console.error("Error requesting item:", error);
      toast.error("Failed to request item");
    }
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
