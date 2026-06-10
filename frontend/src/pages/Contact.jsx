import { useState } from "react";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

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

function Contact() {
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  // API / Email sending
  await new Promise((resolve) => setTimeout(resolve, 2500));

  setLoading(false);
};
  return (

    <section className="bg-[#fffaf7] overflow-hidden">

      {/* ================================================= */}
      {/* HERO SECTION */}
      {/* ================================================= */}

      <div
        className="
        relative
        h-[380px]
        md:h-[450px]
        flex items-center justify-center
        text-center
        px-5
        "
      >

        {/* BACKGROUND IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"

          alt="contact-banner"

          className="
          absolute inset-0
          w-full h-full
          object-cover
          "
        />

        {/* DARK OVERLAY */}
        <div
          className="
          absolute inset-0
          bg-black/65
          "
        />

        {/* CONTENT */}
        <motion.div

          initial={{
            opacity: 0,
            y: 50,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.8,
          }}

          viewport={{ once: true }}

          className="relative z-10 max-w-4xl"

        >

          {/* TOP SMALL BUTTON */}
          <div
            className="
            inline-block
            px-6 py-2
            rounded-full
            bg-[#962a27]
            text-white
            tracking-[3px]
            text-xs md:text-sm
            font-semibold
            uppercase
            mb-5
            "
          >

            Connect With Us

          </div>

          {/* TITLE */}
          <h1
            className="
            text-white
            text-5xl md:text-7xl
            font-bold
            "
          >

            Get in Touch

          </h1>

          {/* SUBTEXT */}
          <p
            className="
            mt-6
            text-[#f5e6de]
            text-lg md:text-2xl
            leading-9
            "
          >

            Whether it's a wedding, birthday,
            corporate event, or family celebration,
            we're here to serve you with premium
            catering experience.

          </p>

        </motion.div>

      </div>

      {/* ================================================= */}
      {/* CONTACT SECTION */}
      {/* ================================================= */}

      <div
        className="
        max-w-7xl
        mx-auto
        px-5 md:px-10
        relative
        z-20
        -mt-24
        pb-24
        "
      >

        <motion.div

          initial={{
            opacity: 0,
            y: 80,
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
          grid
          grid-cols-1
          lg:grid-cols-[0.9fr_1.3fr]
          rounded-[35px]
          overflow-hidden
          shadow-[0_20px_80px_rgba(0,0,0,0.12)]
          bg-white
          "
        >

          {/* =============================================== */}
          {/* LEFT SIDE */}
          {/* =============================================== */}

          <div
            className="
            relative
            bg-gradient-to-br
            from-[#962a27]
            via-[#7e1f1c]
            to-[#4a120f]
            p-10 md:p-14
            text-white
            overflow-hidden
            "
          >

            {/* GLOW EFFECT */}
            <div
              className="
              absolute
              -top-32
              -right-24
              w-72 h-72
              rounded-full
              bg-white/10
              blur-3xl
              "
            />

            {/* TITLE */}
            <h2
              className="
              text-4xl
              font-bold
              mb-14
              relative z-10
              "
            >

              Contact Information

            </h2>

          <div className="space-y-10 relative z-10">

  {/* LOCATION */}
  <motion.div

    whileHover={{
      x: 6,
    }}

    className="flex gap-4"

  >

    <div
      className="
      min-w-[55px]
      h-[55px]
      rounded-full
      bg-white/10
      backdrop-blur-md
      flex items-center justify-center
      text-xl
      "
    >

      <FaMapMarkerAlt />

    </div>

    <div>

      <h3 className="text-xl font-semibold mb-1">
        Location
      </h3>

      <p className="text-[#f8d9d1] leading-7 text-[15px]">

        H-10, Aishwarya Avenue,
        Thanavayal,
        <br />

        Karaikudi - 630001

      </p>

    </div>

  </motion.div>

  {/* PHONE */}
  <motion.div

    whileHover={{
      x: 6,
    }}

    className="flex gap-4"

  >

    <div
      className="
      min-w-[55px]
      h-[55px]
      rounded-full
      bg-white/10
      backdrop-blur-md
      flex items-center justify-center
      text-xl
      "
    >

      <FaPhoneAlt />

    </div>

    <div>

      <h3 className="text-xl font-semibold mb-1">
        Call Us
      </h3>

      <div className="space-y-1 text-[#f8d9d1] text-[15px]">

        <a
          href="tel:+919600630051"
          className="block hover:text-white duration-300"
        >
          +91 96006 30051
        </a>

        <a
          href="tel:+919123578042"
          className="block hover:text-white duration-300"
        >
          +91 91235 78042
        </a>

      </div>

    </div>

  </motion.div>

  {/* EMAIL */}
  <motion.div

    whileHover={{
      x: 6,
    }}

    className="flex gap-4"

  >

    <div
      className="
      min-w-[55px]
      h-[55px]
      rounded-full
      bg-white/10
      backdrop-blur-md
      flex items-center justify-center
      text-xl
      "
    >

      <FaEnvelope />

    </div>

    <div>

      <h3 className="text-xl font-semibold mb-1">
        Write to Us
      </h3>

      <a
        href="mailto:lakshmicatering@gmail.com"

        className="
        text-[#f8d9d1]
        hover:text-white
        duration-300
        break-all
        text-[15px]
        "
      >

        lakshmicatering@gmail.com

      </a>

    </div>

  </motion.div>

  {/* WHATSAPP BUTTON */}
{/* =========================================== */}
{/* BOTTOM SECTION */}
{/* =========================================== */}

<div
  className="
  mt-auto
  pt-10
  border-t border-white/10

  flex flex-col
  items-center
  justify-end
  "
>

  {/* WHATSAPP BUTTON */}
  <motion.a

    href="https://wa.me/919600630051"

    target="_blank"
    rel="noreferrer"

    whileHover={{
      scale: 1.03,
    }}

    whileTap={{
      scale: 0.96,
    }}

    className="
    w-full
    max-w-[320px]

    flex items-center justify-center
    gap-3

    bg-[#25D366]
    hover:bg-[#1ebe5d]

    py-4
    rounded-2xl

    text-lg
    font-semibold

    duration-300
    shadow-lg
    "
  >

    <FaWhatsapp className="text-2xl" />

    Chat on WhatsApp

  </motion.a>

  {/* SOCIAL MEDIA ICONS */}
  <div
    className="
    flex items-center
    justify-center
    gap-4

    mt-7
    pb-2
    "
  >

    {/* FACEBOOK */}
    <a

      href="https://facebook.com"

      target="_blank"
      rel="noreferrer"

      className="
      w-11 h-11
      rounded-full

      bg-white/10
      backdrop-blur-md

      flex items-center justify-center

      hover:bg-white
      hover:text-[#962a27]

      duration-300
      hover:-translate-y-1
      "
    >

      <FaFacebookF />

    </a>

    {/* INSTAGRAM */}
    <a

      href="https://instagram.com"

      target="_blank"
      rel="noreferrer"

      className="
      w-11 h-11
      rounded-full

      bg-white/10
      backdrop-blur-md

      flex items-center justify-center

      hover:bg-white
      hover:text-[#962a27]

      duration-300
      hover:-translate-y-1
      "
    >

      <FaInstagram />

    </a>

    {/* YOUTUBE */}
    <a

      href="https://youtube.com"

      target="_blank"
      rel="noreferrer"

      className="
      w-11 h-11
      rounded-full

      bg-white/10
      backdrop-blur-md

      flex items-center justify-center

      hover:bg-white
      hover:text-[#962a27]

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
      w-11 h-11
      rounded-full

      bg-white/10
      backdrop-blur-md

      flex items-center justify-center

      hover:bg-white
      hover:text-[#962a27]

      duration-300
      hover:-translate-y-1
      "
    >

      <FaLinkedinIn />

    </a>

  </div>

</div>

</div>

          </div>

          {/* =============================================== */}
          {/* RIGHT SIDE */}
          {/* =============================================== */}



    <div
      className="
      bg-white
      p-8 md:p-14
      "
    >

      {/* TITLE */}
      <motion.h2
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        viewport={{ once: true }}
        className="
        text-4xl md:text-5xl
        font-bold
        text-[#2b110f]
        "
      >

        Send us a Message

      </motion.h2>

      {/* SUBTEXT */}
      <p
        className="
        mt-6
        text-[#7b6a66]
        text-lg
        leading-9
        max-w-2xl
        "
      >

        Questions about catering, weddings,
        birthday parties, or corporate events?
        We'd love to hear from you.

      </p>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mt-12 space-y-7"
      >

        {/* ROW 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            type="text"
            placeholder="First Name"
            className="
            h-16
            rounded-2xl
            border border-[#e8d5cb]
            px-6
            outline-none
            focus:border-[#962a27]
            duration-300
            bg-[#fffaf7]
            "
          />

          <input
            type="text"
            placeholder="Last Name"
            className="
            h-16
            rounded-2xl
            border border-[#e8d5cb]
            px-6
            outline-none
            focus:border-[#962a27]
            duration-300
            bg-[#fffaf7]
            "
          />

        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            type="tel"
            placeholder="Mobile Number"
            className="
            h-16
            rounded-2xl
            border border-[#e8d5cb]
            px-6
            outline-none
            focus:border-[#962a27]
            duration-300
            bg-[#fffaf7]
            "
          />

          <input
            type="email"
            placeholder="Email ID"
            className="
            h-16
            rounded-2xl
            border border-[#e8d5cb]
            px-6
            outline-none
            focus:border-[#962a27]
            duration-300
            bg-[#fffaf7]
            "
          />

        </div>

        {/* MESSAGE */}
        <textarea
          rows="6"
          placeholder="Type Message"
          className="
          w-full
          rounded-2xl
          border border-[#e8d5cb]
          px-6 py-5
          outline-none
          focus:border-[#962a27]
          duration-300
          bg-[#fffaf7]
          resize-none
          "
        />

        {/* BUTTON */}
        <motion.button

          whileHover={{
            scale: loading ? 1 : 1.03,
          }}

          whileTap={{
            scale: loading ? 1 : 0.96,
          }}

          disabled={loading}

          type="submit"

          className="
          w-full md:w-auto
          px-12
          h-16
          rounded-2xl
          bg-[#962a27]
          hover:bg-[#7d1f1c]
          disabled:bg-[#b46a68]
          text-white
          font-semibold
          text-lg
          duration-300
          shadow-lg
          flex
          items-center
          justify-center
          gap-3
          "
        >

          {loading ? (
            <>

              {/* LOADING SPINNER */}
              <motion.div

                animate={{
                  rotate: 360,
                }}

                transition={{
                  repeat: Infinity,
                  duration: 1,
                  ease: "linear",
                }}

                className="
                w-6
                h-6
                border-[3px]
                border-white/30
                border-t-white
                rounded-full
                "
              />

              Sending...

            </>
          ) : (

            "Send Message"

          )}

        </motion.button>

      </form>

    </div>
  

        </motion.div>

      </div>

{/* ====================================================== */}
{/* LOCATION & MAP SECTION */}
{/* ====================================================== */}

<section className="bg-white pb-24 px-5 md:px-10">

  <div className="max-w-7xl mx-auto">

    {/* TOP TITLE */}
    <motion.div

      initial={{
        opacity: 0,
        y: 40,
      }}

      whileInView={{
        opacity: 1,
        y: 0,
      }}

      transition={{
        duration: 0.7,
      }}

      viewport={{ once: true }}

      className="text-center mb-16"

    >

      <div
        className="
        inline-block
        px-6 py-2
        rounded-full
        bg-[#962a27]
        text-white
        tracking-[3px]
        text-xs md:text-sm
        font-semibold
        uppercase
        mb-5
        "
      >

        Our Location

      </div>

      <h2
        className="
        text-4xl md:text-6xl
        font-bold
        text-[#2b110f]
        "
      >

        Visit Our Catering Hub

      </h2>

      <p
        className="
        mt-6
        text-[#7b6a66]
        text-lg
        leading-9
        max-w-3xl
        mx-auto
        "
      >

        Experience our premium catering service
        directly at our location in Karaikudi.
        Visit us for event discussions, bookings,
        and personalized catering plans.

      </p>

    </motion.div>

    {/* MAIN GRID */}
    <div
      className="
      grid
      grid-cols-1
      lg:grid-cols-2
      gap-10
      items-center
      "
    >

      {/* ===================================== */}
      {/* LEFT IMAGE */}
      {/* ===================================== */}

      <motion.div

        initial={{
          opacity: 0,
          x: -80,
        }}

        whileInView={{
          opacity: 1,
          x: 0,
        }}

        transition={{
          duration: 0.8,
        }}

        viewport={{ once: true }}

        className="
        relative
        rounded-[35px]
        overflow-hidden
        shadow-[0_20px_70px_rgba(0,0,0,0.12)]
        group
        h-[500px]
        "
      >

        {/* IMAGE */}
        <img

          src="https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2070&auto=format&fit=crop"

          alt="Lakshmi Catering"

          className="
          w-full
          h-full
          object-cover
          group-hover:scale-110
          duration-700
          "
        />

        {/* OVERLAY */}
        <div
          className="
          absolute inset-0
          bg-gradient-to-t
          from-black/80
          via-black/20
          to-transparent
          "
        />

        {/* CONTENT */}
        <div
          className="
          absolute bottom-0 left-0
          p-8 md:p-10
          text-white
          "
        >

          <h3 className="text-3xl md:text-4xl font-bold">

            Lakshmi Catering

          </h3>

          <p
            className="
            mt-4
            text-[#f5d9d0]
            leading-8
            text-base md:text-lg
            "
          >

            Authentic South Indian catering
            experience crafted with quality,
            taste, and tradition for every event.

          </p>

        </div>

      </motion.div>

      {/* ===================================== */}
      {/* RIGHT MAP */}
      {/* ===================================== */}

      <motion.div

        initial={{
          opacity: 0,
          x: 80,
        }}

        whileInView={{
          opacity: 1,
          x: 0,
        }}

        transition={{
          duration: 0.8,
        }}

        viewport={{ once: true }}

        className="
        relative
        h-[500px]
        rounded-[35px]
        overflow-hidden
        shadow-[0_20px_70px_rgba(0,0,0,0.12)]
        border border-[#f3d8c7]
        "
      >

        {/* MAP */}
<div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl">

  <iframe
    title="Lakshmi Catering Karaikudi"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0976854856863!2d78.7844734!3d10.008789499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b005d8f2ca203c3%3A0xc828bdbdf259ec89!2sLakshmi%20Catering%20Karaikudi!5e0!3m2!1sen!2sin!4v1779617861112!5m2!1sen!2sin"
    loading="lazy"
    allowFullScreen
    referrerPolicy="no-referrer-when-downgrade"
    className="absolute inset-0 w-full h-full border-0"
  />

</div>
        {/* LOCATION CARD */}
        <motion.div

          initial={{
            opacity: 0,
            y: 40,
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

          whileHover={{
            y: -5,
          }}

          className="
          absolute
          bottom-6 left-6 right-6
          bg-white/95
          backdrop-blur-xl
          rounded-[25px]
          p-6
          shadow-xl
          "
        >

          <div className="flex items-start gap-4">

            {/* ICON */}
            <div
              className="
              min-w-[55px]
              h-[55px]
              rounded-full
              bg-[#fff1ea]
              text-[#962a27]
              flex items-center justify-center
              text-xl
              "
            >

              <FaMapMarkerAlt />

            </div>

            {/* TEXT */}
            <div>

              <h4
                className="
                text-2xl
                font-bold
                text-[#2b110f]
                "
              >

                Karaikudi Branch

              </h4>

              <p
                className="
                mt-2
                text-[#7b6a66]
                leading-7
                "
              >

                H-10, Aishwarya Avenue,
                Thanavayal,
                Karaikudi - 630001

              </p>

            </div>

          </div>

        </motion.div>

      </motion.div>

    </div>

  </div>

</section>



{/* ================= WHY CHOOSE US SECTION ================= */}

<section className="w-full bg-[#fffaf5] py-16 md:py-20 px-4 sm:px-6 md:px-16 overflow-hidden">
  <div className="max-w-7xl mx-auto text-center">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, amount: 0.2 }}
    >
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#962a27] mb-4">
        Why Families Trust Us
      </h2>

      <p className="text-gray-600 max-w-2xl mx-auto mb-12 md:mb-14 text-sm sm:text-base md:text-lg leading-relaxed">
        Bringing authentic taste, premium service, and unforgettable dining
        experiences to every celebration.
      </p>
    </motion.div>

    {/* Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">

      {/* Card 1 */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false, amount: 0.2 }}
        whileHover={{ y: -10 }}
        className="bg-white rounded-2xl md:rounded-3xl shadow-md hover:shadow-2xl p-4 sm:p-6 md:p-8 border border-[#f3e3d3] duration-300"
      >
        <div className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-5">
          ⏰
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#962a27] mb-2 md:mb-3">
          Flexible Hours
        </h3>

        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
          Available all week for bookings and catering support.
        </p>

        <div className="mt-3 md:mt-5 text-[11px] sm:text-sm font-medium text-[#b85c38]">
          Mon - Sun • 9 AM - 10 PM
        </div>
      </motion.div>

      {/* Card 2 */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.2 }}
        whileHover={{ y: -10 }}
        className="bg-white rounded-2xl md:rounded-3xl shadow-md hover:shadow-2xl p-4 sm:p-6 md:p-8 border border-[#f3e3d3] duration-300"
      >
        <div className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-5">
          🍽️
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#962a27] mb-2 md:mb-3">
          Freshly Prepared
        </h3>

        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
          Hygienic cooking with authentic flavors and fresh ingredients.
        </p>

        <div className="mt-3 md:mt-5 text-[11px] sm:text-sm font-medium text-[#b85c38]">
          Quality Guaranteed
        </div>
      </motion.div>

      {/* Card 3 */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: false, amount: 0.2 }}
        whileHover={{ y: -10 }}
        className="bg-white rounded-2xl md:rounded-3xl shadow-md hover:shadow-2xl p-4 sm:p-6 md:p-8 border border-[#f3e3d3] duration-300"
      >
        <div className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-5">
          ⚡
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#962a27] mb-2 md:mb-3">
          Quick Response
        </h3>

        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
          Fast replies for pricing, booking, and menu inquiries.
        </p>

        <div className="mt-3 md:mt-5 text-[11px] sm:text-sm font-medium text-[#b85c38]">
          Within Few Hours
        </div>
      </motion.div>

      {/* Card 4 */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        whileHover={{ y: -10 }}
        className="bg-white rounded-2xl md:rounded-3xl shadow-md hover:shadow-2xl p-4 sm:p-6 md:p-8 border border-[#f3e3d3] duration-300"
      >
        <div className="text-3xl sm:text-4xl md:text-5xl mb-3 md:mb-5">
          🎉
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#962a27] mb-2 md:mb-3">
          Every Celebration
        </h3>

        <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
          Weddings, birthdays, family functions, and corporate events.
        </p>

        <div className="mt-3 md:mt-5 text-[11px] sm:text-sm font-medium text-[#b85c38]">
          Trusted By Families
        </div>
      </motion.div>

    </div>
  </div>
</section>
    </section>

    

  
);

  
}

export default Contact;