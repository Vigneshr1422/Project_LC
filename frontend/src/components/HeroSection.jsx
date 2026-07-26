import { motion } from "framer-motion";

function HeroSection({ cateringImage, fadeLeft, fadeRight, navigate }) {
  return (
    <section
      id="home"
      style={{ scrollMarginTop: "100px" }}
      className="relative w-full min-h-[90vh] bg-gradient-to-br from-[#fffcfb] via-[#fff5f2] to-[#fdeae4] flex items-center justify-center px-4 sm:px-8 md:px-16 py-10 lg:py-16 overflow-hidden"
    >
      {/* Background Glow Blobs */}
      <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-[#962a27]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-60 h-60 sm:w-96 sm:h-96 bg-[#e07a5f]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 z-10">
        
        {/* LEFT CONTENT CONTAINER */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="w-full lg:w-1/2 flex flex-col items-start text-left"
        >
          {/* 1. TOP HEADER & TEXT (Shows First on Mobile & Desktop) */}
          <div className="w-full flex flex-col items-start">
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#962a27]/10 text-[#962a27] font-semibold text-xs sm:text-sm mb-4 sm:mb-6 border border-[#962a27]/20 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#962a27] animate-pulse" />
              Premium Culinary Services
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#2b1810] leading-[1.18] sm:leading-[1.15] mb-4 sm:mb-6"
            >
              Unforgettable Taste For Every{" "}
              <span className="text-[#962a27] relative inline-block">
                Occasion
                <svg
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-[#962a27]/30"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0 15 Q 50 0 100 15" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </motion.h1>

            {/* Sub-description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-sm sm:text-lg leading-relaxed mb-6 lg:mb-8 max-w-xl"
            >
              From intimate family functions to grand weddings & corporate galas, we craft authentic feasts with exceptional taste and unmatched hospitality.
            </motion.p>
          </div>

          {/* 2. IMAGE SHOWCASE (Mobile-Only: Order 2 - Positioned between text & buttons) */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full relative flex lg:hidden justify-center items-center my-6 py-4"
          >
            {/* Decorative Frame Ring */}
            <div className="absolute inset-0 max-w-[320px] max-h-[380px] sm:max-w-[400px] sm:max-h-[460px] m-auto rounded-[2rem] sm:rounded-[2.5rem] border-2 border-dashed border-[#962a27]/30 transform rotate-3 pointer-events-none" />

            {/* Hero Image Container */}
            <div className="relative z-10 w-full max-w-[320px] sm:max-w-[400px] aspect-[4/5] rounded-[1.8rem] sm:rounded-[2rem] overflow-hidden shadow-2xl group">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                src={cateringImage}
                alt="Catering"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
            </div>

            {/* Floating Glassmorphism Overlay Card (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-3 left-1 sm:left-4 z-20 bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 rounded-2xl shadow-xl border border-white/80 flex items-center gap-2.5"
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#962a27]/10 flex items-center justify-center text-[#962a27] font-bold text-base sm:text-lg shrink-0">
                👨‍🍳
              </div>
              <div>
                <p className="text-[10px] sm:text-xs text-gray-500 font-medium leading-none mb-0.5">Quality Guaranteed</p>
                <p className="text-xs sm:text-sm font-bold text-gray-800">Authentic Recipes</p>
              </div>
            </motion.div>

            {/* Floating Top Card (Top Right) */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -top-3 right-1 sm:right-4 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg border border-white/80 flex items-center gap-1.5"
            >
              <span className="text-amber-500 text-xs sm:text-sm">✨</span>
              <span className="text-[10px] sm:text-xs font-semibold text-gray-800">Fresh Ingredients Daily</span>
            </motion.div>
          </motion.div>

          {/* 3. BUTTONS & STATS (Shows Below Image on Mobile, Below Text on Desktop) */}
          <div className="w-full flex flex-col items-start">
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/booking")}
                className="w-full sm:w-auto bg-[#962a27] text-white px-8 py-3.5 sm:py-4 rounded-xl text-base font-semibold shadow-lg shadow-[#962a27]/25 hover:bg-[#7a2220] transition-colors"
              >
                Book Event Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/menu")}
                className="w-full sm:w-auto bg-white border border-gray-200 text-[#2b1810] px-8 py-3.5 sm:py-4 rounded-xl text-base font-semibold shadow-sm hover:border-[#962a27] hover:text-[#962a27] transition-all"
              >
                Explore Menu
              </motion.button>
            </motion.div>

            {/* Trust Highlights */}
            <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-200/80 w-full flex items-center gap-8 justify-around sm:justify-start">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#2b1810]">500+</p>
                <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wider font-medium mt-0.5">Events Catered</p>
              </div>
              <div className="h-8 w-[1px] bg-gray-200" />
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-[#2b1810]">4.9 ★</p>
                <p className="text-[11px] sm:text-xs text-gray-500 uppercase tracking-wider font-medium mt-0.5">Customer Rating</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* DESKTOP ONLY IMAGE CONTAINER (Hidden on Mobile) */}
        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="hidden lg:flex w-1/2 relative justify-center items-center"
        >
          {/* Decorative Frame Ring */}
          <div className="absolute inset-0 max-w-[460px] max-h-[520px] m-auto rounded-[2.5rem] border-2 border-dashed border-[#962a27]/30 transform rotate-3 pointer-events-none" />

          {/* Hero Image Container */}
          <div className="relative z-10 w-full max-w-[460px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl group">
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              src={cateringImage}
              alt="Catering"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          </div>

          {/* Floating Glassmorphism Overlay Card (Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="absolute -bottom-6 -left-2 sm:left-4 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#962a27]/10 flex items-center justify-center text-[#962a27] font-bold text-xl">
              👨‍🍳
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Quality Guaranteed</p>
              <p className="text-sm font-bold text-gray-800">Authentic Recipes</p>
            </div>
          </motion.div>

          {/* Floating Top Card (Top Right) */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -top-4 -right-2 sm:right-4 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 flex items-center gap-2"
          >
            <span className="text-amber-500 text-sm">✨</span>
            <span className="text-xs font-semibold text-gray-800">Fresh Ingredients Daily</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default HeroSection;