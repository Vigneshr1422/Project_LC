import axios from "axios";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JSZip from "jszip"; // 🔥 Import for Zip compiler engine
import { saveAs } from "file-saver"; // 🔥 Import for direct file downloader save triggers
import { Trash2, Loader2, Eye, Calendar, User, Phone, FileText, FolderArchive } from "lucide-react";

const Files = () => {
  const navigate = useNavigate();

  /* ========================= STATES ========================== */
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);
  const [isZipLoading, setIsZipLoading] = useState(false); // 🔥 ZIP compilation loader tracker
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

  /* ========================= 🔥 BULK ZIP DOWNLOAD ENGINE ========================== */
  const handleDownloadAllAsZip = async () => {
    // PDF Generated aana links list variable filter panrom
    const ordersWithInvoice = filteredOrders.filter(o => o.invoicePdfDriveLink);

    if (ordersWithInvoice.length === 0) {
      Swal.fire({
        icon: "info",
        title: "No Invoices Ready",
        text: "There are no generated base64 invoices setup in the active search log list to compile.",
        confirmButtonColor: "#962a27"
      });
      return;
    }

    try {
      setIsZipLoading(true);
      const zip = new JSZip();
      const folder = zip.folder("Lakshmi_Catering_Invoices");

      ordersWithInvoice.forEach((order) => {
        const base64Data = order.invoicePdfDriveLink;
        
        // Base64 Data URI header details meta tag data-va split panrom (e.g. data:application/pdf;base64,...)
        if (base64Data.includes("base64,")) {
          const pureBase64 = base64Data.split("base64,")[1];
          const fileName = `Invoice_${order.customerName.trim().replace(/\s+/g, "_")}_${order.eventDate}.pdf`;
          
          // Injecting document data cleanly inside virtual zip directory folder block
          folder.file(fileName, pureBase64, { base64: true });
        }
      });

      // Generating client content package
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `Lakshmi_Invoices_Archive_${new Date().toISOString().slice(0, 10)}.zip`);

      Swal.fire({
        icon: "success",
        title: "ZIP Downloaded!",
        text: `Successfully bundled ${ordersWithInvoice.length} bill invoices copy!`,
        confirmButtonColor: "#962a27"
      });

    } catch (err) {
      console.error("ZIP Generation Error: ", err);
      Swal.fire({
        icon: "error",
        title: "Compilation Error",
        text: "Failed to zip payload database records.",
        confirmButtonColor: "#962a27"
      });
    } finally {
      setIsZipLoading(false);
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
/* ========================= SPECIFIC INVOICE COPY HANDLER ========================== */
  const handleViewPersonInvoice = (order) => {
    // 🎯 பிக்ஸ்: டேட்டாபேஸில் பிடிஎஃப் லிங்க் இல்லை என்றாலும், இருக்கும் டேட்டாவை வச்சு 
    // நாமே பிடிஎஃப் பிரிவியூ பக்கத்திற்கு டேட்டாவை கடத்துகிறோம்!
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
          packagePrice: order.packageCost / (order.guests || 1), // சிங்கிள் பிளேட் ரேட் கணக்கு
        },
        grandTotal: order.grandTotal,
        serviceCharge: order.serviceCharge,
        deliveryCharge: order.deliveryCharge,
        staffCount: order.staffCount,
        staffRequired: order.staffRequired,
        paymentId: order.razorpayPaymentId || "N/A",
        tokenAdvanceAmount: order.advancePaid,
        isFromFilesPage: true // 💡 இந்த பேஜில் இருந்து போறோம்னு ஒரு பிளாக் அனுப்புறோம்
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
        Swal.fire({
          icon: "success",
          title: "File Purged Successfully",
          timer: 2000,
          showConfirmButton: false,
        });
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

        {/* 🔥 NEW CONTROLS: ZIP BULK EXPORTER BUTTON */}
        <button
          onClick={handleDownloadAllAsZip}
          disabled={isZipLoading || filteredOrders.length === 0}
          className="bg-gradient-to-r from-amber-700 to-[#962a27] text-white px-5 py-3.5 rounded-xl font-bold text-sm shadow-md hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-40 flex items-center justify-center gap-2 self-start lg:self-center"
        >
          {isZipLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <FolderArchive size={18} />
          )}
          {isZipLoading ? "Bundling Invoices..." : "Download All as ZIP (.zip)"}
        </button>
      </div>

      {/* SYSTEM SEARCH AND FILTERS BUTTON BAR */}
      <div className="mb-6 flex flex-col lg:flex-row gap-3">
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
          placeholder={`Search invoices by ${searchBy === "customerName" ? "Customer Name" : searchBy}`}
          className="border border-gray-300 rounded-xl px-4 py-3 flex-1 w-full focus:outline-none focus:border-[#962a27] bg-white shadow-xs"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-3 bg-white font-medium text-gray-700 w-full lg:w-auto focus:outline-none focus:border-[#962a27]"
        >
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
          {/* DESKTOP MATRIX TABLE VIEW */}
          <div className="hidden md:block bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#962a27] text-white">
                  <tr>
                    <th className="p-5 text-left">S.No</th>
                    <th className="p-5 text-left">File Token</th>
                    <th className="p-5 text-left">Customer Name</th>
                    <th className="p-5 text-left">Phone</th>
                    <th className="p-5 text-left">Event Setup</th>
                    <th className="p-5 text-left">Target Date</th>
                    <th className="p-5 text-left">Total Value</th>
                    <th className="p-5 text-center">Cloud Bill</th> 
                    <th className="p-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order, index) => (
                    <tr key={order._id} className="border-b hover:bg-[#fafafa] transition-all">
                      <td className="p-5 font-semibold">{firstIndex + index + 1}</td>
                      <td className="p-5 font-bold text-gray-600">#BILL-{order._id ? order._id.slice(-6).toUpperCase() : "XXXXXX"}</td>
                      <td className="p-5 font-semibold text-gray-800">{order.customerName}</td>
                      <td className="p-5 text-gray-600">{order.phone}</td>
                      <td className="p-5 font-medium text-gray-800">{order.eventType}</td>
                      <td className="p-5 text-gray-700 font-medium">{order.eventDate}</td>
                      <td className="p-5 font-bold text-[#962a27]">₹ {order.grandTotal?.toLocaleString()}</td>
                      
                     {/* டேபிளுக்குள் இருக்கும் Cloud Bill பட்டன் திருத்தம் */}
<td className="p-5 text-center">
  <button
    onClick={() => handleViewPersonInvoice(order)}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-950 border border-amber-200 hover:bg-amber-200 shadow-sm cursor-pointer transition-all"
  >
    <FileText size={14} className="text-amber-700" />
    Bill PDF
  </button>
</td>

                      <td className="p-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => viewQuickDetails(order)}
                            className="bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm transition-all"
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

          {/* MOBILE MATRIX LAYOUT CARDS VIEW */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {currentOrders.map((order, index) => (
              <div key={order._id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col gap-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-xs font-bold text-gray-400">S.No: {firstIndex + index + 1}</span>
                  <span className="font-bold text-sm text-gray-600">#BL-{order._id ? order._id.slice(-6).toUpperCase() : "XXXXXX"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-800 font-semibold text-base">
                  <User size={16} className="text-[#962a27]" /> {order.customerName}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center gap-1"><Phone size={14} /> {order.phone}</div>
                  <div className="flex items-center gap-1 font-medium text-gray-800"><Calendar size={14} /> {order.eventDate}</div>
                </div>
                
                <div className="bg-[#fff7f7] p-3 rounded-xl flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-400 block">Setup</span>
                    <span className="font-semibold text-sm text-gray-800">{order.eventType}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block">Grand Total</span>
                    <span className="font-bold text-[#962a27] text-sm">₹ {order.grandTotal?.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => viewQuickDetails(order)}
                    className="bg-gray-800 hover:bg-gray-900 text-white flex-1 py-2.5 rounded-xl flex items-center justify-center gap-1 font-medium text-sm transition-all"
                  >
                    <Eye size={16} /> Details
                  </button>

                  <button
                    onClick={() => handleViewPersonInvoice(order)}
                    className={`p-2.5 rounded-xl flex items-center justify-center border transition-all ${
                      order.invoicePdfDriveLink 
                        ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100" 
                        : "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                    }`}
                    disabled={!order.invoicePdfDriveLink}
                  >
                    <FileText size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(order._id)}
                    disabled={deletingId === order._id}
                    className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-xl flex items-center justify-center disabled:opacity-70 transition-all"
                  >
                    {deletingId === order._id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION SUITE */}
          {filteredOrders.length > ordersPerPage && (
            <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl border border-[#962a27] text-[#962a27] font-semibold text-sm disabled:opacity-40"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  onKey={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold ${
                    currentPage === index + 1 ? "bg-[#962a27] text-white" : "bg-white border border-gray-200"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl bg-[#962a27] text-white font-semibold text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* DASHBOARD ACTIONS FOOTER */}
      <div className="mt-10 flex justify-center px-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#962a27] text-white w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all shadow-md text-center"
        >
          Back To Dashboard
        </button>
      </div>
    </div>
  );
};

export default Files;