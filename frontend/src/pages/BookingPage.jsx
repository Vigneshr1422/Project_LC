import axios from "axios";
import { useState, useEffect } from "react";
import specialMenus from "../data/specialMenus";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {

  const navigate = useNavigate();

  /* =========================
      LANGUAGE
  ========================== */

  const [language, setLanguage] = useState("en");

  /* =========================
      CUSTOMER DETAILS
  ========================== */

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
    event: "",
    date: "",
  });

  /* =========================
      SELECTED ITEMS
  ========================== */

  const [selectedItems, setSelectedItems] = useState({});

  /* =========================
      SECTION COUNTS
  ========================== */

  const [sectionCounts, setSectionCounts] = useState({});

  /* =========================
      LOAD SAVED DATA
  ========================== */

  useEffect(() => {

    const savedData =
      localStorage.getItem("bookingData");

    if (savedData) {

      const parsedData =
        JSON.parse(savedData);

      setCustomerDetails(
        parsedData.customerDetails || {}
      );

      setSelectedItems(
        parsedData.selectedItems || {}
      );

      setSectionCounts(
        parsedData.sectionCounts || {}
      );

    }

  }, []);

  /* =========================
      CUSTOMER INPUT
  ========================== */

  const handleCustomerDetails = (e) => {

    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value,
    });

  };

  /* =========================
      CHECKBOX
  ========================== */

  const handleCheckbox = (itemName) => {

    setSelectedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));

  };

  /* =========================
      SECTION COUNT
  ========================== */

  const handleSectionCount = (
    sectionTitle,
    value
  ) => {

    setSectionCounts((prev) => ({
      ...prev,
      [sectionTitle]: value,
    }));

  };

  /* =========================
      GRAND TOTAL
  ========================== */

  const grandTotal = specialMenus.reduce(

    (total, category) => {

      const sectionKey = category.title.en;

      const count = Number(
        sectionCounts[sectionKey] || 0
      );

      const sectionTotal =
        category.items.reduce(

          (itemTotal, item) => {

            if (selectedItems[item.en]) {

              return (
                itemTotal +
                (item.price * count)
              );

            }

            return itemTotal;

          },

          0

        );

      return total + sectionTotal;

    },

    0

  );

  /* =========================
      SUBMIT
  ========================== */

  const handleSubmit = async () => {

    const {
      name,
      phone,
      address,
      event,
      date,
    } = customerDetails;

    /* VALIDATION */

    if (
      !name ||
      !phone ||
      !address ||
      !event ||
      !date
    ) {

      toast.error(

        language === "en"
          ? "Please Fill All Customer Details"
          : "அனைத்து விவரங்களையும் நிரப்பவும்"

      );

      return;

    }

    if (grandTotal <= 0) {

      toast.error(

        language === "en"
          ? "Please Select At Least One Item"
          : "குறைந்தது ஒரு உணவை தேர்வு செய்யவும்"

      );

      return;

    }

    let hasError = false;

    specialMenus.forEach((category) => {

      const sectionKey =
        category.title.en;

      const sectionSelected =
        category.items.some(
          (item) =>
            selectedItems[item.en]
        );

      if (
        sectionSelected &&
        !sectionCounts[sectionKey]
      ) {

        hasError = true;

        toast.error(

          language === "en"
            ? `Please enter guest count for ${sectionKey}`
            : `${category.title.ta} எண்ணிக்கையை உள்ளிடவும்`

        );

      }

    });

    /* NAVIGATE */

    if (!hasError) {

      const bookingData = {

        customerDetails,
        selectedItems,
        sectionCounts,
        grandTotal, 

      };

      /* SAVE LOCAL STORAGE */

      localStorage.setItem(

        "bookingData",

        JSON.stringify(bookingData)

      );

      /* MOVE SUMMARY PAGE */

      navigate("/BookingSummary", {

        state: bookingData,

      });

    }

  };

  return (

    <div className="min-h-screen bg-[#f5f5f5] px-4 py-8 md:py-12">

      {/* TOASTER */}

      <Toaster
        position={
          window.innerWidth < 768
            ? "bottom-center"
            : "top-right"
        }
      />

      {/* MAIN */}

      <div
        className="
          max-w-7xl
          mx-auto
          bg-white
          rounded-[35px]
          border
          border-gray-200
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          p-5
          md:p-10
        "
      >

        {/* HEADER */}

        <div className="flex justify-between items-center flex-wrap gap-5 mb-10">

          <div>

            <h1 className="text-3xl md:text-5xl font-bold text-[#962a27] mb-2">

              {language === "en"
                ? "Catering Booking"
                : "கேட்டரிங் முன்பதிவு"}

            </h1>

          </div>

          {/* LANGUAGE */}

          <div className="bg-[#f3f3f3] p-1 rounded-full flex gap-2">

            <button
              onClick={() => setLanguage("en")}
              className={`
                px-5
                py-2
                rounded-full
                ${
                  language === "en"
                    ? "bg-[#962a27] text-white"
                    : "text-[#962a27]"
                }
              `}
            >
              English
            </button>

            <button
              onClick={() => setLanguage("ta")}
              className={`
                px-5
                py-2
                rounded-full
                ${
                  language === "ta"
                    ? "bg-[#962a27] text-white"
                    : "text-[#962a27]"
                }
              `}
            >
              தமிழ்
            </button>

          </div>

        </div>

        {/* CUSTOMER DETAILS */}

        <div
          className="
            bg-[#fafafa]
            border
            border-gray-200
            rounded-[30px]
            p-5
            md:p-8
            mb-10
          "
        >

          <h2
            className="
              text-2xl
              md:text-3xl
              font-bold
              text-[#962a27]
              mb-8
            "
          >

            {language === "en"
              ? "Customer Details"
              : "வாடிக்கையாளர் விவரங்கள்"}

          </h2>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >

            {/* NAME */}

            <input
              type="text"
              name="name"
              value={customerDetails.name}
              onChange={handleCustomerDetails}
              placeholder={
                language === "en"
                  ? "Full Name"
                  : "முழு பெயர்"
              }
              className="w-full border rounded-2xl px-5 py-4"
            />

            {/* PHONE */}

            <input
              type="number"
              name="phone"
              value={customerDetails.phone}
              onChange={handleCustomerDetails}
              placeholder={
                language === "en"
                  ? "Phone Number"
                  : "தொலைபேசி எண்"
              }
              className="w-full border rounded-2xl px-5 py-4"
            />

            {/* EVENT DROPDOWN */}

            <select
              name="event"
              value={customerDetails.event}
              onChange={handleCustomerDetails}
              className="w-full border rounded-2xl px-5 py-4"
            >

              <option value="">
                {language === "en"
                  ? "Select Event"
                  : "நிகழ்ச்சியை தேர்வு செய்யவும்"}
              </option>

              <option value="Wedding">
                {language === "en"
                  ? "Wedding"
                  : "திருமணம்"}
              </option>

              <option value="Reception">
                {language === "en"
                  ? "Reception"
                  : "வரவேற்பு"}
              </option>

              <option value="Birthday">
                {language === "en"
                  ? "Birthday"
                  : "பிறந்தநாள்"}
              </option>

              <option value="Engagement">
                {language === "en"
                  ? "Engagement"
                  : "நிச்சயதார்த்தம்"}
              </option>

              <option value="Corporate Event">
                {language === "en"
                  ? "Corporate Event"
                  : "நிறுவன விழா"}
              </option>

            </select>

            {/* DATE */}

            <input
              type="date"
              name="date"
              value={customerDetails.date}
              onChange={handleCustomerDetails}
              className="w-full border rounded-2xl px-5 py-4"
            />

          </div>

          {/* ADDRESS */}

          <textarea
            rows="4"
            name="address"
            value={customerDetails.address}
            onChange={handleCustomerDetails}
            placeholder={
              language === "en"
                ? "Enter Address"
                : "முகவரியை உள்ளிடவும்"
            }
            className="
              w-full
              mt-5
              border
              rounded-2xl
              px-5
              py-4
            "
          ></textarea>

        </div>

        {/* MENU */}

       <div className="space-y-4">

  {specialMenus.map((category, categoryIndex) => {

    const sectionKey = category.title.en;

    const isAnySelected =
      category.items.some(
        (item) => selectedItems[item.en]
      );

    return (

      <details
        key={categoryIndex}
        className="
          bg-white
          border
          border-gray-200
          rounded-[22px]
          overflow-hidden
          group
          shadow-sm
        "
      >

        {/* HEADER */}

        <summary
          className="
            list-none
            cursor-pointer
            p-4
            md:p-6
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-4
            "
          >

            {/* LEFT */}

         <div
  className="
    flex
    flex-col
    items-center
    text-center

    md:items-start
    md:text-left
  "
>

  <div
    className="
      flex
      items-center
      justify-center
      gap-2
      flex-wrap

      md:justify-start
    "
  >

    <h3
      className="
        text-lg
        md:text-2xl
        font-bold
        text-[#962a27]
      "
    >

      {category.title[language]}

    </h3>

    {isAnySelected && (

      <span
        className="
          bg-green-100
          text-green-700
          text-[10px]
          md:text-xs
          font-semibold
          px-2
          py-1
          rounded-full
        "
      >

        Selected

      </span>

    )}

  </div>

  <p
    className="
      text-[#962a27]
      font-semibold
      mt-2
      text-sm
      md:text-base
    "
  >

    ₹ {category.price}

    <span
      className="
        text-gray-500
        text-xs
        ml-1
      "
    >

      / Plate

    </span>

  </p>

</div>

            {/* RIGHT */}

            <div
              className="
                flex
                items-center
                gap-3
              "
            >

              {/* COUNT */}

             <input
  type="number"
  value={
    sectionCounts[sectionKey] || ""
  }
  onChange={(e) =>
    handleSectionCount(
      sectionKey,
      e.target.value
    )
  }
  placeholder={
    language === "en"
      ? "Count"
      : "எண்ணிக்கை"
  }
  className="
    border
    border-gray-300

    rounded-xl

    px-3
    py-2

    text-sm
    text-center

    outline-none

    focus:border-[#962a27]

    w-[110px]
    md:w-[180px]

    mx-auto
  "
  onClick={(e) =>
    e.stopPropagation()
  }
/>

              {/* ICON */}

              <div
                className="
                  w-8
                  h-8
                  md:w-10
                  md:h-10
                  rounded-full
                  bg-[#fff7f7]
                  flex
                  items-center
                  justify-center
                  text-[#962a27]
                  text-lg
                  md:text-xl
                  font-bold
                  transition-all
                  duration-300
                  group-open:rotate-180
                "
              >

                ⌄

              </div>

            </div>

          </div>

        </summary>

        {/* ITEMS */}

        <div
          className="
            px-4
            pb-4
            md:px-6
            md:pb-6
          "
        >

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-3
              md:gap-5
            "
          >

            {category.items.map((item, itemIndex) => {

              const itemKey = item.en;

              return (

                <div
                  key={itemIndex}
                  onClick={() =>
                    handleCheckbox(itemKey)
                  }
                  className={`
                    cursor-pointer
                    border-2
                    rounded-2xl
                    md:rounded-3xl
                    p-3
                    md:p-5
                    transition-all
                    duration-300
                    ${
                      selectedItems[itemKey]
                        ? "border-[#962a27] bg-[#fff7f7]"
                        : "border-gray-200 bg-white"
                    }
                  `}
                >

                  <div
                    className="
                      flex
                      justify-between
                      items-center
                      gap-3
                    "
                  >

                    {/* LEFT */}

                    <div>

                      <h4
                        className="
                          text-sm
                          md:text-lg
                          font-semibold
                          leading-relaxed
                        "
                      >

                        {item[language]}

                      </h4>

                      <p
                        className="
                          text-[#962a27]
                          font-bold
                          mt-2
                          text-sm
                          md:text-base
                        "
                      >

                        ₹ {item.price}

                      </p>

                    </div>

                    {/* CHECK */}

                    <div
                      className={`
                        min-w-[24px]
                        w-6
                        h-6
                        md:w-8
                        md:h-8
                        rounded-full
                        border-2
                        flex
                        items-center
                        justify-center
                        text-[10px]
                        md:text-sm
                        font-bold
                        transition-all
                        duration-300
                        ${
                          selectedItems[itemKey]
                            ? "bg-[#962a27] border-[#962a27] text-white"
                            : "border-gray-300 text-transparent"
                        }
                      `}
                    >

                      ✓

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        </div>

      </details>

    );

  })}

</div>

        {/* TOTAL */}

        <div
          className="
            mt-14
            bg-[#fff7f7]
            border
            border-[#f3d4d3]
            rounded-[30px]
            p-8
          "
        >

          <p className="text-gray-500 text-lg">

            {language === "en"
              ? "Estimated Grand Total"
              : "மொத்த தொகை"}

          </p>

          <h1 className="text-5xl font-bold text-[#962a27] mt-3">

            ₹ {grandTotal.toLocaleString()}

          </h1>

        </div>

        {/* SUBMIT */}

        <div className="mt-10 text-center">

          <button
            onClick={handleSubmit}
            className="
              bg-[#962a27]
              text-white
              px-12
              py-4
              rounded-full
              text-lg
              font-semibold
              hover:scale-105
              transition-all
            "
          >

            {language === "en"
              ? "Submit Booking"
              : "முன்பதிவை சமர்ப்பிக்கவும்"}

          </button>

        </div>

      </div>

    </div>

  );

};

export default BookingPage;