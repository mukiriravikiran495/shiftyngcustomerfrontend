import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BookingProvider } from './context/BookingContext';
import { ItemProvider } from './context/ItemContext';

createRoot(document.getElementById("root")!).render(
<BookingProvider>
    <ItemProvider> {/* ✅ wrap App inside this */}
      <App />
    </ItemProvider>
  </BookingProvider>
);
