const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true },
    pincode: { type: String },
});

module.exports = mongoose.model("Vendor", vendorSchema);
