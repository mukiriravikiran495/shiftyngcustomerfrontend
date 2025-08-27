import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoginModal } from "@/components/LoginModal";
import { useBooking } from "@/context/BookingContext";
import { useVendorContext } from "@/context/VendorContext";
import type { Vendor } from "@/context/VendorContext";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { useNavigate, useLocation } from "react-router-dom";
import { LatLngExpression } from "leaflet";
// react-leaflet
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
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
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
// leaflet icon fix
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
});

// helper to re-center map
const LocationUpdater = ({ position }: { position: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, 15);
        }
    }, [position, map]);
    return null;
};

const TruckBooking = () => {
    const navigate = useNavigate();
    const { setSelectedVendor } = useVendorContext();
    const location = useLocation();
    const { booking } = useBooking();

    const [hasSearched, setHasSearched] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mobileNumber, setMobileNumber] = useState("");
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [driverAccepted, setDriverAccepted] = useState(false);
    const destination: LatLngExpression | null = position ? [position[0] + 0.01, position[1] + 0.01] : null;
    const handleNext = () => {
        navigate("/truckbooking"), {

        };
    }
    useEffect(() => {
        if (position) {
            const timer = setTimeout(() => {
                setDriverAccepted(true); // After 10s, driver accepted
            }, 10000); // 10 seconds
            return () => clearTimeout(timer);
        }
    }, [position]);

    useEffect(() => {
        const savedMobile = localStorage.getItem("mobileNumber");
        if (savedMobile) {
            setIsLoggedIn(true);
            setMobileNumber(savedMobile);
        }

        // fetch current location
        navigator.geolocation.getCurrentPosition((pos) => {
            setPosition([pos.coords.latitude, pos.coords.longitude]);
        });
    }, []);

    const handleLoginSuccess = (mobile: string) => {
        setMobileNumber(mobile);
        setIsLoggedIn(true);
        setIsLoginOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("mobileNumber");
        setIsLoggedIn(false);
        setMobileNumber("");
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
        <div className="w-full min-h-screen bg-[#F2F2F2]">
            {/* Header */}
            <header className="bg-white shadow-sm border-b pl-4 pr-6 lg:pl-16 lg:pr-16 sticky top-0 z-50">
                <div className="flex justify-between items-center h-16">
                    <div>
                        <button
                            className="text-[30px] font-bold text-primary"
                            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
                            onClick={() => navigate("/")}
                        >
                            <h1>Shiftyng</h1>
                        </button>
                    </div>

                    <div className="md:flex items-center space-x-8">
                        <a
                            href="#offers"
                            className="text-[18px] hidden lg:block text-[#000000] hover:text-primary"
                        >
                            Become Partner
                        </a>
                        <a
                            href="#offers"
                            className="text-[18px] hidden lg:block text-[#000000] hover:text-primary"
                        >
                            Offers
                        </a>
                        <a
                            href="#help"
                            className="text-[18px] hidden lg:block text-[#000000] hover:text-primary"
                        >
                            Need Help ?
                        </a>

                        <div className="flex justify-end flex-1">
                            {isLoggedIn ? (
                                <ProfileDropdown mobile={mobileNumber} onLogout={handleLogout} />
                            ) : (
                                <Button
                                    variant="outline"
                                    onClick={() => setIsLoginOpen(true)}
                                    className="text-[18px] border-black text-black hover:bg-primary hover:text-white"
                                >
                                    Login
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() => setIsLoginOpen(false)}
                onLoginSuccess={handleLoginSuccess}
            />

            <div className="w-full h-[600px] max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* LEFT SIDE (Map + Radar) */}
                <Card className="p-4 shadow-sm h-[600px] flex flex-col gap-4">
                    {/* MAP CARD */}
                    <Card className="relative h-[350px] w-full overflow-hidden rounded-2xl ">
                        <CardContent className="p-0 h-full w-full">
                            {position ? (
                                <MapContainer center={position} zoom={15} className="h-full w-full z-0">
                                    <TileLayer
                                        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                                        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
                                    />
                                    <Marker position={position} />
                                    <LocationUpdater position={position} />

                                    {/* Draw route line if driver accepted */}
                                    {driverAccepted && destination && (
                                        <Polyline positions={[position, destination]} color="blue" weight={4} />
                                    )}
                                </MapContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <p>Fetching location...</p>
                                </div>
                            )}

                            {/* Radar overlay (hide when driver accepted) */}
                            {!driverAccepted && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-40 h-40 rounded-full bg-blue-400/20 animate-ping"></div>
                                    <div className="absolute w-24 h-24 rounded-full bg-blue-500/30 animate-pulse"></div>
                                    <div className="absolute w-10 h-10 rounded-full bg-blue-600"></div>
                                </div>
                            )}
                        </CardContent>
                    </Card>


                    {/* BOTTOM INFO CARD */}
                    <Card className="h-[200px] w-full rounded-2xl p-4 flex flex-col justify-center items-center">
                        {!driverAccepted ? (
                            <>
                                <p className="font-semibold text-lg">Searching for a driver near Ragar Signal...</p>
                                <p className="text-gray-500 text-sm mt-2">Please wait while we connect you 🚚</p>
                            </>
                        ) : (
                            <div className="flex justify-between items-center w-full px-4 py-2">
                                {/* Left side - OTP */}
                                <div>
                                    {/* Order Number */}
                                    <p className="text-md font-bold text-gray-900 mb-1">
                                        Booking Id: SH12345
                                    </p>
                                    {/* OTP + number in a row */}
                                    <div className="flex items-center space-x-2">
                                        <p className="text-gray-500 font-semibold text-sm m-0">OTP:</p>
                                        <p className="text-md text-gray-900 font-bold tracking-widest m-0">4829</p>
                                    </div>

                                    {/* Row with image + name + bike number */}
                                    <div className="flex items-center mt-3 space-x-3">
                                        <img
                                            src="/icons/smalltruck.png"
                                            alt="Driver"
                                            className="w-24 h-16 rounded-md object-cover"
                                        />

                                        <div className="flex flex-col">
                                            <p className="text-base font-medium">Mukiri Ravi Kiran</p>
                                            <p className="text-sm font-semibold text-gray-600">AP 29 BX 4829</p>
                                            <p className="text-sm font-small text-gray-600">7816035340</p>
                                        </div>
                                    </div>

                                </div>

                                <div className="flex flex-col items-center space-y-2">
                                    <img
                                        src="/icons/qrcode.png"
                                        alt="Scan QR"
                                        className="w-32 h-32 object-contain"
                                    />
                                    <p className="text-sm font-semibold text-center">
                                        Scan to Download Shiftyng App
                                    </p>
                                </div>
                            </div>
                        )}
                    </Card>
                </Card>

                {/* RIGHT SIDE (Address + Fare) */}
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

                        {/* Address Details Card */}
                        <Card className="p-4 shadow-sm">
                            <h2 className="text-lg font-semibold mb-3">Address Details</h2>

                            {/* Pickup */}
                            <div className="flex items-start gap-3 mb-4">
                                <MapPin className="text-green-500 mt-1" size={18} />
                                <div className="flex-1">
                                    <p className="text-md text-gray-900 font-bold">Mukiri Ravi kiran - 7816035340</p>
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
                                    <p className="text-md text-gray-900 font-bold">Mukiri Ravi kiran - 7816035340</p>
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

                    </div>

                    {/* Fixed Footer Button */}
                    <div className="pt-3 border-t mt-8  w-full">

                        {/* <Button onClick={handleNext} className="w-full  border-[#BA1C1C] hover:bg-red-900 text-white rounded-lg py-3 text-lg">
                            Cancel Booking
                        </Button> */}
                        <AlertDialog>
                            {/* Cancel Booking button */}
                            <AlertDialogTrigger asChild>
                                <Button
                                    className="w-full border-[#BA1C1C] bg-[#BA1C1C] hover:bg-red-900 text-white rounded-lg py-3 text-lg"
                                >
                                    Cancel Booking
                                </Button>
                            </AlertDialogTrigger>

                            {/* Pop-up content */}
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to cancel this booking? This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    {/* No → Stay here */}
                                    <AlertDialogCancel>No</AlertDialogCancel>

                                    {/* Yes → Navigate to home */}
                                    <AlertDialogAction
                                        onClick={() => navigate("/bookingform")}
                                    >
                                        Yes
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TruckBooking;
