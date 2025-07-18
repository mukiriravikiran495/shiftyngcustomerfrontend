import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LoginModal } from "@/components/LoginModal";
import {
  ArrowLeft,
  MapPin,
  ArrowUpDown,
  Calendar,
  Plus,
  Minus,
  Search,
  ArrowRightLeft,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Items = () => {
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("furniture");
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>(
    {}
  );

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
      {
        id: 1,
        name: "Sofa Set",
        image:
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
        category: "furniture",
      },
      {
        id: 2,
        name: "Dining Table",
        image:
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=200&h=200&fit=crop",
        category: "furniture",
      },
      {
        id: 3,
        name: "Bed",
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop",
        category: "furniture",
      },
      {
        id: 4,
        name: "Wardrobe",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
        category: "furniture",
      },
      {
        id: 5,
        name: "Coffee Table",
        image:
          "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop",
        category: "furniture",
      },
      {
        id: 6,
        name: "Bookshelf",
        image:
          "https://images.unsplash.com/photo-1562113530-57ba12c1c9a4?w=200&h=200&fit=crop",
        category: "furniture",
      },
    ],
    electronics: [
      {
        id: 7,
        name: "Television",
        image:
          "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
        category: "electronics",
      },
      {
        id: 8,
        name: "Refrigerator",
        image:
          "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=200&h=200&fit=crop",
        category: "electronics",
      },
      {
        id: 9,
        name: "Washing Machine",
        image:
          "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop",
        category: "electronics",
      },
      {
        id: 10,
        name: "Laptop",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop",
        category: "electronics",
      },
      {
        id: 11,
        name: "Microwave",
        image:
          "https://images.unsplash.com/photo-1574269909862-7e1d70bb8aa3?w=200&h=200&fit=crop",
        category: "electronics",
      },
      {
        id: 12,
        name: "Air Conditioner",
        image:
          "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=200&h=200&fit=crop",
        category: "electronics",
      },
    ],
    kitchen: [
      {
        id: 13,
        name: "Plates Set",
        image:
          "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=200&h=200&fit=crop",
        category: "kitchen",
      },
      {
        id: 14,
        name: "Pots & Pans",
        image:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
        category: "kitchen",
      },
      {
        id: 15,
        name: "Cutlery Set",
        image:
          "https://images.unsplash.com/photo-1551018651-6ecffde734da?w=200&h=200&fit=crop",
        category: "kitchen",
      },
      {
        id: 16,
        name: "Kitchen Cabinet",
        image:
          "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=200&h=200&fit=crop",
        category: "kitchen",
      },
    ],
  };

  const updateItemCount = (itemId: number, increment: boolean) => {
    setSelectedItems((prev) => {
      const currentCount = prev[itemId] || 0;
      const newCount = increment
        ? currentCount + 1
        : Math.max(0, currentCount - 1);

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
  if (hasSearched) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-black-50 via-white to-purple-50 w-full">
          <LoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
          />
        </div>
      );
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className=" bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 ">
          <div className="flex justify-between items-center h-16">
            {/* Left section (logo + back button) */}
            <div className="flex items-center flex-1">
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate("/")}
                  className="mr-3"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>
              <h1
            className="text-[30px] font-bold text-primary font-weight-900"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            Shiftyng
          </h1>
              </div>

            {/* Right section (Login) */}
            <div className="flex justify-end flex-1">
              <Button
                variant="outline"
                onClick={() => setIsLoginOpen(true)}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      {/* Booking Details Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-0 py-4">
          <div className="w-full">
            {/* Mobile Layout */}
            <div className=" md:hidden flex items-start gap-2 text-sm px-2">
              {/* Left Column: Back Button */}
              <div className="hidden lg:block">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate("/")}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>

              {/* Right Column: All Details stacked vertically */}
              <div className="md:hidden px-2  space-y-2 text-sm bg-white ">
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="truncate">
                    Flat 102, Sidhardh Heaven, Mahesh Nagar
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full" />
                  <span className="truncate">
                    Flat 102, Sidhardh Heaven, Mahesh Nagar
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <span>
                    <span className="font-medium">Shift Date:</span> 25 Dec 2024
                  </span>
                  <span>
                    <span className="font-medium">Shift Type:</span> Domestic
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:grid grid-cols-[auto_2fr_2fr_minmax(120px,1fr)_minmax(120px,0.8fr)_auto] items-center gap-2 text-sm">
              {/* Back Button */}
              <div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate("/")}
                  className="mr-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>

              {/* From Location */}
              <div className="flex items-center px-2 space-x-1 truncate">
                <MapPin className="w-5 h-5 text-green-600 mr-3" />
                {/* <span className="font-medium text-gray-600">From:</span> */}
                <span className="ml-1 truncate">Flat 102, Sidhardh Heaven, Mahesh Nagar</span>
              </div>

              {/* To Location */}
              <div className="flex items-center px-2 space-x-1 truncate">
                {/* <ArrowRightLeft className="h-4 w-4 text-gray-400" /> */}
                <MapPin className="w-5 h-5 text-red-600 mr-3" />
                {/* <span className="font-medium text-gray-600">To:</span> */}
                <span className=" ml-1 truncate">Flat 102, Sidhardh Heaven, Mahesh Nagar</span>
              </div>

              {/* Date */}
              <div className="flex items-center whitespace-nowrap">
                {/* <Calendar className="h-4 w-4 text-gray-400 mr-1" /> */}
                <span className="font-medium text-gray-600 mr-2">
                  Shift Date:
                </span>
                <span className=" ml-1">25 Dec 2024</span>
              </div>

              {/* Type */}
              <div className="flex items-center whitespace-nowrap">
                <span className="font-medium text-gray-600 mr-2">
                  Shift Type:
                </span>
                <span className=" ml-1">Domestic</span>
              </div>

              {/* Modify Button */}
              <div>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-1" />
                  Modify
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Bar */}
      <div className="flex  px-0 lg:px-4 ">
        {/* Categories Sidebar */}
        <div className="w-24 sm:w-28 lg:w-48 bg-white shadow-sm h-full overflow-y-auto px-2 pt-4 md:w-36 md:pt-3">
  <div className="space-y-4 md:space-y-1">
    {categories.map((category) => (
      <button
        key={category.id}
        onClick={() => setSelectedCategory(category.id)}
        className={`
          flex items-center w-full rounded-2xl transition-colors duration-300
          ${selectedCategory === category.id
            ? "bg-gradient-to-b from-primary/15 to-white text-primary border "
            : "text-gray-700 hover:bg-gray-100"}

          flex-col justify-center p-2 text-center
          md:flex-row md:justify-start md:items-center  md:h-16 md:px-2 md:py-3 md:rounded-lg md:text-left
        `}
      >
        {/* Icon */}
        <span className="text-2xl mb-1 md:mb-0 md:mr-2">
          {category.icon}
        </span>

        {/* Name */}
        <span className="text-xs font-medium md:text-sm break-words">
          {category.name}
        </span>
      </button>
    ))}
  </div>
</div>


        {/* Items Grid */}
        <div className="flex-1 overflow-y-auto h-full p-3 sm:p-4 scrollbar-hide">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6  gap-3 ">
            {(items[selectedCategory as keyof typeof items] || []).map(
              (item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow min-w-0 overflow-hidden max-h-[220px] sm:max-h-none flex flex-col"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-t-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="px-2 py-1 sm:px-3 sm:py-2 flex-1 flex flex-col justify-between">
                    <h4 className="font-medium text-xs sm:text-sm text-gray-900 truncate mb-1 sm:mb-2">
                      {item.name}
                    </h4>

                    {selectedItems[item.id] ? (
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => updateItemCount(item.id, false)}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-semibold text-sm sm:text-lg px-2 sm:px-3">
                          {selectedItems[item.id]}
                        </span>
                        <button
                          onClick={() => updateItemCount(item.id, true)}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => updateItemCount(item.id, true)}
                        variant="outline"
                        size="sm"
                        className="w-full border-primary text-primary text-xs sm:text-sm py-1 sm:py-2 hover:bg-primary hover:text-white"
                      >
                        ADD
                      </Button>
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-6">
              {/* Left section: Badge + Buttons in row for mobile too */}
              <div className="flex w-full justify-between items-center gap-2">
                <div className="hidden sm:block"></div>

                {/* Left button: View Selected Items */}
                <Button
                  variant="outline"
                  className="px-2 text-primary border-gray-300 text-sm sm:text-base whitespace-nowrap"
                >
                  <Badge
                    variant="outline"
                    className=" text-sm sm:text-base px-3 py-1"
                  >
                    {getTotalItems()}
                  </Badge>{" "}
                  Selected Items
                </Button>

                {/* Right button: Next - Find Movers */}
                <Button
                  onClick={handleNext}
                  className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base shiftyng-gradient hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Next - Find Movers
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
