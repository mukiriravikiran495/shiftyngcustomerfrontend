import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LoginModal } from "@/components/LoginModal";
import { useBooking } from "@/context/BookingContext";
import { useItemContext } from "@/context/ItemContext";


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
import { Link, useNavigate, useLocation } from "react-router-dom";

const Items = () => {
  const location = useLocation();
  const { booking } = useBooking();
  const { selectedItems, setSelectedItems } = useItemContext();
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("furniture");


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
      {
        id: 17,
        name: "Television",
        image:
          "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
        category: "electronics",
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

  const updateItemCount = (
    item: { id: string; name: string; image: string; category: string },
    increase: boolean
  ) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        const updated = prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: increase ? i.quantity + 1 : Math.max(i.quantity - 1, 0) }
            : i
        ).filter(i => i.quantity > 0); // remove if quantity becomes 0
        return updated;
      } else if (increase) {
        return [...prev, { ...item, quantity: 1 }];
      }
      return prev;
    });
  };

  // const getTotalItems = () => {
  //   return Object.values(selectedItems).reduce((sum, count) => sum + count, 0);
  // };
  const getTotalItems = () => {
    return selectedItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleNext = () => {
    navigate("/vendors"), {

    };
  }
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
    <div className="w-full  bg-background">
      {/* Header */}
      {/* <header className=" bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 "> */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
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
              <div>
                <button
                  className="text-[30px] font-bold text-primary font-weight-900"
                  style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                  onClick={() => navigate("/")}
                >
                  <h1>Shiftyng</h1>
                </button>
              </div>
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
      <div className="bg-white  shadow-sm">
        <div className="w-full  mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 lg:p-8 w-full">
            <div className="w-full">
              {/* Mobile Layout */}
              <div className="md:hidden px-2 py-2 space-y-2 bg-white rounded-xl shadow-sm text-sm w-full ">
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
                <div className="md:hidden px-2 h-16 space-y-2 text-sm bg-white">
                  <div className="flex items-center gap-2 text-gray-600 truncate">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="truncate">{booking.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="truncate">{booking.dropLocation}</span>
                  </div>

                  {/* Single Row for Shift Date and Shift Type */}
                  <div className="flex justify-between gap-4 text-gray-600 text-xs px-4">
                    <span>
                      <span className="font-medium">Shift Date:</span> {booking.shiftDate ? new Date(booking.shiftDate).toLocaleDateString() : "N/A"}
                    </span>
                    <span>
                      <span className="font-medium">Shift Type:</span> {booking.shiftType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid h-8 border-r grid-cols-[auto_2fr_2fr_minmax(120px,1fr)_minmax(120px,0.8fr)_auto] items-center gap-2 text-sm">
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
                  <span className="ml-1 truncate">{booking.pickupLocation}</span>
                </div>

                {/* To Location */}
                <div className="flex items-center px-2 space-x-1 truncate">
                  {/* <ArrowRightLeft className="h-4 w-4 text-gray-400" /> */}
                  <MapPin className="w-5 h-5 text-red-600 mr-3" />
                  {/* <span className="font-medium text-gray-600">To:</span> */}
                  <span className=" ml-1 truncate">{booking.dropLocation}</span>
                </div>

                {/* Date */}
                <div className="flex items-center whitespace-nowrap">
                  {/* <Calendar className="h-4 w-4 text-gray-400 mr-1" /> */}
                  <span className="font-medium text-gray-600 mr-2">
                    Shift Date:
                  </span>
                  <span className=" ml-1 ">{booking.shiftDate ? new Date(booking.shiftDate).toLocaleDateString() : "N/A"}</span>
                </div>

                {/* Type */}
                <div className="flex items-center whitespace-nowrap">
                  <span className="font-medium text-gray-600 mr-2">
                    Shift Type:
                  </span>
                  <span className=" ml-1">{booking.shiftType}</span>
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
      </div>
      {/* Category Bar */}
      {/* <div className="flex  px-1  lg:px-8 "> */}
      <div className="flex w-full  mx-auto px-1 sm:px-6 lg:px-6">
        {/* Categories Sidebar */}
        <div className="hidden lg:block w-24 sm:w-28 md:w-36 lg:w-48 xl:w-48 2xl:w-60  rounded-2xl shadow-sm h-full overflow-y-auto px-4 pt-4 bg-gradient-to-b from-gray to-white">
          <div className="flex flex-col space-y-3 bg-gradient-to-b from-red to-white">
            {categories.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-3 px-3 py-2  rounded-xl transition-all duration-300 ${isSelected ? "bg-gradient-to-b from-red-100 to-white text-[#BA1C1C]" : "text-primary hover:bg-white/10"
                    }`}
                >
                  {/* Icon inside a larger circle */}
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md transition-all ${isSelected
                        ? "bg-white text-[#BA1C1C]"
                        : "bg-white/80 text-[#BA1C1C]"
                      }`}
                  >
                    <span className="text-3xl">{category.icon}</span>
                  </div>

                  {/* Category name */}
                  <span
                    className={`text-sm font-semibold ${isSelected ? "text-[#BA1C1C]" : "text-primary"
                      }`}
                  >
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>


        {/* {mobile category side bar} */}
        <div className="lg:hidden w-24 sm:w-28 md:w-36 lg:w-60 xl:w-72 2xl:w-80 rounded-2xl bg-white shadow-sm h-full overflow-y-auto px-2 pt-2 md:pt-3">
          <div className="space-y-4 md:space-y-1 rounded-2xl bg-gradient-to-b from-gray to-white text-primary">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
          flex items-center w-full rounded-2xl transition-colors duration-300
          ${selectedCategory === category.id
                    ? "bg-gradient-to-b from-primary/20 to-white text-primary border "
                    : "text-gray-700 hover:bg-gray-100"
                  }

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
        <div className="flex-1 overflow-y-auto h-full p-3 sm:p-4 scrollbar-hide ">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 xl:grid-cols-7  gap-3 ">
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

                    {selectedItems.find((selected) => selected.id === String(item.id)) ? (
                      <div className="flex items-center justify-center gap-1 ">
                        <button
                          onClick={() =>
                            updateItemCount(
                              {
                                id: String(item.id),
                                name: item.name,
                                image: item.image,
                                category: selectedCategory,
                              },
                              false
                            )
                          }
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>

                        <span className="font-semibold text-sm sm:text-lg px-2 sm:px-3">
                          {
                            selectedItems.find((selected) => selected.id === String(item.id))?.quantity ?? 0
                          }
                        </span>

                        <button
                          onClick={() =>
                            updateItemCount(
                              {
                                id: String(item.id),
                                name: item.name,
                                image: item.image,
                                category: selectedCategory,
                              },
                              true
                            )
                          }
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <Button
                        onClick={() =>
                          updateItemCount(
                            {
                              id: String(item.id),
                              name: item.name,
                              image: item.image,
                              category: selectedCategory,
                            },
                            true
                          )
                        }
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
          <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
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
