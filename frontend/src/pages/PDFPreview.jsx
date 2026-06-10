import React, { useRef } from "react"; 
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../Images/Logo.webp";
import { 
  ArrowRight,
  Printer,
  Sparkles
} from "lucide-react";
import html2pdf from "html2pdf.js";

const PDFPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const invoiceRef = useRef(null);

  const { 
    formData, 
    grandTotal = 0, 
    serviceCharge = 0, 
    deliveryCharge = 0, 
    staffCount = 0, // Extra Persons to serve
    staffRequired = "No",
    paymentId = "N/A",          
    tokenAdvanceAmount = 0,
    isFromFilesPage = false 
  } = location.state || {};

  const totalGuests = parseInt(formData?.guests) || 1;
  const extraGuestsCount = parseInt(staffCount) || 0;

  // Exact math logic as per your core requirements
  const rawBaseCost = formData?.packagePrice 
    ? (formData.packagePrice * totalGuests)
    : (grandTotal - serviceCharge - deliveryCharge);

  const unitPriceCalculated = formData?.packagePrice || Math.floor(rawBaseCost / totalGuests);
  const packageItems = formData?.packageItems || [];
  const remainingDueAmount = grandTotal - tokenAdvanceAmount;
  
  const invoiceNumber = formData?.invoiceNo || `SL${Math.floor(1000 + Math.random() * 9000)}`;
  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Dynamic Pagination Matrix (Max 10 Items per Page Node)
  const page1Items = packageItems.slice(0, 10);
  const page2Items = packageItems.slice(10, 20);
  const page3Items = packageItems.slice(20);

  const hasPage2Items = page2Items.length > 0;
  const hasPage3Items = page3Items.length > 0;

  // Determine Financial Core Render Placement Blocks
  const showPaymentOnPage2 = !hasPage3Items; 
  const showPaymentOnPage3 = hasPage3Items;  

  const totalPagesCount = hasPage3Items ? 3 : 2;

  const handlePrintVerifiedBill = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 0, 
      filename: `Lakshmi_Catering_${invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 3, 
        useCORS: true, 
        letterRendering: true,
        logging: false,
        useOverflow: true
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'avoid-all'] }
    };
    html2pdf().set(options).from(element).save();
  };

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="text-center bg-slate-900 p-8 rounded-xl border border-slate-800 max-w-sm w-full">
          <p className="text-slate-400 mb-4 font-semibold">No invoice details found.</p>
          <button onClick={() => navigate("/booking")} className="w-full bg-[#962A27] text-white px-6 py-3 rounded-lg font-bold transition-all">
            Back to Booking
          </button>
        </div>
      </div>
    );
  }

  // REUSABLE SUB-RENDER: MASTER LEDGER & ENDORSEMENT SCHEMATICS
  const FinancialLedgerBlock = () => {
    const totalFoodAmount = rawBaseCost; 
    const additionalAmount = (parseInt(deliveryCharge) || 0) + (parseInt(serviceCharge) || 0); 
    
    // Extra Person Cost calculation (e.g., 5 * 800 = 4000)
    const extraPersonRate = 800;
    const totalExtraGuestsCost = extraGuestsCount * extraPersonRate;

    return (
      <div className="w-full mt-auto">
        <table className="w-full border-collapse border-t border-slate-200 pt-6 mt-4">
          <tbody>
            <tr>
              {/* Left Instructions Box */}
              <td className="align-top pr-6" style={{ width: "45%" }}>
                <span className="text-[10px] font-black tracking-widest text-slate-400 block mb-2">📝 SPECIAL INSTRUCTIONS</span>
                <div className="text-[11px] text-slate-500 font-semibold space-y-1 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {formData.specialInstructions || formData.notes ? (
                    <p className="whitespace-pre-line m-0">{formData.specialInstructions || formData.notes}</p>
                  ) : (
                    <>
  <p className="m-0">
    • High-quality ingredients and hygienic cooking practices will be followed for all menu preparations.
  </p>

  <p className="m-0">
    • Dedicated service staff will ensure timely food service and a seamless dining experience for guests.
  </p>
</>
                  )}
                </div>
              </td>

              {/* Right Professional Financial Box */}
              <td className="align-top pl-4" style={{ width: "55%" }}>
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-slate-50/50">
                  <div className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 flex justify-between">
                    <span>Account summary</span>
                    <span>Value (INR)</span>
                  </div>
                  <div className="p-3 space-y-2.5 bg-white text-xs font-semibold">
                    
                    {/* 1. Base Food Amount */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Food Amount</span>
                      <span className="font-mono font-bold text-slate-900">₹{totalFoodAmount.toLocaleString("en-IN")}.00</span>
                    </div>

                    {/* 2. Primary Headcount Line Indicator */}
                    {/* <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Primary Headcount</span>
                      <span className="font-mono font-bold text-slate-700">
                        ₹{unitPriceCalculated.toLocaleString("en-IN")} × {totalGuests}
                      </span>
                    </div> */}

                    {/* 3. Extra Persons Split Row (Condition: Only shows if extra count > 0) */}
                    {extraGuestsCount > 0 && (
                      <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 bg-amber-50/50 px-1 rounded">
                        <span className="text-amber-900 font-medium">Extra Headcount (₹{extraPersonRate} × {extraGuestsCount})</span>
                        <span className="font-mono font-bold text-slate-900">₹{totalExtraGuestsCost.toLocaleString("en-IN")}.00</span>
                      </div>
                    )}

                    {/* 4. Additional Amount (Logistics) */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Additional Amount (Logistics)</span>
                      <span className="font-mono font-bold text-slate-900">₹{additionalAmount.toLocaleString("en-IN")}.00</span>
                    </div>

                    {/* 5. Advance Received */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                      <span className="text-slate-500">Advance Received</span>
                      <span className="font-mono font-bold text-emerald-600">- ₹{tokenAdvanceAmount.toLocaleString("en-IN")}.00</span>
                    </div>

                    {/* 6. Balance Amount */}
                    <div className="flex justify-between items-center pt-1 font-black">
                      <span className="text-[10px] uppercase text-slate-500 tracking-wider">Balance Amount</span>
                      <span className="font-mono text-base text-[#962A27]">₹{remainingDueAmount.toLocaleString("en-IN")}.00</span>
                    </div>

                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* SIGNATURE SECTION FIELD TIER */}
        <table className="w-full border-collapse mt-16 text-xs font-bold text-slate-700 mb-4">
          <tbody>
            <tr>
              <td className="align-bottom pb-1" style={{ width: "50%" }}>
                <div className="h-[1px] w-20 bg-slate-300 mb-2" />
                <p className="text-slate-400 text-[9px] uppercase tracking-widest m-0">Client Endorsement</p>
              </td>
              <td className="text-right align-bottom pb-1" style={{ width: "50%" }}>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] mb-12 m-0">Authorized Executive</p>
                <p className="text-black font-black uppercase text-xs border-t border-black pt-1.5 m-0">லெட்சுமி கேட்டரிங்</p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* BOTTOM FOOTER BRAND SUBSTRIP */}
        <div className="text-center border-t border-slate-100 pt-3 w-full mt-4">
          <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest m-0 space-x-3">
            <span>TASTE</span> • <span>TRADITION</span> • <span>ABSOLUTE QUALITY</span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 py-6 sm:py-10 px-4 antialiased text-slate-800 font-sans select-none overflow-x-hidden">
      
      {/* CONTROLS BAR */}
      <div className="max-w-4xl mx-auto mb-6 bg-slate-950/80 backdrop-blur-md rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-white shadow-2xl">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="p-2.5 bg-[#962A27]/10 text-amber-500 rounded-xl border border-amber-500/20 shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-200">Typography Fix Engine Active</h2>
            <p className="text-[11px] text-slate-400">Dynamic Multi-Page Architecture Ready</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button 
            onClick={handlePrintVerifiedBill}
            className="flex-1 sm:flex-none bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg active:scale-95 transition-all text-center whitespace-nowrap"
          >
            <Printer size={15} className="inline mr-1" /> Download PDF
          </button>

          {isFromFilesPage ? (
            <button onClick={() => navigate(-1)} className="flex-1 sm:flex-none bg-slate-800 text-slate-300 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer text-center">
              Back
            </button>
          ) : (
            <button 
              onClick={() => navigate("/payment-success", { state: { paymentId, formData, grandTotal, tokenAdvanceAmount } })}
              className="flex-1 sm:flex-none bg-[#962A27] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1 text-center whitespace-nowrap"
            >
              Proceed <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================
          👑 SCROLLABLE RESPONSIVE CONTAINER SHIELD
          ======================================================== */}
      <div className="max-w-4xl mx-auto overflow-x-auto pb-6 rounded-2xl scrollbar-thin scrollbar-thumb-slate-800">
        <div 
          ref={invoiceRef} 
          className="bg-white min-w-[210mm] w-[210mm] mx-auto shadow-2xl"
          style={{ transformOrigin: "top left" }}
        >
          {/* 📄 PAGE 1 */}
          <div 
            className="bg-white p-10 h-[296mm] max-h-[296mm] flex flex-col justify-between border-4 border-[#962A27] m-0" 
            style={{ boxSizing: "border-box", pageBreakAfter: "always" }}
          >
            <div className="border-2 border-amber-300 p-6 flex flex-col justify-between h-full w-full">
              <div>
                <div className="text-center w-full mb-2">
                  <span className="text-[#962A27] font-bold text-xl tracking-widest px-3 py-0.5 bg-amber-50 border border-amber-200 rounded-full">உ</span>
                </div>

                <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-4">
                      {logo && (
                        <div className="w-14 h-14 overflow-hidden rounded-xl bg-slate-50 p-1 border border-slate-200 shrink-0">
                          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                        </div>
                      )}
                      <div style={{ wordBreak: "keep-all", whiteSpace: "nowrap" }}>
                        <h1 className="text-2xl font-black text-[#962A27] m-0 tracking-normal" style={{ fontFamily: "sans-serif" }}>
                          லெட்சுமி கேட்டரிங்
                        </h1>
                        <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest mt-1.5">
                          Premium Catering & Hospitality Services
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 font-medium pt-2">
                      <p>📍                  🗺️H-10, Aishwarya Avenue, Thanavayal, Karaikudi 
</p>
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

                <div className="grid grid-cols-2 gap-6 py-4 my-3 bg-slate-50 border border-slate-200/60 rounded-xl px-5">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center border-b border-slate-200/60 pb-1 w-fit">
                      👤 Billed To (Customer)
                    </p>
                    <p className="text-base font-black text-slate-900 capitalize m-0">{formData.name}</p>
                    <p className="text-xs font-bold text-slate-600 font-mono"> Phone: {formData.phone}</p>
                    <p className="text-[11px] font-bold text-[#962A27] uppercase tracking-wide"> Venue: {formData.address || formData.city}</p>
                  </div>

                  <div className="space-y-1 border-l border-slate-200 pl-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center border-b border-slate-200/60 pb-1 w-fit">
                      📅 Event Specifications
                    </p>
                    <div className="grid grid-cols-2 gap-y-1 text-xs pt-1 font-semibold text-slate-700">
                      <span className="text-slate-400">Event Nature:</span>
                      <span className="text-slate-900 font-black uppercase text-right">{formData.eventType}</span>
                      <span className="text-slate-400">Meal Session:</span>
                      <span className="text-slate-900 font-black uppercase text-right">{formData.session || "Lunch"}</span>
                      <span className="text-slate-400">Reporting Time:</span>
                      <span className="text-slate-900 font-mono text-right">{formData.reportingTime || "10:00 AM"}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/10 border-2 border-amber-500/20 rounded-xl p-4 my-4 flex justify-between items-center">
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

                <div className="mt-4">
                  <h3 className="text-xs font-black tracking-widest text-slate-900 uppercase mb-3 pb-1 border-b border-slate-200">
                    🍴 Menu Architecture (Page 1)
                  </h3>
                  <table className="w-full table-fixed border-collapse">
                    <thead>
                      <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                        <th className="pb-1.5 pl-2" style={{ width: "12%" }}>S.No</th>
                        <th className="pb-1.5" style={{ width: "88%" }}>Menu Item Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {page1Items.map((item, index) => (
                        <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="py-2.5 pl-2 font-mono text-xs text-slate-400">{String(index + 1).padStart(2, '0')}</td>
                          <td className="py-2.5 text-[14px] font-bold text-slate-800 capitalize truncate">{item}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-3 border-t border-slate-100 mt-6">
                Page 1 / {totalPagesCount} • Invoice Structure Segments Continued
              </div>
            </div>
          </div>

          {/* 📄 PAGE 2 */}
          <div 
            className="bg-white p-10 h-[296mm] max-h-[296mm] flex flex-col justify-between border-4 border-[#962A27] m-0"
            style={{ boxSizing: "border-box", pageBreakAfter: hasPage3Items ? "always" : "auto" }}
          >
            <div className="border-2 border-amber-300 p-6 flex flex-col justify-between h-full w-full">
              <div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-6 w-full">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lakshmi Catering Account Ledger</span>
                  <span className="font-mono text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">INV REFERENCE: {invoiceNumber}</span>
                </div>

                {hasPage2Items && (
                  <div className="mb-8">
                    <h3 className="text-xs font-black tracking-widest text-slate-900 uppercase mb-3 pb-1 border-b border-slate-200">
                      🍴 Menu Architecture (Page 2 Continuation)
                    </h3>
                    <table className="w-full table-fixed border-collapse">
                      <thead>
                        <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                          <th className="pb-1.5 pl-2" style={{ width: "12%" }}>S.No</th>
                          <th className="pb-1.5" style={{ width: "88%" }}>Menu Item Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {page2Items.map((item, index) => (
                          <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="py-2.5 pl-2 font-mono text-xs text-slate-400">{String(index + 11).padStart(2, '0')}</td>
                            <td className="py-2.5 text-[14px] font-bold text-slate-800 capitalize truncate">{item}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {showPaymentOnPage2 && <FinancialLedgerBlock />}

              <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-3 border-t border-slate-100 mt-6">
                Page 2 / {totalPagesCount} • {hasPage3Items ? "Menu Overflow Redirected to Page 3" : "Accounts Ledger Summary Enclosed"}
              </div>
            </div>
          </div>

          {/* 📄 PAGE 3 */}
          {hasPage3Items && (
            <div 
              className="bg-white p-10 h-[296mm] max-h-[296mm] flex flex-col justify-between border-4 border-[#962A27] m-0"
              style={{ boxSizing: "border-box" }}
            >
              <div className="border-2 border-amber-300 p-6 flex flex-col justify-between h-full w-full">
                <div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-6 w-full">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lakshmi Catering Account Ledger</span>
                    <span className="font-mono text-xs font-bold text-slate-400 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">INV REFERENCE: {invoiceNumber}</span>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xs font-black tracking-widest text-slate-900 uppercase mb-3 pb-1 border-b border-slate-200">
                      🍴 Menu Architecture (Page 3 Final Continuation)
                    </h3>
                    <table className="w-full table-fixed border-collapse">
                      <thead>
                        <tr className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                          <th className="pb-1.5 pl-2" style={{ width: "12%" }}>S.No</th>
                          <th className="pb-1.5" style={{ width: "88%" }}>Menu Item Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {page3Items.map((item, index) => (
                          <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50">
                            <td className="py-2.5 pl-2 font-mono text-xs text-slate-400">{String(index + 21).padStart(2, '0')}</td>
                            <td className="py-2.5 text-[14px] font-bold text-slate-800 capitalize truncate">{item}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {showPaymentOnPage3 && <FinancialLedgerBlock />}

                <div className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-3 border-t border-slate-100 mt-6">
                  Page 3 / 3 • Final Accounts Ledger Summary Enclosed
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default PDFPreview;