// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
});

// Types for useSelector / useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
