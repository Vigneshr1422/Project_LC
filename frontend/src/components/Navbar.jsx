import { useState, useEffect } from "react";
import { FaConciergeBell } from "react-icons/fa";
import { HiMiniUserCircle } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "../Images/Logo.webp";

function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);

const [showNavbar, setShowNavbar] =
  useState(true);

useEffect(() => {

  let lastScrollY =
    window.scrollY;

  const handleScroll = () => {

    if (
      window.scrollY > 100
    ) {

      if (
        window.scrollY >
        lastScrollY
      ) {

        setShowNavbar(false);

      } else {

        setShowNavbar(true);

      }

    } else {

      setShowNavbar(true);

    }

    lastScrollY =
      window.scrollY;

  };

  window.addEventListener(
    "scroll",
    handleScroll
  );

  return () =>
    window.removeEventListener(
      "scroll",
      handleScroll
    );

}, []);
  const navLinkStyle =
    "relative hover:text-[#962a27] duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#962a27] after:duration-300 hover:after:w-full";

  return (
<nav
  className={`
    w-full
    bg-white
    shadow-md
    fixed
    top-0
    left-0
    z-50
    transition-all
    duration-500
    ${
      showNavbar
        ? "translate-y-0 opacity-100"
        : "-translate-y-full opacity-0"
    }
  `}
>
      <div className="w-full px-6 md:px-14 py-4 flex items-center justify-between">

        {/* Logo */}
       <Link to="/" className="flex items-center">

  <img
    src={logo}
    alt="logo"
    className="
    w-28 md:w-32
    h-20
    object-contain
    cursor-pointer
    "
  />

</Link>
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10 text-[17px] font-medium text-black">

          <a href="/" className={navLinkStyle}>
            Home
          </a>

          <a href="/#about" className={navLinkStyle}>
            About
          </a>

          {/* SERVICES PAGE */}
          <Link to="/services" className={navLinkStyle}>
            Services
          </Link>

          <a href="/menu" className={navLinkStyle}>
            Menu
          </a>

         

          <a href="/contact" className={navLinkStyle}>
            Contact
          </a>

          

          {/* Book Now Button */}
          <Link
  to="/booking"
  onClick={() => setMenuOpen(false)}
  className="
    relative
    overflow-hidden
    bg-[#962a27]
    text-white
    px-6
    py-3
    rounded-full
    font-medium
    group
    transition-all
    duration-300
    hover:scale-105
    inline-flex
    items-center
    justify-center
  "
>

  {/* Shine Effect */}
  <span
    className="
      absolute
      top-0
      left-[-120%]
      w-full
      h-full
      bg-white/30
      skew-x-12
      group-hover:left-[120%]
      transition-all
      duration-700
    "
  ></span>

  {/* Animated Text */}
  <span className="relative z-10 flex gap-[1px]">

    {"Book Now".split("").map((letter, index) => (

      <span
        key={index}
        className="
          inline-block
          transition-transform
          duration-300
          group-hover:-translate-y-1
        "
        style={{
          transitionDelay: `${index * 50}ms`,
        }}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>

    ))}

  </span>

</Link>


<Link
  to="/admin"
  className="
    text-[#962a27]
    text-[38px]
    transition-all
    duration-300
    hover:scale-110
    hover:text-[#c94b47]
    flex
    items-center
  "
>
  <HiMiniUserCircle />
</Link>
        </div>

        {/* Mobile Menu Icon */}
        <div
          className="lg:hidden text-4xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >

          {menuOpen ? (
            <HiX className="text-[#962a27] hover:scale-110 duration-300" />
          ) : (
            <FaConciergeBell className="text-[#962a27] hover:scale-110 duration-300" />
          )}

        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (

        <div className="lg:hidden absolute top-[100px] right-6 w-[220px] bg-white rounded-3xl shadow-2xl border border-[#f1e4d8] py-6 px-5 flex flex-col gap-5 z-50 animate-[fadeIn_.3s_ease]">

          <a
            href="/"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </a>

          <a
            href="/#about"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>

          {/* SERVICES PAGE */}
          <Link
            to="/services"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Services
          </Link>

          <a
            href="/menu"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Menu
          </a>

         

          <a
            href="/contact"
            className={navLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </a>
        

                         <Link
                  to="/admin"

                  onClick={() =>
                    setMenuOpen(false)
                  }

                  className="
                    text-[#962a27]
                    text-[38px]
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:text-[#c94b47]
                    flex
                    items-center
                  "
                >

                  <HiMiniUserCircle />

                </Link>


        {/* Button */}
<Link
  to="/booking"
  onClick={() => setMenuOpen(false)}
  className="
    bg-[#962a27]
    text-white
    text-sm
    px-5
    py-2.5
    rounded-full
    mt-2
    hover:scale-105
    duration-300
    self-start
  "
>
  Book Now
</Link>

   

        </div>

      )}

    </nav>
  );
}

export default Navbar;