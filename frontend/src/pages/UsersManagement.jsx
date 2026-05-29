import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersManagement = () => {

  const navigate = useNavigate();

  const [storage, setStorage] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const fetchStorage =
      async () => {

        try {

          const res =
            await axios.get(
              "http://localhost:5000/api/bookings/storage"
            );

          setStorage(
            res.data
          );

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }

      };

    fetchStorage();

  }, []);

  if (loading) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >

        <h2
          className="
            text-xl
            font-semibold
          "
        >

          Loading...

        </h2>

      </div>

    );

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

      {/* HEADING */}

      <h1
        className="
          text-3xl
          md:text-5xl
          font-bold
          text-[#962a27]
          mb-8
        "
      >

        Database Storage Overview

      </h1>

      {/* STORAGE TABLE */}

      {storage && (

        <div
          className="
            bg-white
            rounded-3xl
            border
            border-gray-200
            shadow-sm
            overflow-hidden
            max-w-3xl
          "
        >

          <div
            className="
              bg-[#962a27]
              text-white
              px-6
              py-4
              text-xl
              font-bold
            "
          >

            MongoDB Atlas Storage

          </div>

          <table
            className="
              w-full
            "
          >

            <tbody>

              <tr className="border-b">

                <td
                  className="
                    p-5
                    font-semibold
                  "
                >

                  Used Space

                </td>

                <td className="p-5">

                  {storage.usedMB}
                  {" "}
                  MB

                </td>

              </tr>

              <tr className="border-b">

                <td
                  className="
                    p-5
                    font-semibold
                  "
                >

                  Remaining Space

                </td>

                <td className="p-5">

                  {storage.remainingMB}
                  {" "}
                  MB

                </td>

              </tr>

              <tr className="border-b">

                <td
                  className="
                    p-5
                    font-semibold
                  "
                >

                  Total Space

                </td>

                <td className="p-5">

                  {storage.totalMB}
                  {" "}
                  MB

                </td>

              </tr>

              <tr className="border-b">

                <td
                  className="
                    p-5
                    font-semibold
                  "
                >

                  Usage

                </td>

                <td className="p-5">

                  {storage.usagePercent}
                  %

                </td>

              </tr>

              <tr className="border-b">

                <td
                  className="
                    p-5
                    font-semibold
                  "
                >

                  Collections

                </td>

                <td className="p-5">

                  {storage.collections}

                </td>

              </tr>

              <tr>

                <td
                  className="
                    p-5
                    font-semibold
                  "
                >

                  Documents

                </td>

                <td className="p-5">

                  {storage.objects}

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      )}

      {/* BACK BUTTON */}

      <div
        className="
          mt-8
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
            py-3
            rounded-2xl
            font-semibold
            hover:scale-105
            transition-all
          "
        >

          ← Back To Dashboard

        </button>

      </div>

    </div>

  );

};

export default UsersManagement;