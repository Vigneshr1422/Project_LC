import axios from "axios";

import Loader from "../components/Loader";
import Swal from "sweetalert2";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import { toast } from "react-toastify";

import {
  Trash2,
  Loader2,
} from "lucide-react";

const UpcomingOrders = () => {

  const navigate = useNavigate();

  /* =========================
      STATES
  ========================== */

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [currentPage, setCurrentPage] =
    useState(1);

  const [deletingId, setDeletingId] =
    useState(null);

  const [searchBy, setSearchBy] =
    useState("bookingId");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [sortOrder, setSortOrder] =
    useState("asc");

  /* =========================
      PAGINATION
  ========================== */

  const ordersPerPage = 10;

  /* =========================
      SEARCH + SORT
  ========================== */

  const filteredOrders =
    orders
      .filter((order) => {

        const value = String(
          order?.[searchBy] || ""
        ).toLowerCase();

        return value.includes(
          searchTerm.toLowerCase()
        );

      })
      .sort((a, b) => {

        if (sortOrder === "asc") {

          return (
            new Date(a.date) -
            new Date(b.date)
          );

        }

        return (
          new Date(b.date) -
          new Date(a.date)
        );

      });

  const lastIndex =
    currentPage * ordersPerPage;

  const firstIndex =
    lastIndex - ordersPerPage;

  const currentOrders =
    filteredOrders.slice(
      firstIndex,
      lastIndex
    );

  const totalPages =
    Math.ceil(
      filteredOrders.length /
        ordersPerPage
    );

  const handleDelete =
    async (id) => {

      const result =
        await Swal.fire({

          title:
            "Delete Booking?",

          text:
            "This booking will be permanently deleted.",

          icon: "warning",

          showCancelButton: true,

          confirmButtonColor:
            "#dc2626",

          cancelButtonColor:
            "#6b7280",

          confirmButtonText:
            "Yes, Delete",

          cancelButtonText:
            "Cancel",

          reverseButtons: true,

        });

      if (
        !result.isConfirmed
      )
        return;

      try {

        setDeletingId(id);

        const response =
          await axios.delete(
            `https://project-lc.onrender.com/api/bookings/${id}`
          );

        if (
          response.data.success
        ) {

          setOrders(
            (prev) =>
              prev.filter(
                (order) =>
                  order._id !==
                  id
              )
          );

          Swal.fire({

            icon: "success",

            title:
              "Deleted Successfully",

            text:
              "Booking has been removed.",

            timer: 2000,

            showConfirmButton:
              false,

          });

        }

      } catch (error) {

        Swal.fire({

          icon: "error",

          title: "Oops...",

          text:
            "Failed To Delete Booking",

        });

      } finally {

        setDeletingId(null);

      }

    };

  /* =========================
      FETCH ORDERS
  ========================== */

  const fetchOrders =
    async () => {

      try {

        setLoading(true);

        const response =
          await axios.get(
            "https://project-lc.onrender.com/api/bookings/upcoming"
          );

        const sortedOrders =
          response.data.orders.sort(
            (a, b) =>
              new Date(a.date) -
              new Date(b.date)
          );

        setOrders(
          sortedOrders
        );

      } catch (error) {

        console.log(error);

      } finally {

        setTimeout(() => {

          setLoading(false);

        }, 1200);

      }

    };

  useEffect(() => {

    fetchOrders();

  }, []);

  /* =========================
      RESET PAGE ON SEARCH
  ========================== */

  useEffect(() => {

    setCurrentPage(1);

  }, [
    searchTerm,
    searchBy,
    sortOrder,
  ]);

  /* =========================
      LOADING
  ========================== */

  if (loading) {

    return <Loader />;

  }

  return (

  <div
    className="
      min-h-screen
      bg-[#f5f5f5]
      p-5
      md:p-10
    "
  >

    {/* TOP */}

    <div
      className="
        flex
        flex-col
        md:flex-row
        md:items-center
        md:justify-between
        gap-5
        mb-8
      "
    >

      <div>

        <h1
          className="
            text-3xl
            md:text-5xl
            font-bold
            text-[#962a27]
          "
        >
          Upcoming Orders
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Total Orders :
          {" "}
          <span className="font-bold text-[#962a27]">
            {filteredOrders.length}
          </span>
        </p>

        {/* SEARCH + SORT */}

        <div
          className="
            mt-5
            flex
            flex-col
            md:flex-row
            gap-3
          "
        >

          <select
            value={searchBy}
            onChange={(e) =>
              setSearchBy(
                e.target.value
              )
            }
            className="
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              bg-white
            "
          >

            <option value="bookingId">
              Booking ID
            </option>

            <option value="name">
              Customer Name
            </option>

            <option value="phone">
              Phone
            </option>

            <option value="event">
              Event
            </option>

          </select>

          <input
            type="text"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            placeholder={`Search ${searchBy}`}
            className="
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              flex-1
            "
          />

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                e.target.value
              )
            }
            className="
              border
              border-gray-300
              rounded-xl
              px-4
              py-3
              bg-white
            "
          >

            <option value="asc">
              Date ASC
            </option>

            <option value="desc">
              Date DESC
            </option>

          </select>

        </div>

      </div>

    </div>

    {/* EMPTY STATE */}

    {filteredOrders.length === 0 ? (

      <div
        className="
          bg-white
          rounded-3xl
          border
          border-gray-200
          py-20
          flex
          flex-col
          items-center
          justify-center
          text-center
        "
      >

        <div
          className="
            w-20
            h-20
            rounded-full
            bg-[#fff7f7]
            flex
            items-center
            justify-center
            text-4xl
          "
        >
          📭
        </div>

        <h2
          className="
            mt-6
            text-2xl
            font-bold
            text-[#962a27]
          "
        >
          No Upcoming Orders
        </h2>

        <p
          className="
            mt-2
            text-gray-500
          "
        >
          Orders will appear here
        </p>

      </div>

    ) : (

      <>

        <div
          className="
            bg-white
            rounded-3xl
            border
            border-gray-200
            overflow-hidden
            shadow-sm
          "
        >

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead
                className="
                  bg-[#962a27]
                  text-white
                "
              >

                <tr>

                  <th className="p-5 text-left whitespace-nowrap">
                    S.No
                  </th>

                  <th className="p-5 text-left whitespace-nowrap">
                    Booking ID
                  </th>

                  <th className="p-5 text-left whitespace-nowrap">
                    Customer
                  </th>

                  <th className="p-5 text-left whitespace-nowrap">
                    Phone
                  </th>

                  <th className="p-5 text-left whitespace-nowrap">
                    Event
                  </th>

                  <th className="p-5 text-left whitespace-nowrap">
                    Event Date
                  </th>

                  <th className="p-5 text-left whitespace-nowrap">
                    Total Amount
                  </th>

                  <th className="p-5 text-left whitespace-nowrap">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {currentOrders.map(
                  (
                    order,
                    index
                  ) => (

                    <tr
                      key={order._id}
                      className="
                        border-b
                        hover:bg-[#fafafa]
                        transition-all
                      "
                    >

                      <td className="p-5 font-semibold whitespace-nowrap">
                        {firstIndex + index + 1}
                      </td>

                      <td className="p-5 whitespace-nowrap font-bold text-[#962a27]">
                        {order.bookingId}
                      </td>

                      <td className="p-5 whitespace-nowrap font-medium">
                        {order.name}
                      </td>

                      <td className="p-5 whitespace-nowrap">
                        {order.phone}
                      </td>

                      <td className="p-5 whitespace-nowrap">
                        {order.event}
                      </td>

                      <td className="p-5 whitespace-nowrap">
                        {order.date}
                      </td>

                      <td className="p-5 font-bold text-[#962a27] whitespace-nowrap">
                        ₹ {order.grandTotal?.toLocaleString()}
                      </td>

                      <td className="p-5 whitespace-nowrap">

                        <button

                          onClick={() =>
                            handleDelete(
                              order._id
                            )
                          }

                          disabled={
                            deletingId ===
                            order._id
                          }

                          className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            flex
                            items-center
                            gap-2
                            disabled:opacity-70
                          "
                        >

                          {deletingId === order._id ? (

                            <>

                              <Loader2
                                size={18}
                                className="animate-spin"
                              />

                              Deleting...

                            </>

                          ) : (

                            <>

                              <Trash2 size={18} />

                              Delete

                            </>

                          )}

                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        </div>

        {filteredOrders.length > 10 && (

          <div
            className="
              mt-8
              flex
              items-center
              justify-center
              gap-3
              flex-wrap
            "
          >

            <button

              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    Math.max(
                      prev - 1,
                      1
                    )
                )
              }

              disabled={
                currentPage === 1
              }

              className="
                px-5
                py-2
                rounded-xl
                border
                border-[#962a27]
                text-[#962a27]
                font-semibold
                disabled:opacity-40
              "
            >
              Previous
            </button>

            {[...Array(totalPages)].map(
              (_, index) => (

                <button

                  key={index}

                  onClick={() =>
                    setCurrentPage(
                      index + 1
                    )
                  }

                  className={`

                    w-11
                    h-11
                    rounded-xl
                    font-semibold

                    ${
                      currentPage ===
                      index + 1
                        ? "bg-[#962a27] text-white"
                        : "bg-white border border-gray-200"
                    }

                  `}
                >
                  {index + 1}
                </button>

              )
            )}

            <button

              onClick={() =>
                setCurrentPage(
                  (prev) =>
                    Math.min(
                      prev + 1,
                      totalPages
                    )
                )
              }

              disabled={
                currentPage ===
                totalPages
              }

              className="
                px-5
                py-2
                rounded-xl
                bg-[#962a27]
                text-white
                font-semibold
                disabled:opacity-40
              "
            >
              Next
            </button>

          </div>

        )}

      </>

    )}

    <div
      className="
        mt-10
        flex
        justify-center
      "
    >

      <button

        onClick={() =>
          navigate(-1)
        }

        className="
          bg-[#962a27]
          text-white
          px-8
          py-4
          rounded-2xl
          font-semibold
          hover:scale-105
          transition-all
        "
      >
        Back To Dashboard
      </button>

    </div>

  </div>

);

};

export default UpcomingOrders;

