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
import { MdPlace } from "react-icons/md";
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
import LocationInput from "@/components/LocationInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setBooking as setBookingAction } from "@/store/bookingSlice";
import { RootState } from "@/store/store";

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

const BookingForm = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);
  const googleMapsApiKey = import.meta.env.AIzaSyAQHOAqNwhjEdcMoOMwHRFRkoYh9WUcehk;
  const [currentOfferSlide, setCurrentOfferSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const dispatch = useDispatch();
  const booking = useSelector((state: RootState) => state.booking);


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
  const handleNext = () => {
    // dispatch(setBookingAction({
    //   pickupLocation: booking.pickupLocation,
    //   dropLocation: booking.dropLocation,
    //   shiftDate: date ? date.toISOString() : null,
    //   shiftType: booking.shiftType,
    // }));
    navigate("/items");
  };
  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
      <div className="w-full bg-background">
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
          <section className="relative w-full h-[600px]">
            {/* Background Image */}
            <img
              src="/icons/desktop.png"
              alt="Hero Background"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
              <div className="w-full max-w-xl space-y-4">

                {/* Pickup Location */}
                <LocationInput
                  placeholder="Enter Pickup Location"
                  iconColor="black"
                  onSelect={(address, lat, lng) => setBookingAction({ ...booking, pickupLocation: address })}
                />

                {/* Drop Location */}
                <LocationInput
                  placeholder="Enter Drop Location"
                  iconColor="#BA1C1C"
                  onSelect={(address, lat, lng) => setBookingAction({ ...booking, dropLocation: address })}
                />

                {/* Shift Date & Shift Type Row */}
                <div className="flex h-[80px] items-center bg-white rounded-lg border-[#A8A5A5] border-2">
                  {/* Shift Date */}
                  <div className="flex items-center flex-1 px-3 py-2">
                    <CalendarIcon className="text-[#888888] text-3xl mr-4 ml-2 w-6 h-6" />
                    <DatePicker
                      selected={booking.shiftDate ? new Date(booking.shiftDate) : null}
                      onChange={(newDate: Date | null) =>
                        dispatch(setBookingAction({ ...booking, shiftDate: newDate ? newDate.toISOString() : null }))
                      }
                      placeholderText="Select shift date"
                      dateFormat="dd-MM-yyyy"
                      minDate={new Date()}
                      className="flex-1 outline-none bg-transparent text-gray-700 text-lg"
                    />

                  </div>

                  {/* Divider */}
                  <div className="w-px h-10 bg-[#8B8888]" />

                  <div className="flex items-center flex-1 px-3 py-2  rounded-lg bg-white">
                    <select
                      className="flex-1 outline-none bg-transparent text-gray-400 text-lg border-0"
                      value={booking.shiftType || ""}
                      onChange={(e) =>
                        dispatch(setBookingAction({ ...booking, shiftType: e.target.value }))
                      }
                    >
                      <option value="" disabled>Select shift type</option>
                      <option value="onebhk">ONE BHK</option>
                      <option value="twobhk">TWO BHK</option>
                      <option value="threebhk">THREE BHK</option>
                      <option value="fourplus">4+ BHK</option>
                      <option value="office">Office Shifting</option>
                      <option value="vehicle">Vehicle Transport</option>
                      <option value="storage">Storage</option>
                    </select>
                  </div>
                </div>


              </div>
              {/* Book Ride Button */}
              <button onClick={handleNext} className="w-full mt-10 max-w-xl bg-[#BA1C1C] h-[80px]  
                        hover:bg-[#BA1C1C] text-white font-bold py-3 rounded-lg shadow text-2xl">
                Select Packers & Movers
              </button>
            </div>

          </section>
        </SidebarProvider>




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

export default BookingForm;
