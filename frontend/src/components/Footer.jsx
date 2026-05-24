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

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">

        {/* MAIN FOOTER */}
        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-[1.2fr_1fr_1fr_1fr]
          gap-14
          mt-10
          "
        >

          {/* ====================================================== */}
          {/* COLUMN 1 */}
          {/* ====================================================== */}

          <motion.div

            initial={{
              opacity: 0,
              y: 60,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.8,
            }}

            viewport={{ once: true }}

            className="
            flex flex-col
            items-center md:items-start
            text-center md:text-left
            "
          >

            {/* LOGO */}
            <div className="w-full flex justify-center md:justify-start">

              <img
                src={logo}
                alt="logo"

                className="
                w-[115px]
                md:w-[140px]
                object-contain
                md:-ml-2
                hover:scale-105
                duration-300
                "
              />

            </div>

            {/* DESCRIPTION */}
            <p
              className="
              mt-5
              text-[#6b4b45]
              leading-8
              text-sm md:text-[15px]
              max-w-[320px]
              text-center md:text-left
              "
            >

              Authentic catering services crafted with
              passion, quality ingredients, and exceptional
              hospitality for every celebration.

            </p>

            {/* SOCIAL ICONS */}
            <div
              className="
              flex flex-wrap
              items-center
              justify-center md:justify-start
              gap-4
              mt-7
              "
            >

              {/* FACEBOOK */}
              <a
                href="https://www.facebook.com/people/Lakshmi-catering/100083037137563/?mibextid=ZbWKwL"

                target="_blank"
                rel="noreferrer"

                className="
                w-11 h-11 rounded-full
                bg-white shadow-md
                hover:bg-[#1877F2]
                hover:text-white
                flex items-center justify-center
                duration-300
                hover:-translate-y-1
                "
              >

                <FaFacebookF />

              </a>

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/lakshmicateringkkdi?igsh=MWl5aGIwazI4aXozaQ%3D%3D"

                target="_blank"
                rel="noreferrer"

                className="
                w-11 h-11 rounded-full
                bg-white shadow-md
                hover:bg-[#E1306C]
                hover:text-white
                flex items-center justify-center
                duration-300
                hover:-translate-y-1
                "
              >

                <FaInstagram />

              </a>

              {/* YOUTUBE */}
              <a
                href="https://youtube.com/"

                target="_blank"
                rel="noreferrer"

                className="
                w-11 h-11 rounded-full
                bg-white shadow-md
                hover:bg-[#FF0000]
                hover:text-white
                flex items-center justify-center
                duration-300
                hover:-translate-y-1
                "
              >

                <FaYoutube />

              </a>

              {/* LINKEDIN */}
              <a
                href="#"

                className="
                w-11 h-11 rounded-full
                bg-white shadow-md
                hover:bg-[#0A66C2]
                hover:text-white
                flex items-center justify-center
                duration-300
                hover:-translate-y-1
                "
              >

                <FaLinkedinIn />

              </a>

              {/* TWITTER */}
              <a
                href="#"

                className="
                w-11 h-11 rounded-full
                bg-white shadow-md
                hover:bg-black
                hover:text-white
                flex items-center justify-center
                duration-300
                hover:-translate-y-1
                "
              >

                <FaXTwitter />

              </a>

            </div>

           

          </motion.div>

          {/* ====================================================== */}
          {/* COLUMN 2 */}
          {/* ====================================================== */}

          <div className="flex flex-col items-center md:items-start text-center md:text-left">

            {/* HEADING */}
            <h3 className="text-2xl font-bold text-[#962a27] mb-8">
              Services
            </h3>

            {/* LIST */}
            <ul
              className="
              space-y-5
              text-[#6b4b45]
              w-full
              flex flex-col
              items-center md:items-start
              "
            >

              {[
                "Wedding Catering",
                "Birthday Parties",
                "Corporate Events",
                "House Warming",
                "Outdoor Catering",
              ].map((service, index) => (

                <motion.li

                  key={index}

                  initial={{
                    opacity: 0,
                    x: -60,
                  }}

                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}

                  transition={{
                    duration: 0.5,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}

                  viewport={{ once: true }}

                  whileHover={{
                    x: 8,
                  }}

                  className="group"

                >

                  <Link

                    to="/services"

                    className="
                    flex items-center
                    justify-start
                    w-[230px]
                    md:w-auto
                    gap-3
                    hover:text-[#962a27]
                    duration-300
                    cursor-pointer
                    "

                  >

                    {/* BULLET */}
                    <motion.span

                      animate={{
                        x: [0, 5, 0],
                      }}

                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}

                      className="
                      min-w-[28px]
                      w-7 h-7
                      rounded-full
                      bg-[#fff1ea]
                      text-[#962a27]
                      flex items-center justify-center
                      group-hover:bg-[#962a27]
                      group-hover:text-white
                      duration-300
                      "

                    >

                      <FaChevronRight className="text-[10px]" />

                    </motion.span>

                    {/* TEXT */}
                    <span className="font-medium tracking-wide">
                      {service}
                    </span>

                  </Link>

                </motion.li>

              ))}

            </ul>

          </div>

          {/* ====================================================== */}
          {/* COLUMN 3 */}
          {/* ====================================================== */}

          <motion.div

            initial={{
              opacity: 0,
              x: 100,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
            }}

            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}

            viewport={{ once: true }}

            className="md:-ml-4"

          >

            <h3 className="text-2xl font-bold text-[#962a27] mb-8">
              Contact Us
            </h3>

            <div className="space-y-6">

              {/* ADDRESS */}
              <motion.div

                whileHover={{
                  x: 6,
                }}

                className="flex gap-4"

              >

                <div
                  className="
                  min-w-[45px]
                  h-[45px]
                  rounded-full
                  bg-[#fff1ea]
                  text-[#962a27]
                  flex items-center justify-center
                  shadow-sm
                  "
                >

                  <FaMapMarkerAlt />

                </div>

                <p className="text-[#6b4b45] leading-7 text-sm md:text-base">

                  H-10, Aishwarya Avenue, Thanavayal,
                  <br />

                  Karaikudi - 630 001.

                </p>

              </motion.div>

              {/* PHONE */}
              <motion.div

                whileHover={{
                  x: 6,
                }}

                className="flex items-center gap-4"

              >

                <div
                  className="
                  min-w-[45px]
                  h-[45px]
                  rounded-full
                  bg-[#fff1ea]
                  text-[#962a27]
                  flex items-center justify-center
                  shadow-sm
                  "
                >

                  <FaPhoneAlt />

                </div>

                <div className="text-[#6b4b45] leading-8 text-sm md:text-base font-medium">

                  <a
                    href="tel:+919600630051"
                    className="block hover:text-[#962a27] duration-300"
                  >
                    +91 96006 30051
                  </a>

                  <a
                    href="tel:+919123578042"
                    className="block hover:text-[#962a27] duration-300"
                  >
                    +91 91235 78042
                  </a>

                  <a
                    href="tel:+917708531235"
                    className="block hover:text-[#962a27] duration-300"
                  >
                    +91 77085 31235
                  </a>

                </div>

              </motion.div>

              {/* EMAIL */}
              <motion.div

                whileHover={{
                  x: 6,
                }}

                className="flex items-center gap-4"

              >

                <div
                  className="
                  min-w-[45px]
                  h-[45px]
                  rounded-full
                  bg-[#fff1ea]
                  text-[#962a27]
                  flex items-center justify-center
                  shadow-sm
                  "
                >

                  <FaEnvelope />

                </div>

                <p className="text-[#6b4b45] break-all">
                  lakshmicatering@gmail.com
                </p>

              </motion.div>

            </div>

          </motion.div>

          {/* ====================================================== */}
          {/* COLUMN 4 */}
          {/* ====================================================== */}

          <motion.div

            initial={{
              opacity: 0,
              x: 120,
              scale: 0.9,
            }}

            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}

            transition={{
              duration: 0.9,
              ease: "easeOut",
            }}

            viewport={{ once: true }}

          >

            {/* HEADING */}
            <motion.h3

              initial={{
                opacity: 0,
                y: 40,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                delay: 0.2,
                duration: 0.7,
              }}

              viewport={{ once: true }}

              className="text-2xl font-bold text-[#962a27] mb-8"

            >

              Quick Contact

            </motion.h3>

            {/* CARD */}
            <motion.div

              whileHover={{
                y: -10,
                boxShadow: "0px 25px 50px rgba(0,0,0,0.12)",
                borderColor: "#25D366",
              }}

              transition={{
                duration: 0.3,
              }}

              className="
              relative overflow-hidden
              bg-white
              rounded-[28px]
              p-6
              shadow-lg
              border border-[#f5d6c6]
              "

            >

              {/* GLOW EFFECT */}
              <motion.div

                animate={{
                  rotate: 360,
                }}

                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}

                className="
                absolute -top-24 -right-24
                w-48 h-48 rounded-full
                bg-[#25D366]/10 blur-3xl
                "

              />

              {/* SMALL FLOATING CIRCLE */}
              <motion.div

                animate={{
                  y: [0, -12, 0],
                }}

                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}

                className="
                absolute top-5 right-5
                w-4 h-4 rounded-full
                bg-[#25D366]
                "

              />

              {/* TEXT */}
              <motion.p

                initial={{
                  opacity: 0,
                  y: 30,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  delay: 0.3,
                  duration: 0.7,
                }}

                viewport={{ once: true }}

                className="
                text-[#6b4b45]
                leading-7
                text-sm
                relative z-10
                "

              >

                Planning an event?
                Contact us instantly through WhatsApp
                and get your customized catering quote.

              </motion.p>

              {/* BUTTON */}
              <motion.a

                href="https://wa.me/919600630051"

                target="_blank"
                rel="noreferrer"

                whileHover={{
                  scale: 1.05,
                }}

                whileTap={{
                  scale: 0.95,
                }}

                className="
                mt-6 relative overflow-hidden
                flex items-center justify-center
                gap-3
                bg-[#25D366]
                hover:bg-[#1ebe5d]
                text-white
                py-4
                rounded-2xl
                font-semibold
                duration-300
                z-10
                "

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

                  className="
                  absolute top-[-60px] left-0
                  w-20 h-20
                  bg-gradient-to-r
                  from-transparent
                  via-white/60
                  to-transparent
                  rotate-45
                  blur-md
                  "

                />

                {/* ICON */}
                <motion.div

                  animate={{
                    rotate: [0, -10, 10, 0],
                  }}

                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}

                >

                  <FaWhatsapp className="text-2xl" />

                </motion.div>

                {/* TEXT */}
                <span className="tracking-wide">
                  Chat Now
                </span>

              </motion.a>

            </motion.div>

          </motion.div>

        </div>

      </div>

      {/* ====================================================== */}
      {/* BOTTOM */}
      {/* ====================================================== */}

      <div className="border-t border-[#f3d8c7] py-5 px-5 md:px-10 bg-[#fff1ea]">

        <div
          className="
          max-w-7xl mx-auto
          flex flex-col md:flex-row
          items-center justify-between
          gap-4 text-sm
          "
        >

          <p className="text-[#6b4b45] text-center md:text-left">
            © 2026 Lakshmi Catering. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-[#6b4b45]">

            <p className="hover:text-[#962a27] cursor-pointer duration-300">
              Privacy Policy
            </p>

            <p className="hover:text-[#962a27] cursor-pointer duration-300">
              Terms & Conditions
            </p>

          </div>

        </div>

      </div>

    </footer>

  );
}

export default Footer;