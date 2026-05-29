import { useNavigate } from "react-router-dom";

import {
  Users,
  ClipboardList,
  BadgeCheck,
  FolderOpen,
  LogOut,
} from "lucide-react";

const AdminDashboard = () => {

  const navigate = useNavigate();

  /* =========================
      LOGOUT
  ========================== */

 const handleLogout = () => {

  localStorage.removeItem(
    "adminAuth"
  );

  navigate("/");

};

  /* =========================
      DASHBOARD BUTTONS
  ========================== */

  const dashboardButtons = [

  {
    icon: <Users size={34} />,
    title: "Users",
    path: "/users-management",
  },

  {
    icon: <ClipboardList size={34} />,
    title: "Upcoming",
    path: "/upcoming-orders",
  },

  {
    icon: <BadgeCheck size={34} />,
    title: "Completed",
    path: "/completed-orders",
  },

  {
    icon: <FolderOpen size={34} />,
    title: "Files",
    path: "/files",
  },

];

  return (

    <div
      className="
        min-h-screen

        bg-[#f5f5f5]

        px-5
        py-8

        md:px-10
        md:py-10
      "
    >

      {/* TOP */}

      <div className="text-center mb-12">

        <h1
          className="
            text-3xl
            md:text-5xl

            font-bold

            text-[#962a27]
          "
        >

          Admin Dashboard

        </h1>

        <p
          className="
            text-gray-500

            mt-3

            text-sm
            md:text-base
          "
        >

          Lakshmi Catering Management

        </p>

      </div>

      {/* BUTTON GRID */}

      <div
        className="
          grid
          grid-cols-2

          gap-4
          md:gap-6

         md:max-w-3xl
          mx-auto
        "
      >

        {dashboardButtons.map(
          (item, index) => (

            <button
  key={index}

  onClick={() =>
    navigate(item.path)
  }
              className="
                bg-white

                border
                border-gray-200

                rounded-[30px]

                p-5
                md:p-8

                flex
                flex-col
                items-center
                justify-center

                text-center

                hover:border-[#962a27]
                hover:shadow-xl
                hover:-translate-y-1

                transition-all
                duration-300
              "
            >

              {/* ICON BOX */}

              <div
                className="
                  w-16
                  h-16

                  md:w-20
                  md:h-20

                  rounded-2xl

                  bg-gradient-to-br
                  from-[#fff1f1]
                  to-[#ffe3e2]

                  flex
                  items-center
                  justify-center

                  text-[#962a27]

                  shadow-sm
                "
              >

                {item.icon}

              </div>

              {/* TITLE */}

              <h2
                className="
                  mt-4

                  text-sm
                  md:text-lg

                  font-bold

                  text-[#962a27]
                "
              >

                {item.title}

              </h2>

            </button>

          )
        )}

      </div>

      {/* LOGOUT */}

      <div
        className="
          mt-16

          flex
          justify-center
        "
      >

        <button
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-3

            bg-[#962a27]

            text-white

            px-8
            py-4

            rounded-2xl

            font-semibold

            hover:scale-105
            hover:bg-[#b23835]

            transition-all
            duration-300
          "
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </div>

  );

};

export default AdminDashboard;