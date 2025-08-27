import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { Input } from "@/components/ui/input";
import { LoginModal } from "@/components/LoginModal";
import { Calendar } from "@/components/ui/calendar";
import { useBooking } from "@/context/BookingContext";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ChatWidget from "@/components/ChatWidget";
import axios from "axios";


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
import React, { createContext, useContext } from "react";

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

const BookingContext = createContext(null);

const Index = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const { booking, setBooking } = useBooking();
  const [hasSearched, setHasSearched] = useState(false);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [currentOfferSlide, setCurrentOfferSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSearch = async () => {
    if (
      !booking.pickupLocation ||
      !booking.dropLocation ||
      !booking.shiftDate ||
      !booking.shiftType
    ) {
      alert("Please fill in all fields");
      return;
    }

    const requestBody = {
      // pickupAddress: booking.pickupLocation.label,
      // dropAddress: booking.dropLocation.label,
      shiftDate: booking.shiftDate,
      shiftType: booking.shiftType,
    };

    try {
      // const response = await axios.post(
      //   "http://localhost:8080/api/booking/initiate",
      //   requestBody
      // );

      // ✅ Save response (e.g. list of items)
      // setBookingResponse(response.data);

      // ✅ Navigate to items page
      navigate("/items");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to initiate booking. Please try again.");
    }
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
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
      <div className="w-full bg-[#F2F2F2]">
        {/* Header */}
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
        {/* Hero Section */}
        <SidebarProvider>
          {/* <AppSidebar /> */}
          <section
            className=" relative  h-[600px] bg-[#F2F2F2] w-full bg-contain bg-no-repeat bg-center mb-8"
            style={{
              backgroundImage: "url('/icons/hero.png')",
              backgroundSize: "auto",
              backgroundPosition: "center",
            }}
          >
            <div className="w-full mx-auto sm:px-6 lg:px-4 h-full flex flex-col justify-center items-center">
              {/* Heading + Subtitle */}
              <div className="text-center pt-20">
                <h2 className="text-4xl md:text-5xl font-bold text-[#BA1C1C] lg:text-[#000000] mb-4">
                  Moving Made Simple
                </h2>
                <p className="text-xl text-[#000000]">
                  Find the truck or trusted Packers and Movers for your next move
                </p>
              </div>

              {/* Chat widget (still inside hero) */}
              <ChatWidget />

              {/* Cards fixed at bottom of hero */}
              <div className="grid grid-cols-2 gap-6 mt-8">
                <button
                  onClick={() => navigate("/bookingform")}
                  className="rounded-2xl overflow-hidden shadow-md hover:scale-105 transition border-[#8B8888] border-2"
                >
                  <img src="/icons/packers.png" alt="Packers" className="w-80 h-40 object-cover" />
                </button>

                <button
                  onClick={() => navigate("/truckbookingform")}
                  className="rounded-2xl overflow-hidden shadow-md hover:scale-105 transition border-[#8B8888] border-2"
                >
                  <img src="/icons/truck.png" alt="Truck" className="w-80 h-40 object-cover" />
                </button>

                <button
                  onClick={() => navigate("/truckbookingform")}
                  className="rounded-2xl overflow-hidden shadow-md hover:scale-105 transition border-[#8B8888] border-2"
                >
                  <img src="/icons/bike.png" alt="Bike" className="w-80 h-40 object-cover" />
                </button>

                <button
                  onClick={() => navigate("/bookingform")}
                  className="rounded-2xl overflow-hidden shadow-md hover:scale-105 transition border-[#8B8888] border-2"
                >
                  <img src="/icons/parcel.png" alt="Parcel" className="w-80 h-40 object-cover" />
                </button>
              </div>
            </div>
          </section>

        </SidebarProvider>

        {/* Offers Section */}
        

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
