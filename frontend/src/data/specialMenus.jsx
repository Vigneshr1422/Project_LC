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
import VegPre from "../Images/vegPre.webp";
import VegClas from "../Images/vegClas.webp";
import Veg from "../Images/veg.webp";
import VegPri from "../Images/vegPri.webp";
import nonv1 from "../Images/nonv1.webp";
import nonv3 from "../Images/nonv3.webp";

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
      image: biryaniImg,
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
      image: biryaniImg,
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

// import biryaniImg from "../Images/pulao.webp";
// import Payasam from "../Images/payasam.webp";
// import Noodles from "../Images/Noodels.webp";
// import Paan from "../Images/paan.webp";
// import Icecream from "../Images/Icecream.webp";
// import Roti from "../Images/Roti.webp";
// import fish from "../Images/fish.webp";
// import Egg from "../Images/egg.webp";
// import grab from "../Images/grab.webp";
// import Soup from "../Images/soup.webp";
// import snacks from "../Images/snakcs.webp";
// import Sweets from "../Images/Sweets.webp";
// import chettinad from "../Images/chettinad.webp";

// const specialMenus = {
//   /* ==========================================================================
//      1. BREAKFAST ITEMS
//      ========================================================================== */
//   Breakfast: [
//     {
//       title: { en: "Idly Varieties", ta: "இட்லி வகைகள்" },
//       image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
//       items: [
//         { en: "Plain Idly", ta: "சாதா இட்லி", price: 30, type: "veg" },
//         { en: "Coriander Idly", ta: "மல்லி இட்லி", price: 40, type: "veg" },
//         { en: "Hardin Idly", ta: "ஹார்டின் இட்லி", price: 45, type: "veg" },
//         { en: "Rava Idly", ta: "ரவா இட்லி", price: 45, type: "veg" },
//         { en: "Cup Idly", ta: "கப்பு இட்லி", price: 50, type: "veg" },
//         { en: "Star Idly", ta: "ஸ்டார் இட்லி", price: 55, type: "veg" },
//         { en: "Plate Idly", ta: "தட்டு இட்லி", price: 60, type: "veg" },
//         { en: "Kanchipuram Idly", ta: "காஞ்சிபுரம் இட்லி", price: 65, type: "veg" },
//         { en: "Kuzhi Paniyaram", ta: "குழி பணியாரம்", price: 70, type: "veg" },
//         { en: "Kulfi Idly", ta: "குல்பி இட்லி", price: 70, type: "veg" },
//         { en: "Ghee Mini Idly", ta: "நெய் மினி இட்லி", price: 80, type: "veg" },
//         { en: "Kuzhai Puttu", ta: "குழாய் புட்டு", price: 85, type: "veg" },
//         { en: "Masala Idly", ta: "மசாலா இட்லி", price: 90, type: "veg" },
//         { en: "Appam", ta: "ஆப்பம்", price: 40, type: "veg" },
//         { en: "Idiyappam with Coconut Milk", ta: "இடியாப்பம் + தேங்காய் பால்", price: 90, type: "veg" },
//         { en: "Tender Coconut Idly", ta: "இளநீர் இட்லி", price: 95, type: "veg" },
//       ],
//     },
//     {
//       title: { en: "Payasam Varieties", ta: "பாயாசம் வகைகள்" },
//       image: Payasam,
//       items: [
//         { en: "Sago Payasam", ta: "ஜவ்வரிசி பாயாசம்", price: 80, type: "veg" },
//         { en: "Rava Payasam", ta: "ரவை பாயாசம்", price: 80, type: "veg" },
//         { en: "Semiya Payasam", ta: "சேமியா பாயாசம்", price: 85, type: "veg" },
//         { en: "Rice Payasam", ta: "அரிசி பாயாசம்", price: 85, type: "veg" },
//         { en: "Milk Payasam", ta: "பால் பாயாசம்", price: 90, type: "veg" },
//         { en: "Aval Payasam", ta: "அவுல் பாயாசம்", price: 90, type: "veg" },
//         { en: "Bottle Gourd Payasam", ta: "சுரைக்காய் பாயாசம்", price: 95, type: "veg" },
//         { en: "Dal Payasam", ta: "பருப்பு பாயாசம்", price: 95, type: "veg" },
//         { en: "Sago Semiya Payasam", ta: "ஜவ்வரிசி சேமியா பாயாசம்", price: 100, type: "veg" },
//         { en: "Green Gram Payasam", ta: "பாசி பருப்பு பாயாசம்", price: 110, type: "veg" },
//         { en: "Basmati Payasam", ta: "பாசுமதி பாயாசம்", price: 120, type: "veg" },
//         { en: "Red Rice Payasam", ta: "சிவப்பரிசி பாயாசம்", price: 130, type: "veg" },
//         { en: "Tender Coconut Payasam", ta: "இளநீர் பாயாசம்", price: 140, type: "veg" },
//         { en: "Palada Pradhaman Payasam", ta: "பாலடை பிரதமன் பாயாசம்", price: 150, type: "veg" },
//         { en: "Chettinad Fruit Payasam", ta: "செட்டிநாடு பழ பாயாசம்", price: 160, type: "veg" },
//         { en: "Black Kavuni Rice Payasam", ta: "கவுனி அரிசி பாயாசம்", price: 180, type: "veg" },
//       ],
//     },
//     {
//       title: { en: "Sweets", ta: "ஸ்வீட்ஸ்" },
//       image: Sweets,
//       items: [
//         { en: "Gulab Jamun (Round)", ta: "குலோப் ஜாம் (ரவுண்ட்)", price: 40, type: "veg" },
//         { en: "Rasgulla", ta: "ரசகுல்லா", price: 45, type: "veg" },
//         { en: "Bengali Sweet", ta: "பெங்காலி", price: 50, type: "veg" },
//         { en: "Dry Jamun", ta: "ட்ரை ஜாமுன் (நீட்டு)", price: 50, type: "veg" },
//         { en: "Mini Boondi Laddu", ta: "மினி பூந்தி லட்டு", price: 55, type: "veg" },
//         { en: "Rasmalai", ta: "ரசமலாய்", price: 60, type: "veg" },
//         { en: "Large Jangiri", ta: "பெரிய ஜாங்கிரி", price: 60, type: "veg" },
//         { en: "Agra Paan", ta: "ஆகரா பான்", price: 70, type: "veg" },
//         { en: "Makkan Peda", ta: "மக்கன் பேடா", price: 70, type: "veg" },
//         { en: "China Stores Sweet", ta: "சீனா ஸ்டோர்ஸ்", price: 90, type: "veg" },
//         { en: "Godhi Halwa", ta: "கோதி அல்வா", price: 90, type: "veg" },
//         { en: "Mothi Paagu", ta: "மோதி பாகு", price: 95, type: "veg" },
//         { en: "Anarkali", ta: "அனார்கலி", price: 100, type: "veg" },
//         { en: "Malai Cream Roll", ta: "மலாய் கிரீம் ரோல்", price: 110, type: "veg" },
//         { en: "Badam Halwa", ta: "பாதாம் அல்வா", price: 120, type: "veg" },
//         { en: "Malai Sandwich", ta: "மலாய் சாண்ட்விச்", price: 120, type: "veg" },
//         { en: "Litchi Labdi", ta: "லிச்சி லப்டி", price: 130, type: "veg" },
//         { en: "Pista Roll", ta: "பிஸ்தா ரோல்", price: 140, type: "veg" },
//         { en: "Dry Fruit Halwa", ta: "ட்ரை ஃப்ரூட் அல்வா", price: 150, type: "veg" },
//         { en: "Cashew Pista Roll", ta: "முந்திரி பிஸ்தா ரோல்", price: 160, type: "veg" },
//       ],
//     },
//     {
//       title: { en: "Soup Varieties", ta: "சூப் வகைகள்" },
//       image: Soup,
//       items: [
//         { en: "Hot Pepper Water Soup", ta: "ஹாட் மிளகுதண்ணி சூப்", price: 70, type: "veg" },
//         { en: "Tomato Soup", ta: "தக்காளி சூப்", price: 80, type: "veg" },
//         { en: "Sweet Corn Soup", ta: "ஸ்வீட் கார்ன் சூப்", price: 90, type: "veg" },
//         { en: "Vegetable Clear Soup", ta: "வெஜிடபிள் கிளியர் சூப்", price: 90, type: "veg" },
//         { en: "Baby Corn Soup", ta: "பேபி கார்ன் சூப்", price: 100, type: "veg" },
//         { en: "Lemon Coriander Soup", ta: "லெமன் கொரியாண்டர் சூப்", price: 100, type: "veg" },
//         { en: "Noodles Soup", ta: "நூடுல்ஸ் சூப்", price: 110, type: "veg" },
//         { en: "Herbal Soup", ta: "ஹெர்பல்ஸ் சூப்", price: 120, type: "veg" },
//         { en: "Mushroom Soup", ta: "மஷ்ரூம் சூப்", price: 130, type: "veg" },
//       ],
//     }
//   ],

//   /* ==========================================================================
//      2. LUNCH ITEMS
//      ========================================================================== */
//   Lunch: [
//     {
//       title: { en: "Biryani Varieties", ta: "பிரியாணி வகைகள்" },
//       image: biryaniImg,
//       items: [
//         { en: "Egg Biryani", ta: "முட்டை பிரியாணி", price: 180, type: "non-veg" },
//         { en: "Chettinad Seeraga Samba Chicken Biryani", ta: "செட்டிநாட்டு சீரக சம்பா சிக்கன் பிரியாணி", price: 220, type: "non-veg" },
//         { en: "Hyderabadi Chicken Biryani", ta: "ஹைதராபாத் சிக்கன் பிரியாணி", price: 240, type: "non-veg" },
//         { en: "Fish Biryani", ta: "மீன் பிரியாணி", price: 260, type: "non-veg" },
//         { en: "Mutton Biryani", ta: "மட்டன் பிரியாணி", price: 280, type: "non-veg" },
//         { en: "Country Chicken Biryani", ta: "நாட்டுக்கோழி பிரியாணி", price: 300, type: "non-veg" },
//         { en: "Hyderabadi Mutton Biryani", ta: "ஹைதராபாத் மட்டன் பிரியாணி", price: 320, type: "non-veg" },
//         { en: "Prawn Biryani", ta: "இறால் பிரியாணி", price: 340, type: "non-veg" },
//         { en: "Quail Biryani", ta: "காடை பிரியாணி", price: 350, type: "non-veg" },
//         { en: "Turkey Biryani", ta: "வான்கோழி பிரியாணி", price: 360, type: "non-veg" },
//         { en: "Mutton Leg Biryani", ta: "ஆட்டுக்கால் பிரியாணி", price: 420, type: "non-veg" },
//       ],
//     },
//     {
//       title: { en: "Mixed Rice Varieties", ta: "கலவை சாதம் வகைகள்" },
//       image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
//       items: [
//         { en: "White Rice", ta: "வெள்ளை சாதம்", price: 60, type: "veg" },
//         { en: "Curd Rice", ta: "தயிர் சாதம்", price: 90, type: "veg" },
//         { en: "Tamarind Rice", ta: "புளி சாதம்", price: 100, type: "veg" },
//         { en: "Tomato Rice", ta: "தக்காளி சாதம்", price: 100, type: "veg" },
//         { en: "Curry Leaves Rice", ta: "கருவேப்பிலை சாதம்", price: 105, type: "veg" },
//         { en: "Bhagala Bath", ta: "பகாளா பாத்", price: 110, type: "veg" },
//         { en: "Sesame Rice", ta: "எள்ளu சாதம்", price: 110, type: "veg" },
//         { en: "Mango Rice", ta: "மாங்காய் சாதம்", price: 110, type: "veg" },
//         { en: "Bisi Bele Bath", ta: "பிசிபேளா பாத்", price: 120, type: "veg" },
//         { en: "Coconut Rice", ta: "தேங்காய் சாதம்", price: 120, type: "veg" },
//         { en: "Mint Rice", ta: "புதினா சாதம்", price: 120, type: "veg" },
//         { en: "Sweet Pongal", ta: "சர்க்கரை பொங்கல்", price: 130, type: "veg" },
//         { en: "Vatha Kuzhambu Rice", ta: "வத்த குழம்பு சாதம்", price: 130, type: "veg" },
//         { en: "Kalkandu Bath", ta: "கல்கண்டு பாத்", price: 140, type: "veg" },
//         { en: "Brinji Rice", ta: "பிரிஞ்சி சாதம்", price: 140, type: "veg" },
//       ],
//     },
//     {
//       title: { en: "Fish Varieties", ta: "மீன் வகைகள்" },
//       image: fish,
//       items: [
//         { en: "Fish Cutlet", ta: "மீன் கட்லெட்", price: 180, type: "non-veg" },
//         { en: "Fish Curry", ta: "மீன் குழம்பு", price: 240, type: "non-veg" },
//         { en: "Fish Poriyal", ta: "மீன் பொறியல்", price: 250, type: "non-veg" },
//         { en: "Fish Thokku", ta: "மீன் தொக்கு", price: 260, type: "non-veg" },
//         { en: "Anchovy Fish Curry", ta: "நெத்திலி மீன் குழம்பு", price: 280, type: "non-veg" },
//         { en: "Fish Puttu Curry", ta: "மீன் புட்டுக்கறி", price: 290, type: "non-veg" },
//         { en: "Fish Fry", ta: "மீன் வறுவல்", price: 320, type: "non-veg" },
//         { en: "Spicy Tamarind Fish Fry", ta: "மீன் புளி வறுவல்", price: 340, type: "non-veg" },
//         { en: "Fish Roast", ta: "மீன் ரோஸ்ட்", price: 360, type: "non-veg" },
//       ],
//     },
//     {
//       title: { en: "Crab Varieties", ta: "நண்டு வகைகள்" },
//       image: grab,
//       items: [
//         { en: "Crab Rasam", ta: "நண்டு ரசம்", price: 220, type: "non-veg" },
//         { en: "Crab Pepper Soup", ta: "நண்டு மிளகு சூப்", price: 260, type: "non-veg" },
//         { en: "Crab Gravy", ta: "நண்டு கிரேவி", price: 350, type: "non-veg" },
//         { en: "Crab Masala Curry", ta: "நண்டு மசாலா குழம்பு", price: 380, type: "non-veg" },
//         { en: "Crab Fry", ta: "நண்டு வறுவல்", price: 400, type: "non-veg" },
//         { en: "Chettinad Crab Curry", ta: "செட்டிநாட்டு நண்டு குழம்பு", price: 420, type: "non-veg" },
//         { en: "Coconut Pepper Crab", ta: "தேங்காய் மிளகு நண்டு", price: 450, type: "non-veg" },
//         { en: "Crab Fry Special", ta: "நண்டு ஃப்ரை", price: 480, type: "non-veg" },
//       ],
//     },
//     {
//       title: { en: "Prawn Varieties", ta: "இறால் வகைகள்" },
//       image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=1200&auto=format&fit=crop",
//       items: [
//         { en: "Prawn Gravy", ta: "இறால் கிரேவி", price: 300, type: "non-veg" },
//         { en: "Prawn Curry", ta: "இறால் குழம்பு", price: 320, type: "non-veg" },
//         { en: "Prawn Podimas", ta: "இறால் பொடிமாஸ்", price: 330, type: "non-veg" },
//         { en: "Prawn Tamarind Curry", ta: "இறால் புளி குழம்பு", price: 340, type: "non-veg" },
//         { en: "Prawn Thokku", ta: "இறால் தொக்கு", price: 350, type: "non-veg" },
//         { en: "Prawn Masala Curry", ta: "இறால் மசாலா கறி", price: 360, type: "non-veg" },
//         { en: "Prawn Coconut Roast", ta: "இறால் தேங்காய் பிரட்டல்", price: 380, type: "non-veg" },
//         { en: "Butter Prawn Egg Masala", ta: "பட்டர் இறால் முட்டை மசாலா", price: 400, type: "non-veg" },
//       ],
//     },
//     {
//       title: { en: "Chettinad Special", ta: "செட்டிநாடு ஸ்பெஷல்" },
//       image: chettinad,
//       items: [
//         { en: "Poli", ta: "போலி", price: 50, type: "veg" },
//         { en: "Suzhiyam", ta: "சுழியம்", price: 60, type: "veg" },
//         { en: "Kalkandu Vadai", ta: "கல்கண்டு வடை", price: 65, type: "veg" },
//         { en: "Kandharappam", ta: "கந்தர்ப்பம்", price: 70, type: "veg" },
//         { en: "White Paniyaram", ta: "வெள்ளை பணியாரம்", price: 70, type: "veg" },
//         { en: "Crushed Pidi Kozhukattai", ta: "இடிச்ச புடி கொழுக்கட்டை", price: 70, type: "veg" },
//         { en: "Milk Paniyaram", ta: "பால் பணியாரம்", price: 75, type: "veg" },
//         { en: "Erukkala Kozhukattai", ta: "எருக்கல கொழுக்கட்டை", price: 75, type: "veg" },
//         { en: "Sweet Kuzhi Paniyaram", ta: "இனிப்பு குழி பணியாரம்", price: 80, type: "veg" },
//         { en: "Ukkarai", ta: "உக்கரா", price: 85, type: "veg" },
//         { en: "Pooranam Kozhukattai", ta: "பூரணம் கொழுக்கட்டை", price: 85, type: "veg" },
//         { en: "Aadi Kummayam", ta: "ஆடி கும்மாயம்", price: 90, type: "veg" },
//         { en: "Milk Kozhukattai", ta: "பால் கொழுக்கட்டை", price: 90, type: "veg" },
//         { en: "Puli Kuzhambu", ta: "புளிக்குழம்பு", price: 100, type: "veg" },
//         { en: "Manavalam", ta: "மணவளம்", price: 100, type: "veg" },
//         { en: "Oil Brinjal Kuzhambu", ta: "எண்ணெய் கத்திரிக்காய் குழம்பு", price: 110, type: "veg" },
//         { en: "Garlic Kuzhambu", ta: "பூண்டு குழம்பு", price: 110, type: "veg" },
//         { en: "Sunda Vatha Kuzhambu", ta: "சுண்ட வத்த குழம்பு", price: 115, type: "veg" },
//         { en: "Thanjavur Arachi Vitta Sambar", ta: "தஞ்சாவூர் அரைச்சி விட்ட சாம்பார்", price: 120, type: "veg" },
//         { en: "Pakoda Kuzhambu", ta: "பக்கோடா குழம்பு", price: 120, type: "veg" },
//         { en: "Vandikkaran Kara Kuzhambu", ta: "வண்டிக்காரன் காரக்குழம்பு", price: 130, type: "veg" },
//         { en: "Veg Fish Kuzhambu", ta: "பொய் மீன் குழம்பு", price: 130, type: "veg" },
//         { en: "Black Kavuni Rice", ta: "கருப்பு கவுனி அரிசி", price: 140, type: "veg" },
//         { en: "Urundai Kuzhambu", ta: "உருண்டை குழம்பு", price: 140, type: "veg" },
//         { en: "Chettinad Kara Kuzhambu", ta: "செட்டிநாட்டு கார குழம்பு", price: 145, type: "veg" },
//         { en: "Chettinad Wedding Sambar", ta: "செட்டிநாட்டு கல்யாண சாம்பார்", price: 150, type: "veg" },
//       ],
//     },
//     {
//       title: { en: "Pickle Varieties", ta: "ஊறுகாய் வகைகள்" },
//       image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=1200&auto=format&fit=crop",
//       items: [
//         { en: "Lemon Pickle", ta: "எலுமிச்சை ஊறுகாய்", price: 35, type: "veg" },
//         { en: "Mango Pickle", ta: "மாங்காய் ஊறுகாய்", price: 40, type: "veg" },
//         { en: "Green Chilli Pickle", ta: "பச்சை மிளகாய் ஊறுகாய்", price: 45, type: "veg" },
//         { en: "Ginger Pickle", ta: "இஞ்சி ஊறுகாய்", price: 50, type: "veg" },
//         { en: "Garlic Pickle", ta: "பூண்டு ஊறுகாய்", price: 60, type: "veg" },
//       ],
//     },
//   ],

//   /* ==========================================================================
//      3. DINNER ITEMS
//      ========================================================================== */
//   Dinner: [
//     {
//       title: { en: "Roti Varieties", ta: "ரோட்டி வகைகள்" },
//       image: Roti,
//       items: [
//         { en: "Parotta", ta: "பரோட்டா", price: 20, type: "veg" },
//         { en: "Veechu Parotta", ta: "வீச் பரோட்டா", price: 30, type: "veg" },
//         { en: "Naan", ta: "நான்", price: 35, type: "veg" },
//         { en: "Bun Parotta", ta: "பன் பரோட்டா", price: 35, type: "veg" },
//         { en: "Lappa Parotta", ta: "லாப்பா பரோட்டா", price: 40, type: "veg" },
//         { en: "Nool Parotta", ta: "நூல் பரோட்டா", price: 45, type: "veg" },
//         { en: "Butter Naan", ta: "பட்டர் நான்", price: 50, type: "veg" },
//         { en: "Egg Parotta", ta: "முட்டை பரோட்டா", price: 60, type: "non-veg" },
//         { en: "Egg Veechu Parotta", ta: "முட்டை வீச் பரோட்டா", price: 70, type: "non-veg" },
//         { en: "Egg Lappa Parotta", ta: "முட்டை லாப்பா பரோட்டா", price: 80, type: "non-veg" },
//         { en: "Chilli Parotta", ta: "சில்லி பரோட்டா", price: 110, type: "veg" },
//         { en: "Chicken Parotta", ta: "சிக்கன் பரோட்டா", price: 120, type: "non-veg" },
//         { en: "Chicken Lappa Parotta", ta: "சிக்கன் லாப்பா பரோட்டா", price: 140, type: "non-veg" },
//         { en: "Chicken Kothu Parotta", ta: "சிக்கன் கொத்து பரோட்டா", price: 160, type: "non-veg" },
//       ],
//     },
//     {
//       title: { en: "Noodles Varieties", ta: "நூடுல்ஸ் வகைகள்" },
//       image: Noodles,
//       items: [
//         { en: "Egg Noodles", ta: "எக் நூடுல்ஸ்", price: 100, type: "non-veg" },
//         { en: "Chicken Noodles", ta: "சிக்கன் நூடுல்ஸ்", price: 120, type: "non-veg" },
//         { en: "Dry Noodles", ta: "ட்ரை நூடுல்ஸ்", price: 130, type: "veg" },
//         { en: "Chinese Noodles", ta: "சைனீஸ் நூடுல்ஸ்", price: 140, type: "veg" },
//         { en: "Egg Chicken Noodles", ta: "எக் சிக்கன் நூடுல்ஸ்", price: 160, type: "non-veg" },
//         { en: "Chinese Hot Noodles", ta: "சைனீஸ் ஹாட் நூடுல்ஸ்", price: 170, type: "veg" },
//         { en: "Mutton Noodles", ta: "மட்டன் நூடுல்ஸ்", price: 180, type: "non-veg" },
//         { en: "Prawn Noodles", ta: "இறால் நூடுல்ஸ்", price: 220, type: "non-veg" },
//       ],
//     },
//     {
//       title: { en: "Rice Varieties", ta: "ரைஸ் வகைகள்" },
//       image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
//       items: [
//         { en: "White Rice", ta: "ஒயிட் ரைஸ்", price: 60, type: "veg" },
//         { en: "Ghee Rice", ta: "கீ ரைஸ்", price: 140, type: "veg" },
//         { en: "Schezwan Egg Rice", ta: "செஸ்வான் எக் ரைஸ்", price: 160, type: "non-veg" },
//         { en: "Chicken Fried Rice", ta: "சிக்கன் ஃப்ரைடு ரைஸ்", price: 180, type: "non-veg" },
//         { en: "Schezwan Chicken Rice", ta: "செஸ்வான் சிக்கன் ரைஸ்", price: 210, type: "non-veg" },
//         { en: "Fish Fried Rice", ta: "மீன் ஃப்ரைடு ரைஸ்", price: 230, type: "non-veg" },
//         { en: "Mutton Fried Rice", ta: "மட்டன் ஃப்ரைடு ரைஸ்", price: 240, type: "non-veg" },
//         { en: "Schezwan Fish Rice", ta: "செஸ்வான் ஃபிஷ் ரைஸ்", price: 250, type: "non-veg" },
//         { en: "Prawn Fried Rice", ta: "இறால் ஃப்ரைடு ரைஸ்", price: 260, type: "non-veg" },
//         { en: "Schezwan Mutton Rice", ta: "செஸ்வான் மட்டன் ரைஸ்", price: 270, type: "non-veg" },
//         { en: "Mixed Fried Rice", ta: "மிக்ஸ்டு ஃப்ரைடு ரைஸ்", price: 280, type: "non-veg" },
//         { en: "Schezwan Prawn Rice", ta: "செஸ்வான் பிரான் ரைஸ்", price: 290, type: "non-veg" },
//       ],
//     },
//     {
//       title: { en: "Fry Varieties", ta: "ஃப்ரை வகைகள்" },
//       image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=1200&auto=format&fit=crop",
//       items: [
//         { en: "Chicken Fry", ta: "சிக்கன் ஃப்ரை", price: 180, type: "non-veg" },
//         { en: "Egg Manchurian", ta: "எக் மஞ்சூரியன்", price: 180, type: "non-veg" },
//         { en: "Egg Spring Roll", ta: "எக் ஸ்ப்ரிங் ரோல்", price: 160, type: "non-veg" },
//         { en: "Chicken 65", ta: "சிக்கன் 65", price: 220, type: "non-veg" },
//         { en: "Ginger Chicken", ta: "ஜிஞ்சர் சிக்கன்", price: 230, type: "non-veg" },
//         { en: "Green Chicken", ta: "கிரீன் சிக்கன்", price: 240, type: "non-veg" },
//         { en: "Chicken Spring Roll", ta: "சிக்கன் ஸ்பிரிங் ரோல்", price: 240, type: "non-veg" },
//         { en: "Fry Varieties", ta: "பெப்பர் சிக்கன்", price: 250, type: "non-veg" },
//         { en: "Butter Chicken Masala", ta: "பட்டர் சிக்கன் மசாலா", price: 260, type: "non-veg" },
//         { en: "Chicken Sukka", ta: "சிக்கன் சுக்கா", price: 260, type: "non-veg" },
//         { en: "Chicken Manchurian", ta: "சிக்கன் மஞ்சூரியன்", price: 260, type: "non-veg" },
//         { en: "Chicken Sukka Fry", ta: "சிக்கன் சுக்கா ஃப்ரை", price: 280, type: "non-veg" },
//         { en: "Ginger Fish", ta: "ஜிஞ்சர் ஃபிஷ்", price: 280, type: "non-veg" },
//         { en: "Chicken Lollipop", ta: "சிக்கன் லாலிபாப்", price: 280, type: "non-veg" },
//         { en: "Chilli Fish", ta: "சில்லி ஃபிஷ்", price: 290, type: "non-veg" },
//         { en: "Quail 65", ta: "காடை 65", price: 300, type: "non-veg" },
//         { en: "Hong Kong Chicken", ta: "ஹாங்காங் சிக்கன்", price: 300, type: "non-veg" },
//         { en: "Quail Fry", ta: "காடை ஃப்ரை", price: 320, type: "non-veg" },
//         { en: "Chicken Tandoori", ta: "சிக்கன் தந்தூரி", price: 320, type: "non-veg" },
//         { en: "Grill Chicken", ta: "கிரில் சிக்கன்", price: 350, type: "non-veg" },
//         { en: "Prawn Manchurian", ta: "பிரான் மஞ்சூரியன்", price: 350, type: "non-veg" },
//         { en: "Ginger Garlic Prawn", ta: "ஜிஞ்சர் கார்லிக் பிரான்", price: 370, type: "non-veg" },
//       ],
//     },
//     {
//       title: { en: "Quail Varieties", ta: "காடை வகைகள்" },
//       image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
//       items: [
//         { en: "Quail Gravy", ta: "காடை கிரேவி", price: 260, type: "non-veg" },
//         { en: "Quail Curry", ta: "காடை குழம்பு", price: 280, type: "non-veg" },
//         { en: "Quail Pepper Masala", ta: "காடை பெப்பர் மசாலா", price: 320, type: "non-veg" },
//         { en: "Quail Fry", ta: "காடை வறுவல்", price: 340, type: "non-veg" },
//         { en: "Quail Roast", ta: "காடை ரோஸ்ட்", price: 360, type: "non-veg" },
//       ],
//     },
//     {
//       title: { en: "Egg Varieties", ta: "முட்டை வகைகள்" },
//       image: Egg,
//       items: [
//         { en: "Egg Kalakki", ta: "முட்டை கலக்கி", price: 90, type: "non-veg" },
//         { en: "Egg Fry", ta: "முட்டை வறுவல்", price: 100, type: "non-veg" },
//         { en: "Onion Omelette", ta: "ஆனியன் ஆம்லெட்", price: 110, type: "non-veg" },
//         { en: "Egg Curry", ta: "முட்டை குழம்பு", price: 120, type: "non-veg" },
//         { en: "Egg Masala", ta: "முட்டை மசாலா", price: 140, type: "non-veg" },
//         { en: "Egg Aviyal", ta: "முட்டை அவியல்", price: 150, type: "non-veg" },
//         { en: "Cheese Omelette", ta: "சீஸ் ஆம்லெட்", price: 160, type: "non-veg" },
//         { en: "Egg Masala Podimas", ta: "முட்டை மசாலா பொடிமாஸ்", price: 170, type: "non-veg" },
//       ],
//     },
//     {
//       title: { en: "Snacks Varieties", ta: "கார வகைகள்" },
//       image: snacks,
//       items: [
//         { en: "Cutlet", ta: "கட்லெட்", price: 40, type: "veg" },
//         { en: "Potato Chips", ta: "உருளை சிப்ஸ்", price: 40, type: "veg" },
//         { en: "Stick Chips", ta: "குச்சி சிப்ஸ்", price: 45, type: "veg" },
//         { en: "Masala Groundnut", ta: "மசாலா வேர்க்கடலை", price: 45, type: "veg" },
//         { en: "Onion Pakoda", ta: "ஆனியன் பக்கோடா", price: 50, type: "veg" },
//         { en: "Kara Sev", ta: "கார சேவ்", price: 50, type: "veg" },
//         { en: "Soft Pakoda", ta: "மெது பக்கோடா", price: 55, type: "veg" },
//         { en: "Kara Boondi", ta: "கார பூந்தி", price: 55, type: "veg" },
//         { en: "Nendram Chips", ta: "நேந்திரம் சிப்ஸ்", price: 60, type: "veg" },
//         { en: "Veg Roll", ta: "வெஜ் ரோல்", price: 60, type: "veg" },
//         { en: "Mixture", ta: "மிச்சர்", price: 65, type: "veg" },
//         { en: "Cauliflower Pakoda", ta: "காலிஃப்ளவர் பக்கோடா", price: 70, type: "veg" },
//         { en: "Veg Spring Roll", ta: "வெஜ் ஸ்ப்ரிங் ரோல்", price: 80, type: "veg" },
//         { en: "Veg Fish Fry", ta: "வெஜ் மீன் வருவல்", price: 85, type: "veg" },
//         { en: "Paneer Roll", ta: "பன்னீர் ரோல்", price: 90, type: "veg" },
//         { en: "Cashew Pakoda", ta: "முந்திரி பக்கோடா", price: 120, type: "veg" },
//       ],
//     },
//     {
//       title: { en: "Ice Cream Varieties", ta: "ஐஸ்கிரீம் வகைகள்" },
//       image: Icecream,
//       items: [
//         { en: "Vanilla Ice Cream", ta: "வெண்ணிலா ஐஸ்கிரீம்", price: 40, type: "veg" },
//         { en: "Cone Ice Cream", ta: "கோன் ஐஸ்கிரீம்", price: 45, type: "veg" },
//         { en: "Strawberry Ice Cream", ta: "ஸ்ட்ராபெரி ஐஸ்கிரீம்", price: 50, type: "veg" },
//         { en: "Chocolate Ice Cream", ta: "சாக்லேட் ஐஸ்கிரீம்", price: 60, type: "veg" },
//         { en: "Butter Scotch Ice Cream", ta: "பட்டர் ஸ்காட்ச் ஐஸ்கிரீம்", price: 65, type: "veg" },
//         { en: "Kulfi Ice Cream", ta: "குல்பி ஐஸ்கிரீம்", price: 70, type: "veg" },
//         { en: "Pista Ice Cream", ta: "பிஸ்தா ஐஸ்கிரீம்", price: 75, type: "veg" },
//         { en: "Cassata Ice Cream", ta: "கசாட்டா ஐஸ்கிரீம்", price: 80, type: "veg" },
//       ],
//     },
//     {
//       title: { en: "Beeda Varieties", ta: "பீடா வகைகள்" },
//       image: Paan,
//       items: [
//         { en: "Betel Leaf, Areca Nut & Lime", ta: "வெற்றிலை, பாக்கு, சுண்ணாம்பு", price: 10, type: "veg" },
//         { en: "Beeda", ta: "பீடா", price: 15, type: "veg" },
//         { en: "Sweet Beeda", ta: "ஸ்வீட் பீடா", price: 25, type: "veg" },
//         { en: "Kolkata Beeda", ta: "கல்கத்தா பீடா", price: 40, type: "veg" },
//         { en: "Special Nuts Beeda", ta: "ஸ்பெஷல் நட்ஸ் பீடா", price: 60, type: "veg" },
//       ],
//     },
//     {
//       title: { en: "Turkey Varieties", ta: "வான்கோழி வகைகள்" },
//       image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",
//       items: [
//         { en: "Turkey Soup", ta: "வான்கோழி சூப்", price: 180, type: "non-veg" },
//         { en: "Turkey Gravy", ta: "வான்கோழி கிரேவி", price: 300, type: "non-veg" },
//         { en: "Turkey Curry", ta: "வான்கோழி குழம்பு", price: 320, type: "non-veg" },
//         { en: "Turkey Chilli", ta: "வான்கோழி சில்லி", price: 350, type: "non-veg" },
//         { en: "Pepper Turkey Fry", ta: "மிளகு வான்கோழி வறுவல்", price: 380, type: "non-veg" },
//       ],
//     }
//   ]
// };

// export default specialMenus;


// // import biryaniImg from "../Images/pulao.webp";
// // import Payasam from "../Images/payasam.webp";
// // import Noodles from "../Images/Noodels.webp";
// // import Paan from "../Images/paan.webp";
// // import Icecream from "../Images/Icecream.webp";
// // import Roti from "../Images/Roti.webp";
// // import fish from "../Images/fish.webp";
// // import Egg from "../Images/egg.webp";
// // import grab from "../Images/grab.webp";
// // import Soup from "../Images/soup.webp";
// // import snacks from "../Images/snakcs.webp";
// // import Sweets from "../Images/Sweets.webp";
// // import chettinad from "../Images/chettinad.webp";

// // const specialMenus = {
// //   /* ==========================================================================
// //      1. BREAKFAST ITEMS
// //      ========================================================================== */
// //   Breakfast: [
// //     {
// //       title: { en: "Idly Varieties", ta: "இட்லி வகைகள்" },
// //       image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=1200&auto=format&fit=crop",
// //       items: [
// //         { en: "Plain Idly", ta: "சாதா இட்லி", price: 30 },
// //         { en: "Coriander Idly", ta: "மல்லி இட்லி", price: 40 },
// //         { en: "Hardin Idly", ta: "ஹார்டின் இட்லி", price: 45 },
// //         { en: "Rava Idly", ta: "ரவா இட்லி", price: 45 },
// //         { en: "Cup Idly", ta: "கப்பு இட்லி", price: 50 },
// //         { en: "Star Idly", ta: "ஸ்டார் இட்லி", price: 55 },
// //         { en: "Plate Idly", ta: "தட்டு இட்லி", price: 60 },
// //         { en: "Kanchipuram Idly", ta: "காஞ்சிபுரம் இட்லி", price: 65 },
// //         { en: "Kuzhi Paniyaram", ta: "குழி பணியாரம்", price: 70 },
// //         { en: "Kulfi Idly", ta: "குல்பி இட்லி", price: 70 },
// //         { en: "Ghee Mini Idly", ta: "நெய் மினி இட்லி", price: 80 },
// //         { en: "Kuzhai Puttu", ta: "குழாய் புட்டு", price: 85 },
// //         { en: "Masala Idly", ta: "மசாலா இட்லி", price: 90 },
// //         { en: "Appam", ta: "ஆப்பம்", price: 40 },
// //         { en: "Idiyappam with Coconut Milk", ta: "இடியாப்பம் + தேங்காய் பால்", price: 90 },
// //         { en: "Tender Coconut Idly", ta: "இளநீர் இட்லி", price: 95 },
// //       ],
// //     },
// //     {
// //       title: { en: "Payasam Varieties", ta: "பாயாசம் வகைகள்" },
// //       image: Payasam,
// //       items: [
// //         { en: "Sago Payasam", ta: "ஜவ்வரிசி பாயாசம்", price: 80 },
// //         { en: "Rava Payasam", ta: "ரவை பாயாசம்", price: 80 },
// //         { en: "Semiya Payasam", ta: "சேமியா பாயாசம்", price: 85 },
// //         { en: "Rice Payasam", ta: "அரிசி பாயாசம்", price: 85 },
// //         { en: "Milk Payasam", ta: "பால் பாயாசம்", price: 90 },
// //         { en: "Aval Payasam", ta: "அவுல் பாயாசம்", price: 90 },
// //         { en: "Bottle Gourd Payasam", ta: "சுரைக்காய் பாயாசம்", price: 95 },
// //         { en: "Dal Payasam", ta: "பருப்பு பாயாசம்", price: 95 },
// //         { en: "Sago Semiya Payasam", ta: "ஜவ்வரிசி சேமியா பாயாசம்", price: 100 },
// //         { en: "Green Gram Payasam", ta: "பாசி பருப்பு பாயாசம்", price: 110 },
// //         { en: "Basmati Payasam", ta: "பாசுமதி பாயாசம்", price: 120 },
// //         { en: "Red Rice Payasam", ta: "சிவப்பரிசி பாயாசம்", price: 130 },
// //         { en: "Tender Coconut Payasam", ta: "இளநீர் பாயாசம்", price: 140 },
// //         { en: "Palada Pradhaman Payasam", ta: "பாலடை பிரதமன் பாயாசம்", price: 150 },
// //         { en: "Chettinad Fruit Payasam", ta: "செட்டிநாடு பழ பாயாசம்", price: 160 },
// //         { en: "Black Kavuni Rice Payasam", ta: "கவுனி அரிசி பாயாசம்", price: 180 },
// //       ],
// //     },
// //     {
// //       title: { en: "Sweets", ta: "ஸ்வீட்ஸ்" },
// //       image: Sweets,
// //       items: [
// //         { en: "Gulab Jamun (Round)", ta: "குலோப் ஜாம் (ரவுண்ட்)", price: 40 },
// //         { en: "Rasgulla", ta: "ரசகுல்லா", price: 45 },
// //         { en: "Bengali Sweet", ta: "பெங்காலி", price: 50 },
// //         { en: "Dry Jamun", ta: "ட்ரை ஜாமுன் (நீட்டு)", price: 50 },
// //         { en: "Mini Boondi Laddu", ta: "மினி பூந்தி லட்டு", price: 55 },
// //         { en: "Rasmalai", ta: "ரசமலாய்", price: 60 },
// //         { en: "Large Jangiri", ta: "பெரிய ஜாங்கிரி", price: 60 },
// //         { en: "Agra Paan", ta: "ஆகரா பான்", price: 70 },
// //         { en: "Makkan Peda", ta: "மக்கன் பேடா", price: 70 },
// //         { en: "China Stores Sweet", ta: "சீனா ஸ்டோர்ஸ்", price: 90 },
// //         { en: "Godhi Halwa", ta: "கோதி அல்வா", price: 90 },
// //         { en: "Mothi Paagu", ta: "மோதி பாகு", price: 95 },
// //         { en: "Anarkali", ta: "அனார்கலி", price: 100 },
// //         { en: "Malai Cream Roll", ta: "மலாய் கிரீம் ரோல்", price: 110 },
// //         { en: "Badam Halwa", ta: "பாதாம் அல்வா", price: 120 },
// //         { en: "Malai Sandwich", ta: "மலாய் சாண்ட்விச்", price: 120 },
// //         { en: "Litchi Labdi", ta: "லிச்சி லப்டி", price: 130 },
// //         { en: "Pista Roll", ta: "பிஸ்தா ரோல்", price: 140 },
// //         { en: "Dry Fruit Halwa", ta: "ட்ரை ஃப்ரூட் அல்வா", price: 150 },
// //         { en: "Cashew Pista Roll", ta: "முந்திரி பிஸ்தா ரோல்", price: 160 },
// //       ],
// //     },
// //     {
// //       title: { en: "Soup Varieties", ta: "சூப் வகைகள்" },
// //       image: Soup,
// //       items: [
// //         { en: "Hot Pepper Water Soup", ta: "ஹாட் மிளகுதண்ணி சூப்", price: 70 },
// //         { en: "Tomato Soup", ta: "தக்காளி சூப்", price: 80 },
// //         { en: "Sweet Corn Soup", ta: "ஸ்வீட் கார்ன் சூப்", price: 90 },
// //         { en: "Vegetable Clear Soup", ta: "வெஜிடபிள் கிளியர் சூப்", price: 90 },
// //         { en: "Baby Corn Soup", ta: "பேபி கார்ன் சூப்", price: 100 },
// //         { en: "Lemon Coriander Soup", ta: "லெமன் கொரியாண்டர் சூப்", price: 100 },
// //         { en: "Noodles Soup", ta: "நூடுல்ஸ் சூப்", price: 110 },
// //         { en: "Herbal Soup", ta: "ஹெர்பல்ஸ் சூப்", price: 120 },
// //         { en: "Mushroom Soup", ta: "மஷ்ரூம் சூப்", price: 130 },
// //       ],
// //     }
// //   ],

// //   /* ==========================================================================
// //      2. LUNCH ITEMS
// //      ========================================================================== */
// //   Lunch: [
// //     {
// //       title: { en: "Biryani Varieties", ta: "பிரியாணி வகைகள்" },
// //       image: biryaniImg,
// //       items: [
// //         { en: "Egg Biryani", ta: "முட்டை பிரியாணி", price: 180 },
// //         { en: "Chettinad Seeraga Samba Chicken Biryani", ta: "செட்டிநாட்டு சீரக சம்பா சிக்கன் பிரியாணி", price: 220 },
// //         { en: "Hyderabadi Chicken Biryani", ta: "ஹைதராபாத் சிக்கன் பிரியாணி", price: 240 },
// //         { en: "Fish Biryani", ta: "மீன் பிரியாணி", price: 260 },
// //         { en: "Mutton Biryani", ta: "மட்டன் பிரியாணி", price: 280 },
// //         { en: "Country Chicken Biryani", ta: "நாட்டுக்கோழி பிரியாணி", price: 300 },
// //         { en: "Hyderabadi Mutton Biryani", ta: "ஹைதராபாத் மட்டன் பிரியாணி", price: 320 },
// //         { en: "Prawn Biryani", ta: "இறால் பிரியாணி", price: 340 },
// //         { en: "Quail Biryani", ta: "காடை பிரியாணி", price: 350 },
// //         { en: "Turkey Biryani", ta: "வான்கோழி பிரியாணி", price: 360 },
// //         { en: "Mutton Leg Biryani", ta: "ஆட்டுக்கால் பிரியாணி", price: 420 },
// //       ],
// //     },
// //     {
// //       title: { en: "Mixed Rice Varieties", ta: "கலவை சாதம் வகைகள்" },
// //       image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
// //       items: [
// //         { en: "White Rice", ta: "வெள்ளை சாதம்", price: 60 },
// //         { en: "Curd Rice", ta: "தயிர் சாதம்", price: 90 },
// //         { en: "Tamarind Rice", ta: "புளி சாதம்", price: 100 },
// //         { en: "Tomato Rice", ta: "தக்காளி சாதம்", price: 100 },
// //         { en: "Curry Leaves Rice", ta: "கருவேப்பிலை சாதம்", price: 105 },
// //         { en: "Bhagala Bath", ta: "பகாளா பாத்", price: 110 },
// //         { en: "Sesame Rice", ta: "எள்ளu சாதம்", price: 110 },
// //         { en: "Mango Rice", ta: "மாங்காய் சாதம்", price: 110 },
// //         { en: "Bisi Bele Bath", ta: "பிசிபேளா பாத்", price: 120 },
// //         { en: "Coconut Rice", ta: "தேங்காய் சாதம்", price: 120 },
// //         { en: "Mint Rice", ta: "புதினா சாதம்", price: 120 },
// //         { en: "Sweet Pongal", ta: "சர்க்கரை பொங்கல்", price: 130 },
// //         { en: "Vatha Kuzhambu Rice", ta: "வத்த குழம்பு சாதம்", price: 130 },
// //         { en: "Kalkandu Bath", ta: "கல்கண்டு பாத்", price: 140 },
// //         { en: "Brinji Rice", ta: "பிரிஞ்சி சாதம்", price: 140 },
// //       ],
// //     },
// //     {
// //       title: { en: "Fish Varieties", ta: "மீன் வகைகள்" },
// //       image: fish,
// //       items: [
// //         { en: "Fish Cutlet", ta: "மீன் கட்லெட்", price: 180 },
// //         { en: "Fish Curry", ta: "மீன் குழம்பு", price: 240 },
// //         { en: "Fish Poriyal", ta: "மீன் பொறியல்", price: 250 },
// //         { en: "Fish Thokku", ta: "மீன் தொக்கு", price: 260 },
// //         { en: "Anchovy Fish Curry", ta: "நெத்திலி மீன் குழம்பு", price: 280 },
// //         { en: "Fish Puttu Curry", ta: "மீன் புட்டுக்கறி", price: 290 },
// //         { en: "Fish Fry", ta: "மீன் வறுவல்", price: 320 },
// //         { en: "Spicy Tamarind Fish Fry", ta: "மீன் புளி வறுவல்", price: 340 },
// //         { en: "Fish Roast", ta: "மீன் ரோஸ்ட்", price: 360 },
// //       ],
// //     },
// //     {
// //       title: { en: "Crab Varieties", ta: "நண்டு வகைகள்" },
// //       image: grab,
// //       items: [
// //         { en: "Crab Rasam", ta: "நண்டு ரசம்", price: 220 },
// //         { en: "Crab Pepper Soup", ta: "நண்டு மிளகு சூப்", price: 260 },
// //         { en: "Crab Gravy", ta: "நண்டு கிரேவி", price: 350 },
// //         { en: "Crab Masala Curry", ta: "நண்டு மசாலா குழம்பு", price: 380 },
// //         { en: "Crab Fry", ta: "நண்டு வறுவல்", price: 400 },
// //         { en: "Chettinad Crab Curry", ta: "செட்டிநாட்டு நண்டு குழம்பு", price: 420 },
// //         { en: "Coconut Pepper Crab", ta: "தேங்காய் மிளகு நண்டு", price: 450 },
// //         { en: "Crab Fry Special", ta: "நண்டு ஃப்ரை", price: 480 },
// //       ],
// //     },
// //     {
// //       title: { en: "Prawn Varieties", ta: "இறால் வகைகள்" },
// //       image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=1200&auto=format&fit=crop",
// //       items: [
// //         { en: "Prawn Gravy", ta: "இறால் கிரேவி", price: 300 },
// //         { en: "Prawn Curry", ta: "இறால் குழம்பு", price: 320 },
// //         { en: "Prawn Podimas", ta: "இறால் பொடிமாஸ்", price: 330 },
// //         { en: "Prawn Tamarind Curry", ta: "இறால் புளி குழம்பு", price: 340 },
// //         { en: "Prawn Thokku", ta: "இறால் தொக்கு", price: 350 },
// //         { en: "Prawn Masala Curry", ta: "இறால் மசாலா கறி", price: 360 },
// //         { en: "Prawn Coconut Roast", ta: "இறால் தேங்காய் பிரட்டல்", price: 380 },
// //         { en: "Butter Prawn Egg Masala", ta: "பட்டர் இறால் முட்டை மசாலா", price: 400 },
// //       ],
// //     },
// //     {
// //       title: { en: "Chettinad Special", ta: "செட்டிநாடு ஸ்பெஷல்" },
// //       image: chettinad,
// //       items: [
// //         { en: "Poli", ta: "போலி", price: 50 },
// //         { en: "Suzhiyam", ta: "சுழியம்", price: 60 },
// //         { en: "Kalkandu Vadai", ta: "கல்கண்டு வடை", price: 65 },
// //         { en: "Kandharappam", ta: "கந்தர்ப்பம்", price: 70 },
// //         { en: "White Paniyaram", ta: "வெள்ளை பணியாரம்", price: 70 },
// //         { en: "Crushed Pidi Kozhukattai", ta: "இடிச்ச புடி கொழுக்கட்டை", price: 70 },
// //         { en: "Milk Paniyaram", ta: "பால் பணியாரம்", price: 75 },
// //         { en: "Erukkala Kozhukattai", ta: "எருக்கல கொழுக்கட்டை", price: 75 },
// //         { en: "Sweet Kuzhi Paniyaram", ta: "இனிப்பு குழி பணியாரம்", price: 80 },
// //         { en: "Ukkarai", ta: "உக்கரா", price: 85 },
// //         { en: "Pooranam Kozhukattai", ta: "பூரணம் கொழுக்கட்டை", price: 85 },
// //         { en: "Aadi Kummayam", ta: "ஆடி கும்மாயம்", price: 90 },
// //         { en: "Milk Kozhukattai", ta: "பால் கொழுக்கட்டை", price: 90 },
// //         { en: "Puli Kuzhambu", ta: "புளிக்குழம்பு", price: 100 },
// //         { en: "Manavalam", ta: "மணவளம்", price: 100 },
// //         { en: "Oil Brinjal Kuzhambu", ta: "எண்ணெய் கத்திரிக்காய் குழம்பு", price: 110 },
// //         { en: "Garlic Kuzhambu", ta: "பூண்டு குழம்பு", price: 110 },
// //         { en: "Sunda Vatha Kuzhambu", ta: "சுண்ட வத்த குழம்பு", price: 115 },
// //         { en: "Thanjavur Arachi Vitta Sambar", ta: "தஞ்சாவூர் அரைச்சி விட்ட சாம்பார்", price: 120 },
// //         { en: "Pakoda Kuzhambu", ta: "பக்கோடா குழம்பு", price: 120 },
// //         { en: "Vandikkaran Kara Kuzhambu", ta: "வண்டிக்காரன் காரக்குழம்பு", price: 130 },
// //         { en: "Veg Fish Kuzhambu", ta: "பொய் மீன் குழம்பு", price: 130 },
// //         { en: "Black Kavuni Rice", ta: "கருப்பு கவுனி அரிசி", price: 140 },
// //         { en: "Urundai Kuzhambu", ta: "உருண்டை குழம்பு", price: 140 },
// //         { en: "Chettinad Kara Kuzhambu", ta: "செட்டிநாட்டு கார குழம்பு", price: 145 },
// //         { en: "Chettinad Wedding Sambar", ta: "செட்டிநாட்டு கல்யாண சாம்பார்", price: 150 },
// //       ],
// //     },
// //     {
// //       title: { en: "Pickle Varieties", ta: "ஊறுகாய் வகைகள்" },
// //       image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=1200&auto=format&fit=crop",
// //       items: [
// //         { en: "Lemon Pickle", ta: "எலுமிச்சை ஊறுகாய்", price: 35 },
// //         { en: "Mango Pickle", ta: "மாங்காய் ஊறுகாய்", price: 40 },
// //         { en: "Green Chilli Pickle", ta: "பச்சை மிளகாய் ஊறுகாய்", price: 45 },
// //         { en: "Ginger Pickle", ta: "இஞ்சி ஊறுகாய்", price: 50 },
// //         { en: "Garlic Pickle", ta: "பூண்டு ஊறுகாய்", price: 60 },
// //       ],
// //     },
// //   ],

// //   /* ==========================================================================
// //      3. DINNER ITEMS
// //      ========================================================================== */
// //   Dinner: [
// //     {
// //       title: { en: "Roti Varieties", ta: "ரோட்டி வகைகள்" },
// //       image: Roti,
// //       items: [
// //         { en: "Parotta", ta: "பரோட்டா", price: 20 },
// //         { en: "Veechu Parotta", ta: "வீச் பரோட்டா", price: 30 },
// //         { en: "Naan", ta: "நான்", price: 35 },
// //         { en: "Bun Parotta", ta: "பன் பரோட்டா", price: 35 },
// //         { en: "Lappa Parotta", ta: "லாப்பா பரோட்டா", price: 40 },
// //         { en: "Nool Parotta", ta: "நூல் பரோட்டா", price: 45 },
// //         { en: "Butter Naan", ta: "பட்டர் நான்", price: 50 },
// //         { en: "Egg Parotta", ta: "முட்டை பரோட்டா", price: 60 },
// //         { en: "Egg Veechu Parotta", ta: "முட்டை வீச் பரோட்டா", price: 70 },
// //         { en: "Egg Lappa Parotta", ta: "முட்டை லாப்பா பரோட்டா", price: 80 },
// //         { en: "Chilli Parotta", ta: "சில்லி பரோட்டா", price: 110 },
// //         { en: "Chicken Parotta", ta: "சிக்கன் பரோட்டா", price: 120 },
// //         { en: "Chicken Lappa Parotta", ta: "சிக்கன் லாப்பா பரோட்டா", price: 140 },
// //         { en: "Chicken Kothu Parotta", ta: "சிக்கன் கொத்து பரோட்டா", price: 160 },
// //       ],
// //     },
// //     {
// //       title: { en: "Noodles Varieties", ta: "நூடுல்ஸ் வகைகள்" },
// //       image: Noodles,
// //       items: [
// //         { en: "Egg Noodles", ta: "எக் நூடுல்ஸ்", price: 100 },
// //         { en: "Chicken Noodles", ta: "சிக்கன் நூடுல்ஸ்", price: 120 },
// //         { en: "Dry Noodles", ta: "ட்ரை நூடுல்ஸ்", price: 130 },
// //         { en: "Chinese Noodles", ta: "சைனீஸ் நூடுல்ஸ்", price: 140 },
// //         { en: "Egg Chicken Noodles", ta: "எக் சிக்கன் நூடுல்ஸ்", price: 160 },
// //         { en: "Chinese Hot Noodles", ta: "சைனீஸ் ஹாட் நூடுல்ஸ்", price: 170 },
// //         { en: "Mutton Noodles", ta: "மட்டன் நூடுல்ஸ்", price: 180 },
// //         { en: "Prawn Noodles", ta: "இறால் நூடுல்ஸ்", price: 220 },
// //       ],
// //     },
// //     {
// //       title: { en: "Rice Varieties", ta: "ரைஸ் வகைகள்" },
// //       image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
// //       items: [
// //         { en: "White Rice", ta: "ஒயிட் ரைஸ்", price: 60 },
// //         { en: "Ghee Rice", ta: "கீ ரைஸ்", price: 140 },
// //         { en: "Schezwan Egg Rice", ta: "செஸ்வான் எக் ரைஸ்", price: 160 },
// //         { en: "Chicken Fried Rice", ta: "சிக்கன் ஃப்ரைடு ரைஸ்", price: 180 },
// //         { en: "Schezwan Chicken Rice", ta: "செஸ்வான் சிக்கன் ரைஸ்", price: 210 },
// //         { en: "Fish Fried Rice", ta: "மீன் ஃப்ரைடு ரைஸ்", price: 230 },
// //         { en: "Mutton Fried Rice", ta: "மட்டன் ஃப்ரைடு ரைஸ்", price: 240 },
// //         { en: "Schezwan Fish Rice", ta: "செஸ்வான் ஃபிஷ் ரைஸ்", price: 250 },
// //         { en: "Prawn Fried Rice", ta: "இறால் ஃப்ரைடு ரைஸ்", price: 260 },
// //         { en: "Schezwan Mutton Rice", ta: "செஸ்வான் மட்டன் ரைஸ்", price: 270 },
// //         { en: "Mixed Fried Rice", ta: "மிக்ஸ்டு ஃப்ரைடு ரைஸ்", price: 280 },
// //         { en: "Schezwan Prawn Rice", ta: "செஸ்வான் பிரான் ரைஸ்", price: 290 },
// //       ],
// //     },
// //     {
// //       title: { en: "Fry Varieties", ta: "ஃப்ரை வகைகள்" },
// //       image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=1200&auto=format&fit=crop",
// //       items: [
// //         { en: "Chicken Fry", ta: "சிக்கன் ஃப்ரை", price: 180 },
// //         { en: "Egg Manchurian", ta: "எக் மஞ்சூரியன்", price: 180 },
// //         { en: "Egg Spring Roll", ta: "எக் ஸ்ப்ரிங் ரோல்", price: 160 },
// //         { en: "Chicken 65", ta: "சிக்கன் 65", price: 220 },
// //         { en: "Ginger Chicken", ta: "ஜிஞ்சர் சிக்கன்", price: 230 },
// //         { en: "Green Chicken", ta: "கிரீன் சிக்கன்", price: 240 },
// //         { en: "Chicken Spring Roll", ta: "சிக்கன் ஸ்பிரிங் ரோல்", price: 240 },
// //         { en: "Fry Varieties", ta: "பெப்பர் சிக்கன்", price: 250 },
// //         { en: "Butter Chicken Masala", ta: "பட்டர் சிக்கன் மசாலா", price: 260 },
// //         { en: "Chicken Sukka", ta: "சிக்கன் சுக்கா", price: 260 },
// //         { en: "Chicken Manchurian", ta: "சிக்கன் மஞ்சூரியன்", price: 260 },
// //         { en: "Chicken Sukka Fry", ta: "சிக்கன் சுக்கா ஃப்ரை", price: 280 },
// //         { en: "Ginger Fish", ta: "ஜிஞ்சர் ஃபிஷ்", price: 280 },
// //         { en: "Chicken Lollipop", ta: "சிக்கன் லாலிபாப்", price: 280 },
// //         { en: "Chilli Fish", ta: "சில்லி ஃபிஷ்", price: 290 },
// //         { en: "Quail 65", ta: "காடை 65", price: 300 },
// //         { en: "Hong Kong Chicken", ta: "ஹாங்காங் சிக்கன்", price: 300 },
// //         { en: "Quail Fry", ta: "காடை ஃப்ரை", price: 320 },
// //         { en: "Chicken Tandoori", ta: "சிக்கன் தந்தூரி", price: 320 },
// //         { en: "Grill Chicken", ta: "கிரில் சிக்கன்", price: 350 },
// //         { en: "Prawn Manchurian", ta: "பிரான் மஞ்சூரியன்", price: 350 },
// //         { en: "Ginger Garlic Prawn", ta: "ஜிஞ்சர் கார்லிக் பிரான்", price: 370 },
// //       ],
// //     },
// //     {
// //       title: { en: "Quail Varieties", ta: "காடை வகைகள்" },
// //       image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
// //       items: [
// //         { en: "Quail Gravy", ta: "காடை கிரேவி", price: 260 },
// //         { en: "Quail Curry", ta: "காடை குழம்பு", price: 280 },
// //         { en: "Quail Pepper Masala", ta: "காடை பெப்பர் மசாலா", price: 320 },
// //         { en: "Quail Fry", ta: "காடை வறுவல்", price: 340 },
// //         { en: "Quail Roast", ta: "காடை ரோஸ்ட்", price: 360 },
// //       ],
// //     },
// //     {
// //       title: { en: "Egg Varieties", ta: "முட்டை வகைகள்" },
// //       image: Egg,
// //       items: [
// //         { en: "Egg Kalakki", ta: "முட்டை கலக்கி", price: 90 },
// //         { en: "Egg Fry", ta: "முட்டை வறுவல்", price: 100 },
// //         { en: "Onion Omelette", ta: "ஆனியன் ஆம்லெட்", price: 110 },
// //         { en: "Egg Curry", ta: "முட்டை குழம்பு", price: 120 },
// //         { en: "Egg Masala", ta: "முட்டை மசாலா", price: 140 },
// //         { en: "Egg Aviyal", ta: "முட்டை அவியல்", price: 150 },
// //         { en: "Cheese Omelette", ta: "சீஸ் ஆம்லெட்", price: 160 },
// //         { en: "Egg Masala Podimas", ta: "முட்டை மசாலா பொடிமாஸ்", price: 170 },
// //       ],
// //     },
// //     {
// //       title: { en: "Snacks Varieties", ta: "கார வகைகள்" },
// //       image: snacks,
// //       items: [
// //         { en: "Cutlet", ta: "கட்லெட்", price: 40 },
// //         { en: "Potato Chips", ta: "உருளை சிப்ஸ்", price: 40 },
// //         { en: "Stick Chips", ta: "குச்சி சிப்ஸ்", price: 45 },
// //         { en: "Masala Groundnut", ta: "மசாலா வேர்க்கடலை", price: 45 },
// //         { en: "Onion Pakoda", ta: "ஆனியன் பக்கோடா", price: 50 },
// //         { en: "Kara Sev", ta: "கார சேவ்", price: 50 },
// //         { en: "Soft Pakoda", ta: "மெது பக்கோடா", price: 55 },
// //         { en: "Kara Boondi", ta: "கார பூந்தி", price: 55 },
// //         { en: "Nendram Chips", ta: "நேந்திரம் சிப்ஸ்", price: 60 },
// //         { en: "Veg Roll", ta: "வெஜ் ரோல்", price: 60 },
// //         { en: "Mixture", ta: "மிச்சர்", price: 65 },
// //         { en: "Cauliflower Pakoda", ta: "காலிஃப்ளவர் பக்கோடா", price: 70 },
// //         { en: "Veg Spring Roll", ta: "வெஜ் ஸ்ப்ரிங் ரோல்", price: 80 },
// //         { en: "Veg Fish Fry", ta: "வெஜ் மீன் வருவல்", price: 85 },
// //         { en: "Paneer Roll", ta: "பன்னீர் ரோல்", price: 90 },
// //         { en: "Cashew Pakoda", ta: "முந்திரி பக்கோடா", price: 120 },
// //       ],
// //     },
// //     {
// //       title: { en: "Ice Cream Varieties", ta: "ஐஸ்கிரீம் வகைகள்" },
// //       image: Icecream,
// //       items: [
// //         { en: "Vanilla Ice Cream", ta: "வெண்ணிலா ஐஸ்கிரீம்", price: 40 },
// //         { en: "Cone Ice Cream", ta: "கோன் ஐஸ்கிரீம்", price: 45 },
// //         { en: "Strawberry Ice Cream", ta: "ஸ்ட்ராபெரி ஐஸ்கிரீம்", price: 50 },
// //         { en: "Chocolate Ice Cream", ta: "சாக்லேட் ஐஸ்கிரீம்", price: 60 },
// //         { en: "Butter Scotch Ice Cream", ta: "பட்டர் ஸ்காட்ச் ஐஸ்கிரீம்", price: 65 },
// //         { en: "Kulfi Ice Cream", ta: "குல்பி ஐஸ்கிரீம்", price: 70 },
// //         { en: "Pista Ice Cream", ta: "பிஸ்தா ஐஸ்கிரீம்", price: 75 },
// //         { en: "Cassata Ice Cream", ta: "கசாட்டா ஐஸ்கிரீம்", price: 80 },
// //       ],
// //     },
// //     {
// //       title: { en: "Beeda Varieties", ta: "பீடா வகைகள்" },
// //       image: Paan,
// //       items: [
// //         { en: "Betel Leaf, Areca Nut & Lime", ta: "வெற்றிலை, பாக்கு, சுண்ணாம்பு", price: 10 },
// //         { en: "Beeda", ta: "பீடா", price: 15 },
// //         { en: "Sweet Beeda", ta: "ஸ்வீட் பீடா", price: 25 },
// //         { en: "Kolkata Beeda", ta: "கல்கத்தா பீடா", price: 40 },
// //         { en: "Special Nuts Beeda", ta: "ஸ்பெஷல் நட்ஸ் பீடா", price: 60 },
// //       ],
// //     },
// //     {
// //       title: { en: "Turkey Varieties", ta: "வான்கோழி வகைகள்" },
// //       image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",
// //       items: [
// //         { en: "Turkey Soup", ta: "வான்கோழி சூப்", price: 180 },
// //         { en: "Turkey Gravy", ta: "வான்கோழி கிரேவி", price: 300 },
// //         { en: "Turkey Curry", ta: "வான்கோழி குழம்பு", price: 320 },
// //         { en: "Turkey Chilli", ta: "வான்கோழி சில்லி", price: 350 },
// //         { en: "Pepper Turkey Fry", ta: "மிளகு வான்கோழி வறுவல்", price: 380 },
// //       ],
// //     }
// //   ]
// // };

// // export default specialMenus;