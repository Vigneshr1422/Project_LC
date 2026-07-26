import axios from "axios";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx"; // 🔥 எக்செல் கம்பைலர் இன்ஜின் இம்போர்ட் செய்கிறோம்
import { Trash2, Loader2, Eye, FileText, FileSpreadsheet } from "lucide-react";

const Files = () => {
  const navigate = useNavigate();

  /* ========================= STATES ========================== */
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);
  const [isExcelLoading, setIsExcelLoading] = useState(false); // 🔥 Excel loader tracker
  const [searchBy, setSearchBy] = useState("customerName");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const ordersPerPage = 10;
  
  const LOCAL_API_BASE = "http://localhost:5000/api/booking1";

  /* ========================= FETCH ALL ORDERS ========================== */
  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const [upcomingRes, completedRes] = await Promise.all([
        axios.get(`${LOCAL_API_BASE}/upcoming`),
        axios.get(`${LOCAL_API_BASE}/completed`)
      ]);
      
      const upcomingData = upcomingRes.data.orders || upcomingRes.data || [];
      const completedData = completedRes.data.orders || completedRes.data || [];
      
      const allOrdersCombined = [...upcomingData, ...completedData];
      const sortedOrders = allOrdersCombined.sort(
        (a, b) => new Date(b.eventDate) - new Date(a.eventDate)
      );
      
      setOrders(sortedOrders);
    } catch (error) {
      console.log("Error fetching all system billing files:", error);
      Swal.fire({
        icon: "error",
        title: "Fetch Error",
        text: "Failed to load database invoice logs.",
        confirmButtonColor: "#962a27"
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 800);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  /* ========================= 🔥 EXCEL BULK DOWNLOAD ENGINE ========================== */
  const handleDownloadAllAsExcel = () => {
    if (filteredOrders.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Invoices",
        text: "There are no invoice records available to export.",
        confirmButtonColor: "#962a27"
      });
      return;
    }

    try {
      setIsExcelLoading(true);

      // 1. எக்செல் ஷீட்டுக்கு தேவையான ரோ டேட்டாவை (Rows) வடிவமைக்கிறோம்
      const excelRows = filteredOrders.map((order, idx) => {
        return {
          "S.No": idx + 1,
          "Invoice No": order.invoiceNo || `LC-${String(order._id || "").slice(-6).toUpperCase()}`,
          "Customer Name": order.customerName || "—",
          "Phone Number": order.phone || "—",
          "Event Date": order.eventDate ? order.eventDate.split("-").reverse().join("/") : "—",
          "Event Type": order.eventType || "—",
          "Session": order.session || "Lunch",
          "Venue / City": order.city || "—",
          "Address": order.address || "—",
          "Total Guests": order.guests || 0,
          "Package Selected": order.packageName || "Custom Menu",
          "Food Amount (₹)": order.packageCost || 0,
          "Service Charge (₹)": order.serviceCharge || 0,
          "Delivery Charge (₹)": order.deliveryCharge || 0,
          "Grand Total (₹)": order.grandTotal || 0,
          "Advance Paid (₹)": order.advancePaid || 0,
          "Balance Amount (₹)": order.balanceAmount || 0,
          "Staff Count": order.staffCount || 0,
          "Razorpay Payment ID": order.razorpayPaymentId || "N/A"
        };
      });

      // 2. வொர்க்ஷீட் (Worksheet) உருவாக்குகிறோம்
      const worksheet = XLSX.utils.json_to_sheet(excelRows);

      // 3. வொர்க் புக் (Workbook) உருவாக்கி ஷீட்டை உள்ளே இணைக்கிறோம்
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices_Report");

      // 4. காலம்களின் அகலத்தை (Column Widths) ஆட்டோமேட்டிக்கா அட்ஜஸ்ட் பண்றோம் பக்கா லுக்கிற்கு
      const maxTextLengths = {};
      excelRows.forEach(row => {
        Object.keys(row).forEach(key => {
          const valStr = String(row[key] || "");
          maxTextLengths[key] = Math.max(maxTextLengths[key] || key.length, valStr.length);
        });
      });
      worksheet["!cols"] = Object.keys(maxTextLengths).map(key => ({
        wch: maxTextLengths[key] + 3
      }));

      // 5. எக்செல் ஃபைலை சிஸ்டத்தில் டவுன்லோடு செய்கிறோம்
      const fileName = `Lakshmi_Catering_Report_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(workbook, fileName);

      Swal.fire({
        icon: "success",
        title: "Excel Downloaded!",
        text: `Successfully exported ${filteredOrders.length} accounts records!`,
        confirmButtonColor: "#962a27"
      });

    } catch (err) {
      console.error("Excel Generation Error: ", err);
      Swal.fire({
        icon: "error",
        title: "Export Error",
        text: "Something went wrong while compiling the Excel file.",
        confirmButtonColor: "#962a27"
      });
    } finally {
      setIsExcelLoading(false);
    }
  };

  /* ========================= SEARCH + SORT LOGIC ========================== */
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

  /* ========================= SPECIFIC INVOICE COPY HANDLER ========================== */
  const handleViewPersonInvoice = (order) => {
    navigate("/pdf-preview", {
      state: {
        formData: {
          name: order.customerName,
          phone: order.phone,
          date: order.eventDate,
          guests: order.guests,
          district: order.district,
          city: order.city,
          address: order.address,
          eventType: order.eventType,
          session: order.session,
          preference: order.preference,
          bookingType: order.bookingType,
          packageName: order.packageName,
          packageItems: order.packageItems || [],
          packagePrice: order.packageCost / (order.guests || 1),
        },
        grandTotal: order.grandTotal,
        serviceCharge: order.serviceCharge,
        deliveryCharge: order.deliveryCharge,
        staffCount: order.staffCount,
        staffRequired: order.staffRequired,
        paymentId: order.razorpayPaymentId || "N/A",
        tokenAdvanceAmount: order.advancePaid,
        isFromFilesPage: true
      }
    });
  };

  /* ========================= DELETE HANDLER ========================== */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete File Log?",
      text: "This billing record will be permanently deleted from database workspace archive.",
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
      const response = await axios.delete(`${LOCAL_API_BASE}/${id}`);
      if (response.data.success) {
        setOrders((prev) => prev.filter((order) => order._id !== id));
        Swal.fire({ icon: "success", title: "File Purged Successfully", timer: 2000, showConfirmButton: false });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Oops...", text: "Failed to clear selected invoice record." });
    } finally {
      setDeletingId(null);
    }
  };

  /* ========================= VIEW QUICK DETAILS ========================== */
  const viewQuickDetails = (order) => {
    Swal.fire({
      title: `<strong class="text-[#962a27]">${order.customerName.toUpperCase()} - Details</strong>`,
      html: `
        <div style="text-align: left; font-size: 14px; line-height: 1.6;" class="p-2 text-gray-700">
          <p><b>📍 Venue Location:</b> ${order.address || "N/A"}, ${order.city || ""}</p>
          <p><b>👥 Total Guests:</b> ${order.guests || 0} Persons</p>
          <p><b>🍱 Menu Package:</b> ${order.packageName || "Standard Configuration"}</p>
          <hr style="margin: 10px 0; border-top: 1px dashed #ccc;"/>
          <p style="color: #962a27; font-size: 15px;"><b>💵 Total Amount: ₹${order.grandTotal || 0}</b></p>
          <p style="color: green"><b>💳 Paid Advance: ₹${order.advancePaid || 0}</b></p>
          <p style="color: #444"><b>⏳ Pending Due: ₹${order.balanceAmount || 0}</b></p>
        </div>
      `,
      confirmButtonText: "Close",
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-[#962a27]">Lakshmi Billing Files Storage</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Total Digital Invoices Logged (All Orders) : <span className="font-bold text-[#962a27]">{filteredOrders.length}</span>
          </p>
        </div>

        {/* 👑 புதுப்பிக்கப்பட்ட EXCEL BULK DOWNLOAD BUTTON (ஜிப் எரருக்கு 100% மாற்று தீர்வு) */}
        <button
          onClick={handleDownloadAllAsExcel}
          disabled={isExcelLoading || filteredOrders.length === 0}
          className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-5 py-3.5 rounded-xl font-bold text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 flex items-center justify-center gap-2 self-start lg:self-center cursor-pointer"
        >
          {isExcelLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <FileSpreadsheet size={18} />
          )}
          {isExcelLoading ? "Compiling Sheets..." : "Download All as Excel (.xlsx)"}
        </button>
      </div>

      {/* SYSTEM SEARCH AND FILTERS */}
      <div className="mb-6 flex flex-col lg:flex-row gap-3">
        <select value={searchBy} onChange={(e) => { setSearchBy(e.target.value); setSearchTerm(""); }} className="border border-gray-300 rounded-xl px-4 py-3 bg-white font-medium text-gray-700 w-full lg:w-auto focus:outline-none focus:border-[#962a27]">
          <option value="customerName">Customer Name</option>
          <option value="phone">Phone Number</option>
          <option value="eventType">Event Type</option>
          <option value="city">City / Location</option>
        </select>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder={`Search invoices by ${searchBy === "customerName" ? "Customer Name" : searchBy}`} className="border border-gray-300 rounded-xl px-4 py-3 flex-1 w-full focus:outline-none focus:border-[#962a27] bg-white shadow-xs" />
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border border-gray-300 rounded-xl px-4 py-3 bg-white font-medium text-gray-700 w-full lg:w-auto focus:outline-none focus:border-[#962a27]">
          <option value="desc">Date DESC (Latest Invoices)</option>
          <option value="asc">Date ASC (Oldest Invoices)</option>
        </select>
      </div>

      {/* RENDER MASTER INVOICES LIST */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-200 py-20 flex flex-col items-center justify-center text-center px-4">
          <div className="w-20 h-20 rounded-full bg-[#fff7f7] flex items-center justify-center text-4xl">📄</div>
          <h2 className="mt-6 text-2xl font-bold text-[#962a27]">No Invoice Files Logged</h2>
          <p className="mt-2 text-gray-500">All matching upcoming and completed order bills will render here.</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] md:min-w-full">
                <thead className="bg-[#962a27] text-white">
                  <tr>
                    <th className="p-4 text-left text-sm md:text-base">S.No</th>
                    <th className="p-4 text-left text-sm md:text-base">File Token</th>
                    <th className="p-4 text-left text-sm md:text-base">Customer Name</th>
                    <th className="p-4 text-left text-sm md:text-base">Phone</th>
                    <th className="p-4 text-left text-sm md:text-base">Event Setup</th>
                    <th className="p-4 text-left text-sm md:text-base">Target Date</th>
                    <th className="p-4 text-left text-sm md:text-base">Total Value</th>
                    <th className="p-4 text-center text-sm md:text-base">Cloud Bill</th> 
                    <th className="p-4 text-center text-sm md:text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr key={order._id} className="border-b hover:bg-[#fafafa] transition-all text-xs md:text-sm">
                      <td className="p-4 font-semibold">{firstIndex + index + 1}</td>
                      <td className="p-4 font-bold text-gray-600">#BILL-{order._id ? order._id.slice(-6).toUpperCase() : "XXXXXX"}</td>
                      <td className="p-4 font-semibold text-gray-800">{order.customerName}</td>
                      <td className="p-4 text-gray-600">{order.phone}</td>
                      <td className="p-4 font-medium text-gray-800">{order.eventType}</td>
                      <td className="p-4 text-gray-700 font-medium">{order.eventDate}</td>
                      <td className="p-4 font-bold text-[#962a27]">₹ {order.grandTotal?.toLocaleString()}</td>
                      
                      <td className="p-4 text-center">
                        <button onClick={() => handleViewPersonInvoice(order)} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-950 border border-amber-200 hover:bg-amber-200 shadow-sm cursor-pointer transition-all">
                          <FileText size={14} className="text-amber-700" /> Bill PDF
                        </button>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => viewQuickDetails(order)} className="bg-gray-800 hover:bg-gray-900 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1 text-xs font-medium transition-all cursor-pointer">
                            <Eye size={14} /> Details
                          </button>
                          <button onClick={() => handleDelete(order._id)} disabled={deletingId === order._id} className="bg-red-600 hover:bg-red-700 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1 disabled:opacity-70 text-xs font-medium transition-all cursor-pointer">
                            {deletingId === order._id ? <><Loader2 size={14} className="animate-spin" /> ...</> : <><Trash2 size={14} /> Delete</>}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PAGINATION SUITE */}
          {filteredOrders.length > ordersPerPage && (
            <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
              <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 rounded-xl border border-[#962a27] text-[#962a27] font-semibold text-sm disabled:opacity-40 cursor-pointer">Prev</button>
              {[...Array(totalPages)].map((_, index) => (
                <button key={index} onClick={() => setCurrentPage(index + 1)} className={`w-10 h-10 rounded-xl text-sm font-semibold cursor-pointer ${currentPage === index + 1 ? "bg-[#962a27] text-white" : "bg-white border border-gray-200"}`}>{index + 1}</button>
              ))}
              <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 rounded-xl bg-[#962a27] text-white font-semibold text-sm disabled:opacity-40 cursor-pointer">Next</button>
            </div>
          )}
        </>
      )}

      <div className="mt-10 flex justify-center px-4">
        <button onClick={() => navigate(-1)} className="bg-[#962a27] text-white w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all shadow-md text-center cursor-pointer">Back To Dashboard</button>
      </div>
    </div>
  );
};

export default Files;