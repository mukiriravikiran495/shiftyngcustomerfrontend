import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  Search,
  MapPin,
  ArrowUpDown,
  Calendar,
  Star,
  Shield,
  Clock,
  Truck,
  ChevronRight,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Vendors = () => {
  const navigate = useNavigate();
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
      image:
        "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=100&h=100&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1566472049219-ca3ca39c3c0a?w=100&h=100&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=100&h=100&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=100&h=100&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=100&h=100&fit=crop",
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
      features: ["Premium Service", "White Glove", "Full Insurance"],
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

  return (
    <div className="min-h-screen bg-gray-50">
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
                  onClick={() => navigate("/items")}
                  className="mr-3"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>
              <h1 className="text-2xl font-bold text-primary">Shiftyng</h1>
            </div>

            {/* Right section (Login) */}
            <div className="flex justify-end flex-1">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

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
                  onClick={() => navigate("/items")}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>

              {/* Right Column: All Details stacked vertically */}
              <div className="flex flex-col space-y-1">
                {/* From Location */}
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3" />
                  <span className="text-gray-600 truncate">Flat 102, Sidhardh Heaven, Mahesh Nagar </span>
                </div>

                {/* To Location */}
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3" />
                  <span className="text-gray-600 truncate">lat 102, Sidhardh Heaven, Mahesh Nagar</span>
                </div>

                {/* Date and Type */}
                <div className="flex items-center space-x-8">
                  <div className="flex items-center whitespace-nowrap">
                    <span className="font-medium ">Shift Date:</span>
                    <span className="text-gray-600 ml-1">25 Dec 2024</span>
                  </div>
                  <div className="flex items-center whitespace-nowrap">
                    <span className="font-medium ">Shift Type:</span>
                    <span className="text-gray-600 ml-1">Domestic</span>
                  </div>
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
                {/* <span className="font-medium text-gray-600">From:</span> */}
                <span className="ml-1 truncate">Mumbai</span>
              </div>

              {/* To Location */}
              <div className="flex items-center px-2 space-x-1 truncate">
                {/* <ArrowRightLeft className="h-4 w-4 text-gray-400" /> */}
                <MapPin className="w-5 h-5 text-red-600 mr-3" />
                {/* <span className="font-medium text-gray-600">To:</span> */}
                <span className=" ml-1 truncate">Delhi</span>
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

      {/* filter bar  */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-28">
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
          <div className="flex-1">
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {filteredVendors.length} Movers Found
                </h2>
                <select className="border rounded-md px-3 py-2 text-sm">
                  <option>Sort by: Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                  <option>Delivery Time</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {filteredVendors.map((vendor) => (
                <Card
                  key={vendor.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <img
                        src={vendor.image}
                        alt={vendor.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold">
                                {vendor.name}
                              </h3>
                              {vendor.verified && (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-800"
                                >
                                  <Shield className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
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

                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-1">
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
                            {vendor.services.map((service) => (
                              <Badge
                                key={service}
                                variant="outline"
                                className="text-xs"
                              >
                                {service}
                              </Badge>
                            ))}
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

                        <div className="flex items-center justify-between">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button className="shiftyng-gradient hover:opacity-90 transition-opacity">
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
