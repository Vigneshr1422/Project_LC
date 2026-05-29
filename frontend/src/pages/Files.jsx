import axios from "axios";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";
import { FileText, Download, Eye, ArrowLeft } from "lucide-react"; // Added icons for better look

const Files = () => {
  const navigate = useNavigate();

  /* ========================= STATES ========================== */
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(null);
  const [downloadLoading, setDownloadLoading] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Kept it 10 to match CompletedOrders feel

  /* ========================= PAGINATION logic ========================== */
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + itemsPerPage);

  /* ========================= FETCH ========================== */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/bookings/completed");
      // Sort by date descending (latest first)
      const sortedData = response.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(sortedData);
    } catch (error) {
      console.log("Error fetching files:", error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ========================= DOWNLOAD CSV ========================== */
  const downloadCSV = async (order) => {
    try {
      setDownloadLoading(order._id);
      await new Promise((resolve) => setTimeout(resolve, 800));

      const selectedItems = Object.keys(order.selectedItems || {})
        .filter((item) => order.selectedItems[item])
        .join(" | ");

      const headers = ["Booking ID", "Customer Name", "Phone", "Event", "Date", "Items", "Total"];
      const row = [
        order.bookingId || "N/A",
        order.name || "",
        order.phone || "",
        order.event || "",
        order.date || "",
        selectedItems,
        `₹${order.grandTotal || 0}`
      ];

      const csvContent = [headers, row].map(e => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `${order.bookingId}_${order.name}.csv`);
    } catch (error) {
      console.log(error);
    } finally {
      setDownloadLoading(null);
    }
  };

  const handlePreview = async (order) => {
    setPreviewLoading(order._id);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSelectedOrder(order);
    setPreviewLoading(null);
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-5 md:p-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#962a27]">Order Files</h1>
          <p className="text-gray-500 mt-2">Manage and export completed order documents</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-gray-500">Total Files: </span>
          <span className="font-bold text-[#962a27] text-xl">{orders.length}</span>
        </div>
      </div>

      {/* TABLE SECTION */}
      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 py-20 text-center shadow-sm">
          <div className="text-6xl mb-4">📂</div>
          <h2 className="text-2xl font-bold text-[#962a27]">No Records Found</h2>
          <p className="text-gray-400">Completed orders will appear here for download.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#962a27] text-white">
                  <th className="p-5 text-left whitespace-nowrap">S.No</th>
                  <th className="p-5 text-left whitespace-nowrap">Booking ID</th>
                  <th className="p-5 text-left whitespace-nowrap">Customer</th>
                  <th className="p-5 text-left whitespace-nowrap">Event</th>
                  <th className="p-5 text-left whitespace-nowrap">Date</th>
                  <th className="p-5 text-center whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-5 font-semibold text-gray-600">{startIndex + index + 1}</td>
                    <td className="p-5 font-bold text-[#962a27]">{order.bookingId}</td>
                    <td className="p-5">
                      <div className="font-medium text-gray-800">{order.name}</div>
                      <div className="text-xs text-gray-400">{order.phone}</div>
                    </td>
                    <td className="p-5 text-gray-700">{order.event}</td>
                    <td className="p-5 text-gray-600 font-medium">{order.date}</td>
                    <td className="p-5">
                      <div className="flex items-center justify-center gap-3">
                        {/* Preview Button */}
                        <button
                          onClick={() => handlePreview(order)}
                          disabled={previewLoading === order._id}
                          className="flex items-center gap-2 bg-[#962a27] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#7a2220] transition-all disabled:opacity-50"
                        >
                          {previewLoading === order._id ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <><Eye size={16} /> Preview</>
                          )}
                        </button>

                        {/* Download Button */}
                        <button
                          onClick={() => downloadCSV(order)}
                          disabled={downloadLoading === order._id}
                          className="flex items-center gap-2 border border-[#962a27] text-[#962a27] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#fff7f7] transition-all disabled:opacity-50"
                        >
                          {downloadLoading === order._id ? (
                            <div className="w-4 h-4 border-2 border-[#962a27]/30 border-t-[#962a27] rounded-full animate-spin" />
                          ) : (
                            <><Download size={16} /> CSV</>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 py-8 bg-[#fafafa] border-t">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-6 py-2 rounded-xl border border-[#962a27] text-[#962a27] font-bold disabled:opacity-30"
              >
                Prev
              </button>
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
                      currentPage === i + 1 ? "bg-[#962a27] text-white shadow-md" : "bg-white text-gray-400 border border-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-6 py-2 rounded-xl bg-[#962a27] text-white font-bold disabled:opacity-30"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* PREVIEW MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-5">
          <div className="bg-white w-full max-w-2xl rounded-[2rem] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
                onClick={() => setSelectedOrder(null)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-[#fff7f7] rounded-2xl text-[#962a27]">
                    <FileText size={32} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-[#962a27]">Order Details</h2>
                    <p className="text-gray-400 text-sm">ID: {selectedOrder.bookingId}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Customer</p>
                <p className="font-semibold text-gray-800">{selectedOrder.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Phone</p>
                <p className="font-semibold text-gray-800">{selectedOrder.phone}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Event & Date</p>
                <p className="font-semibold text-gray-800">{selectedOrder.event} - {selectedOrder.date}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Total Amount</p>
                <p className="text-xl font-black text-[#962a27]">₹{selectedOrder.grandTotal?.toLocaleString()}</p>
              </div>
              <div className="md:col-span-2 space-y-3 pt-4 border-t">
                <p className="text-xs uppercase tracking-wider text-gray-400 font-bold">Items Selected</p>
                <div className="flex flex-wrap gap-2">
                    {Object.keys(selectedOrder.selectedItems || {}).filter(k => selectedOrder.selectedItems[k]).map(item => (
                        <span key={item} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                            {item}
                        </span>
                    ))}
                </div>
              </div>
            </div>
            
            <button 
                onClick={() => setSelectedOrder(null)}
                className="w-full mt-8 py-4 bg-gray-800 text-white rounded-2xl font-bold hover:bg-black transition-colors"
            >
                Close Preview
            </button>
          </div>
        </div>
      )}

      {/* DASHBOARD BUTTON */}
      <div className="mt-12 flex justify-center">
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="group flex items-center gap-3 bg-[#962a27] text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg shadow-red-900/20"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back To Dashboard
        </button>
      </div>
    </div>
  );
};

export default Files;

