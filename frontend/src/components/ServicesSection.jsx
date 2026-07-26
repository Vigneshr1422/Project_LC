import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ServicesSection({ fadeUp }) {
  const services = [
    {
      title: "Wedding Catering",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
      desc: "Elegant catering experiences for unforgettable wedding celebrations.",
    },
    {
      title: "Birthday Parties",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop",
      desc: "Delicious menus and joyful catering for birthday celebrations.",
    },
    {
      title: "Corporate Events",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",
      desc: "Professional catering solutions for corporate gatherings.",
    },
    {
      title: "House Warming",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop",
      desc: "Traditional and modern catering for housewarming ceremonies.",
    },
  ];

  return (
    <section id="services" className="w-full py-16 md:py-20 bg-[#fff8f5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {/* HEADING */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#962a27]"> Our Services </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto leading-7 text-sm md:text-base px-2">
            Exceptional catering experiences crafted for weddings, celebrations, traditional ceremonies, and corporate events.
          </p>
        </motion.div>

        {/* MARQUEE WRAPPER */}
        <div className="relative w-full overflow-hidden">
          {/* MARQUEE TRACK */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="marquee-track"
          >
            {[...services, ...services].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="service-card bg-white rounded-3xl overflow-hidden shadow-xl group"
              >
                {/* IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-[190px] md:h-[210px] object-cover group-hover:scale-110 duration-700"
                  />
                </div>
                {/* CONTENT */}
                <div className="p-5">
                  <h3 className="text-lg md:text-xl font-bold text-[#7c2d12]"> {service.title} </h3>
                  <p className="text-gray-500 mt-3 text-sm leading-6"> {service.desc} </p>
                  <Link to="/services">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-5 bg-[#962a27] hover:bg-[#7d201d] text-white px-5 py-2 rounded-full text-sm font-medium duration-300"
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
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="flex justify-center mt-12">
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#962a27] hover:bg-[#7d201d] text-white px-8 py-3 rounded-full text-base font-semibold shadow-lg"
            >
              View All Services
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export default ServicesSection;