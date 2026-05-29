import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import Login from "./pages/Login";

import MainLayout from "./layout/MainLayout";
import BookingPage from "./pages/BookingPage";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import specialMenu from "./data/specialMenus";
import BookingSummary from "./pages/BookingSummary";
import AdminDashboard from "./pages/AdminDashboard";

import UsersManagement from "./pages/UsersManagement";
import UpcomingOrders from "./pages/UpcomingOrders";
import CompletedOrders from "./pages/CompletedOrders";
import Files from "./pages/Files";

import PaymentSuccess from "./pages/PaymentSuccess";
function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    window.onload = () => {

      setTimeout(() => {
        setLoading(false);
      }, 2600);

    };

  }, []);

  return (

    <>
    
      {loading && <Loader />}

      <BrowserRouter>

        <ScrollToTop />

        <Routes>

          <Route path="/" element={<MainLayout />}>

            <Route
              index
              element={<Home />}
            />

            <Route
              path="services"
              element={<Services />}
            />

            <Route
              path="menu"
              element={<Menu />}
            />

            <Route
              path="contact"
              element={<Contact />}
            />

            <Route 
              path="/admin" 
              element={<Login />} 
            />

            <Route 
              path="/booking"   
              element={<BookingPage />} 
            />

            <Route
            path="/specialMenus"
            element={<specialMenu/>}
            />

            

            <Route
            path="/BookingSummary"
            element={<BookingSummary/>}
            />

            <Route
              path="/payment-success"
              element={<PaymentSuccess />}
            />

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



          </Route>

        </Routes>

      </BrowserRouter>

    </>

  );
}

export default App;