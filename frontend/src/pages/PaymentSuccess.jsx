import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  CheckCircle,
  Download,
  Home,
} from "lucide-react";

import jsPDF from "jspdf";

import html2canvas from "html2canvas";

const PaymentSuccess = () => {

  const location = useLocation();

  const navigate = useNavigate();

  const data = location.state || {};

  /* =========================
      INVALID ACCESS
  ========================== */

  if (!data.paymentId) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#f5f5f5]
          px-4
        "
      >

        <div
          className="
            bg-white
            max-w-md
            w-full
            rounded-[35px]
            shadow-lg
            p-10
            text-center
          "
        >

          <h1
            className="
              text-3xl
              font-bold
              text-red-600
              mb-4
            "
          >

            Invalid Payment

          </h1>

          <p className="text-gray-500 mb-8">

            Payment details not found.

          </p>

          <button
            onClick={() => navigate("/")}
            className="
              w-full
              py-4
              rounded-full
              bg-[#962a27]
              text-white
              font-bold
            "
          >

            Back To Home

          </button>

        </div>

      </div>

    );

  }

  /* =========================
      DOWNLOAD PDF
  ========================== */

  const downloadPDF = async () => {

    const input =
      document.getElementById(
        "invoice"
      );

    const canvas =
      await html2canvas(input);

    const imgData =
      canvas.toDataURL(
        "image/png"
      );

    const pdf =
      new jsPDF(
        "p",
        "mm",
        "a4"
      );

    const pdfWidth =
      pdf.internal.pageSize.getWidth();

    const pdfHeight =
      (canvas.height * pdfWidth) /
      canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pdfWidth,
      pdfHeight
    );

    pdf.save(
      `${data.customerName}-Booking.pdf`
    );

  };

  return (

    <div
      className="
        min-h-screen
        bg-[#f5f5f5]
        px-4
        py-10
        md:py-16
      "
    >

      {/* SUCCESS TOP */}

      <div
        className="
          text-center
          mb-10
        "
      >

        <div
          className="
            flex
            justify-center
            mb-6
          "
        >

          <div
            className="
              bg-green-100
              p-5
              rounded-full
            "
          >

            <CheckCircle
              size={80}
              className="
                text-green-600
              "
            />

          </div>

        </div>

        <h1
          className="
            text-4xl
            md:text-5xl
            font-bold
            text-[#962a27]
            mb-4
          "
        >

          Payment Successful

        </h1>

        <p
          className="
            text-gray-500
            text-lg
          "
        >

          Your booking has been confirmed successfully

        </p>

      </div>

      {/* MAIN CARD */}

      <div
        id="invoice"
        className="
          bg-white
          max-w-4xl
          mx-auto
          rounded-[35px]
          border
          border-gray-200
          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
          p-6
          md:p-10
        "
      >

        {/* TITLE */}

        <div className="mb-10">

          <h2
            className="
              text-3xl
              font-bold
              text-[#962a27]
              mb-2
            "
          >

            Booking Receipt

          </h2>

          <p className="text-gray-500">

            Payment details and booking summary

          </p>

        </div>

        {/* DETAILS GRID */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >

          {/* CUSTOMER */}

          <div
            className="
              bg-[#fafafa]
              border
              rounded-3xl
              p-5
            "
          >

            <p
              className="
                text-sm
                text-gray-500
                mb-2
              "
            >

              Customer Name

            </p>

            <h3
              className="
                text-xl
                font-bold
              "
            >

              {data.customerName}

            </h3>

          </div>

          {/* EVENT */}

          <div
            className="
              bg-[#fafafa]
              border
              rounded-3xl
              p-5
            "
          >

            <p
              className="
                text-sm
                text-gray-500
                mb-2
              "
            >

              Event

            </p>

            <h3
              className="
                text-xl
                font-bold
              "
            >

              {data.event}

            </h3>

          </div>

          {/* DATE */}

          <div
            className="
              bg-[#fafafa]
              border
              rounded-3xl
              p-5
            "
          >

            <p
              className="
                text-sm
                text-gray-500
                mb-2
              "
            >

              Event Date

            </p>

            <h3
              className="
                text-xl
                font-bold
              "
            >

              {data.date}

            </h3>

          </div>

          {/* PAYMENT ID */}

          <div
            className="
              bg-[#fafafa]
              border
              rounded-3xl
              p-5
            "
          >

            <p
              className="
                text-sm
                text-gray-500
                mb-2
              "
            >

              Payment ID

            </p>

            <h3
              className="
                text-sm
                md:text-base
                font-bold
                break-all
              "
            >

              {data.paymentId}

            </h3>

          </div>

        </div>

        {/* PAYMENT SUMMARY */}

        <div
          className="
            mt-10
            bg-[#fff7f7]
            border
            border-[#f3d4d3]
            rounded-[30px]
            p-6
            md:p-8
          "
        >

          <div className="space-y-5">

            <div
              className="
                flex
                justify-between
                items-center
              "
            >

              <h3
                className="
                  text-lg
                  text-gray-500
                "
              >

                Total Amount

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
                {data.grandTotal?.toLocaleString()}

              </h2>

            </div>

            <div
              className="
                flex
                justify-between
                items-center
              "
            >

              <h3
                className="
                  text-lg
                  text-gray-500
                "
              >

                Advance Paid

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
                {data.advanceAmount?.toLocaleString()}

              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* BUTTONS */}

      <div
        className="
          mt-10
          flex
          flex-col
          md:flex-row
          justify-center
          gap-5
          max-w-4xl
          mx-auto
        "
      >

        {/* DOWNLOAD */}

        <button
          onClick={downloadPDF}
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-3
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

          <Download size={20} />

          Download Receipt

        </button>

        {/* HOME */}

        <button
          onClick={() =>
            navigate("/")
          }
          className="
            flex-1
            flex
            items-center
            justify-center
            gap-3
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

          <Home size={20} />

          Back To Home

        </button>

      </div>

    </div>

  );

};

export default PaymentSuccess;