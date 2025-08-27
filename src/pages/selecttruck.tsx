import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { LoginModal } from "@/components/LoginModal";
import { useBooking } from "@/context/BookingContext";
import { useVendorContext } from "@/context/VendorContext";
import type { Vendor } from "@/context/VendorContext";
import { useRef, useEffect } from "react";
import { ProfileDropdown } from "@/components/ProfileDropdown";


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
import { useNavigate, useLocation } from "react-router-dom";
import MobileFilters from "@/components/MobileFilters";

const VehicleSelector = () => {
    const navigate = useNavigate();
    const { setSelectedVendor } = useVendorContext();
    const location = useLocation();
    const { booking } = useBooking();
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [sortOption, setSortOption] = useState("Relevance");
    const [selected, setSelected] = useState<string | null>(null);
    const [selectedFilters, setSelectedFilters] = useState({
        rating: [0],
        price: [0, 50000],
        services: [] as string[],
        vehicleType: [] as string[],
    });

    const handleVendorClick = (vendor: Vendor) => {
        setSelectedVendor(vendor);   // set in context
        navigate("/BookingDetails"); // go to booking confirmation page
    };

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

    if (hasSearched) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-black-50 via-white to-purple-50 w-full">
                <LoginModal
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess}
                />
            </div>
        );
    }

    const vehicles = [
        {
            id: "2wheeler",
            name: "2 Wheeler",
            img: "/icons/bikeicon.png",
            expandedImg: "/icons/bike2icon.png",
            time: "9 min",
            details: "20 kg • 9 min",
            price: "₹51",
        },
        {
            id: "3wheeler",
            name: "3 Wheeler",
            img: "/icons/auto.jpg",
            expandedImg: "/icons/auto.jpg",
            time: "9 min away",
            details: "500 kg • 5.5ft x 4.5ft x 5ft",
            price: "₹292",
        },
        {
            id: "17ft",
            name: "7ft x 5 ft x 4ft",
            img: "/icons/truck1.png",
            expandedImg: "/icons/truckicon.png",
            time: "3 min",
            details: "6000 kg • 3 min",
            price: "₹3169",
        },
        {
            id: "3",
            name: "9ft x 6 ft x 4ft",
            img: "/icons/truck1.png",
            expandedImg: "/icons/truckicon.png",
            time: "9 min",
            details: "20 kg • 9 min",
            price: "₹51",
        },
        {
            id: "4",
            name: "12ft x 7 ft x 5ft",
            img: "/icons/truck2.png",
            expandedImg: "/icons/truck2icon.png",
            time: "9 min",
            details: "20 kg • 9 min",
            price: "₹51",
        },
        {
            id: "5",
            name: "17ft x 9 ft x 6ft",
            img: "/icons/truck2.png",
            expandedImg: "/icons/truck2icon.png",
            time: "9 min",
            details: "20 kg • 9 min",
            price: "₹51",
        },

    ];
    const handleNext = () => {
        navigate("/truckbooking"), {

        };
    }
    return (
        <div className="w-full min-h-screen bg-[#F2F2F2]">
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

            <div className="w-full h-[600px] max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6 ">

                {/* LEFT SIDE (Now Vehicle Selection) */}
                <Card className="p-4 shadow-sm h-[600px] flex flex-col px-8 py-8 overflow-y-auto scrollbar-hide">
                    {/* Header stays fixed */}
                    <h2 className="text-lg font-semibold mb-3">Select Vehicle</h2>
                    {/* Scrollable Vehicle List */}
                    <div
                        className="flex-1 overflow-y-auto pr-1  
              [scrollbar-width:thin] 
              [scrollbar-color:#F2F2F2_transparent]
              [&::-webkit-scrollbar]:w-2
              [&::-webkit-scrollbar-track]:bg-transparent
              [&::-webkit-scrollbar-thumb]:bg-[#F2F2F2] [&::-webkit-scrollbar-thumb]:rounded-full">
                        {vehicles.map((v) => {
                            const isSelected = selected === v.id;
                            return (
                                <button
                                    key={v.id}
                                    onClick={() => setSelected(v.id)}
                                    className={`w-full text-left rounded-lg p-3 flex items-center justify-between transition-all mb-3
                                    ${isSelected
                                            ? "border-2 border-[#BA1C1C] bg-[#F2F2F2] h-[140px]"
                                            : "border hover:border-[#BA1C1C] hover:bg-[#F2F2F2] h-[100px]"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={isSelected ? v.expandedImg : v.img}
                                            alt={v.name}
                                            className={`object-contain transition-all duration-300 ${isSelected ? "w-40 h-24" : "w-20 h-16"}`}
                                        />
                                        <div>
                                            <p className="font-semibold">{v.name}</p>
                                            {v.time && (
                                                <Badge
                                                    variant="secondary"
                                                    className="mt-1 flex items-center gap-1"
                                                >
                                                    <Clock size={14} /> {v.time}
                                                </Badge>
                                            )}
                                            <p className="text-xs text-gray-600">{v.details}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold">{v.price}</p>
                                </button>
                            );
                        })}
                    </div>


                </Card>



                {/* RIGHT SIDE (Now Address + Fare) */}
                <Card className="p-4 shadow-sm h-[600px] flex flex-col px-8 py-8 ">
                    
                    {/* Scrollable Content */}
                    {/* <div className="flex-1 overflow-y-auto pr-1 space-y-4 scrollbar-hide"> */}
                    <div
                        className="flex-1 overflow-y-auto pr-1 space-y-4 
                                    [scrollbar-width:thin] 
                                    [scrollbar-color:#F2F2F2_transparent]
                                    [&::-webkit-scrollbar]:w-2
                                    [&::-webkit-scrollbar-track]:bg-transparent
                                    [&::-webkit-scrollbar-thumb]:bg-[#F2F2F2] [&::-webkit-scrollbar-thumb]:rounded-full">
                        <Card className="h-[180px] w-full rounded-lg  overflow-hidden mb-4">
                        <CardContent className="flex flex-col justify-center items-center">
                            <img
                                src="/icons/qrcode.png"
                                alt="Scan QR"
                                className="w-32 h-32 object-contain "
                            />
                            <p className="text-lg font-semibold">Scan to Download Shiftyng App</p>
                        </CardContent>
                    </Card>
                        {/* Address Details Card */}
                        <Card className="p-4 shadow-sm">
                            <h2 className="text-lg font-semibold mb-3">Address Details</h2>

                            {/* Pickup */}
                            <div className="flex items-start gap-3 mb-4">
                                <MapPin className="text-green-500 mt-1" size={18} />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">
                                        NSIC Technical Services Centre, ECIL Main Road, KamalaNagar, Kapra, hyderabad, Telangana, 500062
                                    </p>
                                </div>
                                <button className="text-[#Ba1C1C] text-sm font-medium">Change</button>
                            </div>

                            {/* Drop */}
                            <div className="flex items-start gap-3">
                                <MapPin className="text-[#Ba1C1C] mt-1" size={18} />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">
                                        Balaji Jalsa Family Dhaba, South KamalaNagar, Kapra, hyderabad, Telangana, 500062
                                    </p>
                                </div>
                                <button className="text-[#Ba1C1C] text-sm font-medium">Change</button>
                            </div>
                        </Card>

                        {/* Fare Breakdown */}
                        <Card className="p-4 shadow-sm">
                            <h2 className="text-lg font-semibold mb-3">Fare Breakdown</h2>
                            <div className="flex justify-between text-sm mb-1">
                                <span>Trip Fare (incl. Toll, if applicable)</span>
                                <span>₹291.95</span>
                            </div>
                            <div className="flex justify-between text-sm mb-1">
                                <span>Net Fare</span>
                                <span>₹292</span>
                            </div>
                            <div className="flex justify-between font-semibold text-base">
                                <span>Amount Payable</span>
                                <span>₹292</span>
                            </div>

                            {/* Service */}
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-sm flex items-center gap-2">
                                    <Truck size={16} /> House Shifting
                                </span>
                                <button className="text-[#BA1C1C] text-sm font-medium">Change</button>
                            </div>
                        </Card>

                        {/* Name & Number Inputs */}
                        <Card className="p-4 shadow-sm mt-4">
                            <h2 className="text-lg font-semibold mb-3">Sender Details</h2>

                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter Sender's Name"
                                    className="w-1/2 border bg-[#F2F2F2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BA1C1C] "
                                />
                                <input
                                    type="tel"
                                    placeholder="Enter Sender's Mobile Number"
                                    className="w-1/2 border bg-[#F2F2F2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BA1C1C] "
                                />
                            </div>
                        </Card>

                        {/* Name & Number Inputs */}
                        <Card className="p-4 shadow-sm mt-4 ">
                            <h2 className="text-lg font-semibold mb-3">Receiver Details</h2>

                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter Receiver's Name"
                                    className="w-1/2 border bg-[#F2F2F2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BA1C1C]"
                                />
                                <input
                                    type="tel"
                                    placeholder="Enter Receiver's Mobile Number"
                                    className="w-1/2 border bg-[#F2F2F2] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BA1C1C]"
                                />
                            </div>
                        </Card>

                    </div>

                    {/* Fixed Footer Button */}
                    <div className="pt-3 border-t mt-8  w-full">
                        {/* Payment Method */}
                        <div className=" flex items-center justify-between">
                            <div className="flex items-center gap-2 mb-4">
                                <img src="/icons/all.png" alt="cash" className="w-6 h-6" />
                                <span className="text-sm">Cash</span>
                            </div>
                            <span className="font-semibold">₹292</span>
                        </div>
                        <Button onClick={handleNext} className="w-full bg-[#Ba1C1C] hover:bg-red-900 text-white rounded-lg py-3 text-lg">
                            Book 3 Wheeler
                        </Button>
                    </div>
                </Card>

            </div>

            {/* Footer */}


        </div >
    );
};

export default VehicleSelector;
