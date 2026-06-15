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
import Essen from "../Images/Essen.webp";
import VegSig from "../Images/vegSig.webp";
import VegClas from "../Images/vegClas.webp";
import nonv1 from "../Images/nonv1.webp";
import nonv3 from "../Images/nonv3.webp";

import Nonveg6 from "../Images/Nonveg6.webp";
import Nonveg8 from "../Images/Nonveg8.webp";

import VegPre from "../Images/VegPre.webp";
import Veg from "../Images/Veg.webp";
import VegPri from "../Images/VegPri.webp";


import Pongal from "../Images/Pongal.webp";
import Poori from "../Images/Poori.webp";
import Snacks from "../Images/Snacks.webp";

import tea from "../Images/tea.webp";

import Veg3 from "../Images/veg3.webp";

const specialMenus = {
  /* ==========================================================================
     1. BREAKFAST ITEMS
     ========================================================================== */
  Breakfast: [
    {
      title: { en: "Idly Varieties", ta: "இட்லி வகைகள்" },
      image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
      items: [
        { en: "Idly (3 Pieces)", ta: "இட்லி (3 துண்டு)", price: 36, type: "veg" },
        { en: "Elaneer Plate Idly (1 Piece)", ta: "இளநீர் தட்டு இட்லி (1 துண்டு)", price: 45, type: "veg" },
        { en: "Ghee Podi Idly", ta: "நெய் பொடி இட்லி", price: 60, type: "veg" },
        { en: "Plate Idly (1 Piece)", ta: "தட்டு இட்லி (1 துண்டு)", price: 20, type: "veg" },
        { en: "Heart Idly", ta: "ஹார்ட் இட்லி", price: 15, type: "veg" },
        { en: "Mini Idly (4 Pieces)", ta: "மினி இட்லி (4 துண்டு)", price: 35, type: "veg" },
      ],
    },
    {
      title: { en: "Dosa Varieties", ta: "தோசை வகைகள்" },
      image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=1200&auto=format&fit=crop",
      items: [
        { en: "Mini Uthappam", ta: "மினி உத்தப்பம்", price: 20, type: "veg" },
        { en: "Mini Podi Uthappam", ta: "மினி பொடி உத்தப்பம்", price: 25, type: "veg" },
        { en: "Mini Veg Uthappam", ta: "மினி வெஜ் உத்தப்பம்", price: 25, type: "veg" },
        { en: "Mini Dosa", ta: "மினி தோசை", price: 25, type: "veg" },
        { en: "Mini Masala Dosa", ta: "மினி மசாலா தோசை", price: 25, type: "veg" },
        { en: "Green Gram Dosa (Pesarattu)", ta: "பாசிப்பயறு தோசை (பெசரட்டு)", price: 30, type: "veg" },
      ],
    },
    {
      title: { en: "Pongal Varieties", ta: "பொங்கல் வகைகள்" },
      image: Pongal, 
      items: [
        { en: "Pongal", ta: "பொங்கல்", price: 40, type: "veg" },
        { en: "Ghee Pongal", ta: "நெய் பொங்கல்", price: 70, type: "veg" },
        { en: "5 Arisi Pongal", ta: "5 அரிசி பொங்கல்", price: 50, type: "veg" },
        { en: "Millet Pongal", ta: "தினை பொங்கல்", price: 60, type: "veg" },
        { en: "Rava Pongal", ta: "ரவா பொங்கல்", price: 10, type: "veg" },
      ],
    },
    {
      title: { en: "Poori Varieties", ta: "பூரி வகைகள்" },
      image: Poori,
      items: [
        { en: "Poori (1 Piece)", ta: "பூரி (1 துண்டு)", price: 25, type: "veg" },
        { en: "Palak Poori (1 Piece)", ta: "பாலக் பூரி (1 துண்டு)", price: 30, type: "veg" },
        { en: "Chola Poori", ta: "சோலா பூரி", price: 110, type: "veg" },
      ],
    },
    {
      title: { en: "Sweets & Halwa", ta: "இனிப்பு வகைகள்" },
      image: Sweets,
      items: [
        { en: "Kesari", ta: "கேசரி", price: 20, type: "veg" },
        { en: "Halwa", ta: "அல்வா", price: 25, type: "veg" },
        { en: "Kavuni Arisi (Chettinad)", ta: "கவுனி அரிசி", price: 25, type: "veg" },
        { en: "Ukara", ta: "உக்கரா", price: 30, type: "veg" },
        { en: "Basundi", ta: "பாசுந்தி", price: 65, type: "veg" },
        { en: "Rasamalai", ta: "ரசமலாய்", price: 65, type: "veg" },
        { en: "Badam Halwa", ta: "பாதாம் அல்வா", price: 60, type: "veg" },
        { en: "Elaneer Halwa", ta: "இளநீர் அல்வா", price: 25, type: "veg" }, 
        { en: "Agra Pan Bella", ta: "ஆகரா பான் பெல்லா", price: 35, type: "veg" },
        { en: "Malpua", ta: "மால்புவா", price: 25, type: "veg" },
        { en: "Sweet Shahi Roll", ta: "ஸ்வீட் ஷாஹி ரோல்", price: 30, type: "veg" },
        { en: "Bread Halwa", ta: "பிரெட் அல்வா", price: 20, type: "veg" },
        { en: "Double Ka Meetha", ta: "டபுள் கா மீட்டா", price: 20, type: "veg" },
        { en: "Shahi Tukda", ta: "ஷாஹி துக்கடா", price: 35, type: "veg" },
        { en: "Kashi Halwa", ta: "காசி அல்வா", price: 25, type: "veg" },
      ],
    },
    {
      title: { en: "Oil Fry & Snacks", ta: "எண்ணெய் பலகாரங்கள்" },
      image: Snacks,
      items: [
        { en: "Masala Seyam", ta: "மசாலா சீயம்", price: 10, type: "veg" },
        { en: "Vadai", ta: "வடை", price: 10, type: "veg" },
        { en: "Sweet Seyam", ta: "இனிப்பு சீயம்", price: 10, type: "veg" },
        { en: "Chettinad Kalkandu Vadai", ta: "கல்கண்டு வடை", price: 15, type: "veg" },
        { en: "Paneer Finger", ta: "பன்னீர் ஃபிங்கர்", price: 35, type: "veg" },
        { en: "Potato Chips", ta: "உருளைக்கிழங்கு சிப்ஸ்", price: 20, type: "veg" }, 
        { en: "Ada Dosa", ta: "அடை தோசை", price: 30, type: "veg" },
      ],
    },
    {
      title: { en: "Chettinad Traditional Menu", ta: "செட்டிநாடு பாரம்பரியம்" },
      image: chettinad,
      items: [
        { en: "Pal Paniyaram", ta: "பால் பணியாரம்", price: 30, type: "veg" },
        { en: "Erukkam Ilai Kozhukattai", ta: "எருக்கம்பிலை கொழுக்கட்டை", price: 15, type: "veg" },
        { en: "Kandharappam", ta: "கந்தரப்பம்", price: 15, type: "veg" },
        { en: "Vellai Paniyaram", ta: "வெள்ளை பணியாரம்", price: 15, type: "veg" },
        { en: "Aadi Kummayam", ta: "ஆடி கும்மாயம்", price: 30, type: "veg" },
        { en: "Sweet Kuzhi Paniyaram (2 Pieces)", ta: "இனிப்பு குழி பணியாரம் (2 துண்டு)", price: 25, type: "veg" },
      ],
    }
  ],

  /* ==========================================================================
     2. LUNCH ITEMS
     ========================================================================== */
  Lunch: [
    {
      title: { en: "Chicken & Mutton Non-Veg Special", ta: "அசைவ கறி வகைகள்" },
      image: nonv1,
      items: [
        { en: "Chicken 65", ta: "சிக்கன் 65", price: 70, type: "non-veg" },
        { en: "Chicken Uppukari", ta: "சிக்கன் உப்புக்கறி", price: 70, type: "non-veg" },
        { en: "Mutton Chukka", ta: "மட்டன் சுக்கா", price: 140, type: "non-veg" },
        { en: "Mutton Gravy", ta: "மட்டன் கிரேவி", price: 140, type: "non-veg" },
        { en: "Mutton Kuzhambu", ta: "மட்டன் குழம்பு", price: 140, type: "non-veg" },
        { en: "Fish Kuzhambu", ta: "மீன் குழம்பு", price: 120, type: "non-veg" },
        { en: "Fish Fry", ta: "மீன் வறுவல்", price: 120, type: "non-veg" },
        { en: "Prawn Masala", ta: "இறால் மசாலா", price: 150, type: "non-veg" },
        { en: "Mutton Kola Urundai", ta: "மட்டன் கோலா உருண்டை", price: 70, type: "non-veg" },
      ],
    },
    {
      title: { en: "Beverages & Cold Juices", ta: "பானங்கள் மற்றும் ஜூஸ்" },
      image: tea,
      items: [
        { en: "Tea", ta: "டீ", price: 15, type: "veg" },
        { en: "Coffee", ta: "காபி", price: 20, type: "veg" },
        { en: "Badam Milk", ta: "பாதாம் பால்", price: 20, type: "veg" },
        { en: "Masala Milk", ta: "மசாலா பால்", price: 20, type: "veg" },
        { en: "Panankarkandu Milk", ta: "பனங்கற்கண்டு பால்", price: 25, type: "veg" },
        { en: "Lemon Juice", ta: "எலுமிச்சை ஜூஸ்", price: 15, type: "veg" },
        { en: "Watermelon Juice", ta: "தர்பூசணி ஜூஸ்", price: 25, type: "veg" },
        { en: "Pineapple Juice", ta: "பైనాப்பிள் ஜூஸ்", price: 28, type: "veg" },
        { en: "Nannari Sarbath", ta: "நன்னாரி சர்பத்", price: 20, type: "veg" },
        { en: "Buttermilk", ta: "மோர்", price: 15, type: "veg" },
      ],
    }
  ],

  /* ==========================================================================
     3. DINNER ITEMS
     ========================================================================== */
  Dinner: [
    {
      title: { en: "Idiyappam & Noodles Varieties", ta: "இடியாப்பம் & நூடுல்ஸ்" },
      image: Noodles,
      items: [
        { en: "Idiyappam", ta: "இடியாப்பம்", price: 20, type: "veg" },
        { en: "Thalicha Idiyappam", ta: "தாளிச்ச இடியாப்பம்", price: 20, type: "veg" },
        { en: "Idiyappam with Coconut Milk", ta: "இடியாப்பம் + தேங்காய் பால்", price: 25, type: "veg" },
        { en: "Veg Noodles", ta: "வெஜ் நூடுல்ஸ்", price: 40, type: "veg" },
        { en: "Paneer / Kalan Noodles", ta: "பன்னீர் / காளான் நூடுல்ஸ்", price: 50, type: "veg" },
        { en: "Chicken Noodles", ta: "சிக்கன் நூடுல்ஸ்", price: 70, type: "non-veg" },
        { en: "Egg Noodles", ta: "முட்டை நூடுல்ஸ்", price: 50, type: "non-veg" },
      ],
    },
    {
      title: { en: "Breads & Parotta Varieties", ta: "ரோட்டி & பரோட்டா வகைகள்" },
      image: Roti,
      items: [
        { en: "Parotta", ta: "பரோட்டா", price: 20, type: "veg" },
        { en: "Nool Parotta", ta: "நூல் பரோட்டா", price: 30, type: "veg" },
        { en: "Bun Parotta", ta: "பன் பரோட்டா", price: 30, type: "veg" },
        { en: "Kothu Parotta", ta: "கொத்து பரோட்டா", price: 35, type: "non-veg" },
        { en: "Chilli Parotta", ta: "சில்லி பரோட்டா", price: 40, type: "veg" },
        { en: "Naan", ta: "நான்", price: 35, type: "veg" },
        { en: "Tandoori Roti", ta: "தந்தூரி ரோட்டி", price: 35, type: "veg" },
        { en: "Chapati", ta: "சப்பாத்தி", price: 20, type: "veg" },
        { en: "Rumali Roti", ta: "ரூமாலி ரோட்டி", price: 30, type: "veg" },
      ],
    },
    {
      title: { en: "Ice Creams", ta: "ஐஸ்கிரீம்" },
      image: Icecream,
      items: [
        { en: "Cup Ice Cream (Depends on Flavour)", ta: "கப் ஐஸ்கிரீம் (சுவையைப் பொறுத்து)", price: 10, type: "veg" },
      ],
    }
  ],

  /* ==========================================================================
     4. VEG PACKAGES (FIXED STRUCTURE)
     ========================================================================== */
/* ==========================================================================
     4. VEG PACKAGES
     ========================================================================== */
  VegPackages: [
    {
      title: { en: "Veg Essential", ta: "வெஜ் எசென்ஷியல்" },
       image: VegClas,
      price: 140,
      note: "Excluded services: Water Bottle, Paper roll",
      items: [
        { en: "Mandi", ta: "மண்டி", type: "veg" },
        { en: "Kootu", ta: "கூட்டு", type: "veg" },
        { en: "Pirattal", ta: "பிரட்டல்", type: "veg" },
        { en: "Sambar", ta: "சாம்பார்", type: "veg" },
        { en: "Ketti Kuzhambu", ta: "கெட்டிக்குழம்பு", type: "veg" },
        { en: "Rasam", ta: "ரசம்", type: "veg" },
        { en: "Mor", ta: "மோர்", type: "veg" },
        { en: "Appalam", ta: "அப்பளம்", type: "veg" },
        { en: "Payasam", ta: "பாயாசம்", type: "veg" }
      ]
    },
    {
      title: { en: "Veg Classic", ta: "வெஜ் கிளாசிக்" },
      image: Veg,
      price: 160,
      note: "Excluded services: Water Bottle, Paper roll",
      items: [
        { en: "Mandi", ta: "மண்டி", type: "veg" },
        { en: "Kootu", ta: "கூட்டு", type: "veg" },
        { en: "Pirattal Varuval", ta: "பிரட்டல் வறுவல்", type: "veg" },
        { en: "Poriyal", ta: "பொரியல்", type: "veg" },
        { en: "Sambar", ta: "சாம்பார்", type: "veg" },
        { en: "Rasam", ta: "ரசம்", type: "veg" },
        { en: "Ketti Kuzhambu", ta: "கெட்டிக்குழம்பு", type: "veg" },
        { en: "Mor", ta: "மோர்", type: "veg" },
        { en: "Appalam", ta: "அப்பளம்", type: "veg" },
        { en: "Payasam", ta: "பாயாசம்", type: "veg" }
      ]
    },
    {
      title: { en: "Veg Signature", ta: "வெஜ் சிக்னேச்சர்" },
      image: Veg3,
      price: 220,
      note: "Included: Appalam, Payasam | Excluded services: Water Bottle, Paper roll",
      items: [
        { en: "Biryani", ta: "பிரியாணி", type: "veg" },
        { en: "Dhall Ghee", ta: "பொருப்பு நெய்", type: "veg" },
        { en: "Mandi", ta: "மண்டி", type: "veg" },
        { en: "Kootu", ta: "கூட்டு", type: "veg" },
        { en: "Pirattal", ta: "பிரட்டல்", type: "veg" },
        { en: "Varuval", ta: "வறுவல்", type: "veg" },
        { en: "Poriyal", ta: "பொரியல்", type: "veg" },
        { en: "Sambar", ta: "சாம்பார்", type: "veg" },
        { en: "Rasam", ta: "ரசம்", type: "veg" },
        { en: "Ketti Kuzhambu", ta: "கெட்டிக்குழம்பு", type: "veg" },
        { en: "Mor", ta: "மோர்", type: "veg" },
        { en: "Payasam", ta: "பாயாசம்", type: "veg" },
        { en: "Appalam", ta: "அப்பளம்", type: "veg" }
      ]
    },
    {
      title: { en: "Veg Premium", ta: "வெஜ் பிரீமியம்" },
image: VegPre,
      price: 300,
      note: "Excluded services: Water Bottle, Paper roll",
      items: [
        { en: "Biryani", ta: "பிரியாணி", type: "veg" },
        { en: "Dhall Ghee", ta: "பருப்பு நெய்", type: "veg" },
        { en: "Mandi", ta: "மண்டி", type: "veg" },
        { en: "Chapatti", ta: "சப்பாத்தி", type: "veg" },
        { en: "Kootu", ta: "கூட்டு", type: "veg" },
        { en: "Pirattal", ta: "பிரட்டல்", type: "veg" },
        { en: "Varuval", ta: "வறுவல்", type: "veg" },
        { en: "Poriyal", ta: "பொரியல்", type: "veg" },
        { en: "Sambar", ta: "சாம்பார்", type: "veg" },
        { en: "Rasam", ta: "ரசம்", type: "veg" },
        { en: "Ketti Kuzhambu", ta: "கெட்டிக்குழம்பு", type: "veg" },
        { en: "Mor", ta: "மோர்", type: "veg" },
        { en: "Appalam", ta: "அப்பளம்", type: "veg" },
        { en: "Fruit Payasam", ta: "பழ பாயாசம்", type: "veg" },
        { en: "Ice Cream", ta: "ஐஸ்கிரீம்", type: "veg" },
        { en: "Beeda", ta: "பீடா", type: "veg" },
        { en: "Banana", ta: "வாழைப்பழம்", type: "veg" },
        { en: "Mini Jalebi", ta: "மினி ஜிலேபி", type: "veg" }
      ]
    },
    {
      title: { en: "Veg Royal Feast", ta: "வெஜ் ராயல் ஃபீஸ்ட்" },
      image: VegPri,
      price: 750,
      note: "Excluded services: Water Bottle, Paper roll",
      items: [
        { en: "Veg Mutton", ta: "வெஜ் மட்டன்", type: "veg" },
        { en: "Veg Chicken", ta: "வெஜ் சிக்கன்", type: "veg" },
        { en: "Veg Fish", ta: "வெஜ் மீன்", type: "veg" },
        { en: "Veg Prawn Biryani", ta: "வெஜ் இறால் பிரியாணி", type: "veg" },
        { en: "Rice", ta: "சாதம்", type: "veg" },
        { en: "Rasam", ta: "ரசம்", type: "veg" },
        { en: "Mor", ta: "மோர்", type: "veg" },
        { en: "Fruit Payasam", ta: "பழ பாயாசம்", type: "veg" }
      ]
    }
  ],

  /* ==========================================================================
     5. NON-VEG PACKAGES
     ========================================================================== */
  NonVegPackages: [
    {
      title: { en: "NV Signature", ta: "என்.வி சிக்னேச்சர்" },
      image: nonv1,
      price: 400,
      note: "Included: Paper roll, Water Bottle",
      items: [
        { en: "Rice", ta: "சாதம்", type: "non-veg" },
        { en: "Mutton Kuzhambu", ta: "மட்டன் குழம்பு", type: "non-veg" },
        { en: "Mutton Gravy", ta: "மட்டன் கிரேவி", type: "non-veg" },
        { en: "Egg", ta: "முட்டை", type: "non-veg" },
        { en: "Bone Soup", ta: "எலும்பு சூப்", type: "non-veg" },
        { en: "Mandi", ta: "மண்டி", type: "veg" },
        { en: "Poriyal", ta: "பொரியல்", type: "veg" },
        { en: "Mor", ta: "மோர்", type: "veg" },
        { en: "Rasam", ta: "ரசம்", type: "veg" },
        { en: "Rava Payasam", ta: "ரவை பாயாசம்", type: "veg" }
      ]
    },
    {
      title: { en: "NV Classic", ta: "என்.வி கிளாசிக்" },
      image: biryaniImg,
      price: 500,
      note: "Included: Water Bottle, Paper roll",
      items: [
        { en: "Rice", ta: "சாதம்", type: "non-veg" },
        { en: "Mutton Kuzhambu", ta: "மட்டன் குழம்பு", type: "non-veg" },
        { en: "Mutton Gravy", ta: "மட்டன் கிரேவி", type: "non-veg" },
        { en: "Fish Fry", ta: "மீன் வறுவல்", type: "non-veg" },
        { en: "Fish Kuzhambu", ta: "மீன் குழம்பு", type: "non-veg" },
        { en: "Egg", ta: "முட்டை", type: "non-veg" },
        { en: "Bone Soup", ta: "எலும்பு சூப்", type: "non-veg" },
        { en: "Mandi", ta: "மண்டி", type: "veg" },
        { en: "Poriyal", ta: "பொரியல்", type: "veg" },
        { en: "Mor", ta: "மோர்", type: "veg" },
        { en: "Rasam", ta: "ரசம்", type: "veg" },
        { en: "Rava Payasam", ta: "ரவை பாயாசம்", type: "veg" }
      ]
    },
    {
      title: { en: "NV Premium", ta: "என்.வி பிரீமியம்" },
      image: nonv3,
      price: 700,
      note: "Included: Water Bottle, Paper roll",
      items: [
        { en: "Mutton Biryani", ta: "மட்டன் பிரியாணி", type: "non-veg" },
        { en: "Mutton Chukka", ta: "மட்டன் சுக்கா", type: "non-veg" },
        { en: "Chicken 65", ta: "சிக்கன் 65", type: "non-veg" },
        { en: "Egg", ta: "முட்டை", type: "non-veg" },
        { en: "Curd Onion", ta: "தயிர் வெங்காயம்", type: "veg" },
        { en: "Rice", ta: "சாதம்", type: "veg" },
        { en: "Bone Soup", ta: "எலும்பு சூப்", type: "non-veg" },
        { en: "Fruit Payasam", ta: "பழ பாயாசம்", type: "veg" },
        { en: "Beeda", ta: "பீடா", type: "veg" }
      ]
    },
    {
      title: { en: "NV Elite", ta: "என்.வி எலைட்" },
      image: Nonveg8,
      price: 1000,
      note: "Diamond ++ Menu included with additions",
      items: [
        { en: "Mutton Biryani", ta: "மட்டன் பிரியாணி", type: "non-veg" },
        { en: "Mutton Chukka", ta: "மட்டன் சுக்கா", type: "non-veg" },
        { en: "Chicken 65", ta: "சிக்கன் 65", type: "non-veg" },
        { en: "Egg", ta: "முட்டை", type: "non-veg" },
        { en: "Curd Onion", ta: "தயிர் வெங்காயம்", type: "veg" },
        { en: "Rice", ta: "சாதம்", type: "veg" },
        { en: "Bone Soup", ta: "எலும்பு சூப்", type: "non-veg" },
        { en: "Fruit Payasam", ta: "பழ பாயாசம்", type: "veg" },
        { en: "Beeda", ta: "பீடா", type: "veg" },
        { en: "Country Chicken Soup", ta: "நாட்டுக்கோழி சூப்", type: "non-veg" },
        { en: "Prawn Gravy", ta: "இறால் கிரேவி", type: "non-veg" },
        { en: "Mutton Kola", ta: "மட்டன் கோலா", type: "non-veg" },
        { en: "Ice Cream", ta: "ஐஸ்கிரீம்", type: "veg" }
      ]
    },
    {
      title: { en: "NV Grand Royale", ta: "என்.வி கிராண்ட் ராயல்" },
      image: Nonveg6,
      price: 1200,
      note: "Diamond & Ruby package combined ( Added Prawn 65)",
      items: [
        { en: "Mutton Biryani", ta: "மட்டன் பிரியாணி", type: "non-veg" },
        { en: "Mutton Chukka", ta: "மட்டன் சுக்கா", type: "non-veg" },
        { en: "Chicken 65", ta: "சிக்கன் 65", type: "non-veg" },
        { en: "Egg", ta: "முட்டை", type: "non-veg" },
        { en: "Curd Onion", ta: "தயிர் வெங்காயம்", type: "veg" },
        { en: "Rice", ta: "சாதம்", type: "veg" },
        { en: "Bone Soup", ta: "எலும்பு சூப்", type: "non-veg" },
        { en: "Fruit Payasam", ta: "பழ பாயாசம்", type: "veg" },
        { en: "Beeda", ta: "பீடா", type: "veg" },
        { en: "Country Chicken Soup", ta: "நாட்டுக்கோழி சூப்", type: "non-veg" },
        { en: "Mutton Kola", ta: "மட்டன் கோலா", type: "non-veg" },
        { en: "Ice Cream", ta: "ஐஸ்கிரீம்", type: "veg" },
        { en: "Kaada Gravy", ta: "காடை கிரேவி", type: "non-veg" },
        { en: "Crab Gravy", ta: "நண்டு கிரேவி", type: "non-veg" },
        { en: "Prawn 65 (Prawn Gravy Removed)", ta: "இறால் 65 (இறால் கிரேவி நீக்கப்பட்டது)", type: "non-veg" }
      ]
    }
  ]
};

export default specialMenus;
