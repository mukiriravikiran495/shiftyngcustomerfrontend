import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Vendor = {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  discount: number;
  verified: boolean;
  services: string[];
  features: string[];
  deliveryTime: string;
  vehicleType: string;
};

type VendorContextType = {
  selectedVendor: Vendor | null;
  setSelectedVendor: (vendor: Vendor | null) => void;
};

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export const VendorProvider = ({ children }: { children: ReactNode }) => {
  const [selectedVendor, setSelectedVendorState] = useState<Vendor | null>(null);

  // Load from localStorage on first render
  useEffect(() => {
    const storedVendor = localStorage.getItem("selectedVendor");
    if (storedVendor) {
      setSelectedVendorState(JSON.parse(storedVendor));
    }
  }, []);

  // Save to localStorage when selectedVendor changes
  const setSelectedVendor = (vendor: Vendor | null) => {
    setSelectedVendorState(vendor);
    if (vendor) {
      localStorage.setItem("selectedVendor", JSON.stringify(vendor));
    } else {
      localStorage.removeItem("selectedVendor");
    }
  };

  return (
    <VendorContext.Provider value={{ selectedVendor, setSelectedVendor }}>
      {children}
    </VendorContext.Provider>
  );
};

export const useVendorContext = () => {
  const context = useContext(VendorContext);
  if (!context) throw new Error("useVendorContext must be used within VendorProvider");
  return context;
};