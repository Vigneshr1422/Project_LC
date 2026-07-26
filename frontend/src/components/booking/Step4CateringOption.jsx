import React from "react";

function Step4CateringOption({ formData, handleChange, setFormData, specialMenus, prevStep, setStep }) {
  return (
    <div className="animate-fadeIn px-2 sm:px-0">
      <div className="text-center mb-8">
        <span className="inline-block bg-[#962A27]/10 text-[#962A27] px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
          Step 4 of 5
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-2">Catering Option</h2>
        <p className="text-sm sm:text-base text-gray-500 mt-1">Choose a readymade package or build your own menu dynamically.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
        <div onClick={() => { handleChange("bookingType", "Package"); handleChange("customSelectedItems", []); handleChange("customPackagePrice", 0); }} className={`cursor-pointer rounded-2xl p-6 border-2 text-center transition-all ${ formData.bookingType === "Package" ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md" : "border-gray-200 bg-white text-gray-600" }`} >
          <span className="text-3xl block mb-2">📦</span>
          <h4 className="text-lg font-bold"> Readymade Packages</h4>
          <p className="text-xs text-gray-400 mt-1">Pick from our premium pre-curated combos.</p>
        </div>
        <div onClick={() => { handleChange("bookingType", "Custom"); handleChange("selectedPackageId", ""); }} className={`cursor-pointer rounded-2xl p-6 border-2 text-center transition-all ${ formData.bookingType === "Custom" ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md" : "border-gray-200 bg-white text-gray-600" }`} >
          <span className="text-3xl block mb-2">🍽️</span>
          <h4 className="text-lg font-bold">Custom Menu Builder</h4>
          <p className="text-xs text-gray-400 mt-1">Select individual items to build a custom plate.</p>
        </div>
      </div>

      {formData.bookingType === "Custom" && (
        <div className="bg-white rounded-3xl p-4 sm:p-8 border border-gray-100 shadow-sm space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-2">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Dynamic Menu List</h3>
              <p className="text-xs text-gray-400 mt-0.5">Prices are calculated live based on selections from all sessions.</p>
            </div>
            <div className="bg-[#962A27] text-white px-5 py-3 rounded-2xl text-center sm:text-right shrink-0">
              <p className="text-xs opacity-75 font-bold uppercase tracking-wider">Estimated Plate Rate</p>
              <p className="text-2xl font-black">₹{formData.customPackagePrice} <span className="text-xs font-normal">/ Plate</span></p>
            </div>
          </div>
          
          {(() => {
            const allAvailableSessions = ["Breakfast", "Lunch", "Dinner"];
            let unifiedCategories = [];
            
            allAvailableSessions.forEach(sessionName => {
              if (specialMenus[sessionName]) {
                specialMenus[sessionName].forEach(cat => {
                  unifiedCategories.push({
                    ...cat,
                    sessionTag: sessionName
                  });
                });
              }
            });

            return (
              <div className="space-y-6">
                {unifiedCategories.map((category, catIdx) => {
                  const filteredItems = category.items || [];
                  if (filteredItems.length === 0) return null;
                  
                  return (
                    <div key={catIdx} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-extrabold text-gray-700 text-sm border-l-4 border-[#962A27] pl-2 uppercase tracking-wider">
                          {category.title.en}
                        </h4>
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-semibold uppercase">
                          {category.sessionTag}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {filteredItems.map((item, itemIdx) => {
                          const isChecked = formData.customSelectedItems.includes(item.en);
                          return (
                            <div key={itemIdx} onClick={() => {
                              let updatedList = [...formData.customSelectedItems];
                              if (isChecked) {
                                updatedList = updatedList.filter(i => i !== item.en);
                              } else {
                                updatedList.push(item.en);
                              }
                              // MUST UNDERSTAND: Triggers master layout sync via handleChange to force immediate price evaluation
                              handleChange("customSelectedItems", updatedList);
                            }} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${ isChecked ? "border-green-600 bg-green-50/40" : "border-gray-100 bg-gray-50/50 hover:border-gray-200" }`} >
                              <div className="flex items-center gap-3 text-left">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center text-xs text-white ${ isChecked ? "bg-green-600 border-green-600" : "border-gray-300 bg-white" }`}>
                                  {isChecked && "✓"}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <p className="font-bold text-gray-800 text-sm">{item.en}</p>
                                    <span className={`text-[9px] px-1.5 py-0.2 rounded border ${item.type === 'veg' ? 'border-green-600 text-green-600 bg-green-50' : 'border-red-600 text-red-600 bg-red-50'}`}>
                                      {item.type === 'veg' ? 'Veg' : 'Non-Veg'}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-400">{item.ta}</p>
                                </div>
                              </div>
                              <span className="font-extrabold text-[#962A27] text-sm shrink-0">₹{item.price}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {/* Bottom Sticky Action Interface */}
      <div className="sticky bottom-4 mt-8 bg-white border border-gray-200/90 shadow-2xl rounded-2xl p-4 sm:p-5 z-40">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-gray-800 text-sm sm:text-base tracking-tight">Catering Choice</h4>
            <p className="text-gray-500 text-xs sm:text-sm font-semibold mt-0.5">
              {formData.bookingType === "Custom" ? `✨ ${formData.customSelectedItems?.length || 0} Custom Items Selected` : "📋 Standard Selection Mode"}
            </p>
          </div>
          <div className="flex items-center justify-stretch sm:justify-end gap-3 w-full sm:w-auto">
            <button onClick={prevStep} className="flex-1 sm:flex-initial px-5 sm:px-6 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 text-xs sm:text-sm bg-white hover:bg-gray-50 active:scale-[0.98] transition-all text-center" >
              Back
            </button>
            <button onClick={() => setStep(5)} disabled={formData.bookingType === "Custom" && (!formData.customSelectedItems || formData.customSelectedItems.length === 0)} className="flex-1 sm:flex-initial px-7 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-[#962A27] to-[#7A1F1D] text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.01] sm:hover:scale-105 active:scale-[0.98] transition-all duration-300 disabled:pointer-events-none disabled:bg-none disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none text-center" >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step4CateringOption;
// import React from "react";

// function Step4CateringOption({ formData, handleChange, setFormData, specialMenus, prevStep, setStep }) {
//   return (
//     <div className="animate-fadeIn px-2 sm:px-0">
//       <div className="text-center mb-8">
//         <span className="inline-block bg-[#962A27]/10 text-[#962A27] px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
//           Step 4 of 5
//         </span>
//         <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-2">Catering Option</h2>
//         <p className="text-sm sm:text-base text-gray-500 mt-1">Choose a readymade package or build your own menu dynamically.</p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
//         <div onClick={() => { handleChange("bookingType", "Package"); handleChange("customSelectedItems", []); handleChange("customPackagePrice", 0); }} className={`cursor-pointer rounded-2xl p-6 border-2 text-center transition-all ${ formData.bookingType === "Package" ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md" : "border-gray-200 bg-white text-gray-600" }`} >
//           <span className="text-3xl block mb-2">📦</span>
//           <h4 className="text-lg font-bold"> Readymade Packages</h4>
//           <p className="text-xs text-gray-400 mt-1">Pick from our premium pre-curated combos.</p>
//         </div>
//         <div onClick={() => { handleChange("bookingType", "Custom"); handleChange("selectedPackageId", ""); }} className={`cursor-pointer rounded-2xl p-6 border-2 text-center transition-all ${ formData.bookingType === "Custom" ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md" : "border-gray-200 bg-white text-gray-600" }`} >
//           <span className="text-3xl block mb-2">🍽️</span>
//           <h4 className="text-lg font-bold">Custom Menu Builder</h4>
//           <p className="text-xs text-gray-400 mt-1">Select individual items to build a custom plate.</p>
//         </div>
//       </div>

//       {formData.bookingType === "Custom" && (
//         <div className="bg-white rounded-3xl p-4 sm:p-8 border border-gray-100 shadow-sm space-y-8 animate-in fade-in duration-300">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-2">
//             <div>
//               <h3 className="text-xl font-bold text-gray-800">Dynamic Menu List</h3>
//               <p className="text-xs text-gray-400 mt-0.5">Prices are calculated live based on selections.</p>
//             </div>
//             <div className="bg-[#962A27] text-white px-5 py-3 rounded-2xl text-center sm:text-right shrink-0">
//               <p className="text-xs opacity-75 font-bold uppercase tracking-wider">Estimated Plate Rate</p>
//               <p className="text-2xl font-black">₹{formData.customPackagePrice} <span className="text-xs font-normal">/ Plate</span></p>
//             </div>
//           </div>
          
//           {(() => {
//             const currentSession = formData.session || "Breakfast";
//             const rawItems = specialMenus[currentSession] || [];
//             return (
//               <div className="space-y-6">
//                 {rawItems.map((category, catIdx) => {
//                   const filteredItems = category.items.filter(item => {
//                     if (formData.preference === "Veg") return item.type === "veg";
//                     if (formData.preference === "Non-Veg") return item.type === "non-veg";
//                     return true;
//                   });
//                   if (filteredItems.length === 0) return null;
//                   return (
//                     <div key={catIdx} className="space-y-3">
//                       <h4 className="font-extrabold text-gray-700 text-sm border-l-4 border-[#962A27] pl-2 uppercase tracking-wider">
//                         {category.title.en}
//                       </h4>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                         {filteredItems.map((item, itemIdx) => {
//                           const isChecked = formData.customSelectedItems.includes(item.en);
//                           return (
//                             <div key={itemIdx} onClick={() => {
//                               let updatedList = [...formData.customSelectedItems];
//                               if (isChecked) {
//                                 updatedList = updatedList.filter(i => i !== item.en);
//                               } else {
//                                 updatedList.push(item.en);
//                               }
//                               setFormData(prev => ({ ...prev, customSelectedItems: updatedList }));
//                             }} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${ isChecked ? "border-green-600 bg-green-50/40" : "border-gray-100 bg-gray-50/50 hover:border-gray-200" }`} >
//                               <div className="flex items-center gap-3 text-left">
//                                 <div className={`w-5 h-5 rounded border flex items-center justify-center text-xs text-white ${ isChecked ? "bg-green-600 border-green-600" : "border-gray-300 bg-white" }`}>
//                                   {isChecked && "✓"}
//                                 </div>
//                                 <div>
//                                   <p className="font-bold text-gray-800 text-sm">{item.en}</p>
//                                   <p className="text-xs text-gray-400">{item.ta}</p>
//                                 </div>
//                               </div>
//                               <span className="font-extrabold text-[#962A27] text-sm shrink-0">₹{item.price}</span>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             );
//           })()}
//         </div>
//       )}

//       {/* Bottom Sticky Action Interface */}
//       <div className="sticky bottom-4 mt-8 bg-white border border-gray-200/90 shadow-2xl rounded-2xl p-4 sm:p-5 z-40">
//         <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
//           <div className="text-center sm:text-left">
//             <h4 className="font-bold text-gray-800 text-sm sm:text-base tracking-tight">Catering Choice</h4>
//             <p className="text-gray-500 text-xs sm:text-sm font-semibold mt-0.5">
//               {formData.bookingType === "Custom" ? `✨ ${formData.customSelectedItems?.length || 0} Custom Items Selected` : "📋 Standard Selection Mode"}
//             </p>
//           </div>
//           <div className="flex items-center justify-stretch sm:justify-end gap-3 w-full sm:w-auto">
//             <button onClick={prevStep} className="flex-1 sm:flex-initial px-5 sm:px-6 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 text-xs sm:text-sm bg-white hover:bg-gray-50 active:scale-[0.98] transition-all text-center" >
//               Back
//             </button>
//             <button onClick={() => setStep(5)} disabled={formData.bookingType === "Custom" && (!formData.customSelectedItems || formData.customSelectedItems.length === 0)} className="flex-1 sm:flex-initial px-7 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-[#962A27] to-[#7A1F1D] text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.01] sm:hover:scale-105 active:scale-[0.98] transition-all duration-300 disabled:pointer-events-none disabled:bg-none disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none text-center" >
//               Continue
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Step4CateringOption;




// // import React from "react";

// // function Step4CateringOption({ formData, handleChange, setFormData, specialMenus, prevStep, setStep }) {
// //   return (
// //     <div className="animate-fadeIn px-2 sm:px-0">
// //       <div className="text-center mb-8">
// //         <span className="inline-block bg-[#962A27]/10 text-[#962A27] px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
// //           Step 4 of 5
// //         </span>
// //         <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-2">Catering Option</h2>
// //         <p className="text-sm sm:text-base text-gray-500 mt-1">Choose a readymade package or build your own menu dynamically.</p>
// //       </div>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
// //         <div onClick={() => { handleChange("bookingType", "Package"); handleChange("customSelectedItems", []); handleChange("customPackagePrice", 0); }} className={`cursor-pointer rounded-2xl p-6 border-2 text-center transition-all ${ formData.bookingType === "Package" ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md" : "border-gray-200 bg-white text-gray-600" }`} >
// //           <span className="text-3xl block mb-2">📦</span>
// //           <h4 className="text-lg font-bold"> Readymade Packages</h4>
// //           <p className="text-xs text-gray-400 mt-1">Pick from our premium pre-curated combos.</p>
// //         </div>
// //         <div onClick={() => { handleChange("bookingType", "Custom"); handleChange("selectedPackageId", ""); }} className={`cursor-pointer rounded-2xl p-6 border-2 text-center transition-all ${ formData.bookingType === "Custom" ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md" : "border-gray-200 bg-white text-gray-600" }`} >
// //           <span className="text-3xl block mb-2">🍽️</span>
// //           <h4 className="text-lg font-bold">Custom Menu Builder</h4>
// //           <p className="text-xs text-gray-400 mt-1">Select individual items to build a custom plate.</p>
// //         </div>
// //       </div>

// //       {formData.bookingType === "Custom" && (
// //         <div className="bg-white rounded-3xl p-4 sm:p-8 border border-gray-100 shadow-sm space-y-8 animate-in fade-in duration-300">
// //           <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-2">
// //             <div>
// //               <h3 className="text-xl font-bold text-gray-800">Dynamic Menu List</h3>
// //               <p className="text-xs text-gray-400 mt-0.5">Prices are calculated live based on selections from all sessions.</p>
// //             </div>
// //             <div className="bg-[#962A27] text-white px-5 py-3 rounded-2xl text-center sm:text-right shrink-0">
// //               <p className="text-xs opacity-75 font-bold uppercase tracking-wider">Estimated Plate Rate</p>
// //               <p className="text-2xl font-black">₹{formData.customPackagePrice} <span className="text-xs font-normal">/ Plate</span></p>
// //             </div>
// //           </div>
          
// //           {(() => {
// //             // MUST UNDERSTAND: Gathering and merging all session groups (Breakfast, Lunch, Dinner) into one single comprehensive array
// //             const allAvailableSessions = ["Breakfast", "Lunch", "Dinner"];
// //             let unifiedCategories = [];
            
// //             allAvailableSessions.forEach(sessionName => {
// //               if (specialMenus[sessionName]) {
// //                 specialMenus[sessionName].forEach(cat => {
// //                   unifiedCategories.push({
// //                     ...cat,
// //                     sessionTag: sessionName // Tracks item origin for badge mapping
// //                   });
// //                 });
// //               }
// //             });

// //             return (
// //               <div className="space-y-6">
// //                 {unifiedCategories.map((category, catIdx) => {
// //                   const filteredItems = category.items || [];
// //                   if (filteredItems.length === 0) return null;
                  
// //                   return (
// //                     <div key={catIdx} className="space-y-3">
// //                       <div className="flex items-center gap-3">
// //                         <h4 className="font-extrabold text-gray-700 text-sm border-l-4 border-[#962A27] pl-2 uppercase tracking-wider">
// //                           {category.title.en}
// //                         </h4>
// //                         <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-500 font-semibold uppercase">
// //                           {category.sessionTag}
// //                         </span>
// //                       </div>
                      
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
// //                         {filteredItems.map((item, itemIdx) => {
// //                           const isChecked = formData.customSelectedItems.includes(item.en);
// //                           return (
// //                             <div key={itemIdx} onClick={() => {
// //                               let updatedList = [...formData.customSelectedItems];
// //                               if (isChecked) {
// //                                 updatedList = updatedList.filter(i => i !== item.en);
// //                               } else {
// //                                 updatedList.push(item.en);
// //                               }
// //                               setFormData(prev => ({ ...prev, customSelectedItems: updatedList }));
// //                             }} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${ isChecked ? "border-green-600 bg-green-50/40" : "border-gray-100 bg-gray-50/50 hover:border-gray-200" }`} >
// //                               <div className="flex items-center gap-3 text-left">
// //                                 <div className={`w-5 h-5 rounded border flex items-center justify-center text-xs text-white ${ isChecked ? "bg-green-600 border-green-600" : "border-gray-300 bg-white" }`}>
// //                                   {isChecked && "✓"}
// //                                 </div>
// //                                 <div>
// //                                   <div className="flex items-center gap-2">
// //                                     <p className="font-bold text-gray-800 text-sm">{item.en}</p>
// //                                     <span className={`text-[9px] px-1.5 py-0.2 rounded border ${item.type === 'veg' ? 'border-green-600 text-green-600 bg-green-50' : 'border-red-600 text-red-600 bg-red-50'}`}>
// //                                       {item.type === 'veg' ? 'Veg' : 'Non-Veg'}
// //                                     </span>
// //                                   </div>
// //                                   <p className="text-xs text-gray-400">{item.ta}</p>
// //                                 </div>
// //                               </div>
// //                               <span className="font-extrabold text-[#962A27] text-sm shrink-0">₹{item.price}</span>
// //                             </div>
// //                           );
// //                         })}
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             );
// //           })()}
// //         </div>
// //       )}

// //       {/* Bottom Sticky Action Interface */}
// //       <div className="sticky bottom-4 mt-8 bg-white border border-gray-200/90 shadow-2xl rounded-2xl p-4 sm:p-5 z-40">
// //         <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
// //           <div className="text-center sm:text-left">
// //             <h4 className="font-bold text-gray-800 text-sm sm:text-base tracking-tight">Catering Choice</h4>
// //             <p className="text-gray-500 text-xs sm:text-sm font-semibold mt-0.5">
// //               {formData.bookingType === "Custom" ? `✨ ${formData.customSelectedItems?.length || 0} Custom Items Selected` : "📋 Standard Selection Mode"}
// //             </p>
// //           </div>
// //           <div className="flex items-center justify-stretch sm:justify-end gap-3 w-full sm:w-auto">
// //             <button onClick={prevStep} className="flex-1 sm:flex-initial px-5 sm:px-6 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 text-xs sm:text-sm bg-white hover:bg-gray-50 active:scale-[0.98] transition-all text-center" >
// //               Back
// //             </button>
// //             <button onClick={() => setStep(5)} disabled={formData.bookingType === "Custom" && (!formData.customSelectedItems || formData.customSelectedItems.length === 0)} className="flex-1 sm:flex-initial px-7 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-[#962A27] to-[#7A1F1D] text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.01] sm:hover:scale-105 active:scale-[0.98] transition-all duration-300 disabled:pointer-events-none disabled:bg-none disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none text-center" >
// //               Continue
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Step4CateringOption;