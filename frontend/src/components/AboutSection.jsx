import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiShieldCheck, HiCheckCircle } from "react-icons/hi2";

function AboutSection({ food1, food2, fadeLeft, fadeRight, fadeUp, navigate }) {
  const [activeTab, setActiveTab] = useState("story");

  const tabContent = {
    story: {
      heading: "We Turn Special Events Into Unforgettable Feasts.",
      desc: "Lakshmi Catering delivers authentic recipes, exquisite flavors, and seamless hospitality. Whether it's a grand wedding or an intimate family gathering, we curate dining experiences tailored to your taste.",
      pills: ["Traditional South & North Indian", "Live Cooking Counters", "Custom Royal Menus"]
    },
    whyUs: {
      heading: "Flawless Hospitality & Restaurant Quality Taste.",
      desc: "We don't just supply food; we manage the complete dining experience. From setup to immaculate service, we take care of your guests like family.",
      pills: ["Zero Compromise Hygiene", "Experienced Master Chefs", "Punctual Delivery"]
    },
    promise: {
      heading: "Freshness & Purity in Every Single Bite.",
      desc: "We strictly refrain from artificial colors or preservatives. Fresh spices ground daily, local farm produce, and pure ghee define our golden standard.",
      pills: ["100% Pure Ghee & Oil", "No Artificial Colors", "Eco-Friendly Setup"]
    }
  };

  const highlights = [
    "Customizable Menu Packages",
    "Traditional & Fusion Cuisine",
    "Hygiene Certified Chefs",
    "Full-Service Hospitality"
  ];

  return (
    <section 
      id="about" 
      className="relative w-full bg-[#fffaf7] text-[#2b1b17] py-12 sm:py-20 px-4 sm:px-10 md:px-16 scroll-mt-24 overflow-hidden"
    >
      {/* Warm Ambient Glow Background Drops */}
      <div className="absolute -top-10 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#962a27]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#d9a86c]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 sm:gap-14 lg:gap-20 relative z-10">
        
        {/* MAIN CONTAINER */}
        <div className="w-full flex flex-col lg:flex-row items-center gap-8 sm:gap-14 lg:gap-20">
          
          {/* RIGHT/CONTENT SIDE WRAPPER */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col items-start text-left order-1 lg:order-2"
          >
            {/* 1. EYEBROW TAG & NAVIGATION TABS (Shows FIRST on Mobile) */}
            <div className="w-full flex flex-col items-start">
              {/* Eyebrow Tag */}
              <motion.div 
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-[#962a27]/10 text-[#962a27] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-4 border border-[#962a27]/20"
              >
                <span className="w-2 h-2 rounded-full bg-[#962a27] animate-pulse" />
                About Lakshmi Catering
              </motion.div>

              {/* Interactive Navigation Tabs */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-sm mb-6 w-full sm:w-auto">
                {[
                  { key: "story", label: "Our Story" },
                  { key: "whyUs", label: "Why Choose Us" },
                  { key: "promise", label: "Our Promise" }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`relative flex-1 sm:flex-initial text-center px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                      activeTab === tab.key ? "text-white" : "text-gray-600 hover:text-[#962a27]"
                    }`}
                  >
                    {activeTab === tab.key && (
                      <motion.div
                        layoutId="activeTabGlowWarmAbout"
                        className="absolute inset-0 bg-[#962a27] rounded-xl shadow-md shadow-[#962a27]/30"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. DUAL IMAGE SECTION (Shows SECOND on Mobile, LEFT side on Desktop) */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="w-full relative flex lg:hidden justify-center items-center gap-3 sm:gap-6 my-4 py-2"
            >
              {/* Decorative Frame Line */}
              <div className="absolute w-[85%] h-[85%] border-2 border-dashed border-[#962a27]/20 rounded-[2rem] sm:rounded-[2.5rem] transform -rotate-3 pointer-events-none" />

              {/* Left / Smaller Image */}
              <motion.div 
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-[125px] sm:w-[190px] h-[240px] sm:h-[390px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/80 z-10"
              >
                <img 
                  src={food2} 
                  alt="Catering Dish 1" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>

              {/* Right / Larger Image Container */}
              <div className="relative z-10">
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="w-[150px] sm:w-[220px] h-[260px] sm:h-[410px] rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-2xl mt-6 sm:mt-8 border-4 border-white/80"
                >
                  <img 
                    src={food1} 
                    alt="Catering Dish 2" 
                    className="w-full h-full object-cover" 
                  />
                </motion.div>

                {/* Floating Heritage Badge */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-5 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-28 sm:h-28 rounded-full bg-[#962a27] border-2 sm:border-4 border-[#d9a86c] flex flex-col items-center justify-center text-white shadow-xl shadow-[#962a27]/30 z-20"
                >
                  <span className="text-[9px] sm:text-xs font-medium uppercase tracking-widest text-[#fce8d5]">Since</span>
                  <span className="text-base sm:text-2xl font-black text-white">2000</span>
                </motion.div>
              </div>
            </motion.div>

            {/* 3. DYNAMIC TAB CONTENT & HIGHLIGHTS (Shows THIRD on Mobile) */}
            <div className="w-full flex flex-col items-start mt-2 lg:mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-start"
                >
                  {/* Main Heading */}
                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#2b1b17] leading-[1.2] mb-3 sm:mb-4">
                    {activeTab === "story" ? (
                      <>
                        We Turn Special Events Into{" "}
                        <span className="text-[#962a27] underline decoration-[#d9a86c]/60 underline-offset-4 sm:underline-offset-8">
                          Unforgettable
                        </span>{" "}
                        Feasts.
                      </>
                    ) : (
                      tabContent[activeTab].heading
                    )}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-lg leading-relaxed mb-5 sm:mb-6">
                    {tabContent[activeTab].desc}
                  </p>

                  {/* Dynamic Feature Badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tabContent[activeTab].pills.map((pill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-[#962a27] shadow-sm flex items-center gap-1.5 sm:gap-2"
                      >
                        <HiShieldCheck className="text-sm sm:text-base text-[#d9a86c]" />
                        {pill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Key Feature Checkmarks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full mb-6 sm:mb-8 pt-4 border-t border-gray-200/60">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <HiCheckCircle className="text-[#962a27] text-lg sm:text-xl shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Action Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate && navigate("/menu")}
                className="w-full sm:w-auto group flex items-center justify-center gap-3 bg-[#962a27] text-white px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold shadow-lg shadow-[#962a27]/20 hover:bg-[#7a2220] transition-all"
              >
                <span>Learn More About Us</span>
                <span className="w-6 h-6 rounded-full bg-white/20 group-hover:bg-white group-hover:text-[#962a27] flex items-center justify-center text-xs transition-all">
                  →
                </span>
              </motion.button>
            </div>

          </motion.div>

          {/* DESKTOP DUAL IMAGE SECTION (Hidden on Mobile, Visible on Desktop Left Side) */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="hidden lg:flex w-1/2 relative justify-center items-center gap-4 sm:gap-6 order-1"
          >
            {/* Decorative Frame Line */}
            <div className="absolute w-[85%] h-[85%] border-2 border-dashed border-[#962a27]/20 rounded-[2.5rem] transform -rotate-3 pointer-events-none" />

            {/* Left / Smaller Image */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="w-[140px] sm:w-[190px] md:w-[210px] h-[290px] sm:h-[390px] md:h-[430px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/80 z-10"
            >
              <img 
                src={food2} 
                alt="Catering Dish 1" 
                className="w-full h-full object-cover" 
              />
            </motion.div>

            {/* Right / Larger Image Container */}
            <div className="relative z-10">
              <motion.div 
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="w-[170px] sm:w-[220px] md:w-[240px] h-[310px] sm:h-[410px] md:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl mt-8 border-4 border-white/80"
              >
                <img 
                  src={food1} 
                  alt="Catering Dish 2" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>

              {/* Floating Heritage Badge */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#962a27] border-4 border-[#d9a86c] flex flex-col items-center justify-center text-white shadow-xl shadow-[#962a27]/30 z-20"
              >
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-[#fce8d5]">Since</span>
                <span className="text-lg sm:text-2xl font-black text-white">2000</span>
              </motion.div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default AboutSection;