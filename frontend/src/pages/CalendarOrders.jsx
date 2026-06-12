import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Calendar as CalendarIcon, ChevronRight, ChevronLeft as ArrowLeftIcon, Users, MapPin, ClipboardCheck } from "lucide-react";
import Loader from "../components/Loader";

const CalendarOrders = () => {
  const navigate = useNavigate();
  
  // Local state tracking parameters
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 📝 MOCK DATA LOGS ENGINE
  const [allOrders, setAllOrders] = useState([
    { id: "LC9081", name: "Ananth Kumar", date: "2026-06-15", guests: 450, city: "Karaikudi", preference: "Veg", status: "Confirmed" },
    { id: "LC9082", name: "Meena Meenakshi", date: "2026-06-18", guests: 800, city: "Devakottai", preference: "Non-Veg", status: "Confirmed" },
    { id: "LC9083", name: "Rajesh R", date: "2026-06-20", guests: 200, city: "Ariyakudi", preference: "Veg", status: "Confirmed" },
    { id: "LC9084", name: "Suresh Pillai", date: "2026-06-15", guests: 1200, city: "Karaikudi", preference: "Non-Veg", status: "Confirmed" },
    { id: "LC9085", name: "Venkatesh S", date: "2026-06-25", guests: 350, city: "Pudukkottai", preference: "Veg", status: "Confirmed" },
    { id: "LC9086", name: "Karthik Raja", date: "2026-06-29", guests: 600, city: "Karaikudi", preference: "Non-Veg", status: "Confirmed" },
    { id: "LC9087", name: "Dinesh Karthik", date: "2026-07-02", guests: 150, city: "Ariyakudi", preference: "Veg", status: "Confirmed" },
  ]);

  // 1. CALCULATE TOP 5 UPCOMING ORDERS
  const upcomingTop5 = [...allOrders]
    .filter(order => new Date(order.date) >= new Date().setHours(0,0,0,0))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  // 2. CALENDAR CORE UTILITY MATRICES
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  
  const blankCells = Array(firstDayIndex).fill(null);
  const monthDays = Array.from({ length: totalDays }, (_, i) => i + 1);
  const gridCells = [...blankCells, ...monthDays];

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // 3. PAGINATION ENGINE SPLIT MECHANISM
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTableOrders = allOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(allOrders.length / itemsPerPage);

  return (
    /* 🎨 NEW: மொத்த பக்கத்தின் பேக்கிரவுண்ட் இப்போ லைட் மெரூன்/பிரவுன் டின்ட் ஷேடுக்கு மாத்திருக்கேன் */
    <div className="min-h-screen bg-[#fdf8f8] px-4 py-6 md:px-10 md:py-8 antialiased text-slate-800 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* BACK TO OVERVIEW HEADER NAVIGATION */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-red-800/60 hover:text-[#962a27] mb-6 transition-colors font-bold text-sm sm:text-base cursor-pointer group"
        >
          <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-0.5" /> Back to Dashboard
        </button>

        {/* 👑 SPLIT INTERFACE DECK CONTROLS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* =========================================================
              📅 LEFT PANEL: HIGH RESOLUTION MOBILE-RESPONSIVE CALENDAR TIER
              ========================================================= */}
          {/* 🎨 NEW: கார்டோட பார்டர் இப்போ பிராண்ட் பிரவுன் தீமிற்கு தகுந்தாற்போல் மாற்றப்பட்டுள்ளது */}
          <div className="lg:col-span-7 bg-white border border-red-900/10 rounded-3xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(150,42,39,0.03)] text-left">
            
            {/* Calendar Control Top Bar */}
            <div className="flex justify-between items-center border-b border-red-50 pb-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#962a27]/10 rounded-2xl text-[#962a27]">
                  <CalendarIcon size={22} />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black tracking-tight text-[#962a27]">
                    {monthNames[month]} {year}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-amber-800/60 font-bold uppercase tracking-wider">
                    Event Ledger Matrix
                  </p>
                </div>
              </div>
              
              {/* 🎨 மந்த் சேஞ்சர் பட்டன் பேக்கிரவுண்ட் இப்போ லைட் பிரவுன் டின்ட் */}
              <div className="flex gap-1.5 bg-[#962a27]/5 p-1 rounded-xl">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-white text-[#962a27] rounded-lg cursor-pointer transition-all shadow-3xs active:scale-95">
                  <ArrowLeftIcon size={14} />
                </button>
                <button onClick={handleNextMonth} className="p-2 hover:bg-white text-[#962a27] rounded-lg cursor-pointer transition-all shadow-3xs active:scale-95">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* WEEKDAY LABELS */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2.5 text-center text-[10px] sm:text-xs font-black uppercase text-amber-900/40 tracking-widest mb-3">
              {daysOfWeek.map((d, i) => (
                <div key={i} className="py-1 sm:py-2">{d}</div>
              ))}
            </div>

            {/* DYNAMIC RESPONSIVE CELL GRID */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2.5">
              {gridCells.map((day, idx) => {
                if (!day) return <div key={idx} className="bg-[#962a27]/5 rounded-xl sm:rounded-2xl aspect-square md:aspect-auto md:min-h-[75px]" />;
                
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const matchOrders = allOrders.filter(o => o.date === dateStr);
                const hasOrders = matchOrders.length > 0;

                return (
                  <div 
                    key={idx} 
                    className={`aspect-square md:aspect-auto md:min-h-[75px] p-1.5 sm:p-2.5 border rounded-xl sm:rounded-2xl flex flex-col justify-between transition-all group relative overflow-hidden select-none ${
                      hasOrders 
                        ? "border-[#962a27]/40 bg-gradient-to-br from-red-50 to-red-100/30 shadow-3xs font-black ring-1 ring-[#962a27]/5" 
                        : "border-gray-100 bg-white hover:border-[#962a27]/20"
                    }`}
                  >
                    <span className={`text-xs sm:text-sm font-black font-mono ${
                      hasOrders ? "text-[#962a27]" : "text-slate-400 group-hover:text-[#962a27]"
                    }`}>
                      {day}
                    </span>

                    {hasOrders && (
                      <>
                        <div className="hidden md:block w-full bg-[#962a27] text-white text-[9px] font-black tracking-widest py-1 rounded-lg uppercase truncate text-center shadow-xs">
                          {matchOrders.length} Order{matchOrders.length > 1 ? 's' : ''}
                        </div>
                        <div className="md:hidden flex justify-center items-center w-full mt-auto">
                          <span className="w-2 h-2 bg-[#962a27] rounded-full ring-4 ring-[#962a27]/20 animate-pulse" />
                        </div>
                        <span className="md:hidden absolute top-0.5 right-0.5 bg-[#962a27] text-white text-[8px] font-mono font-black h-3.5 w-3.5 flex items-center justify-center rounded-full scale-90">
                          {matchOrders.length}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile Legend Footer Indicator Bar */}
            <div className="md:hidden mt-4 pt-3 border-t border-red-50 flex items-center justify-end gap-2 text-[10px] font-bold text-amber-900/50 tracking-wider">
              <span className="w-1.5 h-1.5 bg-[#962a27] rounded-full" />
              <span>Dates with confirmed catering bookings</span>
            </div>
          </div>

          {/* =========================================================
              🔥 RIGHT PANEL: TOP 5 CRITICAL UPCOMING ORDERS (5 COLS)
              ========================================================= */}
          <div className="lg:col-span-5 bg-white border border-red-900/10 rounded-[2rem] p-6 shadow-sm text-left h-full flex flex-col">
            <div className="flex items-center gap-3 border-b border-red-50 pb-4 mb-4">
              <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-600">
                <ClipboardCheck size={22} />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#962a27] uppercase tracking-wide">Top 5 Upcoming Vault</h2>
                <p className="text-xs text-slate-400 font-medium">Immediate Cron Chronological Orders</p>
              </div>
            </div>

            <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[360px] pr-1">
              {upcomingTop5.map((order) => (
                /* 🎨 கார்டுகளின் உள்ளே இருக்கும் சின்ன சின்ன பெட்டிகளுக்கு மெரூன் டின்ட் பேக்கிரவுண்ட் */
                <div key={order.id} className="p-3.5 bg-[#962a27]/5 border border-[#962a27]/10 hover:border-[#962a27]/40 rounded-2xl transition-all flex justify-between items-center gap-3">
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black bg-[#962a27] text-white px-2 py-0.5 rounded uppercase tracking-wide">{order.id}</span>
                      <h4 className="text-sm font-black text-slate-900 truncate capitalize">{order.name}</h4>
                    </div>
                    <div className="flex items-center gap-3 text-amber-900/60 text-xs font-semibold">
                      <span className="flex items-center gap-1"><Users size={12} /> {order.guests}</span>
                      <span className="flex items-center gap-1 truncate"><MapPin size={12} /> {order.city}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-[#962a27] bg-white border border-[#962a27]/20 shadow-3xs px-2.5 py-1 rounded-xl font-mono">
                      {new Date(order.date).toLocaleDateString("en-IN", { day: '2-digit', month: 'short' })}
                    </p>
                    <span className={`inline-block text-[9px] font-black uppercase tracking-wider mt-1 px-1.5 py-0.5 rounded ${order.preference === 'Veg' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                      {order.preference === 'Veg' ? '🌱 Veg' : '🍗 Non-Veg'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================
            📊 BOTTOM LEVEL: MASTER DATABASE ARCHITECTURE & PAGINATION TABLE
            ========================================================= */}
        <div className="bg-white border border-red-900/10 rounded-[2rem] overflow-hidden mt-8 shadow-sm text-left">
          {/* 🎨 டேபிள் டாப் இப்போ லைட் மெரூன் சாஃப்ட் பேக்கிரவுண்ட் */}
          <div className="p-6 border-b border-[#962a27]/20 bg-[#962a27]/5">
            <h3 className="text-base font-black text-[#962a27] uppercase tracking-wide">All Booking Registry Logs</h3>
            <p className="text-xs text-amber-800/60 font-medium mt-0.5">Paginated Ledger Tracking System</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                {/* 🎨 ஹெடருக்கு தகுந்தாற்போல் பார்டர் கலர் மாற்றம் */}
                <tr className="text-amber-900/50 text-xs uppercase tracking-wider font-bold border-b border-[#962a27]/10 bg-[#fdf8f8]/50">
                  <th className="px-6 py-4 text-center w-20">ID</th>
                  <th className="px-6 py-4 text-left">Customer</th>
                  <th className="px-6 py-4 text-center">Event Date</th>
                  <th className="px-6 py-4 text-center">Guests</th>
                  <th className="px-6 py-4 text-left">Venue</th>
                  <th className="px-6 py-4 text-center">Preference</th>
                </tr>
              </thead>
              {/* 🎨 ரோ பார்டர்கள் இப்போ பிரவுன்/மெரூன் கலருக்கு செட் செய்யப்பட்டுள்ளது */}
              <tbody className="divide-y divide-[#962a27]/10 text-sm font-semibold text-slate-700 bg-white">
                {currentTableOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#962a27]/5 even:bg-[#fdf8f8]/30 transition-colors">
                    <td className="px-6 py-4 text-center font-mono font-black text-[#962a27]">{order.id}</td>
                    <td className="px-6 py-4 font-bold text-slate-900 capitalize">{order.name}</td>
                    <td className="px-6 py-4 text-center font-mono">{order.date}</td>
                    <td className="px-6 py-4 text-center font-mono font-bold">{order.guests}</td>
                    <td className="px-6 py-4 capitalize">{order.city}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${order.preference === 'Veg' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                        {order.preference === 'Veg' ? '🌱 Veg' : '🍗 Non-Veg'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📄 MASTER PAGINATION NAVIGATION TIERS */}
          <div className="p-4 bg-[#962a27]/5 border-t border-[#962a27]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xs text-amber-900/60 font-bold">Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, allOrders.length)} of {allOrders.length} Orders</span>
            <div className="flex items-center gap-1.5">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-white border border-[#962a27]/20 rounded-lg text-[#962a27] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all hover:bg-red-50/50"
              >
                <ArrowLeftIcon size={14} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNo) => (
                <button
                  key={pageNo}
                  onClick={() => setCurrentPage(pageNo)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer border ${
                    currentPage === pageNo 
                      ? "bg-[#962a27] text-white border-[#962a27] shadow-sm" 
                      : "bg-white text-slate-600 border-[#962a27]/20 hover:bg-[#962a27]/5 text-[#962a27]"
                  }`}
                >
                  {pageNo}
                </button>
              ))}

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 bg-white border border-[#962a27]/20 rounded-lg text-[#962a27] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all hover:bg-red-50/50"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CalendarOrders;