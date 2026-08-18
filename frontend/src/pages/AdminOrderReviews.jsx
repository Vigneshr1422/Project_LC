import React, { useState, useEffect, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronLeft, User, Calendar, Eye, Download, CheckCircle2, Search, ArrowUpDown, ChevronRight, X, Sparkles, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const AdminOrderReviews = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadedQRs, setDownloadedQRs] = useState({});

  // 🔍 Search, Sort, and Pagination States
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [sortField, setSortField] = useState("sno");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetch("https://project-lc.onrender.com/api/booking1/get-all-bookings")
      .then((res) => {
        if (!res.ok) throw new Error(`Server status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const fetchedOrders = data.bookings || (Array.isArray(data) ? data : []);
        setOrders(fetchedOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  // 📥 Function to Download High-Resolution PNG QR Image
  const downloadQRCode = (orderId) => {
    const svgElement = document.getElementById(`qr-code-${orderId}`);
    if (!svgElement) return;
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = 1000;
      canvas.height = 1000;
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, 1000, 1000);
      const pngFile = canvas.toDataURL("image/png", 1.0);
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = `QR_Order_${orderId}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      setDownloadedQRs((prev) => ({ ...prev, [orderId]: true }));
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgData);
  };

  // 🔍 SEARCH & SORT LOGIC
  const processedOrders = useMemo(() => {
    let list = orders.map((order, index) => ({
      ...order,
      sno: index + 1,
    }));
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase();
      list = list.filter(
        (item) => (item.name && item.name.toLowerCase().includes(query)) || (item.date && item.date.toLowerCase().includes(query))
      );
    }
    list.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];
      if (typeof valA === "string") valA = valA.toLowerCase();
      if (typeof valB === "string") valB = valB.toLowerCase();
      if (valA < valB) return sortOrder === "ASC" ? -1 : 1;
      if (valA > valB) return sortOrder === "ASC" ? 1 : -1;
      return 0;
    });
    return list;
  }, [orders, searchTerm, sortOrder, sortField]);

  // 📄 PAGINATION LOGIC
  const totalPages = Math.ceil(processedOrders.length / itemsPerPage) || 1;
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [processedOrders, currentPage, itemsPerPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getReviewUrl = (orderId) => {
    const baseUrl = window.location.hostname === "localhost" ? "https://lakshmicatering.netlify.app" : window.location.origin;
    return `${baseUrl}/customer-review?orderId=${orderId}`;
  };

  return (
    <div className="min-h-screen bg-[#fffcfb] p-4 sm:p-8 lg:p-12 font-sans relative overflow-x-hidden">
      
      {/* Background Soft Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[250px] bg-[#962A27]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6 relative z-10">
        
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-5 sm:p-7 rounded-[28px] border-2 border-[#962A27]/20 shadow-sm gap-4 text-left">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 sm:p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 text-[#962A27] transition-all border border-[#962A27]/30 cursor-pointer shrink-0 shadow-2xs hover:scale-105"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#962A27]/10 text-[#962A27] font-black text-[10px] uppercase tracking-wider mb-1.5 border border-[#962A27]/20">
                <Sparkles size={12} className="text-amber-600" /> Scanner & Insights
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-[#2b1b17] tracking-tight">
                Order QRs & <span className="text-[#962A27]">Feedback</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">
                Download high-resolution guest feedback QR codes & monitor performance analytics.
              </p>
            </div>
          </div>
        </div>

        {/* 🔍 SEARCH AND SORT CONTROLS */}
        {!loading && orders.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 bg-white p-4 sm:p-5 rounded-[24px] border-2 border-[#962A27]/20 shadow-sm">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer name or date..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full text-xs sm:text-sm font-semibold pl-10 pr-9 py-3 rounded-xl bg-rose-50/30 border border-[#962A27]/30 focus:outline-none focus:border-[#962A27] focus:bg-white transition-all shadow-2xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Sort Controls */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                <ArrowUpDown size={14} className="text-[#962A27]" />
                <span>Sort:</span>
              </div>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="text-xs font-bold px-3 py-2.5 rounded-xl bg-rose-50/30 border border-[#962A27]/30 text-gray-700 focus:outline-none focus:border-[#962A27] cursor-pointer shadow-2xs"
              >
                <option value="sno">S.No</option>
                <option value="name">Customer Name</option>
                <option value="date">Date</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")}
                className="px-4 py-2.5 rounded-xl bg-[#962A27] hover:bg-[#7a2220] text-white text-xs font-black transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
              >
                {sortOrder === "ASC" ? "▲ ASC" : "▼ DESC"}
              </button>
            </div>
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <Loader />
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[28px] border-2 border-[#962A27]/20 shadow-sm">
            <QrCode size={48} className="mx-auto text-gray-300 mb-3 animate-pulse" />
            <p className="text-gray-600 font-bold text-base">No orders found.</p>
            <p className="text-gray-400 text-xs mt-1">Orders will appear here once bookings are confirmed.</p>
          </div>
        ) : paginatedOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[28px] border-2 border-[#962A27]/20 shadow-sm">
            <p className="text-gray-600 font-bold text-base">
              No matching orders found for "{searchTerm}".
            </p>
          </div>
        ) : (
          <>
            {/* 🖥️ DESKTOP TABLE VIEW */}
            <div className="hidden sm:block bg-white rounded-[28px] border-2 border-[#962A27]/20 shadow-sm overflow-hidden text-left">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-rose-50/50 border-b-2 border-[#962A27]/20 text-gray-600 text-xs font-black uppercase tracking-wider">
                      <th className="p-5 w-20 text-center">S.No</th>
                      <th className="p-5">Customer Profile</th>
                      <th className="p-5">Catering Date</th>
                      <th className="p-5 text-center">QR Code Scanner</th>
                      <th className="p-5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rose-100/60 text-sm font-semibold text-gray-700">
                    {paginatedOrders.map((order) => {
                      const orderId = order._id || order.id;
                      const reviewUrl = getReviewUrl(orderId);
                      const isDownloaded = downloadedQRs[orderId];
                      return (
                        <tr key={orderId} className="hover:bg-rose-50/30 transition-colors">
                          <td className="p-5 font-mono font-black text-[#962A27] text-center">
                            #{order.sno}
                          </td>
                          <td className="p-5">
                            <div className="flex items-center gap-2.5 font-bold text-gray-900">
                              <div className="w-9 h-9 rounded-xl bg-rose-50 text-[#962A27] flex items-center justify-center font-black border border-rose-200 shadow-2xs">
                                <User size={16} />
                              </div>
                              <span className="text-base">{order.name || "Customer"}</span>
                            </div>
                          </td>
                          <td className="p-5 text-xs text-gray-600 font-bold">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-rose-50/40 border border-[#962A27]/20">
                              <Calendar size={14} className="text-[#962A27]" /> {order.date || "N/A"}
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="flex flex-col items-center justify-center gap-2.5">
                              <div className="p-2.5 bg-white rounded-2xl border-2 border-[#962A27]/20 shadow-sm">
                                <QRCodeSVG id={`qr-code-${orderId}`} value={reviewUrl} size={100} includeMargin={true} level={"H"} />
                              </div>
                              <button
                                onClick={() => downloadQRCode(orderId)}
                                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-2xs ${
                                  isDownloaded
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-rose-50 hover:bg-rose-100 text-[#962A27] border border-[#962A27]/30"
                                }`}
                              >
                                {isDownloaded ? (
                                  <>
                                    <CheckCircle2 size={14} className="text-emerald-600" />
                                    <span>Saved QR</span>
                                  </>
                                ) : (
                                  <>
                                    <Download size={14} />
                                    <span>Download QR</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="p-5 text-center">
                            <button
                              onClick={() =>
                                navigate(`/admin/order-feedback/${orderId}`, {
                                  state: { order },
                                })
                              }
                              className="inline-flex items-center gap-2 bg-[#962A27] hover:bg-[#7a2220] text-white px-5 py-2.5 rounded-xl text-xs font-black transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                            >
                              <Eye size={15} /> Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 📱 MOBILE CARDS VIEW */}
            <div className="block sm:hidden space-y-3.5 text-left">
              {paginatedOrders.map((order) => {
                const orderId = order._id || order.id;
                const reviewUrl = getReviewUrl(orderId);
                const isDownloaded = downloadedQRs[orderId];
                return (
                  <div key={orderId} className="bg-white p-4.5 rounded-[22px] border-2 border-[#962A27]/20 shadow-sm space-y-3.5">
                    <div className="flex items-center justify-between border-b border-rose-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#962A27] flex items-center justify-center font-black border border-rose-200">
                          <User size={15} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-black text-gray-400">
                            S.No: #{order.sno}
                          </span>
                          <h3 className="text-sm font-black text-gray-900 leading-tight">
                            {order.name || "Customer"}
                          </h3>
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-50/40 border border-[#962A27]/20 text-[11px] text-gray-600 font-bold">
                        <Calendar size={12} className="text-[#962A27]" /> {order.date || "N/A"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-rose-50/30 p-3 rounded-2xl border border-[#962A27]/20 gap-3">
                      <div className="p-2 bg-white rounded-xl border border-[#962A27]/20 shrink-0 shadow-2xs">
                        <QRCodeSVG id={`qr-code-${orderId}`} value={reviewUrl} size={78} includeMargin={true} level={"H"} />
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <button
                          onClick={() => downloadQRCode(orderId)}
                          className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-2xs ${
                            isDownloaded
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-white hover:bg-rose-50 text-[#962A27] border border-[#962A27]/30 shadow-sm"
                          }`}
                        >
                          {isDownloaded ? (
                            <>
                              <CheckCircle2 size={13} className="text-emerald-600" />
                              <span>Saved QR</span>
                            </>
                          ) : (
                            <>
                              <Download size={13} />
                              <span>Download QR</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/order-feedback/${orderId}`, {
                              state: { order },
                            })
                          }
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-[#962A27] hover:bg-[#7a2220] text-white px-3 py-2 rounded-xl text-xs font-black transition-all shadow-sm cursor-pointer"
                        >
                          <Eye size={13} /> View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 📄 PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 sm:p-5 rounded-[24px] border-2 border-[#962A27]/20 shadow-sm gap-3 text-xs font-bold text-gray-600">
                <span>
                  Showing <span className="font-black text-[#962A27]">{paginatedOrders.length}</span> of <span className="font-black text-gray-900">{processedOrders.length}</span> Orders
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-xl bg-rose-50/40 border border-[#962A27]/20 hover:bg-rose-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
                  >
                    <ChevronLeft size={16} className="text-[#962A27]" />
                  </button>
                  <span className="px-3.5 py-1.5 bg-rose-50 text-[#962A27] rounded-xl border border-[#962A27]/30 font-mono font-black text-xs">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2.5 rounded-xl bg-rose-50/40 border border-[#962A27]/20 hover:bg-rose-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs"
                  >
                    <ChevronRight size={16} className="text-[#962A27]" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminOrderReviews;