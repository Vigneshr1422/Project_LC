import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineSparkles, 
  HiOutlineClock, 
  HiOutlineLightningBolt, 
  HiOutlineHeart,
  HiCheck,
  HiChevronDown
} from "react-icons/hi";

function WhyTrustUsSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const features = [
    {
      id: "01",
      icon: <HiOutlineSparkles />,
      title: "Fresh & Authentic Flavor",
      subtitle: "Zero Artificial Colors or Preservatives",
      desc: "Every dish is cooked fresh daily in spotlessly hygienic kitchens using handpicked local spices and pure ghee, ensuring true traditional taste.",
      highlights: ["100% Pure Ghee & Oil", "Hand-ground Spices", "Certified Master Chefs"],
      stat: "4.9 ★",
      statLabel: "Rating"
    },
    {
      id: "02",
      icon: <HiOutlineClock />,
      title: "Flexible All-Week Hours",
      subtitle: "Always Ready To Serve Your Event Needs",
      desc: "Our event planning and catering team is available 7 days a week for direct menu consultations, food tastings, and seamless bookings.",
      highlights: ["Mon - Sun Availability", "9:00 AM - 10:00 PM", "Direct Event Guidance"],
      stat: "24/7",
      statLabel: "Support"
    },
    {
      id: "03",
      icon: <HiOutlineLightningBolt />,
      title: "Instant Quote & Response",
      subtitle: "No Waiting Time For Event Pricing",
      desc: "Get rapid responses and customized menu packages tailored specifically to your family's budget and function preferences.",
      highlights: ["Fast Price Quotes", "Custom Packages", "Transparent Pricing"],
      stat: "2 Hrs",
      statLabel: "Reply Time"
    },
    {
      id: "04",
      icon: <HiOutlineHeart />,
      title: "Trusted For Every Milestone",
      subtitle: "Weddings, Birthdays & Ceremonies",
      desc: "From grand wedding banquets to intimate family functions like Seemantham & Housewarmings, we treat every event like our own family celebration.",
      highlights: ["2000+ Happy Families", "Weddings & Ceremonies", "Full Hospitality"],
      stat: "25+ Yrs",
      statLabel: "Excellence"
    }
  ];

  return (
    <section className="w-full bg-[#fffaf7] py-14 sm:py-20 px-4 sm:px-8 md:px-12 relative overflow-hidden border-t border-gray-200/60">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] bg-[#962a27]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#962a27]/10 text-[#962a27] font-semibold text-[11px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4 border border-[#962a27]/20">
            <span className="w-2 h-2 rounded-full bg-[#962a27] animate-pulse" />
            Our Core Values
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#2b1b17] mb-3 tracking-tight">
            Why Families{" "}
            <span className="relative inline-block text-[#962a27]">
              Trust Us
              <svg
                className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-3 text-[#d9a86c]/70"
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
              >
                <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
              </svg>
            </span>
          </h2>

          <p className="text-gray-600 text-xs sm:text-base max-w-lg mx-auto leading-relaxed">
            Bringing authentic taste, premium service, and unforgettable dining experiences to every celebration.
          </p>
        </div>

        {/* ACCORDION SHOWCASE (PERFECT FOR MOBILE & DESKTOP) */}
        <div className="space-y-3 sm:space-y-4">
          {features.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.id}
                className={`rounded-2xl sm:rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#962a27] shadow-lg shadow-[#962a27]/10"
                    : "bg-white/80 border-gray-200/80 hover:border-gray-300 shadow-xs"
                }`}
              >
                {/* CARD HEADER (TAP TO OPEN) */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 focus:outline-none"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-lg sm:text-xl shrink-0 transition-colors ${
                        isOpen
                          ? "bg-[#962a27] text-white"
                          : "bg-[#962a27]/10 text-[#962a27]"
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] sm:text-xs font-bold text-[#d9a86c]">
                          {item.id}
                        </span>
                        <h3 className="text-sm sm:text-lg font-bold text-[#2b1b17] truncate">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-[11px] sm:text-xs text-gray-500 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* STAT & ARROW */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right hidden sm:block">
                      <span className="text-base font-black text-[#962a27] block leading-none">
                        {item.stat}
                      </span>
                      <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                        {item.statLabel}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-gray-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#962a27] bg-[#962a27]/10" : ""
                      }`}
                    >
                      <HiChevronDown className="text-lg" />
                    </div>
                  </div>
                </button>

                {/* CARD CONTENT EXPANSION */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-gray-100">
                        {/* DESCRIPTION */}
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                          {item.desc}
                        </p>

                        {/* HIGHLIGHT BADGES */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
                          {item.highlights.map((highlight, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-[#fffaf7] border border-gray-200 text-[11px] sm:text-xs font-semibold text-[#2b1b17] flex items-center gap-1.5"
                            >
                              <HiCheck className="text-xs text-[#962a27]" />
                              {highlight}
                            </span>
                          ))}
                        </div>

                        {/* MOBILE STAT FOOTER */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100/80">
                          <div className="sm:hidden flex items-center gap-2">
                            <span className="text-sm font-black text-[#962a27]">
                              {item.stat}
                            </span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase">
                              • {item.statLabel}
                            </span>
                          </div>

                          <a
                            href="#contact"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#962a27] hover:underline ml-auto"
                          >
                            <span>Book Event</span>
                            <span>→</span>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default WhyTrustUsSection;