const mongoose = require("mongoose");

const ParcelSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickupAddress: String,
  deliveryAddress: String,
  parcelType: String,
  size: String,
  isCOD: Boolean,
  amount: Number,
  status: {
    type: String,
    enum: ["Booked", "Picked Up", "In Transit", "Delivered", "Failed"],
    default: "Booked"
  },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  currentLocation: {
    lat: Number,
    lng: Number
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Parcel", ParcelSchema);
