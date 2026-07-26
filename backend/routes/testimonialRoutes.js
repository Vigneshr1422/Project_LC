import express from "express";
import Testimonial from "../models/Testimonial.js"; // File extension `.js` sethukko ES module-la!

const router = express.Router();

// GET: Fetch all testimonials
router.get("/all", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching testimonials.", error });
  }
});

// POST: Save a new testimonial
router.post("/save", async (req, res) => {
  const { name, role, rating, comment } = req.body;
  if (!name || !role || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required." });
  }
  
  try {
    const newTestimonial = new Testimonial({ name, role, rating, comment });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(500).json({ message: "Server error saving testimonial.", error });
  }
});

// DELETE: Remove a testimonial (Admin use)
router.delete("/delete/:id", async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Testimonial removed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error deleting testimonial.", error });
  }
});

// 🎯 FIX HERE: module.exports-ku pathila export default!
export default router;