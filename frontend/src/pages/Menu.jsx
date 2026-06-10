import { useState, useRef, useEffect } from "react";
// 🔥 SpecialMenu file import as default blueprint schema fallback
import specialMenus from "../data/specialMenus"; 
import Loader from "../components/Loader";

function Menu() {
  const [language, setLanguage] = useState("en");
  const [menuData, setMenuData] = useState(specialMenus); // Master dynamic menu data state

  // ==========================================================================
  // SYNC DYNAMIC INVENTORY DATA ON LOAD FROM STORAGE ENGINE
  // ==========================================================================
// ==========================================================================
  // SYNC DYNAMIC INVENTORY DATA ON LOAD FROM STORAGE ENGINE - FIXED IMAGE LOGIC
  // ==========================================================================
  useEffect(() => {
    const savedInventory = localStorage.getItem("lc_flat_special_inventory");
    if (savedInventory) {
      try {
        const flatList = JSON.parse(savedInventory);
        
        // Convert flat array format back into structured categorized map for client views
        const structuredData = {
          Breakfast: [],
          Lunch: [],
          Dinner: [],
          VegPackages: [],
          NonVegPackages: []
        };

        // Grouping logic reconstruction pipeline
        flatList.forEach((item) => {
          const category = item.category;
          if (!structuredData[category]) return;

          // Find fallback image from original static specialMenus blueprint if available
          const staticCategoryItems = specialMenus[category] || [];
          const staticGroupFallback = staticCategoryItems.find(
            g => g.title?.en === item.groupTitleEn
          );

          if (item.isPackage) {
            // Re-constructing Packages Structure array format
            structuredData[category].push({
              title: { en: item.groupTitleEn, ta: item.groupTitleTa },
              price: item.price,
              // First priority: item image -> Second priority: blueprint file image -> Last: safe placeholder
              image: item.image || staticGroupFallback?.image || "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
              items: item.componentsList ? item.componentsList.split(", ").map(i => ({ en: i, ta: i })) : []
            });
          } else {
            // Re-constructing Standard Categories sections
            let group = structuredData[category].find(
              g => g.title.en === item.groupTitleEn
            );

            if (!group) {
              group = {
                title: { en: item.groupTitleEn, ta: item.groupTitleTa },
                // FIX: Hardcode panni irundha URL-ah mathi dynamic image logic potachu thala
                image: item.image || staticGroupFallback?.image || "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
                items: []
              };
              structuredData[category].push(group);
            }

            group.items.push({
              en: item.dishNameEn,
              ta: item.dishNameTa,
              price: item.price,
              type: item.type
            });
          }
        });

        setMenuData(structuredData);
      } catch (err) {
        console.error("Failed to parse dynamic catalog tree matrix:", err);
      }
    }
  }, []);

  // ==========================================================================
  // DATA SEPARATION: செக்ஷன் செக்ஷனா டேட்டாவை பிரிக்கிறோம்
  // ==========================================================================
  const sections = [
    {
   id: "veg-packages",
    isVeg: true, // இதை வச்சு நாம UI-ல சிம்பல் காட்ட போறோம் தலா
    title: { en: "Pure Veg Catering Packages", ta: "சைவ உணவு பேக்கேஜ்கள்" },
    desc: { en: "Premium readymade multi-course veg meals", ta: "முழுமையான பிரீமியம் சைவ உணவு விருந்து வகைகள்" },
    cards: menuData.VegPackages || []
  },
  {
    id: "nonveg-packages",
    isNonVeg: true, // அசைவ சிம்பலுக்கு
    title: { en: "Non-Veg Luxury Packages", ta: "அசைவ உணவு பேக்கேஜ்கள்" },
    desc: { en: "Authentic Chettinad non-veg traditional feasts", ta: "அசல் செட்டிநாடு பாரம்பரிய அசைவ உணவு விருந்துகள்" },
    cards: menuData.NonVegPackages || []
  },
    {
      id: "breakfast-specials",
      title: { en: "🥞 Traditional Breakfast Varieties", ta: "🥞 காலை உணவு பலகாரங்கள்" },
      desc: { en: "Idly, Dosa, Pongal and traditional oil sweets", ta: "இட்லி, தோசை, பொங்கல் மற்றும் பாரம்பரிய பலகாரங்கள்" },
      cards: menuData.Breakfast || []
    },
    {
      id: "lunch-specials",
      title: { en: "🍲 Rich Lunch Curries & Beverages", ta: "🍲 மதிய உணவு கறி வகைகள் & ஜூஸ்" },
      desc: { en: "Special non-veg curries and cold refreshing beverages", ta: "சிறப்பு அசைவ கறிகள் மற்றும் குளிர்ச்சியான பானங்கள்" },
      cards: menuData.Lunch || []
    },
    {
      id: "dinner-specials",
      title: { en: "🌙 Dinner Naan, Roti & Parotta Hub", ta: "🌙 இரவு உணவு பரோட்டா & ரோட்டி வகைகள்" },
      desc: { en: "Idiyappam, Noodles, varieties of fluffly parottas", ta: "இடியாப்பம், நூடுல்ஸ் மற்றும் சுடச்சுட பரோட்டா வகைகள்" },
      cards: menuData.Dinner || []
    }
  ];

  const rowRefs = useRef({});

  const handleScroll = (sectionId, direction) => {
    const container = rowRefs.current[sectionId];
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300; 
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#fff8f5] to-[#fff1ea] min-h-screen pt-[78px] md:pt-[95px] pb-14 md:pb-24 px-3 sm:px-4 md:px-8 overflow-hidden">

      {/* 1. TOP MAIN BRAND HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 md:gap-8 mb-8 md:mb-12">
        <div className="w-full text-left">
          <span className="inline-block bg-[#ffe7dc] text-[#962a27] px-5 py-2 rounded-full text-xs sm:text-sm font-black tracking-wide shadow-sm">
            👑 Lakshmi Catering Premium Menu
          </span>
          <h1 className="text-[32px] sm:text-[42px] md:text-5xl lg:text-6xl font-black text-[#7c2d12] mt-4 tracking-tight leading-none">
            {language === "en" ? "Explore Traditional Tastes" : "எங்கள் சுவையான உணவுப் பட்டியல்"}
          </h1>
          <p className="text-gray-500 mt-3 md:mt-4 max-w-2xl leading-relaxed text-xs sm:text-sm md:text-base font-medium">
            {language === "en"
              ? "Discover authentic Chettinad flavors, readymade budget combos, sweets and premium live-counter catering specials."
              : "அசல் செட்டிநாடு சுவைகள், பிரீமியம் பட்ஜெட் பேக்கேஜ்கள் மற்றும் சிறந்த அலா கார்டே விருந்துகளை அனுபவியுங்கள்."}
          </p>
        </div>

        {/* LANGUAGE CONTROL SWAPPER */}
        <div className="flex justify-start lg:justify-end shrink-0">
          <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-full shadow-md border border-[#f3d7c8] w-fit">
            <button
              onClick={() => setLanguage("en")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-black transition-all duration-300 ${
                language === "en" ? "bg-[#962a27] text-white shadow-md" : "text-[#962a27] hover:bg-[#fff1ea]"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("ta")}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-black transition-all duration-300 ${
                language === "ta" ? "bg-[#962a27] text-white shadow-md" : "text-[#962a27] hover:bg-[#fff1ea]"
              }`}
            >
              தமிழ்
            </button>
          </div>
        </div>
      </div>

      {/* ==========================================================================
          2. MOVEABLE BOOK CONTAINER ROW WITH RESPONSIVE SLIDE ARROWS
          ========================================================================== */}
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        {sections.map((section) => {
          if (section.cards.length === 0) return null;

        return (
  <div key={section.id} className="w-full text-left relative group/section">
    
    {/* Section Title Container */}
    <div className="mb-5 sm:mb-8 px-1 flex justify-between items-end gap-2">
      <div>
        {/* Container size-ah gap-3 aaki dynamic sizes boost panniyachu */}
        <div className="flex items-center gap-3 mb-2">
          
          {/* 🟢 Official Veg Symbol Setup (BIG SIZE) */}
          {section.isVeg && (
            <div className="w-6 h-6 border-2 border-green-600 flex items-center justify-center bg-white p-[3px] shrink-0 rounded-md shadow-md">
              <div className="w-3.5 h-3.5 rounded-full bg-green-600"></div>
            </div>
          )}

          {/* 🔴 Official Non-Veg Symbol Setup (BIG SIZE) */}
          {section.isNonVeg && (
            <div className="w-6 h-6 border-2 border-red-600 flex items-center justify-center bg-white p-[3px] shrink-0 rounded-md shadow-md">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[11px] border-b-red-600"></div>
            </div>
          )}

          {/* Text size increased: text-2xl from text-xl */}
          <h2 className="text-2xl sm:text-4xl font-black text-[#7c2d12] tracking-tight leading-none">
            {section.title[language]}
          </h2>
        </div>
        
        <p className="text-xs sm:text-base text-gray-400 font-medium mt-1.5 pl-1">
          {section.desc[language]}
        </p>
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center gap-2 mb-1 shrink-0">
        <button 
          onClick={() => handleScroll(section.id, "left")}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border border-[#f5d6c6] bg-white hover:bg-[#962a27] text-[#962a27] hover:text-white flex items-center justify-center font-black text-sm sm:text-base transition-all shadow-sm active:scale-90"
        >
          ←
        </button>
        <button 
          onClick={() => handleScroll(section.id, "right")}
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border border-[#f5d6c6] bg-white hover:bg-[#962a27] text-[#962a27] hover:text-white flex items-center justify-center font-black text-sm sm:text-base transition-all shadow-sm active:scale-90"
        >
          →
        </button>
      </div>
    </div>

    {/* Slider Content Wrapper */}
    <div className="relative w-full">
      
      <div 
        ref={(el) => (rowRefs.current[section.id] = el)}
        className="w-full flex gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-6 pt-1 px-1 snap-x snap-mandatory scrollbar-thin scroll-smooth select-none custom-scroll-row"
      >
        {section.cards.map((menu, index) => (
          <div
            key={index}
            className="w-[280px] sm:w-[320px] md:w-[360px] shrink-0 snap-start bg-white rounded-[24px] md:rounded-[32px] overflow-hidden border border-[#f5d6c6] hover:shadow-2xl duration-300 group relative"
          >
            {/* Gradient Accent Strip */}
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#962a27] via-[#d97706] to-[#f59e0b] z-10" />

            {/* Card Image Thumbnail Box */}
            <div className="relative overflow-hidden h-[150px] sm:h-[180px] md:h-[210px]">
              <img
                src={menu.image}
                alt="dish template look"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 duration-700"
              />
              {/* Price Tag Overlay */}
              {menu.price && (
                <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm text-amber-400 font-black text-[11px] sm:text-xs px-3 py-1.5 rounded-full shadow-md z-20">
                  ₹{menu.price} {menu.price <= 350 ? "/ Leaf" : "/ Head"}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>

            {/* Content Frame */}
            <div className="p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-[#7c2d12] mb-2 tracking-tight line-clamp-1">
                  {menu.title ? (menu.title[language] || menu.title.en) : ""}
                </h3>

                {menu.note ? (
                  <p className="text-[10px] text-amber-700 bg-amber-50/70 rounded-lg px-2.5 py-1.5 mb-3 font-bold border border-amber-100/60 truncate">
                    * {menu.note}
                  </p>
                ) : (
                  <div className="h-[29px] mb-3 hidden sm:block opacity-0" />
                )}

                {/* List container mapping options inside layout blocks */}
                <div className="space-y-2 md:space-y-2.5 h-[160px] overflow-y-auto custom-scroll pr-1 mt-1 border-t border-gray-50 pt-3">
                  {menu.items && menu.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-center gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        
                        {/* Dynamic Box configuration for listed single items */}
                        <div 
                          className="w-4 h-4 rounded border flex items-center justify-center bg-white shrink-0 p-0.5" 
                          style={{ borderColor: (item.type === "non-veg" || section.isNonVeg) ? "#EF4444" : "#10B981" }}
                        >
                          <span 
                            className="text-[8px] leading-none" 
                            style={{ color: (item.type === "non-veg" || section.isNonVeg) ? "#EF4444" : "#10B981" }}
                          >
                            ●
                          </span>
                        </div>
                        
                        <p className="text-[#5f3a37] text-xs sm:text-sm font-bold truncate capitalize">
                          {item[language] || item.en || item}
                        </p>
                      </div>

                      {item.price && (
                        <span className="text-gray-400 font-mono text-xs font-black shrink-0">
                          ₹{item.price}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  </div>
);
        })}
      </div>

      {/* Stylesheet injector overrides */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scroll-row::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scroll-row::-webkit-scrollbar-track {
          background: rgba(150, 42, 39, 0.05);
          border-radius: 20px;
        }
        .custom-scroll-row::-webkit-scrollbar-thumb {
          background: rgba(150, 42, 39, 0.2);
          border-radius: 20px;
        }
        .custom-scroll-row::-webkit-scrollbar-thumb:hover {
          background: rgba(150, 42, 39, 0.4);
        }
      `}} />

    </div>
  );
}

export default Menu;

