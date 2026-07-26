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
      const res = await axios.get("http://localhost:5000/api/testimonials/all");
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
      const res = await axios.delete(`http://localhost:5000/api/testimonials/delete/${id}`);
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
    <div className="min-h-screen bg-[#F8FAFC] p-3 sm:p-6 lg:p-8 font-sans text-left relative">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm gap-3 sm:gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 sm:p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 transition-all border border-gray-200 cursor-pointer shrink-0"
            >
              <ChevronLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
                <MessageSquareQuote size={22} className="text-[#962A27] shrink-0" />
                Website Testimonials
              </h1>
              <p className="text-[11px] sm:text-sm text-gray-500 font-medium leading-tight sm:leading-normal mt-0.5">
                Manage Home Page customer reviews. Remove negative or spam reviews here.
              </p>
            </div>
          </div>

          <div className="bg-rose-50 border border-rose-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl flex items-center gap-2 self-start sm:self-auto shrink-0">
            <CheckCircle2 size={16} className="text-[#962A27]" />
            <span className="text-xs font-black text-[#962A27]">
              Total Reviews: {testimonials.length}
            </span>
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center py-16 sm:py-20">
            <Loader2 size={32} className="animate-spin text-[#962A27]" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-white rounded-2xl sm:rounded-3xl border border-gray-100">
            <p className="text-gray-500 font-bold text-xs sm:text-sm">
              No live testimonials found in Database.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
            {testimonials.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between space-y-3 sm:space-y-4 hover:shadow-md transition-all relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3">
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote size={18} className="text-gray-300" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium italic leading-relaxed">
                    "{item.comment}"
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-3 gap-2">
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm truncate">
                      {item.name}
                    </h4>
                    <p className="text-[#962A27] text-[11px] font-bold truncate">{item.role}</p>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                    </p>
                  </div>

                  {/* Remove / Delete Trigger Button */}
                  <button
                    onClick={() => confirmDelete(item._id, item.name)}
                    disabled={deletingId === item._id}
                    className="p-2 sm:p-2.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 rounded-xl sm:rounded-2xl border border-rose-100 transition-all cursor-pointer flex items-center justify-center shrink-0 disabled:opacity-50"
                    title="Remove Testimonial"
                  >
                    {deletingId === item._id ? (
                      <Loader2 size={16} className="animate-spin text-rose-500" />
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
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto text-rose-600 border border-rose-100">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900">Remove Testimonial?</h3>
              <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
                Are you sure you want to delete feedback from{" "}
                <span className="font-bold text-gray-800">{deleteModal.targetName || "Guest"}</span>? It will be permanently removed from Home Page as well.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setDeleteModal({ show: false, targetId: null, targetName: "" })}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-200 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🍞 SLEEK CUSTOM TOAST NOTIFICATION */}
      {toast.show && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-auto min-w-[300px] max-w-md bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 border border-slate-800 animate-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2.5 text-xs font-medium">
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
            className="text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;