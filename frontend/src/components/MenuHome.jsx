import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowRight, HiSparkles } from "react-icons/hi2";
import specialMenus from "../data/SpecialMenus";

function MenuHome({ navigate }) {
  const [language, setLanguage] = useState("en");
  const [activeTab, setActiveTab] = useState("VegPackages");
  const [menuData, setMenuData] = useState(specialMenus);
  
  // Track loading state per card button index or full menu button
  const [loadingCardIndex, setLoadingCardIndex] = useState(null);
  const [isFullMenuLoading, setIsFullMenuLoading] = useState(false);

  // Load dynamic menu inventory if available in localStorage
  useEffect(() => {
    const savedInventory = localStorage.getItem("lc_flat_special_inventory");
    if (savedInventory) {
      try {
        const flatList = JSON.parse(savedInventory);
        const structuredData = {
          Breakfast: [],
          Lunch: [],
          Dinner: [],
          VegPackages: [],
          NonVegPackages: []
        };

        flatList.forEach((item) => {
          const category = item.category;
          if (!structuredData[category]) return;

          const staticCategoryItems = specialMenus[category] || [];
          const staticGroupFallback = staticCategoryItems.find(
            (g) => g.title?.en === item.groupTitleEn
          );

          if (item.isPackage) {
            structuredData[category].push({
              title: { en: item.groupTitleEn, ta: item.groupTitleTa },
              price: item.price,
              image:
                item.image ||
                staticGroupFallback?.image ||
                "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
              items: item.componentsList
                ? item.componentsList.split(", ").map((i) => ({ en: i, ta: i }))
                : []
            });
          } else {
            let group = structuredData[category].find(
              (g) => g.title.en === item.groupTitleEn
            );
            if (!group) {
              group = {
                title: { en: item.groupTitleEn, ta: item.groupTitleTa },
                image:
                  item.image ||
                  staticGroupFallback?.image ||
                  "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
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
        console.error("Failed to parse dynamic catalog in MenuHome:", err);
      }
    }
  }, []);

  // Card View Details Click Handler with Loader
  const handleCardClick = (index) => {
    setLoadingCardIndex(index);
    setTimeout(() => {
      if (navigate) {
        navigate("/menu");
      } else {
        window.location.href = "/menu";
      }
    }, 800);
  };

  // Bottom Full Menu Click Handler with Loader
  const handleFullMenuClick = () => {
    setIsFullMenuLoading(true);
    setTimeout(() => {
      if (navigate) {
        navigate("/menu");
      } else {
        window.location.href = "/menu";
      }
    }, 800);
  };

  const categoryTabs = [
    { key: "VegPackages", label: { en: "Veg Feasts", ta: "சைவ விருந்து" }, isVeg: true },
    { key: "NonVegPackages", label: { en: "Non-Veg Feasts", ta: "அசைவ விருந்து" }, isNonVeg: true },
    { key: "Breakfast", label: { en: "Breakfast", ta: "காலை உணவு" } },
    { key: "Lunch", label: { en: "Lunch", ta: "மதிய உணவு" } },
    { key: "Dinner", label: { en: "Dinner", ta: "இரவு உணவு" } }
  ];

  const previewCards = (menuData[activeTab] || []).slice(0, 4);

  return (
    <section className="relative w-full bg-gradient-to-b from-[#fff8f5] via-[#fff3ea] to-[#fff8f5] py-10 sm:py-20 px-4 sm:px-8 md:px-16 overflow-hidden">
      
      {/* Background Soft Glow Effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[280px] sm:w-[600px] h-[280px] bg-[#962a27]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER & LANGUAGE CONTROLLER */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#962a27]/10 text-[#962a27] font-bold text-[10px] sm:text-xs uppercase tracking-wider mb-2 border border-[#962a27]/20">
              <HiSparkles className="text-amber-600 text-xs" />
              {language === "en" ? "Culinary Highlights" : "சிறப்பு உணவு வகைகள்"}
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#2b1b17] tracking-tight leading-tight">
              {language === "en" ? (
                <>
                  Explore Our{" "}
                  <span className="text-[#962a27] underline decoration-[#d9a86c]/60 underline-offset-4 sm:underline-offset-8">
                    Menu
                  </span>
                </>
              ) : (
                "எங்கள் சுவையான உணவுப் பட்டியல்"
              )}
            </h2>

            <p className="text-gray-600 text-xs sm:text-base mt-1.5 max-w-xl font-medium leading-relaxed">
              {language === "en"
                ? "Taste authentic Chettinad heritage dishes & multi-course royal feasts."
                : "அசல் செட்டிநாடு சுவைகள் மற்றும் பிரீமியம் பேக்கேஜ்களை அனுபவியுங்கள்."}
            </p>
          </div>

          {/* Language Toggle Swapper */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-full shadow-sm border border-gray-200/80 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold transition-all duration-300 ${
                language === "en"
                  ? "bg-[#962a27] text-white shadow-sm"
                  : "text-[#962a27] hover:bg-[#fff1ea]"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("ta")}
              className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold transition-all duration-300 ${
                language === "ta"
                  ? "bg-[#962a27] text-white shadow-sm"
                  : "text-[#962a27] hover:bg-[#fff1ea]"
              }`}
            >
              தமிழ்
            </button>
          </div>
        </div>

        {/* MOBILE SEGMENTED CATEGORY SELECTOR */}
        <div className="w-full mb-8">
          <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col gap-1.5">
            
            {/* Row 1: Veg & Non-Veg Feasts */}
            <div className="grid grid-cols-2 gap-1.5">
              {categoryTabs.slice(0, 2).map((tab) => {
                const isSelected = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative py-2.5 px-2 rounded-xl text-xs font-black transition-all duration-300 flex items-center justify-center gap-1.5 ${
                      isSelected ? "text-white bg-[#962a27] shadow-sm" : "text-gray-700 bg-gray-50/80 hover:bg-gray-100"
                    }`}
                  >
                    {tab.isVeg && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    )}
                    {tab.isNonVeg && (
                      <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    )}
                    <span className="truncate">{tab.label[language]}</span>
                  </button>
                );
              })}
            </div>

            {/* Row 2: Breakfast, Lunch, Dinner */}
            <div className="grid grid-cols-3 gap-1.5">
              {categoryTabs.slice(2).map((tab) => {
                const isSelected = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative py-2 px-1 rounded-xl text-[11px] sm:text-xs font-bold transition-all duration-300 text-center ${
                      isSelected ? "text-white bg-[#962a27] shadow-sm" : "text-gray-600 bg-gray-50/80 hover:bg-gray-100"
                    }`}
                  >
                    <span className="truncate block">{tab.label[language]}</span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* FEATURED CARDS GRID */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            {previewCards.map((menu, index) => {
              const isLoading = loadingCardIndex === index;

              return (
                <div
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-[#962a27]/30 transition-all duration-300 flex flex-col justify-between group relative"
                >
                  {/* Accent Top Strip */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#962a27] via-amber-500 to-[#962a27] z-10" />

                  <div>
                    {/* Thumbnail Image */}
                    <div className="relative h-[150px] sm:h-[190px] overflow-hidden bg-gray-100">
                      <img
                        src={menu.image}
                        alt={menu.title?.en || "Menu dish"}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Price Tag Overlay */}
                      {menu.price && (
                        <div className="absolute top-3 right-3 bg-gray-900/90 backdrop-blur-md text-amber-400 font-black text-xs px-3 py-1 rounded-full shadow-md">
                          ₹{menu.price} {menu.price <= 350 ? "/ Leaf" : "/ Head"}
                        </div>
                      )}
                    </div>

                    {/* Card Body Details */}
                    <div className="p-4 sm:p-5 text-left">
                      <h3 className="text-base sm:text-lg font-black text-[#2b1b17] mb-2 sm:mb-3 line-clamp-1 group-hover:text-[#962a27] transition-colors">
                        {menu.title ? menu.title[language] || menu.title.en : ""}
                      </h3>

                      {/* First 3 Item Component Checklist Preview */}
                      <div className="space-y-1.5 sm:space-y-2 border-t border-gray-100 pt-3">
                        {menu.items &&
                          menu.items.slice(0, 3).map((item, i) => (
                            <div key={i} className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                <span
                                  className={`w-2 h-2 rounded-full shrink-0 ${
                                    item.type === "non-veg" || activeTab === "NonVegPackages"
                                      ? "bg-red-500"
                                      : "bg-emerald-500"
                                  }`}
                                />
                                <p className="text-gray-600 text-xs font-bold truncate">
                                  {item[language] || item.en || item}
                                </p>
                              </div>
                              {item.price && (
                                <span className="text-gray-400 font-mono text-[11px] font-black shrink-0">
                                  ₹{item.price}
                                </span>
                              )}
                            </div>
                          ))}

                        {menu.items && menu.items.length > 3 && (
                          <p className="text-[11px] font-bold text-[#962a27] pt-1">
                            + {menu.items.length - 3} {language === "en" ? "more items..." : "மேலும் பல..."}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Action: Per-Card Loading Button */}
                  <div className="p-4 pt-0">
                    <button
                      onClick={() => handleCardClick(index)}
                      disabled={loadingCardIndex !== null || isFullMenuLoading}
                      className="w-full py-2.5 rounded-xl bg-[#fffaf7] hover:bg-[#962a27] text-[#962a27] hover:text-white font-bold text-xs border border-[#962a27]/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
                    >
                      {isLoading ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-[#962a27] border-t-transparent rounded-full animate-spin shrink-0" />
                          <span>{language === "en" ? "Loading Menu..." : "ஏற்றுகிறது..."}</span>
                        </>
                      ) : (
                        <>
                          <span>{language === "en" ? "View Details" : "விவரங்களை பார்க்க"}</span>
                          <span>→</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* BOTTOM CTA BUTTON TO GO TO FULL MENU PAGE */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleFullMenuClick}
            disabled={isFullMenuLoading || loadingCardIndex !== null}
            className="w-full sm:w-auto group flex items-center justify-center gap-2.5 bg-[#962a27] text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl sm:rounded-2xl text-xs sm:text-base font-extrabold shadow-xl shadow-[#962a27]/20 hover:bg-[#7a2220] transition-all cursor-pointer disabled:opacity-80"
          >
            {isFullMenuLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
                <span>{language === "en" ? "Opening Menu..." : "திறக்கிறது..."}</span>
              </>
            ) : (
              <>
                <span>
                  {language === "en"
                    ? "Explore Complete Full Menu"
                    : "முழு உணவுப் பட்டியலையும் பார்க்க"}
                </span>
                <HiArrowRight className="text-sm sm:text-lg group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>
        </div>

      </div>
    </section>
  );
}

export default MenuHome;