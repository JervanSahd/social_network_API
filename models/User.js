const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    
  }
  
);


const User = mongoose.model("User", userSchema);

module.exports = User;
