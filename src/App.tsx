import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import Items from "./pages/Items";
import Vendors from "./pages/Vendors";
import NotFound from "./pages/NotFound";
import BookingDetails from "./pages/BookingDetails";
import BookingSuccess from "./pages/BookingSuccess";
import ProfilePage from "./pages/Profile";
import BookingsPage from "./pages/mybookings";
import TransactionsPage from "./pages/Transactions";
import BookingForm from "./pages/bookingform";
import SelectTruck from "./pages/selecttruck"
import TruckBooking from "./pages/truckbooking"
import TruckBookingForm from "./pages/truckbookingform";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop /> 
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/items" element={<Items />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/bookingdetails" element={<BookingDetails />} />
          <Route path="/bookingSuccess" element={<BookingSuccess />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/mybookings" element={<BookingsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/bookingform" element={<BookingForm />} />
          <Route path="/selecttruck" element={<SelectTruck />} />
          <Route path="/truckbooking" element={<TruckBooking />} />
          <Route path="/truckbookingform" element={<TruckBookingForm />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
