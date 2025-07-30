import { useState, useRef } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginModal } from "@/components/LoginModal";
import { useBooking } from "@/context/BookingContext";
import { useItemContext } from "@/context/ItemContext";
import { useVendorContext } from "@/context/VendorContext";
import { useAuth } from "@/context/AuthContext";
import { ProfileDropdown } from "@/components/ProfileDropdown";

import {
  CheckCircle,
  MapPin,
  Calendar,
  Package,
  User,
  Phone,
  Mail,
  Star,
  Truck,
  Shield,
  ArrowLeft
} from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";



const Confirmation = () => {
  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const { custId, token } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = useBooking();
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { selectedItems, setSelectedItems } = useItemContext();
  const { bookingData, totalItems } = location.state || {};
  const { selectedVendor, setSelectedVendor } = useVendorContext();
  // const [showCustomerForm, setShowCustomerForm] = useState(false);
  // const [pendingSubmit, setPendingSubmit] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: ''
  });

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

  const [mobileNumber, setMobileNumber] = useState("");

  const handleLoginSuccess = (mobile: string) => {
    setMobileNumber(mobile);
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };


  const handleConfirmBooking = () => {
    // Check if user is logged in (simulate)
    const isLoggedIn = false; // This would come from your auth context

    if (!isLoggedIn) {
      // setShowCustomerForm(true);
    } else {
      // Proceed with booking
      processBooking();
    }
  };

  const processBooking = () => {
    // Simulate booking process
    navigate('/BookingSuccess', {
      state: {

        customerDetails,
        custId,
        token
      }
    });
  };

  const handleCustomerSubmit = () => {

    if (!customerDetails.name) {
      fullNameRef.current?.focus();
      return;
    }
    if (!customerDetails.email) {
      emailRef.current?.focus();
      return;
    }

    const mobileNumber = localStorage.getItem("mobileNumber");
    if (!mobileNumber) {
      setIsLoginOpen(true); // <-- open login modal here
      return;
    }

    setShowConfirmModal(true);


  };

  const totalCost = selectedVendor?.price || 0;
  const taxes = Math.round(totalCost * 0.18); // 18% GST
  const finalAmount = totalCost + taxes;

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!selectedVendor) {
      const storedVendor = localStorage.getItem("selectedVendor");
      if (storedVendor) {
        setSelectedVendor(JSON.parse(storedVendor));
      }
    }

    if (selectedItems.length === 0) {
      const storedItems = localStorage.getItem("selectedItems");
      if (storedItems) {
        setSelectedItems(JSON.parse(storedItems));
      }
    }
  }, []);

  if (!booking || !selectedVendor || selectedItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading booking details...
      </div>
    );
  }

  if (hasSearched) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black-50 via-white to-purple-50 w-full">
        <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* Header */}
      <header className="bg-white shadow-sm border-b pl-4 pr-6 lg:pl-16 lg:pr-16">
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
              className="hidden lg:block text-[#BA1C1C] hover:text-primary transition-colors"
            >
              Offers
            </a>
            <a
              href="#help"
              className="hidden lg:block text-[#BA1C1C] hover:text-primary transition-colors"
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
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} />

      <div className="w-full mx-auto px-4 bg-white sm:px-6 lg:px-8 sm:py-0 lg:py-4 overflow-x-hidden">
        <div className="flex items-center mb-8">
          <div className="hidden lg:block">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/Vendors")}
              className="mr-3"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>

          <div><h1 className="text-2xl font-bold mt-4 -mb-4 lg:mb-4">Booking Confirmation</h1></div>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Customer Details Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="fullName" className="text-muted-foreground">Full Name <span className="text-red-500">*</span></Label>
                <Input
                  ref={fullNameRef}
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-muted-foreground">Email ID <span className="text-red-500">*</span></Label>
                <Input
                  ref={emailRef}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                />
              </div>
            </div>


            {/* Booking Details */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-primary" />
                Booking Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Pickup Location</Label>
                  <p className="font-semibold">{booking.pickupLocation}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Drop Location</Label>
                  <p className="font-semibold">{booking.dropLocation}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Moving Date</Label>
                  <p className="font-semibold">{booking.shiftDate ? new Date(booking.shiftDate).toLocaleDateString() : "N/A"}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Service Type</Label>
                  <p className="font-semibold capitalize">{booking.shiftType}</p>
                </div>
              </div>
            </Card>

            {/* Selected Items */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2 text-primary" />
                Selected Items ({totalItems} items)
              </h2>

              {selectedItems.length === 0 ? (
                <p className="text-muted-foreground">No items selected.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary">{item.quantity}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </Card>


            {/* Vendor Details */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Truck className="h-5 w-5 mr-2 text-primary" />
                Selected Service Provider
              </h2>
              <div className="flex items-start space-x-4">
                <img
                  src={selectedVendor.image}
                  alt={selectedVendor.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{selectedVendor.name}</h3>
                    <Badge variant="default" className="bg-success text-success-foreground">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{selectedVendor.rating}</span>
                    <span className="text-muted-foreground">({selectedVendor.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedVendor.services.map((service: string) => (
                      <Badge key={service} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Price Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Service Charges</span>
                  <span>₹{totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>GST (18%)</span>
                  <span>₹{taxes.toLocaleString()}</span>
                </div>
                <hr />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{finalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-center space-x-2 text-success">
                  <Shield className="h-4 w-4" />
                  <span>Insurance Coverage Included</span>
                </div>
                <div className="flex items-center space-x-2 text-success">
                  <CheckCircle className="h-4 w-4" />
                  <span>Verified Service Provider</span>
                </div>
                <div className="flex items-center space-x-2 text-success">
                  <Phone className="h-4 w-4" />
                  <span>24/7 Customer Support</span>
                </div>
              </div>

              {/* {!showCustomerForm ? (
                <Button
                  onClick={handleConfirmBooking}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Confirm Booking
                </Button>
              ) : ( */}
              <Button
                onClick={handleCustomerSubmit}
                // disabled={!customerDetails.name || !customerDetails.phone}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Submit & Confirm Booking
              </Button>

              <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Booking</DialogTitle>

                    {/* Line 1: From → To */}
                    <p className="mt-2 text-sm text-gray-700">
                      <strong>{booking.pickupLocation}</strong> → <strong>{booking.dropLocation}</strong>
                    </p>

                    {/* Line 2: Date and Shift */}
                    <p className="text-sm text-gray-700">
                      <strong>
                        {booking.shiftDate ? new Date(booking.shiftDate).toLocaleDateString() : "N/A"}
                      </strong>{" "}
                      ({booking.shiftType} shift)
                    </p>

                    {/* Line 3: Proceed? */}
                    <p className="mt-2 text-sm font-medium text-gray-900">Proceed?</p>
                  </DialogHeader>

                  <DialogFooter className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowConfirmModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-primary"
                      onClick={() => {
                        setShowConfirmModal(false);
                        processBooking(); // your existing logic
                      }}
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>


              <p className="text-xs text-muted-foreground mt-3 text-center">
                By confirming, you agree to our Terms of Service and Privacy Policy
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;