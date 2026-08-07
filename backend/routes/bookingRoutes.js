import mongoose from "mongoose";
import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

/* =========================
    CREATE BOOKING
========================= */
router.post("/create-order", async (req, res) => {

  try {

    const { amount } = req.body;

    const options = {

      amount: amount * 100,

      currency: "INR",

      receipt: `receipt_${Date.now()}`,

    };

    const order =
      await razorpay.orders.create(options);

    res.json(order);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

});



router.post("/", async (req, res) => {

  console.log("========== BOOKING API HIT ==========");
  console.log("REQ BODY =>", req.body);

  try {

    const {

      name,
      phone,
      address,
      event,
      date,
      selectedItems,
      sectionCounts,
      grandTotal,
      advanceAmount,
      paymentId,
      orderId,

    } = req.body;

    if (
      !name ||
      !phone ||
      !address ||
      !event ||
      !date
    ) {

      return res.status(400).json({

        success: false,

        message: "All fields are required",

      });

    }

    const totalBookings =
      await Booking.countDocuments();

    const bookingId =
      `LC${Date.now()}`;

    const booking =
      new Booking({

        bookingId,

        name,

        phone,

        address,

        event,

        date,

        selectedItems,

        sectionCounts,

        grandTotal,

        advanceAmount,

        remainingAmount:
          grandTotal - advanceAmount,

        paymentStatus:
          advanceAmount > 0
            ? "Advance Paid"
            : "Pending",

        bookingStatus:
          "Booked",

        paymentId,

        orderId,

      });

    console.log(
      "BOOKING BEFORE SAVE =>",
      booking
    );

    await booking.save();

    console.log(
      "BOOKING SAVED SUCCESSFULLY"
    );

    res.status(201).json({

      success: true,

      message:
        "Booking Saved Successfully",

      booking,

    });

  } catch (error) {

    console.log(
      "BOOKING ERROR =>",
      error
    );

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

});

/* =========================
    UPCOMING ORDERS
========================= */

router.get(
  "/upcoming",

  async (req, res) => {

    try {

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const upcomingOrders =
        await Booking.find({

          date: {
            $gte: today,
          },

        }).sort({ date: 1 });

      res.status(200).json({

        success: true,

        orders: upcomingOrders,

      });

    } catch (error) {

  console.log("BOOKING ERROR =>", error);

  res.status(500).json({

    success: false,

    message: error.message,

  });

}

  }
);

router.get("/storage", async (req, res) => {
  try {
    const stats = await mongoose.connection.db.stats();

    // storageSize -> actual space taken on disk (includes data, indexes, padding)
    const usedBytes = stats.storageSize || stats.dataSize || 0;
    const usedMB = Number((usedBytes / (1024 * 1024)).toFixed(2));
    const totalMB = 512; // MongoDB Atlas M0 Free Tier Limit

    const remainingMB = Number(Math.max(0, totalMB - usedMB).toFixed(2));
    const usagePercent = Number(((usedMB / totalMB) * 100).toFixed(2));

    res.json({
      usedMB,
      totalMB,
      remainingMB,
      usagePercent,
      collections: stats.collections || 0,
      objects: stats.objects || 0,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
/* =========================
    COMPLETED ORDERS
========================= */

router.get(
  "/completed",

  async (req, res) => {

    try {

      const today =
        new Date()
          .toISOString()
          .split("T")[0];

      const completedOrders =
        await Booking.find({

          date: {
            $lt: today,
          },

        }).sort({ date: -1 });

      res.status(200).json({

        success: true,

        orders: completedOrders,

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message: error.message,

      });

    }

  }
);

/* =========================
    DELETE BOOKING
========================= */

router.delete(
  "/:id",
  async (req, res) => {

    try {

      const booking =
        await Booking.findByIdAndDelete(
          req.params.id
        );

      if (!booking) {

        return res.status(404).json({

          success: false,

          message:
            "Booking Not Found",

        });

      }

      res.status(200).json({

        success: true,

        message:
          "Booking Deleted Successfully",

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          error.message,

      });

    }

  }
);

export default router;