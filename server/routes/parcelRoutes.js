const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
const {
  createParcel,
  getMyParcels,
  getAllParcels,
  getSingleParcel,
  updateParcel,
  deleteParcel
} = require("../controllers/parcelController");

router.post("/", protect(), createParcel); // Customer books parcel
router.get("/my", protect(), getMyParcels); // Customer's bookings
router.get("/", protect(["admin"]), getAllParcels); // Admin only
router.get("/:id", protect(), getSingleParcel);
router.put("/:id", protect(["admin"]), updateParcel);
router.delete("/:id", protect(["admin"]), deleteParcel);
const { updateLocation } = require("../controllers/parcelController");
router.put("/:id/location", protect(["agent"]), updateLocation);
router.put("/:id/status", protect(["agent"]), updateStatus);

module.exports = router;
