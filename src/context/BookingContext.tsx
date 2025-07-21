import { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the booking data
export type BookingData = {
  pickupLocation: string;
  dropLocation: string;
  shiftDate: Date | null;
  shiftType: string;
};

// Provide a safe initial/default value
const defaultBooking: BookingData = {
  pickupLocation: "",
  dropLocation: "",
  shiftDate: null,
  shiftType: "",
};

// Define the context type with non-nullable booking
type BookingContextType = {
  booking: BookingData;
  setBooking: React.Dispatch<React.SetStateAction<BookingData>>;
};

// Create context with a dummy default (will be replaced by provider)
const BookingContext = createContext<BookingContextType>({
  booking: defaultBooking,
  setBooking: () => {},
});

// Custom hook to access booking context
export const useBooking = () => useContext(BookingContext);

// Provider to wrap the app or relevant components
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [booking, setBooking] = useState<BookingData>(() => {
    const stored = localStorage.getItem("booking");
    return stored ? JSON.parse(stored) : defaultBooking;
  });

  // Sync with localStorage on every update
  const updateBooking: React.Dispatch<React.SetStateAction<BookingData>> = (dataOrUpdater) => {
    setBooking((prev) => {
      const newBooking = typeof dataOrUpdater === "function"
        ? dataOrUpdater(prev)
        : dataOrUpdater;
      localStorage.setItem("booking", JSON.stringify(newBooking));
      return newBooking;
    });
  };

  return (
    <BookingContext.Provider value={{ booking, setBooking: updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
};
