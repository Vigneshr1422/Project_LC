import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Star, CheckCircle, Loader2, Utensils, Send, User, Phone, Sparkles, Award } from "lucide-react";

const CustomerReviewPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [items, setItems] = useState([]);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerPhone, setReviewerPhone] = useState("");
  const [itemRatings, setItemRatings] = useState({});
  const [overallComment, setOverallComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (orderId) {
      fetch(`http://localhost:5000/api/booking1/${orderId}`)
        .then((res) => {
          if (!res.ok) throw new Error("Order not found");
          return res.json();
        })
        .then((data) => {
          const bookingData = data.booking || data;
          const orderItems = bookingData.packageItems || bookingData.items || [];
          setItems(orderItems);

          // Default each item rating to 5 stars
          const defaultRatings = {};
          orderItems.forEach((item) => {
            defaultRatings[item] = 5;
          });
          setItemRatings(defaultRatings);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching order details:", err);
          setLoading(false);
        });
    }
  }, [orderId]);

  // Dynamic Live Calculation of Overall Rating
  const calculatedStats = useMemo(() => {
    const ratingValues = Object.values(itemRatings);
    if (ratingValues.length === 0) return { avg: "5.0", badge: "Excellent 👌", percent: 100 };

    const sum = ratingValues.reduce((acc, curr) => acc + curr, 0);
    const avgScore = (sum / ratingValues.length).toFixed(1);
    const percent = Math.round((avgScore / 5) * 100);

    let badge = "Excellent 👌";
    if (avgScore >= 4.5) badge = "Outstanding 🔥";
    else if (avgScore >= 3.5) badge = "Very Good 👍";
    else if (avgScore >= 2.5) badge = "Average 🙂";
    else badge = "Needs Improvement ⚠️";

    return { avg: avgScore, badge, percent };
  }, [itemRatings]);

  const handleItemRatingChange = (item, ratingValue) => {
    setItemRatings((prev) => ({ ...prev, [item]: ratingValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewerName.trim()) {
      alert("Please enter your name!");
      return;
    }

    setSubmitLoading(true);

    const itemReviews = items.map((item) => ({
      itemName: item,
      rating: itemRatings[item] || 5,
    }));

    try {
      const res = await fetch("http://localhost:5000/api/reviews/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          customerName: reviewerName.trim(),
          phone: reviewerPhone.trim(),
          itemReviews,
          overallComment: overallComment.trim(),
          calculatedRating: calculatedStats.avg, // Extra metric for backend if needed
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.message || "Failed to submit review.");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Something went wrong while submitting your review.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl text-center max-w-md w-full space-y-4 border border-gray-100 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-500 border border-emerald-100">
            <CheckCircle size={36} className="animate-bounce" />
          </div>
          <h2 className="text-2xl font-black text-gray-900">Thank You, {reviewerName}!</h2>
          <p className="text-gray-600 font-medium text-sm leading-relaxed">
            Your overall score of <span className="text-[#962A27] font-bold">{calculatedStats.avg} ★</span> for{" "}
            <span className="text-[#962A27] font-bold">Lakshmi Catering</span> has been recorded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 sm:py-12 px-4 font-sans flex items-center justify-center">
      <div className="max-w-xl w-full space-y-6 text-left">
        {/* Header Section */}
        <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-100 text-xs font-black text-[#962A27]">
            <Sparkles size={14} className="text-[#962A27]" /> Lakshmi Catering Service
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Food & Service Review</h1>
          <p className="text-xs font-bold font-mono text-gray-400 uppercase tracking-wider">
            Order #{orderId ? orderId.substring(Math.max(0, orderId.length - 6)).toUpperCase() : ""}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={36} className="animate-spin text-[#962A27]" />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-gray-100 shadow-md space-y-6">
            
           

            {/* 1. GUEST DETAILS */}
            <div className="space-y-4 pb-4 border-b border-gray-100">
              <span className="text-xs font-black uppercase tracking-wider text-[#962A27] block">
                1. Your Details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-gray-500 block mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={reviewerName}
                      onChange={(e) => setReviewerName(e.target.value)}
                      className="w-full text-xs sm:text-sm pl-10 pr-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#962A27] focus:bg-white font-bold text-gray-800 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-wider text-gray-500 block mb-1">
                    Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Enter mobile number"
                      value={reviewerPhone}
                      onChange={(e) => setReviewerPhone(e.target.value)}
                      className="w-full text-xs sm:text-sm pl-10 pr-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#962A27] focus:bg-white font-bold text-gray-800 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. ITEM RATINGS */}
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-[#962A27] block">
                2. Rate Menu Items ({items.length})
              </span>

              {items.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No specific items found for this order.</p>
              ) : (
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-gray-50 p-3.5 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all"
                    >
                      <span className="font-extrabold text-gray-800 text-xs sm:text-sm capitalize flex items-center gap-2">
                        <Utensils size={14} className="text-[#962A27]" /> {item}
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleItemRatingChange(item, star)}
                            className="p-0.5 focus:outline-none cursor-pointer active:scale-90 transition-transform"
                          >
                            <Star
                              size={20}
                              className={
                                star <= (itemRatings[item] || 5)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-300"
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 3. FEEDBACK */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <label className="text-xs font-black uppercase tracking-wider text-[#962A27] block">
                3. Feedback / Comments
              </label>
              <textarea
                placeholder="Share your feedback about food taste, service quality, or arrangements..."
                value={overallComment}
                onChange={(e) => setOverallComment(e.target.value)}
                className="w-full text-xs sm:text-sm p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#962A27] focus:bg-white transition-all font-medium leading-relaxed"
                rows={3}
              />
            </div>

             {/* 📊 LIVE CALCULATED RATING WIDGET */}
            <div className="bg-gradient-to-br from-rose-50 via-amber-50/40 to-orange-50 p-5 rounded-3xl border border-rose-100/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award size={20} className="text-[#962A27]" />
                  <span className="text-xs font-black uppercase text-gray-700 tracking-wider">
                    Calculated Live Rating
                  </span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white text-[#962A27] border border-rose-100 shadow-sm">
                  {calculatedStats.badge}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-gray-900">{calculatedStats.avg}</span>
                <span className="text-sm font-bold text-gray-400">/ 5.0</span>
                <div className="ml-auto flex items-center gap-1 text-amber-500">
                  <Star size={22} className="fill-amber-400 text-amber-400" />
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200/70 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-amber-400 to-[#962A27] h-full transition-all duration-300"
                  style={{ width: `${calculatedStats.percent}%` }}
                ></div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={submitLoading}
              className="w-full bg-gradient-to-r from-[#962A27] to-[#7a201e] hover:from-[#822421] hover:to-[#681b1a] text-white py-4 px-6 rounded-2xl font-black text-xs sm:text-sm shadow-xl shadow-[#962A27]/25 cursor-pointer active:scale-98 disabled:opacity-50 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              {submitLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-white" />
                  <span>Submitting Review...</span>
                </>
              ) : (
                <>
                  <Send size={16} />
                  <span>Submit {calculatedStats.avg} ★ Review</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CustomerReviewPage;