import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { LoginModal } from "@/components/LoginModal";
import {
  ArrowLeft,
  Search,
  MapPin,
  Star,
  Shield,
  Clock,
  Truck,
  ChevronRight,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MobileFilters from "@/components/MobileFilters";

const Vendors = () => {
  const navigate = useNavigate();
  const handleVendorClick = (vendor: any) => {
    // Navigate to vendor detail page (adjust the route as needed)
    navigate("/BookingDetails");
  };
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Relevance");
  const [selectedFilters, setSelectedFilters] = useState({
    rating: [0],
    price: [0, 50000],
    services: [] as string[],
    vehicleType: [] as string[],
  });

  const vendors = [
    {
      id: 1,
      name: "Swift Movers & Packers",
      rating: 4.8,
      reviews: 1250,
      price: 12500,
      originalPrice: 15000,
      deliveryTime: "Same Day",
      image: "/icons/movers1.jpg",
      vehicleType: "Truck",
      services: [
        "Packing",
        "Loading",
        "Transportation",
        "Unpacking",
        "Insurance",
      ],
      verified: true,
      discount: 17,
      features: ["Free Cancellation", "Live Tracking", "Professional Team"],
    },
    {
      id: 2,
      name: "Premier Relocations",
      rating: 4.6,
      reviews: 890,
      price: 11200,
      originalPrice: 14000,
      deliveryTime: "Next Day",
      image: "/icons/movers2.jpg",
      vehicleType: "Mini Truck",
      services: ["Packing", "Loading", "Transportation", "Insurance"],
      verified: true,
      discount: 20,
      features: ["Trained Staff", "Quality Packaging", "Door to Door"],
    },
    {
      id: 3,
      name: "Safe Move Express",
      rating: 4.9,
      reviews: 2100,
      price: 13800,
      originalPrice: 16000,
      deliveryTime: "Same Day",
      image: "/icons/movers3.jpg",
      vehicleType: "Large Truck",
      services: [
        "Packing",
        "Loading",
        "Transportation",
        "Unpacking",
        "Insurance",
        "Storage",
      ],
      verified: true,
      discount: 14,
      features: ["Premium Insurance", "24/7 Support", "GPS Tracking"],
    },
    {
      id: 4,
      name: "Quick Shift Logistics",
      rating: 4.5,
      reviews: 670,
      price: 10500,
      originalPrice: 12000,
      deliveryTime: "Next Day",
      image: "/icons/movers4.jpg",
      vehicleType: "Tempo",
      services: ["Packing", "Loading", "Transportation"],
      verified: false,
      discount: 13,
      features: ["Budget Friendly", "Quick Service", "Local Experts"],
    },
    {
      id: 5,
      name: "Elite Packers & Movers",
      rating: 4.7,
      reviews: 1500,
      price: 15200,
      originalPrice: 18000,
      deliveryTime: "Same Day",
      image: "/icons/movers1.jpg",
      vehicleType: "Container",
      services: [
        "Packing",
        "Loading",
        "Transportation",
        "Unpacking",
        "Insurance",
        "Assembly",
      ],
      verified: true,
      discount: 16,
      features: ["Premium Service", "White Glove"],
    },
  ];

  const serviceOptions = [
    "Packing",
    "Loading",
    "Transportation",
    "Unpacking",
    "Insurance",
    "Storage",
    "Assembly",
  ];
  const vehicleOptions = [
    "Tempo",
    "Mini Truck",
    "Truck",
    "Large Truck",
    "Container",
  ];

  const handleServiceFilter = (service: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleVehicleFilter = (vehicle: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      vehicleType: prev.vehicleType.includes(vehicle)
        ? prev.vehicleType.filter((v) => v !== vehicle)
        : [...prev.vehicleType, vehicle],
    }));
  };

  const filteredVendors = vendors.filter((vendor) => {
    const ratingMatch = vendor.rating >= selectedFilters.rating[0];
    const priceMatch =
      vendor.price >= selectedFilters.price[0] &&
      vendor.price <= selectedFilters.price[1];
    const serviceMatch =
      selectedFilters.services.length === 0 ||
      selectedFilters.services.some((service) =>
        vendor.services.includes(service)
      );
    const vehicleMatch =
      selectedFilters.vehicleType.length === 0 ||
      selectedFilters.vehicleType.includes(vendor.vehicleType);

    return ratingMatch && priceMatch && serviceMatch && vehicleMatch;
  });
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left section (logo + back button) */}
            <div className="flex items-center flex-1">
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate("/items")}
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
      <div className="bg-white border-b shadow-sm ">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-4">
          <div className="w-full">
            {/* Mobile Layout */}
            <div className="md:hidden flex items-start gap-2 text-sm px-2">
              {/* Left Column: Back Button */}
              <div className="hidden lg:block">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate("/items")}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>

              {/* Right Column: All Details stacked vertically */}
              {/* Mobile Layout - Clean Version */}
              <div className="md:hidden px-4  space-y-2 text-sm bg-white ">
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
                  onClick={() => navigate("/items")}
                  className="mr-2"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>

              {/* From Location */}
              <div className="flex items-center px-2 space-x-1 truncate">
                <MapPin className="w-5 h-5 text-green-600 mr-3" />
                <span className="ml-1 truncate">Mumbai</span>
              </div>

              {/* To Location */}
              <div className="flex items-center px-2 space-x-1 truncate">
                <MapPin className="w-5 h-5 text-red-600 mr-3" />
                <span className="ml-1 truncate">Delhi</span>
              </div>

              {/* Date */}
              <div className="flex items-center whitespace-nowrap">
                <span className="font-medium text-gray-600 mr-2">
                  Shift Date:
                </span>
                <span className="ml-1">25 Dec 2024</span>
              </div>

              {/* Type */}
              <div className="flex items-center whitespace-nowrap">
                <span className="font-medium text-gray-600 mr-2">
                  Shift Type:
                </span>
                <span className="ml-1">Domestic</span>
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

      {/* Mobile Filters */}
      {/* Mobile Filters + Sort */}
      {/* Mobile Filters + Sort - Horizontal Scrollable */}
      <div className="lg:hidden bg-white px-0 w-full ">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar whitespace-nowrap">
          <MobileFilters
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            serviceOptions={serviceOptions}
            vehicleOptions={vehicleOptions}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
          <select className=" hidden lg:block border rounded-md px-3 py-2 text-sm bg-white shrink-0">
            <option>Sort by: Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating: High to Low</option>
            <option>Delivery Time</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 bg-white sm:px-6 lg:px-8 sm:py-0 lg:py-4 overflow-x-hidden">
        <div className="flex gap-6 ">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block w-80">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky ">
              <div className="flex items-center mb-6">
                <Filter className="h-5 w-5 text-gray-600 mr-2" />
                <h3 className="font-semibold text-lg">Filters</h3>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedFilters.rating[0] === rating}
                        onChange={() =>
                          setSelectedFilters((prev) => ({
                            ...prev,
                            rating: [rating],
                          }))
                        }
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>{rating} & above</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="px-2">
                  <Slider
                    value={selectedFilters.price}
                    onValueChange={(value) =>
                      setSelectedFilters((prev) => ({ ...prev, price: value }))
                    }
                    max={50000}
                    min={5000}
                    step={1000}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{selectedFilters.price[0].toLocaleString()}</span>
                    <span>₹{selectedFilters.price[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Services</h4>
                <div className="space-y-2">
                  {serviceOptions.map((service) => (
                    <label key={service} className="flex items-center">
                      <Checkbox
                        checked={selectedFilters.services.includes(service)}
                        onCheckedChange={() => handleServiceFilter(service)}
                        className="mr-2"
                      />
                      <span className="text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Vehicle Type */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Vehicle Type</h4>
                <div className="space-y-2">
                  {vehicleOptions.map((vehicle) => (
                    <label key={vehicle} className="flex items-center">
                      <Checkbox
                        checked={selectedFilters.vehicleType.includes(vehicle)}
                        onCheckedChange={() => handleVehicleFilter(vehicle)}
                        className="mr-2"
                      />
                      <span className="text-sm">{vehicle}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() =>
                  setSelectedFilters({
                    rating: [0],
                    price: [0, 50000],
                    services: [],
                    vehicleType: [],
                  })
                }
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Vendors List */}
          <div className="flex-1 w-32 ">
            <div className="mb-4">
              <div className="hidden lg:block flex flex-col sm:flex-row sm:items-center justify-between gap-3 ">
                <select className="border rounded-md px-3 py-2 text-sm bg-white w-full sm:w-auto">
                  <option>Sort by: Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                  <option>Delivery Time</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 sm:w-32 lg:w-full border-1 shadow-lg ">
              {filteredVendors.map((vendor) => (
                <Card
                  key={vendor.id}
                  className=" hover:shadow-md transition-shadow cursor-pointer md:rounded-lg md:border md:shadow-sm overflow-hidden w-full"
                >
                  <CardContent className="p-4 mt-0">
                    {/* Mobile Layout - Stack vertically */}
                    {/* Mobile Layout - New Design */}
                    <div className="md:hidden px-0 ">
                      <button
                        onClick={() => handleVendorClick(vendor)}
                        className="w-full text-left md:hidden block p-0 m-0 overflow-hidden "
                      >
                        <div className="md:hidden">
                          <div className="mb-3">
                            <img
                              src={vendor.image}
                              alt={vendor.name}
                              className="w-full h-40 object-cover rounded-lg max-w-full"
                            />
                          </div>

                          <div className="mb-2">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold">
                                {vendor.name}
                              </h3>
                              {vendor.verified && (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-800 text-xs"
                                >
                                  <Shield className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center text-sm text-gray-600 gap-3 flex-wrap">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                                {vendor.rating}
                              </div>
                              <div className="text-gray-400">|</div>
                              <div>({vendor.reviews} reviews)</div>
                            </div>
                          </div>

                          <div className="mb-3 flex items-center justify-between">
                            {/* Right: Original Price + Discount Badge */}
                            <div className="flex items-center gap-2">
                              <Badge variant="destructive" className="text-xs">
                                {vendor.discount}% OFF
                              </Badge>
                              <span className="text-sm text-gray-500 line-through">
                                ₹{vendor.originalPrice.toLocaleString()}
                              </span>
                            </div>
                            {/* Left: Discounted Price */}
                            <div className="text-xl font-bold text-primary">
                              ₹{vendor.price.toLocaleString()}
                            </div>
                          </div>
                          {/* <div className="text-xs text-gray-600">
                          All inclusive
                        </div> */}

                          <div className="mb-3 mt-2">
                            <div className="flex items-center gap-1 overflow-hidden">
                              {vendor.services.slice(0, 3).map((service) => (
                                <Badge
                                  key={service}
                                  variant="outline"
                                  className="text-xs whitespace-nowrap"
                                >
                                  {service}
                                </Badge>
                              ))}

                              {vendor.services.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs whitespace-nowrap"
                                >
                                  +{vendor.services.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center gap-1 overflow-hidden">
                              {vendor.features.slice(0, 2).map((feature) => (
                                <span
                                  key={feature}
                                  className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded whitespace-nowrap"
                                >
                                  ✓ {feature}
                                </span>
                              ))}

                              {vendor.features.length > 2 && (
                                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded whitespace-nowrap">
                                  +{vendor.features.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    </div>
                    {/* Desktop Layout - Horizontal */}
                    <div className="hidden md:flex gap-4">
                      <img
                        src={vendor.image}
                        alt={vendor.name}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <h3 className="text-lg font-semibold truncate">
                                {vendor.name}
                              </h3>
                              {vendor.verified && (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-800 text-xs"
                                >
                                  <Shield className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                <span className="font-medium">
                                  {vendor.rating}
                                </span>
                                <span className="ml-1">
                                  ({vendor.reviews} reviews)
                                </span>
                              </div>
                              <div className="flex items-center">
                                <Truck className="h-4 w-4 mr-1" />
                                <span>{vendor.vehicleType}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{vendor.deliveryTime}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right ml-2">
                            <div className="flex items-center gap-2 mb-1 justify-end">
                              <span className="text-sm text-gray-500 line-through">
                                ₹{vendor.originalPrice.toLocaleString()}
                              </span>
                              <Badge variant="destructive" className="text-xs">
                                {vendor.discount}% OFF
                              </Badge>
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              ₹{vendor.price.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">
                              All inclusive
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex flex-wrap gap-2">
                            {vendor.services.slice(0, 4).map((service) => (
                              <Badge
                                key={service}
                                variant="outline"
                                className="text-xs"
                              >
                                {service}
                              </Badge>
                            ))}
                            {vendor.services.length > 4 && (
                              <Badge variant="outline" className="text-xs">
                                +{vendor.services.length - 4} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {vendor.features.map((feature) => (
                              <span
                                key={feature}
                                className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded"
                              >
                                ✓ {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button
                            onClick={() => handleVendorClick(vendor)}
                            className="shiftyng-gradient hover:opacity-90 transition-opacity"
                          >
                            Book Now
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendors;
