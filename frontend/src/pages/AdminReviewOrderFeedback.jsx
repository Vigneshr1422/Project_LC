import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  Star,
  Loader2,
  MessageSquare,
  User,
  Calendar,
  Award,
  BarChart3,
  TrendingUp,
  Utensils,
  Phone,
  Filter,
  Sparkles,
  Flame,
} from "lucide-react";

const AdminReviewOrderFeedback = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const passedOrder = location.state?.order || null;

  const [reviewsList, setReviewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStar, setFilterStar] = useState("ALL"); // ALL, 5, 3-4, LOW

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/reviews/order/${orderId}`);
        if (!res.ok) {
          setReviewsList([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data.success && data.reviews) {
          setReviewsList(data.reviews);
        } else {
          setReviewsList([]);
        }
      } catch (err) {
        console.error("Error fetching order reviews:", err);
        setReviewsList([]);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchReviews();
    }
  }, [orderId]);

  // 📊 METRICS & MVP CALCULATIONS
  const stats = useMemo(() => {
    if (!reviewsList || reviewsList.length === 0) {
      return {
        overallAvg: "0.0",
        totalReviews: 0,
        satisfactionRate: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        itemAverages: [],
        topDish: null,
        sentimentBadge: "No Feedback Yet",
      };
    }

    let totalItemScoreSum = 0;
    let totalRatingsCount = 0;
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const itemMap = {};

    reviewsList.forEach((rev) => {
      if (rev.itemReviews && rev.itemReviews.length > 0) {
        rev.itemReviews.forEach((item) => {
          const r = Number(item.rating) || 5;
          totalItemScoreSum += r;
          totalRatingsCount += 1;

          const starBucket = Math.min(5, Math.max(1, Math.round(r)));
          dist[starBucket] = (dist[starBucket] || 0) + 1;

          if (!itemMap[item.itemName]) {
            itemMap[item.itemName] = { sum: 0, count: 0 };
          }
          itemMap[item.itemName].sum += r;
          itemMap[item.itemName].count += 1;
        });
      }
    });

    const overallAvg =
      totalRatingsCount > 0 ? (totalItemScoreSum / totalRatingsCount).toFixed(1) : "0.0";

    const satisfactionRate =
      totalRatingsCount > 0
        ? Math.round((totalItemScoreSum / (totalRatingsCount * 5)) * 100)
        : 0;

    const itemAverages = Object.keys(itemMap).map((name) => {
      const avgNum = itemMap[name].sum / itemMap[name].count;
      const avg = avgNum.toFixed(1);
      const percent = Math.round((avgNum / 5) * 100);
      return { name, avg: Number(avg), percent, count: itemMap[name].count };
    });

    const sortedItems = [...itemAverages].sort((a, b) => b.avg - a.avg);
    const topDish = sortedItems.length > 0 ? sortedItems[0] : null;

    let sentimentBadge = "Outstanding Service 🎉";
    if (overallAvg < 3.0) sentimentBadge = "Needs Attention ⚠️";
    else if (overallAvg < 4.2) sentimentBadge = "Great Performance 👍";

    return {
      overallAvg,
      totalReviews: reviewsList.length,
      totalRatingsCount,
      satisfactionRate,
      distribution: dist,
      itemAverages,
      topDish,
      sentimentBadge,
    };
  }, [reviewsList]);

  // Dynamic Filter Logic
  const filteredReviews = useMemo(() => {
    if (filterStar === "ALL") return reviewsList;
    return reviewsList.filter((rev) => {
      const revItemCount = rev.itemReviews ? rev.itemReviews.length : 0;
      const revSum = revItemCount
        ? rev.itemReviews.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0)
        : 5;
      const guestAvg = revItemCount ? revSum / revItemCount : 5;

      if (filterStar === "5") return guestAvg >= 4.8;
      if (filterStar === "3-4") return guestAvg >= 3.0 && guestAvg < 4.8;
      if (filterStar === "LOW") return guestAvg < 3.0;
      return true;
    });
  }, [reviewsList, filterStar]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6 text-left">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm gap-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 sm:p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 transition-all border border-gray-200 cursor-pointer shrink-0"
            >
              <ChevronLeft size={18} />
            </button>
            <div>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-[#962A27]">
                Order ID: #{orderId}
              </span>
              <h1 className="text-xl sm:text-3xl font-black text-gray-900 mt-0.5 flex items-center gap-2">
                <MessageSquare size={22} className="text-[#962A27] shrink-0" /> Order Feedback
              </h1>
            </div>
          </div>
          {stats.sentimentBadge && !loading && reviewsList.length > 0 && (
            <span className="inline-flex self-start sm:self-auto items-center gap-1.5 bg-rose-50 border border-rose-100 text-[#962A27] px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-black">
              <Sparkles size={13} />
              {stats.sentimentBadge}
            </span>
          )}
        </div>

        {/* Order Summary Card with Review Count */}
        {passedOrder && (
          <div className="bg-white p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <User size={16} className="text-[#962A27] shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-gray-900">
                {passedOrder.name || "Customer"}
              </span>
            </div>
            {passedOrder.date && (
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Calendar size={14} className="shrink-0" />
                {passedOrder.date}
              </div>
            )}
            <div>
              {/* Dynamic Review Count Badge */}
              <span className="inline-block text-xs font-bold text-rose-800 bg-rose-50 px-3 py-1 rounded-xl border border-rose-100 uppercase">
                {reviewsList.length} {reviewsList.length === 1 ? "Review" : "Reviews"}
              </span>
            </div>
          </div>
        )}

        {/* 📊 ANALYTICAL HERO DASHBOARD */}
        {!loading && reviewsList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Overall Score Card */}
            <div className="bg-gradient-to-br from-rose-50 via-white to-amber-50/40 p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-rose-100 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-black uppercase text-gray-500 tracking-wider">
                  Overall Rating
                </span>
                <Award size={20} className="text-[#962A27]" />
              </div>

              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-black text-gray-900">{stats.overallAvg}</span>
                  <span className="text-xs sm:text-sm font-bold text-gray-400">/ 5.0</span>
                </div>
                <div className="flex items-center gap-1 mt-2 text-amber-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={
                        star <= Math.round(Number(stats.overallAvg))
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="text-[11px] sm:text-xs font-bold text-gray-500 ml-1">
                    ({stats.totalReviews})
                  </span>
                </div>
              </div>

              {stats.topDish && (
                <div className="bg-white/80 backdrop-blur-sm p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-amber-200/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <Flame size={16} className="text-amber-500 shrink-0" />
                    <div className="truncate">
                      <p className="text-[9px] sm:text-[10px] text-gray-400 font-extrabold uppercase tracking-wider">Top Rated Dish</p>
                      <p className="text-xs font-black text-gray-800 capitalize truncate">{stats.topDish.name}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-amber-600 bg-amber-50 px-2 py-1 rounded-lg sm:rounded-xl border border-amber-100 shrink-0">
                    {stats.topDish.avg} ★
                  </span>
                </div>
              )}
            </div>

            {/* Rating Breakdown Bars */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] sm:text-xs font-black uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
                  <BarChart3 size={15} className="text-[#962A27]" /> Rating Breakdown
                </span>
                <span className="text-[10px] sm:text-[11px] text-emerald-600 font-black">
                  {stats.satisfactionRate}% Liked
                </span>
              </div>

              {[5, 4, 3, 2, 1].map((star) => {
                const count = stats.distribution[star] || 0;
                const percentage =
                  stats.totalRatingsCount > 0
                    ? Math.round((count / stats.totalRatingsCount) * 100)
                    : 0;

                return (
                  <div key={star} className="flex items-center gap-2 sm:gap-3 text-xs font-bold">
                    <span className="w-7 sm:w-8 font-mono text-gray-600 flex items-center gap-0.5 text-[11px] sm:text-xs">
                      {star} <Star size={10} className="fill-amber-400 text-amber-400" />
                    </span>
                    <div className="flex-1 bg-gray-100 h-2 sm:h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-[#962A27] h-full transition-all duration-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="w-7 sm:w-8 text-right text-gray-400 text-[10px] sm:text-[11px]">
                      {percentage}%
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Menu Item Wise Averages */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm space-y-3 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] sm:text-xs font-black uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
                  <TrendingUp size={15} className="text-[#962A27]" /> Item Performance
                </span>
                <span className="text-[10px] sm:text-[11px] text-gray-400 font-bold">Avg Score</span>
              </div>

              <div className="space-y-2.5 sm:space-y-3 max-h-36 sm:max-h-40 overflow-y-auto pr-1">
                {stats.itemAverages.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-gray-800 capitalize flex items-center gap-1 truncate max-w-[130px] sm:max-w-[150px]">
                        <Utensils size={12} className="text-[#962A27] shrink-0" /> {item.name}
                      </span>
                      <span className="text-[#962A27] font-mono text-[11px] sm:text-xs">{item.avg} ★</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 sm:h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          item.avg >= 4.0 ? "bg-emerald-500" : item.avg >= 3.0 ? "bg-amber-400" : "bg-rose-500"
                        }`}
                        style={{ width: `${item.percent}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 🎯 FILTER TABS (Mobile Scrollable) */}
        {!loading && reviewsList.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white p-3 sm:p-3.5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-gray-500 px-1">
              <Filter size={14} className="text-[#962A27]" /> Filter Reviews:
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              {[
                { label: "All", key: "ALL" },
                { label: "5 Stars", key: "5" },
                { label: "3 - 4 Stars", key: "3-4" },
                { label: "< 3 Critical", key: "LOW" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilterStar(tab.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                    filterStar === tab.key
                      ? "bg-[#962A27] text-white shadow-sm"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 💬 INDIVIDUAL GUEST REVIEWS LIST */}
        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 size={32} className="animate-spin text-[#962A27]" />
          </div>
        ) : filteredReviews.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {filteredReviews.map((rev, idx) => {
              const revItemCount = rev.itemReviews ? rev.itemReviews.length : 0;
              const revSum = revItemCount
                ? rev.itemReviews.reduce((acc, curr) => acc + (Number(curr.rating) || 5), 0)
                : 5;
              const guestAvg = revItemCount ? (revSum / revItemCount).toFixed(1) : "5.0";
              const guestPercent = Math.round((guestAvg / 5) * 100);

              return (
                <div
                  key={idx}
                  className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm space-y-3 sm:space-y-4 transition-all hover:shadow-md"
                >
                  {/* Guest Header */}
                  <div className="flex items-start justify-between border-b border-gray-100 pb-3 gap-2">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-rose-50 text-[#962A27] font-extrabold text-xs sm:text-sm flex items-center justify-center uppercase border border-rose-100 shadow-sm shrink-0">
                        {rev.customerName ? rev.customerName.slice(0, 2) : "G"}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-gray-900 text-xs sm:text-sm truncate">
                          {rev.customerName || "Anonymous Guest"}
                        </h4>
                        {rev.phone && (
                          <p className="text-[11px] sm:text-xs text-gray-400 font-medium flex items-center gap-1">
                            <Phone size={10} /> {rev.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg sm:rounded-xl border border-amber-100 text-amber-700 font-black text-[11px] sm:text-xs">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        {guestAvg} / 5.0
                      </div>
                      <p className="text-[9px] sm:text-[10px] text-gray-400 font-mono mt-0.5">
                        {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : ""}
                      </p>
                    </div>
                  </div>

                  {/* Guest Satisfaction Level Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-gray-400">
                      <span>Satisfaction Level</span>
                      <span>{guestPercent}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          guestPercent >= 80 ? "bg-emerald-500" : guestPercent >= 60 ? "bg-amber-400" : "bg-rose-500"
                        }`}
                        style={{ width: `${guestPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Item Ratings Grid */}
                  {rev.itemReviews && rev.itemReviews.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {rev.itemReviews.map((item, i) => (
                        <div
                          key={i}
                          className="bg-gray-50 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-gray-100 flex items-center justify-between gap-2"
                        >
                          <span className="text-xs font-bold text-gray-700 capitalize flex items-center gap-1.5 truncate">
                            <Utensils size={12} className="text-[#962A27] shrink-0" /> {item.itemName}
                          </span>
                          <div className="flex items-center gap-0.5 shrink-0">
                            {[...Array(item.rating || 5)].map((_, s) => (
                              <Star
                                key={s}
                                size={11}
                                className="fill-amber-400 text-amber-400"
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Guest Comment */}
                  {rev.overallComment && (
                    <div className="bg-rose-50/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-rose-100/60">
                      <p className="text-xs text-gray-700 font-medium italic leading-relaxed">
                        "{rev.overallComment}"
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl sm:rounded-3xl border border-gray-100">
            <p className="text-gray-500 font-bold text-xs sm:text-sm">
              No matching reviews found for the selected filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminReviewOrderFeedback;