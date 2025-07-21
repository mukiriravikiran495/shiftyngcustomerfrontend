import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BookingProvider } from './context/BookingContext';
import { ItemProvider } from './context/ItemContext';
import {VendorProvider} from './context/VendorContext.tsx'
import {AuthProvider} from './context/AuthContext.tsx';

createRoot(document.getElementById("root")!).render(
<AuthProvider>
    <BookingProvider>
      <ItemProvider>
        <VendorProvider>
          <App />
        </VendorProvider>
      </ItemProvider>
    </BookingProvider>
  </AuthProvider>
);
