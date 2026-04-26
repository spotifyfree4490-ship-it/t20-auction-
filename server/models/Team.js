const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: String,
  purse: { type: Number, default: 120 },
  players: [{ type: String }]
});

module.exports = mongoose.model("Team", teamSchema);
