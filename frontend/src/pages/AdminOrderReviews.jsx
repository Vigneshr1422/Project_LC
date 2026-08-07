import React, { useState, useEffect, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronLeft, User, Calendar, Loader2, Eye, Download, CheckCircle2, Search, ArrowUpDown, ChevronRight, X, } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminOrderReviews = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadedQRs, setDownloadedQRs] = useState({});

  // 🔍 Search, Sort, and Pagination States
  const [searchTerm, setSearchTerm] = useState("");
  
  // 🔥 CHANGE 1: Default sortOrder-ah "DESC" nu mathiyaachu (Recent orders first varum)
  const [sortOrder, setSortOrder] = useState("DESC"); 
  
  // 🔥 CHANGE 2: Default sortField-ah "sno" nu vachurkuken. DESC potta max sno (last index / recent) top-la varum.
  const [sortField, setSortField] = useState("sno"); 
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

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
        (item) =>
          (item.name && item.name.toLowerCase().includes(query)) ||
          (item.date && item.date.toLowerCase().includes(query))
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
    <div className="min-h-screen bg-[#F8FAFC] p-3 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm gap-3 text-left">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 sm:p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 transition-all border border-gray-200 cursor-pointer shrink-0"
            >
              <ChevronLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl sm:text-3xl font-black text-gray-900">
                Order QRs & Feedback
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Download order QR codes & inspect guest review analytics.
              </p>
            </div>
          </div>
        </div>

        {/* 🔍 SEARCH AND SORT CONTROLS */}
        {!loading && orders.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-gray-100 shadow-sm">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or date..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full text-xs font-semibold pl-9 pr-8 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#962A27] focus:bg-white transition-all"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort Dropdowns & Toggle */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500">
                <ArrowUpDown size={14} className="text-[#962A27]" />
                <span>Sort:</span>
              </div>

              {/* Sort Field */}
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="text-xs font-bold px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 focus:outline-none cursor-pointer"
              >
                <option value="sno">S.No</option>
                <option value="name">Customer Name</option>
                <option value="date">Date</option>
              </select>

              {/* ASC / DESC Toggle */}
              <button
                onClick={() => setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")}
                className="px-3.5 py-2 rounded-xl bg-[#962A27] text-white text-xs font-extrabold transition-all cursor-pointer shadow-sm active:scale-95"
              >
                {sortOrder === "ASC" ? "▲ ASC" : "▼ DESC"}
              </button>
            </div>
          </div>
        )}

        {/* Content Section */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={32} className="animate-spin text-[#962A27]" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl sm:rounded-3xl border border-gray-100">
            <p className="text-gray-500 font-bold">No orders found.</p>
          </div>
        ) : paginatedOrders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl sm:rounded-3xl border border-gray-100">
            <p className="text-gray-500 font-bold">
              No matching orders found for "{searchTerm}".
            </p>
          </div>
        ) : (
          <>
            {/* 🖥️ DESKTOP TABLE VIEW */}
            <div className="hidden sm:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden text-left">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs font-bold uppercase tracking-wider">
                      <th className="p-4 sm:p-5 w-16 text-center">S.No</th>
                      <th className="p-4 sm:p-5">Customer</th>
                      <th className="p-4 sm:p-5">Date</th>
                      <th className="p-4 sm:p-5 text-center">QR Code</th>
                      <th className="p-4 sm:p-5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm font-semibold text-gray-700">
                    {paginatedOrders.map((order) => {
                      const orderId = order._id || order.id;
                      const reviewUrl = getReviewUrl(orderId);
                      const isDownloaded = downloadedQRs[orderId];

                      return (
                        <tr key={orderId} className="hover:bg-gray-50/60 transition-colors">
                          <td className="p-4 sm:p-5 font-mono font-black text-[#962A27] text-center">
                            {order.sno}
                          </td>
                          <td className="p-4 sm:p-5">
                            <div className="flex items-center gap-2 font-bold text-gray-900">
                              <User size={14} className="text-[#962A27]" />
                              {order.name || "Customer"}
                            </div>
                          </td>
                          <td className="p-4 sm:p-5 text-xs text-gray-500 font-medium">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={13} className="text-gray-400" />
                              {order.date || "N/A"}
                            </div>
                          </td>
                          <td className="p-4 sm:p-5">
                            <div className="flex flex-col items-center justify-center gap-2">
                              <div className="p-2 bg-gray-50 rounded-xl border border-gray-200">
                                <QRCodeSVG
                                  id={`qr-code-${orderId}`}
                                  value={reviewUrl}
                                  size={96}
                                  includeMargin={true}
                                  level={"H"}
                                />
                              </div>
                              <button
                                onClick={() => downloadQRCode(orderId)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                                  isDownloaded
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
                                }`}
                              >
                                {isDownloaded ? (
                                  <>
                                    <CheckCircle2 size={13} className="text-emerald-600" />
                                    <span>Saved</span>
                                  </>
                                ) : (
                                  <>
                                    <Download size={13} />
                                    <span>Download QR</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="p-4 sm:p-5 text-center">
                            <button
                              onClick={() =>
                                navigate(`/admin/order-feedback/${orderId}`, {
                                  state: { order },
                                })
                              }
                              className="inline-flex items-center gap-2 bg-[#962A27] hover:bg-[#7a2220] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                            >
                              <Eye size={14} /> Details
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
                  <div
                    key={orderId}
                    className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div>
                        <span className="text-xs font-mono font-black bg-rose-50 text-[#962A27] px-2.5 py-0.5 rounded-lg border border-rose-100">
                          S.No: #{order.sno}
                        </span>
                        <h3 className="text-sm font-extrabold text-gray-900 flex items-center gap-1.5 mt-1.5">
                          <User size={13} className="text-[#962A27]" />
                          {order.name || "Customer"}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                        <Calendar size={12} className="text-gray-400" />
                        {order.date || "N/A"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50/70 p-3 rounded-xl border border-gray-100 gap-3">
                      <div className="p-1.5 bg-white rounded-lg border border-gray-200 shrink-0">
                        <QRCodeSVG
                          id={`qr-code-${orderId}`}
                          value={reviewUrl}
                          size={80}
                          includeMargin={true}
                          level={"H"}
                        />
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <button
                          onClick={() => downloadQRCode(orderId)}
                          className={`w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                            isDownloaded
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 shadow-sm"
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
                        <button
                          onClick={() =>
                            navigate(`/admin/order-feedback/${orderId}`, {
                              state: { order },
                            })
                          }
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-[#962A27] hover:bg-[#7a2220] text-white px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                        >
                          <Eye size={14} /> Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 📄 PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm text-xs font-bold text-gray-600">
                <span>
                  Showing {paginatedOrders.length} of {processedOrders.length} Orders
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="px-3 py-1 bg-rose-50 text-[#962A27] rounded-xl border border-rose-100 font-mono">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
                  >
                    <ChevronRight size={16} />
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