
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      ref: "User",
    },
    
  },
  
);
const Thoughts = mongoose.model("Thoughts", thoughtsSchema);

module.exports = Thoughts;
