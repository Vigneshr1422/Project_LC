import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import "./routes/whatsappServer.js"; // 🎯 வாட்ஸ்அப் பாட் பேக்ரவுண்ட்ல ரன் ஆக இது இங்கேயே இருக்கட்டும்!
import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import bookingOrderRoute from "./routes/bookingorderroute.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import testimonial from "./routes/testimonialRoutes.js";
dotenv.config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lakshmicatering.netlify.app",
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

/* =========================
   ROUTES
========================= */
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/booking1", bookingOrderRoute);
app.use("/api/testimonials", testimonial);

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.send("Lakshmi Catering Backend Running");
});

/* =========================
   DATABASE
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server Running On ${process.env.PORT || 5000}`
      );
    });
  })
  .catch((err) => console.log(err));