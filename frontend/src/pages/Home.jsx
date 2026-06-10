import cateringImage from "../Images/image4.webp";
import food1 from "../Images/food1.webp";
import food2 from "../Images/food2.webp";
import { useNavigate } from "react-router-dom";
import { MdOutlineRestaurant } from "react-icons/md";
import { FaGlassCheers } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import Loader from "../components/Loader";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {

  // Reusable Animation Variants
  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 80,
    },

    show: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const fadeLeft = {
    hidden: {
      opacity: 0,
      x: -100,
    },

    show: {
      opacity: 1,
      x: 0,

      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };
const navigate = useNavigate();
  const fadeRight = {
    hidden: {
      opacity: 0,
      x: 100,
    },

    show: {
      opacity: 1,
      x: 0,

      transition: {
        duration: 0.9,
        ease: "easeOut",
      },
    },
  };

  const zoomIn = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },

    show: {
      opacity: 1,
      scale: 1,

      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  const staggerContainer = {
    hidden: {},

    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (

    <div className="w-full overflow-hidden">

      {/* HERO SECTION */}
      <section
        id="home"
        style={{ scrollMarginTop: "120px" }}
        className="w-full min-h-[90vh] bg-[#fff8f5] flex flex-col lg:flex-row items-center justify-center px-6 md:px-14 py-10 gap-10"
      >

        {/* LEFT IMAGE */}
        <motion.div

          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}

          className="w-full lg:w-1/2 flex justify-center"
        >

          <motion.img

            whileHover={{
              scale: 1.03,
            }}

            transition={{
              duration: 0.3,
            }}

            src={cateringImage}
            alt="Catering"

            className="w-full max-w-[520px] rounded-3xl shadow-2xl object-cover"

          />

        </motion.div>

        {/* RIGHT CONTENT */}
        <motion.div

          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}

          className="w-full lg:w-1/2 flex flex-col justify-center"
        >

          <motion.h1

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

            className="text-4xl md:text-6xl font-bold text-[#962a27] leading-tight mb-6"
          >

            Delicious Catering <br />
            For Every Occasion

          </motion.h1>

          <motion.p

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
              duration: 0.8,
            }}

            viewport={{ once: true }}

            className="text-gray-700 text-lg leading-8 mb-8"
          >

            We provide premium catering services for weddings,
            birthdays, corporate events, family functions,
            and special celebrations with unforgettable taste
            and exceptional hospitality.

          </motion.p>

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
              delay: 0.4,
              duration: 0.8,
            }}

            viewport={{ once: true }}

            className="flex flex-wrap gap-5"
          >

            <motion.button
  whileHover={{
    scale: 1.08,
  }}
  whileTap={{
    scale: 0.95,
  }}
  onClick={() => navigate("/booking")}
  className="bg-[#962a27] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg"
>
  Book Now
</motion.button>

            <motion.button

              whileHover={{
                scale: 1.08,
              }}

              whileTap={{
                scale: 0.95,
              }}
onClick={() => navigate("/menu")}
              className="border-2 border-[#962a27] text-[#962a27] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#962a27] hover:text-white duration-300"

            >
              Explore Menu
            </motion.button>

          </motion.div>

        </motion.div>

      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="w-full bg-[#f5f5f5] py-16 px-4 sm:px-6 md:px-14 scroll-mt-24 overflow-hidden"
      >

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-14">

          {/* IMAGES */}
          <motion.div

            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}

            className="w-full lg:w-1/2 relative flex justify-center gap-3 order-1 lg:order-2"
          >

            <motion.img

              whileHover={{
                scale: 1.04,
              }}

              transition={{
                duration: 0.3,
              }}

              src={food2}
              alt="Food"

              className="w-[130px] sm:w-[170px] md:w-[180px]
              h-[280px] sm:h-[380px] md:h-[420px]
              object-cover rounded-[25px] shadow-2xl"

            />

            <div className="relative">

              <motion.img

                whileHover={{
                  scale: 1.04,
                }}

                transition={{
                  duration: 0.3,
                }}

                src={food1}
                alt="Food"

                className="w-[160px] sm:w-[200px] md:w-[220px]
                h-[280px] sm:h-[380px] md:h-[420px]
                object-cover rounded-[25px] mt-6 sm:mt-8 shadow-2xl"

              />

              {/* BADGE */}
              <motion.div

                animate={{
                  rotate: [0, 5, -5, 0],
                }}

                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}

                className="absolute -top-5 sm:-top-8 left-1/2 -translate-x-1/2
                w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-[#962a27]
                border-[5px] sm:border-[7px] border-[#d9a86c]
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

          {/* CONTENT */}
          <motion.div

            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}

            className="w-full lg:w-1/2 order-2 lg:order-1"
          >

            <motion.p

              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}

              className="uppercase tracking-[4px] text-[#962a27] font-semibold mb-4 text-center lg:text-left"
            >

              About Us

            </motion.p>

            <motion.h2

              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              transition={{
                delay: 0.2,
              }}

              viewport={{ once: true }}

              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1b1b1b] leading-tight mb-6 text-center lg:text-left"
            >

              Elevating Your Events
              with Exceptional
              Food.

            </motion.h2>

            <motion.p

              variants={fadeUp}
              initial="hidden"
              whileInView="show"

              transition={{
                delay: 0.4,
              }}

              viewport={{ once: true }}

              className="text-gray-700 text-base sm:text-lg leading-8 mb-10 text-center lg:text-left"
            >

              Lakshmi Catering is the place where food is celebrated
              with unforgettable culinary experiences, premium service,
              and exceptional hospitality for every special occasion.

            </motion.p>

            {/* CARDS */}
            <motion.div

              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}

              className="flex flex-col sm:grid sm:grid-cols-3 gap-4 mb-8 place-items-center"
            >

              {/* CARD */}
              {[
                {
                  icon: <MdOutlineRestaurant />,
                  number: "25",
                  text: "Years of Experience",
                },

                {
                  icon: <FaGlassCheers />,
                  number: "2000+",
                  text: "Successful Events",
                },

                {
                  icon: <HiOutlineUsers />,
                  number: "98%",
                  text: "Happy Customers",
                },

              ].map((item, index) => (

                <motion.div

                  key={index}

                  variants={zoomIn}

                  whileHover={{
                    y: -10,
                    scale: 1.03,
                    boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                  }}

                  className="group bg-white
                  w-[220px] sm:w-full
                  p-4 sm:p-5 rounded-2xl
                  border border-[#f1e4d8]
                  hover:border-[#d9a86c]
                  transition-all duration-300
                  cursor-pointer"

                >

                  <motion.div

                    whileHover={{
                      rotate: 10,
                      scale: 1.1,
                    }}

                    transition={{
                      type: "spring",
                      stiffness: 400,
                    }}

                    className="w-12 h-12 sm:w-14 sm:h-14
                    rounded-xl bg-[#fff4ec]
                    flex items-center justify-center
                    text-[#d9a86c]
                    text-2xl sm:text-3xl
                    mb-4 border border-[#f7d8b2]"

                  >

                    {item.icon}

                  </motion.div>

                  <h3 className="text-2xl sm:text-3xl font-bold mb-1 text-[#1b1b1b]">
                    {item.number}
                  </h3>

                  <p className="text-gray-600 text-sm sm:text-base font-medium leading-6">
                    {item.text}
                  </p>

                </motion.div>

              ))}

            </motion.div>

            {/* BUTTON */}
            <motion.button

              initial={{
                opacity: 0,
                y: 50,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.7,
              }}

              viewport={{ once: true }}

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

     {/* SERVICES SECTION */}
<section
  id="services"
  className="w-full py-16 md:py-20 bg-[#fff8f5] overflow-hidden"
>

  <div className="max-w-7xl mx-auto px-4 md:px-10">

    {/* HEADING */}
    <motion.div

      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}

      className="text-center mb-10 md:mb-14"
    >

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#962a27]">
        Our Services
      </h2>

      <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-7 text-sm md:text-base px-2">
        Exceptional catering experiences crafted for weddings,
        celebrations, traditional ceremonies, and corporate events.
      </p>

    </motion.div>

    {/* SERVICES DATA */}
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

          {/* MARQUEE WRAPPER */}
          <div className="relative w-full overflow-hidden">

            {/* MARQUEE TRACK */}
            <motion.div

              initial={{
                opacity: 0,
                y: 100,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 1,
              }}

              viewport={{ once: true }}

              className="marquee-track"

            >

              {[...services, ...services].map((service, index) => (

                <motion.div

                  key={index}

                  whileHover={{
                    y: -10,
                    scale: 1.02,
                  }}

                  transition={{
                    duration: 0.3,
                  }}

                  className="service-card bg-white rounded-3xl overflow-hidden shadow-xl group"

                >

                  {/* IMAGE */}
                  <div className="overflow-hidden">

                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"

                      className="w-full h-[190px] md:h-[210px]
                      object-cover group-hover:scale-110 duration-700"

                    />

                  </div>

                  {/* CONTENT */}
                  <div className="p-5">

                    <h3 className="text-lg md:text-xl font-bold text-[#7c2d12]">
                      {service.title}
                    </h3>

                    <p className="text-gray-500 mt-3 text-sm leading-6">
                      {service.desc}
                    </p>

                    <Link to="/services">

                      <motion.button

                        whileHover={{
                          scale: 1.05,
                        }}

                        whileTap={{
                          scale: 0.95,
                        }}

                        className="mt-5 bg-[#962a27]
                        hover:bg-[#7d201d]
                        text-white px-5 py-2 rounded-full
                        text-sm font-medium duration-300"

                      >

                        Explore

                      </motion.button>

                    </Link>

                  </div>

                </motion.div>

              ))}

            </motion.div>

          </div>

          {/* BOTTOM BUTTON */}
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

            className="flex justify-center mt-12"

          >

            <Link to="/services">

              <motion.button

                whileHover={{
                  scale: 1.08,
                }}

                whileTap={{
                  scale: 0.95,
                }}

                className="bg-[#962a27]
                hover:bg-[#7d201d]
                text-white px-8 py-3 rounded-full
                text-base font-semibold shadow-lg"

              >

                View All Services

              </motion.button>

            </Link>

          </motion.div>

        </>

      );

    })()}

  </div>

</section>

    </div>

  );
}

export default Home;