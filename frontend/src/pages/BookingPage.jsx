import Loader from "../components/Loader";
import specialMenus from "../data/SpecialMenus";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Phone,
  Calendar,
  Users,
  MapPin,
  ArrowRight, 
  ChevronLeft,
  ChevronRight,
  Heart,
  Briefcase,
  Gift,
  Gem,
  CheckCircle,
  PartyPopper,
  X,
} from "lucide-react";


// District Data
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



// FIXED PACKAGES DATA MAPPING LOGIC FOR NEW ARRAY STRUCTURE
const packagesData = {
  Veg: (specialMenus?.VegPackages || []).map((pkg, index) => ({
    id: `veg_${index}`,
    name: pkg.title?.en || '',
    price: pkg.price || 0,
    image: pkg.image,
    note: pkg.note,
    items: (pkg.items || []).map((item) => typeof item === 'object' ? item.en : item), 
    menu: (pkg.items || []).map((item) => typeof item === 'object' ? item.en : item).join(", "), 
  })),

  "Non-Veg": (specialMenus?.NonVegPackages || []).map((pkg, index) => ({
    id: `nonveg_${index}`,
    name: pkg.title?.en || '',
    price: pkg.price || 0,
    image: pkg.image,
    note: pkg.note,
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
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    guests: "",
    district: "",
    city: "",
    address: "",
    eventType: "",
    session: "",           
    preference: "Veg",     
    bookingType: "Package", 
    selectedPackageId: "",
    customSelectedItems: [], 
    customPackagePrice: 0  
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // =========================================================================
  // 🎯 🔥 GLOBAL STEP SCROLL MANAGER (RULES OF HOOKS SAFE)
  // =========================================================================
  // எந்த கண்டிஷனல் பிளாக்குள்ளயும் இல்லாம டாப் லெவல்ல இத வச்சிருக்கோம்.
  // கஸ்டமர் அல்லது அட்மின் எந்த ஸ்டெப்புக்கு மாறினாலும் ஸ்கிரீன் ஸ்மூத்தா மேல போயிடும்.
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // நைஸா மெதுவா மேல ஸ்க்ரோல் ஆகும்
    });
  }, [step]); // 'step' ஸ்டேட் எப்போ மாறினாலும் இந்த எஃபெக்ட் உடனே ட்ரிக்கர் ஆகும்

  // 🌟 FIX 2: DYNAMIC CUSTOM PRICE CALCULATOR
  useEffect(() => {
    if (formData.bookingType === "Custom") {
      let finalCalculatedPrice = 0;

      if (formData.customSelectedItems && formData.customSelectedItems.length > 0) {
        const currentSession = formData.session || "Breakfast";
        const rawCategories = specialMenus[currentSession] || [];
        
        // Flatten doing data fetch to read individual item details
        const allSessionItems = rawCategories.reduce((acc, cat) => [...acc, ...(cat.items || [])], []);

        finalCalculatedPrice = formData.customSelectedItems.reduce((sum, selectedItemName) => {
          const originalItem = allSessionItems.find(i => i.en === selectedItemName);
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
  }, [formData.customSelectedItems, formData.bookingType, formData.session]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const getCalendarDays = () => {
    const todayDate = new Date();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const daysArray = [];

    for (let i = 0; i < firstDayIndex; i++) {
      daysArray.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      const dateObj = new Date(currentYear, currentMonth, day);
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const timeDiff = dateObj.getTime() - todayDate.setHours(0, 0, 0, 0);
      const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      
      const isBlocked = dayDiff < 2;
      daysArray.push({ day, dateString, isBlocked });
    }

    return daysArray;
  };

  const handleContinue = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 200));
    setIsSubmitting(false);
    nextStep();
  };

  const daysArray = getCalendarDays();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const nextStep = () => {
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  // 🌟 FIX 3: RECURSIVE SAFE MULTI-PREFERENCE CALCULATOR
  const calculateTotal = () => {
    const totalGuests = parseInt(formData.guests) || 0;

    if (formData.bookingType === "Custom") {
      const platePrice = Number(formData.customPackagePrice) || 0;
      return platePrice * totalGuests;
    }

    let currentList = [];
    if (formData.preference === "Veg") {
      currentList = packagesData["Veg"] || [];
    } else if (formData.preference === "Non-Veg") {
      currentList = packagesData["Non-Veg"] || [];
    } else {
      currentList = [...(packagesData["Veg"] || []), ...(packagesData["Non-Veg"] || [])];
    }

    const activePackage = currentList.find(
      (p) => p.id === formData.selectedPackageId
    );

    return activePackage ? (Number(activePackage.price) || 0) * totalGuests : 0;
  };

  const allPackages = [
    ...packagesData["Veg"],
    ...packagesData["Non-Veg"],
  ];

  const selectedPackage = allPackages.find(
    (p) => p.id === formData.selectedPackageId
  );

  // ... Rest of the component code / return statement remains exactly the same ...

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#962A27] to-[#7A1F1D] p-6 text-white text-center rounded-t-[2rem]">
          <h1 className="text-3xl font-bold">Catering Booking</h1>
          <div className="mt-5 flex justify-center gap-2">
            {[1, 2, 3, 4, 5, 6].map((s) => {
              const isStepActive = 
                formData.bookingType === "Custom" && step >= 5
                  ? (s === 5 ? false : step >= s - 1)
                  : step >= s;

              return (
                <div 
                  key={s} 
                  className={`h-3 w-10 sm:w-14 rounded-full transition-all duration-300 ${
                    isStepActive ? "bg-white shadow-sm" : "bg-white/30"
                  }`} 
                />
              );
            })}
          </div>
        </div>

        <div className="p-6 md:p-10">
          
          {/* STEP 1: CUSTOMER DETAILS */}
          {step === 1 && (
            <div className="animate-fadeIn">
              <div className="mb-8">
                <span className="inline-block bg-[#962A27]/10 text-[#962A27] px-4 py-1 rounded-full text-sm font-semibold">
                  Step 1 of 5
                </span>
                <h2 className="text-3xl font-extrabold text-gray-800 mt-3">
                  Customer Information
                </h2>
                <p className="text-gray-500 mt-2">
                  Fill your event details to get personalized catering packages.
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl shadow-lg p-6 md:p-8">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Customer Name
                    </label>
                    <div className="relative">
                      <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#962A27]" />
                      <input
                        type="text"
                        placeholder="Enter Full Name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-gray-200 focus:border-[#962A27] outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#962A27]" />
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="Enter Phone Number"
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (value.length <= 10) {
                            handleChange("phone", value);
                          }
                        }}
                        className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-gray-200 focus:border-[#962A27] outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Event Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Event Date
                    </label>
                    
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsCalendarOpen(true)}
                        className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-gray-200 focus:border-[#962A27] text-left outline-none transition-all bg-white text-gray-700 font-medium flex items-center"
                      >
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
                          <div 
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity animate-fadeIn"
                            onClick={() => setIsCalendarOpen(false)}
                          />
                          
                          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-100 rounded-3xl p-6 shadow-2xl z-50 w-[90%] max-w-sm animate-scaleUp">
                            <div className="flex justify-between items-center mb-5">
                              <div>
                                <h3 className="text-lg font-bold text-gray-800">
                                  {monthNames[currentMonth]} {currentYear}
                                </h3>
                                <p className="text-[11px] text-gray-400 font-medium">Select your event date</p>
                              </div>
                              
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={handlePrevMonth}
                                  className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 hover:text-gray-900 transition-colors"
                                  title="Previous Month"
                                >
                                  <ChevronLeft size={18} /> 
                                </button>

                                <button
                                  type="button"
                                  onClick={handleNextMonth}
                                  className="p-2 hover:bg-gray-100 rounded-xl text-gray-600 hover:text-gray-900 transition-colors"
                                  title="Next Month"
                                >
                                  <ChevronRight size={18} />
                                </button>
                              </div>
                            </div>

                            <div className="mb-4 flex">
                              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-lg">
                                Min 48h Advance Required
                              </span>
                            </div>

                            <div className="grid grid-cols-7 gap-y-2 text-center mb-2">
                              {weekDays.map((day) => (
                                <span key={day} className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                  {day}
                                </span>
                              ))}
                            </div>

                            <div className="grid grid-cols-7 gap-2 text-center">
                              {daysArray.map((item, index) => {
                                if (item === null) {
                                  return <div key={`empty-${index}`} />;
                                }

                                const isSelected = formData.date === item.dateString;
                                const isBlocked = item.isBlocked;

                                return (
                                  <button
                                    type="button"
                                    key={item.dateString}
                                    disabled={isBlocked}
                                    onClick={() => {
                                      handleChange("date", item.dateString);
                                      setIsCalendarOpen(false);
                                    }}
                                    className={`h-10 w-10 mx-auto rounded-xl flex items-center justify-center text-sm font-medium transition-all relative
                                      ${isBlocked 
                                        ? 'text-gray-300 bg-gray-50 cursor-not-allowed line-through' 
                                        : isSelected 
                                          ? 'bg-[#962A27] text-white font-bold shadow-md shadow-[#962A27]/30 scale-105' 
                                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                      }`}
                                  >
                                    {item.day}
                                    {!isBlocked && !isSelected && (
                                      <span className="absolute bottom-1 w-1 h-1 bg-green-400 rounded-full"></span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            <div className="mt-5 pt-3 border-t border-gray-100 flex justify-around text-[11px] font-medium text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-gray-200 line-through"></span> Blocked
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-green-400"></span> Available
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#962A27]"></span> Selected
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => setIsCalendarOpen(false)}
                              className="w-full mt-4 py-2.5 text-sm font-semibold text-gray-500 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                            >
                              Close
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Guests Count */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Guests Count
                    </label>
                    <div className="relative">
                      <Users size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#962A27]" />
                      <input
                        type="number"
                        min="50"
                        placeholder="Minimum 50 Guests"
                        value={formData.guests}
                        onChange={(e) => handleChange("guests", e.target.value)}
                        className="w-full h-14 pl-12 pr-4 rounded-2xl border-2 border-gray-200 focus:border-[#962A27] outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* District Dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select District
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => {
                          setIsDistrictOpen(!isDistrictOpen);
                          setIsCityOpen(false);
                        }}
                        className="w-full h-14 pl-12 pr-10 rounded-2xl border-2 border-gray-200 focus:border-[#962A27] outline-none text-left flex items-center bg-white transition-all text-gray-800 font-medium"
                      >
                        <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#962A27]" />
                        {formData.district || <span className="text-gray-400">Choose District</span>}
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
                              <li
                                key={district}
                                onClick={() => {
                                  handleChange("district", district);
                                  handleChange("city", "");
                                  setIsDistrictOpen(false);
                                }}
                                className={`px-5 py-3.5 text-sm cursor-pointer transition-colors hover:bg-gray-50 font-medium text-gray-700 ${formData.district === district ? 'bg-[#962A27]/5 text-[#962A27] font-bold' : ''}`}
                              >
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Select City / Area
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        disabled={!formData.district}
                        onClick={() => setIsCityOpen(!isCityOpen)}
                        className="w-full h-14 pl-12 pr-12 rounded-2xl border-2 border-gray-200 focus:border-[#962A27] outline-none text-left transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-medium"
                      >
                        <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#962A27]" />
                        <span className={!formData.city ? "text-gray-400" : "text-gray-700"}>
                          {!formData.district 
                            ? "Select District First" 
                            : (formData.city || "Choose City")}
                        </span>

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
                                <li
                                  key={city}
                                  onClick={() => {
                                    handleChange("city", city);
                                    setIsCityOpen(false);
                                  }}
                                  className={`px-5 py-3.5 text-sm cursor-pointer transition-colors hover:bg-gray-50 font-medium text-gray-700 ${
                                    formData.city === city ? 'bg-[#962A27]/5 text-[#962A27] font-bold' : ''
                                  }`}
                                >
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
                    <label className="block text-sm font-semibold mb-2 text-gray-700">
                      Full Address
                    </label>
                    <textarea
                      rows="3"
                      placeholder="Door No, Street Name, Area, Landmark..."
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-[#962A27] focus:outline-none resize-none transition-all"
                    />
                  </div>
                </div>

                {/* Features Info */}
                <div className="grid md:grid-cols-3 gap-4 mt-8">
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
                    onClick={handleContinue}
                    disabled={
                      isSubmitting ||
                      !formData.name ||
                      !formData.phone ||
                      !formData.date ||
                      !formData.district ||
                      !formData.city ||
                      !formData.address ||
                      Number(formData.guests) < 50
                    }
                    className="group bg-gradient-to-r from-[#962A27] to-[#7A1F1D] hover:enabled:scale-105 transition-all duration-300 text-white px-10 py-4 rounded-2xl font-bold shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
            </div>
          )}

          {/* STEP 2: EVENT TYPE */}
          {step === 2 && (
            <div className="animate-fadeIn px-2 sm:px-0">
              <div className="mb-6 sm:mb-8 text-center sm:text-left">
                <span className="inline-block bg-[#962A27]/10 text-[#962A27] px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  Step 2 of 5
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-2 sm:mt-3">
                  Choose Your Event
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">
                  Select the type of event for personalized catering recommendations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { name: "Wedding", icon: <Heart size={34} />, desc: "Traditional & Grand Wedding Catering" },
                  { name: "Birthday", icon: <Gift size={34} />, desc: "Birthday Celebration Packages" },
                  { name: "Engagement", icon: <Gem size={34} />, desc: "Elegant Engagement Events" },
                  { name: "Corporate", icon: <Briefcase size={34} />, desc: "Corporate Meetings & Gatherings" },
                  { name: "Other", icon: <PartyPopper size={34} />, desc: "Custom Event Catering Solutions" },
                ].map((event) => (
                  <div
                    key={event.name}
                    onClick={() => handleChange("eventType", event.name)}
                    className={`group cursor-pointer rounded-2xl sm:rounded-3xl p-5 sm:p-6 border-2 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-lg md:hover:shadow-xl text-center sm:text-left ${
                      formData.eventType === event.name
                        ? "border-[#962A27] bg-gradient-to-br from-[#962A27] to-[#7A1F1D] text-white shadow-md sm:shadow-xl"
                        : "border-[#962A27]/20 bg-white hover:border-[#962A27]/60" 
                    }`}
                  >
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto sm:mx-0 mb-4 sm:mb-5 ${
                      formData.eventType === event.name ? "bg-white/20 text-white" : "bg-[#962A27]/10 text-[#962A27]"
                    }`}>
                      <div className="scale-90 sm:scale-100 flex items-center justify-center">
                        {event.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{event.name}</h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      formData.eventType === event.name ? "text-white/80" : "text-gray-500"
                    }`}>
                      {event.desc}
                    </p>
                    
                    {formData.eventType === event.name && (
                      <div className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                        ✓ Selected
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-8 sm:mt-10">
                <button 
                  onClick={prevStep} 
                  className="px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gray-100 hover:bg-gray-200 font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base text-gray-700"
                >
                  <ChevronLeft size={18} /> Back
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isSubmitting || !formData.eventType}
                  className="px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#962A27] to-[#7A1F1D] text-white font-bold shadow-md md:shadow-lg hover:enabled:scale-[1.02] sm:hover:enabled:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
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
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PREFERENCE & SESSION */}
          {step === 3 && (
            <div className="animate-fadeIn px-2 sm:px-0">
              <div className="mb-8 sm:mb-10 text-center sm:text-left">
                <span className="inline-block bg-[#962A27]/10 text-[#962A27] px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  Step 3 of 5
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-2 sm:mt-3">
                  Food Preferences
                </h2>
                <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">
                  Choose your preferred menu type and serving session.
                </p>
              </div>

              <div className="mb-10 sm:mb-12">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-5 text-center sm:text-left flex items-center justify-center sm:justify-start gap-2">
                  <span>Serving Flavor</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  {/* Veg Option */}
                  <div
                    onClick={() => {
                      handleChange("preference", "Veg");
                      handleChange("session", "");
                    }}
                    className={`group cursor-pointer rounded-2xl sm:rounded-3xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 text-center sm:text-left ${
                      formData.preference === "Veg"
                        ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md"
                        : "border-[#962A27]/10 bg-white hover:border-[#962A27]/40 text-gray-700"
                    }`}
                  >
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
                  <div
                    onClick={() => {
                      handleChange("preference", "Non-Veg");
                      handleChange("session", "");
                    }}
                    className={`group cursor-pointer rounded-2xl sm:rounded-3xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 text-center sm:text-left ${
                      formData.preference === "Non-Veg"
                        ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md"
                        : "border-[#962A27]/10 bg-white hover:border-[#962A27]/40 text-gray-700"
                    }`}
                  >
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
                  <div
                    onClick={() => {
                      handleChange("preference", "Both");
                      handleChange("session", "");
                    }}
                    className={`group cursor-pointer rounded-2xl sm:rounded-3xl p-6 border-2 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-y-2 text-center sm:text-left ${
                      formData.preference === "Both"
                        ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md"
                        : "border-[#962A27]/10 bg-white hover:border-[#962A27]/40 text-gray-700"
                    }`}
                  >
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
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 text-center sm:text-left">
                    Serving Session
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-5 text-center sm:text-left">
                    Choose the primary service timing tier for tracking cooks.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                    {[
                      { name: "Breakfast", icon: "☕", desc: "Sunrise Morning Banquet" },
                      { name: "Lunch", icon: "🍛", desc: "Midday Traditional Feast" },
                      { name: "Dinner", icon: "🌙", desc: "Elegant Moonlight Gala Dinner" },
                    ].map((item) => (
                      <div
                        key={item.name}
                        onClick={() => handleChange("session", item.name)}
                        className={`group cursor-pointer rounded-2xl sm:rounded-3xl p-5 border-2 text-center sm:text-left transition-all duration-300 hover:-translate-y-1 ${
                          formData.session === item.name
                            ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-sm"
                            : "border-[#962A27]/10 bg-white hover:border-[#962A27]/30 text-gray-700"
                        }`}
                      >
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
                  <p className="text-sm font-bold text-gray-800 mt-1">
                    {formData.preference} Menu <span className="text-gray-300 mx-1.5">•</span> {formData.session} Batch Allocation
                  </p>
                </div>
              )}

              <div className="flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 mt-8 sm:mt-10">
                <button
                  onClick={prevStep}
                  className="px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gray-100 hover:bg-gray-200 font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base text-gray-600"
                >
                  <ChevronLeft size={18} /> Back
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  disabled={isSubmitting || !formData.preference || !formData.session}
                  className="px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#962A27] to-[#7A1F1D] text-white font-bold shadow-md hover:enabled:scale-[1.02] sm:hover:enabled:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
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
                      <ChevronRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CATERING OPTION */}
          {step === 4 && (
            <div className="animate-fadeIn px-2 sm:px-0">
              <div className="text-center mb-8">
                <span className="inline-block bg-[#962A27]/10 text-[#962A27] px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  Step 4 of 5
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mt-2">Catering Option</h2>
                <p className="text-sm sm:text-base text-gray-500 mt-1">Choose a readymade package or build your own menu dynamically.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
                <div
                  onClick={() => {
                    handleChange("bookingType", "Package");
                    handleChange("customSelectedItems", []);
                    handleChange("customPackagePrice", 0);
                  }}
                  className={`cursor-pointer rounded-2xl p-6 border-2 text-center transition-all ${
                    formData.bookingType === "Package"
                      ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md"
                      : "border-gray-200 bg-white text-gray-600"
                  }`}
                >
                  <span className="text-3xl block mb-2">📦</span>
                  <h4 className="text-lg font-bold"> Readymade Packages</h4>
                  <p className="text-xs text-gray-400 mt-1">Pick from our premium pre-curated combos.</p>
                </div>

                <div
                  onClick={() => {
                    handleChange("bookingType", "Custom");
                    handleChange("selectedPackageId", "");
                  }}
                  className={`cursor-pointer rounded-2xl p-6 border-2 text-center transition-all ${
                    formData.bookingType === "Custom"
                      ? "border-[#962A27] bg-[#962A27]/5 text-gray-900 shadow-md"
                      : "border-gray-200 bg-white text-gray-600"
                  }`}
                >
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
                      <p className="text-xs text-gray-400 mt-0.5">Prices are calculated live based on selections.</p>
                    </div>
                    <div className="bg-[#962A27] text-white px-5 py-3 rounded-2xl text-center sm:text-right shrink-0">
                      <p className="text-xs opacity-75 font-bold uppercase tracking-wider">Estimated Plate Rate</p>
                      <p className="text-2xl font-black">₹{formData.customPackagePrice} <span className="text-xs font-normal">/ Plate</span></p>
                    </div>
                  </div>

                  {(() => {
                    const currentSession = formData.session || "Breakfast";
                    const rawItems = specialMenus[currentSession] || [];
                    
                    return (
                      <div className="space-y-6">
                        {rawItems.map((category, catIdx) => {
                          const filteredItems = category.items.filter(item => {
                            if (formData.preference === "Veg") return item.type === "veg";
                            if (formData.preference === "Non-Veg") return item.type === "non-veg";
                            return true;
                          });

                          if (filteredItems.length === 0) return null;

                          return (
                            <div key={catIdx} className="space-y-3">
                              <h4 className="font-extrabold text-gray-700 text-sm border-l-4 border-[#962A27] pl-2 uppercase tracking-wider">
                                {category.title.en}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {filteredItems.map((item, itemIdx) => {
                                  const isChecked = formData.customSelectedItems.includes(item.en);
                                  return (
                                    <div
                                      key={itemIdx}
                                      onClick={() => {
                                        let updatedList = [...formData.customSelectedItems];
                                        
                                        if (isChecked) {
                                          updatedList = updatedList.filter(i => i !== item.en);
                                        } else {
                                          updatedList.push(item.en);
                                        }
                                        
                                        setFormData(prev => ({
                                          ...prev,
                                          customSelectedItems: updatedList
                                        }));
                                      }}
                                      className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                        isChecked ? "border-green-600 bg-green-50/40" : "border-gray-100 bg-gray-50/50 hover:border-gray-200"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3 text-left">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center text-xs text-white ${
                                          isChecked ? "bg-green-600 border-green-600" : "border-gray-300 bg-white"
                                        }`}>
                                          {isChecked && "✓"}
                                        </div>
                                        <div>
                                          <p className="font-bold text-gray-800 text-sm">{item.en}</p>
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
                      {formData.bookingType === "Custom" 
                        ? `✨ ${formData.customSelectedItems?.length || 0} Custom Items Selected`
                        : "📋 Standard Selection Mode"}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-stretch sm:justify-end gap-3 w-full sm:w-auto">
                    <button 
                      onClick={prevStep} 
                      className="flex-1 sm:flex-initial px-5 sm:px-6 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 text-xs sm:text-sm bg-white hover:bg-gray-50 active:scale-[0.98] transition-all text-center"
                    >
                      Back
                    </button>
                    
                    <button
                      onClick={() => setStep(5)}
                      disabled={formData.bookingType === "Custom" && (!formData.customSelectedItems || formData.customSelectedItems.length === 0)}
                      className="flex-1 sm:flex-initial px-7 sm:px-8 py-3 rounded-xl bg-gradient-to-r from-[#962A27] to-[#7A1F1D] text-white font-black text-xs sm:text-sm shadow-md hover:shadow-lg hover:scale-[1.01] sm:hover:scale-105 active:scale-[0.98] transition-all duration-300 disabled:pointer-events-none disabled:bg-none disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none text-center"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CONDITIONAL HANDLING */}
{step === 5 && formData.bookingType === "Package" && (
  <div className="animate-fadeIn px-2 sm:px-0">
    <div className="text-center mb-6 sm:mb-10">
      <h2 className="text-2xl sm:text-4xl font-black text-gray-800 tracking-tight">
        Choose Your Catering Package
      </h2>
      <p className="text-xs sm:text-sm text-gray-500 mt-2">
        Compare packages and select the best option for your event
      </p>
    </div>

    {(() => {
      // Bottom பார் ஸ்க்ரோல் ட்ராக்கர் ரெஃப்
      const continueBarRef = React.createRef();

      const availablePackages =
        formData.preference === "Both"
          ? [...(packagesData["Veg"] || []), ...(packagesData["Non-Veg"] || [])]
          : packagesData[formData.preference] || [];

      const handlePackageSelectAndScroll = (pkgId) => {
        handleChange("selectedPackageId", pkgId);

        setTimeout(() => {
          if (continueBarRef.current) {
            continueBarRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 100);
      };

      return (
        <div className="space-y-4 sm:space-y-6">
          {availablePackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                formData.selectedPackageId === pkg.id 
                  ? "border-[#962A27] shadow-md sm:shadow-xl ring-1 ring-[#962A27]/30" 
                  : "border-gray-200 shadow-sm hover:shadow-md md:hover:shadow-lg"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-0">
                <div className="md:col-span-1 lg:col-span-3 w-full h-48 sm:h-56 md:h-full relative shrink-0">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                  {formData.selectedPackageId === pkg.id && (
                    <div className="absolute top-3 left-3 md:hidden bg-[#962A27] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                      Selected
                    </div>
                  )}
                </div>

                <div className="md:col-span-1 lg:col-span-6 p-5 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-100 text-left">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 tracking-tight">{pkg.name}</h3>
                      {formData.selectedPackageId === pkg.id && (
                        <span className="hidden md:inline-block bg-[#962A27] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Selected
                        </span>
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
                    <div className="mt-4 text-xs sm:text-sm text-[#962A27] font-bold bg-[#962A27]/5 px-3 py-1.5 rounded-xl w-fit">
                      + {pkg.items.length - 6} More Delicious Items Included
                    </div>
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
                      <button
                        onClick={() => setSelectedPkgForModal(pkg)}
                        className="w-full border border-gray-300 bg-white text-gray-700 rounded-xl py-3 font-bold text-xs sm:text-sm hover:bg-gray-50 transition-colors shadow-sm cursor-pointer"
                      >
                        View Full Menu
                      </button>
                      
                      <button
                        onClick={() => handlePackageSelectAndScroll(pkg.id)}
                        className={`w-full py-3 rounded-xl text-white font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer ${
                          formData.selectedPackageId === pkg.id ? "bg-[#7A1F1D]" : "bg-[#962A27] hover:bg-[#7A1F1D] active:scale-[0.98]"
                        }`}
                      >
                        {formData.selectedPackageId === pkg.id ? "Selected ✓" : "Select Combo"}
                      </button>
                    </div>

                    {/* 🔥 🎯 FIXED: animate-bounce நீக்கப்பட்டு வெறும் stable ஆன பட்டனாக மாற்றப்பட்டுள்ளது */}
                    {formData.selectedPackageId === pkg.id && (
                      <button
                        onClick={() => setStep(6)}
                        className="w-full bg-gradient-to-r from-[#962A27] to-[#7A1F1D] hover:from-[#7A1F1D] hover:to-[#962A27] text-white py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer border border-red-800 transition-all duration-300"
                      >
                        <span>Continue to Next Step</span>
                        <ArrowRight size={16} className="text-white" />
                      </button>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}

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
                <button onClick={() => setStep(4)} className="flex-1 sm:flex-initial px-5 sm:px-6 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 text-sm hover:bg-gray-50 transition-all text-center cursor-pointer">
                  Back
                </button>
                <button
                  onClick={() => setStep(6)} 
                  disabled={!formData.selectedPackageId}
                  className="flex-1 sm:flex-initial px-7 sm:px-8 py-3.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#962A27] to-[#7A1F1D] text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg md:hover:shadow-[#962A27]/20 hover:scale-[1.02] sm:hover:scale-105 active:scale-[0.98] transition-all duration-300 disabled:pointer-events-none disabled:bg-none disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  Continue <span className="text-xs sm:text-sm tracking-wider">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    })()}
  </div>
)}

          {step === 5 && formData.bookingType === "Custom" && (
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
                <button type="button" onClick={() => setStep(4)} className="px-6 py-3 rounded-xl border border-gray-300 font-bold text-gray-600 hover:bg-gray-50 transition">
                  Modify Items
                </button>
                <button type="button" onClick={() => setStep(6)} className="px-8 py-3 rounded-xl bg-[#962A27] hover:bg-[#7A1F1D] text-white font-bold transition-all shadow-md">
                  Proceed to Review →
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: REVIEW */}
{step === 6 && (
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
              {formData.bookingType === "Custom" 
                ? "Custom Menu Builder" 
                : (allPackages.find((p) => p.id === formData.selectedPackageId)?.name || "Not Selected")}
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
              <p className="text-4xl font-black text-[#962A27]">
                ₹{calculateTotal().toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* BUTTONS ACTION ROW */}
    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
      <button onClick={prevStep} className="border border-gray-300 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 cursor-pointer">
        ← Back
      </button>

      <button
        onClick={() => {
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
        }}
        className="w-full sm:w-auto px-10 py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#962A27] via-[#852321] to-[#7A1F1D] text-white font-black text-base sm:text-lg tracking-wide shadow-lg shadow-[#962A27]/20 hover:shadow-xl hover:shadow-[#962A27]/30 hover:scale-[1.02] sm:hover:scale-105 active:scale-[0.98] transition-all duration-300 text-center flex items-center justify-center gap-3 cursor-pointer"
      >
        <span>Confirm Booking</span>
        <span className="text-xl font-light tracking-widest">→</span>
      </button>
    </div>
  </div>
)}
        </div>
      </div>

      {/* MINI WINDOW / MODAL */}
      {selectedPkgForModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl border border-gray-100 shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10 rounded-t-2xl">
              <div className="text-left">
                <span className="text-[10px] font-bold text-[#962A27] bg-[#962A27]/10 px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {formData.preference} Combo
                </span>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
                  {selectedPkgForModal.name}
                </h3>
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
              <button onClick={() => setSelectedPkgForModal(null)} className="w-full border border-gray-200 text-gray-500 bg-white rounded-xl py-3.5 font-bold text-sm hover:bg-gray-50 transition-colors">
                Close
              </button>
              <button
                onClick={() => { 
                  handleChange("selectedPackageId", selectedPkgForModal.id); 
                  setSelectedPkgForModal(null); 
                }}
                className="w-full bg-[#962A27] hover:bg-[#7A1F1D] text-white rounded-xl py-3.5 font-bold text-sm transition-colors shadow-md"
              >
                Select Combo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;
