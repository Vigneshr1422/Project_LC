import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import specialMenus from "../data/specialMenus";

const BookingSummary = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state;

  const {
    customerDetails,
    selectedItems,
    sectionCounts,
    grandTotal,
  } = bookingData;

  const advanceAmount =
    Math.round(grandTotal * 0.10);

  /* =========================
      PAYMENT
  ========================== */

  const handlePayment = async () => {

    const options = {

      key: import.meta.env.VITE_RAZORPAY_KEY,

      amount: advanceAmount * 100,

      currency: "INR",

      name: "Lakshmi Catering",

      description: "Advance Payment",

      handler: async function (response) {

        try {

          const finalData = {

  ...customerDetails,

  selectedItems,

  sectionCounts,

  grandTotal,

  advanceAmount,

  remainingAmount:
    grandTotal - advanceAmount,

  paymentStatus: "Paid",

  bookingStatus: "Booked",

  paymentId:
    response.razorpay_payment_id,

  orderId:
    response.razorpay_order_id || "",

};

          const saveResponse =
            await axios.post(

              "http://localhost:5000/api/bookings",

              finalData

            );

       if (saveResponse.data.success) {

  localStorage.removeItem("bookingData");

  toast.success(
    "Booking Confirmed Successfully ✨"
  );

  setTimeout(() => {

    navigate("/payment-success", {
      state: {
        customerName:
          customerDetails.name,

        paymentId:
          response.razorpay_payment_id,

        advanceAmount,

        grandTotal,

        event:
          customerDetails.event,

        date:
          customerDetails.date,
      },
    });

  }, 1500);
}

        } catch (error) {

          console.log(error);

          toast.error(
            "Booking Save Failed"
          );

        }

      },

      prefill: {

        name: customerDetails.name,

        contact: customerDetails.phone,

      },

      theme: {
        color: "#962a27",
      },

    };

    const razor = new window.Razorpay(options);

    razor.open();

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
          max-w-6xl
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

        {/* TITLE */}

        <div className="mb-10">

          <h1
            className="
              text-3xl
              md:text-5xl
              font-bold
              text-[#962a27]
              mb-3
            "
          >

            Booking Summary

          </h1>

          <p className="text-gray-500">

            Review your booking details
            before payment

          </p>

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

            Customer Details

          </h2>

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >

            <div className="bg-white rounded-2xl p-5 border">

              <p className="text-gray-500 text-sm">
                Full Name
              </p>

              <h3 className="font-bold text-lg mt-1">

                {customerDetails.name}

              </h3>

            </div>

            <div className="bg-white rounded-2xl p-5 border">

              <p className="text-gray-500 text-sm">
                Phone Number
              </p>

              <h3 className="font-bold text-lg mt-1">

                {customerDetails.phone}

              </h3>

            </div>

            <div className="bg-white rounded-2xl p-5 border">

              <p className="text-gray-500 text-sm">
                Event
              </p>

              <h3 className="font-bold text-lg mt-1">

                {customerDetails.event}

              </h3>

            </div>

            <div className="bg-white rounded-2xl p-5 border">

              <p className="text-gray-500 text-sm">
                Event Date
              </p>

              <h3 className="font-bold text-lg mt-1">

                {customerDetails.date}

              </h3>

            </div>

          </div>

          {/* ADDRESS */}

          <div className="bg-white rounded-2xl p-5 border mt-5">

            <p className="text-gray-500 text-sm">
              Address
            </p>

            <h3 className="font-bold text-lg mt-1 leading-relaxed">

              {customerDetails.address}

            </h3>

          </div>

        </div>

        {/* MENU SUMMARY */}

        <div className="mb-10">

          <h2
            className="
              text-2xl
              md:text-3xl
              font-bold
              text-[#962a27]
              mb-6
            "
          >

            Selected Menu

          </h2>

          {/* DESKTOP TABLE */}

          <div className="hidden md:block overflow-x-auto">

            <table
              className="
                w-full
                border
                border-gray-200
                overflow-hidden
                rounded-3xl
              "
            >

              <thead className="bg-[#962a27] text-white">

                <tr>

                  <th className="p-4 text-left">
                    Item
                  </th>

                  <th className="p-4 text-center">
                    Guest Count
                  </th>

                  <th className="p-4 text-center">
                    Price
                  </th>

                  <th className="p-4 text-center">
                    Total
                  </th>

                </tr>

              </thead>

              <tbody>

                {Object.entries(selectedItems)
                  .filter(([_, value]) => value)
                  .map(([key], index) => {

                    let itemPrice = 0;
                    let guestCount = 0;

                    specialMenus.forEach(
                      (category) => {

                        category.items.forEach(
                          (item) => {

                            if (
                              item.en === key
                            ) {

                              itemPrice =
                                item.price;

                              guestCount =
                                sectionCounts[
                                  category
                                    .title.en
                                ] || 0;

                            }

                          }
                        );

                      }
                    );

                    return (

                      <tr
                        key={index}
                        className="border-b"
                      >

                        <td className="p-4 font-medium">

                          {key}

                        </td>

                        <td className="p-4 text-center">

                          {guestCount}

                        </td>

                        <td className="p-4 text-center">

                          ₹ {itemPrice}

                        </td>

                        <td
                          className="
                            p-4
                            text-center
                            font-bold
                            text-[#962a27]
                          "
                        >

                          ₹
                          {" "}
                          {(
                            itemPrice *
                            guestCount
                          ).toLocaleString()}

                        </td>

                      </tr>

                    );

                  })}

              </tbody>

            </table>

          </div>

          {/* MOBILE CARD */}

          <div className="md:hidden space-y-4">

            {Object.entries(selectedItems)
              .filter(([_, value]) => value)
              .map(([key], index) => {

                let itemPrice = 0;
                let guestCount = 0;

                specialMenus.forEach(
                  (category) => {

                    category.items.forEach(
                      (item) => {

                        if (
                          item.en === key
                        ) {

                          itemPrice =
                            item.price;

                          guestCount =
                            sectionCounts[
                              category
                                .title.en
                            ] || 0;

                        }

                      }
                    );

                  }
                );

                return (

                  <div
                    key={index}
                    className="
                      bg-[#fafafa]
                      border
                      border-gray-200
                      rounded-3xl
                      p-5
                    "
                  >

                    <h3
                      className="
                        text-lg
                        font-bold
                        text-[#962a27]
                        mb-4
                      "
                    >

                      {key}

                    </h3>

                    <div className="space-y-3">

                      <div className="flex justify-between">

                        <span>
                          Guest Count
                        </span>

                        <span className="font-semibold">

                          {guestCount}

                        </span>

                      </div>

                      <div className="flex justify-between">

                        <span>
                          Price
                        </span>

                        <span className="font-semibold">

                          ₹ {itemPrice}

                        </span>

                      </div>

                      <div className="flex justify-between">

                        <span>
                          Total
                        </span>

                        <span
                          className="
                            font-bold
                            text-[#962a27]
                          "
                        >

                          ₹
                          {" "}
                          {(
                            itemPrice *
                            guestCount
                          ).toLocaleString()}

                        </span>

                      </div>

                    </div>

                  </div>

                );

              })}

          </div>

        </div>

        {/* TOTAL */}

        <div
          className="
            bg-[#fff7f7]
            border
            border-[#f3d4d3]
            rounded-[30px]
            p-6
            md:p-8
            mb-10
          "
        >

          <div className="space-y-5">

            <div className="flex justify-between items-center">

              <h3 className="text-lg text-gray-500">

                Grand Total

              </h3>

              <h2
                className="
                  text-2xl
                  md:text-4xl
                  font-bold
                  text-[#962a27]
                "
              >

                ₹
                {" "}
                {grandTotal.toLocaleString()}

              </h2>

            </div>

            <div className="flex justify-between items-center">

              <h3 className="text-lg text-gray-500">

                Advance Amount (10%)

              </h3>

              <h2
                className="
                  text-2xl
                  md:text-4xl
                  font-bold
                  text-green-600
                "
              >

                ₹
                {" "}
                {advanceAmount.toLocaleString()}

              </h2>

            </div>

          </div>

        </div>

        {/* BUTTONS */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            gap-5
          "
        >

          {/* BACK */}

          <button
            onClick={() => navigate(-1)}
            className="
              flex-1
              px-8
              py-4
              rounded-full
              border-2
              border-[#962a27]
              text-[#962a27]
              font-bold
              hover:bg-[#fff7f7]
              transition-all
            "
          >

            Back To Booking

          </button>

          {/* PAYMENT */}

          <button
            onClick={handlePayment}
            className="
              flex-1
              px-8
              py-4
              rounded-full
              bg-[#962a27]
              text-white
              font-bold
              hover:scale-[1.02]
              transition-all
            "
          >

            Pay Advance ₹
            {" "}
            {advanceAmount.toLocaleString()}

          </button>

        </div>

      </div>

    </div>

  );

};

export default BookingSummary;