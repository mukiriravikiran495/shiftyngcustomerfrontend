import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, ArrowUpDown, Calendar, Plus, Minus, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Items = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("furniture");
  const [selectedItems, setSelectedItems] = useState<{[key: string]: number}>({});

  const categories = [
    { id: "furniture", name: "Furniture", icon: "🪑" },
    { id: "electronics", name: "Electronics", icon: "📺" },
    { id: "kitchen", name: "Kitchen Items", icon: "🍽️" },
    { id: "clothes", name: "Clothes", icon: "👕" },
    { id: "books", name: "Books", icon: "📚" },
    { id: "appliances", name: "Appliances", icon: "🔌" },
    { id: "decorative", name: "Decorative", icon: "🎨" },
    { id: "sports", name: "Sports", icon: "⚽" },
  ];

  const items = {
    furniture: [
      { id: 1, name: "Sofa Set", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop", category: "furniture" },
      { id: 2, name: "Dining Table", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop", category: "furniture" },
      { id: 3, name: "Bed", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop", category: "furniture" },
      { id: 4, name: "Wardrobe", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop", category: "furniture" },
      { id: 5, name: "Coffee Table", image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop", category: "furniture" },
      { id: 6, name: "Bookshelf", image: "https://images.unsplash.com/photo-1562113530-57ba12c1c9a4?w=200&h=200&fit=crop", category: "furniture" },
    ],
    electronics: [
      { id: 7, name: "Television", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop", category: "electronics" },
      { id: 8, name: "Refrigerator", image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=200&h=200&fit=crop", category: "electronics" },
      { id: 9, name: "Washing Machine", image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop", category: "electronics" },
      { id: 10, name: "Laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop", category: "electronics" },
      { id: 11, name: "Microwave", image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8aa3?w=200&h=200&fit=crop", category: "electronics" },
      { id: 12, name: "Air Conditioner", image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=200&h=200&fit=crop", category: "electronics" },
    ],
    kitchen: [
      { id: 13, name: "Plates Set", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=200&h=200&fit=crop", category: "kitchen" },
      { id: 14, name: "Pots & Pans", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop", category: "kitchen" },
      { id: 15, name: "Cutlery Set", image: "https://images.unsplash.com/photo-1551018651-6ecffde734da?w=200&h=200&fit=crop", category: "kitchen" },
      { id: 16, name: "Kitchen Cabinet", image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=200&h=200&fit=crop", category: "kitchen" },
    ],
  };

  const updateItemCount = (itemId: number, increment: boolean) => {
    setSelectedItems(prev => {
      const currentCount = prev[itemId] || 0;
      const newCount = increment ? currentCount + 1 : Math.max(0, currentCount - 1);
      
      if (newCount === 0) {
        const { [itemId]: removed, ...rest } = prev;
        return rest;
      }
      
      return { ...prev, [itemId]: newCount };
    });
  };

  const getTotalItems = () => {
    return Object.values(selectedItems).reduce((sum, count) => sum + count, 0);
  };

  const handleNext = () => {
    navigate("/vendors");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="mr-3"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-primary">Shiftyng</h1>
            </div>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Login
            </Button>
          </div>
        </div>
      </header>

      {/* Booking Details Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-gray-600">From:</span>
                <span className="font-medium ml-1">Mumbai</span>
              </div>
              <ArrowUpDown className="h-4 w-4 text-gray-400" />
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-gray-600">To:</span>
                <span className="font-medium ml-1">Delhi</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                <span className="text-gray-600">Date:</span>
                <span className="font-medium ml-1">25 Dec 2024</span>
              </div>
              <div>
                <span className="text-gray-600">Type:</span>
                <span className="font-medium ml-1">Domestic</span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-1" />
              Modify
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Categories Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r min-h-screen sticky top-20">
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center px-3 py-3 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <span className="text-xl mr-3">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 capitalize">{selectedCategory}</h2>
            <p className="text-gray-600">Select items you want to move</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {(items[selectedCategory as keyof typeof items] || []).map((item) => (
              <div key={item.id} className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-3">
                  <h4 className="font-medium text-gray-900 text-sm mb-3">{item.name}</h4>
                  
                  {selectedItems[item.id] ? (
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => updateItemCount(item.id, false)}
                        className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="font-semibold text-lg px-3">{selectedItems[item.id]}</span>
                      <button
                        onClick={() => updateItemCount(item.id, true)}
                        className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <Button
                      onClick={() => updateItemCount(item.id, true)}
                      variant="outline"
                      size="sm"
                      className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      ADD
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="text-base px-3 py-1">
                  {getTotalItems()} items selected
                </Badge>
                <Button variant="ghost" className="text-primary">
                  View Selected Items
                </Button>
              </div>
              <Button
                onClick={handleNext}
                className="px-8 py-3 shiftyng-gradient hover:opacity-90 transition-opacity"
              >
                Next - Find Movers
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;