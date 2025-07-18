// MobileFilters.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Star, X } from "lucide-react";


interface MobileFiltersProps {
  selectedFilters: {
    rating: number[];
    price: number[];
    services: string[];
    vehicleType: string[];
  };
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<{
      rating: number[];
      price: number[];
      services: string[];
      vehicleType: string[];
    }>
  >;
  serviceOptions: string[];
  vehicleOptions: string[];
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

const MobileFilters = ({
  selectedFilters,
  setSelectedFilters,
  serviceOptions,
  vehicleOptions,
  sortOption,
  setSortOption,
}: MobileFiltersProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent, type: string) => {
    const moved = Math.abs(e.changedTouches[0].clientX - (touchStartX ?? 0));
    if (moved < 10) {
      setOpenDropdown((prev) => (prev === type ? null : type));
    }
  };

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

  const getRatingText = () =>
    selectedFilters.rating[0] > 0
      ? `${selectedFilters.rating[0]}+ Stars`
      : "Rating";

  const getPriceText = () =>
    selectedFilters.price[0] > 0 || selectedFilters.price[1] < 50000
      ? `₹${selectedFilters.price[0] / 1000}K-₹${selectedFilters.price[1] / 1000}K`
      : "Price";

  const getServicesText = () =>
    selectedFilters.services.length > 0
      ? selectedFilters.services.length === 1
        ? selectedFilters.services[0]
        : `${selectedFilters.services.length} Services`
      : "Services";

  const getVehicleText = () =>
    selectedFilters.vehicleType.length > 0
      ? selectedFilters.vehicleType.length === 1
        ? selectedFilters.vehicleType[0]
        : `${selectedFilters.vehicleType.length} Types`
      : "Vehicle";

  const hasActiveFilters =
    selectedFilters.rating[0] > 0 ||
    selectedFilters.price[0] > 0 ||
    selectedFilters.price[1] < 50000 ||
    selectedFilters.services.length > 0 ||
    selectedFilters.vehicleType.length > 0;

  const clearAllFilters = () => {
    setSelectedFilters({
      rating: [0],
      price: [0, 50000],
      services: [],
      vehicleType: [],
    });
  };

  return (
    <div className="bg-white px-0 py-3 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2 px-4 pb-1 overflow-x-auto whitespace-nowrap hide-scrollbar">   {/* Rating Filter */}
        <DropdownMenu open={openDropdown === "rating"}>
          <DropdownMenuTrigger asChild>
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, "rating")}
            >
              <Button
                variant="outline"
                className={`whitespace-nowrap ${
                  selectedFilters.rating[0] > 0
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {getRatingText()}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Minimum Rating</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2 space-y-2">
              {[4.5, 4.0, 3.5, 3.0, 0].map((rating) => (
                <label
                  key={rating}
                  className="flex items-center cursor-pointer"
                >
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
                    {rating > 0 ? (
                      <>
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span>{rating} & above</span>
                      </>
                    ) : (
                      <span>Any Rating</span>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Price Filter */}
        <DropdownMenu open={openDropdown === "price"}>
          <DropdownMenuTrigger asChild>
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, "price")}
            >
              <Button
                variant="outline"
                className={`whitespace-nowrap ${
                  selectedFilters.price[0] > 0 ||
                  selectedFilters.price[1] < 50000
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {getPriceText()}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-72">
            <DropdownMenuLabel>Price Range</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-4">
              <Slider
                value={selectedFilters.price}
                onValueChange={(value) =>
                  setSelectedFilters((prev) => ({ ...prev, price: value }))
                }
                max={50000}
                min={5000}
                step={1000}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{selectedFilters.price[0].toLocaleString()}</span>
                <span>₹{selectedFilters.price[1].toLocaleString()}</span>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Services Filter */}
        <DropdownMenu open={openDropdown === "services"}>
          <DropdownMenuTrigger asChild>
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, "services")}
            >
              <Button
                variant="outline"
                className={`whitespace-nowrap ${
                  selectedFilters.services.length > 0
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {getServicesText()}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-56 max-h-72 overflow-y-auto"
          >
            <DropdownMenuLabel>Services</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2 space-y-2">
              {serviceOptions.map((service) => (
                <label
                  key={service}
                  className="flex items-center cursor-pointer"
                >
                  <Checkbox
                    checked={selectedFilters.services.includes(service)}
                    onCheckedChange={() => handleServiceFilter(service)}
                    className="mr-2"
                  />
                  <span className="text-sm">{service}</span>
                </label>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Vehicle Type Filter */}
        <DropdownMenu open={openDropdown === "vehicle"}>
          <DropdownMenuTrigger asChild>
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, "vehicle")}
            >
              <Button
                variant="outline"
                className={`whitespace-nowrap ${
                  selectedFilters.vehicleType.length > 0
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {getVehicleText()}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Vehicle Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2 space-y-2">
              {vehicleOptions.map((vehicle) => (
                <label
                  key={vehicle}
                  className="flex items-center cursor-pointer"
                >
                  <Checkbox
                    checked={selectedFilters.vehicleType.includes(vehicle)}
                    onCheckedChange={() => handleVehicleFilter(vehicle)}
                    className="mr-2"
                  />
                  <span className="text-sm">{vehicle}</span>
                </label>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort By Filter */}
        <DropdownMenu open={openDropdown === "sort"}>
          <DropdownMenuTrigger asChild>
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={(e) => handleTouchEnd(e, "sort")}
            >
              <Button
                variant="outline"
                className={`whitespace-nowrap ${
                  sortOption !== "Relevance"
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
              >
                {sortOption}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Sort By</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2 space-y-2 text-sm">
              {["Relevance", "Price: Low to High", "Price: High to Low", "Rating: High to Low", "Delivery Time"].map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSortOption(option);
                    setOpenDropdown(null);
                  }}
                  className={`cursor-pointer px-2 py-1 rounded hover:bg-gray-100 ${
                    sortOption === option ? "bg-primary text-white" : ""
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-gray-700 whitespace-nowrap"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active filters badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1 mt-2 px-4">
          {selectedFilters.rating[0] > 0 && (
            <Badge variant="secondary" className="text-xs">
              {selectedFilters.rating[0]}+ Stars
            </Badge>
          )}
          {(selectedFilters.price[0] > 0 ||
            selectedFilters.price[1] < 50000) && (
            <Badge variant="secondary" className="text-xs">
              ₹{selectedFilters.price[0] / 1000}K-
              {selectedFilters.price[1] / 1000}K
            </Badge>
          )}
          {selectedFilters.services.map((service) => (
            <Badge key={service} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
          {selectedFilters.vehicleType.map((vehicle) => (
            <Badge key={vehicle} variant="secondary" className="text-xs">
              {vehicle}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileFilters;
