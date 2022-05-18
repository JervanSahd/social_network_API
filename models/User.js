const mongoose = require("mongoose");
const { Thoughts } = require("../models/Thoughts");
// const { Schema, Types } = require("mongoose");
const Schema = mongoose.Schema;

// Child documents or subdocuments can be embedded into a parent document
// the managerSchema defines the shape for manager subdocument

const friendsSchema = new Schema({
  name: { type: String, required: true, maxlength: 20, ref: "friendCount" },
});

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      match:  [/.+@.+\..+/, "Please enter a valid e-mail address"],
     
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    friendsSchema: friendsSchema,
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// The friendsScheme defines the shape for the friends subdocument

// Create a virtual property `friendCount` that gets the amount of friends
userSchema.virtual("friendCount").get(function () {
  return this.comments.length;
});

// Uses mongoose.model() to create model
const User = mongoose.model("User", userSchema);

module.exports = User;
