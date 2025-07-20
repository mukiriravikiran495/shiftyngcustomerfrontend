import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { LoginModal } from "@/components/LoginModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useBooking } from "@/context/BookingContext";
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
  CheckCircle, 
  Calendar, 
  Package, 
  User, 
  Phone, 
  Mail
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


const BookingDetails = () => {
  return (
    <h1>Booking Success</h1>
  );
};
export default BookingDetails;
  // const navigate = useNavigate();
  // const { booking } = useBooking();
  // const [hasSearched, setHasSearched] = useState(false);
  // const [isLoginOpen, setIsLoginOpen] = useState(false);
  
  // const handleVendorClick = (vendor: any) => {
  //   // Navigate to vendor detail page (adjust the route as needed)
  //   navigate("/BookingSuccess");
  // };


  // const processBooking = () => {
  //   // Simulate booking process
  //   navigate('/BookingSuccess', {
  //     // state: {
  //     //   bookingId: 'BK' + Date.now(),
  //     //   bookingData,
  //     //   selectedItems,
  //     //   selectedVendor,
  //     //    customerDetails
  //     // }
  //   });
  // };

  // // const handleCustomerSubmit = () => {
  // //   // if (customerDetails.name && customerDetails.phone) {
  // //     processBooking();
  // //   // }
  // // };

  // const handleCustomerSubmit = (BookingDetails: any) => {
  //   // Navigate to vendor detail page (adjust the route as needed)
  //   navigate("/BookingSuccess");
  // };

  // const totalCost = selectedVendor?.price || 0;
  // const taxes = Math.round(totalCost * 0.18); // 18% GST
  // const finalAmount = totalCost + taxes;

  // if (hasSearched) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-black-50 via-white to-purple-50 w-full">
  //       <LoginModal
  //         isOpen={isLoginOpen}
  //         onClose={() => setIsLoginOpen(false)}
  //       />
  //     </div>
  //   );
  // }
  // return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Left section (logo + back button) */}
//             <div className="flex items-center flex-1">
//               <div className="lg:hidden">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => navigate("/items")}
//                   className="mr-3"
//                 >
//                   <ArrowLeft className="h-5 w-5" />
//                 </Button>
//               </div>
//               <h1
//                 className="text-[30px] font-bold text-primary font-weight-900"
//                 style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
//               >
//                 Shiftyng
//               </h1>
//             </div>

//             {/* Right section (Login) */}
//             <div className="flex justify-end flex-1">
//               <Button
//                 variant="outline"
//                 onClick={() => setIsLoginOpen(true)}
//                 className="border-primary text-primary hover:bg-primary hover:text-white"
//               >
//                 Login
//               </Button>
//             </div>
//           </div>
//         </div>
//       </header>

//       <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

//       {/* Booking Details Bar */}
//       <div className="bg-white border-b shadow-sm ">
//         <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-4">
//           <div className="w-full">
//             {/* Mobile Layout */}
//             <div className="md:hidden flex items-start gap-2 text-sm px-2">
//               {/* Left Column: Back Button */}
//               <div className="hidden lg:block">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => navigate("/items")}
//                 >
//                   <ArrowLeft className="h-5 w-5" />
//                 </Button>
//               </div>

//               {/* Right Column: All Details stacked vertically */}
//               {/* Mobile Layout - Clean Version */}
//               <div className="md:hidden px-4  space-y-2 text-sm bg-white ">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <div className="w-2 h-2 bg-green-500 rounded-full" />
//                   <span className="truncate">
//                     {booking.pickupLocation}
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <div className="w-2 h-2 bg-red-500 rounded-full" />
//                   <span className="truncate">
//                     {booking.dropLocation}
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap gap-4 text-gray-600">
//                   <span>
//                     <span className="font-medium">Shift Date:</span> {booking.shiftDate}
//                   </span>
//                   <span>
//                     <span className="font-medium">Shift Type:</span> {booking.shiftType}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Desktop Layout */}
//             <div className="hidden md:grid grid-cols-[auto_2fr_2fr_minmax(120px,1fr)_minmax(120px,0.8fr)_auto] items-center gap-2 text-sm">
//               {/* Back Button */}
//               <div>
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => navigate("/vendors")}
//                   className="mr-2"
//                 >
//                   <ArrowLeft className="h-5 w-5" />
//                 </Button>
//               </div>

//               {/* From Location */}
//               <div className="flex items-center px-2 space-x-1 truncate">
//                 <MapPin className="w-5 h-5 text-green-600 mr-3" />
//                 <span className="ml-1 truncate">
//                   {booking.pickupLocation}
//                 </span>
//               </div>

//               {/* To Location */}
//               <div className="flex items-center px-2 space-x-1 truncate">
//                 <MapPin className="w-5 h-5 text-red-600 mr-3" />
//                 <span className="ml-1 truncate">
//                   {booking.dropLocation}
//                 </span>
//               </div>

//               {/* Date */}
//               <div className="flex items-center whitespace-nowrap">
//                 <span className="font-medium text-gray-600 mr-2">
//                   Shift Date:
//                 </span>
//                 <span className="ml-1">{booking.shiftDate}</span>
//               </div>

//               {/* Type */}
//               <div className="flex items-center whitespace-nowrap">
//                 <span className="font-medium text-gray-600 mr-2">
//                   Shift Type:
//                 </span>
//                 <span className="ml-1">{booking.shiftType}</span>
//               </div>

//               {/* Modify Button */}
//               <div>
//                 <Button variant="outline" size="sm">
//                   <Search className="h-4 w-4 mr-1" />
//                   Modify
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/*  */}
//       {/* <div className="container mx-auto px-4 py-8"> */}
//       <div className="max-w-7xl mx-auto px-4 bg-white sm:px-6 lg:px-8 sm:py-0 lg:py-4 overflow-x-hidden">
//         <h1 className="text-2xl font-bold mt-4 mb-4">Booking Confirmation</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Booking Details */}
//             <Card className="p-6">
//               <h2 className="text-xl font-semibold mb-4 flex items-center">
//                 <MapPin className="h-5 w-5 mr-2 text-primary" />
//                 Booking Details
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label className="text-muted-foreground">Pickup Location</Label>
//                   <p className="font-semibold">{booking.pickupLocation}</p>
//                 </div>
//                 <div>
//                   <Label className="text-muted-foreground">Drop Location</Label>
//                   <p className="font-semibold">{booking.dropLocation}</p>
//                 </div>
//                 <div>
//                   <Label className="text-muted-foreground">Moving Date</Label>
//                   <p className="font-semibold">{booking.shiftDate}</p>
//                 </div>
//                 <div>
//                   <Label className="text-muted-foreground">Service Type</Label>
//                   <p className="font-semibold capitalize">{booking.shiftType}</p>
//                 </div>
//               </div>
//             </Card>

//             {/* Selected Items */}
//             <Card className="p-6">
//               <h2 className="text-xl font-semibold mb-4 flex items-center">
//                 <Package className="h-5 w-5 mr-2 text-primary" />
//                 Selected Items ({totalItems} items)
//               </h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {selectedItems?.map((item: any) => (
//                   <div key={item.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
//                     <div className="flex items-center space-x-3">
//                       <img 
//                         src={item.image} 
//                         alt={item.name}
//                         className="w-12 h-12 rounded object-cover"
//                       />
//                       <div>
//                         <p className="font-semibold">{item.name}</p>
//                         <p className="text-sm text-muted-foreground capitalize">{item.category}</p>
//                       </div>
//                     </div>
//                     <Badge variant="secondary">{item.count}</Badge>
//                   </div>
//                 ))}
//               </div>
//             </Card>

//             {/* Vendor Details */}
//             <Card className="p-6">
//               <h2 className="text-xl font-semibold mb-4 flex items-center">
//                 <Truck className="h-5 w-5 mr-2 text-primary" />
//                 Selected Service Provider
//               </h2>
//               <div className="flex items-start space-x-4">
//                 <img 
//                   src={selectedVendor?.image} 
//                   alt={selectedVendor?.name}
//                   className="w-16 h-16 rounded-lg object-cover"
//                 />
//                 <div className="flex-1">
//                   <div className="flex items-center space-x-2 mb-2">
//                     <h3 className="text-lg font-semibold">{selectedVendor?.name}</h3>
//                     <Badge variant="default" className="bg-success text-success-foreground">
//                       <CheckCircle className="h-3 w-3 mr-1" />
//                       Verified
//                     </Badge>
//                   </div>
//                   <div className="flex items-center space-x-1 mb-2">
//                     <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                     <span className="font-semibold">{selectedVendor?.rating}</span>
//                     <span className="text-muted-foreground">({selectedVendor?.reviews} reviews)</span>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {selectedVendor?.services.map((service: string) => (
//                       <Badge key={service} variant="secondary" className="text-xs">
//                         {service}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </Card>

//             {/* Customer Details Form */}
//             {/* {showCustomerForm && (
//               <Card className="p-6">
//                 <h2 className="text-xl font-semibold mb-4 flex items-center">
//                   <User className="h-5 w-5 mr-2 text-primary" />
//                   Customer Details
//                 </h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="name">Full Name *</Label>
//                     <Input 
//                       id="name"
//                       value={customerDetails.name}
//                       onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
//                       placeholder="Enter your full name"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="phone">Phone Number *</Label>
//                     <Input 
//                       id="phone"
//                       type="tel"
//                       value={customerDetails.phone}
//                       onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
//                       placeholder="Enter your phone number"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="email">Email Address</Label>
//                     <Input 
//                       id="email"
//                       type="email"
//                       value={customerDetails.email}
//                       onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
//                       placeholder="Enter your email"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="alternatePhone">Alternate Phone</Label>
//                     <Input 
//                       id="alternatePhone"
//                       type="tel"
//                       value={customerDetails.alternatePhone}
//                       onChange={(e) => setCustomerDetails({...customerDetails, alternatePhone: e.target.value})}
//                       placeholder="Alternate phone number"
//                     />
//                   </div>
//                 </div>
//               </Card>
//             )} */}
//           </div>

//           {/* Price Summary */}
//           <div className="lg:col-span-1">
//             <Card className="p-6 sticky top-4">
//               <h2 className="text-xl font-semibold mb-4">Price Summary</h2>
              
//               <div className="space-y-3 mb-6">
//                 <div className="flex justify-between">
//                   <span>Service Charges</span>
//                   <span>₹{totalCost.toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between text-sm text-muted-foreground">
//                   <span>GST (18%)</span>
//                   <span>₹{taxes.toLocaleString()}</span>
//                 </div>
//                 <hr />
//                 <div className="flex justify-between text-lg font-bold">
//                   <span>Total Amount</span>
//                   <span className="text-primary">₹{finalAmount.toLocaleString()}</span>
//                 </div>
//               </div>

//               <div className="space-y-3 mb-6 text-sm">
//                 <div className="flex items-center space-x-2 text-success">
//                   <Shield className="h-4 w-4" />
//                   <span>Insurance Coverage Included</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-success">
//                   <CheckCircle className="h-4 w-4" />
//                   <span>Verified Service Provider</span>
//                 </div>
//                 <div className="flex items-center space-x-2 text-success">
//                   <Phone className="h-4 w-4" />
//                   <span>24/7 Customer Support</span>
//                 </div>
//               </div>

//               {/* {!showCustomerForm ? ( */}
//                 {/* <Button 
//                   onClick={handleConfirmBooking}
//                   className="w-full bg-primary hover:bg-primary/90"
//                 >
//                   Confirm Booking
//                 </Button> */}
//               {/* ) : ( */}
//                 <Button 
//                   onClick={handleCustomerSubmit}
//                   // disabled={!customerDetails.name || !customerDetails.phone}
//                   className="w-full bg-primary hover:bg-primary/90"
//                 >
//                   Submit & Confirm Booking
//                 </Button>
//               {/* )} */}
              
//               <p className="text-xs text-muted-foreground mt-3 text-center">
//                 By confirming, you agree to our Terms of Service and Privacy Policy
//               </p>
//             </Card>
//           </div>
//         </div>
//       </div>

//     </div>



