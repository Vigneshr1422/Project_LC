import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { Database, HardDrive, LayoutGrid, Files, ArrowLeft, RefreshCw, ShieldAlert, Activity, CheckCircle2, AlertCircle } from "lucide-react";

const StorageManagement = () => {
  const navigate = useNavigate();
  const [storage, setStorage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const fetchStorage = async () => {
    try {
      setError(false);
      const res = await axios.get("https://project-lc.onrender.com/api/bookings/storage");
      setStorage(res.data);
    } catch (error) {
      console.log("Error fetching cluster diagnostics: ", error);
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStorage();
  }, []);

  if (loading && !storage) {
    return <Loader />;
  }

  if (error && !storage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center border-2 border-[#962A27]/30 mb-4 animate-pulse">
          <ShieldAlert size={32} className="text-[#962a27]" />
        </div>
        <h2 className="text-xl font-black text-[#2b1b17] mb-2">Telemetry Timeout</h2>
        <p className="text-gray-500 max-w-sm mb-6 text-xs sm:text-sm font-semibold">The live cluster node is taking longer than usual to wake up.</p>
        <button onClick={fetchStorage} className="bg-[#962a27] hover:bg-[#7a2220] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wide shadow-md active:scale-95 transition-all cursor-pointer border border-[#b23835]/40"> Retry Pipeline Connection </button>
      </div>
    );
  }

  const totalMB = Number(storage?.totalMB || 512);
  const usedMB = Number(storage?.usedMB || 0);
  const remainingMB = Number(storage?.remainingMB || (totalMB - usedMB));
  const usagePercent = storage?.usagePercent ? Number(storage.usagePercent).toFixed(2) : ((usedMB / totalMB) * 100).toFixed(2);
  
  const isHealthy = usagePercent < 80;
  const isCritical = usagePercent >= 90;

  return (
    <div className="min-h-screen bg-[#fffcfb] p-4 sm:p-6 md:p-10 text-[#2b1b17] antialiased relative overflow-x-hidden font-sans">
      {/* Background Soft Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[250px] bg-[#962a27]/5 rounded-full blur-[90px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 space-y-6">
        
        {/* TOP COMMAND BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2 text-left bg-white p-5 sm:p-7 rounded-[28px] border-2 border-[#962a27]/20 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#962a27]/10 text-[#962a27] font-black text-[10px] uppercase tracking-wider mb-2 border border-[#962a27]/20">
              <Database size={12} className="animate-pulse text-[#962a27]" /> Live Telemetry Matrix
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-[#2b1b17] tracking-tight"> Storage Control Center </h1>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button 
              onClick={() => { setRefreshing(true); fetchStorage(); }} 
              disabled={refreshing} 
              className="flex items-center justify-center gap-2 bg-rose-50/60 hover:bg-rose-100/80 border-2 border-[#962a27]/25 px-4 py-3 rounded-xl font-black text-xs uppercase tracking-wider text-[#962a27] shadow-2xs transition-all active:scale-95 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin text-[#962a27]" : ""} /> Sync Diagnostics
            </button>
          </div>
        </div>

        {storage && (
          <div className="space-y-6">
            
            {/* HIGH-TECH GLASS CONSUMPTION CONTAINER */}
            <div className="bg-white border-2 border-[#962a27]/20 rounded-[28px] p-6 sm:p-8 shadow-sm relative overflow-hidden text-left transition-all hover:shadow-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#962a27]/5 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#962a27] to-[#b23835] rounded-2xl flex items-center justify-center text-white shadow-md shadow-[#962a27]/30 border border-[#b23835]/40">
                    <HardDrive size={22} />
                  </div>
                  <div>
                    <h3 className="font-black text-base sm:text-lg text-[#2b1b17] tracking-tight">Data Capacity Index</h3>
                    <p className="text-xs text-gray-500 font-semibold">BSON byte allocations inside Atlas tier</p>
                  </div>
                </div>

                <div className="bg-[#2b1b17] px-4 py-2 rounded-2xl border border-gray-800 shadow-sm self-start sm:self-auto flex items-center gap-2">
                  {isCritical ? (
                    <AlertCircle size={16} className="text-rose-400" />
                  ) : (
                    <CheckCircle2 size={16} className="text-emerald-400" />
                  )}
                  <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400 font-mono tracking-tighter">
                    {usagePercent}%
                  </span>
                </div>
              </div>

              {/* BAR INTERACTION AREA */}
              <div className="w-full bg-rose-50/70 h-4 rounded-full p-0.5 border-2 border-[#962a27]/20 overflow-hidden shadow-inner">
                <div 
                  style={{ width: `${Math.min(100, Number(usagePercent))}%` }} 
                  className={`h-full rounded-full transition-all duration-1000 ease-out relative ${
                    isCritical ? "bg-rose-600" : "bg-gradient-to-r from-[#962a27] via-amber-500 to-emerald-500"
                  }`} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-rose-100 text-left font-mono">
                <div>
                  <span className="text-[10px] uppercase font-black text-gray-400 block tracking-wider">Used Capacity</span>
                  <span className="text-sm font-black text-gray-800">{usedMB.toFixed(2)} MB</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-black text-gray-400 block tracking-wider">Available Volume</span>
                  <span className="text-sm font-black text-emerald-600">{remainingMB.toFixed(2)} MB <span className="text-gray-400 font-bold">/ {totalMB.toFixed(0)} MB</span></span>
                </div>
              </div>
            </div>

            {/* STORAGE STATUS / HEALTH SUMMARY CARD */}
            <div className="bg-gradient-to-br from-[#2b1b17] via-[#1e120f] to-[#2b1b17] text-white border-2 border-[#962a27]/40 rounded-[28px] p-6 sm:p-7 shadow-xl relative overflow-hidden text-left group">
              <div className="absolute right-0 bottom-0 transform translate-x-8 translate-y-8 text-white/5 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                <Activity size={180} />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                    Cluster Health Index
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                    Database Utilization & Space Summary
                  </h3>
                  <p className="text-gray-300 font-semibold text-xs sm:text-sm max-w-lg leading-relaxed">
                    Real-time telemetry tracking active document records, index allocation sizes, and overall cluster capacity headroom.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 rounded-2xl flex flex-col items-center justify-center min-w-[170px] shadow-inner shrink-0">
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-emerald-400">
                    {remainingMB.toFixed(1)} MB
                  </span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                    Free Space Left
                  </span>
                </div>
              </div>
            </div>

            {/* DUAL STAT NODES CARD GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="bg-white border-2 border-[#962a27]/20 p-5 rounded-[24px] shadow-sm flex items-center gap-4 group hover:border-[#962a27] transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 border border-blue-200 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-2xs">
                  <LayoutGrid size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">Collection Maps</span>
                  <h4 className="text-base sm:text-lg font-black text-gray-900 mt-0.5">{storage.collections || 0} Data Clusters</h4>
                </div>
              </div>
              <div className="bg-white border-2 border-[#962a27]/20 p-5 rounded-[24px] shadow-sm flex items-center gap-4 group hover:border-[#962a27] transition-all duration-300">
                <div className="w-12 h-12 bg-purple-50 border border-purple-200 text-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shrink-0 shadow-2xs">
                  <Files size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">Row Registries</span>
                  <h4 className="text-base sm:text-lg font-black text-gray-900 mt-0.5">{Number(storage.objects || 0).toLocaleString()} Active BSON Docs</h4>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* FOOTER ACTIONS ROW */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-[#962a27]/20 pt-6">
          <button 
            onClick={() => navigate(-1)} 
            className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#962a27] hover:bg-[#7a2220] text-white px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all cursor-pointer border border-[#b23835]/40"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Exit Terminal Deck
          </button>
          <div className="text-[11px] font-mono font-black text-gray-500 flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-gray-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>Cluster Status: Live</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StorageManagement;