import { useState } from "react";
import biryaniImg from "../Images/pulao.webp";
import Payasam from "../Images/payasam.webp";
function Menu() {

  const [language, setLanguage] = useState("en");

  const specialMenus = [

   {
  title: {
    en: "Noodles Varieties",
    ta: "நூடுல்ஸ் வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Chicken Noodles",
      ta: "சிக்கன் நூடுல்ஸ்",
    },

    {
      en: "Mutton Noodles",
      ta: "மட்டன் நூடுல்ஸ்",
    },

    {
      en: "Chinese Noodles",
      ta: "சைனீஸ் நூடுல்ஸ்",
    },

    {
      en: "Egg Chicken Noodles",
      ta: "எக் சிக்கன் நூடுல்ஸ்",
    },

    {
      en: "Egg Noodles",
      ta: "எக் நூடுல்ஸ்",
    },

    {
      en: "Dry Noodles",
      ta: "ட்ரை நூடுல்ஸ்",
    },

    {
      en: "Prawn Noodles",
      ta: "இறால் நூடுல்ஸ்",
    },

    {
      en: "Chinese Hot Noodles",
      ta: "சைனீஸ் ஹாட் நூடுல்ஸ்",
    },

  ],
},


{
  title: {
    en: "Beeda Varieties",
    ta: "பீடா வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Beeda",
      ta: "பீடா",
    },

    {
      en: "Sweet Beeda",
      ta: "ஸ்வீட் பீடா",
    },

    {
      en: "Kolkata Beeda",
      ta: "கல்கத்தா பீடா",
    },

    {
      en: "Special Nuts Beeda",
      ta: "ஸ்பெஷல் நட்ஸ் பீடா",
    },

    {
      en: "Betel Leaf, Areca Nut & Lime",
      ta: "வெற்றிலை, பாக்கு, சுண்ணாம்பு",
    },

  ],
},

{
  title: {
    en: "Ice Cream Varieties",
    ta: "ஐஸ்கிரீம் வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Vanilla Ice Cream",
      ta: "வெண்ணிலா ஐஸ்கிரீம்",
    },

    {
      en: "Strawberry Ice Cream",
      ta: "ஸ்ட்ராபெரி ஐஸ்கிரீம்",
    },

    {
      en: "Kulfi Ice Cream",
      ta: "குல்பி ஐஸ்கிரீம்",
    },

    {
      en: "Cone Ice Cream",
      ta: "கோன் ஐஸ்கிரீம்",
    },

    {
      en: "Butter Scotch Ice Cream",
      ta: "பட்டர் ஸ்காட்ச் ஐஸ்கிரீம்",
    },

    {
      en: "Pista Ice Cream",
      ta: "பிஸ்தா ஐஸ்கிரீம்",
    },

    {
      en: "Cassata Ice Cream",
      ta: "கசாட்டா ஐஸ்கிரீம்",
    },

    {
      en: "Chocolate Ice Cream",
      ta: "சாக்லேட் ஐஸ்கிரீம்",
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
    },

    {
      en: "Chicken 65",
      ta: "சிக்கன் 65",
    },

    {
      en: "Butter Chicken Masala",
      ta: "பட்டர் சிக்கன் மசாலா",
    },

    {
      en: "Grill Chicken",
      ta: "கிரில் சிக்கன்",
    },

    {
      en: "Green Chicken",
      ta: "கிரீன் சிக்கன்",
    },

    {
      en: "Ginger Chicken",
      ta: "ஜிஞ்சர் சிக்கன்",
    },

    {
      en: "Chicken Tandoori",
      ta: "சிக்கன் தந்தூரி",
    },

    {
      en: "Pepper Chicken",
      ta: "பெப்பர் சிக்கன்",
    },

    {
      en: "Chicken Sukka",
      ta: "சிக்கன் சுக்கா",
    },

    {
      en: "Chicken Sukka Fry",
      ta: "சிக்கன் சுக்கா ஃப்ரை",
    },

    {
      en: "Lemon Chicken",
      ta: "லெமன் சிக்கன்",
    },

    {
      en: "Soya Chicken",
      ta: "சோயா சிக்கன்",
    },

    {
      en: "Quail 65",
      ta: "காடை 65",
    },

    {
      en: "Quail Fry",
      ta: "காடை ஃப்ரை",
    },

    {
      en: "Ginger Fish",
      ta: "ஜிஞ்சர் ஃபிஷ்",
    },

    {
      en: "Chilli Fish",
      ta: "சில்லி ஃபிஷ்",
    },

    {
      en: "Prawn Manchurian",
      ta: "பிரான் மஞ்சூரியன்",
    },

    {
      en: "Ginger Garlic Prawn",
      ta: "ஜிஞ்சர் கார்லிக் பிரான்",
    },

    {
      en: "Egg Manchurian",
      ta: "எக் மஞ்சூரியன்",
    },

    {
      en: "Egg Spring Roll",
      ta: "எக் ஸ்ப்ரிங் ரோல்",
    },

    {
      en: "Chicken Manchurian",
      ta: "சிக்கன் மஞ்சூரியன்",
    },

    {
      en: "Chicken Spring Roll",
      ta: "சிக்கன் ஸ்பிரிங் ரோல்",
    },

    {
      en: "Chicken Lollipop",
      ta: "சிக்கன் லாலிபாப்",
    },

    {
      en: "Hong Kong Chicken",
      ta: "ஹாங்காங் சிக்கன்",
    },

  ],
},

{
  title: {
    en: "Roti Varieties",
    ta: "ரோட்டி வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Naan",
      ta: "நான்",
    },

    {
      en: "Butter Naan",
      ta: "பட்டர் நான்",
    },

    {
      en: "Parotta",
      ta: "பரோட்டா",
    },

    {
      en: "Chicken Parotta",
      ta: "சிக்கன் பரோட்டா",
    },

    {
      en: "Egg Parotta",
      ta: "முட்டை பரோட்டா",
    },

    {
      en: "Veechu Parotta",
      ta: "வீச் பரோட்டா",
    },

    {
      en: "Egg Veechu Parotta",
      ta: "முட்டை வீச் பரோட்டா",
    },

    {
      en: "Lappa Parotta",
      ta: "லாப்பா பரோட்டா",
    },

    {
      en: "Egg Lappa Parotta",
      ta: "முட்டை லாப்பா பரோட்டா",
    },

    {
      en: "Chicken Lappa Parotta",
      ta: "சிக்கன் லாப்பா பரோட்டா",
    },

    {
      en: "Chilli Parotta",
      ta: "சில்லி பரோட்டா",
    },

    {
      en: "Bun Parotta",
      ta: "பன் பரோட்டா",
    },

    {
      en: "Nool Parotta",
      ta: "நூல் பரோட்டா",
    },

    {
      en: "Chicken Kothu Parotta",
      ta: "சிக்கன் கொத்து பரோட்டா",
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
    },

    {
      en: "Quail Gravy",
      ta: "காடை கிரேவி",
    },

    {
      en: "Quail Pepper Masala",
      ta: "காடை பெப்பர் மசாலா",
    },

    {
      en: "Quail Fry",
      ta: "காடை வறுவல்",
    },

    {
      en: "Quail Roast",
      ta: "காடை ரோஸ்ட்",
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
    },

    {
      en: "Prawn Tamarind Curry",
      ta: "இறால் புளி குழம்பு",
    },

    {
      en: "Prawn Gravy",
      ta: "இறால் கிரேவி",
    },

    {
      en: "Prawn Masala Curry",
      ta: "இறால் மசாலா கறி",
    },

    {
      en: "Prawn Thokku",
      ta: "இறால் தொக்கு",
    },

    {
      en: "Prawn Coconut Roast",
      ta: "இறால் தேங்காய் பிரட்டல்",
    },

    {
      en: "Prawn Podimas",
      ta: "இறால் பொடிமாஸ்",
    },

    {
      en: "Butter Prawn Egg Masala",
      ta: "பட்டர் இறால் முட்டை மசாலா",
    },

  ],
},

{
  title: {
    en: "Fish Varieties",
    ta: "மீன் வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Fish Curry",
      ta: "மீன் குழம்பு",
    },

    {
      en: "Anchovy Fish Curry",
      ta: "நெத்திலி மீன் குழம்பு",
    },

    {
      en: "Fish Thokku",
      ta: "மீன் தொக்கு",
    },

    {
      en: "Fish Fry",
      ta: "மீன் வறுவல்",
    },

    {
      en: "Spicy Tamarind Fish Fry",
      ta: "மீன் புளி வறுவல்",
    },

    {
      en: "Fish Cutlet",
      ta: "மீன் கட்லெட்",
    },

    {
      en: "Fish Roast",
      ta: "மீன் ரோஸ்ட்",
    },

    {
      en: "Fish Puttu Curry",
      ta: "மீன் புட்டுக்கறி",
    },

    {
      en: "Fish Poriyal",
      ta: "மீன் பொறியல்",
    },

  ],
},

{
  title: {
    en: "Egg Varieties",
    ta: "முட்டை வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Egg Curry",
      ta: "முட்டை குழம்பு",
    },

    {
      en: "Egg Fry",
      ta: "முட்டை வறுவல்",
    },

    {
      en: "Egg Masala",
      ta: "முட்டை மசாலா",
    },

    {
      en: "Cheese Omelette",
      ta: "சீஸ் ஆம்லெட்",
    },

    {
      en: "Onion Omelette",
      ta: "ஆனியன் ஆம்லெட்",
    },

    {
      en: "Egg Kalakki",
      ta: "முட்டை கலக்கி",
    },

    {
      en: "Egg Aviyal",
      ta: "முட்டை அவியல்",
    },

    {
      en: "Egg Masala Podimas",
      ta: "முட்டை மசாலா பொடிமாஸ்",
    },

  ],
},

{
  title: {
    en: "Crab Varieties",
    ta: "நண்டு வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1579631542720-3a87824fff86?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Crab Masala Curry",
      ta: "நண்டு மசாலா குழம்பு",
    },

    {
      en: "Chettinad Crab Curry",
      ta: "செட்டிநாட்டு நண்டு குழம்பு",
    },

    {
      en: "Crab Gravy",
      ta: "நண்டு கிரேவி",
    },

    {
      en: "Coconut Pepper Crab",
      ta: "தேங்காய் மிளகு நண்டு",
    },

    {
      en: "Crab Fry",
      ta: "நண்டு வறுவல்",
    },

    {
      en: "Crab Fry Special",
      ta: "நண்டு ஃப்ரை",
    },

    {
      en: "Crab Rasam",
      ta: "நண்டு ரசம்",
    },

    {
      en: "Crab Pepper Soup",
      ta: "நண்டு மிளகு சூப்",
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
    },

    {
      en: "Turkey Gravy",
      ta: "வான்கோழி கிரேவி",
    },

    {
      en: "Pepper Turkey Fry",
      ta: "மிளகு வான்கோழி வறுவல்",
    },

    {
      en: "Turkey Chilli",
      ta: "வான்கோழி சில்லி",
    },

    {
      en: "Turkey Soup",
      ta: "வான்கோழி சூப்",
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
    },

    {
      en: "Mutton Biryani",
      ta: "மட்டன் பிரியாணி",
    },

    {
      en: "Hyderabadi Chicken Biryani",
      ta: "ஹைதராபாத் சிக்கன் பிரியாணி",
    },

    {
      en: "Hyderabadi Mutton Biryani",
      ta: "ஹைதராபாத் மட்டன் பிரியாணி",
    },

    {
      en: "Country Chicken Biryani",
      ta: "நாட்டுக்கோழி பிரியாணி",
    },

    {
      en: "Fish Biryani",
      ta: "மீன் பிரியாணி",
    },

    {
      en: "Prawn Biryani",
      ta: "இறால் பிரியாணி",
    },

    {
      en: "Mutton Leg Biryani",
      ta: "ஆட்டுக்கால் பிரியாணி",
    },

    {
      en: "Turkey Biryani",
      ta: "வான்கோழி பிரியாணி",
    },

    {
      en: "Quail Biryani",
      ta: "காடை பிரியாணி",
    },

    {
      en: "Egg Biryani",
      ta: "முட்டை பிரியாணி",
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
    },

    {
      en: "Mutton Fried Rice",
      ta: "மட்டன் ஃப்ரைடு ரைஸ்",
    },

    {
      en: "Prawn Fried Rice",
      ta: "இறால் ஃப்ரைடு ரைஸ்",
    },

    {
      en: "Mixed Fried Rice",
      ta: "மிக்ஸ்டு ஃப்ரைடு ரைஸ்",
    },

    {
      en: "Fish Fried Rice",
      ta: "மீன் ஃப்ரைடு ரைஸ்",
    },

    {
      en: "Schezwan Chicken Rice",
      ta: "செஸ்வான் சிக்கன் ரைஸ்",
    },

    {
      en: "Schezwan Mutton Rice",
      ta: "செஸ்வான் மட்டன் ரைஸ்",
    },

    {
      en: "Schezwan Fish Rice",
      ta: "செஸ்வான் ஃபிஷ் ரைஸ்",
    },

    {
      en: "Schezwan Prawn Rice",
      ta: "செஸ்வான் பிரான் ரைஸ்",
    },

    {
      en: "Schezwan Egg Rice",
      ta: "செஸ்வான் எக் ரைஸ்",
    },

    {
      en: "White Rice",
      ta: "ஒயிட் ரைஸ்",
    },

    {
      en: "Ghee Rice",
      ta: "கீ ரைஸ்",
    },

  ],
},

{
  title: {
    en: "Soup Varieties",
    ta: "சூப் வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Sweet Corn Soup",
      ta: "ஸ்வீட் கார்ன் சூப்",
    },

    {
      en: "Baby Corn Soup",
      ta: "பேபி கார்ன் சூப்",
    },

    {
      en: "Tomato Soup",
      ta: "தக்காளி சூப்",
    },

    {
      en: "Herbal Soup",
      ta: "ஹெர்பல்ஸ் சூப்",
    },

    {
      en: "Noodles Soup",
      ta: "நூடுல்ஸ் சூப்",
    },

    {
      en: "Mushroom Soup",
      ta: "மஷ்ரூம் சூப்",
    },

    {
      en: "Vegetable Clear Soup",
      ta: "வெஜிடபிள் கிளியர் சூப்",
    },

    {
      en: "Hot Pepper Water Soup",
      ta: "ஹாட் மிளகுதண்ணி சூப்",
    },

    {
      en: "Lemon Coriander Soup",
      ta: "லெமன் கொரியாண்டர் சூப்",
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
    },

    {
      en: "Sago Payasam",
      ta: "ஜவ்வரிசி பாயாசம்",
    },

    {
      en: "Semiya Payasam",
      ta: "சேமியா பாயாசம்",
    },

    {
      en: "Dal Payasam",
      ta: "பருப்பு பாயாசம்",
    },

    {
      en: "Tender Coconut Payasam",
      ta: "இளநீர் பாயாசம்",
    },

    {
      en: "Aval Payasam",
      ta: "அவுல் பாயாசம்",
    },

    {
      en: "Basmati Payasam",
      ta: "பாசுமதி பாயாசம்",
    },

    {
      en: "Rava Payasam",
      ta: "ரவை பாயாசம்",
    },

    {
      en: "Palada Pradhaman Payasam",
      ta: "பாலடை பிரதமன் பாயாசம்",
    },

    {
      en: "Rice Payasam",
      ta: "அரிசி பாயாசம்",
    },

    {
      en: "Chettinad Fruit Payasam",
      ta: "செட்டிநாடு பழ பாயாசம்",
    },

    {
      en: "Sago Semiya Payasam",
      ta: "ஜவ்வரிசி சேமியா பாயாசம்",
    },

    {
      en: "Green Gram Payasam",
      ta: "பாசி பருப்பு பாயாசம்",
    },

    {
      en: "Red Rice Payasam",
      ta: "சிவப்பரிசி பாயாசம்",
    },

    {
      en: "Black Kavuni Rice Payasam",
      ta: "கவுனி அரிசி பாயாசம்",
    },

    {
      en: "Bottle Gourd Payasam",
      ta: "சுரைக்காய் பாயாசம்",
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
    },

    {
      en: "Lemon Pickle",
      ta: "எலுமிச்சை ஊறுகாய்",
    },

    {
      en: "Ginger Pickle",
      ta: "இஞ்சி ஊறுகாய்",
    },

    {
      en: "Garlic Pickle",
      ta: "பூண்டு ஊறுகாய்",
    },

    {
      en: "Green Chilli Pickle",
      ta: "பச்சை மிளகாய் ஊறுகாய்",
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
    },

    {
      en: "Hardin Idly",
      ta: "ஹார்டின் இட்லி",
    },

    {
      en: "Plate Idly",
      ta: "தட்டு இட்லி",
    },

    {
      en: "Ghee Mini Idly",
      ta: "நெய் மினி இட்லி",
    },

    {
      en: "Plain Idly",
      ta: "சாதா இட்லி",
    },

    {
      en: "Cup Idly",
      ta: "கப்பு இட்லி",
    },

    {
      en: "Kulfi Idly",
      ta: "குல்பி இட்லி",
    },

    {
      en: "Masala Idly",
      ta: "மசாலா இட்லி",
    },

    {
      en: "Star Idly",
      ta: "ஸ்டார் இட்லி",
    },

    {
      en: "Rava Idly",
      ta: "ரவா இட்லி",
    },

    {
      en: "Kanchipuram Idly",
      ta: "காஞ்சிபுரம் இட்லி",
    },

    {
      en: "Tender Coconut Idly",
      ta: "இளநீர் இட்லி",
    },

    {
      en: "Kuzhi Paniyaram",
      ta: "குழி பணியாரம்",
    },

    {
      en: "Kuzhai Puttu",
      ta: "குழாய் புட்டு",
    },

    {
      en: "Appam",
      ta: "ஆப்பம்",
    },

    {
      en: "Idiyappam with Coconut Milk",
      ta: "இடியாப்பம் + தேங்காய் பால்",
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
    },

    {
      en: "Bisi Bele Bath",
      ta: "பிசிபேளா பாத்",
    },

    {
      en: "Bhagala Bath",
      ta: "பகாளா பாத்",
    },

    {
      en: "Kalkandu Bath",
      ta: "கல்கண்டு பாத்",
    },

    {
      en: "Sweet Pongal",
      ta: "சர்க்கரை பொங்கல்",
    },

    {
      en: "Tamarind Rice",
      ta: "புளி சாதம்",
    },

    {
      en: "Sesame Rice",
      ta: "எள்ளு சாதம்",
    },

    {
      en: "Lemon Rice",
      ta: "லெமன் சாதம்",
    },

    {
      en: "Coconut Rice",
      ta: "தேங்காய் சாதம்",
    },

    {
      en: "Tomato Rice",
      ta: "தக்காளி சாதம்",
    },

    {
      en: "Mango Rice",
      ta: "மாங்காய் சாதம்",
    },

    {
      en: "Mint Rice",
      ta: "புதினா சாதம்",
    },

    {
      en: "Curry Leaves Rice",
      ta: "கருவேப்பிலை சாதம்",
    },

    {
      en: "Vatha Kuzhambu Rice",
      ta: "வத்த குழம்பு சாதம்",
    },

    {
      en: "Brinji Rice",
      ta: "பிரிஞ்சி சாதம்",
    },

    {
      en: "Curd Rice",
      ta: "தயிர் சாதம்",
    },

  ],
},

{
  title: {
    en: "Sweets",
    ta: "ஸ்வீட்ஸ்",
  },

  image:
    "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Rasmalai",
      ta: "ரசமலாய்",
    },

    {
      en: "Bengali Sweet",
      ta: "பெங்காலி",
    },

    {
      en: "Agra Paan",
      ta: "ஆகரா பான்",
    },

    {
      en: "Rasgulla",
      ta: "ரசகுல்லா",
    },

    {
      en: "Badam Halwa",
      ta: "பாதாம் அல்வா",
    },

    {
      en: "Pista Roll",
      ta: "பிஸ்தா ரோல்",
    },

    {
      en: "Malai Cream Roll",
      ta: "மலாய் கிரீம் ரோல்",
    },

    {
      en: "China Stores Sweet",
      ta: "சீனா ஸ்டோர்ஸ்",
    },

    {
      en: "Cashew Pista Roll",
      ta: "முந்திரி பிஸ்தா ரோல்",
    },

    {
      en: "Litchi Labdi",
      ta: "லிச்சி லப்டி",
    },

    {
      en: "Anarkali",
      ta: "அனார்கலி",
    },

    {
      en: "Dry Fruit Halwa",
      ta: "ட்ரை ஃப்ரூட் அல்வா",
    },

    {
      en: "Godhi Halwa",
      ta: "கோதி அல்வா",
    },

    {
      en: "Malai Sandwich",
      ta: "மலாய் சாண்ட்விச்",
    },

    {
      en: "Gulab Jamun (Round)",
      ta: "குலோப் ஜாம் (ரவுண்ட்)",
    },

    {
      en: "Dry Jamun",
      ta: "ட்ரை ஜாமுன் (நீட்டு)",
    },

    {
      en: "Makkan Peda",
      ta: "மக்கன் பேடா",
    },

    {
      en: "Large Jangiri",
      ta: "பெரிய ஜாங்கிரி",
    },

    {
      en: "Mini Boondi Laddu",
      ta: "மினி பூந்தி லட்டு",
    },

    {
      en: "Mothi Paagu",
      ta: "மோதி பாகு",
    },

  ],
},

{
  title: {
    en: "Snacks Varieties",
    ta: "கார வகைகள்",
  },

  image:
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Veg Roll",
      ta: "வெஜ் ரோல்",
    },

    {
      en: "Paneer Roll",
      ta: "பன்னீர் ரோல்",
    },

    {
      en: "Cutlet",
      ta: "கட்லெட்",
    },

    {
      en: "Cashew Pakoda",
      ta: "முந்திரி பக்கோடா",
    },

    {
      en: "Onion Pakoda",
      ta: "ஆனியன் பக்கோடா",
    },

    {
      en: "Masala Groundnut",
      ta: "மசாலா வேர்க்கடலை",
    },

    {
      en: "Cauliflower Pakoda",
      ta: "காலிஃப்ளவர் பக்கோடா",
    },

    {
      en: "Soft Pakoda",
      ta: "மெது பக்கோடா",
    },

    {
      en: "Veg Spring Roll",
      ta: "வெஜ் ஸ்ப்ரிங் ரோல்",
    },

    {
      en: "Veg Fish Fry",
      ta: "வெஜ் மீன் வருவல்",
    },

    {
      en: "Potato Chips",
      ta: "உருளை சிப்ஸ்",
    },

    {
      en: "Stick Chips",
      ta: "குச்சி சிப்ஸ்",
    },

    {
      en: "Nendram Chips",
      ta: "நேந்திரம் சிப்ஸ்",
    },

    {
      en: "Kara Sev",
      ta: "கார சேவ்",
    },

    {
      en: "Kara Boondi",
      ta: "கார பூந்தி",
    },

    {
      en: "Mixture",
      ta: "மிச்சர்",
    },

  ],
},

{
  title: {
    en: "Chettinad Special",
    ta: "செட்டிநாடு ஸ்பெஷல்",
  },

  image:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",

  items: [

    {
      en: "Kandharappam",
      ta: "கந்தர்ப்பம்",
    },

    {
      en: "Aadi Kummayam",
      ta: "ஆடி கும்மாயம்",
    },

    {
      en: "Ukkarai",
      ta: "உக்கரா",
    },

    {
      en: "Black Kavuni Rice",
      ta: "கருப்பு கவுனி அரிசி",
    },

    {
      en: "Milk Paniyaram",
      ta: "பால் பணியாரம்",
    },

    {
      en: "White Paniyaram",
      ta: "வெள்ளை பணியாரம்",
    },

    {
      en: "Sweet Kuzhi Paniyaram",
      ta: "இனிப்பு குழி பணியாரம்",
    },

    {
      en: "Suzhiyam",
      ta: "சுழியம்",
    },

    {
      en: "Milk Kozhukattai",
      ta: "பால் கொழுக்கட்டை",
    },

    {
      en: "Kalkandu Vadai",
      ta: "கல்கண்டு வடை",
    },

    {
      en: "Erukkala Kozhukattai",
      ta: "எருக்கல கொழுக்கட்டை",
    },

    {
      en: "Crushed Pidi Kozhukattai",
      ta: "இடிச்ச புடி கொழுக்கட்டை",
    },

    {
      en: "Pooranam Kozhukattai",
      ta: "பூரணம் கொழுக்கட்டை",
    },

    {
      en: "Manavalam",
      ta: "மணவளம்",
    },

    {
      en: "Poli",
      ta: "போலி",
    },

    {
      en: "Thanjavur Arachi Vitta Sambar",
      ta: "தஞ்சாவூர் அரைச்சி விட்ட சாம்பார்",
    },

    {
      en: "Vandikkaran Kara Kuzhambu",
      ta: "வண்டிக்காரன் காரக்குழம்பு",
    },

    {
      en: "Oil Brinjal Kuzhambu",
      ta: "எண்ணெய் கத்திரிக்காய் குழம்பு",
    },

    {
      en: "Sunda Vatha Kuzhambu",
      ta: "சுண்ட வத்த குழம்பு",
    },

    {
      en: "Pakoda Kuzhambu",
      ta: "பக்கோடா குழம்பு",
    },

    {
      en: "Puli Kuzhambu",
      ta: "புளிக்குழம்பு",
    },

    {
      en: "Urundai Kuzhambu",
      ta: "உருண்டை குழம்பு",
    },

    {
      en: "Veg Fish Kuzhambu",
      ta: "பொய் மீன் குழம்பு",
    },

    {
      en: "Garlic Kuzhambu",
      ta: "பூண்டு குழம்பு",
    },

    {
      en: "Chettinad Wedding Sambar",
      ta: "செட்டிநாட்டு கல்யாண சாம்பார்",
    },

    {
      en: "Chettinad Kara Kuzhambu",
      ta: "செட்டிநாட்டு கார குழம்பு",
    },

  ],
},
// 

    
    

  ];

return (

  <div className="bg-gradient-to-b from-[#fff8f5] to-[#fff1ea] min-h-screen pt-[78px] md:pt-[95px] pb-14 md:pb-24 px-3 sm:px-4 md:px-10 overflow-hidden">

    {/* TOP SECTION */}
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 md:gap-8 mb-8 md:mb-14">

      {/* LEFT */}
      <div className="w-full">

        {/* TAG */}
        <span className="inline-block bg-[#ffe7dc] text-[#962a27] px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[11px] sm:text-sm font-semibold tracking-wide">

          Premium Catering Menu

        </span>

        {/* HEADING */}
        <h1 className="text-[28px] sm:text-[38px] md:text-5xl lg:text-6xl font-bold text-[#7c2d12] mt-4 md:mt-5 leading-[1.2]">

          {language === "en"
            ? "Explore Our Delicious Menu"
            : "எங்கள் சுவையான உணவுப் பட்டியல்"}

        </h1>

        {/* DESCRIPTION */}
        <p className="text-gray-500 mt-3 md:mt-5 max-w-3xl leading-6 md:leading-8 text-[13px] sm:text-sm md:text-base">

          {language === "en"
            ? "Discover authentic Chettinad flavors, traditional dishes, sweets, biryanis and premium catering specials."
            : "அசல் செட்டிநாடு சுவைகள், பாரம்பரிய உணவுகள், இனிப்புகள் மற்றும் சிறப்பு விருந்துகளை அனுபவிக்குங்கள்."}

        </p>

      </div>

      {/* LANGUAGE TOGGLE */}
      <div className="flex justify-start lg:justify-end">

        <div className="flex items-center gap-2 bg-white p-1.5 md:p-2 rounded-full shadow-md border border-[#f3d7c8] w-fit">

          <button
            onClick={() => setLanguage("en")}
            className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[11px] sm:text-sm font-semibold duration-300 whitespace-nowrap ${
              language === "en"
                ? "bg-[#962a27] text-white shadow"
                : "text-[#962a27]"
            }`}
          >

            English

          </button>

          <button
            onClick={() => setLanguage("ta")}
            className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[11px] sm:text-sm font-semibold duration-300 whitespace-nowrap ${
              language === "ta"
                ? "bg-[#962a27] text-white shadow"
                : "text-[#962a27]"
            }`}
          >

            தமிழ்

          </button>

        </div>

      </div>

    </div>

    {/* MENU CARDS */}
<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-8 place-items-center">
      {specialMenus.map((menu, index) => (

        <div
          key={index}
className="relative bg-white rounded-[24px] md:rounded-[34px] overflow-hidden border border-[#f5d6c6] hover:shadow-2xl duration-500 group w-[92%] sm:w-full md:max-w-full max-w-[300px]">
          {/* TOP BORDER */}
          <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#962a27] via-[#d97706] to-[#f59e0b] z-10"></div>

          {/* IMAGE */}
          <div className="relative overflow-hidden">

            <img
              src={menu.image}
              alt="menu"
              loading="lazy"
className="w-full h-[140px] sm:h-[180px] md:h-[230px] object-cover group-hover:scale-105 duration-700"            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

          </div>

          {/* CONTENT */}
          <div className="p-4 md:p-5">

            {/* TITLE */}
            <h2 className="text-[20px] sm:text-2xl md:text-[30px] font-bold text-[#7c2d12] mb-4 md:mb-5 leading-snug">

              {menu.title[language]}

            </h2>

            {/* ITEMS */}
<div className="space-y-2.5 md:space-y-3 h-[190px] overflow-y-auto custom-scroll pr-1">
              {menu.items.map((item, i) => (

                <div
                  key={i}
                  className="flex items-start gap-2.5"
                >

                  {/* ICON */}
                  <div className="min-w-[20px] h-[20px] rounded-full bg-[#fff1ea] flex items-center justify-center mt-[2px]">

                    <span className="text-[#962a27] text-[9px]">

                      ✦

                    </span>

                  </div>

                  {/* TEXT */}
                  <p className="text-[#5f3a37] text-[13px] sm:text-sm md:text-[15px] leading-6">

                    {item[language]}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      ))}

    </div>

  </div>

);
}

export default Menu;