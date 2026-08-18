import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  Star,
  Trash2,
  Loader2,
  MessageSquareQuote,
  Quote,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminTestimonials = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // 🍞 Toast Notification State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  // 🎯 Delete Confirmation Modal State
  const [deleteModal, setDeleteModal] = useState({ show: false, targetId: null, targetName: "" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 3500);
  };

  // Fetch Live Testimonials from Database
  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://project-lc.onrender.com/api/testimonials/all");
      setTestimonials(res.data || []);
    } catch (err) {
      console.error("Error fetching testimonials:", err);
      showToast("Error connecting to server. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Open Delete Confirmation Modal
  const confirmDelete = (id, name) => {
    setDeleteModal({ show: true, targetId: id, targetName: name });
  };

  // Execute Delete Action
  const handleDelete = async () => {
    const id = deleteModal.targetId;
    if (!id) return;

    setDeletingId(id);
    setDeleteModal({ show: false, targetId: null, targetName: "" });

    try {
      const res = await axios.delete(`https://project-lc.onrender.com/api/testimonials/delete/${id}`);
      if (res.status === 200) {
        setTestimonials((prev) => prev.filter((item) => item._id !== id));
        showToast("Testimonial removed successfully!");
      }
    } catch (err) {
      console.error("Error deleting testimonial:", err);
      showToast("Failed to delete testimonial.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffcfb] p-4 sm:p-8 lg:p-12 font-sans text-left relative overflow-x-hidden">
      
      {/* Background Soft Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[250px] bg-[#962A27]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-5 sm:p-7 rounded-[28px] border-2 border-[#962A27]/20 shadow-sm gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 sm:p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-[#962A27] transition-all border border-[#962A27]/30 cursor-pointer shrink-0 shadow-2xs hover:scale-105"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#962A27]/10 text-[#962A27] font-black text-[10px] uppercase tracking-wider mb-1.5 border border-[#962A27]/20">
                <Sparkles size={12} className="text-amber-600" /> Admin Control
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-[#2b1b17] tracking-tight flex items-center gap-2.5">
                <MessageSquareQuote size={28} className="text-[#962A27] shrink-0" />
                Website <span className="text-[#962A27]">Testimonials</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1 leading-relaxed">
                Manage Home Page customer reviews. Remove negative or spam reviews securely.
              </p>
            </div>
          </div>

          <div className="bg-rose-50/70 border-2 border-[#962A27]/20 px-4 py-2 rounded-2xl flex items-center gap-2.5 self-start sm:self-auto shrink-0 shadow-2xs">
            <CheckCircle2 size={18} className="text-[#962A27]" />
            <span className="text-xs font-black text-[#962A27]">
              Total Reviews: {testimonials.length}
            </span>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center py-20 bg-white rounded-[28px] border-2 border-[#962A27]/20 shadow-sm">
            <Loader2 size={36} className="animate-spin text-[#962A27]" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[28px] border-2 border-[#962A27]/20 shadow-sm">
            <MessageSquareQuote size={48} className="mx-auto text-gray-300 mb-3 animate-pulse" />
            <p className="text-gray-600 font-bold text-base">No live testimonials found in Database.</p>
            <p className="text-gray-400 text-xs mt-1">New user submissions will appear here automatically.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((item) => (
              <div
                key={item._id}
                style={{ border: "2px solid rgba(150, 42, 39, 0.22)" }}
                className="bg-white p-5 sm:p-6 rounded-[28px] shadow-sm flex flex-col justify-between space-y-4 hover:shadow-xl hover:border-[#962A27] transition-all relative overflow-hidden group"
              >
                {/* Accent Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#962A27] via-amber-500 to-[#962A27]" />

                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote size={20} className="text-[#962A27]/20 transform rotate-180" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-semibold italic leading-relaxed min-h-[50px]">
                    "{item.comment}"
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-rose-100 pt-3.5 gap-2 mt-auto">
                  <div className="min-w-0">
                    <h4 className="font-black text-[#2b1b17] text-xs sm:text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-[#962A27] text-[11px] font-extrabold truncate mt-0.5">{item.role}</p>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5 font-bold">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                    </p>
                  </div>

                  {/* Remove / Delete Trigger Button */}
                  <button
                    onClick={() => confirmDelete(item._id, item.name)}
                    disabled={deletingId === item._id}
                    className="p-2.5 text-rose-600 hover:bg-rose-50 hover:text-rose-700 rounded-xl border border-rose-200 transition-all cursor-pointer flex items-center justify-center shrink-0 disabled:opacity-50 shadow-2xs group-hover:scale-105"
                    title="Remove Testimonial"
                  >
                    {deletingId === item._id ? (
                      <Loader2 size={16} className="animate-spin text-rose-600" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🎯 CUSTOM CONFIRMATION DELETE MODAL */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border-2 border-[#962A27]/30 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto text-rose-600 border border-rose-200 shadow-2xs">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black text-[#2b1b17]">Remove Testimonial?</h3>
              <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
                Are you sure you want to delete feedback from{" "}
                <span className="font-extrabold text-gray-800">{deleteModal.targetName || "Guest"}</span>? It will be permanently removed from Home Page as well.
              </p>
            </div>
            <div className="flex items-center gap-2.5 pt-2">
              <button
                onClick={() => setDeleteModal({ show: false, targetId: null, targetName: "" })}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl text-xs font-black transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl text-xs font-black transition-all shadow-md shadow-rose-200 cursor-pointer border border-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🍞 SLEEK CUSTOM TOAST NOTIFICATION */}
      {toast.show && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto min-w-[300px] max-w-md bg-[#2b1b17] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-[#962A27]/40 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2.5 text-xs font-bold">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                toast.type === "success"
                  ? "bg-emerald-400 shadow-[0_0_8px_#34d399]"
                  : "bg-rose-400 shadow-[0_0_8px_#f87171]"
              }`}
            />
            <p>{toast.message}</p>
          </div>
          <button
            onClick={() => setToast({ show: false, message: "", type: "success" })}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;