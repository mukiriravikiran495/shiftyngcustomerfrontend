import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { LoginModal } from "@/components/LoginModal";
import { useLocation, useNavigate } from "react-router-dom";
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
  Mail,
  Download,
  Share
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, bookingData, selectedItems, selectedVendor, customerDetails } = location.state || {};
  const handleDownloadReceipt = () => {
    // Implementation for downloading receipt
    console.log("Downloading receipt...");
  };

  const handleShareBooking = () => {
    // Implementation for sharing booking details
    console.log("Sharing booking details...");
  };

  const handleNewBooking = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left section (logo + back button) */}
            <div className="flex items-center flex-1">
              <div className="lg:hidden">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate("/BookingDetails")}
                  className="mr-3"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </div>
              <h1
                className="text-[30px] font-bold text-primary font-weight-900"
                style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
              >
                Shiftyng
              </h1>
            </div>
          </div>
        </div>
      </header>

        <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
        <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">From</p>
                  <p className="font-semibold">{bookingData?.pickupLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">To</p>
                  <p className="font-semibold">{bookingData?.dropLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Moving Date</p>
                  <p className="font-semibold">{bookingData?.shiftDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service Type</p>
                  <p className="font-semibold capitalize">{bookingData?.shiftType}</p>
                </div>
              </div>

              <hr />

              {/* Service Provider */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Service Provider</p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={selectedVendor?.image} 
                    alt={selectedVendor?.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold">{selectedVendor?.name}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{selectedVendor?.rating}</span>
                    </div>
                  </div>
                </div>
              </div>

              <hr />

              {/* Contact Information */}
              <div>
                <p className="text-sm text-muted-foreground mb-2">Customer Details</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold">{customerDetails?.name}</p>
                    <p className="text-sm text-muted-foreground">{customerDetails?.phone}</p>
                  </div>
                  {customerDetails?.email && (
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-semibold">{customerDetails.email}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <p className="font-semibold">Confirmation Call</p>
                  <p className="text-sm text-muted-foreground">The service provider will call you within 30 minutes to confirm details.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <p className="font-semibold">Pre-Move Survey</p>
                  <p className="text-sm text-muted-foreground">A representative will visit to assess your items and provide final quotation.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <p className="font-semibold">Moving Day</p>
                  <p className="text-sm text-muted-foreground">Professional team will arrive on scheduled date for packing and moving.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Button variant="outline" onClick={handleDownloadReceipt}>
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" onClick={handleShareBooking}>
              <Share className="h-4 w-4 mr-2" />
              Share Details
            </Button>
            <Button onClick={handleNewBooking} className="bg-primary hover:bg-primary/90">
              New Booking
            </Button>
          </div>

          {/* Contact Support */}
          <Card className="p-6 bg-muted/30">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our customer support team is available 24/7 to assist you.
              </p>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call Support: +91 9876543210
              </Button>
            </div>
          </Card>
        </div>
       </div>
       </div> 

    
  );
};

export default BookingSuccess;
