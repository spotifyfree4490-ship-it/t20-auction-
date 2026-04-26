const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: String,
  role: String,
  basePrice: Number,
  stats: Object,
  sold: { type: Boolean, default: false }
});

module.exports = mongoose.model("Player", playerSchema);
