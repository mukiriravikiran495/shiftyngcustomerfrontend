import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { LoginModal } from "@/components/LoginModal";
import { useBooking } from "@/context/BookingContext";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { MdPlace } from "react-icons/md";
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
import LocationInput from "@/components/LocationInput";
const TruckBookingForm = () => {
  const navigate = useNavigate();
  const { booking, setBooking } = useBooking();
  const [hasSearched, setHasSearched] = useState(false);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleSearch = async () => {
    if (
      !booking.pickupLocation ||
      !booking.dropLocation

    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      navigate("/selecttruck");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to initiate booking. Please try again.");
    }
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
    navigate("/selecttruck"), {

    };
  }
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
        {/* Hero Section */}
        <section className="relative w-full h-[600px]">
          {/* Background Image */}
          <img
            src="/icons/desktop.png"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
            <div className="w-full max-w-xl space-y-4">
              <div className=" text-center mb-10">
                <h2 className=" text-4xl md:text-5xl font-bold text-[#BA1C1C] lg:text-[#444040] mb-4">
                  Moving Made Simple
                </h2>
                <p className=" text-xl text-[#444040] lg:text-[#444040]">
                  Find trusted Packers and Movers for your next move
                </p>
              </div>

              {/* Pickup Location */}
              <LocationInput
                placeholder="Enter Pickup Location"
                iconColor="black"
                onSelect={(address, lat, lng) => setBooking({ ...booking, pickupLocation: address })}
              />

              {/* Drop Location */}
              <LocationInput
                placeholder="Enter Drop Location"
                iconColor="#BA1C1C"
                onSelect={(address, lat, lng) => setBooking({ ...booking, dropLocation: address })}
              />

            </div>
            {/* Book Ride Button */}
            <button onClick={handleNext} className="w-full mt-10 max-w-xl bg-gradient-to-r from-[#BA1C1C] to-[#BA1C1C]  h-[80px]  
              hover:bg-[#BA1C1C] text-white font-bold py-3 rounded-lg shadow text-2xl">
              Select Truck
            </button>
          </div>

        </section>

        {/* Footer */}

      </div>
    </LoadScript>
  );
};

export default TruckBookingForm;
