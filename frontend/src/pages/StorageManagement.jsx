import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader"; 
import { 
  Database, 
  HardDrive, 
  LayoutGrid, 
  Files, 
  Users, 
  ArrowLeft, 
  RefreshCw, 
  ShieldAlert, 
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

  // 🔥 புதிய ஸ்டேட்கள் (Delete Automation & Security)
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

  // 🔥 அனைத்து டாக்குமெண்டுகளையும் டெலீட் செய்யும் API Routine
  const handleDeleteAllDocuments = async () => {
    if (confirmText !== "DELETE") return;
    
    try {
      setDeleting(true);
      // உங்களுடைய பேக்-எண்ட் டெலீட் ரூட்டிங் எண்ட் பாயிண்ட்
      const res = await axios.delete("http://localhost:5000/api/booking1/delete-all");
      
      if (res.data.success) {
        alert("🎯 Mass da! All booking documents cleared out successfully!");
        setIsModalOpen(false);
        setConfirmText("");
        fetchStorage(); // ஸ்டோரேஜ் அளவை புதுப்பிக்க
      }
    } catch (err) {
      console.error("Error clearing database assets:", err);
      alert("⚠️ Failed to purge database. Check API logs.");
    } finally {
      setDeleting(false);
    }
  };

  const calculateEstimatedRemainingUsers = () => {
    if (!storage || !storage.remainingMB) return 0;
    const avgInvoiceDocSizeMB = 0.2; 
    return Math.floor(storage.remainingMB / avgInvoiceDocSizeMB);
  };

  if (loading && !storage) {
    return <Loader />;
  }

  if (error && !storage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] p-6 text-center">
        <ShieldAlert size={48} className="text-[#962a27] mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Server Connection Timeout</h2>
        <p className="text-gray-500 max-w-sm mb-6">The live server is taking longer than usual to wake up. Please try again.</p>
        <button onClick={fetchStorage} className="bg-[#962a27] text-white px-6 py-2.5 rounded-xl font-bold shadow">
          Retry Connection
        </button>
      </div>
    );
  }

  const estimatedMoreEntries = calculateEstimatedRemainingUsers();
  const totalMB = Number(storage?.totalMB || 512); 
  const usedMB = Number(storage?.usedMB || 0);
  const remainingMB = Number(storage?.remainingMB || 512);
  
  const usagePercent = storage?.usagePercent 
    ? Number(storage.usagePercent).toFixed(2) 
    : ((usedMB / totalMB) * 100).toFixed(2);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 sm:p-6 md:p-10 text-gray-800 antialiased relative">
      
      {/* HEADER BLOCK */}
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-10 text-left">
        <div>
          <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#962a27] uppercase tracking-wider mb-1">
            <Database size={14} className="animate-pulse shrink-0" /> Live Server Diagnostics
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            Database Storage Overview
          </h1>
        </div>

        <button
          onClick={() => {
            setRefreshing(true);
            fetchStorage();
          }}
          disabled={refreshing}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-gray-50 active:scale-95 transition-all text-gray-700 disabled:opacity-60"
        >
          <RefreshCw size={16} className={refreshing ? "animate-spin text-[#962a27]" : ""} />
          {refreshing ? "Refreshing..." : "Refresh Stats"}
        </button>
      </div>

      {storage && (
        <div className="max-w-5xl mx-auto space-y-6">
          {/* CONSUMPTION CARD */}
          <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl relative overflow-hidden transition-all hover:shadow-2xl text-left">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#962a27]/5 rounded-bl-full pointer-events-none" />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#962a27]/10 rounded-xl sm:rounded-2xl text-[#962a27] shrink-0">
                  <HardDrive size={22} />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg text-gray-900">Storage Consumption</h3>
                  <p className="text-xs text-gray-500 font-medium">Real-time memory distribution space</p>
                </div>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-gray-900 font-mono self-start sm:self-auto">
                {usagePercent}%
              </span>
            </div>

            <div className="w-full bg-gray-100 h-5 rounded-full p-1 overflow-hidden backdrop-blur-sm border border-gray-200/50">
              <div
                style={{ width: `${usagePercent}%` }}
                className="h-full rounded-full bg-gradient-to-r from-[#962a27] via-[#b83834] to-[#e04a45] shadow-inner transition-all duration-1000 ease-out relative"
              >
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between text-[10px] sm:text-xs font-bold font-mono text-gray-500 mt-3 px-1 gap-1">
              <span>{usedMB.toFixed(2)} MB USED</span>
              <span className="uppercase">{remainingMB.toFixed(2)} MB FREE ({totalMB.toFixed(0)} MB TOTAL)</span>
            </div>
          </div>

          {/* INDICATOR CARD */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white border border-emerald-800 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg relative overflow-hidden transition-transform hover:scale-[1.01] text-left">
            <div className="absolute -right-6 -bottom-6 text-emerald-800/20 opacity-30 pointer-events-none hidden sm:block">
              <Users size={180} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] sm:text-[11px] font-black tracking-wider uppercase px-2 py-0.5 rounded">
                Growth Potential Indicator
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mt-3 mb-2 font-mono">
                +{estimatedMoreEntries.toLocaleString()}
              </h2>
              <p className="text-emerald-200/90 font-semibold text-xs sm:text-sm max-w-xl leading-relaxed break-words">
                Additional pixel-perfect invoice bills and booking payload assets can be securely saved to MongoDB Atlas free tier cloud storage matrix.
              </p>
            </div>
          </div>

          {/* COUNTERS GRID WITH DELETE BUTTON INTEGRATED */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 text-left">
            <div className="bg-white border border-gray-100 p-5 rounded-xl sm:rounded-2xl shadow-sm flex items-center gap-4 group hover:border-[#962a27]/30 transition-all">
              <div className="p-3 sm:p-4 bg-blue-50 text-blue-600 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                <LayoutGrid size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">Total Tables</p>
                <h4 className="text-base sm:text-lg md:text-xl font-black text-gray-800 mt-0.5 truncate">{storage.collections || 0} Collections</h4>
              </div>
            </div>

            <div className="bg-white border border-gray-100 p-5 rounded-xl sm:rounded-2xl shadow-sm flex items-center gap-4 group hover:border-[#962a27]/30 transition-all">
              <div className="p-3 sm:p-4 bg-purple-50 text-purple-600 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                <Files size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">Stored Entries</p>
                <h4 className="text-base sm:text-lg md:text-xl font-black text-gray-800 mt-0.5 truncate">{Number(storage.objects || 0).toLocaleString()} Documents</h4>
              </div>
            </div>

            {/* 🔥 இதுதான் புதிய "Delete All Documents" மாடர்ன் பட்டன் கார்டு */}
            <div 
              onClick={() => setIsModalOpen(true)}
              className="bg-red-50 border border-red-100 p-5 rounded-xl sm:rounded-2xl shadow-sm flex items-center gap-4 group hover:border-red-500 hover:bg-red-100/50 cursor-pointer transition-all sm:col-span-2 lg:col-span-1"
            >
              <div className="p-3 sm:p-4 bg-red-600 text-white rounded-xl shrink-0 group-hover:scale-110 transition-transform shadow-md shadow-red-600/20">
                <Trash2 size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-black text-red-500 uppercase tracking-wider truncate">Danger Zone Actions</p>
                <h4 className="text-base sm:text-lg md:text-xl font-black text-red-700 mt-0.5 truncate group-hover:text-red-900">Delete All Bookings</h4>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER BUTTON BLOCK */}
      <div className="max-w-5xl mx-auto mt-8 md:mt-10">
        <button
          onClick={() => navigate(-1)}
          className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-gradient-to-r from-[#962a27] to-[#7a1e1b] text-white px-8 py-3.5 rounded-xl font-bold shadow-md hover:shadow-xl transition-all"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back To Dashboard
        </button>
      </div>

      {/* 🔥 SECURITY PURGE MODAL POPUP (பாதுகாப்பு பாப்-அப் கார்டு) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur Overlay */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => !deleting && setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="bg-white w-full max-w-md rounded-3xl p-6 border border-gray-100 shadow-2xl relative z-10 text-center animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle size={20} />
                <span className="text-xs font-black uppercase tracking-wider">Critical Action</span>
              </div>
              <button 
                disabled={deleting}
                onClick={() => setIsModalOpen(false)} 
                className="p-1.5 bg-gray-50 hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-xl transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <h3 className="text-xl font-black text-gray-900 tracking-tight">Are you absolutely sure?</h3>
            <p className="text-xs text-gray-500 font-semibold mt-1.5 leading-relaxed">
              This routine triggers a complete database purge. All validated booking details, ledger financials, and history logs inside Atlas cluster will be deleted forever.
            </p>

            {/* Validation input box */}
            <div className="my-5 p-4 bg-gray-50 border border-gray-200/60 rounded-2xl text-left">
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                Type <span className="text-red-600 font-mono">DELETE</span> to confirm activation
              </label>
              <input 
                type="text" 
                placeholder="DELETE"
                disabled={deleting}
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full bg-white h-12 border-2 border-gray-200 rounded-xl px-4 outline-none font-mono font-black text-sm uppercase tracking-widest text-red-600 focus:border-red-500 transition-colors"
              />
            </div>

            {/* Action Triggers */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                type="button"
                disabled={deleting}
                onClick={() => {
                  setIsModalOpen(false);
                  setConfirmText("");
                }}
                className="w-full bg-gray-100 text-gray-600 font-bold py-3.5 rounded-xl text-sm hover:bg-gray-200 active:scale-[0.98] transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={confirmText !== "DELETE" || deleting}
                onClick={handleDeleteAllDocuments}
                className="w-full bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 text-white font-black py-3.5 rounded-xl text-sm shadow-md shadow-red-600/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {deleting ? "Purging Cluster..." : "Yes, Purge All"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progress Style Grid */}
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