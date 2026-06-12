import axios from "axios";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Loader2, Eye, FileText } from "lucide-react";

const CompletedOrders = () => {
  const navigate = useNavigate();

  /* =========================
      STATES
  ========================== */
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);
  const [searchBy, setSearchBy] = useState("customerName");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const ordersPerPage = 10;
  const LOCAL_API_BASE = "https://project-lc.onrender.com/api/booking1";

  /* =========================
      FETCH COMPLETED ORDERS
  ========================== */
  const fetchCompletedOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${LOCAL_API_BASE}/completed`);
      const fetchedData = response.data.orders || response.data || [];
      
      const sortedOrders = fetchedData.sort(
        (a, b) => new Date(b.eventDate) - new Date(a.eventDate)
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.log("Error fetching completed orders:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  };

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  /* =========================
      SEARCH + SORT LOGIC
  ========================== */
  const filteredOrders = orders
    .filter((order) => {
      const value = String(order?.[searchBy] || "").toLowerCase();
      return value.includes(searchTerm.toLowerCase());
    })
    .sort((a, b) => {
      return sortOrder === "asc"
        ? new Date(a.eventDate) - new Date(b.eventDate)
        : new Date(b.eventDate) - new Date(a.eventDate);
    });

  const lastIndex = currentPage * ordersPerPage;
  const firstIndex = lastIndex - ordersPerPage;
  const currentOrders = filteredOrders.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  /* =========================
      DELETE HANDLER
  ========================== */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete History Log?",
      text: "This completed booking history will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete Log",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);
      const response = await axios.delete(`${LOCAL_API_BASE}/${id}`);

      if (response.data.success) {
        setOrders((prev) => prev.filter((order) => order._id !== id));
        Swal.fire({
          icon: "success",
          title: "Log Deleted Successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Failed To Delete History" });
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================
      VIEW FULL DETAILS ALERTS
  ========================== */
  const viewFullDetails = (order) => {
    Swal.fire({
      title: `<strong class="text-[#962a27]">Completed Order Details</strong>`,
      html: `
        <div style="text-align: left; font-size: 14px; line-height: 1.6;" class="p-2 text-gray-700">
          <p><b>📍 Location:</b> ${order.address || "N/A"}, ${order.city || ""}, ${order.district || ""}</p>
          <p><b>👥 Total Guests:</b> ${order.guests || 0} Members</p>
          <p><b>🍱 Food Preference:</b> ${order.preference || "N/A"} (${order.bookingType || "N/A"})</p>
          <p><b>📦 Package Style:</b> ${order.packageName || "Custom Package"}</p>
          <p><b>🧾 Served Menu:</b> ${order.packageItems?.length > 0 ? order.packageItems.join(", ") : "None"}</p>
          <hr style="margin: 10px 0; border-top: 1px dashed #ccc;"/>
          <p><b>🤵 Managed Staffs:</b> ${order.staffRequired || "No"} (${order.staffCount || 0} members)</p>
          <p><b>💰 Menu Cost:</b> ₹${order.packageCost || 0}</p>
          <p><b>🚚 Logistics/Delivery:</b> ₹${order.deliveryCharge || 0} | <b>⚙️ Service Fee:</b> ₹${order.serviceCharge || 0}</p>
          <hr style="margin: 10px 0; border-top: 1px solid #ccc;"/>
          <p style="color: #962a27; font-size: 16px;"><b>💵 Collected Grand Total: ₹${order.grandTotal || 0}</b></p>
          <p style="color: green"><b>💳 Received Advance: ₹${order.advancePaid || 0}</b></p>
          <p style="color: #444"><b>🏁 Settled Balance: ₹${order.balanceAmount || 0}</b></p>
          <p style="font-size: 11px; color:#777; margin-top:10px;">TXN Gateway ID: ${order.razorpayPaymentId || "N/A"}</p>
        </div>
      `,
      confirmButtonText: "Done",
      confirmButtonColor: "#962a27",
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, searchBy, sortOrder]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-4 md:p-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col gap-5 mb-8 text-left">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#962a27]">Past Completed Orders</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Total Finished Events : <span className="font-bold text-[#962a27]">{filteredOrders.length}</span>
          </p>

          {/* FILTERS */}
          <div className="mt-5 flex flex-col lg:flex-row gap-3">
            <select
              value={searchBy}
              onChange={(e) => {
                setSearchBy(e.target.value);
                setSearchTerm("");
              }}
              className="border border-gray-300 rounded-xl px-4 py-3 bg-white font-medium text-gray-700 w-full lg:w-auto focus:outline-none focus:border-[#962a27]"
            >
              <option value="customerName">Customer Name</option>
              <option value="phone">Phone Number</option>
              <option value="eventType">Event Type</option>
              <option value="city">City / Location</option>
            </select>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search past by ${searchBy === "customerName" ? "Name" : searchBy === "eventType" ? "Event" : searchBy}`}
              className="border border-gray-300 rounded-xl px-4 py-3 flex-1 w-full focus:outline-none focus:border-[#962a27] bg-white shadow-xs"
            />

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 bg-white font-medium text-gray-700 w-full lg:w-auto focus:outline-none focus:border-[#962a27]"
            >
              <option value="desc">Date DESC (Latest First)</option>
              <option value="asc">Date ASC (Oldest First)</option>
            </select>
          </div>
        </div>
      </div>

      {/* RENDER DATA */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 py-20 flex flex-col items-center justify-center text-center px-4">
          <div className="w-20 h-20 rounded-full bg-[#fff7f7] flex items-center justify-center text-4xl">📦</div>
          <h2 className="mt-6 text-2xl font-bold text-[#962a27]">No Completed Orders</h2>
          <p className="mt-2 text-gray-500">Finished logs will be cataloged here.</p>
        </div>
      ) : (
        <>
          {/* 🎯 MASTER TABLE VIEW (WORKS ON BOTH MOBILE & DESKTOP) */}
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto"> {/* 🔥 Enables smooth horizontal swipe table inside mobile resolution */}
              <table className="w-full min-w-[900px] md:min-w-full">
                <thead className="bg-[#962a27] text-white">
                  <tr>
                    <th className="p-4 text-left text-sm md:text-base">S.No</th>
                    <th className="p-4 text-left text-sm md:text-base">Booking ID</th>
                    <th className="p-4 text-left text-sm md:text-base">Customer</th>
                    <th className="p-4 text-left text-sm md:text-base">Phone</th>
                    <th className="p-4 text-left text-sm md:text-base">Catering Event</th>
                    <th className="p-4 text-left text-sm md:text-base">Execution Date</th>
                    <th className="p-4 text-left text-sm md:text-base">Total Revenue</th>
                    <th className="p-4 text-center text-sm md:text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr key={order._id} className="border-b hover:bg-[#fafafa] transition-all text-xs md:text-sm">
                      <td className="p-4 font-semibold">{firstIndex + index + 1}</td>
                      <td className="p-4 font-bold text-gray-600">#LC-{order._id ? order._id.slice(-6).toUpperCase() : "XXXXXX"}</td>
                      <td className="p-4 font-semibold text-gray-800">{order.customerName}</td>
                      <td className="p-4 text-gray-600">{order.phone}</td>
                      <td className="p-4">
                        <span className="font-medium text-gray-800">{order.eventType}</span>
                        {order.session && <span className="block text-[10px] text-gray-400">({order.session})</span>}
                      </td>
                      <td className="p-4 text-gray-700 font-medium">{order.eventDate}</td>
                      <td className="p-4 font-bold text-[#962a27]">₹ {order.grandTotal?.toLocaleString()}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => viewFullDetails(order)}
                            className="bg-gray-800 hover:bg-gray-900 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1 text-xs font-medium transition-all cursor-pointer"
                          >
                            <Eye size={14} /> Details
                          </button>
                          <button
                            onClick={() => handleDelete(order._id)}
                            disabled={deletingId === order._id}
                            className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1 disabled:opacity-70 text-xs font-medium transition-all cursor-pointer"
                          >
                            {deletingId === order._id ? (
                              <><Loader2 size={14} className="animate-spin" /> ...</>
                            ) : (
                              <><Trash2 size={14} /> Delete</>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PAGINATION */}
          {filteredOrders.length > ordersPerPage && (
            <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl border border-[#962a27] text-[#962a27] font-semibold text-sm disabled:opacity-40 cursor-pointer"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold cursor-pointer ${
                    currentPage === index + 1 ? "bg-[#962a27] text-white" : "bg-white border border-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-[#962a27] text-white font-semibold text-sm disabled:opacity-40 cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* DASHBOARD BUTTON */}
      <div className="mt-10 flex justify-center px-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#962a27] text-white w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all shadow-md text-center cursor-pointer"
        >
          Back To Dashboard
        </button>
      </div>
    </div>
  );
};

export default CompletedOrders;