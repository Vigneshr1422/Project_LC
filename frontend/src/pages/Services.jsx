import { useState } from "react";
import Wedding from "../Images/Wedding.webp";
import temple from "../Images/temple.webp";
import Wedding1 from "../Images/Wedding1.webp";

import Seemantham from "../Images/Seemantham.webp";
import Reception from "../Images/Reception.webp";
import Mehanthi from "../Images/Mehanthi.webp";

import teamlunch from "../Images/teamlunch.webp";

import House from "../Images/House.webp";
function Services() {

  const serviceData = [
    {
      title: "Traditional Events",

      mainImage:
       Wedding,

      events: [
        {
          name: "60th Wedding",
          image:
            "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "70th Wedding",
          image:
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Temple Functions",
          image:
           temple,
        },

        {
          name: "Seemantham",
          image:
           Seemantham,
        },
      ],
    },

    {
      title: "Wedding Events",

      mainImage:
        Wedding1,

      events: [
        {
          name: "Wedding",
          image:Wedding1,
        },

        {
          name: "Reception",
          image:
            Reception,
        },

        {
          name: "Engagement",
          image:
            "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Mehndi",
          image:
            Mehanthi,
        },
      ],
    },

    {
      title: "Celebrations",

      mainImage:
        "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1200&auto=format&fit=crop",

      events: [
        {
          name: "Birthday Party",
          image:
            "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "House Warming",
          image:
            House,
        },

        {
          name: "Outdoor Catering",
          image:
            "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1200&auto=format&fit=crop",
        },
      ],
    },

    {
      title: "Professional Events",

      mainImage:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop",

      events: [
        {
          name: "Corporate Events",
          image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
        },

        {
          name: "Office Lunch",
          image:
            teamlunch,
        },

        {
          name: "Retirement Function",
          image:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
        },
      ],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(serviceData[0]);

  const [selectedImage, setSelectedImage] = useState(
    serviceData[0].mainImage
  );

  return (

    <div className="bg-[#fffaf5] pt-[70px] px-4 md:px-16 pb-20 min-h-screen">

      {/* Heading */}
      <div className="text-center mb-1">

        <h1 className="text-4xl md:text-5xl font-bold text-[#7c2d12]">
          Our Services
        </h1>

        <p className="text-gray-500 mt-4 max-w-3xl mx-auto leading-8">
          Premium catering experiences crafted for weddings,
          celebrations, traditional ceremonies, and professional events.
        </p>

      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8">

        {/* LEFT SIDE */}
        <div className="lg:sticky lg:top-28 h-fit">

          <div className="bg-white rounded-[28px] overflow-hidden border border-[#f1e4d7] shadow-lg">

            {/* Main Image */}
            <img
              src={selectedImage}
              alt="service"
              className="w-full h-[250px] md:h-[420px] object-cover duration-500"
            />

            {/* Content */}
            <div className="p-6">

              <h2 className="text-2xl md:text-3xl font-bold text-[#7c2d12]">
                {selectedCategory.title}
              </h2>

              <p className="text-gray-500 mt-4 leading-8 text-sm md:text-base">
                Exceptional catering experiences with authentic taste,
                elegant presentation, and memorable hospitality for
                every special occasion.
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5">

          {serviceData.map((category, index) => (

            <div
              key={index}
              className="bg-white rounded-[24px] border border-[#f1e4d7] shadow-sm overflow-hidden"
            >

              {/* Category Header */}
              <div
                onClick={() => {
                  setSelectedCategory(category);
                  setSelectedImage(category.mainImage);
                }}
                className="p-5 cursor-pointer hover:bg-[#fff3ea] duration-300"
              >

                <h2 className="text-xl md:text-2xl font-bold text-[#7c2d12]">
                  {category.title}
                </h2>

                <p className="text-gray-500 mt-2 text-sm">
                  Explore premium catering services
                </p>

              </div>

              {/* Events */}
              {selectedCategory.title === category.title && (

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 pt-0">

                  {category.events.map((event, i) => (

                    <div
                      key={i}
                      onMouseEnter={() => setSelectedImage(event.image)}
                      onClick={() => setSelectedImage(event.image)}
                      className="bg-[#fffaf5] rounded-2xl overflow-hidden border border-[#f3e2d3] cursor-pointer hover:shadow-md hover:-translate-y-1 duration-300"
                    >

                      {/* Event Image */}
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-[110px] object-cover"
                      />

                      {/* Event Name */}
                      <div className="p-4">

                        <h3 className="text-base md:text-lg font-semibold text-[#7c2d12]">
                          {event.name}
                        </h3>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Services;