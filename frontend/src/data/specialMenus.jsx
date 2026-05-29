import { useState } from "react";
import biryaniImg from "../Images/pulao.webp";
import Payasam from "../Images/payasam.webp";
import Noodles from "../Images/Noodels.webp";
import Paan from "../Images/paan.webp";
import Icecream from "../Images/Icecream.webp";
import Roti from "../Images/Roti.webp";
import fish from "../Images/fish.webp";
import Egg from "../Images/egg.webp";

import grab from "../Images/grab.webp";
import Soup from "../Images/soup.webp";
import snacks from "../Images/snakcs.webp";
import Sweets from "../Images/Sweets.webp";

import chettinad from "../Images/chettinad.webp";

const specialMenus = [

 {
  title: {
    en: "Noodles Varieties",
    ta: "நூடுல்ஸ் வகைகள்",
  },

  image: Noodles,

  items: [

    {
      en: "Chicken Noodles",
      ta: "சிக்கன் நூடுல்ஸ்",
      price: 120,
    },

    {
      en: "Mutton Noodles",
      ta: "மட்டன் நூடுல்ஸ்",
      price: 180,
    },

    {
      en: "Chinese Noodles",
      ta: "சைனீஸ் நூடுல்ஸ்",
      price: 140,
    },

    {
      en: "Egg Chicken Noodles",
      ta: "எக் சிக்கன் நூடுல்ஸ்",
      price: 160,
    },

    {
      en: "Egg Noodles",
      ta: "எக் நூடுல்ஸ்",
      price: 100,
    },

    {
      en: "Dry Noodles",
      ta: "ட்ரை நூடுல்ஸ்",
      price: 130,
    },

    {
      en: "Prawn Noodles",
      ta: "இறால் நூடுல்ஸ்",
      price: 220,
    },

    {
      en: "Chinese Hot Noodles",
      ta: "சைனீஸ் ஹாட் நூடுல்ஸ்",
      price: 170,
    },

  ],
},


{
  title: {
    en: "Beeda Varieties",
    ta: "பீடா வகைகள்",
  },

  image: Paan,

  items: [

    {
      en: "Beeda",
      ta: "பீடா",
      price: 15,
    },

    {
      en: "Sweet Beeda",
      ta: "ஸ்வீட் பீடா",
      price: 25,
    },

    {
      en: "Kolkata Beeda",
      ta: "கல்கத்தா பீடா",
      price: 40,
    },

    {
      en: "Special Nuts Beeda",
      ta: "ஸ்பெஷல் நட்ஸ் பீடா",
      price: 60,
    },

    {
      en: "Betel Leaf, Areca Nut & Lime",
      ta: "வெற்றிலை, பாக்கு, சுண்ணாம்பு",
      price: 10,
    },

  ],
},

{
  title: {
    en: "Ice Cream Varieties",
    ta: "ஐஸ்கிரீம் வகைகள்",
  },

  image: Icecream,

  items: [

    {
      en: "Vanilla Ice Cream",
      ta: "வெண்ணிலா ஐஸ்கிரீம்",
      price: 40,
    },

    {
      en: "Strawberry Ice Cream",
      ta: "ஸ்ட்ராபெரி ஐஸ்கிரீம்",
      price: 50,
    },

    {
      en: "Kulfi Ice Cream",
      ta: "குல்பி ஐஸ்கிரீம்",
      price: 70,
    },

    {
      en: "Cone Ice Cream",
      ta: "கோன் ஐஸ்கிரீம்",
      price: 45,
    },

    {
      en: "Butter Scotch Ice Cream",
      ta: "பட்டர் ஸ்காட்ச் ஐஸ்கிரீம்",
      price: 65,
    },

    {
      en: "Pista Ice Cream",
      ta: "பிஸ்தா ஐஸ்கிரீம்",
      price: 75,
    },

    {
      en: "Cassata Ice Cream",
      ta: "கசாட்டா ஐஸ்கிரீம்",
      price: 80,
    },

    {
      en: "Chocolate Ice Cream",
      ta: "சாக்லேட் ஐஸ்கிரீம்",
      price: 60,
    },

  ],
},

{
  title: {
    en: "Fry Varieties",
    ta: "ஃப்ரை வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Chicken Fry",
      ta: "சிக்கன் ஃப்ரை",
      price: 180,
    },

    {
      en: "Chicken 65",
      ta: "சிக்கன் 65",
      price: 220,
    },

    {
      en: "Butter Chicken Masala",
      ta: "பட்டர் சிக்கன் மசாலா",
      price: 260,
    },

    {
      en: "Grill Chicken",
      ta: "கிரில் சிக்கன்",
      price: 350,
    },

    {
      en: "Green Chicken",
      ta: "கிரீன் சிக்கன்",
      price: 240,
    },

    {
      en: "Ginger Chicken",
      ta: "ஜிஞ்சர் சிக்கன்",
      price: 230,
    },

    {
      en: "Chicken Tandoori",
      ta: "சிக்கன் தந்தூரி",
      price: 320,
    },

    {
      en: "Pepper Chicken",
      ta: "பெப்பர் சிக்கன்",
      price: 250,
    },

    {
      en: "Chicken Sukka",
      ta: "சிக்கன் சுக்கா",
      price: 260,
    },

    {
      en: "Chicken Sukka Fry",
      ta: "சிக்கன் சுக்கா ஃப்ரை",
      price: 280,
    },

    {
      en: "Lemon Chicken",
      ta: "லெமன் சிக்கன்",
      price: 230,
    },

    {
      en: "Soya Chicken",
      ta: "சோயா சிக்கன்",
      price: 240,
    },

    {
      en: "Quail 65",
      ta: "காடை 65",
      price: 300,
    },

    {
      en: "Quail Fry",
      ta: "காடை ஃப்ரை",
      price: 320,
    },

    {
      en: "Ginger Fish",
      ta: "ஜிஞ்சர் ஃபிஷ்",
      price: 280,
    },

    {
      en: "Chilli Fish",
      ta: "சில்லி ஃபிஷ்",
      price: 290,
    },

    {
      en: "Prawn Manchurian",
      ta: "பிரான் மஞ்சூரியன்",
      price: 350,
    },

    {
      en: "Ginger Garlic Prawn",
      ta: "ஜிஞ்சர் கார்லிக் பிரான்",
      price: 370,
    },

    {
      en: "Egg Manchurian",
      ta: "எக் மஞ்சூரியன்",
      price: 180,
    },

    {
      en: "Egg Spring Roll",
      ta: "எக் ஸ்ப்ரிங் ரோல்",
      price: 160,
    },

    {
      en: "Chicken Manchurian",
      ta: "சிக்கன் மஞ்சூரியன்",
      price: 260,
    },

    {
      en: "Chicken Spring Roll",
      ta: "சிக்கன் ஸ்பிரிங் ரோல்",
      price: 240,
    },

    {
      en: "Chicken Lollipop",
      ta: "சிக்கன் லாலிபாப்",
      price: 280,
    },

    {
      en: "Hong Kong Chicken",
      ta: "ஹாங்காங் சிக்கன்",
      price: 300,
    },

  ],
},
{
  title: {
    en: "Roti Varieties",
    ta: "ரோட்டி வகைகள்",
  },

  image: Roti,

  items: [

    {
      en: "Naan",
      ta: "நான்",
      price: 35,
    },

    {
      en: "Butter Naan",
      ta: "பட்டர் நான்",
      price: 50,
    },

    {
      en: "Parotta",
      ta: "பரோட்டா",
      price: 20,
    },

    {
      en: "Chicken Parotta",
      ta: "சிக்கன் பரோட்டா",
      price: 120,
    },

    {
      en: "Egg Parotta",
      ta: "முட்டை பரோட்டா",
      price: 60,
    },

    {
      en: "Veechu Parotta",
      ta: "வீச் பரோட்டா",
      price: 30,
    },

    {
      en: "Egg Veechu Parotta",
      ta: "முட்டை வீச் பரோட்டா",
      price: 70,
    },

    {
      en: "Lappa Parotta",
      ta: "லாப்பா பரோட்டா",
      price: 40,
    },

    {
      en: "Egg Lappa Parotta",
      ta: "முட்டை லாப்பா பரோட்டா",
      price: 80,
    },

    {
      en: "Chicken Lappa Parotta",
      ta: "சிக்கன் லாப்பா பரோட்டா",
      price: 140,
    },

    {
      en: "Chilli Parotta",
      ta: "சில்லி பரோட்டா",
      price: 110,
    },

    {
      en: "Bun Parotta",
      ta: "பன் பரோட்டா",
      price: 35,
    },

    {
      en: "Nool Parotta",
      ta: "நூல் பரோட்டா",
      price: 45,
    },

    {
      en: "Chicken Kothu Parotta",
      ta: "சிக்கன் கொத்து பரோட்டா",
      price: 160,
    },

  ],
},

{
  title: {
    en: "Quail Varieties",
    ta: "காடை வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Quail Curry",
      ta: "காடை குழம்பு",
      price: 280,
    },

    {
      en: "Quail Gravy",
      ta: "காடை கிரேவி",
      price: 260,
    },

    {
      en: "Quail Pepper Masala",
      ta: "காடை பெப்பர் மசாலா",
      price: 320,
    },

    {
      en: "Quail Fry",
      ta: "காடை வறுவல்",
      price: 340,
    },

    {
      en: "Quail Roast",
      ta: "காடை ரோஸ்ட்",
      price: 360,
    },

  ],
},

{
  title: {
    en: "Prawn Varieties",
    ta: "இறால் வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Prawn Curry",
      ta: "இறால் குழம்பு",
      price: 320,
    },

    {
      en: "Prawn Tamarind Curry",
      ta: "இறால் புளி குழம்பு",
      price: 340,
    },

    {
      en: "Prawn Gravy",
      ta: "இறால் கிரேவி",
      price: 300,
    },

    {
      en: "Prawn Masala Curry",
      ta: "இறால் மசாலா கறி",
      price: 360,
    },

    {
      en: "Prawn Thokku",
      ta: "இறால் தொக்கு",
      price: 350,
    },

    {
      en: "Prawn Coconut Roast",
      ta: "இறால் தேங்காய் பிரட்டல்",
      price: 380,
    },

    {
      en: "Prawn Podimas",
      ta: "இறால் பொடிமாஸ்",
      price: 330,
    },

    {
      en: "Butter Prawn Egg Masala",
      ta: "பட்டர் இறால் முட்டை மசாலா",
      price: 400,
    },

  ],
},

{
  title: {
    en: "Fish Varieties",
    ta: "மீன் வகைகள்",
  },

  image: fish,

  items: [

    {
      en: "Fish Curry",
      ta: "மீன் குழம்பு",
      price: 240,
    },

    {
      en: "Anchovy Fish Curry",
      ta: "நெத்திலி மீன் குழம்பு",
      price: 280,
    },

    {
      en: "Fish Thokku",
      ta: "மீன் தொக்கு",
      price: 260,
    },

    {
      en: "Fish Fry",
      ta: "மீன் வறுவல்",
      price: 320,
    },

    {
      en: "Spicy Tamarind Fish Fry",
      ta: "மீன் புளி வறுவல்",
      price: 340,
    },

    {
      en: "Fish Cutlet",
      ta: "மீன் கட்லெட்",
      price: 180,
    },

    {
      en: "Fish Roast",
      ta: "மீன் ரோஸ்ட்",
      price: 360,
    },

    {
      en: "Fish Puttu Curry",
      ta: "மீன் புட்டுக்கறி",
      price: 290,
    },

    {
      en: "Fish Poriyal",
      ta: "மீன் பொறியல்",
      price: 250,
    },

  ],
},



{
  title: {
    en: "Egg Varieties",
    ta: "முட்டை வகைகள்",
  },

  image: Egg,

  items: [

    {
      en: "Egg Curry",
      ta: "முட்டை குழம்பு",
      price: 120,
    },

    {
      en: "Egg Fry",
      ta: "முட்டை வறுவல்",
      price: 100,
    },

    {
      en: "Egg Masala",
      ta: "முட்டை மசாலா",
      price: 140,
    },

    {
      en: "Cheese Omelette",
      ta: "சீஸ் ஆம்லெட்",
      price: 160,
    },

    {
      en: "Onion Omelette",
      ta: "ஆனியன் ஆம்லெட்",
      price: 110,
    },

    {
      en: "Egg Kalakki",
      ta: "முட்டை கலக்கி",
      price: 90,
    },

    {
      en: "Egg Aviyal",
      ta: "முட்டை அவியல்",
      price: 150,
    },

    {
      en: "Egg Masala Podimas",
      ta: "முட்டை மசாலா பொடிமாஸ்",
      price: 170,
    },

  ],
},

{
  title: {
    en: "Crab Varieties",
    ta: "நண்டு வகைகள்",
  },

  image: grab,

  items: [

    {
      en: "Crab Masala Curry",
      ta: "நண்டு மசாலா குழம்பு",
      price: 380,
    },

    {
      en: "Chettinad Crab Curry",
      ta: "செட்டிநாட்டு நண்டு குழம்பு",
      price: 420,
    },

    {
      en: "Crab Gravy",
      ta: "நண்டு கிரேவி",
      price: 350,
    },

    {
      en: "Coconut Pepper Crab",
      ta: "தேங்காய் மிளகு நண்டு",
      price: 450,
    },

    {
      en: "Crab Fry",
      ta: "நண்டு வறுவல்",
      price: 400,
    },

    {
      en: "Crab Fry Special",
      ta: "நண்டு ஃப்ரை",
      price: 480,
    },

    {
      en: "Crab Rasam",
      ta: "நண்டு ரசம்",
      price: 220,
    },

    {
      en: "Crab Pepper Soup",
      ta: "நண்டு மிளகு சூப்",
      price: 260,
    },

  ],
},


{
  title: {
    en: "Turkey Varieties",
    ta: "வான்கோழி வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Turkey Curry",
      ta: "வான்கோழி குழம்பு",
      price: 320,
    },

    {
      en: "Turkey Gravy",
      ta: "வான்கோழி கிரேவி",
      price: 300,
    },

    {
      en: "Pepper Turkey Fry",
      ta: "மிளகு வான்கோழி வறுவல்",
      price: 380,
    },

    {
      en: "Turkey Chilli",
      ta: "வான்கோழி சில்லி",
      price: 350,
    },

    {
      en: "Turkey Soup",
      ta: "வான்கோழி சூப்",
      price: 180,
    },

  ],
},

{
  title: {
    en: "Biryani Varieties",
    ta: "பிரியாணி வகைகள்",
  },

  image: biryaniImg,

  items: [

    {
      en: "Chettinad Seeraga Samba Chicken Biryani",
      ta: "செட்டிநாட்டு சீரக சம்பா சிக்கன் பிரியாணி",
      price: 220,
    },

    {
      en: "Mutton Biryani",
      ta: "மட்டன் பிரியாணி",
      price: 280,
    },

    {
      en: "Hyderabadi Chicken Biryani",
      ta: "ஹைதராபாத் சிக்கன் பிரியாணி",
      price: 240,
    },

    {
      en: "Hyderabadi Mutton Biryani",
      ta: "ஹைதராபாத் மட்டன் பிரியாணி",
      price: 320,
    },

    {
      en: "Country Chicken Biryani",
      ta: "நாட்டுக்கோழி பிரியாணி",
      price: 300,
    },

    {
      en: "Fish Biryani",
      ta: "மீன் பிரியாணி",
      price: 260,
    },

    {
      en: "Prawn Biryani",
      ta: "இறால் பிரியாணி",
      price: 340,
    },

    {
      en: "Mutton Leg Biryani",
      ta: "ஆட்டுக்கால் பிரியாணி",
      price: 420,
    },

    {
      en: "Turkey Biryani",
      ta: "வான்கோழி பிரியாணி",
      price: 360,
    },

    {
      en: "Quail Biryani",
      ta: "காடை பிரியாணி",
      price: 350,
    },

    {
      en: "Egg Biryani",
      ta: "முட்டை பிரியாணி",
      price: 180,
    },

  ],
},

{
  title: {
    en: "Rice Varieties",
    ta: "ரைஸ் வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Chicken Fried Rice",
      ta: "சிக்கன் ஃப்ரைடு ரைஸ்",
      price: 180,
    },

    {
      en: "Mutton Fried Rice",
      ta: "மட்டன் ஃப்ரைடு ரைஸ்",
      price: 240,
    },

    {
      en: "Prawn Fried Rice",
      ta: "இறால் ஃப்ரைடு ரைஸ்",
      price: 260,
    },

    {
      en: "Mixed Fried Rice",
      ta: "மிக்ஸ்டு ஃப்ரைடு ரைஸ்",
      price: 280,
    },

    {
      en: "Fish Fried Rice",
      ta: "மீன் ஃப்ரைடு ரைஸ்",
      price: 230,
    },

    {
      en: "Schezwan Chicken Rice",
      ta: "செஸ்வான் சிக்கன் ரைஸ்",
      price: 210,
    },

    {
      en: "Schezwan Mutton Rice",
      ta: "செஸ்வான் மட்டன் ரைஸ்",
      price: 270,
    },

    {
      en: "Schezwan Fish Rice",
      ta: "செஸ்வான் ஃபிஷ் ரைஸ்",
      price: 250,
    },

    {
      en: "Schezwan Prawn Rice",
      ta: "செஸ்வான் பிரான் ரைஸ்",
      price: 290,
    },

    {
      en: "Schezwan Egg Rice",
      ta: "செஸ்வான் எக் ரைஸ்",
      price: 160,
    },

    {
      en: "White Rice",
      ta: "ஒயிட் ரைஸ்",
      price: 60,
    },

    {
      en: "Ghee Rice",
      ta: "கீ ரைஸ்",
      price: 140,
    },

  ],
},

{
  title: {
    en: "Soup Varieties",
    ta: "சூப் வகைகள்",
  },

  image: Soup,

  items: [

    {
      en: "Sweet Corn Soup",
      ta: "ஸ்வீட் கார்ன் சூப்",
      price: 90,
    },

    {
      en: "Baby Corn Soup",
      ta: "பேபி கார்ன் சூப்",
      price: 100,
    },

    {
      en: "Tomato Soup",
      ta: "தக்காளி சூப்",
      price: 80,
    },

    {
      en: "Herbal Soup",
      ta: "ஹெர்பல்ஸ் சூப்",
      price: 120,
    },

    {
      en: "Noodles Soup",
      ta: "நூடுல்ஸ் சூப்",
      price: 110,
    },

    {
      en: "Mushroom Soup",
      ta: "மஷ்ரூம் சூப்",
      price: 130,
    },

    {
      en: "Vegetable Clear Soup",
      ta: "வெஜிடபிள் கிளியர் சூப்",
      price: 90,
    },

    {
      en: "Hot Pepper Water Soup",
      ta: "ஹாட் மிளகுதண்ணி சூப்",
      price: 70,
    },

    {
      en: "Lemon Coriander Soup",
      ta: "லெமன் கொரியாண்டர் சூப்",
      price: 100,
    },

  ],
},

{
  title: {
    en: "Payasam Varieties",
    ta: "பாயாசம் வகைகள்",
  },

  image: Payasam,

  items: [

    {
      en: "Milk Payasam",
      ta: "பால் பாயாசம்",
      price: 90,
    },

    {
      en: "Sago Payasam",
      ta: "ஜவ்வரிசி பாயாசம்",
      price: 80,
    },

    {
      en: "Semiya Payasam",
      ta: "சேமியா பாயாசம்",
      price: 85,
    },

    {
      en: "Dal Payasam",
      ta: "பருப்பு பாயாசம்",
      price: 95,
    },

    {
      en: "Tender Coconut Payasam",
      ta: "இளநீர் பாயாசம்",
      price: 140,
    },

    {
      en: "Aval Payasam",
      ta: "அவுல் பாயாசம்",
      price: 90,
    },

    {
      en: "Basmati Payasam",
      ta: "பாசுமதி பாயாசம்",
      price: 120,
    },

    {
      en: "Rava Payasam",
      ta: "ரவை பாயாசம்",
      price: 80,
    },

    {
      en: "Palada Pradhaman Payasam",
      ta: "பாலடை பிரதமன் பாயாசம்",
      price: 150,
    },

    {
      en: "Rice Payasam",
      ta: "அரிசி பாயாசம்",
      price: 85,
    },

    {
      en: "Chettinad Fruit Payasam",
      ta: "செட்டிநாடு பழ பாயாசம்",
      price: 160,
    },

    {
      en: "Sago Semiya Payasam",
      ta: "ஜவ்வரிசி சேமியா பாயாசம்",
      price: 100,
    },

    {
      en: "Green Gram Payasam",
      ta: "பாசி பருப்பு பாயாசம்",
      price: 110,
    },

    {
      en: "Red Rice Payasam",
      ta: "சிவப்பரிசி பாயாசம்",
      price: 130,
    },

    {
      en: "Black Kavuni Rice Payasam",
      ta: "கவுனி அரிசி பாயாசம்",
      price: 180,
    },

    {
      en: "Bottle Gourd Payasam",
      ta: "சுரைக்காய் பாயாசம்",
      price: 95,
    },

  ],
},


{
  title: {
    en: "Pickle Varieties",
    ta: "ஊறுகாய் வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Mango Pickle",
      ta: "மாங்காய் ஊறுகாய்",
      price: 40,
    },

    {
      en: "Lemon Pickle",
      ta: "எலுமிச்சை ஊறுகாய்",
      price: 35,
    },

    {
      en: "Ginger Pickle",
      ta: "இஞ்சி ஊறுகாய்",
      price: 50,
    },

    {
      en: "Garlic Pickle",
      ta: "பூண்டு ஊறுகாய்",
      price: 60,
    },

    {
      en: "Green Chilli Pickle",
      ta: "பச்சை மிளகாய் ஊறுகாய்",
      price: 45,
    },

  ],
},

{
  title: {
    en: "Idly Varieties",
    ta: "இட்லி வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Coriander Idly",
      ta: "மல்லி இட்லி",
      price: 40,
    },

    {
      en: "Hardin Idly",
      ta: "ஹார்டின் இட்லி",
      price: 45,
    },

    {
      en: "Plate Idly",
      ta: "தட்டு இட்லி",
      price: 60,
    },

    {
      en: "Ghee Mini Idly",
      ta: "நெய் மினி இட்லி",
      price: 80,
    },

    {
      en: "Plain Idly",
      ta: "சாதா இட்லி",
      price: 30,
    },

    {
      en: "Cup Idly",
      ta: "கப்பு இட்லி",
      price: 50,
    },

    {
      en: "Kulfi Idly",
      ta: "குல்பி இட்லி",
      price: 70,
    },

    {
      en: "Masala Idly",
      ta: "மசாலா இட்லி",
      price: 90,
    },

    {
      en: "Star Idly",
      ta: "ஸ்டார் இட்லி",
      price: 55,
    },

    {
      en: "Rava Idly",
      ta: "ரவா இட்லி",
      price: 45,
    },

    {
      en: "Kanchipuram Idly",
      ta: "காஞ்சிபுரம் இட்லி",
      price: 65,
    },

    {
      en: "Tender Coconut Idly",
      ta: "இளநீர் இட்லி",
      price: 95,
    },

    {
      en: "Kuzhi Paniyaram",
      ta: "குழி பணியாரம்",
      price: 70,
    },

    {
      en: "Kuzhai Puttu",
      ta: "குழாய் புட்டு",
      price: 85,
    },

    {
      en: "Appam",
      ta: "ஆப்பம்",
      price: 40,
    },

    {
      en: "Idiyappam with Coconut Milk",
      ta: "இடியாப்பம் + தேங்காய் பால்",
      price: 90,
    },

  ],
},

{
  title: {
    en: "Mixed Rice Varieties",
    ta: "கலவை சாதம் வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "White Rice",
      ta: "வெள்ளை சாதம்",
      price: 60,
    },

    {
      en: "Bisi Bele Bath",
      ta: "பிசிபேளா பாத்",
      price: 120,
    },

    {
      en: "Bhagala Bath",
      ta: "பகாளா பாத்",
      price: 110,
    },

    {
      en: "Kalkandu Bath",
      ta: "கல்கண்டு பாத்",
      price: 140,
    },

    {
      en: "Sweet Pongal",
      ta: "சர்க்கரை பொங்கல்",
      price: 130,
    },

    {
      en: "Tamarind Rice",
      ta: "புளி சாதம்",
      price: 100,
    },

    {
      en: "Sesame Rice",
      ta: "எள்ளு சாதம்",
      price: 110,
    },

    {
      en: "Lemon Rice",
      ta: "லெமன் சாதம்",
      price: 95,
    },

    {
      en: "Coconut Rice",
      ta: "தேங்காய் சாதம்",
      price: 120,
    },

    {
      en: "Tomato Rice",
      ta: "தக்காளி சாதம்",
      price: 100,
    },

    {
      en: "Mango Rice",
      ta: "மாங்காய் சாதம்",
      price: 110,
    },

    {
      en: "Mint Rice",
      ta: "புதினா சாதம்",
      price: 120,
    },

    {
      en: "Curry Leaves Rice",
      ta: "கருவேப்பிலை சாதம்",
      price: 105,
    },

    {
      en: "Vatha Kuzhambu Rice",
      ta: "வத்த குழம்பு சாதம்",
      price: 130,
    },

    {
      en: "Brinji Rice",
      ta: "பிரிஞ்சி சாதம்",
      price: 140,
    },

    {
      en: "Curd Rice",
      ta: "தயிர் சாதம்",
      price: 90,
    },

  ],
},

{
  title: {
    en: "Sweets",
    ta: "ஸ்வீட்ஸ்",
  },

  image: Sweets,

  items: [

    {
      en: "Rasmalai",
      ta: "ரசமலாய்",
      price: 60,
    },

    {
      en: "Bengali Sweet",
      ta: "பெங்காலி",
      price: 50,
    },

    {
      en: "Agra Paan",
      ta: "ஆகரா பான்",
      price: 70,
    },

    {
      en: "Rasgulla",
      ta: "ரசகுல்லா",
      price: 45,
    },

    {
      en: "Badam Halwa",
      ta: "பாதாம் அல்வா",
      price: 120,
    },

    {
      en: "Pista Roll",
      ta: "பிஸ்தா ரோல்",
      price: 140,
    },

    {
      en: "Malai Cream Roll",
      ta: "மலாய் கிரீம் ரோல்",
      price: 110,
    },

    {
      en: "China Stores Sweet",
      ta: "சீனா ஸ்டோர்ஸ்",
      price: 90,
    },

    {
      en: "Cashew Pista Roll",
      ta: "முந்திரி பிஸ்தா ரோல்",
      price: 160,
    },

    {
      en: "Litchi Labdi",
      ta: "லிச்சி லப்டி",
      price: 130,
    },

    {
      en: "Anarkali",
      ta: "அனார்கலி",
      price: 100,
    },

    {
      en: "Dry Fruit Halwa",
      ta: "ட்ரை ஃப்ரூட் அல்வா",
      price: 150,
    },

    {
      en: "Godhi Halwa",
      ta: "கோதி அல்வா",
      price: 90,
    },

    {
      en: "Malai Sandwich",
      ta: "மலாய் சாண்ட்விச்",
      price: 120,
    },

    {
      en: "Gulab Jamun (Round)",
      ta: "குலோப் ஜாம் (ரவுண்ட்)",
      price: 40,
    },

    {
      en: "Dry Jamun",
      ta: "ட்ரை ஜாமுன் (நீட்டு)",
      price: 50,
    },

    {
      en: "Makkan Peda",
      ta: "மக்கன் பேடா",
      price: 70,
    },

    {
      en: "Large Jangiri",
      ta: "பெரிய ஜாங்கிரி",
      price: 60,
    },

    {
      en: "Mini Boondi Laddu",
      ta: "மினி பூந்தி லட்டு",
      price: 55,
    },

    {
      en: "Mothi Paagu",
      ta: "மோதி பாகு",
      price: 95,
    },

  ],
},
{
  title: {
    en: "Snacks Varieties",
    ta: "கார வகைகள்",
  },

  image: snacks,

  items: [

    {
      en: "Veg Roll",
      ta: "வெஜ் ரோல்",
      price: 60,
    },

    {
      en: "Paneer Roll",
      ta: "பன்னீர் ரோல்",
      price: 90,
    },

    {
      en: "Cutlet",
      ta: "கட்லெட்",
      price: 40,
    },

    {
      en: "Cashew Pakoda",
      ta: "முந்திரி பக்கோடா",
      price: 120,
    },

    {
      en: "Onion Pakoda",
      ta: "ஆனியன் பக்கோடா",
      price: 50,
    },

    {
      en: "Masala Groundnut",
      ta: "மசாலா வேர்க்கடலை",
      price: 45,
    },

    {
      en: "Cauliflower Pakoda",
      ta: "காலிஃப்ளவர் பக்கோடா",
      price: 70,
    },

    {
      en: "Soft Pakoda",
      ta: "மெது பக்கோடா",
      price: 55,
    },

    {
      en: "Veg Spring Roll",
      ta: "வெஜ் ஸ்ப்ரிங் ரோல்",
      price: 80,
    },

    {
      en: "Veg Fish Fry",
      ta: "வெஜ் மீன் வருவல்",
      price: 85,
    },

    {
      en: "Potato Chips",
      ta: "உருளை சிப்ஸ்",
      price: 40,
    },

    {
      en: "Stick Chips",
      ta: "குச்சி சிப்ஸ்",
      price: 45,
    },

    {
      en: "Nendram Chips",
      ta: "நேந்திரம் சிப்ஸ்",
      price: 60,
    },

    {
      en: "Kara Sev",
      ta: "கார சேவ்",
      price: 50,
    },

    {
      en: "Kara Boondi",
      ta: "கார பூந்தி",
      price: 55,
    },

    {
      en: "Mixture",
      ta: "மிச்சர்",
      price: 65,
    },

  ],
},

{
  title: {
    en: "Chettinad Special",
    ta: "செட்டிநாடு ஸ்பெஷல்",
  },

  image: chettinad,

  items: [

    {
      en: "Kandharappam",
      ta: "கந்தர்ப்பம்",
      price: 70,
    },

    {
      en: "Aadi Kummayam",
      ta: "ஆடி கும்மாயம்",
      price: 90,
    },

    {
      en: "Ukkarai",
      ta: "உக்கரா",
      price: 85,
    },

    {
      en: "Black Kavuni Rice",
      ta: "கருப்பு கவுனி அரிசி",
      price: 140,
    },

    {
      en: "Milk Paniyaram",
      ta: "பால் பணியாரம்",
      price: 75,
    },

    {
      en: "White Paniyaram",
      ta: "வெள்ளை பணியாரம்",
      price: 70,
    },

    {
      en: "Sweet Kuzhi Paniyaram",
      ta: "இனிப்பு குழி பணியாரம்",
      price: 80,
    },

    {
      en: "Suzhiyam",
      ta: "சுழியம்",
      price: 60,
    },

    {
      en: "Milk Kozhukattai",
      ta: "பால் கொழுக்கட்டை",
      price: 90,
    },

    {
      en: "Kalkandu Vadai",
      ta: "கல்கண்டு வடை",
      price: 65,
    },

    {
      en: "Erukkala Kozhukattai",
      ta: "எருக்கல கொழுக்கட்டை",
      price: 75,
    },

    {
      en: "Crushed Pidi Kozhukattai",
      ta: "இடிச்ச புடி கொழுக்கட்டை",
      price: 70,
    },

    {
      en: "Pooranam Kozhukattai",
      ta: "பூரணம் கொழுக்கட்டை",
      price: 85,
    },

    {
      en: "Manavalam",
      ta: "மணவளம்",
      price: 100,
    },

    {
      en: "Poli",
      ta: "போலி",
      price: 50,
    },

    {
      en: "Thanjavur Arachi Vitta Sambar",
      ta: "தஞ்சாவூர் அரைச்சி விட்ட சாம்பார்",
      price: 120,
    },

    {
      en: "Vandikkaran Kara Kuzhambu",
      ta: "வண்டிக்காரன் காரக்குழம்பு",
      price: 130,
    },

    {
      en: "Oil Brinjal Kuzhambu",
      ta: "எண்ணெய் கத்திரிக்காய் குழம்பு",
      price: 110,
    },

    {
      en: "Sunda Vatha Kuzhambu",
      ta: "சுண்ட வத்த குழம்பு",
      price: 115,
    },

    {
      en: "Pakoda Kuzhambu",
      ta: "பக்கோடா குழம்பு",
      price: 120,
    },

    {
      en: "Puli Kuzhambu",
      ta: "புளிக்குழம்பு",
      price: 100,
    },

    {
      en: "Urundai Kuzhambu",
      ta: "உருண்டை குழம்பு",
      price: 140,
    },

    {
      en: "Veg Fish Kuzhambu",
      ta: "பொய் மீன் குழம்பு",
      price: 130,
    },

    {
      en: "Garlic Kuzhambu",
      ta: "பூண்டு குழம்பு",
      price: 110,
    },

    {
      en: "Chettinad Wedding Sambar",
      ta: "செட்டிநாட்டு கல்யாண சாம்பார்",
      price: 150,
    },

    {
      en: "Chettinad Kara Kuzhambu",
      ta: "செட்டிநாட்டு கார குழம்பு",
      price: 145,
    },

  ],
},
// 

    
    

  ];


export default specialMenus;