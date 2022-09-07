const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      default: Date.now,
    },
    pic: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Person = mongoose.model("people", PersonSchema);
