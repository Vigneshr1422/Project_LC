import React, { useState, useEffect } from "react";
import { Star, Quote, Sparkles, PlusCircle, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const defaultTestimonials = [
  {
    _id: "1",
    name: "Suresh Kumar",
    role: "Marriage Function",
    rating: 5,
    comment:
      "Lakshmi Catering made our wedding feast unforgettable! All guests praised the traditional elai sapadu and Chettinad specials. Exceptional service!",
  },
  {
    _id: "2",
    name: "Kavitha Rajan",
    role: "Seemantham Ceremony",
    rating: 5,
    comment:
      "The food quality and hygiene were top-notch. Fresh ingredients and authentic homemade taste. Highly recommended for family events!",
  },
  {
    _id: "3",
    name: "Arun Prakash",
    role: "Corporate Event",
    rating: 5,
    comment:
      "Punctual delivery and rich taste! The live counter setup and buffet arrangement for our office gala were super impressive.",
  },
  {
    _id: "4",
    name: "Meenakshi Sundaram",
    role: "60th Birthday Party",
    rating: 5,
    comment:
      "Pure traditional taste with zero compromise on quality. Every dish from breakfast idli-sambar to afternoon feast was delicious.",
  },
];

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [role, setRole] = useState("Marriage Function");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Toast State
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "success" }), 4000);
  };

  const fetchLiveReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/testimonials/all");
      if (response.data && response.data.length > 0) {
        setReviews(response.data);
      } else {
        setReviews(defaultTestimonials);
      }
    } catch (error) {
      console.error("Error connecting to testimonials DB:", error);
      setReviews(defaultTestimonials);
    }
  };

  useEffect(() => {
    fetchLiveReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comment) {
      showToast("Required fields missing: Please fill all details.", "error");
      return;
    }
    setSubmitLoading(true);

    try {
      const payload = {
        name: name.trim(),
        role: role,
        rating: Number(rating),
        comment: comment.trim(),
      };

      // 🎯 Exact Match for your Backend Testimonial Router (/api/testimonials/save)
      const response = await axios.post("http://localhost:5000/api/testimonials/save", payload);

      if (response.status === 201) {
        setReviews((prevReviews) => [response.data, ...prevReviews]);
        showToast("Thank you! Your testimonial has been saved successfully.");
        setName("");
        setComment("");
        setRating(5);
        setRole("Marriage Function");
        setShowForm(false);
      }
    } catch (error) {
      console.error("Review submission failed:", error);
      showToast("An error occurred while saving your review.", "error");
    } finally {
      setSubmitLoading(false);
    }
  };

  const movingArray = [...reviews, ...reviews];

  return (
    <section className="relative bg-[#fffaf7] py-14 sm:py-20 overflow-hidden w-full text-[#2b1b17] border-t border-gray-200/60">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#962a27]/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 relative">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={16} className="text-[#d9a86c] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#962a27] uppercase bg-[#962a27]/10 px-4 py-1 rounded-full border border-[#962a27]/20">
              Client Feedback
            </span>
            <Sparkles size={16} className="text-[#d9a86c] animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2b1b17] tracking-tight">
            What Our{" "}
            <span className="text-[#962a27] underline decoration-[#d9a86c]/60 underline-offset-8">
              Guests Say
            </span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-base max-w-xl mx-auto mt-3 leading-relaxed">
            Real experiences from families and hosts who celebrated their special milestones with Lakshmi Catering.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="mt-6 inline-flex items-center gap-2 bg-[#962a27] hover:bg-[#7a2220] text-white text-xs font-extrabold uppercase px-6 py-3 rounded-xl shadow-lg shadow-[#962a27]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <PlusCircle size={16} /> Write a Review
          </button>
        </div>
      </div>

      {/* MARQUEE CONTAINER */}
      <div className="relative w-full overflow-hidden py-4 flex mask-gradient-overlay">
        {reviews.length > 3 ? (
          <div className="flex gap-4 sm:gap-6 whitespace-nowrap animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] w-max px-4">
            {movingArray.map((client, index) => (
              <div
                key={`${client._id || index}-${index}`}
                className="w-[280px] sm:w-[360px] flex-shrink-0 inline-flex flex-col justify-between p-5 sm:p-6 bg-white border border-gray-200/80 rounded-2xl sm:rounded-3xl shadow-sm whitespace-normal transition-all duration-300 hover:shadow-xl hover:border-[#962a27]/30 text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(client.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} fill="#FFD54A" stroke="#FFD54A" />
                      ))}
                    </div>
                    <Quote size={24} className="text-[#962a27]/20 transform rotate-180" />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium italic mb-4 sm:mb-6 min-h-[60px] sm:min-h-[70px]">
                    "{client.comment}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
                  <div className="w-10 h-10 bg-[#962a27]/10 text-[#962a27] flex items-center justify-center font-bold text-xs rounded-xl uppercase shrink-0 border border-[#962a27]/20">
                    {client.name ? client.name.slice(0, 2) : "LC"}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#2b1b17]">
                      {client.name}
                    </h4>
                    <p className="text-[#962a27] text-[10px] sm:text-[11px] font-bold mt-0.5">
                      {client.role || "Valued Customer"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch w-full">
            {reviews.map((client) => (
              <div
                key={client._id}
                className="relative flex flex-col justify-between p-5 sm:p-6 bg-white border border-gray-200/80 rounded-2xl sm:rounded-3xl shadow-sm text-left hover:shadow-md transition-all"
              >
                <div className="absolute top-5 right-5 text-[#962a27]/20">
                  <Quote size={28} className="transform rotate-180" />
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(client.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="#FFD54A" stroke="#FFD54A" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-medium italic mb-5 sm:mb-6">
                    "{client.comment}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 sm:pt-4 border-t border-gray-100 mt-auto">
                  <div className="w-10 h-10 bg-[#962a27]/10 text-[#962a27] flex items-center justify-center font-bold text-xs rounded-xl uppercase shrink-0 border border-[#962a27]/20">
                    {client.name ? client.name.slice(0, 2) : "LC"}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-extrabold text-[#2b1b17]">
                      {client.name}
                    </h4>
                    <p className="text-[#962a27] text-[10px] sm:text-[11px] font-bold mt-0.5">
                      {client.role || "Valued Customer"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DIALOG */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="absolute inset-0" onClick={() => setShowForm(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 shadow-2xl text-left z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
              <h3 className="text-xl sm:text-2xl font-black text-[#2b1b17] mb-1 text-center mt-1">
                Share Your Experience
              </h3>
              <p className="text-center text-xs text-gray-500 mb-6">
                Your feedback will directly appear on our website after review!
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#962a27] bg-[#fffaf7] text-xs sm:text-sm font-medium"
                    placeholder="e.g., Ramesh Kumar"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 block mb-1">
                    Event Type
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#962a27] bg-[#fffaf7] text-xs sm:text-sm font-medium"
                  >
                    <option value="Marriage Function">Marriage Function</option>
                    <option value="Reception / Engagement">Reception / Engagement</option>
                    <option value="Seemantham Ceremony">Seemantham Ceremony</option>
                    <option value="Birthday Party">Birthday Party</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Family Gathering">Family Gathering</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 block mb-1">
                    Rating
                  </label>
                  <div className="flex gap-1.5 py-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={22}
                        fill={rating >= star ? "#FFD54A" : "none"}
                        stroke={rating >= star ? "#FFD54A" : "#ccc"}
                        className="cursor-pointer active:scale-90 transition-transform"
                        onClick={() => setRating(star)}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-500 block mb-1">
                    Your Feedback
                  </label>
                  <textarea
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#962a27] bg-[#fffaf7] text-xs sm:text-sm font-medium resize-none"
                    placeholder="Tell us about the food taste, service and experience..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full mt-2 bg-[#962a27] hover:bg-[#7a2220] text-white text-xs font-bold uppercase py-3.5 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitLoading && <Loader2 size={16} className="animate-spin" />}
                  {submitLoading ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST NOTIFICATION */}
      {toast.show && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] w-[90%] sm:w-auto sm:min-w-[320px] max-w-md bg-[#2b1b17] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-gray-800 animate-slide-up">
          <p className="font-sans text-xs font-medium tracking-wide">{toast.message}</p>
          <span
            className={`w-2 h-2 rounded-full shrink-0 ${
              toast.type === "success" ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-rose-400 shadow-[0_0_8px_#f87171]"
            }`}
          />
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mask-gradient-overlay {
          mask-image: linear-gradient(to right, transparent, white 8%, white 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, white 8%, white 92%, transparent);
        }
        @media (max-width: 640px) {
          .mask-gradient-overlay {
            mask-image: linear-gradient(to right, transparent, white 4%, white 96%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, white 4%, white 96%, transparent);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;