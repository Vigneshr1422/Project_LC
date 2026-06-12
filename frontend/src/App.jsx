import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import Login from "./pages/Login";
import PDFPreview from "./pages/PDFPreview";

import MainLayout from "./layout/MainLayout";
import BookingPage from "./pages/BookingPage";
import BookingPreview from "./pages/BookingPreview";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import specialMenu from "./data/SpecialMenus";
import BookingSummary from "./pages/BookingSummary";
import AdminDashboard from "./pages/AdminDashboard";
import CalendarOrders from "./pages/CalendarOrders";
// Route Component setup list kulla ithai set பண்ணுங்க:
import PaymentPage from "./pages/PaymentPage";
import SpecialMenuItems from "./pages/SpecialMenuItems";
import UsersManagement from "./pages/StorageManagement";
import UpcomingOrders from "./pages/UpcomingOrders";
import CompletedOrders from "./pages/CompletedOrders";
import Files from "./pages/Files";

import PaymentSuccess from "./pages/PaymentSuccess";

/* ==========================================================================
    🛡️ ROUTE GUARD: PROTECTED ADMIN WRAPPER
   ========================================================================== */
const ProtectedAdminRoute = () => {
  const isAdminAuthenticated = localStorage.getItem("adminAuth") === "true";
  
  // Auth clear-ah irundha child routes ulla vidu, illana absolute-ah admin log in route kootu po
  return isAdminAuthenticated ? <Outlet /> : <Navigate to="/admin" replace />;
};

/* ==========================================================================
    🛡️ ROUTE GUARD: PREVENT LOGGED IN ADMIN FROM SEEING LOGIN PAGE
   ========================================================================== */
const PublicLoginRoute = ({ children }) => {
  const isAdminAuthenticated = localStorage.getItem("adminAuth") === "true";
  
  // Already login pannirundha thirumba login page kaataama straight-ah dashboard anupidum
  return isAdminAuthenticated ? <Navigate to="/admin-dashboard" replace /> : children;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.onload = () => {
      setTimeout(() => {
        setLoading(false);
      }, 2600);
    };
    
    // Fallback safety safety guard: Window load fire aagala nallum 3s la page loader set-off aagum
    const backupTimer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(backupTimer);
  }, []);

  return (
    <>
      {loading && <Loader />}

      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* Main Layout Wrapping Global Pages Hierarchy */}
          <Route path="/" element={<MainLayout />}>
            
            {/* 🌐 PUBLIC ACCESS ROUTES */}
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="menu" element={<Menu />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/specialMenus" element={<specialMenu />} />
            <Route path="/BookingSummary" element={<BookingSummary />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/booking-preview" element={<BookingPreview />} />
            <Route path="/payment-gateway" element={<PaymentPage />} />
            <Route path="/pdf-preview" element={<PDFPreview />} />

            {/* 🔓 PUBLIC ADMIN ENTRY ROUTE (Wrapped with Login Check Guard) */}
            <Route 
              path="/admin" 
              element={
                <PublicLoginRoute>
                  <Login />
                </PublicLoginRoute>
              } 
            />

            {/* ==========================================================================
                🔒 PROTECTED WORKSPACE ADMIN LAYER (URL ADICHA INTERNAL RENDER BLOCK AAGUM)
               ========================================================================== */}
            <Route element={<ProtectedAdminRoute />}>
              <Route 
                path="/admin-dashboard" 
                element={<AdminDashboard />} 
              />
              <Route 
                path="/users-management" 
                element={<UsersManagement />} 
              />
              <Route 
                path="/upcoming-orders" 
                element={<UpcomingOrders />} 
              />
              <Route 
                path="/completed-orders" 
                element={<CompletedOrders />} 
              />
              <Route 
                path="/files" 
                element={<Files />} 
              />
              <Route 
                path="/special-menu-items" 
                element={<SpecialMenuItems />} 
              />
              <Route path="/calendar-orders" element={<CalendarOrders />} />

            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;