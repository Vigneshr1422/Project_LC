import specialMenus from "../data/SpecialMenus";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from "lucide-react";

// Sub Components Import
import Step1CustomerInfo from "../components/booking/Step1CustomerInfo";
import Step2ChooseEvent from "../components/booking/Step2ChooseEvent";
import Step3FoodPreferences from "../components/booking/Step3FoodPreferences";
import Step4CateringOption from "../components/booking/Step4CateringOption";
import Step5PackageSelection from "../components/booking/Step5PackageSelection";
import Step5CustomFinalized from "../components/booking/Step5CustomFinalized";
import Step6Review from "../components/booking/Step6Review";

const districtData = {
  "Ariyalur": ["Ariyalur", "Jayankondam", "Sendurai", "Udayarpalayam"],
  "Chengalpattu": ["Chengalpattu", "Tambaram", "Pallavaram", "Chromepet", "Madipakkam", "Mahabalipuram", "Guduvancheri", "Maraimalai Nagar"],
  "Chennai": ["Chennai Central", "Adyar", "Anna Nagar", "T Nagar", "Velachery", "Mylapore", "Guindy", "Ambattur", "Avadi", "Royapettah", "Porur"],
  "Coimbatore": ["Coimbatore City", "Pollachi", "Mettupalayam", "Sulur", "Thondamuthur", "Kinathukadavu", "Valparai"],
  "Cuddalore": ["Cuddalore", "Chidambaram", "Panruti", "Virudhachalam", "Neyveli", "Tittakudi"],
  "Dharmapuri": ["Dharmapuri", "Palacode", "Pennagaram", "Harur", "Pappireddipatti"],
  "Dindigul": ["Dindigul", "Palani", "Oddanchatram", "Kodaikanal", "Natham", "Nilakottai"],
  "Erode": ["Erode", "Gobichettipalayam", "Bhavani", "Perundurai", "Sathyamangalam", "Anthiyur"],
  "Kallakurichi": ["Kallakurichi", "Sankarapuram", "Chinnasalem", "Ulundurpet", "Tirukoilur"],
  "Kancheepuram": ["Kancheepuram", "Sriperumbudur", "Walajabad", "Kundrathur", "Uthiramerur"],
  "Kanyakumari": ["Nagercoil", "Kanyakumari", "Thuckalay", "Marthandam", "Colachel", "Padmanabhapuram"],
  "Karur": ["Karur", "Kulithalai", "Aravakurichi", "Pallapatti", "Velur"],
  "Krishnagiri": ["Krishnagiri", "Hosur", "Pochampalli", "Uthangarai", "Denkanikottai"],
  "Madurai": ["Madurai City", "Melur", "Thirumangalam", "Usilampatti", "Vadipatti", "Thirupparankundram"],
  "Mayiladuthurai": ["Mayiladuthurai", "Sirkazhi", "Poompuhar", "Tharangambadi"],
  "Nagapattinam": ["Nagapattinam", "Velankanni", "Vedaranyam", "Thirukuvalai"],
  "Namakkal": ["Namakkal", "Rasipuram", "Tiruchengode", "Komarapalayam", "Paramathi Velur"],
  "Nilgiris": ["Ooty", "Coonoor", "Gudalur", "Kotagiri"],
  "Perambalur": ["Perambalur", "Kunnam", "Veppanthattai", "Alathur"],
  "Pudukkottai": ["Pudukkottai", "Aranthangi", "Arimalam", "Gandarvakottai", "Iluppur", "Thirumayam"],
  "Ramanathapuram": ["Ramanathapuram", "Paramakudi", "Rameswaram", "Keezhakarai", "Thiruvadanai"],
  "Ranipet": ["Ranipet", "Arakkonam", "Walajah", "Arcot", "Sholinghur"],
  "Salem": ["Salem City", "Attur", "Mettur", "Omalur", "Edappadi", "Sankari", "Yercaud"],
  "Sivagangai": ["Sivagangai", "Karaikudi", "Devakottai", "Manamadurai", "Ilanyangudi", "Tiruppattur"],
  "Tenkasi": ["Tenkasi", "Sankarankovil", "Kadayanallur", "Puliyangudi", "Shenkottai", "Alangulam"],
  "Thanjavur": ["Thanjavur", "Kumbakonam", "Pattukkottai", "Papanasam", "Peravurani", "Orathanadu"],
  "Theni": ["Theni", "Periyakulam", "Bodinayakanur", "Cumbum", "Uthamapalayam", "Andipatti"],
  "Thiruvallur": ["Thiruvallur", "Poonamallee", "Tiruttani", "Gummidipoondi", "Minjur", "Redhills"],
  "Thiruvarur": ["Thiruvarur", "Mannargudi", "Thiruthuraipoondi", "Nannilam", "Kudavasal"],
  "Thoothukudi": ["Thoothukudi", "Kovilpatti", "Tiruchendur", "Kayalpattinam", "Ettayapuram", "Srivaikuntam"],
  "Trichy": ["Trichy City", "Srirangam", "Manapparai", "Thuraiyur", "Lalgudi", "Musiri"],
  "Tirunelveli": ["Tirunelveli City", "Ambasamudram", "Nanguneri", "Radhapuram", "Vallioor"],
  "Tirupathur": ["Tirupathur", "Vaniyambadi", "Ambur", "Natrampalli"],
  "Tiruppur": ["Tiruppur City", "Dharapuram", "Udumalaipettai", "Avinashi", "Palladam", "Kangeyam"],
  "Tiruvannamalai": ["Tiruvannamalai", "Arani", "Cheyyar", "Polur", "Chengam", "Vandavasi"],
  "Vellore": ["Vellore City", "Katpadi", "Gudiyatham", "Pernambut", "Anaicut"],
  "Viluppuram": ["Viluppuram", "Tindivanam", "Gingee", "Marakkanam", "Vanur"],
  "Virudhunagar": ["Virudhunagar", "Sivakasi", "Rajapalayam", "Aruppukottai", "Sattur", "Srivilliputhur"]
};

const packagesData = {
  Veg: (specialMenus?.VegPackages || []).map((pkg, index) => ({
    id: `veg_${index}`, name: pkg.title?.en || '', price: pkg.price || 0, image: pkg.image, note: pkg.note,
    items: (pkg.items || []).map((item) => typeof item === 'object' ? item.en : item),
    menu: (pkg.items || []).map((item) => typeof item === 'object' ? item.en : item).join(", "),
  })),
  "Non-Veg": (specialMenus?.NonVegPackages || []).map((pkg, index) => ({
    id: `nonveg_${index}`, name: pkg.title?.en || '', price: pkg.price || 0, image: pkg.image, note: pkg.note,
    items: (pkg.items || []).map((item) => typeof item === 'object' ? item.en : item),
    menu: (pkg.items || []).map((item) => typeof item === 'object' ? item.en : item).join(", "),
  })),
};

const BookingPage = () => {
  const navigate = useNavigate();
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedPkgForModal, setSelectedPkgForModal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "", phone: "", date: "", guests: "", district: "", city: "", address: "", eventType: "", session: "",
    preference: "Veg", bookingType: "Package", selectedPackageId: "", customSelectedItems: [], customPackagePrice: 0
  });

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

// MUST UNDERSTAND: Keep this exact effect logic inside BookingPage.jsx to process live total sums
useEffect(() => {
  if (formData.bookingType === "Custom") {
    let finalCalculatedPrice = 0;
    if (formData.customSelectedItems && formData.customSelectedItems.length > 0) {
      
      const trackingSessions = ["Breakfast", "Lunch", "Dinner"];
      let allCombinedSessionItems = [];
      
      trackingSessions.forEach(sessionName => {
        const rawCategories = specialMenus[sessionName] || [];
        rawCategories.forEach(cat => {
          if (cat.items) {
            allCombinedSessionItems.push(...cat.items);
          }
        });
      });

      finalCalculatedPrice = formData.customSelectedItems.reduce((sum, selectedItemName) => {
        const originalItem = allCombinedSessionItems.find(i => i.en === selectedItemName);
        const itemPrice = originalItem ? (originalItem.price || 0) : 0;
        return sum + Number(itemPrice);
      }, 0);
    }

    setFormData((prev) => {
      if (prev.customPackagePrice !== finalCalculatedPrice) {
        return { ...prev, customPackagePrice: finalCalculatedPrice };
      }
      return prev;
    });
  }
}, [formData.customSelectedItems, formData.bookingType]);
  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((prev) => prev - 1); }
    else { setCurrentMonth((prev) => prev - 1); }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((prev) => prev + 1); }
    else { setCurrentMonth((prev) => prev + 1); }
  };

  const getCalendarDays = () => {
    const todayDate = new Date();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const daysArray = [];
    for (let i = 0; i < firstDayIndex; i++) { daysArray.push(null); }
    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(currentYear, currentMonth, day);
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const timeDiff = dateObj.getTime() - todayDate.setHours(0, 0, 0, 0);
      const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      daysArray.push({ day, dateString, isBlocked: dayDiff < 2 });
    }
    return daysArray;
  };

  const handleContinue = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    setIsSubmitting(false);
    setStep((prev) => prev + 1);
  };

  const calculateTotal = () => {
    const totalGuests = parseInt(formData.guests) || 0;
    if (formData.bookingType === "Custom") {
      return (Number(formData.customPackagePrice) || 0) * totalGuests;
    }
    const currentList = formData.preference === "Both" 
      ? [...(packagesData["Veg"] || []), ...(packagesData["Non-Veg"] || [])] 
      : packagesData[formData.preference] || [];
    const activePackage = currentList.find((p) => p.id === formData.selectedPackageId);
    return activePackage ? (Number(activePackage.price) || 0) * totalGuests : 0;
  };

  const daysArray = getCalendarDays();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const allPackages = [...packagesData["Veg"], ...packagesData["Non-Veg"]];
  const selectedPackage = allPackages.find((p) => p.id === formData.selectedPackageId);

  const handleConfirm = () => {
    const isCustom = formData.bookingType === "Custom";
    navigate("/BookingSummary", {
      state: {
        formData: {
          ...formData,
          packageName: isCustom ? "Custom Selected Menu" : (selectedPackage?.name || ""),
          packagePrice: isCustom ? formData.customPackagePrice : (selectedPackage?.price || 0),
          packageMenu: isCustom ? formData.customSelectedItems.join(", ") : (selectedPackage?.menu || ""),
          packageImage: isCustom ? "https://images.unsplash.com/photo-1555507036-ab1f4038808a" : (selectedPackage?.image || ""),
          packageItems: isCustom ? formData.customSelectedItems : (selectedPackage?.items || []),
        },
        packageItems: isCustom ? formData.customSelectedItems : (selectedPackage?.items || []),
        totalAmount: calculateTotal(),
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#962A27] to-[#7A1F1D] p-6 text-white text-center rounded-t-[2rem]">
          <h1 className="text-3xl font-bold">Catering Booking</h1>
          <div className="mt-5 flex justify-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((s) => {
              const isStepActive = formData.bookingType === "Custom" && step >= 5 ? (s === 5 ? false : step >= s - 1) : step >= s;
              return (
                <div key={s} className={`h-3 w-10 sm:w-14 rounded-full transition-all duration-300 ${isStepActive ? "bg-white shadow-sm" : "bg-white/30"}`} />
              );
            })}
          </div>
        </div>

        <div className="p-6 md:p-10">
          {step === 1 && (
            <Step1CustomerInfo 
              formData={formData} handleChange={handleChange} isSubmitting={isSubmitting} handleContinue={handleContinue}
              isCalendarOpen={isCalendarOpen} setIsCalendarOpen={setIsCalendarOpen} monthNames={monthNames} currentMonth={currentMonth}
              currentYear={currentYear} handlePrevMonth={handlePrevMonth} handleNextMonth={handleNextMonth} weekDays={weekDays}
              daysArray={daysArray} isDistrictOpen={isDistrictOpen} setIsDistrictOpen={setIsDistrictOpen} districtData={districtData}
              isCityOpen={isCityOpen} setIsCityOpen={setIsCityOpen}
            />
          )}

          {step === 2 && (
            <Step2ChooseEvent 
              formData={formData} handleChange={handleChange} prevStep={() => setStep(1)} handleContinue={handleContinue} isSubmitting={isSubmitting}
            />
          )}

          {step === 3 && (
            <Step3FoodPreferences 
              formData={formData} handleChange={handleChange} prevStep={() => setStep(2)} handleContinue={handleContinue} isSubmitting={isSubmitting}
            />
          )}

          {step === 4 && (
            <Step4CateringOption 
              formData={formData} handleChange={handleChange} setFormData={setFormData} specialMenus={specialMenus} prevStep={() => setStep(3)} setStep={setStep}
            />
          )}

          {step === 5 && formData.bookingType === "Package" && (
            <Step5PackageSelection 
              formData={formData} packagesData={packagesData} handleChange={handleChange} setSelectedPkgForModal={setSelectedPkgForModal} setStep={setStep}
            />
          )}

          {step === 5 && formData.bookingType === "Custom" && (
            <Step5CustomFinalized 
              formData={formData} setStep={setStep}
            />
          )}

          {step === 6 && (
            <Step6Review 
              formData={formData} allPackages={allPackages} calculateTotal={calculateTotal} prevStep={() => setStep(formData.bookingType === "Custom" ? 5 : 5)} handleConfirm={handleConfirm}
            />
          )}
        </div>
      </div>

      {/* MODAL */}
      {selectedPkgForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-gray-100 shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10 rounded-t-2xl">
              <div className="text-left">
                <span className="text-[10px] font-bold text-[#962A27] bg-[#962A27]/10 px-2.5 py-0.5 rounded uppercase tracking-wider"> {formData.preference} Combo </span>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight mt-1"> {selectedPkgForModal.name} </h3>
              </div>
              <button onClick={() => setSelectedPkgForModal(null)} className="p-2 hover:bg-gray-100 active:scale-95 rounded-xl transition-all text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-5 overflow-y-auto space-y-5 flex-1 bg-gray-50/50">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white border border-gray-200/60 rounded-xl p-4 text-left shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase">Rate Per Plate</p>
                  <p className="text-2xl font-black text-[#962A27] mt-0.5">₹{selectedPkgForModal.price}</p>
                </div>
                <div className="bg-white border border-gray-200/60 rounded-xl p-4 text-left shadow-sm">
                  <p className="text-xs font-bold text-gray-400 uppercase">Total Items</p>
                  <p className="text-2xl font-black text-gray-800 mt-0.5">{selectedPkgForModal.items.length} Dishes</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider text-left pl-1">Included Menu Items</p>
                <div className="space-y-1.5">
                  {selectedPkgForModal.items.map((item, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-xl px-4 py-3 flex items-center justify-between text-left shadow-sm">
                      <div className="flex items-center gap-3 truncate">
                        <span className="text-[#962A27] font-bold text-sm select-none">✓</span>
                        <span className="text-sm font-semibold text-gray-700 truncate">{item}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-white grid grid-cols-2 gap-3 sticky bottom-0 z-10 rounded-b-2xl">
              <button onClick={() => setSelectedPkgForModal(null)} className="w-full border border-gray-200 text-gray-500 bg-white rounded-xl py-3.5 font-bold text-sm hover:bg-gray-50 transition-colors"> Close </button>
              <button onClick={() => { handleChange("selectedPackageId", selectedPkgForModal.id); setSelectedPkgForModal(null); }} className="w-full bg-[#962A27] hover:bg-[#7A1F1D] text-white rounded-xl py-3.5 font-bold text-sm transition-colors shadow-md" > Select Combo </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;