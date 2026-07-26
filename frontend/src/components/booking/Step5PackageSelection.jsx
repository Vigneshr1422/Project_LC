import React from "react";
import { ArrowRight } from "lucide-react";

function Step5PackageSelection({ formData, packagesData, handleChange, setSelectedPkgForModal, setStep }) {
  const continueBarRef = React.createRef();
  const availablePackages = formData.preference === "Both" 
    ? [...(packagesData["Veg"] || []), ...(packagesData["Non-Veg"] || [])] 
    : packagesData[formData.preference] || [];

  const handlePackageSelectAndScroll = (pkgId) => {
    handleChange("selectedPackageId", pkgId);
    setTimeout(() => {
      if (continueBarRef.current) {
        continueBarRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <div className="animate-fadeIn px-2 sm:px-0">
      <div className="text-center mb-6 sm:mb-10">
        <h2 className="text-2xl sm:text-4xl font-black text-gray-800 tracking-tight"> Choose Your Catering Package </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-2"> Compare packages and select the best option for your event </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {availablePackages.map((pkg) => (
          <div key={pkg.id} className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${ formData.selectedPackageId === pkg.id ? "border-[#962A27] shadow-md sm:shadow-xl ring-1 ring-[#962A27]/30" : "border-gray-200 shadow-sm hover:shadow-md md:hover:shadow-lg" }`} >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-0">
              <div className="md:col-span-1 lg:col-span-3 w-full h-48 sm:h-56 md:h-full relative shrink-0">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                {formData.selectedPackageId === pkg.id && (
                  <div className="absolute top-3 left-3 md:hidden bg-[#962A27] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow"> Selected </div>
                )}
              </div>
              
              <div className="md:col-span-1 lg:col-span-6 p-5 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100 text-left">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">{pkg.name}</h3>
                    {formData.selectedPackageId === pkg.id && (
                      <span className="hidden md:inline-block bg-[#962A27] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"> Selected </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium mb-4 sm:mb-5">Premium Catering Setup Platter</p>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2.5">
                    {(pkg.items || []).slice(0, 6).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-600">
                        <span className="text-[#962A27] font-bold select-none mt-0.5">✓</span>
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {pkg.items?.length > 6 && (
                  <div className="mt-4 text-xs sm:text-sm text-[#962A27] font-bold bg-[#962A27]/5 px-3 py-1.5 rounded-xl w-fit"> + {pkg.items.length - 6} More Delicious Items Included </div>
                )}
              </div>
              
              <div className="md:col-span-1 lg:col-span-3 bg-gray-50/50 p-5 sm:p-6 flex flex-col justify-center items-stretch text-center relative">
                <div>
                  <div className="text-gray-400 text-xs font-bold uppercase tracking-wider">Starting From</div>
                  <div className="text-3xl sm:text-4xl font-black text-[#962A27] mt-1 tracking-tight">₹{pkg.price}</div>
                  <div className="text-xs text-gray-400 font-medium mt-0.5">Per Plate Layout</div>
                </div>
                <div className="mt-5 sm:mt-6 space-y-2.5">
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5">
                    <button onClick={() => setSelectedPkgForModal(pkg)} className="w-full border border-gray-300 bg-white text-gray-700 rounded-xl py-3 font-bold text-xs sm:text-sm hover:bg-gray-50 transition-colors shadow-sm cursor-pointer" > View Full Menu </button>
                    <button onClick={() => handlePackageSelectAndScroll(pkg.id)} className={`w-full py-3 rounded-xl text-white font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer ${ formData.selectedPackageId === pkg.id ? "bg-[#7A1F1D]" : "bg-[#962A27] hover:bg-[#7A1F1D] active:scale-[0.98]" }`} >
                      {formData.selectedPackageId === pkg.id ? "Selected ✓" : "Select Combo"}
                    </button>
                  </div>
                  {formData.selectedPackageId === pkg.id && (
                    <button onClick={() => setStep(6)} className="w-full bg-gradient-to-r from-[#962A27] to-[#7A1F1D] hover:from-[#7A1F1D] hover:to-[#962A27] text-white py-3 rounded-xl font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer border border-red-800 transition-all duration-300" >
                      <span>Continue to Next Step</span>
                      <ArrowRight size={16} className="text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* பாட்டம் பார் */}
      <div ref={continueBarRef} className="sticky bottom-4 mt-8 z-40">
        <div className="bg-white border border-gray-200/80 shadow-xl rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 text-left">
          <div>
            <h4 className="font-bold text-gray-800 text-sm sm:text-base">Selected Package Config</h4>
            <p className="text-gray-400 text-xs sm:text-sm font-medium mt-0.5">
              {formData.selectedPackageId ? `Package ID : ${formData.selectedPackageId}` : "No package selected yet"}
            </p>
          </div>
          <div className="flex items-center justify-stretch sm:justify-end gap-2.5">
            <button onClick={() => setStep(4)} className="flex-1 sm:flex-initial px-5 sm:px-6 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 text-sm hover:bg-gray-50 transition-all text-center cursor-pointer"> Back </button>
            <button onClick={() => setStep(6)} disabled={!formData.selectedPackageId} className="flex-1 sm:flex-initial px-7 sm:px-8 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#962A27] to-[#7A1F1D] text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg hover:scale-[1.02] sm:hover:scale-105 active:scale-[0.98] transition-all duration-300 disabled:pointer-events-none disabled:bg-none disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none text-center flex items-center justify-center gap-2 cursor-pointer" >
              Continue <span className="text-xs sm:text-sm tracking-wider">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step5PackageSelection;