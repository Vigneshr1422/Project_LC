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
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import ScrollToTop from "../components/ScrollToTop";

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

  /* ========================= 🌟 PREMIUM LUXURY DASHBOARD CARDS ========================== */
  const dashboardCards = [
    {
      icon: <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      title: "Upcoming Orders",
      subtitle: "Manage pending & live catering schedules",
      path: "/upcoming-orders",
      tag: "Live",
      tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
      theme: "from-blue-600/10 via-indigo-600/5 to-transparent border-blue-200/60 hover:border-blue-500",
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-blue-500/30",
    },
    {
      icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      title: "Date / Calendar",
      subtitle: "Timeline view & daily schedule planner",
      path: "/calendar-orders",
      tag: "Planner",
      tagColor: "bg-amber-50 text-amber-700 border-amber-200",
      theme: "from-amber-600/10 via-orange-600/5 to-transparent border-amber-200/60 hover:border-amber-500",
      iconBg: "bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-amber-500/30",
    },
    {
      icon: <BadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      title: "Completed Orders",
      subtitle: "Archive, past records & history log",
      path: "/completed-orders",
      tag: "History",
      tagColor: "bg-teal-50 text-teal-700 border-teal-200",
      theme: "from-teal-600/10 via-emerald-600/5 to-transparent border-teal-200/60 hover:border-teal-500",
      iconBg: "bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-teal-500/30",
    },
    {
      icon: <QrCode className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      title: "Order QR & Reviews",
      subtitle: "Customer ratings & feedback scanner",
      path: "/admin/order-reviews",
      tag: "Feedback",
      tagColor: "bg-purple-50 text-purple-700 border-purple-200",
      theme: "from-purple-600/10 via-violet-600/5 to-transparent border-purple-200/60 hover:border-purple-500",
      iconBg: "bg-gradient-to-br from-purple-500 to-violet-600 text-white shadow-purple-500/30",
    },
    {
      icon: <ChefHat className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      title: "Menu Items",
      subtitle: "Dishes, packages & price configuration",
      path: "/special-menu-items",
      tag: "Catalog",
      tagColor: "bg-rose-50 text-[#962a27] border-rose-200",
      theme: "from-[#962a27]/10 via-rose-600/5 to-transparent border-rose-200/60 hover:border-[#962a27]",
      iconBg: "bg-gradient-to-br from-[#962a27] to-[#b23835] text-white shadow-[#962a27]/30",
    },
    {
      icon: <MessageSquareQuote className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      title: "Testimonials",
      subtitle: "Client quotes & showcase reviews",
      path: "/admin/testimonials",
      tag: "Quotes",
      tagColor: "bg-pink-50 text-pink-700 border-pink-200",
      theme: "from-pink-600/10 via-rose-600/5 to-transparent border-pink-200/60 hover:border-pink-500",
      iconBg: "bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-pink-500/30",
    },
    {
      icon: <HardDrive className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      title: "Storage Control",
      subtitle: "Database sync & memory usage",
      path: "/users-management",
      tag: "System",
      tagColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
      theme: "from-cyan-600/10 via-blue-600/5 to-transparent border-cyan-200/60 hover:border-cyan-500",
      iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-500/30",
    },
    {
      icon: <FolderOpen className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />,
      title: "Cloud Files",
      subtitle: "Media manager & asset hosting",
      path: "/files",
      tag: "Cloud",
      tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
      theme: "from-indigo-600/10 via-slate-600/5 to-transparent border-indigo-200/60 hover:border-indigo-500",
      iconBg: "bg-gradient-to-br from-indigo-500 to-slate-700 text-white shadow-indigo-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-3 py-6 sm:px-6 sm:py-10 md:px-12 md:py-14 relative overflow-x-hidden font-sans">
      
      {/* 🚀 ScrollToTop Component Integrated Here */}
      <ScrollToTop />

      {/* Background Ambience Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] sm:w-[500px] md:w-[700px] h-[250px] md:h-[300px] bg-[#962a27]/5 rounded-full blur-[90px] pointer-events-none" />

      {/* TOAST NOTIFICATION POPUP */}
      {toast.show && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92%] max-w-sm bg-slate-900/95 backdrop-blur-md text-white border border-slate-800 rounded-2xl px-4 py-3.5 sm:px-5 sm:py-4 shadow-2xl flex items-center gap-3 animate-in fade-in zoom-in duration-200">
          <div className="p-2 bg-rose-500/20 rounded-xl text-rose-400 shrink-0">
            <AlertTriangle size={18} className="animate-pulse" />
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

      {/* TOP HEADER SECTION */}
      <div className="max-w-6xl mx-auto text-center mb-8 sm:mb-12 md:mb-14 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#962a27]/10 text-[#962a27] font-black text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4 border border-[#962a27]/20 shadow-xs">
          <Sparkles size={12} className="text-amber-600 sm:w-3.5 sm:h-3.5" />
          Lakshmi Catering Management
        </div>

        <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-[#2b1b17] tracking-tight leading-tight">
          Admin <span className="text-[#962a27] underline decoration-amber-500/60 underline-offset-4 sm:underline-offset-8">Dashboard</span>
        </h1>

        <p className="text-gray-600 mt-2.5 sm:mt-3 text-[11px] sm:text-sm md:text-base font-semibold max-w-xl mx-auto leading-relaxed px-2">
          Monitor your orders, customize premium menus, and handle comprehensive business modules in one place.
        </p>

        {/* Status Security Badge */}
        <div className="inline-flex items-center gap-1.5 mt-3 sm:mt-4 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 shadow-xs text-[11px] sm:text-xs font-bold text-gray-700">
          <ShieldCheck size={13} className="text-emerald-600 sm:w-4 sm:h-4" /> Secure Admin Session Active
        </div>
      </div>

      {/* LUXURY CARDS GRID - 2 columns on mobile (grid-cols-2), 2 cols on small, 4 cols on large */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 relative z-10">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            onClick={() => navigate(card.path)}
            className={`group bg-gradient-to-br ${card.theme} bg-white border-2 rounded-2xl sm:rounded-[28px] p-3.5 sm:p-5 md:p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-2 transition-all duration-300 cursor-pointer relative overflow-hidden`}
          >
            {/* Top Shine Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />

            <div>
              {/* Header Row: Floating Icon & Tag */}
              <div className="flex items-center justify-between mb-2.5 sm:mb-4 relative z-10">
                <div className={`w-10 h-10 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md sm:shadow-lg ${card.iconBg} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  {card.icon}
                </div>
                <span className={`text-[8px] sm:text-[10px] font-black tracking-wider uppercase px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border ${card.tagColor} shadow-2xs`}>
                  {card.tag}
                </span>
              </div>

              {/* Title & Description */}
              <div className="relative z-10">
                <h2 className="text-xs sm:text-base md:text-lg font-black text-[#2b1b17] group-hover:text-[#962a27] transition-colors leading-snug line-clamp-1 sm:line-clamp-none">
                  {card.title}
                </h2>
                <p className="text-gray-500 text-[10px] sm:text-xs mt-1 font-medium line-clamp-2 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>
            </div>

            {/* Bottom Action Footer Button Link Effect */}
            <div className="mt-3 sm:mt-6 pt-2.5 sm:pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] sm:text-xs font-black text-[#962a27] relative z-10">
              <span className="group-hover:translate-x-1 transition-transform truncate mr-1">Launch</span>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#962a27]/10 flex items-center justify-center group-hover:bg-[#962a27] group-hover:text-white transition-all shadow-xs shrink-0">
                <ArrowUpRight size={13} className="sm:w-4 sm:h-4 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LOGOUT OUTRO */}
      <div className="mt-10 sm:mt-14 md:mt-18 flex justify-center relative z-10 px-4">
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 sm:gap-3 bg-[#962a27] text-white px-6 py-3.5 sm:px-9 sm:py-4 md:px-12 md:py-4.5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm md:text-base hover:scale-105 hover:bg-[#7a2220] transition-all duration-300 cursor-pointer shadow-xl sm:shadow-2xl shadow-[#962a27]/30 border border-[#b23835]/50"
        >
          <LogOut size={18} className="sm:w-5 sm:h-5" /> Logout Admin Account
        </button>
      </div>

    </div>
  );
};

export default AdminDashboard;