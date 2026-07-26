import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronRight,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../Images/Logo.webp";

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-white text-[#3b1d1b] overflow-hidden border-t border-[#f3d8c7]"
    >
      {/* 🚀 CSS ENGINE FOR FOOD/CHEF MAGIC SIGNATURE ANIMATION */}
      <style>{`
        @keyframes foodMagicRun {
          0% { transform: translate(-6px,-45px) scale(0.5); opacity: 0; }
          5% { transform: translate(-6px,0) scale(1.2); opacity: 1; filter: drop-shadow(0 0 10px #f59e0b) drop-shadow(0 0 20px #962a27); }
          25% { transform: translate(-6px,0) scale(1); }
          33% { transform: translate(12px,0); }
          41% { transform: translate(22px,0); }
          49% { transform: translate(33px,0); }
          57% { transform: translate(44px,0); }
          65% { transform: translate(55px,0); }
          73% { transform: translate(66px,0); }
          81% { transform: translate(77px,0); }
          89% { transform: translate(86px,0); }
          95% { transform: translate(98px,0); opacity: 1; }
          100% { transform: translate(98px,0) scale(0.5); opacity: 0; }
        }

        .food-magic {
          position: absolute;
          top: 0px;
          left: 0;
          z-index: 10;
          pointer-events: none;
          animation: foodMagicRun 9s linear infinite;
        }

        @keyframes revealFoodLetter {
          0% { opacity: 0; text-shadow: none; }
          0.1%, 95% { opacity: 1; text-shadow: 0 0 8px rgba(150,42,39,0.5); }
          96%, 100% { opacity: 0; }
        }

        .food-letter {
          display: inline-block;
          opacity: 0;
          font-family: monospace;
          font-weight: 700;
          color: #962a27;
          animation: revealFoodLetter 9s linear infinite;
        }
      `}</style>

      {/* ====================================================== */}
      {/* TOP MAIN SECTION */}
      {/* ====================================================== */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-14 mt-6">
          
          {/* COLUMN 1: BRAND LOGO & SOCIALS */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <div className="w-full flex justify-center md:justify-start">
              <img
                src={logo}
                alt="Lakshmi Catering Logo"
                className="w-[115px] md:w-[140px] object-contain md:-ml-2 hover:scale-105 duration-300"
              />
            </div>
            
            <p className="mt-5 text-[#6b4b45] leading-8 text-sm md:text-[15px] max-w-[320px] text-center md:text-left font-medium">
              Authentic catering services crafted with passion, quality ingredients, and exceptional hospitality for every celebration.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 mt-7">
              <a
                href="https://www.facebook.com/people/Lakshmi-catering/100083037137563/?mibextid=ZbWKwL"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#fff1ea] text-[#962a27] shadow-sm hover:bg-[#1877F2] hover:text-white flex items-center justify-center duration-300 hover:-translate-y-1"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/lakshmicateringkkdi?igsh=MWl5aGIwazI4aXozaQ%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#fff1ea] text-[#962a27] shadow-sm hover:bg-[#E1306C] hover:text-white flex items-center justify-center duration-300 hover:-translate-y-1"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#fff1ea] text-[#962a27] shadow-sm hover:bg-[#FF0000] hover:text-white flex items-center justify-center duration-300 hover:-translate-y-1"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#fff1ea] text-[#962a27] shadow-sm hover:bg-[#0A66C2] hover:text-white flex items-center justify-center duration-300 hover:-translate-y-1"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#fff1ea] text-[#962a27] shadow-sm hover:bg-black hover:text-white flex items-center justify-center duration-300 hover:-translate-y-1"
              >
                <FaXTwitter />
              </a>
            </div>
          </motion.div>

          {/* COLUMN 2: SERVICES */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-2xl font-bold text-[#962a27] mb-8">
              Services
            </h3>
            <ul className="space-y-5 text-[#6b4b45] w-full flex flex-col items-center md:items-start">
              {[
                "Wedding Catering",
                "Birthday Parties",
                "Corporate Events",
                "House Warming",
                "Outdoor Catering"
              ].map((service, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{ x: 8 }}
                  className="group"
                >
                  <Link
                    to="/services"
                    className="flex items-center justify-start w-[230px] md:w-auto gap-3 hover:text-[#962a27] duration-300 cursor-pointer"
                  >
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.2 }}
                      className="min-w-[28px] w-7 h-7 rounded-full bg-[#fff1ea] text-[#962a27] flex items-center justify-center group-hover:bg-[#962a27] group-hover:text-white duration-300"
                    >
                      <FaChevronRight className="text-[10px]" />
                    </motion.span>
                    <span className="font-medium tracking-wide">
                      {service}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: CONTACT US */}
         <motion.div
  initial={{ opacity: 0, x: 100 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true }}
  className="md:-ml-4 text-center md:text-left flex flex-col items-center md:items-start"
>
  {/* HEADING */}
  <h3 className="text-2xl font-bold text-[#962a27] mb-8">
    Contact Us
  </h3>

  <div className="space-y-6 w-full flex flex-col items-center md:items-start">
    {/* ADDRESS */}
    <motion.div 
      whileHover={{ x: 6 }} 
      className="flex flex-col sm:flex-row items-center sm:items-start justify-center md:justify-start gap-3 sm:gap-4 text-center md:text-left"
    >
      <div className="min-w-[42px] h-[42px] rounded-full bg-[#fff1ea] text-[#962a27] flex items-center justify-center shadow-xs shrink-0 mt-0.5">
        <FaMapMarkerAlt />
      </div>
      <p className="text-[#6b4b45] leading-6 text-sm md:text-base font-medium">
        H-10, Aishwarya Avenue, Thanavayal, <br />
        Karaikudi - 630 001.
      </p>
    </motion.div>

    {/* PHONE NUMBERS */}
    <motion.div 
      whileHover={{ x: 6 }} 
      className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 text-center md:text-left"
    >
      <div className="min-w-[42px] h-[42px] rounded-full bg-[#fff1ea] text-[#962a27] flex items-center justify-center shadow-xs shrink-0">
        <FaPhoneAlt />
      </div>
      <div className="text-[#6b4b45] text-sm md:text-base font-semibold leading-relaxed">
        <a href="tel:+919600630051" className="block hover:text-[#962a27] duration-300">
          +91 96006 30051
        </a>
        <a href="tel:+919123578042" className="block hover:text-[#962a27] duration-300">
          +91 91235 78042
        </a>
        <a href="tel:+917708531235" className="block hover:text-[#962a27] duration-300">
          +91 77085 31235
        </a>
      </div>
    </motion.div>

    {/* EMAIL */}
    <motion.div 
      whileHover={{ x: 6 }} 
      className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 text-center md:text-left"
    >
      <div className="min-w-[42px] h-[42px] rounded-full bg-[#fff1ea] text-[#962a27] flex items-center justify-center shadow-xs shrink-0">
        <FaEnvelope />
      </div>
      <p className="text-[#6b4b45] text-sm font-medium break-all">
        lakshmicatering@gmail.com
      </p>
    </motion.div>
  </div>
</motion.div>

          {/* COLUMN 4: QUICK WHATSAPP CONTACT */}
       <motion.div
  initial={{ opacity: 0, x: 120, scale: 0.9 }}
  whileInView={{ opacity: 1, x: 0, scale: 1 }}
  transition={{ duration: 0.9, ease: "easeOut" }}
  viewport={{ once: true }}
  className="text-center md:text-left flex flex-col items-center md:items-start"
>
  {/* HEADING */}
  <h3 className="text-2xl font-bold text-[#962a27] mb-8">
    Quick Contact
  </h3>

  {/* CARD */}
  <motion.div
    whileHover={{
      y: -6,
      boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
      borderColor: "#25D366"
    }}
    transition={{ duration: 0.3 }}
    className="relative overflow-hidden bg-white rounded-[28px] p-6 shadow-md border border-[#f5d6c6] w-full max-w-[360px] md:max-w-none text-center md:text-left"
  >
    {/* BACKGROUND GLOW */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#25D366]/10 blur-3xl pointer-events-none"
    />
    
    {/* FLOATING GREEN DOT */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute top-5 right-5 w-3.5 h-3.5 rounded-full bg-[#25D366]"
    />

    {/* TEXT */}
    <p className="text-[#6b4b45] leading-relaxed text-xs sm:text-sm relative z-10 font-medium">
      Planning an event? Contact us instantly through WhatsApp and get your customized catering quote.
    </p>

    {/* BUTTON */}
    <motion.a
      href="https://wa.me/919600630051"
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="mt-5 relative overflow-hidden flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-3.5 rounded-2xl font-bold duration-300 z-10 text-sm w-full"
    >
      {/* SHINE EFFECT */}
      <motion.div
        animate={{
          x: ["-250%", "350%"],
          rotate: [45, 45],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-60px] left-0 w-20 h-20 bg-gradient-to-r from-transparent via-white/60 to-transparent rotate-45 blur-md"
      />
      
      {/* ICON */}
      <motion.div
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <FaWhatsapp className="text-xl" />
      </motion.div>

      <span className="tracking-wide">Chat Now</span>
    </motion.a>
  </motion.div>
</motion.div>

        </div>
      </div>

      {/* ====================================================== */}
      {/* 🧾 LOWER BOTTOM BASEBAR STRIP WITH VIGNESH.R SIGNATURE */}
      {/* ====================================================== */}
      <div className="border-t border-[#f3d8c7] py-5 px-5 md:px-10 bg-[#fff1ea] text-xs font-medium text-[#6b4b45]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          {/* COPYRIGHT TEXT */}
          <p className="tracking-wide">
            &copy; {new Date().getFullYear()} <span className="font-black text-[#2b1b17]">Lakshmi Catering</span>. All Rights Reserved.
          </p>

          {/* 👑 VIGNESH.R CULINARY SIGNATURE WITH CIRCLE ARROW BOX */}
          <div className="flex items-center gap-2">
            <span className="text-gray-500 font-normal">Designed by</span>
            <a
              href="https://vigneshrportfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center pl-3 pr-1 min-w-[155px] overflow-hidden select-none pb-0.5 cursor-pointer group gap-1.5"
            >
              {/* 🌶️ PREMIUM FOOD FLAME / CHEF MAGIC SVG */}
              <div className="food-magic">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4 text-amber-500 animate-pulse"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.176 7.547 7.547 0 0 1-1.705-3.015.75.75 0 0 0-1.422.31 10.207 10.207 0 0 0 2.404 5.385.75.75 0 0 0 .546.241c.21 0 .4-.092.531-.247a5.952 5.952 0 0 1 4.544-2.128 5.957 5.957 0 0 1 4.545 2.128.75.75 0 0 0 1.077.006 10.207 10.207 0 0 0 2.404-5.385.75.75 0 0 0-1.422-.31 7.547 7.547 0 0 1-1.705 3.015 9.742 9.742 0 0 0-3.539-6.176.75.75 0 0 0-.148-.093ZM12 12a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* LETTER BY LETTER ANIMATED NAME */}
              <span className="flex items-center group-hover:text-[#962a27] transition-colors duration-300">
                <span className="food-letter" style={{ animationDelay: "2.7s" }}>V</span>
                <span className="food-letter" style={{ animationDelay: "3.4s" }}>i</span>
                <span className="food-letter" style={{ animationDelay: "4.1s" }}>g</span>
                <span className="food-letter" style={{ animationDelay: "4.8s" }}>n</span>
                <span className="food-letter" style={{ animationDelay: "5.5s" }}>e</span>
                <span className="food-letter" style={{ animationDelay: "6.2s" }}>s</span>
                <span className="food-letter" style={{ animationDelay: "6.9s" }}>h</span>
                <span className="food-letter" style={{ animationDelay: "7.6s" }}>.</span>
                <span className="food-letter" style={{ animationDelay: "8.3s" }}>R</span>
              </span>

              {/* 🎯 CIRCLE ARROW BOX BADGE */}
              <span className="w-5 h-5 rounded-full bg-[#962a27]/10 group-hover:bg-[#962a27] text-[#962a27] group-hover:text-white flex items-center justify-center text-[10px] font-black transition-all duration-300 shrink-0 border border-[#962a27]/20 group-hover:scale-110 group-hover:shadow-xs">
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                  ↗
                </span>
              </span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;