import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Calendar, Loader2, Eye, Download, Receipt, Printer, Sparkles } from "lucide-react";
import axios from "axios";
import html2pdf from "html2pdf.js";

// 🎯 உன்னோட specialMenus டேட்டாவை இங்கே இம்போர்ட் செய்கிறோம்
import specialMenus from "../data/SpecialMenus";
import Logo from "../Images/Logo.webp";

// 🎯 Custom மற்றும் Package இரண்டையும் பிரித்துப் பார்த்து, தமிழ் பெயரைத் துல்லியமாக எடுக்கும் ஸ்மார்ட் Helper
const findItemDetails = (itemInput, formData) => {
  let inputName = "";
  let userCount = null;
  
  if (!itemInput) return { name: "—", price: "—", count: "—", total: "—", isCustom: false };
  
  if (typeof itemInput === "object") {
    inputName = itemInput.ta || itemInput.en || itemInput.name || itemInput.itemName || "";
    userCount = itemInput.count !== undefined ? itemInput.count : (itemInput.quantity !== undefined ? itemInput.quantity : null);
  } else {
    inputName = itemInput;
  }
  
  if (typeof inputName !== "string") {
    inputName = String(inputName || "");
  }
  
  const searchName = inputName.trim().toLowerCase();
  let matchedItem = null;
  let isCustomOrder = false;
  
  // 1️⃣ Custom Orders: Breakfast, Lunch, Dinner-ல் தேடுகிறது
  const customCategories = ["Breakfast", "Lunch", "Dinner"];
  for (const category of customCategories) {
    if (specialMenus[category] && Array.isArray(specialMenus[category])) {
      for (const subCat of specialMenus[category]) {
        if (subCat && Array.isArray(subCat.items)) {
          for (const item of subCat.items) {
            const itemEn = item && item.en ? item.en.toLowerCase() : "";
            const itemTa = item && item.ta ? item.ta.toLowerCase() : "";
            if (itemEn === searchName || itemTa === searchName) {
              matchedItem = item;
              isCustomOrder = true;
              break;
            }
          }
        }
        if (matchedItem) break;
      }
    }
    if (matchedItem) break;
  }
  
  // 2️⃣ Packages: VegPackages, NonVegPackages-ல் உள்ளே இருக்கும் ஐட்டங்களில் தேடி தமிழ் பெயரை எடுக்கிறது
  if (!matchedItem) {
    const packageCategories = ["VegPackages", "NonVegPackages"];
    for (const category of packageCategories) {
      if (specialMenus[category] && Array.isArray(specialMenus[category])) {
        for (const pkg of specialMenus[category]) {
          if (pkg && Array.isArray(pkg.items)) {
            for (const item of pkg.items) {
              const itemEn = item && item.en ? item.en.toLowerCase() : "";
              const itemTa = item && item.ta ? item.ta.toLowerCase() : "";
              if (itemEn === searchName || itemTa === searchName) {
                matchedItem = item;
                isCustomOrder = false;
                break;
              }
            }
          }
          if (matchedItem) break;
        }
      }
      if (matchedItem) break;
    }
  }
  
  if (userCount === null && matchedItem && formData) {
    userCount = formData[matchedItem.en] || formData[matchedItem.ta] || formData[inputName];
  }
  
  if (userCount === null || userCount === undefined || userCount === "") {
    userCount = formData?.guests || 1;
  }
  
  const finalCountNum = parseInt(userCount) || 1;
  const finalDisplayName = matchedItem ? (matchedItem.ta || matchedItem.en) : inputName;
  
  if (isCustomOrder && matchedItem) {
    return {
      name: finalDisplayName,
      price: `₹${matchedItem.price}.00`,
      count: finalCountNum,
      total: `₹${(matchedItem.price * finalCountNum).toLocaleString("en-IN")}.00`,
      isCustom: true
    };
  }
  
  return { name: finalDisplayName, price: "—", count: finalCountNum, total: "—", isCustom: false };
};

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef(null);
  
  const [isSyncing, setIsSyncing] = useState(true);
  const [syncError, setSyncError] = useState(null);
  const [isPdfLoading, setIsPdfLoading] = useState(false);
  const [showPdfPreview, setShowPdfPreview] = useState(false);
  const hasFired = useRef(false);

  const { paymentId, formData, grandTotal = 0, tokenAdvanceAmount = 0, invoicePdfDriveLink = null } = location.state || {};
  const remainingAmount = grandTotal - tokenAdvanceAmount;

  // Sync Booking To Server & Meta WhatsApp Notification Trigger Hooks
  useEffect(() => {
    if (hasFired.current) return;
    if (formData && paymentId) {
      const syncBookingToBackend = async () => {
        try {
          hasFired.current = true;
          setIsSyncing(true);
          
          const payload = {
            customerName: formData.name,
            phone: formData.phone,
            eventDate: formData.date,
            guests: formData.guests,
            district: formData.district || "Sivagangai",
            city: formData.city,
            address: formData.address,
            translatedAddress: formData.translatedAddress || formData.address,
            eventType: formData.eventType || "Marriage",
            session: formData.session || "Lunch",
            preference: formData.preference || "Veg",
            bookingType: formData.bookingType || "Custom",
            packageId: formData.selectedPackageId || "",
            packageName: formData.packageName || "Custom Menu",
            packageItems: formData.packageItems || [],
            grandTotal: grandTotal,
            advancePaid: tokenAdvanceAmount,
            balanceAmount: remainingAmount,
            invoicePdfDriveLink: invoicePdfDriveLink,
            serviceCharge: formData.serviceCharge || 0,
            deliveryCharge: formData.deliveryCharge || 0,
            staffCount: formData.staffCount || 0,
            staffRequired: formData.staffRequired || "No",
            paymentId: paymentId
          };

          const backendUrl = "http://127.0.0.1:5000/api/booking1/save-confirmed-booking";
          console.log("🚀 Firing payload to Local Server for Meta WhatsApp trigger...");
          const response = await axios.post(backendUrl, payload);
          
          if (response.data.success) {
            console.log("✅ [System Sync] Booking saved & WhatsApp message dispatched!");
            setIsSyncing(false);
          }
        } catch (error) {
          console.error("❌ [System Sync Error] Failed to trigger WhatsApp:", error);
          setSyncError(error.message);
          setIsSyncing(false);
        }
      };
      syncBookingToBackend();
    }
  }, [formData, paymentId, grandTotal, tokenAdvanceAmount, remainingAmount, invoicePdfDriveLink]);

  if (!formData || !paymentId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center bg-white p-6 rounded-3xl shadow-xl max-w-md w-full">
          <p className="text-gray-600 mb-6 font-medium">No success transaction logs found.</p>
          <button onClick={() => navigate("/booking")} className="w-full bg-[#962A27] text-white py-3 rounded-xl font-bold">
            Back to Home Booking
          </button>
        </div>
      </div>
    );
  }

  // MUST UNDERSTAND: Calculating structural configurations for the multi-page A4 matrix compilation
  const totalGuests = parseInt(formData?.guests) || 1;
  const extraGuestsCount = parseInt(formData?.staffCount) || 0;
  const rawBaseCost = formData?.packagePrice ? (formData.packagePrice * totalGuests) : (grandTotal - (formData?.serviceCharge || 0) - (formData?.deliveryCharge || 0));
  const unitPriceCalculated = formData?.packagePrice || Math.floor(rawBaseCost / totalGuests);
  const packageItems = formData?.packageItems || [];
  
  const currentMonthStr = String(new Date().getMonth() + 1).padStart(2, '0');
  const uniqueSequence = String(new Date().getTime()).slice(-4);
  const invoiceNumber = `LC${currentMonthStr}${uniqueSequence}`;
  
  const currentDate = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" });
  const rawUserDate = formData?.date || formData?.eventDate;
  const userEventDate = rawUserDate ? (typeof rawUserDate === "string" && rawUserDate.includes("-") ? rawUserDate.split("-").reverse().join("/") : rawUserDate) : "—";

  // Dynamic pagination chunk distributions for html2pdf compiling alignment 
  const itemPages = [];
  let currentItemsPointer = 0;
  const page1Chunk = packageItems.slice(0, 10);
  itemPages.push(page1Chunk);
  currentItemsPointer = 10;
  while (currentItemsPointer < packageItems.length) {
    const nextChunk = packageItems.slice(currentItemsPointer, currentItemsPointer + 15);
    itemPages.push(nextChunk);
    currentItemsPointer += 15;
  }
  if (itemPages.length === 1) {
    itemPages.push([]);
  }
  const totalPagesCount = itemPages.length;
  const hasCustomItems = packageItems.some(item => findItemDetails(item, formData).isCustom);

  // HTML2PDF Client Render Download Trigger Action Execution Flow
  const handlePrintVerifiedBill = async () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0,
      filename: `Lakshmi_Catering_${invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { scale: 3, useCORS: true, letterRendering: true, logging: false, useOverflow: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'avoid-all'] }
    };
    try {
      setIsPdfLoading(true);
      await html2pdf().set(options).from(element).save();
    } catch (pdfErr) {
      console.error("PDF Engine Render Crash: ", pdfErr);
    } finally {
      setIsPdfLoading(false);
    }
  };

  // Internal Financial Summary Account Subview Block
  const FinancialLedgerBlock = () => {
    const totalFoodAmount = rawBaseCost;
    const additionalAmount = (parseInt(formData?.deliveryCharge) || 0) + (parseInt(formData?.serviceCharge) || 0);
    const extraPersonRate = 800;
    const totalExtraGuestsCost = extraGuestsCount * extraPersonRate;
    
    return (
      <div className="w-full mt-auto">
        <table className="w-full border-collapse border-t border-slate-200 pt-4">
          <tbody>
            <tr>
              <td className="align-top pr-6" style={{ width: "45%" }}>
                <span className="text-[10px] font-black tracking-widest text-slate-400 block mb-2">📝 SPECIAL INSTRUCTIONS</span>
                <div className="text-[11px] text-slate-500 font-semibold space-y-1 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {formData.specialInstructions || formData.notes ? (
                    <p className="whitespace-pre-line m-0">{formData.specialInstructions || formData.notes}</p>
                  ) : (
                    <>
                      <p className="m-0">• High-quality ingredients and hygienic cooking practices will be followed for all menu preparations.</p>
                      <p className="m-0">• Dedicated service staff will ensure timely food service and a seamless dining experience for guests.</p>
                    </>
                  )}
                </div>
              </td>
              <td className="align-top pl-4" style={{ width: "55%" }}>
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-slate-50/50">
                  <div className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 flex justify-between">
                    <span>Account summary</span>
                    <span>Value (INR)</span>
                  </div>
                  <div className="p-3 space-y-2.5 bg-white text-xs font-semibold">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Food Amount</span>
                      <span className="font-mono font-bold text-slate-900">₹{totalFoodAmount.toLocaleString("en-IN")}.00</span>
                    </div>
                    {extraGuestsCount > 0 && (
                      <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 bg-amber-50/50 px-1 rounded">
                        <span className="text-amber-900 font-medium">Extra Headcount (₹{extraPersonRate} × {extraGuestsCount})</span>
                        <span className="font-mono font-bold text-slate-900">₹{totalExtraGuestsCost.toLocaleString("en-IN")}.00</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Additional Amount (Logistics)</span>
                      <span className="font-mono font-bold text-slate-900">₹{additionalAmount.toLocaleString("en-IN")}.00</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Advance Received</span>
                      <span className="font-mono font-bold text-emerald-600">- ₹{tokenAdvanceAmount.toLocaleString("en-IN")}.00</span>
                    </div>
                    <div className="flex justify-between items-center pt-1 font-black">
                      <span className="text-[10px] uppercase text-slate-500 tracking-wider">Balance Amount</span>
                      <span className="font-mono text-base text-[#962A27]">₹{remainingAmount.toLocaleString("en-IN")}.00</span>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <table className="w-full border-collapse mt-8 text-xs font-bold text-slate-700 mb-2">
          <tbody>
            <tr>
              <td className="align-bottom pb-1" style={{ width: "50%" }}>
                <div className="h-[1px] w-20 bg-slate-300 mb-2" />
                <p className="text-slate-400 text-[9px] uppercase tracking-widest m-0">Client Endorsement</p>
              </td>
              <td className="text-right align-bottom pb-1" style={{ width: "50%" }}>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mb-8 m-0">Authorized Executive</p>
                <p className="text-black font-black uppercase text-xs border-t border-black pt-1.5 m-0">லெட்சுமி கேட்டரிங்</p>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div className="text-center border-t border-slate-100 pt-2 w-full mt-2">
          <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest m-0 space-x-3">
            <span>TASTE</span> • <span>TRADITION</span> • <span>ABSOLUTE QUALITY</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 flex flex-col justify-center items-center select-none">
      {/* MASTER FLEX CONTAINER GRID WRAPPER */}
      <div className={`w-full max-w-md ${showPdfPreview ? 'lg:max-w-7xl lg:grid lg:grid-cols-12' : 'lg:max-w-md'} gap-8 transition-all duration-500`}>
        
        {/* LEFT COMPONENT COLUMN: Payment Transaction Logs Panel */}
        <div className={`bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden text-left flex flex-col justify-between h-fit w-full max-w-md mx-auto ${showPdfPreview ? 'lg:col-span-4' : ''}`}>
          <div>
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-8 text-center relative">
              <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
              <div className="inline-flex p-3 bg-white/20 backdrop-blur-md rounded-full text-white mb-3">
                <CheckCircle2 size={40} />
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">Booking Confirmed!</h1>
              <div className="text-green-100 text-xs mt-1 font-medium flex items-center justify-center gap-1.5">
                {isSyncing ? (
                  <>
                    <Loader2 size={12} className="animate-spin text-amber-300" />
                    <span>Triggering Meta WhatsApp Messages...</span>
                  </>
                ) : syncError ? (
                  <span className="text-rose-200">⚠️ Live Sync Failed. Check terminal.</span>
                ) : (
                  <span className="text-white font-semibold">✅ Order Alerts Dispatched to WhatsApp!</span>
                )}
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3.5">
                <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                  <span>Total Catering Value:</span>
                  <span className="text-gray-900 font-mono text-sm font-black">₹{grandTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold bg-emerald-50 p-2.5 rounded-xl text-emerald-800 border border-emerald-100">
                  <span className="flex items-center gap-1">💸 Paid Advance:</span>
                  <span className="font-mono text-sm font-black text-emerald-600">₹{tokenAdvanceAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold bg-amber-50/70 p-2.5 rounded-xl text-amber-900 border border-amber-100/60 pt-2">
                  <span className="flex items-center gap-1">⏳ Remaining Balance:</span>
                  <span className="font-mono text-sm font-black text-[#962A27]">₹{remainingAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="space-y-3 text-xs font-bold text-gray-600 border-t pt-4">
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">Customer Name:</span>
                  <span className="text-gray-900 capitalize truncate max-w-[180px]">{formData.name}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-400">Event Targeted Date:</span>
                  <span className="text-gray-900 font-mono flex items-center gap-1">
                    <Calendar size={12} className="text-gray-400" /> {formData.date}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 pt-0 space-y-3">
            <button
              onClick={() => setShowPdfPreview(!showPdfPreview)}
              className={`w-full py-3.5 rounded-xl font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-xs uppercase tracking-wider border-2 ${
                showPdfPreview 
                  ? "bg-[#962A27] border-[#962A27] text-white shadow-md" 
                  : "bg-white border-[#962A27] text-[#962A27] hover:bg-[#962A27]/5"
              }`}
            >
              <Eye size={16} />
              {showPdfPreview ? "Hide Live Bill Document" : "Show Live Bill Document"}
            </button>

            <button onClick={() => navigate("/")} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-black py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider" >
              Return to Dashboard <ArrowRight size={14} />
            </button>
          </div>

          <div className="bg-gray-50 border-t border-gray-100 py-3 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            Lakshmi Catering Services © 2026
          </div>
        </div>

        {/* RIGHT COMPONENT COLUMN: Pure A4 Matrix Bill Display Hub Panels */}
        {showPdfPreview && (
          <div className="lg:col-span-8 flex flex-col bg-white border border-gray-100 shadow-xl rounded-[2rem] p-4 sm:p-6 mt-6 lg:mt-0 animate-in fade-in zoom-in-95 duration-300">
            {/* INVOICE CONTROL BAR */}
            <div className="w-full border-b border-gray-100 pb-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-left w-full sm:w-auto">
                <div className="p-2 bg-red-50 text-[#962A27] rounded-xl">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-black uppercase text-slate-900">Document Hub Viewer</h4>
                  <p className="text-[11px] text-slate-400 font-medium">Verified Hybrid Tamil Matrix Layout</p>
                </div>
              </div>
              <button
                onClick={handlePrintVerifiedBill}
                disabled={isPdfLoading}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 shadow"
              >
                {isPdfLoading ? <Loader2 size={14} className="animate-spin text-slate-950" /> : <Printer size={14} />}
                {isPdfLoading ? "Compiling PDF..." : "Download Invoice PDF"}
              </button>
            </div>

            {/* LIVE REF TARGET RENDER CONTAINER */}
            <div className="w-full overflow-x-auto flex justify-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
              <div ref={invoiceRef} className="bg-white text-slate-800 shadow-lg min-w-[210mm] w-[210mm]" style={{ boxSizing: "border-box" }}>
                {itemPages.map((currentPageItems, pageIndex) => {
                  const isFirstPage = pageIndex === 0;
                  const isLastPage = pageIndex === totalPagesCount - 1;
                  
                  return (
                    <div key={pageIndex} className="bg-white p-10 h-[296mm] max-h-[296mm] flex flex-col justify-between border-4 border-[#962A27] m-0" style={{ boxSizing: "border-box", pageBreakAfter: "always" }}>
                      <div className="border-2 border-amber-300 p-6 flex flex-col justify-between h-full w-full">
                        <div>
                          {isFirstPage ? (
                            <>
                              <div className="text-center w-full mb-2">
                                <span className="text-[#962A27] font-bold text-xl tracking-widest">உ</span>
                              </div>
                              <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-4">
                                <div className="space-y-1 text-left">
                                  <div className="flex items-center gap-4">
                                    {Logo && (
                                      <div className="w-14 h-14 overflow-hidden rounded-xl bg-slate-50 p-1 border border-slate-200 shrink-0">
                                        <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
                                      </div>
                                    )}
                                    <div style={{ wordBreak: "keep-all", whiteSpace: "nowrap" }}>
                                      <h1 className="text-2xl font-black text-[#962A27] m-0 tracking-normal">லெட்சுமி கேட்டரிங்</h1>
                                      <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mt-1.5">Tradition of Taste & Absolute Quality</p>
                                    </div>
                                  </div>
                                  <div className="text-xs text-slate-500 font-medium pt-2">
                                    <p>📍 H-10, Aishwarya Avenue, Thanavayal, Karaikudi</p>
                                    <p className="font-mono text-slate-700 font-bold">📞 Mobile: +91 96006 30051</p>
                                  </div>
                                </div>
                                <div className="text-right space-y-1">
                                  <span className="inline-block bg-[#962A27] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded">COMMERCIAL INVOICE</span>
                                  <p className="text-[10px] uppercase font-bold text-slate-400 m-0 pt-1">Invoice Number</p>
                                  <p className="font-mono text-base font-black text-slate-900 m-0 tracking-tight">{invoiceNumber}</p>
                                  <p className="text-[10px] uppercase font-bold text-slate-400 m-0">Date Issued</p>
                                  <p className="text-xs font-bold text-slate-900 m-0">{currentDate}</p>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-6 py-4 my-3 bg-slate-50 border border-slate-200/60 rounded-xl px-5 text-left">
                                <div className="space-y-1">
                                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center border-b border-slate-200/60 pb-1 w-fit">👤 Billed To (Customer)</p>
                                  <p className="text-base font-black text-slate-900 capitalize m-0">{formData.name}</p>
                                  <p className="text-xs font-bold text-slate-600 font-mono"> Phone: {formData.phone}</p>
                                  {/* MUST UNDERSTAND: Renders the translated high-fidelity Tamil address payload here directly */}
                                  <p className="text-[11px] font-bold text-[#962A27] uppercase tracking-wide"> Venue: {formData.translatedAddress || formData.address || formData.city}</p>
                                </div>
                                <div className="space-y-1 border-l border-slate-200 pl-6">
                                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center border-b border-slate-200/60 pb-1 w-fit">📅 Event Specifications</p>
                                  <div className="grid grid-cols-2 gap-y-1 text-xs pt-1 font-semibold text-slate-700">
                                    <span className="text-slate-400">Event Date:</span>
                                    <span className="text-slate-900 font-bold font-mono text-right text-[#962A27]">{userEventDate}</span>
                                    <span className="text-slate-400">Event Nature:</span>
                                    <span className="text-slate-900 font-black uppercase text-right">{formData.eventType}</span>
                                    <span className="text-slate-400">Meal Session:</span>
                                    <span className="text-slate-900 font-black uppercase text-right">{formData.session || "Lunch"}</span>
                                    <span className="text-slate-400">Reporting Time:</span>
                                    <span className="text-slate-900 font-mono text-right">{formData.reportingTime || "10:00 AM"}</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="bg-amber-500/10 border-2 border-amber-500/20 rounded-xl p-4 my-4 flex justify-between items-center text-left">
                                <div>
                                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 block">SELECTED PACKAGE TIER</span>
                                  <p className="text-sm font-black text-slate-900 uppercase m-0 mt-0.5">Package: {formData.packageName || "Veg Signature Package"}</p>
                                  <p className="text-xs font-bold text-slate-600 font-mono m-0 mt-0.5">Rate Per Plate: ₹{unitPriceCalculated.toLocaleString("en-IN")}</p>
                                </div>
                                <div className="text-center bg-white px-5 py-2 rounded-lg border border-amber-200 shadow-sm">
                                  <span className="text-[9px] font-black tracking-widest text-slate-400 block uppercase">TOTAL GUESTS</span>
                                  <span className="text-3xl font-black text-black font-mono leading-none">{totalGuests}</span>
                                </div>
                              </div>
                            </>
                          ) : (
                            <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-6 w-full text-left">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lakshmi Catering Account Ledger</span>
                              <span className="font-mono text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">INV REFERENCE: {invoiceNumber}</span>
                            </div>
                          )}

                          {/* Dynamic Menu Matrix Table Mapping Block */}
                          {currentPageItems.length > 0 && (
                            <div className="mt-4 text-left">
                              <h3 className="text-xs font-black tracking-widest text-slate-900 uppercase mb-3 pb-1 border-b border-slate-200">
                                🍴 Menu Architecture ({isFirstPage ? "Page 1" : `Page ${pageIndex + 1}`})
                              </h3>
                              <table className="w-full table-fixed border-collapse">
                                <thead>
                                  {hasCustomItems ? (
                                    <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                                      <th className="pb-1.5 pl-2" style={{ width: "8%" }}>S.No</th>
                                      <th className="pb-1.5" style={{ width: "42%" }}>Item Name</th>
                                      <th className="pb-1.5 text-right" style={{ width: "15%" }}>Item Price</th>
                                      <th className="pb-1.5 text-center" style={{ width: "15%" }}>Count</th>
                                      <th className="pb-1.5 text-right pr-2" style={{ width: "20%" }}>Total Amount</th>
                                    </tr>
                                  ) : (
                                    <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                                      <th className="pb-1.5 pl-2" style={{ width: "10%" }}>S.No</th>
                                      <th className="pb-1.5" style={{ width: "70%" }}>Item Name</th>
                                      <th className="pb-1.5 text-center pr-2" style={{ width: "20%" }}>Count</th>
                                    </tr>
                                  )}
                                </thead>
                                <tbody>
                                  {currentPageItems.map((item, index) => {
                                    let globalIndex = isFirstPage ? index + 1 : 10 + ((pageIndex - 1) * 15) + index + 1;
                                    const details = findItemDetails(item, formData);
                                    return (
                                      <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50">
                                        {hasCustomItems ? (
                                          <>
                                            <td className="py-2.5 pl-2 font-mono text-xs text-slate-400">{String(globalIndex).padStart(2, '0')}</td>
                                            <td className="py-2.5 text-[13px] font-bold text-slate-800 capitalize truncate">{details.name}</td>
                                            <td className="py-2.5 text-[12px] font-bold text-slate-600 font-mono text-right">{details.price}</td>
                                            <td className="py-2.5 text-[12px] font-black text-slate-900 font-mono text-center bg-slate-50/50 rounded">{details.count}</td>
                                            <td className="py-2.5 text-[13px] font-black text-slate-900 font-mono text-right pr-2">{details.total}</td>
                                          </>
                                        ) : (
                                          <>
                                            <td className="py-2.5 pl-2 font-mono text-xs text-slate-400">{String(globalIndex).padStart(2, '0')}</td>
                                            <td className="py-2.5 text-[14px] font-bold text-slate-800 capitalize truncate">{details.name}</td>
                                            <td className="py-2.5 text-[13px] font-black text-slate-900 font-mono text-center bg-slate-50/50 rounded pr-2">{details.count}</td>
                                          </>
                                        )}
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          )}
                          
                          {!isFirstPage && currentPageItems.length === 0 && (
                            <div className="py-6 text-center text-slate-300 font-medium text-xs border border-dashed border-slate-200 rounded-xl mt-4">
                              Primary menu listing aggregated on Page 1. Financial breakdown attached below.
                            </div>
                          )}
                        </div>
                        
                        {isLastPage && <FinancialLedgerBlock />}
                        
                        <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-3 border-t border-slate-100 mt-6">
                          Page {pageIndex + 1} / {totalPagesCount} • {isLastPage ? "Accounts Ledger Summary Enclosed" : `Menu Overflow Redirected to Page ${pageIndex + 2}`}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PaymentSuccess;
// import React, { useEffect, useState, useRef } from "react"; 
// import { useLocation, useNavigate } from "react-router-dom";
// import { CheckCircle2, ArrowRight, Calendar, Loader2 } from "lucide-react";
// import axios from "axios";

// const PaymentSuccess = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isSyncing, setIsSyncing] = useState(true);
//   const [syncError, setSyncError] = useState(null);
  
//   const hasFired = useRef(false);

//   const { paymentId, formData, grandTotal = 0, tokenAdvanceAmount = 0, invoicePdfDriveLink = null } = location.state || {};
//   const remainingAmount = grandTotal - tokenAdvanceAmount;

//   useEffect(() => {
//     if (hasFired.current) return;

//     if (formData && paymentId) {
//       const syncBookingToBackend = async () => {
//         try {
//           hasFired.current = true; 
//           setIsSyncing(true);

//          // 🎯 PaymentSuccess.jsx ஃபைலுக்குள் இருக்கும் payload-ஐ மட்டும் இப்படி மாத்துங்க:
// const payload = {
//   // formData-க்குள் இருக்கும் அத்தனை வேல்யூக்களையும் பிரித்து நேரடி ஃபீல்டுகளாக அனுப்புகிறோம்
//   customerName: formData.name,
//   phone: formData.phone,
//   eventDate: formData.date,
//   guests: formData.guests,
//   district: formData.district || "Sivagangai", // ஒருவேளை மிஸ் ஆனா கிராஷ் ஆகாம இருக்க ஃபால்பேக்
//   city: formData.city,
//   address: formData.address,
//   eventType: formData.eventType || "Marriage", 
//   session: formData.session || "Lunch",
//   preference: formData.preference || "Veg",
//   bookingType: formData.bookingType || "Custom",
//   packageId: formData.selectedPackageId || "",
//   packageName: formData.packageName || "Custom Menu",
//   packageItems: formData.packageItems || [],

//   // இதர நிதி மற்றும் சர்வர் விபரங்கள்
//   grandTotal: grandTotal,
//   advancePaid: tokenAdvanceAmount,
//   balanceAmount: remainingAmount,
//   invoicePdfDriveLink: invoicePdfDriveLink, 
//   serviceCharge: formData.serviceCharge || 0,
//   deliveryCharge: formData.deliveryCharge || 0,
//   staffCount: formData.staffCount || 0,
//   staffRequired: formData.staffRequired || "No",
//   paymentId: paymentId
// };

//           // 🎯 லோக்கல்ல டெஸ்ட் பண்ண ஏதுவாக இப்போதைக்கு லோக்கல் URL போட்ருக்கேன் மச்சான்!
//           const backendUrl = "http://127.0.0.1:5000/api/booking1/save-confirmed-booking";
          
//           console.log("🚀 Firing payload to Local Server for Meta WhatsApp trigger...");
//           const response = await axios.post(backendUrl, payload);
          
//           if (response.data.success) {
//             console.log("✅ [System Sync] Booking saved & WhatsApp message dispatched!");
//             setIsSyncing(false);
//           }
//         } catch (error) {
//           console.error("❌ [System Sync Error] Failed to trigger WhatsApp:", error);
//           setSyncError(error.message);
//           setIsSyncing(false);
//         }
//       };

//       syncBookingToBackend();
//     }
//   }, [formData, paymentId]);

//   if (!formData || !paymentId) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
//         <div className="text-center bg-white p-6 rounded-3xl shadow-xl max-w-md w-full">
//           <p className="text-gray-600 mb-6 font-medium">No success transaction logs found.</p>
//           <button onClick={() => navigate("/booking")} className="w-full bg-[#962A27] text-white py-3 rounded-xl font-bold">
//             Back to Home Booking
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 flex flex-col justify-center items-center">
//       <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden text-left">
        
//         <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-8 text-center relative">
//           <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
//           <div className="inline-flex p-3 bg-white/20 backdrop-blur-md rounded-full text-white mb-3">
//             <CheckCircle2 size={40} />
//           </div>
//           <h1 className="text-2xl font-black text-white tracking-tight">Booking Confirmed!</h1>
          
//           <div className="text-green-100 text-xs mt-1 font-medium flex items-center justify-center gap-1.5">
//             {isSyncing ? (
//               <>
//                 <Loader2 size={12} className="animate-spin text-amber-300" />
//                 <span>Triggering Meta WhatsApp Messages...</span>
//               </>
//             ) : syncError ? (
//               <span className="text-rose-200">⚠️ Live Sync Failed. Check terminal.</span>
//             ) : (
//               <span>✅ Order Alerts Dispatched to WhatsApp!</span>
//             )}
//           </div>
//         </div>

//         <div className="p-6 space-y-6">
//           <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3.5">
//             <div className="flex justify-between items-center text-xs font-bold text-gray-500">
//               <span>Total Catering Value:</span>
//               <span className="text-gray-900 font-mono text-sm font-black">₹{grandTotal.toLocaleString("en-IN")}</span>
//             </div>
//             <div className="flex justify-between items-center text-xs font-bold bg-emerald-50 p-2.5 rounded-xl text-emerald-800 border border-emerald-100">
//               <span className="flex items-center gap-1">💸 Paid Advance:</span>
//               <span className="font-mono text-sm font-black text-emerald-600">₹{tokenAdvanceAmount.toLocaleString("en-IN")}</span>
//             </div>
//             <div className="flex justify-between items-center text-xs font-bold bg-amber-50/70 p-2.5 rounded-xl text-amber-900 border border-amber-100/60 pt-2">
//               <span className="flex items-center gap-1">⏳ Remaining Balance:</span>
//               <span className="font-mono text-sm font-black text-[#962A27]">₹{remainingAmount.toLocaleString("en-IN")}</span>
//             </div>
//           </div>

//           <div className="space-y-3 text-xs font-bold text-gray-600 border-t pt-4">
//             <div className="flex justify-between items-center py-1">
//               <span className="text-gray-400">Customer Name:</span>
//               <span className="text-gray-900 capitalize truncate max-w-[180px]">{formData.name}</span>
//             </div>
//             <div className="flex justify-between items-center py-1">
//               <span className="text-gray-400">Event Targeted Date:</span>
//               <span className="text-gray-900 font-mono flex items-center gap-1">
//                 <Calendar size={12} className="text-gray-400" /> {formData.date}
//               </span>
//             </div>
//           </div>

//           <button onClick={() => navigate("/")} className="w-full bg-[#962A27]/5 hover:bg-[#962A27]/10 text-[#962A27] font-black py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider" >
//             Return to Dashboard <ArrowRight size={14} />
//           </button>
//         </div>
        
//         <div className="bg-gray-50 border-t border-gray-100 py-3 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
//           Lakshmi Catering Services © 2026
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;