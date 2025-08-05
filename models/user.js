const mongoose = require("mongoose");


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
    type: Number,
  },
  notes: {
    type: String,
  },
});

const eventsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
  },
  cohost: {
    type: String,
  },
  guests: {
    type: String,
  },
items: {
    type: String,
  },
  notes: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  catalog: [itemsSchema],
  calendar: [eventsSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;