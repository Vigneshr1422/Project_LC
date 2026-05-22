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

    <footer id="contact" className="bg-white text-[#3b1d1b] overflow-hidden border-t border-[#f3d8c7]">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16">

      

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 mt-16">

          {/* COLUMN 1 */}
         {/* COLUMN 1 */}
<div className="flex flex-col items-center text-center md:items-start md:text-left">

            {/* LOGO */}
            <img
  src={logo}
  alt="logo"
  className="w-[120px] md:w-[140px]"
/>
            <p className="mt-6 text-[#6b4b45] leading-8 text-sm md:text-base">

              Authentic catering services crafted with
              passion, quality ingredients, and exceptional
              hospitality for every celebration.

            </p>

            {/* SOCIAL ICONS */}
           <div className="flex items-center justify-center md:justify-start gap-4 mt-8">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white shadow-md hover:bg-[#1877F2] hover:text-white flex items-center justify-center duration-300 hover:-translate-y-1"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white shadow-md hover:bg-[#E1306C] hover:text-white flex items-center justify-center duration-300 hover:-translate-y-1"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white shadow-md hover:bg-[#FF0000] hover:text-white flex items-center justify-center duration-300 hover:-translate-y-1"
              >
                <FaYoutube />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white shadow-md hover:bg-[#0A66C2] hover:text-white flex items-center justify-center duration-300 hover:-translate-y-1"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white shadow-md hover:bg-black hover:text-white flex items-center justify-center duration-300 hover:-translate-y-1"
              >
                <FaXTwitter />
              </a>

            </div>

          </div>

          {/* COLUMN 2 */}
          <div>

            <h3 className="text-2xl font-bold text-[#962a27] mb-8">
              Services
            </h3>

            <ul className="space-y-5 text-[#6b4b45]">

              <li className="group flex items-center gap-3 hover:text-[#962a27] duration-300 cursor-pointer">

                <span className="w-7 h-7 rounded-full bg-[#fff1ea] text-[#962a27] flex items-center justify-center group-hover:bg-[#962a27] group-hover:text-white duration-300">

                  <FaChevronRight className="text-[10px]" />

                </span>

                Wedding Catering

              </li>

              <li className="group flex items-center gap-3 hover:text-[#962a27] duration-300 cursor-pointer">

                <span className="w-7 h-7 rounded-full bg-[#fff1ea] text-[#962a27] flex items-center justify-center group-hover:bg-[#962a27] group-hover:text-white duration-300">

                  <FaChevronRight className="text-[10px]" />

                </span>

                Birthday Parties

              </li>

              <li className="group flex items-center gap-3 hover:text-[#962a27] duration-300 cursor-pointer">

                <span className="w-7 h-7 rounded-full bg-[#fff1ea] text-[#962a27] flex items-center justify-center group-hover:bg-[#962a27] group-hover:text-white duration-300">

                  <FaChevronRight className="text-[10px]" />

                </span>

                Corporate Events

              </li>

              <li className="group flex items-center gap-3 hover:text-[#962a27] duration-300 cursor-pointer">

                <span className="w-7 h-7 rounded-full bg-[#fff1ea] text-[#962a27] flex items-center justify-center group-hover:bg-[#962a27] group-hover:text-white duration-300">

                  <FaChevronRight className="text-[10px]" />

                </span>

                House Warming

              </li>

              <li className="group flex items-center gap-3 hover:text-[#962a27] duration-300 cursor-pointer">

                <span className="w-7 h-7 rounded-full bg-[#fff1ea] text-[#962a27] flex items-center justify-center group-hover:bg-[#962a27] group-hover:text-white duration-300">

                  <FaChevronRight className="text-[10px]" />

                </span>

                Outdoor Catering

              </li>

            </ul>

          </div>

          {/* COLUMN 3 */}
          <div>

            <h3 className="text-2xl font-bold text-[#962a27] mb-8">
              Contact Us
            </h3>

            <div className="space-y-6">

              {/* ADDRESS */}
              <div className="flex gap-4">

                <div className="min-w-[45px] h-[45px] rounded-full bg-[#fff1ea] text-[#962a27] flex items-center justify-center shadow-sm">

                  <FaMapMarkerAlt />

                </div>

                <p className="text-[#6b4b45] leading-7 text-sm md:text-base">

                  Lakshmi Catering Service,
                  Madurai, Tamil Nadu,
                  India.

                </p>

              </div>

              {/* PHONE */}
              <div className="flex items-center gap-4">

                <div className="min-w-[45px] h-[45px] rounded-full bg-[#fff1ea] text-[#962a27] flex items-center justify-center shadow-sm">

                  <FaPhoneAlt />

                </div>

                <p className="text-[#6b4b45]">
                  +91 98765 43210
                </p>

              </div>

              {/* EMAIL */}
              <div className="flex items-center gap-4">

                <div className="min-w-[45px] h-[45px] rounded-full bg-[#fff1ea] text-[#962a27] flex items-center justify-center shadow-sm">

                  <FaEnvelope />

                </div>

                <p className="text-[#6b4b45] break-all">
                  lakshmicatering@gmail.com
                </p>

              </div>

            </div>

          </div>

          {/* COLUMN 4 */}
          <div>

            <h3 className="text-2xl font-bold text-[#962a27] mb-8">
              Quick Contact
            </h3>

            <div className="bg-white rounded-[28px] p-6 shadow-lg border border-[#f5d6c6]">

              <p className="text-[#6b4b45] leading-7 text-sm">

                Planning an event?
                Contact us instantly through WhatsApp
                and get your customized catering quote.

              </p>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white py-4 rounded-2xl font-semibold duration-300"
              >

                <FaWhatsapp className="text-2xl" />

                Chat Now

              </a>

            </div>

          </div>

        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-[#f3d8c7] py-5 px-5 md:px-10 bg-[#fff1ea]">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

          <p className="text-[#6b4b45]">
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