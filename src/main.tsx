import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BookingProvider } from './context/BookingContext';
import { ItemProvider } from './context/ItemContext';
import {VendorProvider} from './context/VendorContext.tsx'

createRoot(document.getElementById("root")!).render(
<BookingProvider>
    <ItemProvider>
      <VendorProvider> {/* ✅ Wrap your app with VendorProvider */}
        <App />
      </VendorProvider>
    </ItemProvider>
  </BookingProvider>
);
