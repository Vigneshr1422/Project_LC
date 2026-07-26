import React from "react";

function Step6Review({ formData, allPackages, calculateTotal, prevStep, handleConfirm }) {
  return (
    <div className="animate-fadeIn">
      <div className="mb-8 text-left">
        <h2 className="text-3xl font-bold text-gray-800">Review Your Booking</h2>
        <p className="text-gray-500 mt-2">Please verify all details before confirming your order</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-[32px] overflow-hidden shadow-sm">
        <div className="bg-[#962A27] text-white p-6 text-left">
          <h3 className="text-xl font-bold">Booking Summary</h3>
          <p className="text-white/80 text-sm mt-1">Catering Event Details</p>
        </div>
        <div className="p-6 lg:p-8 text-left">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-sm">Customer Name</p>
              <p className="font-semibold text-gray-800 mt-1">{formData.name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Phone Number</p>
              <p className="font-semibold text-gray-800 mt-1">{formData.phone}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Event Date</p>
              <p className="font-semibold text-gray-800 mt-1">{formData.date}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Guest Count</p>
              <p className="font-semibold text-gray-800 mt-1">{formData.guests}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Food Preference</p>
              <p className="font-semibold text-gray-800 mt-1">{formData.preference}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Session</p>
              <p className="font-semibold text-gray-800 mt-1">{formData.session}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-500 text-sm">Selected Package / Custom Menu</p>
              <p className="font-semibold text-gray-800 mt-1">
                {formData.bookingType === "Custom" ? "Custom Menu Builder" : (allPackages.find((p) => p.id === formData.selectedPackageId)?.name || "Not Selected")}
              </p>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Total Amount</p>
                <p className="text-xs text-gray-400">Based on selected package & guests</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-[#962A27]"> ₹{calculateTotal().toLocaleString("en-IN")} </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTONS ACTION ROW */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
        <button onClick={prevStep} className="border border-gray-300 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 cursor-pointer"> ← Back </button>
        <button onClick={handleConfirm} className="w-full sm:w-auto px-10 py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#962A27] via-[#852321] to-[#7A1F1D] text-white font-black text-base sm:text-lg tracking-wide shadow-lg shadow-[#962A27]/20 hover:shadow-xl hover:shadow-[#962A27]/30 hover:scale-[1.02] sm:hover:scale-105 active:scale-[0.98] transition-all duration-300 text-center flex items-center justify-center gap-3 cursor-pointer" >
          <span>Confirm Booking</span>
          <span className="text-xl font-light tracking-widest">→</span>
        </button>
      </div>
    </div>
  );
}

export default Step6Review;