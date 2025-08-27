import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LoginModal } from "@/components/LoginModal";
import { useItemContext } from "@/context/ItemContext";
import { useRef, useEffect } from "react";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import LocationInputInItems from "@/components/LocationInputInItems";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { setBooking } from "@/store/bookingSlice";


const Items = () => {
  const location = useLocation();
  const booking = useSelector((state: RootState) => state.booking);
  const { selectedItems, setSelectedItems } = useItemContext();
  const navigate = useNavigate();
  const [hasSearched, setHasSearched] = useState(false);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("furniture");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedMobile = localStorage.getItem("mobileNumber");
    if (savedMobile) {
      setIsLoggedIn(true);
      setMobileNumber(savedMobile);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("mobileNumber");
    setIsLoggedIn(false);
    setMobileNumber("");
  };

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const handleLoginSuccess = (mobile: string) => {
    setMobileNumber(mobile);
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

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
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }
  return (
    <div className="w-full  bg-background">
      {/* Header */}
      {/* <header className=" bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 "> */}
      <header className="bg-white shadow-sm border-b pl-4 pr-6 lg:pl-16 lg:pr-16 sticky top-0 z-50">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo */}
          <div>
            <button
              className="text-[30px] font-bold text-primary font-weight-900"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              onClick={() => navigate("/")}
            >
              <h1>Shiftyng</h1>
            </button>
          </div>

          {/* Right Side: Nav + Login/Profile */}
          <div className="md:flex items-center space-x-8">
            <a
              href="#offers"
              className="text-[18px] hidden lg:block text-[#000000] hover:text-primary transition-colors fontFamily-Arial"
            >
              Become Partner
            </a>
            <a
              href="#offers"
              className="text-[18px] hidden lg:block text-[#000000] hover:text-primary transition-colors fontFamily-Arial "
            >
              Offers
            </a>
            <a
              href="#help"
              className="text-[18px] hidden lg:block text-[#000000] hover:text-primary transition-colors fontFamily-Arial"
            >
              Need Help ?
            </a>

            <div className="flex justify-end flex-1">
              {isLoggedIn ? (
                <ProfileDropdown
                  mobile={mobileNumber}
                  onLogout={handleLogout}
                />
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setIsLoginOpen(true)}
                  className="text-[18px] border-black text-black hover:bg-primary hover:text-white fontFamily-Arial"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
      {/* Booking Details Bar */}
      <div className="w-full bg-white mb-4">
        <div className="flex items-center gap-3 px-6 py-4 ml-24 mr-24 ">
          <div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/bookingform")}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          {/* From */}
          <LocationInputInItems
            label="FROM"
            placeholder="Enter Pickup Location"
            value={booking.pickupLocation || ""}
            onSelect={(address, lat, lng) => {
              console.log("FROM Selected:", address);
            }}
          />

          {/* Swap Icon */}
          <div className="text-gray-400">
            ⇆
          </div>

          {/* To */}
          <LocationInputInItems
            label="TO"
            placeholder="Enter Drop Location"
            value={booking.dropLocation || ""}
            onSelect={(address, lat, lng) => {
              console.log("TO Selected:", address);
            }}
          />

          {/* Depart */}
          <div className=" flex flex-col bg-gray-100 px-4 py-2 flex-1 rounded-lg h-[50px]">
            <span className="text-xs text-gray-500">SHIFT DATE</span>

            <DatePicker
              selected={booking.shiftDate ? new Date(booking.shiftDate) : null}
              onChange={(date: Date | null) => console.log("Date changed:", date)}
              dateFormat="EEE, dd MMM yyyy"
              className="font-semibold text-gray-900 bg-transparent outline-none cursor-pointer text-xs"
            />
          </div>

          <div className="flex flex-col bg-gray-100 px-4 py-2 flex-1 rounded-lg h-[50px]">
            <span className="text-xs text-gray-500">SHIFT TYPE</span>
            <select
              className="flex-1 outline-none bg-transparent text-gray-900 text-xs border-0"
              value={booking.shiftType || ""}
              onChange={(e) => console.log("Shift type changed:", e.target.value)}
            >
              <option value="" disabled>
                Select shift type
              </option>
              <option value="onebhk">ONE BHK</option>
              <option value="twobhk">TWO BHK</option>
              <option value="threebhk">THREE BHK</option>
              <option value="fourplus">4+ BHK</option>
              <option value="office">Office Shifting</option>
              <option value="vehicle">Vehicle Transport</option>
              <option value="storage">Storage</option>
            </select>
          </div>

          {/* Search Button */}
          <button className="h-[50px] rounded-lg bg-gradient-to-r from-[#BA1C1C] to-[#BA1C1C] text-white font-semibold px-8 py-3 shadow hover:from-[#BA1C1C] hover:to-[#BA1C1C] transition">
            SEARCH
          </button>
        </div>
      </div>


      {/* Category Bar */}
      <div className="w-full">
        <div className="flex mx-auto px-1 sm:px-6 lg:px-6 lg:ml-24 lg:mr-24 ">
          {/* Categories Sidebar */}
          <div className="hidden lg:block shadow-lg w-24 sm:w-28 md:w-36 lg:w-48 xl:w-48 2xl:w-60  shadow-sm h-full overflow-y-auto  pt-4 bg-gradient-to-b from-gray to-white">
            <div className="flex flex-col  space-y-3 ">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-3 px-3 py-2  rounded-md transition-all duration-300 ${isSelected ? "bg-gradient-to-b from-white to-gray-200 text-[#BA1C1C]" : "text-primary hover:bg-white/10"
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
                    className="bg-white rounded-lg border   transition-shadow min-w-0 overflow-hidden max-h-[220px] sm:max-h-none flex flex-col"
                  >
                    <div className="aspect-square hover:shadow-md w-full overflow-hidden rounded-t-lg">
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
