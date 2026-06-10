import Loader from "../components/Loader";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Calendar,
  Users,
  MapPin,
  Utensils,
  Briefcase,
  ChevronLeft,
  Receipt,
  Truck,
  UserCheck,
  Loader2,
  ArrowRight
} from "lucide-react";
import Logo from "../Images/Logo.webp";

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { formData, totalAmount = 0 } = location.state || {};
  const [staffRequired, setStaffRequired] = useState("No");
  const [staffCount, setStaffCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // Dynamically load Razorpay SDK onto window context
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center bg-white p-6 sm:p-10 rounded-3xl shadow-xl max-w-md w-full">
          <p className="text-gray-600 mb-6 font-medium">No booking data found.</p>
          <button
            onClick={() => navigate("/booking")}
            className="w-full bg-[#962A27] text-white px-8 py-3 rounded-2xl font-bold hover:bg-[#7A1F1D] transition-all shadow-lg active:scale-95"
          >
            Go Back To Booking
          </button>
        </div>
      </div>
    );
  }

  // Metrics Logic Breakdown Parameters
  const freeDeliveryLocations = ["Karaikudi", "Ariyakudi"];
  const deliveryCharge = freeDeliveryLocations.includes(formData.city) ? 0 : 1000;
  const serviceCharge = staffRequired === "Yes" ? staffCount * 800 : 0;
  const packageCost = totalAmount;
  
  // Total calculated grand balance ledger metrics
  const grandTotal = packageCost + serviceCharge + deliveryCharge;
  
  // Dynamic 50% advance token calculation engine values
  const tokenAdvanceAmount = Math.floor(grandTotal * 0.5); 
  const packageItems = formData.packageItems || [];

  // DIRECT INTEGRATED RAZORPAY HANDLER POPUP FUNCTION
  const handleRazorpayPayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK script failed to load. Check network routing.");
      return;
    }

    setLoading(true);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Test Key ID from .env
      amount: tokenAdvanceAmount * 100, // Grand Total 50% Advance in subunits (Paise)
      currency: "INR",
      name: "Lakshmi Catering",
      description: "50% Booking Advance Transaction",
     image: "/favicon.svg",
      // BookingSummary.jsx உள்ளே இருக்கும் handleRazorpayPayment-ன் சின்க் பிளாக்:
handler: async function (response) {
  setLoading(true);
  try {
    const serverResponse = await fetch("http://localhost:5000/api/booking1/save-confirmed-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        formData: formData, 
        grandTotal: grandTotal, 
        tokenAdvanceAmount: tokenAdvanceAmount, 
        paymentId: response.razorpay_payment_id, 
        serviceCharge: serviceCharge, 
        deliveryCharge: deliveryCharge, 
        staffCount: staffCount, 
        staffRequired: staffRequired, 
        totalAmount: totalAmount 
      })
    });
    
    const dbResult = await serverResponse.json();
    setLoading(false);
    
    if (dbResult.success) {
      // PDF-Preview-விற்குச் சென்று அங்கே நேரடியாக பிரிண்ட்/டவுன்லோட் ஆப்ஷனை மட்டும் வழங்குகிறோம்.
      navigate("/pdf-preview", { 
        state: { 
          paymentId: response.razorpay_payment_id, 
          formData: formData, 
          grandTotal: grandTotal, 
          tokenAdvanceAmount: tokenAdvanceAmount, 
          serviceCharge: serviceCharge, 
          deliveryCharge: deliveryCharge, 
          staffCount: staffCount, 
          staffRequired: staffRequired 
        } 
      });
    } else {
      alert(`Database Sync Error: ${dbResult.message}`);
    }
  } catch (err) {
    setLoading(false);
    console.error("Network sync issue:", err);
    alert("⚠️ Payment Successful, but local server syncing failed!");
  }
},
      prefill: {
        name: formData.name || "",
        contact: formData.phone || "",
        email: "customer@example.com"
      },
      notes: {
        city: formData.city,
        address: formData.address,
        staff_count: staffCount.toString(),
        total_order_value: grandTotal.toString()
      },
      theme: {
        color: "#962A27"
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        }
      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      setLoading(false);
      alert(`❌ Payment Failed!\nReason: ${response.error.description}`);
    });
    
    rzp1.open();
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-4 sm:py-8 px-3 sm:px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Navigation */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#962A27] mb-5 sm:mb-6 transition-colors font-semibold text-sm sm:text-base"
        >
          <ChevronLeft size={18} /> Back to Packages
        </button>

        {/* MAIN RESPONSIVE LAYOUT FLOW CONTROL */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* LEFT COLUMN: DETAILS */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            
            {/* Main Header Card */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-[#962A27]/5 rounded-bl-full -mr-6 -mt-6 sm:-mr-10 -mt-10" />
              <div className="relative text-left">
                <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">Review Order</h1>
                <p className="text-sm text-gray-500 mt-1 sm:mt-2 font-medium">Please check your event and menu details below.</p>
              </div>
            </div>

            {/* Customer & Event Info Panel */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 shadow-sm border border-gray-100 text-left">
              <div className="flex items-center gap-3 mb-6 sm:mb-8">
                <div className="p-2.5 sm:p-3 bg-[#962A27]/10 rounded-xl sm:rounded-2xl text-[#962A27]">
                  <User size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Event Details</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 sm:gap-y-8 gap-x-4">
                <DetailItem label="Customer Name" value={formData.name} />
                <DetailItem label="Phone Number" value={formData.phone} />
                <DetailItem label="Event Date" value={formData.date} />
                <DetailItem label="Guests" value={`${formData.guests} Persons`} />
                <DetailItem label="Location" value={`${formData.city}, ${formData.district}`} />
                <DetailItem label="Preference" value={formData.preference} isBadge />
              </div>

              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-200">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Event Address
                </h3>
                <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 border border-gray-100/70">
                  <p className="text-gray-800 text-sm sm:text-base leading-relaxed break-words uppercase font-semibold">
                    {formData.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items Table Wrapper */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 text-left">
              <div className="p-5 sm:p-8 border-b border-gray-50 bg-gray-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 sm:p-3 bg-[#962A27]/10 rounded-xl sm:rounded-2xl text-[#962A27]">
                    <Utensils size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-gray-800">{formData.packageName}</h2>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium mt-0.5">Menu Items Included</p>
                  </div>
                </div>
              </div>

              <div className="max-h-[350px] sm:max-h-[400px] overflow-y-auto custom-scroll">
                <table className="w-full border-collapse">
                  <thead className="sticky top-0 bg-white shadow-sm z-10">
                    <tr className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider border-b border-gray-100">
                      <th className="px-5 sm:px-8 py-3 sm:py-4 text-center w-16 font-bold">#</th>
                      <th className="px-5 sm:px-8 py-3 sm:py-4 text-left font-bold">Item Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 font-bold text-gray-700">
                    {packageItems.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50/60 transition-colors">
                        <td className="px-5 sm:px-8 py-3.5 text-gray-400 text-center font-mono w-16">{index + 1}</td>
                        <td className="px-5 sm:px-8 py-3.5 text-gray-800 capitalize text-sm sm:text-base tracking-tight">{item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: BILLING & STAFF */}
          <div className="space-y-6 sm:space-y-8">
            
            {/* Staff Selection Block */}
            <div className="bg-white rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 shadow-sm border border-gray-100 text-left">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="p-2.5 sm:p-3 bg-blue-50 rounded-xl sm:rounded-2xl text-blue-600">
                  <Briefcase size={20} className="sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">Service Staff</h2>
              </div>
              
              <div className="flex bg-gray-100 p-1 rounded-xl sm:rounded-2xl mb-5 sm:mb-6">
                <button 
                  onClick={() => {
                    setStaffRequired("No");
                    setStaffCount(0);
                  }}
                  className={`flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-black transition-all ${staffRequired === "No" ? "bg-white text-[#962A27] shadow-sm" : "text-gray-500"}`}
                >
                  Not Needed
                </button>
                <button 
                  onClick={() => {
                    setStaffRequired("Yes");
                    if (staffCount === 0) setStaffCount(1);
                  }}
                  className={`flex-1 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-black transition-all ${staffRequired === "Yes" ? "bg-white text-[#962A27] shadow-sm" : "text-gray-500"}`}
                >
                  Required
                </button>
              </div>

              {staffRequired === "Yes" && (
                <div className="space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="text-xs sm:text-sm font-bold text-gray-600 block px-0.5">How many staff members?</label>
                  <input 
                    type="number" 
                    min="1" 
                    value={staffCount === 0 ? "" : staffCount} 
                    onChange={(e) => {
                      const val = e.target.value;
                      setStaffCount(val === "" ? 0 : Math.max(0, Number(val)));
                    }} 
                    className="w-full bg-gray-50 border border-gray-200 focus:border-[#962A27] focus:ring-2 focus:ring-[#962A27]/20 outline-none rounded-xl sm:rounded-2xl p-3.5 font-bold text-gray-800 transition-all text-sm sm:text-base"
                    placeholder="Enter staff count"
                  />
                  <p className="text-[11px] sm:text-xs text-amber-700 bg-amber-50 rounded-xl p-3 font-semibold border border-amber-100/70 leading-relaxed">
                    * ₹800 per person will be added to the total.
                  </p>
                </div>
              )}
            </div>

            {/* Premium Cost Breakdown Summary Card */}
            <div className="w-full bg-[#962A27] rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-7 text-white shadow-xl shadow-[#962A27]/20 relative overflow-hidden text-left transition-all">
              <Receipt className="absolute -right-3 -top-3 w-14 h-14 sm:w-28 sm:h-28 text-white/5 rotate-12 pointer-events-none" />

              <h3 className="text-base sm:text-2xl font-black mb-4 sm:mb-6 relative tracking-tight">
                Cost Breakdown
              </h3>

              <div className="space-y-3 sm:space-y-4 relative">
                <BillRow label="Package Base" icon={<Utensils size={12} />} value={packageCost} />
                <BillRow label="Staff Charges" icon={<UserCheck size={12} />} value={serviceCharge} />
                <BillRow label="Logistics Charges" icon={<Truck size={12} />} value={deliveryCharge} isFree={deliveryCharge === 0} />
                
                {/* 50% Token Advance Indicator Metrics */}
                <div className="flex justify-between items-center text-xs sm:text-sm text-amber-300 font-semibold pt-2 border-t border-white/10">
                  <span>Advance Payable Token (50%):</span>
                  <span className="font-mono text-sm sm:text-base font-black">₹{tokenAdvanceAmount.toLocaleString("en-IN")}</span>
                </div>

                {/* Final Balance Total Card */}
                <div className="pt-4 border-t border-white/20">
                  <p className="text-white/60 font-black uppercase tracking-wider text-[9px] sm:text-xs">
                    Total Event Amount
                  </p>
                  <div className="flex justify-between items-end mt-1">
                    <span className="text-xl sm:text-3xl md:text-4xl font-black italic tracking-tight text-white font-mono whitespace-nowrap">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* INTEGRATED: Proceed to Pay Button directly connecting Razorpay Framework */}
              <button
                disabled={loading}
                onClick={handleRazorpayPayment}
                className="w-full mt-6 bg-amber-400 hover:bg-amber-500 disabled:bg-amber-400/50 disabled:cursor-not-allowed text-gray-900 font-black py-3 sm:py-4 rounded-xl sm:rounded-[1.2rem] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 text-xs sm:text-base tracking-wider uppercase font-extrabold"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Connecting Gateway...
                  </>
                ) : (
                  <>
                    <span>Proceed to Pay Advance (₹{tokenAdvanceAmount.toLocaleString("en-IN")})</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Detail Item view component
const DetailItem = ({ label, value, isBadge = false }) => (
  <div className="space-y-1.5 min-w-0">
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{label}</p>
    {isBadge ? (
      <div className="mt-1">
        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black tracking-wide ${value === 'Veg' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
          {value === 'Veg' ? '🌱 Veg' : '🍗 Non-Veg'}
        </span>
      </div>
    ) : (
      <p className="font-black text-gray-800 text-base sm:text-lg truncate leading-tight">{value || "N/A"}</p>
    )}
  </div>
);

// Reusable Summary Bill row data block cell
const BillRow = ({ label, value, icon, isFree = false }) => (
  <div className="flex justify-between items-center font-bold text-sm sm:text-base">
    <div className="flex items-center gap-2.5 text-white/80 min-w-0">
      <div className="shrink-0 text-white/60">{icon}</div>
      <span className="text-xs sm:text-sm font-semibold truncate text-white/90">{label}</span>
    </div>
    <span className="font-mono text-sm sm:text-base font-black shrink-0">
      {isFree ? (
        <span className="bg-white/20 text-white text-[10px] sm:text-xs font-black px-2 py-0.5 rounded uppercase tracking-wide">Free</span>
      ) : (
        `₹${value.toLocaleString("en-IN")}`
      )}
    </span>
  </div>
);

export default BookingSummary;