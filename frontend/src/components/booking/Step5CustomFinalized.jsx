import React from "react";

function Step5CustomFinalized({ formData, setStep }) {
  return (
    <div className="animate-fadeIn bg-white rounded-3xl p-8 border border-gray-100 shadow-lg text-center max-w-2xl mx-auto">
      <span className="text-5xl block mb-4">✅</span>
      <h3 className="text-2xl font-black text-gray-800">Custom Menu Finalized!</h3>
      <p className="text-gray-500 mt-2">
        You have successfully curated <strong className="text-[#962A27]">{formData.customSelectedItems.length} items</strong> for your custom dynamic plate layout.
      </p>
      
      <div className="mt-6 text-left max-h-[250px] overflow-y-auto border border-gray-100 rounded-2xl p-4 bg-gray-50/50">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 pl-1">Selected Plate Menu Items</p>
        {formData.customSelectedItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {formData.customSelectedItems.map((itemName, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 truncate">
                  <div className="w-3.5 h-3.5 rounded border flex items-center justify-center bg-white shrink-0 p-[2px] border-green-600">
                    <span className="text-[6px] leading-none text-green-600">●</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 truncate capitalize">{itemName}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic pl-1">No items selected yet.</p>
        )}
      </div>
      
      <div className="bg-gray-50 rounded-2xl p-4 my-6 inline-block w-full border">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-bold">Plate Rate Summary</p>
        <p className="text-3xl font-black text-[#962A27] mt-1">
          ₹{Number(formData.customPackagePrice) || 0} <span className="text-xs text-gray-500 font-normal">/ Per Plate</span>
        </p>
      </div>
      
      <div className="flex justify-center gap-3">
        <button type="button" onClick={() => setStep(4)} className="px-6 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50 transition"> Modify Items </button>
        <button type="button" onClick={() => setStep(6)} className="px-8 py-3 rounded-xl bg-[#962A27] hover:bg-[#7A1F1D] text-white font-bold transition-all shadow-md"> Proceed to Review → </button>
      </div>
    </div>
  );
}

export default Step5CustomFinalized;