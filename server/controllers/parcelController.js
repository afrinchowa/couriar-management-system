const Parcel = require("../models/Parcel");

exports.createParcel = async (req, res) => {
  try {
    const newParcel = await Parcel.create({
      ...req.body,
      sender: req.user.id
    });
    res.status(201).json(newParcel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find({ sender: req.user.id });
    res.json(parcels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllParcels = async (req, res) => {
  try {
    const parcels = await Parcel.find().populate('sender').populate('assignedAgent');
    res.json(parcels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSingleParcel = async (req, res) => {
  try {
    const parcel = await Parcel.findById(req.params.id);
    res.json(parcel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateParcel = async (req, res) => {
  try {
    const updated = await Parcel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteParcel = async (req, res) => {
  try {
    await Parcel.findByIdAndDelete(req.params.id);
    res.json({ message: "Parcel deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    const parcel = await Parcel.findById(req.params.id);

    if (!parcel) return res.status(404).json({ message: "Parcel not found" });

    parcel.currentLocation = { lat, lng };
    await parcel.save();

    // Optional: emit via Socket.IO here (we'll add later)
    res.json({ message: "Location updated", location: parcel.currentLocation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
