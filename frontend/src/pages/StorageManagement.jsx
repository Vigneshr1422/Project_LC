import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader"; 
import { 
  Database, 
  HardDrive, 
  LayoutGrid, 
  Files, 
  ArrowLeft, 
  RefreshCw, 
  ShieldAlert,
  Activity,
  Layers,
  Trash2,
  X,
  AlertTriangle
} from "lucide-react";

const StorageManagement = () => {
  const navigate = useNavigate();
  const [storage, setStorage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  // Delete Automation & Security states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

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

  const handleDeleteAllDocuments = async () => {
    if (confirmText !== "DELETE") return;
    
    try {
      setDeleting(true);
      const res = await axios.delete("https://project-lc.onrender.com/api/booking1/delete-all");
      
      if (res.data.success) {
        setIsModalOpen(false);
        setConfirmText("");
        fetchStorage();
      }
    } catch (err) {
      console.error("Error clearing database assets:", err);
      alert("⚠️ Failed to purge database. Check API logs.");
    } finally {
      setDeleting(false);
    }
  };

  const calculateEstimatedRemainingUsers = (freeMB) => {
    const validFreeMB = Number(freeMB || 0);
    if (validFreeMB <= 0) return 0;
    const avgInvoiceDocSizeMB = 0.2; 
    return Math.floor(validFreeMB / avgInvoiceDocSizeMB);
  };

  if (loading && !storage) {
    return <Loader />;
  }

  if (error && !storage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
        <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center border border-rose-200 mb-4 animate-pulse">
          <ShieldAlert size={32} className="text-[#962a27]" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Telemetry Timeout</h2>
        <p className="text-slate-500 max-w-sm mb-6 text-sm">The live cluster node is taking longer than usual to wake up.</p>
        <button onClick={fetchStorage} className="bg-[#962a27] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-red-900/20 active:scale-95 transition-all cursor-pointer">
          Retry Pipeline Connection
        </button>
      </div>
    );
  }

  const totalMB = Number(storage?.totalMB || 512); 
  const usedMB = Number(storage?.usedMB || 0);
  const remainingMB = Number(storage?.remainingMB || (totalMB - usedMB));
  const estimatedMoreEntries = calculateEstimatedRemainingUsers(remainingMB);

  const usagePercent = storage?.usagePercent 
    ? Number(storage.usagePercent).toFixed(2) 
    : ((usedMB / totalMB) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] p-4 sm:p-6 md:p-10 text-slate-800 antialiased relative">
      
      {/* GLOW DECORATIONS */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* TOP COMMAND BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 text-left">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-[#962a27] uppercase tracking-widest bg-red-50 border border-red-200/60 px-3 py-1 rounded-full w-max mb-2">
              <Database size={12} className="animate-pulse" /> Live Telemetry Matrix
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Storage Control Center
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => {
                setRefreshing(true);
                fetchStorage();
              }}
              disabled={refreshing}
              className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-700 shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-60"
            >
              <RefreshCw size={14} className={refreshing ? "animate-spin text-[#962a27]" : ""} />
              Sync Diagnostics
            </button>

          
          </div>
        </div>

        {storage && (
          <div className="space-y-6">
            
            {/* NEW HIGH-TECH GLASS CONSUMPTION CONTAINER */}
            <div className="bg-white/80 border border-white backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden text-left transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#962a27]/5 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-tr from-[#962a27] to-[#cc3b37] rounded-2xl flex items-center justify-center text-white shadow-md shadow-red-950/20">
                    <HardDrive size={22} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900 tracking-tight">Data Capacity Index</h3>
                    <p className="text-xs text-slate-400 font-medium">BSON byte allocations inside Atlas tier</p>
                  </div>
                </div>
                <div className="bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800 shadow-sm self-start sm:self-auto">
                  <span className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400 font-mono tracking-tighter">
                    {usagePercent}%
                  </span>
                </div>
              </div>

              {/* BAR INTERACTION AREA */}
              <div className="w-full bg-slate-100 h-3.5 rounded-full p-0.5 border border-slate-200/60 overflow-hidden shadow-inner">
                <div
                  style={{ width: `${usagePercent}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-[#962a27] via-amber-500 to-emerald-500 shadow-xs transition-all duration-1000 ease-out relative"
                >
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1.2s_linear_infinite]" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-slate-100 text-left font-mono">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Used Capacity</span>
                  <span className="text-sm font-black text-slate-800">{usedMB.toFixed(2)} MB</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Available Volume</span>
                  <span className="text-sm font-black text-emerald-600">{remainingMB.toFixed(2)} MB <span className="text-slate-300 font-normal">/ {totalMB.toFixed(0)} MB</span></span>
                </div>
              </div>
            </div>

            {/* PREDICTIVE NEO-INDICATOR BOX */}
            <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden text-left group">
              <div className="absolute right-0 bottom-0 transform translate-x-10 translate-y-10 text-slate-800/10 pointer-events-none group-hover:scale-105 transition-transform duration-500">
                <Activity size={200} />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded">
                    Runway Potential
                  </span>
                  <p className="text-slate-300 font-medium text-xs sm:text-sm max-w-xl leading-relaxed">
                    Estimated amount of incoming pixel-perfect catering bill invoices or payload registry rows that can be securely handled before triggering full cluster compression routines.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 backdrop-blur-md px-6 py-4 rounded-2xl flex flex-col items-center justify-center min-w-[160px] shadow-inner">
                  <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-emerald-400">
                    +{estimatedMoreEntries.toLocaleString()}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Free Units</span>
                </div>
              </div>
            </div>

            {/* DUAL STAT NODES CARD GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              
              <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-xs flex items-center gap-4 group hover:border-[#962a27]/30 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <LayoutGrid size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Collection Maps</span>
                  <h4 className="text-base sm:text-lg font-black text-slate-800 mt-0.5">{storage.collections || 0} Data Clusters</h4>
                </div>
              </div>

              <div className="bg-white border border-slate-200/60 p-5 rounded-2xl shadow-xs flex items-center gap-4 group hover:border-[#962a27]/30 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-50 border border-purple-100 text-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Files size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Row Registries</span>
                  <h4 className="text-base sm:text-lg font-black text-slate-800 mt-0.5">{Number(storage.objects || 0).toLocaleString()} Active BSON Docs</h4>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* FOOTER ACTIONS ROW */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/60 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-[#962a27] hover:bg-[#7a1e1b] text-white px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md shadow-red-900/10 transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            Exit Terminal Deck
          </button>
          <div className="text-[11px] font-mono font-bold text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Cluster Status: Live</span>
          </div>
        </div>

      </div>

  

      {/* Progress Sync Global Inject CSS */}
      <style>{`
        @keyframes progress {
          0% { background-position: 0 0; }
          100% { background-position: 1rem 0; }
        }
      `}</style>
    </div>
  );
};

export default StorageManagement;


