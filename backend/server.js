import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import adminRoutes from "./routes/adminRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

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

app.use(express.json());

/* =========================
   ROUTES
========================= */

app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

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