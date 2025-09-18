import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  passanger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  source: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  destination: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  fare: {
    type: Number,
    required: true,
  },
  distance: {
    type: Number,
  },

  status: {
    type: String,
    enum: ["confirmed", "cancelled", "completed", "pending", "on the way"],
    default: "pending",
  },
  feedback: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
