import { useState } from "react";
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
} from "react-icons/fa";


function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setLoading(false);
  };

  return (
    <section className="bg-[#fffaf7] text-[#2b1b17] min-h-screen overflow-hidden">
      
      {/* HERO BANNER SECTION */}
      <div className="relative h-[320px] sm:h-[380px] md:h-[420px] flex items-center justify-center text-center px-6">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
          alt="contact-banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#962a27]/90 text-white font-semibold text-xs uppercase tracking-widest mb-4 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Connect With Us
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Get In Touch
          </h1>
          <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Whether it's a wedding, birthday, corporate event, or family function, we are here to provide an authentic & memorable catering experience.
          </p>
        </motion.div>
      </div>

      {/* MAIN CONTACT PANEL */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20 -mt-12 sm:-mt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 bg-white"
        >
          {/* Left Panel: Contact Information */}
          <div className="bg-[#962a27] p-8 sm:p-10 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-8 pb-4 border-b border-white/15">
                Contact Information
              </h2>

              <div className="space-y-6">
                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-xl shrink-0 text-[#fce8d5]">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">Location</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      H-10, Aishwarya Avenue, Thanavayal, <br /> Karaikudi - 630001
                    </p>
                  </div>
                </div>

                {/* Call Us */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-xl shrink-0 text-[#fce8d5]">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">Call Us</h3>
                    <div className="space-y-1 text-gray-200 text-sm font-medium">
                      <a href="tel:+919600630051" className="block hover:text-white transition-colors">
                        +91 96006 30051
                      </a>
                      <a href="tel:+919123578042" className="block hover:text-white transition-colors">
                        +91 91235 78042
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-xl shrink-0 text-[#fce8d5]">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1">Email Us</h3>
                    <a href="mailto:lakshmicatering@gmail.com" className="text-gray-200 hover:text-white text-sm font-medium transition-colors break-all">
                      lakshmicatering@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Panel */}
            <div className="mt-10 pt-8 border-t border-white/15 flex flex-col items-center sm:items-start gap-4">
              <a
                href="https://wa.me/919600630051"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] py-3.5 rounded-xl text-white font-bold text-sm shadow-md transition-all"
              >
                <FaWhatsapp className="text-lg" />
                Chat on WhatsApp
              </a>

              <div className="flex items-center justify-center gap-3 w-full pt-2">
                {[
                  { icon: <FaFacebookF />, link: "https://facebook.com" },
                  { icon: <FaInstagram />, link: "https://instagram.com" },
                  { icon: <FaYoutube />, link: "https://youtube.com" },
                  { icon: <FaLinkedinIn />, link: "#" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-[#962a27] transition-all text-sm"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel: Form */}
          <div className="p-8 sm:p-10 md:p-12 bg-white flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2b1b17] mb-2">
              Send Us A Message
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Fill out the form below and we will get back to you promptly to discuss your catering requirements.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#962a27] focus:ring-1 focus:ring-[#962a27] bg-[#fffaf7] transition-all"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#962a27] focus:ring-1 focus:ring-[#962a27] bg-[#fffaf7] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  required
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#962a27] focus:ring-1 focus:ring-[#962a27] bg-[#fffaf7] transition-all"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#962a27] focus:ring-1 focus:ring-[#962a27] bg-[#fffaf7] transition-all"
                />
              </div>

              <textarea
                rows="4"
                placeholder="Type your message or query here..."
                required
                className="w-full rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-[#962a27] focus:ring-1 focus:ring-[#962a27] bg-[#fffaf7] resize-none transition-all"
              />

              <button
                disabled={loading}
                type="submit"
                className="w-full sm:w-auto px-8 h-12 rounded-xl bg-[#962a27] hover:bg-[#7a2220] disabled:bg-[#b86b69] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>

    {/* MAP SECTION */}
{/* MAP SECTION */}
<section className="pb-20 px-6 md:px-12">
  <div className="max-w-7xl mx-auto">
    
    {/* Header */}
    <div className="text-center mb-10">
      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#962a27]/10 text-[#962a27] font-semibold text-xs uppercase tracking-widest mb-3 border border-[#962a27]/20">
        <span className="w-2 h-2 rounded-full bg-[#962a27]" />
        Our Location
      </span>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2b1b17]">
        Visit Our Catering Hub
      </h2>
      <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mt-2 leading-relaxed">
        Visit our main catering hub in Karaikudi for direct event discussions, bookings, and menu planning.
      </p>
    </div>

    {/* Clean Split Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      {/* LEFT: Clean Info Box (4 Cols) */}
      <div className="lg:col-span-4 bg-white rounded-3xl p-8 border border-gray-200/80 shadow-sm flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 rounded-2xl bg-[#962a27]/10 text-[#962a27] flex items-center justify-center text-xl mb-6">
            <FaMapMarkerAlt />
          </div>

          <h3 className="text-2xl font-extrabold text-[#2b1b17] mb-2">
            Karaikudi Branch
          </h3>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            H-10, Aishwarya Avenue, Thanavayal, <br />
            Karaikudi, Tamil Nadu - 630001
          </p>

          <div className="space-y-3 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="font-bold text-[#2b1b17]">Timing:</span> Mon - Sun (9:00 AM - 9:00 PM)
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="font-bold text-[#2b1b17]">Phone:</span> +91 96006 30051
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-8">
          <a
            href="https://maps.google.com/?q=Lakshmi+Catering+Karaikudi"
            target="_blank"
            rel="noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#962a27] text-white py-3.5 px-5 rounded-xl font-bold text-sm shadow-md shadow-[#962a27]/20 hover:bg-[#7a2220] transition-all"
          >
            <span>Open in Google Maps</span>
            <span>→</span>
          </a>

          <a
            href="tel:+919600630051"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#fffaf7] border border-gray-200 hover:border-[#962a27] text-[#2b1b17] py-3.5 px-5 rounded-xl font-bold text-sm transition-all"
          >
            <FaPhoneAlt className="text-xs text-[#962a27]" />
            <span>Call For Directions</span>
          </a>
        </div>
      </div>

      {/* RIGHT: Pure Map Display (8 Cols) */}
      <div className="lg:col-span-8 h-[400px] lg:h-auto min-h-[380px] rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm bg-gray-50">
        <iframe
          title="Lakshmi Catering Karaikudi Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.0976854856863!2d78.7844734!3d10.008789499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b005d8f2ca203c3%3A0xc828bdbdf259ec89!2sLakshmi%20Catering%20Karaikudi!5e0!3m2!1sen!2sin!4v1779617861112!5m2!1sen!2sin"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        />
      </div>

    </div>

  </div>
</section>

    </section>
  );
}

export default Contact;