import React from "react";
import { Heart, Gift, Gem, Briefcase, PartyPopper, ChevronLeft, ChevronRight } from "lucide-react";

function Step2ChooseEvent({ formData, handleChange, prevStep, handleContinue, isSubmitting }) {
  const events = [
    { name: "Wedding", icon: <Heart size={34} />, desc: "Traditional & Grand Wedding Catering" },
    { name: "Birthday", icon: <Gift size={34} />, desc: "Birthday Celebration Packages" },
    { name: "Engagement", icon: <Gem size={34} />, desc: "Elegant Engagement Events" },
    { name: "Corporate", icon: <Briefcase size={34} />, desc: "Corporate Meetings & Gatherings" },
    { name: "Other", icon: <PartyPopper size={34} />, desc: "Custom Event Catering Solutions" },
  ];

  return (
    <div className="animate-fadeIn px-2 sm:px-0">
      <div className="mb-6 sm:mb-8 text-center sm:text-left">
        <span className="inline-block bg-[#962A27]/10 text-[#962A27] px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
          Step 2 of 5
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-2 sm:mt-3"> Choose Your Event </h2>
        <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2"> Select the type of event for personalized catering recommendations. </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {events.map((event) => (
          <div key={event.name} onClick={() => handleChange("eventType", event.name)} className={`group cursor-pointer rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-lg md:hover:shadow-xl text-center sm:text-left ${ formData.eventType === event.name ? "border-[#962A27] bg-gradient-to-br from-[#962A27] to-[#7A1F1D] text-white shadow-md sm:shadow-xl" : "border-[#962A27]/20 bg-white hover:border-[#962A27]/60" }`} >
            <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto sm:mx-0 mb-4 sm:mb-5 ${ formData.eventType === event.name ? "bg-white/20 text-white" : "bg-[#962A27]/10 text-[#962A27]" }`}>
              <div className="scale-90 sm:scale-100 flex items-center justify-center"> {event.icon} </div>
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{event.name}</h3>
            <p className={`text-xs sm:text-sm leading-relaxed ${ formData.eventType === event.name ? "text-white/80" : "text-gray-500" }`}> {event.desc} </p>
            {formData.eventType === event.name && (
              <div className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold"> ✓ Selected </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-8 sm:mt-10">
        <button onClick={prevStep} className="px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gray-100 hover:bg-gray-200 font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base text-gray-700" >
          <ChevronLeft size={18} /> Back
        </button>
        <button type="button" onClick={handleContinue} disabled={isSubmitting || !formData.eventType} className="px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#962A27] to-[#7A1F1D] text-white font-bold shadow-md md:shadow-lg hover:enabled:scale-[1.02] sm:hover:enabled:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base" >
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

export default Step2ChooseEvent;