import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Step3FoodPreferences({ formData, handleChange, prevStep, handleContinue, isSubmitting }) {
  return (
    <div className="animate-fadeIn px-2 sm:px-0">
      <div className="mb-8 sm:mb-10 text-center sm:text-left">
        <span className="inline-block bg-[#962A27]/10 text-[#962A27] px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
          Step 3 of 5
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-2 sm:mt-3"> Food Preferences </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2"> Choose your preferred menu type and serving session. </p>
      </div>

      <div className="mb-10 sm:mb-12">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-5 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
          <span>Serving Flavor</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {/* Veg Option */}
          <div onClick={() => { handleChange("preference", "Veg"); handleChange("session", ""); }} className={`group cursor-pointer rounded-2xl sm:rounded-3xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 text-center sm:text-left ${ formData.preference === "Veg" ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md" : "border-[#962A27]/10 bg-white hover:border-[#962A27]/40 text-gray-700" }`} >
            <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-50 border-2 border-green-600 p-2 shrink-0">
                <div className="w-5 h-5 bg-green-600 rounded-full" />
              </div>
              <div className="flex-1 sm:mt-4 text-left">
                <h4 className="text-lg font-bold">Pure Veg</h4>
                <p className="text-xs text-gray-400 mt-0.5">Strictly Vegetarian Platters</p>
              </div>
            </div>
          </div>
          
          {/* Non-Veg Option */}
          <div onClick={() => { handleChange("preference", "Non-Veg"); handleChange("session", ""); }} className={`group cursor-pointer rounded-2xl sm:rounded-3xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 text-center sm:text-left ${ formData.preference === "Non-Veg" ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md" : "border-[#962A27]/10 bg-white hover:border-[#962A27]/40 text-gray-700" }`} >
            <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-50 border-2 border-red-600 p-2 shrink-0">
                <div className="w-5 h-5 bg-red-600 rounded-full" />
              </div>
              <div className="flex-1 sm:mt-4 text-left">
                <h4 className="text-lg font-bold">Non-Veg</h4>
                <p className="text-xs text-gray-400 mt-0.5">Savory Poultry & Seafood Specialties</p>
              </div>
            </div>
          </div>
          
          {/* Combined Both Option */}
          <div onClick={() => { handleChange("preference", "Both"); handleChange("session", ""); }} className={`group cursor-pointer rounded-2xl sm:rounded-3xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 text-center sm:text-left ${ formData.preference === "Both" ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md" : "border-[#962A27]/10 bg-white hover:border-[#962A27]/40 text-gray-700" }`} >
            <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-4">
              <div className="flex gap-1.5 p-1.5 rounded-xl bg-gray-50 border border-gray-200 shrink-0">
                <div className="w-6 h-6 rounded-md flex items-center justify-center border border-green-600 p-0.5">
                  <div className="w-2.5 h-2.5 bg-green-600 rounded-full" />
                </div>
                <div className="w-6 h-6 rounded-md flex items-center justify-center border border-red-600 p-0.5">
                  <div className="w-2.5 h-2.5 bg-red-600 rounded-full" />
                </div>
              </div>
              <div className="flex-1 sm:mt-4 text-left">
                <h4 className="text-lg font-bold">Both Mix</h4>
                <p className="text-xs text-gray-400 mt-0.5">Flexible Dual-Kitchen Combinations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Session Management Section */}
      {formData.preference && (
        <div className="animate-slideDown">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 text-center sm:text-left"> Serving Session </h3>
          <p className="text-xs sm:text-sm text-gray-400 mb-5 text-center sm:text-left"> Choose the primary service timing tier for tracking cooks. </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {[
              { name: "Breakfast", icon: "☕", desc: "Sunrise Morning Banquet" },
              { name: "Lunch", icon: "🍛", desc: "Midday Traditional Feast" },
              { name: "Dinner", icon: "🌙", desc: "Elegant Moonlight Gala Dinner" },
            ].map((item) => (
              <div key={item.name} onClick={() => handleChange("session", item.name)} className={`group cursor-pointer rounded-2xl sm:rounded-3xl p-5 border-2 text-center sm:text-left transition-all duration-300 hover:-translate-y-1 ${ formData.session === item.name ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-sm" : "border-[#962A27]/10 bg-white hover:border-[#962A27]/30 text-gray-700" }`} >
                <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-4">
                  <span className="text-4xl filter drop-shadow-sm">{item.icon}</span>
                  <div className="text-left">
                    <h4 className="text-base sm:text-lg font-bold sm:mt-3">{item.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                  </div>
                  {formData.session === item.name && (
                    <span className="ml-auto sm:hidden text-xs bg-[#962A27] text-white px-2 py-0.5 rounded-full font-bold">✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {formData.preference && formData.session && (
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center sm:text-left animate-in fade-in">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Configuration Active</p>
          <p className="text-sm font-bold text-gray-800 mt-1"> {formData.preference} Menu <span className="text-gray-300 mx-1.5">•</span> {formData.session} Batch Allocation </p>
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-8 sm:mt-10">
        <button onClick={prevStep} className="px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gray-100 hover:bg-gray-200 font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base text-gray-600" >
          <ChevronLeft size={18} /> Back
        </button>
        <button type="button" onClick={handleContinue} disabled={isSubmitting || !formData.preference || !formData.session} className="px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#962A27] to-[#7A1F1D] text-white font-bold shadow-md hover:enabled:scale-[1.02] sm:hover:enabled:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base" >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Continue</span>
              <ChevronRight size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Step3FoodPreferences;