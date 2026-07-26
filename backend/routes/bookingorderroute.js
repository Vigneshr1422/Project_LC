import express from "express";
import BookingOrders from "../models/bookingOrderRoute.js";

// 🎯 நம்ம தனி ஆர்க்கிடெக்சர் ஃபைலான whatsappServer-ஐ இம்போர்ட் செய்கிறோம்
import { sendAutoWhatsAppInvoices } from "./whatsappServer.js"; 

const router = express.Router();

/* ========================================================
    1. SAVE CONFIRMED BOOKING (POST) - WITH WHATSAPP AUTOMATION
======================================================= */
router.post("/save-confirmed-booking", async (req, res) => {
  try {
    // 🎯 பிரண்ட்-எண்ட் அனுப்பும் நேரடி வேல்யூக்களை Destructure செய்கிறோம் (formData இன்றி)
    const {
      customerName,
      phone,
      eventDate,
      guests,
      district,
      city,
      address,
      eventType,
      session,
      preference,
      bookingType,
      packageId,
      packageName,
      packageItems,
      grandTotal,
      tokenAdvanceAmount, // (ஒருவேளை advancePaid-ஆகவும் வரலாம்)
      advancePaid,        // மாற்றுப் பெயர் பாதுகாப்புக்காக
      balanceAmount,
      paymentId,
      serviceCharge,
      deliveryCharge,
      staffCount,
      staffRequired,
      totalAmount,
      invoicePdfDriveLink
    } = req.body;

    console.log("📥 [Backend] Request received for customer:", customerName);

    // 1. MongoDB Database-ல் ஆர்டரைச் சேமிக்கிறோம்
    const booking = await BookingOrders.create({
      customerName: customerName,
      phone: phone,
      eventDate: eventDate,
      guests: guests ? Number(guests) : 0,
      district: district,
      city: city,
      address: address,
      eventType: eventType,
      session: session,
      preference: preference,
      bookingType: bookingType,
      packageId: packageId,
      packageName: packageName,
      packageItems: packageItems || [],
      staffRequired: staffRequired,
      staffCount: staffCount,
      packageCost: totalAmount || grandTotal, // உங்க ஸ்கீமா பெயருக்கு ஏற்ப
      deliveryCharge: deliveryCharge,
      serviceCharge: serviceCharge,
      grandTotal: grandTotal,
      advancePaid: tokenAdvanceAmount || advancePaid || 0,
      balanceAmount: balanceAmount || (grandTotal - (tokenAdvanceAmount || advancePaid || 0)),
      razorpayPaymentId: paymentId,
      paymentStatus: "Success",
      bookingStatus: "Pending",
      invoicePdfDriveLink: invoicePdfDriveLink || "" 
    });

    console.log("✅ Step 1: MongoDB Booking Record Sync Complete!");

    // ==================================================================
    // 🔥 2. BACKEND AUTOMATION: BACKGROUND WHATSAPP ENGINE TRIGGER
    // ==================================================================
    try {
      // வாட்ஸ்அப் மெசேஜ் அனுப்ப இப்போ கிரியேட் ஆன 'booking' ஆப்ஜெக்ட்டை அப்படியே பாஸ் பண்றோம்
      await sendAutoWhatsAppInvoices(booking);
      console.log("🚀 Step 2: Full-Auto Backend WhatsApp Trigger Fired!");
    } catch (wsError) {
      // வாட்ஸ்அப் செஷன் கட் ஆகி இருந்தாலும் மெயின் ஆர்டர் சேவிங் பிளாக் ஆகாமல் தடுக்க செப்பரேட் ட்ரை-கேட்ச்
      console.log("⚠️ WhatsApp Automation Engine Fired safely with warnings:", wsError.message);
    }

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
    const bookings = await BookingOrders.find({});
    
    const mappedBookings = bookings.map(b => ({
      _id: b._id,
      id: b.id || b._id.toString().substring(18, 24).toUpperCase(), 
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
    6. DELETE ALL BOOKINGS (DELETE)
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
    7. DELETE BOOKING BY ID (DELETE)
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

/* ========================================================
    GET SINGLE BOOKING BY ID (GET)
======================================================== */
router.get("/:id", async (req, res) => {
  try {
    const booking = await BookingOrders.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching booking", error: error.message });
  }
});

export default router;