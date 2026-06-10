import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Calendar, CloudDownload } from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // BookingSummary.jsx-la irundhu backend anupuna direct drive link and state-ai extract panroam
  const { paymentId, formData, grandTotal = 0, tokenAdvanceAmount = 0, invoicePdfDriveLink = null } = location.state || {};
  const remainingAmount = grandTotal - tokenAdvanceAmount;

  // Context map aagala na safe backup fallback blocker
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden text-left">
        
        {/* TOP CELEBRATION ICON BANNER */}
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 p-8 text-center relative">
          <div className="absolute inset-0 bg-white/5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
          <div className="inline-flex p-3 bg-white/20 backdrop-blur-md rounded-full text-white mb-3">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Booking Confirmed!</h1>
          
          {/* Status Display based on Backend Drive Response Link */}
          <p className="text-green-100 text-xs mt-1 font-medium">
            {invoicePdfDriveLink 
              ? "✅ Invoice Saved to Lakshmi Google Drive!" 
              : "✅ Server Synced Successfully!"}
          </p>
        </div>

        {/* TRANSACTION METRICS CARDS PANEL */}
        <div className="p-6 space-y-6">
          <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3.5">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
              <span>Total Catering Value (Motha Amount):</span>
              <span className="text-gray-900 font-mono text-sm font-black">₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold bg-emerald-50 p-2.5 rounded-xl text-emerald-800 border border-emerald-100">
              <span className="flex items-center gap-1">💸 Paid Advance (Ipa Pay Pannathu):</span>
              <span className="font-mono text-sm font-black text-emerald-600">₹{tokenAdvanceAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center text-xs font-bold bg-amber-50/70 p-2.5 rounded-xl text-amber-900 border border-amber-100/60 pt-2">
              <span className="flex items-center gap-1">⏳ Remaining Balance (Meethi Avalo):</span>
              <span className="font-mono text-sm font-black text-[#962A27]">₹{remainingAmount.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="space-y-3 text-xs font-bold text-gray-600 border-t pt-4">
            <div className="flex justify-between items-start py-1">
              <span className="text-gray-400">Razorpay Payment ID:</span>
              <span className="text-gray-900 font-mono select-all bg-gray-100 px-2 py-0.5 rounded text-[11px] font-black tracking-tight text-right break-all max-w-[200px]">
                {paymentId}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-400">Customer Name:</span>
              <span className="text-gray-900 capitalize truncate max-w-[180px]">{formData.name}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-400">Event Targeted Date:</span>
              <span className="text-gray-900 font-mono flex items-center gap-1"><Calendar size={12} className="text-gray-400" /> {formData.date}</span>
            </div>
          </div>

          {/* DYNAMIC GOOGLE DRIVE LINK DOWNLOAD BUTTON */}
          {invoicePdfDriveLink ? (
            <div className="pt-2">
              <a 
                href={invoicePdfDriveLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-black py-3.5 rounded-xl shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-center"
              >
                <CloudDownload size={14} className="text-amber-400" />
                View & Print Invoice Bill (Google Drive)
              </a>
            </div>
          ) : (
            <div className="text-center py-2 text-xs text-amber-600 font-bold bg-amber-50 rounded-xl border border-amber-100">
              ⚠️ Invoice link is processing in backend logs.
            </div>
          )}

          <button onClick={() => navigate("/")} className="w-full bg-[#962A27]/5 hover:bg-[#962A27]/10 text-[#962A27] font-black py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 text-xs uppercase tracking-wider" >
            Return to Dashboard <ArrowRight size={14} />
          </button>
        </div>
        
        <div className="bg-gray-50 border-t border-gray-100 py-3 text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Lakshmi Catering Services © 2026
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;