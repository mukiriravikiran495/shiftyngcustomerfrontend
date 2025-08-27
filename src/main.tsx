import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BookingProvider } from "./context/BookingContext";
import { ItemProvider } from "./context/ItemContext";
import { VendorProvider } from "./context/VendorContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

// Redux imports
import { Provider } from "react-redux";
import { store } from "./store/store"; // <-- make sure you created store.ts

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AuthProvider>
      {/* ❓ You can keep these contexts for now until you migrate everything to Redux */}
      <BookingProvider>
        <ItemProvider>
          <VendorProvider>
            <App />
          </VendorProvider>
        </ItemProvider>
      </BookingProvider>
    </AuthProvider>
  </Provider>
);
