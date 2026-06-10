import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const BookingPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const componentRef = useRef();

  const bookingData = location.state;
  if (!bookingData) return <div className="p-10 text-center">Data mismatch. Please go back.</div>;

  const { customerDetails, eventType, foodSession, preference, bookingType, selectedPackage, selectedItems, grandTotal } = bookingData;
  const activeItemsList = Object.values(selectedItems).filter(Boolean);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Lakshmi_Catering_${customerDetails.name}`,
  });

  return (
    <div className="min-h-screen bg-gray-200 py-6 sm:py-10 px-2 sm:px-4">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        
        {/* TOP NAV */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
          <button onClick={() => navigate(-1)} className="text-sm font-bold text-gray-500">← Back to Summary</button>
          <button onClick={handlePrint} className="bg-[#962a27] text-white px-6 py-2 rounded-lg font-bold shadow-md">
            Download PDF / Print
          </button>
        </div>

        {/* PRINTABLE CONTENT */}
        <div ref={componentRef} className="bg-white p-6 sm:p-12 shadow-2xl rounded-sm border-t-[10px] border-[#962a27]">
          
          {/* LOGO & DATE */}
          <div className="flex justify-between items-center border-b-2 pb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#962a27]">LAKSHMI CATERING</h1>
              <p className="text-gray-500 text-sm font-bold tracking-widest uppercase">Pure Taste | Professional Service</p>
            </div>
            <div className="text-right text-xs text-gray-400">
              <p>Quotation Date:</p>
              <p className="text-black font-bold text-sm">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* CLIENT & EVENT INFO */}
          <div className="grid grid-cols-2 gap-8 py-8 border-b">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-[#962a27] uppercase">Bill To:</p>
              <h4 className="font-black text-lg">{customerDetails.name}</h4>
              <p className="text-sm">📞 {customerDetails.phone}</p>
              <p className="text-sm text-gray-500 italic">{customerDetails.address}</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] font-bold text-[#962a27] uppercase">Event Details:</p>
              <h4 className="font-black text-lg">{eventType}</h4>
              <p className="text-sm">📅 Date: <b>{customerDetails.date}</b></p>
              <p className="text-sm">👥 Guests: <b>{customerDetails.guestCount}</b></p>
              <p className="text-sm text-gray-500">{foodSession} | {preference}</p>
            </div>
          </div>

          {/* ITEM TABLE */}
          <div className="py-6">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100 text-[11px] uppercase">
                  <th className="border p-2 text-center w-12">#</th>
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2 text-center">Rate</th>
                  <th className="border p-2 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {bookingType === "Package" && (
                  <tr className="font-bold bg-gray-50">
                    <td className="border p-3 text-center">1</td>
                    <td className="border p-3">{selectedPackage} Special Package Includes:</td>
                    <td className="border p-3 text-center">Fixed</td>
                    <td className="border p-3 text-right">₹ {(packages[selectedPackage].price * customerDetails.guestCount).toLocaleString()}</td>
                  </tr>
                )}
                {activeItemsList.map((item, i) => (
                  <tr key={i}>
                    <td className="border p-2 text-center">{bookingType === "Package" ? i + 2 : i + 1}</td>
                    <td className="border p-2">{item.en} / {item.ta}</td>
                    <td className="border p-2 text-center">₹{item.price}</td>
                    <td className="border p-2 text-right font-medium">₹{(item.price * customerDetails.guestCount).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOTALS */}
          <div className="flex justify-end pt-4">
            <div className="w-full sm:w-1/2 space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal:</span>
                <span>₹ {grandTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-black border-t-2 border-black pt-2">
                <span>Grand Total:</span>
                <span className="text-[#962a27]">₹ {grandTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600 font-bold border-t border-dashed pt-2">
                <span>Required Advance (10%):</span>
                <span>₹ {(grandTotal * 0.1).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-16 text-center">
            <div className="flex justify-between items-end">
              <div className="text-left text-[10px] text-gray-400 max-w-xs">
                <p className="font-bold text-black mb-1 underline">Terms & Conditions:</p>
                <p>1. Menu changes allowed 48hrs before event.</p>
                <p>2. Transportation charges may apply based on distance.</p>
                <p>3. Advance amount is non-refundable upon cancellation.</p>
              </div>
              <div className="text-right">
                <div className="w-32 border-b border-black ml-auto mb-1"></div>
                <p className="text-[10px] font-bold">Authorized Signature</p>
                <p className="text-[9px] text-gray-400">Lakshmi Catering Services</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingPreview;