import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProfileDropdown } from "@/components/ProfileDropdown";

interface Booking {
  id: string;
  customer: string;
  from: string;
  to: string;
  amount: number;
  status: string;
  date: string;
  items: string;
}

const mockBookings: Booking[] = [
  {
    id: "ORD001",
    customer: "Rajesh Kumar",
    from: "Mumbai",
    to: "Delhi",
    amount: 15000,
    status: "In Transit",
    date: "2024-01-26",
    items: "Household Items",
  },
  {
    id: "ORD002",
    customer: "Anjali Mehta",
    from: "Pune",
    to: "Hyderabad",
    amount: 12000,
    status: "Delivered",
    date: "2024-02-12",
    items: "1BHK Items",
  },
];

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const navigate = useNavigate();
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

  useEffect(() => {
    // Later, fetch from backend using API + mobileNumber
    setBookings(mockBookings);
  }, []);

  return (
    <div className="w-full bg-background">
        {/* Header */}
        <header className="bg-white shadow-sm border-b pl-4 pr-6 lg:pl-16 lg:pr-16">
        <div className="flex justify-between items-center h-16">
          {/* Left Side: Logo */}
          <div>
            <Button variant="outline" onClick={() => navigate(-1)}>
          ← Back
        </Button>
            <button
              className="px-8  text-[30px] font-bold text-primary font-weight-900"
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
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">My Bookings</h1>
        </div>

        {/* Filters (Optional for future enhancements) */}
        <div className="flex gap-4 mb-6">
          <select className="border rounded px-3 py-2">
            <option value="">All Status</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <input
            type="text"
            placeholder="Search by ID or Location"
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        {/* Booking List */}
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white shadow-md rounded-xl p-4 border hover:border-primary cursor-pointer"
              onClick={() => navigate(`/mybookings`)}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg font-semibold text-gray-800">
                  {booking.items}
                </div>
                <div className="text-sm text-gray-500">{booking.date}</div>
              </div>
              <div className="text-gray-600">
                From <span className="font-medium">{booking.from}</span> to{" "}
                <span className="font-medium">{booking.to}</span>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-sm text-gray-500">Order ID: {booking.id}</div>
                <div
                  className={`text-sm px-3 py-1 rounded-full ${
                    booking.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "In Transit"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {booking.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        {bookings.length === 0 && (
          <p className="text-center text-gray-400 mt-12">No bookings found.</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default BookingsPage;
