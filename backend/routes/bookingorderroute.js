import express from "express";
import BookingOrders from "../models/bookingOrderRoute.js";

const router = express.Router();

/* ========================================================
    1. SAVE CONFIRMED BOOKING (POST)
======================================================= */
router.post("/save-confirmed-booking", async (req, res) => {
  try {
    const {
      formData,
      grandTotal,
      tokenAdvanceAmount,
      paymentId,
      serviceCharge,
      deliveryCharge,
      staffCount,
      staffRequired,
      totalAmount,
    } = req.body;

    const booking = await BookingOrders.create({
      customerName: formData.name,
      phone: formData.phone,
      eventDate: formData.date,
      guests: Number(formData.guests),
      district: formData.district,
      city: formData.city,
      address: formData.address,
      eventType: formData.eventType,
      session: formData.session,
      preference: formData.preference,
      bookingType: formData.bookingType,
      packageId: formData.selectedPackageId,
      packageName: formData.packageName,
      packageItems: formData.packageItems || [],
      staffRequired,
      staffCount,
      packageCost: totalAmount,
      deliveryCharge,
      serviceCharge,
      grandTotal,
      advancePaid: tokenAdvanceAmount,
      balanceAmount: grandTotal - tokenAdvanceAmount,
      razorpayPaymentId: paymentId,
      paymentStatus: "Success",
      bookingStatus: "Pending",
    });

    console.log("✅ Step 1: MongoDB Booking Record Sync Complete!");

    return res.status(201).json({
      success: true,
      booking,
    });

  } catch (error) {
    console.log("Root exception caught across core save transaction routine:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/* ========================================================
    🔥 2. GET ALL BOOKINGS (GET) - FRONTEND CALENDAR-KU ITHU THAAN MUKKIYAM
======================================================== */
router.get("/get-all-bookings", async (req, res) => {
  try {
    // Database-la irukura elaa bookings-aiyum eduthu frontend-ku tharom
    const bookings = await BookingOrders.find({});
    
    // Frontend dynamic structural keys mapping wrapper
    // Frontend-la `.name`, `.date` nu object flat keys vaasikirathaala, inge map panni safe-ah tharom
    const mappedBookings = bookings.map(b => ({
      _id: b._id,
      id: b.id || b._id.toString().substring(18, 24).toUpperCase(), // Backup Custom Order ID template
      name: b.customerName,
      date: b.eventDate,
      guests: b.guests,
      city: b.city,
      district: b.district,
      preference: b.preference,
      status: b.bookingStatus
    }));

    res.status(200).json({ 
      success: true, 
      count: mappedBookings.length, 
      bookings: mappedBookings 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch all bookings", error: error.message });
  }
});

/* ========================================================
    3. GET UPCOMING ORDERS (GET)
======================================================== */
router.get("/upcoming", async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split("T")[0];
    const orders = await BookingOrders.find({ eventDate: { $gte: todayStr } }).sort({ eventDate: 1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
  }
});

/* ========================================================
    4. GET COMPLETED ORDERS (GET)
======================================================== */
router.get("/completed", async (req, res) => {
  try {
    const todayStr = new Date().toISOString().split("T")[0];
    const orders = await BookingOrders.find({ eventDate: { $lt: todayStr } }).sort({ eventDate: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch orders", error: error.message });
  }
});

/* ========================================================
    5. MENU BULK SYNCHRONIZATION (POST)
======================================================== */
router.post("/menu-bulk-sync", async (req, res) => {
  try {
    const { updatedInventory } = req.body;
    res.status(200).json({ success: true, message: "Synchronized successfully!", count: updatedInventory?.length || 0 });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to process inventory loops.", error: error.message });
  }
});

/* ========================================================
    6. DELETE ALL BOOKINGS (DELETE) - Specific Route mela irukalam
======================================================== */
router.delete("/delete-all", async (req, res) => {
  try {
    await BookingOrders.deleteMany({});
    res.status(200).json({ success: true, message: "Purged completely" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ========================================================
    7. DELETE BOOKING BY ID (DELETE) - Dynamic parameters parameters eppovume bottom-la thaan irukanum!
======================================================== */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await BookingOrders.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete booking", error: error.message });
  }
});

export default router;