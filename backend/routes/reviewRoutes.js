import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// 1. Submit Customer / Guest Review (Multiple reviews allowed for same orderId)
router.post("/submit", async (req, res) => {
  try {
    const { orderId, customerName, phone, itemReviews, overallComment } = req.body;

    // 🎯 FIX: Restriction remove panniyaachu! Multiple guests can submit for same QR/orderId.
    const newReview = new Review({
      orderId,
      customerName,
      phone: phone || "",
      itemReviews,
      overallComment: overallComment || ""
    });

    await newReview.save();
    res.status(201).json({ success: true, message: "Review submitted successfully!", review: newReview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Fetch ALL Reviews for a specific Order ID (Returns Array)
router.get("/order/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    // 🎯 FIX: findOne-ku badhila find() so admin can see ALL guest reviews for this order
    const reviews = await Review.find({ orderId }).sort({ createdAt: -1 });
    
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ success: false, message: "No reviews found for this order." });
    }
    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Get All Reviews across all orders
router.get("/all", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;