const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  catalog: [itemsSchema]
});

const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
quantity: {
    type: number,
  },
  notes: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
