// src/store/bookingSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BookingState {
  pickupLocation: string;
  dropLocation: string;
  shiftDate: string | null;
  shiftType: string;
}

const initialState: BookingState = {
  pickupLocation: "",
  dropLocation: "",
  shiftDate: null,
  shiftType: "",
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action: PayloadAction<Partial<BookingState>>) => {
      return { ...state, ...action.payload }; // ✅ merge, don’t replace
    },
    resetBooking: () => initialState,
  },
});

export const { setBooking, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
