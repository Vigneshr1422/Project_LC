import mongoose from "mongoose";

const bookingSchema =
  new mongoose.Schema({

    bookingId: {
      type: String,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    event: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    selectedItems: {
      type: Object,
      required: true,
    },

    sectionCounts: {
      type: Object,
      required: true,
    },

    grandTotal: {
      type: Number,
      required: true,
    },

    advanceAmount: {
      type: Number,
      default: 0,
    },

    remainingAmount: {
      type: Number,
      default: 0,
    },

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    bookingStatus: {
      type: String,
      default: "Booked",
    },

    paymentId: {
      type: String,
      default: "",
    },

    orderId: {
      type: String,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

  });

export default mongoose.model(
  "Booking",
  bookingSchema
);