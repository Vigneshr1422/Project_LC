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
      const response = await axios.get("https://project-lc.onrender.com/api/testimonials/all");
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

      const response = await axios.post("https://project-lc.onrender.com/api/testimonials/save", payload);

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
    <section className="relative bg-[#fffcfb] py-14 sm:py-20 overflow-hidden w-full text-[#2b1b17] border-t-2 border-[#962a27]/20">
      
      {/* Background Soft Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#962a27]/5 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 relative">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={16} className="text-amber-600 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#962a27] uppercase bg-rose-50 px-4 py-1 rounded-full border border-[#962a27]/20 shadow-2xs">
              Client Feedback
            </span>
            <Sparkles size={16} className="text-amber-600 animate-pulse" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#2b1b17] tracking-tight">
            What Our{" "}
            <span className="text-[#962a27] underline decoration-amber-500/60 underline-offset-8">
              Guests Say
            </span>
          </h2>
          <p className="text-gray-600 text-xs sm:text-base max-w-xl mx-auto mt-3 font-semibold leading-relaxed">
            Real experiences from families and hosts who celebrated their special milestones with Lakshmi Catering.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="mt-6 inline-flex items-center gap-2 bg-[#962a27] hover:bg-[#7a2220] text-white text-xs font-black uppercase px-6 py-3.5 rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#b23835]/40"
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
                className="w-[280px] sm:w-[360px] flex-shrink-0 inline-flex flex-col justify-between p-5 sm:p-6 bg-white border-2 border-[#962a27]/20 rounded-[28px] shadow-sm whitespace-normal transition-all duration-300 hover:shadow-xl hover:border-[#962a27] text-left relative overflow-hidden"
              >
                {/* Accent Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#962a27] via-amber-500 to-[#962a27]" />

                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(client.rating || 5)].map((_, i) => (
                        <Star key={i} size={14} fill="#FFD54A" stroke="#FFD54A" />
                      ))}
                    </div>
                    <Quote size={24} className="text-[#962a27]/20 transform rotate-180" />
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-semibold italic mb-4 sm:mb-6 min-h-[60px] sm:min-h-[70px]">
                    "{client.comment}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 sm:pt-4 border-t border-rose-100 mt-auto">
                  <div className="w-10 h-10 bg-rose-50 text-[#962a27] flex items-center justify-center font-black text-xs rounded-xl uppercase shrink-0 border border-[#962a27]/20 shadow-2xs">
                    {client.name ? client.name.slice(0, 2) : "LC"}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-[#2b1b17]">
                      {client.name}
                    </h4>
                    <p className="text-[#962a27] text-[10px] sm:text-[11px] font-extrabold mt-0.5">
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
                className="relative flex flex-col justify-between p-5 sm:p-6 bg-white border-2 border-[#962a27]/20 rounded-[28px] shadow-sm text-left hover:shadow-md hover:border-[#962a27] transition-all overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#962a27] via-amber-500 to-[#962a27]" />
                
                <div className="absolute top-5 right-5 text-[#962a27]/20">
                  <Quote size={28} className="transform rotate-180" />
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(client.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="#FFD54A" stroke="#FFD54A" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-semibold italic mb-5 sm:mb-6">
                    "{client.comment}"
                  </p>
                </div>
                <div className="flex items-center gap-3 pt-3 sm:pt-4 border-t border-rose-100 mt-auto">
                  <div className="w-10 h-10 bg-rose-50 text-[#962a27] flex items-center justify-center font-black text-xs rounded-xl uppercase shrink-0 border border-[#962a27]/20 shadow-2xs">
                    {client.name ? client.name.slice(0, 2) : "LC"}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-[#2b1b17]">
                      {client.name}
                    </h4>
                    <p className="text-[#962a27] text-[10px] sm:text-[11px] font-extrabold mt-0.5">
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
              className="relative w-full max-w-md bg-white rounded-[28px] border-2 border-[#962a27]/20 p-6 sm:p-8 shadow-2xl text-left z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 bg-rose-50 hover:bg-rose-100 transition-all cursor-pointer border border-[#962a27]/20"
              >
                <X size={16} />
              </button>
              <h3 className="text-xl sm:text-2xl font-black text-[#2b1b17] mb-1 text-center mt-1">
                Share Your Experience
              </h3>
              <p className="text-center text-xs text-gray-500 font-medium mb-6">
                Your feedback will directly appear on our website after review!
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-3 border-2 border-[#962a27]/20 rounded-xl focus:outline-none focus:border-[#962a27] bg-rose-50/20 text-xs sm:text-sm font-semibold text-gray-800 transition-all"
                    placeholder="e.g., Ramesh Kumar"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 block mb-1">
                    Event Type
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-3 border-2 border-[#962a27]/20 rounded-xl focus:outline-none focus:border-[#962a27] bg-rose-50/20 text-xs sm:text-sm font-semibold text-gray-800 transition-all cursor-pointer"
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
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 block mb-1">
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
                  <label className="text-[10px] font-black uppercase tracking-wider text-gray-600 block mb-1">
                    Your Feedback
                  </label>
                  <textarea
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3.5 py-3 border-2 border-[#962a27]/20 rounded-xl focus:outline-none focus:border-[#962a27] bg-rose-50/20 text-xs sm:text-sm font-semibold text-gray-800 resize-none transition-all"
                    placeholder="Tell us about the food taste, service and experience..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full mt-2 bg-[#962a27] hover:bg-[#7a2220] text-white text-xs font-black uppercase tracking-wide py-3.5 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 border border-[#b23835]/40"
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
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110] w-[90%] sm:w-auto sm:min-w-[320px] max-w-md bg-[#2b1b17] text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center justify-between gap-4 border border-[#962a27]/40 animate-slide-up">
          <p className="font-sans text-xs font-bold tracking-wide">{toast.message}</p>
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