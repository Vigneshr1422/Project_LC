import axios from "axios";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, Loader2, Eye } from "lucide-react";

const UpcomingOrders = () => {
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
  const [sortOrder, setSortOrder] = useState("asc");

  const ordersPerPage = 10;

  // 🔥 FIXED: Unga server.js-la "/api/booking1" nu register pannirukathala, ingayum atha mathiyachu!
  const LOCAL_API_BASE = "http://localhost:5000/api/booking1";

  /* =========================
      FETCH ORDERS
  ========================== */
  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Perfect Sync with http://localhost:5000/api/booking1/upcoming
      const response = await axios.get(`${LOCAL_API_BASE}/upcoming`);
      
      const fetchedData = response.data.orders || response.data || [];
      
      const sortedOrders = fetchedData.sort(
        (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
      );
      setOrders(sortedOrders);
    } catch (error) {
      console.log("Error fetching orders from localhost:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  };

  useEffect(() => {
    fetchOrders();
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
      title: "Delete Booking?",
      text: "This booking will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(id);
      // Perfect Sync with http://localhost:5000/api/booking1/:id
      const response = await axios.delete(`${LOCAL_API_BASE}/${id}`);

      if (response.data.success) {
        setOrders((prev) => prev.filter((order) => order._id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Failed To Delete" });
    } finally {
      setDeletingId(null);
    }
  };

  /* =========================
      VIEW FULL DETAILS ALERTS
  ========================== */
  const viewFullDetails = (order) => {
    Swal.fire({
      title: `<strong class="text-[#962a27]">Booking Deep Details</strong>`,
      html: `
        <div style="text-align: left; font-size: 14px; line-height: 1.6;" class="p-2 text-gray-700">
          <p><b>📍 Location:</b> ${order.address || "N/A"}, ${order.city || ""}, ${order.district || ""}</p>
          <p><b>👥 Total Guests:</b> ${order.guests || 0}</p>
          <p><b>🍱 Food Preference:</b> ${order.preference || "N/A"} (${order.bookingType || "N/A"})</p>
          <p><b>📦 Package Name:</b> ${order.packageName || "N/A"}</p>
          <p><b>🧾 Menu Items:</b> ${order.packageItems?.length > 0 ? order.packageItems.join(", ") : "None"}</p>
          <hr style="margin: 10px 0; border-top: 1px dashed #ccc;"/>
          <p><b>🤵 Staff Req:</b> ${order.staffRequired || "No"} (${order.staffCount || 0} staffs)</p>
          <p><b>💰 Package Cost:</b> ₹${order.packageCost || 0}</p>
          <p><b>🚚 Delivery:</b> ₹${order.deliveryCharge || 0} | <b>⚙️ Service:</b> ₹${order.serviceCharge || 0}</p>
          <hr style="margin: 10px 0; border-top: 1px solid #ccc;"/>
          <p style="color: #962a27; font-size: 16px;"><b>💵 Grand Total: ₹${order.grandTotal || 0}</b></p>
          <p style="color: green"><b>💳 Advance Paid: ₹${order.advancePaid || 0}</b></p>
          <p style="color: red"><b>⚠️ Balance Due: ₹${order.balanceAmount || 0}</b></p>
          <p style="font-size: 11px; color:#777; margin-top:10px;">TXN ID: ${order.razorpayPaymentId || "N/A"}</p>
        </div>
      `,
      confirmButtonText: "Close",
      confirmButtonColor: "#962a27",
    });
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, searchBy, sortOrder]);

  /* =========================
      MAIN RENDER
  ========================== */
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-5 md:p-10">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#962a27]">Upcoming Orders</h1>
          <p className="text-gray-500 mt-2">
            Total Orders : <span className="font-bold text-[#962a27]">{filteredOrders.length}</span>
          </p>

          {/* FILTERS */}
          <div className="mt-5 flex flex-col md:flex-row gap-3">
            <select
              value={searchBy}
              onChange={(e) => {
                setSearchBy(e.target.value);
                setSearchTerm("");
              }}
              className="border border-gray-300 rounded-xl px-4 py-3 bg-white font-medium text-gray-700"
            >
              <option value="customerName">Customer Name</option>
              <option value="phone">Phone Number</option>
              <option value="eventType">Event Type</option>
              <option value="city">City / Venue</option>
            </select>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search by ${searchBy === "customerName" ? "Name" : searchBy === "eventType" ? "Event" : searchBy}`}
              className="border border-gray-300 rounded-xl px-4 py-3 flex-1"
            />

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-3 bg-white font-medium text-gray-700"
            >
              <option value="asc">Date ASC (Earliest First)</option>
              <option value="desc">Date DESC (Latest First)</option>
            </select>
          </div>
        </div>
      </div>

      {/* TABLE / EMPTY STATE SECTION */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 py-20 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-[#fff7f7] flex items-center justify-center text-4xl">📭</div>
          <h2 className="mt-6 text-2xl font-bold text-[#962a27]">No Upcoming Orders</h2>
          <p className="mt-2 text-gray-500">Orders will appear here</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#962a27] text-white">
                  <tr>
                    <th className="p-5 text-left">S.No</th>
                    <th className="p-5 text-left">Booking ID</th>
                    <th className="p-5 text-left">Customer</th>
                    <th className="p-5 text-left">Phone</th>
                    <th className="p-5 text-left">Event & Session</th>
                    <th className="p-5 text-left">Event Date</th>
                    <th className="p-5 text-left">Grand Total</th>
                    <th className="p-5 text-left">Balance Due</th>
                    <th className="p-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr key={order._id} className="border-b hover:bg-[#fafafa] transition-all">
                      <td className="p-5 font-semibold">{firstIndex + index + 1}</td>
                      <td className="p-5 font-bold text-gray-700">#LC-{order._id ? order._id.slice(-6).toUpperCase() : "XXXXXX"}</td>
                      <td className="p-5 font-semibold text-gray-800">{order.customerName}</td>
                      <td className="p-5 text-gray-600">{order.phone}</td>
                      <td className="p-5">
                        <span className="font-medium text-gray-800">{order.eventType}</span>
                        {order.session && <span className="block text-xs text-gray-400">( {order.session} )</span>}
                      </td>
                      <td className="p-5 text-gray-700 font-medium">{order.eventDate}</td>
                      <td className="p-5 font-bold text-[#962a27]">₹ {order.grandTotal?.toLocaleString()}</td>
                      <td className="p-5 font-bold text-red-600">₹ {order.balanceAmount?.toLocaleString()}</td>
                      <td className="p-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => viewFullDetails(order)}
                            className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-lg flex items-center gap-1 transition-all text-sm"
                            title="View Full Details"
                          >
                            <Eye size={16} /> Details
                          </button>
                          
                          <button
                            onClick={() => handleDelete(order._id)}
                            disabled={deletingId === order._id}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg flex items-center gap-1 disabled:opacity-70 text-sm transition-all"
                          >
                            {deletingId === order._id ? (
                              <><Loader2 size={16} className="animate-spin" /> ...</>
                            ) : (
                              <><Trash2 size={16} /> Delete</>
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
            <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-5 py-2 rounded-xl border border-[#962a27] text-[#962a27] font-semibold disabled:opacity-40"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-11 h-11 rounded-xl font-semibold ${
                    currentPage === index + 1 ? "bg-[#962a27] text-white" : "bg-white border border-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-5 py-2 rounded-xl bg-[#962a27] text-white font-semibold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* DASHBOARD BUTTON */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#962a27] text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all"
        >
          Back To Dashboard
        </button>
      </div>
    </div>
  );
};

export default UpcomingOrders;