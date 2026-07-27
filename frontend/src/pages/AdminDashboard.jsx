import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ClipboardList,
  BadgeCheck,
  ChefHat,
  HardDrive,
  FolderOpen,
  LogOut,
  AlertTriangle,
  QrCode,
  MessageSquareQuote,
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminLoginTime");
    navigate("/");
  };

  useEffect(() => {
    if (!localStorage.getItem("adminLoginTime")) {
      localStorage.setItem("adminLoginTime", new Date().getTime().toString());
    }
    const checkSessionExpiry = () => {
      const loginTime = localStorage.getItem("adminLoginTime");
      if (loginTime) {
        const currentTime = new Date().getTime();
        const EXPIRY_DURATION = 2 * 60 * 60 * 1000; // 2 Hours
        if (currentTime - parseInt(loginTime) > EXPIRY_DURATION) {
          setToast({
            show: true,
            message: "🔒 Session Expired! Logging out automatically...",
          });
          setTimeout(() => {
            handleLogout();
          }, 3000);
        }
      }
    };
    checkSessionExpiry();
    const interval = setInterval(checkSessionExpiry, 10000);
    return () => clearInterval(interval);
  }, [navigate]);

  /* ========================= 📦 ALL 8 DASHBOARD BUTTONS ========================== */
  const dashboardButtons = [
    {
      icon: <Calendar size={34} />,
      title: "Date / Calendar",
      path: "/calendar-orders",
    },
    {
      icon: <ClipboardList size={34} />,
      title: "Upcoming Orders",
      path: "/upcoming-orders",
    },
    {
      icon: <BadgeCheck size={34} />,
      title: "Completed Orders",
      path: "/completed-orders",
    },
    {
      icon: <ChefHat size={34} />,
      title: "Menu Items",
      path: "/special-menu-items",
    },
    {
      icon: <HardDrive size={34} />,
      title: "Storage Control",
      path: "/users-management",
    },
    {
      icon: <FolderOpen size={34} />,
      title: "Cloud Files",
      path: "/files",
    },
    {
      icon: <QrCode size={34} />,
      title: "Order QR & Reviews",
      path: "/admin/order-reviews",
    },
    {
      icon: <MessageSquareQuote size={34} />,
      title: "Testimonials",
      path: "/admin/testimonials",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-5 py-8 md:px-10 md:py-10 relative overflow-x-hidden">
     {toast.show && (
  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-sm bg-slate-900/95 backdrop-blur-md text-white border border-slate-800 rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3 sm:gap-4 animate-in fade-in zoom-in duration-200">
    <div className="p-2 bg-rose-500/20 rounded-xl text-rose-400 shrink-0">
      <AlertTriangle size={20} className="animate-pulse" />
    </div>
    <div className="flex-1 min-w-0 text-left">
      <p className="text-xs sm:text-sm font-bold text-slate-100 break-words leading-tight">
        {toast.message}
      </p>
      <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1">
        Please re-authenticate your session
      </p>
    </div>
  </div>
)}
      {/* TOP SUMMARY */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold text-[#962a27]">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-3 text-sm md:text-base">
          Lakshmi Catering Management System
        </p>
      </div>

      {/* 8 BUTTONS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
        {dashboardButtons.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="bg-white border border-gray-200 rounded-[30px] p-5 md:p-8 flex flex-col items-center justify-center text-center hover:border-[#962a27] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#fff1f1] to-[#ffe3e2] flex items-center justify-center text-[#962a27] shadow-sm group-hover:scale-105 transition-transform duration-300">
              {item.icon}
            </div>
            <h2 className="mt-4 text-sm md:text-lg font-bold text-[#962a27]">
              {item.title}
            </h2>
          </button>
        ))}
      </div>

      {/* LOGOUT OUTRO */}
      <div className="mt-16 flex justify-center">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 bg-[#962a27] text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 hover:bg-[#b23835] transition-all duration-300 cursor-pointer shadow-md"
        >
          <LogOut size={20} /> Logout Account
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;