import React, { useState } from "react";
import { User, Phone, Calendar, Users, MapPin, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react";

function Step1CustomerInfo({
  formData,
  handleChange,
  isSubmitting,
  handleContinue,
  isCalendarOpen,
  setIsCalendarOpen,
  monthNames,
  currentMonth,
  currentYear,
  handlePrevMonth,
  handleNextMonth,
  weekDays,
  daysArray,
  isDistrictOpen,
  setIsDistrictOpen,
  districtData,
  isCityOpen,
  setIsCityOpen
}) {
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToastAlert = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3500); // 3.5 செகண்ட்ல நைஸா வேனிஷ் ஆகிடும்
  };

  const handleValidationCheck = () => {
    if (!formData.name) return showToastAlert("Please enter Customer Name");
    
    if (!formData.phone || formData.phone.length !== 10) {
      return showToastAlert("Mobile Number must be exactly 10 digits");
    }
    
    if (!formData.date) return showToastAlert("Please select your Event Date");
    
    if (!formData.guests || Number(formData.guests) < 50) {
      return showToastAlert("Minimum 50 Guests count required");
    }
    
    if (!formData.district) return showToastAlert("Please select your District");
    if (!formData.city) return showToastAlert("Please select your City/Area");
    if (!formData.address) return showToastAlert("Full Address field cannot be empty");

    handleContinue();
  };

  return (
    <div className="animate-fadeIn relative">
      
      <div className="mb-8 text-left">
        <span className="inline-block bg-[#962A27]/10 text-[#962A27] px-4 py-1 rounded-full text-sm font-semibold">
          Step 1 of 5
        </span>
        <h2 className="text-3xl font-extrabold text-gray-800 mt-3"> Customer Information </h2>
        <p className="text-gray-500 mt-2"> Fill your event details to get personalized catering packages. </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-lg p-6 md:p-8">
        <div className="grid md:grid-cols-2 gap-6 text-left">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2"> Customer Name </label>
            <div className="relative">
              <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#962A27]" />
              <input type="text" placeholder="Enter Full Name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-gray-200 focus:border-[#962A27] outline-none transition-all" />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2"> Mobile Number </label>
            <div className="relative">
              <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#962A27]" />
              <input type="text" inputMode="numeric" placeholder="Enter Phone Number" value={formData.phone} onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  handleChange("phone", value);
                }
              }} className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-gray-200 focus:border-[#962A27] outline-none transition-all" />
            </div>
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2"> Event Date </label>
            <div className="relative">
              <button type="button" onClick={() => setIsCalendarOpen(true)} className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-gray-200 focus:border-[#962A27] text-left outline-none transition-all bg-white text-gray-700 font-medium flex items-center" >
                <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#962A27]" />
                {formData.date ? (
                  <span className="text-gray-800 font-semibold">
                    {new Date(formData.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </span>
                ) : (
                  <span className="text-gray-400">Select Event Date</span>
                )}
              </button>
              {isCalendarOpen && (
                <>
                  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity animate-fadeIn" onClick={() => setIsCalendarOpen(false)} />
                  <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-100 rounded-3xl p-6 shadow-2xl z-50 w-[90%] max-w-sm animate-scaleUp">
                    <div className="flex justify-between items-center mb-5">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800"> {monthNames[currentMonth]} {currentYear} </h3>
                        <p className="text-[11px] text-gray-400 font-medium">Select your event date</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button type="button" onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 hover:text-gray-900 transition-colors" title="Previous Month">
                          <ChevronLeft size={18} />
                        </button>
                        <button type="button" onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 hover:text-gray-900 transition-colors" title="Next Month">
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="mb-4 flex">
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg"> Min 48h Advance Required </span>
                    </div>
                    <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
                      {weekDays.map((day) => (
                        <span key={day} className="text-xs font-semibold text-gray-400 uppercase tracking-wider"> {day} </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center">
                      {daysArray.map((item, index) => {
                        if (item === null) return <div key={`empty-${index}`} />;
                        const isSelected = formData.date === item.dateString;
                        const isBlocked = item.isBlocked;
                        return (
                          <button type="button" key={item.dateString} disabled={isBlocked} onClick={() => { handleChange("date", item.dateString); setIsCalendarOpen(false); }} className={`h-10 w-10 mx-auto rounded-xl flex items-center justify-center text-sm font-medium transition-all relative ${isBlocked ? 'text-gray-300 bg-gray-50 cursor-not-allowed line-through' : isSelected ? 'bg-[#962A27] text-white font-bold shadow-md shadow-[#962A27]/30 scale-105' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900' }`} >
                            {item.day}
                            {!isBlocked && !isSelected && <span className="absolute bottom-1 w-1 h-1 bg-green-400 rounded-full"></span>}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-5 pt-3 border-t border-gray-100 flex justify-around text-[11px] font-medium text-gray-500">
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-200 line-through"></span> Blocked </div>
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-400"></span> Available </div>
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#962A27]"></span> Selected </div>
                    </div>
                    <button type="button" onClick={() => setIsCalendarOpen(false)} className="w-full mt-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors" > Close </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Guests Count */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2"> Guests Count </label>
            <div className="relative">
              <Users size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#962A27]" />
              <input type="number" min="50" placeholder="Minimum 50 Guests" value={formData.guests} onChange={(e) => handleChange("guests", e.target.value)} className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-gray-200 focus:border-[#962A27] outline-none transition-all" />
            </div>
          </div>

          {/* District Dropdown */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2"> Select District </label>
            <div className="relative">
              <button type="button" onClick={() => { setIsDistrictOpen(!isDistrictOpen); setIsCityOpen(false); }} className="w-full h-14 pl-12 pr-10 rounded-2xl border-2 border-gray-200 focus:border-[#962A27] outline-none text-left flex items-center bg-white transition-all text-gray-800 font-medium" >
                <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#962A27]" /> {formData.district || <span className="text-gray-400">Choose District</span>}
              </button>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                <svg className={`fill-current h-4 w-4 transition-transform duration-200 ${isDistrictOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
              {isDistrictOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsDistrictOpen(false)}></div>
                  <ul className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-2xl shadow-xl z-20 divide-y divide-gray-50 animate-fadeIn">
                    {Object.keys(districtData).sort().map((district) => (
                      <li key={district} onClick={() => { handleChange("district", district); handleChange("city", ""); setIsDistrictOpen(false); }} className={`px-5 py-3.5 text-sm cursor-pointer transition-colors hover:bg-gray-50 font-medium text-gray-700 ${formData.district === district ? 'bg-[#962A27]/5 text-[#962A27] font-bold' : ''}`} >
                        {district}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* City Dropdown */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2"> Select City / Area </label>
            <div className="relative">
              <button type="button" disabled={!formData.district} onClick={() => setIsCityOpen(!isCityOpen)} className="w-full h-14 pl-12 pr-12 rounded-2xl border-2 border-gray-200 focus:border-[#962A27] outline-none text-left transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-medium" >
                <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#962A27]" />
                <span className={!formData.city ? "text-gray-400" : "text-gray-700"}> {!formData.district ? "Select District First" : (formData.city || "Choose City")} </span>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200">
                  <svg className={`w-5 h-5 ${isCityOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {isCityOpen && formData.district && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsCityOpen(false)}></div>
                  <ul className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-2xl shadow-xl z-20 divide-y divide-gray-50 animate-fadeIn">
                    {districtData[formData.district] ? (
                      districtData[formData.district].map((city) => (
                        <li key={city} onClick={() => { handleChange("city", city); setIsCityOpen(false); }} className={`px-5 py-3.5 text-sm cursor-pointer transition-colors hover:bg-gray-50 font-medium text-gray-700 ${ formData.city === city ? 'bg-[#962A27]/5 text-[#962A27] font-bold' : '' }`} >
                          {city}
                        </li>
                      ))
                    ) : (
                      <li className="px-5 py-3.5 text-sm text-gray-400 italic">No cities found</li>
                    )}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* Full Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-gray-700"> Full Address </label>
            <textarea rows="3" placeholder="Door No, Street Name, Area, Landmark..." value={formData.address} onChange={(e) => handleChange("address", e.target.value)} className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#962A27] focus:outline-none resize-none transition-all" />
          </div>
        </div>

        {/* Features Info */}
        <div className="grid md:grid-cols-3 gap-4 mt-8 text-left">
          <div className="bg-[#962A27]/5 rounded-2xl p-4">
            <h4 className="font-bold text-[#962A27]">🍽 Catering Service</h4>
            <p className="text-sm text-gray-600 mt-1">Veg & Non-Veg Packages</p>
          </div>
          <div className="bg-[#962A27]/5 rounded-2xl p-4">
            <h4 className="font-bold text-[#962A27]">👨‍🍳 Professional Team</h4>
            <p className="text-sm text-gray-600 mt-1">Experienced Cooking Staff</p>
          </div>
          <div className="bg-[#962A27]/5 rounded-2xl p-4">
            <h4 className="font-bold text-[#962A27]">🚚 Fast Delivery</h4>
            <p className="text-sm text-gray-600 mt-1">On-Time Event Delivery</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end mt-10">
          <button
            type="button"
            onClick={handleValidationCheck}
            disabled={isSubmitting}
            className="group bg-gradient-to-r from-[#962A27] to-[#7A1F1D] hover:enabled:scale-105 transition-all duration-300 text-white px-10 py-4 rounded-2xl font-bold shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
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
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-all" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* 🎯 MUST UNDERSTAND: Dynamic Glassmorphism Modern Toast Notification Panel */}
      {toast.show && (
        <div className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:right-6 sm:left-auto z-50 flex items-center gap-3 bg-white/80 dark:bg-slate-900/90 backdrop-blur-md px-5 py-4 rounded-2xl border-l-[6px] border-[#962A27] shadow-[0_10px_30px_rgba(0,0,0,0.15)] animate-in slide-in-from-bottom sm:slide-in-from-right duration-300 w-auto max-w-sm">
          <div className="p-1.5 bg-[#962A27]/10 text-[#962A27] rounded-lg shrink-0">
            <AlertCircle size={18} />
          </div>
          <div className="text-left">
            <p className="text-xs font-black uppercase tracking-wider text-[#962A27]">Catering Alert</p>
            <p className="text-slate-700 dark:text-slate-200 text-sm font-bold mt-0.5 leading-tight">{toast.message}</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default Step1CustomerInfo;