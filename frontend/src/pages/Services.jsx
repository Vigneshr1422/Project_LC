import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiSparkles, HiArrowRight, HiShieldCheck } from "react-icons/hi2";

import Wedding from "../Images/Wedding.webp";
import temple from "../Images/temple.webp";
import Wedding1 from "../Images/Wedding1.webp";
import Seemantham from "../Images/Seemantham.webp";
import Reception from "../Images/Reception.webp";
import Mehanthi from "../Images/Mehanthi.webp";
import teamlunch from "../Images/teamlunch.webp";
import Retirement from "../Images/Retirement.webp";
import Birthday from "../Images/Birthday.webp";
import Engagement from "../Images/Engagement.webp";
import Image60th from "../Images/60th.webp";
import Image70th from "../Images/70th.webp";
import Corprate from "../Images/Corprate.webp";
import Professional from "../Images/Professional.webp";
import GrihaPravesh from "../Images/GrihaPravesh.webp";

function Services() {
  const serviceData = [
    {
      title: "Traditional Events",
      mainImage: Wedding,
      tag: "Cultural & Ceremonial",
      desc: "Authentic traditional feasts crafted according to age-old customs and traditional hospitality.",
      events: [
        { name: "60th Wedding", image: Image60th },
        { name: "70th Wedding", image: Image70th },
        { name: "Temple Functions", image: temple },
        { name: "Seemantham", image: Seemantham },
      ],
    },
    {
      title: "Wedding Events",
      mainImage: Wedding1,
      tag: "Grand Celebrations",
      desc: "Royal wedding banquets with extensive multi-course menus and elegant presentation.",
      events: [
        { name: "Wedding", image: Wedding1 },
        { name: "Reception", image: Reception },
        { name: "Engagement", image: Engagement },
        { name: "Mehndi", image: Mehanthi },
      ],
    },
    {
      title: "Celebrations",
      mainImage: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1200&auto=format&fit=crop",
      tag: "Memorable Parties",
      desc: "Vibrant and delicious food options tailored for birthdays, housewarmings, and family gatherings.",
      events: [
        { name: "Birthday Party", image: Birthday },
        { name: "House Warming", image: GrihaPravesh },
        { name: "Outdoor Catering", image: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop" },
      ],
    },
    {
      title: "Professional Events",
      mainImage: Professional,
      tag: "Corporate Hospitality",
      desc: "Punctual, hygienic, and high-quality corporate dining solutions for meetings & galas.",
      events: [
        { name: "Corporate Events", image: Corprate },
        { name: "Office Lunch", image: teamlunch },
        { name: "Retirement Function", image: Retirement },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(serviceData[0]);
  const [selectedImage, setSelectedImage] = useState(serviceData[0].mainImage);

  return (
    <div className="relative w-full bg-[#fffaf7] text-[#2b1b17] pt-[100px] px-6 md:px-16 pb-24 min-h-screen overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#962a27]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#d9a86c]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-12 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#962a27]/10 text-[#962a27] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-4 border border-[#962a27]/20"
          >
            <span className="w-2 h-2 rounded-full bg-[#962a27] animate-pulse" />
            Bespoke Culinary Services
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#2b1b17] leading-tight mb-4"
          >
            Our Catering{" "}
            <span className="text-[#962a27] underline decoration-[#d9a86c]/60 underline-offset-8">
              Services
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl text-base sm:text-lg leading-relaxed"
          >
            Crafting grand culinary experiences with authentic taste, pristine hygiene, and memorable hospitality for every celebration.
          </motion.p>
        </div>

        {/* CATEGORY SELECTOR TABS */}
        <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/80 shadow-sm max-w-3xl mx-auto mb-12">
          {serviceData.map((category) => (
            <button
              key={category.title}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedImage(category.mainImage);
              }}
              className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                selectedCategory.title === category.title
                  ? "text-white"
                  : "text-gray-600 hover:text-[#962a27]"
              }`}
            >
              {selectedCategory.title === category.title && (
                <motion.div
                  layoutId="activeCategoryGlow"
                  className="absolute inset-0 bg-[#962a27] rounded-xl shadow-md shadow-[#962a27]/30"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.title}</span>
            </button>
          ))}
        </div>

        {/* MAIN SPLIT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-10 items-start">
          
          {/* LEFT SIDE: STICKY FEATURED PREVIEW CARD */}
          <div className="lg:sticky lg:top-28 z-20">
            <div className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-200/80 shadow-xl relative group">
              
              {/* Image Showcase with AnimatePresence */}
              <div className="relative h-[280px] sm:h-[380px] overflow-hidden bg-gray-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={selectedImage}
                    alt={selectedCategory.title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Tag Badge */}
                <div className="absolute top-5 left-5">
                  <span className="bg-white/90 backdrop-blur-md text-[#962a27] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5 border border-white/40">
                    <HiSparkles />
                    {selectedCategory.tag}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2b1b17] mb-3">
                  {selectedCategory.title}
                </h2>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  {selectedCategory.desc}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold text-[#d9a86c] uppercase tracking-wider flex items-center gap-1">
                    <HiShieldCheck className="text-base" />
                    Premium Quality Guaranteed
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    {selectedCategory.events.length} Event Types
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: CATEGORY CARDS & EVENTS GRID */}
          <div className="space-y-6">
            {serviceData.map((category, index) => {
              const isSelected = selectedCategory.title === category.title;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${
                    isSelected
                      ? "border-[#962a27]/30 shadow-lg ring-1 ring-[#962a27]/20"
                      : "border-gray-200/80 shadow-sm hover:border-[#962a27]/20"
                  }`}
                >
                  {/* Category Header */}
                  <div
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedImage(category.mainImage);
                    }}
                    className={`p-6 cursor-pointer flex items-center justify-between transition-colors ${
                      isSelected ? "bg-[#fff5f2]" : "hover:bg-gray-50/80"
                    }`}
                  >
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-[#2b1b17]">
                        {category.title}
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        Explore {category.events.length} specialized catering options
                      </p>
                    </div>

                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-[#962a27] text-white"
                          : "bg-gray-100 text-gray-600 group-hover:bg-[#962a27] group-hover:text-white"
                      }`}
                    >
                      <HiArrowRight className={`text-base transition-transform ${isSelected ? "rotate-90" : ""}`} />
                    </div>
                  </div>

                  {/* Event Sub-cards Grid (Renders when category is active) */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-6 pt-2 border-t border-gray-100"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {category.events.map((event, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ y: -4, scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onMouseEnter={() => setSelectedImage(event.image)}
                              onClick={() => setSelectedImage(event.image)}
                              className={`group p-3 rounded-2xl bg-[#fffaf7] border cursor-pointer transition-all flex items-center gap-4 ${
                                selectedImage === event.image
                                  ? "border-[#962a27] shadow-md bg-white"
                                  : "border-gray-200/70 hover:border-[#962a27]/40 hover:shadow-sm"
                              }`}
                            >
                              {/* Thumbnail */}
                              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                                <img
                                  src={event.image}
                                  alt={event.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>

                              {/* Event Details */}
                              <div className="flex-1">
                                <h3 className="text-base font-bold text-[#2b1b17] group-hover:text-[#962a27] transition-colors">
                                  {event.name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">Hover to preview</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}

export default Services;