import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginModal } from "@/components/LoginModal";
import { Calendar } from "@/components/ui/calendar";
import { useBooking } from "@/context/BookingContext";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  CalendarIcon,
  MapPin,
  ArrowUpDown,
  Calendar as CalendarIcon2,
  Search,
  Truck,
  ShieldCheck,
  Clock,
  HeadphonesIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const testLocations = [
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu",
  "Mumbai, Maharashtra",
  "Delhi",
  "Pune, Maharashtra",
  "Kolkata, West Bengal",
];

// const StaticAutocomplete = ({
//   value,
//   onChange,
//   placeholder,
// }: {
//   value: string;
//   onChange: (val: string) => void;
//   placeholder: string;
// }) => {
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const filtered = testLocations.filter((loc) =>
//     loc.toLowerCase().includes(value.toLowerCase())
//   );

//   return (
//     <div className="relative">
//       <input
//         type="text"
//         value={value}
//         placeholder={placeholder}
//         onChange={(e) => {
//           onChange(e.target.value);
//           setShowSuggestions(true);
//         }}
//         onFocus={() => setShowSuggestions(true)}
//         onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
//         className="w-full bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400 text-base font-medium"
//       />
//       {showSuggestions && value && (
//         <ul className="absolute left-0 right-0 bg-white shadow-lg rounded z-10 max-h-60 overflow-y-auto mt-1 border">
//           {filtered.length > 0 ? (
//             filtered.map((loc) => (
//               <li
//                 key={loc}
//                 onMouseDown={() => {
//                   onChange(loc);
//                   setShowSuggestions(false);
//                 }}
//                 className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
//               >
//                 {loc}
//               </li>
//             ))
//           ) : (
//             <li className="px-4 py-2 text-sm text-gray-400">No results</li>
//           )}
//         </ul>
//       )}
//     </div>
//   );
// };

import { useRef, useEffect } from "react";

const GooglePlacesAutocomplete = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (window.google && inputRef.current) {
      autocompleteRef.current = new google.maps.places.Autocomplete(
        inputRef.current,
        {
          // types: ["geocode"],
          componentRestrictions: { country: "in" }, // Optional: restrict to India
        }
      );

      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.formatted_address) {
          onChange(place.formatted_address);
        }
      });
    }
  }, []);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400 text-base font-medium"
    />
  );
};


const Index = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const { booking, setBooking } = useBooking();
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [currentOfferSlide, setCurrentOfferSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const offers = [
    {
      id: 1,
      image: "/icons/offer1.jpg",
      title: "50% Off First Move",
    },
    {
      id: 2,
      image: "/icons/offer4.jpg",
      title: "Free Packaging",
    },
    {
      id: 3,
      image: "/icons/offer2.jpg",
      title: "Insurance Cover",
    },
    {
      id: 4,
      image: "/icons/offer3.jpg",
      title: "Same Day Delivery",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=300&h=200&fit=crop",
      title: "Premium Movers",
    },
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=300&h=200&fit=crop",
      title: "24/7 Support",
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=200&fit=crop",
      title: "Expert Packing",
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      title: "Secure Transit",
    },
  ];

  const faqs = [
    {
      question: "How do I book a mover?",
      answer:
        "Simply enter your pickup and drop locations, select your moving date, choose the shift type, and click search to browse available movers.",
    },
    {
      question: "What is included in the service?",
      answer:
        "Our service includes professional packing, loading, transportation, unloading, and unpacking. Insurance coverage is also available.",
    },
    {
      question: "How far in advance should I book?",
      answer:
        "We recommend booking at least 2-3 days in advance for local moves and 1-2 weeks for long-distance moves.",
    },
    {
      question: "Are my belongings insured?",
      answer:
        "Yes, all our partner movers provide basic insurance coverage. Premium insurance options are also available.",
    },
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const totalSlides = Math.ceil(offers.length / 4);

  const nextSlide = () => {
    setCurrentOfferSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentOfferSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleSearch = () => {
    if (
      !booking.pickupLocation ||
      !booking.dropLocation ||
      !booking.shiftDate ||
      !booking.shiftType
    ) {
      alert("Please fill in all fields");
      return;
    }

    navigate("/items");
  };
  const swapLocations = () => {
    setBooking((prev) => ({
      ...prev,
      pickupLocation: prev.dropLocation,
      dropLocation: prev.pickupLocation,
    }));
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
  <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
    <div className="w-full bg-background">
      {/* Header */}
      <header className="bg-white  shadow-sm border-b pl-4 pr-6 lg:pl-16 lg:pr-16 ">
        <div className="flex justify-between items-center h-16 ">
          {/* Left Side: Logo */}
          {/* <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">Shiftyng</h1>
          </div> */}
          <div>
            <button
              className="text-[30px] font-bold text-primary font-weight-900"
              style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              onClick={() => navigate("/")}
            >
              <h1>Shiftyng</h1>
            </button>
          </div>


          {/* Right Side: Nav + Login */}
          <div className=" md:flex items-center space-x-8 ">
            <a
              href="#offers"
              className=" hidden lg:block text-[#BA1C1C]  hover:text-primary transition-colors"
            >
              Offers
            </a>
            <a
              href="#help"
              className=" hidden lg:block text-[#BA1C1C] hover:text-primary transition-colors"
            >
              Need Help ?
            </a>
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
      {/* Hero Section */}
      <section
        className="hero-bg py-20 bg-[#F3F3F3]"
        style={{
          // backgroundImage: "url('/icons/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
        }}>
        <div className="w-full mx-auto sm:px-6 lg:px-4 ">
          <div className=" text-center mb-10">
            <h2 className=" text-4xl md:text-5xl font-bold text-[#BA1C1C] lg:text-[#000000] mb-4">
              Moving Made Simple
            </h2>
            <p className=" text-xl text-[#FFFFFF] lg:text-[#000000]">
              Find trusted packers and movers for your next move
            </p>
          </div>

          {/* Booking Form */}

          <div className="w-full max-w-screen-2xl mx-auto px-4 py-4 ">
            {/* Main Form Container */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden ">
              {/* Mobile Layout */}
              <div className="block md:hidden">
                {/* Location Inputs */}
                <div className="relative">
                  {/* Pickup Location */}
                  <div className="flex items-center px-6 py-4 border-b border-gray-200">
                    <MapPin className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">
                        From
                      </label>
                      {/* <input
                        placeholder="Pick up Location"
                        value={bookingForm.pickupLocation}
                        onChange={(e) => setBookingForm({...bookingForm, pickupLocation: e.target.value})}
                        className="w-full bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400 text-base font-medium"
                      /> */}
                      <GooglePlacesAutocomplete
                        value={booking.pickupLocation}
                        onChange={(value) =>
                          setBooking((prev) => ({
                            ...prev,
                            pickupLocation: value,
                          }))
                        }
                        placeholder="Pick up Location"
                      />
                    </div>
                  </div>

                  {/* Swap Button */}
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
                    <button
                      onClick={swapLocations}
                      className="bg-gray-100 rounded-full p-2 shadow-md hover:bg-gray-200 transition-colors"
                    >
                      <ArrowUpDown className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Drop Location */}
                  <div className="flex items-center px-6 py-4 border-b border-gray-200">
                    <MapPin className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">
                        To
                      </label>
                      {/* <input
                        placeholder="Drop Location"
                        value={dropLocation}
                        onChange={(e) => setDropLocation(e.target.value)}
                        className="w-full bg-transparent border-none focus:outline-none text-gray-900 placeholder-gray-400 text-base font-medium"
                      /> */}
                      <GooglePlacesAutocomplete
                        value={booking.dropLocation}
                        onChange={(value) =>
                          setBooking((prev) => ({
                            ...prev,
                            dropLocation: value,
                          }))
                        }
                        placeholder="Drop Location"
                      />
                    </div>
                  </div>
                </div>

                {/* Date and Type Row */}
                <div className="flex border-b border-gray-500 ">
                  {/* Date Picker */}
                  <div className="flex items-center px-6 py-6 lg:py-4">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">
                        Date of Journey
                      </label>
                      <Popover open={openMobile} onOpenChange={setOpenMobile} >
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start p-0 h-auto font-normal hover:bg-transparent",
                              !booking.shiftDate && "text-gray-400"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>
                              {booking.shiftDate instanceof Date && !isNaN(booking.shiftDate.getTime())
                                ? format(booking.shiftDate, "dd MMM, yyyy")
                                : "Select Date"}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={booking.shiftDate ?? undefined}
                            onSelect={(date) => {
                              if (date) {
                                setBooking((prev) => ({
                                  ...prev,
                                  shiftDate: date, // store as Date object
                                }));
                                setOpenMobile(false);
                              }
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Shift Type */}
                  <div className="flex-1 px-6 py-4">
                    <label className="text-xs text-gray-500 block mb-2">
                      Shift Type
                    </label>
                    <Select
                      value={booking.shiftType}
                      onValueChange={(value) =>
                        setBooking((prev) => ({ ...prev, shiftType: value }))
                      }
                    >
                      <SelectTrigger className="w-full p-0 border-none focus:ring-0 text-left bg-transparent h-auto shadow-none">
                        <SelectValue
                          placeholder="Select Type"
                          className="text-base"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1 BHK">One BHK</SelectItem>
                        <SelectItem value="2 BHK">Two BHK</SelectItem>
                        <SelectItem value="3 BHK">Three BHK</SelectItem>
                        <SelectItem value="duplex">Duplex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Desktop/Tablet Layout */}
              <div className="hidden md:block">
                <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                  {/* Pickup Location */}
                  <div className="flex items-center px-6 py-6 lg:py-4">
                    <MapPin className="w-5 h-5 text-green-600 mr-3" />
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">
                        From
                      </label>
                      {/* <StaticAutocomplete
                        value={booking.pickupLocation}
                        onChange={(value) =>
                          setBooking((prev) => ({
                            ...prev,
                            pickupLocation: value,
                          }))
                        }
                        placeholder="Pick up Location"
                      /> */}

                      <GooglePlacesAutocomplete
                        value={booking.pickupLocation}
                        onChange={(value) =>
                          setBooking((prev) => ({
                            ...prev,
                            pickupLocation: value,
                          }))
                        }
                        placeholder="Pick up Location"
                      />

                    </div>
                  </div>

                  {/* Drop Location */}
                  {/* Drop Location */}
                  <div className="flex items-center px-6 py-6 lg:py-4">
                    <MapPin className="w-5 h-5 text-red-600 mr-3" />
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">
                        To
                      </label>
                      <GooglePlacesAutocomplete
                        value={booking.dropLocation}
                        onChange={(value) =>
                          setBooking((prev) => ({
                            ...prev,
                            dropLocation: value,
                          }))
                        }
                        placeholder="Drop Location"
                      />
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div className="flex items-center px-6 py-6 lg:py-4">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">
                        Date of Journey
                      </label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start p-0 h-auto font-normal hover:bg-transparent",
                              !booking.shiftDate && "text-gray-400"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>
                              {booking.shiftDate instanceof Date && !isNaN(booking.shiftDate.getTime())
                                ? format(booking.shiftDate, "dd MMM, yyyy")
                                : "Select Date"}
                            </span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={booking.shiftDate ?? undefined}
                            onSelect={(date) => {
                              if (date) {
                                setBooking((prev) => ({
                                  ...prev,
                                  shiftDate: date, // store as Date object
                                }));
                                setOpen(false);
                              }
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>


                  {/* Shift Type */}
                  <div className="flex items-center px-6 py-6 lg:py-4">
                    <div className="flex-1">
                      <label className="text-xs text-gray-500 block mb-1">
                        Shift Type
                      </label>
                      <Select
                        value={booking.shiftType}
                        onValueChange={(value) =>
                          setBooking((prev) => ({ ...prev, shiftType: value }))
                        }
                      >
                        <SelectTrigger className="w-full p-0 border-none focus:ring-0 text-left bg-transparent h-auto shadow-none">
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 BHK">One BHK</SelectItem>
                          <SelectItem value="2 BHK">Two BHK</SelectItem>
                          <SelectItem value="3 BHK">Three BHK</SelectItem>
                          <SelectItem value="Office">Office</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div className="flex justify-center p-6 pt-4 ">
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="w-full sm:w-80 md:w-96 lg:w-[400px] h-12 md:h-14 rounded-full bg-red-600 hover:bg-red-700 text-white font-semibold text-base md:text-lg flex items-center justify-center gap-3 shadow-lg transition-all duration-200"
                >
                  {/* <Search className="w-5 h-5" /> */}
                  {isLoading ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <section id="offers" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Special Offers
          </h3>

          <div className="relative">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${currentOfferSlide * 100}%)`,
                }}
              >
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {offers
                        .slice(slideIndex * 4, (slideIndex + 1) * 4)
                        .map((offer) => (
                          <div
                            key={offer.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                          >
                            <img
                              src={offer.image}
                              alt={offer.title}
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                              <h4 className="font-semibold text-gray-900">
                                {offer.title}
                              </h4>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            {/* Dots Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentOfferSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    currentOfferSlide === index ? "bg-primary" : "bg-gray-300"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Shiftyng Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Shiftyng?
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We connect you with verified, trusted packers and movers to make
              your relocation stress-free and secure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                Verified Movers
              </h4>
              <p className="text-gray-600">
                All our partner movers are verified and background checked for
                your safety.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                On-Time Delivery
              </h4>
              <p className="text-gray-600">
                We ensure your belongings reach the destination on time, every
                time.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                24/7 Support
              </h4>
              <p className="text-gray-600">
                Our customer support team is available round the clock to assist
                you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h3>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border">
                <button
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronRight
                    className={cn(
                      "h-5 w-5 text-gray-400 transition-transform",
                      openFaqIndex === index && "rotate-90"
                    )}
                  />
                </button>
                {openFaqIndex === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Shiftyng</h4>
              <p className="text-gray-400">
                Making relocation simple and stress-free for everyone.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Services</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Local Moving</li>
                <li>Domestic Moving</li>
                <li>Office Relocation</li>
                <li>International Moving</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Track Your Move</li>
                <li>Insurance Claims</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Shiftyng. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    </LoadScript>
  );
};

export default Index;
