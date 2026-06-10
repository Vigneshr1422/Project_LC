import mongoose from "mongoose";

const bookingOrderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    session: {
      type: String,
      default: "",
    },
    preference: {
      type: String,
      required: true,
    },
    bookingType: {
      type: String,
      required: true,
    },
    packageId: {
      type: String,
      default: "",
    },
    packageName: {
      type: String,
      default: "",
    },
    packageItems: [
      {
        type: String,
      },
    ],
    staffRequired: {
      type: String,
      default: "No",
    },
    staffCount: {
      type: Number,
      default: 0,
    },
    packageCost: {
      type: Number,
      default: 0,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    serviceCharge: {
      type: Number,
      default: 0,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    advancePaid: {
      type: Number,
      required: true,
    },
    balanceAmount: {
      type: Number,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "Success",
    },
    bookingStatus: {
      type: String,
      default: "Pending",
    },
    // 🔥 AUTOMATION METRICS EXTRACTION FIELDS FOR DRIVE LINK PERSISTENCE
    invoicePdfDriveId: { 
      type: String, 
      default: null 
    },
    invoicePdfDriveLink: { 
      type: String, 
      default: null 
    },
    invoiceGenerationTimestamp: { 
      type: Date, 
      default: Date.now 
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BookingOrders", bookingOrderSchema);