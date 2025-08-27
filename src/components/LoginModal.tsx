import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Shield, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (mobileNumber: string) => void;
}

const SEND_OTP_URL = "http://localhost:8082/v1/api/customer/sendotp";
const VERIFY_OTP_URL = "http://localhost:8082/v1/api/customer/verifyotp";

export const LoginModal = ({ isOpen, onClose, onLoginSuccess }: LoginModalProps) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [custInfo, setCustInfo] = useState<any>(null);
  const [otpLength, setOtpLength] = useState(4);
  const [message, setMessage] = useState("");

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(SEND_OTP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: phoneNumber }),
      });

      const data = await res.json();

      if (res.ok && (data?.statusHandler?.statusCode === "200" || res.status === 200)) {
        setCustInfo(data);
        if (data?.otp) setOtpLength(data.otp.length);
        setStep("otp");

        toast({
          title: "OTP Sent!",
          description: `Verification code sent to +91 ${phoneNumber}`,
        });
      } else {
        toast({
          title: "Failed to send OTP",
          description: data?.statusHandler?.message || data?.message || "Please try again.",
          variant: "destructive",
        });
      }
    } catch (e) {
      toast({
        title: "Network Error",
        description: "Unable to send OTP. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== otpLength) {
      toast({
        title: "Invalid OTP",
        description: `Please enter a valid ${otpLength}-digit OTP`,
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(VERIFY_OTP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: phoneNumber,
          otp: otp,
        }),
      });

      const data = await response.json();

      if (response.ok && data?.otpVerified === true) {
        localStorage.setItem("authToken", data.token || "");
        localStorage.setItem("custId", String(data.custId));
        localStorage.setItem("custName", data.cust_name || "");
        localStorage.setItem("mobileNumber", phoneNumber);

        toast({
          title: "Login Successful",
          description: `Welcome ${data.cust_name || "User"}!`,
        });

        onLoginSuccess(phoneNumber);
        onClose();
        resetForm();
      } else {
        toast({
          title: "OTP Verification Failed",
          description: data?.statusHandler?.message || data?.message || "Incorrect OTP. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("OTP Verify error:", error);
      toast({
        title: "Network Error",
        description: "Unable to verify OTP. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };


  const resetForm = () => {
    setStep("phone");
    setPhoneNumber("");
    setOtp("");
    setCustInfo(null);
    setOtpLength(4);
    setMessage("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-full p-0">
        <div className="max-h-[90vh] overflow-y-auto px-8 py-6 sm:px-6">
          <DialogHeader>
            <DialogTitle className="text-center text-xl sm:text-2xl font-bold text-gray-800">
              {step === "phone" ? "Welcome Back" : "Verify OTP"}
            </DialogTitle>
          </DialogHeader>

          <Card className="border-0 shadow-none">
            <CardContent className="p-0 sm:p-6 space-y-6">
              {step === "phone" ? (
                <>
                  <div className="text-center mt-6">
                    <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Smartphone className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Enter your mobile number to get started
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="phone" className="text-sm sm:text-base">
                        Mobile Number
                      </Label>
                      <div className="flex mt-1">
                        <div className="flex items-center px-3 bg-gray-50 border border-r-0 rounded-l-md">
                          <span className="text-gray-500 text-sm sm:text-base">+91</span>
                        </div>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter 10-digit number"
                          value={phoneNumber}
                          onChange={(e) =>
                            setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))
                          }
                          className="rounded-s-none border-none text-sm sm:text-base"
                          maxLength={10}
                        />
                      </div>
                    </div>

                    <Button
                      onClick={handleSendOTP}
                      disabled={loading || phoneNumber.length !== 10}
                      className="w-full bg-[#BA1C1C] hover:bg-black-900 border-none text-sm sm:text-base"
                    >
                      {loading ? "Sending OTP..." : "Send OTP"}
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center mt-6">
                    <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-[#BA1C1C]" />
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Enter the {otpLength}-digit code sent to
                    </p>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      +91 {phoneNumber}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="otp" className="text-sm sm:text-base">
                        Verification Code
                      </Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder={`Enter ${otpLength}-digit OTP`}
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, otpLength))
                        }
                        className="text-center text-xl sm:text-2xl tracking-widest"
                        maxLength={otpLength}
                      />
                    </div>

                    <div className="space-y-3">
                      <Button
                        onClick={handleVerifyOTP}
                        disabled={loading || otp.length !== otpLength}
                        className="w-full bg-[#BA1C1C] hover:bg-red-700 text-sm sm:text-base"
                      >
                        {loading ? "Verifying..." : "Verify & Login"}
                      </Button>

                      <Button
                        onClick={resetForm}
                        variant="ghost"
                        className="w-full text-gray-600 text-sm sm:text-base"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Change Number
                      </Button>
                    </div>
                  </div>
                </>
              )}

              <div className="text-center text-xs sm:text-sm text-gray-500 mt-6">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
