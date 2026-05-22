import cateringImage from "../Images/image4.webp";
import food1 from "../Images/food1.webp";
import food2 from "../Images/food2.webp";
import { MdOutlineRestaurant } from "react-icons/md";
import { FaGlassCheers } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="w-full">

      {/* Hero Section */}
        <section
          id="home"
          style={{ scrollMarginTop: "120px" }}
          className="w-full min-h-[85vh] bg-[#fff8f5] flex flex-col lg:flex-row items-center justify-center px-6 md:px-14 py-4 gap-10"
        >
        {/* Left Image */}
        <div className="w-full lg:w-1/2 flex justify-center">

          <img
            src={cateringImage}
            alt="Catering"
            className="w-full max-w-[500px] rounded-3xl shadow-2xl object-cover"
          />

        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">

          <h1 className="text-4xl md:text-6xl font-bold text-[#962a27] leading-tight mb-6">

            Delicious Catering <br />
            For Every Occasion

          </h1>

          <p className="text-gray-700 text-lg leading-8 mb-8">

            We provide premium catering services for weddings,
            birthdays, corporate events, family functions,
            and special celebrations with unforgettable taste
            and exceptional hospitality.

          </p>

          <div className="flex flex-wrap gap-5">

            <button className="bg-[#962a27] text-white px-8 py-4 rounded-full text-lg font-medium hover:scale-105 duration-300 shadow-lg">
              Book Now
            </button>

            <button className="border-2 border-[#962a27] text-[#962a27] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#962a27] hover:text-white duration-300">
              Explore Menu
            </button>

          </div>

        </div>

      </section>

      {/* About Section */}
      {/* About Section */}
<section
  id="about"
  className="w-full bg-[#f5f5f5] py-10 px-4 sm:px-6 md:px-14 scroll-mt-24 overflow-hidden"
>

  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">

    {/* Images First in Mobile */}
    <motion.div
      initial={{ opacity: 0, x: 150 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}

      className="w-full lg:w-1/2 relative flex justify-center gap-3 order-1 lg:order-2"
    >

      {/* First Image */}
      <motion.img

        whileHover={{
          scale: 1.03,
        }}

        transition={{
          duration: 0.2,
        }}

        src={food2}
        alt="Food"

        className="w-[130px] sm:w-[170px] md:w-[180px]
        h-[280px] sm:h-[380px] md:h-[420px]
        object-cover rounded-[25px] shadow-2xl"

      />

      {/* Second Image */}
      <div className="relative">

        <motion.img

          whileHover={{
            scale: 1.03,
          }}

          transition={{
            duration: 0.2,
          }}

          src={food1}
          alt="Food"

          className="w-[160px] sm:w-[200px] md:w-[220px]
          h-[280px] sm:h-[380px] md:h-[420px]
          object-cover rounded-[25px] mt-6 sm:mt-8 shadow-2xl"

        />

        {/* Since Badge */}
        <motion.div

          animate={{
            rotate: [0, 4, -4, 0],
          }}

          transition={{
            duration: 4,
            repeat: Infinity,
          }}

          className="absolute -top-5 sm:-top-8 left-1/2 -translate-x-1/2
          w-20 h-20 sm:w-28 sm:h-28
          rounded-full bg-[#962a27]
          border-[5px] sm:border-[7px]
          border-[#d9a86c]
          flex flex-col items-center justify-center
          text-white shadow-2xl"

        >

          <span className="text-sm sm:text-lg font-semibold">
            Since
          </span>

          <span className="text-xl sm:text-3xl font-bold">
            2000
          </span>

        </motion.div>

      </div>

    </motion.div>

    {/* Content Second in Mobile */}
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}

      className="w-full lg:w-1/2 order-2 lg:order-1"
    >

      {/* Small Heading */}
      <p className="uppercase tracking-[4px] text-[#962a27] font-semibold mb-4 text-center lg:text-left">
        About Us
      </p>

      {/* Main Heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b1b1b] leading-tight mb-6 text-center lg:text-left">

        Elevating Your Events
        with Exceptional
        Food.

      </h2>

      {/* Description */}
      <p className="text-gray-700 text-base sm:text-lg leading-8 mb-10 text-center lg:text-left">

        Lakshmi Catering is the place where food is celebrated
        with unforgettable culinary experiences, premium service,
        and exceptional hospitality for every special occasion.

      </p>

 {/* Cards */}
<div className="flex flex-col sm:grid sm:grid-cols-3 gap-4 mb-8 place-items-center">

  {/* Card 1 */}
  <motion.div

    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}

    transition={{
      duration: 0.3,
    }}

    viewport={{ once: true }}

    whileHover={{
      y: -5,
      scale: 1.02,
      boxShadow: "0px 15px 35px rgba(0,0,0,0.12)",
    }}

    className="group bg-white
    w-[220px] sm:w-full
    sm:max-w-none
    p-4 sm:p-5
    rounded-2xl
    border border-[#f1e4d8]
    hover:border-[#d9a86c]
    transition-all duration-150
    cursor-pointer"

  >

    {/* Icon */}
    <motion.div

      whileHover={{
        rotate: 8,
        scale: 1.05,
      }}

      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 6,
      }}

      className="w-12 h-12 sm:w-14 sm:h-14
      rounded-xl bg-[#fff4ec]
      flex items-center justify-center
      text-[#d9a86c]
      text-2xl sm:text-3xl
      mb-4 border border-[#f7d8b2]"

    >

      <MdOutlineRestaurant />

    </motion.div>

    <h3 className="text-2xl sm:text-3xl font-bold mb-1 text-[#1b1b1b]">
      25
    </h3>

    <p className="text-gray-600 text-sm sm:text-base font-medium leading-6">
      Years of Experience
    </p>

  </motion.div>

  {/* Card 2 */}
  <motion.div

    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}

    transition={{
      duration: 0.4,
    }}

    viewport={{ once: true }}

    whileHover={{
      y: -5,
      scale: 1.02,
      boxShadow: "0px 15px 35px rgba(0,0,0,0.12)",
    }}

    className="group bg-white
    w-[220px] sm:w-full
    sm:max-w-none
    p-4 sm:p-5
    rounded-2xl
    border border-[#f1e4d8]
    hover:border-[#d9a86c]
    transition-all duration-150
    cursor-pointer"

  >

    {/* Icon */}
    <motion.div

      whileHover={{
        rotate: -8,
        scale: 1.05,
      }}

      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 6,
      }}

      className="w-12 h-12 sm:w-14 sm:h-14
      rounded-xl bg-[#fff4ec]
      flex items-center justify-center
      text-[#d9a86c]
      text-2xl sm:text-3xl
      mb-4 border border-[#f7d8b2]"

    >

      <FaGlassCheers />

    </motion.div>

    <h3 className="text-2xl sm:text-3xl font-bold mb-1 text-[#1b1b1b]">
      2000+
    </h3>

    <p className="text-gray-600 text-sm sm:text-base font-medium leading-6">
      Successful Events
    </p>

  </motion.div>

  {/* Card 3 */}
  <motion.div

    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}

    transition={{
      duration: 0.5,
    }}

    viewport={{ once: true }}

    whileHover={{
      y: -5,
      scale: 1.02,
      boxShadow: "0px 15px 35px rgba(0,0,0,0.12)",
    }}

    className="group bg-white
    w-[220px] sm:w-full
    sm:max-w-none
    p-4 sm:p-5
    rounded-2xl
    border border-[#f1e4d8]
    hover:border-[#d9a86c]
    transition-all duration-150
    cursor-pointer"

  >

    {/* Icon */}
    <motion.div

      whileHover={{
        rotate: 8,
        scale: 1.05,
      }}

      transition={{
        type: "spring",
        stiffness: 1000,
        damping: 6,
      }}

      className="w-12 h-12 sm:w-14 sm:h-14
      rounded-xl bg-[#fff4ec]
      flex items-center justify-center
      text-[#d9a86c]
      text-2xl sm:text-3xl
      mb-4 border border-[#f7d8b2]"

    >

      <HiOutlineUsers />

    </motion.div>

    <h3 className="text-2xl sm:text-3xl font-bold mb-1 text-[#1b1b1b]">
      98%
    </h3>

    <p className="text-gray-600 text-sm sm:text-base font-medium leading-6">
      Happy Customers
    </p>

  </motion.div>

</div>

      {/* Button */}
      <motion.button

        whileHover={{
          scale: 1.05,
        }}

        className="flex items-center gap-4 border-2 border-[#962a27]
        px-7 py-3 rounded-full text-lg font-semibold
        hover:bg-[#962a27] hover:text-white duration-300
        mx-auto lg:mx-0"

      >

        More About Us

        <span className="w-9 h-9 rounded-full bg-[#962a27]
        text-white flex items-center justify-center">
          →
        </span>

      </motion.button>

    </motion.div>

  </div>

</section>


{/* Services Section */}
<section
  id="services"
  className="w-full py-16 md:py-20 bg-[#fff8f5] overflow-hidden"
>

  <div className="max-w-7xl mx-auto px-4 md:px-10">

    {/* Heading */}
    <div className="text-center mb-10 md:mb-14">

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#962a27]">
        Our Services
      </h2>

      <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-7 text-sm md:text-base px-2">
        Exceptional catering experiences crafted for weddings,
        celebrations, traditional ceremonies, and corporate events.
      </p>

    </div>

    {/* Services Data */}
    {(() => {

      const services = [

        {
          title: "Wedding Catering",

          image:
            "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",

          desc:
            "Elegant catering experiences for unforgettable wedding celebrations.",
        },

        {
          title: "Birthday Parties",

          image:
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop",

          desc:
            "Delicious menus and joyful catering for birthday celebrations.",
        },

        {
          title: "Corporate Events",

          image:
            "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",

          desc:
            "Professional catering solutions for corporate gatherings.",
        },

        {
          title: "House Warming",

          image:
            "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",

          desc:
            "Traditional and modern catering for housewarming ceremonies.",
        },

      ];

      return (

        <>

          {/* Marquee */}
          <div className="relative w-full overflow-hidden">

            <div className="marquee-track">

              {[...services, ...services].map((service, index) => (

                <div
                  key={index}
                  className="service-card group"
                >

                  {/* Image */}
                  <div className="overflow-hidden">

                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="w-full h-[170px] md:h-[190px] object-cover group-hover:scale-110 duration-700"
                    />

                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5">

                    <h3 className="text-lg md:text-xl font-bold text-[#7c2d12]">
                      {service.title}
                    </h3>

                    <p className="text-gray-500 mt-2 text-sm leading-6">
                      {service.desc}
                    </p>

                    <Link to="/services">

                      <button className="mt-4 bg-[#962a27] hover:bg-[#7d201d] text-white px-5 py-2 rounded-full text-sm font-medium duration-300">
                        Explore
                      </button>

                    </Link>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* Bottom Button */}
          <div className="flex justify-center mt-10 md:mt-14">

            <Link to="/services">

              <button className="bg-[#962a27] hover:bg-[#7d201d] text-white px-7 md:px-8 py-3 rounded-full text-sm md:text-base font-semibold shadow-md hover:scale-105 duration-300">
                View All Services
              </button>

            </Link>

          </div>

        </>

      );

    })()}

  </div>

</section>
     

    </div>

  );
}

export default Home;