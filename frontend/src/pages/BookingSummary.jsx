import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  User, Phone, Calendar, Users, MapPin, Utensils, Briefcase, 
  ChevronLeft, Receipt, Truck, UserCheck, Loader2, ArrowRight, Languages, Sparkles, CheckCircle 
} from "lucide-react";
import Logo from "../Images/Logo.webp";

const BookingSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, totalAmount = 0 } = location.state || {};
  const [staffRequired, setStaffRequired] = useState("No");
  const [staffCount, setStaffCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("menu"); // 'menu' or 'details'
  
  const [translatedAddress, setTranslatedAddress] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  // Razorpay SDK Integration
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Google Translation Hook
  useEffect(() => {
    if (formData && formData.address) {
      const translateText = async () => {
        setIsTranslating(true);
        try {
          const sourceText = formData.address;
          const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ta&dt=t&q=${encodeURIComponent(sourceText)}`
          );
          const data = await response.json();
          if (data && data[0]) {
            const combinedResult = data[0].map(item => item[0]).join("");
            setTranslatedAddress(combinedResult);
          } else {
            setTranslatedAddress(formData.address);
          }
        } catch (error) {
          console.error("Translation Exception:", error);
          setTranslatedAddress(formData.address);
        } finally {
          setIsTranslating(false);
        }
      };
      translateText();
    }
  }, [formData]);

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
        <div className="text-center bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">
          <p className="text-gray-600 mb-6 font-semibold">No booking details found in current session.</p>
          <button 
            onClick={() => navigate("/booking")} 
            className="w-full bg-[#962A27] hover:bg-[#7a201e] text-white px-8 py-3.5 rounded-2xl font-bold shadow-lg shadow-[#962A27]/20 active:scale-95 transition-all cursor-pointer"
          >
            Go Back To Booking
          </button>
        </div>
      </div>
    );
  }

  const freeDeliveryLocations = ["Karaikudi", "Ariyakudi"];
  const deliveryCharge = freeDeliveryLocations.includes(formData.city) ? 0 : 1000;
  const serviceCharge = staffRequired === "Yes" ? staffCount * 800 : 0;
  const packageCost = totalAmount;
  const grandTotal = packageCost + serviceCharge + deliveryCharge;
  const tokenAdvanceAmount = Math.floor(grandTotal * 0.5);
  const packageItems = formData.packageItems || [];

  const handleRazorpayPayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK script failed to load. Check network routing.");
      return;
    }
    setLoading(true);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: tokenAdvanceAmount * 100,
      currency: "INR",
      name: "Lakshmi Catering",
      description: "50% Booking Advance Transaction",
      image: Logo,
      handler: function (response) {
        setLoading(false);
        navigate("/payment-success", {
          state: {
            paymentId: response.razorpay_payment_id,
            formData: {
              ...formData,
              staffRequired,
              staffCount,
              serviceCharge,
              deliveryCharge,
              translatedAddress
            },
            grandTotal,
            tokenAdvanceAmount,
            invoicePdfDriveLink: formData.invoicePdfDriveLink || ""
          }
        });
      },
      prefill: {
        name: formData.name || "",
        contact: formData.phone || "",
        email: "customer@example.com"
      },
      theme: { color: "#962A27" },
      modal: {
        ondismiss: () => setLoading(false)
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-6 sm:py-10 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Top Header & Progress Stepper */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 transition-all text-xs sm:text-sm font-bold border border-gray-200/60 self-start cursor-pointer"
          >
            <ChevronLeft size={16} /> Back to Packages
          </button>
          
         
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          
          {/* LEFT SECTION (7 COLS) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Interactive Tab Switcher Card */}
            <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
              
              {/* Header Title */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Order Details</h1>
                  <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">Review event specifications & custom menu.</p>
                </div>
                <span className={`px-3 py-1 rounded-xl text-xs font-black ${formData.preference === 'Veg' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                  {formData.preference === 'Veg' ? '🌱 Veg' : '🍗 Non-Veg'}
                </span>
              </div>

              {/* Tab Toggle */}
              <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                <button
                  onClick={() => setActiveTab("menu")}
                  className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                    activeTab === "menu" ? "bg-white text-[#962A27] shadow-sm" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  🥗 Package Menu ({packageItems.length})
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                    activeTab === "details" ? "bg-white text-[#962A27] shadow-sm" : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  📍 Event Specs & Address
                </button>
              </div>

              {/* TAB 1: MENU ITEMS */}
              {activeTab === "menu" && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/50 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-amber-800 font-extrabold uppercase tracking-wider block">Selected Package</span>
                      <h3 className="text-lg font-black text-amber-950 mt-0.5">{formData.packageName}</h3>
                    </div>
                    <Utensils className="text-amber-600" size={24} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[350px] overflow-y-auto custom-scroll pr-1">
                    {packageItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100/80 hover:border-gray-200 transition-all">
                        <div className="w-7 h-7 rounded-xl bg-white border border-gray-200 text-[#962A27] font-mono text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
                          {idx + 1}
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-gray-800 capitalize">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: EVENT DETAILS */}
              {activeTab === "details" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  {/* Grid Specs */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <DetailBadge label="Customer" value={formData.name} icon={<User size={14} />} />
                    <DetailBadge label="Phone" value={formData.phone} icon={<Phone size={14} />} />
                    <DetailBadge label="Event Date" value={formData.date} icon={<Calendar size={14} />} />
                    <DetailBadge label="Guests" value={`${formData.guests} Pax`} icon={<Users size={14} />} />
                    <DetailBadge label="Location" value={`${formData.city}, ${formData.district}`} icon={<MapPin size={14} />} />
                  </div>

                  {/* Address & Tamil Translation */}
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5 mb-2">
                      <Languages size={14} className="text-[#962A27]" /> Event Location (Auto Tamil Localization)
                    </span>
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200/80 text-gray-800 text-xs sm:text-sm leading-relaxed font-bold uppercase">
                      {isTranslating ? (
                        <div className="flex items-center gap-2 text-gray-500 py-1">
                          <Loader2 size={16} className="animate-spin text-[#962A27]" />
                          <span>முகவரியை மொழிபெயர்க்கிறது...</span>
                        </div>
                      ) : (
                        translatedAddress
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Service Staff Option Card */}
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
                    <Briefcase size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Serving Personnel</h3>
                    <p className="text-xs text-gray-400 font-medium">Add professional service staff</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => { setStaffRequired("No"); setStaffCount(0); }}
                  className={`p-3.5 rounded-2xl border text-xs font-black transition-all cursor-pointer ${
                    staffRequired === "No" 
                      ? "bg-[#962A27] border-[#962A27] text-white shadow-md shadow-[#962A27]/20" 
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  No Staff Needed
                </button>
                <button
                  onClick={() => { setStaffRequired("Yes"); if (staffCount === 0) setStaffCount(1); }}
                  className={`p-3.5 rounded-2xl border text-xs font-black transition-all cursor-pointer ${
                    staffRequired === "Yes" 
                      ? "bg-[#962A27] border-[#962A27] text-white shadow-md shadow-[#962A27]/20" 
                      : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"
                  }`}
                >
                  Require Staff
                </button>
              </div>

              {staffRequired === "Yes" && (
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60 space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-amber-900">Staff Count:</span>
                    <div className="flex items-center gap-3 bg-white px-3 py-1 rounded-xl border border-amber-200 shadow-sm">
                      <button 
                        onClick={() => setStaffCount(Math.max(1, staffCount - 1))}
                        className="text-gray-500 hover:text-[#962A27] font-bold text-base px-2"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm font-black text-gray-900 w-5 text-center">{staffCount}</span>
                      <button 
                        onClick={() => setStaffCount(staffCount + 1)}
                        className="text-gray-500 hover:text-[#962A27] font-bold text-base px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-[11px] text-amber-800 font-semibold leading-relaxed">
                    * Additional ₹800 per serving staff member will be calculated.
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT SECTION - BILLING SIDEBAR (5 COLS) */}
          <div className="lg:col-span-5 space-y-6 text-left">
  
  {/* 💳 Modern Slate Glass Receipt Card (No Red) */}
  <div className="relative bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/60 border border-slate-200/80 overflow-hidden">
    
    {/* Subtle Background Watermark */}
    
    {/* Header Status Tag */}
    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6 relative z-10">
      <div className="flex items-center gap-2.5">
        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
          <Receipt size={18} />
        </div>
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Payment Breakdown</h3>
          <p className="text-[11px] text-slate-400 font-medium">Final Price Summary</p>
        </div>
      </div>
      <span className="text-[10px] font-mono font-extrabold uppercase bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200">
        INR (₹)
      </span>
    </div>

    {/* Line Items */}
    <div className="space-y-4 relative z-10">
      
      {/* Light Row Items Component */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2.5 text-slate-500 font-semibold">
          <Utensils size={15} className="text-slate-400" />
          <span>Base Package</span>
        </div>
        <span className="font-mono font-bold text-slate-900">₹{packageCost.toLocaleString("en-IN")}</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2.5 text-slate-500 font-semibold">
          <UserCheck size={15} className="text-slate-400" />
          <span>Service Staff</span>
        </div>
        <span className="font-mono font-bold text-slate-900">₹{serviceCharge.toLocaleString("en-IN")}</span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2.5 text-slate-500 font-semibold">
          <Truck size={15} className="text-slate-400" />
          <span>Logistics Charge</span>
        </div>
        <span className="font-mono font-bold text-slate-900">
          {deliveryCharge === 0 ? (
            <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-2.5 py-0.5 rounded-full border border-emerald-200">FREE</span>
          ) : (
            `₹${deliveryCharge.toLocaleString("en-IN")}`
          )}
        </span>
      </div>

      {/* ✂️ Voucher Dotted Cut Line */}
      <div className="relative my-5 py-2 flex items-center justify-between">
        <div className="absolute -left-10 w-6 h-6 bg-[#F8FAFC] rounded-full shadow-inner border-r border-slate-200"></div>
        <div className="w-full border-t-2 border-dashed border-slate-200"></div>
        <div className="absolute -right-10 w-6 h-6 bg-[#F8FAFC] rounded-full shadow-inner border-l border-slate-200"></div>
      </div>

      {/* Advance Token Highlight Box (Emerald Green) */}
      <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider block">Payable Token (50%)</span>
          <span className="text-[11px] text-emerald-600/90 font-semibold">Lock booking now</span>
        </div>
        <span className="font-mono text-xl font-black text-emerald-700">₹{tokenAdvanceAmount.toLocaleString("en-IN")}</span>
      </div>

      {/* Grand Total Value */}
      <div className="pt-2 flex items-baseline justify-between">
        <div>
          <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px] block">Grand Total Event Value</span>
          <p className="text-[11px] text-slate-400 font-medium">Inclusive of all services</p>
        </div>
        <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-slate-900">
          ₹{grandTotal.toLocaleString("en-IN")}
        </span>
      </div>
    </div>

    {/* Modern High-Contrast Payment CTA */}
    <button
  disabled={loading || isTranslating}
  onClick={handleRazorpayPayment}
  className="w-full mt-7 bg-gradient-to-r from-[#962A27] to-[#7a201e] hover:from-[#822421] hover:to-[#681b1a] active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 px-6 rounded-2xl shadow-xl shadow-[#962A27]/25 transition-all flex items-center justify-between text-xs sm:text-sm tracking-wider uppercase cursor-pointer group"
>
      {loading ? (
        <div className="flex items-center justify-center gap-2 w-full">
          <Loader2 size={18} className="animate-spin text-white" />
          <span>Linking Razorpay...</span>
        </div>
      ) : (
        <>
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-slate-400 font-bold">50% Advance Token</span>
            <span className="text-amber-400">Pay ₹{tokenAdvanceAmount.toLocaleString("en-IN")}</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <ArrowRight size={18} className="text-white" />
          </div>
        </>
      )}
    </button>
  </div>

  {/* Security Trust Badge */}
 

</div>

        </div>
      </div>
    </div>
  );
};

// UI Helper Components
const DetailBadge = ({ icon, label, value }) => (
  <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100/80">
    <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-black uppercase tracking-wider mb-1">
      <span className="text-[#962A27]">{icon}</span> {label}
    </div>
    <p className="text-xs sm:text-sm font-black text-gray-800 truncate">{value || "N/A"}</p>
  </div>
);

const BillItem = ({ label, value, icon, isFree = false }) => (
  <div className="flex items-center justify-between text-white/90">
    <div className="flex items-center gap-2 text-white/70">
      {icon}
      <span className="text-xs sm:text-sm font-bold">{label}</span>
    </div>
    <span className="font-mono text-sm sm:text-base font-black">
      {isFree ? (
        <span className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">Free</span>
      ) : (
        value
      )}
    </span>
  </div>
);

export default BookingSummary;