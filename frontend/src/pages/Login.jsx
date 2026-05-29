import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {

  const navigate = useNavigate();

  /* =========================
      FORM DATA
  ========================== */

  const [formData, setFormData] =
    useState({

      username: "",
      password: "",

    });

  /* =========================
      LOADING & SUCCESS
  ========================== */

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  /* =========================
      HANDLE INPUT
  ========================== */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  /* =========================
      LOGIN
  ========================== */

  const handleLogin = (e) => {

    e.preventDefault();

    setLoading(true);

    const username = "admin";
    const password = "admin123";

    if (

      formData.username === username &&
      formData.password === password

    ) {

      setTimeout(() => {

        setLoading(false);

        setSuccess(true);

        localStorage.setItem(
          "adminAuth",
          "true"
        );

        toast.success(
          "Login Successful ✨"
        );

        setTimeout(() => {

          navigate("/admin-dashboard");

        }, 1200);

      }, 1500);

    } else {

      setTimeout(() => {

        setLoading(false);

        toast.error(
          "Invalid Username or Password"
        );

      }, 1500);

    }

  };

  return (

    <div
      className="
        min-h-screen
        bg-[#f5f5f5]
        flex
        items-start
        justify-center
        px-6
        pt-24
      "
    >

      {/* TOASTER */}

      {/* <Toaster
        position={
          window.innerWidth < 768
            ? "bottom-center"
            : "top-right"
        }
      /> */}

      <div
        className="
          w-full
          max-w-md
          bg-white
          border
          border-gray-200
          rounded-[30px]
          p-8
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        "
      >

        {/* HEADING */}

        <div className="text-center mb-8">

          <h1
            className="
              text-4xl
              font-bold
              text-[#962a27]
              mb-2
            "
          >

            Admin Login

          </h1>

          <p className="text-gray-500">

            Welcome to Lakshmi Catering

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* USERNAME */}

          <div>

            <label
              className="
                block
                text-gray-700
                mb-2
                text-sm
                font-medium
              "
            >

              Username

            </label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="
                w-full
                px-4
                py-3
                rounded-2xl
                bg-[#f8f8f8]
                border
                border-gray-200
                text-black
                outline-none
                focus:border-[#962a27]
                focus:bg-white
                transition
              "
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label
              className="
                block
                text-gray-700
                mb-2
                text-sm
                font-medium
              "
            >

              Password

            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="
                w-full
                px-4
                py-3
                rounded-2xl
                bg-[#f8f8f8]
                border
                border-gray-200
                text-black
                outline-none
                focus:border-[#962a27]
                focus:bg-white
                transition
              "
            />

          </div>

          {/* BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-[#962a27]
              hover:bg-[#b23835]
              text-white
              py-3
              rounded-2xl
              font-semibold
              transition-all
              duration-300
              hover:scale-[1.02]
              flex
              items-center
              justify-center
              gap-3
              disabled:opacity-80
            "
          >

            {loading ? (

              <>

                <div
                  className="
                    w-5
                    h-5
                    border-2
                    border-white/40
                    border-t-white
                    rounded-full
                    animate-spin
                  "
                ></div>

                Logging In...

              </>

            ) : (

              "Login"

            )}

          </button>


          {success && (

            <div
              className="
                flex
                items-center
                justify-center
                gap-2
                bg-green-50
                border
                border-green-200
                text-green-700
                py-3
                rounded-2xl
                font-medium
                animate-[fadeIn_0.4s_ease]
              "
            >

              <span className="text-xl">

                ✔

              </span>

              Login Successful ✨

            </div>

          )}

        </form>

      </div>

    </div>

  );

};

export default Login;