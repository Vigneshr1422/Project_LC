import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Login = () => {
  const navigate = useNavigate();

  /* ==========================================================================
      FORM DATA STATES
     ========================================================================== */
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); 

  /* ==========================================================================
      HANDLE INPUT CHANGE
     ========================================================================== */
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ==========================================================================
      LOGIN VALIDATION & REFRESH PIPELINE
     ========================================================================== */
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(""); 
    setSuccess(false);

    const masterUsername = "admin";
    const masterPassword = "admin123";

    setTimeout(() => {
      // 1. Condition: Correct credentials match
      if (formData.username === masterUsername && formData.password === masterPassword) {
        setLoading(false);
        setSuccess(true);
        localStorage.setItem("adminAuth", "true");

        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 1200);
      } 
      // 2. Condition: 🔥 Username correct, password thappu
      else if (formData.username === masterUsername && formData.password !== masterPassword) {
        setLoading(false);
        setErrorMsg("Incorrect Password! Page resetting... ❌");

        // 🔥 FIXED: 1.5 seconds delay kalichu page fulla refresh aagum da
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } 
      // 3. Fallback: Entire fields mismatch layout
      else {
        setLoading(false);
        setErrorMsg("Invalid Credentials! Page resetting... ❌");

        // 🔥 FIXED: Wrong username pottalum 1.5s la page auto refresh aagum
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-start justify-center px-6 pt-24">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-[30px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
        
        {/* HEADING BRAND BLOCK */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#962a27] mb-2">Admin Login</h1>
          <p className="text-gray-500">Welcome to Lakshmi Catering</p>
        </div>

        {/* INTERACTIVE FORM ENGINE */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* USERNAME INPUT CONTAINER */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="w-full px-4 py-3 rounded-2xl bg-[#f8f8f8] border border-gray-200 text-black outline-none focus:border-[#962a27] focus:bg-white transition"
              required
            />
          </div>

          {/* PASSWORD INPUT CONTAINER */}
          <div>
            <label className="block text-gray-700 mb-2 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-2xl bg-[#f8f8f8] border border-gray-200 text-black outline-none focus:border-[#962a27] focus:bg-white transition"
              required
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#962a27] hover:bg-[#b23835] text-white py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-80"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                Logging In...
              </>
            ) : (
              "Login"
            )}
          </button>

          {/* ==========================================================================
              DYNAMIC INLINE NOTIFICATION BANNERS
             ========================================================================== */}
          
          {/* 🟢 SUCCESS MESSAGE */}
          {success && (
            <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 py-3 rounded-2xl font-medium animate-[fadeIn_0.4s_ease]">
              <span className="text-xl">✔</span>
              Login Successful ✨
            </div>
          )}

          {/* 🔴 FAILURE / WRONG PASSWORD MESSAGE (Triggers Page Refresh) */}
          {errorMsg && (
            <div className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-700 py-3 rounded-2xl font-medium animate-[fadeIn_0.4s_ease]">
              <span className="text-sm font-semibold">{errorMsg}</span>
            </div>
          )}

        </form>
      </div>
    </div>
  );
};

export default Login;