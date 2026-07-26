import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Image Assets
import cateringImage from "../Images/image4.webp";
import food1 from "../Images/food1.webp";
import food2 from "../Images/food2.webp";

// Components Import
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import WhyTrustUsSection from "../components/WhyTrustUsSection";
import ServicesSection from "../components/ServicesSection";
import MenuHome from "../components/MenuHome";
import Testimonials from "./Testimonials";
import Contact from "./Contact";

function Home() {
  const navigate = useNavigate();

  // 🚀 REFINED SMOOTH ANIMATION VARIANTS
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } 
    }
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } 
    }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    show: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } 
    }
  };

  const zoomIn = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      className="w-full overflow-hidden bg-[#fffaf7]"
    >
      {/* 1. HERO MODULE */}
      <HeroSection 
        cateringImage={cateringImage} 
        fadeLeft={fadeLeft} 
        fadeRight={fadeRight} 
        navigate={navigate} 
      />

      {/* 2. ABOUT MODULE */}
      <AboutSection 
        food1={food1} 
        food2={food2} 
        fadeLeft={fadeLeft} 
        fadeRight={fadeRight} 
        fadeUp={fadeUp} 
        zoomIn={zoomIn} 
        staggerContainer={staggerContainer} 
        navigate={navigate}
      />

      {/* 3. WHY TRUST US SECTION */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <WhyTrustUsSection fadeUp={fadeUp} />
      </motion.div>

      {/* 4. SERVICES MODULE */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <ServicesSection fadeUp={fadeUp} navigate={navigate} />
      </motion.div>

      {/* 5. MENU HIGHLIGHTS MODULE */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <MenuHome fadeUp={fadeUp} navigate={navigate} />
      </motion.div>

      {/* 6. TESTIMONIALS MODULE */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Testimonials fadeUp={fadeUp} />
      </motion.div>

      {/* 7. CONTACT MODULE */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Contact fadeUp={fadeUp} />
      </motion.div>
    </motion.div>
  );
}

export default Home;